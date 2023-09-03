# UITabBarControllerDelegate


```swift
@MainActor
protocol UITabBarControllerDelegate
```

# Topics

## Managing tab bar selections 管理选项卡栏选择

```swift
// 询问委托人是否应该激活指定的视图控制器。
optional func tabBarController(
    _ tabBarController: UITabBarController,
    shouldSelect viewController: UIViewController
) -> Bool

// 告诉委托人用户在选项卡栏中选择了项目。
optional func tabBarController(
    _ tabBarController: UITabBarController,
    didSelect viewController: UIViewController
)
```

## Managing tab bar customizations 管理标签栏自定义

```swift
// 告诉委托人，选项卡栏自定义表即将显示。
optional func tabBarController(
    _ tabBarController: UITabBarController,
    willBeginCustomizing viewControllers: [UIViewController]
)

// 告诉代表，选项卡栏自定义表即将被忽略。
// 当用户完成对标签栏项进行自定义操作（例如重新排序、添加或删除项）后，系统将调用
optional func tabBarController(
    _ tabBarController: UITabBarController,
    willEndCustomizing viewControllers: [UIViewController],
    changed: Bool
)

// 告诉代表，选项卡栏自定义表被忽略了。
// 当用户完成对标签栏项进行自定义操作并且已经应用了更改后，系统将调用
optional func tabBarController(
    _ tabBarController: UITabBarController,
    didEndCustomizing viewControllers: [UIViewController],
    changed: Bool
)
```

## Overriding view rotation settings 覆盖视图旋转设置