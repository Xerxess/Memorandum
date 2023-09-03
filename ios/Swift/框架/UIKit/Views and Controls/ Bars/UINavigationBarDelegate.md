# UINavigationBarDelegate

导航栏在修改其导航项堆栈之前和之后调用的方法。

## Topics

### Pushing items 推送物品

```swift
// 返回一个布尔值，指示导航栏是否应该推送项目。
// 在将项目推送到导航栏之前发送给委托人。
optional func navigationBar(
    _ navigationBar: UINavigationBar,
    shouldPush item: UINavigationItem
) -> Bool

// 告诉委托人一个项目被推送到导航栏上。
optional func navigationBar(
    _ navigationBar: UINavigationBar,
    didPush item: UINavigationItem
)
```

### Popping items 弹出项目

```swift
// 返回一个布尔值，指示导航栏是否应该弹出一个项目。
optional func navigationBar(
    _ navigationBar: UINavigationBar,
    shouldPop item: UINavigationItem
) -> Bool

// 告诉代表从导航栏中弹出了一个项目。
optional func navigationBar(
    _ navigationBar: UINavigationBar,
    didPop item: UINavigationItem
)
```
