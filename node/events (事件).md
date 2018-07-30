# events (事件)

* [EventEmitter 类](#eventemitter)
    * 事件
        * [newListener](#newListener)
        * [removeListener](#remove-listener)
    * [emitter.addListener(eventName, listener)](#emitter-add)
    * [emitter.emit(eventName[, ...args])](#emitter-emit)
    * [emitter.eventNames()](#emitter-eventnames)
    * [emitter.off(eventName, listener)](#emitter-off)
    * [emitter.on(eventName, listener)](#emitter-on)
    * [emitter.once(eventName, listener)](#emitter-once)
    * [emitter.prependListener(eventName, listener)](#emitter-prepend)
    * [emitter.prependOnceListener(eventName, listener)](#emitter-prependonce)
    * [emitter.removeAllListeners([eventName])](#emitter-removeall)
    * [emitter.removeListener(eventName, listener)](#emitter-remove)

只罗列了部分，请请看官方完整版：  
http://nodejs.cn/api/events.html

大多数 Node.js 核心 API 都采用惯用的异步事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）。

<h2 id="eventemitter"> EventEmitter 类</h2>

EventEmitter 类由 events 模块定义和开放的：
```js
const EventEmitter = require('events');
```

<h3 id="newListener">'newListener' 事件</h3>

当新的监听器被添加时，所有的 EventEmitter 会触发 'newListener' 事件

```js
const myEmitter = new MyEmitter();
// 只处理一次，所以不会无限循环
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在开头插入一个新的监听器
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// 打印:
//   B
//   A
```

<h3 id="remove-listener">'removeListener' 事件</h3>
当移除已存在的监听器时，则触发 'removeListener'

<h3 id="emitter-add">emitter.addListener(eventName, listener)</h3>
emitter.on(eventName, listener) 的别名。

<h3 id="emitter-emit">emitter.emit(eventName[, ...args])</h3>
按监听器的注册顺序，同步地调用每个注册到名为 eventName 事件的监听器，并传入提供的参数。

如果事件有监听器，则返回 true ，否则返回 false。


<h3 id="emitter-eventnames">emitter.eventNames()</h3>
返回一个列出触发器已注册监听器的事件的数组。 数组中的值为字符串或符号。

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// 打印: [ 'foo', 'bar', Symbol(symbol) ]
```
<h3 id="emitter-off">emitter.off(eventName, listener)</h3>
emitter.removeListener()的别名

<h3 id="emitter-on">emitter.on(eventName, listener)</h3>
添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。 不会检查 listener 是否已被添加。 多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加与调用多次。

```js
server.on('connection', (stream) => {
  console.log('有连接！');
});
```

<h3 id="emitter-once">emitter.once(eventName, listener)</h3>
添加一个单次 listener 函数到名为 eventName 的事件。 下次触发 eventName 事件时，监听器会被移除，然后调用。

<h3 id="emitter-prepend">emitter.prependListener(eventName, listener)</h3>
添加 listener 函数到名为 eventName 的事件的监听器数组的开头。与.on类似，但是添加在数组前

<h3 id="emitter-prependonce">emitter.prependOnceListener(eventName, listener)</h3>
添加一个单次 listener 函数到名为 eventName 的事件的监听器数组的开头

<h3 id="emitter-removeall">emitter.removeAllListeners([eventName])</h3>
移除全部或指定 eventName 的监听器。

<h3 id="emitter-remove">emitter.removeListener(eventName, listener)</h3>
从名为 eventName 的事件的监听器数组中移除指定的 listener。

```js
const callback = (stream) => {
  console.log('有连接！');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```
