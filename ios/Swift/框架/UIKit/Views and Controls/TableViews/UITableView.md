# UITableView

使用`单列行`显示数据的视图

iOS中的表格视图在一列中显示垂直滚动内容行。  
表中的每一行都包含一段应用程序的内容。  
例如，联系人应用程序在单独的行中显示每个联系人的名称，设置应用程序的主页显示可用的设置组。  
您可以将表配置为显示单个长行列表，也可以将相关行分组到各个部分中，以便更轻松地浏览内容。

## Topics

### Creating a table view 创建表视图

```swift
init(frame: CGRect, style: UITableView.Style)
init?(coder: NSCoder)
```

### Providing the data and cells 提供数据和单元格

```swift
// 充当表视图数据源的对象。
// 数据源必须采用UITableViewDataSource协议。
// 数据源没有被保留。
weak var dataSource: UITableViewDataSource? { get set }

// 作为表视图预取数据源的对象，接收即将到来的单元数据要求的通知。
// 分配一个符合UITableViewDataSourcePrefetching协议的对象，以方便在不久的将来为要显示的单元格预取数据。
// 要禁用预取行为，请将此属性设置为nil。这个对象没有被保留。
weak var prefetchDataSource: UITableViewDataSourcePrefetching? { get set }

// 一个布尔值，指示是否允许单元格和数据预取。
// 当为true时，表格视图可能会在显示单元格之前请求单元格。
// 当false时，表视图在需要显示时请求单元格。
// 将此属性设置为false也会禁用数据预取。
// 此属性的默认值为true。
var isPrefetchingEnabled: Bool { get set }
```

### Recycling table view cells 回收表视图单元格

```swift
// 注册一个包含单元格的nib对象，该单元格在指定标识符下具有表视图。
func register(
    _ nib: UINib?,
    forCellReuseIdentifier identifier: String
)

// 注册一个用于创建新表单元格的类。
// 如果指定类型的单元格当前不在重用队列中，表视图将使用提供的信息自动创建新的单元格对象。
// 如果您之前注册了具有相同重用标识符的类或nib文件，则您在cellClass参数中指定的类将替换旧条目。如果您想从指定的重用标识符中取消注册类，您可以为cellClass指定nil。
func register(
    _ cellClass: AnyClass?,
    forCellReuseIdentifier identifier: String
)

// 返回指定重用标识符的可重用表视图单元格对象，并将其添加到表中。
// 仅从表视图数据源对象的tableView(_:cellForRowAt:)方法调用此方法。
// 此方法返回指定类型的现有单元格（如果有的话），或者使用您之前提供的类或故事板创建并返回新单元格。
// 不要在数据源的tableView(_:cellForRowAt:)方法之外调用此方法。
// 如果您需要在其他时间创建单元格，请改为调用dequeueReusableCell（withIdentifier:）。
// 这个方法适用于在 cellForRowAt 方法中使用，当你需要在单元格配置中基于特定位置的数据来进行操作。
func dequeueReusableCell(
    withIdentifier identifier: String,
    for indexPath: IndexPath
) -> UITableViewCell

// 通过其标识符定位可重用表视图单元格对象后返回该对象。
func dequeueReusableCell(withIdentifier identifier: String) -> UITableViewCell?
```

### Recycling section headers and footers 回收部分页眉和页脚

```swift
func register(
    _ nib: UINib?,
    forHeaderFooterViewReuseIdentifier identifier: String
)

func register(
    _ aClass: AnyClass?,
    forHeaderFooterViewReuseIdentifier identifier: String
)

// 通过其标识符定位后，返回可重用页眉或页脚视图。
func dequeueReusableHeaderFooterView(withIdentifier identifier: String) -> UITableViewHeaderFooterView?
```

### Managing interactions with the table 管理与表的交互

```swift
// 充当表视图委托的对象。
weak var delegate: UITableViewDelegate? { get set }

```

### Configuring the table’s appearance 配置表格的外观

```swift
// 表格视图的风格。
// enum Style : Int, @unchecked Sendable
// case plain 一个简单的表格视图。
// case grouped 表格视图，其中各部分具有不同的行组。
// case insetGrouped 表格视图，其中分组的部分插入圆角。
var style: UITableView.Style { get }

// 显示在表格内容上方的视图。
// 用于设置表格视图的表头视图。表头视图是一个自定义的视图，会显示在表格视图的顶部，通常用于显示一些额外的信息、搜索栏或其他控件。
var tableHeaderView: UIView? { get set }

// 显示在表格内容下方的视图。
var tableFooterView: UIView? { get set }

// 表格视图的背景视图。
// 用于设置表格视图的背景视图。背景视图将显示在表格视图的内容之后，可以用于显示自定义的背景内容、图片、颜色等。
var backgroundView: UIView? { get set }

```

