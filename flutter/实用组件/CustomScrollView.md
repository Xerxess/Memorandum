<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [CustomScrollView](#customscrollview)
  - [核心概念](#核心概念)
  - [常用组件（Sliver 家族）](#常用组件sliver-家族)
  - [CustomScrollView 的下拉刷新](#customscrollview-的下拉刷新)

<!-- /code_chunk_output -->

# CustomScrollView

CustomScrollView 是 Flutter 中功能最强大的滚动组件，它就像一个“容器插槽”，允许你将多种不同的滚动模型（如列表、网格、甚至浮动的标题）组合在同一个滚动视口（Viewport）中，并共享统一的滚动偏移量。

## 核心概念

普通的 Widget（如 ListView）会一次性占用剩下的所有空间，而 Sliver 是专门为 CustomScrollView 设计的“可滚动切片”。
Sliver 不会直接显示，它会告诉 CustomScrollView：“我现在还有多少内容需要显示”、“我的起始位置在哪里”。
只有当 Sliver 进入屏幕可见区域时，它才会被真正渲染，这保证了极高的性能。

## 常用组件（Sliver 家族）

- SliverAppBar：可以伸缩、折叠、隐藏的顶部导航栏。
- SliverList：等同于 ListView，按行排列。
- SliverGrid：等同于 GridView，按网格排列。
- SliverToBoxAdapter：最重要的桥梁。如果你想在滚动视图中放一个普通的 Widget（比如一个 Container 或 Text），必须用它包裹，否则会报错。
- SliverPadding / SliverFillRemaining：用于处理间距或填充剩余空间。

```dart
CustomScrollView(
  slivers: [
    // 1. 会折叠的顶部标题栏
    SliverAppBar(
      expandedHeight: 200.0,
      floating: false,
      pinned: true, // 滚动到顶部时是否固定
      flexibleSpace: FlexibleSpaceBar(
        title: Text("Sliver 示例"),
        background: Image.network("https://via.placeholder.com", fit: BoxFit.cover),
      ),
    ),

    // 2. 放入一个普通 Widget（必须用 Adapter 包裹）
    SliverToBoxAdapter(
      child: Container(
        height: 50,
        color: Colors.amber[100],
        child: Center(child: Text("我是中间插入的普通文本")),
      ),
    ),

    // 3. 网格部分
    SliverGrid(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 10,
        crossAxisSpacing: 10,
        childAspectRatio: 2.0,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) => Container(color: Colors.teal[100 * (index % 9)]),
        childCount: 4,
      ),
    ),

    // 4. 列表部分
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text("列表项目 $index")),
        childCount: 20,
      ),
    ),
  ],
)
```

## CustomScrollView 的下拉刷新

```dart
CustomScrollView(
  // 必须开启物理效果，确保在内容不满屏时也能下拉（尤其是 iOS 风格）
  physics: const BouncingScrollPhysics(
    parent: AlwaysScrollableScrollPhysics(),
  ),
  slivers: [
    // 1. 下拉刷新控制器（必须放在第一位）
    CupertinoSliverRefreshControl(
      onRefresh: () async {
        // 模拟网络请求
        await Future.delayed(const Duration(seconds: 2));
        print("刷新完成！");
      },
    ),
    
    // 2. 你的其他 Sliver 组件
    SliverAppBar(
      title: const Text("下拉刷新示例"),
      floating: true,
    ),
    
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text("项目 $index")),
        childCount: 20,
      ),
    ),
  ],
)
```