<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Layout widgets](#layout-widgets)
  - [单子布局控件](#单子布局控件)
  - [多子布局控件](#多子布局控件)
  - [Sliver 小部件](#sliver-小部件)

<!-- /code_chunk_output -->

# Layout widgets

## 单子布局控件

- Align 一个控件，它能将子控件对齐到自身内部，并可根据子控件的大小选择性地调整自身大小。

- AspectRatio 一个尝试将子元素调整为特定宽高比的小部件。

- Baseline 根据子元素的基线定位子元素的容器。

- Center 对齐模块，使其子模块在其自身内部居中。

- ConstrainedBox 一个对其子组件施加额外约束的组件。

- Container 一个便捷的小部件，它结合了常用的绘制、定位和调整大小的小部件。

- CustomSingleChildLayout 一个将其唯一子元素的布局委托给代理的小部件。

- Expanded 展开 Row、Column 或 Flex 的子组件。

- FractionallySizedBox 一个控件，它会将子控件的大小调整为可用空间的一小部分。有关布局算法的更多详细信息，请参阅 RenderFractionallySizedOverflowBox。

- IntrinsicHeight 一个能根据子组件自身高度调整其大小的组件。

- IntrinsicWidth 一个控件，其子控件的大小会根据子控件自身的宽度自动调整。

- LimitedBox 一个只有在不受约束时才会限制自身大小的盒子。

- Offstage 一个能将孩子像放在树上一样摆放的小部件，但不会绘制任何内容，也不会让孩子可以被击中……

- OverflowBox 一个组件对其子组件施加了与父组件不同的约束，这可能导致子组件超出父组件的范围。

- Padding 一个可以根据给定的内边距向内缩进其子元素的控件。

- SizedBox 一个具有指定尺寸的方框。如果指定了子控件，此控件会强制其子控件具有指定的宽度和/或高度（假设值是……）。

- SizedOverflowBox 一个具有特定大小的组件，但将其原始约束传递给其子组件，这可能会导致溢出。

- Transform 一个在绘制其子元素之前应用转换的小部件。

## 多子布局控件

- Column 垂直方向布局一系列子控件。

- CustomMultiChildLayout 使用委托来控制多个子控件的大小和位置的小部件。

- CarouselView 一个 Material 轮播组件，可以显示可滚动的项目列表，每个项目都可以根据所选布局动态改变大小。

- Flow 实现流式布局算法的小部件。

- GridView 网格列表由重复排列的单元格组成，这些单元格以垂直和水平方向排列。GridView 组件实现了这一功能。

- IndexedStack 一个堆栈，显示子列表中的单个子项。

- LayoutBuilder 构建一个可以依赖于父组件大小的组件树。

- ListBody 一个控件，它沿给定的轴按顺序排列其子控件，并强制它们在另一个轴上与父控件的尺寸相同。

- ListView 一个可滚动的线性控件列表。它是最常用的滚动控件，会沿着滚动方向依次显示其子控件。

- Row 水平方向布局一系列子控件。

- Stack 如果您想以简单的方式重叠多个子元素，例如，将一些文本和图像叠加在一起……，那么这个类非常有用。

- Table 以行和列的形式显示子控件。

- Wrap 一个可以水平或垂直显示其子组件的小部件。

## Sliver 小部件

- CupertinoSliverNavigationBar 使用类似 iOS 11 风格的大标题导航栏，标题采用细条设计。

- CupertinoSliverRefreshControl 一个实现了 iOS 风格的下拉刷新内容控件的 Sliver 小部件。

- CustomScrollView 使用 Sliver 创建自定义滚动效果的 ScrollView。

- SliverAppBar 一个与 CustomScrollView 集成的 Material Design 应用栏。

- SliverChildBuilderDelegate 使用构建器回调为 Sliver 提供子元素的委托。

- SliverChildListDelegate 使用显式列表为 Sliver 提供子项的委托。

- SliverFillRemaining 一个包含单个盒状子元素的狭长区域，该子元素填充视口中的剩余空间。

- SliverFixedExtentList 将多个具有相同主轴范围的子框以线性阵列的形式放置。

- SliverGrid 将多个子框以二维方式排列的条形区域。

- SliverList 一个沿主轴以线性阵列形式放置多个子框的 sliver。

- SliverPadding 一种用于在另一条条带两侧施加衬垫的条带。

- SliverPersistentHeader 当滚动到视口边缘与生长方向相反的位置时，该条形的大小会发生变化。

- SliverToBoxAdapter 包含单个框组件的条形区域。
