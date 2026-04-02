
# FractionallySizedBox

将其子控件的大小缩小到可用空间的一小部分。
FractionallySizedBox 是 Flutter 中的“百分比布局”神器。它的核心作用是：让子组件的大小相对于父组件的可用空间进行百分比缩放。

```dart
(new) FractionallySizedBox({
  Key? key,
  AlignmentGeometry alignment = Alignment.center,
  double? widthFactor,// 宽度的比例
  double? heightFactor, // 高的比例
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
          width: 300,
          height: 100,
          child: FractionallySizedBox(
            widthFactor: 0.5,
            heightFactor: 0.5,
            child: TextButton(
              child: Text("TextButton"),
              style: ButtonStyle(
                shape: WidgetStatePropertyAll<RoundedRectangleBorder>(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                backgroundColor: WidgetStatePropertyAll<Color>(
                  Colors.red[100]!,
                ),
              ),
              onPressed: () {},
            ),
          ),
        ),
      ),
    );
  }
}
```