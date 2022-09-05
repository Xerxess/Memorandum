<!-- TOC -->

- [UIBarButtonItemGroup](#uibarbuttonitemgroup)
- [API](#api)
    - [](#)
    - [配置组](#配置组)
    - [确定团队的外表](#确定团队的外表)

<!-- /TOC -->

# UIBarButtonItemGroup

一组一个或多个条形按钮项，用于放置在导航栏或快捷方式栏上。

组包含`一个`或`多个`条形按钮项和一个可选的代表项，而不是在空间限制下显示的单个项目。  
您`可以创建任意数量的组`，并使用任意数量的项目配置每个组。

当创建具有多个条形按钮项的组时，建议您也提供一个具有代表性的项目来显示。  
代表项目必须是一个完全独立的条形按钮项；它不能是组中已有的项目之一。  
当没有足够的空间在栏中显示组的所有项目时，UIKit会显示代表项目。  
点击代表项目调用该项目的操作方法。当您没有指定操作方法时，UIKit会使用标准界面自动显示组中的项目。  
要展示您自己的界面，请提供自定义操作方法，并使用它来显示您想要的界面。

```swift
@MainActor class UIBarButtonItemGroup : NSObject
```

# API

## 

```swift
// 创建一个固定组，在布局自定义期间，一个人无法从导航栏中移动或删除。
// ios16
class func fixedGroup(representativeItem: UIBarButtonItem?, items: [UIBarButtonItem]) -> UIBarButtonItemGroup

// 创建一个可移动组，一个人可以移动，但在布局自定义期间无法从导航栏中删除。
// ios16
class func movableGroup(customizationIdentifier: String, representativeItem: UIBarButtonItem?, items: [UIBarButtonItem]) -> UIBarButtonItemGroup

// 创建一个可选组，一个人可以在布局自定义期间从导航栏中移动、添加或删除。
// ios16
class func optionalGroup(customizationIdentifier: String, isInDefaultCustomization: Bool, representativeItem: UIBarButtonItem?, items: [UIBarButtonItem]) -> UIBarButtonItemGroup

// 使用指定项目创建一个固定组。
init(barButtonItems: [UIBarButtonItem], representativeItem: UIBarButtonItem?)
```

## 配置组 

```swift
// 要显示在栏上的条形按钮项。
// 您可以在组中包含任意数量的条形按钮项目，但由于空间考虑，您应该将项目总数保持相对较小。小组中的项目通常相互关联，但不必相关。
// 数组必须至少包含一个项目。
// 项目一次只能属于一个组。如果您指定了一个已经在组中的项目，UIKit会在将其分配给当前组之前从上一个组中删除该项目。
var barButtonItems: [UIBarButtonItem] { get set }

// 当空间受限时要为组显示的项目。
// 当栏上的空格受到限制时，UIKit可能会显示组的代表项目来代替其实际项目。
// 代表项目是单个条形按钮项，与组中的其他项目不同。点击代表项通常会调用其操作方法。如果您省略了该操作方法，UIKit将自动在标准界面中显示组的项目。
// 如果您没有为组指定具有代表性的项目，UIKit会尝试在栏中显示该组的项目。如果空间仍然有限，UIKit可能会修改组中项目的外观，以便为所有项目腾出空间。例如，UIKit可能会截断文本栏按钮项的标题。当空间受到严重限制时，UIKit甚至可能不会显示组的代表项目。
var representativeItem: UIBarButtonItem? { get set }

// 一个布尔值，用于确定该组是否始终通过UI可用
// ios16
// 将此属性设置为true，以确保无论组的自定义如何，人们都可以使用该组中的功能。
// 当值为true时，UIKit将该组中的项目放置在UIUserInterfaceIdiom.phone和UIUserInterfaceIdiom.pad成语的溢出菜单中。此属性对UIUserInterfaceIdiom.mac成语没有影响。
var alwaysAvailable: Bool { get set }
```

## 确定团队的外表

```swift
// 一个布尔值，指示代表项目是否显示以代替组的项目。
// 当代表项显示在快捷方式栏中时，此属性的值为true。
// 当单个条形按钮项显示在快捷方式栏中时，该值为false。
var isDisplayingRepresentativeItem: Bool { get }

// 确定组可见性的布尔值。
var isHidden: Bool
```