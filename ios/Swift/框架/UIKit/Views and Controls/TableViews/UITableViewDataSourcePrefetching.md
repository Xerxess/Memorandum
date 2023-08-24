# UITableViewDataSourcePrefetching

一种对表视图的数据要求提供预先警告的协议，允许您提前开始可能长期运行的数据操作。

```swift
@MainActor
protocol UITableViewDataSourcePrefetching
```

## Topics

### Fetching the row data 获取行数据

```swift
// 指示您的预取数据源对象开始为提供的索引路径上的单元格准备数据。
// 这个方法通常用于处理大型数据集的情况。
// Required
// 当用户滚动时，表视图在主调度队列上调用此方法，为在不久的将来可能显示的单元格提供索引路径。
// 使用此方法的实现来启动任何昂贵的数据加载操作。
// 始终异步加载数据，并将结果转发到表的数据源对象。
// 表视图不会立即为它们需要的单元格调用此方法，因此您的数据源对象也必须能够获取数据本身。
func tableView(
    _ tableView: UITableView,
    prefetchRowsAt indexPaths: [IndexPath]
)

// 取消之前触发的数据预取请求。
// 这个方法通常与 tableView(_:prefetchRowsAt:) 方法结合使用，以实现更有效的数据加载和释放。
optional func tableView(
    _ tableView: UITableView,
    cancelPrefetchingForRowsAt indexPaths: [IndexPath]
)
```