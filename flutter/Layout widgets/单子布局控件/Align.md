
# Align

- 能将子控件对齐到自身内部，并可根据子控件的大小选择性地调整自身大小。

```dart
Align({
  Key? key,
  AlignmentGeometry alignment = Alignment.center,
  double? widthFactor, // 如果非空，则将其宽度设置为子元素的宽度乘以该系数。
  double? heightFactor, // 如果非空，则将其高度设置为孩子的身高乘​​以该系数
  Widget? child,
})
```

## demo

```dart
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 120.0,
        width: 120.0,
        color: Colors.blue[50],
        child: const Align(
          // alignment: Alignment(-1, 1),
          alignment: Alignment.topRight,
          child: FlutterLogo(size: 60),
        ),
      ),
    );
  }
}
```