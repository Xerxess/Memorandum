# UITabBarItem

描述选项卡栏中项目的对象。

```swift
@MainActor
class UITabBarItem : UIBarItem
```

# Topics

## Creating a tab bar item 创建标签栏项目

```swift
// 使用系统提供的配置创建选项卡栏项。
// enum SystemItem : Int, @unchecked Sendable
// case bookmarks 书签系统项目。
// case contacts 联系人系统项目。
// case downloads 下载系统项目。
// case favorites 收藏夹系统项目。
// case featured 特色系统项目。
// case history 历史系统项目。
// case more 系统项目越多。
// case mostRecent 最新的系统项目。
// case mostViewed 查看次数最多的系统项目。
// case recents 最近的系统项目。
// case search 搜索系统项目。
// case topRated 评分最高的系统项目。
convenience init(
    tabBarSystemItem systemItem: UITabBarItem.SystemItem,
    tag: Int
)

// 创建一个显示标题和图像的选项卡栏项目。
// 使用nil作为标题或图像，以不显示该元素。
// 默认情况下，无论其所选状态如何，该项目都会显示相同的图像。
// 要为所选状态显示不同的图像，请设置其 selectedImage 属性。该项目从源图像中的alpha值创建它显示的图像。为了防止系统着色，请将图像与UIImage.RenderingMode.alwaysOriginal渲染模式一起使用。项目剪辑任何大于其边界的图像。
convenience init(
    title: String?,
    image: UIImage?,
    tag: Int
)


// 创建一个选项卡栏项目，在所选状态更改时切换其显示的图像。
convenience init(
    title: String?,
    image: UIImage?,
    selectedImage: UIImage?
)
```

## Configuring the item’s appearance 配置项目的外观

```swift
// 项目用于生成其所选图像的源图像。
var selectedImage: UIImage? { get set }

// 选项卡栏的外观设置。
@NSCopying
var standardAppearance: UITabBarAppearance? { get set }

// 当可滚动内容的边缘与标签栏的边缘对齐时，选项卡栏的外观设置。
@NSCopying
var scrollEdgeAppearance: UITabBarAppearance? { get set }
 
// 适用于标题位置的偏移量。
var titlePositionAdjustment: UIOffset { get set }
```

## Configuring the item’s badge 配置项目的徽章

```swift
// 项目徽章显示的文本。
var badgeValue: String? { get set }

// 物品徽章的背景颜色。
@NSCopying
var badgeColor: UIColor? { get set }

// 注册徽章用于指定状态的文本属性。
func setBadgeTextAttributes(
    _ textAttributes: [NSAttributedString.Key : Any]?,
    for state: UIControl.State
)

// 返回指定状态的徽章的文本属性。
func badgeTextAttributes(for state: UIControl.State) -> [NSAttributedString.Key : Any]?
```