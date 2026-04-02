
# ClipRRect

最常用的“圆角剪裁”组件。它的全称是 Clip Rounded Rect（圆角矩形剪裁）

它可以将任何子组件（尤其是图片或背景色块）修剪成圆角。因为像 Image 这样的组件本身是不带圆角属性的，所以必须外层套一个 ClipRRect。

为什么不用 Container 的 borderRadius?

- Container 的局限：Container 的 decoration 圆角只能限制它自己的背景色和边框。如果子组件（如图片）比容器大，图片会溢出圆角，挡住圆角效果。
- ClipRRect 的优势：它是一把“裁纸刀”，不管子组件是什么，统统按圆角形状切掉多余部分。所以，切图片必用 ClipRRect。

```dart
ClipRRect(
  borderRadius: BorderRadius.circular(15.0), // 设置圆角半径
  child: Image.network(
    "https://example.com",
    width: 100,
    height: 100,
    fit: BoxFit.cover,
  ),
)
```