### Configuring cell height and layout 配置单元高度和布局

```swift
// 表视图中每行点的默认高度。
var rowHeight: CGFloat { get set }

// 表视图中行的估计高度。
// 用于设置表格视图中行（单元格）的估计高度。在表格视图中，如果你不知道每个行的确切高度，可以使用估计的行高来提高性能。
var estimatedRowHeight: CGFloat { get set }

// 填充表格视图的空行的高度。
// 具有UITable.Style.plain的表格视图可以显示填充行
// 设置0.0不显示填充行。此行为是iOS 15及更高版本中的默认行为。
// 设置automatic以显示使用自动高度的填充行，与表格视图中最后一行的高度匹配。在iOS 15之前的iOS版本中，此行为是默认的。
// 设置任何其他正值以显示指定高度的填充行
var fillerRowHeight: CGFloat { get set }

// 一个布尔值，指示单元格边距是否来自可读内容指南的宽度。
// 用于设置表格视图中的单元格是否要根据可读宽度（readable width）自动调整布局边距。
// 可读宽度是指用于在文本排版中提供更好可读性的屏幕宽度范围。
// 当你设置 cellLayoutMarginsFollowReadableWidth 为 true 时，表格视图的单元格将会自动根据可读宽度自动调整边距，以确保文本在单元格中更容易阅读。
// 这在处理包含文本内容的单元格时很有用。
var cellLayoutMarginsFollowReadableWidth: Bool { get set }

// 一个布尔值，指示表视图是否调整其单元格、页眉和页脚的内容视图以适应安全区域。
// default:true
// 当你将 insetsContentViewsToSafeArea 设置为 true 时，表格视图的内容视图（包括单元格）将会在布局时考虑到安全区域的边距。
// 这可以确保内容不会被安全区域遮挡，从而在 iPhone X 以及更高版本的设备上获得更好的布局效果。
var insetsContentViewsToSafeArea: Bool { get set }
```

### Configuring header and footer appearance 配置页眉和页脚外观

```swift
// 表格视图中节标题的高度。
var sectionHeaderHeight: CGFloat { get set }

// 
var sectionFooterHeight: CGFloat { get set }

// 表格视图中节标题的估计高度。
var estimatedSectionHeaderHeight: CGFloat { get set }

// 
var estimatedSectionFooterHeight: CGFloat { get set }

// 每个部分标题上方的填充量。
var sectionHeaderTopPadding: CGFloat { get set }
```

### Customizing the separator appearance 自定义分隔符外观

```swift
// 表格单元格用作分隔符的样式。
// enum SeparatorStyle : Int, @unchecked Sendable
// case none 隔板单元没有明显的风格。
// case singleLine 分离器单元有一条横贯其宽度的线。
var separatorStyle: UITableViewCell.SeparatorStyle { get set }

// 表格视图中分隔符行的颜色。
var separatorColor: UIColor? { get set }

// 适用于表分隔符的效果。
@NSCopying
var separatorEffect: UIVisualEffect? { get set }

// 单元格分隔符的默认插入。
// 用于设置表格视图中分隔线（分隔符）的内边距。
// 分隔线是用于在表格视图中分隔每个单元格或分组的可选线条。
// 用于设置表格视图中分隔线的内边距（上、下、左、右）。
var separatorInset: UIEdgeInsets { get set }

// 如何解释分隔符插入值的指标。
// 用于设置表格视图中分隔线（分隔符）内边距的参考方式。
// case fromAutomaticInsets ：自动参考方式。分隔线内边距将相对于安全区域的边界计算，以确保适当的布局，特别是在有刘海或圆角的设备上。
// case fromCellEdges：相对于单元格内容边界计算分隔线内边距。这会使分隔线的位置与单元格内容的位置更接近。
var separatorInsetReference: UITableView.SeparatorInsetReference { get set }
```

### Getting the number of rows and sections 获取行数和节数

