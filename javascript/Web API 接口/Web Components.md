# Web Components

Web Components是一套不同的技术，允许您创建可重用的自定义元素 - 将其功能与其他代码封装在一起 - 并在Web应用程序中使用它们。

* [技术组成](#components)
    * [自定义元素](#components-1)
    * [Shadow DOM](#components-2)
    * [HTML模板](#components-3)

<h2 id="components">技术组成</h2>

<h3 id="components-1">自定义元素</h3>

CustomElementRegistry(`window.customElements`):
* CustomElementRegistry.define()
定义新的自定义元素。

(兼容性:ie11不兼容 edge.16不兼容 firefox.61需要本地设置 chrome.68兼容) `不推荐使用`

```js
customElements.define(name, constructor, options);
//name:新自定义元素的名称。请注意，自定义元素名称必须包含连字符。
//constructor:新自定义元素的构造函数。
//options:控制元素定义方式的对象。目前支持一种选择： extends：指定要扩展的内置元素名称的String。用于创建自定义内置元素。
```
* CustomElementRegistry.get()
返回指定自定义元素的构造undefined函数，或者未定义自定义元素。
* CustomElementRegistry.whenDefined()
返回promise使用给定名称定义自定义元素时解析的空值。如果已定义此类自定义元素，则会立即履行返回的承诺。

教程：  
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

简单demo:  
https://github.com/mdn/web-components-examples/tree/master/life-cycle-callbacks


<h3 id="components-2">Shadow DOM</h3>

(兼容性:ie11不兼容 edge.16不兼容 firefox.61需要本地设置 chrome.68兼容) `不推荐使用`

应用：firefox chrome中的video的默认样式就是基于Shadow DOM

Element.attachShadow()将阴影根附加到任何元素
```js
let shadow = elementRef.attachShadow({mode: 'open'});//可以从根外部的JavaScript访问影子根的元素，例如使用Element.shadowRoot
let shadow = elementRef.attachShadow({mode: 'closed'});//拒绝从其外部的JavaScript访问已关闭的影子根节点
```

<h3 id="components-3">HTML模板</h3>

`<template>和<slot>`

使用template时请使用以下检测代码：

```js
if ('content' in document.createElement('template')) {
    ...
}
```

demo:  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template

`<slot>`兼容性不行，不推荐使用

使用demo:  
https://github.com/mdn/web-components-examples/tree/master/element-details