
# Container

一个便捷的小部件，它结合了常用的绘制、定位和调整大小的小部件。

- 在没有 Align、Center 或 UnconstrainedBox 包裹的情况下，父级 Container 的固定尺寸具有最高优先级，会无视子组件的尺寸设置。

```dart
(new) Container({
  Key? key,
  AlignmentGeometry? alignment, // 控制子组件在容器内的对齐方式
  EdgeInsetsGeometry? padding,
  Color? color, // 背景色
  bool isAntiAlias = true,
  Decoration? decoration,   // 装饰 圆角/阴影/渐变 
                            // borderRadius: 设置圆角。
                            // boxShadow: 添加阴影。
                            // gradient: 设置渐变色。
                            // image: 设置背景图片。
                            // border: 设置边框。
  Decoration? foregroundDecoration,  // 在子组件之上绘制的装饰（遮罩层）主要用于给图片或内容添加半透明遮罩、蒙版、边框描边或置灰效果。
  double? width, // 宽
  double? height,// 高
  BoxConstraints? constraints, // 施加的其他限制
  EdgeInsetsGeometry? margin,// 外边距
  Matrix4? transform, // 变换 实现平移、旋转、缩放或倾斜
  AlignmentGeometry? transformAlignment, // 执行变换时的原点位置（如绕中心旋转）。
  Widget? child,
  Clip clipBehavior = Clip.none, // 决定超出边界的内容如何剪辑（默认 Clip.none，如需圆角生效有时需改为 Clip.hardEdge）。
})
```

```dart
// 专门负责定义 Container 的视觉样式
(new) BoxDecoration({
  Color? color, // 纯色背景
  DecorationImage? image, // 背景图。
  BoxBorder? border, // border: 边框。支持统一边框 Border.all()，或单独设置某一边 Border(top: BorderSide(...))。
  BorderRadiusGeometry? borderRadius, // 圆角
  List<BoxShadow>? boxShadow, // 光影效果
  Gradient? gradient, // 渐变色。
  BlendMode? backgroundBlendMode, // 背景混合模式
  BoxShape shape = BoxShape.rectangle, // 形状。默认为 BoxShape.rectangle（矩形），可设为 BoxShape.circle（圆形）。
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
      child: Center(
        child: Container(
          padding: EdgeInsets.all(10),
          width: 300,
          height: 200,
          decoration: BoxDecoration(
            color: Colors.black.withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(10),
            border: Border.all(width: 8, color: Colors.green),
          ),
          // 在图片上方盖一层 30% 透明度的黑色
          foregroundDecoration: BoxDecoration(
            color: Colors.red.withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
            child: Text('图片上的文字', style: TextStyle(color: Colors.white)),
          ),
        ),
      ),
    );
  }
}
```