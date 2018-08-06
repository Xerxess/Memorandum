# Event

* [构造函数](#constructor)
* [属性](#p)
    * [Event.bubbles](#event-bubbles)
    * [Event.cancelBub](#event-cancel)
    * [Event.cancelable](#event-cancelable)
    * [Event.composed](#event-composed)
    * [Event.currentTarget](#event-currenttarget)
    * [Event.defaultPrevented](#event-default)
    * [Event.eventPhase](#event-eventphase)
    * [Event.explicitOriginalTa](#event-explicit)
    * [Event.originalTarget ](#event-original)
    * [Event.returnVal IE专用](#event-return)
    * [Event.srcEleme IE专用](#event-src)
    * [Event.target](#event-target)
    * [Event.timeStamp](#event-time)
    * [Event.type](#event-type)
    * [Event.isTrusted](#event-istrusted)
* [方法](#m)
    * [Event.createEvent()](#event-m-1)
    * [Event.composedPath()](#event-m-2)
    * [Event.initEvent()](#event-m-3)
    * [Event.preventDefault()](#event-m-4)
    * [Event.stopPropagation()](#event-m-5)
* [MDN web docs](#other)
    * [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
    * [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
    * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
    * [自定义事件实例](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)

<h2 id="constructor">构造函数</h2>

```js
event = new Event(typeArg,eventInit);
```

* `typeArg` 这是DOMString表示事件的名称。
* `eventInit`  可选 这是一EventInit本字典，包含以下字段：
    * bubbles:(可选）Boolean指示事件是否冒泡。默认是false。
    * cancelable:(可选）Boolean指示是否可以取消事件。默认是false。
    * composed:(可选）a Boolean指示事件是否将触发阴影根之外的侦听器（Event.composed有关详细信息，请参阅参考资料）。默认是false。

```js
// 创建一个冒泡并且无法取消的外观事件
var evt = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(evt);

// 事件可以从任何元素调度，而不仅仅是document
myDiv.dispatchEvent(evt);
```

<h2 id="p">属性</h2>

<h3 id="event-bubbles">Event.bubbles 只读</h3>
一个布尔值，指示事件是否通过DOM冒泡。

<h3 id="event-cancel">Event.cancelBubble</h3>
一个历史别名Event.stopPropagation()。true在从事件处理程序返回之前将其值设置为阻止事件的传播。

<h3 id="event-cancelable">Event.cancelable 只读</h3>
一个布尔值，指示事件是否可取消。

<h3 id="event-composed">Event.composed 只读</h3>
一个布尔值，指示事件是否可以在shadow DOM和常规DOM之间的边界上冒泡。

<h3 id="event-current">Event.currentTarget 只读</h3>
对当前注册的事件目标的引用。这是当前要发送事件的对象; 通过重新定位，这可能会发生变化。

<h3 id="event-deep">Event.deepPath </h3>
一个ArrayDOM的Nodes到该事件已经起泡。

<h3 id="event-default">Event.defaultPrevented 只读</h3>
指示是否event.preventDefault()已在事件上调用。

<h3 id="event-eventphase">Event.eventPhase 只读</h3>
指示正在处理事件流的哪个阶段。

<h3 id="event-explicit">Event.explicitOriginalTarget  只读</h3>
事件的显式原始目标（特定于Mozilla）。

<h3 id="event-original">Event.originalTarget  只读</h3>
事件的原始目标，在任何重定向之前（特定于Mozilla）。

<h3 id="event-return">Event.returnValue </h3>
非标准替代方案（从旧版本的Microsoft Internet Explorer）到Event.preventDefault()和Event.defaultPrevented。

<h3 id="event-src">Event.srcElement </h3>
非标准别名（来自旧版本的Microsoft Internet Explorer）Event.target，在其他一些浏览器中开始支持这些别名以实现Web兼容性目的。

<h3 id="event-target">Event.target 只读</h3>
对最初分派事件的目标的引用。

<h3 id="event-time">Event.timeStamp 只读</h3>
创建事件的时间（以毫秒为单位）。根据规范，这个值是自纪元以来的时间，但实际上浏览器的定义各不相同; 此外，正在努力改变这一点DOMHighResTimeStamp。

<h3 id="event-type">Event.type 只读</h3>
事件的名称（不区分大小写）。

<h3 id="event-istrusted">Event.isTrusted 只读</h3>
指示事件是由浏览器（例如在用户单击后）还是由脚本（使用事件创建方法，如event.initEvent）启动的。


<h2 id="m">方法</h2>

<h3 id="event-m-1">Event.createEvent()</h3>
创建一个新事件，然后必须通过调用其initEvent() 方法对其进行初始化。

```js
    document.createEvent(type);
```
<h3 id="event-m-2">Event.composedPath()</h3>
返回事件的路径（将调用侦听器的对象）。如果阴影根是在ShadowRoot.mode关闭的情况下创建的，则不包括阴影树中的节点。

<h3 id="event-m-3">Event.initEvent()</h3>

```js
event.initEvent(type, bubbles, cancelable);
```

* type
是定义事件类型的DOMString

* bubbles
是一个布尔值，决定事件是否应该通过事件链冒泡。设置后，只读属性Event.bubbles将给出其值。

* cancelable
是一个布尔值，用于定义是否可以取消事件。设置后，只读属性Event.cancelable将给出其值。

<h3 id="event-m-4">Event.preventDefault()</h3>
阻止默认行为 如 `<a>`点击跳转

<h3 id="event-m-5">Event.stopPropagation()</h3>
防止当前事件在捕获和冒泡阶段中进一步传播。
