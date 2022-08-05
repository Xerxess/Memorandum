<!-- TOC -->

- [UICollectionViewDataSource](#uicollectionviewdatasource)
- [Conforming Types](#conforming-types)
- [API](#api)
    - [Getting Item and Section Metrics 获取项目和部分指标](#getting-item-and-section-metrics-获取项目和部分指标)
    - [Getting Views for Items  获取项目视图](#getting-views-for-items--获取项目视图)
    - [Reordering Items 重新排序项目](#reordering-items-重新排序项目)
    - [Configuring an Index  配置索引](#configuring-an-index--配置索引)

<!-- /TOC -->

# UICollectionViewDataSource

您用于管理数据和为集合视图提供单元格的对象采用的方法。

数据源对象管理集合视图中的数据。它代表您的应用程序的数据模型，并根据需要将信息发送到集合视图。  
它还创建和配置集合视图用于显示数据的单元格和补充视图。

集合视图数据源`必须符合UICollectionViewDataSource协议`。  
您可以使用 UICollectionViewDiffableDataSource 对象作为数据源对象，该对象已经符合此协议。

或者，您可以通过采用UICollectionViewDataSource协议创建自定义数据源对象。  
所有数据源对象都必须实现 `collectionView(_:numberOfItemsInSection:)` 和 `collectionView(_:cellForItemAt:)` 方法。

```swift
@MainActor protocol UICollectionViewDataSource
```

# Conforming Types

CAAUSettingsView  
UICollectionViewController  
UICollectionViewDiffableDataSource  
UICollectionViewDiffableDataSourceReference  

# API

## Getting Item and Section Metrics 获取项目和部分指标

```swift
// 要求您的数据源对象在指定部分中提供项目数量。
// 必填。
func collectionView(UICollectionView, numberOfItemsInSection: Int) -> Int

// 要求您的数据源对象提供集合视图中的部分数量。
func numberOfSections(in: UICollectionView) -> Int

```

## Getting Views for Items  获取项目视图

```swift
// 要求您的数据源对象提供与集合视图中指定项相对应的单元格。
// 必填。
func collectionView(UICollectionView, cellForItemAt: IndexPath) -> UICollectionViewCell

// 要求您的数据源对象提供在集合视图中显示的补充视图。
func collectionView(UICollectionView, viewForSupplementaryElementOfKind: String, at: IndexPath) -> UICollectionReusableView
```

## Reordering Items 重新排序项目

```swift
// 询问您的数据源对象是否可以将指定的项目移动到集合视图中的另一个位置。
// 如果物品允许移动，则为true，如果不允许移动，则为false。
// 使用此方法有选择地允许或不允许在集合视图中移动项目。
// 如果您没有实现此方法，但确实实现了collectionView(_:moveItemAt:to:)方法，则集合视图允许对所有项目进行重新排序。
func collectionView(UICollectionView, canMoveItemAt: IndexPath) -> Bool

// 告诉数据源对象将指定项目移动到其新位置。
// 您必须实现此方法以支持集合视图中项目的重新排序。如果您不实现此方法，集合视图将忽略任何重新排序项目的尝试。
// 当与项目交互结束时，如果项目的位置发生变化，集合视图会调用此方法。使用此方法使用新的索引路径信息更新您的数据结构。
func collectionView(UICollectionView, moveItemAt: IndexPath, to: IndexPath)
```

## Configuring an Index  配置索引

```swift
// 要求数据源返回要为集合视图显示的索引项的标题。
// 使用此方法支持快速滚动浏览集合视图的内容。
// 您返回的字符串显示在索引视图中，该索引视图可用于跳转到集合视图内容中的特定位置。
// 如果您实现此方法，您还必须实现 collectionView(_:indexPathForIndexTitle:at:) 方法来指定与每个索引标题关联的集合视图项。
// 应该像列表右侧的根据A、B、C等快速定位并滚动到相应的索引标题
func indexTitles(for: UICollectionView) -> [String]?

// 要求数据源返回与您的索引条目之一相对应的集合视图项的索引路径。
// 使用此方法支持快速滚动浏览集合视图的内容。
// 从indexTitles（for:）方法返回一组索引字符串后，集合视图为每个字符串调用此方法，以获取集合视图项作为滚动目标。
func collectionView(UICollectionView, indexPathForIndexTitle: String, at: Int) -> IndexPath
```