```swift
// 返回指定部分(section)中的行数（表单元格）。
func numberOfRows(inSection section: Int) -> Int

// 表格视图中的节数。
var numberOfSections: Int { get }
```

### Getting cells and section-based views 获取单元格和基于部分的视图

```swift
// 返回您指定的索引路径上的表单元格。
func cellForRow(at indexPath: IndexPath) -> UITableViewCell?

// 返回指定部分的标题视图
func headerView(forSection section: Int) -> UITableViewHeaderFooterView?

// 返回指定部分的页脚视图。
func footerView(forSection section: Int) -> UITableViewHeaderFooterView?

// 返回表示指定表视图单元格的行和部分的索引路径。
func indexPath(for cell: UITableViewCell) -> IndexPath?

// 返回在指定点标识行和节的索引路径。
// 用于从给定点获取在表格视图中的行索引路径的方法
// 可以使用这个方法来确定用户在表格视图中的哪一行上点击了，或者根据某个特定的点获取行的信息。
func indexPathForRow(at point: CGPoint) -> IndexPath?

// 返回一个索引路径数组，每个索引路径代表指定矩形包围的一行。
// 用于获取在指定矩形区域内的行索引路径数组的方法。
func indexPathsForRows(in rect: CGRect) -> [IndexPath]?

// 在表格视图中可见的表格单元格。
// 用于获取当前在可见区域内的所有可见单元格（UITableViewCell）的数组。
var visibleCells: [UITableViewCell] { get }

// 索引路径数组，每个路径在表格视图中标识一个可见的行。
// 用于获取当前在可见区域内的所有可见行的索引路径（IndexPath）数组。
var indexPathsForVisibleRows: [IndexPath]? { get }
```

### Selecting rows 选择行

```swift
// 标识所选行的行和部分的索引路径。
// 可以获取当前用户选中的行的索引路径
var indexPathForSelectedRow: IndexPath? { get }

// 表示所选行的索引路径。
var indexPathsForSelectedRows: [IndexPath]? { get }

// 在表视图中选择索引路径标识的行，可选择将该行滚动到表视图中的位置。
// 用于选择表格视图中的指定行，并根据需要滚动到该行的特定位置。
func selectRow(
    at indexPath: IndexPath?,
    animated: Bool,
    scrollPosition: UITableView.ScrollPosition
)

// 取消选择索引路径标识的行，并带有取消选择的动画选项。
func deselectRow(
    at indexPath: IndexPath,
    animated: Bool
)

// 一个布尔值，确定用户是否可以选择一行。
// 用于设置是否允许用户选择表格视图中的行。
var allowsSelection: Bool { get set }

// 一个布尔值，用于确定用户是否可以在编辑模式之外选择多行。
var allowsMultipleSelection: Bool { get set }

// 一个布尔值，用于确定用户是否可以在表格视图处于编辑模式时选择单元格。
var allowsSelectionDuringEditing: Bool { get set }

// 一个布尔值，用于控制用户是否可以在编辑模式下同时选择多个单元格。
var allowsMultipleSelectionDuringEditing: Bool { get set }

// 当焦点移动到单元格时触发自动选择的布尔值。
var selectionFollowsFocus: Bool { get set }
```

### Inserting, deleting, and moving rows and sections 插入、删除和移动行和节

```swift
// 在索引路径数组标识的位置在表视图中插入行，并可选择对插入进行动画处理。
func insertRows(
    at indexPaths: [IndexPath],
    with animation: UITableView.RowAnimation
)

// 删除索引路径数组标识的行，并带有为删除添加动画效果的选项。
func deleteRows(
    at indexPaths: [IndexPath],
    with animation: UITableView.RowAnimation
)

// 在表格视图中插入一个或多个部分，并带有为插入添加动画效果的选项。
func insertSections(
    _ sections: IndexSet,
    with animation: UITableView.RowAnimation
)

// 删除表视图中的一个或多个部分，并带有为删除添加动画效果的选项。
func deleteSections(
    _ sections: IndexSet,
    with animation: UITableView.RowAnimation
)

// 插入或删除行时使用的动画类型。
// case fade 插入或删除的行淡入或淡出表视图。
// case right 插入的一行或多行从右侧滑入；删除的行向右滑出。
// case left 插入的一行或多行从左侧滑入；删除的一行或多行向左滑出。
// case top 插入的一行或多行从顶部滑入；删除的一行或多行滑向顶部。
// case bottom 插入的一行或多行从底部滑入；删除的一行或多行滑向底部。
// case none 插入或删除的行使用默认动画。
// case middle 表视图尝试将旧单元格和新单元格保持在它们曾经或将占据的空间的中心。
// case automatic 表格视图会为您选择合适的动画样式。
// enum RowAnimation : Int, @unchecked Sendable

// 将指定位置的行移动到目标位置。
func moveRow(
    at indexPath: IndexPath,
    to newIndexPath: IndexPath
)

// 将一个部分移动到表格视图中的新位置。
func moveSection(
    _ section: Int,
    toSection newSection: Int
)
```

