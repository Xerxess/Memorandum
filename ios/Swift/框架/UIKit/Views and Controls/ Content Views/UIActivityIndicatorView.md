<!-- TOC -->

- [UIActivityIndicatorView](#uiactivityindicatorview)
- [API](#api)
    - [Initializing an Activity Indicator](#initializing-an-activity-indicator)
    - [Managing an Activity Indicator 管理活动指示器](#managing-an-activity-indicator-管理活动指示器)
    - [Configuring the Activity Indicator Appearance 配置活动指标外观](#configuring-the-activity-indicator-appearance-配置活动指标外观)

<!-- /TOC -->

# UIActivityIndicatorView

显示任务正在进行中的视图。 
俗称：转圈圈

您可以通过调用startAnimating()和stopAnimating()方法来控制活动指示器何时动画。  
要在动画停止时自动隐藏活动指示器，请将hidesWhenStopped属性设置为true。

您可以使用 `color` 属性来设置活动指示器的颜色。

```swift
@MainActor class UIActivityIndicatorView : UIView
```

# API

## Initializing an Activity Indicator

```swift
init(style: UIActivityIndicatorView.Style)
init(frame: CGRect)
init(coder: NSCoder)
```

## Managing an Activity Indicator 管理活动指示器

```swift
// 开始进度指示器的动画。
// 当进度指示器动画时，齿轮旋转以指示不确定的进度。
// 该指标是动画的，直到调用stopAnimating()。
func startAnimating()

// 停止进度指示器的动画。
func stopAnimating()

// 一个布尔值，指示活动指示器当前是否正在运行其动画。
var isAnimating: Bool { get }

// 一个布尔值，用于控制动画停止时接收器是否被隐藏。
// 如果此属性的值为true（默认值），则当接收器不动画时，接收器将其是隐藏属性（UIView）设置为true。
// 如果hidesWhenStopped属性为false，则当动画停止时，接收器不会隐藏。
// 可以使用stopAnimating()方法停止动画进度指示器。
var hidesWhenStopped: Bool { get set }
```

## Configuring the Activity Indicator Appearance 配置活动指标外观

```swift
// 活动指标的基本外观。
// 默认值为UIActivityIndicatorView.Style.medium。
// enum Style : Int, @unchecked Sendable
// case large 大型风格的指标。
// case medium 默认活动指示器样式。
var style: UIActivityIndicatorView.Style { get set }

// 活动指示器的颜色。
// 如果您为活动指示器设置了颜色，它将覆盖 style 属性提供的颜色。
var color: UIColor! { get set }
```