<!-- TOC -->

- [rem](#rem)
- [Default is 16px](#default-is-16px)
    - [手机屏幕比(以iphone6 为基准)](#手机屏幕比以iphone6-为基准)
- [优化计算(针对iphone6)](#优化计算针对iphone6)
- [兼容window.devicePixelRatio=[1,2,3]](#兼容windowdevicepixelratio123)
- [其他(vh,vw)](#其他vhvw)

<!-- /TOC -->

# rem
 
设计稿为：750px  
布局等份:10
即：1rem=750px/10=75px;  
即：1px=1rem/75px=0.0133333;  

```html
<html style="font-size:75px">
    <div style="width:1.3rem;height:1.3rem"></div>
</html>
```

# Default is 16px

1rem=16px;
即：1px=1rem/16=0.0625rem;  
即：iphone6s: font-size:16px;  
即：iphone5s: font-size:13.653px;  
即：iphone6s+: font-size:17.66px;  

## 手机屏幕比(以iphone6 为基准)

iphone5s:320x568  相对于iphone6s:320/375=0.85333;
iphone6s:375x667  相对于iphone6s:375/375=1;
iphone6s+:414x736 相对于iphone6s:320/375=1.104

# 优化计算(针对iphone6)

设计稿为：750px  
布局等份:x  
即：1rem=750px/x=10px;  
即：x=750px/10px=75  
* 注意稍等，如果1rem=10px浏览器不兼容font-size:10px;
* 解决方法*10，即font-size:100px;
即：x=750px/100px=7.5
即：1rem=100px;
即：1px=1rem/100px=0.01rem
* 注意iphone6的 dpr = 2
* 所写css有两个处理方式
```html
// 设计稿：750px 一个div为100px
// 方式一：
<html style="font-size:100px">
    <div style="width:.5rem;height:.5rem"></div>
    <div style="width:0.005px;"></div>
</html>

// 方式二
<html style="font-size:50px">
    <div style="width:1rem;height:1rem"></div>
    <div style="width:0.01rem"></div>
</html>
```

# 兼容window.devicePixelRatio=[1,2,3]

```js
// 设计稿基础宽度即iphone6:375*devicePixelRatio=750;
var baseWidth = 375;
var rem = 100 / (baseWidth / document.documentElement.clientWidth);
// iphone5s:rem:100/(375/320)=85.39px/window.devicePixelRatio;
// iphone6s:rem:100/(375/375)=100px/window.devicePixelRatio;
// iphone6s+:rem:100/(375/414)=110.49px/window.devicePixelRatio;
```

# 其他(vh,vw)

https://developer.mozilla.org/zh-CN/docs/Archive/CSS3

https://caniuse.com/#feat=viewport-units

* vw : 1vw 等于视口宽度的1%  
* vh : 1vh 等于视口高度的1%  
* vmin : 选取 vw 和 vh 中最小的那个  
* vmax : 选取 vw 和 vh 中最大的那个  
