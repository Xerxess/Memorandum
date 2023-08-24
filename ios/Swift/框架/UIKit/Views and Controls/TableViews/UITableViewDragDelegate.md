# UITableViewDragDelegate

启动从表视图拖动的接口。  
用于自定义在表格视图中启用拖拽操作的行为。  
通过实现这个协议的方法，您可以指定哪些行可以进行拖拽，并提供拖拽时的数据。

```swift
@MainActor
protocol UITableViewDragDelegate
```

## Topics

### Providing the items to drag 提供要拖动的项目

```swift
// 提供要拖动的初始项目集（如果有的话）。
// Required
// 用于支持拖拽操作的设置。这个方法允许您为开始拖拽某个行时提供需要拖拽的数据项。
func tableView(
    _ tableView: UITableView,
    itemsForBeginning session: UIDragSession,
    at indexPath: IndexPath
) -> [UIDragItem]

// 将指定的项目添加到现有的拖动会话中。
// 用于支持将数据项添加到正在进行的拖拽操作中。这个方法允许您为正在进行的拖拽会话提供要添加的额外数据项。
optional func tableView(
    _ tableView: UITableView,
    itemsForAddingTo session: UIDragSession,
    at indexPath: IndexPath,
    point: CGPoint
) -> [UIDragItem]
```

### Tracking the drag session 跟踪拖动会话

```swift
// 指示从指定表视图中开始涉及内容的拖动操作。
optional func tableView(
    _ tableView: UITableView,
    dragSessionWillBegin session: UIDragSession
)

// 发出涉及指定表视图内容的拖动操作结束的信号。
optional func tableView(
    _ tableView: UITableView,
    dragSessionDidEnd session: UIDragSession
)

// 返回一个布尔值，指示是否必须在同一应用程序中删除拖动的内容。
optional func tableView(
    _ tableView: UITableView,
    dragSessionIsRestrictedToDraggingApplication session: UIDragSession
) -> Bool

// 返回一个布尔值，指示您的应用程序是否支持拖动内容的移动操作。
// 这个方法应该返回一个布尔值，表示是否允许在拖拽操作中执行移动行的操作。如果返回 true，则允许移动行；如果返回 false，则不允许移动行。
optional func tableView(
    _ tableView: UITableView,
    dragSessionAllowsMoveOperation session: UIDragSession
) -> Bool
```

### Managing drop interactions 管理放置交互

```swift
// 管理将内容放入表视图的委托对象。
weak var dropDelegate: UITableViewDropDelegate? { get set }
```