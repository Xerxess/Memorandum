<!-- TOC -->

- [UIVibrancyEffect](#uivibrancyeffect)
- [API](#api)
    - [Creating a vibrancy effect](#creating-a-vibrancy-effect)

<!-- /TOC -->

# UIVibrancyEffect

放大和调整视觉效果视图后面分层内容颜色的对象。

振动效果旨在用作UIVisualEffectView的子视图或分层，该视图已配置为UIBlurEffect。  
使用振动效果可以帮助放置在contentView中的内容变得更加生动。  

振动效果取决于颜色。您添加到contentView的任何子视图都必须实现tintColorDidChange()方法并进行相应更新。  
UIImageView具有UIImage.RenderingMode.alwaysTemplate渲染模式的图像以及UILabel对象自动更新的对象。

```swift
@MainActor class UIVibrancyEffect : UIVisualEffect
```

# API

## Creating a vibrancy effect

```swift
// 使用指定的模糊和样式值创建振动效果。
init(blurEffect: UIBlurEffect, style: UIVibrancyEffectStyle)

// 为特定的模糊效果创建振动效果。
init(blurEffect: UIBlurEffect)

// Label styles
// case label 包含主要内容的标签样式。
// case secondaryLabel 包含次要内容的标签样式。
// case tertiaryLabel 包含三级内容的标签样式。
// case quaternaryLabel 包含第四级内容的标签样式。

// Fill styles
// case fill 包含主要内容的大填充区域的视图样式。
// case secondaryFill 包含次要内容的大填充区域的视图样式。
// case tertiaryFill 一种包含三级内容的大填充区域的视图样式。

// 分离器样式
// case separator 分隔线的样式。
enum UIVibrancyEffectStyle

```