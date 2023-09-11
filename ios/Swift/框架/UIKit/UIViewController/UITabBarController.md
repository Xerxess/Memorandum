# UITabBarController

管理多选择接口的容器视图控制器，其中选择决定要显示哪个子视图控制器。

选项卡栏界面在窗口底部显示选项卡，用于在不同模式之间进行选择并显示该模式的视图。  
该类通常按`原样使用`，但也可能被子类。

选项卡栏控制器界面的每个选项卡都与自定义视图控制器相关联。  
当用户选择特定选项卡时，选项卡栏控制器会显示相应视图控制器的根视图，替换任何以前的视图。

当用户与选项卡栏界面交互时，选项卡栏控制器对象会向其委托人发送有关交互的通知。  
委托可以是您指定的任何对象，但必须符合`UITabBarControllerDelegate`协议。您可以使用委托来防止选择特定的选项卡栏项，并在选择选项卡时执行其他任务。您还可以使用委托来监控更多导航控制器对选项卡栏的更改，该更改在更多导航控制器中有更详细的描述。

# Topics

## Customizing the tab bar behavior 自定义标签栏行为

```swift
// 选项卡栏控制器的委托对象。
weak var delegate: UITabBarControllerDelegate? { get set }
```

## Accessing the tab bar controller properties 访问选项卡栏控制器属性

```swift
// 与此控制器关联的选项卡栏视图。
var tabBar: UITabBar { get }
```

## Managing the view controllers 管理视图控制器

```swift
// 选项卡栏界面显示的根视图控制器数组。
var viewControllers: [UIViewController]? { get set }

// 设置选项卡栏控制器的根视图控制器。
func setViewControllers(
    _ viewControllers: [UIViewController]?,
    animated: Bool
)

// 可以自定义的由此选项卡栏控制器管理的视图控制器子集。
var customizableViewControllers: [UIViewController]? { get set }

```

## Managing the selected 选项卡 管理所选选项卡

```swift
// 与当前选定的选项卡项关联的视图控制器。
// 用于获取或设置当前选中的视图控制器
unowned(unsafe) var selectedViewController: UIViewController? { get set }

// 与当前所选选项卡项关联的视图控制器的索引。
var selectedIndex: Int { get set }
```