<!-- TOC -->

- [UIWindowScene](#uiwindowscene)
- [API](#api)
    - [Getting the active windows 获取活动窗口](#getting-the-active-windows-获取活动窗口)
    - [Getting the interface attributes 获取接口属性](#getting-the-interface-attributes-获取接口属性)
    - [Providing a PDF version of your scene 提供您场景的PDF版本](#providing-a-pdf-version-of-your-scene-提供您场景的pdf版本)
    - [Sharing content 共享内容](#sharing-content-共享内容)
    - [Determining window behaviors 确定窗口行为](#determining-window-behaviors-确定窗口行为)
    - [Working with window geometry  使用窗口几何](#working-with-window-geometry--使用窗口几何)
    - [Working with focus](#working-with-focus)
    - [Getting the status bar configuration 获取状态栏配置](#getting-the-status-bar-configuration-获取状态栏配置)
    - [Configuring a window’s title bar  配置窗口的标题栏](#configuring-a-windows-title-bar--配置窗口的标题栏)
    - [Supporting types 支持类型](#supporting-types-支持类型)

<!-- /TOC -->

# UIWindowScene

为您的应用程序管理一个或多个窗口的场景。

UIWindowScene对象管理应用程序用户界面的一个实例，包括您从该场景中显示的一个或多个窗口。
场景对象管理用户设备上窗口的显示，以及用户与该场景交互时的生命周期。当场景状态发生变化时，场景对象会通知其委托对象，该对象采用UIWindowSceneDelegate协议。该现场还向注册观察员发布了适当的通知。
使用委托对象或通知观察员来响应任何更改。

`不要直接创建`UIWindowScene。
相反，通过在应用程序的Info.plist文件的场景配置详细信息中包含场景的类名，指定您在配置时想要一个UIWindowScene对象。
还可以在应用程序委托的application(_:configurationForConnecting:options:)方法中创建UISceneConfiguration对象时指定类名。当用户与您的应用程序交互时，系统会根据您提供的配置数据创建适当的场景对象。要以编程方式创建场景，请调用UIApplication的requestSceneSessionActivation(_:userActivity:options:errorHandler:)方法。

# API

## Getting the active windows 获取活动窗口

```swift
// 与场景关联的窗口。
var windows: [UIWindow]

// 与场景关联的键窗口
var keyWindow: UIWindow?

//  显示场景内容的屏幕。
var screen: UIScreen
```

## Getting the interface attributes 获取接口属性

```swift
// 描述场景当前环境的特征。
var traitCollection: UITraitCollection

// 场景占据的坐标空间。
var coordinateSpace: UICoordinateSpace

// 在窗口中显示内容时使用的方向。
var interfaceOrientation: UIInterfaceOrientation

//  App 窗口的最小大小和最大大小。
var sizeRestrictions: UISceneSizeRestrictions?

// 为可调整大小的窗口指定最小和最大大小的对象。
class UISceneSizeRestrictions

```


## Providing a PDF version of your scene 提供您场景的PDF版本

```swift
// 生成应用程序内容的高保真版本的对象。
var screenshotService: UIScreenshotService?

// 协调创建应用程序内容的PDF屏幕截图的对象。
class UIScreenshotService

```

## Sharing content 共享内容

```swift
// 一个可以为场景提供可共享项目的对象。
var activityItemsConfigurationSource: UIActivityItemsConfigurationProviding?

// 为可共享内容提供源的界面，以满足用户共享当前内容的请求。
protocol UIActivityItemsConfigurationProviding
```

## Determining window behaviors 确定窗口行为

```swift
// 一个布尔值，指示窗口场景是全屏还是窗口。
// ios16
var isFullScreen: Bool

// 指定窗口行为的对象。
// ios16
var windowingBehaviors: UISceneWindowingBehaviors?

// 具有决定窗口行为的属性的对象。
// ios16
class UISceneWindowingBehaviors

```

## Working with window geometry  使用窗口几何

ios 16+

```swift
// 系统空间中窗口场景几何形状的当前值。
var effectiveGeometry: UIWindowScene.Geometry

// 使用指定的几何首选项对象请求更新窗口场景的几何形状。
func requestGeometryUpdate(UIWindowScene.GeometryPreferences, errorHandler: ((Error) -> Void)?)

// 提供窗口场景几何信息的对象。
class UIWindowScene.Geometry

// 用于表示窗口场景几何首选项的抽象超类。
class UIWindowScene.GeometryPreferences

// 表示iOS应用程序中窗口场景的几何首选项的对象。
class UIWindowScene.GeometryPreferences.iOS

```

## Working with focus

```swift
// 负责窗口场景的焦点系统。
var focusSystem: UIFocusSystem?

```

## Getting the status bar configuration 获取状态栏配置

```swift
// 状态栏的当前配置。
var statusBarManager: UIStatusBarManager?

// 描述状态栏配置的对象。
// 使用UIStatusBarManager对象获取其关联场景的状态栏的当前配置。
// 您不会直接创建UIStatusBarManager对象。相反，您可以从UIWindowScene对象的statusBarManager属性中检索现有对象。
// var isStatusBarHidden: Bool 一个布尔值，指示状态栏当前是否隐藏。
// var statusBarStyle: UIStatusBarStyle 状态栏的当前外观。
// var statusBarFrame: CGRect 状态栏的框架矩形。
class UIStatusBarManager

```

## Configuring a window’s title bar  配置窗口的标题栏

```swift
// Mac app 窗口中显示的标题栏。
var titlebar: UITitlebar?

```

## Supporting types 支持类型

```swift
// 请求窗口场景的菜单元素。
class UIWindowScene.ActivationAction

```