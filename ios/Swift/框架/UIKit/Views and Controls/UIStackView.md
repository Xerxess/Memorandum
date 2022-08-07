<!-- TOC -->

- [UIStackView](#uistackview)
- [Stack view and Auto Layout 堆栈视图和自动布局](#stack-view-and-auto-layout-堆栈视图和自动布局)
- [Position and size the stack view 堆栈视图的位置和大小](#position-and-size-the-stack-view-堆栈视图的位置和大小)
- [APi](#api)
    - [Initializing a stack view](#initializing-a-stack-view)
    - [Managing arranged subviews 管理已安排的子视图](#managing-arranged-subviews-管理已安排的子视图)
    - [Configuring the layout](#configuring-the-layout)
    - [Adding space between item 在项目之间添加空间](#adding-space-between-item-在项目之间添加空间)

<!-- /TOC -->

# UIStackView

一个简化的界面，用于在列或行中布局视图集合。

堆叠视图允许您利用自动布局的力量，创建可以动态适应设备方向、屏幕大小和可用空间的任何变化的用户界面。  
堆栈视图管理其排列的子视图属性中所有视图的布局。这些视图根据它们在排列的子视图数组中的顺序沿着堆栈视图的轴排列。  
确切的布局因堆栈视图的轴、分布、对齐、间距和其他属性而异。

要使用堆栈视图，请打开要编辑的故事板。从对象库中拖出水平堆栈视图或垂直堆栈视图，并将堆栈视图放置在需要的位置。  
接下来，拖出堆栈的内容，将视图或控件放入堆栈中。您可以根据需要继续向堆栈添加视图和控件。Interface Builder根据堆栈的内容调整其大小。您还可以通过在属性检查器中修改堆栈视图的属性来调整堆栈内容的外观。

```swift
@MainActor class UIStackView : UIView
```

# Stack view and Auto Layout 堆栈视图和自动布局

堆栈视图使用自动布局来定位和调整其排列视图的大小。  
堆栈视图将第一个和最后一个排列的视图与其沿堆栈轴的边缘对齐。  
在水平堆栈中，这意味着第一个排列视图的前缘固定在堆栈的前缘，最后一个排列视图的后缘固定在堆栈的后缘。  
在垂直堆栈中，顶部和底部边缘分别固定在堆栈的顶部和底部边缘。如果您将堆栈视图的 isLayoutMarginsRelativeArrangement 属性设置为 true，则堆栈视图会将其内容固定在相关边距而不是边缘。

对于除UIStackView.Distribution.fillEqually分发以外的所有发行版，堆栈视图在沿着堆栈轴计算其大小时使用每个排列视图的内在ContentSize属性。UIStackView.Distribution.fill同样调整所有排列视图的大小，使其大小相同，沿其轴填充堆栈视图。如果可能，堆栈视图会拉伸所有排列的视图，以匹配沿堆栈轴线最长的内在大小的视图。

对于除UIStackView.Alignment.fill对齐以外的所有对齐，堆栈视图在计算其垂直于堆栈轴的大小时使用每个排列视图的内在ContentSize属性。UIStackView.Alignment.fill调整了所有排列视图的大小，以便它们垂直于其轴填充堆栈视图。如果可能，堆栈视图会拉伸所有排列的视图，以匹配垂直于堆栈轴的最大内在大小的视图。

# Position and size the stack view 堆栈视图的位置和大小

虽然堆栈视图允许您在不直接使用自动布局的情况下布局其内容，但您仍然需要使用自动布局来定位堆栈视图本身。  
一般来说，这意味着固定堆栈视图的至少两个相邻边缘来定义其位置。在没有其他约束的情况下，系统会根据其内容计算堆栈视图的大小。

* 沿着堆栈视图的轴，其拟合大小等于所有排列视图的大小加上视图之间的空间的总和。
* 垂直于堆栈视图轴，其拟合大小等于最大排列视图的大小。
* 如果堆栈视图的 isLayoutMarginsRelativeArrangement 属性设置为 true，则堆栈视图的拟合大小将增加，以包含边距的空间。

# APi 

## Initializing a stack view

```swift
init(arrangedSubviews: [UIView])
init(frame: CGRect)
init(coder: NSCoder)
```

## Managing arranged subviews 管理已安排的子视图

```swift
// 在排列的子视图数组的末尾添加视图。
func addArrangedSubview(UIView)

// 按堆栈视图排列的视图列表。
var arrangedSubviews: [UIView] { get }

// 将提供的视图添加到指定索引的排列子视图数组中。
func insertArrangedSubview(UIView, at: Int)

// 从堆栈排列的子视图数组中删除提供的视图。
func removeArrangedSubview(UIView)

```

## Configuring the layout

```swift
// 排列视图排列的轴。
// 此属性决定了排列视图的方向。
// 分配NSLayoutConstraint.Axis.vertical值会创建一列视图。
// 分配NSLayoutConstraint.Axis.horizontal值会创建一个行。
// 默认值为NSLAyoutConstraint.Axis.horizontal。
// enum Axis : Int, @unchecked Sendable
// case horizontal
// case vertical
var axis: NSLayoutConstraint.Axis

// 垂直于堆栈视图轴的排列子视图的对齐。
// 此属性决定了堆栈视图如何垂直于其轴布置其排列视图。
// 默认值为UIStackView.Alignment.fill。
// enum Alignment : Int, @unchecked Sendable
// case fill 一种布局，其中堆栈视图调整其排列视图的大小，以便它们填充垂直于堆栈视图轴的可用空间。
// case center 一种布局，其中堆栈视图将其排列视图的中心与沿轴的中心对齐。
// case leading 垂直堆栈的布局，其中堆栈视图沿其前缘排列视图的前缘对齐。
// case trailing 垂直堆栈的布局，堆栈视图沿其后缘排列视图的后缘对齐。
// static var top: UIStackView.Alignment 水平堆栈的布局，堆栈视图沿着顶部边缘对齐其排列视图的顶部边缘。
// static var bottom: UIStackView.Alignment 水平堆栈的布局，堆栈视图沿着底部边缘对齐其排列视图的底部边缘。
// case firstBaseline 水平堆栈的布局，堆栈视图根据其第一个基线对齐其排列的视图。
// case lastBaseline 水平堆栈的布局，堆栈视图根据其最后一个基线对齐其排列的视图。
var alignment: UIStackView.Alignment

// 排列视图沿堆栈视图轴的分布。
// 此属性决定了堆栈视图如何沿着其轴排列的视图。
// 默认值为UIStackView.Distribution.fill。有关可能的值列表，请参阅UIStackView.Distribution。
// enum Distribution : Int, @unchecked Sendable
// case fill 一种布局，其中堆栈视图调整其排列视图的大小，以便它们沿着堆栈视图轴填充可用空间。
// case fillEqually 一种布局，其中堆栈视图调整其排列视图的大小，以便它们沿着堆栈视图轴填充可用空间。
// case fillProportionally 一种布局，其中堆栈视图调整其排列视图的大小，以便它们沿着堆栈视图轴填充可用空间。
// case equalSpacing 一种布局，其中堆栈视图定位其排列的视图，以便它们沿着堆栈视图轴填充可用空间。
// case equalCentering 一种布局，试图沿着堆栈视图的轴定位具有相等的中心到中心间距的排列视图，同时保持视图之间的间距属性的距离。
var distribution: UIStackView.Distribution { get set }

// 堆栈视图排列视图的相邻边缘之间的点间距离。
// 此属性定义了UIStackView.Distribution.fill比例分布的排列视图之间的严格间距。
// 它表示UIStackView.Distribution.equalSpacing和UIStackView.Distribution.equalCentering发行版的最小间距。使
// 用负值来允许重叠。
// 默认值为0.0。
var spacing: CGFloat { get set }

// 一个布尔值，用于确定视图之间的垂直间距是否从其基线测量。
// 如果是，视图之间的垂直空间从基于文本的视图的最后一个基线到下方视图的第一个基线进行测量。
// 顶部和底部视图也被定位，以便它们最近的基线是距离堆栈视图边缘的指定距离。
// 此属性仅供垂直堆栈视图使用。使用对齐属性在水平堆栈视图中基线对齐视图。
// 默认值为false。
var isBaselineRelativeArrangement: Bool { get set }

// 一个布尔值，用于确定堆栈视图是否相对于其布局边距布局其排列视图。
// 如果为true，堆栈视图将相对于其布局边距布局其排列视图。如果为false，它会列出相对于其界限的排列视图。
// 默认值为false。
var isLayoutMarginsRelativeArrangement: Bool { get set }
````

## Adding space between item 在项目之间添加空间

```swift
// 在指定视图后返回自定义间距。
func customSpacing(after: UIView) -> CGFloat

// 在指定视图后应用自定义间距。
func setCustomSpacing(CGFloat, after: UIView)

// 堆栈视图中子视图的默认间距。
class let spacingUseDefault: CGFloat

// 系统定义的相邻视图的间距。
class let spacingUseSystem: CGFloat

```