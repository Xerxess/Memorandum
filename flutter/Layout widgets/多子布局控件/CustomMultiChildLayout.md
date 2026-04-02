
# CustomMultiChildLayout

你可以精准地决定每一个子组件的尺寸（Size）和坐标（Offset），甚至可以让它们互相参考位置。

- delegate: 必须提供一个 MultiChildLayoutDelegate 的实现类。所有的布局逻辑（谁在哪、多大）都写在这里。
- children: 子组件列表。注意：每个子组件必须包裹在 LayoutId 中，并赋予一个唯一的 ID，否则 Delegate 找不到它。

```dart
(new) CustomMultiChildLayout({
  Key? key,
  required MultiChildLayoutDelegate delegate,
  List<Widget> children = const <Widget>[],
})
```

## demo

```dart
// 让三个方块像楼梯一样排列，且后一个方块紧跟前一个方块的右下角。
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: SafeArea(
        child: // 2. 使用方式
        CustomMultiChildLayout(
          delegate: StaircaseDelegate(),
          children: [
            LayoutId(
              id: 1,
              child: Container(color: Colors.red, width: 50, height: 50),
            ),
            LayoutId(
              id: 2,
              child: Container(color: Colors.green, width: 50, height: 50),
            ),
            LayoutId(
              id: 3,
              child: Container(color: Colors.blue, width: 50, height: 50),
            ),
          ],
        ),
      ),
    );
  }
}

// 1. 定义 Delegate
class StaircaseDelegate extends MultiChildLayoutDelegate {
  @override
  void performLayout(Size size) {
    Offset lastOffset = Offset.zero;

    for (int i = 1; i <= 3; i++) {
      if (hasChild(i)) {
        // 告诉子组件：你可以长到 100x100
        Size childSize = layoutChild(
          i,
          BoxConstraints.loose(const Size(100, 100)),
        );
        // 放置子组件
        positionChild(i, lastOffset);
        // 计算下一个组件的起始坐标（在前一个的右下角）
        lastOffset += Offset(childSize.width, childSize.height);
      }
    }
  }

  @override
  bool shouldRelayout(covariant MultiChildLayoutDelegate oldDelegate) => false;
}
```
