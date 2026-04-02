
# OverflowBox

对其子组件施加了与父组件不同的约束，这可能导致子组件超出父组件的范围。
- OverflowBox 是 Flutter 中的“越狱者”。
- 核心能力是：解除父组件传来的强制约束，允许子组件按照自己设定的尺寸（甚至超过父组件）进行渲染。

```dart
(new) OverflowBox({
  Key? key,
  AlignmentGeometry alignment = Alignment.center,
  double? minWidth,
  double? maxWidth,
  double? minHeight,
  double? maxHeight,
  OverflowBoxFit fit = OverflowBoxFit.max,
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
          width: 50,
          height: 50,
          color: Colors.blue,
          child: OverflowBox(
            maxWidth: 100, // 允许子组件宽度达到 100（比父级大 50）
            maxHeight: 100, // 允许子组件高度达到 100
            child: Container(
              decoration: BoxDecoration(
                color: Colors.red.withAlpha(50),
                shape: BoxShape.circle, // 红色圆圈会溢出蓝色方块
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```