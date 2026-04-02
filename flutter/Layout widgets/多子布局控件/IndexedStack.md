
# IndexedStack

IndexedStack 是一个只显示一个子组件，但保留所有子组件状态的容器。它是 Stack 的变体。
状态保持：不同于 If-else 或 Switch 切换组件（会销毁并重建组件），IndexedStack 里的所有子组件在初始化后都会一直存在内存中。
层叠渲染：它像 Stack 一样把所有组件堆叠在一起，但通过 index 属性控制只有指定的那个可见且可交互。

```dart
(new) IndexedStack({
  Key? key,
  AlignmentGeometry alignment = AlignmentDirectional.topStart,
  TextDirection? textDirection,
  Clip clipBehavior = Clip.hardEdge,
  StackFit sizing = StackFit.loose,
  int? index = 0,
  List<Widget> children = const <Widget>[],
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
    return Center(child: MyWidgetCount());
  }
}

class MyWidgetCount extends StatefulWidget {
  const MyWidgetCount({super.key});

  @override
  State<MyWidgetCount> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidgetCount> {
  int index = 0;
  void change() {
    setState(() {
      if (index >= 5) {
        index = 0;
      }
      index = index + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        IndexedStack(
          index: index,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              color: const Color.fromARGB(255, 91, 209, 199),
              child: Text("He'd have you all unravel at the$index"),
            ),
            Container(
              padding: const EdgeInsets.all(8),
              color: const Color.fromARGB(255, 25, 61, 58),
              child: Text("He'd have you all unravel at the$index"),
            ),
            Container(
              padding: const EdgeInsets.all(8),
              color: const Color.fromARGB(255, 35, 125, 117),
              child: Text("He'd have you all unravel at the$index"),
            ),
          ],
        ),
        TextButton(
          onPressed: () {
            change();
          },
          child: Text("点击切换"),
        ),
      ],
    );
  }
}
```