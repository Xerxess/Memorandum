

# 弹性盒子模型

> 子元素的排列方式（水平或者垂直）

（旧）box-orient：`horizontal` | vertical | inline-axis | block-axis  
（新）flex-direction：`row` | row-reverse | column | column-reverse

### 对应关系
* horizontal==row 水平行中从左向右排列子元素。
* vertical==column 从上向下垂直排列子元素。
* inline-axis （映射为 horizontal）
* block-axis （映射为 vertical）
* `box-orient:horizontal + box-direction:reverse==row-reverse`
* `box-orient:horizontal + box-direction:reverse==column-reverse`


> 子元素的排列顺序是否反转

（旧）box-direction：normal | reverse  
（新）无



> 子元素的对齐方式（左对齐|居中对齐|右对齐|两边对齐）

（旧）box-pack：`start` | center | end | justify  
（新）justify-content：`flex-start` | flex-end | center | space-between | space-around


### 对应关系

 * start==flex-start 设置伸缩盒对象的子元素从开始位置对齐
 * center==center 设置伸缩盒对象的子元素居中对齐
 * end==flex-end 设置伸缩盒对象的子元素从结束位置对齐（大部分情况等同于右对齐）
 * justify==space-between 设置或伸缩盒对象的子元素两端对齐
 * `space-around 弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半。` 

> 多行的弹性盒模型 类似justify-content对齐方式 本属性在`只有一行的伸缩容器上没有效果`。

（旧）`无`  
（新）align-content：`flex-start` | flex-end | center | space-between | space-around | stretch


### 对应关系
* flex-start 各行向弹性盒容器的起始位置堆叠  `开始对齐`
* flex-end 各行向弹性盒容器的结束位置堆叠  `尾部对齐`
* center 各行向弹性盒容器的中间位置堆叠  `居中对齐`
* space-between 各行在弹性盒容器中平均分布  `两边对齐`
* space-around 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。  `两边对齐,且保留间距`
* stretch 各行将会伸展以占用剩余的空间


> 子元素的对齐方式 box-pack的效果正好（相反）互补

（旧）box-align：`start` | end | center | baseline | stretch  
（新）align-items：`flex-start` | flex-end | center | baseline | stretch  


### 对应关系
* start==flex-start 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。`子元素从起始位置对齐`
* end==flex-end 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。`子元素从结束位置对齐`
* center==center 弹性盒子元素在该行的侧轴（纵轴）上居中放置。`子元素居中对齐`
* baseline 如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。`子元素从结束位置对齐`
* stretch==stretch 如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。`项目的内容随侧轴（纵轴）自动铺满盒子`

> 子元素如何分配其剩余空间 `(在子元素上使用)`

（旧）box-flex：`0` | number   
（新）flex：none | <' flex-grow '> <' flex-shrink >'? || <' flex-basis '>


```
* none：none关键字的计算值为: 0 0 auto

* 如果缩写「flex: 1」, 则其计算值为「1 1 0%」

* 如果缩写「flex: auto」, 则其计算值为「1 1 auto」

* 如果「flex: none」, 则其计算值为「0 0 auto」

* 如果「flex: 0 auto」或者「flex: initial」, 则其计算值为「0 1 auto」，即「flex」初始值  
```

> 弹性盒的扩展比率 `如何分配其剩余空间` `(不允许负值)` `(在子元素上使用)`

（旧）box-flex：`0` | number   
（新）flex-grow：`0` | number


> 弹性盒的收缩比率 `(不允许负值)` `(在子元素上使用)` 

（旧）无  
（新）flex-shrink：`1` | number 


> 弹性盒伸缩基准值 `如果所有子元素的基准值之和大于剩余空间，则会根据每项设置的基准值，按比率伸缩剩余空间` `(不允许负值)` `(在子元素上使用)`

（旧）无  
（新）flex-basis：`0%` |  length | percentage | auto | content


> 子元素的所属组 `(在子元素上使用)`

（旧）box-flex-group：`1` | integer  
（新）无


> 子元素的显示顺序 `(在子元素上使用)`

（旧）box-ordinal-group：`1` | integer 
（新）order：`0` | integer


> 子元素是否可以换行显示 

（旧）box-lines：`single` | multiple  
（新）flex-wrap：`nowrap` | wrap | wrap-reverse

### 对应关系

* single==nowrap 单行
* multiple==wrap 多行
* wrap-reverse `与 wrap相同且顺序倒序`

> 复合属性。设置或检索弹性盒模型对象的子元素排列方式。

