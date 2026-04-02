
# Flow

根据 FlowDelegate 中的逻辑，高效地调整子元素大小和位置的小部件。

- 使用 Flow 组件必须提供一个 FlowDelegate，你需要重写以下核心方法
  - paintChildren：这是最重要的部分。通过 context.paintChild(i, transform: ...) 决定每个子组件的具体绘制位置和形态。
  - shouldRepaint：告诉 Flutter 何时需要重新触发绘制逻辑（通常与 Animation 对象关联）。
  - getSize：（可选）定义整个 Flow 容器的大小。注意 Flow 不会自动根据子组件大小撑开，必须手动指定。
- 优点：性能极佳，能实现任何天马行空的布局
- 缺点：上手难度大，需要处理坐标计算逻辑。
- 场景
  - 弹出式菜单：如环形菜单或扇形浮动操作按钮（FAB）
  - 视差滚动效果：子组件随页面滚动以不同速度位移。
  - 复杂的拖拽交互：需要子组件在屏幕上自由流畅移动。
- 瀑布流布局：
  - Flow 的局限：Flow 虽然性能高，但它不会自动计算子组件大小。实现瀑布流需要手动计算每个卡片的坐标偏移，开发难度极大。
  - flutter_staggered_grid_view：MasonryGridView (砌体布局)：这是最常用的组件。它会自动寻找每一列中高度最小的位置插入下一个卡片，从而形成错落的效果。

```dart

(new) Flow({
  Key? key,
  required FlowDelegate delegate,
  List<Widget> children = const <Widget>[],
  Clip clipBehavior = Clip.hardEdge,
})

```

## demo

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
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxHeight: 100), // 必须限制高度
        child: Flow(
          delegate: FlowMenuDelegate(),
          children: List.generate(
            5,
            (index) => Container(
              width: 50,
              height: 50,
              color: Colors.blue[100 * (index + 1)],
            ),
          ),
        ),
      ),
    );
  }
}

class FlowMenuDelegate extends FlowDelegate {
  // 重写以绘制流程的子元素
  @override
  void paintChildren(FlowPaintingContext context) {
    double x = 10.0; // 初始横坐标
    for (int i = 0; i < context.childCount; i++) {
      context.paintChild(i, transform: Matrix4.translationValues(x, 10.0, 0.0));
      x += context.getChildSize(i)!.width + 10.0; // 累加偏移
    }
  }

  @override
  bool shouldRepaint(covariant FlowDelegate oldDelegate) {
    return false;
  }
}
```
