
# Wrap

在 Flutter 中，Wrap 被称为 「会自动换行的 Row/Column」。

它是解决布局溢出（Overconstrained）的神器。当你使用 Row 排列组件，如果子组件总宽度超过屏幕，会报 Right Overflowed 错误；而换成 Wrap，它会自动把放不下的组件挤到下一行。

```dart
(new) Wrap({
  Key? key,
  Axis direction = Axis.horizontal, // 布局方向（默认 Axis.horizontal 横向）
  WrapAlignment alignment = WrapAlignment.start, // 主轴方向的对齐方式
  double spacing = 0.0, // 同一行内子组件的间距
  WrapAlignment runAlignment = WrapAlignment.start, // 纵轴方向（整体）的对齐方式
  double runSpacing = 0.0, // 行与行之间的间距
  WrapCrossAlignment crossAxisAlignment = WrapCrossAlignment.start,
  TextDirection? textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down,
  Clip clipBehavior = Clip.none,
  List<Widget> children = const <Widget>[],
})
```

## demo

```dart
void main() => runApp(
  Material(
    child: MaterialApp(home: SafeArea(child: MyWidget())),
  ),
);

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Wrap(
        alignment: WrapAlignment.center,
        spacing: 8,
        runSpacing: 0,
        children: [
          Chip(label: Text("Flutter")),
          Chip(label: Text("Dart")),
          Chip(label: Text("Wrap Layout")),
          Chip(label: Text("Auto Line Break")),
          Chip(label: Text("Widgets")),
        ],
      ),
    );
  }
}
```