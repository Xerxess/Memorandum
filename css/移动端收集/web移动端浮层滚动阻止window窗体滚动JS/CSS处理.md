

## 方法1 overscroll-behavior 兼容性不行

* auto - 默认。元素的滚动会传播给祖先元素。

*contain - 阻止滚动链接。滚动不会传播给祖先，但会显示元素内的原生效果。例如，Android 上的炫光效果或 iOS 上的回弹效果，当用户触摸滚动边界时会通知用户。注意：overscroll-behavior: contain 在 html 元素上使用可防止滚动导航操作。

none - 和 contain 一样，但它也可以防止节点本身的滚动效果（例如 Android 炫光或 iOS 回弹）


## 方法2：部浏览器无效

```css
.noscroll,
.noscroll body {
    overflow: hidden;
}
.noscroll body {
    position: relative;
}
```