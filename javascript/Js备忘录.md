
<style>
.red{
  color:red;
}
</style>

> RegExp 构造函数

语法：
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

flags：
```
g：全局匹配;找到所有匹配，而不是在第一个匹配后停止  
i：忽略大小写  
m：多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。  
u：Unicode; 将模式视为Unicode序列点的序列  
y：粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex  属性指示的索引(并且不尝试从任何后续的索引匹配)。
```

>RegExp 实例

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

> RegExp.prototype.exec()与String.match(regexp);  
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

> String

 * string.substr(start, length) 一个字符串的副本，包括从string的start处(包括start所指的字符)开始的1ength个字符。如果没有指定length，返回的字符串包含从start到string结尾的字符，-1指字符串中的最后—个字符，-2指倒数第二个字符  
* string.substring(from, to) 返回字符串string的子串，由from到to之间的字符构成， 包括位于from的字符，不包括位于to的字符。
string.slice(start, end) 从start开始(包括start)到end为止(不包 括end)的所有字符。(-1指字符串中的最后一个字符，-2指倒数第二个字符)

> Global 全局属性

* Infinity 表示正无穷大的数值。  
* NaN 非数字值  
* undefined 未定义的值  

> for...in 顺序遍历一个对象的可枚举属性  
> for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

> Array

## Array.prototype

* arr.fill(value[, start[, end]])用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。
[polyfill]

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

* arr.pop()删除数组的最后一个元素，并返回这个元素。
* arr.push(element1, ..., elementN)在数组的末尾增加一个或多个元素，并返回数组的新长度。
* arr.reverse()颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
* arr.shift()删除数组的第一个元素，并返回这个元素。
* arr.sort([compareFunction])排序 compareFunction可选。用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
* array.splice(start[, deleteCount[, item1[, item2[, ...]]]])删除现有元素和/或添加新元素来更改一个数组的内容。
* arr.unshift(element1, ..., elementN)将一个或多个元素添加到数组的开头，并返回新数组的长度。
* var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
* arr.includes(searchElement)||arr.includes(searchElement, fromIndex)判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
* arr.join(separator) 连接所有数组元素组成一个字符串。默认是','隔开
* arr.slice(begin, end)抽取当前数组中的一段元素组合成一个新数组。
* arr.toString()返回一个由所有数组元素组合而成的字符串 该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成
* arr.indexOf()返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
* arr.lastIndexOf()返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

对数组的每个元素执行一次提供的函数
array.forEach(callback(currentValue, index, array){}, this) 
result:undefined
callback(currentValue, index, array)
currentValue:(当前值)数组中正在处理的当前元素。
index:(索引)数组中正在处理的当前元素的索引。
array:forEach()方法正在操作的数组。
注*没有办法中止或者跳出 forEach 循环，除了抛出一个异常。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。

测试数组的所有元素是否都通过了指定函数的测试
arr.every(callback[, thisArg])
result:bool
callback 被调用时传入三个参数：元素值，元素的索引，原数组。
数组中的每个元素执行一次 callback 函数，直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。
注*every 不会改变原数组。

测试数组中的某些元素是否通过由提供的函数实现的测试。
arr.some(callback[, thisArg])
result:bool
callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。
注*some 不会改变原数组。


创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
var new_array = arr.filter(callback[, thisArg])
result:新的通过测试的元素的集合的数组
callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。
注*filter 不会改变原数组，它返回过滤后的新数组。


返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
arr.find(callback[, thisArg])
result:返回数组中的一个值，否则返回 undefined。
callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
对数组中的每一项元素执行一次 callback 函数，直至有一个 callback 返回 true。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。


返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
arr.findIndex(callback[, thisArg])
result:元素的索引
callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
对数组中的每个数组索引0..length-1（包括）执行一次callback函数，直到找到一个callback函数返回真实值（强制为true）的值。如果找到这样的元素，findIndex会立即返回该元素的索引。如果回调从不返回真值，或者数组的length为0，则findIndex返回-1。


