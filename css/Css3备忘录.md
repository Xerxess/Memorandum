

> 弹性盒子模型

1. 子元素的排列方式（水平或者垂直）
（旧）box-orient：horizontal | vertical | inline-axis | block-axis
（新）flex-direction：row | row-reverse | column | column-reverse

```
* 可以通过box-orient:horizontal + box-direction:normal 达到新版本 flex-direction:row 的效果；

* 可以通过box-orient:horizontal + box-direction:reverse 达到新版本 flex-direction:row-reverse 的效果；

* 可以通过box-orient:vertical + box-direction:normal 达到新版本 flex-direction:column 的效果；

* 可以通过box-orient:horizontal + box-direction:reverse 达到新版本 flex-direction:column-reverse 的效果；

```

2. 子元素的排列顺序是否反转
（旧）box-direction：normal | reverse
（新）无


3. 子元素的对齐方式（左对齐|居中对齐|右对齐|两边对齐）
（旧）box-pack：start | center | end | justify
（新）justify-content：flex-start | flex-end | center | space-between | space-around


4. 多行的弹性盒模型 类似justify-content对齐方式 本属性在只有一行的伸缩容器上没有效果。
（旧）无
（新）align-content：flex-start | flex-end | center | space-between | space-around | stretch


5. 子元素的对齐方式 box-pack的效果正好（相反）互补
（旧）box-align：start | end | center | baseline | stretch
（新）align-items：flex-start | flex-end | center | baseline | stretch


6. 子元素如何分配其剩余空间
（旧）box-flex：<number>
（新）flex：none | <' flex-grow '> <' flex-shrink >'? || <' flex-basis '>


```
* 如果缩写「flex: 1」, 则其计算值为「1 1 0%」

* 如果缩写「flex: auto」, 则其计算值为「1 1 auto」

* 如果「flex: none」, 则其计算值为「0 0 auto」

* 如果「flex: 0 auto」或者「flex: initial」, 则其计算值为「0 1 auto」，即「flex」初始值  
```

7. 弹性盒的扩展比率
（旧）无
（新）flex-grow：<number>


8. 弹性盒的收缩比率
（旧）无
（新）flex-shrink：<number>


9. 弹性盒伸缩基准值
（旧）无
（新）flex-basis：<length> | <percentage> | auto | content


10. 子元素的所属组
（旧）box-flex-group：<integer>
（新）无


11. 子元素的显示顺序
（旧）box-ordinal-group：<integer>
（新）order：<integer>


12. 子元素是否可以换行显示
（旧）box-lines：single | multiple
（新）flex-wrap：nowrap | wrap | wrap-reverse



13. 定义flex子项单独在侧轴（纵轴）方向上的对齐方式
（旧）无
（新）align-self：auto | flex-start | flex-end | center | baseline | stretch



14. 子元素排列方式（子元素的排列方向|单行或者多行）
（旧）无
（新）flex-flow：<' flex-direction '> || <' flex-wrap '>













> transform

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