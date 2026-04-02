<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ScrollView](#scrollview)
  - [事件](#事件)
    - [onContentSizeChange](#oncontentsizechange)
    - [onMomentumScrollBegin](#onmomentumscrollbegin)
    - [onMomentumScrollEnd](#onmomentumscrollend)
    - [onScroll](#onscroll)
    - [onScrollBeginDrag](#onscrollbegindrag)
    - [onScrollEndDrag](#onscrollenddrag)
    - [onScrollToTop iOS](#onscrolltotop-ios)
    - [overScrollMode Android](#overscrollmode-android)
  - [属性](#属性)
    - [通用](#通用)
      - [contentContainerStyle](#contentcontainerstyle)
      - [disableIntervalMomentum](#disableintervalmomentum)
      - [disableScrollViewPanResponder](#disablescrollviewpanresponder)
      - [contentOffset](#contentoffset)
      - [decelerationRate](#decelerationrate)
      - [horizontal](#horizontal)
      - [invertStickyHeaders](#invertstickyheaders)
      - [keyboardDismissMode](#keyboarddismissmode)
      - [keyboardShouldPersistTaps](#keyboardshouldpersisttaps)
      - [maintainVisibleContentPosition](#maintainvisiblecontentposition)
      - [pagingEnabled](#pagingenabled)
      - [refreshControl](#refreshcontrol)
      - [removeClippedSubviews](#removeclippedsubviews)
      - [scrollEnabled](#scrollenabled)
      - [scrollEventThrottle](#scrolleventthrottle)
      - [showsHorizontalScrollIndicator](#showshorizontalscrollindicator)
      - [showsVerticalScrollIndicator](#showsverticalscrollindicator)
      - [snapToAlignment](#snaptoalignment)
      - [snapToEnd](#snaptoend)
      - [snapToInterval](#snaptointerval)
      - [snapToOffsets](#snaptooffsets)
      - [snapToStart](#snaptostart)
      - [stickyHeaderHiddenOnScroll](#stickyheaderhiddenonscroll)
      - [stickyHeaderIndices](#stickyheaderindices)
    - [IOS](#ios)
      - [alwaysBounceHorizontal](#alwaysbouncehorizontal)
      - [alwaysBounceVertical](#alwaysbouncevertical)
      - [automaticallyAdjustContentInsets](#automaticallyadjustcontentinsets)
      - [automaticallyAdjustKeyboardInsets](#automaticallyadjustkeyboardinsets)
      - [automaticallyAdjustsScrollIndicatorInsets](#automaticallyadjustsscrollindicatorinsets)
      - [bounces](#bounces)
      - [bouncesZoom](#bounceszoom)
      - [canCancelContentTouches](#cancancelcontenttouches)
      - [centerContent](#centercontent)
      - [contentInset](#contentinset)
      - [contentInsetAdjustmentBehavior](#contentinsetadjustmentbehavior)
      - [directionalLockEnabled](#directionallockenabled)
      - [indicatorStyle](#indicatorstyle)
      - [maximumZoomScale](#maximumzoomscale)
      - [minimumZoomScale](#minimumzoomscale)
      - [pinchGestureEnabled](#pinchgestureenabled)
      - [scrollIndicatorInsets](#scrollindicatorinsets)
      - [scrollToOverflowEnabled](#scrolltooverflowenabled)
      - [scrollsToTop](#scrollstotop)
      - [zoomScale](#zoomscale)
    - [Android](#android)
      - [endFillColor](#endfillcolor)
      - [fadingEdgeLength](#fadingedgelength)
      - [nestedScrollEnabled](#nestedscrollenabled)
      - [persistentScrollbar](#persistentscrollbar)
      - [scrollPerfTag](#scrollperftag)
  - [方法](#方法)
    - [flashScrollIndicators()](#flashscrollindicators)
    - [scrollTo()](#scrollto)
    - [scrollToEnd()](#scrolltoend)

<!-- /code_chunk_output -->

# ScrollView

- ScrollView 必须具有限定高度才能正常工作
- ScrollView 会一次性渲染所有 React 子组件，但这会带来性能上的缺点
- FlatList 采用延迟渲染的方式， FlatList 在项目即将出现时才渲染，并移除滚动到屏幕外较远的项目，从而节省内存和处理时间。

## 事件

### onContentSizeChange

当 ScrollView 的可滚动内容视图发生变化时调用

### onMomentumScrollBegin

当动量滚动开始时调用（滚动视图开始滑动时发生的滚动）

### onMomentumScrollEnd

当动量滚动结束时调用（滚动视图滑行停止时发生的滚动）

### onScroll

滚动过程中，每帧最多触发一次。事件格式如下（所有未指定类型的值均为数字）：

### onScrollBeginDrag

当用户开始拖动滚动视图时调用。

### onScrollEndDrag

当用户停止拖动滚动视图时，滚动视图会停止或开始滑动。

### onScrollToTop iOS

点击状态栏后，滚动视图滚动到顶部时触发

### overScrollMode Android

用于覆盖 overScroll 模式的默认值

## 属性

### 通用

#### contentContainerStyle

- 样式将应用于包含所有子视图的滚动视图内容容器

#### disableIntervalMomentum

启用此选项后，无论手势速度多快，滚动视图都会在下一个索引位置（相对于释放时的滚动位置）停止。这可用于页面宽度小于水平滚动视图宽度或垂直滚动​​视图高度时的分页。

#### disableScrollViewPanResponder

启用此选项后，ScrollView 的默认 JS 平移响应器将被禁用，ScrollView 内部的触摸事件将完全由其子组件控制。

#### contentOffset

- 用于手动设置起始滚动偏移量。

#### decelerationRate

一个浮点数，用于确定用户抬起手指后滚动视图减速的速度。

#### horizontal

如果为 true ，则滚动视图的子元素将水平排列成行，而不是垂直排列成列。

#### invertStickyHeaders

如果希望粘性标题固定在 ScrollView 的底部而不是顶部，则通常与反向 ScrollView 一起使用。

#### keyboardDismissMode

决定拖动操作是否会收起键盘

#### keyboardShouldPersistTaps

决定点击后键盘何时应该保持可见。

#### maintainVisibleContentPosition

#### pagingEnabled

启用此选项后，滚动视图在滚动时会停在自身尺寸的倍数处。这可用于水平分页

#### refreshControl

RefreshControl 组件，用于为 ScrollView 提供下拉刷新功能。仅适用于垂直 ScrollView（ horizontal 属性必须为 false ）。

#### removeClippedSubviews

启用 true 选项后，当子视图移出屏幕时，它们将从其原生父视图中移除。这可以提升大型列表的滚动性能。在 Android 系统中，默认值为 true 。

#### scrollEnabled

如果设置为 false，则无法通过触摸交互滚动视图。

#### scrollEventThrottle

限制滚动时滚动事件的触发频率，以毫秒为单位指定时间间隔。当滚动操作需要执行耗时操作时，此功能非常有用。值 16 将禁用滚动频率限制，无论设备的刷新率如何。

#### showsHorizontalScrollIndicator

为 true 时，显示水平滚动指示器。

#### showsVerticalScrollIndicator

为 true 时，显示垂直滚动指示器。

#### snapToAlignment

当设置 snapToInterval 时， snapToAlignment 将定义捕捉与滚动视图的关系。

#### snapToEnd

与 snapToOffsets 配合使用。默认情况下，列表末尾会被视为一个对齐偏移量。将 snapToEnd 设置为 false 可禁用此行为，并允许列表在其末尾和最后一个 snapToOffsets 偏移量之间自由滚动。

#### snapToInterval

启用此设置后，滚动视图会在 snapToInterval 值的倍数处停止。这可用于对长度小于滚动视图的子元素进行分页。通常与 snapToAlignment 和 decelerationRate="fast" 结合使用。会覆盖配置较少的 pagingEnabled 属性。

#### snapToOffsets

启用此选项后，滚动视图会在指定的偏移量处停止滚动。这可用于分页浏览长度小于滚动视图的子元素。通常与 decelerationRate="fast" 结合使用。此设置会覆盖配置较少的 pagingEnabled 和 snapToInterval 属性。

#### snapToStart

#### stickyHeaderHiddenOnScroll

设置为 true 时，向下滚动列表时将隐藏固定标题栏，向上滚动列表时将停靠在列表顶部。

#### stickyHeaderIndices

一个子元素索引数组，用于确定滚动时哪些子元素会被固定在屏幕顶部。例如，传递 stickyHeaderIndices={[0]} 将使第一个子元素固定在滚动视图的顶部。您还可以使用类似 `[x,y,z]` 的参数，使多个元素在顶部固定显示。此属性不支持与 horizontal={true} 同时使用。

### IOS

#### alwaysBounceHorizontal

- 即使内容小于滚动视图本身,滚动视图到达末尾时也会水平弹跳

#### alwaysBounceVertical

- 即使内容小于滚动视图本身，滚动视图到达末尾时也会垂直弹跳。

#### automaticallyAdjustContentInsets

- 控制 iOS 是否应自动调整位于导航栏或标签栏/工具栏后面的滚动视图的内容内边距。

#### automaticallyAdjustKeyboardInsets

- 控制当键盘改变大小时，ScrollView 是否应该自动调整其 contentInset 和 scrollViewInsets 。

#### automaticallyAdjustsScrollIndicatorInsets

- 控制 iOS 是否应自动调整滚动指示器内边距。

#### bounces

- 如果设置为 true，当滚动视图到达内容末尾且内容沿滚动方向的轴心大于滚动视图时，滚动视图会回弹。如果设置为 false ，即使 alwaysBounce* 属性设置为 true ，也会禁用所有回弹效果。

#### bouncesZoom

#### canCancelContentTouches

#### centerContent

- 当此属性为 true 时，当内容小于滚动视图边界时，滚动视图会自动将内容居中；当内容大于滚动视图边界时，此属性无效。

#### contentInset

滚动视图内容与滚动视图边缘之间的内缩量。

#### contentInsetAdjustmentBehavior

- 此属性指定如何使用安全区域内边距来修改滚动视图的内容区域。适用于 iOS 11 及更高版本。

#### directionalLockEnabled

如果设置为 true，ScrollView 在拖动时将尝试锁定为仅垂直或水平滚动。

#### indicatorStyle

滚动指示器的样式。

#### maximumZoomScale

允许的最大缩放比例。

#### minimumZoomScale

最小允许缩放比例。

#### pinchGestureEnabled

启用后，ScrollView 允许使用捏合手势进行放大和缩小。

#### scrollIndicatorInsets

滚动视图指示器从滚动视图边缘向内缩进的量。通常情况下，此值应设置为与 contentInset 相同的值。

#### scrollToOverflowEnabled

如果为 true ，则可以通过编程方式将滚动视图滚动到超出其内容大小的范围。

#### scrollsToTop

true 后，点击状态栏时，滚动视图将滚动到顶部。

#### zoomScale

当前滚动视图内容的缩放比例。

### Android

#### endFillColor

滚动视图占用的空间会超过其内容实际填充的空间。

#### fadingEdgeLength

淡化滚动内容的边缘。

#### nestedScrollEnabled

为 Android API 级别 21+ 启用嵌套滚动

#### persistentScrollbar

导致滚动条在不使用时不会变为透明

#### scrollPerfTag

此标签用于记录此滚动视图的滚动性能。它会强制启用动量事件（参见 sendMomentumEvents）。此功能本身没有任何作用，您需要实现一个自定义的原生 FpsListener 才能使其发挥作用。

## 方法

### flashScrollIndicators()

短暂显示滚动指示器。

### scrollTo()

滚动到指定的 x、y 偏移量，可以立即滚动，也可以通过平滑动画滚动。

### scrollToEnd()

如果是垂直滚动视图，则滚动到底部；如果是水平滚动视图，则滚动到右侧。
