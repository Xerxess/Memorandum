# UISelectionFeedbackGenerator

一个具体的反馈生成器子类，用于创建触觉来指示选择的变化。
它可以用来模拟用户界面元素的选择或交互操作。

```swift
@MainActor
class UISelectionFeedbackGenerator : UIFeedbackGenerator
```

# Topics

## Reporting selection changes

```swift
// 触发选择反馈。
func selectionChanged()
```