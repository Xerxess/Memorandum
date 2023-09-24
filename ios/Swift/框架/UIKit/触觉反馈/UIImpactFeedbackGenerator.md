# UIImpactFeedbackGenerator

一个具体的反馈生成器子类，用于创建触觉来模拟物理影响。

```swift
@MainActor
class UIImpactFeedbackGenerator : UIFeedbackGenerator
```

# Topics

## Initializing the feedback generator 初始化反馈生成器

```swift
//
// UIImpactFeedbackGenerator.FeedbackStyle
// case heavy 大型、重型用户界面元素之间的碰撞。
// case light 小而轻的用户界面元素之间的碰撞。
// case medium 中等大小的用户界面元素之间的碰撞。
// case rigid 刚性、表现出少量压缩或弹性的用户界面元素之间的碰撞。
// case soft 柔软的用户界面元素之间的碰撞，表现出大量的压缩或弹性。
init(style: UIImpactFeedbackGenerator.FeedbackStyle)
```

## Reporting impacts 报告影响

```swift
// 触发影响反馈。
func impactOccurred()

// 以特定强度触发影响反馈。
// intensity A CGFloat value between 0.0 and 1.0.
func impactOccurred(intensity: CGFloat)
```

# demo

```swift
// 创建冲击式触觉反馈生成器
let feedbackGenerator = UIImpactFeedbackGenerator(style: .medium)

// 准备触觉反馈
feedbackGenerator.prepare()

// 触发冲击式触觉反馈
feedbackGenerator.impactOccurred()
```