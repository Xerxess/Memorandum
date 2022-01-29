# MessagePort

https://developer.mozilla.org/en-US/docs/Web/API/MessagePort  
Channel Messaging API 的 MessagePort 接口代表 a 的两个端口之一，允许从一个端口发送消息并监听它们到达另一个端口。

# 示例

```js
var channel = new MessageChannel();
var output = document.querySelector('.output');
var iframe = document.querySelector('iframe');

// Wait for the iframe to load
iframe.addEventListener('load', onLoad);

function onLoad() {
  // Listen for messages on port1
  channel.port1.onmessage = onMessage;

  // Transfer port2 to the iframe
  iframe.contentWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
}

// Handle messages received on port1
function onMessage(e) {
  output.innerHTML = e.data;
}
```
