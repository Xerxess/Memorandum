# createEvent

https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent  
创建指定类型的事件。返回的对象应首先初始化，然后可以传递给 EventTarget.dispatchEvent.

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js

```

# Note

-

# polyfill

```js

```

# 示例

```js
// Create the event.
var event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
elem.addEventListener('build', function (e) {
  // e.target matches elem
}, false);

// Target can be any Element or other EventTarget.
elem.dispatchEvent(event);
```

# 笔记
