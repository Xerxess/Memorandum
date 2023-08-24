# UITableViewDelegate

管理选择、配置节页眉和页脚、删除和重新排序单元格以及在表格视图中执行其他操作的方法。

```swift
@MainActor
protocol UITableViewDelegate
```

使用此协议的方法来管理以下功能：

* 创建和管理自定义页眉和页脚视图。
* 指定行、页眉和页脚的自定义高度。
* 提供高度估计，以获得更好的滚动支持。
* 缩进行内容。
* 响应行选择。
* 响应表格行中的滑动和其他操作。
* 支持编辑表格的内容。

## Topics

### Configuring rows for the table view 配置表视图的行

```swift
// 告诉委托表视图即将为特定行绘制单元格。
// 可以使用这个方法在单元格即将显示时执行一些操作，例如添加动画效果、调整单元格样式等。
optional func tableView(
    _ tableView: UITableView,
    willDisplay cell: UITableViewCell,
    forRowAt indexPath: IndexPath
)

// 要求委托返回给定部分中一行的缩进级别。
// 返回一个整数值，表示特定行的缩进级别。缩进级别决定了这一行显示时应该相对于其他行水平偏移的距离。
// 默认情况下，缩进级别为 0，即不缩进。
optional func tableView(
    _ tableView: UITableView,
    indentationLevelForRowAt indexPath: IndexPath
) -> Int

// 调用允许您微调表中行的弹簧加载行为。
// 弹簧加载是一种交互方式，用户在表格视图中上下滑动，当滑动到某一行时，可以通过继续向下滑动来加载更多内容。
optional func tableView(
    _ tableView: UITableView,
    shouldSpringLoadRowAt indexPath: IndexPath,
    with context: UISpringLoadedInteractionContext
) -> Bool
```

### Responding to row selections  响应行选择

```swift
// 告诉委托人即将选择的一行。
// 用于在用户选择特定行之前调用，以决定是否允许选择该行。在该方法中，你可以返回要选择的行的索引路径，或者返回 nil 来阻止选择。
optional func tableView(
    _ tableView: UITableView,
    willSelectRowAt indexPath: IndexPath
) -> IndexPath?

// 告诉委托人选择了一行。
// 用于在用户选择特定行后调用。当用户点击某一行时，此方法会被调用，你可以在其中执行相应的操作，比如显示详细信息、执行跳转等。
optional func tableView(
    _ tableView: UITableView,
    didSelectRowAt indexPath: IndexPath
)

// 告诉委托，指定行即将被取消选择。
// 用于在用户取消选择（反选）特定行之前被调用。你可以使用这个方法来决定是否允许取消选择行，以及选择哪一行来替代反选的行。
optional func tableView(
    _ tableView: UITableView,
    willDeselectRowAt indexPath: IndexPath
) -> IndexPath?

// 告诉委托人，指定的行现在已取消选择。
optional func tableView(
    _ tableView: UITableView,
    didDeselectRowAt indexPath: IndexPath
)

// 询问委托人是否可以使用双指平移手势在表格视图中选择多个项目。
// 用于在用户尝试开始多选（批量选择）操作时调用，以决定是否允许开始多选交互。
// 多选交互是用户可以通过长按一行，然后选择其他行来进行多选操作。你可以使用这个方法来决定是否允许用户进行多选，以及在什么情况下启用多选功能。
optional func tableView(
    _ tableView: UITableView,
    shouldBeginMultipleSelectionInteractionAt indexPath: IndexPath
) -> Bool

// 当用户开始使用双指平移手势在表格视图中选择多行时，告诉委托人
// 在用户开始多选操作时，这个方法会被调用，你可以在其中执行相应的操作，比如显示多选工具栏、更新界面等。
optional func tableView(
    _ tableView: UITableView,
    didBeginMultipleSelectionInteractionAt indexPath: IndexPath
)

// 当用户停止使用双指平移手势在表视图中选择多行时，告诉委托人。
optional func tableViewDidEndMultipleSelectionInteraction(_ tableView: UITableView)
```

###  Providing custom header and footer views 提供自定义页眉和页脚视图

