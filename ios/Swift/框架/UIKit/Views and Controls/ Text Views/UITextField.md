<!-- TOC -->

- [UITextField](#uitextfield)
- [显示和隐藏键盘](#显示和隐藏键盘)
- [配置键盘的外观](#配置键盘的外观)
- [回应键盘相关通知](#回应键盘相关通知)
- [在文本字段中格式化文本](#在文本字段中格式化文本)
- [使用叠加视图编辑内容](#使用叠加视图编辑内容)
- [验证文本和管理编辑过程](#验证文本和管理编辑过程)
- [国际化](#国际化)
- [Accessibility](#accessibility)
- [保护国家](#保护国家)
- [符合，符合](#符合符合)
- [API](#api)
    - [Validating and Handling Edits 验证和处理编辑](#validating-and-handling-edits-验证和处理编辑)
    - [Configuring the Text Attributes  配置文本属性](#configuring-the-text-attributes--配置文本属性)
    - [Sizing the Text Field’s Text 调整文本栏位文本的大小](#sizing-the-text-fields-text-调整文本栏位文本的大小)
    - [Managing the Editing Behavior 管理编辑行为](#managing-the-editing-behavior-管理编辑行为)
    - [Setting the View’s Background Appearance 设置视图的背景外观](#setting-the-views-background-appearance-设置视图的背景外观)
    - [Managing Overlay Views 管理叠加视图](#managing-overlay-views-管理叠加视图)
    - [Drawing and Positioning Overrides 绘图和定位覆盖](#drawing-and-positioning-overrides-绘图和定位覆盖)
    - [Replacing the System Input Views 替换系统输入视图](#replacing-the-system-input-views-替换系统输入视图)

<!-- /TOC -->

# UITextField

在界面中显示可编辑文本区域的对象。

您使用文本字段使用屏幕键盘从用户那里收集基于文本的输入。  
键盘可以配置为许多不同类型的输入，如纯文本、电子邮件、数字等。  
文本字段使用  target-action 机制和委托对象来报告编辑过程中所做的更改。

除了基本的文本编辑行为外，您还可以向文本字段添加叠加视图，以显示其他信息并提供其他可点击的控件。  
您可以为书签按钮或搜索图标等元素添加自定义叠加视图。  
文本字段提供了一个内置的叠加视图来清除当前文本。  
使用自定义叠加视图是可选的。

在界面中添加文本字段后，您可以将其配置为在应用程序中使用。配置涉及执行以下部分或全部任务：

- 为文本字段配置一个或多个目标和操作。
- 配置文本字段的键盘相关属性。
- 分配一个委托对象来处理重要任务，例如：
  - 确定是否应允许用户编辑文本字段的内容。
  - 验证用户输入的文本。
  - 响应键盘返回按钮中的点击。
  - 将用户输入的文本转发到应用程序的其他部分。
- 将文本字段的引用存储在控制器对象之一中。

```swift
@MainActor class UITextField : UIControl
```

# 显示和隐藏键盘

当文本字段成为第一响应者时，系统会自动显示键盘并将其输入绑定到文本字段。  
`当用户点击文本字段时，它会自动成为第一个响应者`。  
您还可以通过调用其成为`FirstResponder()`方法来强制文本字段成为第一个响应者。  
当您要求用户输入一些信息时，您可能会强制文本字段成为第一响应者。

您可以通过调用文本字段的`resignFirstResponder()`方法来要求系统关闭键盘。  
通常，您会根据特定的交互关闭键盘。例如，当用户点击键盘的返回键时，您可能会关闭键盘。  
系统还可以根据用户操作关闭键盘。具体来说，当用户点击不支持键盘输入的新控件时，系统会关闭键盘。

键盘的外观和关闭会影响文本字段的编辑状态。  
`当键盘出现时，文本字段进入编辑状态，并向其委托发送适当的通知`。  
同样，当文本字段退出第一个响应者状态时，它会离开编辑状态并通知其委托。

# 配置键盘的外观

您可以使用UITextField类采用的`UITextInputTraits`协议的属性自定义文本字段的键盘。  
UIKit支持用户当前语言的标准键盘，还支持用于`输入数字、URL、电子邮件地址和其他特定类型信息的专用键盘`。  
您使用此协议的属性来调整键盘特性，例如：

- 要显示的键盘类型
- 键盘的自动大写行为
- 键盘的自动更正行为
- 要显示的返回密钥类型

# 回应键盘相关通知

由于系统根据响应者的变化管理键盘的显示和隐藏，因此它会发布以下通知来跟踪与键盘相关的更改：

- keyboardWillShowNotification
- keyboardDidShowNotification
- keyboardWillHideNotification
- keyboardDidHideNotification
- keyboardWillChangeFrameNotification
- keyboardDidChangeFrameNotification

每个通知都包含一个包含键盘大小的userInfo字典。  
由于键盘可以隐藏部分界面，因此您应该使用大小信息在屏幕上重新定位内容。对于嵌入在滚动视图中的内容，您可以将文本字段滚动到视图中，如图2所示。在其他情况下，您可以调整主内容视图的大小，使其不在键盘的覆盖范围内。

# 在文本字段中格式化文本

您可以对文本字段的文本进行两种格式化：

- 您可以使用该类的属性更改文本的字体、颜色和样式。或者，您可以为文本字段的内容指定`NSAttributedString`。
- 您可以使用`Formatter`对象格式化文本字段的内容。

`font、textColor和textAlignment`属性等会影响文本字段字符串的外观。  
修改这些属性将指定的特征应用于`整个字符串`。  
要指定更精细的格式，请使用NSAttributedString对象指定文本字段的文本。

U`ITextField类不提供使用Formatter对象格式化其字符串的内置支持，但您可以使用文本字段的委托自行格式化内容。`
为此，请使用文本字段的委托方法来验证文本并适当格式化。  
例如，使用textField(_:shouldChangeCharactersIn:replacementString:)方法在用户键入时验证和格式化文本。有关如何使用格式化程序对象的信息，请参阅数据格式化指南。

# 使用叠加视图编辑内容

`叠加视图是显示在文本视图可编辑区域左侧和右侧的小视图`。  
通常，叠加视图是基于图像的按钮，您可以将其设置为额外的编辑控件。  
例如，您可以使用叠加视图来实现书签按钮。  
要将按钮配置为叠加视图，请为按钮的内容指定图像，并配置按钮的目标和操作以响应点击。

# 验证文本和管理编辑过程

`文本字段在其委托对象的帮助下管理其文本的编辑`。当用户与文本字段交互时，`文本字段会通知其委托`，并使其有机会控制正在发生的事情。  
您可以使用委托方法来防止用户启动或停止编辑过程，或验证键入的文本。  
您还可以使用委托方法来执行相关任务，`例如根据用户键入的信息更新界面的其他部分`。

有关使用文本字段的委托管理编辑交互的更多信息，请参阅UITextFieldDelegate。

# 国际化

# Accessibility

# 保护国家

当您为文本字段的 restorationIdentifier 属性分配值时，它会保留选定的文本范围（如果有的话）。  
在下一个启动周期中，文本字段会尝试恢复该选择。如果选择范围无法应用于当前文本，则不会进行选择。有关状态保存和恢复工作原理的更多信息，请参阅iOS版应用程序编程指南。

# 符合，符合

- NSCoding
- UIContentSizeCategoryAdjusting
- UITextDraggable
- UITextDroppable
- UITextInput
- UITextPasteConfigurationSupporting

# API

## Validating and Handling Edits 验证和处理编辑

```swift
// 文本字段的委托人。
var delegate: UITextFieldDelegate?

```

## Configuring the Text Attributes  配置文本属性

```swift
// 文本字段显示的文本。
// 为该属性分配新值也会将归因文本属性的值替换为相同的文本，尽管没有任何固有的样式属性。
// 相反，文本视图使用类的字体、textColor和其他与样式相关的属性来设置新字符串的样式。
// 默认情况下，此值为nil。
var text: String? { get set }

// 文本字段显示的样式文本。
@NSCopying var attributedText: NSAttributedString? { get set }

// 当文本字段中没有其他文本时显示的字符串。
// 默认情况下，此值为nil。占位符字符串使用系统定义的颜色绘制。
var placeholder: String?

// 当文本字段中没有其他文本时显示的样式字符串。
// 默认情况下，此属性为nil。如果设置，占位符字符串将使用系统定义的颜色和归因字符串的剩余样式信息（文本颜色除外）绘制。
// 为该属性分配新值也会将 placeholder 属性的值替换为相同的字符串数据，尽管没有任何格式信息。
// 在此属性分配新值不会影响文本字段的任何其他与样式相关的属性。
@NSCopying var attributedPlaceholder: NSAttributedString? { get set }

// 适用于文本的默认属性。
// 设置此属性将指定的属性应用于文本字段的整个文本。未设置的属性保持其默认值。
// 获取此属性返回之前设置的属性，这些属性可能已通过设置字体和textColor等属性进行修改。
var defaultTextAttributes: [NSAttributedString.Key : Any] { get set }

// 文本的字体。
var font: UIFont?

// 文本的颜色。
var textColor: UIColor?

// 对齐文本的技术。
var textAlignment: NSTextAlignment

// 应用于用户输入的新文本的属性。
// 此字典包含应用于新键入文本的属性键（和相应的值）。当文本字段的选择发生变化时，字典的内容会自动清除。
// 如果文本字段不处于编辑模式，则此属性包含值nil。同样，除非文本字段当前处于编辑模式，否则您无法为此属性分配值。
var typingAttributes: [NSAttributedString.Key : Any]? { get set }
```

## Sizing the Text Field’s Text 调整文本栏位文本的大小

```swift
// 一个布尔值，指示是否缩小字体大小，以将文本字符串放入文本字段的边界矩形中。
// 通常，文本字段的内容是用您在字体属性中指定的字体绘制的。
// 但是，如果此属性设置为true，并且文本属性中的内容超过文本字段的边界矩形，则接收器将开始缩小字体大小，直到字符串合适或达到最小字体大小。文本沿着基线缩小。
// 默认值为false。如果您将其更改为true，您还应该通过修改 minimumFontSize 属性来设置适当的最小字体大小。
var adjustsFontSizeToFitWidth: Bool { get set }

// 绘制文本字段文本时允许最小字体的大小。
var minimumFontSize: CGFloat

```

## Managing the Editing Behavior 管理编辑行为

```swift
// 一个布尔值，指示文本字段当前是否处于编辑模式。
var isEditing: Bool { get }

// 一个布尔值，用于确定文本字段在编辑开始时是否删除旧文本。
// 如果此属性设置为true，则当用户选择要开始编辑的文本字段时，文本字段的上一个文本将被清除。
// 如果为false，文本字段会在用户点击该字段的地方放置一个插入点。
var clearsOnBeginEditing: Bool { get set }

// 一个布尔值，用于确定插入文本是否取代之前的内容。
// 此属性的默认值为false。当此属性的值为true且文本字段处于编辑模式时，选择UI被隐藏并插入新文本将清除文本字段的内容，并将该属性的值设置为false。
var clearsOnInsertion: Bool { get set }

// 一个布尔值，用于确定用户是否可以编辑文本字段中的文本属性。
// 如果此属性设置为true，用户可以编辑文本的样式信息。此外，将样式文本粘贴到文本字段中会保留任何嵌入式样式信息。
// 如果为false，文本字段禁止编辑样式信息，并从任何粘贴的文本中删除样式信息。但是，您仍然可以使用此类的方法以编程方式设置样式信息。
// 默认值为false。
var allowsEditingTextAttributes: Bool { get set }

// 指示结束文本字段编辑原因的常量。
enum UITextField.DidEndEditingReason

// 指示在文本字段中结束编辑原因的键。
class let didEndEditingReasonUserInfoKey: String

// 当编辑会话在文本字段中开始时提醒观察者的通知。
class let textDidBeginEditingNotification: NSNotification.Name

// 当文本字段中的文本发生变化时提醒观察者的通知。
class let textDidChangeNotification: NSNotification.Name

// 当文本字段的编辑会话结束时提醒观察者的通知。
class let textDidEndEditingNotification: NSNotification.Name

```

## Setting the View’s Background Appearance 设置视图的背景外观

```swift
// 文本字段的边框样式。
// 此属性的默认值为UITextField.BorderStyle.none。
// 如果该值设置为UITextField.BorderStyle.roundedRect样式，则与文本字段关联的自定义背景图像将被忽略。
// enum BorderStyle : Int, @unchecked Sendable
// case none 文本字段不显示边框。
// case line 在文本字段周围显示一个细长方形。
// case bezel 显示文本字段的边框样式边框。这种样式通常用于标准数据输入字段。
// case roundedRect 显示文本字段的圆形边框。
var borderStyle: UITextField.BorderStyle { get set }

// 表示文本字段处于启用状态时背景外观的图像。
var background: UIImage? { get set }

// 表示文本字段处于禁用状态时背景外观的图像。
var disabledBackground: UIImage? { get set }

```

## Managing Overlay Views 管理叠加视图

```swift
// 一种控制标准清除按钮何时出现在文本字段中的模式。
// 当文本字段有内容时，标准清除按钮显示在文本字段的右侧，为用户提供了快速删除文本的方法。
// 此按钮根据此属性的值自动显示。
// 默认值为UITextField.ViewMode.never。
// enum ViewMode : Int, @unchecked Sendable
// case never 叠加视图从未出现。
// case whileEditing 叠加视图仅在文本字段中编辑文本时显示。
// case unlessEditing 仅在未编辑文本时显示叠加视图。
// case always 如果文本字段包含文本，则始终显示叠加视图。
var clearButtonMode: UITextField.ViewMode { get set }

// 显示在文本字段左侧（或前导）侧的叠加视图。
// 您可以使用左侧叠加视图来指示文本字段的预期行为。例如，您可能会在这个位置显示放大镜，以指示文本字段是搜索字段。在从右到左的用户界面中，左侧叠加视图会自动翻转。
// 左侧叠加视图放置在接收器的左ViewRect（forBounds:）方法返回的矩形中。与此属性关联的图像应适合给定的矩形。如果它不合适，就会缩放以适应。如果您为视图指定控件，控件将像往常一样跟踪和发送操作。
var leftView: UIView? { get set }

// 显示在文本字段右侧（或尾随）的叠加视图。
// 您可以使用正确的叠加视图来指示文本字段可用的其他功能。例如，您可能会在此位置显示书签按钮，允许用户从一组预定义的项目中进行选择。在从右到左的用户界面中，右侧叠加视图会自动翻转。
// 右侧叠加视图放置在接收器的右ViewRect（forBounds:）方法返回的矩形中。与此属性关联的图像应适合给定的矩形。如果它不合适，就会缩放以适应。如果您为视图指定一个控件，该控件会像往常一样跟踪和发送操作。
// 如果您的右侧叠加视图与兄弟姐妹视图重叠，例如清除按钮，则必须使用UITextField.ViewMode来实现正确的行为。例如，如果clearButtonMode设置为显示清除按钮，您可以将右侧叠加视图的右侧ViewMode设置为UITextField.ViewMode.unlessEditing，以便在文本字段有内容的编辑期间显示清除按钮。
var rightView: UIView? { get set }

// 一种控制文本字段中何时出现右侧叠加视图的模式。
var rightViewMode: UITextField.ViewMode

```

## Drawing and Positioning Overrides 绘图和定位覆盖

```swift
// 返回文本字段文本的绘图矩形。
// 您不应该直接调用此方法。
func textRect(forBounds: CGRect) -> CGRect

// 返回文本字段占位符文本的绘图矩形。
// 您不应该直接调用此方法。
func placeholderRect(forBounds: CGRect) -> CGRect

// 在指定的矩形中绘制文本字段的占位符文本。
// 您不应该直接调用此方法。
func drawPlaceholder(in: CGRect)

// 返回文本字段的边框矩形。
// 您不应该直接调用此方法。
func borderRect(forBounds: CGRect) -> CGRect

// 返回用于显示可编辑文本的矩形。
// 您不应该直接调用此方法。
func editingRect(forBounds: CGRect) -> CGRect

// 返回内置清除按钮的绘图矩形。
// 您不应该直接调用此方法。
func clearButtonRect(forBounds: CGRect) -> CGRect

// 返回文本字段左侧叠加视图的绘图矩形。
// 您不应该直接调用此方法。
func leftViewRect(forBounds: CGRect) -> CGRect

// 返回文本字段右侧叠加视图的绘图位置。
// 您不应该直接调用此方法。如果您想在另一个位置放置正确的叠加视图，您可以覆盖此方法并返回新的矩形。
// 请注意，绘图矩形在从右到左的用户界面中保持不变
func rightViewRect(forBounds: CGRect) -> CGRect

```

## Replacing the System Input Views 替换系统输入视图

```swift
// 当文本字段成为第一个响应者时显示的自定义输入视图。
// 如果此属性中的值为nil，则当它成为第一响应者时，文本字段将显示标准系统键盘。
// 将自定义视图分配给此属性会导致显示该视图。
// 此属性的默认值为nil。
var inputView: UIView? { get set }

// 当文本字段成为第一个响应者时显示的自定义配件视图。
// 此属性的默认值为nil。
// 当文本字段成为第一个响应器时，将视图分配给此属性会导致该视图显示在标准系统键盘上方（如果提供了自定义输入视图），则显示在自定义输入视图上方。例如，您可以使用此属性将自定义工具栏附加到键盘上。
var inputAccessoryView: UIView? { get set }
```
