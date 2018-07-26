# Js备忘录

* [RegExp 构造函数](#regexp)
    * [语法](#regexp1)
    * [flags](#regexp2)
    * [RegExp 实例](#regexp3)
    * [RegExp.prototype.exec()与String.match(regexp)](#regexp4)
* [String 简单方法](#string)
* [Global](#global)
* [Array](#array)
* [DOM Event](#domevent)
* [Location](#location)
* [String](#string2)
* [Number](#number)
* [Math](#math)
* [Date](#date)
* [严格模式](#usestrict)
* [EVAL](#eval)
* [JSON](#json)
* [Promise](#promise)
* [Object](#object)
    * [Methods](#object1)
        * [Object.assign](#object1-1)
    * [Methods](#object2)
    * [Methods](#object3)
    * [Methods](#object4)
    * [Methods](#object5)
    * [Methods](#object6)
    * [Methods](#object7)
    * [Methods](#object8)
    * [Methods](#object9)
    * [Methods](#object10)
    * [Methods](#object11)
    * [Methods](#object12)
    * [Methods](#object13)
    * [Methods](#object14)
* [with](#with)
* [typeof](#typeof)
* [运算符: +x](#yunsuan)
* [in](#in)
* [instanceof](#instanceof)
* [','逗号](#douhao)
* [es5-shim](#shim)
* [Function](#function)
    * [函数声明](#function1)
    * [IIFE](#function2)
    * [箭头函数](#function3)
    * [构造函数](#function4)
    * [arguments对象](#function5)


> <i id=""></i><span id="regexp">RegExp 构造函数</span> 

<i id=""></i><span id="regexp1"></span>语法：
```
1./pattern/flags
2.new RegExp(pattern [, flags])
3.RegExp(pattern [, flags])
```

<span class="red">*注</span>：除'语法1',pattern注意转义

``` javascript
var reg1 = new RegExp(/\d\D\w\W\s/,'g');
console.log(reg1.toString()); 
// '/dDwWs/g'

var reg2 = new RegExp(/\\d\\D\\w\\W\\s/,'g');
console.log(reg1.toString()); 
// '/\d\D\w\W\s/g'

var reg3 = new RegExp(/\d\D\w\W\s/,'g');
console.log(reg3.toString()); 
// '/\d\D\w\W\s/g'

var reg4 = new RegExp(/\\d\\D\\w\\W\\s/,'g');
console.log(reg4.toString());
// '/\\d\\D\\w\\W\\s/g'
```

<i id=""></i><span id="regexp2"></span>flags：
```
g：全局匹配;找到所有匹配，而不是在第一个匹配后停止  
i：忽略大小写  
m：多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。  
u：Unicode; 将模式视为Unicode序列点的序列  
y：粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex  属性指示的索引(并且不尝试从任何后续的索引匹配)。
```

<i id=""></i><span id="regexp3"></span>RegExp 实例

```
RegExp.prototype.constructor 创建该正则对象的构造函数。

RegExp.prototype.global 是否开启全局匹配，也就是匹配目标字符串中所有可能的匹配项，而不是只进行第一次匹配。

RegExp.prototype.ignoreCase 在匹配字符串时是否要忽略字符的大小写。

RegExp.prototype.lastIndex 下次匹配开始的字符串索引位置。

RegExp.prototype.multiline 是否开启多行模式匹配（影响 ^ 和 $ 的行为）。

RegExp.prototype.source 正则对象的源模式文本。

RegExp.prototype.sticky 是否开启粘滞匹配。
```

> 方法

* RegExp.prototype.exec()在目标字符串中执行一次正则匹配操作。

``` javascript
var regexObj=/s/;
var result=regexObj.exec(str);
```

```
result:{
'0':'匹配的全部字符串',
'[1], ...[n ]':'括号中的分组捕获',
index:'匹配到的字符位于原始字符串的基于0的索引值',
input:'原始字符串'
}

regexObj:{
lastIndex:'下一次匹配开始的位置',
ignoreCase:'是否使用了 "i" 标记使正则匹配忽略大小写',
global:'是否使用了 "g" 标记来进行全局的匹配.',
multiline:'是否使用了 "m" 标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。）',
source:'正则匹配的字符串'
}
```

> <i id=""></i><span id="regexp4"></span>RegExp.prototype.exec()与String.match(regexp);  
<span class="red">*注:regexp是不是全局模式时，返回结果相同</span>

``` javascript
// /\d/.exec('123')=='123'.match(/\d/);返回的结果相同
// /\d/g.exec('123')=='123'.match(/\d/g); 返回的结果不同
//regexp是不是全局模式时，返回结果相同

console.log(/\d/.exec('123'));
//["1", index: 0, input: "123", groups: undefined]

console.log('123'.match(/\d/));
//["1", index: 0, input: "123", groups: undefined]

console.log(/\d/g.exec('123'));
// ["1", index: 0, input: "123", groups: undefined]
//获得下一次匹配RegExp.exec();

console.log('123'.match(/\d/g));
//["1", "2", "3"]
```


例2：
```javascript
var str='1a2b3c4d5e6f7g8f9h';
var reg=/(\d(\D)*)/;

console.log(reg.exec(str)); //["1a", "1a", "a", index: 0, input: "1a2b3c4d5e6f7g8f9h", groups: undefined]

console.log(str.match(reg));//["1a", "1a", "a", index: 0, input: "1a2b3c4d5e6f7g8f9h", groups: undefined]

var str='1a2b3c4d5e6f7g8f9h';
var reg=/(\d(\D)*)/g;
console.log(reg.exec(str)); //["1a", "1a", "a", index: 0, input: "1a2b3c4d5e6f7g8f9h", groups: undefined]

console.log(str.match(reg));//["1a", "2b", "3c", "4d", "5e", "6f", "7g", "8f", "9h"]

//regexp是(g)全局模式时reg.exec()返回的结果第一个匹配的结果，需要获得下一个匹配结果需要再次reg.exec();
//str.match(reg)则是返回所匹配的结果数组;
```

* RegExp.prototype.test()测试当前正则是否能匹配目标字符串。
* RegExp.prototype.toSource()返回一个字符串，其值为该正则对象的字面量形式。覆盖了Object.prototype.toSource 方法.
* RegExp.prototype.toString()返回一个字符串，其值为该正则对象的字面量形式。覆盖了Object.prototype.toString() 方法。

><i id=""></i><span id="string">String</span>

 * string.substr(start, length) 一个字符串的副本，包括从string的start处(包括start所指的字符)开始的1ength个字符。如果没有指定length，返回的字符串包含从start到string结尾的字符，-1指字符串中的最后—个字符，-2指倒数第二个字符  
* string.substring(from, to) 返回字符串string的子串，由from到to之间的字符构成， 包括位于from的字符，不包括位于to的字符。
string.slice(start, end) 从start开始(包括start)到end为止(不包 括end)的所有字符。(-1指字符串中的最后一个字符，-2指倒数第二个字符)

> <i id=""></i>Global 全局属性

* Infinity 表示正无穷大的数值。  
* NaN 非数字值  
* undefined 未定义的值  

> for...in 顺序遍历一个对象的可枚举属性  
> for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

> <i id=""></i><span id="array"/>Array

## Array.prototype

* arr.fill(value[, start[, end]])用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。[Result:Array] [Browser：polyfill]


```javascript
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
```

* arr.pop()删除数组的最后一个元素，并返回这个元素。[Result:ArrayItem]

```js
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish); 
// ["angel", "clown", "mandarin"]

console.log(popped); 
// surgeon
```

* arr.push(element1, ..., elementN)在数组的末尾增加一个或多个元素，并返回数组的新长度。[Result:length] 

```js
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports); 
// ["soccer", "baseball", "football", "swimming"]

console.log(total);  
// 4
```

* arr.reverse()颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。[Result:Array]

```js
var myArray = ['one', 'two', 'three'];
myArray.reverse(); 

console.log(myArray) // ['three', 'two', 'one']
```

* arr.shift()删除数组的第一个元素，并返回这个元素。[Result:arrayItem]

```js
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 shift 之前: ' + myFish);
// "调用 shift 之前: angel,clown,mandarin,surgeon"

var shifted = myFish.shift(); 

console.log('调用 shift 之后: ' + myFish); 
// "调用 shift 之后: clown,mandarin,surgeon" 

console.log('被删除的元素: ' + shifted); 
// "被删除的元素: angel"
```

* arr.sort([compareFunction])排序 compareFunction可选。用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。[Result:Array]  
1.没有指明 compareFunction 元素会按照转换为的字符串的诸个字符的Unicode位点进行排序;  
2.指明了 compareFunction：  
    * 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；  
    * 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。

```js
var numbers = [4, 2, 5, 1, 3];
var numbers2 = [4, 2, 5, 1, 3];
numbers.sort();
numbers2.sort(function(a, b) {
  return a - b;
});
console.log(numbers);//[1, 2, 3, 4, 5]
console.log(numbers2);// [1, 2, 3, 4, 5]
```

* array.splice(start[, deleteCount[, item1[, item2[, ...]]]])删除现有元素和/或添加新元素来更改一个数组的内容。[Result:RemoveArrayItems]

  * 注：splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。

```js
//从第2位开始删除0个元素，插入“drum”
var myFish = ["angel", "clown", "mandarin", "surgeon"]; 
var removed = myFish.splice(2, 0, "drum"); 
//myFish:["angel", "clown", "drum", "mandarin", "surgeon"] 
//被删除元素数组：[]，没有元素被删除
```

```js
//从第3位开始删除1个元素
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);
//myFish：["angel", "clown", "drum", "sturgeon"]
//被删除元素数组：["mandarin"]
```

* arr.unshift(element1, ..., elementN)将一个或多个元素添加到数组的开头，并返回新数组的长度。[Result:length] 

```js
var arr = [1, 2];

arr.unshift(0); 
//arr is [0, 1, 2]

arr.unshift(-2, -1); // = 5
//arr is [-2, -1, 0, 1, 2]
```

* arr.concat(value1[, value2[, ...[, valueN]]])用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。[Result:newArray]

    `concat`方法不会改变this或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。
    * `对象引用` 对象内容随对象修改
    * `数据类型如字符串，数字和布尔`（不是String，Number 和 Boolean 对象）内容不变

```js
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];

alpha.concat(numeric);
// result in ['a', 'b', 'c', 1, 2, 3]
```

* arr.includes(searchElement)||arr.includes(searchElement, fromIndex)判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。[Result:Boolean] [Browser：polyfill]

```js
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

* arr.join(separator) 连接所有数组元素组成一个字符串。默认是','隔开[Result:string]

```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
```

* arr.slice(begin, end)抽取当前数组中的一段元素组合成一个新数组。[Result:newArray]

    抽取规则（包含begin，但不包含end）  
    slice 不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：
    * 对象引用 内容跟随原对象
    * 字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象）不变

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```

* arr.toString()返回一个由所有数组元素组合而成的字符串 该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成[Result:string] 

```js
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr'];
var myVar = monthNames.toString(); // assigns "Jan,Feb,Mar,Apr" to myVar.
```

* arr.indexOf()返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。[Result:index] [Browser：polyfill]

```js
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```
* arr.lastIndexOf()返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。[Result:Array] [Browser：polyfill]

## 迭代方法


* array.forEach(callback, this) 对数组的每个元素执行一次提供的函数
[Result:Array] [Browser：polyfill] 

        callback:function(currentValue, index, array){}  

  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  **没有办法中止或者跳出 `forEach 循环`，除了抛出一个异常。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。**

```js
function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}

[2, 5, ,9].forEach(logArrayElements);

// a[0] = 2
// a[1] = 5
// a[3] = 9
```


* arr.every(callback[, thisArg])测试数组的所有元素是否都通过了指定函数的测试
[Result:Boolean] [Browser：polyfill]

       callback:function(currentValue, index, array){}  
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  数组中的每个元素执行一次 callback 函数，直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。  

  **`every` 不会改变原数组。**

```js
function isBigEnough(element, index, array) {
  return (element >= 10);
}

var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false

passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
  ```

* arr.some(callback[, thisArg])测试数组中的某些元素是否通过由提供的函数实现的测试。[Result:Boolean] [Browser：polyfill]

       callback:function(currentValue, index, array){}  
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。 

  **`some` 不会改变原数组。**

```js 
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false 

[12, 5, 8, 1, 4].some(isBiggerThan10); // true  
  ```


* arr.filter(callback[, thisArg])创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 [Result:newArray] [Browser：polyfill]

      callback:function(currentValue, index, array){}  
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。

  **`filter` 不会改变原数组，它返回过滤后的新数组。**

```js
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```


* arr.find(callback[, thisArg])返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
[Result:ArrayItem] [Browser：polyfill]

      callback:function(currentValue, index, array){}  
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  对数组中的每一项元素执行一次 callback 函数，直至有一个 callback 返回 true。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。

  **`find` 方法不会改变数组**

```js
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) { 
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); 
// { name: 'cherries', quantity: 5 }
```



* arr.findIndex(callback[, thisArg])返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
[Result:index] [Browser：polyfill]

      callback:function(currentValue, index, array){}  
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  对数组中的每个数组索引0..length-1（包括）执行一次callback函数，直到找到一个callback函数返回真实值（强制为true）的值。如果找到这样的元素，findIndex会立即返回该元素的索引。如果回调从不返回真值，或者数组的length为0，则findIndex返回-1。

  **`findIndex` 不会修改所调用的数组。**

```js
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```



* arr.map(function callback(currentValue, index, array) { }[, thisArg])创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。[Result:newArray] [Browser：polyfill]

      callback:function(currentValue, index, array){}  
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。

  **注`map` 不修改调用它的原数组本身**

```js
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});

console.log(doubles);
// doubles数组的值为： [2, 8, 18]
```



* arr.reduce(callback[, initialValue])对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。[Result:result] [Browser：polyfill]

      callback:function(accumulator,currentValue, index, array){}  
  * accumulator:累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
  * currentValue:数组当前项的值。  
  * index:数组当前项的索引。  
  * array:数组对象本身。 

  initialValue参数：**初始值**  callback第一次回调时 accumulator参数初始值  
 
```js
var sum = [0, 1, 2, 3].reduce(function (a, b) {
  return a + b;
}, 0);
// sum is 6
```

```js
//数组去重
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current)=>{
    if(init.length===0 || init[init.length-1]!==current){
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```


* arr.reduceRight(callback[, initialValue])
[Result:result] [Browser：polyfill]
相对与arr.reduce（）向右开始



# <i id=""></i><sapn id="domevent"/>DOM Event


## <i id=""></i><sapn id="location"/>Location

#### Properties

* URLUtils.href 包含整个URL的一个DOMString  
* URLUtils.protocol 包含URL对应协议包含":"。  
* URLUtils.host 包含了域名带有一个":"并跟上URL的端口号。  
* URLUtils.hostname 包含URL域名。  
* URLUtils.port 端口号。  
* URLUtils.pathname 包含URL中路径部分有一个“/"。  
* URLUtils.search 包含URL参数的一个DOMString，开头有一个“?”。  
* URLUtils.hash 包含块标识符的DOMString，开头有一个“#”。  
* URLUtils.username  
* URLUtils.password  
* URLUtils.origin(只读)  

#### Methods

* Location.assign() 触发窗口加载并显示指定的URL的内容  
* Location.reload(forcedReload[bool])用来刷新当前页面。该方法只有一个参数，当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面。该方法在跨域调用（执行该方法的脚本文件的域和 Location 对象所在页面的跨不同）时，将会抛出 DOMException 异常。  
* Location.replace() 给定的URL来替换当前的资源。 与assign() 方法 不同的是调用replace()方法后，当前页面不会保存到会话历史中（session History），这样用户点击回退按钮将不会再跳转到该页面。  
* URLUtils.toString() === URLUtils.href  

```js
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';  
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // (blank - https assumes port 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org
```

## <i id=""></i><sapn id="string2"/>String

转义字符
column0 | column1
------- | -------
Code | Output
\0 | 空字符
\' | 单引号
\" | 双引号
\\ | 反斜杠
\n | 换行
\r | 回车
\v | 垂直制表符
\t | 水平制表符
\b | 退格
\f | 换页
\uXXXX | unicode 码
\u{X} ... \u{XXXXXX} | unicode codepoint 
\xXX | Latin-1 字符(x小写)

### 方法

> String.fromCharCode()   
通过一串 Unicode 创建字符串

```js
console.log(String.fromCharCode(20013));//十进制 '中'
console.log(String.fromCharCode(0b100111000101101));//二进制 '中'
console.log(String.fromCharCode(0o47055));//吧进制 '中'
console.log(String.fromCharCode(0x4e2d));//十六进制 '中'
console.log(String.fromCharCode(65,66,67));//'ABC'
```
 ### 实例

 > str.charAt(index) 从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 stringName 中）的索引值为 stringName.length - 1。

```js 
var anyString = "Brave new world";
console.log(anyString.charAt(0)); //'B'
```

> str.charCodeAt(index) 返回给定索引处（String中index索引处）字符的 UTF-16 代码单元值的数字；

```js
"ABC".charCodeAt(0) // returns 65:"A"

"ABC".charCodeAt(1) // returns 66:"B"

"ABC".charCodeAt(2) // returns 67:"C"

"ABC".charCodeAt(3) // returns NaN
```

> str.codePointAt(pos)  [Browser：polyfill]

* JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
```js
var s = "𠮷";//4字节字符
s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271//


let s = '𠮷a';
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97
```

> str.concat(string2, string3[, ..., stringN])
```js
var hello = "Hello, ";
console.log(hello.concat("Kevin", " have a nice day.")); /* Hello, Kevin have a nice day. */
```

> str.includes(searchString[, position]) 如果当前字符串包含被搜寻的字符串，就返回true；否则，返回false。[Browser：polyfill]

```js
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false
```

> str.endsWith(searchString [, position]);判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。[Browser：polyfill]

#### 参数
 * searchString 要搜索的子字符串。
 * position在 str 中搜索 searchString 的结束位置，默认值为 str.length，也就是真正的字符串结尾处。

 ```js
 var str = "To be, or not to be, that is the question.";

alert( str.endsWith("question.") );  // true
alert( str.endsWith("to be") );      // false
alert( str.endsWith("to be", 19) );  // true
alert( str.endsWith("To be", 5) );   // true
 ```

 > str.indexOf(searchValue[, fromIndex])
 ```js
 "Blue Whale".indexOf("Blue");     // returns  0
"Blue Whale".indexOf("Blute");    // returns -1
"Blue Whale".indexOf("Whale", 0); // returns  5
"Blue Whale".indexOf("Whale", 5); // returns  5
"Blue Whale".indexOf("", 9);      // returns  9
"Blue Whale".indexOf("", 10);     // returns 10
"Blue Whale".indexOf("", 11);     // returns 10
 ```

 > str.lastIndexOf(searchValue[, fromIndex]) 从该字符串的`后面向前`查找，从 fromIndex 处开始[Browser：polyfill]
```js
"canal".lastIndexOf("a")   // returns 3
"canal".lastIndexOf("a",2) // returns 1
"canal".lastIndexOf("a",0) // returns -1
"canal".lastIndexOf("x")   // returns -1
```

> referenceStr.localeCompare(compareString[, locales[, options]]) 返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。[Browser：polyfill]
```js
// The letter "a" is before "c" yielding a negative value
'a'.localeCompare('c'); 
// -2 or -1 (or some other negative value)

// Alphabetically the word "check" comes after "against" yielding a positive value
'check'.localeCompare('against'); 
// 2 or 1 (or some other positive value)

// "a" and "a" are equivalent yielding a neutral value of zero
'a'.localeCompare('a'); 
// 0
```
> str.match(regexp); 与一个正则表达式匹配时， match()方法检索匹配项

> str.normalize([form]);按照指定的一种 Unicode 正规形式将当前字符串正规化.[Browser：polyfill]
* form:四种 Unicode 正规形式 "NFC", "NFD", "NFKC", 以及 "NFKD" 其中的一个, 默认值为 "NFC".

> str.padEnd(targetLength [, padString]) 用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。[Browser：polyfill]
  #### 参数
* targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
* padString 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。
```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

> str.padStart(targetLength [, padString]) 用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。同`str.padEnd` [Browser：polyfill]
```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

> str.repeat(count); 返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。[Browser：polyfill]
```js
"abc".repeat(-1)     // RangeError: repeat count must be positive and less than inifinity
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数.
"abc".repeat(1/0)    // RangeError: repeat count must be positive and less than inifinity
```

> str.replace(regexp|substr, newSubStr|function) 返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。
* 使用字符串作为参数  
替换字符串可以插入下面的特殊变量名：
    * $$ 插入一个 "$"
    * $& 插入匹配的子串
    * $` 插入当前匹配的子串左边的内容
    * $' 插入当前匹配的子串右边的内容
    * $n 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。

* 指定一个函数作为参数 function(){match,[p1,p2, ...],offset,string}
    * match 匹配的子串。
    * [p1,p2, ...] 对应于$1，$2等
    * offset 匹配到的子字符串在原字符串中的偏移量。
    * string 被匹配的原字符串


```js
var re = /(\w+)\s(\w+)/;
var str = "@ John Smith $";
// Smith, John
console.log(str.replace(re, "$$, $1"));//@ $, John $
console.log(str.replace(re, "$&, $1"));//@ John Smith, John $
console.log(str.replace(re, "$`, $1"));//@ @ , John $
console.log(str.replace(re, "$', $1"));//@  $, John $
console.log(str.replace(re, "$2, $1"));//@ Smith, John $
```

```js
//function(){match,[p1,p2, ...],offset,string}
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  console.log(arguments);
  //["abc12345#$*%", "abc", "12345", "#$*%", 0, "abc12345#$*%"]
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

> str.search(regexp); 执行正则表达式和 String对象之间的一个搜索匹配

> str.slice(beginSlice[, endSlice]);提取一个字符串的一部分，并返回一新的字符串。`包括beginSlice`但`不包括 endSlice`

> str.substr(start[, length]); 返回一个字符串中从指定位置开始到指定字符数的字符

> str.substring(indexStart[, indexEnd]);返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。`从 indexStart 到 indexEnd（不包括）之间的字符`

> str.split([separator[, limit]]); 使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。
#### 参数
* separator 可以是一个字符串或正则表达式
* limit 一个整数，限定返回的分割片段数量

> str.startsWith(searchString [, position]); 判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。[Browser：polyfill]
```js
var str = "To be, or not to be, that is the question.";

alert(str.startsWith("To be"));         // true
alert(str.startsWith("not to be"));     // false
alert(str.startsWith("not to be", 10)); // true
```

> str.toLocaleLowerCase();根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。toLowerCase的返回值是一致的。

```js
console.log('ALPHABET'.toLocaleLowerCase()); 
// 'alphabet'

console.log('中文简体 zh-CN || zh-Hans'.toLocaleLowerCase());
// '中文简体 zh-cn || zh-hans'
```

> str.toLowerCase(); toLowerCase 会将调用该方法的字符串值转为小写形式，并返回。toLowerCase 不会影响字符串本身的值

> str.toLocaleUpperCase(); 使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串。toUpperCase的返回值是一致的。

```js
console.log('alphabet'.toLocaleUpperCase()); // 'ALPHABET'
```

> str.toUpperCase(); toUpperCase 将调用该方法的字符串值转换为大写形式，并返回。toUpperCase 方法不影响字符串本身的值。

> str.trim();从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。[Browser：polyfill]

```js
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'

// 另一个.trim()例子，只从一边删除

var orig = 'foo    ';
console.log(orig.trim()); // 'foo'
```

> string.trimLeft();从一个字符串的左端移除空白字符。[Browser：polyfill]
> string.trimRight();从一个字符串的右端移除空白字符。[Browser：polyfill]


### 模板字符串

```js
//传统的 JavaScript 语言，输出模板通常是这样写的
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```
```js
//ES6 引入了模板字符串
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

## <i id=""></i><sapn id="number"/>Number

#### Methods
* Number.parseFloat(string) 和全局对象 parseFloat() 一样。 需要被解析成为浮点数的字符串.  
* Number.parseInt(string[, radix])和全局对象 parseInt() 一样。返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。radix基数 比如参数"10"表示使用我们通常使用的十进制数值系统。  

```js
// radix为指定基数，说明字符串为多少进制的数字表示。

let strObj = '101101';

console.log(Number.parseInt(strObj, 2)); // 45

console.log(Number.parseInt(strObj, 10)); // 101101

console.log(Number.parseInt(strObj, 16)); // 1052929
```

* Number.isFinite()确定传递的值类型及本身是否是有限数。  
* Number.isInteger()确定传递的值类型是“number”，且是整数。  
* Number.isNaN(value)确定传递的值是否是 NaN。   和全局函数 isNaN() 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 NaN 的时候才会返回 true。  

```js
//和全局函数 isNaN() 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 NaN 的时候才会返回 true。
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// 下面这几个如果使用全局的 isNaN() 时，会返回 true。
Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

* Number.isSafeInteger()
* Number.toFixed(digits)使用定点表示法来格式化一个数 digits(0-20 default:0);



#### <i id=""></i><sapn id="math"/>Math
* Math.abs()绝对值
* sin(), cos(), tan() 正三角
* asin(), acos(), atan(), atan2()反三角
* sinh(), cosh(), tanh()双曲
* asinh(), acosh(), atanh()
* Math.floor() 向下取整
* Math.ceil()向上取整
* Math.round()四舍五入
* Math.random() 返回0到1之间的伪随机数.  

```js
//返回了一个在指定值之间的随机整数(包含min和max)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
```

* Math.sign() 返回x的符号函数, 判定x是正数,负数还是0.



## <i id=""></i><sapn id="date"/>Date
UTC **世界协调时间** GMT **格林威治标准时间**(UTC==GMT 北京时间=UTC+8时差)
```js
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
```
```js
//获得时间毫秒
console.log(Date.now());
console.log(+new Date());
console.log(new Date().getTime());
console.log(new Date().valueOf());
console.log(Date.UTC(2018, 5, 4, 14, 40, 20, 100));//不常用
```

```js
var today = new Date(2018,6,28,18,55,59,500);
//var today = new Date();
console.log(today.getFullYear());//2018
console.log(today.getMonth());//6 实际月份为6+1 原因是所引是从0开始
console.log(today.getDate());//28
console.log(today.getHours());//18
console.log(today.getMinutes());//55
console.log(today.getSeconds());//59
console.log(today.getMilliseconds());//500
console.log(today.getDay());//一周的第几天，(星期天是0)
```


## <i id=""></i><sapn id="usestrict"/>严格模式

* 为某个单独的脚本文件开启严格模式
```js
<script>
'use strict';
</script>
```

* 为某个函数开启严格模式
```js
function strict(){  
  'use strict';
  function nested() { return "And so am I!"; }
  return "Hi!  I'm a strict mode function!  " + nested();
}
```


> 非严格模式到严格模式的区别

* 语法错误
1.八进制语法:var n = 023和var s = "\047"  
2.with语句  
3.使用delete删除一个变量名(而不是属性名):delete myVariable  
4.使用eval或arguments作为变量名或函数名  
5.使用未来保留字(也许会在ECMAScript 6中使用):implements, interface, let, package, private, protected, public, static,和yield作为变量名或函数名  
6.在语句块中使用函数声明:if(a<b){ function f(){} }  
7.其他错误  
  * 对象字面量中使用两个相同的属性名:{a: 1, b: 3, a: 7}
  * 函数形参中使用两个相同的参数名:function f(a, b, b){}

> 运行时错误

* 给一个未声明的变量赋值
```js
"use strict";
var a = 16;
b = 17; //Uncaught ReferenceError: b is not defined
```

* 尝试删除一个不可配置的属性
* arguments对象和函数属性 访问arguments.callee, arguments.caller, anyFunction.caller以及anyFunction.arguments都会抛出异常
var args = Array.prototype.slice.call(arguments) 总是通过形参的名字获取函数参数，或者在函数的第一行拷贝


> 语义差异
* 在普通的函数调用f()中,this的值会指向全局对象.在严格模式中,this的值会指向undefined.当函数通过call和apply调用时,如果传入的thisvalue参数是一个null和undefined除外的原始值(字符串,数字,布尔值),则this的值会成为那个原始值对应的包装对象,如果thisvalue参数的值是undefined或null,则this的值会指向全局对象.在严格模式中,this的值就是thisvalue参数的值,没有任何类型转换.  
* arguments 对象属性不与对应的形参变量同步更新  
* eval 在严格模式中,eval不会在当前的作用域内创建新的变量.另外,传入eval的字符串参数也会按照严格模式来解析.你需要全面测试来确保没有代码收到影响。另外，如果你并不是为了解决一个非常实际的解决方案中，尽量不要使用eval。



## <i id=""></i><sapn id="eval"/>EVAL
eval(string); 执行指定代码之后的返回值。如果返回值为空，返回undefined 函数会将传入的字符串当做 JavaScript 代码进行执行  
eval 中函数作为字符串被定义需要`“（”和“）”`作为前缀和后缀
```js
var fctStr1 = 'function a() {}'
var fctStr2 = '(function a() {})'
var fct1 = eval(fctStr1)  // return undefined
var fct2 = eval(fctStr2)  // return a function​​​​​​
var d=  eval('({"key":"abc"})');
```



## <i id=""></i><sapn id="json"/>JSON  [Browser：polyfill]
* JSON.parse(text[, reviver]);  
  reviver函数 function (k, v) {}  
  `不允许用逗号作为结尾 JSON.parse("[1, 2, 3, 4, ]");  JSON.parse('{"foo" : 1, }');`

`使用 reviver 函数 `  
```js
JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});
```

  当遍历到最顶层的值（解析值）时，传入 reviver 函数的参数会是空字符串 ""（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 this 值会是 {"": 修改过的解析值}，在编写 reviver 函数时，要注意到这个特例。
  
  ```js
  function(k,v){}
  ```

  * k='';  
  * v={"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}};  
  所以不能 return '';

```js
var d = JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    return 'a';       // d 的值为'a';
});
//d='a';
```


* JSON.stringify(value[, replacer [, space]])

```js
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'
```

 > replacer:function(k,v){}

  1.如果返回一个 Number, 转换成相应的字符串被添加入JSON字符串。  
  2.如果返回一个 String, 该字符串作为属性值被添加入JSON。  
  3.如果返回一个 Boolean, "true" 或者 "false"被作为属性值被添加入JSON字符串。  
  4.如果返回任何其他对象，该对象递归地序列化成JSON字符串，对每个属性调用replacer方法。除非该对象是一个函数，这种情况将不会被序列化成JSON字符串。  
  5.如果返回undefined，该属性值不会在JSON字符串中输出。

```js
function replacerNumber(key, value) {
    if (typeof value === "string") {
        return 99;
    }
    return value;
}

function replacerString(key, value) {
    if (typeof value === "string") {
        return 'string';
    }
    return value;

}

function replacerBoolean(key, value) {
    if (typeof value === "string") {
        return true;
    }
    return value;
}

function replacerUndefined(key, value) {
    if (typeof value === "string") {
        return undefined;
    }
    return value;
}

var foo = { foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7 };
var jsonStringNumber = JSON.stringify(foo, replacerNumber);//{"week":45,"month":7}
var jsonStringString = JSON.stringify(foo, replacerString);//{"week":45,"month":7}
var jsonStringBoolean = JSON.stringify(foo, replacerBoolean);//{"week":45,"month":7}
var jsonStringUndefined = JSON.stringify(foo, replacerUndefined);//{"week":45,"month":7}
console.log(jsonStringNumber);//{"foundation":99,"model":99,"week":45,"transport":99,"month":7}
console.log(jsonStringString);//{"foundation":"string","model":"string","week":45,"transport":"string","month":7}
console.log(jsonStringBoolean);//{"foundation":true,"model":true,"week":45,"transport":true,"month":7}
console.log(jsonStringUndefined);//{"week":45,"month":7}

```

> replacer:array 只保留[..]的属性值
```js
JSON.stringify(foo, ['week', 'month']);  
// '{"week":45,"month":7}', 只保留“week”和“month”属性值。
```



## <i id=""></i><sapn id="promise"/>Promise 　　[Browser：polyfill]

### Promise几种状态:
* pending: 初始状态，既不是成功，也不是失败状态。
* fulfilled: 意味着操作成功完成。
* rejected: 意味着操作失败。


> 语法   

Promise:new Promise(function(resolve, reject){});  
[Result:Promise]

### Methods
> Promise.all(iterable)   
[Result:Promise]

两种情况  
1. iterable状态都变成`fulfilled（成功）`，promise状态才会变成fulfilled,`iterable返回值`组成一个数组，传递给回调函数;  

2. iterable中有一个被`rejected（失败）`,promise状态才会变成rejected(失败)，`这个rejected返回的值`，传递给回调函数;

***可以参考`jQuery.when`**

> Promise.race(iterable)  
[Result:Promise]


  iterable实例率先改变状态，promise的状态就跟着改变。
返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects）

> Promise.reject(reason)  
[Result:Promise]

返回一个带有拒绝原因reason参数的Promise对象


> Promise.resolve(value|promise|thenable)  
[Result:Promise]

四种情况
* 1.参数是一个 Promise 实例 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
* 2.参数是一个thenable对象 thenable对象指的是具有then方法的对象，Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```js
// thenableObj是一个thenable对象
var thenableObj={ 
  then: function(onFulfill, onReject) { onFulfill("fulfilled!"); }
};
var p1 = Promise.resolve(thenableObj);
console.log(p1 instanceof Promise) // true, 这是一个Promise对象

p1.then(function(v) {
    console.log(v); // 输出"fulfilled!"
  }, function(e) {
    // 不会被调用
});

```
* 3.参数不是具有then方法的对象，或根本就不是对象 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

* 4.不带有任何参数 Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

### Promise 原型

* Promise.prototype.catch 返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。[Result:Promise]


* Promise.prototype.then(onFulfilled, onRejected);返回一个  Promise 。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。[Result:Promise]
```js
let p1 = new Promise(function(resolve, reject) {
  resolve("Success!");
  // or
  // reject ("Error!");
});

p1.then(function(value) {
  console.log(value); // Success!
}, function(reason) {
  console.log(reason); // Error!
});
```

* Promise.prototype.finally(onFinally);在执行then()和catch()后，都会执行finally指定的回调函数。避免同样的语句需要在then()和catch()中各写一次的情况。[Result:Promise] `(Babel 6 + core-js、ES 2016+、高级浏览器)`




## <i id="object"></i>Object

### <i id="object1"></i>Methods
 > Object.assign(target, ...sources) 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。[Result:UpdateTarget]

```js
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
console.log(o1===obj);//true
```

> <i id="object1-1"></i>Object.create(proto, [propertiesObject])
一个新对象，带着指定的原型对象和属性。
proto 新创建对象的原型对象
propertiesObject default:undefined
```js
//所有版本JavaScript都支持的单继承

// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
console.log(rect);
//Rectangle:{x: 1, y: 1,__proto__:{__proto__:move}}
```

> Object.defineProperty(obj, prop, descriptor) 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。


### 参数


* obj 要在其上定义属性的对象  
* prop 要定义或修改的属性的名称  
* descriptor 将被定义或修改的属性描述符  
* descriptor(数据描述符 and 存取描述符)  
  * 数据描述符:是一个具有值的属性，该值可能是可写的，也可能不是可写的。  
  * 存取描述符:是由getter-setter函数对描述的属性。  

 || `configurable` | `enumerable`| `value` | `writable` | `get` | `set`
 |-| - | -| - |- | - | -
 |`数据描述符`| Yes | Yes | Yes | Yes | No  | No
 |`存取描述符`| Yes | Yes | No  | No  | Yes | Yes

【`configurable` 当且仅当该属性的 configurable 为 `true` 时，该属性描述符才能够被`改变`，同时该属性也能从对应的对象上被`删除`。`默认为 false`。  

【`enumerable` 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的`枚举属性`中。默认为 false。  

【`value` 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。  

【`writable` 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。  

【`get` 一个给属性提供 `getter` 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。  

【`set` 一个给属性提供 `setter` 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。`默认为 undefined`。  

```js
// 使用 __proto__
var obj = {};
var descriptor = Object.create(null); // 没有继承的属性
// 默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);

// 显式
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});
```

> Object.defineProperties(obj, props);直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
```js
props:{
  key:{
   ..descriptor //(参考Object.defineProperty参数descriptor)
  },
  key:{
   ..descriptor //(参考Object.defineProperty参数descriptor)
  }
}
```
```js
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});

```


> Object.entries(obj) 返回给定对象自身`可枚举`属性的[key, value]数组

```js
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

> Object.getOwnPropertyDescriptor(obj, prop) 返回对象指定的属性配置。(参考Object.defineProperty参数descriptor)

```js
var o, d;

o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, "foo");
// d {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }
```

> Object.getOwnPropertyNames() 返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

```

> Object.getOwnPropertySymbols(obj) 返回一个给定对象自身的所有 Symbol 属性的数组

> Object.getPrototypeOf(object) 返回指定对象的原型（内部[[Prototype]]属性的值）
注*Object.getPrototypeOf(Object) 不是  Object.prototype

> Object.is(value1, value2) 判断两个值是否是相同的值
注*Object.is
1.两个值都是 undefined
2.两个值都是 null
3.两个值都是 true 或者都是 false
4.两个值是由相同个数的字符按照相同的顺序组成的字符串
5.两个值指向同一个对象
6.两个值都是数字并且
  6-1.都是正零 +0
  6-2.都是负零 -0
  6-3.都是 NaN
  6-4.都是除零和 NaN 外的其它同一个数字

  ```js
  Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var test = { a: 1 };
Object.is(test, test);       // true

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
  ```

> Object.preventExtensions(obj) 防止对象的任何扩展。

> Object.isExtensible(obj) 判断对象是否可扩展

> Object.freeze(obj) 冻结对象：其他代码不能删除或更改任何属性。

> Object.isFrozen(obj)判断对象是否已经冻结

> Object.seal(obj) 防止其他代码删除对象的属性。

> Object.isSealed(obj) 判断对象是否已经密封


> Object.keys(obj) 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

```js
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']
```

> Object.values(obj) 返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

```js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
```

### Object 实例
#### 属性
* Object.prototype.constructor 定的函数，用于创建一个对象的原型。

* Object.prototype.__proto__  指向当对象被实例化的时候，用作原型的对象

### 方法
* Object.prototype.__defineGetter__() 关联一个函数到一个属性。访问该函数时，执行该函数并返回其返回值
* Object.prototype.__defineSetter__()  关联一个函数到一个属性。设置该函数时，执行该修改属性的函数
* Object.prototype.__lookupGetter__() 返回使用 __defineGetter__ 定义的方法函数
* Object.prototype.__lookupSetter__()  返回使用 __defineSetter__ 定义的方法函数。
* Object.prototype.hasOwnProperty(prop) 返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的
* Object.prototype.isPrototypeOf() 返回一个布尔值，表示指定的对象是否在本对象的原型链中
* Object.prototype.propertyIsEnumerable() 判断指定属性是否可枚举，内部属性设置参见 ECMAScript [[Enumerable]] attribute 
* Object.prototype.toSource() 返回字符串表示此对象的源代码形式，可以使用此字符串生成一个新的相同的对象
* Object.prototype.toLocaleString() 直接调用 toString()方法。
* Object.prototype.toString() 返回对象的字符串表示。

#### 自定义.toString()

```js
function Dog(name,breed,color,sex) {
   this.name=name;
   this.breed=breed;
   this.color=color;
   this.sex=sex;
}

var theDog = new Dog("Gabby","Lab","chocolate","female");
theDog.toString(); // [object Object]

Dog.prototype.toString = function dogToString() {
  var ret = "Dog " + this.name + " is a " + this.sex + " " + this.color + " " + this.breed;
  return ret;
}
theDog.toString(); // "Dog Gabby is a female chocolate Lab"

```

#### 使用toString()检测对象类型

```js
//Object.prototype.toString.call

console.log('String:'+Object.prototype.toString.call('name'));
console.log('Number:'+Object.prototype.toString.call(1));
console.log('Boolean:'+Object.prototype.toString.call(false));
console.log('Undefined:'+Object.prototype.toString.call(undefined));
console.log('Null:'+Object.prototype.toString.call(null));
console.log('Object:'+Object.prototype.toString.call({}));
console.log('Array:'+Object.prototype.toString.call([]));
console.log('Function:'+Object.prototype.toString.call(function(){}));

//String:[object String]
//Number:[object Number]
//Boolean:[object Boolean]
//Undefined:[object Undefined]
//Null:[object Null]
//Object:[object Object]
//Array:[object Array]
//Function:[object Function]
```

* Object.prototype.unwatch() 移除对象某个属性的监听
* Object.prototype.valueOf() 返回指定对象的原始值。
* Object.prototype.watch() 给对象的某个属性增加监听


> <i id="with"></i>with 扩展一个语句的作用域链

下面的`with`语句指定Math对象作为默认对象。with语句里面的变量，分別`指向Math对象的PI 、cos和sin函数，不用在前面添加命名空间`。
```js
var a, x, y;
var r = 10;

with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
```


> <i id="typeof"></i>typeof

#### 语法
```js
typeof operand
or
typeof (operand)
```

* Undefined    "undefined"
* Null	     "object"
* Boolean	     "boolean"
* Number	     "number"
* String	     "string"
* Symbol ES 6  "symbol"
* 宿主对象（由JS环境提供）	Implementation-dependent
* 函数对象（[[Call]] 在ECMA-262条款中实现了）	"function"
任何其他对象	"object"

```js
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === 'number'; // 但不要使用这种形式!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof总是返回一个字符串
typeof String("abc") === 'string'; // 但不要使用这种形式!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 但不要使用这种形式!

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

// Objects
typeof {a:1} === 'object';

// 使用Array.isArray 或者 Object.prototype.toString.call
// 区分数组,普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String("abc") === 'object';

// 函数
typeof function(){} === 'function';
typeof class C{} === 'function'
typeof Math.sin === 'function';
typeof new Function() === 'function';

typeof null === 'object'; // 从一开始出现JavaScript就是这样的
```



> <i id="yunsuan"></i>运算符: +x

```js
+3     // 3
+"3"   // 3
+true  // 1
+false // 0
+null  // 0
+function(val){ return val;} //NaN
```


> <i id="in"></i> in 属性在指定的对象或其原型链中，则in 运算符返回true
 ```js
 //语法
 prop in object
 ```

```js
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回true
3 in trees        // 返回true
6 in trees        // 返回false
"bay" in trees    // 返回false (必须使用索引号,而不是数组元素的值)

"length" in trees // 返回true (length是一个数组属性)

Symbol.iterator in trees // 返回true (数组可迭代，只在ES2015+上有效)


// 内置对象
"PI" in Math          // 返回true

// 自定义对象
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // 返回true
"model" in mycar // 返回true
```



> <i id="instanceof"></i>instanceof 运算符判断一个对象是否是另一个对象的实例.


> <i id="douhao"></i>','逗号 对它的每个操作数求值（从左到右）`，`并返回最后一个操作数的值。
expr1, expr2, expr3...
function myFunc () {
  var x = 0;
  return (x += 1, x); // the same of return ++x;
}


> <i id="shim"></i> es5-shim.js 垫片
es5-sham.js 补充防止旧浏览器报错 Object.* (ie8 Object.getPrototypeOf将抛出错误)



> <i id="function"></i>Function

<i id="function1"></i>函数声明 (函数语句)
```js
function name([param[, param[, ... param]]]) { statements }
function [name]([param] [, param] [..., param]) { statements }
```

* <i id="function2"></i>IIFE (Immediately Invokable Function Expressions （立即可调用函数表达式）//自动执行一次
```js
(function() {statements})();
!function(){statements}();
```

* <i id="function3"></i>箭头函数表达式 
```js
([param] [, param]) => { statements } 
param => expression
```

参数：

* param:参数名称. 零参数需要用()表示.  只有一个参数时不需要括号. (例如 foo => 1)
* statements or expression:多个声明statements需要用大括号括起来，而单个表达式时则不需要。表达式expression也是该函数的隐式返回值。

### <i id="function4"></i>Function构造函数
```js
new Function (arg1, arg2, ... argN, functionBody)
```

> <i id="function5"></i>arguments对象
* arguments.callee 指向当前执行的函数。
* arguments.caller 指向调用当前函数的函数。(已删除)
* arguments.length 指向传递给当前函数的参数数量。
* arguments[@@iterator] 返回一个新的Array迭代器对象，该对象包含参数中每个索引的值。






