（旧）无  
（新）flex-flow：<' flex-direction '> || <' flex-wrap '>

> 定义flex子项单独在侧轴（纵轴）方向上的对齐方式 `(在子元素上使用)`

（旧）无  
（新）align-self：`auto` | flex-start | flex-end | center | baseline | stretch

### 对应关系
* auto 计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。
* flex-start 子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
* flex-end 子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
* center 子元素在该行的侧轴（纵轴）上居中放置。
* baseline 子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。
* stretch 如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。`项目的内容随侧轴（纵轴）自动铺满盒子`

> 子元素排列方式（子元素的排列方向|单行或者多行）







# transform

对象以某个原点进行转换。
transform-origin：[ <percentage> | <length> | left | center① | right ] [ <percentage> | <length> | top | center② | bottom ]?

1. 某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化。
transform-style：flat | preserve-3d

2. 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。
perspective：none | <length>

3. 指定透视点的位置。
perspective-origin：[ <percentage> | <length> | left | center① | right ] [ <percentage> | <length> | top | center② | bottom ]?

4. 指定元素背面面向用户时是否可见。
backface-visibility：visible | hidden

> transition


检索或设置对象中的参与过渡的属性。
transition-property：none | <single-transition-property>[ ,<single-transition-property> ]*


1. 过渡的持续时间
transition-duration：<time>[ ,<time> ]*

2. 过渡的动画类型
transition-timing-function：<single-transition-timing-function>[,<single-transition-timing-function>]*

<single-transition-timing-function> = ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end | steps(<integer>[, [ start | end ] ]?) | cubic-bezier(<number>, <number>, <number>, <number>)

3. 延迟过渡的时间
transition-delay：<time>[ ,<time> ]*






> animation

对象所应用的动画名称，必须与规则@keyframes配合使用，因为动画名称由@keyframes定义
animation-name

1. 动画的持续时间
animation-duration：<time>[,<time>]*

2. 动画的过渡类型
animation-timing-function：<single-animation-timing-function>[,<single-animation-timing-function>]*

<single-animation-timing-function> = ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end | steps(<integer>[, [ start | end ] ]?) | cubic-bezier(<number>, <number>, <number>, <number>)

3. 动画的延迟时间
animation-delay：<time>[,<time>]*

4. 动画的循环次数
animation-iteration-count：<single-animation-iteration-count>[,<single-animation-iteration-count>]*

<single-animation-iteration-count> = infinite | <number>

5. 动画在循环中是否反向运动
animation-direction：<single-animation-direction>[,<single-animation-direction>]*

<single-animation-direction> = normal | reverse | alternate | alternate-reverse

6. 对象动画的状态
animation-play-state：<single-animation-play-state>[,<single-animation-play-state>]*

<single-animation-play-state> = running | paused

7. 动画时间之外的状态
animation-fill-mode：<single-animation-fill-mode>[,<single-animation-fill-mode>]*

<single-animation-fill-mode> = none | forwards | backwards | both






> meta


```
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">  
```
* width:以pixels（像素）为单位， 定义viewport（视口）的宽度。  
* height:以pixels（像素）为单位， 定义viewport（视口）的高度。  
* minimum-scale:定义缩放的最大值;它必须大于或等于最小规模或行为是不确定的。  
* initial-scale:定义缩放的最小值;它必须小于或等于最大规模或行为是不确定的。  
* user-scalable:如果设置为no，则用户无法放大网页。默认值是yes



















> 选择器

* E:first-child { sRules }E:必须是父级元素的子元素且位于第一位  
* E:last-child { sRules }E:必须是父级元素的子元素且位于最后一位  
* E:only-child { sRules }E为父级元素唯一的无素！  
* E:nth-child(n) { sRules }E必须是父级元素的子元素且位于所有子元素的第n位！  
* E:nth-last-child(n) { sRules }同E:nth-child(n)反向！  
* E:first-of-type { sRules }E必须是父级元素的子元素且第一次出现！  
* E:last-of-type { sRules }同E:first-of-type 反向！  
* E:only-of-type { sRules }E必须是父级元素的子元素且只能在所有子元素中出现一次  
* E:nth-of-type(n) { sRules }同E:nth-child，不同之处是位子的n（先根据E选择器过滤掉其他子元素的位置，再取在n位置的元素）  
* E:nth-last-of-type(n) { sRules }E:nth-of-type 反向！  
* E::placeholder { sRules }input-placeholder样式  
* E::selection { sRules }用户鼠标选中文本的样式