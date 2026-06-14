
# UIView尺寸的核心工具

## 手动布局：外部显式调用

```swift
// 作用： 询问视图。给它一个限制边界（size），让它计算并返回一个最合适的尺寸。
// 特点： 它不会改变视图的 frame.size。它只是一个纯计算函数。
// 用法： 你在重写自定义视图时，应该在这个方法里计算子视图的大小并返回总尺寸。
- sizeThatFits(_ size: CGSize) -> CGSize

// 作用： 命令视图。让视图调整自己的 frame.size 以适应其内容。
// 底层： 它内部会自动调用 sizeThatFits(self.bounds.size)，然后将返回的尺寸应用到自己的 frame 上。
// 用法： 常用于 UILabel 或 UIButton 设置完文字后，快速让它们缩放到合适大小。
- sizeToFit()
```

## Auto Layout

```swift
// 定义： “内置内容尺寸”。视图根据其自身内容（如 UILabel 的文字、UIImageView 的图片）所呈现的自然大小。
// 作用： 给 Auto Layout 提供隐式的约束。例如，只要给 UILabel 设置了坐标，它就能显示，就是因为它有这个内置尺寸。
// 注意： 如果你的自定义视图内容变化了（比如文字变了），Auto Layout 不会自动知道，这时需要配合下一个方法。invalidateIntrinsicContentSize()
intrinsicContentSize: CGSize

// 作用： 刷新通知。告诉系统：“我的内置尺寸过期了，请重新计算。”
invalidateIntrinsicContentSize()

```

## 从 Auto Layout 转换到 Frame


```swift
// 作用： 让 Auto Layout 引擎模拟计算。它会根据你设置的约束，计算出符合 targetSize 限制的最小或最大尺寸。
// 常用参数：UIView.layoutFittingCompressedSize：计算能容纳内容的最小尺寸（最常用）。
// UIView.layoutFittingExpandedSize：尝试占据最大空间
systemLayoutSizeFitting(_ targetSize: CGSize) -> CGSize


// 推荐使用此方法，计算更准确
// 进阶版： 允许你指定水平和垂直方向的拟合优先级。
// 场景： 比如你想要一个 Cell 的宽度固定为屏幕宽，但高度随内容自适应。你可以给水平方向设置 UILayoutPriority.required，垂直方向设置 fittingSizeLevel。 
func systemLayoutSizeFitting(
    _ targetSize: CGSize,
    withHorizontalFittingPriority horizontalFittingPriority: UILayoutPriority,
    verticalFittingPriority: UILayoutPriority
) -> CGSize
```