<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Lists](#lists)
  - [List](#list)
  - [修饰符](#修饰符)
    - [配置行](#配置行)
    - [配置分隔符](#配置分隔符)
    - [配置标头](#配置标头)
    - [配置间距](#配置间距)
    - [配置背景](#配置背景)
    - [在列表项上显示徽章](#在列表项上显示徽章)
    - [配置交互](#配置交互)
    - [刷新列表的内容](#刷新列表的内容)
    - [编辑列表](#编辑列表)
- [示例代码](#示例代码)

<!-- /code_chunk_output -->


# Lists

## List

List 是 SwiftUI 中用于展示数据集合的核心组件，它类似于 UIKit 中的 UITableView 。 List 提供了一种简单而强大的方式来显示垂直滚动的数据列表，并支持各种自定义选项。

```swift
// List
List {
    Text("第一行")
    Text("第二行")
    Text("第三行")
}

// ForEach
struct ContentView: View {
    let items = ["苹果", "香蕉", "橙子", "葡萄"]
    
    var body: some View {
        List {
            ForEach(items, id: \.self) { item in
                Text(item)
            }
        }
    }
}
```

## 修饰符

### 配置行

```swift
// 将 inset 应用于列表中的行
func listRowInsets(_ insets: EdgeInsets?) -> some View

// 为列表中的内容设置固定的色调颜色
func listItemTint(_ tint: Color?) -> some View
func listItemTint(_ tint: ListItemTint?) -> some View
```

### 配置分隔符 

```swift
// 分隔符的颜色
func listRowSeparatorTint(
    _ color: Color?,
    edges: VerticalEdge.Set = .all
) -> some View

// Section分隔符的颜色
func listSectionSeparatorTint(
    _ color: Color?,
    edges: VerticalEdge.Set = .all
) -> some View

// RowSeparator是否显示
func listRowSeparator(
    _ visibility: Visibility,
    edges: VerticalEdge.Set = .all
) -> some View

// SectionSeparator是否显示
func listSectionSeparator(
    _ visibility: Visibility,
    edges: VerticalEdge.Set = .all
) -> some View
```

### 配置标头

```swift
// 设置此视图的标题突出程度
func headerProminence(_ prominence: Prominence) -> some View
List {
    Section(header: Text("Header")) {
        Text("Row")
    }
    .headerProminence(.increased)
}
.listStyle(.insetGrouped)

// 应用于视图中的节标题的突出程度
var headerProminence: Prominence { get set }
View.environment(\.headerProminence,.increased)

// 列表中标题的默认最小高度
var defaultMinListHeaderHeight: CGFloat? { get set }
View.environment(\.defaultMinListHeaderHeight,_)
```

### 配置间距

```swift
// 设置 List 中两个相邻行之间的垂直间距
func listRowSpacing(_ spacing: CGFloat?) -> some View

// 将 List 中相邻Section之间的间距设置为自定义值
func listSectionSpacing(_ spacing: CGFloat) -> some View
```

### 配置背景

```swift
// 将自定义背景视图放在列表行项后面
func listRowBackground<V>(_ view: V?) -> some View where V : View

// 与此环境关联的视图下方背景的突出程度
var backgroundProminence: BackgroundProminence { get set }

```

### 在列表项上显示徽章

```swift
// 从整数值生成视图的徽章
func badge(_ count: Int) -> some View

// 徽章的突出程度
func badgeProminence(_ prominence: BadgeProminence) -> some View
```

### 配置交互

```swift
// 自定义滑动作添加到列表中的行
// 使用 Button 实例定义各个作
func swipeActions<T>(
    edge: HorizontalEdge = .trailing,
    allowsFullSwipe: Bool = true,
    @ViewBuilder content: () -> T
) -> some View where T : View

// iOS 17.0+
// 添加一个条件，用于控制用户是否可以选择此视图
func selectionDisabled(_ isDisabled: Bool = true) -> some View
```

### 刷新列表的内容

```swift
// 将此视图标记为可刷新
// 列表会启用标准的下拉刷新手势来刷新列表内容
func refreshable(action: @escaping () async -> Void) -> some View
```

### 编辑列表

# 示例代码

```swift
List {
            Section(header: Text("Header")) {
                Text("ListItem")
                    .listRowInsets(.init(top: 10, leading: 10, bottom: 10, trailing: 10))
                    .listRowSeparatorTint(.blue)
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                    .swipeActions(edge: .trailing) {
                        Button { } label: {
                            Label("Read", systemImage: "envelope.open")
                        }
                    }
                    .badge(10)
                
            }
            .headerProminence(.increased)
            
            Section(header: Text("Header")) {
                Text("ListItem")
                    .listRowInsets(.init(top: 10, leading: 10, bottom: 10, trailing: 10))
                    .listRowSeparatorTint(.blue)
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
                Text("ListItem")
            }
            
        }
        .listStyle(.plain)
        .listItemTint(.red)
        .refreshable {
            print("refreshable")
        }
        .environment(\.defaultMinListRowHeight, 60)
        .environment(\.headerProminence,.increased)
```