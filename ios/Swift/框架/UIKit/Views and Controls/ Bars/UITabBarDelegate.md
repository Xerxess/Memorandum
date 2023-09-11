# UITabBarDelegate

```swift
//
@MainActor
protocol UITabBarDelegate
```

# Topics

```swift
// 在显示自定义模态视图之前发送给委托人。
optional func tabBar(
    _ tabBar: UITabBar,
    willBeginCustomizing items: [UITabBarItem]
)

// 显示自定义模式后发送到委托人。
optional func tabBar(
    _ tabBar: UITabBar,
    didBeginCustomizing items: [UITabBarItem]
)

// 在自定义模式关闭之前发送给委托人。
optional func tabBar(
    _ tabBar: UITabBar,
    willEndCustomizing items: [UITabBarItem],
    changed: Bool
)

// 在关闭自定义视图后发送给委托人。
optional func tabBar(
    _ tabBar: UITabBar,
    didEndCustomizing items: [UITabBarItem],
    changed: Bool
)

// 当用户选择选项卡栏项目时，发送给委托人。
optional func tabBar(
    _ tabBar: UITabBar,
    didSelect item: UITabBarItem
)
```