# Emmet 之 HTML 语法

## 基本语法
```
div → <div></div>
foo → <foo></foo>
```

> 元素嵌套: >

```
div>ul>li
```

```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```
> 兄弟元素: +

```
div+p+bq
```

```html
<div></div>
<p></p>
<blockquote></blockquote>
```

> 上级： ^

```
div+div>p>span+em^bq
```

```html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

> 循环: *
```
ul>li*5
```
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

> 分组： ()

```
div>(header>ul>li*2>a)+footer>p
```

```html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

> 分组+循环 组合： ()*
```
(div>dl>(dt+dd)*3)+footer>p
```
```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

## 属性操作符

> ID和CLASS
```
div#header+div.page+div#footer.class1.class2.class3
```
```html
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

> 自定义属性
```
td[title="Hello world!" colspan=3]
```

```html
<td title="Hello world!" colspan="3"></td>
```

> 迭代所引: $
```
ul>li.item$*5
```
```html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

```
ul>li.item$$$*5
```

```html
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

* 改变编号的基础和方向 `@-`

```
ul>li.item$@-*5
```
```html
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

> 文本(内容)： {}

```
a{Click me}
```

```html
<a href="">Click me</a>
```

请注意，它{text}是作为单独的元素使用和分析的（如div，p等），但在元素后面写入时具有特殊含义。例如，a{click}并且a`>`{click}会产生相同的输出，但a{click}+b{here}并a>{click}+b{here}不会：

```html
<!-- a{click}+b{here} -->
<a href="">click</a><b>here</b>

<!-- a>{click}+b{here} -->
<a href="">click<b>here</b></a>
```

# CSS缩写

* 供应商前缀

```css
/*-wm-trf*/
    -webkit-transform: ;
            transform: ;
```

`w： webkit`  
`m： moz`  
`s： ms`  
`o： o`  

* 支持 代码段搜索
```css
/*ov-h*/
overflow: hidden;
```