### Performing batch updates to rows and sections 

```swift
// 将多个插入、删除、重新加载和移动操作作为一个组动画。
// 用于执行一系列批量更新操作，例如插入、删除、移动或刷新行，以及在更新完成后执行一个可选的完成处理块。
func performBatchUpdates(
    _ updates: (() -> Void)?,
    completion: ((Bool) -> Void)? = nil
)

// 开始一系列方法调用，以插入、删除或选择表视图的行和部分。
// 用于开始一个表格视图的批量更新操作块。在这个块内，您可以进行插入、删除、移动或刷新行等多个更新操作。
// 通过在 beginUpdates() 和 endUpdates() 之间执行更新操作，您可以确保这些操作都在同一次 UI 更新中进行。
func beginUpdates()

// 结束一系列方法调用，这些调用插入、删除、选择或重新加载表视图的行和部分。
func endUpdates()
```

### Reloading the table view 重新加载表视图

```swift
// 一个布尔值，指示表视图的外观是否包含其数据源中不存在的更改。
// 用于检查表格视图是否有未提交的更新操作。
// 通过访问 hasUncommittedUpdates 属性，您可以检查表格视图是否有在 beginUpdates() 和 endUpdates() 之间执行的未提交的更新操作。
var hasUncommittedUpdates: Bool { get }

// 更新您指定的索引路径上行的数据，保留行的现有单元格。
// 用于重新配置指定索引路径（IndexPath）处的行。这个方法通常用于重新加载特定的行，以便对其进行更新或重新配置。
// 通过调用这个方法，您可以对指定的行进行重新加载，从而对其进行更新或重新配置。
func reconfigureRows(at indexPaths: [IndexPath])

// 重新加载表格视图的行和部分
// 用于重新加载整个表格视图的数据。当您调用这个方法时，表格视图会重新获取数据源中的数据，并根据最新的数据重新显示所有的行和节（sections）。
// 在数据源更新后需要刷新整个表格视图时非常有用。
func reloadData()

// 使用提供的动画效果重新加载指定的行。
// 用于重新加载指定索引路径（IndexPath）处的行，可以指定动画效果。
func reloadRows(
    at indexPaths: [IndexPath],
    with animation: UITableView.RowAnimation
)

// 使用提供的动画效果重新加载指定的部分(Sections)。
func reloadSections(
    _ sections: IndexSet,
    with animation: UITableView.RowAnimation
)

// 沿着表格视图右侧重新加载索引栏中的项目。
// 用于重新加载表格视图的索引标题。索引标题是在表格视图右侧用于快速导航的字母、数字或自定义标签。
func reloadSectionIndexTitles()
```

### Managing drag interactions 管理拖动交互

```swift
// 管理从表视图拖动项目的委托对象。
weak var dragDelegate: UITableViewDragDelegate? { get set }

// 一个布尔值，指示表视图当前是否正在跟踪拖动会话
// 用于检查当前是否存在活动的拖动操作。这在处理拖动操作时可以很有用，可以确定是否有拖动操作正在进行中，以便采取相应的处理措施。
var hasActiveDrag: Bool { get }

// 一个布尔值，指示表视图是否支持拖动内容。
var dragInteractionEnabled: Bool { get set }
```

### Managing drop interactions 管理放置交互

```swift
// 
weak var dropDelegate: UITableViewDropDelegate? { get set }

// 一个布尔值，指示表视图当前是否正在跟踪掉落会话。
var hasActiveDrop: Bool { get }
```

### Scrolling the table view 滚动表视图

