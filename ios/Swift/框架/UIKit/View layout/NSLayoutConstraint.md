<!-- TOC -->

- [NSLayoutConstraint](#nslayoutconstraint)
    - [每个约束都是一个线性方程，格式如下](#%E6%AF%8F%E4%B8%AA%E7%BA%A6%E6%9D%9F%E9%83%BD%E6%98%AF%E4%B8%80%E4%B8%AA%E7%BA%BF%E6%80%A7%E6%96%B9%E7%A8%8B%E6%A0%BC%E5%BC%8F%E5%A6%82%E4%B8%8B)
    - [API](#api)
        - [Accessing constraint data](#accessing-constraint-data)
        - [Getting the layout priority](#getting-the-layout-priority)
        - [Identifying a constraint](#identifying-a-constraint)
        - [Controlling constraint archiving](#controlling-constraint-archiving)
        - [Constants](#constants)

<!-- /TOC -->
# NSLayoutConstraint

<https://developer.apple.com/documentation/uikit/nslayoutconstraint>

<https://developer.apple.com/documentation/uikit/uiview#1653701>

当您设计应用程序的界面时，您可以在应用程序的窗口中定位视图和其他界面元素，并适当调整其大小。
然而，由于各种原因，这些视图的大小和位置可能需要在运行时更改：

* 用户可以调整包含您视图的窗口的大小。
* iOS设备屏幕尺寸的变化（包括纵向和横向之间的差异）要求每个设备和方向有不同的布局。
* iPad上的应用程序必须适应覆盖不同数量的屏幕空间，从屏幕的三分之一到整个屏幕。
* 语言更改可能需要更改标签和其他基于文本的视图的大小。
* 动态类型允许更改文本的大小，这会影响视图的大小。

当界面维度发生变化时，`UIStackView` 对象会自动调整其包含视图的位置。或者，自动布局约束允许您指定确定界面中视图大小和位置的规则。

```swfit
@MainActor
class NSLayoutConstraint : NSObject
```

## 每个约束都是一个线性方程，格式如下

```
item1.attribute1 = multiplier × item2.attribute2 + constant

// 自动布局不会简单地将此方程右侧的值分配给左侧。
// 相反，系统可以根据需要修改属性或两个属性来解决此约束。
button2.leading = 1.0 × button1.trailing + 8.0

// 约束不限于平等关系。
// 它们也可以使用大于或等于（>=）或小于或等于（<=）来描述两个属性之间的关系。
// 约束的优先级也在1到1000之间。需要优先级为1000的约束。所有低于1000的优先级都是可选的。默认情况下，所有约束都是必需的（优先级= 1,000）。
```

## API

```swift
// 
class func constraints(
    withVisualFormat format: String,
    options opts: NSLayoutConstraint.FormatOptions = [],
    metrics: [String : Any]?,
    views: [String : Any]
) -> [NSLayoutConstraint]

//
convenience init(
    item view1: Any,
    attribute attr1: NSLayoutConstraint.Attribute,
    relatedBy relation: NSLayoutConstraint.Relation,
    toItem view2: Any?,
    attribute attr2: NSLayoutConstraint.Attribute,
    multiplier: CGFloat,
    constant c: CGFloat
)

// 您可以通过更改此属性来激活或停用约束。
// 请注意，只有活动约束才会影响计算的布局。如果您尝试激活其项目没有共同祖先的约束，则会抛出异常。对于新创建的约束，isActive属性默认为false。
// 激活或停用约束在该约束管理的项目最接近的共同祖先的视图上调用addConstraint(_:)和removeConstraint(_:)。
// 使用此属性，而不是直接调用addConstraint(_:)或removeConstraint(_:)。
var isActive: Bool { get set }

// 激活指定数组中的每个约束。
// 这种方便的方法提供了一种简单的方法，只需一次调用即可激活一组约束。此方法的效果与将每个约束的isActive属性设置为true相同。通常，使用这种方法比单独激活每个约束更有效。
class func activate(_ constraints: [NSLayoutConstraint])

// 停用指定数组中的每个约束。
// 这是一个方便的方法，提供了一种简单的方法，通过一次调用停用一组约束。此方法的效果与将每个约束的isActive属性设置为false相同。通常，使用此方法比单独停用每个约束更有效。
class func deactivate(_ constraints: [NSLayoutConstraint])
```

### Accessing constraint data

```swift
// 第一个参与约束的对象。
unowned(unsafe) var firstItem: AnyObject? { get }

// 参与约束的第一个对象的属性。
var firstAttribute: NSLayoutConstraint.Attribute { get }

// 约束中两个属性之间的关系。
// NSLayoutConstraint.Relation
// case lessThanOrEqual 约束要求第一个属性小于或等于修改后的第二个属性。
// case equal 约束要求第一个属性与修改后的第二个属性完全相同。
// case greaterThanOrEqual 约束要求第一个属性大于或等于修改后的第二个属性。
var relation: NSLayoutConstraint.Relation { get }

// 参与约束的第二个对象。
unowned(unsafe) var secondItem: AnyObject? { get }

// 参与约束的第二个对象的属性。
var secondAttribute: NSLayoutConstraint.Attribute { get }

// 乘数应用于参与约束的第二个属性。
var multiplier: CGFloat { get }

// 常量添加到参与约束的乘法第二个属性中。
var constant: CGFloat { get set }

// 定义约束的第一个锚点。
@NSCopying
var firstAnchor: NSLayoutAnchor<AnyObject> { get }

// 定义约束的第二个锚。
@NSCopying
var secondAnchor: NSLayoutAnchor<AnyObject>? { get }
```

### Getting the layout priority

```swift
// 约束的优先级。
// struct UILayoutPriority
// static let required: UILayoutPriority 要求的约束。
// static let defaultHigh: UILayoutPriority 按钮抵制压缩其内容的优先级。
// static let dragThatCanResizeScene: UILayoutPriority 拖动的优先级，最终可能会调整窗口场景的大小。
// static let sceneSizeStayPut: UILayoutPriority 窗口场景希望保持相同大小的优先级。（偏好级别）
// static let dragThatCannotResizeScene: UILayoutPriority 不会调整窗口场景大小的拖动的优先级。
// static let defaultLow: UILayoutPriority 按钮水平拥抱其内容的优先级。
// static let fittingSizeLevel: UILayoutPriority 视图希望符合该计算中目标大小的优先级。
var priority: UILayoutPriority { get set }
```

### Identifying a constraint

```swift
// 标识约束的名称。
var identifier: String? { get set }
```

### Controlling constraint archiving

```swift
// 一个布尔值，确定约束是否应该通过其自己的视图存档。
var shouldBeArchived: Bool { get set }
```

### Constants

```swift

// 约束中第一个属性和修改后的第二个属性之间的关系
// case lessThanOrEqual 约束要求第一个属性小于或等于修改后的第二个属性。
// case equal 约束要求第一个属性与修改后的第二个属性完全相同。
// case greaterThanOrEqual 约束要求第一个属性大于或等于修改后的第二个属性。
NSLayoutConstraint.Relation

// 对象的视觉表示中应该用于获取约束值的部分。
// case left 对象对齐矩形的左侧。
// case right 对象对齐矩形的右侧。
// case top 对象对齐矩形的顶部。
// case bottom 对象对齐矩形的底部。
// case leading 对象对齐矩形的前缘。
// case trailing 对象对齐矩形的后缘。
// case width 对象对齐矩形的宽度。
// case height 对象对齐矩形的高度。
// case centerX 对象对齐矩形的 x 轴中心。
// case centerY 对象对齐矩形的 y 轴中心。
// case lastBaseline 对象的基线。
// case firstBaseline 对象的基线。
// case leftMargin 对象的左边距。
// case rightMargin 对象的右边距。
// case topMargin 对象的上边距。
// case bottomMargin 对象的下边距。
// case leadingMargin 对象的前边距。
// case trailingMargin 对象的尾部边距。
// case centerXWithinMargins 沿 x 轴位于对象左右边缘之间的中心。
// case centerYWithinMargins 沿 y 轴位于对象顶部和底部边距之间的中心。
// case notAnAttribute 一个占位符值，用于指示约束的第二项和第二个属性未在任何计算中使用。
NSLayoutConstraint.Attribute
enum Attribute : Int, @unchecked Sendable

// 一个位掩码，指定要对齐的接口元素的一部分和两个接口元素之间的对齐方向。
NSLayoutConstraint.FormatOptions

// 布局约束方向，无论是水平的还是垂直的，约束，用于在对象之间强制执行布局。
// case horizontal 约束方向应用于布局对象之间的水平关系。
// case vertical 适用于布局对象之间垂直关系的约束方向。
NSLayoutConstraint.Orientation

// 指定对象之间水平或垂直布局约束的键。
// case horizontal 约束方向应用于布局对象之间的水平关系。
// case vertical 适用于布局对象之间垂直关系的约束方向。
NSLayoutConstraint.Axis

// 描述两个矩形的边缘之间的距离。
// var bottom: Double
// var left: Double
// var right: Double
// var top: Double
NSEdgeInsets
```
