<!-- TOC -->

- [UIProgressView](#uiprogressview)
- [API](#api)
    - [Initializing the UIProgressView Object](#initializing-the-uiprogressview-object)
    - [Managing the Progress Bar 管理进度条](#managing-the-progress-bar-管理进度条)
    - [Configuring the Progress Bar](#configuring-the-progress-bar)

<!-- /TOC -->

# UIProgressView

一种描述任务随着时间的推移而取得的进展的观点。

UIProgressView类提供了用于管理进度条样式以及获取和设置固定在任务进度上的值的属性。  
对于不确定的进度指标，或者非正式的“旋转器”，使用UIActivityIndicatorView类的实例。

```swift
@MainActor class UIProgressView : UIView
```

# API 

## Initializing the UIProgressView Object

```swift
init(progressViewStyle: UIProgressView.Style)
init(frame: CGRect)
init?(coder: NSCoder)
```

## Managing the Progress Bar 管理进度条

```swift
// 接收方显示的当前进度。
// 当前的进度由0.0和1.0之间的浮点值表示，其中1.0表示任务的完成。
// 默认值为0.0。
// 小于0.0和大于1.0的值被固定在这些限制上。
var progress: Float { get set }

// 调整接收器显示的当前进度，可选地为更改添加动画效果。
func setProgress(Float, animated: Bool)

// 用于更新进度视图的进度对象。
// 设置此属性后，进度视图使用从进度对象收到的信息自动更新其进度值。（进度更新是动画的。）
// 当您想手动更新进度时，请将属性设置为nil。此属性的默认值为nil。
var observedProgress: Progress?

```

## Configuring the Progress Bar

```swift
// 接收器的当前图形样式。
// 此属性的值是一个常量，用于指定进度视图的样式。
// 默认样式是UIProgressView.Style.default。
// enum Style
// case `default` The standard progress-view style. This is the default.
// case bar 工具栏中使用的进度视图样式。
var progressViewStyle: UIProgressView.Style { get set }

// 填充进度条部分显示的颜色。
var progressTintColor: UIColor? { get set }

// 用于填充进度条部分的图像。
// 如果您提供自定义映像，则会忽略 progressTintColor 属性。
var progressImage: UIImage? { get set }

// 进度条中未填充的部分显示的颜色。
var trackTintColor: UIColor? { get set }

// 用于未填充轨道部分的图像。
var trackImage: UIImage? { get set }

```