```swift
// 要求委托在表格视图的指定部分的标题中显示一个视图。
optional func tableView(
    _ tableView: UITableView,
    viewForHeaderInSection section: Int
) -> UIView?

// 要求委托在表视图指定部分的页脚中显示的视图。
optional func tableView(
    _ tableView: UITableView,
    viewForFooterInSection section: Int
) -> UIView?

// 告诉委托，该表即将显示指定部分的标题视图。
// 用于在表格视图将要显示特定分区的表头视图时调用。你可以在这个方法中执行一些操作，以准备和配置表头视图。
optional func tableView(
    _ tableView: UITableView,
    willDisplayHeaderView view: UIView,
    forSection section: Int
)

// 告诉委托，该表即将显示指定部分的页脚视图。
optional func tableView(
    _ tableView: UITableView,
    willDisplayFooterView view: UIView,
    forSection section: Int
)
```

### Providing header, footer, and row heights 提供页眉、页脚和行高

```swift
// 要求委托用于指定位置的行的高度。(row)
optional func tableView(
    _ tableView: UITableView,
    heightForRowAt indexPath: IndexPath
) -> CGFloat

// 要求委托人提供用于特定部分标题的高度(section)。
optional func tableView(
    _ tableView: UITableView,
    heightForHeaderInSection section: Int
) -> CGFloat

// 要求代表提供用于特定部分页脚的高度。 (footer)
optional func tableView(
    _ tableView: UITableView,
    heightForFooterInSection section: Int
) -> CGFloat

// 表示给定维度的默认值的常量。
class let automaticDimension: CGFloat
```

### Estimating heights for the table's content 估计表格内容的高度

```swift
// 向代表询问指定位置一行的估计高度。
// 用于为特定行提供估算的行高。这个方法在表格视图使用自动计算行高时非常有用，可以帮助提升性能。
optional func tableView(
    _ tableView: UITableView,
    estimatedHeightForRowAt indexPath: IndexPath
) -> CGFloat
```

### Managing accessory views 管理附件视图

```swift
// 告诉委托人，用户点击了指定行的详细信息按钮。
// 用于在用户点击某一行的附加按钮（Accessory Button）时调用。附加按钮是一种可以添加到表格视图的每一行的小图标按钮，通常用于显示附加信息或执行其他操作。
optional func tableView(
    _ tableView: UITableView,
    accessoryButtonTappedForRowWith indexPath: IndexPath
)

// 向代表询问特定部分标题的估计高度。
optional func tableView(
    _ tableView: UITableView,
    estimatedHeightForHeaderInSection section: Int
) -> CGFloat

// 要求代表提供特定部分页脚的估计高度。
optional func tableView(
    _ tableView: UITableView,
    estimatedHeightForFooterInSection section: Int
) -> CGFloat
```

### Managing context menus 管理上下文菜单

```swift
// 返回一个点上行的上下文菜单配置。
// 用于配置特定行的上下文菜单。
// 上下文菜单是一种在用户长按行时显示的菜单，通常用于提供与行相关的操作选项。
// 需要返回一个 UIContextMenuConfiguration 对象，该对象描述了要显示的上下文菜单的内容和行为。
// 通过配置上下文菜单，你可以提供各种与特定行相关的操作，例如查看详细信息、分享、删除等。
optional func tableView(
    _ tableView: UITableView,
    contextMenuConfigurationForRowAt indexPath: IndexPath,
    point: CGPoint
) -> UIContextMenuConfiguration?

// 关闭上下文菜单时返回目标视图。
// 用于为即将关闭的上下文菜单提供一个预览界面。当用户将鼠标移开以关闭上下文菜单时，这个方法会被调用，你可以在其中返回一个视图来显示预览内容。
optional func tableView(
    _ tableView: UITableView,
    previewForDismissingContextMenuWithConfiguration configuration: UIContextMenuConfiguration
) -> UITargetedPreview?

// 返回一个视图，以覆盖创建的表视图的默认预览。
// 用于为正在显示上下文菜单的行提供一个高亮预览。当用户点击并长按以显示上下文菜单时，这个方法会被调用，你可以在其中返回一个视图来显示高亮预览。
optional func tableView(
    _ tableView: UITableView,
    previewForHighlightingContextMenuWithConfiguration configuration: UIContextMenuConfiguration
) -> UITargetedPreview?

// 通知委托人何时会出现上下文菜单。
// 用于在上下文菜单将要显示时调用。当用户点击并长按某一行以显示上下文菜单时，这个方法会被调用，你可以在其中执行一些操作，例如为上下文菜单添加动画效果。
optional func tableView(
    _ tableView: UITableView,
    willDisplayContextMenu configuration: UIContextMenuConfiguration,
    animator: UIContextMenuInteractionAnimating?
)

// 通知委托人上下文菜单何时会消失。
optional func tableView(
    _ tableView: UITableView,
    willEndContextMenuInteraction configuration: UIContextMenuConfiguration,
    animator: UIContextMenuInteractionAnimating?
)

// 当用户通过点击预览触发提交时通知委托人。
// 用于在执行上下文菜单中的预览操作时调用。当用户点击上下文菜单中的预览操作时，这个方法会被调用，你可以在其中执行一些操作，例如在预览窗口中显示更多详细信息。
optional func tableView(
    _ tableView: UITableView,
    willPerformPreviewActionForMenuWith configuration: UIContextMenuConfiguration,
    animator: UIContextMenuInteractionCommitAnimating
)
```

