# NSLayoutXAxisAnchor

一个工厂类，用于使用流畅的API创建水平布局约束对象。

```swift
@MainActor
class NSLayoutXAxisAnchor : NSLayoutAnchor<NSLayoutXAxisAnchor>
```

NSLayoutXAxisAnchor将类型信息添加到从NSLayoutAnchor继承的方法中。  
具体来说，NSLayoutAnchor声明的通用方法现在必须采用匹配的NSLayoutXAxisAnchor对象。

## API

```swift
// 返回一个约束，该约束定义了当前锚点跟踪指定锚点的程度。
// 约束导致当前锚点跟踪锚点参数中的对象。
// 例如，在从左到右的布局中，当前锚点在锚点的右侧，但在从右到左的布局中，它在锚点的左侧。
// 两个锚之间的距离是通过将系统间距乘以乘数参数中的值来确定的。系统空间的价值是由锚点提供的信息决定的。
func constraint(
    equalToSystemSpacingAfter anchor: NSLayoutXAxisAnchor,
    multiplier: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义了当前锚点跟踪指定锚点的最小量。
func constraint(
    greaterThanOrEqualToSystemSpacingAfter anchor: NSLayoutXAxisAnchor,
    multiplier: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义了当前锚点跟踪指定锚点的最大量。
func constraint(
    lessThanOrEqualToSystemSpacingAfter anchor: NSLayoutXAxisAnchor,
    multiplier: CGFloat
) -> NSLayoutConstraint
```