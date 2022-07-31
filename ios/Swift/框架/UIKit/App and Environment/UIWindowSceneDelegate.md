<!-- TOC -->

- [UIWindowSceneDelegate](#uiwindowscenedelegate)
- [Inherits From](#inherits-from)
- [API](#api)
    - [Managing the Scene's Main Window](#managing-the-scenes-main-window)
    - [Responding to Scene Changes 应对场景变化](#responding-to-scene-changes-应对场景变化)
    - [Performing Tasks 完成任务](#performing-tasks-完成任务)

<!-- /TOC -->

# UIWindowSceneDelegate

用于管理场景中发生的应用程序特定任务的其他方法。

使用UIWindowSceneDelegate对象管理应用程序用户界面一个实例的生命周期。
窗口场景委托符合UISceneDelegate属性，当其场景连接到应用程序、进入前景等时，您可以使用它接收通知。
您还可以使用它来响应场景底层环境中的变化。例如，如果用户调整场景大小，请使用委托对内容进行任何必要的更改，以适应新的大小。

```swift
@MainActor protocol UIWindowSceneDelegate
```

# Inherits From

UISceneDelegate

# API

## Managing the Scene's Main Window

```swift
// 
var window: UIWindow?
```

## Responding to Scene Changes 应对场景变化

```swift
// 当场景的大小、方向或特征发生变化时通知您。
func windowScene(UIWindowScene, didUpdate: UICoordinateSpace, interfaceOrientation: UIInterfaceOrientation, traitCollection: UITraitCollection)
```

## Performing Tasks 完成任务

```swift
// 让委托人执行用户选择的操作。
func windowScene(UIWindowScene, performActionFor: UIApplicationShortcutItem, completionHandler: (Bool) -> Void)

// 告诉委托人，窗口场景现在可以访问CloudKit中的共享信息。
func windowScene(UIWindowScene, userDidAcceptCloudKitShareWith: CKShareMetadata)

```
