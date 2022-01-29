# BroadcastChannel

https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel  
该接口表示一个命名频道，给定来源 BroadcastChannel 的任何浏览上下文都可以订阅该频道。它允许同一来源的不同文档（在不同的窗口、选项卡、框架或 iframe 中）之间进行通信。消息通过在所有侦听通道的对象上触发的事件进行广播。

# 兼容

Chrome:54
Edge:79
Firefox:38
Internet Explorer:NO

# 语法

```js
channel = new BroadcastChannel(channelName);
```

# Note

- 它的构造函数接受一个参数：通道的名称。如果它是第一个连接到该广播频道名称的，则创建基础频道。

# polyfill

```js

```

# 示例

```js
const bc = new BroadcastChannel('test_channel');
bc.postMessage('This is a test message.');
bc.onmessage = function (ev) {
  console.log(ev);
};
bc.close();
```

# 笔记
