<!-- TOC -->

- [UISwitch](#uiswitch)
- [API](#api)
    - [Initializing the Switch Object](#initializing-the-switch-object)
    - [Setting the Off/On State](#setting-the-offon-state)
    - [Setting the Display Style 设置显示样式](#setting-the-display-style-设置显示样式)
    - [Customizing the Appearance of the Switch 自定义开关的外观](#customizing-the-appearance-of-the-switch-自定义开关的外观)

<!-- /TOC -->

# UISwitch

提供二进制选择的控件，例如开/关。

```swift
@MainActor class UISwitch : UIControl
```

# API

## Initializing the Switch Object

```swift
init(frame: CGRect)
init?(coder: NSCoder)
```

## Setting the Off/On State

```swift
// 确定交换机关闭/打开状态的布尔值。
// 此属性允许您检索和设置（无动画）确定UISwitch对象是打开还是关闭的值。
var isOn: Bool { get set }

// 将开关的状态设置为打开或关闭，可以选择为过渡添加动画效果。
func setOn(Bool, animated: Bool)

```

## Setting the Display Style 设置显示样式

```swift
// 开关的首选显示样式。
// 使用此属性指定您喜欢的显示样式。
// 如果样式发生变化，交换机可能会生成布局通行证来更新显示器。
// 默认样式是UISwitch.Style.automatic。
// enum Style : Int, @unchecked Sendable
// case automatic 一种样式，表明系统根据当前的用户界面成语选择交换机的外观。
// case checkbox 一种样式，表示开关显示为Mac风格的复选框。
// case sliding 一种样式，指示开关显示为开/关滑块。
var preferredStyle: UISwitch.Style { get set }

// 开关的显示样式。
// 此属性返回基于用户界面成语的解析样式，永远不会返回UISwitch.Style.automatic。
var style: UISwitch.Style { get }

// 显示在checkbox-style复选框样式开关旁边的标题。
var title: String?

```

## Customizing the Appearance of the Switch 自定义开关的外观

```swift
// 当开关处于打开位置时，用于着色开关外观的颜色。
var onTintColor: UIColor? { get set }

// 用来着色拇指外观的颜色。
var thumbTintColor: UIColor?

// 在iOS 6及更低版本中，当开关处于打开位置时，图像会显示。
var onImage: UIImage?

// 在 iOS 6 及更低版本中，开关处于关闭位置时会显示图像。
var offImage: UIImage?

```