```swift
// 滚动表格视图，直到索引路径标识的行位于屏幕上的特定位置。
func scrollToRow(
    at indexPath: IndexPath,
    at scrollPosition: UITableView.ScrollPosition,
    animated: Bool
)

// 滚动表视图，使最接近表视图中指定位置的所选行位于该位置。
// 用于将表格视图滚动到最接近当前选定行的位置。
func scrollToNearestSelectedRow(
    at scrollPosition: UITableView.ScrollPosition,
    animated: Bool
)

// enum ScrollPosition : Int, @unchecked Sendable
// case none 表视图滚动感兴趣的行，使其以最小的移动完全可见。
// case top 表视图将感兴趣的行滚动到可见表视图的顶部。
// case middle 表视图将感兴趣的行滚动到可见表视图的中间。
// case bottom 表视图将感兴趣的行滚动到可见表视图的底部。
```

### Putting the table into edit mode 将表置于编辑模式

```swift
// 将表格视图切换到和退出编辑模式。
// 用于在控制器中切换整个视图控制器的编辑模式。
// 通常在响应用户点击编辑按钮或其他控件时使用
func setEditing(
    _ editing: Bool,
    animated: Bool
)

// 一个布尔值，用于确定表视图是否处于编辑模式。
// 表示表格视图当前是否处于编辑模式。
// 如果属性值为 true，则表格视图处于编辑模式，可以显示编辑控件（如删除按钮）并响应编辑操作。
// 如果属性值为 false，则表格视图不处于编辑模式。
// 通过设置这个属性来切换表格视图的编辑模式。在编辑模式下，用户可以执行编辑操作，如删除行、移动行等。
var isEditing: Bool { get set }
```

### Configuring the table index 配置表索引

```swift
// 在表格右边缘显示索引列表的表格行数。
var sectionIndexMinimumDisplayRowCount: Int { get set }

// 用于表格视图索引文本的颜色。
var sectionIndexColor: UIColor? { get set }

// 用于表格视图section索引背景的颜色。
// 用于设置表格视图中索引栏（section index）的背景颜色。
var sectionIndexBackgroundColor: UIColor? { get set }

// 用于表格视图索引背景区域的颜色。
// 用于设置表格视图中索引栏（section index）在被按住拖动时的背景颜色。
var sectionIndexTrackingBackgroundColor: UIColor? { get set }

// 将放大镜图标添加到表格视图部分索引的常量。
class let indexSearch: String
```

### Getting the drawing areas for the table 获取表格的绘图区域

```swift
// 返回表视图指定部分的绘图区域。
// 用于获取指定分区的矩形框（CGRect）。
func rect(forSection section: Int) -> CGRect

// 返回索引路径标识的行的绘图区域。
func rectForRow(at indexPath: IndexPath) -> CGRect

// 返回指定部分页脚的绘图区域。
func rectForFooter(inSection section: Int) -> CGRect

//
func rectForHeader(inSection section: Int) -> CGRect
```

### Working with focus 专注工作

```swift
// 一个布尔值，用于确定表视图是否允许其单元格聚焦。
var allowsFocus: Bool { get set }

// 一个布尔值，用于确定表视图是否允许其单元格在编辑模式下聚焦。
var allowsFocusDuringEditing: Bool { get set }

// 当焦点移动到单元格时触发自动选择的布尔值。
var selectionFollowsFocus: Bool { get set }

// 一个布尔值，指示表视图是否在最后一个聚焦索引路径上自动将焦点返回到单元格。
var remembersLastFocusedIndexPath: Bool { get set }
```

### Managing context menus 管理上下文菜单

```swift
//  表格视图的上下文菜单交互。
// 用于在响应者链中创建和管理上下文菜单。它允许用户在用户界面元素上执行长按手势（或其它合适的交互），以呈现一个上下文菜单，其中包含与所选元素相关的操作和选项。
// 这个交互主要用于创建非模态的菜单，让用户在当前界面保持上下文，而不是打断用户体验。上下文菜单常用于展示一些与用户操作相关的快捷选项。
var contextMenuInteraction: UIContextMenuInteraction? { get }
```

### Resizing self-sizing cells 调整自调整单元格大小

```swift
//  表格视图用于使自大小单元格大小无效的模式。
// enum SelfSizingInvalidation : Int, @unchecked Sendable
// case disabled 禁用自调整大小失效的模式。
// case enabled 一种启用手动自调整大小失效的模式。
// case enabledIncludingConstraints 一种在自动布局更改后启用自动自动调整大小失效的模式。
var selfSizingInvalidation: UITableView.SelfSizingInvalidation { get set }
```