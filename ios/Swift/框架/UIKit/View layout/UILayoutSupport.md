# UILayoutSupport

一组提供布局支持和访问布局锚的方法。

此协议由UIViewController属性topLayoutGuide和bottomLayoutGuide实现，以支持将自动布局与视图控制器的视图一起使用。  
您可以在NSLayoutConstraint工厂方法中使用布局指南作为布局项。

```swift
@MainActor
protocol UILayoutSupport
```

## Creating constraints using layout anchors

```swift
// 代表指南底部边缘的布局锚。
var bottomAnchor: NSLayoutYAxisAnchor { get }

// 代表导游高度的布局锚。
var heightAnchor: NSLayoutDimension { get }

// 代表指南顶部边缘的布局锚。
var topAnchor: NSLayoutYAxisAnchor { get }
```