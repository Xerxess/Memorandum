<!-- TOC -->

- [UIImageView](#uiimageview)
- [Understanding How Images Are Scaled 了解图像是如何缩放的](#understanding-how-images-are-scaled-了解图像是如何缩放的)
- [Determining the Final Transparency of the Image 确定图像的最终透明度](#determining-the-final-transparency-of-the-image-确定图像的最终透明度)
- [Animating a Sequence of Images 为一系列图像制作动画](#animating-a-sequence-of-images-为一系列图像制作动画)
- [Responding to Touch Events 应对触摸事件](#responding-to-touch-events-应对触摸事件)
- [Tips for Improving Performance 提高绩效的技巧](#tips-for-improving-performance-提高绩效的技巧)
- [API](#api)
    - [Creating an Image View](#creating-an-image-view)
    - [Accessing the Displayed Images 访问显示的图像](#accessing-the-displayed-images-访问显示的图像)
    - [Animating a Sequence of Images 为一系列图像制作动画](#animating-a-sequence-of-images-为一系列图像制作动画-1)
    - [Configuring the Image View 配置图像视图](#configuring-the-image-view-配置图像视图)
    - [Managing Focus-Related Behaviors 管理与焦点相关的行为](#managing-focus-related-behaviors-管理与焦点相关的行为)
    - [Layering Content on Top of the Image View 在图像视图顶部分层内容](#layering-content-on-top-of-the-image-view-在图像视图顶部分层内容)

<!-- /TOC -->

# UIImageView

在界面中显示单个图像或一系列动画图像的对象。

UIImageView允许您高效地绘制可以使用UIImage对象指定的任何图像。  
例如，您可以使用UIImageView类来显示许多标准图像文件的内容，例如`JPEG`和`PNG`文件。您可以以编程方式或在故事板文件中配置图像视图，并更改它们在运行时显示的图像。  
对于动画图像，您还可以使用此类的方法开始和停止动画，并指定其他动画参数。

```swift
@MainActor class UIImageView : UIView
```

# Understanding How Images Are Scaled 了解图像是如何缩放的

图像视图使用其`contentMode`属性和图像本身的配置来确定如何显示图像。  
最好指定尺寸与图像视图尺寸完全匹配的图像，但图像视图`可以缩放图像以适应全部或部分可用空间`。  
如果图像视图本身的大小发生变化，它会根据需要自动缩放图像。

对于没有大写入集的图像，图像的呈现完全由图像视图的contentMode属性决定。  
`UIView.ContentMode.scaleAspectFit`和`UIView.ContentMode.scaleAspectFill`模式缩放图像以适应或填充空间，`同时保持图像的原始宽高比`。  
`UIView.ContentMode.scaleToFill`值在不考虑原始宽高比的情况下缩放图像，这可能会`导致图像显得失真`。  
其他内容模式将图像放置在图像视图边界的适当位置，而无需缩放。

对于带有大写入位的可调整大小的图像，这些嵌入会影响图像的最终外观。具体来说，大写入定义了图像的哪些部分可以缩放，以及朝哪个方向缩放。  
您可以使用UIImage的`resizableImage（withCapInsets:resizingMode:）`方法创建可拉伸的可调整大小的图像。  
使用这种类型的图像时，您通常会将图像视图的内容模式设置为UIView.ContentMode.scaleToFill，以便图像在适当的位置伸展并填充图像视图的边界。

# Determining the Final Transparency of the Image 确定图像的最终透明度

图像被合成到图像视图的背景上，然后合成到窗口的其余部分。  
图像中的任何透明度都允许图像视图的背景显示。同样，图像背景的任何进一步透明度都取决于图像视图的透明度及其显示的UIImage对象的透明度。  
当图像视图及其图像都具有透明度时，图像视图使用alpha混合将两者结合起来。

- 图像被合成到图像视图的背景上。
- 如果图像视图的 isOpaque 属性为true，则图像的像素将复合在图像视图的背景颜色之上，图像视图的alpha属性将被忽略。
- 如果图像视图的 isOpaque 属性为 false，则每个像素的 alpha 值乘以图像视图的 alpha 值，结果值将成为该像素的实际透明度值。如果图像没有alpha通道，则假设每个像素的alpha值为1.0。

# Animating a Sequence of Images 为一系列图像制作动画

图像视图可以存储动画图像序列，并播放该序列的全部或部分。  
您将图像序列指定为UIImage对象数组，并将其分配给动画图像属性。  
分配后，您可以使用该类的方法和属性来配置动画计时，并开始和停止动画。

显示一系列动画图像时，请考虑以下提示：
- 序列中的所有图像都应具有相同的大小。当需要缩放时，图像视图会分别缩放序列中的每张图像。如果图像尺寸不同，缩放可能不会产生您想要的结果。
- 序列中的所有图像都应使用相同的内容缩放因子。确保每张图像的缩放属性包含相同的值。

# Responding to Touch Events 应对触摸事件

`默认情况下，图像视图会忽略用户事件`。  
通常，您仅使用图像视图在界面中显示视觉内容。如果您希望图像视图也处理用户交互，请将其`isUserInteractionEnabled`属性的值更改为true。完成后，您可以附加手势识别器或使用任何其他事件处理技术来响应触摸事件或其他用户发起的事件。

# Tips for Improving Performance 提高绩效的技巧

`图像缩放和alpha混合是两个相对昂贵的操作，可能会影响应用程序的性能`。  
为了最大限度地提高图像视图代码的性能，请考虑以下提示：

- 缓存常用图像的缩放版本。如果您希望某些大图像经常显示在缩放缩略图视图中，请考虑提前创建缩放图像并将其存储在缩略图缓存中。这样做可以减轻每个图像视图单独缩放的需求。
- 使用大小接近图像视图大小的图像。与其将大图像分配给图像视图，而是创建了一个与图像视图当前大小相匹配的缩放版本。您还可以使用UIImage.ResizingMode.tile选项创建一个可调整大小的图像对象，该选项会平铺图像而不是缩放图像。
- 尽可能使您的图像视图不透明。除非您故意处理包含透明度的图像（例如绘制UI元素），否则请确保图像视图的 isOpaque 属性设置为true。有关如何确定透明度的更多信息，请参阅确定图像的最终透明度。

# API

## Creating an Image View

```swift
init(image: UIImage?)
init(image: UIImage?, highlightedImage: UIImage?)
```

## Accessing the Displayed Images 访问显示的图像

```swift
// 图像视图中显示的图像。
// 此属性包含图像视图显示的主要图像。
// 当图像视图处于自然状态时，会显示此图像。
// 高亮显示时，图像视图会在其高亮显示的图像属性中显示图像。
// 如果该属性设置为nil，则图像视图将默认高亮显示应用于此图像。
// 如果动画图像属性包含一组有效的图像，则使用这些图像。
// 更改此属性中的图像不会自动更改图像视图的大小。
// 设置图像后，调用sizeToFit()方法，根据新图像和活动约束重新计算图像视图的大小。
// 此属性设置为您在初始化时指定的图像。如果您没有使用init(image:)或init(image:highlightedImage:)方法来初始化图像视图，则此属性的初始值为nil。
var image: UIImage? { get set }

// 图像视图中显示的突出显示的图像。
var highlightedImage: UIImage? { get set }
```

## Animating a Sequence of Images 为一系列图像制作动画

```swift
// 用于动画的UIImage对象数组。
// 数组必须包含UIImage对象。您可以在数组中多次使用相同的图像对象。将此属性设置为nil以外的值将隐藏由图像属性表示的图像。
// 默认情况下，此属性的值为nil。
var animationImages: [UIImage]? { get set }

// 突出显示视图时用于动画的UIImage对象数组。
var highlightedAnimationImages: [UIImage]? { get set }

// 经历一个周期图像所需的时间。
// 时间持续时间以秒为单位。
// 默认值为0.0，这导致图像视图使用的持续时间等于图像数量乘以1/30秒。因此，如果您有30张图像，持续时间将是1秒。
var animationDuration: TimeInterval { get set }

// 指定重复动画的次数。
// 默认值为0，指定无限期重复动画。
var animationRepeatCount: Int { get set }

// 开始为接收器中的图像动画。
func startAnimating()

// 停止为接收器中的图像动画。
func stopAnimating()

// 返回一个布尔值，指示动画是否正在运行。
var isAnimating: Bool { get }
```

## Configuring the Image View 配置图像视图

```swift
// 一个布尔值，用于确定用户事件是否被忽略并从事件队列中删除。
// 此属性是从UIView父类继承的。
// 默认值更改为false。
var isUserInteractionEnabled: Bool { get set }

// 确定图像是否高亮显示的布尔值。
// 此属性决定使用常规图像还是突出显示的图像。
// 当isHighlighted设置为true时，非动画图像将使用高亮图像属性，动画图像将使用高亮显示的动画图像。
// 如果这两个属性都设置为nil，或者如果 isHighlighted 设置为 false，它将使用 image 和 animationImages 属性。
var isHighlighted: Bool { get set }

// 用于在视图层次结构中着色模板图像的颜色。
// 默认值为nil。
// 如果指定了非零值，则颜色将应用于附加到图像视图的任何模板图像。
var tintColor: UIColor! { get set }
```

## Managing Focus-Related Behaviors 管理与焦点相关的行为

```swift
// 允许UIImageView在祖先聚焦时做出响应。
// 当此属性的值为true且图像视图的祖先对焦时，图像视图使用聚焦FrameGuide属性调整其图像的帧。
// 默认值为false。
var adjustsImageWhenAncestorFocused: Bool { get set }

// 图像视图聚焦时使用的布局指南。
var focusedFrameGuide: UILayoutGuide

// 一个布尔值，指示浮动聚焦外观是否使用图像的alpha通道。
// 使用多层图像或使用完全不透明的图像时，请将此属性设置为false。仅当图像视图包含具有透明度的单层图像时，才将此属性设置为true。
// 当设置为true时，系统使用图像的alpha通道来创建适当的浮动聚焦外观。例如，系统根据图像的alpha通道屏蔽阴影。
var masksFocusEffectToContents: Bool { get set }
```

## Layering Content on Top of the Image View 在图像视图顶部分层内容

```swift
// 在图像视图顶部托管分层内容的视图。
// 使用此视图托管您想要分层在图像视图顶部的内容。
// 默认情况下，此属性中的视图将其子视图剪辑到其边界矩形，但您可以使用clipsToBounds属性更改该行为。
var overlayContentView: UIView { get }
```
