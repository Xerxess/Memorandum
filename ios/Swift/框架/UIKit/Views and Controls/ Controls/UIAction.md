# UIAction

在闭包中执行其操作的菜单元素。

```swift
@MainActor
class UIAction : UIMenuElement
```

当您想要一个在闭包中执行其操作的菜单元素时，请创建一个UIAction对象。以下示例将基于操作的菜单添加到文件菜单中：

```swift
// Create a closure-based action to use as a menu element.
let refreshAction = UIAction(title: "Refresh") { (action) in
    print("Refresh the data.")
}


// Use the .displayInline option to avoid displaying the menu as a submenu,
// and to separate it from the other menu elements using a line separator.
let refreshMenuItem = UIMenu(title: "", options: .displayInline, children: [refreshAction])


// Insert the menu into the File menu before the Close menu.
builder.insertSibling(refreshMenuItem, beforeMenu: .close)
```

# Topics

## Creating an action

```swift
// 使用指定的标题、副标题、图像、标识符、可发现性标题、属性、状态和处理程序创建操作。
@MainActor
convenience init(
    title: String = "",
    subtitle: String? = nil,
    image: UIImage? = nil,
    identifier: UIAction.Identifier? = nil,
    discoverabilityTitle: String? = nil,
    attributes: UIMenuElement.Attributes = [],
    state: UIMenuElement.State = .off,
    handler: @escaping UIActionHandler
)

//
@MainActor
convenience init(
    title: String = "",
    image: UIImage? = nil,
    identifier: UIAction.Identifier? = nil,
    discoverabilityTitle: String? = nil,
    attributes: UIMenuElement.Attributes = [],
    state: UIMenuElement.State = .off,
    handler: @escaping UIActionHandler
)

// 使用设备的相机创建捕获文本的操作。
class func captureTextFromCamera(
    responder: UIResponder & UIKeyInput,
    identifier: UIAction.Identifier?
) -> Self

// 
// static let paste 标识将粘贴板的当前内容粘贴到应用程序界面的操作。
// static let pasteAndGo 标识将粘贴板的当前内容粘贴到应用程序界面的操作，并导航到它引用的实体。
// static let pasteAndMatchStyle 使用目标的文本样式将粘贴板的当前内容粘贴到应用程序界面的操作。
struct Identifier
```