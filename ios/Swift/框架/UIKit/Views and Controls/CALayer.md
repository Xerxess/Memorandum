<!-- TOC -->

- [CALayer](#calayer)
- [CALayer 与 UIView](#calayer-%E4%B8%8E-uiview)
- [API](#api)
    - [Creating a Layer](#creating-a-layer)
    - [Accessing Related Layer Objects 访问相关图层对象](#accessing-related-layer-objects-%E8%AE%BF%E9%97%AE%E7%9B%B8%E5%85%B3%E5%9B%BE%E5%B1%82%E5%AF%B9%E8%B1%A1)
    - [Accessing the Delegate](#accessing-the-delegate)
    - [Providing the Layer’s Content 提供图层的内容](#providing-the-layers-content-%E6%8F%90%E4%BE%9B%E5%9B%BE%E5%B1%82%E7%9A%84%E5%86%85%E5%AE%B9)
    - [Modifying the Layer’s Appearance 修改图层的外观](#modifying-the-layers-appearance-%E4%BF%AE%E6%94%B9%E5%9B%BE%E5%B1%82%E7%9A%84%E5%A4%96%E8%A7%82)
    - [Layer Filters 图层过滤器](#layer-filters-%E5%9B%BE%E5%B1%82%E8%BF%87%E6%BB%A4%E5%99%A8)
    - [Configuring the Layer’s Rendering Behavior 配置图层的渲染行为](#configuring-the-layers-rendering-behavior-%E9%85%8D%E7%BD%AE%E5%9B%BE%E5%B1%82%E7%9A%84%E6%B8%B2%E6%9F%93%E8%A1%8C%E4%B8%BA)
    - [Modifying the Layer Geometry  修改图层几何](#modifying-the-layer-geometry--%E4%BF%AE%E6%94%B9%E5%9B%BE%E5%B1%82%E5%87%A0%E4%BD%95)
    - [Managing the Layer’s Transform 管理图层的转换](#managing-the-layers-transform-%E7%AE%A1%E7%90%86%E5%9B%BE%E5%B1%82%E7%9A%84%E8%BD%AC%E6%8D%A2)
    - [Managing the Layer Hierarchy 管理图层层次结构](#managing-the-layer-hierarchy-%E7%AE%A1%E7%90%86%E5%9B%BE%E5%B1%82%E5%B1%82%E6%AC%A1%E7%BB%93%E6%9E%84)
    - [Updating Layer Display 更新图层显示](#updating-layer-display-%E6%9B%B4%E6%96%B0%E5%9B%BE%E5%B1%82%E6%98%BE%E7%A4%BA)
    - [Layer Animations](#layer-animations)
    - [Managing Layer Resizing and Layout 管理图层调整大小和布局](#managing-layer-resizing-and-layout-%E7%AE%A1%E7%90%86%E5%9B%BE%E5%B1%82%E8%B0%83%E6%95%B4%E5%A4%A7%E5%B0%8F%E5%92%8C%E5%B8%83%E5%B1%80)
    - [Managing Layer Constraints 管理图层约束](#managing-layer-constraints-%E7%AE%A1%E7%90%86%E5%9B%BE%E5%B1%82%E7%BA%A6%E6%9D%9F)
    - [Getting the Layer’s Actions 获取图层的操作](#getting-the-layers-actions-%E8%8E%B7%E5%8F%96%E5%9B%BE%E5%B1%82%E7%9A%84%E6%93%8D%E4%BD%9C)
    - [Mapping Between Coordinate and Time Spaces 坐标和时间空间之间的映射](#mapping-between-coordinate-and-time-spaces-%E5%9D%90%E6%A0%87%E5%92%8C%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E4%B9%8B%E9%97%B4%E7%9A%84%E6%98%A0%E5%B0%84)
    - [Hit Testing 点击测试](#hit-testing-%E7%82%B9%E5%87%BB%E6%B5%8B%E8%AF%95)
    - [Scrolling 上下滚动](#scrolling-%E4%B8%8A%E4%B8%8B%E6%BB%9A%E5%8A%A8)
    - [Identifying the Layer 识别图层](#identifying-the-layer-%E8%AF%86%E5%88%AB%E5%9B%BE%E5%B1%82)
    - [Key-Value Coding Extensions 键值编码扩展](#key-value-coding-extensions-%E9%94%AE%E5%80%BC%E7%BC%96%E7%A0%81%E6%89%A9%E5%B1%95)

<!-- /TOC -->

# CALayer

管理基于图像的内容并允许您对该内容执行动画的对象。

图层通常用于为视图提供备份存储，但也可以在没有视图的情况下用于显示内容。  
图层的主要工作是管理您提供的`视觉内容`，但图层本身具有可以设置的视觉属性，例如`背景颜色`、`边框`和`阴影`。  
除了管理视觉内容外，该层还维护有关其内容几何形状的信息（例如其`位置、大小和转换`），这些信息用于在屏幕上显示该内容。  
修改图层的属性是您在图层的内容或几何形状上启动动画的方式。  
图层对象通过采用CAMediaTiming协议封装图层及其动画的持续时间和节奏，该协议定义了图层的计时信息。

```swift
class CALayer : NSObject
```

# CALayer 与 UIView

- CALayer 是一个轻量级的绘图类，用于视图的可见内容绘制和动画。  
- UIView 是对 CALayer 的高级封装，提供了视图层次结构、布局、约束、用户交互和动画等更高级别的功能。  

在开发 iOS 应用程序时，通常会直接使用 UIView，并且在需要直接操作底层图层的情况下，可以通过 UIView 的 layer 属性访问关联的 CALayer 对象。

- 高级封装： UIView 是对 CALayer 的高级封装。在创建 UIView 对象时，系统会自动创建一个关联的 CALayer 对象，并将其设置为 UIView 的图层。
- 视图层次结构： UIView 支持层次结构，您可以将多个视图嵌套在一起形成视图层次。每个视图都有一个关联的 CALayer 对象，它们一起组成视图层次结构。层次结构的管理使得视图可以相对于父视图进行布局和变换。
- 布局和约束： UIView 提供了更高级别的布局和约束功能，例如自动布局（Auto Layout）和栈视图（Stack View）。这些功能使得视图可以根据约束自动调整大小和位置，并处理动态内容的变化。
- 用户交互： UIView 提供了处理用户交互的能力，例如触摸事件处理、手势识别等。CALayer 本身并不处理用户交互，它更专注于视觉效果和动画。
- 动画： CALayer 提供了一套强大的动画机制，可以对图层的属性进行动画处理。UIView 利用 CALayer 的动画功能，提供了更高级别的动画接口，使得动画的创建和处理更加简单和直观。

# API

## Creating a Layer

```swift
init()
init(layer: Any)
init(remoteClientId: UInt32)
```

## Accessing Related Layer Objects 访问相关图层对象

```swift
// 返回表示层对象的副本，该对象表示当前屏幕上显示的图层状态。
// 此方法返回的图层对象提供了当前显示在屏幕上的图层的近似值。在动画过程中，您可以检索此对象，并使用它来获取这些动画的当前值。
// 返回层的子层、掩码和超级层属性从表示树（而不是模型树）返回相应的对象。
// 此模式也适用于任何只读图层方法。例如，返回对象的hitTest(_:)方法查询表示树中的图层对象。
func presentation() -> Self?

// 返回与接收器关联的模型层对象（如果有的话）。
// 在表示树的图层上调用此方法返回模型树中的相应图层对象。
// 仅当涉及对演示层进行更改的事务时，此方法才会返回值。如果没有进行事务，则调用此方法的结果将未定义。
func model() -> Self
```

## Accessing the Delegate

```swift
// 图层的委托对象。
var delegate: CALayerDelegate?
```

## Providing the Layer’s Content 提供图层的内容

```swift
// 提供图层内容的对象。
// 可动画。
// 默认值为nil。
// 如果您正在使用该图层显示静态图像，则可以将此属性设置为包含要显示的图像的CGImage。（在macOS 10.6及更高版本中，您还可以将属性设置为NSImage对象。）在此属性分配值会导致图层使用您的映像，而不是创建单独的备份存储。
// 如果图层对象绑定到视图对象，您应该避免直接设置此属性的内容。视图和图层之间的相互作用通常会导致视图在后续更新期间替换此属性的内容。
var contents: Any? { get set }

// 单位坐标空间中的矩形，定义了图层内容中应该使用的部分。
// 可动画。
// 默认 (0.0, 0.0, 1.0, 1.0).
var contentsRect: CGRect { get set }

// 如果图层内容调整大小，定义了图层内容如何缩放的矩形。
// 可动画。
// 您可以使用此属性将图层的内容细分为3x3网格。
// 此属性中的值指定该网格中中心矩形的位置和大小。如果图层的内容重力属性设置为调整大小模式之一，则调整图层的大小会导致网格的每个矩形出现不同的缩放。中心矩形在两个维度上拉伸，顶部中心矩形和底部中心矩形仅水平拉伸，左中心矩形和右中心矩形仅垂直拉伸，四个角矩形根本不拉伸。
// 可以使用此技术使用三部分或九部分图像实现可拉伸的背景或图像。
// 默认情况下，此属性中的值设置为单位矩形（0.0,0.0）（1.0,1.0），这会导致整个图像在两个维度上缩放。如果您指定一个延伸到单位矩形之外的矩形，则结果是未定义的。您指定的矩形仅在contentRect属性应用于图像后才应用。
var contentsCenter: CGRect { get set }

// 重新加载此图层的内容。
// 不要直接调用此方法。
// 图层在适当的时候调用此方法来更新图层的内容。如果图层有一个委托对象，此方法会尝试调用委托的display(_:)方法，委托可以使用该方法来更新图层的内容。如果委托没有实现display(_:)方法，则此方法创建一个备份存储，并调用图层的draw(in:)方法用内容填充该备份存储。新的备份存储取代了图层之前的内容。
// 子类可以覆盖此方法，并使用它直接设置图层的内容属性。如果您的自定义图层子类以不同的方式处理图层更新，您可能会这样做。
func display()

// 使用指定的图形上下文绘制图层的内容。
// 默认实现本身不会进行任何绘图。
// 如果图层的委托实现了draw(_:in:)方法，则调用该方法进行实际绘图。
// 子类可以覆盖此方法，并使用它来绘制图层的内容。绘制时，所有坐标都应在逻辑坐标空间中的点中指定。
func draw(in ctx: CGContext)
```

## Modifying the Layer’s Appearance 修改图层的外观

```swift
// 接收器的不透明度。
// 可动画。
// 此属性的值必须在0.0（透明）到1.0（不透明）之间。超出该范围的值被夹在最小值或最大值。
// 默认值为1.0。
var opacity: Float { get set }

// 一个布尔值，指示是否显示图层。
// 可动画。
// 默认值为false。
var isHidden: Bool { get set }

// 一个布尔值，指示子层是否被剪切到图层的边界。
// 可动画。
// 当此属性的值为true时，Core Animation会创建一个与图层边界匹配的隐式裁剪掩码，并包含任何角半径效果。
// 设置true时才会圆角效果
// 如果还指定了掩码属性的值，则将两个掩码乘以获得最终掩码值。
// 默认值为false。
var masksToBounds: Bool { get set }

// 一个可选的图层，其alpha通道用于屏蔽图层的内容。
// 图层的alpha通道决定了图层的内容和背景显示的程度。
// 完全或部分不透明的像素允许底层内容显示，但完全透明的像素阻止该内容。
// 此属性的默认值为nil。
// 在配置遮罩时，请记住设置遮罩层的大小和位置，以确保它与遮罩的图层正确对齐。
var mask: CALayer? { get set }

// 一个布尔值，指示图层在面对查看器时是否显示其内容。
// 可动画。
// 当此属性中的值为false时，当图层远离查看器时，该层会隐藏其内容。
// 默认值为true。
var isDoubleSided: Bool { get set }

// 为图层背景绘制圆角时使用的半径。
// 可动画。
// 将半径设置为大于0.0的值会导致图层开始在其背景上绘制圆角。
// 默认情况下，角半径不适用于图层内容属性中的图像；
// 它仅适用于图层的背景颜色和边框。
// 然而，将 masksToBounds 属性设置为true会导致内容被剪切到圆角。
// 默认值为0.0。
var cornerRadius: CGFloat { get set }

var maskedCorners: CACornerMask { get set }

// 图层边框的宽度。
// 可动画。
// 当此值大于0.0时，图层使用当前borderColor值绘制边框。
// 边框由此属性中指定的值从接收方的边界中绘制。它在接收器的内容和子层上方合成，包括 cornerRadius 属性的影响。
// 默认值为0.0。
var borderWidth: CGFloat { get set }

// 图层边框的颜色。
// 可动画。
var borderColor: CGColor? { get set }

// 接收器的背景颜色。
// 可动画。
// 默认值为nil。
var backgroundColor: CGColor? { get set }

// 图层阴影的不透明度。
// 可动画。
// 此属性中的值必须在0.0（透明）到1.0（不透明）之间。
// 默认值为0.0。
var shadowOpacity: Float { get set }

// 用于渲染图层阴影的模糊半径（以点为单位）。
// 可动画。
// 默认值为3.0。
var shadowRadius: CGFloat { get set }

// 图层阴影的偏移量（以点为单位）。
// 可动画。
// 默认值为（0.0，-3.0）。
var shadowOffset: CGSize { get set }

// 图层阴影的颜色。
// 可动画。
// 默认值是不透明的黑色。
var shadowColor: CGColor? { get set }

// 图层阴影的形状。
// 可动画。
// 默认值为nil，这导致图层使用标准阴影形状。
// 如果您为此属性指定一个值，则图层将使用指定的路径而不是图层的复合alpha通道创建其阴影。您提供的路径定义了阴影的轮廓。它使用非零绕组规则和当前阴影颜色、不透明度和模糊半径填充。
var shadowPath: CGPath? { get set }

// 用于存储图层未显式定义的属性值的可选字典。
var style: [AnyHashable : Any]?

// 一个布尔值，指示是否允许该层执行边缘抗锯齿。
// 当值为true时，允许图层根据图层边缘AntialiasingMask属性中的值的要求，反锯齿其边缘。
// 默认值从主捆绑包的Info.plist文件中的布尔UIViewEdgeAntialiasing属性读取。
// 如果没有找到值，则默认值为false。
var allowsEdgeAntialiasing: Bool { get set }

// 一个布尔值，指示是否允许该层将自己复合为与其父层分开的组。
var allowsGroupOpacity: Bool { get set }
```

## Layer Filters 图层过滤器

```swift
// 一组核心图像过滤器，用于图层及其子层的内容。
// 可动画。
var filters: [Any]? { get set }
```

## Configuring the Layer’s Rendering Behavior 配置图层的渲染行为

```swift
// 一个布尔值，指示图层是否包含完全不透明的内容。
// 默认值为false。
// 如果您的应用程序绘制的完全不透明的内容来填充图层的边界，则将此属性设置为true可以让系统优化图层的渲染行为。具体来说，当图层为您的绘图命令创建备份存储时，Core Animation会省略该备份存储的alpha通道。这样做可以提高合成操作的性能。如果您将此属性的值设置为true，则必须用不透明的内容填充图层的边界。
var isOpaque: Bool { get set }

// 定义接收器边缘如何光栅化的位掩码。
var edgeAntialiasingMask: CAEdgeAntialiasingMask

// 返回一个布尔值，指示图层内容在渲染时是否被隐式翻转。
// 如果图层内容在渲染时被隐式翻转，则为true，如果未被隐式翻转，则为false。
// 默认情况下，此方法返回false。
// 此方法提供有关绘图过程中图层内容是否被翻转的信息。
// 不应该尝试重写此方法并返回其他值。
func contentsAreFlipped() -> Bool

// 一个布尔值，指示图层及其子层的几何形状是否垂直翻转。
// 默认值为false。
var isGeometryFlipped: Bool { get set }

// 一个布尔值，指示绘图命令是否在后台线程中延迟和异步处理。
// 当此属性设置为true时，用于绘制图层内容的图形上下文会排队绘制命令，并在后台线程上执行它们，而不是同步执行它们。异步执行这些命令可以提高某些应用程序的性能。但是，在启用此功能之前，您应该始终衡量实际的性能优势。
// 默认值为false。
var drawsAsynchronously: Bool { get set }

// 一个布尔值，指示图层在合成前是否呈现为位图。
// 可动画的
// 当此属性的值为true时，该图层在其本地坐标空间中呈现为位图，然后与任何其他内容复合到目标。阴影效果和过滤器属性中的任何过滤器都会被光栅化并包含在位图中。然而，该层目前的不透明度并没有被光栅化。如果光栅化位图在合成过程中需要缩放，则根据需要应用minificationFilter和mgnificationFilter属性中的过滤器。
// 当此属性的值为false时，该图层将尽可能直接合成到目标中。如果合成模型的某些特征（例如包含过滤器）需要，该层仍然可以在合成之前进行光栅化。
// 默认值为false。
var shouldRasterize: Bool { get set }

// 光栅化内容的尺度，相对于图层的坐标空间。
// 可动画的
// 当应该Rasterize属性中的值为true时，该层使用此属性来确定是否缩放光栅化内容（以及缩放多少）。
// 此属性的默认值为1.0，这表明该图层应按其当前大小进行光栅化。较大的值放大了内容，较小的值缩小了内容。
var rasterizationScale: CGFloat { get set }

// 图层内容所需存储格式的提示。
var contentsFormat: CALayerContentsFormat

// 将图层及其子层渲染到指定的上下文中。
func render(in: CGContext)

```

## Modifying the Layer Geometry  修改图层几何

```swift
// 图层的框架矩形。
// 框架矩形是超级层坐标空间中指定的图层的位置和大小。
// 对于图层，框架矩形是一个计算属性，从边界、锚点和位置属性中的值派生出来。
// 当您为该属性分配新值时，该层会更改其位置和边界属性，以匹配您指定的矩形。
// 矩形中每个坐标的值都以点为单位测量。
// 如果变换属性应用的旋转变换不是90度的倍数，请勿设置帧。
var frame: CGRect { get set }

// 图层的边界矩形。
// 可动画。
// 边界矩形是图层在自身坐标空间中的起源和大小。
// 当您创建新的独立图层时，此属性的默认值为空矩形，您必须在使用该图层之前对其进行更改。
// 矩形中每个坐标的值都以点为单位测量。
var bounds: CGRect { get set }

// 该层在其超级层坐标空间中的位置。
// 可动画。
// 此属性的值以点指定，并且始终相对于锚点属性中的值指定。
// 默认位置设置为（0.0，0.0）
var position: CGPoint { get set }

// 该层在z轴上的位置。
// 可动画。
// 默认值为0。更改此属性的值会更改屏幕上图层的正面到背顺序。更高的值使该图层在视觉上比值较低的图层更接近查看器。这可能会影响框架矩形重叠的图层的可见性。
var zPosition: CGFloat { get set }

// 图层沿z轴位置的锚点。
// 可动画。
// 此属性指定发生几何操作的z轴上的锚点。该点表示为沿z轴的距离（以点为单位）。
// 默认值为0。
var anchorPointZ: CGFloat { get set }

// 定义图层边界矩形的锚点。
// 可动画。
// 您使用单位坐标空间指定此属性的值。
// 默认值为（0.5，0.5）
var anchorPoint: CGPoint { get set }

// 适用于图层的缩放因子。
var contentsScale: CGFloat { get set }
```

## Managing the Layer’s Transform 管理图层的转换

```swift
// 应用于图层内容的转换。
// 可动画。
// 默认情况下，此属性设置为身份转换。
// 您应用于该层的任何转换都相对于该层的锚点发生。
var transform: CATransform3D { get set }

// 指定渲染时应用于子层的转换。
// 可动画。
// 您通常使用此属性为嵌入式图层添加透视和其他查看效果。
// 您可以通过将子层转换设置为所需的投影矩阵来添加透视。
// 默认值是身份转换。
var sublayerTransform: CATransform3D { get set }

// 返回图层转换的仿射版本。
func affineTransform() -> CGAffineTransform

// 将图层的转换设置为指定的仿射变换。
func setAffineTransform(CGAffineTransform)

```

## Managing the Layer Hierarchy 管理图层层次结构

```swift
// 包含图层子图层的数组。
var sublayers: [CALayer]?

// 该层的超级层。
var superlayer: CALayer?

// 将图层附加到图层的子图层列表中。
func addSublayer(CALayer)

// 将图层与其父层分离。
func removeFromSuperlayer()

// 将指定的图层插入指定索引处的接收器子层列表中。
func insertSublayer(CALayer, at: UInt32)

// 在已经属于接收器的不同子层下方插入指定的子层。
func insertSublayer(CALayer, below: CALayer?)

// 在已经属于接收器的不同子层上方插入指定的子层。
func insertSublayer(CALayer, above: CALayer?)

// 将指定的子层替换为不同的图层对象。
func replaceSublayer(CALayer, with: CALayer)

```

## Updating Layer Display 更新图层显示

```swift
// 将图层的内容标记为需要更新。
// 调用此方法会导致图层缓存其内容。
// 这导致图层可能调用其委托的display(_:)或draw(_:in:)方法。图层内容属性中的现有内容将被删除，以便为新内容让路。
func setNeedsDisplay()

// 将指定矩形中的区域标记为需要更新。
func setNeedsDisplay(_ r: CGRect)

// 一个布尔值，指示当其边界矩形发生变化时，是否必须更新图层内容。
// 当此属性设置为true时，每当其边界属性发生变化时，该层会自动调用其setNeedsDisplay()方法。此属性的默认值为false。
var needsDisplayOnBoundsChange: Bool { get set }

// 如果图层当前被标记为需要更新，则启动该图层的更新过程。
func displayIfNeeded()

// 返回一个布尔值，指示图层是否已被标记为需要更新。
// 如果图层需要更新，则为true。
func needsDisplay() -> Bool

// 返回一个布尔值，指示对指定键的更改是否需要重新显示图层。
class func needsDisplay(forKey: String) -> Bool

```

## Layer Animations

```swift
// 将指定的动画对象添加到图层的渲染树中。
// 如果动画的持续时间属性为零或负，则持续时间将更改为kCATransactionAnimationDuration事务属性的当前值（如果设置）或默认值0.25秒
func add(CAAnimation, forKey: String?)

// 返回具有指定标识符的动画对象。
// 使用此方法仅检索已与图层关联的动画对象。修改返回对象的任何属性都会导致未定义的行为。
func animation(forKey: String) -> CAAnimation?

// 移除附加到图层的所有动画。
func removeAllAnimations()

// 使用指定的键删除动画对象。
func removeAnimation(forKey: String)

// 返回一个字符串数组，用于标识当前附加到该图层的动画。
func animationKeys() -> [String]?

```

## Managing Layer Resizing and Layout 管理图层调整大小和布局

```swift
// 负责布置图层子层的对象。
var layoutManager: CALayoutManager?

// 无效图层的布局，并将其标记为需要更新。
func setNeedsLayout()

// 告诉图层更新其布局。
func layoutSublayers()

// 如果需要，请重新计算接收器的布局。
func layoutIfNeeded()

// 返回一个布尔值，指示图层是否已被标记为需要布局更新。
func needsLayout() -> Bool

// 一个位掩码，定义了当层的超层边界发生变化时如何调整图层的大小。
// 如果您的应用程序不使用布局管理器或约束来处理布局更改，您可以为此属性分配一个值，以根据超级层边界的变化调整图层的大小。
// 默认值为layerNotSizable。
// struct CAAutoresizingMask
// static var layerMinXMargin: CAAutoresizingMask 接收器与其超级视图之间的左边距是灵活的。
// static var layerWidthSizable: CAAutoresizingMask 接收器的宽度是灵活的。
// static var layerMaxXMargin: CAAutoresizingMask 接收器与其超级视图之间的正确边距是灵活的。
// static var layerMinYMargin: CAAutoresizingMask 接收器与其超级视图之间的底部边距是灵活的。
// static var layerHeightSizable: CAAutoresizingMask 接收器的高度是灵活的。
// static var layerMaxYMargin: CAAutoresizingMask 接收器与其超级视图之间的最高边距是灵活的。
var autoresizingMask: CAAutoresizingMask { get set }

// 告知接收器其超级层的大小发生了变化。
func resize(withOldSuperlayerSize: CGSize)

// 告知接收器的子层，接收器的大小发生了变化。
func resizeSublayers(withOldSize: CGSize)

// 返回该层在其超级层坐标空间中的首选大小。
// 在macOS中，此方法的默认实现调用其布局管理器的首选Size（of:）方法，即其layoutManager属性中的对象。
// 如果该对象不存在或没有实现该方法，则此方法返回映射到其超级层坐标空间的图层当前边界矩形的大小。
func preferredFrameSize() -> CGSize

```

## Managing Layer Constraints 管理图层约束

```swift
// 用于定位当前层子层的约束。
// macOS应用程序可以使用此属性来访问其基于图层的限制。在应用约束之前，您还必须将CAConstraintLayoutManager对象分配给图层的layoutManager属性。
// iOS应用程序不支持基于层的限制。
var constraints: [CAConstraint]? { get set }

// 将指定的约束添加到图层中。
func addConstraint(CAConstraint)

```

## Getting the Layer’s Actions 获取图层的操作

```swift
// 返回分配给指定键的操作对象。
func action(forKey: String) -> CAAction?

// 包含图层操作的字典。
var actions: [String : CAAction]?

// 返回当前类的默认操作。
class func defaultAction(forKey: String) -> CAAction?

```

## Mapping Between Coordinate and Time Spaces 坐标和时间空间之间的映射

```swift
// 将点从指定层的坐标系转换为接收器的坐标系。
func convert(CGPoint, from: CALayer?) -> CGPoint

// 将点从接收器的坐标系转换为指定层的坐标系。
func convert(CGPoint, to: CALayer?) -> CGPoint

// 将矩形从指定层的坐标系转换为接收器的坐标系。
func convert(CGRect, from: CALayer?) -> CGRect

// 将矩形从接收器的坐标系转换为指定层的坐标系。
func convert(CGRect, to: CALayer?) -> CGRect

// 将时间间隔从指定层的时空转换为接收器的时间空间。
func convertTime(CFTimeInterval, from: CALayer?) -> CFTimeInterval

// 将接收方的时间间隔转换为指定层的时间空间。
func convertTime(CFTimeInterval, to: CALayer?) -> CFTimeInterval
```

## Hit Testing 点击测试

```swift
// 返回包含指定点的层层次结构（包括自身）中接收器最远的后代。
func hitTest(CGPoint) -> CALayer?

// 返回接收器是否包含指定点。
func contains(CGPoint) -> Bool

```

## Scrolling 上下滚动

```swift
// 该层在自身坐标空间中的可见区域。
// 可见区域是未被包含滚动层裁剪的区域。
var visibleRect: CGRect { get }

// 在图层最近的祖先滚动层中启动滚动，使指定的点位于滚动层的原点。
func scroll(CGPoint)

// 在图层最近的祖先滚动图层中启动滚动，以便指定的矩形可见。
func scrollRectToVisible(CGRect)

```

## Identifying the Layer 识别图层

```swift
// 接收者的姓名。
// 一些布局管理器使用图层名称来识别图层。
// 默认值为nil。
var name: String? { get set }
```

## Key-Value Coding Extensions 键值编码扩展

```swift
// 返回一个布尔值，指示是否应归档指定密钥的值。
func shouldArchiveValue(forKey: String) -> Bool

// 指定与指定键关联的默认值。
class func defaultValue(forKey: String) -> Any?

```
