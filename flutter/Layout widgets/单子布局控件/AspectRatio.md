
# AspectRatio

- 尝试将子元素调整为特定宽高比的小部件
- 计算规则
    - 首先尝试布局约束允许的最大宽度，然后通过将给定的宽高比应用于宽度来确定组件的高度，宽高比表示为宽度与高度的比率。
    - 最大宽度为无穷大，则初始宽度由最大高度按长宽比确定。

```dart
AspectRatio({
  Key? key,
  required double aspectRatio, // 创建具有特定宽高比的小部件
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
        color: Colors.blue[50],
        child: const AspectRatio(
          aspectRatio: 16 / 9,
          child: FlutterLogo(size: 60),
        ),
      ),
    );
  }
}
```