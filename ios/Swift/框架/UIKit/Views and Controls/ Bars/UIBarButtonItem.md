<!-- TOC -->

- [UIBarButtonItem](#uibarbuttonitem)
- [继承自](#继承自)
- [API](#api)
    - [Creating items](#creating-items)
    - [创建特定风格的项目](#创建特定风格的项目)
    - [创建系统项目](#创建系统项目)
    - [创建自定义项目](#创建自定义项目)
    - [创建空间项目](#创建空间项目)
    - [创建群组](#创建群组)
    - [Managing the custom view](#managing-the-custom-view)
    - [管理行动 Managing the action](#管理行动-managing-the-action)
    - [Managing the context menu](#managing-the-context-menu)
    - [自定项目外观](#自定项目外观)
    - [自定义后退按钮](#自定义后退按钮)
    - [自定义背景](#自定义背景)
    - [自定义标题位置](#自定义标题位置)
    - [Getting the group](#getting-the-group)

<!-- /TOC -->

# UIBarButtonItem

用于放置在`工具栏`、`导航栏`或`快捷方式栏`上的专用按钮。

您通常使用Interface Builder创建和配置条形按钮项。  
但是，您可以通过将设置器消息发送到UIBarButtonItemAppearance以自定义所有按钮或发送到特定的UIBarButtonItem实例来自定义按钮的外观。  
您可以在UINavigationItem对象或UIToolbar实例的标准位置使用自定义按钮。

一般来说，为正常状态指定一个值，以便没有自定义值集的其他状态可以使用它。同样，当属性依赖于条形指标时（例如，在横向方向的iPhone上，条形图的高度与标准不同），请指定UIBarMetrics.default的值。

```swift
@MainActor class UIBarButtonItem : UIBarItem
```

# 继承自

UIBarItem

# API

## Creating items

```swift
// 使用指定的标题、图像、主要操作和上下文菜单创建纯样式的项目。
init(title: String?, image: UIImage?, primaryAction: UIAction?, menu: UIMenu?)

// 使用指定的标题、图像、目标、操作和上下文菜单创建一个纯样式的项目。
init(title: String?, image: UIImage?, target: AnyObject?, action: Selector?, menu: UIMenu?)

// 将项目初始化到默认状态。
init()

```

## 创建特定风格的项目

```swift
// 使用指定的标题、样式、目标和操作创建项目。
init(title: String?, style: UIBarButtonItem.Style, target: Any?, action: Selector?)

// 使用指定的图像、样式、目标和操作创建项目。
init(image: UIImage?, style: UIBarButtonItem.Style, target: Any?, action: Selector?)

// 使用指定的图像、样式、目标和操作创建项目。
init(image: UIImage?, landscapeImagePhone: UIImage?, style: UIBarButtonItem.Style, target: Any?, action: Selector?)
```

## 创建系统项目

```swift
// 使用指定的系统项、主要操作和上下文菜单创建项目。
// enum UIBarButtonItem.SystemItem
// case done 系统完成按钮，本地化。
// case cancel “系统取消”按钮，已本地化。
// case edit 系统编辑按钮，本地化。
// case save 系统保存按钮，本地化。
// case add 包含加号图标的系统加号按钮。
// case flexibleSpace 在其他项目之间添加空白空间。
// case fixedSpace 在其他项目之间添加空白空间。
// case compose 系统编写按钮。
// case reply “系统回复”按钮。
// case action 系统操作按钮。
// case organize 系统整理按钮。
// case bookmarks 系统书签按钮。
// case search 系统搜索按钮。
// case refresh 系统刷新按钮。
// case stop 系统停止按钮。
// case camera 系统摄像头按钮。
// case trash 系统垃圾按钮。
// case play 系统播放按钮。
// case pause 系统暂停按钮。
// case rewind 系统倒带按钮。
// case fastForward 系统快进按钮。
// case undo 系统撤销按钮。
// case redo 系统重做按钮。
// case close 系统关闭按钮。
init(systemItem: UIBarButtonItem.SystemItem, primaryAction: UIAction?, menu: UIMenu?)

// 使用指定的系统项、目标和操作创建项目。
init(barButtonSystemItem: UIBarButtonItem.SystemItem, target: Any?, action: Selector?)
```

## 创建自定义项目

```swift
// 使用指定的自定义视图创建项目。
init(customView: UIView)

```

## 创建空间项目

```swift
// 创建一个新的固定宽度空间项。
class func fixedSpace(CGFloat) -> Self

// 创建一个新的柔性宽度空间项。
class func flexibleSpace() -> Self

```

## 创建群组

```swift
// 将项目放置在可选组中，在布局自定义期间，一个人可以从导航栏中移动、添加到或删除。
// ios16
func creatingOptionalGroup(customizationIdentifier: String, isInDefaultCustomization: Bool) -> UIBarButtonItemGroup

// 将项目放置在布局自定义期间无法从导航栏中移动或从导航栏中删除的固定组中。
// iso16
func creatingFixedGroup() -> UIBarButtonItemGroup

// 将项目放置在可移动组中，一个人可以移动，但在布局自定义期间无法从导航栏中删除。
// ios16
func creatingMovableGroup(customizationIdentifier: String) -> UIBarButtonItemGroup

```

## Managing the custom view

```swift
// 表示项目的自定义视图。
var customView: UIView? { get set }
```

## 管理行动 Managing the action

```swift
// 与项目关联的操作。
// 当您为该属性分配新值时，项目的标题和图像会更新，以匹配主要操作的标题和图像。
// 如果此属性具有non-nil，系统将忽略该项目的目标和操作属性。
@NSCopying var primaryAction: UIAction? { get set }

// 一个布尔值，指示按钮是代表操作还是选择。
// 当按钮将此属性设置为true时，该按钮将更改为切换按钮，点击该按钮将在选定和未选择之间更改。
var changesSelectionAsPrimaryAction: Bool { get set }

// 当用户点击此条形按钮项时，定义要发送到目标对象的操作消息的选择器。
var action: Selector? { get set }

// 当用户选择项目时接收操作的对象。
weak var target: AnyObject? { get set }
```

## Managing the context menu

```swift
// 此按钮的上下文菜单。
// 上下文菜单显示是为了响应某人点击该项目。
@NSCopying var menu: UIMenu? { get set }

// 菜单的首选菜单元素订购策略。
// ios16
var preferredMenuElementOrder: UIContextMenuConfiguration.ElementOrder

```

## 自定项目外观

```swift
// 物品的样式。
// UIBarButtonItem.Style中定义的常量之一。
// 默认值是UIBarButtonItem.Style.plain。
// enum Style : Int, @unchecked Sendable
// case plain 带有纯文本样式的按钮样式。
// case bordered 带有边框的简单按钮样式。
// case done 已完成按钮的按钮样式。
var style: UIBarButtonItem.Style { get set }

// 要应用于按钮项的色调。
var tintColor: UIColor?

// 确定项目可见性的布尔值。
// ios16
var isHidden: Bool { get set }

// 一个布尔值，指示按钮是否处于选定状态。
var isSelected: Bool { get set }

var width: CGFloat

// 要显示在条形按钮上的一组可能的标题。
var possibleTitles: Set<String>?


```

## 自定义后退按钮

```swift
// 返回指定控制状态和条形指标的后退按钮背景图像。
// 此修饰符仅适用于导航栏后退按钮，并被其他按钮忽略。
func backButtonBackgroundImage(for: UIControl.State, barMetrics: UIBarMetrics) -> UIImage?

// 为指定的控制状态和条形指标设置后退按钮背景图像。
// 此修饰符仅适用于导航栏后退按钮，并被其他按钮忽略。
// 为了获得良好的效果，背景图像必须是可拉伸的图像。
func setBackButtonBackgroundImage(UIImage?, for: UIControl.State, barMetrics: UIBarMetrics)

// 返回指定条形指标的后退按钮标题偏移量。
// 此修饰符仅适用于导航栏后退按钮，并被其他按钮忽略。
func backButtonTitlePositionAdjustment(for barMetrics: UIBarMetrics) -> UIOffset

// 为指定的条形指标设置后退按钮标题偏移量。
// 此修饰符仅适用于导航栏后退按钮，并被其他按钮忽略。
func setBackButtonTitlePositionAdjustment(
    _ adjustment: UIOffset,
    for barMetrics: UIBarMetrics
)

// 返回指定条形指标的后退按钮垂直位置偏移量。
// 此修饰符仅适用于导航栏后退按钮，并被其他按钮忽略。
// 此偏移量用于调整条内边栏按钮的垂直居中。
func backButtonBackgroundVerticalPositionAdjustment(for: UIBarMetrics) -> CGFloat

// 为指定的条形指标设置后退按钮垂直位置偏移量。
// 此修饰符仅适用于导航栏后退按钮，并被其他按钮忽略。
// 此偏移量用于调整条内边栏按钮的垂直居中。
func setBackButtonBackgroundVerticalPositionAdjustment(CGFloat, for: UIBarMetrics)
```

## 自定义背景

```swift
// 返回指定条形指标的背景垂直位置偏移量。
// 此偏移量用于调整条内边栏按钮的垂直居中。
func backgroundVerticalPositionAdjustment(for: UIBarMetrics) -> CGFloat

// 为指定的条形指标设置背景垂直位置偏移量。
// 此偏移量用于调整条内边栏按钮的垂直居中。
func setBackgroundVerticalPositionAdjustment(CGFloat, for: UIBarMetrics)

// 返回指定状态和条形指标的背景图像。
func backgroundImage(for: UIControl.State, barMetrics: UIBarMetrics) -> UIImage?

// 返回指定状态、样式和指标的背景图像。
func backgroundImage(for: UIControl.State, style: UIBarButtonItem.Style, barMetrics: UIBarMetrics) -> UIImage?

// 为指定的状态、样式和指标设置背景图像。
func setBackgroundImage(UIImage?, for: UIControl.State, style: UIBarButtonItem.Style, barMetrics: UIBarMetrics)
```

## 自定义标题位置

```swift
// 返回指定条形指标的标题偏移量。
func titlePositionAdjustment(for: UIBarMetrics) -> UIOffset

// 为指定的条形指标设置标题偏移量。
func setTitlePositionAdjustment(UIOffset, for: UIBarMetrics)

```

## Getting the group

```swift
// 该按钮所属的组。
var buttonGroup: UIBarButtonItemGroup?

```
