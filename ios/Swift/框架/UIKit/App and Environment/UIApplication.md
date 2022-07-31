<!-- TOC -->

- [UIApplication](#uiapplication)
- [API](#api)
    - [获取场景信息](#获取场景信息)
    - [管理场景的生命周期](#管理场景的生命周期)
    - [管理后台任务](#管理后台任务)
    - [Managing the preferred content size 管理首选内容大小](#managing-the-preferred-content-size-管理首选内容大小)
    - [Specifying the supported interface orientations 指定支持的界面方向](#specifying-the-supported-interface-orientations-指定支持的界面方向)
    - [Tracking controls in the run loop 在运行循环中跟踪控件](#tracking-controls-in-the-run-loop-在运行循环中跟踪控件)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uiapplication

# UIApplication

每个iOS应用程序都有一个UIApplication实例（或很少是UIApplication的子类）。

您的应用程序的应用程序对象处理传入用户事件的初始路由。  
它将控制对象（UIControl类的实例）转发给它的操作消息发送到适当的目标对象。应用程序对象维护一个打开的窗口（UIWindow对象）列表，可用于检索应用程序的任何UIView对象。

```swift
@MainActor class UIApplication : UIResponder
```

# API


```swift
// 单例应用程序实例。
class var shared: UIApplication

var delegate: UIApplicationDelegate?


// 通过 Apple 推送通知服务注册接收远程通知。
func registerForRemoteNotifications()

// 取消注册通过苹果推送通知服务收到的所有远程通知。
func unregisterForRemoteNotifications()

// 一个布尔值，指示应用程序当前是否已注册远程通知。
var isRegisteredForRemoteNotifications: Bool

// 该应用程序的当前状态，或其最活跃场景的状态。
// UIApplication.State
// case active 该应用程序正在前台运行，目前正在接收事件。
// case inactive 该应用程序在前台运行，但没有收到事件。
// case background 该应用程序在后台运行。

// 此属性的行为取决于您的应用程序是否基于场景。
// 在基于场景的应用程序中，此属性获取最活跃场景的值，该值从每个场景的激活状态属性中确定。基于场景的应用程序在后台状态下启动，并在场景连接、更改状态和断开连接时在其状态之间切换。对于基于场景的应用程序，请使用UISceneDelegate来响应单个场景生命周期的变化。
// 在无场景应用程序中，属性的值始终是应用程序的当前状态。该应用程序在启动时处于非活动状态，然后通常处于活动状态或后台状态。该应用程序可能会在短时间内变得不活跃——例如，当在活动状态和后台状态之间转换时，当系统在它前面显示警报时，或者当系统显示应用程序切换器时。对于无场景应用程序，请使用UIApplicationDelegate来响应应用程序的生命周期变化。
var applicationState: UIApplication.State


```

## 获取场景信息

```swift
// 一个布尔值，指示应用程序是否可以同时显示多个场景。
var supportsMultipleScenes: Bool

// 该应用程序当前连接的场景。
var connectedScenes: Set<UIScene>

// 场景当前处于活动状态或由系统存档的会议。
var openSessions: Set<UISceneSession>

```

## 管理场景的生命周期

```swift
// 要求系统激活现有场景，或创建一个新场景并将其与您的应用程序相关联
// 当您希望系统显示应用程序的一个场景时，请调用此方法。
func requestSceneSessionActivation(UISceneSession?, userActivity: NSUserActivity?, options: UIScene.ActivationRequestOptions?, errorHandler: ((Error) -> Void)?)

// 要求系统关闭现有场景并将其从应用程序切换器中删除。
func requestSceneSessionDestruction(UISceneSession, options: UISceneDestructionRequestOptions?, errorHandler: ((Error) -> Void)?)

// 要求系统更新与指定场景关联的任何系统UI。
func requestSceneSessionRefresh(UISceneSession)

```

## 管理后台任务

```swift
// 指示应用程序在后台运行时是否可以刷新内容。
// enum UIBackgroundRefreshStatus
// case restricted 后台更新不可用，用户无法再次启用它们。
// case denied  用户显式禁用此应用程序或整个系统的后台行为。
// case available 该应用程序的后台更新可用。
var backgroundRefreshStatus: UIBackgroundRefreshStatus

// 当应用程序在后台下载内容的状态发生变化时发布通知。
// 当应用程序对象的 backgroundRefreshStatus 属性发生变化时，系统会发送此通知。该属性可能会因用户禁用对应用程序的多任务支持而更改。通知的对象是UIApplication对象。没有userInfo词典。
class let backgroundRefreshStatusDidChangeNotification: NSNotification.Name

// 使用自定义名称标记任务的开始，如果应用程序进入后台，该名称应继续。
func beginBackgroundTask(withName: String?, expirationHandler: (() -> Void)?) -> UIBackgroundTaskIdentifier

// 标记任务的开始，如果应用程序进入后台，任务应该继续。
func beginBackgroundTask(expirationHandler: (() -> Void)?) -> UIBackgroundTaskIdentifier

// 标记特定长期运行的后台任务的结束。
func endBackgroundTask(UIBackgroundTaskIdentifier)

// 标识在后台运行的请求的唯一令牌。
struct UIBackgroundTaskIdentifier

// 应用程序在后台运行的最大剩余时间。
var backgroundTimeRemaining: TimeInterval

```
 
 ## 在后台获取内容

 ```swift
// 系统支持的最小获取间隔。
class let backgroundFetchIntervalMinimum: TimeInterval

// 足以防止发生获取操作的获取间隔。
class let backgroundFetchIntervalNever: TimeInterval
 ```

 ## Opening a URL resource 打开URL资源

 ```swift
// 尝试在指定的URL上异步打开资源。
func open(URL, options: [UIApplication.OpenExternalURLOptionsKey : Any], completionHandler: ((Bool) -> Void)?)

// 返回一个布尔值，该值指示应用程序是否可以处理 URL scheme.
func canOpenURL(URL) -> Bool

// 打开URL的选项。
struct UIApplication.OpenExternalURLOptionsKey

 ```

 ## Deep linking to custom settings 深度链接到自定义设置

 ```swift
// 您用于在设置应用程序中深入链接到应用程序自定义设置的URL字符串。
class let openSettingsURLString: String

// 您用于在设置应用程序中深入链接到应用程序通知设置的URL字符串。
// ios16
static let openNotificationSettingsURLString: String

// 一个常量，提供您用于在设置应用程序中深入链接到应用程序通知设置的URL字符串。
// iOS 15.4+
let UIApplicationOpenNotificationSettingsURLString: String

 ```

 ## Managing the app’s idle timer 管理应用程序的空闲计时器

 ```swift
 // 一个布尔值，用于控制应用程序的空闲计时器是否被禁用。
var isIdleTimerDisabled: Bool

 ```

 ## Managing state restoration 管理恢复状态

 ```swift
// 告诉应用程序您的代码正在异步恢复状态。
func extendStateRestoration()

// 告诉应用程序您的代码已完成任何异步状态恢复。
func completeStateRestoration()

// 阻止应用程序在下一个启动周期中使用最近的快照图像。 
func ignoreSnapshotOnNextApplicationLaunch()

// 注册一个自定义对象，用于状态恢复系统。
class func registerObject(forStateRestoration: UIStateRestoring, restorationIdentifier: String)
 ```

 ## Providing an app’s shortcut items 提供应用程序的快捷方式项

 ```swift
// 适用于应用程序的主屏幕动态快速操作；可在支持3D Touch的设备上使用。
var shortcutItems: [UIApplicationShortcutItem]?
 ```

 ## Accessing protected content 访问受保护的内容

 ```swift
// 一个布尔值，指示内容保护是否有效。
var isProtectedDataAvailable: Bool

// 当受保护的文件可供您的代码访问时发布的通知。
class let protectedDataDidBecomeAvailableNotification: NSNotification.Name

// 在受保护文件锁定并无法访问前不久发布的通知。
class let protectedDataWillBecomeUnavailableNotification: NSNotification.Name

 ```

 ## Receiving remote control events 接收遥控事件

 ```swift
// 告诉应用程序开始接收远程控制事件。
func beginReceivingRemoteControlEvents()

// 告诉应用程序停止接收远程控制事件。
func endReceivingRemoteControlEvents()

 ```

 ## Accessing the layout direction 访问布局方向

 ```swift
// 用户界面的布局方向。
// enum UIUserInterfaceLayoutDirection
// case leftToRight 布局方向从左到右。
// case rightToLeft 从右到左的布局方向。
var userInterfaceLayoutDirection: UIUserInterfaceLayoutDirection

 ```

 ## Controlling and handling events 控制和处理事件

 ```swift
// 将事件分发到应用程序中的相应响应器对象。
func sendEvent(UIEvent)

// 向指定目标发送由选择器标识的操作消息。
func sendAction(Selector, to: Any?, from: Any?, for: UIEvent?) -> Bool

// 一个布尔值，用于确定摇晃设备是否显示撤销重做用户界面。
var applicationSupportsShakeToEdit: Bool
 ```

 ## Managing the app's icon 管理应用程序的图标

 ```swift
// 当前在主屏幕上设置为应用程序图标徽章的数字。
var applicationIconBadgeNumber: Int

// 一个布尔值，指示是否允许应用程序更改其图标。
var supportsAlternateIcons: Bool

// 系统为应用程序显示的图标的名称。
var alternateIconName: String?

// 更改系统为应用程序显示的图标。
func setAlternateIconName(String?, completionHandler: ((Error?) -> Void)?)
 ```

## Managing the preferred content size 管理首选内容大小

```swift
// 用户首选的字体大小选项。
var preferredContentSizeCategory: UIContentSizeCategory

// 指示内容首选大小的常量。
struct UIContentSizeCategory

// 一系列方法，为控件提供了一种对内容类别更改进行自动调整的简单方法。
protocol UIContentSizeCategoryAdjusting

// 当用户更改首选内容大小设置时发布的通知。
static let didChangeNotification: NSNotification.Name

// 反映新首选内容大小的键
static let newValueUserInfoKey: String

```

## Specifying the supported interface orientations 指定支持的界面方向

```swift
// 返回用于指定窗口中视图控制器的默认接口方向集。
func supportedInterfaceOrientations(for: UIWindow?) -> UIInterfaceOrientationMask

```

## Tracking controls in the run loop 在运行循环中跟踪控件

```swift
// 在控件中进行跟踪时设置的模式。
static let tracking: RunLoop.Mode

```