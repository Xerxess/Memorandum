# CSS vertical-align 属性

[https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)
[https://segmentfault.com/a/1190000007663895](https://segmentfault.com/a/1190000007663895)

* baseline	默认。元素放置在父元素的基线上。
* sub	垂直对齐文本的下标。
* super	垂直对齐文本的上标
* top	把元素的顶端与行中最高元素的顶端对齐
* text-top	把元素的顶端与父元素字体的顶端对齐
* middle	把此元素放置在父元素的中部。
* bottom	把元素的顶端与行中最低的元素的顶端对齐。
* text-bottom	把元素的底端与父元素字体的底端对齐。
* length	 
* %	使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。
* inherit	规定应该从父元素继承 vertical-align 属性的值。

> inline元素下方可能会有一点空隙

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        ul{
            background-color: bisque;
        }
        .box { display: inline-block;
            width: 100px;
            height: 100px;
            background-color: aliceblue;
            /*vertical-align: middle;*/
        }
    </style>
</head>
<body>
<ul>
    <li class="box"></li>
    <li class="box"></li>
    <li class="box"></li>
</ul>
</body>
</html>
```

**vertical-align:baseline -> vertical-align:middle**

> 水平空隙

li元素的水平空隙是因为换行引起的，这个换行会变成一个空白，这个空白会被解析为DOM中的文本节点
```html
<ul>
  <li class="box"></li>
  <li class="box"></li>
  <li class="box"></li>
</ul>
```
`解决方法：`
1. 删除多余空格！如下代码
```html
<ul>
  <li class="box"></li><li class="box"></li><li class="box"></li>
</ul>
```
2. 注释法<!-- 注释去空格-->
```html
<ul>
        <li class="box"></li><!-- 注释去空格
     --><li class="box"></li><!-- 注释去空格
     --><li class="box"></li>
</ul>
```
3. letter-spacing:-6px;
```html
<ul>
    <li style="letter-spacing:-6px;"></li>
    <li style="letter-spacing:-6px;"></li>
    <li style="letter-spacing:-6px;"></li>
</ul>
```
`*注意` letter-spacing会让文本继承，会导致文字`重叠`

4. float:left
5. table