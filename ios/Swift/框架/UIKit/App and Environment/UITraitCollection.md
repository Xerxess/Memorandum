<!-- TOC -->

- [UITraitCollection](#uitraitcollection)
- [API](#api)
    - [Getting the Current Traits 获取当前特征](#getting-the-current-traits-获取当前特征)
    - [Retrieving Size Class Traits 检索大小类特征](#retrieving-size-class-traits-检索大小类特征)
    - [Retrieving Display-Related Traits 检索与显示屏相关的特征](#retrieving-display-related-traits-检索与显示屏相关的特征)
    - [Retrieving Interface-Related Traits 检索与接口相关的特征](#retrieving-interface-related-traits-检索与接口相关的特征)
    - [Retrieving the Force Touch Capability Traits 回力度触控功能特性](#retrieving-the-force-touch-capability-traits-回力度触控功能特性)
    - [Retrieving Content Size Category Information 检索内容大小类别信息](#retrieving-content-size-category-information-检索内容大小类别信息)
    - [Comparing Trait Collections 比较特质集合](#comparing-trait-collections-比较特质集合)
    - [Getting an Image Configuration Object 获取图像配置对象](#getting-an-image-configuration-object-获取图像配置对象)
    - [Performing Actions with the Current Traits 使用当前特质执行操作](#performing-actions-with-the-current-traits-使用当前特质执行操作)
- [UITraitEnvironment](#uitraitenvironment)
- [UIAdaptivePresentationControllerDelegate](#uiadaptivepresentationcontrollerdelegate)
    - [API](#api-1)
        - [Adapting the Presentation Style 调整演示风格](#adapting-the-presentation-style-调整演示风格)
        - [Adapting the View Controller 调整视图控制器](#adapting-the-view-controller-调整视图控制器)
        - [Responding to Adaptive Transitions 应对适应性转变](#responding-to-adaptive-transitions-应对适应性转变)
        - [Preparing the Adaptive Presentation Controller 在演讲被驳回之前通知代表。](#preparing-the-adaptive-presentation-controller-在演讲被驳回之前通知代表)
- [UIContentContainer](#uicontentcontainer)
    - [Conforming Types 符合的类型](#conforming-types-符合的类型)
    - [API](#api-2)
        - [Responding to Environment Changes 应对环境变化](#responding-to-environment-changes-应对环境变化)
        - [Responding to Changes in Child View Controllers 响应子视图控制器的变化](#responding-to-changes-in-child-view-controllers-响应子视图控制器的变化)

<!-- /TOC -->

# UITraitCollection

适用于应用程序的iOS界面环境，包括水平和垂直大小类、显示比例和用户界面成语等特征。

iOS 特质环境会暴露在 UITraitEnvironment 协议的 `traitCollection` 属性公开。
以下类别采用此协议：`UIScreen、UIWindow、UIViewController、UIPresentationController`和`UIView`。
要创建自适应界面，请编写代码，根据这些特征的变化调整应用程序的布局。
您可以使用UITraitCollection 、 horizontalSizeClass、verticalSizeClass、displayScale和userInterfaceIdiom属性访问特定特征值。
环境特征和大小特征的值在 UIUserInterfaceIdiom 和 UIUserInterfaceSizeClass 枚举中定义；显示比例特征的值表示为浮点数。

要使您的视图控制器和视图响应iOS界面环境中的变化，请从特征环境协议中覆盖`traitCollectionDidChange(_:)`方法。
要根据界面环境变化自定义视图控制器动画，请覆盖UIContentContainer协议的 `willTransition(to:with:)`方法。

```swift
class UITraitCollection : NSObject
```

# API

```swift
init()
Creates a trait collection whose traits are set to their default (unspecified) values.
init(traitsFrom: [UITraitCollection])
Creates a trait collection that consists of traits merged from a specified array of trait collections.
init(userInterfaceIdiom: UIUserInterfaceIdiom)
Creates a trait collection that contains only a specified interface idiom.
init(horizontalSizeClass: UIUserInterfaceSizeClass)
Creates a trait collection that contains only a specified horizontal size class.
init(verticalSizeClass: UIUserInterfaceSizeClass)
Creates a trait collection that contains only a specified vertical size class.
init(userInterfaceStyle: UIUserInterfaceStyle)
Creates a trait collection that contains only the specified user interface style trait.
init(accessibilityContrast: UIAccessibilityContrast)
Creates a trait collection that contains only the specified accessibility contrast trait.
init(userInterfaceLevel: UIUserInterfaceLevel)
Creates a trait collection that contains only the specified user interface level trait.
init(legibilityWeight: UILegibilityWeight)
Creates a trait collection that contains only the specified legibility weight trait.
init(forceTouchCapability: UIForceTouchCapability)
Creates a trait collection that contains only a specified force touch capability trait.
init(displayScale: CGFloat)
Creates a trait collection that contains only a specified display scale.
init(displayGamut: UIDisplayGamut)
Creates a trait collection that contains only the specified display gamut trait.
init(layoutDirection: UITraitEnvironmentLayoutDirection)
Creates a trait collection that contains only the specified layout direction trait.
init(preferredContentSizeCategory: UIContentSizeCategory)
Creates a trait collection that contains only the specified content size category trait.
init(activeAppearance: UIUserInterfaceActiveAppearance)
Creates a trait collection that contains only the specified active appearance trait.
init(toolbarItemPresentationSize: UINSToolbarItemPresentationSize)
Creates a trait collection that contains only the specified toolbar item presentation size trait.
Beta
init?(coder: NSCoder)
Creates a trait collection from data in an unarchiver.
```

## Getting the Current Traits 获取当前特征

```swift
// 当前环境的完整特征集。
// 在调用UIView、UIViewController和UIPresentationController等几种众所周知的方法之前，UIKit会更新此属性的值。特征集合包含一整套描述当前环境的特征值，不包括未指定或未知的值。
// 
// UIKit将此属性的值存储为线程本地变量，因此访问速度很快。此外，更改非主线程上的特征不会影响应用程序主线程上的当前特征。
class var current: UITraitCollection
 
```

## Retrieving Size Class Traits 检索大小类特征

```swift
// 特征集合的水平大小类。
// 特征集合的默认水平大小类是UIUserInterfaceSizeClass.unspecified。
// enum UIUserInterfaceSizeClass
// case unspecified 表示尚未指定大小类
// case compact 表示一个紧凑的大小类。
// case regular 指示一个常规大小的类。
var horizontalSizeClass: UIUserInterfaceSizeClass

// 特征集合的垂直大小类。
var verticalSizeClass: UIUserInterfaceSizeClass
```

## Retrieving Display-Related Traits 检索与显示屏相关的特征

```swift
// 特征集合的显示比例。
var displayScale: CGFloat

// 当前显示器的色域。
// enum UIDisplayGamut 
// case unspecified 未指定的色域值。
// case SRGB sRGB显示色域。
// case P3 P3显示色域。
var displayGamut: UIDisplayGamut

```

## Retrieving Interface-Related Traits 检索与接口相关的特征

```swift
// 与用户界面关联的样式。
// enum UIUserInterfaceStyle
// case unspecified 未指定的界面样式。
// case light 轻型界面风格。
// case dark 黑暗的界面风格。
var userInterfaceStyle: UIUserInterfaceStyle

// 特质集合的用户界面类型。
// 指示设备或具有特征环境的对象的接口类型的常量，例如视图和视图控制器。
// enum UIUserInterfaceIdiom
// case unspecified 一个未指明的界面类型。
// case phone 为iPhone和iPod touch设计的界面。
// case pad 专为iPad设计的界面。
// case tv 为 Apple tvOS 和 Apple TV 设计的界面。
// case carPlay 专为车内体验设计的界面。
// case mac 为Mac设计的界面。
var userInterfaceIdiom: UIUserInterfaceIdiom


// 界面的高度。
// enum UIUserInterfaceLevel
// case unspecified 未指定的接口级别。
// case base 窗口主要内容的级别。
// case elevated 视觉上窗口主要内容上方的内容级别。
var userInterfaceLevel: UIUserInterfaceLevel

// 与当前环境相关的布局方向。
// enum UITraitEnvironmentLayoutDirection
// case unspecified 未指定
// case leftToRight 从左到右的布局方向。
// case rightToLeft 从右到左的布局方向。
var layoutDirection: UITraitEnvironmentLayoutDirection


//  可访问性与当前环境形成对比。
var accessibilityContrast: UIAccessibilityContrast

//  适用于文本的字体权重。
// enum UILegibilityWeight
// case unspecified 未指定
// case regular 常规字体权重。
// case bold 粗体字体重量。
var legibilityWeight: UILegibilityWeight


// 指示用户界面是否具有活动外观的属性。
// enum UIUserInterfaceActiveAppearance
// case unspecified 未指定
// case inactive 界面的外观不活跃。
// case active 该界面具有活跃的外观。
var activeAppearance: UIUserInterfaceActiveAppearance

// AppKit工具栏中工具栏项的演示文稿大小。
// iso16
var toolbarItemPresentationSize: UINSToolbarItemPresentationSize

```

## Retrieving the Force Touch Capability Traits 回力度触控功能特性

```swift
var forceTouchCapability: UIForceTouchCapability
```

## Retrieving Content Size Category Information 检索内容大小类别信息

```swift
// 用户首选的字体大小选项。
// struct UIContentSizeCategory 指示内容首选大小的常量。
var preferredContentSizeCategory: UIContentSizeCategory

```

## Comparing Trait Collections 比较特质集合

```swift
// 查询特征集合是否包含所有其他特征集合的值。
func containsTraits(in: UITraitCollection?) -> Bool

// 查询在指定和当前特征集合之间的更改是否会影响颜色值。
func hasDifferentColorAppearance(comparedTo: UITraitCollection?) -> Bool


```

## Getting an Image Configuration Object 获取图像配置对象

```swift
// 与此特征集合兼容的图像配置对象。
var imageConfiguration: UIImage.Configuration

```

## Performing Actions with the Current Traits 使用当前特质执行操作

```swift
// 使用当前特征集合的特征执行自定义代码。
func performAsCurrent(() -> Void)

```

# UITraitEnvironment

```swift
@MainActor protocol UITraitEnvironment

var traitCollection: UITraitCollection

//当iOS界面环境发生变化时调用。
// 必填。
func traitCollectionDidChange(UITraitCollection?)

````

# UIAdaptivePresentationControllerDelegate

一组方法，与演示文稿控制器一起确定如何响应应用程序中的特征变化。

```swift
@MainActor protocol UIAdaptivePresentationControllerDelegate
```

## API 

### Adapting the Presentation Style 调整演示风格

```swift
// 要求委托人在指定特征集处于活动状态时使用演示样式。
func adaptivePresentationStyle(for: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle

// 让委托人使用新的演示风格。
func adaptivePresentationStyle(for: UIPresentationController) -> UIModalPresentationStyle
```

### Adapting the View Controller 调整视图控制器

```swift
// 要求委托在适应指定的演示风格时显示视图控制器。
func presentationController(UIPresentationController, viewControllerForAdaptivePresentationStyle: UIModalPresentationStyle) -> UIViewController?
```
### Responding to Adaptive Transitions 应对适应性转变

```swift
// 通知委托人，即将发生与适应性相关的过渡。
func presentationController(UIPresentationController, willPresentWithAdaptiveStyle: UIModalPresentationStyle, transitionCoordinator: UIViewControllerTransitionCoordinator?)

// 通知委托人，阻止了用户发起的关闭视图的尝试。
func presentationControllerDidAttemptToDismiss(UIPresentationController)

// 请求委托人允许驳回演示文稿。
func presentationControllerShouldDismiss(UIPresentationController) -> Bool

// 在演示被驳回后通知代表。
func presentationControllerDidDismiss(UIPresentationController)

// 在演讲被驳回之前通知代表。
func presentationControllerWillDismiss(UIPresentationController)
```

###  Preparing the Adaptive Presentation Controller 在演讲被驳回之前通知代表。

```swift
// 提供在自适应性更改后配置自适应演示控制器的机会。
func presentationController(UIPresentationController, prepare: UIPresentationController)
```

# UIContentContainer

一套使视图控制器的内容适应大小和特征变化的方法。

该协议的方法处理与当前特征环境或视图控制器层次结构的变化相关的大小相关过渡。
当父视图控制器发生变化时，或者当发生影响视图控制器大小的特征更改时，UIKit调用这些方法，让受影响对象有机会做出适当的响应。

所有`UIViewController`和`UIPresentationController`对象都为该协议的方法`提供默认实现`。
在创建自己的自定义视图控制器或演示文稿控制器时，您可以覆盖默认实现来调整您的内容。
例如，您可以使用这些方法来调整任何子视图控制器的大小或位置。

当重写此协议的方法时，`调用super`，让UIKit执行任何默认行为。
当调用这些方法时，视图控制器和演示文稿控制器执行自己的调整。super 调用可确保UIKit能够继续调整用户界面的其他部分。

## Conforming Types 符合的类型

UIPresentationController
UIViewController

```swift
@MainActor protocol UIContentContainer


```

## API 

### Responding to Environment Changes 应对环境变化

```swift
// 通知容器其视图的大小即将更改。
// 必填。
func viewWillTransition(to: CGSize, with: UIViewControllerTransitionCoordinator)

// 通知容器其特征集合发生了变化。
// 必填。
func willTransition(to: UITraitCollection, with: UIViewControllerTransitionCoordinator)

```

### Responding to Changes in Child View Controllers 响应子视图控制器的变化

```swift
// 返回指定子视图控制器内容的大小。
// 必填。
func size(forChildContentContainer: UIContentContainer, withParentContainerSize: CGSize) -> CGSize

// 通知感兴趣的控制器，其中一个孩子的首选内容大小发生了变化。
// 必填。
func preferredContentSizeDidChange(forChildContentContainer: UIContentContainer)

// 通知容器使用自动布局调整了子视图控制器的大小。
// 必填。
func systemLayoutFittingSizeDidChange(forChildContentContainer: UIContentContainer)

// 容器内容的首选大小。
// 必填。
var preferredContentSize: CGSize
```