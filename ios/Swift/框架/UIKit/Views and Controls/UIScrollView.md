<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UIScrollView](#uiscrollview)
- [API](#api)
  - [Responding to Scroll View Interactions 回应滚动视图交互](#responding-to-scroll-view-interactions-回应滚动视图交互)
  - [Managing the Content Size and Offset  管理内容大小和偏移量](#managing-the-content-size-and-offset--管理内容大小和偏移量)
  - [Managing the Content Inset Behavior 管理内容插入行为](#managing-the-content-inset-behavior-管理内容插入行为)
  - [Getting the Layout Guides 获取布局指南](#getting-the-layout-guides-获取布局指南)
  - [Configuring the Scroll View](#configuring-the-scroll-view)
  - [Getting the Scrolling State 获得滚动状态](#getting-the-scrolling-state-获得滚动状态)
  - [Managing the Scroll Indicator and Refresh Control 管理滚动指示器和刷新控制](#managing-the-scroll-indicator-and-refresh-control-管理滚动指示器和刷新控制)
  - [Scrolling to a Specific Location 滚动到特定位置](#scrolling-to-a-specific-location-滚动到特定位置)
  - [Managing Touches 管理触摸](#managing-touches-管理触摸)
  - [Zooming and Panning 缩放和平移](#zooming-and-panning-缩放和平移)
  - [Managing the Keyboard 管理键盘](#managing-the-keyboard-管理键盘)
  - [Managing the Index 管理指数](#managing-the-index-管理指数)
- [小笔记](#小笔记)
  - [图解](#图解)
  - [答疑解惑](#答疑解惑)
    - [自动布局](#自动布局)
  - [内容高度自适应](#内容高度自适应)
  - [contentInsetAdjustmentBehavior](#contentinsetadjustmentbehavior)
  - [contentInset 导致 安全区域变为 负值](#contentinset-导致-安全区域变为-负值)
  - [scrollViewDidScroll 系统会自动调用导致逻辑错误,判断是用户交互发生的滚动](#scrollviewdidscroll-系统会自动调用导致逻辑错误判断是用户交互发生的滚动)
  - [是否滚动已滚动到底部](#是否滚动已滚动到底部)
  - [检测自然滚动结束](#检测自然滚动结束)
    - [通过 UIScrollViewDelegate 代理方法](#通过-uiscrollviewdelegate-代理方法)
    - [通过 CADisplayLink](#通过-cadisplaylink)
  - [verticalScrollIndicatorInsets、automaticallyAdjustsScrollIndicatorInsets 一些注意事项](#verticalscrollindicatorinsets-automaticallyadjustsscrollindicatorinsets-一些注意事项)
    - [verticalScrollIndicatorInsets 设置为非(默认值)](#verticalscrollindicatorinsets-设置为非默认值)
    - [控制器 additionalSafeAreaInsets 会影响 系统的调整策略](#控制器-additionalsafeareainsets-会影响-系统的调整策略)
    - [底部无法自动调整](#底部无法自动调整)
  - [subView.convert(.init(x: 0, y: 0), to: scrollView)](#subviewconvertinitx-0-y-0-to-scrollview)
  - [通过 velocity 速度计算位移距离](#通过-velocity-速度计算位移距离)
    - [通过递归](#通过递归)
    - [通过数学计算](#通过数学计算)
  - [UIScrollView 嵌套分析](#uiscrollview-嵌套分析)
    - [默认嵌套](#默认嵌套)
    - [嵌套方式一：同时滚动](#嵌套方式一同时滚动)
    - [嵌套方式二：子视图完全接管滚动，不透传到父视图](#嵌套方式二子视图完全接管滚动不透传到父视图)

<!-- /code_chunk_output -->

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
// adjustedContentInset 包含  contentInset 的值
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

## 图解

![Alt text](image.png)

> scrollView.contentInset = .init(top: 50, left: 50, bottom: 0, right: 0)

```swift
// 未设置 contentInset
print(scrollView.safeAreaLayoutGuide.layoutFrame) // (0.0, 0.0, 393.0, 196.66666666666666)
print(scrollView.layoutMarginsGuide.layoutFrame) // (8, 8.0, 377.0, 180.66666666666666)

// 设置 contentInset
// contentInset 是 UIScrollView 与 内容区域 边距
// 且 UIScrollView的边缘或边距与其内容之间的约束会附加到滚动视图的内容区域 !重点 !重点 !重点 
// 此时 safeAreaLayoutGuide.layoutFrame  (0.0, 0.0, 393.0, 196.66666666666666) 会导致针对safeAreaLayoutGuide布局不准确，具体表现 top = top+50(边距) , left=left+50(边距)
// 与 正常理解 UIView safeAreaLayoutGuide.layoutFrame 的布局习惯不统一
// 猜测 ios 处理  top-50 , left-50
scrollView.contentInset = .init(top: 50, left: 50, bottom: 0, right: 0)
print(scrollView.safeAreaLayoutGuide.layoutFrame) // (-50.0, -50.0, 393.0, 196.66666666666666)
print(scrollView.layoutMarginsGuide.layoutFrame) // (-42.0, -42.0, 377.0, 180.66666666666666)
```

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

## contentInset 导致 安全区域变为 负值

```swift
// 以下观点为个人猜测，非官方说明
// 添加后 UIScrollView 的宽度为 UIScrollView.frame -  contentInset
// 1.坐标系原点 (0,0) 移动到 （50，20）
// 2.ios 将坐标系 调整到 （50，20） 即 （0，0）
// 3.安全区域即（0，0）移动到 (-50,20)
contentInset = .init(top: 20, left: 50, bottom: 0, right: 0)
```

![alt text](image-1.png)

## scrollViewDidScroll 系统会自动调用导致逻辑错误,判断是用户交互发生的滚动

- scrollViewDidScroll 系统会自动调用，通过 isUserDragging 标识判断只处理用户交互滚动

```swift
class Demo:UIViewController { 
    var isUserDragging = false
    var scrollView = UIScrollView()
    override func viewDidLoad() {
        scrollView.delegate = self
        view.addSubview(scrollView)
        scrollView.snp.makeConstraints {
            .edges.equalToSuperview()
         }
    }

    func scrollViewDidScroll(_ scrollView: UIScrollView){
        let offset = scrollView.contentOffset.y + scrollView.adjustedContentInset.top
        if loadPreDataIng {
            return
        }
        if offset <= 50 && isUserDragging {
            // 处罚一些逻辑
        }
    }

    func scrollViewWillBeginDragging(_ scrollView: UIScrollView){
        print("scrollViewWillBeginDragging")
        isUserDragging = true
    }
    
    func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool){
        print("scrollViewDidEndDragging",decelerate)
        if !decelerate {
            isUserDragging = false
        }
    }
    
    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView){
        print("scrollViewDidEndDecelerating")
        isUserDragging = false
    }
    
    func scrollViewDidEndScrollingAnimation(_ scrollView: UIScrollView){
        print("scrollViewDidEndScrollingAnimation")
    }
}
```

## 是否滚动已滚动到底部

```swift
extension UIScrollView {
    /// 是否滚动已滚动到底部
    /// - bounds: UIScrollView.bounds 变化前的 bounds 信息
    func isScrolledToBottom(_ bounds:CGSize = .zero) -> Bool {
        let contentOffsetY = self.contentOffset.y
        let contentHeight = self.contentSize.height
        let frameHeight = max(bounds.height,self.bounds.height)
        let adjustedContentInset = self.adjustedContentInset
        
        // 考虑 contentInset
        let threshold: CGFloat = 2 // 可以设置一个阈值
        var calculateOffsetY = contentHeight - frameHeight - threshold
        if self.contentInsetAdjustmentBehavior != .never {
            calculateOffsetY += adjustedContentInset.bottom
        }
//        print(bounds.height,self.bounds.height,contentOffsetY,calculateOffsetY)
        return contentOffsetY >= calculateOffsetY
    }
}
```

## 检测自然滚动结束

### 通过 UIScrollViewDelegate 代理方法

```swift
func scrollViewDidEndScrollingAnimation(_ scrollView: UIScrollView){
        print("scrollViewDidEndScrollingAnimation")
    }
```

### 通过 CADisplayLink

```swift
var displayLink: CADisplayLink?
var completionBlock: (() -> Void)?

func scrollToRowWithCompletion(completion: @escaping () -> Void) {
    self.tableView.scrollToRow(at: IndexPath(row:self.messages.count - 1, section: 0), at: .bottom, animated: true)
    
    displayLink = CADisplayLink(target: self, selector: #selector(checkScrollingFinished))
    displayLink?.add(to: .current, forMode: .default)
    
    // 存储 completion block
    self.completionBlock = completion
}

@objc func checkScrollingFinished() {
    if !tableView.isDragging && !tableView.isDecelerating && !tableView.isScrollAnimating {
        print("已停止运动")
        displayLink?.invalidate()
        displayLink = nil
        
        // 执行 completion block
        completionBlock?()
        completionBlock = nil
    }
}
```

## verticalScrollIndicatorInsets、automaticallyAdjustsScrollIndicatorInsets 一些注意事项

### verticalScrollIndicatorInsets 设置为非(默认值)

- verticalScrollIndicatorInsets 设置为非(默认值)后系统的调整策略调整是依据当前的安全区域调整，在手机横向时会出现左右安全区域，则不会停靠最右侧

```swift
collectionView.automaticallyAdjustsScrollIndicatorInsets = true
collectionView.verticalScrollIndicatorInsets = .init(top: 10, left: 0, bottom: 0, right: 0)
```

![alt text](image-2.png)

### 控制器 additionalSafeAreaInsets 会影响 系统的调整策略

```swift
additionalSafeAreaInsets = .init(top: 0, left: 0, bottom: 10, right: 0)
```

### 底部无法自动调整

- 在自定义的容器视图或容器视图控制器中，系统为调整顶部的verticalScrollIndicatorInsets，而底部不会自动调整，需要手动设置。（不知道是BUG,还是有意为之）
  - 解决方法：additionalSafeAreaInsets 设置底部的值，设置后，系统可以自动调整了。

## subView.convert(.init(x: 0, y: 0), to: scrollView)

- 子视图换算scrollView坐标时，是根据scrollView.contentOffset.y = 0 的位置进行换算的。
- 如果要获取当前视窗的坐标，你设置nil,或  view

```swift
// 根据scrollView.contentOffset.y = 0 的位置进行换算的
subView.convert(.init(x: 0, y: 0), to: scrollView)

// 换算window 的坐标
subView.convert(.init(x: 0, y: 0), to: nil)

//  换算控制器根 view 的坐标
subView.convert(.init(x: 0, y: 0), to: view)
```

## 通过 velocity 速度计算位移距离

### 通过递归

```swift
private func decelerate(_ velocity:CGFloat,startOffsetY:CGFloat = 0.0) -> CGFloat {
        var velocity = velocity
        let decelerationRate: CGFloat = UIScrollView.DecelerationRate.normal.rawValue // 减速度
        
        // 更新位置
        let stoppingDistance = velocity
        // 减速
        velocity *= decelerationRate
        
        // 检查是否停止
        if abs(velocity) > 0.02 {
            return self.decelerate(velocity,startOffsetY: startOffsetY + stoppingDistance)
        } else {
            return startOffsetY + stoppingDistance
        }
    }
```

### 通过数学计算

```swift
 func calculateStopDistance(fromVelocity velocity: CGFloat, withDecelerationRate rate: CGFloat = 0.998) -> CGFloat {
        let lnRate = log(rate)
        return velocity / (-lnRate)
    }
```

## UIScrollView 嵌套分析

### 默认嵌套

- 父视图滚动，子视图不滚动
- 子视图滚动
  - 子视图可滚动，父视图不参与滚动
  - 子视图滚动到顶部或底部后再次滑动，父视图接管滚动 （ios 17.4 transfersHorizontalScrollingToParent 和 transfersVerticalScrollingToParent 可以改变这个行为，但`仅限于子视图contentSize是可滚动的`）

### 嵌套方式一：同时滚动

- 借助手势代理，实现子视图和父视图同时滚动
  - 父视图滚动，子视图不滚动
  - 子视图滚动，父视图也滚动滚动
    - 子视图滚动到顶部时,在ios 17.4 下 （即ios 17.4  transfersHorizontalScrollingToParent 和 transfersVerticalScrollingToParent）的相关配置下，子视图没有缓冲效果
    - ios 17.4 配置 transfersVerticalScrollingToParent 或 transfersHorizontalScrollingToParent 为 false 时后，子视图有缓冲效果

```swift
class MyUIScrollView:UIScrollView,UIGestureRecognizerDelegate {

    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool{
            return true
        }

}
```

### 嵌套方式二：子视图完全接管滚动，不透传到父视图

- 借助手势代理

```swift
// 方式一：此方式直接使用父视图 的平移手势失效。
// 直接让子视图手势只在子视图进行平移
class MyUIScrollView:UIScrollView,UIGestureRecognizerDelegate{
    
    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        if gestureRecognizer is UIPanGestureRecognizer {
            gestureRecognizer.state = .failed
        }
        return false
    }
    
}
```

```swift
// 方式二：此方式基本没问题，但如果子视图没手势时快速滑动也会使父视图滚动
// 如：当TableView 没有侧滑菜单时，快速滑动会触发父视图滚动,原因快速滑动导致传递到父视图，导致父视图滚动
// 如：当TableView 有侧滑菜单时，快速滑动不会触发父视图滚动，原因是代理拦截手势且不会失效
class MyUIScrollView:UIScrollView,UIGestureRecognizerDelegate{
    
    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        return false
    }
    
    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRequireFailureOf otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        return true
    }
    
}
```
