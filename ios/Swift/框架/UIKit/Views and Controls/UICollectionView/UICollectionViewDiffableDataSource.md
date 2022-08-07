<!-- TOC -->

- [Conforms To](#conforms-to)
- [UICollectionViewDiffableDataSource](#uicollectionviewdiffabledatasource)
- [API](#api)
    - [Creating a diffable data source 创建可变数据源](#creating-a-diffable-data-source-创建可变数据源)
    - [Creating supplementary views 创建补充视图](#creating-supplementary-views-创建补充视图)
    - [Identifying items 识别项目](#identifying-items-识别项目)
    - [Identifying sections 识别sections部分](#identifying-sections-识别sections部分)
    - [Updating data 正在更新数据](#updating-data-正在更新数据)
    - [Updating section data 更新部分数据](#updating-section-data-更新部分数据)
    - [Supporting reordering 支持重新排序](#supporting-reordering-支持重新排序)

<!-- /TOC -->

# Conforms To

UICollectionViewDataSource

# UICollectionViewDiffableDataSource

您用于管理数据和为集合视图提供单元格的对象。

可变数据源对象是一种专门类型的数据源，可与您的集合视图对象一起工作。它提供了以简单、高效的方式管理集合视图数据和用户界面更新所需的行为。  
它还符合UICollectionViewDataSource协议，并为协议的所有方法提供实现。

要用数据填充集合视图：

* 将可变数据源连接到您的集合视图。
* 实现单元格提供程序来配置集合视图的单元格。
* 生成数据的当前状态。
* 在用户界面中显示数据。

要将可变数据源连接到集合视图，请使用其init（collectionView:cellProvider:）初始化器创建可变数据源，传递要与该数据源关联的集合视图。您还会传递一个单元格提供程序，在那里您配置每个单元格，以确定如何在UI中显示数据。

```swift
dataSource = UICollectionViewDiffableDataSource<Int, UUID>(collectionView: collectionView) {
    (collectionView: UICollectionView, indexPath: IndexPath, itemIdentifier: UUID) -> UICollectionViewCell? in
    // Configure and return cell.
}
```

```swift
@preconcurrency @MainActor class UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType> : NSObject where SectionIdentifierType : Hashable, SectionIdentifierType : Sendable, ItemIdentifierType : Hashable, ItemIdentifierType : Sendable
```

# API

##  Creating a diffable data source 创建可变数据源

```swift
// 使用指定的单元格提供程序创建一个可变数据源，并将其连接到指定的集合视图。
init(collectionView: UICollectionView, cellProvider: UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>.CellProvider)

// 从其可变数据源为集合视图配置和返回单元格的闭包。
// collectionView 配置此单元格的集合视图。
// indexPath 指定集合视图中单元格位置的索引路径。
// itemIdentifier 具有实现Hashable协议的类型，数据源用于唯一标识此单元格的项目。
typealias UICollectionViewDiffableDataSource.CellProvider
typealias UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>.CellProvider = (_ collectionView: UICollectionView, _ indexPath: IndexPath, _ itemIdentifier: ItemIdentifierType) -> UICollectionViewCell?

```

## Creating supplementary views 创建补充视图

```swift
// 从可变数据源配置和返回集合视图的补充视图（如页眉和页脚）的闭包。
@MainActor var supplementaryViewProvider: UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>.SupplementaryViewProvider? { get set }

// 从可变数据源配置和返回集合视图的补充视图（如页眉或页脚）的闭包。
typealias UICollectionViewDiffableDataSource.SupplementaryViewProvider
typealias UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>.SupplementaryViewProvider = (_ collectionView: UICollectionView, _ elementKind: String, _ indexPath: IndexPath) -> UICollectionReusableView?
```

## Identifying items 识别项目

```swift
// 在集合视图中指定的索引路径上返回项目的标识符。
// 此方法是一个恒定时间操作，o(1)，这意味着您可以从其相应的索引路径中查找项目标识符，而无需显著开销。
func itemIdentifier(for: IndexPath) -> ItemIdentifierType?

// 返回集合视图中具有指定标识符的项目的索引路径。
// 项目的标识符，如果在提供的索引路径上找不到项目，则为nil。
func indexPath(for: ItemIdentifierType) -> IndexPath?

```

## Identifying sections 识别sections部分

```swift
// 返回您在集合视图中指定的索引部分的标识符。
func sectionIdentifier(for: Int) -> SectionIdentifierType?

// 返回带有您在集合视图中指定的标识符的部分的索引。
func index(for: SectionIdentifierType) -> Int?

```

## Updating data 正在更新数据

```swift
// 返回集合视图中数据当前状态的表示形式。
// 包含部分和项目标识符的快照，按它们在用户界面中出现的顺序排列。
func snapshot() -> NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType>

// 更新用户界面以反映快照中数据的状态，可以选择为用户界面更改添加动画效果。
func apply(NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType>, animatingDifferences: Bool)

// 更新用户界面以反映快照中数据的状态，可选地为UI更改动画并执行完成处理程序。
func apply(NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType>, animatingDifferences: Bool, completion: (() -> Void)?)

// 重置用户界面以反映快照中数据的状态，而无需计算差异或动画更改。
func applySnapshotUsingReloadData(NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType>)

// 重置用户界面以反映快照中数据的状态，而无需计算差异或动画更改，可以选择执行完成处理程序。
func applySnapshotUsingReloadData(NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType>, completion: (() -> Void)?)
```

## Updating section data 更新部分数据

```swift
// 返回集合视图指定部分中数据当前状态的表示形式。
func snapshot(for: SectionIdentifierType) -> NSDiffableDataSourceSectionSnapshot<ItemIdentifierType>

// 更新部分UI以反映指定快照中数据的状态，可选地为UI更改动画并执行完成处理程序。
func apply(NSDiffableDataSourceSectionSnapshot<ItemIdentifierType>, to: SectionIdentifierType, animatingDifferences: Bool, completion: (() -> Void)?)

// 更新部分UI以反映指定快照中数据的状态，可选地为UI更改动画。
func apply(NSDiffableDataSourceSectionSnapshot<ItemIdentifierType>, to: SectionIdentifierType, animatingDifferences: Bool)
```

## Supporting reordering 支持重新排序

```swift
// 可变数据源用于重新排序项目的处理程序。
var reorderingHandlers: UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>.ReorderingHandlers

// 用于重新排序项目的处理程序。
struct UICollectionViewDiffableDataSource.ReorderingHandlers

// 描述视图中项目重新排序后更改的事务。
struct NSDiffableDataSourceTransaction

// 描述对部分中的项目进行重新排序后更改的事务。
struct NSDiffableDataSourceSectionTransaction
```
