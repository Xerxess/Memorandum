<!-- TOC -->

- [UISceneDelegate](#uiscenedelegate)
- [API](#api)
    - [Connecting and Disconnecting the Scene 连接和断开场景](#connecting-and-disconnecting-the-scene-连接和断开场景)
    - [Transitioning to the Foreground 过渡到前景](#transitioning-to-the-foreground-过渡到前景)
    - [Transitioning to the Background 过渡到后台](#transitioning-to-the-background-过渡到后台)
    - [Opening URLs](#opening-urls)
    - [Continuing User Activities 接力的用户活动](#continuing-user-activities-接力的用户活动)
    - [Saving the State of the Scene 保存场景状态](#saving-the-state-of-the-scene-保存场景状态)

<!-- /TOC -->


# UISceneDelegate

您用于响应场景中发生的生命周期事件的核心方法。

使用UISceneDelegate对象在应用程序用户界面的一个实例中管理生命周期事件。
该界面定义了响应影响场景的状态转换的方法，包括场景何时进入前景并处于活动状态，以及何时进入背景。当这些过渡发生时，使用您的委托人提供适当的行为。
例如，完成关键任务，并在应用程序进入后台时安静下来。

不要直接创建UISceneDelegate对象。

```
@MainActor protocol UISceneDelegate
```

# API

## Connecting and Disconnecting the Scene 连接和断开场景

```swift
// 告诉委托人向应用程序添加场景的情况。
func scene(UIScene, willConnectTo: UISceneSession, options: UIScene.ConnectionOptions)

// 告诉委托人UIKit从您的应用程序中删除了一个场景。
func sceneDidDisconnect(UIScene)

```

## Transitioning to the Foreground 过渡到前景

```swift
// 告诉委托人，场景即将开始在前台运行，并对用户可见。
func sceneWillEnterForeground(UIScene)

// 告诉委托人，场景已激活，现在正在响应用户事件。
func sceneDidBecomeActive(UIScene)


```

## Transitioning to the Background 过渡到后台

```swift
// 告诉委托人，场景即将辞职活动状态，并停止响应用户事件。
func sceneWillResignActive(UIScene)

// 告诉委托人，场景在后台运行，不再在屏幕上。
func sceneDidEnterBackground(UIScene)

```

## Opening URLs

```swift
// 让委托人打开一个或多个URL。
func scene(UIScene, openURLContexts: Set<UIOpenURLContext>)

```

## Continuing User Activities 接力的用户活动

```swift
// 告诉委托人，它即将收到与接力相关的数据。
func scene(UIScene, willContinueUserActivityWithType: String)

// 告诉委托人处理指定的接力相关活动。
func scene(UIScene, continue: NSUserActivity)


// 告诉代表该活动无法继续。
func scene(UIScene, didFailToContinueUserActivityWithType: String, error: Error)
```

## Saving the State of the Scene 保存场景状态

```swift
// 返回一个用户活动对象，该对象封装了指定场景的当前状态。
func stateRestorationActivity(for: UIScene) -> NSUserActivity?
func scene(UIScene, restoreInteractionStateWith: NSUserActivity)

// 告诉委托指定的活动对象已更新。
func scene(UIScene, didUpdate: NSUserActivity)


```