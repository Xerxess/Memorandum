<!-- TOC -->

- [UICollectionViewCell](#uicollectionviewcell)
- [API](#api)
    - [Configuring the background 配置背景](#configuring-the-background-配置背景)
    - [Managing the content 管理内容](#managing-the-content-管理内容)
    - [Managing the state 状态](#managing-the-state-状态)
    - [Managing drag state changes 管理拖动状态更改](#managing-drag-state-changes-管理拖动状态更改)

<!-- /TOC -->

# UICollectionViewCell

当单个数据项在集合视图的可见范围内时。

您可以按原样使用UICollectionViewCell或对其进行子类来添加其他属性和方法。  
单元格的布局和呈现由集合视图及其相应的布局对象管理。

要配置单元格的内容和外观，您可以设置其内容配置和背景配置。或者，将数据项内容显示为子视图添加到contentView属性中的视图中。  
`不要直接向单元格本身添加子视图`。该`单元格管理多层内容`，其中内容视图只有一个。除了内容视图外，`单元格还管理两个后台视图，以选定和未选择的状态显示单元格`。

您通常不会自己创建此类的实例。  
相反，您可以使用单元格注册来注册您的特定单元格子类（或包含类配置实例的nib文件）。  
当您想要单元格类的新实例时，调用集合视图对象的dequeueConfiguredReusableCell（using:for:item:）方法来检索一个。

```swift
@MainActor class UICollectionViewCell : UICollectionReusableView
```

# API

## Configuring the background 配置背景

```swift
// 检索具有系统默认值的后台配置。
func defaultBackgroundConfiguration() -> UIBackgroundConfiguration

// 单元格的当前后台配置。
// 使用后台配置，您可以获得各种不同单元格状态的系统默认后台样式。
// 使用默认系统样式之一创建后台配置，根据需要自定义配置以匹配单元格的样式，并将配置分配给此属性。
@MainActor var backgroundConfiguration: UIBackgroundConfiguration? { get set }

// 一个布尔值，用于确定单元格在状态发生变化时是否自动更新其后台配置。
// 当此值为true时，当单元格的配置状态发生变化时，单元格会自动在其后台调用更新（for:）配置，并将更新的配置应用回单元格。
// 默认值为true。
// 如果您覆盖updateConfiguration（使用：）手动更新和自定义后台配置，请通过将此属性设置为false来禁用自动更新。
var automaticallyUpdatesBackgroundConfiguration: Bool { get set }

// 显示单元格其他内容后面的视图。
// 使用此属性为单元格分配自定义背景视图。
// 背景视图显示在内容视图后面，其帧会自动调整，以填充单元格的边界。
// 后台配置与背景视图相互排斥，因此您必须使用一种或另一种方法。
// 为此属性设置非nil值将backgroundConfiguration重置为nil。
var backgroundView: UIView? { get set }

// 显示在所选单元格的后台视图上方的视图。
// 您可以使用此视图为选定的单元格提供自定义外观。
// 当单元格具有选定状态时，此视图在backgroundView上方和contentView后面分层。
// 后台配置与背景视图相互排斥，因此您必须使用一种或另一种方法。
// 为此属性设置非nil值将backgroundConfiguration重置为nil。
var selectedBackgroundView: UIView? { get set }
```

## Managing the content 管理内容

```swift
// 单元格的当前内容配置。
// 使用内容配置，您可以为各种不同的单元格状态设置单元格的内容和样式。
// 设置内容配置会将单元格的现有内容视图替换为配置中的新内容视图实例，或者如果配置与现有内容视图类型兼容，则直接将配置应用于现有内容视图。
// 默认值为nil。
// 将内容配置设置为此属性后，将此属性设置为nil将用新的空内容视图替换当前内容视图。
@MainActor var contentConfiguration: UIContentConfiguration? { get set }

// 一个布尔值，用于确定单元格在状态更改时是否自动更新其内容配置
var automaticallyUpdatesContentConfiguration: Bool { get set }

// 您添加单元格自定义内容的主要视图。
// 在配置单元格时，您可以将代表单元格内容的任何自定义视图添加到此视图中。
// 单元格对象将此视图中的内容放在任何背景视图的前面。
var contentView: UIView { get }
```

## Managing the state 状态

```swift
// 单元格的当前配置状态。
var configurationState: UICellConfigurationState

// 通知单元格根据当前状态更新其配置。
func setNeedsUpdateConfiguration()

// 使用当前状态更新单元格的配置。
func updateConfiguration(using: UICellConfigurationState)

// 使用当前状态处理单元格配置更新的块。
var configurationUpdateHandler: UICollectionViewCell.ConfigurationUpdateHandler?

// 使用当前状态处理单元格配置更新的块类型。
typealias UICollectionViewCell.ConfigurationUpdateHandler

// 单元格的选择状态。
// 此属性仅管理单元格的选择状态。
// 默认值为false，表示未选择的状态。
// 您通常不会直接设置此属性的值。以编程方式更改此属性的值不会改变单元格的外观。
// 选择单元格并突出显示它的首选方法是使用集合视图对象的选择方法。
var isSelected: Bool { get set }

// 单元格的高亮状态。
// 此属性仅管理单元格的高亮状态。
// 默认值为false，这表明单元格没有处于高亮显示状态。
// 您通常不会直接设置此属性的值。相反，选择单元格并突出显示它的首选方法是使用集合视图对象的选择方法。
var isHighlighted: Bool { get set }

```

## Managing drag state changes 管理拖动状态更改

```swift
// 当单元格的拖动状态发生变化时调用。
// 子类可以覆盖此方法，并在拖放操作期间使用它来更改单元格的外观。
// 例如，您可以使用此方法隐藏或禁用在拖动单元格时不希望可见的控件。
// 您还可以使用此方法更改拖动原始位置保留在集合视图中的单元格的禁用外观。
// enum UICollectionViewCell.DragState
// case none 单元格不参与拖动。
// case lifting 单元格正在从集合视图的表面上动画化。
// case dragging cell正在被拖动。
func dragStateDidChange(UICollectionViewCell.DragState)

```