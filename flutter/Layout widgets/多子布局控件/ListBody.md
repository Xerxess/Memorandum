
# ListBody

ListBody 是一个极简、不可滚动的布局组件，它会按照主轴方向（默认垂直）将子组件一个接一个地排列。
这个组件很少直接使用。建议改用 ListView 。
一般都会配合ListView或者Column等控件使用。
在主轴上，给予子节点的空间必须是不受限制的（unlimited），使得子节点可以全部被容纳，ListBody不会去裁剪或者缩放其子节点。
SingleChildScrollView：这是最常见的搭档。由于 ListBody 会根据子组件撑开无限高度，配合 SingleChildScrollView 可以将其转化为一个可滚动的列表

```dart
(new) ListBody({
  Key? key,
  Axis mainAxis = Axis.vertical,
  bool reverse = false,
  List<Widget> children = const <Widget>[],
})
```

```dart
void main() => runApp(
  Directionality(
    textDirection: TextDirection.ltr,
    child: SafeArea(child: MyWidget()),
  ),
);

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // 获取当前屏幕宽度
    return Column(
      children: <Widget>[
        ListBody(
          mainAxis: Axis.vertical,
          reverse: false,
          children: <Widget>[
            Container(color: Colors.red, width: 50.0, height: 50.0),
            Container(color: Colors.yellow, width: 50.0, height: 50.0),
            Container(color: Colors.green, width: 50.0, height: 50.0),
            Container(color: Colors.blue, width: 50.0, height: 50.0),
            Container(color: Colors.amber, width: 50.0, height: 50.0),
          ],
        ),
        Text("Demo"),
      ],
    );
  }
}
```
