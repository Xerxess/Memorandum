# FLIP 技术

https://www.w3cplus.com/animation/high-performance-animations.html

> 什么是 FLIP 技术

FLIP 是将一些开销高昂的动画，如针对 width，height，left 或 top 的动画，映射为 transform 动画。

FLIP 来源于 First，Last，Invert，Play

* First 元素的初始状态
* Last 元素的最终状态
* Invert 使用transform 或 opacity反转动画，让元素看起来为初始状态
* Play 移除元素上的 transform 开始动画

```js 
// 获取初始位置 
var first = el.getBoundingClientRect(); 

// 为元素指定一个样式，让元素在最终位置上 
el.classList.add('totes-at-the-end'); 

// 获取最终位置 
var last = el.getBoundingClientRect(); 

// 如果有必要也可以对其他样式进行计算，但最好坚持只进行 transform 和 opacity 相关的计算 
var invert = first.top - last.top; 

// 反转 
el.style.transform = 'translateY(' + invert + 'px)'; 

// 等到下一帧，也就是其他所有的样式都已经被应用 
requestAnimationFrame(function() { 

// 添加动画相关的设置 
el.classList.add('animate-on-transforms'); 
// 开始动画 
el.style.transform = ''; 

});

// 结束时清理 
el.addEventListener('transitionend', tidyUpAnimations);
```
