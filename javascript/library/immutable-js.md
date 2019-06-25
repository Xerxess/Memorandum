immutable-js


Readme:https://github.com/immutable-js/immutable-js

API:https://immutable-js.github.io/immutable-js/docs/#/

JavaScript的不可变集合

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

<!-- TOC -->

- [优点](#优点)
- [缺点](#缺点)
- [不可变数据结构](#不可变数据结构)
- [概念](#概念)
- [原始JavaScript对象和数组转换](#原始javascript对象和数组转换)
- [转换回原始JavaScript对象。](#转换回原始javascript对象)
- [嵌套结构](#嵌套结构)
- [将集合视为值](#将集合视为值)
- [性能权衡](#性能权衡)

<!-- /TOC -->


# 优点

* 降低 Mutable 带来的复杂度
* 节省内存空间
* Undo/Redo，Copy/Paste，随意穿越！(容易开发出撤销)
* 拥抱函数式编程

# 缺点

* 容易与原生对象混

# 不可变数据结构

* List 有序索引集，类似JavaScript中的Array。
* Stack 有序集合，支持使用unshift()和shift()添加和删除。
* Map 无序索引集，类似JavaScript中的Object。
* OrderedMap 有序的Map，根据数据的set()进行排序。
* Set 没有重复值的集合。 
* OrderedSet 有序的Set，根据数据的add进行排序
* Record 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。
* Seq: 序列，但是可能不能由具体的数据结构支持。
* Collection: 是构建所有数据结构的基类，不可以直接构建。

```html
<script src="immutable.min.js"></script>
<script>
  var map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
  var map2 = map1.set('b', 50);
  map1.get('b'); // 2
  map2.get('b'); // 50
</script>
```

# 概念

* 不可变集合应该被视为值而不是对象。

```js
fromJS(value, converter)
```

# 原始JavaScript对象和数组转换

```js
const { Map, List } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
const map2 = Map({ c: 10, a: 20, t: 30 });
const obj = { d: 100, o: 200, g: 300 };
const map3 = map1.merge(map2, obj);
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
const list1 = List([ 1, 2, 3 ]);
const list2 = List([ 4, 5, 6 ]);
const array = [ 7, 8, 9 ];
const list3 = list1.concat(list2, array);
// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

# 转换回原始JavaScript对象。

```js
const { Map, List } = require('immutable');
const deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep); // '{"a":1,"b":2,"c":[3,4,5]}'
```

# 嵌套结构

```js
const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
```

# 将集合视为值

Immutable.js集合被视为纯数据值。如果两个不可变集合表示相同的值集合，则它们被视为值相等

# 性能权衡

*　通常在大数据时性能才能体现出来