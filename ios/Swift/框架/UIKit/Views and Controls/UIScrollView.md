<!-- TOC -->

- [UIScrollView](#uiscrollview)
- [API](#api)
  - [Responding to Scroll View Interactions 回应滚动视图交互](#responding-to-scroll-view-interactions-%E5%9B%9E%E5%BA%94%E6%BB%9A%E5%8A%A8%E8%A7%86%E5%9B%BE%E4%BA%A4%E4%BA%92)
  - [Managing the Content Size and Offset  管理内容大小和偏移量](#managing-the-content-size-and-offset--%E7%AE%A1%E7%90%86%E5%86%85%E5%AE%B9%E5%A4%A7%E5%B0%8F%E5%92%8C%E5%81%8F%E7%A7%BB%E9%87%8F)
  - [Managing the Content Inset Behavior 管理内容插入行为](#managing-the-content-inset-behavior-%E7%AE%A1%E7%90%86%E5%86%85%E5%AE%B9%E6%8F%92%E5%85%A5%E8%A1%8C%E4%B8%BA)
  - [Getting the Layout Guides 获取布局指南](#getting-the-layout-guides-%E8%8E%B7%E5%8F%96%E5%B8%83%E5%B1%80%E6%8C%87%E5%8D%97)
  - [Configuring the Scroll View](#configuring-the-scroll-view)
  - [Getting the Scrolling State 获得滚动状态](#getting-the-scrolling-state-%E8%8E%B7%E5%BE%97%E6%BB%9A%E5%8A%A8%E7%8A%B6%E6%80%81)
  - [Managing the Scroll Indicator and Refresh Control 管理滚动指示器和刷新控制](#managing-the-scroll-indicator-and-refresh-control-%E7%AE%A1%E7%90%86%E6%BB%9A%E5%8A%A8%E6%8C%87%E7%A4%BA%E5%99%A8%E5%92%8C%E5%88%B7%E6%96%B0%E6%8E%A7%E5%88%B6)
  - [Scrolling to a Specific Location 滚动到特定位置](#scrolling-to-a-specific-location-%E6%BB%9A%E5%8A%A8%E5%88%B0%E7%89%B9%E5%AE%9A%E4%BD%8D%E7%BD%AE)
  - [Managing Touches 管理触摸](#managing-touches-%E7%AE%A1%E7%90%86%E8%A7%A6%E6%91%B8)
  - [Zooming and Panning 缩放和平移](#zooming-and-panning-%E7%BC%A9%E6%94%BE%E5%92%8C%E5%B9%B3%E7%A7%BB)
  - [Managing the Keyboard 管理键盘](#managing-the-keyboard-%E7%AE%A1%E7%90%86%E9%94%AE%E7%9B%98)
  - [Managing the Index 管理指数](#managing-the-index-%E7%AE%A1%E7%90%86%E6%8C%87%E6%95%B0)
- [小笔记](#%E5%B0%8F%E7%AC%94%E8%AE%B0)
  - [内容高度自适应](#%E5%86%85%E5%AE%B9%E9%AB%98%E5%BA%A6%E8%87%AA%E9%80%82%E5%BA%94)
  - [contentInsetAdjustmentBehavior](#contentinsetadjustmentbehavior)

<!-- /TOC -->

# UIScrollView

允许滚动和缩放其包含视图的视图

UIScrollView是几个UIKit类的超级类，包括UITableView和UITextView。  

滚动视图除了显示垂直和水平滚动指示器外，滚动视图本身不绘图。  
滚动视图`必须知道内容视图的大小`，这样它才能知道何时停止滚动。  
默认情况下，当滚动超过内容的边界时，它会`反弹`。  

由于滚动视图没有滚动条，因此必须知道触摸是否表示滚动的意图与跟踪内容中子视图的意图。为了做出这一决定，它通过启动计时器暂时拦截触地得分事件，并在计时器启动之前，看看触摸手指是否进行任何移动。如果计时器在位置没有显著变化的情况下触发，滚动视图会将跟踪事件发送到内容视图的触摸子视图。如果用户在计时器过之前将手指拖动足够远，滚动视图将取消子视图中的任何跟踪，并自行执行滚动。  
子类可以覆盖touchesShouldBegin(_:with:in:), isPagingEnabled, and touchesShouldCancel(in:) 方法（滚动视图调用），以影响滚动视图如何处理滚动手势。

UIScrollView类可以有一个委托，该委托必须采用U`IScrollViewDelegate`协议。  
为了使缩放和平移正常工作，委托必须同时实现viewForZooming（in:）和scrollViewDidEndZooming（_:with:atScale:）。此外，maximumZoomScale and minimumZoomScale `缩放比例必须不同`。

如果您为此视图的`restorationIdentifier`属性分配值，它会尝试在应用程序启动之间保留其滚动相关信息。  
具体来说，保留`zoomScale、contentInset和contentOffset`属性的值。  
在恢复过程中，滚动视图会恢复这些值，以便内容看起来滚动到与之前相同的位置。

```swift
@MainActor class UIScrollView : UIView
```

# API

## Responding to Scroll View Interactions 回应滚动视图交互

```swift
// 滚动视图对象的委托。
weak var delegate: UIScrollViewDelegate? { get set }

// UIScrollViewDelegate协议声明的方法允许采用委托响应来自UIScrollView类的消息，从而响应并在某些方面影响滚动、缩放、缩放内容减速和滚动动画等操作。
protocol UIScrollViewDelegate

```

## Managing the Content Size and Offset  管理内容大小和偏移量

```swift
// 内容视图的大小。
// default:CGSizeZero.
var contentSize: CGSize { get set }

//  内容视图的起源与滚动视图的起源偏移的点。
//  default:CGPointZero.
var contentOffset: CGPoint { get set }

// 从内容视图的来源设置与接收者的来源相对应的偏移量。
func setContentOffset(
    _ contentOffset: CGPoint,
    animated: Bool
)

```

## Managing the Content Inset Behavior 管理内容插入行为

```swift
// 来自内容插入和滚动视图安全区域的嵌入。
// 使用此属性获取绘制内容的调整区域。
// contentInsetAdjustmentBehavior 属性决定了安全区域嵌入是否包含在调整中。
// 然后将安全区域插入添加到contentInset属性中的值中，以获得此属性的最终值。
var adjustedContentInset: UIEdgeInsets { get }

// 内容视图从安全区域或滚动视图边缘插入的自定义距离。
// 使用此属性扩展内容与内容视图边缘之间的空间。大小单位是点。默认值为UIEdgeInsetsZero。
// 
var contentInset: UIEdgeInsets { get set }

// 确定调整后的内容偏移量的行为。
// 此属性指定如何使用安全区域设置来修改滚动视图的内容区域。
// 此属性的默认值为UIScrollView.ContentInsetAdjustmentBehavior.automatic。
// enum ContentInsetAdjustmentBehavior
// case automatic 自动调整滚动视图嵌入。
// case scrollableAxes 仅按照可滚动方向调整插入。
// case never 不要调整滚动视图的插入。
// case always 务必在内容调整中包含安全区域设置。
var contentInsetAdjustmentBehavior: UIScrollView.ContentInsetAdjustmentBehavior { get set }

// 当滚动视图的调整内容集发生变化时调用。
func adjustedContentInsetDidChange()

```

## Getting the Layout Guides 获取布局指南

```swift
// 基于滚动视图未变换帧矩形的布局指南。
var frameLayoutGuide: UILayoutGuide

// 基于滚动视图未翻译内容矩形的布局指南。
var contentLayoutGuide: UILayoutGuide

```

## Configuring the Scroll View

```swift
// 确定是否启用滚动的布尔值。
// 禁用滚动时，滚动视图不接受触摸事件；它会将它们转发到响应链上。
// 默认值为true
var isScrollEnabled: Bool { get set }

// 一个布尔值，用于确定滚动是否在特定方向上被禁用。
// 如果此属性为false，则允许在水平和垂直方向滚动。如果此属性为真，并且用户开始向一个一般方向（水平或垂直）拖动，则滚动视图将禁用向另一个方向滚动。如果拖动方向是对角线，则滚动将不会被锁定，用户可以向任何方向拖动，直到拖动完成。
// 默认值为false
var isDirectionalLockEnabled: Bool { get set }

// 一个布尔值，用于确定是否为滚动视图启用了分页。
// default:false
var isPagingEnabled: Bool { get set }

// 控制是否启用滚动到顶部手势的布尔值。
// 滚动到顶部手势是点击状态栏。当用户做出此手势时，系统会要求最靠近状态栏的滚动视图滚动到顶部。如果该滚动视图将scrollsToTop设置为false，则其委托从scrollViewShouldScrollToTop(_:)返回false，或者内容已经在顶部，则什么都不会发生。
// 滚动视图滚动到内容视图顶部后，它会向委托发送scrollViewDidScrollToTop(_:)消息。
// 默认值为true。
var scrollsToTop: Bool { get set }

// 一个布尔值，用于控制滚动视图是否越过内容边缘并再次反弹。
// 默认值为true
var bounces: Bool { get set }

// 一个布尔值，用于确定垂直滚动到达内容末尾时是否总是发生反弹。
// 如果此属性设置为true并且 bounces:true，即使内容小于滚动视图的边界，也允许垂直拖动
// 默认为false
var alwaysBounceVertical: Bool

// 一个布尔值，用于确定水平滚动到达内容视图末尾时是否总是发生反弹。
var alwaysBounceHorizontal: Bool

```

## Getting the Scrolling State 获得滚动状态

```swift
// 返回用户是否触摸过内容以启动滚动。
// 如果用户触摸了内容视图，但可能尚未开始拖动它，则此属性的值为真。
// 当用户开始通过触摸滚动视图并且手指仍然按住时，滚动视图会进入跟踪状态。这时，isTracking 属性的值将为 true。
// 当用户停止滑动手指或手指离开屏幕时，滚动视图将停止跟踪，isTracking 属性的值将变为 false。
var isTracking: Bool { get }

// 一个布尔值，指示用户是否已经开始滚动内容。
// 此属性持有的值可能需要一段时间或距离滚动才能设置为true。
// 当用户通过触摸并拖拽滚动视图时，滚动视图进入拖拽状态，此时 isDragging 属性的值为 true。
// 当用户停止拖拽手势或手指离开屏幕时，滚动视图停止拖拽，isDragging 属性的值变为 false。
// 与 isTracking 不同
// isTracking 主要用于检测用户是否正在跟踪滚动视图，即手指是否仍然按住滚动视图并移动。它可以用于在用户跟踪滚动视图时执行某些操作，例如实时更新滚动视图内容或响应特定的手势行为。
// isDragging 主要用于检测用户是否正在拖拽滚动视图，即手指按住并移动滚动视图。它可以用于在用户拖拽滚动视图时执行某些操作，例如实时更新界面元素或处理特定的拖拽行为。
var isDragging: Bool { get }

// 返回用户抬起手指后内容是否在滚动视图中移动。
// 当用户通过拖拽手势释放滚动视图时，滚动视图会根据惯性继续滚动一段时间，这个过程称为减速。
// 在减速期间，isDecelerating 属性的值为 true。
// 当滚动视图完全停止减速时，isDecelerating 属性的值变为 false。
var isDecelerating: Bool { get }

// 一个浮点值，用于确定用户抬起手指后的减速率。
// 您的应用程序可以使用normal和fast常数作为合理减速率的参考点。
// UIScrollView.DecelerationRate
// .normal（默认值）：普通减速速率，适用于大多数情况。
// .fast：较快的减速速率，滚动视图会更快地减速并停止。
// .slow：较慢的减速速率，滚动视图会较慢地减速并停止。
var decelerationRate: UIScrollView.DecelerationRate

```

## Managing the Scroll Indicator and Refresh Control 管理滚动指示器和刷新控制

```swift
// 滚动指示器的样式。
// enum IndicatorStyle
// case `default` 滚动指示器的默认样式，为黑色，边框为白色。这种风格适合任何内容背景。
// case black 一种黑色且小于默认样式的指示器样式。这种风格在白色内容背景下很好。
// case white 指示器样式为白色，小于默认样式。这种风格在黑色内容背景下很好。
// 默认 default
var indicatorStyle: UIScrollView.IndicatorStyle { get set }

// 控制水平滚动指示器是否可见的布尔值。
// 默认true
var showsHorizontalScrollIndicator: Bool { get set }

// 控制垂直滚动指示器是否可见的布尔值。
// 默认true
var showsVerticalScrollIndicator: Bool { get set }

// 滚动指示器从滚动视图边缘设置的水平距离。
// 默认zero
var horizontalScrollIndicatorInsets: UIEdgeInsets { get set }

// 滚动指示器从滚动视图边缘插入的垂直距离。
// 默认zero
var verticalScrollIndicatorInsets: UIEdgeInsets { get set }

// 一个布尔值，指示系统是否自动调整滚动指示器插入。
// 默认true
var automaticallyAdjustsScrollIndicatorInsets: Bool { get set }

// 瞬间显示滚动指示器。
func flashScrollIndicators()

// 与滚动视图关联的刷新控件。
var refreshControl: UIRefreshControl? { get set }

```

## Scrolling to a Specific Location 滚动到特定位置

```swift
// 滚动内容的特定区域，使其在接收器中可见。
func scrollRectToVisible(CGRect, animated: Bool)

```

## Managing Touches 管理触摸

```swift
// 被子类覆盖，以自定义手指在显示内容中着陆时的默认行为。
// UIScrollView的默认行为是调用触摸发生的目标子视图的UIResponder事件处理方法。
// 如果您不希望滚动视图发送要查看的事件消息，请返回false。如果您希望视图接收这些消息，请返回true（默认值）。
func touchesShouldBegin(Set<UITouch>, with: UIEvent?, in: UIView) -> Bool

// 返回是否取消与内容子视图相关的触摸并开始拖动
// 滚动视图在开始向内容视图发送跟踪消息后立即调用此方法。如果它从此方法收到false，它将停止将触摸事件拖动并转发到内容子视图。
// 如果 canCancelContentTouches 属性的值为 false，滚动视图不会调用此方法。
func touchesShouldCancel(in: UIView) -> Bool


// 控制内容视图中是否触摸的布尔值总是会导致跟踪。
// 如果此属性的值为true，并且内容中的视图已开始跟踪触摸它的手指，并且如果用户拖动手指足以启动滚动，则视图会收到touchesCancelled(_:with:)消息，滚动视图将触摸作为滚动处理。如果此属性的值为false，则一旦内容视图开始跟踪，滚动视图不会滚动，无论手指移动如何。
var canCancelContentTouches: Bool

// 一个布尔值，用于确定滚动视图是否延迟了触地手势的处理。
var delaysContentTouches: Bool

// 用于按下方向按钮的底层手势识别器。
var directionalPressGestureRecognizer: UIGestureRecognizer

```

## Zooming and Panning 缩放和平移

```swift
// 平移手势的基础手势识别器。
var panGestureRecognizer: UIPanGestureRecognizer

// 用于捏合手势的基础手势识别器。
var pinchGestureRecognizer: UIPinchGestureRecognizer?

// 放大到内容的特定区域，使其在接收器中可见。
func zoom(to: CGRect, animated: Bool)

// 指定应用于滚动视图内容的当前比例因子的浮点值。
// 此值决定了当前内容的缩放程度。默认值为1.0。
var zoomScale: CGFloat

// 指定当前缩放比例的浮点值。
// 新的缩放值应该在minimumZoomScale and the maximumZoomScale之间。
func setZoomScale(CGFloat, animated: Bool)

// 一个浮点值，指定可以应用于滚动视图内容的最大缩放因子。
var maximumZoomScale: CGFloat

// 一个浮点值，指定可以应用于滚动视图内容的最小缩放因子。
var minimumZoomScale: CGFloat

// 一个布尔值，表示缩放已超过为接收器指定的缩放限制。
// 如果滚动视图缩放回最小或最大缩放缩放值，则此属性的值为true；否则该值为false。
var isZoomBouncing: Bool

// 一个布尔值，指示内容视图当前是放大还是缩小。
// 如果用户正在进行缩放手势，则此属性的值为true，否则为false。
var isZooming: Bool

// 一个布尔值，用于确定滚动视图在缩放超过最大限制或最小限制时是否为内容缩放添加动画效果。
var bouncesZoom: Bool

```

## Managing the Keyboard 管理键盘

```swift
// 在滚动视图中开始拖动时关闭键盘的方式。
// enum KeyboardDismissMode
// 默认 none
case none 键盘不会因拖动而被关闭。
case onDrag 当拖动开始时，键盘会被关闭。
case interactive 键盘跟随屏幕外的拖动触摸，可以再次向上拉动以取消关闭。

var keyboardDismissMode: UIScrollView.KeyboardDismissMode

```

## Managing the Index 管理指数

```swift
// 用户滚动时显示索引的方式。
// enum IndexDisplayMode
// case automatic 索引会酌情自动显示或隐藏。
// case alwaysHidden 索引永远不会显示。
var indexDisplayMode: UIScrollView.IndexDisplayMode

```

# 小笔记

## 答疑解惑

### 自动布局

- UIScrollView的边缘或边距与其内容之间的约束会附加到滚动视图的内容区域 !重点 !重点 !重点
- UIScrollView框架的高度、宽度或中心点之间的限制 !重点 !重点 !重点

```swift
// 以下DEMO 
// contentView 不会铺满 UIScrollView
// 由于 UIScrollView的边缘或边距与其内容之间的约束会附加到滚动视图的内容区域 
// contentSize 默认为 CGSizeZero
// 此时 UIScrollView 无内容区域 即 contentView.width=0,contentView.height=0
let scrollView = UIScrollView()
let contentView = UIView()
contentView.backgroundColor = .green
let layoutGuide:UILayoutGuide = view.safeAreaLayoutGuide
view.addSubview(scrollView)
scrollView.addSubview(contentView)
scrollView.translatesAutoresizingMaskIntoConstraints=false
contentView.translatesAutoresizingMaskIntoConstraints=false
NSLayoutConstraint.activate([
    scrollView.topAnchor.constraint(equalTo: layoutGuide.topAnchor),
    scrollView.leadingAnchor.constraint(equalTo: layoutGuide.leadingAnchor),
    scrollView.trailingAnchor.constraint(equalTo: layoutGuide.trailingAnchor),
    scrollView.bottomAnchor.constraint(equalTo: layoutGuide.bottomAnchor),
])
NSLayoutConstraint.activate([
    contentView.topAnchor.constraint(equalTo: scrollView.topAnchor), // 约束附加到滚动视图的内容区域,并非约束scrollView上
    contentView.leadingAnchor.constraint(equalTo: view.leadingAnchor), // 约束附加到滚动视图的内容区域,并非约束scrollView上
    contentView.trailingAnchor.constraint(equalTo: view.trailingAnchor), // 约束附加到滚动视图的内容区域,并非约束scrollView上
    contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor) // 约束附加到滚动视图的内容区域,并非约束scrollView上
])

```

## 内容高度自适应

使用一个容器view 设置 bottomAnchor

```swift
box.bottomAnchor.constraint(equalTo: contentView.bottomAnchor) // 注意非常重要
```

```swift
({
    let scrollView = UIScrollView()
    let contentView = UIView()
    contentView.backgroundColor = .green
    let layoutGuide:UILayoutGuide = view.safeAreaLayoutGuide
    view.addSubview(scrollView)
    scrollView.addSubview(contentView)
    scrollView.translatesAutoresizingMaskIntoConstraints=false
    contentView.translatesAutoresizingMaskIntoConstraints=false
    
    NSLayoutConstraint.activate([
        scrollView.topAnchor.constraint(equalTo: layoutGuide.topAnchor),
        scrollView.leadingAnchor.constraint(equalTo: layoutGuide.leadingAnchor),
        scrollView.trailingAnchor.constraint(equalTo: layoutGuide.trailingAnchor),
        scrollView.bottomAnchor.constraint(equalTo: layoutGuide.bottomAnchor),
    ])
    NSLayoutConstraint.activate([
        contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),// 约束附加到滚动视图的内容区域,并非约束scrollView上
        contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),// 约束附加到滚动视图的内容区域,并非约束scrollView上
        contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),// 约束附加到滚动视图的内容区域,并非约束scrollView上
        contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),// 约束附加到滚动视图的内容区域,并非约束scrollView上
        contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor) // 约束附加到滚动视图的内容区域,并非约束scrollView上
    ])
    
    // 子内容视图
    let box = UIView()
    box.translatesAutoresizingMaskIntoConstraints=false
    box.backgroundColor = .red
    contentView.addSubview(box)
    NSLayoutConstraint.activate([
        box.widthAnchor.constraint(equalToConstant: 100),
        box.heightAnchor.constraint(equalToConstant: 100),
        box.topAnchor.constraint(equalTo: contentView.topAnchor,constant: 1000),
        box.bottomAnchor.constraint(equalTo: contentView.bottomAnchor) // 通过约束，设置contentSize
    ])
}())
```

## contentInsetAdjustmentBehavior

contentInsetAdjustmentBehavior 是一个用于控制滚动视图（例如 UITableView、UICollectionView 或 UIScrollView）在有键盘或其他输入组件出现时如何调整其内容插入（content inset）的属性。
  
在 iOS 中，当键盘或其他输入组件弹出时，滚动视图会自动调整其内容插入，以确保可见内容不被键盘遮挡。

- automatic（默认值）：滚动视图根据当前的滚动指示器自动调整内容插入，以确保可见内容不被键盘遮挡。这是最常用的选项。
- scrollableAxes：滚动视图只在垂直方向上自动调整内容插入，而在水平方向上保持不变。这对于横向滚动视图（例如水平滚动的 UICollectionView）很有用，可以避免在输入时水平内容发生不必要的调整。
- never：滚动视图不会自动调整内容插入，而是保持不变。这意味着键盘或其他输入组件可能会遮挡可见内容。
- always：无论是否有键盘或其他输入组件，滚动视图始终调整其内容插入，以确保可见内容不被遮挡。这可能导致滚动视图的内容在键盘或输入组件未出现时也被调整。
