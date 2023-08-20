# NSLayoutDimension

https://developer.apple.com/documentation/uikit/nslayoutdimension

用于使用流畅的API创建基于大小的布局约束对象的工厂类。

使用这些约束使用自动布局以编程方式定义布局。所有尺寸都以点为单位。  
除了提供特定于大小的方法来创建约束外，该类还将类型信息添加到从NSLayoutAnchor继承的方法中。  
具体来说，NSLayoutAnchor声明的通用方法现在必须采用匹配的NSLayoutDimension对象。

```swift
@MainActor
class NSLayoutDimension : NSLayoutAnchor<NSLayoutDimension>
```

```swift
// This code works as expected.
saveButton.widthAnchor.constraint(equalTo: cancelButton.widthAnchor).isActive = true


// This code generates an incompatible pointer type warning.
saveButton.widthAnchor.constraint(equalTo: cancelButton.leadingAnchor).isActive = true
```

## API

```swift
// 返回一个约束，该约束将锚的大小属性定义为等于指定锚乘以常量。
func constraint(
    equalTo anchor: NSLayoutDimension,
    multiplier m: CGFloat
) -> NSLayoutConstraint 

// 返回一个约束，该约束将锚的大小属性定义为等于指定的大小属性乘以常量加偏移量。
func constraint(
    equalTo anchor: NSLayoutDimension,
    multiplier m: CGFloat,
    constant c: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义了锚的大小属性的恒定大小。
func constraint(equalToConstant c: CGFloat) -> NSLayoutConstraint

// 返回一个约束，该约束将锚的大小属性定义为大于或等于指定的锚乘以常量。
func constraint(
    greaterThanOrEqualTo anchor: NSLayoutDimension,
    multiplier m: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束将锚点的大小属性定义为大于或等于指定锚点乘以常量加偏移量。
func constraint(
    greaterThanOrEqualTo anchor: NSLayoutDimension,
    multiplier m: CGFloat,
    constant c: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义了锚的大小属性的最小大小。
// 此方法定义了关系第一属性>= m *第二属性。其中第一个属性是由接收此方法调用的锚点表示的布局属性，第二个属性是由锚点参数表示的布局属性。
func constraint(greaterThanOrEqualToConstant c: CGFloat) -> NSLayoutConstraint

// 返回一个约束，该约束将锚的大小属性定义为小于或等于指定的锚点乘以常量。
func constraint(
    lessThanOrEqualTo anchor: NSLayoutDimension,
    multiplier m: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束将锚点的大小属性定义为大于或等于指定锚点乘以常量加偏移量。
// 此方法定义了关系第一属性<=（m *第二属性）+c。其中第一个属性是由接收此方法调用的锚点表示的布局属性，第二个属性是由锚点参数表示的布局属性。
func constraint(
    lessThanOrEqualTo anchor: NSLayoutDimension,
    multiplier m: CGFloat,
    constant c: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束定义锚的大小属性的最大大小。
// 此方法定义了关系第一属性<= c。其中第一个属性是由接收此方法调用的锚点表示的布局属性。
func constraint(lessThanOrEqualToConstant c: CGFloat) -> NSLayoutConstraint
button.widthAnchor.constraintLessThanOrEqualToConstant(40.0).isActive = true
```