### Responding to row actions 响应行操作

```swift
// 返回要显示在行前缘的滑动操作。
// 用于为特定行提供前滑手势操作的配置。前滑手势操作是用户在行上向左滑动时显示的一组操作，通常用于显示快速操作选项。
optional func tableView(
    _ tableView: UITableView,
    leadingSwipeActionsConfigurationForRowAt indexPath: IndexPath
) -> UISwipeActionsConfiguration?

// 返回要显示在行尾随边缘的滑动操作。
optional func tableView(
    _ tableView: UITableView,
    trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath
) -> UISwipeActionsConfiguration?
```

### Managing table view highlights 管理表视图突出显示

```swift
// 询问委托人是否应该突出显示指定的行。
// 当用户与表格视图进行交互（例如点击）时，该方法会在表格视图准备对特定行进行高亮显示时被调用。你可以通过实现这个方法来控制是否应该对特定行进行高亮显示。
optional func tableView(
    _ tableView: UITableView,
    shouldHighlightRowAt indexPath: IndexPath
) -> Bool

// 告诉委托人指定行已高亮显示。
optional func tableView(
    _ tableView: UITableView,
    didHighlightRowAt indexPath: IndexPath
)

// 告诉委托，高亮显示已从指定索引路径的行中删除。
// 当表格视图中的某一行被取消高亮显示时，该方法会被调用。高亮显示通常是在用户点击并按住某一行后发生的，然后用户释放手指时取消高亮。
optional func tableView(
    _ tableView: UITableView,
    didUnhighlightRowAt indexPath: IndexPath
)
```

### Editing table rows 编辑表格行

```swift
// 告诉委托人，表视图即将进入编辑模式。
// 当用户开始编辑某一行时，即滑动行以显示编辑按钮时，该方法会被调用。你可以在这个方法中执行一些操作，以响应行开始编辑的事件。
optional func tableView(
    _ tableView: UITableView,
    willBeginEditingRowAt indexPath: IndexPath
)

// 告诉委托表视图已离开编辑模式。
optional func tableView(
    _ tableView: UITableView,
    didEndEditingRowAt indexPath: IndexPath?
)

// 要求委托提供表格视图中特定位置的行的编辑样式。
// 用户滑动一行以显示编辑按钮时被调用，用于确定该行的编辑样式。编辑样式决定了编辑按钮的外观，以及在点击编辑按钮时触发的编辑操作。
optional func tableView(
    _ tableView: UITableView,
    editingStyleForRowAt indexPath: IndexPath
) -> UITableViewCell.EditingStyle

// 更改删除确认按钮的默认标题。
// 当用户滑动行以显示删除按钮时，该方法会被调用，用于自定义删除按钮的标题。
optional func tableView(
    _ tableView: UITableView,
    titleForDeleteConfirmationButtonForRowAt indexPath: IndexPath
) -> String?

// 询问委托人在表视图处于编辑模式时是否应该缩进指定行的背景。
// 当用户处于编辑模式时（例如，滑动行以显示编辑按钮），该方法会被调用以确定是否应该缩进显示特定行的内容。
// true，该行的内容会被缩进以留出空间显示编辑控件（例如，删除按钮）；
// false，则不会进行缩进。
optional func tableView(
    _ tableView: UITableView,
    shouldIndentWhileEditingRowAt indexPath: IndexPath
) -> Bool
```

