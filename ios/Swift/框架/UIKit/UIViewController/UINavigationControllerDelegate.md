<!-- TOC -->

- [UINavigationControllerDelegate](#uinavigationcontrollerdelegate)
- [Topics](#topics)
    - [Responding to a view controller being shown 响应显示的视图控制器](#responding-to-a-view-controller-being-shown-%E5%93%8D%E5%BA%94%E6%98%BE%E7%A4%BA%E7%9A%84%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8)
    - [Supporting custom transition animations 支持自定义过渡动画](#supporting-custom-transition-animations-%E6%94%AF%E6%8C%81%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E5%8A%A8%E7%94%BB)

<!-- /TOC -->

# UINavigationControllerDelegate

当从UINavigationController对象的导航堆栈推送或弹出视图控制器时，使用导航控制器委托（实现此协议的自定义对象）来修改行为。

```swift
@MainActor
protocol UINavigationControllerDelegate
```

# Topics

## Responding to a view controller being shown 响应显示的视图控制器

```swift
// 在导航控制器显示视图控制器的视图和导航项属性之前通知委托人。
// 用于在导航控制器的转场过程中监听并响应将要显示视图控制器的事件。
// 当导航栏即将显示新的视图控制器时，该方法会被调用。
// 可以利用这个方法执行以下操作:
// - 定制导航栏的外观和行为。
// - 添加自定义按钮或视图到导航栏。
// - 执行其他与导航栏相关的操作。
optional func navigationController(
    _ navigationController: UINavigationController,
    willShow viewController: UIViewController,
    animated: Bool
)

// 在导航控制器显示视图控制器的视图和导航项属性后通知委托。
// 当导航栏已经显示了一个新的视图控制器时，该方法会被调用。
// 可以利用这个方法执行以下操作：
// - 监听导航栏转场完成的事件
// - 执行与导航栏相关的逻辑。
// - 更新界面或执行其他操作，以响应新视图控制器的显示。
optional func navigationController(
    _ navigationController: UINavigationController,
    didShow viewController: UIViewController,
    animated: Bool
)
```

## Supporting custom transition animations 支持自定义过渡动画

```swift
// 允许委托返回非交互式动画器对象，以便在视图控制器过渡期间使用。
// 当导航栏执行视图转场操作（例如推入或弹出视图控制器）时，该方法会被调用。
// 操作：
// - 自定义导航栏的转场动画。
// - 创建并返回一个遵循 UIViewControllerAnimatedTransitioning 协议的动画控制器，用于管理视图控制器的转场动画。
optional func navigationController(
    _ navigationController: UINavigationController,
    animationControllerFor operation: UINavigationController.Operation,
    from fromVC: UIViewController,
    to toVC: UIViewController
) -> UIViewControllerAnimatedTransitioning?

// 允许委托返回交互式动画器对象，以便在视图控制器过渡期间使用。
// 当导航栏执行视图转场操作（例如推入或弹出视图控制器）时，该方法会被调用。
// 操作:
// - 自定义导航栏的交互式转场效果。
// - 创建并返回一个遵循 UIViewControllerInteractiveTransitioning 协议的交互式转场控制器，用于管理视图控制器的交互式转场效果。
optional func navigationController(
    _ navigationController: UINavigationController,
    interactionControllerFor animationController: UIViewControllerAnimatedTransitioning
) -> UIViewControllerInteractiveTransitioning?

// 返回由委托人确定的导航控制器的首选呈现方向。
// 当导航控制器需要确定首选界面方向时，该方法会被调用。
// 操作：
// - 指定导航控制器的首选界面方向
// - 返回一个 UIInterfaceOrientation 值，表示导航控制器的首选界面方向。
optional func navigationControllerPreferredInterfaceOrientationForPresentation(_ navigationController: UINavigationController) -> UIInterfaceOrientation

// 返回由委托确定的导航控制器支持的整套接口方向。
// 用于指定导航控制器所支持的界面方向。
// 操作：
// - 指定导航控制器支持的界面方向。
// - 返回一个 UIInterfaceOrientationMask 值，表示导航控制器支持的界面方向的组合。
optional func navigationControllerSupportedInterfaceOrientations(_ navigationController: UINavigationController) -> UIInterfaceOrientationMask
```
