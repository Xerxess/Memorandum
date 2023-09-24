# UIFeedbackGenerator

所有反馈生成器的抽象超类。

```swift
@MainActor
class UIFeedbackGenerator : NSObject
```

不要自己子类或创建该类的实例。相反，实例化提供的具体子类之一：

* UIImpactFeedbackGenerator。使用影响反馈生成器来指示已发生影响。例如，当用户界面对象与某物碰撞或卡入到位时，您可能会触发影响反馈。
* UISelectionFeedbackGenerator。使用选择反馈生成器来指示选择的变化。
* UINotificationFeedbackGenerator。使用通知反馈生成器来指示成功、失败和警告。

# Topics

## Preparing to generate feedback 准备生成反馈

```swift
// 准备生成器来触发反馈。
// 用于准备触觉反馈的生成器。调用 prepare() 方法会预加载触觉反馈的资源，以便在稍后调用触发方法时能够更快地响应。
// 该方法是一个异步操作，它会预加载触觉资源并准备产生触觉反馈的硬件。一般建议在触发实际的触觉反馈之前先调用 prepare() 方法，以确保反馈效果能够立即触发。
// 调用 prepare() 方法并不是必需的，但它有助于提高触觉反馈的响应速度。如果您在调用触发方法之前没有调用 prepare() 方法，系统将自动执行准备操作，但会导致稍微延迟一点的响应时间。
func prepare()
```
