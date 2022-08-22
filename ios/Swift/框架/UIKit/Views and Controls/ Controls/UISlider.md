<!-- TOC -->

- [UISlider](#uislider)
- [API](#api)
    - [Accessing the slider’s value 访问滑块的值](#accessing-the-sliders-value-访问滑块的值)
    - [Accessing the slider’s value limits 访问滑块的值限制](#accessing-the-sliders-value-limits-访问滑块的值限制)
    - [Modifying the slider’s behavior 修改滑块的行为](#modifying-the-sliders-behavior-修改滑块的行为)
    - [Changing the slider’s appearance 更改滑块的外观](#changing-the-sliders-appearance-更改滑块的外观)
    - [Overrides for subclasses  子类的重写](#overrides-for-subclasses--子类的重写)

<!-- /TOC -->

# UISlider

从连续值范围中选择单个值的控件。

当您移动滑块的拇指时，它会将其更新的值传递给附加到它的任何操作。  
滑块的外观是可配置的；您可以对轨道和拇指进行着色，并提供图像显示在滑块的末端。您可以以编程方式或使用Interface Builder将滑块添加到界面中。

下图显示了用于在从左到右配置中描述UISlider对象组成部分的术语。

```swift
@MainActor class UISlider : UIControl
```

# API 

## Accessing the slider’s value 访问滑块的值

```swift
// 滑块的当前值。
// 使用此属性获取和设置滑块的当前值。要渲染从当前值到新值的动画过渡，请使用setValue(_:animated:)方法。
// 如果您尝试设置低于最小值或高于最大值的值，则改为设置最小值或最大值。
// 默认值为0.0。
var value: Float { get set }

// 设置滑块的当前值，允许您在视觉上为更改添加动画。
func setValue(Float, animated: Bool)

```

## Accessing the slider’s value limits 访问滑块的值限制

```swift
// 滑块的最小值。
// 使用此属性设置滑块前端表示的值。如果您更改此属性的值，并且滑块的当前值低于新的最小值，滑块将调整值属性以匹配新的最小值。
// 如果您将最小值设置为大于最大值，滑块将最大值更新为等于最小值。
// 默认值为0.0。
var minimumValue: Float { get set }

// 滑块的最大值。
// 使用此属性设置滑块后端表示的值。如果您更改此属性的值，并且滑块的当前值高于新最大值，滑块将调整值属性以匹配新最大值。
// 如果您将最大值设置为小于最小值，滑块将更新最小值以等于最大值。
// 默认值为1.0。
var maximumValue: Float { get set }
```

## Modifying the slider’s behavior 修改滑块的行为

```swift
// 一个布尔值，指示滑块值的变化是否会产生持续更新事件。
// 如果为真，当用户移动拇指时，滑块会反复触发关联目标的操作方法。如果为false，当用户松开滑块的拇指控件以设置最终值时，滑块只会触发一次关联的操作方法。
// 默认值为true。
var isContinuous: Bool { get set }

// 决定滑块行为的样式。
// 当首选BehavioralStyle是UIBehavioralStyle.automatic时，使用此属性确定实际行为风格。
var behavioralStyle: UIBehavioralStyle { get }

// 首选的行为风格。
var preferredBehavioralStyle: UIBehavioralStyle { get set }
```

## Changing the slider’s appearance 更改滑块的外观

```swift
// 表示滑块最小值的图像。
// 您指定的图像必须适合最小ValueImageRect（forBounds:）方法返回的边界矩形中。如果没有，滑块会缩放图像以适应。此外，滑块根据需要延长或缩短其轨道，以容纳其边界矩形中的图像。
// 由于最小值是一个语义概念，在从右到左的用户界面中，滑块会自动翻转图像位置，始终将其放置在滑块轨道的前端。
// 默认值为nil。
var minimumValueImage: UIImage? { get set }

// 表示滑块最大值的图像。
var maximumValueImage: UIImage? { get set }

// 用于着色默认最小轨道图像的颜色。
// 设置此属性会将最小轨道图像重置为滑块的默认图像；滑块会释放任何自定义图像。
// 将此属性设置为零会将色调重置为默认颜色，并删除任何自定义最小轨道图像。
var minimumTrackTintColor: UIColor? { get set }

// 目前用于渲染滑块的最小轨道图像。
var currentMinimumTrackImage: UIImage?

// 返回与指定控制状态关联的最小轨道图像。
func minimumTrackImage(for state: UIControl.State) -> UIImage?

// 将最小轨道图像分配给指定的控制状态。
func setMinimumTrackImage(UIImage?, for: UIControl.State)

// 用于着色默认最大轨道图像的颜色。
var maximumTrackTintColor: UIColor? { get set }

// 包含当前用于渲染滑块的最大轨道图像。
var currentMaximumTrackImage: UIImage?

// 返回与指定控制状态关联的最大轨道图像。
func maximumTrackImage(for: UIControl.State) -> UIImage?

// 将最大轨道映像分配给指定的控制状态。
func setMaximumTrackImage(UIImage?, for: UIControl.State)

// 用于着色默认拇指图像的颜色。
var thumbTintColor: UIColor? { get set }

// 目前用于渲染滑块的拇指图像。
var currentThumbImage: UIImage?

// 返回与指定控制状态关联的拇指图像。
func thumbImage(for: UIControl.State) -> UIImage?

// 将拇指图像分配给指定的控制状态。
func setThumbImage(UIImage?, for: UIControl.State)

```

## Overrides for subclasses  子类的重写

```swift
// 返回最大值图像的绘图矩形。
func maximumValueImageRect(forBounds: CGRect) -> CGRect

// 返回最小值图像的绘图矩形。
func minimumValueImageRect(forBounds: CGRect) -> CGRect

// 返回滑块轨道的绘图矩形。
func trackRect(forBounds: CGRect) -> CGRect

// 返回滑块拇指图像的绘图矩形。
func thumbRect(forBounds: CGRect, trackRect: CGRect, value: Float) -> CGRect
```