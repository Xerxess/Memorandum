# UIView

约束的API

## Getting the safe area 获取安全区域

```swift

```

## Managing the view’s constraints 管理视图的约束

使用自动布局约束调整视图的大小和位置。

```swift
// 观点所持有的约束。
var constraints: [NSLayoutConstraint] { get }

// 在接收视图或其子视图的布局上添加约束。
func addConstraint(_ constraint: NSLayoutConstraint)
func addConstraints(_ constraints: [NSLayoutConstraint])

// 从视图中删除指定的约束
func removeConstraint(_ constraint: NSLayoutConstraint)
func removeConstraints(_ constraints: [NSLayoutConstraint])
```

## Creating constraints using layout anchors 使用布局锚创建约束

将自动布局约束附加到视图的锚点之一

```swift
// 代表视图框架底部边缘的布局锚点。
var bottomAnchor: NSLayoutYAxisAnchor { get }

// 代表视图框架水平中心的布局锚点。
var centerXAnchor: NSLayoutXAxisAnchor { get }

// 代表视图框架垂直中心的布局锚点。
var centerYAnchor: NSLayoutYAxisAnchor { get }

// 布局锚表示视图中文本最上行的基线。
var firstBaselineAnchor: NSLayoutYAxisAnchor { get }

// 代表视图框架高度的布局锚。
var heightAnchor: NSLayoutDimension { get }

// 布局锚，代表视图中最底部文本行的基线。
var lastBaselineAnchor: NSLayoutYAxisAnchor { get }

// 代表视图框架前缘的布局锚点。
var leadingAnchor: NSLayoutXAxisAnchor { get }

// 代表视图框架左边缘的布局锚点。
var leftAnchor: NSLayoutXAxisAnchor { get }

// 代表视图框架右边缘的布局锚点。
var rightAnchor: NSLayoutXAxisAnchor { get }

// 代表视图框架顶部边缘的布局锚点。
var topAnchor: NSLayoutYAxisAnchor { get }

// 代表视图框架后缘的布局锚。
var trailingAnchor: NSLayoutXAxisAnchor { get }

// 表示视图框架宽度的布局锚点。
var widthAnchor: NSLayoutDimension { get }
```

### Working with layout guides 使用布局指南

```swift
// 将指定的布局指南添加到视图中。
func addLayoutGuide(_ layoutGuide: UILayoutGuide)

// 此视图拥有的布局指南对象数组。
var layoutGuides: [UILayoutGuide] { get }

// 代表视图页边距的布局指南。
var layoutMarginsGuide: UILayoutGuide { get }

// 表示视图中具有可读宽度的区域的布局指南。
var readableContentGuide: UILayoutGuide { get }

// 从视图中删除指定的布局指南。
func removeLayoutGuide(_ layoutGuide: UILayoutGuide)
```

### Aligning views in Auto Layout 在自动布局中对齐视图

```swift
// 返回给定帧的视图对齐矩形。
func alignmentRect(forFrame frame: CGRect) -> CGRect

// 返回给定对齐矩形的视图帧。
func frame(forAlignmentRect alignmentRect: CGRect) -> CGRect

// 定义其对齐矩形的视图框架中的插入。
var alignmentRectInsets: UIEdgeInsets { get }

// 返回用于满足第一个基线约束的视图。
var forFirstBaselineLayout: UIView { get }

// 返回用于满足上次基线约束的视图。
var forLastBaselineLayout: UIView { get }
```

### Triggering Auto Layout 触发自动布局

```swift
// 一个布尔值，确定视图的约束是否需要更新。
func needsUpdateConstraints() -> Bool

// 控制视图的约束是否需要更新。
// 当您的自定义视图的属性以影响约束的方式发生变化时，您可以调用此方法来指示在未来的某个时候需要更新约束。
// 然后，系统将调用updateConstraints()作为其正常布局通道的一部分。
// 将其用作批量约束更改的优化工具。在需要之前一次性更新约束，可以确保在布局通道之间对视图进行多次更改时，您不会不必要地重新计算约束。
func setNeedsUpdateConstraints()

// 更新视图的约束。
func updateConstraints()

// 更新接收视图及其子视图的约束。
func updateConstraintsIfNeeded()
```

### Laying out subviews 布局子视图

如果您的应用程序不使用自动布局，请手动布局视图。

```swift
// 列出子视图。
func layoutSubviews()

// 无效接收器的当前布局，并在下一个更新周期触发布局更新。
func setNeedsLayout()

// 一个布尔值，指示接收器是否依赖于基于约束的布局系统。
class var requiresConstraintBasedLayout: Bool { get }


// 一个布尔值，确定视图的自动重调整掩码是否转换为自动布局约束。
// 如果此属性的值为true，系统将创建一组约束，重复视图的自动重调整掩码指定的行为。这也允许您使用视图的帧、边界或中心属性修改视图的大小和位置，允许您在自动布局中创建静态的、基于帧的布局。
// 请注意，自动调整大小掩码约束完全指定了视图的大小和位置；因此，您无法在不引入冲突的情况下添加其他约束来修改此大小或位置。如果您想使用自动布局来动态计算视图的大小和位置，则必须将此属性设置为false，然后为视图提供一组非模棱两可、非冲突的约束。
// 默认情况下，对于您以编程方式创建的任何视图，该属性都设置为true。
// 如果您在Interface Builder中添加视图，系统会自动将此属性设置为false。
var translatesAutoresizingMaskIntoConstraints: Bool { get set }
```