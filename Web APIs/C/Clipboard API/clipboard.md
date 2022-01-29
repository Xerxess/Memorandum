# clipboard

https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard

Clipboard API 可用于在 Web 应用程序中实现剪切、复制和粘贴功能。

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
theClipboard = navigator.clipboard;
```

# Note

-

# polyfill

```js

```

# 示例

```js
// 访问系统剪贴板
navigator.clipboard.readText().then(
  clipText => document.querySelector(".editor").innerText += clipText);
```

# 笔记
