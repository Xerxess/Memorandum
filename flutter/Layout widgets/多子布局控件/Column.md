# Column

垂直阵列形式显示其子组件的小部件
要使子元素扩展以填充可用的垂直空间，请将子元素包裹在 Expanded 组件中

```dart
(new) Column({
  Key? key,
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start, // 决定子组件在垂直方向上如何分布
            // .start (默认)：靠顶。
            // .end：靠底。
            // .center：垂直居中。
            // .spaceBetween：两端对齐，中间平分间距。
            // .spaceAround：每个组件两侧间距相等（首尾间距是中间的一半）。
            // .spaceEvenly：所有间距完全相等。 
  MainAxisSize mainAxisSize = MainAxisSize.max, // 主轴尺寸
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center, // 决定子组件在水平方向上如何对齐（相对于最宽的子组件）
            // .center (默认)：水平居中。
            // .start：左对齐。
            // .end：右对齐。
            // .stretch：强制填满容器的宽度（非常常用）。
  TextDirection? textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down, // 排序方向
  TextBaseline? textBaseline,
  double spacing = 0.0, // 在每个子组件之间自动插入固定的间距，再也不用手动写一堆 SizedBox(height: 10) 了！
  List<Widget> children = const <Widget>[],
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
      child: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 10,
          children: [
            Expanded(child: Container(width: 100, color: Colors.red)),
            Expanded(child: Container(color: Colors.amber)),
            Expanded(child: Container(color: Colors.green)),
            Expanded(child: Container(color: Colors.deepPurpleAccent)),
            Expanded(child: Container(color: Colors.blue)),
          ],
        ),
      ),
    );
  }
}
```