
<!-- TOC -->

- [UIScene](#uiscene)
- [API](#api)
    - [Creating a Scene Object](#creating-a-scene-object)
    - [Managing the Life Cycle of a Scene 管理场景的生命周期](#managing-the-life-cycle-of-a-scene-管理场景的生命周期)
    - [Getting the Scene Attributes 获取场景属性](#getting-the-scene-attributes-获取场景属性)
    - [Specifying the Scene's Activation Conditions 指定场景的激活条件](#specifying-the-scenes-activation-conditions-指定场景的激活条件)
    - [Responding to Life Cycle Notifications 响应生命周期通知](#responding-to-life-cycle-notifications-响应生命周期通知)
    - [Getting the Scene's Session  获得场景会话](#getting-the-scenes-session--获得场景会话)
    - [Opening URLs](#opening-urls)
    - [Getting the Pointer Lock State 获取指针锁定状态](#getting-the-pointer-lock-state-获取指针锁定状态)
    - [Constants 常量](#constants-常量)

<!-- /TOC -->

# UIScene

表示应用程序用户界面一个实例的对象。

UIKit为用户或您的应用程序请求的应用程序用户界面的每个实例创建一个UIScene。
通常，UIKit创建一个UIWindowScene对象而不是UIScene对象，但您可以使用该类的方法和属性来访问有关场景的信息。

每个场景对象都有一个关联的委托对象，一个采用UISceneDelegate协议的对象。
当场景状态发生变化时，场景对象会通知其委托对象，并向注册的观察对象发布适当的通知。使用委托对象和通知来响应场景状态的变化。例如，使用它来确定您的场景何时移动到后台。

`您不会直接创建场景对象。`
您可以通过调用UIApplication的requestSceneSessionActivation(_:userActivity:options:errorHandler:)方法，以编程方式要求UIKit为您的应用程序创建场景对象。UIKit还根据用户交互创建场景。
在配置应用程序的场景支持时，请指定UIWindowScene对象而不是UIScene对象。

```swift
@MainActor class UIScene : UIResponder
```

# API

## Creating a Scene Object 

```swift
// 使用指定的会话和连接信息创建场景对象。
init(session: UISceneSession, connectionOptions: UIScene.ConnectionOptions)

```

## Managing the Life Cycle of a Scene 管理场景的生命周期

```swift
// 
var delegate: UISceneDelegate?


// 
protocol UISceneDelegate

```

## Getting the Scene Attributes 获取场景属性

```swift
// 现场的当前执行状态。
// enum UIScene.ActivationState
// case unattached 表示场景当前未连接到您的应用程序的状态。
// case foregroundInactive 表示场景在前台运行但未接收事件的状态。
// case foregroundActive 表示场景在前台运行并当前正在接收事件的状态。
// case background 一种状态，表示场景在后台运行，而不是在屏幕上。
var activationState: UIScene.ActivationState

//  您提供的用户可见字符串，以帮助用户区分您的应用程序场景。
var title: String!

// 在macOS中运行时，应用程序在窗口标题栏中显示的字符串。
var subtitle: String

```

## Specifying the Scene's Activation Conditions 指定场景的激活条件

```swift
// 定义UIKit何时激活场景对象的条件。
var activationConditions: UISceneActivationConditions

// 定义UIKit何时激活当前场景的条件集。
class UISceneActivationConditions

```

## Responding to Life Cycle Notifications 响应生命周期通知

```swift
// 显示UIKit为您的应用程序添加了场景的通知。
class let willConnectNotification: NSNotification.Name

// 一个通知，表明UIKit从您的应用程序中删除了一个场景。  
class let didDisconnectNotification: NSNotification.Name

// 通知，指示场景即将开始在前台运行，并对用户可见。
class let willEnterForegroundNotification: NSNotification.Name


// 显示场景现在在屏幕上并响应用户事件的通知。
class let didActivateNotification: NSNotification.Name

// 显示场景即将辞职活动状态并停止响应用户事件的通知
class let willDeactivateNotification: NSNotification.Name

// 显示场景在后台运行且不再在屏幕上的通知。
class let didEnterBackgroundNotification: NSNotification.Name

```

## Getting the Scene's Session  获得场景会话

```swift
// 与场景相关的会话。
var session: UISceneSession

//
class UISceneSession

```

## Opening URLs

```swift
// 尝试异步打开指定URL的资源。
func open(URL, options: UIScene.OpenExternalURLOptions?, completionHandler: ((Bool) -> Void)?)
```

## Getting the Pointer Lock State 获取指针锁定状态

```swift
// 场景的指针锁定状态。
var pointerLockState: UIPointerLockState?

```

## Constants 常量

```swift
// 包含您希望系统在激活与场景关联的会话时使用的信息的对象。
class UIScene.ActivationRequestOptions


//  您传递给UIKit的对象，用于从应用程序中永久删除场景及其关联会话。
class UISceneDestructionRequestOptions


// UIKit在要求您的应用程序打开URL时提供的选项。
class UIScene.OpenURLOptions

```

## Instance Methods 

```swift
// 
func completeStateRestoration()

// 
func extendStateRestoration()
```

 