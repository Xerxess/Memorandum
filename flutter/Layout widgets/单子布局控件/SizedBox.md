
# SizedBox

SizedBox 是 Flutter 中最简单、高效的定尺寸组件。
它的功能极其纯粹：给子组件强加固定的宽高。

- 与 Container 的区别
    性能：SizedBox 极其轻量，它只是一个简单的 RenderProxyBox。Container 内部嵌套了多层组件（DecoratedBox, Padding 等），性能开销更大。
    功能：如果你只需要改尺寸，永远优先使用 SizedBox；如果你需要背景色、圆角、边框或外边距，才用 Container。

```dart
(new) SizedBox({
  Key? key,
  double? width,
  double? height,
  Widget? child,
})
```

```
SizedBox.expand()：创建一个盒子，其大小将达到其父级允许的大小。
SizedBox.shrink()：创建一个盒子，该盒子将变得尽可能小，其父级允许。
SizedBox.fromSize()：直接传入一个 Size 对象。
SizedBox.square 创建一个宽度和高度相等的盒子。
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
          width: 300,
          height: 200,
          color: Colors.blue,
          // 无效 SizedBox无法违背父组件给出的紧约束
          child: SizedBox(
            width: 100.0,
            height: 50.0,
            child: Card(child: Text('Hello')),
          ),
        ),
      ),
    );
  }
}
```

```dart
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Center(
        child: Container(
          width: 300,
          height: 200,
          color: Colors.blue,
          // 消除强制性：Center 接收到 300x200 的紧约束后，会对子组件说：“你可以从 0 到 300 宽、0 到 200 高之间自由选择尺寸”。
          child: Center(
            child: SizedBox(
              width: 200.0,
              height: 100.0,
              child: Card(child: Center(child: Text('Hello'))),
            ),
          ),
        ),
      ),
    );
  }
}

```
