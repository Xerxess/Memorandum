
# SliverToBoxAdapter

在 Flutter 的 CustomScrollView 世界里，SliverToBoxAdapter 是最常用的“桥梁”组件。它的唯一使命是：将一个普通的 Widget（Box 布局）转换成一个 Sliver 组件，从而让它能放进 slivers 列表中。

```dart
CustomScrollView(
  slivers: [
    Text("标题"), // ❌ 报错：不是 Sliver 类型
    SliverList(...),
  ],
)

CustomScrollView(
  slivers: [
    SliverToBoxAdapter(
      child: Text("标题", style: TextStyle(fontSize: 24)), // ✅ 正常运行
    ),
    SliverList(...),
  ],
)
```