
# MediaQuery

https://api.flutter.dev/flutter/widgets/MediaQuery-class.html

MediaQuery 是一个核心组件，用于查询当前设备的屏幕尺寸、方向、像素密度以及系统设置（如键盘弹出状态、字体缩放等）。

核心功能与用法

- 通过 MediaQuery.of(context) 或更高效的 MediaQuery.sizeOf(context)，你可以获取包含以下关键信息的 MediaQueryData 对象
  - 屏幕尺寸 (size)：获取屏幕的宽度和高度，常用于实现响应式布局（如 size.width * 0.5 使组件宽度占半屏）。
  - 设备方向 (orientation)：判断当前是横屏 (landscape) 还是竖屏 (portrait)。
  - 内边距与遮挡 (padding / viewInsets)
- 从 Flutter 3.10 开始，推荐使用更精确的方法以减少重绘
  - 获取尺寸：MediaQuery.sizeOf(context)（仅在尺寸变化时重绘）
  - 获取内边距：MediaQuery.paddingOf(context)
  - 获取亮度：MediaQuery.platformBrightnessOf(context)

```dart
@override
Widget build(BuildContext context) {
  // 获取屏幕宽度
  double screenWidth = MediaQuery.sizeOf(context).width;

  return Scaffold(
    body: Center(
      child: Container(
        // 如果宽度大于 600（通常是平板），占据 50% 宽度；否则占据 90%
        width: screenWidth > 600 ? screenWidth * 0.5 : screenWidth * 0.9,
        color: Colors.blue,
        child: const Text('响应式容器', textAlign: TextAlign.center),
      ),
    ),
  );
}

```