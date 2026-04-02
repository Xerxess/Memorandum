
# Transform

Transform 是 Flutter 中的“空间折叠器”，它能在不改变布局占位的前提下，对组件进行平移、旋转、缩放或 3D 转换。
- 在 Flutter 的 Matrix4 坐标系中，旋转方向遵循 “右手定则”（Right-Hand Rule）
    - 正值 (Positive)：顺时针 旋转
    - 负值 (Negative)：逆时针 旋转。

```dart
(new) Transform({
  Key? key,
  required Matrix4 transform, // 绘画过程中用来改变孩子的矩阵。
  Offset? origin, // 应用矩阵时所用的坐标系原点， 相对于由对齐方式给出的点进行描述。
  AlignmentGeometry? alignment,
  bool transformHitTests = true,
  FilterQuality? filterQuality, // 将变换作为位图操作应用时所用的滤镜质量。
  Widget? child,
})
```

```
Transform.flip 创建一个控件，该控件的子控件围绕其中心点进行镜像。
Transform.rotate 创建一个控件，该控件围绕中心旋转来变换其子控件。
Transform.scale 创建一个小部件，使其子部件沿二维平面缩放。
Transform.translate 创建一个组件，该组件通过翻译来转换其子组件。
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
        child: SafeArea(
          child: Column(
            children: [
              ColoredBox(
                color: Colors.black,
                child: Transform(
                  alignment: Alignment.topRight,
                  transform: Matrix4.skewY(0.3)..rotateZ(-math.pi / 12.0),
                  child: Container(
                    padding: const EdgeInsets.all(8.0),
                    color: const Color(0xFFE8581C),
                    child: const Text('Apartment for rent!'),
                  ),
                ),
              ),
              Container(
                width: 300,
                height: 200,
                color: Colors.blue,
                child: Transform.scale(
                  scale: 2,
                  child: Center(
                    child: Container(
                      width: 20,
                      height: 20,
                      color: Colors.amber,
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
              Container(
                width: 300,
                height: 200,
                color: Colors.blue,
                child: Transform(
                  alignment: Alignment.center,
                  transform: Matrix4.identity()
                    ..rotateZ(math.pi / 180 * 45), // 再旋转
                  child: Center(
                    child: Container(
                      width: 20,
                      height: 20,
                      color: Colors.amber,
                      child: Center(
                        child: Text("A", style: TextStyle(color: Colors.white)),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```