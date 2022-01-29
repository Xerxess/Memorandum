# fetch()

https://developer.mozilla.org/en-US/docs/Web/API/fetch  
全局 fetch()方法开始从网络获取资源的过程，返回一个承诺，一旦响应可用，该承诺就会实现。

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
const fetchResponsePromise = fetch(resource [, init])
```

# Note

-

# polyfill

```js

```

# 示例

```js
const myImage = document.querySelector('img');

let myHeaders = new Headers();
myHeaders.append('Accept', 'image/jpeg');

const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

let myRequest = new Request('flowers.jpg');

fetch(myRequest, myInit).then(function(response) {
  // ...
});
```

# 笔记
