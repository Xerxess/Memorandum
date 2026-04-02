# Center

将子组件居中于自身的组件

```dart
(new) Center({
  Key? key,
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
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Center(child: Text('Example', style: TextStyle(fontSize: 30))),
    );
  }
}
```