创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
arr.map(function callback(currentValue, index, array) { }[, thisArg])
result:新数组，每个元素都是回调函数的结果
callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身
会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。
注*map 不修改调用它的原数组本身


对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
arr.reduce(callback[, initialValue])
result:函数累计处理的结果
initialValue参数：初始值
callback 函数会被自动传入三个参数：accumulator累加器累加回调的返回值，currentValue当前元素，currentIndex元素索引,array原数组本身


arr.reduceRight(callback[, initialValue])
相对与arr.reduce（）向右开始



DOM Event


Location

####Properties

URLUtils.href 包含整个URL的一个DOMString
URLUtils.protocol 包含URL对应协议包含":"。
URLUtils.host 包含了域名带有一个":"并跟上URL的端口号。
URLUtils.hostname 包含URL域名。
URLUtils.port 端口号。
URLUtils.pathname 包含URL中路径部分有一个“/"。
URLUtils.search 包含URL参数的一个DOMString，开头有一个“?”。
URLUtils.hash 包含块标识符的DOMString，开头有一个“#”。
URLUtils.username
URLUtils.password
URLUtils.origin(只读)

####Methods

Location.assign() 触发窗口加载并显示指定的URL的内容
Location.reload(forcedReload[bool])用来刷新当前页面。该方法只有一个参数，当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面。该方法在跨域调用（执行该方法的脚本文件的域和 Location 对象所在页面的跨不同）时，将会抛出 DOMException 异常。
Location.replace() 给定的URL来替换当前的资源。 与assign() 方法 不同的是调用replace()方法后，当前页面不会保存到会话历史中（session History），这样用户点击回退按钮将不会再跳转到该页面。
URLUtils.toString() === URLUtils.href

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



Number
####Properties

####Methods
Number.parseFloat(string) 和全局对象 parseFloat() 一样。 需要被解析成为浮点数的字符串.
Number.parseInt(string[, radix])和全局对象 parseInt() 一样。返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。radix基数 比如参数"10"表示使用我们通常使用的十进制数值系统。
Number.isFinite()确定传递的值类型及本身是否是有限数。
Number.isInteger()确定传递的值类型是“number”，且是整数。
Number.isNaN(value)确定传递的值是否是 NaN。   和全局函数 isNaN() 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 NaN 的时候才会返回 true。

############################################################
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

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
#############################################################

Number.isSafeInteger()
numObj.toFixed(digits)使用定点表示法来格式化一个数 digits(0-20 default:0);



Math
Math.abs()绝对值
sin(), cos(), tan() 正三角
asin(), acos(), atan(), atan2()反三角
sinh(), cosh(), tanh()双曲
asinh(), acosh(), atanh()
Math.floor() 向下取整
Math.ceil()向上取整
Math.round()四舍五入
Math.random() 返回0到1之间的伪随机数.

返回了一个在指定值之间的随机整数(包含min和max)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

Math.sign() 返回x的符号函数, 判定x是正数,负数还是0.



Date
UTC 世界协调时间 GMT 格林威治标准时间(UTC==GMT 北京时间=UTC+8时差)
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);

##获得时间毫秒###################################################################

        console.log(Date.now());
        console.log(+new Date());
        console.log(new Date().getTime());
        console.log(new Date().valueOf());
        console.log(Date.UTC(2018, 5, 4, 14, 40, 20, 100));//不常用

###################################################################################

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



严格模式

为某个单独的脚本文件开启严格模式
<script>
'use strict';
</script>

为某个函数开启严格模式
function strict(){  
  'use strict';
  function nested() { return "And so am I!"; }
  return "Hi!  I'm a strict mode function!  " + nested();
}

非严格模式到严格模式的区别

