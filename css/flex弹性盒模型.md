# display: flex

<https://developer.mozilla.org/en-US/docs/Glossary/Flex>
<https://www.cnblogs.com/qcloud1001/p/9848619.html>

容器属性:

* flex-flow  == flex-drection + flex-wrap
* flex-direction：`row`|column|row-reverse|column-reverse 水平|垂直|水平反转|垂直反转
* flex-wrap：`nowrap`|wrap|wrap-reverse 可使得主轴上的元素不折行、折行、反向折行。
* justify-content:`normal`
* align-items `stretch`|flex-start|flex-end|center
* align-content

元素属性

* order：排序
* flex-grow:`0` 放大比例 当子项总和小于容器时生效
* flex-shrink:`1` 缩小比例 当子项总和大于容器时生效
* flex-basis：`auto` 默认值，权值大于width
* flex： flex-grow flex-shrink  flex-basis
* align-self 相对align-items 但针对flex子项

## `主轴`

![Alt text](images/flex/1.png)  

![Alt text](images/flex/2.png)

## justify-content 相对于主轴

`normal` 项目打包在默认位置,网格和弹性容器中表现为拉伸。

normal | \<content-distribution\> | \<overflow-position\>? [ <content-position> | left | right ]  

\<content-distribution\> = space-between | space-around | space-evenly | stretch  
\<overflow-position\> = unsafe | safe  
\<content-position\> = center | start | end | flex-start | flex-end  

## align-items 相对交叉轴

* stretch 拉升，导致flex 高/宽 100%;
* flex-start
* flex-end
* center

## flex

默认值：  
flex-grow：0
flex-shrink：1  
flex-basis：auto

* flex: 1 =「1 1 0%」

* flex: auto=「1 1 auto」

* flex: none=「0 0 auto」 // 常用于固定尺寸 不伸缩

* 如果「flex: 0 auto」或者「flex: initial」, 则其计算值为「0 1 auto」，即「flex」初始值  

## flex-shrink:1 缩小比例

当不够分配时，元素都将等比例缩小，占满整个宽度

根据各子项的宽度比率，平均拆分多出的宽度。

```html
<div style="width:500px;display:flex;">
    <div style="width:200px;flex-shrink:1">item1</div>
    <div style="width:300px;flex-shrink:1">item2</div>
    <div style="width:400px;flex-shrink:1">item3</div>
</div>
```

sum=200\*flex-shrink+300\*flex-shrink+400\*flex-shrink=900
_d=sum-500=400
各子项的宽度比率：
item1=200/900
item2=300/900  
item3=400/900

item1-width=200-400\*200/900 =111.111  
item1-width=300-400\*300/900 =166.666  
item1-width=400-400\*400/900 =222.222  

![Alt text](images/flex/demo.gif)

## flex-grow:0 放大比例

```html
<div style="width:500px;display:flex;">
    <div style="width:200px;flex-grow:1">item1</div>
    <div style="width:100px;flex-grow:2">item2</div>
</div>
```

容器剩余宽度：500-200-100=200px  
分成每份：200px / (1+2) = 66.666px  
元素1放大为：200px + 1 *66.666 = 266.66px  
元素2放大为：100px + 2* 66.666 = 233.32px  

## flex-basis 初始因子，跟width 效果一样，但权重大于widht

注意，如果内部子元素width大于flex-basis,则此时flex-basis==子元素的width

## white-space:nowrap 不换行 导致窗器宽度大于100% 可能会触发flex-shrink 缩放因子

# 小笔记

## flex: 1 & display:flex 导致的宽度失效问题

* 当一个元素被设置为 display: flex 时，它变成了一个弹性容器，而其子元素成为了 flex 项目（flex items）。根据 CSS 规范，flex 项目默认的 min-width 是 auto，这意味着该元素的最小宽度取决于它的内容。如果内容宽度超过了 flex-basis 设定的初始宽度，min-width: auto 会阻止元素缩小到比其内容更窄。
* 常在text-overflow: ellipsis;overflow-x: hidden时flex:1 宽度失效
  * 方法一：需要在子元素将min-width: 0;解除约束：直接告诉浏览器，这个元素可以收缩到任意小，打破了 min-width: auto 的限制。然后 flex-grow 按正常逻辑工作。
  * 方法二（奇技淫巧）：使用width: 1px 通过设置一个极小的 width，强制 flex-basis 变得很小，从而“欺骗”了 Flexbox 的计算，使其能够正常伸缩。

```html
<div style=" display: flex;width: 400px;height: 200px;border: 1px solid;">
<div class="label">
    【我是个标签】
</div>
<!-- 注意min-width: 0; -->
<div style="background: #eee;height: 100%;flex: 1;display: flex;flex-wrap: wrap;min-width: 0;">
    <div style="width: 100%;display: flex;">
        <div style="height: 50px;flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow-x: hidden;background-color: #d0b3f4;">标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容</div>
    </div> 
    <div style="width: 100%;
      height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      background-color: #ed8e8e;">标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容</div>
    <div style="width: 30%;
      height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      background-color: #dff4cb;">标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容</div>
</div>
</div>
```

```html
<div style=" display: flex;width: 400px;height: 200px;border: 1px solid;">
<div class="label">
    【我是个标签】
</div>
 <!-- 奇技淫巧 width: 1px -->
<div style="background: #eee;height: 100%;flex: 1;display: flex;flex-wrap: wrap;width: 1px">
    <div style="width: 100%;display: flex;">
        <div style="height: 50px;flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow-x: hidden;background-color: #d0b3f4;">标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容</div>
    </div> 
    <div style="width: 100%;
      height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      background-color: #ed8e8e;">标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容</div>
    <div style="width: 30%;
      height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      background-color: #dff4cb;">标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容标签内容</div>
</div>
</div>
```
