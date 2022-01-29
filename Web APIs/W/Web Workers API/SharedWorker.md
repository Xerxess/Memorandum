# -

https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker

SharedWorker接口代表一种特定类型的工作人员，可以从多个浏览上下文中访问，例如多个窗口、iframe 甚至工作人员。

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
var myWorker = new SharedWorker(aURL, name);
var myWorker = new SharedWorker(aURL, options);
```

# Note

- 必须通过port对象进行通信——打开一个显式端口，脚本可以使用该端口与工作人员进行通信

# polyfill

```js

```

# 示例

```js
var myWorker = new SharedWorker('worker.js');

// 向共享工作者发送消息或从共享工作者发送消息
squareNumber.onchange = function() {
  myWorker.port.postMessage([squareNumber.value,squareNumber.value]);
  console.log('Message posted to worker');
}
```

```js
// worker.js
onconnect = function(e) {
  var port = e.ports[0];

  port.onmessage = function(e) {
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    port.postMessage(workerResult);
  }
}
```

# 笔记
