# SASS

## 嵌套规则 (Nested Rules) 

## 父选择器 & (Referencing Parent Selectors: &)

##  属性嵌套 (Nested Properties)

## 注释 /* */ 与 // (Comments: /* */ and //)

## 变量 $ (Variables: $)
```scss
$width: 5em;
```

## !default

## 插值语句 #{} (Interpolation: #{})

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

## @if bool {...} @else if bool{...} @else {}

## @for  $i from start (through/to) end

```scss
@for $i from 1 through 3 {//范围包含 <start> 与 <end>
  .item-#{$i} { width: 2em * $i; }
}

@for $i from 1 to  3 {//只包含 <start> 的值不包含 <end>
  .item-#{$i} { width: 2em * $i; }
}
```

## @each $var in <list>

## @while

## @extend

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

## @at-root

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

## @mixin @include

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
```

## @content 向混合样式中导入内容 (Passing Content Blocks to a Mixin)

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

## 函数指令 (Function Directives)

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }


//编译为
#sidebar {
  width: 240px; }
```