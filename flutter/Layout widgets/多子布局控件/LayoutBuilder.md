
# LayoutBuilder

LayoutBuilder 是 Flutter 中的**“响应式布局利器”**。它的核心作用是：根据父组件传递的约束（Constraints）来动态决定子组件的长相。
屏幕适配：手机屏显示一列，平板屏（宽度大于 600）显示两列。

```dart
(new) LayoutBuilder({
    Key? key, 
    required Widget Function(BuildContext, BoxConstraints) builder
})
```

## demo

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
    return Center(
      child: LayoutBuilder(
        builder: (context, constraints) {
          if (constraints.maxWidth > 200) {
            // 宽屏模式：横向排列
            return Row(
              children: [
                Text("侧边栏"),
                Expanded(child: Text("内容区")),
              ],
            );
          } else {
            // 窄屏模式：纵向排列
            return Column(children: [Text("内容区"), Text("底部导航")]);
          }
        },
      ),
    );
  }
}
```
