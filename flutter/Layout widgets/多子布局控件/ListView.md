
# ListView

ListView 是 Flutter 中最常用的滚动组件。它本质上是一个 可滚动的线性排列容器。

```dart
(new) ListView({
  Key? key,
  Axis scrollDirection = Axis.vertical, // 	控制滚动方向
  bool reverse = false,
  ScrollController? controller,
  bool? primary,
  ScrollPhysics? physics, // 控制滚动物理效果 BouncingScrollPhysics（iOS 回弹）或 ClampingScrollPhysics（Android 遮罩）。
  bool shrinkWrap = false, // 是否根据内容收缩高度
  EdgeInsetsGeometry? padding,
  double? itemExtent,
  double? Function(int, SliverLayoutDimensions)? itemExtentBuilder,
  Widget? prototypeItem,
  bool addAutomaticKeepAlives = true,
  bool addRepaintBoundaries = true,
  bool addSemanticIndexes = true,
  double? cacheExtent,
  List<Widget> children = const <Widget>[],
  int? semanticChildCount,
  DragStartBehavior dragStartBehavior = DragStartBehavior.start,
  ScrollViewKeyboardDismissBehavior? keyboardDismissBehavior,
  String? restorationId,
  Clip clipBehavior = Clip.hardEdge,
  HitTestBehavior hitTestBehavior = HitTestBehavior.opaque,
})
```

```dart
ListView.builder （最常用）通过 itemBuilder 回调按需构建
ListView.custom 需要高度自定义子组件布局逻辑（SliverChildDelegate）时使用。
ListView.separated 比 builder 多了一个 separatorBuilder需要在列表项之间插入分割线（如微信聊天列表）。
```

## demo

```dart
void main() => runApp(
  Material(
    child: Directionality(
      textDirection: TextDirection.ltr,
      child: SafeArea(child: MyWidget()),
    ),
  ),
);

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // 获取当前屏幕宽度
    return ListView.builder(
      itemCount: 100, // 列表长度
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          leading: CircleAvatar(child: Text("$index")),
          title: Text("项目标题 $index"),
          subtitle: Text("这是第 $index 条数据的详细描述"),
        );
      },
    );
  }
}
```