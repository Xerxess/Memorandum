<!-- TOC -->

- [UICollectionViewDataSourcePrefetching](#uicollectionviewdatasourceprefetching)
- [异步加载数据](#异步加载数据)
- [API](#api)
    - [Managing data prefetching 管理数据预取](#managing-data-prefetching-管理数据预取)

<!-- /TOC -->

# UICollectionViewDataSourcePrefetching

一种为集合视图提供数据要求提前警告的协议，允许触发异步数据负载操作。

在调用collectionView(_:cellForItemAt:)数据源方法之前，您可以使用预取数据源对象与集合视图的数据源一起开始加载单元格的数据。

按照以下步骤将预取数据源添加到您的集合视图中：

* 创建集合视图及其数据源。
* 创建一个采用UICollectionViewDataSourcePrefetching协议的对象，并将其分配给集合视图上的prefetchDataSource属性。
* 在实现collectionView(_:prefetchItemsAt:)的指定索引路径上启动单元格所需的数据异步加载。
* 在实现collectionView(_:cellForItemAt:)数据源方法时，使用预取的数据准备显示单元格。
* 当集合视图通知您在 collectionView(_:cancelPrefetchingForItemsAt:) 方法中不再需要数据时，请取消挂起的数据加载操作。

```swift
@MainActor protocol UICollectionViewDataSourcePrefetching
```

# 异步加载数据

collectionView(_:prefetchItemsAt:)方法不一定对集合视图中的每个单元格调用。因此，您对collectionView(_:cellForItemAt:)的实现必须能够应对以下潜在情况：

* 数据已通过预取请求加载，并准备显示。
* 数据目前正在预先获取，但尚未可用。
* 尚未请求数据。

处理所有这些情况的一种方法是使用Operation加载每行的数据。您创建Operation对象并将其存储在预取方法中。然后，数据源方法可以检索操作和结果，或者在不存在时创建它。有关如何使用异步编程模型实现此所需行为的更多信息，请参阅并发编程指南。

# API

## Managing data prefetching 管理数据预取

```swift
// 告诉您的预取数据源对象开始在提供的索引路径上为单元格准备数据。
// 必填。
// 集合视图在用户滚动时调用此方法，为它在不久的将来可能会显示的单元格提供索引路径。
// 您对这种方法的实现负责启动任何昂贵的数据加载过程。
// 数据加载必须异步执行，结果必须提供给集合视图数据源上的collectionView(_:cellForItemAt:)方法。
// 集合视图不会为它立即需要的单元格调用此方法，因此您的代码不得依赖此方法加载数据。提供的索引路径的顺序代表优先级。
func collectionView(UICollectionView, prefetchItemsAt: [IndexPath])

// 取消之前触发的数据预取请求。
// 当单元格滚出视图时，集合视图调用此方法来取消预取请求。
// 您对此方法的实现负责取消之前对collectionView（_:prefetchItemsAt:）的调用引发的操作。
func collectionView(UICollectionView, cancelPrefetchingForItemsAt: [IndexPath])
```