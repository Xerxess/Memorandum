# postMessage

https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage  
该window.postMessage()方法可以安全地实现对象之间的跨域通信Window；例如，在页面和它生成的弹出窗口之间，或者在页面和嵌入其中的 iframe 之间。

通常，当且仅当它们源自的页面共享相同的协议、端口号和主机（也称为“同源策略”）时，不同页面上的脚本才被允许相互访问。   
window.postMessage()提供了一种受控机制来安全地规避此限制（如果使用得当）。
  
# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
postMessage(message, targetOrigin)
postMessage(message, targetOrigin, [transfer])
```

# Note

-

# polyfill

```js

```

# 示例

```js

```

# 笔记
