
# Gesture Recognizer State Machine 手势识别器状态机

https://developer.apple.com/documentation/uikit/about-the-gesture-recognizer-state-machine

- 实现自定义手势识别器时，必须在适当的时机更新其状态机。
- 手势识别器始终以 `.possible` 状态启动，该状态表示它已准备好开始处理事件。

```swift
UIGestureRecognizer.State

// 手势识别器尚未识别其手势，但可能正在评估触摸事件。
case possible

// 手势识别器已接收到识别为连续手势的触摸对象。
case began

// 手势识别器已收到识别为连续手势的更改的触摸。
case changed

// 手势识别器已收到被识别为连续手势结束的触摸。
case ended

// 手势识别器已收到触摸，导致连续手势被取消。
case cancelled

// 手势识别器收到了一个多点触控序列，它无法将其识别为手势。
case failed

// 手势识别器收到了多点触控序列，将其识别为手势。
static var recognized: UIGestureRecognizer.State

```

## 离散手势识别器的状态转换管理

- 实现离散手势识别器时，您需要将 state 属性更改为以下两个值之一：
  - UIGestureRecognizer.State.ended
  - UIGestureRecognizer.State.failed

## 管理连续手势识别器的状态转换

- 状态转换可以分为三个主要阶段
  - 初始事件序列将手势识别器移动到 .began 或 .failed 状态。
  - 后续事件将手势识别器移至 .changed 或 .cancelled 状态。
  - 最终事件将手势识别器移至 .ended 状态。
