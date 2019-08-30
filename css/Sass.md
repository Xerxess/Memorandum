<!-- TOC -->

- [嵌套规则 (Nested Rules)](#嵌套规则-nested-rules)
- [父选择器 & (Referencing Parent Selectors: &)](#父选择器--referencing-parent-selectors-)
- [属性嵌套 (Nested Properties)](#属性嵌套-nested-properties)
- [注释 /* */ 与 // (Comments: /* */ and //)](#注释---与--comments---and-)
- [变量 $ (Variables: $)](#变量--variables-)
- [!default](#default)
- [全局变量&局部变量](#全局变量局部变量)
- [!global](#global)
- [插值语句 #{}](#插值语句-)
- [\@if bool {...} @else if bool{...} @else {}](#\if-bool--else-if-bool-else-)
- [@for](#for)
- [\@each $var in \<list>](#\each-var-in-\list)
- [\@while](#\while)
- [\@extend](#\extend)
- [\@at-root](#\at-root)
- [@import](#import)
- [\@mixin \@include](#\mixin-\include)
- [\@content 向混合样式中导入内容 (Passing Content Blocks to a Mixin)](#\content-向混合样式中导入内容-passing-content-blocks-to-a-mixin)
- [函数指令 (Function Directives)](#函数指令-function-directives)
- [占位符选择器](#占位符选择器)
- [maps](#maps)
- [lists](#lists)
- [functions 回调](#functions-回调)
- [内至功能](#内至功能)

<!-- /TOC -->

SASS

https://sass-lang.com/documentation/syntax

* 支持解构
* 支持展开表达式

# 嵌套规则 (Nested Rules) 

# 父选择器 & (Referencing Parent Selectors: &)

```scss
.alert {
  &:hover {
    font-weight: bold;
  }
  &__m{
    color:red;
  }
  &--{
    color:#ddd;
  }
}
```

#  属性嵌套 (Nested Properties)

# 注释 /* */ 与 // (Comments: /* */ and //)

# 变量 $ (Variables: $)
```scss
$width: 5em;
```

# !default

* 这一个值分配给变量仅当该变量没有被定义，或者其值null。否则，将使用现有值。这样，用户可以在导入库之前设置变量以自定义其行为。

```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
$black: #222;
$border-radius: 0.1rem;

@import 'library';

// bulid
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(#222, 0.15);
}
```

# 全局变量&局部变量

* 全局变量相同的名称声明局部变量，两个具有相同名称的不同变量：一个是本地的，一个是全局的。这有助于确保编写局部变量的作者不会意外地更改他们甚至不知道的全局变量的值。

```scss
$variable: global value;

.content {
  $variable: local value;
  value: $variable;
}

.sidebar {
  value: $variable;
}

// bulid
.content {
  value: local value;
}

.sidebar {
  value: global value;
}
```

# !global

* 本地范围内（例如在mixin中）设置全局变量的值，则可以使用该!global标志。标记为的变量声明!global将始终分配给全局范围。

```scss
$variable: first global value;

.content {
  $variable: second global value !global;
  value: $variable;
}

.sidebar {
  value: $variable;
}

// bulid
.content {
  value: second global value;
}

.sidebar {
  value: second global value;
}
```

# 插值语句 #{}

```scss
$name: foo;
$attr: border;
p.#{$name} {
#{$attr}-color: blue;
}

//编译

p.foo {
border-color: blue; }
```

# \@if bool {...} @else if bool{...} @else {}

```scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}
```

# @for

* @for  $i from start (through/to) end

```scss
@for $i from 1 through 3 {//范围包含 <start> 与 <end>
.item-#{$i} { width: 2em * $i; }
}

@for $i from 1 to  3 {//只包含 <start> 的值不包含 <end>
.item-#{$i} { width: 2em * $i; }
}
```

# \@each $var in \<list>

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```
* map

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

* 解构

``` scss
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```

# \@while

```scss
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: $value / $ratio;
  }
  @return $value;
}
```

# \@extend

* 让 css 代码共享

```scss
.error {
border: 1px #f00;
background-color: #fdd;
}
.error.intrusion {
background-image: url("/image/hacked.png");
}
.seriousError {
@extend .error;
border-width: 3px;
}

//编译
.error, .seriousError {
border: 1px #f00;
background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
background-image: url("/image/hacked.png"); }

.seriousError {
border-width: 3px; }
```

# \@at-root

* @at-root指令导致在文档的根目录下发出一个或多个规则，而不是嵌套在其父选择器下面。

```scss
.parent {
...
@at-root .child { ... }
}

//编译

.parent { ... }
.child { ... }
```

# @import

* 如果多次导入相同的样式表，则每次都会再次对其进行评估。
* 正斜杠而不是反斜杠。
* partials - 仅用于导入而不是自己编译的Sass文件以_（如在_code.scss）开头。这些被称为partials，它们告诉Sass工具不要试图自己编译这些文件。您可以_在导入部分时停止。

* 嵌套

```scss
// _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}

// style.scss
.theme-sample {
  @import "theme";
}

// -------------------------------------------

// 编译
.theme-sample pre, .theme-sample code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
```

# \@mixin \@include

```scss
@mixin silly-links {
a {
color: blue;
background-color: red;
}
}
@include silly-links;
//编译
a {
color: blue;
background-color: red; }

//----------------------------------

@mixin sexy-border($color, $width) {
border: {
color: $color;
width: $width;
style: dashed;
}
}
p { @include sexy-border(blue, 1in); }

//编译
p {
border-color: blue;
border-width: 1in;
border-style: dashed; }

// --------------------------------------

// 任意关键字参数
@mixin syntax-colors($args...) {
  @debug keywords($args); // (string: #080, comment: #800, $variable: $60b)

  @each $name, $color in keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```

# \@content 向混合样式中导入内容 (Passing Content Blocks to a Mixin)

```scss
@mixin apply-to-ie6-only {
* html {
@content;
}
}
@include apply-to-ie6-only {
#logo {
background-image: url(/logo.gif);
}
}

//编译
* html #logo {
background-image: url(/logo.gif);
}
```

# 函数指令 (Function Directives)

* @function
* @return 每个都@function 必须以一个体内结束  @return。

```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}

// 编译
.sidebar {
  float: left;
  margin-left: 64px;
}
```


# 占位符选择器

Sass有一种特殊的选择器，称为“占位符”。它的外观和行为很像类选择器，不包含在CSS输出中。

```css
.alert:hover, %strong-alert {
font-weight: bold;
}

%strong-alert:hover {
color: red;
}

// 转换为
.alert:hover {
font-weight: bold;
}

```

```scss
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, .12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
  @extend %toolbelt;
  color: #4285f4;
}

.reset-buttons {
  @extend %toolbelt;
  color: #cddc39;
}

// ---------------------------------------

.action-buttons, .reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}
.action-buttons:hover, .reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}
```
# maps

* 使用maps

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map-get($font-weights, "medium"); // 500
@debug map-get($font-weights, "extra-bold"); // null
```

* each

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

* 添加
```scss
$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map-merge($light-weights, $heavy-weights);
// (
//   "lightest": 100,
//   "light": 300,
//   "medium": 500,
//   "bold": 700
// )
```

# lists

在Sass中，列表中的元素可以用逗号（Helvetica, Arial, sans-serif）或空格（10px 15px 0 0）分隔，只要它在列表中是一致的。

* 使用列表

```scss
@debug nth(10px 12px 16px, 2); // 12px
@debug nth([line1, line2, line3], -1); // line3
```

* each
```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

* 添加item

```scss
@debug append(10px 12px 16px, 25px); // 10px 12px 16px 25px
@debug append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```

* 索引
```scss
@debug index(1px solid red, 1px); // 1
@debug index(1px solid red, solid); // 2
@debug index(1px solid red, dashed); // null
```

*　参数列表

```scss
@mixin syntax-colors($args...) {
  @debug keywords($args); // (string: #080, comment: #800, $variable: $60b)

  @each $name, $color in keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```

# functions 回调

```scss
/// Return a copy of $list with all elements for which $condition returns `true`
/// removed.
@function remove-where($list, $condition) {
  $new-list: ();
  $separator: list-separator($list);
  @each $element in $list {
    @if not call($condition, $element) {
      $new-list: append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return str-index($string, "Helvetica");
  }
  font-family: remove-where($fonts, get-function("contains-helvetica"));
}
```

# 内至功能

* if($condition, $if-true, $if-false) 
```sass
@debug if(true, 10px, 15px); // 10px
```