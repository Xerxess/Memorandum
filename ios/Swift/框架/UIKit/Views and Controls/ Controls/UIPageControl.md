<!-- TOC -->

- [UIPageControl](#uipagecontrol)
- [API](#api)
    - [](#)
    - [Coloring the page indicator 为页面指示器着色](#coloring-the-page-indicator-为页面指示器着色)
    - [Managing the indicator images 管理指示器图像](#managing-the-indicator-images-管理指示器图像)
    - [Customizing the layout direction 自定义布局方向](#customizing-the-layout-direction-自定义布局方向)
    - [Customizing the background style  自定义背景样式](#customizing-the-background-style--自定义背景样式)
    - [Customizing the interaction state 自定义交互状态](#customizing-the-interaction-state-自定义交互状态)
    - [Calculating the control size 计算控制尺寸](#calculating-the-control-size-计算控制尺寸)

<!-- /TOC -->

# UIPageControl

显示一系列水平点的控件，每个点对应于应用程序文档或其他数据模型实体中的页面。

有关页面控件的示例，当天气应用程序配置为显示多个位置的信息时，请参阅天气应用程序。
当用户点击页面控件移动到下一个或上一个页面时，控件会发送`valueChanged`事件供委托处理。  
然后，委托可以评估currentPage属性，以确定要显示的页面。  
页面控件在任一方向上只前进一页。当前查看的页面由一个白点表示。根据设备的不同，在剪辑之前，屏幕上会显示一定数量的点。

```swift
@MainActor class UIPageControl : UIControl
```

# API

## 

```swift
// 当前页面，由页面控件显示为白点。
// 属性值是一个整数，指定显示的当前页面减去1；
// 值为零（默认值）表示第一页。页面控件将当前页面显示为白点。
// 超出可能范围的值固定为0或numberOfPages减去1。
var currentPage: Int { get set }

// 接收方显示的页数（作为点）。
// 该属性的值是页面控件显示为点的页面数量。默认值为0。
var numberOfPages: Int { get set }

// 一个布尔值，当只有一个页面时，控制页面控件是否被隐藏。
var hidesForSinglePage: Bool { get set }

```

## Coloring the page indicator 为页面指示器着色

```swift
// 适用于页面指示器的色调颜色。
// 默认颜色是页面指示点的半透明白色。
// 页面指示点用于屏幕上不可见的所有页面。在此属性分配新值不会自动更改currentPageIndicatorTintColor属性中的颜色，因为这两个属性的值不会自动从另一个属性派生。这两个属性都必须独立指定。
// 同样，没有alpha应用于此属性。建议（但不是必需的）您为此参数指定的颜色包含一些透明度，即alpha值应小于1.0。
var pageIndicatorTintColor: UIColor? { get set }

// 适用于当前页面指示器的色调颜色。
// 当前页面指示点的默认颜色是不透明的白色。当前页面指示点用于指示当前可见的页面。在此属性分配新值不会自动更改pageIndicatorTintColor属性中的颜色，因为这两个属性的值不会自动从另一个属性派生。这两个属性都必须独立指定。
var currentPageIndicatorTintColor: UIColor? { get set }
```

## Managing the indicator images 管理指示器图像

```swift
// 指标的首选图像。
var preferredIndicatorImage: UIImage? { get set }

// 返回指定页面指示器的覆盖图像。
func indicatorImage(forPage: Int) -> UIImage?

// 为指定页面的指示器注册覆盖图像。
func setIndicatorImage(UIImage?, forPage: Int)

// 当前页面指示器的首选图像。
// ios16
// 当为零时，页面控件使用prepremedIndicatorImage作为其当前页面指示器。
// 此属性的默认值为nil。
var preferredCurrentPageIndicatorImage: UIImage? { get set }

// 返回指定页面当前页面指示器的覆盖图像。
// ios16
func currentPageIndicatorImage(forPage: Int) -> UIImage?

// 为指定页面的当前页面指示器注册覆盖映像。
func setCurrentPageIndicatorImage(UIImage?, forPage: Int)
```

## Customizing the layout direction 自定义布局方向

```swift
// 页面指示器的布局方向。
// ios16
// 此属性的默认值为UIPageControl.Direction.natural。
// enum Direction : Int, @unchecked Sendable
// case natural 从系统的区域设置中推断布局的方向。
// case leftToRight 从左到右布置页面指示器的方向。
// case rightToLeft 从右到左显示页面指示器的方向
// case topToBottom 从上到下布置页面指标的方向。
// case bottomToTop 从下到上列出页面指标的方向。
var direction: UIPageControl.Direction { get set }
```

## Customizing the background style  自定义背景样式

```swift
// 首选的背景风格。
//  UIPageControl.BackgroundStyle
// case automatic 默认的后台样式，根据页面控件交互状态的变化进行调整。
// case prominent 无论交互如何显示完整背景的背景样式。
// case minimal 无论交互如何，都显示最小背景的背景样式。
var backgroundStyle: UIPageControl.BackgroundStyle { get set }
```

## Customizing the interaction state 自定义交互状态

```swift
// 一个布尔值，用于确定页面控件是否允许连续交互。
var allowsContinuousInteraction: Bool { get set }

// 当前页面更改时的交互状态。
// enum InteractionState : Int, @unchecked Sendable
// case none 默认交互状态，其中没有发生交互。
// case discrete 页面通过单个离散交互更改的交互状态。
// case continuous 页面通过连续交互更改的交互状态。
var interactionState: UIPageControl.InteractionState { get }
```

## Calculating the control size 计算控制尺寸

```swift
// 返回接收者的边界应容纳给定页数的大小。
// 当页面计数发生变化时，自定义页面控件外观的子类可以使用此方法来调整页面控件的大小。
func size(forNumberOfPages pageCount: Int) -> CGSize
```