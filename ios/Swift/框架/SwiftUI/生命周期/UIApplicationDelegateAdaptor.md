

# UIApplicationDelegateAdaptor

https://developer.apple.com/documentation/swiftui/uiapplicationdelegateadaptor

UIApplicationDelegateAdaptor 是 SwiftUI 中的一个属性包装器，它允许您将传统的 UIKit 应用程序代理模式与 SwiftUI 的现代应用生命周期集成。当您需要与基于 UIKit 的框架保持兼容性或实现需要 UIApplicationDelegate 方法的功能时，这个包装器特别有用。

```swift
class MyAppDelegate: NSObject, UIApplicationDelegate, ObservableObject {
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        // Record the device token.
    }
}

@main
struct MyApp: App {
    @UIApplicationDelegateAdaptor private var appDelegate: MyAppDelegate
    var body: some Scene { ... }
}
```