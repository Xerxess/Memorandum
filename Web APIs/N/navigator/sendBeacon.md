# sendBeacon

https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon  
将包含少量数据 的 HTTP POST 请求异步发送到 Web 服务器。

# 兼容

Chrome:39
Edge:14
Firefox:31
Internet Explorer:NO

# 语法

```js
navigator.sendBeacon(url);
navigator.sendBeacon(url, data);
```

# Note

-

# polyfill

```js

```

# 示例

```js
document.addEventListener('visibilitychange', function logData() {
  if (document.visibilityState === 'hidden') {
    navigator.sendBeacon('/log', analyticsData);
  }
});
```

# 笔记
