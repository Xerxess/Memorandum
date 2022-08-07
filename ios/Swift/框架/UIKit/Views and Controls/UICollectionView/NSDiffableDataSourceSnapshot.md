<!-- TOC -->

- [NSDiffableDataSourceSnapshot](#nsdiffabledatasourcesnapshot)
- [API](#api)
    - [Creating a Snapshot 创建快照](#creating-a-snapshot-创建快照)
    - [Getting Item and Section Metrics 获取项目和部分指标](#getting-item-and-section-metrics-获取项目和部分指标)
    - [Identifying Items and Sections 识别项目和部分](#identifying-items-and-sections-识别项目和部分)
    - [Inserting Items and Sections 插入项目和章节](#inserting-items-and-sections-插入项目和章节)
    - [Removing Items and Sections 移除项目和部分](#removing-items-and-sections-移除项目和部分)
    - [Reordering Items and Sections](#reordering-items-and-sections)
    - [Reloading Data](#reloading-data)

<!-- /TOC -->

# NSDiffableDataSourceSnapshot

在特定时间点对视图中数据状态的表示。

可变数据源使用快照为集合视图和表格视图提供数据。  
您使用快照来设置视图显示的数据的初始状态，并使用快照来反映视图显示的数据的变化。

快照中的数据由您想要显示的部分和项目组成，按照您确定的顺序。您可以通过添加、删除或移动部分和项目来配置要显示的内容。

要使用快照在视图中显示数据：
- 创建一个快照，并填充您要显示的数据状态。
- 应用快照以反映用户界面中的变化。

您可以通过以下方式之一创建和配置快照：
- 创建一个空快照，然后将部分和项目附加到其中。
- 通过调用可变数据源的snapshot()方法获取当前快照，然后修改该快照以反映您要显示的数据的新状态。

```swift
@preconcurrency struct NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType> where SectionIdentifierType : Hashable, SectionIdentifierType : Sendable, ItemIdentifierType : Hashable, ItemIdentifierType : Sendable
```

# API

## Creating a Snapshot 创建快照

```swift
// 
init()

// 将带有指定标识符的Section添加到快照中。
func appendSections([SectionIdentifierType])

// 将具有指定标识符的items添加到快照的指定部分。
func appendItems([ItemIdentifierType], toSection: SectionIdentifierType?)

```

## Getting Item and Section Metrics 获取项目和部分指标

```swift
// 快照中的项目数量。
var numberOfItems: Int { get }

// 快照中的部分数量。
var numberOfSections: Int { get }

// 返回快照指定部分中的项目数量。
func numberOfItems(inSection: SectionIdentifierType) -> Int

```

## Identifying Items and Sections 识别项目和部分

```swift
// 快照中所有项目的标识符。
var itemIdentifiers: [ItemIdentifierType] { get }

// 快照中所有部分的标识符。
var sectionIdentifiers: [SectionIdentifierType] { get }

// 使用指定的标识符返回快照中项目的索引。
// 快照中项目的索引，如果快照中没有具有指定标识符的项目，则为nil。此索引值基于0。
func indexOfItem(_ identifier: ItemIdentifierType) -> Int?

// 返回带有指定标识符的快照部分的索引。
func indexOfSection(SectionIdentifierType) -> Int?

// 返回快照指定部分中所有项目的身份识别码。
func itemIdentifiers(inSection: SectionIdentifierType) -> [ItemIdentifierType]

// 返回快照中包含指定项的部分的标识符。
func sectionIdentifier(containingItem: ItemIdentifierType) -> SectionIdentifierType?
```

## Inserting Items and Sections 插入项目和章节

```swift
// 在快照中带有指定标识符的项目之后立即插入提供的项目。
func insertItems([ItemIdentifierType], afterItem: ItemIdentifierType)

// 在快照中带有指定标识符的项目前夕插入提供的项目。
func insertItems([ItemIdentifierType], beforeItem: ItemIdentifierType)

// 在快照中带有指定标识符的Section之后立即插入提供的Section。
func insertSections([SectionIdentifierType], afterSection: SectionIdentifierType)

// 在屏幕截图中带有指定标识符的Section前插入提供的Section。
func insertSections([SectionIdentifierType], beforeSection: SectionIdentifierType)
```

## Removing Items and Sections 移除项目和部分

```swift
// 从快照中删除所有项目。
func deleteAllItems()

// 从快照中删除具有指定标识符的项目。
func deleteItems([ItemIdentifierType])

// 从快照中删除带有指定标识符的部分。
func deleteSections([SectionIdentifierType])

```

## Reordering Items and Sections

```swift
// 将项目从快照中的当前位置移动到指定项目之后的位置。
func moveItem(ItemIdentifierType, afterItem: ItemIdentifierType)

// 将项目从快照中的当前位置移动到指定项目前的位置
func moveItem(ItemIdentifierType, beforeItem: ItemIdentifierType)

// 将该部分从快照中的当前位置移动到指定部分之后的位置。
func moveSection(SectionIdentifierType, afterSection: SectionIdentifierType)

// 将该部分从快照中的当前位置移动到指定部分前的位置。
func moveSection(SectionIdentifierType, beforeSection: SectionIdentifierType)
```

## Reloading Data

```swift
// 更新您在快照中指定的项目的数据，保留项目的现有单元格。
func reconfigureItems([ItemIdentifierType])

// 标识通过对快照的更改重新配置的项目。
var reconfiguredItemIdentifiers: [ItemIdentifierType] { get }

// 在快照的指定项目中重新加载数据。
func reloadItems([ItemIdentifierType])

// 标识快照更改后重新加载的项目。
var reloadedItemIdentifiers: [ItemIdentifierType]

// 在快照的指定部分中重新加载数据。
func reloadSections([SectionIdentifierType])

// 标识快照更改后重新加载的部分。
var reloadedSectionIdentifiers: [SectionIdentifierType] { get }
```
