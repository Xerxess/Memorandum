# UILayoutGuide

一个可以与自动布局交互的矩形区域。

UILayoutGuide 是在 iOS 中引入的一种布局辅助工具，它可以在视图层次结构中占用空间、定义布局区域，但不绘制任何内容。UILayoutGuide 通常用于管理界面元素之间的间距、相对位置和布局约束，从而提供更灵活的布局控制。以下是 UILayoutGuide 的主要作用：  

* 布局控制： UILayoutGuide 允许你在没有实际视觉元素的情况下创建占位符。这意味着你可以在布局中创建更多的辅助区域，以管理视图之间的间距、对齐和相对位置。
* 减少嵌套视图： 使用 UILayoutGuide 可以避免过多的嵌套视图。通常情况下，嵌套过多的视图会增加性能负担并使代码更难以维护。通过使用 UILayoutGuide，你可以在不创建额外的视图的情况下实现更复杂的布局。
* 安全区域和边缘约束： UILayoutGuide 对于处理安全区域和边缘约束非常有用。在屏幕上下文中，你可以创建 UILayoutGuide 来表示安全区域，然后将约束应用于它，以确保内容在各种设备上都能正确显示。
* 相对位置： UILayoutGuide 允许你在父视图内部设置相对位置。你可以使用 UILayoutGuide 来实现子视图之间的对齐、距离和顺序。
*动态布局： 由于 UILayoutGuide 是不绘制内容的，它可以在不影响渲染性能的情况下调整和改变布局。这使得在不同屏幕尺寸和方向上创建适应性布局更加方便。

使用布局指南替换您可能创建的`占位符`视图，以表示用户界面中的交互空间或封装。  
传统上，有许多自动布局技术需要占位符视图。  
占位符视图是一个空视图，它没有任何自己的视觉元素，仅用于定义视图层次结构中的矩形区域。  

* 布局指南不定义新视图。  
* 他们不参与视图层次结构。

## 创建布局指南

要创建布局指南，您必须执行以下步骤：

* 实例化一个新的布局指南。
* 通过调用视图的addGuide(_:)方法将布局指南添加到视图中。
* 使用自动布局定义布局指南的位置和大小。

```swift
@MainActor
class UILayoutGuide : NSObject
```

```swift
let space1 = UILayoutGuide()
view.addLayoutGuide(space1)
 
let space2 = UILayoutGuide()
view.addLayoutGuide(space2)
 
space1.widthAnchor.constraintEqualToAnchor(space2.widthAnchor).active = true
saveButton.trailingAnchor.constraintEqualToAnchor(space1.leadingAnchor).active = true
cancelButton.leadingAnchor.constraintEqualToAnchor(space1.trailingAnchor).active = true
cancelButton.trailingAnchor.constraintEqualToAnchor(space2.leadingAnchor).active = true
clearButton.leadingAnchor.constraintEqualToAnchor(space2.trailingAnchor).active = true
```

```swift
// 用于标识布局指南的字符串。
var identifier: String

// 布局指南在其自有视图坐标系中的框架。
var layoutFrame: CGRect

// 拥有此布局指南的观点。
var owningView: UIView?

```

### 使用布局锚创建约束

```swift
// 代表布局指南框架底部边缘的布局锚点。
var bottomAnchor: NSLayoutYAxisAnchor

// 代表布局指南框架水平中心的布局锚。
var centerXAnchor: NSLayoutXAxisAnchor

// 代表布局指南框架垂直中心的布局锚。
var centerYAnchor: NSLayoutYAxisAnchor

// 代表布局指南框架高度的布局锚。
var heightAnchor: NSLayoutDimension

// 代表布局指南框架前缘的布局锚。
var leadingAnchor: NSLayoutXAxisAnchor

// 代表布局指南框架左边缘的布局锚。
var leftAnchor: NSLayoutXAxisAnchor

// 代表布局指南框架右边缘的布局锚。
var rightAnchor: NSLayoutXAxisAnchor

// 代表布局指南框架顶部边缘的布局锚。
var topAnchor: NSLayoutYAxisAnchor

// 代表布局指南框架尾随边缘的布局锚。
var trailingAnchor: NSLayoutXAxisAnchor

// 表示布局指南框架宽度的布局锚。
var widthAnchor: NSLayoutDimension
```

### 调试布局指南

```swift
// 影响指南布局的约束。
func constraintsAffectingLayout(for: NSLayoutConstraint.Axis) -> [NSLayoutConstraint]

// 一个布尔值，指示影响布局指南的约束是否模棱两可地指定其位置。
var hasAmbiguousLayout: Bool

```

### 处理键盘布局

```swift
// 跟踪键盘在应用程序布局中位置的布局指南。
var keyboardLayoutGuide: UIKeyboardLayoutGuide

// 布局指南，表示键盘在应用程序布局中占据的空间。
class UIKeyboardLayoutGuide

// 布局指南，根据其与边缘的接近程度自动激活和停用布局约束。
class UITrackingLayoutGuide
```
