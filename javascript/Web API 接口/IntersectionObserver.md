<!-- TOC -->

- [交集根和根边距](#%E4%BA%A4%E9%9B%86%E6%A0%B9%E5%92%8C%E6%A0%B9%E8%BE%B9%E8%B7%9D)
- [IntersectionObserver](#intersectionobserver)
- [创建相交观察器](#%E5%88%9B%E5%BB%BA%E7%9B%B8%E4%BA%A4%E8%A7%82%E5%AF%9F%E5%99%A8)
- [小笔记](#%E5%B0%8F%E7%AC%94%E8%AE%B0)
    - [rootMargin](#rootmargin)

<!-- /TOC -->

<https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API>

- 当页面滚动时延迟加载图像或其他内容。
- 实现“无限滚动”网站，在滚动时加载和呈现越来越多的内容，以便用户不必翻阅页面。
- 报告广告的可见性以计算广告收入。
- 根据用户是否会看到结果来决定是否执行任务或动画过程。

# 交集根和根边距

* 如果交集根是隐式根（即顶层Document），则根交集矩形是视口的矩形。
* 如果交集根有溢出剪辑，则根交集矩形是根元素的内容区域。
* 否则，根交集矩形是交集根的边界客户端矩形（通过调用getBoundingClientRect()它返回）。

# IntersectionObserver

Intersection Observer API提供了一种异步观察目标元素与祖先元素或顶级文档的视口相交的变化的方法。

# 创建相交观察器

```js
let options = {
  root: document.querySelector('#scrollArea'), // 用作检查目标可见性的视口的元素。必须是目标的祖先。如果未指定或，则默认为浏览器视口null。
  rootMargin: '0px',// 围绕根的边距。可以具有类似于CSS margin属性的值，例如“ 10px 20px 30px 40px"（（上，右，下，左）。这些值可以是百分比。这组值用于在计算交集之前增大或缩小根元素边界框的每一侧。默认为全零。
  threshold: 1.0 | [0, 0.25, 0.5, 0.75, 1] // 一个数字或一个数字数组，指示观察者的回调应在目标可见性的百分比上执行。如果只想检测可见性何时超过50％标记，则可以使用0.5值。如果希望每次可见性再超过25％时都运行回调，则可以指定数组[0，0.25，0.5，0.75，1]。默认值为0（意味着即使看到一个像素，回调也将运行）。值1.0表示直到每个像素都可见，才认为阈值已通过。
}

let observer = new IntersectionObserver((e)=>{
        console.log(e)
      }, options);
observer.observe(document.querySelector('#target'))
```

```
boundingClientRect: DOMRectReadOnly {x: 8, y: 529, width: 92, height: 92, top: 529, …} 该矩形描述了包含整个目标元素的最小矩形。
intersectionRatio: 1 当前在根的相交比率内可见的目标元素有多少，其值介于 0.0 和 1.0 之间。
intersectionRect: DOMRectReadOnly {x: 8, y: 529, width: 92, height: 92, top: 529, …} 它描述包含当前在交集根中可见的目标元素的整个部分的最小矩形。
isIntersecting: true 一个布尔值，表示true目标元素是否与相交观察器的根相交。如果是true，则IntersectionObserverEntry描述了到相交状态的转变；如果是false，那么您知道过渡是从相交到不相交。
isVisible: false 
rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1897, height: 623, top: 0, …} 应于 的 target根交集矩形，如果IntersectionObserver.rootMargin指定了则偏移量。
target: div#target 
time: 12664.099999904633
```

# 小笔记

## rootMargin

rootMargin:"-100px" & rootMargin:"100px" 说明：针对可视高度为500  
理解上与css margin有点区别

* rootMargin:"-100px" 这个观察范围变为400 此时的范围[100,500]
* rootMargin:"100px" 这个观察范围变为600 此时的范围[-100,500]
