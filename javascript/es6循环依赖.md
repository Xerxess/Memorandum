# es6循环依赖

* 通过展出函数，在明确可用时执行函数。

```js
//a.mjs
import b from './b'
console.log(b())
function a(){return 'a'}
export default a
//b.mjs
import a from './a'
console.log(a())
function b(){return 'b'}
export default b
```

# webpack

* 打包后的模块import 通过引用传递，可以延迟执行解决,但后面的代码全部需要异步处理

```js
//a.mjs
import b from './b'
console.log(b())
function a(){return 'a'}
export default a

//b.mjs
import a from './a'
setTimeout(()=>{
    consoel.log(a);
},0);
console.log(a())
function b(){return 'b'}
export default b
```