语法错误
1.八进制语法:var n = 023和var s = "\047"
2.with语句
3.使用delete删除一个变量名(而不是属性名):delete myVariable
4.使用eval或arguments作为变量名或函数名
5.使用未来保留字(也许会在ECMAScript 6中使用):implements, interface, let, package, private, protected, public, static,和yield作为变量名或函数名
6.在语句块中使用函数声明:if(a<b){ function f(){} }
7.其他错误
  7-1.对象字面量中使用两个相同的属性名:{a: 1, b: 3, a: 7}
  7-2.函数形参中使用两个相同的参数名:function f(a, b, b){}

新的运行时错误
1.给一个未声明的变量赋值
<script>
        "use strict";
        var a = 16;
        b = 17; //Uncaught ReferenceError: b is not defined
</script>
2.尝试删除一个不可配置的属性
3.arguments对象和函数属性 访问arguments.callee, arguments.caller, anyFunction.caller以及anyFunction.arguments都会抛出异常
var args = Array.prototype.slice.call(arguments) 总是通过形参的名字获取函数参数，或者在函数的第一行拷贝


语义差异
1.在普通的函数调用f()中,this的值会指向全局对象.在严格模式中,this的值会指向undefined.当函数通过call和apply调用时,如果传入的thisvalue参数是一个null和undefined除外的原始值(字符串,数字,布尔值),则this的值会成为那个原始值对应的包装对象,如果thisvalue参数的值是undefined或null,则this的值会指向全局对象.在严格模式中,this的值就是thisvalue参数的值,没有任何类型转换.
2.arguments 对象属性不与对应的形参变量同步更新
3.eval 在严格模式中,eval不会在当前的作用域内创建新的变量.另外,传入eval的字符串参数也会按照严格模式来解析.你需要全面测试来确保没有代码收到影响。另外，如果你并不是为了解决一个非常实际的解决方案中，尽量不要使用eval。



EVAL
eval(string); 执行指定代码之后的返回值。如果返回值为空，返回undefined 函数会将传入的字符串当做 JavaScript 代码进行执行
eval 中函数作为字符串被定义需要“（”和“）”作为前缀和后缀
var fctStr1 = 'function a() {}'
var fctStr2 = '(function a() {})'
var fct1 = eval(fctStr1)  // return undefined
var fct2 = eval(fctStr2)  // return a function​​​​​​
var d=  eval('({"key":"abc"})');


JSON
JSON.parse(text[, reviver]);
reviver函数 function (k, v) {}
不允许用逗号作为结尾 JSON.parse("[1, 2, 3, 4, ]");  JSON.parse('{"foo" : 1, }');

使用 reviver 函数 
JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

当遍历到最顶层的值（解析值）时，传入 reviver 函数的参数会是空字符串 ""（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 this 值会是 {"": 修改过的解析值}，在编写 reviver 函数时，要注意到这个特例。
function(k,v)k='';v={"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}};所以不能 return '';
 var d = JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
            return 'a';       // d 的值为'a';
        });


JSON.stringify(value[, replacer [, space]])
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

replacer:function(k,v){}
1.如果返回一个 Number, 转换成相应的字符串被添加入JSON字符串。
2.如果返回一个 String, 该字符串作为属性值被添加入JSON。
3.如果返回一个 Boolean, "true" 或者 "false"被作为属性值被添加入JSON字符串。
4.如果返回任何其他对象，该对象递归地序列化成JSON字符串，对每个属性调用replacer方法。除非该对象是一个函数，这种情况将不会被序列化成JSON字符串。
5.如果返回undefined，该属性值不会在JSON字符串中输出。


replacer:array 只保留[..]的属性值



Promise 

Promise几种状态:
pending: 初始状态，既不是成功，也不是失败状态。
fulfilled: 意味着操作成功完成。
rejected: 意味着操作失败。


语法 Promise:new Promise(function(resolve, reject){});

