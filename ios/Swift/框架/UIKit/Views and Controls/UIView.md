<!-- TOC -->

- [UIView](#uiview)
- [API](#api)
    - [Configuring a view’s visual appearance  配置视图的视觉外观](#configuring-a-views-visual-appearance--%E9%85%8D%E7%BD%AE%E8%A7%86%E5%9B%BE%E7%9A%84%E8%A7%86%E8%A7%89%E5%A4%96%E8%A7%82)
    - [Configuring the event-related behavior 配置事件相关行为](#configuring-the-event-related-behavior-%E9%85%8D%E7%BD%AE%E4%BA%8B%E4%BB%B6%E7%9B%B8%E5%85%B3%E8%A1%8C%E4%B8%BA)
    - [Configuring the bounds and frame rectangles 配置边界和框架矩形](#configuring-the-bounds-and-frame-rectangles-%E9%85%8D%E7%BD%AE%E8%BE%B9%E7%95%8C%E5%92%8C%E6%A1%86%E6%9E%B6%E7%9F%A9%E5%BD%A2)
    - [Managing the view hierarchy 管理视图层次结构](#managing-the-view-hierarchy-%E7%AE%A1%E7%90%86%E8%A7%86%E5%9B%BE%E5%B1%82%E6%AC%A1%E7%BB%93%E6%9E%84)
    - [Observing view-related changes 观察视图相关变化](#observing-view-related-changes-%E8%A7%82%E5%AF%9F%E8%A7%86%E5%9B%BE%E7%9B%B8%E5%85%B3%E5%8F%98%E5%8C%96)
    - [Configuring content margins 配置内容页边距](#configuring-content-margins-%E9%85%8D%E7%BD%AE%E5%86%85%E5%AE%B9%E9%A1%B5%E8%BE%B9%E8%B7%9D)
    - [Getting the safe area 获取安全区域](#getting-the-safe-area-%E8%8E%B7%E5%8F%96%E5%AE%89%E5%85%A8%E5%8C%BA%E5%9F%9F)
    - [Managing the view’s constraints 管理视图的约束](#managing-the-views-constraints-%E7%AE%A1%E7%90%86%E8%A7%86%E5%9B%BE%E7%9A%84%E7%BA%A6%E6%9D%9F)
    - [Creating constraints using layout anchors  将自动布局约束附加到视图的锚点之一。](#creating-constraints-using-layout-anchors--%E5%B0%86%E8%87%AA%E5%8A%A8%E5%B8%83%E5%B1%80%E7%BA%A6%E6%9D%9F%E9%99%84%E5%8A%A0%E5%88%B0%E8%A7%86%E5%9B%BE%E7%9A%84%E9%94%9A%E7%82%B9%E4%B9%8B%E4%B8%80)
    - [Working with layout guides 使用布局指南](#working-with-layout-guides-%E4%BD%BF%E7%94%A8%E5%B8%83%E5%B1%80%E6%8C%87%E5%8D%97)
    - [Measuring in Auto Layout 在自动布局中测量](#measuring-in-auto-layout-%E5%9C%A8%E8%87%AA%E5%8A%A8%E5%B8%83%E5%B1%80%E4%B8%AD%E6%B5%8B%E9%87%8F)
    - [Aligning views in Auto Layout 在自动布局中对齐视图](#aligning-views-in-auto-layout-%E5%9C%A8%E8%87%AA%E5%8A%A8%E5%B8%83%E5%B1%80%E4%B8%AD%E5%AF%B9%E9%BD%90%E8%A7%86%E5%9B%BE)
    - [Triggering Auto Layout 触发自动布局](#triggering-auto-layout-%E8%A7%A6%E5%8F%91%E8%87%AA%E5%8A%A8%E5%B8%83%E5%B1%80)
    - [Debugging Auto Layout 调试自动布局](#debugging-auto-layout-%E8%B0%83%E8%AF%95%E8%87%AA%E5%8A%A8%E5%B8%83%E5%B1%80)
    - [Configuring the resizing behavior 配置调整大小的行为](#configuring-the-resizing-behavior-%E9%85%8D%E7%BD%AE%E8%B0%83%E6%95%B4%E5%A4%A7%E5%B0%8F%E7%9A%84%E8%A1%8C%E4%B8%BA)
    - [Laying out subviews 布局子视图](#laying-out-subviews-%E5%B8%83%E5%B1%80%E5%AD%90%E8%A7%86%E5%9B%BE)
    - [Adjusting the user interface 调整用户界面](#adjusting-the-user-interface-%E8%B0%83%E6%95%B4%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)
    - [Constraining views to the keyboard 将视图限制在键盘上](#constraining-views-to-the-keyboard-%E5%B0%86%E8%A7%86%E5%9B%BE%E9%99%90%E5%88%B6%E5%9C%A8%E9%94%AE%E7%9B%98%E4%B8%8A)
    - [Adding and removing interactions 添加和删除互动](#adding-and-removing-interactions-%E6%B7%BB%E5%8A%A0%E5%92%8C%E5%88%A0%E9%99%A4%E4%BA%92%E5%8A%A8)
    - [Drawing and updating the view 绘制和更新视图](#drawing-and-updating-the-view-%E7%BB%98%E5%88%B6%E5%92%8C%E6%9B%B4%E6%96%B0%E8%A7%86%E5%9B%BE)
    - [Updating the view when property values change 在属性值更改时更新视图](#updating-the-view-when-property-values-change-%E5%9C%A8%E5%B1%9E%E6%80%A7%E5%80%BC%E6%9B%B4%E6%94%B9%E6%97%B6%E6%9B%B4%E6%96%B0%E8%A7%86%E5%9B%BE)
    - [Formatting printed view content 格式化打印视图内容](#formatting-printed-view-content-%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%89%93%E5%8D%B0%E8%A7%86%E5%9B%BE%E5%86%85%E5%AE%B9)
    - [Managing gesture recognizers 管理手势识别器](#managing-gesture-recognizers-%E7%AE%A1%E7%90%86%E6%89%8B%E5%8A%BF%E8%AF%86%E5%88%AB%E5%99%A8)
    - [Working with focus 专注地工作](#working-with-focus-%E4%B8%93%E6%B3%A8%E5%9C%B0%E5%B7%A5%E4%BD%9C)
    - [Using motion effects 使用运动效果](#using-motion-effects-%E4%BD%BF%E7%94%A8%E8%BF%90%E5%8A%A8%E6%95%88%E6%9E%9C)
    - [Preserving and restoring state 维护和恢复状态](#preserving-and-restoring-state-%E7%BB%B4%E6%8A%A4%E5%92%8C%E6%81%A2%E5%A4%8D%E7%8A%B6%E6%80%81)
    - [Capturing a view snapshot 拍摄视图快照](#capturing-a-view-snapshot-%E6%8B%8D%E6%91%84%E8%A7%86%E5%9B%BE%E5%BF%AB%E7%85%A7)
    - [Identifying the view at runtime 在运行时识别视图](#identifying-the-view-at-runtime-%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E8%AF%86%E5%88%AB%E8%A7%86%E5%9B%BE)
    - [Converting between view coordinate systems 在视图坐标系之间转换](#converting-between-view-coordinate-systems-%E5%9C%A8%E8%A7%86%E5%9B%BE%E5%9D%90%E6%A0%87%E7%B3%BB%E4%B9%8B%E9%97%B4%E8%BD%AC%E6%8D%A2)
    - [Hit-testing in a view 在视图中点击测试](#hit-testing-in-a-view-%E5%9C%A8%E8%A7%86%E5%9B%BE%E4%B8%AD%E7%82%B9%E5%87%BB%E6%B5%8B%E8%AF%95)
    - [Ending a view-editing session 结束视图编辑会话](#ending-a-view-editing-session-%E7%BB%93%E6%9D%9F%E8%A7%86%E5%9B%BE%E7%BC%96%E8%BE%91%E4%BC%9A%E8%AF%9D)
    - [Modifying the accessibility behavior Modifying the accessibility behavior](#modifying-the-accessibility-behavior-modifying-the-accessibility-behavior)
    - [Animating views with block objects](#animating-views-with-block-objects)
    - [Displaying a playground live view  显示游乐场实时视图](#displaying-a-playground-live-view--%E6%98%BE%E7%A4%BA%E6%B8%B8%E4%B9%90%E5%9C%BA%E5%AE%9E%E6%97%B6%E8%A7%86%E5%9B%BE)
    - [Constants 常量](#constants-%E5%B8%B8%E9%87%8F)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uiview

# UIView

用于管理屏幕上矩形区域内容的对象。

```swift
@MainActor class UIView : UIResponder
```

# API

```swift
// 使用指定的帧矩形初始化并返回新分配的视图对象。
init(frame: CGRect)

```

## Configuring a view’s visual appearance  配置视图的视觉外观

```swift
// 视图的背景颜色。
var backgroundColor: UIColor?

// 确定视图是否隐藏的布尔值。
var isHidden: Bool

// 视图的alpha值。
var alpha: CGFloat

// 一个布尔值，用于确定视图是否不透明。
var isOpaque: Bool

// 视图层次结构中的第一个非默认色调颜色值，从视图本身上升并从视图本身开始。
var tintColor: UIColor!

// 视图层次结构中的第一个非默认色调调整模式值，从视图本身上升并从视图本身开始。
// enum TintAdjustmentMode
// case automatic 视图的色调调整模式与其父级视图的色调调整模式相同（如果视图没有超视图，则为UIViewTintAdjustmentModeNormal）。
// case normal 视图的tintColor属性返回视图完全未修改的色调颜色。
// case dimmed 视图的色调颜色属性返回视图原始色调颜色的不饱和、变暗版本。
var tintAdjustmentMode: UIView.TintAdjustmentMode

// 一个布尔值，用于确定子视图是否局限于视图的边界。 
// 类型css overflow:hidden;
var clipsToBounds: Bool

// 一个布尔值，用于确定是否应在绘图前自动清除视图的边界。
var clearsContextBeforeDrawing: Bool

// 可选视图，其alpha通道用于屏蔽视图的内容。
var mask: UIView?

// 返回用于为该类实例创建图层的类。
class var layerClass: AnyClass

// 视图的核心动画层用于渲染。
var layer: CALayer

```

## Configuring the event-related behavior 配置事件相关行为

```swift
// 一个布尔值，用于确定用户事件是否被忽略并从事件队列中删除。
var isUserInteractionEnabled: Bool

// 一个布尔值，指示视图是否一次收到多个触摸。
var isMultipleTouchEnabled: Bool

// 一个布尔值，指示接收器是否只处理触摸事件。
var isExclusiveTouch: Bool

```

## Configuring the bounds and frame rectangles 配置边界和框架矩形

```swift
// 框架矩形，它描述了视图在其超级视图坐标系中的位置和大小。
var frame: CGRect

// 边界矩形，它描述了视图在自身坐标系中的位置和大小。
var bounds: CGRect

// 视图框架矩形的中心点。
var center: CGPoint

// 指定应用于视图的相对于其边界中心的转换。
var transform: CGAffineTransform

// 适用于视图的三维转换。
var transform3D: CATransform3D


```

## Managing the view hierarchy 管理视图层次结构

```swift
// 接收器的超级视图，如果没有，则为nil。
var superview: UIView?

// 接收者的直接子视图。
var subviews: [UIView]

// 接收器的窗口对象，如果没有，则为nil。
var window: UIWindow?

// 在接收者的子视图列表的末尾添加视图。
func addSubview(UIView)

// 移动指定的子视图，使其显示在兄弟姐妹的顶部。
// 此方法将指定的视图移动到 subviews 属性中视图数组的末尾。
func bringSubviewToFront(UIView)

// 移动指定的子视图，使其显示在兄弟姐妹后面。
// 此方法将指定的视图移动到 subviews 属性中视图数组的开头。
func sendSubviewToBack(UIView)

// 取消视图与其超级视图和窗口的链接，并将其从响应链中删除。
func removeFromSuperview()

// 在指定的索引处插入子视图。
func insertSubview(UIView, at: Int)

// 在视图层次结构的另一个视图上方插入视图。
func insertSubview(UIView, aboveSubview: UIView)

// 在视图层次结构的另一个视图下方插入视图。
func insertSubview(UIView, belowSubview: UIView)

// 在指定的索引上交换子视图。
func exchangeSubview(at: Int, withSubviewAt: Int)

// 返回一个布尔值，指示接收方是给定视图的子视图还是与该视图相同。
// 如果接收器是视图的直接或远处子视图，或者视图是接收器本身，则为true；否则为false。
func isDescendant(of: UIView) -> Bool

```

## Observing view-related changes 观察视图相关变化

```swift
// 告诉视图添加了子视图。
func didAddSubview(UIView)

// 告诉视图即将删除子视图。
func willRemoveSubview(UIView)

// 告诉视图其超级视图即将更改为指定的超级视图。
func willMove(toSuperview: UIView?)

// 告诉视图，它的超级视图发生了变化。
func didMoveToSuperview()

// 告诉视图其窗口对象即将更改。
func willMove(toWindow: UIWindow?)

// 告诉视图其窗口对象已更改。
func didMoveToWindow()

```

## Configuring content margins 配置内容页边距


```swift
// 在视图中布局内容时使用的默认间距，同时考虑到当前的语言方向。
// struct NSDirectionalEdgeInsets
// init(top: CGFloat, leading: CGFloat, bottom: CGFloat, trailing: CGFloat)
var directionalLayoutMargins: NSDirectionalEdgeInsets

// 在视图中布局内容时使用的默认间距。
// struct UIEdgeInsets
// init(top: CGFloat, left: CGFloat, bottom: CGFloat, right: CGFloat)
var layoutMargins: UIEdgeInsets

// 一个布尔值，指示当前视图是否也尊重其超级视图的边距。
var preservesSuperviewLayoutMargins: Bool

// 通知视图布局边距已更改。
func layoutMarginsDidChange()

```

## Getting the safe area 获取安全区域

```swift
// 您用于确定此视图安全区域的插入
// UIEdgeInsets
// init(top: CGFloat, left: CGFloat, bottom: CGFloat, right: CGFloat)
var safeAreaInsets: UIEdgeInsets

// 布局指南表示视图中不受条形和其他内容遮挡的部分。
var safeAreaLayoutGuide: UILayoutGuide

// 当视图的安全区域发生变化时调用。
func safeAreaInsetsDidChange()

// 一个布尔值，指示视图的布局边距是否自动更新以反映安全区域。
var insetsLayoutMarginsFromSafeArea: Bool


```

## Managing the view’s constraints 管理视图的约束

```swift
// view所持有的限制。
var constraints: [NSLayoutConstraint]

// 添加对接收视图或其子视图布局的约束
func addConstraint(NSLayoutConstraint)

// 在接收视图或其子视图的布局上添加了多个约束。
func addConstraints([NSLayoutConstraint])

// func removeConstraint(NSLayoutConstraint)
func removeConstraint(NSLayoutConstraint)

//
func removeConstraints([NSLayoutConstraint])

```

## Creating constraints using layout anchors  将自动布局约束附加到视图的锚点之一。

```swift
var bottomAnchor: NSLayoutYAxisAnchor
var centerXAnchor: NSLayoutXAxisAnchor // 表示视图框架水平中心的布局锚。
var centerYAnchor: NSLayoutYAxisAnchor
var firstBaselineAnchor: NSLayoutYAxisAnchor  // 表示视图中最顶层文本行基线的布局锚。
var heightAnchor: NSLayoutDimension
var lastBaselineAnchor: NSLayoutYAxisAnchor // 表示视图中最底层文本行基线的布局锚。
var leadingAnchor: NSLayoutXAxisAnchor // 代表视图框架前缘的布局锚。
var leftAnchor: NSLayoutXAxisAnchor
var rightAnchor: NSLayoutXAxisAnchor
var topAnchor: NSLayoutYAxisAnchor
var trailingAnchor: NSLayoutXAxisAnchor
var widthAnchor: NSLayoutDimension // 表示视图框架后缘的布局锚。

```

## Working with layout guides 使用布局指南

```swift
// 将指定的布局指南添加到视图中。
func addLayoutGuide(UILayoutGuide)

//  此视图拥有的布局指南对象数组。
var layoutGuides: [UILayoutGuide]

// 代表视图边距的布局指南。
var layoutMarginsGuide: UILayoutGuide

// 表示视图中具有可读宽度的区域的布局指南。
var readableContentGuide: UILayoutGuide

// 从视图中删除指定的布局指南。
func removeLayoutGuide(UILayoutGuide)

```

## Measuring in Auto Layout 在自动布局中测量

```swift
// 根据当前约束返回视图的最佳大小。
func systemLayoutSizeFitting(CGSize) -> CGSize

// 根据视图的约束和指定的拟合优先级返回视图的最佳大小。
func systemLayoutSizeFitting(CGSize, withHorizontalFittingPriority: UILayoutPriority, verticalFittingPriority: UILayoutPriority) -> CGSize

// 接收视图的自然大小，仅考虑视图本身的属性。
var intrinsicContentSize: CGSize

// 验证视图的内在内容大小。
func invalidateIntrinsicContentSize()

// 返回视图拒绝小于其内在大小的优先级。
func contentCompressionResistancePriority(for: NSLayoutConstraint.Axis) -> UILayoutPriority

// 设置视图拒绝小于其内在大小的优先级。
func setContentCompressionResistancePriority(UILayoutPriority, for: NSLayoutConstraint.Axis)

// 返回视图拒绝大于其内在大小的优先级。
func contentHuggingPriority(for: NSLayoutConstraint.Axis) -> UILayoutPriority

// 设置视图拒绝大于其内在大小的优先级。
func setContentHuggingPriority(UILayoutPriority, for: NSLayoutConstraint.Axis)

```

## Aligning views in Auto Layout 在自动布局中对齐视图

```swift
// 返回给定帧的视图对齐矩形。
func alignmentRect(forFrame: CGRect) -> CGRect

// 返回给定对齐矩形的视图框架。
func frame(forAlignmentRect: CGRect) -> CGRect

// 定义其对齐矩形的视图框架中的嵌入。
var alignmentRectInsets: UIEdgeInsets

// 返回用于满足第一个基线约束的视图。
var forFirstBaselineLayout: UIView

// 返回用于满足最后基线约束的视图。
var forLastBaselineLayout: UIView

```

## Triggering Auto Layout 触发自动布局

```swift
// 确定视图约束是否需要更新的布尔值。
// 基于约束的布局系统使用此方法的返回值来确定它是否需要在您的视图上调用updateConstraints()作为其正常布局通行证的一部分。
func needsUpdateConstraints() -> Bool

// 控制视图的约束是否需要更新。
// 当您自定义视图的属性以影响约束的方式更改时，您可以调用此方法来指示约束需要在未来某个时候更新。
// 然后，系统将调用updateConstraints()作为其正常布局通行证的一部分。
// 将此用作批量约束更改的优化工具。在需要约束之前一次性更新约束，可以确保您在布局通行证之间对视图进行多次更改时不必要地重新计算约束。
func setNeedsUpdateConstraints()

// 更新视图的约束。
func updateConstraints()

// 更新接收视图及其子视图的约束。
// 系统会自动调用此方法
// 子类不应覆盖此方法。
func updateConstraintsIfNeeded()

```

## Debugging Auto Layout 调试自动布局

```swift
// 返回影响给定轴视图布局的约束。
func constraintsAffectingLayout(for: NSLayoutConstraint.Axis) -> [NSLayoutConstraint]

// 一个布尔值，用于确定影响视图布局的约束是否不完全指定视图的位置。
var hasAmbiguousLayout: Bool

```

## Configuring the resizing behavior 配置调整大小的行为

```swift
// 用于确定视图在边界更改时如何布局其内容的标志。
// 内容模式指定了当视图边界发生变化时如何调整视图图层的缓存位图。\
// 此属性通常用于实现可调整大小的控件。您可以使用此属性指定要缩放内容（无论是否具有失真）或将其固定在视图上的特定位置，而不是每次都重新绘制视图的内容。
// 属性的默认值为UIView.ContentMode.scaleToFill。
// enum ContentMode
// case scaleToFill 必要时通过更改内容的宽高比来扩展内容以适应其自身大小的选项。
// case scaleAspectFit 通过保持宽高比来扩展内容以适应视图大小的选项。视图边界的任何剩余区域都是透明的。
// case scaleAspectFill 缩放内容以填充视图大小的选项。某些内容可能会被剪切以填充视图的边界。
// case redraw 通过调用setNeedsDisplay()方法在边界发生变化时重新显示视图的选项。
// case center 将内容居中放置在视图边界的选项，保持比例相同。
// case top 将内容居中对齐在视图边界的顶部的选项。
// case bottom 在视图边界内将内容居中对齐在底部的选项。
// case left 对齐视图左侧内容的选项。
// case right 对齐视图右侧内容的选项。
// case topLeft 对齐视图左上角内容的选项。
// case topRight 对齐视图右上角内容的选项。
// case bottomLeft 对齐视图左下角内容的选项。
// case bottomRight 对齐视图右下角内容的选项。
var contentMode: UIView.ContentMode

// 要求视图计算并返回最适合指定尺寸的尺寸
func sizeThatFits(CGSize) -> CGSize

// 调整接收器视图的大小并移动，使其仅包含其子视图。
func sizeToFit()

// 一个布尔值，用于确定接收方在边界更改时是否自动调整其子视图的大小。
var autoresizesSubviews: Bool

// 一个整数位掩码，用于确定接收器在超视图边界发生变化时如何调整自身大小。
// 用于自动布局，子视图随着父级视图的改变自动调整自身
var autoresizingMask: UIView.AutoresizingMask

```

## Laying out subviews 布局子视图

```swift
// 列出了子视图。
func layoutSubviews()

// 无效接收器的当前布局，并在下一个更新周期触发布局更新。
func setNeedsLayout()

// 如果布局更新正在等待，请立即布局子视图。
func layoutIfNeeded()

// 一个布尔值，指示接收器是否依赖于基于约束的布局系统。
class var requiresConstraintBasedLayout: Bool

// 一个布尔值，用于确定视图的自动调整大小掩码是否转换为自动布局约束。
var translatesAutoresizingMaskIntoConstraints: Bool


```

## Adjusting the user interface 调整用户界面

```swift
// 视图及其所有子视图采用的用户界面风格。
var overrideUserInterfaceStyle: UIUserInterfaceStyle

// 对视图内容的语义描述，用于确定在从左到右和从右到左布局之间切换时是否应翻转视图。
var semanticContentAttribute: UISemanticContentAttribute

// 适合排列视图直接内容的用户界面布局方向。
var effectiveUserInterfaceLayoutDirection: UIUserInterfaceLayoutDirection

// 返回给定语义内容属性的用户界面方向。
class func userInterfaceLayoutDirection(for: UISemanticContentAttribute) -> UIUserInterfaceLayoutDirection
```

## Constraining views to the keyboard 将视图限制在键盘上

```swift
// 跟踪键盘在应用程序布局中的位置的布局指南。
var keyboardLayoutGuide: UIKeyboardLayoutGuide

```

## Adding and removing interactions 添加和删除互动

```swift
// 将交互添加到视图中。
func addInteraction(UIInteraction)

// 从视图中删除交互。
func removeInteraction(UIInteraction)

// 视图的交互数组。
var interactions: [UIInteraction]


```

## Drawing and updating the view 绘制和更新视图

```swift
// 在传入矩形内绘制接收器的图像。
func draw(CGRect)

// 将接收器的整个边界矩形标记为需要重新绘制。
func setNeedsDisplay()

// 将接收器的指定矩形标记为需要重新绘制。
func setNeedsDisplay(CGRect)

// 适用于视图的缩放因子。
var contentScaleFactor: CGFloat

// 当tintColor属性发生变化时，系统调用。
func tintColorDidChange()

```

## Updating the view when property values change 在属性值更改时更新视图

```swift
struct UIView.Invalidating
protocol UIViewInvalidating

```

## Formatting printed view content 格式化打印视图内容

```swift
// 返回接收视图的打印格式化程序。
func viewPrintFormatter() -> UIViewPrintFormatter

// 用于绘制视图内容以进行打印。
func draw(CGRect, for: UIViewPrintFormatter)

```

## Managing gesture recognizers 管理手势识别器

```swift
// 将手势识别器附加到视图上。
func addGestureRecognizer(UIGestureRecognizer)

// 将手势识别器与接收视图分离。
func removeGestureRecognizer(UIGestureRecognizer)

// 当前附加到视图的手势识别对象
var gestureRecognizers: [UIGestureRecognizer]?

// 询问视图是否应允许手势识别器继续跟踪触摸事件。
func gestureRecognizerShouldBegin(UIGestureRecognizer) -> Bool

```

## Working with focus 专注地工作

```swift
// 一个布尔值，指示视图当前是否能够聚焦。
var canBecomeFocused: Bool

// 返回当前动画的继承持续时间。
class var inheritedAnimationDuration: TimeInterval

// 指示项目当前是否聚焦的布尔值。
var isFocused: Bool

// 此视图所属焦点组的标识符。
var focusGroupIdentifier: String?

```

## Using motion effects 使用运动效果

```swift
// 开始对视图应用运动效果。
func addMotionEffect(UIMotionEffect)

// 视图的运动效果数组。
var motionEffects: [UIMotionEffect]

// 停止对视图应用运动效果。
func removeMotionEffect(UIMotionEffect)

```

## Preserving and restoring state 维护和恢复状态

```swift
// 确定视图是否支持状态恢复的标识符。
var restorationIdentifier: String?

// 为视图编码与状态相关的信息。
func encodeRestorableState(with: NSCoder)
```

## Capturing a view snapshot 拍摄视图快照

```swift
// 根据当前视图的内容返回快照视图。
func snapshotView(afterScreenUpdates: Bool) -> UIView?

// 根据当前视图的指定内容返回快照视图，并具有可拉伸的插入。
func resizableSnapshotView(from: CGRect, afterScreenUpdates: Bool, withCapInsets: UIEdgeInsets) -> UIView?

// 将完整视图层次结构的快照呈现为屏幕上可见的当前上下文。
func drawHierarchy(in: CGRect, afterScreenUpdates: Bool) -> Bool

```

## Identifying the view at runtime 在运行时识别视图

```swift
// 可用于识别应用程序中视图对象的整数。
var tag: Int

// 返回标签与指定值匹配的视图。
func viewWithTag(Int) -> UIView?

```

## Converting between view coordinate systems 在视图坐标系之间转换

```swift
// 将一个点从接收器的坐标系统转换为指定视图的坐标系统。
func convert(CGPoint, to: UIView?) -> CGPoint

// 将点从给定视图的坐标系转换为接收器的坐标系。
func convert(CGPoint, from: UIView?) -> CGPoint

// 将矩形从接收器的坐标系统转换为另一个视图。
func convert(CGRect, to: UIView?) -> CGRect

// 将矩形从另一个视图的坐标系统转换为接收器的坐标系统。
func convert(CGRect, from: UIView?) -> CGRect

```

## Hit-testing in a view 在视图中点击测试

```swift
// 返回包含指定点的视图层次结构（包括本身）中接收者最远的后代。
func hitTest(CGPoint, with: UIEvent?) -> UIView?

// 返回一个布尔值，指示接收器是否包含指定的点。
func point(inside: CGPoint, with: UIEvent?) -> Bool

```

## Ending a view-editing session 结束视图编辑会话

## Modifying the accessibility behavior Modifying the accessibility behavior

```swift
var accessibilityIgnoresInvertColors: Bool
A Boolean value indicating whether the view ignores an accessibility request to invert its colors.
var largeContentImage: UIImage?
An image that represents the view in the large content viewer.
var largeContentImageInsets: UIEdgeInsets
Insets to adjust the position of the view’s image so it appears centered in the large content viewer.
var largeContentTitle: String?
A string that describes the view in the large content viewer.
var scalesLargeContentImage: Bool
A Boolean value that indicates whether the large content viewer scales the item’s image to a larger size.
var showsLargeContentViewer: Bool
A Boolean value that indicates whether to show the view in the large content viewer.
```

## Animating views with block objects

```swift
// 使用指定的持续时间、延迟、选项和完成处理程序对一个或多个视图进行动画更改。
class func animate(withDuration: TimeInterval, delay: TimeInterval, options: UIView.AnimationOptions, animations: () -> Void, completion: ((Bool) -> Void)?)

// 使用指定的持续时间和完成处理程序对一个或多个视图进行动画更改。
class func animate(withDuration: TimeInterval, animations: () -> Void, completion: ((Bool) -> Void)?)

// 使用指定的持续时间对一个或多个视图进行动画更改。
class func animate(withDuration: TimeInterval, animations: () -> Void)

// 为指定的容器视图创建过渡动画。
class func transition(with: UIView, duration: TimeInterval, options: UIView.AnimationOptions, animations: (() -> Void)?, completion: ((Bool) -> Void)?)

// 使用给定参数在指定视图之间创建过渡动画。
class func transition(from: UIView, to: UIView, duration: TimeInterval, options: UIView.AnimationOptions, completion: ((Bool) -> Void)?)

// 创建一个动画块对象，可用于为当前视图设置基于关键帧的动画。
class func animateKeyframes(withDuration: TimeInterval, delay: TimeInterval, options: UIView.KeyframeAnimationOptions, animations: () -> Void, completion: ((Bool) -> Void)?)

// 指定关键帧动画单帧的时间和动画值。
class func addKeyframe(withRelativeStartTime: Double, relativeDuration: Double, animations: () -> Void)

// 在一个或多个视图上执行指定的系统提供的动画，以及您定义的可选并行动画。
class func perform(UIView.SystemAnimation, on: [UIView], options: UIView.AnimationOptions, animations: (() -> Void)?, completion: ((Bool) -> Void)?)

// 使用与物理弹簧运动相对应的定时曲线执行视图动画。
class func animate(withDuration: TimeInterval, delay: TimeInterval, usingSpringWithDamping: CGFloat, initialSpringVelocity: CGFloat, options: UIView.AnimationOptions, animations: () -> Void, completion: ((Bool) -> Void)?)

// 停用视图转换动画。
class func performWithoutAnimation(() -> Void)

// 重复指定动画的特定次数，可选择向前和向后运行动画。
class func modifyAnimations(withRepeatCount: CGFloat, autoreverses: Bool, animations: () -> Void)
```

## Displaying a playground live view  显示游乐场实时视图

```swift
// 指定在Swift Playground中显示实时视图时使用的视图或视图控制器的类型。
var playgroundLiveViewRepresentation: PlaygroundLiveViewRepresentation

```

## Constants 常量

```swift
// 指定支持的动画曲线。
// case easeInOut 轻松进入轻松的曲线导致动画开始缓慢，在持续时间的中间加速，然后在完成之前再次变慢。这是大多数动画的默认曲线。
// case easeIn 轻松进入曲线会导致动画开始缓慢，然后随着动画的进展而加快。
// case easeOut 轻松曲线会导致动画快速开始，然后在完成后放慢速度。
// case linear 线性动画曲线会导致动画在其持续时间内均匀发生。
enum UIView.AnimationCurve

// 使用块对象为视图动画的选项。
// static var layoutSubviews: UIView.AnimationOptions 在提交时布置子视图，以便它们与父视图一起动画。
// static var allowUserInteraction: UIView.AnimationOptions 允许用户在动画制作时与视图进行交互。
// static var beginFromCurrentState: UIView.AnimationOptions 从与已经进行中的动画关联的当前设置开始动画。
// static var `repeat`: UIView.AnimationOptions 无限重复动画。
// static var autoreverse: UIView.AnimationOptions 前后运行动画（必须与 repeat 选项结合使用）
// static var overrideInheritedDuration: UIView.AnimationOptions 强制动画使用提交动画时指定的原始持续时间值。
// static var overrideInheritedCurve: UIView.AnimationOptions 强制动画使用提交动画时指定的原始曲线值。
// static var allowAnimatedContent: UIView.AnimationOptions 通过动态更改属性值并重绘视图来为视图设置动画。
// static var showHideTransitionViews: UIView.AnimationOptions 在视图转换期间隐藏或显示视图。
// static var overrideInheritedOptions: UIView.AnimationOptions 不继承动画类型或任何选项的选项。
// static var curveEaseInOut: UIView.AnimationOptions 指定缓入缓出曲线，这会导致动画缓慢开始，在其持续时间的中间加速，然后在完成前再次减速
// static var curveEaseIn: UIView.AnimationOptions 缓入曲线使动画开始缓慢，然后随着进行而加快。
// static var curveEaseOut: UIView.AnimationOptions 缓出曲线会导致动画快速开始，然后在完成时变慢。
// static var curveLinear: UIView.AnimationOptions 线性动画曲线使动画在其持续时间内均匀发生。
// static var transitionFlipFromLeft: UIView.AnimationOptions 围绕其垂直轴从左到右翻转视图的过渡（视图的左侧向前移动，右侧向后移动）。
// static var transitionFlipFromRight: UIView.AnimationOptions 将视图围绕其垂直轴从右向左翻转的过渡（视图的右侧向前移动，左侧向后移动）。
// static var transitionCurlUp: UIView.AnimationOptions 从底部向上卷曲视图的过渡
// static var transitionCurlDown: UIView.AnimationOptions 从顶部向下卷曲视图的过渡
// static var transitionCrossDissolve: UIView.AnimationOptions 从一个视图到下一个视图的过渡
// static var transitionFlipFromTop: UIView.AnimationOptions 围绕水平轴从上到下翻转视图的过渡（视图的顶侧向前移动，底侧向后移动）
// static var transitionFlipFromBottom: UIView.AnimationOptions 将视图从下到上围绕其水平轴翻转的过渡（视图的底部朝前部移动，顶部朝后移动）。
// static var preferredFramesPerSecond30: UIView.AnimationOptions 每秒30帧的帧速率。
// static var preferredFramesPerSecond60: UIView.AnimationOptions 每秒60帧的帧速率。
struct UIView.AnimationOptions

// 在动画块对象中使用的动画过渡选项。
// case none 用于指示没有指定转换的选项。
// case flipFromLeft 一种围绕垂直轴从左到右翻转视图的过渡。视图的左侧向前方移动，右侧向后方移动
// case flipFromRight 围绕垂直轴从右到左翻转视图的过渡。视图的右侧向前方移动，左侧向后方移动。
// case curlUp 从底部向上卷曲视图的过渡。
// case curlDown 从顶部向下卷曲视图的过渡。
enum UIView.AnimationTransition

// 动画完成后从层次结构中删除视图的选项。
// case delete 动画完成时从视图层次结构中删除视图的选项
enum UIView.SystemAnimation

// 与animateKeyframes（withDuration:delay:options:animations:completion:）方法一起使用的关键帧动画选项。
// static var layoutSubviews: UIView.KeyframeAnimationOptions
// static var allowUserInteraction: UIView.KeyframeAnimationOptions
// static var beginFromCurrentState: UIView.KeyframeAnimationOptions
// static var `repeat`: UIView.KeyframeAnimationOptions
// static var autoreverse: UIView.KeyframeAnimationOptions
// static var overrideInheritedDuration: UIView.KeyframeAnimationOptions
// static var overrideInheritedOptions: UIView.KeyframeAnimationOptions
// static var calculationModeLinear: UIView.KeyframeAnimationOptions
// static var calculationModeDiscrete: UIView.KeyframeAnimationOptions
// static var calculationModePaced: UIView.KeyframeAnimationOptions
// static var calculationModeCubic: UIView.KeyframeAnimationOptions
// static var calculationModeCubicPaced: UIView.KeyframeAnimationOptions
struct UIView.KeyframeAnimationOptions

// 指定对象之间水平或垂直布局约束的键。
// case horizontal 布置对象之间的水平关系时应用的约束。
// case vertical 布置对象之间的垂直关系时应用的约束
enum NSLayoutConstraint.Axis

// 视图的色调调整模式。
case automatic 视图的色调调整模式与其父视图的色调调整模式相同（如果视图没有父视图，则为 UIViewTintAdjustmentModeNormal）。
case normal 视图的 tintColor 属性返回视图的完全未修改的色调颜色。
case dimmed 视图的 tintColor 属性返回视图原始色调颜色的去饱和、变暗版本
enum UIView.TintAdjustmentMode

// 使用尽可能小尺寸的选项
class let layoutFittingCompressedSize: CGSize

// 使用最大尺寸的选项。
class let layoutFittingExpandedSize: CGSize

// 给定数字视图属性没有内在度量。
class let noIntrinsicMetric: CGFloat

// 自动调整视图大小的选项。
// static var flexibleLeftMargin: UIView.AutoresizingMask 通过在左边距方向上扩大或缩小视图来调整大小。
// static var flexibleWidth: UIView.AutoresizingMask 通过扩大或缩小视图的宽度来调整大小
// static var flexibleRightMargin: UIView.AutoresizingMask 通过在右边距方向上扩大或缩小视图来调整大小。
// static var flexibleTopMargin: UIView.AutoresizingMask 通过在上边距方向上扩大或缩小视图来调整大小。
// static var flexibleHeight: UIView.AutoresizingMask 通过扩大或缩小视图的高度来调整大小
// static var flexibleBottomMargin: UIView.AutoresizingMask 通过在底部边距方向上扩大或缩小视图来调整大小。
struct UIView.AutoresizingMask

// 对视图内容的语义描述，用于确定在从左到右和从右到左布局之间切换时是否应翻转视图。
// case unspecified 视图的默认值。在从左到右和从右到左布局之间切换时，视图会翻转
// case playback 表示播放控件的视图，例如播放、倒带或快进按钮或播放头滑动条。在从左到右和从右到左布局之间切换时，这些视图不会翻转
// case spatial 表示方向控件的视图，例如用于文本对齐的段控件或用于游戏的 D-pad 控件。在从左到右和从右到左布局之间切换时，这些视图不会翻转
// case forceLeftToRight 始终使用从左到右布局显示的视图
// case forceRightToLeft 始终使用从右到左布局显示的视图
enum UISemanticContentAttribute

```
