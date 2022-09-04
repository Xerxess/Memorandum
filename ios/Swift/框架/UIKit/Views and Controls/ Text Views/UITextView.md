<!-- TOC -->

- [UITextView](#uitextview)
    - [管理键盘](#管理键盘)
    - [键盘通知](#键盘通知)
- [API](#api)
    - [Initializing the text view](#initializing-the-text-view)
    - [回复文本视图更改](#回复文本视图更改)
    - [配置文本属性](#配置文本属性)
    - [管理编辑行为](#管理编辑行为)
    - [处理选择](#处理选择)
    - [替换系统输入视图 Replacing the system input views](#替换系统输入视图-replacing-the-system-input-views)
    - [支持查找和替换](#支持查找和替换)
    - [访问TextKit对象](#访问textkit对象)
    - [支持国家恢复  Supporting state restoration](#支持国家恢复--supporting-state-restoration)

<!-- /TOC -->

# UITextView

可滚动的多行文本区域。

UITextView支持使用自定义样式信息显示文本，也支持文本编辑。  
您通常使用文本视图来显示多行文本，例如在显示大型文本文档正文时。

该类通过使用 attributedText 属性支持多种文本样式。（在iOS 6之前的iOS版本中不支持样式文本。）  
为此属性设置值会导致文本视图使用归因字符串中提供的样式信息。  
您仍然可以使用font、textColor和textAlignment属性来设置样式属性，但这些属性适用于文本视图中的所有文本。  
建议您使用文本视图（而不是UIWebView对象）在应用程序中显示纯文本和富文本。

```swift
@MainActor class UITextView : UIScrollView
```

## 管理键盘

当用户点击可编辑的文本视图时，该文本视图将成为第一个响应者，并自动要求系统显示关联的键盘。由于键盘的外观可能会模糊用户界面的某些部分，因此您应通过重新定位任何可能被遮蔽的视图来确保这种情况不会发生。  
一些系统视图，如表格视图，通过自动将第一个响应器滚动到视图中来帮助您。但是，如果第一个响应器位于滚动区域的底部，您可能仍然需要调整滚动视图本身的大小或重新定位，以确保第一个响应器可见。

在您的应用程序中，在您选择时关闭键盘是您的责任。您可能会根据特定的用户操作关闭键盘，例如用户点击用户界面中的特定按钮。要关闭键盘，请将resignFirstResponder()消息发送到当前第一个响应器的文本视图。这样做会导致文本视图对象结束当前编辑会话（经委托对象同意）并隐藏键盘。

键盘本身的外观可以使用UITextInputTraits协议提供的属性进行自定义。文本视图对象实现此协议，并支持其定义的属性。  
您可以使用这些属性来指定要显示的键盘类型（ASCII、Numbers、URL、Email等）。  
您还可以配置键盘的基本文本输入行为，例如它是否支持文本的自动大写和更正。

## 键盘通知

* keyboardWillShowNotification
* keyboardDidShowNotification
* keyboardWillHideNotification
* keyboardDidHideNotification

# API

## Initializing the text view

```swift
init(frame: CGRect, textContainer: NSTextContainer?)
init(usingTextLayoutManager: Bool)
init?(coder: NSCoder)
```

## 回复文本视图更改

```swift
var delegate: UITextViewDelegate?
```

## 配置文本属性

```swift
// 文本视图显示的文本。
// 在iOS 6及更高版本中，为该属性分配新值也会将 attributedText 属性的值替换为相同的文本，尽管没有任何固有的样式属性。
// 相反，文本视图使用类的字体、textColor和其他与样式相关的属性来设置新字符串的样式。
var text: String! { get set }

// 文本视图显示的样式文本。
@NSCopying var attributedText: NSAttributedString! { get set }

// Tex的字体
var font: UIFont? { get set }

// 文本的颜色。
// 此属性适用于整个文本字符串。
// 默认文本颜色为黑色。
// 在iOS 6及更高版本中，为此属性分配新值会导致新的文本颜色应用于文本视图的整个内容。
// 如果您只想将颜色应用于文本的一部分，则必须创建一个具有所需样式信息的新归因字符串，并将其分配给 attributedText属性。
var textColor: UIColor? { get set }

// 在文本视图中转换为可点击URL的数据类型。
// 您可以使用此属性指定应自动转换为文本视图中URL的数据类型（电话号码、http链接等）。
// 点击后，文本视图将打开负责处理URL类型的应用程序，并将URL传递给它。
// 请注意，如果文本视图的 isEditable 属性设置为 true，则不会发生数据检测。
// struct UIDataDetectorTypes
// static var phoneNumber: UIDataDetectorTypes 使用电话号码格式检测字符串的选项。
// static var link: UIDataDetectorTypes 检测具有URL格式的字符串的选项。
// static var address: UIDataDetectorTypes 使用地址格式检测字符串的选项。
// static var calendarEvent: UIDataDetectorTypes 检测具有日历事件格式的字符串的选项。
// static var shipmentTrackingNumber: UIDataDetectorTypes 一个选项，用于检测带有包裹递送公司跟踪编号格式的字符串。
// static var flightNumber: UIDataDetectorTypes 使用航空公司航班号格式检测字符串的选项。
// static var lookupSuggestion: UIDataDetectorTypes 一个选项，用于检测具有用户可能要查找的信息格式的字符串。
// static var all: UIDataDetectorTypes 检测所有可用类型数据的选项。
var dataDetectorTypes: UIDataDetectorTypes { get set }

// 对齐文本的技术。
// 此属性适用于整个文本字符串。
// 属性的默认值是NSTextAlignment.natural。
// 为此属性分配新值会导致新的文本对齐应用于文本视图的整个内容。如果您想仅将对齐应用于文本的一部分，则必须创建一个具有所需样式信息的新归因字符串，并将其分配给 attributedText属性。
var textAlignment: NSTextAlignment { get set }

// 适用于用户输入的新文本的属性。
// 此字典包含适用于新键入文本的属性键（和相应的值）。当文本视图的选择发生变化时，字典的内容会自动清除。
var typingAttributes: [NSAttributedString.Key : Any] { get set }

// 适用于链接的属性。
// 默认属性指定带有单个下划线和指向手光标的蓝色文本。
var linkTextAttributes: [NSAttributedString.Key : Any]! { get set }

// 文本容器布局区域在文本视图的内容区域中的插入。
// 此属性为文本视图中布局的文本提供文本边距。
// 默认情况下，此属性的值为(8, 0, 8, 0)
var textContainerInset: UIEdgeInsets { get set }

// 确定文本渲染规模的布尔值。
// 当此属性的值为true时，UIKit会自动调整文本视图中文本的渲染，以匹配标准文本缩放。
// 使用标准文本缩放时，文本视图中的字体大小在视觉上与它们在macOS和非苹果平台中的渲染方式相似，将文本视图的内容复制到粘贴板会保留原始字体点大小。这有效地更改了文本的显示大小，而不会更改实际的字体点大小。例如，iOS中使用13点字体的文本看起来像macOS中使用13点字体的文本。
// 如果您的应用程序是使用Mac Catalyst构建的，或者如果您的文本视图的内容保存到用户可以在macOS或其他平台上查看的文档中，请将此属性设置为true。
// 默认值为false。
var usesStandardTextScaling: Bool { get set }
```

## 管理编辑行为

```swift
// 一个布尔值，指示文本视图是否可以编辑。
// 此属性的默认值true
var isEditable: Bool { get set }

// 一个布尔值，指示文本视图是否允许用户编辑样式信息。
// 当设置为true时，文本视图允许用户更改当前所选文本的基本样式。可用的样式选项列在编辑菜单中，仅适用于所选内容。
// 默认值为false。
var allowsEditingTextAttributes: Bool { get set }

// 当编辑会话在文本视图中开始时提醒观察者的通知。
class let textDidBeginEditingNotification: NSNotification.Name

// 当文本视图中的文本更改时提醒观察者的通知。
class let textDidChangeNotification: NSNotification.Name

// 文本视图编辑会话结束时提醒观察者的通知。
class let textDidEndEditingNotification: NSNotification.Name

```

## 处理选择

```swift
// 文本视图的当前选择范围。
// 在iOS 2.2及更低版本中，选择范围的长度始终为0，这表明选择实际上是一个插入点。
// 在iOS 3.0及更高版本中，选择范围的长度可能为非零。
var selectedRange: NSRange { get set }

// 滚动文本视图，直到看到指定范围内的文本。
func scrollRangeToVisible(_ range: NSRange)

// 一个布尔值，指示插入文本是否取代了之前的内容。
// 此属性的默认值为false。
// 当此属性的值为true且文本视图处于编辑模式时，选择UI将被隐藏，插入新文本将清除文本视图的内容，并将此属性的值设置为false。
var clearsOnInsertion: Bool { get set }

// 一个布尔值，指示文本视图是否可选择。
var isSelectable: Bool { get set }

```

## 替换系统输入视图 Replacing the system input views

```swift
// 当文本视图成为第一个响应者时要显示的自定义输入视图。
// 如果此属性中的值为nil，则文本视图在成为第一响应器时显示标准系统键盘。将自定义视图分配给此属性会导致显示该视图。
// 默认值为nil。
var inputView: UIView? { get set }

// 当文本视图成为第一个响应者时要显示的自定义配件视图。
// 此属性的默认值为nil。
// 当文本视图成为第一个响应器时，将视图分配给此属性会导致该视图显示在标准系统键盘上方（或提供自定义输入视图的上方）。例如，您可以使用此属性将自定义工具栏附加到键盘上。
var inputAccessoryView: UIView? { get set }
```

## 支持查找和替换

```swift
// A Boolean value that enables a text view’s built-in find interaction.
// ios16
var isFindInteractionEnabled: Bool

// The text view’s built-in find interaction.
// ios16
var findInteraction: UIFindInteraction?

```

## 访问TextKit对象

```swift
// 为文本视图的文本容器布局文本的文本布局管理器。
// ios16
var textLayoutManager: NSTextLayoutManager?

// 为文本视图的文本容器布局文本的布局管理器。
// 此属性是一个方便的访问器，通过文本容器提供访问权限。
var layoutManager: NSLayoutManager { get }

// 定义文本在文本视图中显示区域的文本容器对象。
var textContainer: NSTextContainer { get }

// 包含文本视图中显示的文本的文本存储对象。
var textStorage: NSTextStorage { get }
```

## 支持国家恢复  Supporting state restoration

```swift
var interactionState: Any
```
