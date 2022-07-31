<!-- TOC -->

- [UIStoryboard](#uistoryboard)
- [API](#api)
    - [Getting a Storyboard Object 获取故事板对象](#getting-a-storyboard-object-获取故事板对象)
    - [Loading the Initial View Controller 加载初始视图控制器](#loading-the-initial-view-controller-加载初始视图控制器)
    - [Instantiating Storyboard View Controllers 实例化故事板视图控制器](#instantiating-storyboard-view-controllers-实例化故事板视图控制器)

<!-- /TOC -->

# UIStoryboard

Interface Builder故事板资源文件中表示的设计时间视图控制器图的封装。

UIStoryboard对象管理应用程序视图控制器的存档版本。在设计时，您可以直观地配置视图控制器的内容，Xcode将重新创建该界面所需的数据保存在应用程序捆绑包中的故事板文件中。当您想以编程方式创建新的视图控制器时，请首先创建一个UIStoryboard对象，并指定适当的名称和捆绑信息。然后使用该对象实例化您想要的特定视图控制器。

在实例化过程中，UIStoryboard使用其 init(coder:)）方法以编程方式创建视图控制器。故事板将视图控制器的数据存档传递给该方法，然后使用数据重新创建视图控制器及其视图的状态。如果您有视图控制器的自定义初始化方法，您可以要求故事板使用您提供的块实例化视图控制器。您可以使用此块调用自定义初始化方法，传递视图控制器所需的任何额外数据。

```swift
@MainActor class UIStoryboard : NSObject
```

# API

## Getting a Storyboard Object 获取故事板对象

```swift
// 为指定的资源文件创建并返回故事板对象。
init(name: String, bundle: Bundle?)

```

## Loading the Initial View Controller 加载初始视图控制器

```swift
// 创建初始视图控制器，并使用故事板上的数据初始化它。
func instantiateInitialViewController() -> UIViewController?

// 从故事板创建初始视图控制器，并使用自定义初始化代码对其进行初始化。
func instantiateInitialViewController<ViewController>(creator: ((NSCoder) -> ViewController?)?) -> ViewController?
```

## Instantiating Storyboard View Controllers 实例化故事板视图控制器

```swift
// 使用指定的标识符创建视图控制器，并使用故事板上的数据初始化它。
func instantiateViewController(withIdentifier: String) -> UIViewController

// 从故事板创建指定的视图控制器，并使用自定义初始化代码对其进行初始化。
func instantiateViewController<ViewController>(identifier: String, creator: ((NSCoder) -> ViewController?)?) -> ViewController
```
