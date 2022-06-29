<!-- TOC -->

- [Fullscreen](#fullscreen)
- [IOS Video Full-Screen Event](#ios-video-full-screen-event)

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
document.exitFullscreen();
```

# IOS Video Full-Screen Event

https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html

- OS X：webkitfullscreenchange 当元素进入或退出全屏模式时触发该事件。
- iOS：webkitbeginfullscreen 和 webkitendfullscreen Video 事件分别在进入和退出全屏模式时触发。
