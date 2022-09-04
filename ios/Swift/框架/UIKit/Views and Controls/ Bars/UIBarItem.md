<!-- TOC -->

- [UIBarItem](#uibaritem)
- [API](#api)
    - [Creating a bar item](#creating-a-bar-item)
    - [获取和设置属性](#获取和设置属性)
    - [自定义外观](#自定义外观)

<!-- /TOC -->

# UIBarItem

一个`抽象的超级类`，用于您可以添加到屏幕底部显示的栏中的项目。

条形图上的项目的行为类似于按钮（instances of UIButton）。它们有标题、图像、动作和目标。您还可以在栏上启用和禁用项目。

您可以分别使用imageInsets自定义图像以表示项目和图像的位置。

当分别使用 landscapeImagePhone 和 landscapeImagePhoneInsets 使用 iPhone 外观成语时，您还可以指定在横向方向中使用的自定义图像和位置。此外，您可以使用setTitleTextAttributes(_:for:)自定义标题的文本属性，无论是单个项目还是使用外观代理（例如[UIBarItem外观]）为所有项目。

```swift
@MainActor class UIBarItem : NSObject
```

# API

## Creating a bar item

```swift
init()
```

## 获取和设置属性

```swift
// 项目上显示的标题。
// 在将项目添加到栏之前，您应该设置此属性。
// 默认值为nil。
var title: String? { get set }

// 用于表示项目的图像。
// 此图像可用于创建其他图像，以在栏上表示此项目——例如，可以从此图像中派生选定和未选择的图像。
// 在将项目添加到栏之前，您应该设置此属性。
// 默认值为nil
var image: UIImage? { get set }

// 使用iPhone外观习语时用于以横向表示项目的图像。
// 此图像可用于创建其他图像，以在栏上表示此项目——例如，可以从此图像中派生选定和未选择的图像。
// 在将项目添加到栏之前，您应该设置此属性。
// 默认值为nil
var landscapeImagePhone: UIImage? { get set }

// 为失明或视力低下的用户显示的图像。
var largeContentSizeImage: UIImage?

// 每条边的图像开始或开始。
// The default value is zero.
var imageInsets: UIEdgeInsets { get set }

// 使用iPhone外观习语时，图像每个边缘的横向图像开始或开始。
// The default value of this property is zero.
var largeContentSizeImageInsets: UIEdgeInsets { get set }

// 在辅助用户界面中显示图像时，应用于条形项目大图像的插入。
var largeContentSizeImageInsets: UIEdgeInsets

// 一个布尔值，指示该项目是否已启用。
var isEnabled: Bool { get set }

// 条形项的标签，一个应用程序提供的整数，可用于识别应用程序中的条形项对象。
var tag: Int

```

## 自定义外观

```swift
// 为给定的控制状态设置标题的文本属性。
func setTitleTextAttributes([NSAttributedString.Key : Any]?, for: UIControl.State)

// 返回给定控制状态的标题的文本属性。
func titleTextAttributes(for: UIControl.State) -> [NSAttributedString.Key : Any]?
```