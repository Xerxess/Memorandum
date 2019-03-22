# css-next

@supports 指定依赖于浏览器中的一个或多个特定的CSS功能的支持声明。这称为特征查询。规则可以放在代码的顶层，也可以嵌套在任何其他条件组中。

@supports可以通过CSS对象模型接口访问CSSSupportsRule。

语法: 支持条件由一个或多个由连接（and），析取（or）和/或否定（not）组合的名称 - 值对组成。可以使用括号定义运算符的优先级。

```css 
@supports (display: grid) {
  div {
    display: grid;
  }
}

@supports not (display: grid) {
  div {
    float: right;
  }
}
```


# 功能符号

* calc()  指定CSS属性值时进行计算
* min(expression [, expression])   CSS属性值的值的列表中设置最小的（最负）值
* max(expression  [, expression])  CSS属性值的值的列表中设置最大（最大）值
* clamp(MIN, VAL, MAX)  允许在定义的最小值和最大值之间的值范围内选择中间值。需要三个参数：最小值，首选值和最大允许值
* toggle()  
* attr(attribute-name)  检索所选择的元素的属性的值，并且在样式表中使用它。它也可以用在伪元素上，在这种情况下，返回伪元素的原始元素的属性值。
* cross-fade() 函数可用于以定义的透明度混合两个或多个图像

# 自定义属性（ - *）：CSS变量
以--（例如）为前缀的属性名称--example-name表示包含可以在使用该 函数的其他声明中使用的值的自定义属性var()。

自定义属性同样支持继承。一个元素上没有定义自定义属性，该自定义属性的值会继承其父元素

```css 
:root {
    --somekeyword: left;
    --somecolor: #0000ff;
    --somecomplexvalue: 3px 6px rgb(20, 32, 54);
}
```

`var(<custom-property-name> [, <declaration-value> ]?)`
<custom-property-name> 自定义属性名
<declaration-value> 声明值（回退值）

```css
:root {
  --main-bg-color: pink;
}

body {
  background-color: var(--main-bg-color);
}

/* 回退值 */

/* 在父元素样式中 */
.component {
  --text-color: #080; /* header-color 并没有被设定 */
}

/* 在 component 的样式中： */
.component .header {
  color: var(--header-color, blue); /* 此处 color 被回退到 blue */
}

.component .text {
  color: var(--text-color, black);
}

```

# cubic-bezier(x1, y1, x2, y2) 立方贝塞尔曲线 自己定义一个加速度曲线
# steps(number_of_steps, direction) 阶梯函数 逐针函数

* steps(number_of_steps, direction)
    * number_of_steps 拆分多少针
    * direction [start | end]

https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function

# Keywords for common timing-functions

* linear 匀速
* ease [default] 开始时加速得更厉害，加速度已经开始在它的中间附近减速。
* ease-in 动画开始缓慢，然后逐渐加速，直到达到最终状态，动画突然停止。
* ease-in-out 动画开始缓慢，加速而不是在接近最终状态时减速。
* ease-out 动画快速启动，然后在接近最终状态时逐渐减速。
* step-start === steps(1, start)
* step-end === steps(1, end)