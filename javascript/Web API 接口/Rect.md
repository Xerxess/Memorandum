
<!-- TOC -->

- [Window](#window)
  - [window.innerHeight window.innerWidth](#windowinnerheight-windowinnerwidth)
  - [window.outerHeight window.outerWidth](#windowouterheight-windowouterwidth)
  - [window.pageXOffset===window.scrollX window.pageYOffset===window.scrollY](#windowpagexoffsetwindowscrollx-windowpageyoffsetwindowscrolly)
  - [window.screen](#windowscreen)
- [Element](#element)
- [HTMLElement](#htmlelement)
- [HTMLHtmlElement](#htmlhtmlelement)
- [HTMLBodyElement](#htmlbodyelement)
- [DOMRect](#domrect)

<!-- /TOC -->

# Window
## window.innerHeight window.innerWidth

* ie9+  

获得浏览器窗口的视口（viewport）高度（宽度）（以像素为单位）；如果有水平滚动条，也包括滚动条高度。

```js
var intViewportHeight = window.innerHeight;
```

## window.outerHeight window.outerWidth

* ie9+ 

获取整个浏览器窗口的高度(宽度)（单位：像素），包括侧边栏（如果存在）、窗口镶边（window chrome）和窗口调正边框（window resizing borders/handles）。

## window.pageXOffset===window.scrollX window.pageYOffset===window.scrollY

* ie9+

返回文档/页面水平(垂直)方向滚动的像素值。

## window.screen

屏幕窗口

* window.screenX 浏览器左边到系统桌面左边的像素值
* window.screenY 浏览器上边到系统桌面上边的像素值

# Element

```js
//height+ padding - 水平滚动条的高度（如果存在）。
var intElemClientHeight = element.clientHeight;

//width + padding - 垂直滚动条宽度 (如果存在)
var intElemClientWidth = element.clientWidth;

//元素左边框的宽度（以像素为单位）
var left = element.clientLeft;

// 元素顶部边框的宽度（以像素为单位）
var top = element.clientTop;

```

```js

// 一个元素的内容高度的测量，包括由于溢出的内容在屏幕上不可见。
// 内容height + padding - border - margin。
var intElemScrollHeight = element.scrollHeight;
var intElemScrollHeight = element.scrollWidth;

var sLeft = element.scrollLeft;
var sLeft = element.scrollTop;
```

# HTMLElement

```js
// 返回一个元件的高度，其中包括垂直填充和边界，为整数。
// offsetHeight是元素CSS高度的像素度量，包括任何边框，填充和水平滚动条（如果呈现）
// border + padding + height  + 滚动条
var intElemOffsetHeight = element.offsetHeight;
var intElemOffsetHeight = element.offsetWidth;

//left是一个整数，表示距离最近的相对定位的父元素的左侧偏移量。
left = element.offsetLeft;  
left = element.offsetTop;
```

# HTMLHtmlElement
# HTMLBodyElement

# DOMRect

```js
//DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
domRect = element.getBoundingClientRect;
```

注意：
domRect.left 可能等于 element.offsetLeft
domRect.top 可能等于 element.offsetTop