####Methods
Promise.all(iterable)
两种情况
1.iterable状态都变成fulfilled（成功），promise状态才会变成fulfilled,iterable返回值组成一个数组，传递给回调函数;
2.iterable中有一个被rejected（失败）,promise状态才会变成rejected(失败)，这个rejected返回的值，传递给回调函数;
注*可以参考jQuery.when

Promise.race(iterable) 
iterable实例率先改变状态，promise的状态就跟着改变。
返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects）

Promise.reject(reason)返回一个带有拒绝原因reason参数的Promise对象


Promise.resolve(value|promise|thenable)
四种情况
1.参数是一个 Promise 实例 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
2.参数是一个thenable对象 thenable对象指的是具有then方法的对象，Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
3.参数不是具有then方法的对象，或根本就不是对象 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
4.不带有任何参数 Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

Promise 原型

Promise.prototype.catch 返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。
Promise.prototype.then(onFulfilled, onRejected);返回一个  Promise 。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。
Promise.prototype.finally(onFinally);在执行then()和catch()后，都会执行finally指定的回调函数。避免同样的语句需要在then()和catch()中各写一次的情况。 (Babel 6 +core-js、ES 20166+、最高级浏览器)




Object

####Methods
Object.assign(target, ...sources) 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。target

Object.create(proto, [propertiesObject])
一个新对象，带着指定的原型对象和属性。
proto 新创建对象的原型对象
propertiesObject default:undefined

Object.defineProperty(obj, prop, descriptor) 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
参数
obj 要在其上定义属性的对象
prop 要定义或修改的属性的名称
descriptor 将被定义或修改的属性描述符
descriptor(数据描述符 and 存取描述符)
数据描述符:是一个具有值的属性，该值可能是可写的，也可能不是可写的。
存取描述符:是由getter-setter函数对描述的属性。

【configurable 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
【enumerable 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
【value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
【writable 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
【get 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
【set 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。

	         configurable	 enumerable  	value	   writable  	get	   set
		
数据描述符	Yes	          Yes	         Yes	    Yes		     No	    No
存取描述符	Yes		        Yes		       No	      No	       Yes   	Yes


Object.defineProperties(obj, props);直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
props:{
key:{
..descriptor//(参考Object.defineProperty参数descriptor)
},
key:{
..descriptor//(参考Object.defineProperty参数descriptor)
}
}


Object.entries(obj) 返回给定对象自身可枚举属性的[key, value]数组
例子：const obj = { foo: 'bar', baz: 42 };
      console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

Object.freeze(obj) 冻结对象：其他代码不能删除或更改任何属性。

Object.getOwnPropertyDescriptor(obj, prop) 返回对象指定的属性配置。(参考Object.defineProperty参数descriptor)

Object.getOwnPropertyNames() 返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

Object.getOwnPropertySymbols(obj) 返回一个给定对象自身的所有 Symbol 属性的数组

Object.getPrototypeOf(object) 返回指定对象的原型（内部[[Prototype]]属性的值）
注*Object.getPrototypeOf(Object) 不是  Object.prototype

Object.is(value1, value2) 判断两个值是否是相同的值
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

Object.isExtensible() 判断对象是否可扩展

Object.isFrozen()判断对象是否已经冻结

Object.isSealed() 判断对象是否已经密封

Object.keys(obj) 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

Object 实例
属性
Object.prototype.constructor 定的函数，用于创建一个对象的原型。

Object.prototype.__proto__  指向当对象被实例化的时候，用作原型的对象

