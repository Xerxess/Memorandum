<!-- TOC -->

- [UIPasteboard](#uipasteboard)
- [普通粘贴板和命名粘贴板](#普通粘贴板和命名粘贴板)
- [使用粘贴板](#使用粘贴板)
- [检测](#检测)
- [Pasteboard Items and Representation Types 粘贴板项目和表示类型](#pasteboard-items-and-representation-types-粘贴板项目和表示类型)
- [Sharing Pasteboards Between Devices 在设备之间共享粘贴板](#sharing-pasteboards-between-devices-在设备之间共享粘贴板)
- [Using Pasteboards With Other Objects 将粘贴板与其他对象一起使用](#using-pasteboards-with-other-objects-将粘贴板与其他对象一起使用)
- [API](#api)
    - [Getting and Removing Pasteboards  获取和移除粘贴板](#getting-and-removing-pasteboards--获取和移除粘贴板)
    - [Getting and Setting Pasteboard Attributes  获取和设置粘贴板属性](#getting-and-setting-pasteboard-attributes--获取和设置粘贴板属性)
    - [Determining Types of Pasteboard Items 确定粘贴板物品的类型](#determining-types-of-pasteboard-items-确定粘贴板物品的类型)
    - [Getting and Setting Pasteboard Items 获取和设置粘贴板项目](#getting-and-setting-pasteboard-items-获取和设置粘贴板项目)
    - [Getting and Setting Pasteboard Items of Standard Data Types 获取和设置标准数据类型的粘贴板项目](#getting-and-setting-pasteboard-items-of-standard-data-types-获取和设置标准数据类型的粘贴板项目)
    - [Checking for Data Types on a Pasteboard 在粘贴板上检查数据类型](#checking-for-data-types-on-a-pasteboard-在粘贴板上检查数据类型)
    - [Getting and Setting Item Providers 获取和设置项目提供商](#getting-and-setting-item-providers-获取和设置项目提供商)

<!-- /TOC -->

# UIPasteboard

一个帮助用户在您的应用程序中将数据从一个地方共享到另一个地方，并从您的应用程序共享到其他应用程序的对象。

对于与任何其他应用程序共享数据，请使用系统范围的`通用粘贴板`；
对于与您的团队的另一个应用程序共享数据（与要共享的应用程序具有相同的团队ID）使用命名的粘贴板。
在典型的用法中，当用户请求对用户界面中的选择进行复制、剪切或复制操作时，应用程序中的对象会将数据写入粘贴板。
然后，同一或不同应用程序中的另一个对象从粘贴板中读取该数据，并将其呈现给用户；
`这通常发生在用户请求粘贴操作时。`

从`iOS 14`开始，当应用程序收到源自其他应用程序的一般粘贴板内容时，系统会通知用户。
使用“检测粘贴板项目中的内容模式”中描述的方法来确定粘贴板项目是否与各种模式匹配，例如网络搜索词、URL或数字，而无需通知用户。

```swift
class UIPasteboard : NSObject
```

# 普通粘贴板和命名粘贴板

系统范围的 UIPasteboard.Name.general 粘贴板被标识为通用常量；您可以将其用于`任何类型的数据`。使用通用类方法获取通用粘贴板。
使用类方法init（name:create:）和UniqueName()创建`命名粘贴板`，以便在应用程序内共享数据，并将数据从应用程序共享到具有相同团队ID的其他应用程序。

# 使用粘贴板

UIPasteboard类提供了`读取和写入``单个粘贴板`项目的方法，以及`同时读取和写入多个粘贴板项目`的方法。
要写入粘贴板的数据可以有两种形式：

- 如果数据可以由对象（如NSString、NSArray、NSDictionary、NSDate、NSNumber、UIImage或NSURL）表示，则可以表示为值；请使用`setValue(_:forPasteboardType:)`等方法将其写入粘贴板。
- 如果数据是二进制的，请使用`setData(_:forPasteboardType:)`方法将其写入粘贴板。

# 检测

UIPasteboard提供属性，用于`直接检查粘贴板`上是否存在特定数据类型，如“检查粘贴板上的数据类型”中所述。  
使用这些属性，而`不是尝试读取粘贴板数据`，以避免系统在需要数据之前或数据可能不存在时不必要地尝试获取数据。  
例如，您可以使用新的hasStrings属性来确定是否使用以下代码在用户界面中显示字符串数据粘贴选项：

```swift
if UIPasteboard.general.hasStrings {
    ...
}
```

# Pasteboard Items and Representation Types 粘贴板项目和表示类型

当您将对象写入粘贴板时，粘贴板将其存储为粘贴板项目。  
粘贴板项由一个或多个键值对组成，其中键标识值的表示类型（有时称为粘贴板类型）。

# Sharing Pasteboards Between Devices 在设备之间共享粘贴板

当用户登录iCloud时，通用粘贴板会自动使用同一iCloud帐户将其内容传输到附近的设备。  
您可以在将内容写入常规粘贴板时控制接力行为，并使用`setItems(_:options:)`方法为项目设置过期，如下所示：

- 要从接力中排除粘贴板，请使用localOnly选项调用setItems(_:options:)方法。
- 要指示复制数据的到期时间和日期，请使用expirationDate选项调用setItems(_:options:)方法。在您设置的时间和日期，系统会从粘贴板中删除粘贴板项目。

# Using Pasteboards With Other Objects 将粘贴板与其他对象一起使用

虽然UIPasteboard类是复制、粘贴和复制操作的核心，但您也可以在这些操作中使用其他UIKit类的协议和实例：

- `UIMenuController` — 显示一个菜单，其中包含选择上方或下方的复制、剪切、粘贴、选择和选择所有命令。
- `UIResponder` — 响应者实现 canPerformAction(_:withSender:)，根据当前上下文在上述菜单中启用或禁用命令。
- `IResponderStandardEditActions` ——响应者实现此非正式协议中声明的方法来处理所选菜单命令（例如，复制：和粘贴：）。

# API

## Getting and Removing Pasteboards  获取和移除粘贴板

```swift
// 返回系统范围的`通用粘贴板，用于一般复制粘贴操作`
class var general: UIPasteboard

// 返回按名称标识的粘贴板，如果不存在，可以选择创建它。
init?(name: UIPasteboard.Name, create: Bool)

// 返回由唯一系统生成名称标识的应用程序粘贴板。
class func withUniqueName() -> UIPasteboard

// 指定应用程序粘贴板无效。
class func remove(withName: UIPasteboard.Name)


```

## Getting and Setting Pasteboard Attributes  获取和设置粘贴板属性

```swift
// 粘贴板的名称。
var name: UIPasteboard.Name

// 粘贴板内容更改的次数。
var changeCount: Int

```

## Determining Types of Pasteboard Items 确定粘贴板物品的类型

```swift
// 返回粘贴板上第一个项目的类型。
var types: [String]

// 返回每个指定粘贴板项的表示类型数组。
func types(forItemSet: IndexSet?) -> [[String]]?

// 返回粘贴板是否包含指定表示类型的数据。
func contains(pasteboardTypes: [String]) -> Bool

// 返回指定的粘贴板项是否包含给定表示类型的数据。
func contains(pasteboardTypes: [String], inItemSet: IndexSet?) -> Bool

// 返回一个索引集，标识具有指定表示类型的粘贴板项。
func itemSet(withPasteboardTypes: [String]) -> IndexSet?

```

## Getting and Setting Pasteboard Items 获取和设置粘贴板项目

```swift
// 返回粘贴板中的项目数量
var numberOfItems: Int

// 粘贴板上的粘贴板项目。
// 该属性的值是一个字典数组。
// 每个字典代表一个粘贴板项，键是表示类型和与该类型关联的对象值。
// 设置此属性将替换所有当前的粘贴板项目。
var items: [[String : Any]]

// 将粘贴板项目附加到粘贴板的当前内容中。
func addItems([[String : Any]])

// 将项目数组添加到粘贴板中，并为粘贴板上的所有项目设置隐私选项。
// UIPasteboard.OptionsKey
// static let expirationDate: UIPasteboard.OptionsKey NSDate值，指定您希望系统从粘贴板中删除粘贴板项的时间和日期。
// static let localOnly: UIPasteboard.OptionsKey 一个布尔值，表示为NSNumber类型，指定粘贴板项目不应通过接力功能提供给其他设备。
func setItems([[String : Any]], options: [UIPasteboard.OptionsKey : Any])

// 返回粘贴板中给定表示类型的数据。
func data(forPasteboardType: String) -> Data?

//  返回具有给定表示类型的指示粘贴板项中的数据对象。
func data(forPasteboardType: String, inItemSet: IndexSet?) -> [Data]?

// 将指定表示类型的数据放入粘贴板中。
// 使用此方法将原始数据放在粘贴板上。
// 例如，您可以使用自定义粘贴板类型归档模型对象的图形，并通过粘贴板将生成的NSData对象传递给相关应用程序。
// 此方法为粘贴板中的第一个项目写入数据。
// 调用此方法将替换当前粘贴板中的任何项目。
func setData(Data, forPasteboardType: String)

// 返回粘贴板中给定表示类型的对象。
func value(forPasteboardType: String) -> Any?

// 返回具有给定表示类型的指示粘贴板项中的对象。
func values(forPasteboardType: String, inItemSet: IndexSet?) -> [Any]?

// 将指定表示类型的对象放在粘贴板中。
// 使用此方法将对象（如NSString、NSArray、NSDictionary、NSDate、NSNumber、UIImage或NSURL对象）放在粘贴板上。
//（对于图像，您还可以使用图像或图像属性；
// 对于所有其他数据，例如原始二进制数据，请使用setData(_:forPasteboardType:)方法。）此方法将对象写入粘贴板中的第一个项目。
// 调用此方法将替换当前粘贴板中的任何项目。
func setValue(Any, forPasteboardType: String)

```

## Getting and Setting Pasteboard Items of Standard Data Types 获取和设置标准数据类型的粘贴板项目

```swift
// 第一个粘贴板项的字符串值。
var string: String?

// 所有粘贴板项目中的字符串数组。
var strings: [String]?

// 第一个粘贴板项目的图像对象。
var image: UIImage?
var images: [UIImage]?

// 第一个粘贴板项的URL对象。
var url: URL?
var urls: [URL]?

// 第一个粘贴板项目的颜色对象。
var color: UIColor?
var colors: [UIColor]?

```

## Checking for Data Types on a Pasteboard 在粘贴板上检查数据类型

```swift
var hasColors: Bool
var hasImages: Bool
var hasStrings: Bool
var hasURLs: Bool
```

## Getting and Setting Item Providers 获取和设置项目提供商

```swift
// 粘贴板的项目提供程序数组。
var itemProviders: [NSItemProvider]
func setItemProviders([NSItemProvider], localOnly: Bool, expirationDate: Date?)

// 根据指定的对象数组为粘贴板设置项目提供程序数组。
func setObjects([NSItemProviderWriting])

// 根据指定的对象数组为粘贴板设置项目提供程序数组。
func setObjects<T>([T])


```

## Constants 常量

```swift
// 标识粘贴板名称的常量。
struct UIPasteboard.Name

//  描述粘贴板隐私的选项。将这些选项与setItems(_:options:)方法一起使用。您设置的选项适用于粘贴板上的所有项目。
struct UIPasteboard.OptionsKey

```

## Notifications 

```swift
// 当粘贴板对象的内容发生变化时，由其发布。
class let changedNotification: NSNotification.Name

//  在应用程序删除它之前，由粘贴板对象发布。
class let removedNotification: NSNotification.Name

```

## Instance Methods 实例方法

```swift

```