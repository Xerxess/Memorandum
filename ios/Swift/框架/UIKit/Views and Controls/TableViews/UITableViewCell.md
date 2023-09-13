<!-- TOC -->

- [UITableViewCell](#uitableviewcell)
- [Topicsin](#topicsin)
    - [Creating a table view cellin  创建表视图单元格](#creating-a-table-view-cellin--%E5%88%9B%E5%BB%BA%E8%A1%A8%E8%A7%86%E5%9B%BE%E5%8D%95%E5%85%83%E6%A0%BC)
    - [Reusing cells 重复使用细胞](#reusing-cells-%E9%87%8D%E5%A4%8D%E4%BD%BF%E7%94%A8%E7%BB%86%E8%83%9E)
    - [Configuring the background 配置背景](#configuring-the-background-%E9%85%8D%E7%BD%AE%E8%83%8C%E6%99%AF)
    - [Managing the content 管理内容](#managing-the-content-%E7%AE%A1%E7%90%86%E5%86%85%E5%AE%B9)
    - [Managing the state 管理状态](#managing-the-state-%E7%AE%A1%E7%90%86%E7%8A%B6%E6%80%81)
    - [Managing accessory views 管理附件视图](#managing-accessory-views-%E7%AE%A1%E7%90%86%E9%99%84%E4%BB%B6%E8%A7%86%E5%9B%BE)
    - [Managing cell selection and highlighting 管理单元格选择和突出显示](#managing-cell-selection-and-highlighting-%E7%AE%A1%E7%90%86%E5%8D%95%E5%85%83%E6%A0%BC%E9%80%89%E6%8B%A9%E5%92%8C%E7%AA%81%E5%87%BA%E6%98%BE%E7%A4%BA)
    - [Editing the cell 编辑单元格](#editing-the-cell-%E7%BC%96%E8%BE%91%E5%8D%95%E5%85%83%E6%A0%BC)
    - [Dragging the row 拖动行](#dragging-the-row-%E6%8B%96%E5%8A%A8%E8%A1%8C)
    - [Adjusting to state transitions 适应状态转换](#adjusting-to-state-transitions-%E9%80%82%E5%BA%94%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2)
    - [Managing content indentation 管理内容缩进](#managing-content-indentation-%E7%AE%A1%E7%90%86%E5%86%85%E5%AE%B9%E7%BC%A9%E8%BF%9B)
    - [Managing focus 管理焦点](#managing-focus-%E7%AE%A1%E7%90%86%E7%84%A6%E7%82%B9)

<!-- /TOC -->

# UITableViewCell

表格视图中单行的可视化表示。

```swift
@MainActor
class UITableViewCell : UIView
```

UITableViewCell对象是一种专门的视图类型，用于管理单个表行的内容。  
您主要使用单元格来组织和显示应用程序的自定义内容，但UITableViewCell提供了一些特定的自定义来支持与表相关的行为，包括：

* 向单元格应用选择或突出显示颜色
* 添加标准配件视图，例如细节或披露控制
* 将单元格置于可编辑状态
* 缩进单元格的内容，以在表格中创建可视化层次结构

# Topicsin

## Creating a table view cellin  创建表视图单元格

```swift
// UITableViewCell.CellStyle
// case `default` 默认样式，包含一个左侧的文本标签和一个可选的右侧的详细文本标签。
// case value1 包含一个左侧的文本标签和一个位于右侧的详细文本标签。通常用于显示一个标题和相关的数值。
// case value2  类似于 value1 样式，但左右文本标签的位置颠倒。通常用于显示一个数值和相关的标题。
// case subtitle 带有副标题的样式，包含一个左侧的文本标签和一个位于下方的副标题标签。
init(
    style: UITableViewCell.CellStyle,
    reuseIdentifier: String?
)
```

## Reusing cells 重复使用细胞

```swift
// 用于识别可重复使用的单元格的字符串。
var reuseIdentifier: String? { get }

// 准备一个可重用的单元格，供表视图的委托重用。
// 用于在单元格被重用之前进行准备操作。
// 当表格视图需要重用一个单元格时，会调用该方法，以便你可以清除旧的数据和配置，以便为即将显示的新数据做好准备。
// 可以重写 prepareForReuse()
// * 清除旧的数据：在方法中重置单元格的属性、标签文本、图像等，以确保它们在被重用时不会显示之前的数据。
// * 重置样式和状态：如果单元格包含可更改的样式或状态，你可以在 prepareForReuse() 中将其重置为默认值，以确保单元格在被重用时具有一致的外观和行为。
// * 取消选中状态：如果单元格在选中时更改了其外观或状态，你可以在 prepareForReuse() 中取消选中状态，以便在重用时重置为默认状态。
func prepareForReuse()
```

## Configuring the background 配置背景

```swift
// 检索具有系统默认值的后台配置。
// 用于获取默认的背景配置对象。它返回一个 UIBackgroundConfiguration 对象，该对象定义了单元格的背景样式和外观。
@MainActor
func defaultBackgroundConfiguration() -> UIBackgroundConfiguration

// 单元格的当前背景配置。
// 通过设置 backgroundConfiguration 属性，你可以自定义单元格的背景，包括背景颜色、边框、圆角等。
// 背景配置与背景视图是相互排斥的，因此您必须使用一种或另一种方法。为该属性设置非零值会将以下API重置为零：
// backgroundColor
// backgroundView
// selectedBackgroundView
// multipleSelectionBackgroundView
@MainActor
var backgroundConfiguration: UIBackgroundConfiguration? { get set }

// 一个布尔值，用于确定单元格在状态更改时是否自动更新其后台配置。
var automaticallyUpdatesBackgroundConfiguration: Bool { get set }

//  用作单元格背景的视图。
// UITableViewCell将背景视图添加为所有其他视图后面的子视图，并使用其当前帧位置。
// 背景配置与背景视图是相互排斥的，因此您必须使用一种或另一种方法。为该属性设置非零值会将backgroundConfiguration重置为nil。
var backgroundView: UIView? { get set }

// 用作所选单元格背景的视图。
// 仅当单元格具有选定状态时，UITableViewCell才会将此属性的值添加为子视图。如果不是零，它会将选定的背景视图添加为直接位于背景视图（backgroundView）上方或所有其他视图后面的子视图。调用setSelected(_:animated:)会导致选定的背景视图以alpha淡出为动画。
// 背景配置与背景视图是相互排斥的，因此您必须使用一种或另一种方法。为该属性设置非零值会将backgroundConfiguration重置为零。
var selectedBackgroundView: UIView? { get set }

// 当表格视图允许选择多行时，用于选定单元格的背景视图。
// 背景配置与背景视图是相互排斥的，因此您必须使用一种或另一种方法。为该属性设置非零值会将backgroundConfiguration重置为零。
var multipleSelectionBackgroundView: UIView? { get set }
```

## Managing the content 管理内容

```swift
// 检索单元格样式的默认列表内容配置。
// 用于获取默认的内容配置对象。它返回一个 UIContentConfiguration 对象，该对象定义了单元格的内容展示方式和样式。
@MainActor
func defaultContentConfiguration() -> UIListContentConfiguration

// 单元格的当前内容配置。
// 通过设置 contentConfiguration 属性，你可以自由地定制单元格的内容展示，以满足你的设计需求。这使得你能够个性化单元格的内部元素，包括文本、图像和附加视图等，并根据应用程序的设计风格进行样式定制。
// 使用内容配置，您可以为各种不同的单元格状态设置单元格的内容和样式。您可以使用defaultContentConfiguration()获取默认配置，将内容分配给配置，自定义任何其他属性，并将其作为当前内容配置分配给视图。
// 设置内容配置会将单元格的现有contentView替换为配置中的新内容视图实例，或者如果配置与现有内容视图类型兼容，则直接将配置应用于现有内容视图。
// 默认值为nil。
// 将内容配置设置为此属性后，将此属性设置为nil会将当前内容视图替换为新的空内容视图。
@MainActor
var contentConfiguration: (UIContentConfiguration)? { get set }

// 一个布尔值，用于确定单元格在状态发生变化时是否自动更新其内容配置。 
var automaticallyUpdatesContentConfiguration: Bool { get set }

// 单元格对象的内容视图。
// 用于放置单元格内容的容器视图。你可以向 contentView 添加子视图来自定义单元格的内容展示。
// 当你创建自定义的单元格时，通常会将内容视图作为放置文本标签、图像视图和其他自定义视图的容器。这样可以确保单元格的内容正确布局，并与单元格的其他元素（如背景、选中状态等）相互独立。
var contentView: UIView { get }
```

## Managing the state 管理状态

```swift
// 单元格的当前配置状态。
// UICellConfigurationState 是一个结构体，它包含了一组布尔属性，用于表示单元格的不同状态。这些属性包括是否处于高亮状态、是否被选中、是否处于编辑状态等等。通过检查和使用这些属性，你可以根据不同的状态来自定义单元格的外观和行为。
@MainActor @objc(_bridgedConfigurationState) dynamic var configurationState: UICellConfigurationState { get }

// 通知单元格更新其当前状态的配置。
func setNeedsUpdateConfiguration()
 
// 使用当前状态更新单元格的配置。
@MainActor @objc(_bridgedUpdateConfigurationUsingState:) dynamic func updateConfiguration(using state: UICellConfigurationState)
```

## Managing accessory views 管理附件视图

```swift
// 单元格在表视图的正常状态下使用的标准附件视图类型。
// UITableViewCell.AccessoryType
// .none: 不显示任何附加视图。
// .disclosureIndicator: 显示一个向右的箭头指示器，表示该单元格可以进一步展开或导航到其他视图。
// .detailDisclosureButton: 显示一个向右的箭头指示器和一个详细信息按钮。通常用于在点击箭头时显示更多详细信息，点击按钮时执行其他操作。
// .checkmark: 显示一个勾选标记，表示该单元格被选中。
// .detailButton: 显示一个详细信息按钮，用于执行特定的操作。
var accessoryType: UITableViewCell.AccessoryType { get set }

// 在表视图的正常状态下，在单元格右侧使用的视图，通常作为控件。
// 用于设置单元格的自定义附加视图。它允许你添加一个自定义视图作为单元格的附加视图，以替代默认的附加视图类型。
var accessoryView: UIView? { get set }

// 单元格在表视图编辑状态下使用的标准附件视图类型。
var editingAccessoryType: UITableViewCell.AccessoryType { get set }

// 在表视图的编辑状态下，在单元格右侧使用的视图，通常作为控件。
var editingAccessoryView: UIView? { get set }
```

## Managing cell selection and highlighting 管理单元格选择和突出显示

```swift
// 单元格的选择风格。
// UITableViewCell.SelectionStyle
// .none: 不显示任何选中样式，即单元格被选中时不发生外观上的变化。
// .default: 显示默认的选中样式，即单元格被选中时会高亮显示。
// .blue: 显示蓝色的选中样式，即单元格被选中时会以蓝色高亮显示。
// .gray: 显示灰色的选中样式，即单元格被选中时会以灰色高亮显示。
var selectionStyle: UITableViewCell.SelectionStyle { get set }

// 指示是否选择单元格的布尔值。
var isSelected: Bool { get set }

// 设置单元格的选定状态，可选择为状态之间的过渡提供动画效果。
func setSelected(
    _ selected: Bool,
    animated: Bool
)

// 高亮
var isHighlighted: Bool { get set }
func setHighlighted(
    _ highlighted: Bool,
    animated: Bool
)
```

## Editing the cell 编辑单元格

```swift
// 指示单元格是否处于可编辑状态的布尔值。
var isEditing: Bool { get set }
func setEditing(
    _ editing: Bool,
    animated: Bool
)

// 
// UITableViewCell.EditingStyle
// .none: 不显示任何编辑样式。
// .delete: 显示一个删除按钮，用于删除单元格或执行删除操作。
// .insert: 显示一个插入按钮，用于插入新的单元格或执行插入操作。
var editingStyle: UITableViewCell.EditingStyle { get }

// 一个布尔值，指示单元格当前是否显示删除确认按钮。
var showingDeleteConfirmation: Bool { get }

// 一个布尔值，用于确定单元格是否显示重新排序控件。
// 用于控制是否显示单元格的重新排序控件。重新排序控件允许用户通过长按并拖动单元格来重新排列表格视图中的单元格顺序。
// 默认情况下，showsReorderControl 的值为 false，即不显示重新排序控件。如果你希望启用单元格的重新排序功能，可以将 showsReorderControl 设置为 true。
var showsReorderControl: Bool { get set }
```

## Dragging the row 拖动行

```swift
// 一个布尔值，指示用户在拖动单元格时是否可以与单元格进行交互。
var userInteractionEnabledWhileDragging: Bool { get set }

// 通知单元格其拖动状态已更改。
// 用于在单元格的拖动状态发生更改时进行回调。该方法在使用拖动手势对单元格进行重新排序时被调用。
// UITableViewCell.DragState
// .none: 没有拖动操作正在进行。
// .lifting: 用户已经开始拖动单元格，但尚未移动它
// .dragging: 用户正在拖动单元格。
// .canceling: 拖动操作被取消。
// .finished: 拖动操作已经完成。
func dragStateDidChange(_ dragState: UITableViewCell.DragState)
```

## Adjusting to state transitions 适应状态转换

```swift
// 通知细胞即将过渡到新的细胞状态
// 一个委托方法，用于在单元格将要过渡到新的尺寸时进行回调。该方法在单元格的尺寸发生变化时被调用，例如设备旋转时或者滑动到不同的大小类别时。
// UITableViewCell.StateMask
// .defaultMask: 默认状态，没有特殊标志。
// .showingEditControlMask: 正在显示编辑控件，例如重新排序控件。
// .showingDeleteConfirmationMask: 正在显示删除确认。
// .showingSwipeToDismissMask: 正在显示滑动删除操作。
func willTransition(to state: UITableViewCell.StateMask)

// 通知单元格它已过渡到新的单元格状态。
func didTransition(to state: UITableViewCell.StateMask)
```

## Managing content indentation 管理内容缩进

```swift
// 单元格内容的缩进级别。
// 通过使用 indentationLevel 属性，你可以在单元格中应用水平缩进，以创建层次结构或显示相关信息的分组。这在展示嵌套数据或显示层次结构的列表中特别有用。注意，使用此属性仅会影响单元格的布局，不会更改其内容或功能。
var indentationLevel: Int { get set }

// 单元格内容的每个级别缩进的宽度。
// default:10pt
var indentationWidth: CGFloat { get set }

// 当表格视图处于编辑模式时，控制单元格背景是否缩进的布尔值。
// 用于控制在编辑模式下是否应该对单元格进行缩进。当该属性设置为 true 时，在编辑模式下显示的单元格将会被缩进，以腾出空间给编辑控件，例如重新排序控件或删除按钮。
// 默认情况下，shouldIndentWhileEditing 的值为 true，表示在编辑模式下进行缩进。如果你希望在编辑模式下不进行缩进，可以将 shouldIndentWhileEditing 设置为 false。
var shouldIndentWhileEditing: Bool { get set }

// 单元格下方绘制的分隔线的嵌入值。
// 分隔线是在单元格底部绘制的一条水平线，用于分隔不同单元格之间的内容。
// 
var separatorInset: UIEdgeInsets { get set }
```

## Managing focus 管理焦点

```swift
// 聚焦时cell的外观。
// 焦点是指用户在使用可聚焦的界面元素（例如通过键盘或游戏手柄导航）时所处的位置。
// UITableViewCell.FocusStyle
// .default: 默认样式，在获取焦点时，单元格会显示默认的焦点样式。
// .custom: 自定义样式，允许你自定义单元格在获取焦点时的外观。你可以通过自定义视图或样式设置来实现自定义焦点样式。
// .none: 不显示焦点样式，单元格在获取焦点时不会有特殊的视觉效果。
var focusStyle: UITableViewCell.FocusStyle { get set }
```
