
<!-- TOC -->

- [基本要素](#基本要素)
- [SVG文件的基本属性](#svg文件的基本属性)
- [web上的svg](#web上的svg)
- [SVG 文件类型](#svg-文件类型)
- [网格](#网格)
- [单位](#单位)
- [Fill 和 Stroke 属性](#fill-和-stroke-属性)
- [描边](#描边)
- [CSS 使用](#css-使用)
- [渐变](#渐变)
  - [线性渐变](#线性渐变)
  - [径向渐变](#径向渐变)
  - [渐变单元](#渐变单元)
- [基本形状](#基本形状)
  - [矩形](#矩形)
  - [圆形](#圆形)
  - [椭圆](#椭圆)
  - [线条](#线条)
  - [折线](#折线)
  - [多边形](#多边形)
  - [路径](#路径)
- [Path](#path)
  - [命令的两种表示方式](#命令的两种表示方式)
  - [曲线命令](#曲线命令)
  - [Move to 移动路径点](#move-to-移动路径点)
  - [Line to | H | V 绘制直线](#line-to--h--v-绘制直线)
  - [Z 闭合](#z-闭合)
  - [曲线命令](#曲线命令-1)
  - [C 三次贝塞尔曲线](#c-三次贝塞尔曲线)
  - [S 连接 C  三次贝塞尔曲线](#s-连接-c--三次贝塞尔曲线)
  - [Q 二次贝塞尔曲线](#q-二次贝塞尔曲线)
  - [T 连接 Q 二次贝塞尔曲线](#t-连接-q-二次贝塞尔曲线)
  - [A 弧形](#a-弧形)
- [图案](#图案)
- [TODO](#todo)
- [基础](#基础)
  - [test](#test)
  - [tspan](#tspan)
  - [g](#g)
  - [transform 属性](#transform-属性)
    - [平移](#平移)
    - [旋转](#旋转)
    - [缩放](#缩放)
    - [斜切](#斜切)
    - [matrix() #TODO](#matrix-todo)
- [SVG嵌在SVG内部](#svg嵌在svg内部)
- [剪切和遮罩](#剪切和遮罩)
- [CSS技术](#css技术)
- [其它SVG内容](#其它svg内容)
- [滤镜效果](#滤镜效果)
- [SVG 字体](#svg-字体)
  - [定义一个字体](#定义一个字体)
- [浏览器支持](#浏览器支持)
- [Inkscape](#inkscape)
- [Raphael JS](#raphael-js)

<!-- /TOC -->

参考：  
http://jvectormap.com/maps/countries/china/
https://www.naturalearthdata.com/

SVG是XML语言的一种形式，有点类似XHTML，它可以用来绘制矢量图形

http://svg-wow.org/

# 基本要素

SVG也提供了一些元素，用于定义圆形、矩形、简单或复杂的曲线，以及其他形状。
```html
<svg xmlns="http://www.w3.org/2000/svg" 
     width="150" height="100" viewBox="0 0 3 2">
  <rect width="1" height="2" x="0" fill="#008d46" />
  <rect width="1" height="2" x="1" fill="#ffffff" />
  <rect width="1" height="2" x="2" fill="#d2232c" />
</svg>
```
几个重点:
* SVG的元素和属性必须按标准格式书写，因为XML是区分大小写的（这一点和html不同）
* SVG里的属性值必须用引号引起来，就算是数值也必须这样做。

# SVG文件的基本属性

* SVG文件全局有效的规则是“后来居上”，越后面的元素越可见。
* 

# web上的svg

* 如果HTML是XHTML并且声明类型为application\/xhtml+xml，可以直接把SVG嵌入到XML源码中。
* 览器支持HTML5，同样可以直接嵌入SVG。
* 可以通过 object 元素引用SVG文件
```
<object data="image.svg" type="image/svg+xml" />
```
* 类似的也可以使用 iframe 元素引用SVG文件
```
<iframe src="image.svg"></iframe>
```
* 可以使用 img 元素 注意兼容性
* 最后SVG可以通过JavaScript动态创建并注入到HTML DOM中。

# SVG 文件类型

* .svg
* .svgz 允许gzip压缩的SVG文件

# 网格

* 与Canvas用的差不多
* 页面的左上角为(0,0)坐标点，坐标以像素为单位

# 单位

* 可以使用px em pt cm
* 使用相对大小，只需给出数字

# Fill 和 Stroke 属性

* fill 设置对象内部的颜色
* fill-opacity 透明度
* stroke 设置绘制对象的线条的颜色
* stroke-opacity 透明度
* stroke-width 宽度
------
CSS
* fill
* stroke

# 描边

* stroke-linecap="butt | square | round"
  * butt 用直边结束线段 default
  * square 效果与butt差不多
  * round 圆角
* stroke-linejoin 控制两条描边线段之间，用什么方式连接
  * butt 尖角
  * round 圆角
  * square 连接处会形成一个斜接
* stroke-dasharray 虚线类型

# CSS 使用

SVG规范将属性区分成properties和其他attributes，前者是可以用CSS设置的，后者不能。

# 渐变

* spreadMethod=pad、reflect或repeat #TODO

## 线性渐变

线性渐变沿着直线改变颜色，要插入一个线性渐变，你需要在SVG文件的defs元素内部，创建一个\<linearGradient\> 节点。

```html
<defs>
      <linearGradient id="Gradient1">
        <stop offset="0%" stop-color: red;/>
        <stop offset="50%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color: blue;/>
      </linearGradient>
</defs>

<rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient1)"/>
```

## 径向渐变

```html
<defs>
      <radialGradient id="RadialGradient1" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
      <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>
 
  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/> 
```

## 渐变单元

# 基本形状

## 矩形

```html
<rect x="10" y="10" width="30" height="30"/>

<!--  带圆角 -->
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

## 圆形 

```
<circle cx="25" cy="75" r="20"/>
```

## 椭圆

```
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

## 线条

```
<line x1="10" x2="50" y1="110" y2="150"/>
```

## 折线

```
<polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>
```

## 多边形

```
<polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/>
```

## 路径

```
<path d="M 20 230 Q 40 205, 50 230 T 90230"/>
```

# Path

```
d="M 20 230 Q 40 205, 50 230 T 90230"
```

## 命令的两种表示方式

* 大写字母，采用绝对定位
* 小写字母，采用相对定位（从上一个点开始，向上移动10，向左移动）
## 曲线命令

## Move to 移动路径点

只是将画笔移动到路径的起点,不会有绘制

```
M x y
m dx dy
```

## Line to | H | V 绘制直线

```
L x y 
l dx dy

水平方向
H x
h dx

垂直方向
V y
v dy
```

## Z 闭合

```
H
h
```

## 曲线命令

## C 三次贝塞尔曲线

```
C x1 y1, x2 y2, x y
c dx1 dy1, dx2 dy2, dx dy
```

(x1,y1)是起点的控制点，(x2,y2)是终点的控制点,坐标(x,y)表示的是曲线的终点

## S 连接 C  三次贝塞尔曲线

```
S x2 y2, x y 
s dx2 dy2, dx dy
```

S命令跟在一个C或S命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。

## Q 二次贝塞尔曲线

```
Q x1 y1, x y
q dx1 dy1, dx dy
```
* 与 C 不同之处在于只有一个控制点
(x1,y1)是控制点,坐标(x,y)表示的是曲线的终点

## T 连接 Q 二次贝塞尔曲线

```
T x y
t dx dy
```

## A 弧形

```
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```
* rx  x轴半径
* ry  y轴半径
* x-axis-rotation  x轴旋转角度
* large-arc-flag  决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。
* sweep-flag  sweep-flag表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。
* x 终点
* y 终点
--------------
* 弧形可以视为圆形或椭圆形的一部分
* 弧形可以简单地创建圆形或椭圆形图标，比如你可以创建若干片弧形，组成一个饼图。

# 图案

* \<pattern>需要放在SVG文档的\<defs>内部。
#TODO

# 基础

## test
```
<text x="10" y="10">Hello World!</text>
```

## tspan 

* 必须是一个text元素或别的tspan元素的子元素。

```
<text>
  <tspan font-weight="bold" fill="red">This is bold and red</tspan>
</text>
```

* textPath 该元素利用它的xlink:href属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走：
* x 为容器设置一个新绝对x坐标。
* dx 用一个水平偏移开始绘制文本。
* rotate 字符旋转一个角度
* textLength
* tref 

## g

* 分组 把属性赋给一整个元素集合
```
<g fill="red">
  <rect x="0" y="0" width="10" height="10" />
  <rect x="20" y="0" width="10" height="10" />
</g>
```

## transform 属性

### 平移

```css
transform="translate(30,40)
```

### 旋转
```css
transform="rotate(45)"
```

### 缩放
```css
transform="scale(.5)"
```


### 斜切

利用一个矩形制作一个斜菱形。可用skewX()变形和skewY()变形。每个需要一角度以确定元素斜切到多远。

### matrix() #TODO

# SVG嵌在SVG内部

# 剪切和遮罩

* \<clipPath>用来移除在别处定义的元素的部分内容。在这里，任何半透明效果都是不行的。它只能要么显示要么不显示。
* \<mask> 允许使用透明度和灰度值遮罩计算得的软边缘。
* opacity

# CSS技术

* 所有的SVG元素的初始display值都是inline。
* visibility和clip属性

# 其它SVG内容

* \<image>

```
<image x="90" y="-65" width="128" height="146" transform="rotate(45)"
     xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>
```

# 滤镜效果

# SVG 字体

## 定义一个字体


```xml
<font id="Font1" horiz-adv-x="1000">
  <font-face font-family="Super Sans" font-weight="bold" font-style="normal"
      units-per-em="1000" cap-height="600" x-height="400"
      ascent="700" descent="300"
      alphabetic="0" mathematical="350" ideographic="400" hanging="500">
    <font-face-src>
      <font-face-name name="Super Sans Bold"/>
    </font-face-src>
  </font-face>
  <missing-glyph><path d="M0,0h200v200h-200z"/></missing-glyph>
  <glyph unicode="!" horiz-adv-x="300"><!-- Outline of exclam. pt. glyph --></glyph>
  <glyph unicode="@"><!-- Outline of @ glyph --></glyph>
  <!-- more glyphs -->
</font>
```

# 浏览器支持

Internet Explorer 9、Mozilla Firefox、Safari、Google Chrome和Opera。基于Webkit的移动设备浏览器（主要是指iOS和Android），都支持SVG。
# Inkscape

www.inkscape.org

图形格式最重要的工具之一，是一个相当好的绘图程序。

# Raphael JS

raphaeljs.com

兼容 VML svg