### Reordering table rows 重新排序表行

```swift
// 要求委托返回一个新的索引路径，以重新定位行的拟议移动。
// 在用户拖动一行以重新排序时，用于确定移动行的目标位置。该方法允许你控制行的移动目标，可以根据应用程序的需求进行自定义。
optional func tableView(
    _ tableView: UITableView,
    targetIndexPathForMoveFromRowAt sourceIndexPath: IndexPath,
    toProposedIndexPath proposedDestinationIndexPath: IndexPath
) -> IndexPath
```

### Tracking the removal of views 跟踪视图的删除

```swift
// 告诉委托人，指定的单元格已从表中删除。
// 在一个已经不再可见的单元格行被移除或不再显示在屏幕上时被调用
optional func tableView(
    _ tableView: UITableView,
    didEndDisplaying cell: UITableViewCell,
    forRowAt indexPath: IndexPath
)

//告诉委托人，指定的头视图已从表中删除。
optional func tableView(
    _ tableView: UITableView,
    didEndDisplayingHeaderView view: UIView,
    forSection section: Int
)

// 告诉委托人，指定的页脚视图已从表中删除。
optional func tableView(
    _ tableView: UITableView,
    didEndDisplayingFooterView view: UIView,
    forSection section: Int
)
```

### Managing table view focus 管理表视图焦点

```swift
// 询问委托人指定索引路径上的单元格本身是否可以聚焦。
// 用户尝试将焦点设置到表格视图的某一行时被调用，用于确定是否允许该行获取焦点。
optional func tableView(
    _ tableView: UITableView,
    canFocusRowAt indexPath: IndexPath
) -> Bool

// 询问委托人是否允许发生上下文指定的焦点更新。
// 在焦点发生变化时（例如用户通过导航控制器或辅助功能导航）被调用，用于确定是否应该更新焦点。
optional func tableView(
    _ tableView: UITableView,
    shouldUpdateFocusIn context: UITableViewFocusUpdateContext
) -> Bool

// 告诉委托人，上下文指定的焦点更新刚刚发生。
optional func tableView(
    _ tableView: UITableView,
    didUpdateFocusIn context: UITableViewFocusUpdateContext,
    with coordinator: UIFocusAnimationCoordinator
)

// 要求委托提供首选聚焦视图的表视图的索引路径。
optional func indexPathForPreferredFocusedView(in tableView: UITableView) -> IndexPath?

// 询问委托人是否在相应的索引路径上将行的选择和焦点行为联系起来。
// 在焦点变化时被调用，用于确定当焦点在某一行移动时，是否应该自动选中该行。
optional func tableView(
    _ tableView: UITableView,
    selectionFollowsFocusForRowAt indexPath: IndexPath
) -> Bool
```

### Performing primary actions 执行主要操作

主要操作是指用户在交互式应用程序中执行的主要或关键操作，通常与特定的用户意图或任务相关联。这些操作可能会触发应用程序中的重要行为，例如导航到其他视图、显示详细信息、执行提交、确认或取消等操作。  

在一个表格视图（UITableView）中，主要操作通常是指用户点击行（或其他交互方式）以执行某项关键任务。例如，在一个产品列表中，用户可能点击某一行以查看产品的详细信息，这就是一个主要操作。

```swift
// 询问委托人是否在指定的索引路径上为行执行主要操作。
// 在用户尝试执行主要操作（例如点击或按下 Enter 键）时被调用，用于确定是否允许执行该操作。
optional func tableView(
    _ tableView: UITableView,
    canPerformPrimaryActionForRowAt indexPath: IndexPath
) -> Bool

// 告诉委托在指定的索引路径上对行执行主要操作。
// 当用户对特定行执行主要操作时（例如点击行），该方法会被调用，用于执行与该操作相关的逻辑。
optional func tableView(
    _ tableView: UITableView,
    performPrimaryActionForRowAt indexPath: IndexPath
)
```