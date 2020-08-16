<!-- TOC -->

- [Generator](#generator)
    - [Thunk](#thunk)
    - [Generator 函数的流程管理(异步)](#generator-函数的流程管理异步)
    - [基于 Promise 对象的自动执行](#基于-promise-对象的自动执行)
    - [async/await 顺序执行](#asyncawait-顺序执行)

<!-- /TOC -->

# Generator

## Thunk

Thunk 函数是自动执行 Generator 函数的一种方法。

```js
// thunk简单理解
var thunk = function() {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```

```js
// js Thunk
const Thunk = function(fn) {
  return function(...args) {
    return function(callback) {
      return fn.call(this, ...args, callback);
    };
  };
};

// 使用
// Thunk(fs.readFile) 返回一个带参数的函数
// readFileThunk(fileA) 返回一个需要回调参数的函数
// readFileThunk(fileA)(callback) 执行fs.readFile函数把fileA参数带给fs.readFile
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```

## Generator 函数的流程管理(异步)

```js
// 自动执行 Generator 函数
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next); // 将回调函数带到异步里面
  }

  next();
}

// thunk('fileA') 要是一个Thunk接收next 回调才能自动执行下一次
var g = function*() {
  var f1 = yield thunk("fileA");
  var f2 = yield thunk("fileB");
  var fn = yield thunk("fileC");
};

run(g);
```

## 基于 Promise 对象的自动执行

```js
function run(gen){
  var g = gen();
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;

    // 与thunkl回调函数不同就是.then直接处理next
    result.value.then(function(data){
      next(data);
    });
  }
  next();
}

var promise = function (fileName){
  return new Promise(function (resolve, reject){
      ...
    resolve(data);
  });
};

var gen = function* (){
  var f1 = yield promise();
  var f2 = yield promise();
};

run(gen)
```

## async/await 顺序执行

```js
async function logInOrder(array) {
  for (const url of array) {
    const response = await promise();
  }
}
```
