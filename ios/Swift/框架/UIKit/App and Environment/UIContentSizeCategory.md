<!-- TOC -->

- [UIContentSizeCategory](#uicontentsizecategory)
    - [Accessibility Sizes (辅助用于残疾人)](#accessibility-sizes-辅助用于残疾人)
    - [Font Size Change Notifications 字体大小更改通知](#font-size-change-notifications-字体大小更改通知)
    - [Font Size Category Comparisons 字体大小类别比较](#font-size-category-comparisons-字体大小类别比较)

<!-- /TOC -->

# UIContentSizeCategory

指示内容首选大小的常量。

```swift
// 未指定的字体大小。
static let unspecified: UIContentSizeCategory

// 超小字体。
static let extraSmall: UIContentSizeCategory

// 一个小字体。
static let small: UIContentSizeCategory

// 中型字体。
static let medium: UIContentSizeCategory

// 宽字体。
static let large: UIContentSizeCategory

// 超大字体。
static let extraLarge: UIContentSizeCategory

// 一种大于超大字体但小于可用最大字体大小的字体。
static let extraExtraLarge: UIContentSizeCategory

// 最大的字体大小。
static let extraExtraExtraLarge: UIContentSizeCategory

```

## Accessibility Sizes (辅助用于残疾人)

```swift
static let accessibilityMedium: UIContentSizeCategory
A medium font size that reflects the current accessibility settings.
static let accessibilityLarge: UIContentSizeCategory
A large font size that reflects the current accessibility settings.
static let accessibilityExtraLarge: UIContentSizeCategory
An extra-large font size that reflects the current accessibility settings.
static let accessibilityExtraExtraLarge: UIContentSizeCategory
A font that is larger than the extra-large font but not the largest available, reflecting the current accessibility settings.
static let accessibilityExtraExtraExtraLarge: UIContentSizeCategory
The largest font size that reflects the current accessibility settings.
var isAccessibilityCategory: Bool
A Boolean value that indicates whether the content size category is associated with accessibility.
```

## Font Size Change Notifications 字体大小更改通知

```swift
// 当用户更改首选内容大小设置时发布的通知。
static let didChangeNotification: NSNotification.Name

// 反映新首选内容大小的键。
static let newValueUserInfoKey: String

```

## Font Size Category Comparisons 字体大小类别比较

```swift
static func < (UIContentSizeCategory, UIContentSizeCategory) -> Bool
static func <= (UIContentSizeCategory, UIContentSizeCategory) -> Bool
static func > (UIContentSizeCategory, UIContentSizeCategory) -> Bool
static func >= (UIContentSizeCategory, UIContentSizeCategory) -> Bool