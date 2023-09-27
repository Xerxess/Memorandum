# UIAlertController 

显示警报消息的对象。

```swift
@MainActor
class UIAlertController : UIViewController
```

使用此类用您要显示的消息和要选择的操作来配置警报和操作表。使用您想要的操作和样式配置警报控制器后，使用present(_:animated:completion:)方法呈现它。  
UIKit在应用程序的内容上以`模态方式`显示警报和操作表。

```swift
let alert = UIAlertController(title: "My Alert", message: "This is an alert.", preferredStyle: .alert) 
alert.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: "Default action"), style: .default, handler: { _ in 
    NSLog("The \"OK\" alert occured.")
}))
self.present(alert, animated: true, completion: nil)
```

# Topics

## Creating an alert controller 创建警报控制器

```swift
// 创建并返回用于显示警报的视图控制器。
// UIAlertController.Style
// case actionSheet 由呈现它的视图控制器显示的操作表。
// case alert 以模态方式为应用程序显示的警报。
convenience init(
    title: String?,
    message: String?,
    preferredStyle: UIAlertController.Style
)
```