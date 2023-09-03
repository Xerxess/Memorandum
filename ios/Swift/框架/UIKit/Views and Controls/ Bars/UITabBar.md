# UITabBar

在选项卡栏中显示一个或多个按钮的控件，用于在应用程序中的不同子任务、视图或模式之间进行选择。

```swift
@MainActor
class UITabBar : UIView
```

# Topics

## Customizing the tab bar behavior 自定义标签栏行为

```swift
// 选项卡栏的委托对象。
weak var delegate: UITabBarDelegate? { get set }
```

## Configuring tab bar items 配置选项卡栏项目

```swift
// 选项卡栏显示的项目。
var items: [UITabBarItem]? { get set }

// 设置选项卡栏上的项目，可选择将任何更改动画化到位置。
func setItems(
    _ items: [UITabBarItem]?,
    animated: Bool
)

// 选项卡栏上当前选定的项目。
// 通过设置 selectedItem 属性，你可以指定当前要选中的标签栏项。选中的标签栏项将在标签栏中高亮显示，并显示与之关联的内容。
weak var selectedItem: UITabBarItem? { get set }
```

## Customizing tab bar appearance 自定义标签栏外观

```swift
// 标准高度选项卡栏的外观设置。
@NSCopying
var standardAppearance: UITabBarAppearance { get set }

// 当可滚动内容的边缘与标签栏的边缘对齐时，选项卡栏的外观设置。
@NSCopying
var scrollEdgeAppearance: UITabBarAppearance? { get set }

var leadingAccessoryView: UIView
var trailingAccessoryView: UIView

// 指示选项卡栏是否半透明的布尔值。
var isTranslucent: Bool { get set }
```

## Supporting user customization of tab bars 支持用户自定义标签栏

```swift
// 呈现一个标准界面，允许用户自定义选项卡栏的内容。
func beginCustomizingItems(_ items: [UITabBarItem])

// 关闭用于自定义选项卡栏的标准界面。
func endCustomizing(animated: Bool) -> Bool

// 一个布尔值，指示用户当前是否正在自定义选项卡栏。
var isCustomizing: Bool { get }
```
