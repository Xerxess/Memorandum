
# CustomSingleChildLayout

将其唯一子元素的布局委托给代理的小部件

- 解耦：布局逻辑被封装在 Delegate 类中，代码更整洁，适合处理极其复杂的交互式布局。
- 不要滥用：如果简单的 Stack、Align 或 Positioned 能搞定，就不要用它。它的开发成本和复杂度更高。

```dart
(new) CustomSingleChildLayout({
  Key? key,
  required SingleChildLayoutDelegate delegate,
  Widget? child,
})
```

## demo

```dart
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Center(
        child: Container(
          color: Colors.green,
          width: 200,
          height: 200,
          child: CustomSingleChildLayout(
            delegate: MyDelegate(),
            child: Container(color: Colors.red, child: Text("半宽靠右")),
          ),
        ),
      ),
    );
  }
}

class MyDelegate extends SingleChildLayoutDelegate {
  @override
  BoxConstraints getConstraintsForChild(BoxConstraints constraints) {
    // 强制子组件宽度为父级的一半，高度不限
    print(constraints);
    return BoxConstraints(
      maxWidth: 100,
      maxHeight: 100,
      minHeight: 100,
      minWidth: 100,
    );
  }

  @override
  Offset getPositionForChild(Size size, Size childSize) {
    // 将子组件放置在右侧：x = 父宽 - 子宽
    return Offset((size.width - childSize.width) / 2, 0);
  }

  @override
  bool shouldRelayout(MyDelegate oldDelegate) => false;
}
```