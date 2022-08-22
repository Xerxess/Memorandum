<!-- TOC -->

- [UIStepper](#uistepper)
- [API](#api)
    - [Configuring the Stepper](#configuring-the-stepper)
    - [Accessing the Stepper’s Value](#accessing-the-steppers-value)
    - [Customizing Appearance 自定义外观](#customizing-appearance-自定义外观)

<!-- /TOC -->

# UIStepper

增量或减量值的控件。

```swift
@MainActor class UIStepper : UIControl
```

# API

## Configuring the Stepper 

```swift
// 一个布尔值，用于确定是在用户交互期间还是在用户交互结束后发送值更改。
// 如果为true，步进器会在用户交互期间值发生变化时立即发送值更改事件。如果为false，步进器会在用户交互结束后发送值更改事件。
// 默认值为true。
var isContinuous: Bool { get set }

// 一个布尔值，用于确定是否在用户按下并按住步进按钮时重复更改步进器值。
// 如果为true，按住步进器的用户会反复更改值。
// 默认值为true。
var autorepeat: Bool { get set }

// 一个布尔值，用于确定步进器在增量和递减值时是否可以将其值包装为最小值或最大值。
// 如果为true，超过maxincrementValue将值设置为最小值；同样，低于maxinvalue的递减将值设置为maxinvalue。
// 如果为false，步进器不会增量超过最大值，也不会减少到最低值以下，而是保持这些值。
// 默认值为false。
var wraps: Bool { get set }

// 步进器的最低数字值。
var minimumValue: Double { get set }

// 步进器的最高数字值。
var maximumValue: Double { get set }

// 步进器的步进值或增量值。
var stepValue: Double { get set }


```

## Accessing the Stepper’s Value 

```swift
// 步进器的数字值。
var value: Double { get set }

```

## Customizing Appearance 自定义外观

```swift
// 返回与指定控制状态关联的背景图像。
func backgroundImage(for: UIControl.State) -> UIImage?

// 当控件处于指定状态时，为其设置背景图像。
func setBackgroundImage(UIImage?, for: UIControl.State)

// 返回用于控件的递减字形的图像。
func decrementImage(for: UIControl.State) -> UIImage?

// 将图像设置为控件的递减字形。
func setDecrementImage(UIImage?, for: UIControl.State)

// 返回给定的左右状态组合的分隔图像。
func dividerImage(forLeftSegmentState: UIControl.State, rightSegmentState: UIControl.State) -> UIImage?

// 设置用于给定的左侧和右侧状态组合的图像。
func setDividerImage(UIImage?, forLeftSegmentState: UIControl.State, rightSegmentState: UIControl.State)

// 返回用于控件增量字形的图像。
func incrementImage(for: UIControl.State) -> UIImage?

// 设置用于控件增量字形的图像
func setIncrementImage(UIImage?, for: UIControl.State)

```