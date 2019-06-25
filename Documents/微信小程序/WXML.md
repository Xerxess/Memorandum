<!-- TOC -->

- [数据绑定](#数据绑定)
- [逻辑判断](#逻辑判断)
- [字符串运算](#字符串运算)
- [数据路径运算](#数据路径运算)
- [数组](#数组)
- [对象](#对象)
- [列表渲染](#列表渲染)
- [条件渲染](#条件渲染)
- [模板](#模板)
- [引用](#引用)

<!-- /TOC -->
# 数据绑定

```
<view> {{ message }} </view>
<view id="item-{{id}}"> </view>
<view wx:if="{{condition}}"> </view>
<checkbox checked="{{false}}"> </checkbox>
<view hidden="{{flag ? true : false}}"> Hidden </view>
<view> {{a + b}} + {{c}} + d </view>
```

# 逻辑判断

```
<view wx:if="{{length > 5}}"> </view>

```

# 字符串运算

```
<view>{{"hello" + name}}</view>
```

# 数据路径运算

```
<view>{{object.key}} {{array[0]}}</view>
```

# 数组

```
<view wx:for="{{[zero, 1, 2, 3, 4]}}"> {{item}} </view>
```

# 对象

```
<template is="objectCombine" data="{{for: a, bar: b}}"></template>
<template is="objectCombine" data="{{...obj1, ...obj2, e: 5}}"></template>
<template is="objectCombine" data="{{foo, bar}}"></template>
<template is="objectCombine" data="{{...obj1, ...obj2, a, c: 6}}"></template>
```


# 列表渲染

```
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>

<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>


<block wx:for="{{[1, 2, 3]}}" wx:key>
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```

# 条件渲染

```
<view wx:if="{{condition}}"> True </view>

<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>


block wx:if
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

# 模板

```
//定义
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>

//is="msgItem"使用模板
<template is="msgItem" data="{{...item}}"/>
```

# 引用

* import 只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template
* include 可以将目标文件除了 \<template\/\> \<wxs\/\> 外的整个代码引入，相当于是拷贝到 include 位置

```
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>

<!-- index.wxml -->
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>

```