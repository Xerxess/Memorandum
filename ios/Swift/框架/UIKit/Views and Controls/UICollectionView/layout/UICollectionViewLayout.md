<!-- TOC -->

- [UICollectionViewLayout](#uicollectionviewlayout)
- [API](#api)
    - [init](#init)
    - [Getting the Collection View Information 获取收藏视图信息](#getting-the-collection-view-information-获取收藏视图信息)
    - [Providing Layout Attributes 提供布局属性](#providing-layout-attributes-提供布局属性)
    - [Responding to Collection View Updates 回复收集视图更新](#responding-to-collection-view-updates-回复收集视图更新)
    - [Invalidating the Layout 取消布局无效](#invalidating-the-layout-取消布局无效)
    - [Coordinating Animated Changes 协调动画变化](#coordinating-animated-changes-协调动画变化)
    - [Transitioning Between Layouts 布局之间的过渡](#transitioning-between-layouts-布局之间的过渡)
    - [Registering Decoration Views 注册装饰视图](#registering-decoration-views-注册装饰视图)
    - [Supporting Right-To-Left Layouts 支持从右到左布局](#supporting-right-to-left-layouts-支持从右到左布局)

<!-- /TOC -->

# UICollectionViewLayout

用于为集合视图生成布局信息的抽象基类。

布局对象确定单元格、补充视图和装饰视图在集合视图边界内的位置，并将该信息报告给集合视图。然后，集合视图将提供的布局信息应用于相应的视图，以便它们可以在屏幕上显示。

`您必须子类UICollectionViewLayout才能使用它`。
然而，在您考虑子分类之前，请考虑是否可以根据布局需求调整UICollectionViewCompositionalLayout。

子分类注释

布局对象根据布局的设计定义集合视图中项目的位置、大小和视觉状态。布局视图由集合视图的数据源创建。
您可以在集合视图中布局三种类型的视觉元素：
* 单元格是布局定位的主要元素。每个单元格表示集合中的单个数据项。您可以使单元格具有交互性，以便用户可以执行选择、拖动和重新排序单元格等操作。集合视图可以有一组单元格，也可以将这些单元格分为多个部分。布局对象在集合视图的内容区域中排列单元格。
* 补充视图显示数据，但用户无法选择。您可以使用补充视图为给定部分或整个集合视图实现页眉和页脚视图等内容。补充视图是可选的，它们的使用和位置由布局对象定义。
* 装饰视图是视觉装饰，如徽章，无法选择，并且本质上不与集合视图的数据绑定。装饰视图是另一种类型的补充视图。与补充视图一样，它们是可选的，它们的使用和位置由布局对象定义。

覆盖方法
每个布局对象都应该实现以下方法：
* *ollectionView内容大小
* layoutAttributesForElements（in:）
* layoutAttributesForItem（at:）
* layoutAttributesForSupplementaryView（ofKind:at:）（如果您的布局支持补充视图）
* layoutAttributesForDecorationView（ofKind:at:）（如果您的布局支持装饰视图）
* shouldInvalidate布局（用于BoundsChange：）

这些方法提供了集合视图在屏幕上放置内容所需的基本布局信息。  
`如果您的布局不支持补充或装饰视图，请不要实现相应的方法`。

当集合视图中的数据发生变化并插入或删除项目时，集合视图要求其布局对象更新布局信息。  
具体来说，任何被移动、添加或删除的项目都必须更新其布局信息，以反映其新位置。  
对于移动的项目，集合视图使用标准方法来检索项目更新的布局属性。  
对于要插入或删除的项目，集合视图调用一些不同的方法，您应该重写这些方法以提供适当的布局信息：
* initialLayoutAttributesForAppearingItem(at:)
* initialLayoutAttributesForAppearingSupplementaryElement(ofKind:at:)
* initialLayoutAttributesForAppearingDecorationElement(ofKind:at:)
* finalLayoutAttributesForDisappearingItem(at:)
* finalLayoutAttributesForDisappearingSupplementaryElement(ofKind:at:)
* finalLayoutAttributesForDisappearingDecorationElement(ofKind:at:)

# API

## init

```swift
init()
Creates a collection view layout object.
init?(coder: NSCoder)
Creates a collection view layout object from data in a given unarchiver.
```

## Getting the Collection View Information 获取收藏视图信息

```swift
// 集合视图对象当前使用此布局对象。
// 当向其分配新的布局对象时，集合视图对象会设置此属性的值。
var collectionView: UICollectionView? { get }

// 集合视图内容的宽度和高度。
// 子类必须覆盖此属性，并使用它来返回集合视图内容的宽度和高度。
// 这些值代表所有内容的宽度和高度，而不仅仅是当前可见的内容。集合视图使用此信息来配置自己的内容大小以进行滚动。
// 默认实现返回CGSizeZero。
var collectionViewContentSize: CGSize { get }
```

## Providing Layout Attributes 提供布局属性

```swift
// 创建布局属性对象时要使用的类。
class var layoutAttributesClass: AnyClass

// 告诉布局对象更新当前布局。
func prepare()

// 检索指定矩形中所有单元格和视图的布局属性。
func layoutAttributesForElements(in: CGRect) -> [UICollectionViewLayoutAttributes]?

// 使用相应的单元格在指定的索引路径上检索项目的布局信息。
func layoutAttributesForItem(at: IndexPath) -> UICollectionViewLayoutAttributes?

// 当用户交互式移动项目时，检索该项目的布局属性。
func layoutAttributesForInteractivelyMovingItem(at: IndexPath, withTargetPosition: CGPoint) -> UICollectionViewLayoutAttributes

// 检索指定补充视图的布局属性。
func layoutAttributesForSupplementaryView(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索指定装饰视图的布局属性。
func layoutAttributesForDecorationView(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索动画布局更新或更改后要使用的内容偏移量。
func targetContentOffset(forProposedContentOffset: CGPoint) -> CGPoint

// 检索停止滚动的点。
func targetContentOffset(forProposedContentOffset: CGPoint, withScrollingVelocity: CGPoint) -> CGPoint
```

## Responding to Collection View Updates 回复收集视图更新

```swift
// 通知布局对象集合视图的内容即将更改。
func prepare(forCollectionViewUpdates: [UICollectionViewUpdateItem])

// 在集合视图更新期间执行所需的任何其他动画或清理。
func finalizeCollectionViewUpdates()

// 检索要添加到布局中的补充视图的索引路径数组。
func indexPathsToInsertForSupplementaryView(ofKind: String) -> [IndexPath]

// 检索表示要添加的装饰视图的索引路径数组。
func indexPathsToInsertForDecorationView(ofKind: String) -> [IndexPath]

// 检索正在插入集合视图的项目的起始布局信息。
func initialLayoutAttributesForAppearingItem(at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索插入集合视图的补充视图的起始布局信息。
func initialLayoutAttributesForAppearingSupplementaryElement(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索插入集合视图的装饰视图的起始布局信息。
func initialLayoutAttributesForAppearingDecorationElement(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索代表要删除的补充视图的索引路径数组。
func indexPathsToDeleteForSupplementaryView(ofKind: String) -> [IndexPath]

// 检索表示要删除的装饰视图的索引路径数组。
func indexPathsToDeleteForDecorationView(ofKind: String) -> [IndexPath]

// 检索即将从集合视图中删除的项目的最终布局信息。
func finalLayoutAttributesForDisappearingItem(at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索即将从集合视图中删除的补充视图的最终布局信息。
func finalLayoutAttributesForDisappearingSupplementaryElement(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?

// 检索即将从集合视图中删除的装饰视图的最终布局信息。
func finalLayoutAttributesForDisappearingDecorationElement(ofKind: String, at: IndexPath) -> UICollectionViewLayoutAttributes?

// 当项目位于集合视图边界的指定位置时，检索其索引路径。
func targetIndexPath(forInteractivelyMovingItem: IndexPath, withPosition: CGPoint) -> IndexPath
```

## Invalidating the Layout 取消布局无效

```swift
// 取消当前布局并触发布局更新。
func invalidateLayout()

// 使用提供的上下文对象中的信息使当前布局无效。
func invalidateLayout(with: UICollectionViewLayoutInvalidationContext)

// 返回在为布局创建无效上下文时要使用的类。
class var invalidationContextClass: AnyClass

// 询问布局对象新边界是否需要布局更新。
func shouldInvalidateLayout(forBoundsChange: CGRect) -> Bool

// 检索一个上下文对象，该对象定义了布局中在边界更改时应该更改的部分。
func invalidationContext(forBoundsChange: CGRect) -> UICollectionViewLayoutInvalidationContext

// 询问布局对象对自大小单元格的更改是否需要更新布局。
func shouldInvalidateLayout(forPreferredLayoutAttributes: UICollectionViewLayoutAttributes, withOriginalAttributes: UICollectionViewLayoutAttributes) -> Bool

// 检索一个上下文对象，该对象标识布局中应根据动态单元格更改而更改的部分。
func invalidationContext(forPreferredLayoutAttributes: UICollectionViewLayoutAttributes, withOriginalAttributes: UICollectionViewLayoutAttributes) -> UICollectionViewLayoutInvalidationContext

// 检索一个上下文对象，该对象标识在布局中交互式移动的项目。
func invalidationContext(forInteractivelyMovingItems: [IndexPath], withTargetPosition: CGPoint, previousIndexPaths: [IndexPath], previousPosition: CGPoint) -> UICollectionViewLayoutInvalidationContext

// 检索标识已移动项目的上下文对象
func invalidationContextForEndingInteractiveMovementOfItems(toFinalIndexPaths: [IndexPath], previousIndexPaths: [IndexPath], movementCancelled: Bool) -> UICollectionViewLayoutInvalidationContext
```

## Coordinating Animated Changes 协调动画变化 

```swift
// 为视图边界的动画更改或插入或删除项目准备布局对象。
func prepare(forAnimatedBoundsChange: CGRect)

// 在对视图边界进行任何动画更改后或插入或删除项目后进行清理。
func finalizeAnimatedBoundsChange()

```

## Transitioning Between Layouts 布局之间的过渡

```swift
// 告诉布局对象准备安装为集合视图的布局。
func prepareForTransition(from: UICollectionViewLayout)

// 告诉布局对象，它即将被删除为集合视图的布局。
func prepareForTransition(to: UICollectionViewLayout)

// 告诉布局对象在过渡动画发生之前执行任何最终步骤。
func finalizeLayoutTransition()

```

## Registering Decoration Views 注册装饰视图

```swift
// 注册一个类，用于为集合视图创建装饰视图。
func register(AnyClass?, forDecorationViewOfKind: String)

// 注册一个笔尖文件，用于为集合视图创建装饰视图。
func register(UINib?, forDecorationViewOfKind: String)

``` 

## Supporting Right-To-Left Layouts 支持从右到左布局

```swift
// 您在设计自定义布局时使用的语言的方向。
var developmentLayoutDirection: UIUserInterfaceLayoutDirection

// 一个布尔值，指示水平坐标系是否在适当时间自动翻转。
var flipsHorizontallyInOppositeLayoutDirection: Bool

```