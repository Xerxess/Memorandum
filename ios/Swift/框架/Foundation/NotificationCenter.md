<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NotificationCenter](#notificationcenter)
  - [常用通知](#常用通知)

<!-- /code_chunk_output -->

# NotificationCenter

- 优势
  - 多个收件人
  - 松耦合
  - 全球接入点,不需要（或只是不关心）代码中的依赖注入时，单例样式的方法 defaultCenter 允许您轻松地将两个随机对象连接在一起
- 缺点
  - 无法使用调试器介入
  - 不明显的控制流
  - 第三方库可能依赖与您的代码相同的通知并相互干扰
  - 无法控制谁有资格发送特定通知。

一种通知调度机制，可以向注册观察者广播信息

- .addObserver(forName: notificationName, object: nil, queue: nil) obj不为nil 可以过虑指定对象的通知

```swift
let notificationCenter = NotificationCenter.default
let notificationName = Notification.Name("test")

notificationCenter.addObserver(forName: notificationName, object: nil, queue: nil){
    notification in    
    let userName_object = notification.object as! String
    let userName_userInfo = notification.userInfo?["userName"]
    print("notification:\(userName_object);\(userName_userInfo)")
}
let notification = Notification(name: notificationName, object: "小明1", userInfo: ["userName":"小明2"])
notificationCenter.post(notification)
// notification:小明1;Optional("小明2")
notificationCenter.post(name: notificationName, object: "小明1", userInfo: ["userName":"小明2"])
// notification:小明1;Optional("小明2")
```

```swift
notificationCenter.addObserver(forName: notificationName, object: "小明", queue: nil){
    notification in    
    let userName_object = notification.object as! String
    let userName_userInfo = notification.userInfo?["userName"]
    print("notification:\(userName_object);\(userName_userInfo)")
}
notificationCenter.post(name: notificationName, object: "小明1", userInfo: ["userName":"小明2"])
// 无打印，object 指定对象不符合
```

```swift
let notificationCenter = NotificationCenter.default
let notificationName = Notification.Name("test")
class NotificationClass {
    var name = "小明"
    @objc func notificationFunc(_ notification:Notification){
        let userName = notification.userInfo?["userName"]
        let obj = notification.object as! NotificationClass
        print("notification: \(userName)-\(obj.name)")
    }
}
let classTaget = NotificationClass()
notificationCenter.addObserver(classTaget, selector: #selector(NotificationClass.notificationFunc(_:)), name: notificationName, object: classTaget)

let notification = Notification(name: notificationName, object: classTaget, userInfo:nil)
notificationCenter.post(notification)
// notification: nil-小明
notificationCenter.post(name: notificationName, object: classTaget)
// notification: nil-小明
notificationCenter.post(name: notificationName, object: nil)
// 无输出 object 有具体类型，不符合通知接收要求
```

## 常用通知

```swift
// 键盘相关
static let keyboardNotifications: [Notification.Name] = [
    UIResponder.keyboardWillShowNotification, // 在显示键盘之前立即发布的通知
    UIResponder.keyboardWillHideNotification, // 关闭键盘之前立即发布的通知
    UIResponder.keyboardDidShowNotification, // 显示键盘后立即发布的通知
    UIResponder.keyboardDidHideNotification, // 关闭键盘后立即发布的通知
    UIResponder.keyboardWillChangeFrameNotification, // 在键盘框架更改之前发布的通知
    UIResponder.keyboardDidChangeFrameNotification // 键盘框架更改后立即发布的通知
]

// 应用生命周期
static let appLifecycleNotifications: [Notification.Name] = [
    UIApplication.didEnterBackgroundNotification,// 当应用程序进入后台时发布的通知。
    UIApplication.willEnterForegroundNotification, // 在应用程序离开后台状态成为活动应用程序之前不久发布的通知。
    UIApplication.didFinishLaunchingNotification,// 应用程序启动完成后立即发布的通知
    UIApplication.didBecomeActiveNotification,// 当应用程序处于活动状态时发布的通知
    UIApplication.willResignActiveNotification,// 该应用程序不再活跃并失去焦点时发布的通知
    UIApplication.willTerminateNotification, // 当应用程序即将终止时发布的通知
    UIApplication.protectedDataWillBecomeUnavailableNotification, // 一份通知，即在受保护文件被锁定并变得无法访问之前发帖。
    UIApplication.significantTimeChangeNotification,// significantTimeChangeNotification
    UIApplication.backgroundRefreshStatusDidChangeNotification, // 当应用程序在后台下载内容的状态更改时，该通知发布。
    UIApplication.protectedDataDidBecomeAvailableNotification,// 当受保护的文件可供您的代码访问时，会发布通知。
    UIApplication.userDidTakeScreenshotNotification // 当某人在设备上截屏时发布的通知
]

// 设备相关
static let deviceNotifications: [Notification.Name] = [
    UIDevice.orientationDidChangeNotification,// 当设备的方向发生变化时发布通知。
    UIDevice.batteryLevelDidChangeNotification,// 电池电量发生变化时发布的通知。
    UIDevice.batteryStateDidChangeNotification, // 电池状态发生变化时发布的通知。
    UIDevice.proximityStateDidChangeNotification // 当距离传感器的状态发生变化时发布的通知。
]

// 内存警告
static let memoryNotifications: [Notification.Name] = [
    UIApplication.didReceiveMemoryWarningNotification
]

// 语言和地区变化
static let localeNotifications: [Notification.Name] = [
    NSLocale.currentLocaleDidChangeNotification
]
```
