<!-- TOC -->

- [UIApplicationDelegate](#uiapplicationdelegate)
- [iOS 12及更低版本中的生命循环管理](#ios-12及更低版本中的生命循环管理)
- [API](#api)
    - [Initializing the App 初始化应用程序](#initializing-the-app-初始化应用程序)
    - [Configuring and Discarding Scenes 配置和丢弃场景](#configuring-and-discarding-scenes-配置和丢弃场景)
    - [Responding to App Life-Cycle Events 应对 App 生命周期事件](#responding-to-app-life-cycle-events-应对-app-生命周期事件)
    - [应对环境变化](#应对环境变化)
    - [Managing App State Restoration 管理应用程序状态恢复](#managing-app-state-restoration-管理应用程序状态恢复)
    - [Downloading Data in the Background 在后台下载数据](#downloading-data-in-the-background-在后台下载数据)
    - [Handling Remote Notification Registration 处理远程通知注册](#handling-remote-notification-registration-处理远程通知注册)
    - [Continuing User Activity and Handling Quick Actions 持续用户活动和处理快速操作](#continuing-user-activity-and-handling-quick-actions-持续用户活动和处理快速操作)
    - [Opening a URL-Specified Resource 打开URL指定的资源](#opening-a-url-specified-resource-打开url指定的资源)
    - [Disallowing Specified App Extension Types 不允许指定的应用程序扩展类型](#disallowing-specified-app-extension-types-不允许指定的应用程序扩展类型)
    - [Handling SiriKit Intents](#handling-sirikit-intents)
    - [Localizing Keyboard Shortcuts 本地化键盘快捷键](#localizing-keyboard-shortcuts-本地化键盘快捷键)
    - [Managing Interface Geometry 管理接口几何](#managing-interface-geometry-管理接口几何)
    - [Providing a Window for Storyboarding 为故事板提供窗口](#providing-a-window-for-storyboarding-为故事板提供窗口)

<!-- /TOC -->


# UIApplicationDelegate

一套用于管理应用程序共享行为的方法。

您的应用程序委托对象管理应用程序的共享行为。应用程序委托实际上是应用程序的根对象，它与UIA应用程序一起工作，以管理与系统的一些交互。与UIApplication对象一样，UIKit在应用程序启动周期的早期创建应用程序委托对象，因此它`始终存在`。

# iOS 12及更低版本中的生命循环管理

在iOS 12及更低版本中，您可以使用应用程序委托来管理应用程序中的主要生命周期事件。
具体来说，当应用程序进入前台或移动到后台时，您可以使用应用程序委托的方法来更新其状态。

# API

## Initializing the App 初始化应用程序

```swift
// 告诉委托人，启动过程已经开始，但状态恢复尚未发生。
func application(UIApplication, willFinishLaunchingWithOptions: [UIApplication.LaunchOptionsKey : Any]?) -> Bool

// 告诉委托人，启动过程几乎完成了，应用程序几乎可以运行了。
func application(UIApplication, didFinishLaunchingWithOptions: [UIApplication.LaunchOptionsKey : Any]?) -> Bool

// 您用于访问启动选项字典中系统在初始化时传递到应用程序的值的键。
struct UIApplication.LaunchOptionsKey

// 在应用程序完成启动后立即发布的通知。
class let didFinishLaunchingNotification: NSNotification.Name

```

## Configuring and Discarding Scenes 配置和丢弃场景

```swift
// 检索UIKit在创建新场景时使用的配置数据。
func application(UIApplication, configurationForConnecting: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration

// 告诉委托用户从应用程序切换器中关闭了一个或多个应用程序的场景。
func application(UIApplication, didDiscardSceneSessions: Set<UISceneSession>)

```

## Responding to App Life-Cycle Events 应对 App 生命周期事件

```swift
// 告诉委托人该应用程序已激活。
func applicationDidBecomeActive(UIApplication)

// 告诉委托人，该应用程序即将处于非活动状态。
func applicationWillResignActive(UIApplication)

// 告诉委托人，该应用程序现在在后台。
func applicationDidEnterBackground(UIApplication)

// 告诉委托人，该应用程序即将进入前台。
func applicationWillEnterForeground(UIApplication)

//  告诉委托人应用程序何时即将终止。
func applicationWillTerminate(UIApplication)

// 当应用程序激活时发布的通知。
class let didBecomeActiveNotification: NSNotification.Name

// 当应用程序进入后台时发布的通知。
class let didEnterBackgroundNotification: NSNotification.Name

// 在应用程序成为活动应用程序的途中离开后台状态前不久发布的通知。
class let willEnterForegroundNotification: NSNotification.Name

// 当应用程序不再活动并失去焦点时发布的通知。
class let willResignActiveNotification: NSNotification.Name

// 当应用程序即将终止时发布的通知。
class let willTerminateNotification: NSNotification.Name

```

## 应对环境变化

```swift
// 告诉委托人，受保护的文件现在可用。
func applicationProtectedDataDidBecomeAvailable(UIApplication)

// 告诉委托人受保护的文件即将不可用
func applicationProtectedDataWillBecomeUnavailable(UIApplication)

// 当应用程序收到来自系统的内存警告时，告诉委托人。
func applicationDidReceiveMemoryWarning(UIApplication)

// 当时间发生重大变化时，告诉委托人。
func applicationSignificantTimeChange(UIApplication)

// 当受保护的文件可供您的代码访问时发布的通知。
class let protectedDataDidBecomeAvailableNotification: NSNotification.Name

// 在受保护文件锁定并无法访问前不久发布的通知。
class let protectedDataWillBecomeUnavailableNotification: NSNotification.Name

// 当应用程序收到操作系统关于内存可用性低的警告时发布的通知。
class let didReceiveMemoryWarningNotification: NSNotification.Name

// 当时间发生重大变化时发布的通知。
class let significantTimeChangeNotification: NSNotification.Name
```

## Managing App State Restoration 管理应用程序状态恢复

```swift
// 询问委托人是否安全地保留应用程序的状态。
func application(UIApplication, shouldSaveSecureApplicationState: NSCoder) -> Bool

// 询问委托人是否恢复应用程序的保存状态。
func application(UIApplication, shouldRestoreSecureApplicationState: NSCoder) -> Bool

// 要求委托人提供指定的视图控制器。
func application(UIApplication, viewControllerWithRestorationIdentifierPath: [String], coder: NSCoder) -> UIViewController?

// 告诉您的委托在状态保存过程开始时保存任何高级状态信息
func application(UIApplication, willEncodeRestorableStateWith: NSCoder)

// 告诉您的委托恢复任何高级状态信息，作为状态恢复过程的一部分。
func application(UIApplication, didDecodeRestorableStateWith: NSCoder)

// 负责创建恢复归档的应用程序版本。
class let stateRestorationBundleVersionKey: String

// 您的应用程序创建恢复归档的系统版本。
class let stateRestorationSystemVersionKey: String

// 您的应用程序创建恢复归档的时间。
class let stateRestorationTimestampKey: String

// 当您的应用程序创建恢复归档时有效的用户界面习语。
class let stateRestorationUserInterfaceIdiomKey: String

// 对包含视图控制器的故事板的引用。
class let stateRestorationViewControllerStoryboardKey: String

```

## Downloading Data in the Background 在后台下载数据

```swift
// 告诉委托人，与URL会话相关的事件正在等待处理。
// enum UIBackgroundFetchResult
// case newData 新数据已成功下载。
// case noData 没有新的数据可以下载。
// case failed 尝试下载数据，但尝试失败了。
func application(UIApplication, handleEventsForBackgroundURLSession: String, completionHandler: () -> Void)
```

## Handling Remote Notification Registration 处理远程通知注册

```swift
// 告诉委托人，该应用程序已成功注册到Apple推送通知服务（APN）。
func application(UIApplication, didRegisterForRemoteNotificationsWithDeviceToken: Data)

// 当 Apple 推送通知服务无法成功完成注册流程时，告知委托人。
func application(UIApplication, didFailToRegisterForRemoteNotificationsWithError: Error)

// 告诉应用程序，远程通知已到达，表明有数据需要获取。
func application(UIApplication, didReceiveRemoteNotification: [AnyHashable : Any], fetchCompletionHandler: (UIBackgroundFetchResult) -> Void)
```

## Continuing User Activity and Handling Quick Actions 持续用户活动和处理快速操作

```swift
// 告诉委托人，当持续活动的时间比预期的要长时，您的应用程序是否负责通知用户。
func application(UIApplication, willContinueUserActivityWithType: String) -> Bool

// 告诉代表，继续活动的数据是可用的。
func application(UIApplication, continue: NSUserActivity, restorationHandler: ([UIUserActivityRestoring]?) -> Void) -> Bool

// 告诉代表活动已更新。
func application(UIApplication, didUpdate: NSUserActivity)

// 告诉代表该活动无法继续。
func application(UIApplication, didFailToContinueUserActivityWithType: String, error: Error)

// 告诉委托人，用户为您的应用程序选择了主屏幕快速操作，除非您在启动方法中拦截了交互。
func application(UIApplication, performActionFor: UIApplicationShortcutItem, completionHandler: (Bool) -> Void)
```

## Opening a URL-Specified Resource 打开URL指定的资源

```swift
// 要求委托人打开URL指定的资源，并提供启动选项字典。
func application(UIApplication, open: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool

// 打开URL时用于访问选项字典中值的键。
struct UIApplication.OpenURLOptionsKey

```

## Disallowing Specified App Extension Types 不允许指定的应用程序扩展类型

```swift
// 要求委托人授予使用基于指定扩展点标识符的应用程序扩展的权限。
func application(UIApplication, shouldAllowExtensionPointIdentifier: UIApplication.ExtensionPointIdentifier) -> Bool
```

## Handling SiriKit Intents

```swift
// 要求委托人提供能够处理指定意图的意图处理程序。
func application(UIApplication, handlerFor: INIntent) -> Any?
````

## Localizing Keyboard Shortcuts 本地化键盘快捷键

```swift
// 返回一个布尔值，该值告诉系统是否重新映射菜单快捷键以支持本地化键盘。
func applicationShouldAutomaticallyLocalizeKeyCommands(UIApplication) -> Bool
```

## Managing Interface Geometry 管理接口几何

```swift
// 要求委托人在指定窗口中为视图控制器提供接口方向。
func application(UIApplication, supportedInterfaceOrientationsFor: UIWindow?) -> UIInterfaceOrientationMask

//  指定应用程序用户界面方向的常量。
// 从iOS 8开始，您应该使用UITraitCollection和UITraitEnvironment API，以及这些API中使用的大小类属性，而不是使用UIInterfaceOrientation常量或以其他方式编写应用程序的界面方向。
enum UIInterfaceOrientation

// 指定视图控制器支持的接口方向的常量。
// 从iOS 8开始，您应该使用UITraitCollection和UITraitEnvironment API，以及这些API中使用的大小类属性，而不是使用UIInterfaceOrientation常量或以其他方式编写应用程序的界面方向。
struct UIInterfaceOrientationMask

// 如果视图控制器或应用程序返回一组无效的支持界面方向，则抛出异常。
class let invalidInterfaceOrientationException: NSExceptionName

```

## Providing a Window for Storyboarding 为故事板提供窗口

```swift
// 展示故事板时使用的窗口。
var window: UIWindow?

```