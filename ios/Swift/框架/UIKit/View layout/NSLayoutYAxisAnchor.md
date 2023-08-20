# NSLayoutYAxisAnchor

一个工厂类，用于使用流畅的API创建垂直布局约束对象。

```swift
@MainActor
class NSLayoutYAxisAnchor : NSLayoutAnchor<NSLayoutYAxisAnchor>
```

NSLayoutYAxisAnchor将类型信息添加到从NSLayoutAnchor继承的方法中。  
具体来说，NSLayoutAnchor声明的通用方法现在必须采用匹配的NSLayoutYAxisAnchor对象。

## API

```swift
// 返回一个约束，该约束定义了当前锚位于指定锚下方的特定距离。
func constraint(
    equalToSystemSpacingBelow anchor: NSLayoutYAxisAnchor,
    multiplier: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义了当前锚定位在指定锚下方的最小距离。
func constraint(
    greaterThanOrEqualToSystemSpacingBelow anchor: NSLayoutYAxisAnchor,
    multiplier: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义了当前锚定位在指定锚下方的最大距离。
func constraint(
    lessThanOrEqualToSystemSpacingBelow anchor: NSLayoutYAxisAnchor,
    multiplier: CGFloat
) -> NSLayoutConstraint
```