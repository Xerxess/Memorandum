<!-- TOC -->

- [Scenes](#scenes)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/app_and_environment/scenes

# Scenes

同时管理应用程序用户界面的多个实例，并将资源引导到UI的相应实例。

UIKit使用`UIWindowScene`对象管理应用程序UI的每个实例。一个场景包含用于显示一个UI实例的windows and view controllers 。
每个场景都有一个相应的UIWindowSceneDelegate对象，您可以使用它来协调UIKit和应用程序之间的交互。
场景并行运行，共享相同的内存和应用程序进程空间。
单个应用程序可能同时有`多个场景和场景委托对象`。