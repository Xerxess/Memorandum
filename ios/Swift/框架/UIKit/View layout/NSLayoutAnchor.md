# NSLayoutAnchor

https://developer.apple.com/documentation/uikit/nslayoutanchor

https://developer.apple.com/documentation/uikit/uiview#1681900

使用流畅的API创建布局约束对象的工厂类。

```swift
@MainActor
class NSLayoutAnchor<AnchorType> : NSObject where AnchorType : AnyObject
```

使用这些约束使用自动布局以编程方式定义布局。  
与其直接创建NSLayoutConstraint对象，不如从您希望约束的UIView、NSView或UILayoutGuide对象开始，然后选择该对象的锚属性之一。  
这些属性对应于自动布局中使用的主NSLayoutConstraint.Attribute值，并提供适当的NSLayoutAnchor子类来为该属性创建约束。  
使用锚的方法来构造您的约束。

```swift
// 正如您从这些示例中看到的，与直接使用NSLayoutConstraint API相比，NSLayoutAnchor类具有几个优势。
// 代码更干净、更简洁、更易于阅读。
// NSLayoutConstraint.Attribute子类提供额外的类型检查，防止您创建无效的约束。

// 使用NSLayoutConstraint创建约束
NSLayoutConstraint(item: subview,
                   attribute: .leading,
                   relatedBy: .equal,
                   toItem: view,
                   attribute: .leadingMargin,
                   multiplier: 1.0,
                   constant: 0.0).isActive = true


NSLayoutConstraint(item: subview,
                   attribute: .trailing,
                   relatedBy: .equal,
                   toItem: view,
                   attribute: .trailingMargin,
                   multiplier: 1.0,
                   constant: 0.0).isActive = true




// 使用布局锚创建相同的约束
let margins = view.layoutMarginsGuide
subview.leadingAnchor.constraint(equalTo: margins.leadingAnchor).isActive = true
subview.trailingAnchor.constraint(equalTo: margins.trailingAnchor).isActive = true
```

## API

```swift
// 返回一个约束，该约束将一个项目的属性定义为与另一个项目的属性相等。
func constraint(equalTo anchor: NSLayoutAnchor<AnchorType>) -> NSLayoutConstraint

// 返回一个约束，该约束将一个项目的属性定义为等于另一个项目的属性加上常量偏移量。
func constraint(
    equalTo anchor: NSLayoutAnchor<AnchorType>,
    constant c: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，该约束将一个项目的属性定义为大于或等于另一个项目。
// 此方法创建第一个属性>=第二个属性的关系。
func constraint(greaterThanOrEqualTo anchor: NSLayoutAnchor<AnchorType>) -> NSLayoutConstraint

// 返回一个约束，该约束将一个项目的属性定义为等于另一个项目的属性加上常量偏移量。
// 此方法定义了关系第一属性=第二属性+c。
func constraint(
    equalTo anchor: NSLayoutAnchor<AnchorType>,
    constant c: CGFloat
) -> NSLayoutConstraint

// 返回一个约束，将一个项目的属性定义为小于或等于另一个项目
// 此方法定义了关系第一属性<=第二属性。
func constraint(lessThanOrEqualTo anchor: NSLayoutAnchor<AnchorType>) -> NSLayoutConstraint

// 返回一个约束，该约束将一个项目的属性定义为大于或等于另一个项目的属性加上常量偏移量。
func constraint(
    greaterThanOrEqualTo anchor: NSLayoutAnchor<AnchorType>,
    constant c: CGFloat
) -> NSLayoutConstraint

```