# Eval

## 语法

```js
eval(string)
```

* 参数
    * string 表示JavaScript表达式，语句或语句序列的字符串。表达式可以包括现有对象的变量和属性。
* 返回值
    * 评估给定代码的完成值。如果完成值为空，undefined则返回。


`如果参数eval()不是字符串，则eval()返回参数不变。在以下示例中，String指定了构造函数并eval()返回一个String对象而不是计算字符串。`

```js
eval(new String('2 + 2'));//String {"2 + 2"}

eval('2 + 2');// returns 4

console.log(eval(new String('2 + 2').toString()));// returns 4
```


## 简介调用eval

```js
function test() {
    var x = 2, y = 4;
    console.log(eval('x + y'));  // 作用域在test 能找到x、y;
    var geval = eval; // equivalent to calling eval in the global scope
    console.log(geval('x + y')); // 应用强制变为window，则`x` is undefined
    (0, eval)('x + y'); // another example of Indirect call
  }
```

## Eval与window.Function

## eval作为字符串定义函数需要“（”和“）”作为前缀和后缀

```js
var fctStr1 = 'function a() {}'
var fctStr2 = '(function a() {})'
var fct1 = eval(fctStr1)  // return undefined
var fct2 = eval(fctStr2)  // return a function
```