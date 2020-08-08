<!-- TOC -->

- [IntersectionObserver](#intersectionobserver)
- [创建相交观察器](#创建相交观察器)

<!-- /TOC -->

https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

# IntersectionObserver

Intersection Observer API提供了一种异步观察目标元素与祖先元素或顶级文档的视口相交的变化的方法。

# 创建相交观察器

```js
let options = {
  root: document.querySelector('#scrollArea'), // 用作检查目标可见性的视口的元素。必须是目标的祖先。如果未指定或，则默认为浏览器视口null。
  rootMargin: '0px',// 围绕根的边距。可以具有类似于CSS margin属性的值，例如“ 10px 20px 30px 40px"（（上，右，下，左）。这些值可以是百分比。这组值用于在计算交集之前增大或缩小根元素边界框的每一侧。默认为全零。
  threshold: 1.0 // 一个数字或一个数字数组，指示观察者的回调应在目标可见性的百分比上执行。如果只想检测可见性何时超过50％标记，则可以使用0.5值。如果希望每次可见性再超过25％时都运行回调，则可以指定数组[0，0.25，0.5，0.75，1]。默认值为0（意味着即使看到一个像素，回调也将运行）。值1.0表示直到每个像素都可见，才认为阈值已通过。
}

let observer = new IntersectionObserver(callback, options);
```