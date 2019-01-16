# Less 3.9.0

* [变量](#less1)
    * [基本用法](#less1-1)
    * [插值(V1.4.0)](#less1-2)
    * [变量变量](#less1-3)
    * [属性作为变量(v3.0.0)](#less1-4)
* [父选择器](#less2)
    * [基本用法](#less2-1)
    * [& 用于产生重复的类名](#less2-2)
    * [&代表所有父选择器（不仅仅是最近的祖先）](#less2-3)
    * [更改选择器顺序](#less2-4)
* [Extend](#less3)
    * [基本用法](#less3-1)
    * [扩展附加到选择器](#less3-2)
    * [扩展内部规则集](#less3-3)
    * [扩展嵌套选择器](#less3-4)
    * [扩展 "all"](#less3-5)
    * [具有选择器插值(无法匹配)](#less3-6)
    * [在@media范围内](#less3-7)
    * [经典用法](#less3-8)
* [Merge](#less4)
    * [使用逗号附加属性值](#less4-1)
    * [使用空格附加属性值](#less4-2)
* [Mixin](#less5)
    * [混合使用类选择器和id选择器](#less5-1)
    * [不输出Mixin](#less5-2)
    * [命名空间](#less5-3)
    * [!important关键字](#less5-4)
    * [参数混合](#less5-5)
    * [具有多个参数的混合](#less5-6)
    * [命名参数](#less5-7)
    * [@arguments](#less5-8)
    * [高级参数和@rest变量](#less5-9)
    * [模式匹配](#less5-10)
    * [使用Mixins作为函数(v3.5.0)](#less5-11)
        * [属性/值访问器](#less5-)
    * [递归Mixins](#less5-12)
    * [Mixin Guards 函数功能 循环 if/else](#less5-13)
    * [别名Mixins](#less5-14)
* [CSS Guards](#less6)
* [分离的规则集(v1.7.0)](#less7)
* [@import At-Rules](#less8)
* [@plugin At-Rules](#less9)
* [Maps(v3.5.0)）](#less10)


##  <i id="less1"></i> 变量


> <i id="less1-1"></i>基本用法
```css
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
.widget {
  color: #fff;
  background: @link-color;
}
```

> <i id="less1-2"></i>插值(V1.4.0)

```css 
// Variables 基本用法
@my-selector: banner;

// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```


```css
// Variables 图片插值
@images: "../img";

// Usage
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

```css 
// Variables import
@themes: "../../src/themes";

// Usage
@import "@{themes}/tidal-wave.less";
```

```css
// Variables 属性
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

> <i id="less1-3"></i>变量变量 - 使用另一个变量定义变量的名称

```css 
@primary:  green;
@secondary: blue;

.section {
  @color: primary;

  .element {
    color: @@color;
  }
}
```

> <i id="less1-4"></i>属性作为变量(v3.0.0) - 您可以使用$prop语法轻松处理变量等属性。

```css 
.widget {
  color: #efefef;
  background-color: $color;
}

/*等于*/

.widget {
  color: #efefef;
  background-color: #efefef;
}
```


##  <i id="less2"></i> 父选择器

> <i id="less2-1"></i>基本用法

```css
a {
  color: blue;
  &:hover {
    color: green;
  }
}

/*等于*/

a {
  color: blue;
}

a:hover {
  color: green;
}
```

> <i id="less2-2"></i>& 用于产生重复的类名

```css 

.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }

  &-custom {
    background-image: url("custom.png");
  }
}

/*输出：*/

.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```

> <i id="less2-3"></i>&代表所有父选择器（不仅仅是最近的祖先）

```css 
.grand {
  .parent {
    & > & {
      color: red;
    }

    & & {
      color: green;
    }

    && {
      color: blue;
    }

    &, &ish {
      color: cyan;
    }
  }
}

/*结果是：*/

.grand .parent > .grand .parent {
  color: red;
}
.grand .parent .grand .parent {
  color: green;
}
.grand .parent.grand .parent {
  color: blue;
}
.grand .parent,
.grand .parentish {
  color: cyan;
}
```

> <i id="less2-4"></i>更改选择器顺序

```css
.header {
  .menu {
    border-radius: 5px;
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}

/*输出*/

.header .menu {
  border-radius: 5px;
}
.no-borderradius .header .menu {
  background-image: url('images/button-background.png');
}
```

##  <i id="less3"></i> Extend

Extend是一个Less伪类，它将放置的选择器与它引用的选择器相匹配。

> <i id="less3-1"></i>基本用法

```css
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}

/*输出*/

nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

它可以包含一个或多个要扩展的类，用逗号分隔。

```css
.e:extend(.f) {}
.e:extend(.g) {}

// the above an the below do the same thing
.e:extend(.f, .g) {}
```

> <i id="less3-2"></i>扩展附加到选择器

* 在选择器后延伸：pre:hover:extend(div pre)。
* 允许选择器和扩展之间的空间：pre:hover :extend(div pre)。
* 允许多次扩展：pre:hover:extend(div pre):extend(.bucket tr)- 注意这与pre:hover:extend(div pre, .bucket tr)
* 这是不允许的：pre:hover:extend(div pre).nth-child(odd)。延长必须持久。

> <i id="less3-3"></i>扩展内部规则集

```css 

pre:hover,
.some-class {
  &:extend(div pre);
}

/*等同*/

pre:hover:extend(div pre),
.some-class:extend(div pre) {}

```

> <i id="less3-4"></i>扩展嵌套选择器

```css
.bucket {
  tr { // nested ruleset with target selector
    color: blue;
  }
}
.some-class:extend(.bucket tr) {} // nested ruleset is recognized

/*输出*/


.bucket tr,
.some-class {
  color: blue;
}
```

> <i id="less3-5"></i>扩展 "all"

当你在extend参数中指定all关键字时，它会告诉Less将该选择器与另一个选择器的一部分相匹配。将复制选择器，然后仅使用extend替换选择器的匹配部分，从而生成新的选择器。

```css
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {}

/*输出*/

.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```

> <i id="less3-6"></i>具有选择器插值(无法匹配)

```css
@variable: .bucket;
@{variable} { // interpolated selector
  color: blue;
}
.some-class:extend(.bucket) {} // does nothing, no match is found
```

> <i id="less3-7"></i>在@media范围内

目前，声明:extend内部@media仅匹配同一媒体声明中的选择器


> <i id="less3-8"></i>经典用法

* 避免添加基类

```css 
/*<a class="animal bear">Bear</a>*/

.animal {
  background-color: black;
  color: white;
}
.bear {
  background-color: brown;
}

```

简化

```css
/*<a class="bear">Bear</a>*/

.animal {
  background-color: black;
  color: white;
}
.bear {
  &:extend(.animal);
  background-color: brown;
}

/*输出*/
.animal,.bear{
  background-color: black;
  color: white; 
}
.bear {
    background-color: brown;
}
```

* 减少CSS大小

Mixins将所有属性复制到选择器中，这可能导致不必要的重复。因此，您可以使用extends而不是mixins将选择器移动到您希望使用的属性，从而减少生成的CSS。

```css
.my-inline-block {
  display: inline-block;
  font-size: 0;
}
.thing1 {
  &:extend(.my-inline-block);
}
.thing2 {
  &:extend(.my-inline-block);
}

/*输出*/

.my-inline-block,
.thing1,
.thing2 {
  display: inline-block;
  font-size: 0;
}
```


## <i id="less4"></i> Merge

> <i id="less4-1"></i>使用逗号附加属性值

```css
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}

/*输出*/

.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```


> <i id="less4-2"></i>使用空格附加属性值

```css
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}

/*输出*/

.myclass {
  transform: scale(2) rotate(15deg);
}
```


## <i id="less5"></i> Mixin

> <i id="less5-1"></i>混合使用类选择器和id选择器

```css
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}

/*输出*/

.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```


> <i id="less5-2"></i>不输出Mixin

如果你想创建一个mixin但你不希望mixin在你的CSS输出中，请在mixin定义之后添加括号。

> <i id="less5-3"></i>命名空间

```css
#outer() {
  .inner {
    color: red;
  }
}

.c {
  #outer > .inner();
}
```

> <i id="less5-4"></i>!important关键字

在mixin调用之后使用关键字将其继承的所有属性标记为!important

> <i id="less5-5"></i>参数混合

```css
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```

> <i id="less5-6"></i>具有多个参数的混合

参数可以是分号或逗号分隔。建议使用`分号`。符号逗号具有双重含义：它可以解释为mixin参数分隔符或css列表分隔符。

> <i id="less5-7"></i>命名参数

mixin参考可以通过其名称而不仅仅是位置来提供参数值。任何参数都可以通过其名称引用，并且它们不必具有任何特殊顺序

```css
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}

/*输出*/

.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

> <i id="less5-8"></i>@arguments

@arguments在mixins中有一个特殊含义，它包含调用mixin时传递的所有参数。

```css
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```

> <i id="less5-9"></i>高级参数和@rest变量

...如果您希望mixin采用可变数量的参数，则可以使用。在变量名之后使用它将把这些参数分配给变量

> <i id="less5-10"></i>模式匹配

根据传递给它的参数更改mixin的行为

```css
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch; #888);
}
```

```css
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: fade(@a; @b);
}

//得到第一个定义的输出
div{
    .mixin(#fff);
}

//得到第二个定义的输出
div{
    .mixin(#fff;#000);
}
```

> <i id="less5-11"></i>使用Mixins作为函数(v3.5.0)

* 属性/值访问器

```css 
.average(@x, @y) {
  @result: ((@x + @y) / 2);
}

div {
  // call a mixin and look up its "@return" value
  padding: .average(16px, 50px)[@result];
}
```

* 覆盖mixin值

> <i id="less5-12"></i>递归Mixins

```css 
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}

div {
  .loop(5); // launch the loop
}
/*输出*/

div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
```

> <i id="less5-13"></i>Mixin Guards

在尝试尽可能接近CSS的声明性质时，Less选择通过受保护的mixins而不是if/ elsestatements 来实现条件执行

```css 
.mixin(@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin(@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin(@a) {
  color: @a;
}
```

* 运算符:>，>=，=，=<，<,关键字true

```css
/*等价*/
.truth(@a) when (@a) { ... }
.truth(@a) when (@a = true) { ... }
```

* 保护逻辑运算符 and not

```css
.mixin(@a) when (isnumber(@a)) and (@a > 0) { ... }
.mixin(@a) when (@a > 10), (@a < -10) { ... }


.mixin(@b) when not (@b > 0) { ... }
```

> <i id="less5-14"></i>别名Mixins(v3.5.0)

```css
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}

.navbar {
  @colors: #theme.dark.navbar.colors(dark);
  background: @colors[primary];
  border: 1px solid @colors[secondary];
}
```




## <i id="less6"></i> CSS Guards

像Mixin Guards一样，Guards也可以应用于css选择器，这是用于声明mixin然后立即调用它的语法糖。

```css
button when (@my-option = true) {
  color: white;
}
```

## <i id="less7"></i> 分离的规则集 (v1.7.0)

分离的规则集是一组css属性，嵌套规则集，媒体声明或存储在变量中的任何其他内容。您可以将其包含在规则集或其他结构中，并将其所有属性复制到那里。您也可以将它用作mixin参数并将其作为任何其他变量传递。

```css
// declare detached ruleset
@detached-ruleset: { background: red; }; // semi-colon is optional in 3.5.0+

// use detached ruleset
.top {
    @detached-ruleset(); 
}
```

> 传递给mixin

```css
.desktop-and-old-ie(@rules) {
  @media screen and (min-width: 1200px) { @rules(); }
  html.lt-ie9 &                         { @rules(); }
}

header {
  background-color: blue;

  .desktop-and-old-ie({
    background-color: red;
  });
}
```

> 属性/变量访问器(v3.5.0)

从Less 3.5开始，您可以使用属性/变量访问器（也称为“查找”）从变量（分离的）规则集中选择值。

```css
@config: {
  option1: true;
  option2: false;
}

.mixin() when (@config[option1] = true) {
  selected: value;
}

.box {
  .mixin();
}
```

## <i id="less8"></i> @import At-Rules

> 文件扩展名
@import 根据文件扩展名，语句的处理方式可能会有所不同：

* 如果文件有.css扩展名，则将其视为CSS，并将@import语句保留为原样（请参阅下面的内联选项）。
* 如果它有任何其他扩展名，它将被视为更少并导入。
* 如果它没有扩展名，.less将被追加，它将作为导入的Less文件包含在内。

> 导入选项

```
语法： @import (keyword) "filename";
```

已实施以下导入选项：

* reference：使用Less文件但不输出
* inline：在输出中包含源文件但不处理它
* less：无论文件扩展名是什么，都将文件视为Less文件
* css：无论文件扩展名是什么，都将文件视为CSS文件
* once：只包含一次文件（这是默认行为）
* multiple：多次包含该文件
* optional：找不到文件时继续编译

## <i id="less9"></i> @plugin At-Rules

## <i id="less10"></i> Maps(v3.5.0)

使用规则集和mixins作为值的映射

通过将命名空间与查找[]语法相结合，您可以将规则集/混合转换为映射。

```css
@sizes: {
  mobile: 320px;
  tablet: 768px;
  desktop: 1024px;
}

.navbar {
  display: block;

  @media (min-width: @sizes[tablet]) {
    display: inline-block;
  }
}
```