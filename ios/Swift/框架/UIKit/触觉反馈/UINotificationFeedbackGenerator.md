# UINotificationFeedbackGenerator

一个具体的反馈生成器子类，创建触觉来传达成功、失败和警告。

```swift
@MainActor
class UINotificationFeedbackGenerator : UIFeedbackGenerator
```

# Topics

## Initializing the feedback generator

```swift
// 触发通知反馈。
// enum FeedbackType : Int, @unchecked Sendable
// case error
// case success
// case warning
func notificationOccurred(_ notificationType: UINotificationFeedbackGenerator.FeedbackType)
```
