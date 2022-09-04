<!-- TOC -->

- [UIVisualEffectView](#uivisualeffectview)
- [设置正确的alpha值](#设置正确的alpha值)
- [使用具有视觉效果视图的遮罩](#使用具有视觉效果视图的遮罩)
- [捕捉视觉效果视图的快照](#捕捉视觉效果视图的快照)
- [API](#api)
    - [Creating a visual effect view](#creating-a-visual-effect-view)
    - [检索视图信息 Retrieving view information](#检索视图信息-retrieving-view-information)

<!-- /TOC -->

# UIVisualEffectView

实现一些复杂视觉效果的对象。

根据所需的效果，该效果可能会影响分层在视图后面的内容或添加到视觉效果视图的内容视图中的内容。  
将视觉效果视图应用于现有视图，然后应用`UIBlurEffect`或`UIVibrancyEffect`对象对现有视图应用模糊或振动效果。  
将视觉效果视图添加到视图层次结构后，将任何子视图添加到视觉效果视图的`contentView`属性中。  
不要将子视图直接添加到视觉效果视图本身。

```swift
@MainActor class UIVisualEffectView : UIView
```

# 设置正确的alpha值

使用`UIVisualEffectView`类时，请避免小于1的alpha值。创建部分透明的视图会导致系统在屏幕外渲染传递期间组合视图和所有相关子视图。  UIVisualEffectView对象需要组合起来，作为它们分层内容的一部分，才能看起来正确。  
在视觉效果视图或其任何超级视图上将alpha设置为小于1，导致许多效果看起来不正确或根本没有显示。

# 使用具有视觉效果视图的遮罩

直接应用于UIVisualEffectView的掩码被转发到提供视觉效果的内部视图，包括contentView本身。  
您还可以将遮罩直接应用于contentView。  
将掩码应用于UIVisualEffectView对象的超级视图会导致效果失败，并抛出异常。  
提供给UIVisualEffectView的任何掩码都不是实际执行掩码的视图。  
UIKit复制视图并将其应用于每个子视图。  
要反映遮罩的尺寸变化，您必须将更改应用于原始遮罩，并在效果视图上重置它。

# 捕捉视觉效果视图的快照

# API

## Creating a visual effect view

```swift
// 使用指定的视觉效果创建新的视觉效果视图。
init(effect: UIVisualEffect?)

```

## 检索视图信息 Retrieving view information

```swift
// 一个可以添加视觉效果视图的视图对象。
// 将子视图添加到contentView，而不是直接添加到UIVisualEffectView。
var contentView: UIView { get }

// 视图提供的视觉效果。
// 该效果要么是UIBlurEffect，要么是UIVibrancyEffect。
@NSCopying var effect: UIVisualEffect? { get set }
```