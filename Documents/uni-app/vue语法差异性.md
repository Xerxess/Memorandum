<!-- TOC -->

- [生命周期](#生命周期)
- [模板语法](#模板语法)
- [data 属性](#data-属性)
- [全局变量](#全局变量)
- [Class 与 Style 绑定](#class-与-style-绑定)
- [计算属性](#计算属性)
- [条件渲染](#条件渲染)
- [列表渲染](#列表渲染)
- [key](#key)
- [事件处理器](#事件处理器)
- [表单控件绑定](#表单控件绑定)
- [组件](#组件)
- [uni-app组件](#uni-app组件)
- [全局组件](#全局组件)

<!-- /TOC -->

* 发布到H5时支持所有vue的语法；
* 发布到App和小程序时，由于平台限制，无法实现全部vue语法。

# 生命周期

完整支持 Vue 实例的生命周期

新增 '应用生命周期' 及 '页面生命周期'。查看 应用生命周期.md

建议：
* 建议使用 uni-app 的 onReady代替 vue 的 mounted。
* 建议使用 uni-app 的 onLoad 代替 vue 的 created。

# 模板语法

完整支持 Vue 模板语法。

# data 属性

必须声明为返回一个初始数据对象的函数；否则页面关闭时，数据不会自动销毁，再次打开该页面时，会显示上次数据。

# 全局变量

实现全局变量的方式需要遵循 Vue 单文件模式的开发规范

# Class 与 Style 绑定

为节约性能，我们将 Class 与 Style 的表达式通过 compiler 硬编码到 uni-app 中

* 非H5端不支持 Vue官方文档：Class 与 Style 绑定 中的 classObject 和 styleObject 语法。
* 非H5端暂不支持在自定义组件上使用 Class 与 Style 绑定

# 计算属性

完整支持 Vue官方文档：计算属性。

# 条件渲染

完整支持 Vue官方文档：条件渲染

# 列表渲染

完整vue列表渲染

# key

# 事件处理器

几乎全支持

```json
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
{
    click: 'tap',
    touchstart: 'touchstart',
    touchmove: 'touchmove',
    touchcancel: 'touchcancel',
    touchend: 'touchend',
    tap: 'tap',
    longtap: 'longtap',
    input: 'input',
    change: 'change',
    submit: 'submit',
    blur: 'blur',
    focus: 'focus',
    reset: 'reset',
    confirm: 'confirm',
    columnchange: 'columnchange',
    linechange: 'linechange',
    error: 'error',
    scrolltoupper: 'scrolltoupper',
    scrolltolower: 'scrolltolower',
    scroll: 'scroll'
}
```

* 为兼容各端，事件需使用 v-on 或 @ 的方式绑定，请勿使用小程序端的bind 和 catch 进行事件绑定。
* 事件修饰符
    * .stop：各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为
    * .prevent 仅在 H5 平台支持
    * .self：仅在 H5 平台支持
    * .once：仅在 H5 平台支持
    * .capture：仅在 H5 平台支持
    * .passive：仅在 H5 平台支持
* 若需要禁止蒙版下的页面滚动，可使用 @touchmove.stop.prevent="moveHandle"，moveHandle 可以用来处理 touchmove 的事件，也可以是一个空函数。

# 表单控件绑定

支持

# 组件

* 有且只能使用单文件组件（.vue 组件）的形式进行支持。其他的诸如：动态组件，自定义 render，和\<script type="text/x-template"\> 字符串模版等非H5端都不支持。

非H5端不支持列表：

* 暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：\<card class="class-name"\> \<\/card\> 样式是不会生效的)。
* Slot（scoped 暂时还没做支持）
* 动态组件
* 异步组件
* inline-template
* X-Templates
* keep-alive
* transition
* class
* style
* 组件里使用 slot 嵌套的其他组件时不支持 v-for

# uni-app组件

提供了丰富的UI组件 
* @change="eventName"

# 全局组件

支持配置全局组件，需在 main.js 里进行全局注册，注册后就可在所有页面里使用该组件。

* Vue.component 的第一个参数必须是静态的字符串。

* 命名限制

a
canvas
cell
content
countdown
datepicker
div
element
embed
header
image
img
indicator
input
link
list
loading-indicator
loading
marquee
meta
refresh
richtext
script
scrollable
scroller
select
slider-neighbor
slider
slot
span
spinner
style
svg
switch
tabbar
tabheader
template
text
textarea
timepicker
trisition-group
trisition
video
view
web
