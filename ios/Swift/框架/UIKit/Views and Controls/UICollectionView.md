<!-- TOC -->

- [UICollectionView](#uicollectionview)
- [Layouts](#layouts)
- [单元格和补充视图](#单元格和补充视图)
- [Data Prefetching 数据预取](#data-prefetching-数据预取)
- [Reordering Items Interactively 交互式重新排序项目](#reordering-items-interactively-交互式重新排序项目)
- [API](#api)
    - [Initializing a Collection View](#initializing-a-collection-view)
    - [Providing the Collection View Data 提供集合视图数据](#providing-the-collection-view-data-提供集合视图数据)
    - [Prefetching Collection View Cells and Data 预取集合视图单元格和数据](#prefetching-collection-view-cells-and-data-预取集合视图单元格和数据)
    - [Managing Collection View Interactions 管理集合视图交互](#managing-collection-view-interactions-管理集合视图交互)
    - [Creating Cells 创建单元格](#creating-cells-创建单元格)
    - [Creating Headers and Footers](#creating-headers-and-footers)
    - [Configuring the Background View 配置背景视图](#configuring-the-background-view-配置背景视图)
    - [Changing the Layout 更改布局](#changing-the-layout-更改布局)
    - [Getting the State of the Collection View 获取集合视图的状态](#getting-the-state-of-the-collection-view-获取集合视图的状态)
    - [Inserting, Moving, and Deleting Items 插入、移动和删除项目](#inserting-moving-and-deleting-items-插入移动和删除项目)
    - [Inserting, Moving, and Deleting Sections 插入、移动和删除部分](#inserting-moving-and-deleting-sections-插入移动和删除部分)
    - [Reordering Items Interactively 交互式重新排序项目](#reordering-items-interactively-交互式重新排序项目-1)
    - [Managing Drag Interactions 管理拖动交互](#managing-drag-interactions-管理拖动交互)
    - [Managing Drop Interactions 管理掉线交互](#managing-drop-interactions-管理掉线交互)
    - [Selecting Cells 选择单元格](#selecting-cells-选择单元格)
    - [Putting the Collection View into Edit Mode  将集合视图置于编辑模式](#putting-the-collection-view-into-edit-mode--将集合视图置于编辑模式)
    - [Locating Items and Views in the Collection View 在集合视图中查找项目和视图](#locating-items-and-views-in-the-collection-view-在集合视图中查找项目和视图)
    - [Getting Layout Information 获取布局信息](#getting-layout-information-获取布局信息)
    - [Scrolling an Item Into View 将项目滚动到视图中](#scrolling-an-item-into-view-将项目滚动到视图中)
    - [Animating Multiple Changes to the Collection View 对集合视图进行多次更改动画](#animating-multiple-changes-to-the-collection-view-对集合视图进行多次更改动画)
    - [Reloading Content 重新加载内容](#reloading-content-重新加载内容)
    - [Identifying Collection View Elements 识别集合视图元素](#identifying-collection-view-elements-识别集合视图元素)
    - [Remembering the Last Focused Cell 记住最后一个聚焦单元格](#remembering-the-last-focused-cell-记住最后一个聚焦单元格)
    - [Resizing Self-Sizing Cells 调整自大小单元格的大小](#resizing-self-sizing-cells-调整自大小单元格的大小)
    - [Instance Properties 实例属性](#instance-properties-实例属性)

<!-- /TOC -->

# UICollectionView

管理有序收集数据项并使用可自定义布局呈现它们的对象。

当您向用户界面添加集合视图时，应用程序的主要工作是管理与该集合视图关联的数据。  
集合视图从数据源对象获取数据，该对象存储在集合视图的dataSource属性中。  
对于您的数据源，您可以使用 UICollectionViewDiffableDataSource 对象，该对象提供了简单高效地管理集合视图数据和用户界面更新所需的行为。或者，您可以通过采用 UICollectionViewDataSource 协议创建自定义数据源对象。

集合视图中的数据被组织成单个项目，您可以将其分组为部分进行演示。  
项目是您想要呈现的最小数据单位。例如，在照片应用程序中，一个项目可能是单个图像。  
集合视图使用单元格在屏幕上显示项目，单元格是数据源配置和提供的UICollectionViewCell类的实例。

除了在用户界面中嵌入UICollectionView外，您还使用集合视图的方法来确保项目的可视化呈现与数据源对象中的顺序相匹配。    UICollectionViewDiffableDataSource对象会`自动管理此过程`。  
如果您使用的是自定义数据源，那么每当您在集合中添加、删除或重新排列数据时，您都会使用UICollectionView的方法来插入、删除和重新排列相应的单元格。

```swift
@MainActor class UICollectionView : UIScrollView
```

# Layouts

布局对象定义了集合视图中内容的可视化排列。  
布局对象是`UICollectionViewLayout`类的子类，它定义了集合视图中所有单元格和补充视图的组织和位置。  
虽然它定义了它们的位置，但布局对象实际上并没有将该信息应用于相应的视图。  
集合视图将布局信息应用于相应的视图，因为单元格和补充视图的创建涉及集合视图和数据源对象之间的协调。  
布局对象就像另一个数据源，只是它`提供视觉信息`而`不是项目数据`。

您通常在创建集合视图时指定布局对象，但您也可以动态更改集合视图的布局。  
布局对象存储在collecteryViewLayout属性中。  
设置此属性会立即直接更新布局，而不会使更改动画化。  
如果您想为更改添加动画效果，请调用setCollectionViewLayout(_:animated:completion:)方法

要创建交互式过渡——由手势识别器或触摸事件驱动的过渡——请使用startInteractiveTransition（to:completion:）方法来更改布局对象。  
该方法安装一个中间布局对象，该对象与您的手势识别器或事件处理代码配合使用，以跟踪过渡进度。  
当您的事件处理代码确定转换已完成时，它会调用finalInteractiveTransition()或cancelInteractiveTransition()方法来删除中间布局对象并安装预期的目标布局对象。

https://developer.apple.com/documentation/uikit/views_and_controls/collection_views/layouts

# 单元格和补充视图

集合视图的数据源对象提供项目的内容和用于呈现该内容的视图。  
当集合视图首次加载其内容时，它会要求其数据源为每个可见项目提供视图。  
`集合视图维护一个队列或视图对象列表，数据源已标记为重用`。您总是对视图进行排队，而不是在代码中显式创建新视图。

有两种方法可以排挤视图。您使用的视图取决于请求的视图类型：

* dequeueReusableCell(withReuseIdentifier:for:)  获取集合视图中项目的单元格。
* dequeueReusableSupplementaryView(ofKind:withReuseIdentifier:for:) 获取布局对象请求的补充视图

在调用这些方法之一之前，如果集合视图不存在，您必须告诉集合视图如何创建相应的视图。  
为此，您必须使用集合视图注册类或笔尖文件。例如，在注册单元格时，您可以使用`register(_:forCellWithReuseIdentifier:)`方法注册类，或使用  
`register(_:forCellWithReuseIdentifier:)`方法注册nib文件。  
作为注册过程的一部分，您指定标识视图目的的`重用标识符`。`这是您稍后排挤视图时使用的相同字符串`。

# Data Prefetching 数据预取

收集视图提供了两种预取技术，可用于提高响应速度：

* 细胞预取可以提前准备好细胞。当集合视图同时需要大量单元格时（例如，网格布局中的新单元格行），请求的单元格比显示所需的时间更早。因此，单元格渲染分布在多个布局通道上，从而获得更流畅的滚动体验。`默认情况下启用单元格预取`。
* 数据预取提供了一种机制，在请求单元格之前通知您收集视图的数据要求。如果您的单元格内容依赖于昂贵的数据加载过程，例如网络请求，这非常有用。将符合`UICollectionViewDataSourcePrefetching`协议的对象分配给`prefetchDataSource`属性，以接收何时预取单元格数据的通知。

# Reordering Items Interactively 交互式重新排序项目

集合视图允许您根据用户交互移动项目。  
通常，集合视图中项目的顺序由您的数据源定义。  
如果您允许用户对项目进行重新排序，您可以配置手势识别器来跟踪用户与集合视图项的交互，并更新该项目的位置。

* 要开始对项目进行交互式重新定位，请调用集合视图的beginInteractiveMovementForItem(at:)方法。  
* 当您的手势识别器跟踪触摸事件时，请调用updateInteractiveMovementTargetPosition（_:）方法来报告触摸位置的变化。  
* 跟踪完手势后，调用endInteractiveMovement()或cancelInteractiveMovement()方法来结束交互并更新集合视图。

在用户交互期间，集合视图动态地使其布局失效，以反映项目的当前位置。  
如果您什么都不做，默认布局行为会为您重新定位项目，但如果您愿意，您可以`自定义布局动画`。  
交互完成后，集合视图会使用项目的新位置更新其数据源对象。

`UICollectionViewController`类提供了一个默认的手势识别器，您可以使用该识别器在其托管集合视图中重新排列项目。  
要安装此手势识别器，请将集合视图控制器的`installsStandardGestureForInteractiveMovement`属性设置为true。

# API

## Initializing a Collection View

```swift
// 使用指定的框架和布局创建一个集合视图对象。
init(frame: CGRect, collectionViewLayout: UICollectionViewLayout)

// 
init?(coder: NSCoder)

```

## Providing the Collection View Data 提供集合视图数据

```swift
// 为集合视图提供数据的对象。
var dataSource: UICollectionViewDataSource?

// 您用于管理数据和为集合视图提供单元格的对象。
class UICollectionViewDiffableDataSource
```

## Prefetching Collection View Cells and Data 预取集合视图单元格和数据

```swift
// 一个布尔值，指示是否启用了单元格和数据预取。
// 默认：true
var isPrefetchingEnabled: Bool

// 作为集合视图预取数据源的对象，接收即将到来的单元格数据要求的通知。
var prefetchDataSource: UICollectionViewDataSourcePrefetching?

```

## Managing Collection View Interactions 管理集合视图交互

```swift
// 作为集合视图委托的对象。
var delegate: UICollectionViewDelegate?

```

## Creating Cells 创建单元格

```swift
// 集合视图单元格的注册。
// U创建单元格注册后，您将其传递给dequeueConfiguredReusableCell（using:for:item:），您从数据源的单元格提供商调用该单元格。
struct UICollectionView.CellRegistration

// 将配置的可重用单元格对象排入队列。
func dequeueConfiguredReusableCell<Cell, Item>(using: UICollectionView.CellRegistration<Cell, Item>, for: IndexPath, item: Item?) -> Cell

// 注册一个类，用于创建新的集合视图单元格。
func register(AnyClass?, forCellWithReuseIdentifier: String)
func register(UINib?, forCellWithReuseIdentifier: String)

// 排挤由其标识符定位的可重用单元格对象。
func dequeueReusableCell(withReuseIdentifier: String, for: IndexPath) -> UICollectionViewCell
```

## Creating Headers and Footers

```swift
// 注册集合视图的补充视图。
struct UICollectionView.SupplementaryRegistration

// 将配置的可重用补充视图对象排入队列。
func dequeueConfiguredReusableSupplementary<Supplementary>(using: UICollectionView.SupplementaryRegistration<Supplementary>, for: IndexPath) -> Supplementary

// 注册一个类，用于为集合视图创建补充视图。
func register(AnyClass?, forSupplementaryViewOfKind: String, withReuseIdentifier: String)

// 注册一个笔尖文件，用于为集合视图创建补充视图。
func register(UINib?, forSupplementaryViewOfKind: String, withReuseIdentifier: String)

// 排挤由其标识符和类型定位的可重用补充视图。
func dequeueReusableSupplementaryView(ofKind: String, withReuseIdentifier: String, for: IndexPath) -> UICollectionReusableView
```

## Configuring the Background View 配置背景视图

```swift
// 提供背景外观的视图。
var backgroundView: UIView?
```

## Changing the Layout 更改布局

```swift
// 用于组织收集视图项目的布局。
var collectionViewLayout: UICollectionViewLayout

// 更改集合视图的布局，并可选地为更改添加动画效果。
func setCollectionViewLayout(UICollectionViewLayout, animated: Bool)

// 更改集合视图的布局，并在动画完成后通知您。
func setCollectionViewLayout(UICollectionViewLayout, animated: Bool, completion: ((Bool) -> Void)?)

// 使用交互式过渡效果更改集合视图的当前布局。
// typealias LayoutInteractiveTransitionCompletion = (Bool, Bool) -> Void
// 此完成块采用以下参数：
// completed 一个布尔值，指示动画是否运行到完成。
// finish 一个布尔值，指示过渡是已完成还是已取消。 如果过渡运行到完成并安装了新布局，则此参数为真。如果用户取消了过渡并安装了旧布局，则为false。
func startInteractiveTransition(to: UICollectionViewLayout, completion: UICollectionView.LayoutInteractiveTransitionCompletion?) -> UICollectionViewTransitionLayout

// 告诉集合视图通过安装预期的目标布局来完成交互式过渡。
func finishInteractiveTransition()

// 告诉集合视图取消交互式过渡并返回其原始布局对象。
func cancelInteractiveTransition()

```

## Getting the State of the Collection View 获取集合视图的状态

```swift
// 集合视图显示的部分数量。
var numberOfSections: Int

// 获取指定部分中的物品数量。
func numberOfItems(inSection: Int) -> Int

// 集合视图当前显示的可见单元格数组。
var visibleCells: [UICollectionViewCell]

```

## Inserting, Moving, and Deleting Items 插入、移动和删除项目

```swift
// 在指定的索引路径上插入新项目。
func insertItems(at: [IndexPath])

// 在集合视图中将项目从一个位置移动到另一个位置。
func moveItem(at: IndexPath, to: IndexPath)

// 删除指定索引路径上的项目。
func deleteItems(at: [IndexPath])


```

## Inserting, Moving, and Deleting Sections 插入、移动和删除部分

```swift
// 在指定的索引处插入新部分。
func insertSections(IndexSet)

// 在集合视图中将一个部分从一个位置移动到另一个位置。
func moveSection(Int, toSection: Int)

// 删除指定索引的部分。
func deleteSections(IndexSet)

```

## Reordering Items Interactively 交互式重新排序项目

```swift
// 在指定的索引路径上启动项目的交互移动。
func beginInteractiveMovementForItem(at: IndexPath) -> Bool

// 更新项目在集合视图边界内的位置。
func updateInteractiveMovementTargetPosition(CGPoint)

// 结束交互式移动跟踪，并将目标项目移动到其新位置。
func endInteractiveMovement()

// 结束交互式移动跟踪，并将目标物品返回到其原始位置。
func cancelInteractiveMovement()

```

## Managing Drag Interactions 管理拖动交互

```swift
// 管理从集合视图拖动项目的委托对象。
var dragDelegate: UICollectionViewDragDelegate?

// 一个布尔值，指示项目是否已从集合视图中删除，尚未删除。
var hasActiveDrag: Bool

// 一个布尔值，指示集合视图是否支持拖动内容。
var dragInteractionEnabled: Bool

```

## Managing Drop Interactions 管理掉线交互

```swift
// 管理将项目下放到集合视图的委托对象。
var dropDelegate: UICollectionViewDropDelegate?

// 一个布尔值，指示集合视图当前是否正在跟踪删除会话。
var hasActiveDrop: Bool

// 集合视图中的项目重新排序以显示潜在掉落位置的速度。
// enum ReorderingCadence : Int, @unchecked Sendable
// case immediate 项目将立即重新排序到位。
// case fast 项目重新排序很快，但延迟时间很短。
// case slow 延迟后，项目会重新订购。
var reorderingCadence: UICollectionView.ReorderingCadence

```

## Selecting Cells 选择单元格

```swift
// 所选项目的索引路径。
var indexPathsForSelectedItems: [IndexPath]?

//  在指定的索引路径上选择项目，并可选择将其滚动到视图中。
func selectItem(at: IndexPath?, animated: Bool, scrollPosition: UICollectionView.ScrollPosition)

// 在指定的索引处取消选择项目。
func deselectItem(at: IndexPath, animated: Bool)

// 一个布尔值，指示用户是否可以在集合视图中选择项目。
var allowsSelection: Bool

// 确定用户是否可以在集合视图中选择多个项目的布尔值。
var allowsMultipleSelection: Bool

// 一个布尔值，用于确定用户是否可以在集合视图处于编辑模式时选择单元格。
var allowsSelectionDuringEditing: Bool

//  一个布尔值，用于控制用户是否可以在编辑模式下同时选择多个单元格。
var allowsMultipleSelectionDuringEditing: Bool

// 当焦点移动到单元格时触发自动选择的布尔值。
var selectionFollowsFocus: Bool

```

## Putting the Collection View into Edit Mode  将集合视图置于编辑模式

```swift
// 一个布尔值，用于确定集合视图是否处于编辑模式。
var isEditing: Bool

```

## Locating Items and Views in the Collection View 在集合视图中查找项目和视图

```swift
// 获取集合视图中指定点项目的索引路径
func indexPathForItem(at: CGPoint) -> IndexPath?

// 集合视图中可见项目的数组。
var indexPathsForVisibleItems: [IndexPath]

// 获取指定单元格的索引路径。
func indexPath(for: UICollectionViewCell) -> IndexPath?

// 获取您指定的索引路径上的单元格对象。
func cellForItem(at: IndexPath) -> UICollectionViewCell?

// 获取指定类型的所有可见补充视图的索引路径。
func indexPathsForVisibleSupplementaryElements(ofKind: String) -> [IndexPath]

// 获取指定索引路径的补充视图。
func supplementaryView(forElementKind: String, at: IndexPath) -> UICollectionReusableView?

// 获取指定类型的可见补充视图数组。
func visibleSupplementaryViews(ofKind: String) -> [UICollectionReusableView]
```

## Getting Layout Information 获取布局信息

```swift
// 获取指定索引路径上项目的布局信息。
func layoutAttributesForItem(at: IndexPath) -> UICollectionViewLayoutAttributes?

// 获取指定补充视图的布局信息。
func layoutAttributesForSupplementaryElement(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?
```

## Scrolling an Item Into View 将项目滚动到视图中

```swift
// 滚动集合视图内容，直到指定项目可见。
// struct UICollectionView.ScrollPosition
// static var top: UICollectionView.ScrollPosition
// static var centeredVertically: UICollectionView.ScrollPosition
// static var bottom: UICollectionView.ScrollPosition
// static var left: UICollectionView.ScrollPosition
// static var centeredHorizontally: UICollectionView.ScrollPosition
// static var right: UICollectionView.ScrollPosition
func scrollToItem(at: IndexPath, at: UICollectionView.ScrollPosition, animated: Bool)

// 指示布局滚动方向的常量。
// case vertical The layout scrolls content vertically.
// case horizontal The layout scrolls content horizontally.
enum UICollectionView.ScrollDirection

```

## Animating Multiple Changes to the Collection View 对集合视图进行多次更改动画

```swift
//  将多个插入、删除、重新加载和移动操作作为一个组添加动画效果。
func performBatchUpdates((() -> Void)?, completion: ((Bool) -> Void)?)

```

## Reloading Content 重新加载内容

```swift
// 一个布尔值，指示集合视图是包含删除占位符，还是作为处理删除的一部分对其项目进行重新排序。
var hasUncommittedUpdates: Bool

// 在您指定的索引路径上更新项目的数据，保留项目的现有单元格。
func reconfigureItems(at: [IndexPath])

// 重新加载集合视图的所有数据。
func reloadData()

// 在集合视图的指定部分中重新加载数据。
func reloadSections(IndexSet)

// 只在指定的索引路径上重新加载项目。
func reloadItems(at: [IndexPath])
```

## Identifying Collection View Elements 识别集合视图元素

```swift
// 指定视图类型的常量。
// case cell 视图是一个单元格。
// case supplementaryView 该观点是一种补充观点。
// case decorationView 视图是装饰视图。
enum UICollectionView.ElementCategory

// 标识给定部分页脚的补充视图。
class let elementKindSectionFooter: String

// 标识给定部分标题的补充视图。
class let elementKindSectionHeader: String

```

## Remembering the Last Focused Cell 记住最后一个聚焦单元格

```swift
// 一个布尔值，指示集合视图是否在最后一个聚焦索引路径上自动将焦点分配给项目。
var remembersLastFocusedIndexPath: Bool

```

## Resizing Self-Sizing Cells 调整自大小单元格的大小

```swift
//
// iso16
var selfSizingInvalidation: UICollectionView.SelfSizingInvalidation
```

## Instance Properties 实例属性

```swift
// 允许焦点
var allowsFocus: Bool
var allowsFocusDuringEditing: Bool
var contextMenuInteraction: UIContextMenuInteraction?
```