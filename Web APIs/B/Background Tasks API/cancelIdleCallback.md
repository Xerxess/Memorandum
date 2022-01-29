# cancelIdleCallback

https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback  
方法取消先前使用 计划的回调window.requestIdleCallback()。

# 兼容

Chrome:47
Edge:79
Firefox:55
Internet Explorer:-

# 语法

```js
window.cancelIdleCallback(handle);
```

# Note

-

# polyfill

```js
window.cancelIdleCallback = window.cancelIdleCallback || function(id) {
  clearTimeout(id);
}
```

# 示例

# 笔记
