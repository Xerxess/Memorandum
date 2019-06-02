# JAVASCRIPT STYLE (ES5)

## 硬性要求

## String (字符串)

* 对string用单引号 ''
```js
var myStr = '我被定义了';
```
* 以编程方式构建字符串时，请使用Array＃join而不是字符串连接。
```js
var arrayStr = ['<span>','myName is','</span>'];
return arrayStr.join('');
```

## Arrays (数组)

* 定义[ ];
```js
var myArray = [];
```
* 当您需要复制数组时，请使用Array＃slice
* 要将类数组对象转换为数组，请使用Array＃slice。


## Function (函数)
* 函数表达式
```js
var myFunction = function(){

}
```
* 永远不要在非功能块中声明一个函数（if，while等）。


## Objects (对象)

* 创建 {}
```js
const myObject = {};
```
* 不要使用保留字作为键。
* 访问屬性
    * 访问属性时使用.表示法。
    * 变量访问属性使用下标表示法[]。
    * 需要帶參數存取屬性時請使用中括號[]。
```js
var luke = {
  jedi: true,
  age: 28
};

var isJedi = luke.jedi;//使用点表示法

var key='age';
var age=luke[key];//变量访问属性
```


## Variables （变量）

    為了避免污染全域的命名空間，請使用 var 來宣告變數，如果不這麼做將會產生全域變數。
    每個變數只使用一個 var 來宣告，這樣更容易增加新的變數宣告，而且你也不用擔心替換 ;

## 比较

* 使用 === 和 !== ，不得使用 == 及 != 
```js
if(a===b){

}
```

## Blocks（块）
* 对所有多行块使用大括号。
* 如果你使用带if和else的多行块，则将else放在与if块的右括号相同的行上。

## Comments （注释）(可参考jsdoc3)

 * 使用/ ** ... * /进行多行注释。包括描述，指定所有参数的类型和值以及返回值。
 ```js
/**
 * I`m is method 
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
var myMethod = function(a, b){
    //code ...
}
 ```
 * 使用//进行单行注释。将单行注释放在注释主题上方的换行符上。在注释前面加一个空行。
 ```js
/**
 * I`m is method 
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
var myMethod = function(a, b){
    // 单行注释
    // 多行单行注释
    // code ...
}
 ```
 * 使用// FIXME：注释问题。
 * 使用// TODO：注释问题的解决方案。

 ## Whitespace （空格）斩时无要求

 ## Commas (逗号)

 ## Type Casting & Coercion（类型转换）

## Naming Conventions （命名约定）

* 避免单个字母名称。用你的命名描述。
* 在命名对象，函数和实例时使用camelCase。
* 在命名构造函数或类时使用PascalCase。
* 不要使用尾随或前导下划线。
* 不要保存对此的引用。使用Function＃bind。
* 如果您的文件导出单个类，则您的文件名应该是该类的名称。

## Accessors （访问器）
* 不需要属性的访问器功能。
* 如果你做了访问器函数，请使用getVal（）和setVal（'hello'）。
* 如果属性是布尔值，请使用isVal（）或hasVal（）。
* 创建get（）和set（）函数是可以的，但要保持一致。

## Constructors （构造函数）

* 将方法分配给原型对象，而不是用新对象覆盖原型。覆盖原型使继承变得不可能：通过重置原型，你将覆盖基础！
* 方法可以返回此方法以帮助方法链接。
* 编写自定义toString（）方法是可以的，只需确保它成功运行并且不会产生副作用。

## Events （事件）

## （Modules）模块

* 该文件应使用camelCase命名，位于具有相同名称的文件夹中，并匹配单个导出的名称。
* 始终声明'使用严格';在模块的顶部。

## jQuery

* 使用$前缀jQuery对象变量
* 缓存jQuery查找
* 使用带有作用域jQuery对象查询的find