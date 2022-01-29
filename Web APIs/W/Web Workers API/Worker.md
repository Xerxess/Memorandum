# Worker

https://developer.mozilla.org/en-US/docs/Web/API/Worker

Web Workers API的Worker接口代表一个可以通过脚本创建的后台任务，该脚本可以将消息发送回其创建者。

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
var myWorker = new Worker(aURL, options);
```

# Note

-

# polyfill

```js

```

# 示例

```js
var myWorker = new Worker('/worker.js');
var first = document.querySelector('input#number1');
var second = document.querySelector('input#number2');

first.onchange = function() {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
}
```

# 笔记
