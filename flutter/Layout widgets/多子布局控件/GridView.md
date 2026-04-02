
# GridView

GridView 是 Flutter 中最常用的滚动网格布局组件，用于在二维网格中展示数据（如九宫格、商品列表、图片墙）。它实质上是一个可以在两个方向上排列子组件的可滚动容器。

```dart
(new) GridView({
  Key? key,
  Axis scrollDirection = Axis.vertical, // 滚动方向。默认 Axis.vertical（上下滚），设为 Axis.horizontal 变成横向滑动的网格。
  bool reverse = false, // 是否反向。设为 true 后，内容会从底部/右侧开始排，适合聊天记录列表。
  ScrollController? controller, // 滚动控制器。用它来监听滚动位置，或者代码控制“一键置顶”。
  bool? primary, // 是否是与父 PrimaryScrollController 关联的主滚动视图
  ScrollPhysics? physics, // 滚动物理效果。 
                            // BouncingScrollPhysics: iOS 那种可以拉过头的回弹感。
                            // ClampingScrollPhysics: Android 那种撞墙感。
                            // NeverScrollableScrollPhysics: 禁止滚动（常用于让外层嵌套的 CustomScrollView 统一处理滚动）。
  bool shrinkWrap = false, // 默认 false。如果设为 true，GridView 会根据内容自收缩高度。
  EdgeInsetsGeometry? padding, // 内边距。控制网格整体与边缘的间隙。
  required SliverGridDelegate gridDelegate,
  bool addAutomaticKeepAlives = true,
  bool addRepaintBoundaries = true,
  bool addSemanticIndexes = true,
  double? cacheExtent, // 预加载缓冲区。数值越大，屏幕外提前渲染的组件越多，滚动越顺滑，但占内存。
  List<Widget> children = const <Widget>[],
  int? semanticChildCount, // 子级数量
  DragStartBehavior dragStartBehavior = DragStartBehavior.start, // 确定处理拖动启动行为的方式。
  Clip clipBehavior = Clip.hardEdge,
  ScrollViewKeyboardDismissBehavior? keyboardDismissBehavior, // 设为 onDrag 时，你一滑网格，键盘就自动收起。
  String? restorationId,
  HitTestBehavior hitTestBehavior = HitTestBehavior.opaque, // 决定点击空白处是否响应。
})
```

```dart
GridView.builder 用于处理大量或无限数据。它采用“懒加载”机制，只构建屏幕上可见的 item。
GridView.count 最简单的构造函数，直接指定横向有多少列。
GridView.custom 最灵活但也最复杂。它允许你自定义子组件的选取逻辑。
GridView.extent 根据你设定的最大宽度，自动计算屏幕能塞下几列。
```

## demo1

```dart
void main() => runApp(
  Directionality(
    textDirection: TextDirection.ltr,
    child: SafeArea(child: MyWidget()),
  ),
);

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // 获取当前屏幕宽度
    final screenWidth = MediaQuery.of(context).size.width;
    return Center(
      child: GridView.count(
        crossAxisCount: 1,
        childAspectRatio: 1,
        mainAxisSpacing: 10,
        crossAxisSpacing: 10,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            color: Colors.teal[100],
            child: const Text("He'd have you all unravel at the"),
          ),
          Container(
            padding: const EdgeInsets.all(8),
            color: Colors.teal[100],
            child: const Text("He'd have you all unravel at the"),
          ),
          Container(
            padding: const EdgeInsets.all(8),
            color: Colors.teal[100],
            child: const Text("He'd have you all unravel at the"),
          ),
        ],
      ),
    );
  }
}
```