# Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

## 语法

```js
var proxy = new Proxy(target, handler);
```

```js
var obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    },
  }
);
```

## get(target, propKey, receiver)

拦截对象属性的读取，比如proxy.foo和proxy['foo']。

接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

## set(target, propKey, value, receiver)

拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

## has(target, propKey)

判断对象是否具有某个属性  
拦截propKey in proxy的操作，返回一个布尔值。

接受两个参数，分别是目标对象、需查询的属性名。

## deleteProperty(target, propKey)

拦截delete proxy[propKey]的操作，返回一个布尔值。

## ownKeys(target)

拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

## getOwnPropertyDescriptor(target, propKey)

拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

## defineProperty(target, propKey, propDesc)

拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

## preventExtensions(target)

拦截Object.preventExtensions(proxy)，返回一个布尔值。

## getPrototypeOf(target)

拦截Object.getPrototypeOf(proxy)，返回一个对象。

## isExtensible(target)

拦截Object.isExtensible(proxy)，返回一个布尔值。

## setPrototypeOf(target, proto)

拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

## apply(target, object, args)

拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

## construct(target, args)

拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)

接受三个参数:目标对象 构造函数的参数数组 创造实例对象时，new命令作用的构造函数。

## this 

Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理
