<!-- TOC -->

- [Scenes](#scenes)
- [info.plist 配制标识](#infoplist-配制标识)

<!-- /TOC -->

<https://developer.apple.com/documentation/uikit/app_and_environment/scenes>

# Scenes

同时管理应用程序用户界面的多个实例，并将资源引导到UI的相应实例。

UIKit使用`UIWindowScene`对象管理应用程序UI的每个实例。一个场景包含用于显示一个UI实例的windows and view controllers 。
每个场景都有一个相应的UIWindowSceneDelegate对象，您可以使用它来协调UIKit和应用程序之间的交互。
场景并行运行，共享相同的内存和应用程序进程空间。
单个应用程序可能同时有`多个场景和场景委托对象`。

# info.plist 配制标识

https://developer.apple.com/documentation/bundleresources/information_property_list/uiapplicationscenemanifest

* `UIApplicationSceneManifest` -> Name: `Application Scene Manifest` 有关应用程序基于场景的生命周期支持的信息。
    * `UIApplicationSupportsMultipleScenes` -> Name: `Enable Multiple Windows` 一个布尔值，指示应用程序是否同时支持两个或多个场景。
    * `UISceneConfigurations` -> Name: `Scene Configuration` UIKit在创建新场景时使用的默认配置详细信息。
        * `UIWindowSceneSessionRoleApplication` -> Name: `Application Session Role` 用于在设备主屏幕上显示内容并响应用户交互的场景。
            * UISceneConfigurationName -> Name: `Configuration Name` 您用于识别场景的应用程序专用名称。
            * UISceneClassName -> Name: `Class Name` 您希望UIKit实例化场景类的名称。
            * UISceneDelegateClassName ->  Name: `Delegate Class Name` 您希望UIKit实例化并用作场景委托对象的应用程序特定类的名称。
            * UISceneStoryboardFile -> Name: `Storyboard Name` 包含场景初始用户界面的`故事板`文件的名称。