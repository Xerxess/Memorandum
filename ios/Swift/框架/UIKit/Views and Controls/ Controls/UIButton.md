<!-- TOC -->

- [UIButton](#uibutton)
- [响应按钮点击](#%E5%93%8D%E5%BA%94%E6%8C%89%E9%92%AE%E7%82%B9%E5%87%BB)
- [配置按钮的外观](#%E9%85%8D%E7%BD%AE%E6%8C%89%E9%92%AE%E7%9A%84%E5%A4%96%E8%A7%82)
- [配置按钮状态](#%E9%85%8D%E7%BD%AE%E6%8C%89%E9%92%AE%E7%8A%B6%E6%80%81)
- [提供内容](#%E6%8F%90%E4%BE%9B%E5%86%85%E5%AE%B9)
- [自定义色调颜色](#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%89%B2%E8%B0%83%E9%A2%9C%E8%89%B2)
- [指定边缘插入](#%E6%8C%87%E5%AE%9A%E8%BE%B9%E7%BC%98%E6%8F%92%E5%85%A5)
- [API](#api)
    - [Creating buttons](#creating-buttons)
    - [Creating buttons of a specific type 创建特定类型的按钮](#creating-buttons-of-a-specific-type-%E5%88%9B%E5%BB%BA%E7%89%B9%E5%AE%9A%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%8C%89%E9%92%AE)
    - [Creating system buttons 创建系统按钮](#creating-system-buttons-%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F%E6%8C%89%E9%92%AE)
    - [Creating buttons from a configuration object 从配置对象创建按钮](#creating-buttons-from-a-configuration-object-%E4%BB%8E%E9%85%8D%E7%BD%AE%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA%E6%8C%89%E9%92%AE)
    - [Managing the appearance with a configuration object 使用配置对象管理外观](#managing-the-appearance-with-a-configuration-object-%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE%E5%AF%B9%E8%B1%A1%E7%AE%A1%E7%90%86%E5%A4%96%E8%A7%82)
    - [Managing the title 管理标题](#managing-the-title-%E7%AE%A1%E7%90%86%E6%A0%87%E9%A2%98)
    - [Managing images and tint color 管理图像和色调颜色](#managing-images-and-tint-color-%E7%AE%A1%E7%90%86%E5%9B%BE%E5%83%8F%E5%92%8C%E8%89%B2%E8%B0%83%E9%A2%9C%E8%89%B2)
    - [Specifying the role 指定角色](#specifying-the-role-%E6%8C%87%E5%AE%9A%E8%A7%92%E8%89%B2)
    - [Specifying the behavioral style 指定行为风格](#specifying-the-behavioral-style-%E6%8C%87%E5%AE%9A%E8%A1%8C%E4%B8%BA%E9%A3%8E%E6%A0%BC)
    - [Getting the current state  获取当前状态](#getting-the-current-state--%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E7%8A%B6%E6%80%81)
    - [Supporting pointer interactions 支持指针交互](#supporting-pointer-interactions-%E6%94%AF%E6%8C%81%E6%8C%87%E9%92%88%E4%BA%A4%E4%BA%92)
    - [Supporting menu and toggle buttons 支持菜单和切换按钮](#supporting-menu-and-toggle-buttons-%E6%94%AF%E6%8C%81%E8%8F%9C%E5%8D%95%E5%92%8C%E5%88%87%E6%8D%A2%E6%8C%89%E9%92%AE)
- [UIButton.Configuration](#uibuttonconfiguration)

<!-- /TOC -->

# UIButton

根据用户交互执行自定义代码的控件。

当您点击按钮或选择具有焦点的按钮时，该按钮将执行与之关联的任何操作。  
您使用文本标签、图像或两者来传达按钮的目的。  
`按钮的外观是可配置的`，因此您可以着色按钮或格式标题以匹配应用程序的设计。  
您可以以编程方式或使用Interface Builder向界面添加按钮。

向界面添加按钮时，请执行以下步骤：
- 在创建时设置按钮的类型。
- 提供标题字符串或图像；根据您的内容调整按钮的大小。
- 将一种或多种操作方法连接到按钮。
- 设置自动布局规则来管理按钮在界面中的大小和位置。
- 提供辅助功能信息和本地化字符串。

```swift
@MainActor class UIButton : UIControl
```

# 响应按钮点击

当用户点击按钮时，按钮使用target-action设计模式来通知您的应用程序。  
您将操作方法分配给按钮，并指定哪些事件触发对方法的调用，而不是直接处理触摸事件。  
在运行时，该按钮处理所有传入的触摸事件，并调用您的方法进行响应。

您可以使用addTarget(_:action:for:)方法或通过在Interface Builder中创建连接将按钮连接到操作方法。

# 配置按钮的外观

按钮的类型定义了其基本外观和行为。  
您可以在创建时使用init（type:）方法或故事板文件中指定按钮的类型。  
`创建按钮后，您无法更改其类型`。  
最常用的`按钮类型是自定义类型和系统类型`，但适当时使用其他类型。

# 配置按钮状态

按钮有五个状态来定义其外观：`默认`、`高亮显示`、`聚焦`、`选择`和`禁用`。  
当您向界面添加按钮时，它最初处于默认状态，这意味着该按钮已启用，用户没有与之交互。  
当用户与按钮交互时，其状态会更改为其他值。  
例如，当用户点击带有标题的按钮时，该按钮将移动到突出显示的状态。

# 提供内容

按钮的内容由您`指定的标题字符串`或`图像`组成。  
您指定的内容用于配置由按钮本身管理的`UILabel`和`UIImageView`对象。  
您可以使用titleLabel或imageView属性访问这些对象，并直接修改其值。  
该类的方法还为配置字符串或图像的外观提供了方便的快捷方式。

通常，您使用标题或图像配置按钮，并相应地调整按钮的大小。  
按钮还可以有一个背景图像，该图像位于您指定的内容后面。  
可以为按钮指定图像和标题，从而导致下图所示的外观。您可以使用指定的属性访问按钮的当前内容。

# 自定义色调颜色

您可以使用`tintColor`属性指定自定义按钮色调。  
此属性设置按钮图像和文本的颜色。  
如果您没有显式设置色调，该按钮将使用其Superview的色调颜色。

# 指定边缘插入

使用嵌入来添加或删除自定义或系统按钮中内容周围的空间。  
您可以为按钮的标题（titleEdgeInsets）、图像（imageEdgeInsets）以及标题和图像（contentEdgeInsets）指定单独的嵌入。  
应用时，插入会影响按钮的相应内容矩形，自动布局引擎使用该矩形来确定按钮的位置。

# API

## Creating buttons

```swift
init(frame: CGRect)
init(frame: CGRect, primaryAction: UIAction?)
init?(coder: NSCoder)
```

## Creating buttons of a specific type 创建特定类型的按钮

```swift
// 创建并返回指定类型的新按钮。
// 此方法是创建具有特定配置的按钮对象的方便构造函数。
// 在创建自定义按钮（类型为UIButton.ButtonType.custom的按钮）时，按钮的框架最初设置为（0，0，0，0）。
// 在将按钮添加到界面之前，您应该将框架更新为更合适的值。
// enum ButtonType : Int, @unchecked Sendable
// case custom 没有按钮样式。
// case system 系统样式按钮，如导航栏和工具栏中显示的按钮。
// case detailDisclosure 详细披露按钮。
// case infoLight 具有浅色背景的信息按钮。
// case infoDark 具有深色背景的信息按钮。
// case contactAdd 联系人添加按钮。
// case plain 没有模糊背景视图的标准系统按钮。
// case close 关闭按钮以关闭面板和视图。
// static var roundedRect: UIButton.ButtonType 圆形矩形样式按钮。
convenience init(type buttonType: UIButton.ButtonType)

// 使用指定类型创建一个新按钮，注册主要操作事件，并将标题和图像设置为操作的标题和图像。
@MainActor convenience init(
    type buttonType: UIButton.ButtonType = .system,
    primaryAction: UIAction?
)
```

## Creating system buttons 创建系统按钮

```swift
// 创建并返回具有指定图像、目标和操作的系统类型按钮。
// 此方法是创建具有特定目标和操作的UIButtonTypeSystem类型按钮对象的方便构造函数。
class func systemButton(
    with image: UIImage,
    target: Any?,
    action: Selector?
) -> Self
```

## Creating buttons from a configuration object 从配置对象创建按钮

```swift
// 使用指定的配置创建一个新按钮，并注册主要操作事件。
// struct Configuration
@MainActor convenience init(
    configuration: UIButton.Configuration,
    primaryAction: UIAction? = nil
)
```

## Managing the appearance with a configuration object 使用配置对象管理外观

 ```swift
 // 按钮外观的配置。
 // 设置配置将按钮选择进入基于UIButton.Configuration的配置系统。
 // 此配置支持其他配置方法不可用的多个选项和行为。
 // 功能包括字幕标签、对背景外观的扩展控制、在按钮更改状态时转换按钮配置的方法，以及在使用Mac Catalyst构建时与macOS集成。
// 使用配置时，该按钮会忽略UIButton不建议使用的方法和属性。您可以将UIButton的大多数其他方法和属性与配置相结合。
// 如果您有现有代码来配置按钮，您可以将此属性设置为利用其他配置功能。
// 如果配置为nil，UIButton的其他支持属性和方法，如setTitle(_:for:)，可以控制按钮的外观。
 @MainActor var configuration: UIButton.Configuration? { get set }

 // 一个布尔值，用于确定按钮的状态更改时按钮配置是否发生变化。
 // 将此属性设置为true，以便在按钮状态更改时 updated(for:)，并将更改应用于按钮。
 // 默认值为true。
 var automaticallyUpdatesConfiguration: Bool { get set }

 // 请求系统更新按钮配置。
 func setNeedsUpdateConfiguration()

// 根据按钮状态更改更新按钮配置。
func updateConfiguration()

// 当按钮状态更改时执行的闭包。
// 使用此属性作为覆盖updateConfiguration()的替代方案。
// 设置一个闭包，通过更新按钮配置来响应按钮状态更改。
var configurationUpdateHandler: UIButton.ConfigurationUpdateHandler? { get set }

// 更新按钮配置的闭包。
UIButton.ConfigurationUpdateHandler
typealias ConfigurationUpdateHandler = (UIButton) -> Void
 ```

## Managing the title 管理标题

 ```swift
// 显示按钮当前标题属性值的视图。
// 虽然此属性是只读的，但它自己的属性是读/写的。
// 主要使用这些属性来配置按钮的文本。
// 不要使用标签对象设置文本颜色或阴影颜色。相反，请使用该类的setTitleColor(_:for:)和setTitleShadowColor(_:for:)方法进行这些更改。
// 要设置标签的实际文本，请使用setTitle(_:for:)（button.titleLabel.text不允许您设置文本）。
// 即使按钮尚未显示，titleLabel属性也会返回一个值。
// 对于系统按钮，该属性的值为nil。
var titleLabel: UILabel? { get }

// 返回与指定状态关联的标题。
// 指定状态的标题。如果没有为特定状态设置标题，此方法将返回与正常状态关联的标题。
func title(for: UIControl.State) -> String?

// 设置用于指定状态的标题。
// 使用此方法设置按钮的标题。您指定的标题从按钮的关联标签对象中导出其格式。
// 如果您没有为其他州指定标题，该按钮将使用与正常状态关联的标题。
// 如果您没有将值设置为正常值，则该属性默认为系统值。
func setTitle(
    _ title: String?,
    for state: UIControl.State
)

// 返回与指定状态关联的样式标题。
func attributedTitle(for: UIControl.State) -> NSAttributedString?

// 设置用于指定状态的样式标题。
func setAttributedTitle(NSAttributedString?, for: UIControl.State)

// 返回用于状态的标题颜色。
func titleColor(for: UIControl.State) -> UIColor?

// 设置用于指定状态的标题颜色。
func setTitleColor(UIColor?, for: UIControl.State)

// 返回用于状态的标题的阴影颜色。
func titleShadowColor(for: UIControl.State) -> UIColor?

// 设置用于指定状态的标题阴影的颜色。
func setTitleShadowColor(UIColor?, for: UIControl.State)

 ```

## Managing images and tint color 管理图像和色调颜色

 ```swift
 // 返回用于按钮状态的背景图像。
 func backgroundImage(for: UIControl.State) -> UIImage?

// 返回用于按钮状态的图像。
func image(for: UIControl.State) -> UIImage?

// 设置用于指定按钮状态的背景图像。
func setBackgroundImage(UIImage?, for: UIControl.State)

// 设置要用于指定状态的图像。
func setImage(UIImage?, for: UIControl.State)

// 返回按钮状态的首选符号配置。
func preferredSymbolConfigurationForImage(in: UIControl.State) -> UIImage.SymbolConfiguration?

// 设置按钮状态的首选符号配置。
func setPreferredSymbolConfiguration(UIImage.SymbolConfiguration?, forImageIn: UIControl.State)

// 适用于按钮标题和图像的色调颜色。
// UIView的所有子类都从基类派生出其tintColor的行为。
// 此属性对类型为UIButton.ButtonType.custom的按钮没有默认效果。对于自定义按钮，您必须自己实现与tintColor相关的任何行为。
var tintColor: UIColor! { get set }

 ```

## Specifying the role 指定角色

 ```swift
 // 按钮的作用。
 var role: UIButton.Role { get set }

// 描述按钮作用的常量。
// case normal 默认按钮样式的按钮角色。
// case primary 响应主按键的按钮角色。
// case cancel 响应取消操作的按钮角色。
// case destructive 带有红色背景的按钮角色。
 enum UIButton.Role

 ```

## Specifying the behavioral style 指定行为风格

 ```swift
 // 决定按钮行为方式的样式。
 var behavioralStyle: UIBehavioralStyle

// 首选的行为风格。
var preferredBehavioralStyle: UIBehavioralStyle

// 指示控件在使用Mac Catalyst构建的应用程序中的行为的常量。
enum UIBehavioralStyle

 ```

## Getting the current state  获取当前状态

 ```swift
 // 按钮类型。
 var buttonType: UIButton.ButtonType { get }

 // 按钮上显示的当前标题。
 var currentTitle: String?

// 按钮上显示的当前样式标题。
var currentAttributedTitle: NSAttributedString?

// 用于显示标题的颜色。
var currentTitleColor: UIColor

// 标题阴影的颜色。
var currentTitleShadowColor: UIColor?

// 按钮上显示的当前图像。
var currentImage: UIImage?

// 按钮上显示的当前背景图像
var currentBackgroundImage: UIImage?

// 当前的符号大小、样式和重量。
var currentPreferredSymbolConfiguration: UIImage.SymbolConfiguration?

// 按钮的图像视图。
var imageView: UIImageView?

// 显示副标题文本的标签。
var subtitleLabel: UILabel?

 ```

## Supporting pointer interactions 支持指针交互

 ```swift
 // 启用指针交互的布尔值。
 // 默认值为false。
 var isPointerInteractionEnabled: Bool { get set }
 
 // 一个布尔值，指示指针效果是否处于活动状态。
 // 如果您通过设置isPointerInteractionEnabled来启用指针交互，此属性表示按钮具有活动指针效果。
 var isHovered: Bool { get }
 ```

##  Supporting menu and toggle buttons 支持菜单和切换按钮

 配置按钮以显示下拉菜单、弹出式菜单或切换选择。

 ```swift
 // 按钮显示的菜单。
 // 默认值为nil。
 // 当此属性更改时，按钮会自动启用和禁用contextMenuInteraction。
@NSCopying var menu: UIMenu? { get set }

 // 一个布尔值，指示按钮菜单是否可见。
 // 如果按钮显示菜单以响应长按，则该属性为true。
 // 设置显示菜单的menuAsPrimaryAction的按钮不会设置此属性。
 var isHeld: Bool { get }

 // 一个布尔值，指示按钮是否通过菜单或切换跟踪选择。
 var changesSelectionAsPrimaryAction: Bool { get set }
 ```

# UIButton.Configuration

```swift
struct Configuration

// 为具有透明背景的按钮创建配置。
static func plain() -> UIButton.Configuration

// 为灰色背景的按钮创建配置。
static func gray() -> UIButton.Configuration

// 为具有有色背景颜色的按钮创建配置。
static func tinted() -> UIButton.Configuration

// 为带有按钮色调的背景的按钮创建配置，该按钮的颜色
static func filled() -> UIButton.Configuration

// 为具有无边框样式的按钮创建配置。
static func borderless() -> UIButton.Configuration

// 为具有边框样式的按钮创建配置。
static func bordered() -> UIButton.Configuration

// 为具有有色边框样式的按钮创建配置。
static func borderedTinted() -> UIButton.Configuration

// 为具有突出边框样式的按钮创建配置。
static func borderedProminent() -> UIButton.Configuration

// 返回配置副本，并针对给定按钮进行了更新。
func updated(for: UIButton) -> UIButton.Configuration
```

```swift
// 按钮显示的标题标签的文本。
var title: String?

// 按钮的副标题标签显示的文本。
var subtitle: String?

// 按钮标题标签的文本和样式属性。
var attributedTitle: AttributedString?

// 按钮副标题标签的文本和样式属性。
var attributedSubtitle: AttributedString?

// 当按钮状态发生变化时，用于更新归因标题的结构。
var titleTextAttributesTransformer: UIConfigurationTextAttributesTransformer?

// 当按钮状态发生变化时，用于更新属性副标题的结构。
var subtitleTextAttributesTransformer: UIConfigurationTextAttributesTransformer?

struct UIConfigurationTextAttributesTransformer
//Defines a text transformation that can affect the visual appearance of a string.

// 标题和副标题标签之间的距离。
var titlePadding: CGFloat

// 按钮用于布局标题和副标题的文本对齐。
var titleAlignment: UIButton.Configuration.TitleAlignment

// 按钮显示的前景图像。
var image: UIImage?

// 按钮的图像和文本之间的距离。
var imagePadding: CGFloat

// 按钮放置图像的边缘。
var imagePlacement: NSDirectionalRectEdge

// 当按钮状态发生变化时转换图像颜色的块。
var imageColorTransformer: UIConfigurationColorTransformer?

// 按钮符号图像的请求配置对象。
var preferredSymbolConfigurationForImage: UIImage.SymbolConfiguration?

// 请求按钮首选尺寸的尺寸。
// 尺寸表示您更喜欢此按钮的系统定义大小。无论此值如何，按钮的确切大小都可能发生变化。
var buttonSize: UIButton.Configuration.Size { get set }

// case large 显示大尺寸的按钮元素。
// case medium 以标准尺寸显示按钮元素。
// case small 以小尺寸显示按钮元素。
// case mini 以最小的尺寸显示按钮元素。
enum UIButton.Configuration.Size

// 从按钮内容区域到其边界的距离。
var contentInsets: NSDirectionalEdgeInsets

// 恢复默认内容插入。
func setDefaultContentInsets()

// 背景视图的未变换颜色。
var baseBackgroundColor: UIColor?

// 前景视图的未变换颜色。
var baseForegroundColor: UIColor?

// 自定义按钮背景的配置。
var background: UIBackgroundConfiguration

// 控制背景角半径显示行为的按钮样式。
var cornerStyle: UIButton.Configuration.CornerStyle

// 确定背景角半径外观的设置。
// case dynamic 为动态类型调整背景角半径的样式。
// case fixed 不加修改地使用背景角半径的样式。
// case capsule 一种忽略背景角半径并使用生成胶囊的角半径的样式。
// case large 一种忽略背景角半径并使用大型系统定义角半径的样式。
// case medium 一种忽略背景角半径并使用中等系统定义的角半径的样式。
// case small 一种忽略背景角半径并使用系统定义的小角半径的样式。
enum UIButton.Configuration.CornerStyle

// 按钮上显示的指示器样式。
// 使用此属性控制出现在按钮尾随边缘的指示器的样式。
// enum UIButton.Configuration.Indicator
// case automatic 根据按钮的属性自动确定指标样式的常量。
// case none 不显示指标的常数。
// case popup 显示弹出式指示器的常量。
var indicator: UIButton.Configuration.Indicator { get set }

// 一个布尔值，用于确定按钮是否显示loading指示器而不是图像
var showsActivityIndicator: Bool { get set }
```
