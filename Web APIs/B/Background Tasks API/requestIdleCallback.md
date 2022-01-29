# requestIdleCallback

https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback

方法将要在浏览器空闲期间调用的函数排队。

# 兼容

Chrome:47  
Edge:79  
Firefox:55  
Internet Explorer:No

# 语法

```js
window.requestIdleCallback(callback);
window.requestIdleCallback(callback, options:{time});
```

# Note

- 对于需要的工作，强烈建议使用 time 选项，否则在触发回调之前可能会经过数秒。

# polyfill

```js
window.requestIdleCallback =
  window.requestIdleCallback ||
  function (handler) {
    let startTime = Date.now();

    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, 1);
  };
```

# 示例

# 笔记
