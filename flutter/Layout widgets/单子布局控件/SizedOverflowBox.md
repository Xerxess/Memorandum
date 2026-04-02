
# SizedOverflowBox

具有特定大小的控件，但将其原始约束传递给其子控件，这可能导致子控件溢出。
对父级（上层）：它报告自己的尺寸永远是指定的 size。
对子级（下层）：它不对子组件施加 size 的约束，而是直接透传父级给它的原始约束。
视觉结果：子组件如果比 size 大，就会从这个指定的“虚拟框”里溢出来，但父级完全不知道，依然按照 size 给它排位。

```dart
(new) SizedOverflowBox({
  Key? key,
  required Size size,
  AlignmentGeometry alignment = Alignment.center,
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
          color: Colors.amber,
          // SizedOverflowBox 声明自己只有 100x100
          child: SizedOverflowBox(
            size: const Size(100, 100),
            alignment: Alignment.center,
            child: Container(
              width: 200, // 子组件实际宽度 200
              height: 50,
              color: Colors.blue.withOpacity(0.5),
            ),
          ),
        ),
      ),
    );
  }
}
```