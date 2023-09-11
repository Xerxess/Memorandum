# UINavigationController

一个容器视图控制器，定义了用于导航分层内容的基于堆栈的方案。

导航控制器是管理导航界面中一个或多个子视图控制器的容器视图控制器。在这种类型的界面中，一次只能看到一个子视图控制器。在视图控制器中选择项目会使用动画在屏幕上推送新的视图控制器，隐藏之前的视图控制器。点击界面顶部导航栏中的后退按钮会删除顶部视图控制器，从而显示下面的视图控制器。

导航控制器对象使用有序数组（称为`导航堆栈`）管理其子视图控制器。  
`数组中的第一个视图控制器是根视图控制器，表示堆栈的底部。`  
数组中的`最后一个视图控制器是堆栈上最上面的项目`，表示当前正在显示的视图控制器。您可以使用segues或使用该类的方法从堆栈中添加和删除视图控制器。用户还可以使用导航栏中的后退按钮或使用左边缘滑动手势来移除最上面的视图控制器。  

导航控制器管理界面顶部的`导航栏`和`界面底部的可选工具栏`。

# 导航控制器视图


# Topics

## Creating a navigation controller 创建导航控制器

```swift
// 初始化并返回新创建的导航控制器。
init(rootViewController: UIViewController)
```

## Customizing the navigation interface behavior 自定义导航界面行为

```swift
// 导航控制器对象的委托。
weak var delegate: UINavigationControllerDelegate? { get set }
```

## Accessing items on the navigation stack 访问导航堆栈上的项目

```swift
// 导航堆栈顶部的视图控制器。
var topViewController: UIViewController? { get }

// 与导航界面中当前可见视图关联的视图控制器。
// 用于获取当前可见的视图控制器。
var visibleViewController: UIViewController? { get }

// 当前在导航堆栈上的视图控制器。
// 根视图控制器位于数组中的索引0，后视图控制器位于索引n-2，顶部控制器位于索引n-1，其中n是数组中的项目数量。
// 将新的视图控制器数组分配给此属性等同于调用将动画参数设置为false的setViewControllers(_:animated:)方法。
var viewControllers: [UIViewController] { get set }

// 用指定的项目替换当前由导航控制器管理的视图控制器。
// 替换导航控制器的视图控制器堆栈，以一次性设置新的视图控制器列表。
// 你可以选择是否使用动画来呈现这些视图控制器的转场过程。
func setViewControllers(
    _ viewControllers: [UIViewController],
    animated: Bool
)
```

## Pushing and popping stack items 压入和弹出堆栈项目

```swift
// 将视图控制器推到接收器的堆栈上并更新显示器。
func pushViewController(
    _ viewController: UIViewController,
    animated: Bool
)

// 从导航堆栈中弹出顶视图控制器并更新显示。
func popViewController(animated: Bool) -> UIViewController?

// 弹出堆栈上除根视图控制器以外的所有视图控制器并更新显示。
func popToRootViewController(animated: Bool) -> [UIViewController]?

// 弹出视图控制器，直到指定的视图控制器位于导航堆栈的顶部。
func popToViewController(
    _ viewController: UIViewController,
    animated: Bool
) -> [UIViewController]?

// 负责将顶视图控制器从导航堆栈中弹出的手势识别器。
// 该对象用于实现导航控制器的交互式返回功能。通过此手势识别器，用户可以通过在导航栏左侧滑动来触发返回操作。
var interactivePopGestureRecognizer: UIGestureRecognizer? { get }
```

## Configuring navigation bars 配置导航栏

```swift
// 由导航控制器管理的导航栏。
var navigationBar: UINavigationBar { get }

// 设置导航栏是否隐藏。
func setNavigationBarHidden(
    _ hidden: Bool,
    animated: Bool
)
```

## Configuring custom toolbars 配置自定义工具栏

```swift
// 与导航控制器关联的自定义工具栏。
var toolbar: UIToolbar! { get }
func setToolbarHidden(Bool, animated: Bool)
var isToolbarHidden: Bool
class let hideShowBarDuration: CGFloat

```

## Hiding the navigation bar 隐藏导航栏

```swift
// 一个布尔值，指示导航控制器是否允许使用点击手势隐藏其条。
// 默认情况下，hidesBarsOnTap 属性的值为 false，即导航栏和工具栏不会自动隐藏。
// 当将 hidesBarsOnTap 设置为 true 时，用户在轻触屏幕时，导航栏和工具栏会自动隐藏。当用户再次轻触屏幕时，导航栏和工具栏会重新显示
var hidesBarsOnTap: Bool { get set }

// 一个布尔值，指示导航栏是否在响应滑动手势时隐藏其栏。
// 当此属性设置为true时，向上滑动会隐藏导航栏和工具栏。
// 向下滑动再次显示导航栏和工具栏。
// 此属性的默认值为false。
var hidesBarsOnSwipe: Bool { get set }

// 一个布尔值，指示导航控制器是否在垂直紧凑的环境中隐藏其条。 
var hidesBarsWhenVerticallyCompact: Bool { get set }

// 一个布尔值，指示导航控制器在键盘出现时是否隐藏其条。
var hidesBarsWhenKeyboardAppears: Bool { get set }

// 一个布尔值，指示导航栏是否被隐藏。
// 如果为真，则导航栏被隐藏。
// 默认值为false。
// 设置此属性会更改导航栏的可见性，而不会对更改进行动画。如果您想为更改制作动画，请改用setNavigationBarHidden(_:animated:)方法。
var isNavigationBarHidden: Bool { get set }

// 用于隐藏和显示导航和工具栏的手势识别器。
unowned(unsafe) var barHideOnTapGestureRecognizer: UITapGestureRecognizer { get }

// 用于隐藏导航栏和工具栏的手势识别器。
var barHideOnSwipeGestureRecognizer: UIPanGestureRecognizer { get }
```

## Displaying view controllers 显示视图控制器

```swift
// 在导航界面中显示指定的视图控制器。
func show(
    _ vc: UIViewController,
    sender: Any?
)
```
