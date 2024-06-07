# UIAppearance

允许您访问类的外观代理的方法集合。

`通过向类的外观代理发送外观修改消息来自定义类实例的外观`

两种方法可以自定义对象的外观:

- 对于所有实例，以及对于容器类实例中包含的实例。

```swift
// 要自定义类的所有实例的外观，请使用 appearance() 获取该类的外观代理。例如，要修改 UINavigationBar 所有实例的栏背景色调颜色：
UINavigationBar.appearance().barTintColor = navBarTintColor
```

- 自定义包含在容器类实例或层次结构中的实例中的类实例的外观

```swift
// 使用 appearanceWhenContainedIn: 获取该类的外观代理
// appearanceWhenContainedIn: 中的包含语句被视为部分排序。
// 给定具体的顺序（实际的子视图层次结构），UIKit 选择从窗口向下读取实际层次结构时第一个唯一匹配的部分顺序。
let navigationBarAppearance =
UINavigationBar.appearance(whenContainedInInstancesOf: [UINavigationController.self])
navigationBarAppearance.setBackgroundImage(navBarBackgroundImage, for: .any, barMetrics: .default)


let barButtonNavigationBarAppearance =
UIBarButtonItem.appearance(whenContainedInInstancesOf: [UINavigationBar.self])
barButtonNavigationBarAppearance.setBackgroundImage(barButtonNavBarImage, for: .normal, barMetrics: .default)


let barButtonToolbarAppearance =
UIBarButtonItem.appearance(whenContainedInInstancesOf: [UIToolbar.self])
barButtonToolbarAppearance.setBackgroundImage(barButtonToolbarImage, for: .normal, barMetrics: .default)
```
