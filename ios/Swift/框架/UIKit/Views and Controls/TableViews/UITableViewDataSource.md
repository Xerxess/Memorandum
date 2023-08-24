# UITableViewDataSource

对象用于管理数据和为表视图提供单元格的方法。

```swift
@MainActor
protocol UITableViewDataSource
```

表视图仅管理其数据的显示；它们不管理数据本身。  
要管理数据，您为表提供数据源对象——一个实现`UITableViewDataSource`协议的对象。  
数据源对象响应来自表中的数据相关请求。  
它还直接管理表的数据，或与应用程序的其他部分协调以管理这些数据。  
数据源对象的其他职责包括：

* 报告表中的节数和行数。
* 为表格的每一行提供单元格。
* 为章节页眉和页脚提供标题。
* 配置表的索引（如果有的话）。
* 响应需要更改基础数据的用户或表发起的更新。

## Topics

### Providing the number of rows and sections 提供行数和节数

```swift
// 告诉数据源返回表视图给定部分中的行数(rows)。
// Required
func tableView(
    _ tableView: UITableView,
    numberOfRowsInSection section: Int
) -> Int

// 要求数据源返回表格视图中的节数(sections)。
optional func numberOfSections(in tableView: UITableView) -> Int
```

### Providing cells, headers, and footers 提供单元格、页眉和页脚

```swift
// 请求单元格的数据源插入到表视图的特定位置(单元格)。
// Required
// 从UITableViewCell继承的对象，表视图可用于指定行。
// 如果您返回nil，UIKit会引发一个断言。
// 在您的实现中，为给定的索引路径创建和配置适当的单元格。使用表视图的dequeueReusableCell（withIdentifier:for:）方法创建单元格，该方法为您回收或创建单元格。创建单元格后，用适当的数据值更新单元格的属性。
// 如果您想从表中检索单元格，请调用表视图的cellForRow(at:)方法。
func tableView(
    _ tableView: UITableView,
    cellForRowAt indexPath: IndexPath
) -> UITableViewCell

// 要求数据源提供表视图指定部分标题的标题(页眉)。
optional func tableView(
    _ tableView: UITableView,
    titleForHeaderInSection section: Int
) -> String?

// 向数据源询问表视图指定部分页脚的标题(页脚)。
optional func tableView(
    _ tableView: UITableView,
    titleForFooterInSection section: Int
) -> String?
```

### Inserting or deleting table rows  插入或删除表行

```swift
// 要求数据源提交插入或删除指定行。(水平滑动以显示删除按钮,必须实现)
// 当用户点击表视图中与UITableViewCell对象关联的插入（绿色加号）控件或删除按钮时，表视图会将此消息发送到数据源，要求其提交更改。（如果用户点击删除（红色减号）控件，则表格视图将显示删除按钮以获取确认。）数据源通过酌情调用UITableView方法insertRows（at:with:）或deleteRows（at:with:）来提交插入或删除。
// 启用表格视图的滑动到删除功能（其中用户在行上水平滑动以显示删除按钮），您必须实现此方法。
// 您不应该在此方法的实现中调用setEditing(_:animated:)。如果出于某种原因，您必须在延迟后使用perform(_:with:afterDelay:)方法调用它。
optional func tableView(
    _ tableView: UITableView,
    commit editingStyle: UITableViewCell.EditingStyle,
    forRowAt indexPath: IndexPath
)

// 要求数据源验证给定行是否可编辑。
optional func tableView(
    _ tableView: UITableView,
    canEditRowAt indexPath: IndexPath
) -> Bool
```

### Reordering table rows  重新排序表行

```swift
// 询问数据源给定的行是否可以移动到表格视图中的另一个位置。
// 此方法允许数据源指定不显示指定行的重新排序控件。默认情况下，如果数据源实现了tableView(_:moveRowAt:to:)方法，则会显示重新排序控件。
optional func tableView(
    _ tableView: UITableView,
    canMoveRowAt indexPath: IndexPath
) -> Bool

// 告诉数据源将表格视图中特定位置的一行移动到另一个位置。
optional func tableView(
    _ tableView: UITableView,
    moveRowAt sourceIndexPath: IndexPath,
    to destinationIndexPath: IndexPath
)
```

### Configuring an index 配置索引

右侧索引区  
通常情况下，表格视图可以使用右侧的索引来帮助用户快速定位到特定的分区。  
例如，你可能有一个联系人列表，每个分区对应一个字母索引，这样用户可以通过点击索引来快速滚动到以该字母开头的联系人。

```swift
// 要求数据源返回表格视图各部分(sections)索引的标题。
optional func sectionIndexTitles(for tableView: UITableView) -> [String]?

// 要求数据源返回具有给定标题和节标题索引的节的索引。
// 用于在带索引的表格视图中，指定给定索引标题和索引位置时，应该滚动到的分区的索引。
optional func tableView(
    _ tableView: UITableView,
    sectionForSectionIndexTitle title: String,
    at index: Int
) -> Int
```