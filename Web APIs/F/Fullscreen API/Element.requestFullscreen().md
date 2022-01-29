# Element.requestFullscreen()

https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
var promise = element.requestFullscreen(options);
```

# Note

-

# polyfill

```js

```

# 示例

```js
function toggleFullscreen() {
  let elem = document.querySelector("video");

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}
```

# 笔记
