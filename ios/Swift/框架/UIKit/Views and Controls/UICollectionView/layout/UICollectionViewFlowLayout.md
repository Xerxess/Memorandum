<!-- TOC -->

- [UICollectionViewFlowLayout](#uicollectionviewflowlayout)
- [API](#api)
    - [Configuring the Scroll Direction 配置滚动方向](#configuring-the-scroll-direction-配置滚动方向)
    - [Configuring Item Spacing 配置项目间距](#configuring-item-spacing-配置项目间距)
    - [Configuring Headers and Footers 配置页眉和页脚](#configuring-headers-and-footers-配置页眉和页脚)
    - [Pinning Headers and Footers 固定页眉和页脚](#pinning-headers-and-footers-固定页眉和页脚)

<!-- /TOC -->

# UICollectionViewFlowLayout

一个布局对象，将项目组织到网格中，每个部分都有可选的页眉和页脚视图。

流布局是一种集合视图布局。集合视图中的项目从一行或列（取决于滚动方向）流到下一行，每行包含尽可能多的单元格。  
单元格可以是相同大小或不同大小。
流布局与集合视图的委托对象一起工作，以确定每个部分和网格中的项目、页眉和页脚的大小。  
该委托对象必须符合UICollectionViewDelegateFlowLayout协议。使用委托允许您动态调整布局信息。例如，您可以使用委托对象为网格中的项目指定不同的大小。  
如果您不提供委托，则流布局将使用您在此类属性中设置的默认值。

流布局使用一个方向的固定距离和另一个方向的可滚动距离来布局其内容。例如，在垂直滚动网格中，网格内容的宽度受限于相应集合视图的宽度，而内容的高度则动态调整，以匹配网格中的部分和项目数量。  
`默认情况下，布局垂直滚动，但您可以使用滚动方向属性配置滚动方向`。

流程布局中的每个部分都可以有自己的自定义页眉和页脚。  
要为视图配置页眉或页脚，请将页眉或页脚的大小配置为非零。  
实现适当的委托方法或为headerReferenceSize和footerReferenceSize属性分配适当的值。如果页眉或页脚大小为0，则不会将相应的视图添加到集合视图中。

```swift
@MainActor class UICollectionViewFlowLayout : UICollectionViewLayout
```

# API 

## Configuring the Scroll Direction 配置滚动方向

```swift
// 网格的滚动方向。
// enum ScrollDirection : Int, @unchecked Sendable
// case vertical
// case horizontal
var scrollDirection: UICollectionView.ScrollDirection

```

## Configuring Item Spacing 配置项目间距

```swift
// 网格中项目行之间的最小间距。
var minimumLineSpacing: CGFloat

// 同一行项目之间的最小间距。
var minimumInteritemSpacing: CGFloat

// 用于单元格的默认大小。
var itemSize: CGSize

// 集合视图中单元格的估计大小。
var estimatedItemSize: CGSize

// 自调整大小单元格的占位符大小。
class let automaticSize: CGSize

// 用于在一节中布局内容的边距。
var sectionInset: UIEdgeInsets

// 部分插入的边界是相对的。
// enum SectionInsetReference : Int, @unchecked Sendable
// case fromContentInset 节集是根据集合视图的内容集来定义的。
// case fromLayoutMargins 章节集是根据布局的边距定义的。
// case fromSafeArea 部分插入是根据布局的安全区域定义的。
var sectionInsetReference: UICollectionViewFlowLayout.SectionInsetReference


```

## Configuring Headers and Footers 配置页眉和页脚

```swift
// 用于部分标题的默认大小。
var headerReferenceSize: CGSize

// 用于部分页脚的默认尺寸。
var footerReferenceSize: CGSize

```

## Pinning Headers and Footers 固定页眉和页脚

```swift
// 一个布尔值，指示标题在滚动期间是否固定在集合视图边界的顶部。
var sectionHeadersPinToVisibleBounds: Bool

// 一个布尔值，指示页脚在滚动期间是否固定在集合视图边界的底部。
var sectionFootersPinToVisibleBounds: Bool

```