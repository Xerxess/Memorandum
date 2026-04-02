
# FutureBuilder

FutureBuilder 是一个非常实用的 Widget，它能让你根据一个异步任务（Future）的执行状态（如正在加载、成功完成、发生错误）来动态构建不同的 UI。

适用场景：
它最适合「一次性」的异步操作，比如进入页面时请求一次 API、读取本地文件或初始化复杂的对象。如果数据是会持续更新的长连接（如 WebSocket 或 Firebase 实时监听），你应该使用 StreamBuilder。

通过 snapshot 可以获取以下重要属性：

- snapshot.connectionState: 状态枚举（none, waiting, active, done）。
- snapshot.hasData: 是否已经成功拿到数据。
- snapshot.hasError: 异步任务是否抛出了异常。

```dart
FutureBuilder<String>(
  future: _myFuture, // 建议在 initState 中初始化
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return CircularProgressIndicator(); // 正在加载
    } else if (snapshot.hasError) {
      return Text('错误: ${snapshot.error}'); // 报错了
    } else if (snapshot.hasData) {
      return Text('数据: ${snapshot.data}'); // 成功拿到数据
    } else {
      return Text('暂无数据');
    }
  },
)
```
