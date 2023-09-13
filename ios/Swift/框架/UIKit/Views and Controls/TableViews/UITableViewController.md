<!-- TOC -->

- [UITableViewController](#uitableviewcontroller)
- [Topics](#topics)
    - [Creating a table view controller 创建表视图控制器](#creating-a-table-view-controller-%E5%88%9B%E5%BB%BA%E8%A1%A8%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8)
    - [Getting the table view 获取表视图](#getting-the-table-view-%E8%8E%B7%E5%8F%96%E8%A1%A8%E8%A7%86%E5%9B%BE)
    - [Configuring the table behavior 配置表行为](#configuring-the-table-behavior-%E9%85%8D%E7%BD%AE%E8%A1%A8%E8%A1%8C%E4%B8%BA)
    - [Refreshing the table view 刷新表视图](#refreshing-the-table-view-%E5%88%B7%E6%96%B0%E8%A1%A8%E8%A7%86%E5%9B%BE)

<!-- /TOC -->

# UITableViewController

专门管理表视图的视图控制器。

```swift
@MainActor
class UITableViewController : UIViewController
```

当您的界面由表视图和很少或没有其他内容组成时，子类UITableViewController。表视图控制器已经采用了管理表视图内容和响应更改所需的协议。此外，UITTableViewController实现了以下行为：

* 自动加载在故事板或nib文件中存档的表视图，您可以使用tableView属性访问
* 将数据源和表视图的委托设置为self
* 实现viewWillAppear(_:)方法，首次出现时自动重新加载其表视图的数据，并在每次出现表视图时清除其选择（带或不带动画，取决于请求）（通过更改clearsSelectionOnViewWillAppear的值来禁用这最后一个行为）
* 实现viewDidAppear(_:)方法，并在表视图首次出现时自动闪烁其滚动指示器
* 实现setEditing(_:animated:)方法，并在用户点击导航栏中的Edit|Done按钮时自动切换表的编辑模式
* 自动调整其表格视图的大小，以适应屏幕键盘的外观或消失

# Topics

## Creating a table view controller 创建表视图控制器

```swift
// Initializes a table view controller to manage a table view of a given style.
// enum Style : Int, @unchecked Sendable
// case plain 一个简单的表格视图。
// case grouped 表格视图，其中各部分具有不同的行组。
// case insetGrouped 表格视图，其中分组的部分插入圆角。
init(style: UITableView.Style)

// Creates a table view controller with the nib file in the specified bundle.
init(nibName: String?, bundle: Bundle?)

//Creates a table view controller from data in an unarchiver.
init?(coder: NSCoder)
```

## Getting the table view 获取表视图

```swift
var tableView: UITableView! { get set }
```

## Configuring the table behavior 配置表行为

```swift
// 一个布尔值，指示控制器在表出现时是否清除选择。
var clearsSelectionOnViewWillAppear: Bool { get set }
```

## Refreshing the table view 刷新表视图

```swift
// 用于更新表格内容的刷新控件。
// 此属性的默认值为nil。
// 为该属性分配刷新控件会将控件添加到视图控制器的关联界面中。在将其与视图控制器关联之前，您无需设置刷新控件的帧。视图控制器更新控件的高度和宽度，并适当设置其位置。
// 表视图控制器不会自动更新表的内容，以响应用户与刷新控件的交互。当用户启动刷新操作时，控件会生成一个valueChanged事件。您必须将目标和操作方法与此事件相关联，并使用它们来刷新表的内容。
var refreshControl: UIRefreshControl? { get set }
```
