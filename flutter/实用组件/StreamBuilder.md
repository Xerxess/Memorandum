
# StreamBuilder

StreamBuilder 就是处理「持续流」任务（比如监听聊天消息、传感器数据或下载进度）。

工作原理:StreamBuilder 订阅一个 Stream。每当 Stream 发送新的数据、报错或关闭时，它都会收到通知，并根据最新的 AsyncSnapshot 状态刷新界面。



```dart
StreamBuilder<int>(
  stream: _myStream, // 数据流，例如来自 WebSocket 或数据库监听
  initialData: 0,    // 可选：在第一个数据到达前的初始值
  builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
    if (snapshot.hasError) {
      return Text('出错啦: ${snapshot.error}');
    }
    switch (snapshot.connectionState) {
      case ConnectionState.none:
        return Text('没有连接');
      case ConnectionState.waiting:
        return Text('等待数据中...');
      case ConnectionState.active:
        return Text('实时数据: ${snapshot.data}'); // 流正在运行中
      case ConnectionState.done:
        return Text('流已关闭'); // Stream 已被 close()
    }
  },
)
```

## StreamController

- sink (水槽)：入口。你通过 sink.add(data) 把数据丢进去。
- stream (水流)：出口。StreamBuilder 在这里接住数据并刷 UI。
- dispose(): 这是新手最容易忽略的地方。StreamController 是长期存在的资源，如果不手动 close()，即使页面关了，它可能还在后台运行，消耗内存。

```dart
final _controller = StreamController<String>();

// 发送数据
_controller.sink.add("Hello Stream");

// 监听数据 (StreamBuilder 内部也是这么做的)
_controller.stream.listen((data) => print(data));

// 记得关闭！
_controller.close();
```

```dart
// 允许无限个监听者同时订阅
final _broadcastController = StreamController<int>.broadcast();
```

## demo

```dart
import 'dart:async'; // 必须导入，用于 StreamController
import 'package:flutter/material.dart';

class CounterStreamPage extends StatefulWidget {
  @override
  _CounterStreamPageState createState() => _CounterStreamPageState();
}

class _CounterStreamPageState extends State<CounterStreamPage> {
  // 1. 创建控制器 (建议指定泛型类型)
  final StreamController<int> _controller = StreamController<int>();
  int _counter = 0;

  @override
  void dispose() {
    // 2. 非常重要：在组件销毁时关闭流，防止内存泄漏
    _controller.close();
    super.dispose();
  }

  void _incrementCounter() {
    _counter++;
    // 3. 向流中添加新数据（sink 是入口）
    _controller.sink.add(_counter);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("StreamController 示例")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('当前计数值：'),
            // 4. 使用 StreamBuilder 监听流
            StreamBuilder<int>(
              stream: _controller.stream, // 监听控制器的 stream
              initialData: 0,            // 初始值
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  return Text('发生错误: ${snapshot.error}');
                }
                // 每当 _controller.sink.add 被调用，这里都会自动刷新
                return Text(
                  '${snapshot.data}',
                  style: Theme.of(context).textTheme.headlineMedium,
                );
              },
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        child: Icon(Icons.add),
      ),
    );
  }
}

```
