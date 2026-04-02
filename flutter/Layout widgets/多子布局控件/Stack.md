
# Stack

在 Flutter 中，Stack 是用于实现层叠布局的核心组件。它的逻辑很简单：子组件按顺序堆叠，代码中写在后面的组件会盖在前面的组件之上。

- 核心成员：两种子组件
  - 非定位组件 (Unpositioned)
  - 定位组件 (Positioned) 通过 top, bottom, left, right, width, height 精确控制相对于 Stack 四个边的距离。

```dart
(new) Stack({
  Key? key,
  AlignmentGeometry alignment = AlignmentDirectional.topStart, //  控制非定位组件的对齐方式
  TextDirection? textDirection,
  StackFit fit = StackFit.loose, // 控制非定位组件如何填满空间 StackFit.loose (自适应), StackFit.expand (强制撑满父容器)。
  Clip clipBehavior = Clip.hardEdge, // 超出 Stack 范围的内容如何处理 Clip.none (允许溢出显示), Clip.hardEdge (裁剪)。
  List<Widget> children = const <Widget>[],
})
```

```dart
void main() => runApp(
  Material(
    child: Directionality(
      textDirection: TextDirection.ltr,
      child: SafeArea(child: MyWidget()),
    ),
  ),
);

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(
        alignment: Alignment.bottomRight, // 非定位组件默认靠右下
        children: <Widget>[
          // 1. 底层：头像（非定位组件，撑起 Stack 的大小）
          Container(
            width: 100,
            height: 100,
            color: Colors.blue,
            child: const Icon(Icons.person, size: 50, color: Colors.white),
          ),

          // 2. 顶层：在线状态小绿点（定位组件，精确摆放）
          Positioned(
            top: 5, // 距离顶部 5px
            right: 5, // 距离右侧 5px
            child: Container(
              width: 15,
              height: 15,
              decoration: const BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
              ),
            ),
          ),
          FlutterLogo(size: 30),
        ],
      ),
    );
  }
}
```
