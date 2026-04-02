
# Layout Props

## display

- 它的工作方式与 CSS 中的 display 类似，但仅支持 'flex'、'none' 和 'contents' 这三个值。
- 默认值为 `flex` 。

## flex

- flex 工作方式与 CSS 不同。
- flex 是一个数字而不是字符串，它由 Yoga 布局引擎控制。
- flex 为正数时，组件将具有弹性，其大小将与其 flex 值成正比。
- flex 为 0 时，组件将根据 width 和 height 调整大小，并且它是不可弯曲的。
- flex 值为 -1 ，组件通常会根据 width 和 height 自动调整大小。但是，如果空间不足，组件会缩小到其 minWidth 和 minHeight 。

```
flex: <positive number> 

等于 

flexGrow: <positive number>, flexShrink: 1, flexBasis: 0 。
```

> 回顾css中的flex

```
flex:1

默认值：  
flex-grow：0 // 放大比例
flex-shrink：1   // 缩小比例 当不够分配时，元素都将等比例缩小，占满整个宽度
flex-basis：auto // 初始因子，跟width 效果一样，但权重大于widht

flex-shrink:1 缩小比例
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


flex-grow:0 放大比例

<div style="width:500px;display:flex;">
    <div style="width:200px;flex-grow:1">item1</div>
    <div style="width:100px;flex-grow:2">item2</div>
</div>


容器剩余宽度：500-200-100=200px  
分成每份：200px / (1+2) = 66.666px  
元素1放大为：200px + 1 *66.666 = 266.66px  
元素2放大为：100px + 2* 66.666 = 233.32px  
```

## flexGrow 、 flexShrink 和 flexBasis

- 工作方式与 CSS 中的相同。
- flexGrow 描述了容器内的空间如何沿着主轴分配给其子元素。在布局完子元素后，容器会根据子元素指定的 flexGrow 值来分配剩余空间。flexGrow 接受任何浮点值 >= 0，默认值为 0。容器会将剩余空间根据子元素的 flexGrow 值加权分配给其子元素。
- flexShrink 描述了当子元素的总大小超出容器主轴方向的大小时，如何沿主轴方向 flexShrink 子元素。flexShrink 与 flexGrow 非常相似，可以理解为将超出部分视为负剩余空间。这两个属性可以很好地配合使用，使子元素能够根据需要进行缩放。flexShrink 接受任何浮点值 >= 0，默认值为 0。容器会根据子元素的 flexShrink 值加权缩小其子元素。
- flexBasis 是一种与轴向无关的方式，用于设置元素沿主轴的默认大小。设置子元素的 flexBasis 类似于设置其父元素为 flexDirection: row 的容器时该子元素的 width ，或者设置其父元素为 flexDirection: column 的容器时该子元素的 height 。元素的 flexBasis 是该元素的默认大小，即在执行任何 flexGrow 和 flexShrink 计算之前该元素的大小。
