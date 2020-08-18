<!-- TOC -->

- [Fullscreen](#fullscreen)

<!-- /TOC -->

https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen

https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenEnabled

# Fullscreen

```js
// 全屏模式是否可用
var isFullscreenAvailable = document.fullscreenEnabled;

// 返回Element当前正在以全屏模式
var element = document.fullscreenElement;

// 进入全屏
var promise = Element.requestFullscreen(options);

// 退出全屏
document.exitFullscreen()
```