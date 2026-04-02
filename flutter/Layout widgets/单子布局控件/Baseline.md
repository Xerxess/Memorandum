
# Baseline

- 根据子元素的基线定位子元素的组件

```dart
(new) Baseline({
  Key? key,
  required double baseline, // 从此框顶部算起，基线位置的逻辑像素数。
  required TextBaseline baselineType, // 用于定位的基线类型。
  Widget? child,
})
```

```dart
// 一条用于对齐文本的水平线
enum TextBaseline {
  /// 用于对齐字母字符字形底部的水平线
  alphabetic，
  /// 用于对齐表意字符的水平线
  ideographic,
}
```