# UITableViewDropDelegate

在表格视图中处理掉落的接口。  

用于处理表格视图中的拖放操作。  
通过实现这个协议的方法，您可以在表格视图中支持数据的拖放操作。

```swift
@MainActor
protocol UITableViewDropDelegate
```

## Topics

### Declaring support for handling drops 声明支持处理掉落

```swift
// 询问您的代表是否可以接受指定类型的数据。
// 用于检查是否可以处理特定的拖放会话。
optional func tableView(
    _ tableView: UITableView,
    canHandle session: UIDropSession
) -> Bool
```

### Providing a custom drop preview 提供自定义放置预览

```swift
// 返回有关如何在拖放期间在指定位置显示行的自定义信息。
optional func tableView(
    _ tableView: UITableView,
    dropPreviewParametersForRowAt indexPath: IndexPath
) -> UIDragPreviewParameters?
```

### Incorporating the dropped data  合并删除的数据

```swift
// 将丢弃的数据合并到您的数据结构中并更新表。
func tableView(
    _ tableView: UITableView,
    performDropWith coordinator: UITableViewDropCoordinator
)
```

### Tracking the drag movements 跟踪拖动运动

```swift
// 建议如何在表格视图中的指定位置处理掉落。
// 用于在拖拽会话更新时提供拖放操作的建议，并返回表格视图中的目标位置。
optional func tableView(
    _ tableView: UITableView,
    dropSessionDidUpdate session: UIDropSession,
    withDestinationIndexPath destinationIndexPath: IndexPath?
) -> UITableViewDropProposal

// 当拖动的内容进入表视图的边界矩形时，通知委托人。
optional func tableView(
    _ tableView: UITableView,
    dropSessionDidEnter session: UIDropSession
)

// 当拖动的内容退出表视图的边界矩形时，通知委托人。
optional func tableView(
    _ tableView: UITableView,
    dropSessionDidExit session: UIDropSession
)

// 拖动操作结束时通知委托人。
optional func tableView(
    _ tableView: UITableView,
    dropSessionDidEnd session: UIDropSession
)
```
