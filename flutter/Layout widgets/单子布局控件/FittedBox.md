

# FittedBox

FittedBox 是 Flutter 中的“缩放专家”。它的核心功能是：根据你指定的适配规则（BoxFit），对子组件进行缩放或位置调整，使其适应父容器的大小。

```dart
(new) FittedBox({
  Key? key,
  BoxFit fit = BoxFit.contain,
  AlignmentGeometry alignment = Alignment.center,
  Clip clipBehavior = Clip.none, // 是否裁剪
  Widget? child,
})
```

```dart
BoxFit enum

fill : 不顾比例，拉伸填满父容器。
contain (默认): 保持比例，缩放到父容器能完整显示的最大尺寸。
cover: 保持比例，缩放到刚好完全覆盖父容器（可能会被裁剪）。
fitWidth: 宽度撑满，另一边按比例缩放。
fitHeight: 高度撑满，另一边按比例缩放。
none
scaleDown:只有当内容比父级大时才缩小，比父级小时不放大。
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
          color: Colors.green,
          width: 300,
          height: 100,
          child: FittedBox(fit: BoxFit.cover, child: Icon(Icons.flutter_dash)),
        ),
      ),
    );
  }
}
```