方法
Object.prototype.__defineGetter__() 关联一个函数到一个属性。访问该函数时，执行该函数并返回其返回值
Object.prototype.__defineSetter__()  关联一个函数到一个属性。设置该函数时，执行该修改属性的函数
Object.prototype.__lookupGetter__() 返回使用 __defineGetter__ 定义的方法函数
Object.prototype.__lookupSetter__()  返回使用 __defineSetter__ 定义的方法函数。
Object.prototype.hasOwnProperty(prop) 返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的
Object.prototype.isPrototypeOf() 返回一个布尔值，表示指定的对象是否在本对象的原型链中
Object.prototype.propertyIsEnumerable() 判断指定属性是否可枚举，内部属性设置参见 ECMAScript [[Enumerable]] attribute 
Object.prototype.toSource() 返回字符串表示此对象的源代码形式，可以使用此字符串生成一个新的相同的对象
Object.prototype.toLocaleString()�?0�?1�?1�?7�?0�?3�?1�?7�?1�?7�?1�?7 toString()�?1�?7�?1�?7�?1�?7�?1�?7�?1�?7�?1�?7
Object.prototype.toString() 返回对象的字符串表示。
Object.prototype.unwatch() 移除对象某个属性的监听
Object.prototype.valueOf() 返回指定对象的原始值。
Object.prototype.watch() 给对象的某个属性增加监听


with 扩展一个语句的作用域链
var a, x, y;
var r = 10;

with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
下面的with语句指定Math对象作为默认对象。with语句里面的变量，分別指向Math对象的PI 、cos和sin函数，不用在前面添加命名空间。


typeof
语法
typeof operand
or
typeof (operand)

Undefined    "undefined"
Null	     "object"
Boolean	     "boolean"
Number	     "number"
String	     "string"
Symbol ES 6  "symbol"
宿主对象（由JS环境提供）	Implementation-dependent
函数对象（[[Call]] 在ECMA-262条款中实现了）	"function"
任何其他对象	"object"


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


运算符: +x
+3     // 3
+"3"   // 3
+true  // 1
+false // 0
+null  // 0
+function(val){ return val;} //NaN


in 属性在指定的对象或其原型链中，则in 运算符返回true
语法 prop in object
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



instanceof 运算符判断一个对象是否是另一个对象的实例.


对它的每个操作数求值（从左到右），并返回最后一个操作数的值。
expr1, expr2, expr3...
function myFunc () {
  var x = 0;

  return (x += 1, x); // the same of return ++x;
}


es5-shim.js 垫片
es5-sham.js 补充防止旧浏览器报错 Object.* (ie8 Object.getPrototypeOf将抛出错误)



Function

函数声明 (函数语句)
1.function name([param[, param[, ... param]]]) { statements }
2.function [name]([param] [, param] [..., param]) { statements }

IIFE (Immediately Invokable Function Expressions （立即可调用函数表达式）//自动执行一次
(function() {statements})();
!function(){}();

箭头函数表达式 ([param] [, param]) => { statements } param => expression
param:参数名称. 零参数需要用()表示.  只有一个参数时不需要括号. (例如 foo => 1)
statements or expression:多个声明statements需要用大括号括起来，而单个表达式时则不需要。表达式expression也是该函数的隐式返回值。

Function构造函数
new Function (arg1, arg2, ... argN, functionBody)

arguments对象
arguments.callee 指向当前执行的函数。
arguments.caller 指向调用当前函数的函数。(已删除)
arguments.length 指向传递给当前函数的参数数量。
arguments[@@iterator] 返回一个新的Array迭代器对象，该对象包含参数中每个索引的值。


Object.prototype.toString.call

console.log('String:'+Object.prototype.toString.call('name'));
console.log('Number:'+Object.prototype.toString.call(1));
console.log('Boolean:'+Object.prototype.toString.call(false));
console.log('Undefined:'+Object.prototype.toString.call(undefined));
console.log('Null:'+Object.prototype.toString.call(null));
console.log('Object:'+Object.prototype.toString.call({}));
console.log('Array:'+Object.prototype.toString.call([]));
console.log('Function:'+Object.prototype.toString.call(function(){}));

String:[object String]
Number:[object Number]

Boolean:[object Boolean]

Undefined:[object Undefined]
Null:[object Null]
Object:[object Object]

Array:[object Array]
Function:[object Function]



















