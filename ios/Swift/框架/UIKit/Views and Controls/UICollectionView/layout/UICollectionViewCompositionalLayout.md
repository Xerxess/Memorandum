<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UICollectionViewCompositionalLayout](#uicollectionviewcompositionallayout)
  - [必要知识点](#必要知识点)
  - [Configuration](#configuration)
    - [UICollectionViewCompositionalLayoutConfiguration](#uicollectionviewcompositionallayoutconfiguration)
    - [UICollectionViewCompositionalLayoutSectionProvider](#uicollectionviewcompositionallayoutsectionprovider)
    - [NSCollectionLayoutEnvironment](#nscollectionlayoutenvironment)
  - [UICollectionLayoutSectionOrthogonalScrollingBehavior](#uicollectionlayoutsectionorthogonalscrollingbehavior)
  - [Appearance](#appearance)
    - [NSCollectionLayoutAnchor 定义如何在集合视图中将补充项目附加到项目的对象](#nscollectionlayoutanchor-定义如何在集合视图中将补充项目附加到项目的对象)
    - [NSCollectionLayoutSupplementaryItem 用于为集合视图中的项目添加额外视觉装饰的对象](#nscollectionlayoutsupplementaryitem-用于为集合视图中的项目添加额外视觉装饰的对象)
    - [NSCollectionLayoutBoundarySupplementaryItem 用于为集合视图添加页眉或页脚的对象](#nscollectionlayoutboundarysupplementaryitem-用于为集合视图添加页眉或页脚的对象)
    - [NSCollectionLayoutDecorationItem 用于为集合视图的某个 section 添加背景的对象](#nscollectionlayoutdecorationitem-用于为集合视图的某个-section-添加背景的对象)

<!-- /code_chunk_output -->

# UICollectionViewCompositionalLayout

一种布局对象，可让您以高度自适应和灵活的视觉排列方式组合项目

```swift
func createBasicListLayout() -> UICollectionViewLayout { 
    let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0), heightDimension: .fractionalHeight(1.0))    
    let item = NSCollectionLayoutItem(layoutSize: itemSize)  
  
    let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0), heightDimension: .absolute(44))    
    let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,  subitems: [item])  
  
    let section = NSCollectionLayoutSection(group: group)    

    let layout = UICollectionViewCompositionalLayout(section: section)    
    return layout
}
```

## 必要知识点

- iOS 13.0+
- UICollectionViewCompositionalLayout
  - init(section: NSCollectionLayoutSection) 创建具有单个部分的组合布局对象。
  - init(section: NSCollectionLayoutSection, configuration: UICollectionViewCompositionalLayoutConfiguration) 创建一个包含单个部分和附加配置的组合布局对象。
  - init(sectionProvider: UICollectionViewCompositionalLayoutSectionProvider) 创建一个组合布局对象，该对象包含一个提供布局部分的部分提供者。
  - init(sectionProvider: UICollectionViewCompositionalLayoutSectionProvider, configuration: UICollectionViewCompositionalLayoutConfiguration) 创建一个组合布局对象，其中包含一个部分提供者和一个附加配置。
  - static func list(using: UICollectionLayoutListConfiguration) -> UICollectionViewCompositionalLayout 创建只包含指定配置的列表部分的组合布局。
- NSCollectionLayoutItem
  - init(layoutSize: NSCollectionLayoutSize)
  - init(layoutSize: NSCollectionLayoutSize, supplementaryItems: [NSCollectionLayoutSupplementaryItem]) 创建一个具有指定大小的项目，并创建一个可附加到该项目上的补充项目数组。
  - var edgeSpacing: NSCollectionLayoutEdgeSpacing? 使用此属性可调整项目相对于其容器和其他项目的位置。例如，可以使用此属性为每个项目的尾部边缘应用额外空间
  - var contentInsets: NSDirectionalEdgeInsets 在计算项目位置后，为调整其最终大小而在项目内容周围添加的空间大小。
- class NSCollectionLayoutGroup : NSCollectionLayoutItem 组决定了集合视图中项目之间的布局关系。一个组可能以横排、竖列或自定义排列的方式布局其项目。组决定了项目之间的呈现规则，但`组本身并不呈现任何内容`。
  - class func horizontal(layoutSize: NSCollectionLayoutSize, subitems: [NSCollectionLayoutItem]) -> Self
  - class func horizontal(layoutSize: NSCollectionLayoutSize, repeatingSubitem: NSCollectionLayoutItem, count: Int) -> Self
  - class func vertical(layoutSize: NSCollectionLayoutSize, subitems: [NSCollectionLayoutItem]) -> Self
  - class func vertical(layoutSize: NSCollectionLayoutSize, repeatingSubitem: NSCollectionLayoutItem, count: Int) -> Self
  - class func custom(layoutSize: NSCollectionLayoutSize, itemProvider: NSCollectionLayoutGroupCustomItemProvider) -> Self
  - var supplementaryItems: [NSCollectionLayoutSupplementaryItem] 锚定在组中的补充项目阵列。
  - var interItemSpacing: NSCollectionLayoutSpacing? 组内项目之间的间距。
- class NSCollectionLayoutSection : NSObject 集合视图布局有一个或多个部分。版块提供了一种将布局分隔成不同部分的方法。
  - init(group: NSCollectionLayoutGroup)
  - static func list(using: UICollectionLayoutListConfiguration, layoutEnvironment: any NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection 使用指定的列表配置和布局环境创建列表部分。
  - class func orthogonalLayoutSectionForMediaItems() -> NSCollectionLayoutSection 以系统默认间距创建正交滚动部分。
  - var orthogonalScrollingBehavior: UICollectionLayoutSectionOrthogonalScrollingBehavior 与主布局轴相关的部分滚动行为
  - var orthogonalScrollingProperties: UICollectionLayoutSectionOrthogonalScrollingProperties 小节的正交滚动属性。
  - var interGroupSpacing: CGFloat 组与组之间的间距。
  - var contentInsets: NSDirectionalEdgeInsets 小节内容与其边界之间的空间大小。
  - var contentInsetsReference: UIContentInsetsReference 定义内容嵌入时参考的边界。
  - var boundarySupplementaryItems: [NSCollectionLayoutBoundarySupplementaryItem] 与段落边界边缘（如页眉和页脚）相关的补充项数组。
  - var decorationItems: [NSCollectionLayoutDecorationItem] 锚定在部分上的装饰项（如背景装饰视图）的数组。
- NSCollectionLayoutDimension
  - class func absolute(CGFloat) -> Self 绝对点值
  - class func estimated(CGFloat) -> Self 估计点值 如果内容的大小可能在运行时发生变化，如加载数据或系统字体大小发生变化时，请使用估计值。
  - class func fractionalHeight(CGFloat) -> Self 使用分数值来定义相对于项目容器尺寸的值
  - class func fractionalWidth(CGFloat) -> Self 使用分数值来定义相对于项目容器尺寸的值
  - class func uniformAcrossSiblings(estimate: CGFloat) -> Self
- NSCollectionLayoutSize 集合视图中项目的宽度和高度
- NSCollectionLayoutSpacing 定义集合视图中项目之间或周围空间的对象
  - class func fixed(CGFloat) -> Self 指定点数的空间
  - class func flexible(CGFloat) -> Self 创建一个相当于或大于指定点数的空间
- NSCollectionLayoutEdgeSpacing 定义集合视图中项目边缘空间的对象
  - init(leading: NSCollectionLayoutSpacing?, top: NSCollectionLayoutSpacing?, trailing: NSCollectionLayoutSpacing?, bottom: NSCollectionLayoutSpacing?)

## Configuration

### UICollectionViewCompositionalLayoutConfiguration

定义布局的滚动方向、段落间距、页眉或页脚的对象。

使用布局配置可以修改集合视图布局的默认滚动方向，在布局的每个部分之间添加额外的间距，以及在整个布局中添加页眉或页脚。

```swift
let headerFooterSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),heightDimension: .estimated(44))
let header = NSCollectionLayoutBoundarySupplementaryItem(layoutSize: headerFooterSize,elementKind: "header",alignment: .top)
let footer = NSCollectionLayoutBoundarySupplementaryItem(layoutSize: headerFooterSize,elementKind: "footer",alignment: .bottom)

let config = UICollectionViewCompositionalLayoutConfiguration()
config.interSectionSpacing = 20
config.scrollDirection = .horizontal
config.boundarySupplementaryItems = [header, footer]
```

### UICollectionViewCompositionalLayoutSectionProvider

一个闭包，用于创建并返回布局的每个部分。

```swift
func createPerSectionLayout() -> UICollectionViewLayout {
    let layout = UICollectionViewCompositionalLayout { (sectionIndex: Int,
        layoutEnvironment: NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection? in
        let columns = sectionIndex == 0 ? 2 : 4
        
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),heightDimension: .absolute(44))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,subitem: item,count: columns)
        
        let section = NSCollectionLayoutSection(group: group)
        return section
    }
    return layout
}
```

### NSCollectionLayoutEnvironment

- var container: any NSCollectionLayoutContainer 有关布局容器的信息，如尺寸和内容嵌入
  - var contentSize: CGSize 应用内容嵌入前容器的大小
  - var effectiveContentSize: CGSize 应用内容嵌入后容器的大小
- var traitCollection: UITraitCollection 描述布局当前环境的特征，如尺寸类别和显示比例因子

```swift
// 使用布局环境的特质集合来检查用户界面是否处于暗模式
let layout = UICollectionViewCompositionalLayout { (sectionIndex: Int,
    layoutEnvironment: NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection in
    if layoutEnvironment.traitCollection.userInterfaceStyle == .dark {
        return sectionForUserInterfaceStyle(.dark)
    } else {
        return sectionForUserInterfaceStyle(.light)
    }
}
```

## UICollectionLayoutSectionOrthogonalScrollingBehavior

布局各 sections 相对于布局主轴的滚动行为

- case none 不允许用户正交滚动其内容
- case continuous 通过连续滚动的方式正交滚动该部分的内容
- case continuousGroupLeadingBoundary 正交滚动该部分的内容，并在可见组的前端边界自然停止
- case paging 该部分允许用户对其内容进行正交分页
- case groupPaging 通过该版块每次正交地翻阅一组内容
- case groupPagingCentered 每次正交翻页一个组的内容，并将每个组居中

## Appearance

### NSCollectionLayoutAnchor 定义如何在集合视图中将补充项目附加到项目的对象

使用锚点可以将补充项目附加到特定项目上。锚点包含补充项目在项目上的`附加位置信息`

```swift
let itemSize = NSCollectionLayoutSize(widthDimension: .absolute(44),heightDimension: .absolute(44))
// 定义 NSCollectionLayoutAnchor
let badgeAnchor = NSCollectionLayoutAnchor(edges: [.top, .trailing],fractionalOffset: CGPoint(x: 0.3, y: -0.3))
let badgeSize = NSCollectionLayoutSize(widthDimension: .absolute(20),heightDimension: .absolute(20))
let badge = NSCollectionLayoutSupplementaryItem(layoutSize: badgeSize,elementKind: "badge",containerAnchor: badgeAnchor)
let item = NSCollectionLayoutItem(layoutSize: itemSize,supplementaryItems: [badge])
```

### NSCollectionLayoutSupplementaryItem 用于为集合视图中的项目添加额外视觉装饰的对象

您可以使用补充项目为内容附加其他视图。例如，你可以给一个项目附加一个徽章，或者给一个组附加一个框架。补充项目遵循所附加项目的索引路径。

```swift
class NSCollectionLayoutSupplementaryItem : NSCollectionLayoutItem
```

```swift
let itemSize = NSCollectionLayoutSize(widthDimension: .absolute(44),heightDimension: .absolute(44))
let badgeAnchor = NSCollectionLayoutAnchor(edges: [.top, .trailing],fractionalOffset: CGPoint(x: 0.3, y: -0.3))
let badgeSize = NSCollectionLayoutSize(widthDimension: .absolute(20),heightDimension: .absolute(20))
let badge = NSCollectionLayoutSupplementaryItem(layoutSize: badgeSize,elementKind: ElementKind.badge,containerAnchor: badgeAnchor)
let item = NSCollectionLayoutItem(layoutSize: itemSize,supplementaryItems: [badge])
```

### NSCollectionLayoutBoundarySupplementaryItem 用于为集合视图添加页眉或页脚的对象

边界补充项是补充项（ NSCollectionLayoutSupplementaryItem ）的一种特殊类型。使用边界补充项可以为集合视图的某个`section`或`整个集合视图`添加页眉或页脚。

```swift
//【引用对象 NSCollectionLayoutSection】
var boundarySupplementaryItems: [NSCollectionLayoutBoundarySupplementaryItem]
```

```swift
class NSCollectionLayoutBoundarySupplementaryItem : NSCollectionLayoutSupplementaryItem
```

```swift
let section = NSCollectionLayoutSection(group: group)
let headerFooterSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),heightDimension: .estimated(44))
let sectionHeader = NSCollectionLayoutBoundarySupplementaryItem(layoutSize: headerFooterSize,elementKind: ElementKind.sectionHeader,alignment: .top)
let sectionFooter = NSCollectionLayoutBoundarySupplementaryItem(layoutSize: headerFooterSize,elementKind: ElementKind.sectionFooter,alignment: .bottom)
section.boundarySupplementaryItems = [sectionHeader, sectionFooter]
```

### NSCollectionLayoutDecorationItem 用于为集合视图的某个 section 添加背景的对象

```swift
//【引用对象 NSCollectionLayoutSection】
var decorationItems: [NSCollectionLayoutDecorationItem]
```

```swift
class NSCollectionLayoutDecorationItem : NSCollectionLayoutItem
```

```swift
let sectionBackground = NSCollectionLayoutDecorationItem.background(elementKind: ElementKind.background)
section.decorationItems = [sectionBackground]
let layout = UICollectionViewCompositionalLayout(section: section)
layout.register(SectionBackgroundDecorationView.self,forDecorationViewOfKind: ElementKind.background)
return layout
```
