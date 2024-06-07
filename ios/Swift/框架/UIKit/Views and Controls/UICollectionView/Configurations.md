# Configurations

使用配置指定视图和单元格的外观和内容
常用于使用UIKit 默认的样式渲染列表

## 两种配置

* UIBackgroundConfiguration 背景配置可让您为视图指定背景外观
* UIListContentConfiguration 内容配置，可让您指定内容（如图片和文本）以及内容的样式（如色调和填充）。

## struct UIViewConfigurationState

* var traitCollection: UITraitCollection
* var isHighlighted: Bool
* var isFocused: Bool
* var isDisabled: Bool
* var isPinned: Bool

## struct UICellConfigurationState

* var traitCollection: UITraitCollection
* var isSelected: Bool
* var isHighlighted: Bool
* var isFocused: Bool
* var isDisabled: Bool
* var isPinned: Bool
* var isEditing: Bool
* var isSwiped: Bool 布尔值，表示单元格是否处于轻扫状态。
* var isExpanded: Bool 布尔值，表示单元格是否处于展开状态，如在大纲中。
* var isReordering: Bool
* var cellDragState: UICellConfigurationState.DragState

## UIListContentConfiguration

列表内容配置描述了可能出现在列表中的单个元素（如单元格、页眉或页脚）的样式和内容。使用列表内容配置，可以为各种不同的视图状态获取系统默认样式。您可以将内容填充到配置中，然后将其直接分配给 UICollectionView 和 UITableView 中的单元格、页眉和页脚

```swift
// 获得具有预配置默认样式的列表内容配置
var content = cell.defaultContentConfiguration()

// Configure content.
content.image = UIImage(systemName: "star")
content.text = "Favorites"

// Customize appearance.
content.imageProperties.tintColor = .purple
cell.contentConfiguration = content
```

* static func cell() -> UIListContentConfiguration 列表中单元格的默认配置
* static func subtitleCell() -> UIListContentConfiguration 创建默认配置，用于样式化列表中包含副标题文本的单元格。
* static func valueCell() -> UIListContentConfiguration 创建默认配置，用于样式化列表中包含并排值文本的单元格。
* static func plainHeader() -> UIListContentConfiguration 创建默认配置，用于样式化普通列表中的标题。
* static func plainFooter() -> UIListContentConfiguration 在普通列表中创建脚注样式的默认配置。
* static func groupedHeader() -> UIListContentConfiguration 创建分组列表中标题样式的默认配置。
* static func groupedFooter() -> UIListContentConfiguration 创建分组列表中脚注样式的默认配置。
* var image: UIImage?
* var text: String?
* var attributedText: NSAttributedString?
* var secondaryText: String?
* var secondaryAttributedText: NSAttributedString?
* var imageProperties: UIListContentConfiguration.ImageProperties
* var textProperties: UIListContentConfiguration.TextProperties
* var secondaryTextProperties: UIListContentConfiguration.TextProperties
* var axesPreservingSuperviewLayoutMargins: UIAxis
* var directionalLayoutMargins: NSDirectionalEdgeInsets 内容与内容视图边缘之间的边距。
* var prefersSideBySideTextAndSecondaryText: Bool 布尔值，用于确定配置是否将文本和辅助文本并排放置。
* var imageToTextPadding: CGFloat 图像和文本之间的填充。
* var textToSecondaryTextHorizontalPadding: CGFloat 文本与辅助文本之间的最小水平填充。

## UIListContentView

列表内容视图用于在自定义视图层次结构中显示基于列表的内容。

可以在非UICollectionView 中使用列表配置

## UIContentUnavailableConfiguration

内容不可用配置是对视图的可组合描述，表示应用程序无法显示内容。使用内容不可用配置，您可以为各种不同的空状态获取系统默认样式。

* static func empty() -> UIContentUnavailableConfiguration 为不可用内容创建默认配置。
* static func loading() -> UIContentUnavailableConfiguration 为正在加载的内容创建默认配置。
* static func search() -> UIContentUnavailableConfiguration 为没有返回结果的搜索创建默认配置。

## UIBackgroundConfiguration

背景配置提供了一种为视图创建背景的轻量级方法。  
使用背景配置，您可以为各种不同的视图状态获取系统默认的背景样式。您可以将背景配置直接应用于 UIButton 或 UICollectionView 和 UITableView 中的单元格、页眉和页脚。

```swift
var backgroundConfig = UIBackgroundConfiguration.listPlainCell()

// Set a nil background color to use the view's tint color. 
backgroundConfig.backgroundColor = nil 
cell.backgroundConfiguration = backgroundConfig
```

* static func listPlainCell() -> UIBackgroundConfiguration 创建用于样式化普通列表中单元格的默认配置。
* static func listGroupedCell() -> UIBackgroundConfiguration 创建分组列表中单元格样式的默认配置。
* static func listSidebarCell() -> UIBackgroundConfiguration 创建边栏列表中单元格样式的默认配置。
* static func listAccompaniedSidebarCell() -> UIBackgroundConfiguration 创建默认配置，用于在伴生侧边栏列表中为单元格设计样式。
* static func listPlainHeaderFooter() -> UIBackgroundConfiguration 创建用于样式化普通列表页眉或页脚的默认配置
* static func listGroupedHeaderFooter() -> UIBackgroundConfiguration 创建分组列表页眉或页脚样式的默认配置。
* static func listSidebarHeader() -> UIBackgroundConfiguration 创建边栏列表标题样式的默认配置。
* static func clear() -> UIBackgroundConfiguration 创建一个背景透明、无默认样式的空背景配置。
* var customView: UIView?
* var cornerRadius: CGFloat
* var backgroundColor: UIColor?
* var visualEffect: UIVisualEffect?
* var image: UIImage?
* var imageContentMode: UIView.ContentMode

# 自定义 UIContentView

知识点

* protocol UIContentConfiguration 该协议提供了内容配置对象的蓝图，其中包含内容视图的默认样式和内容。内容配置封装了内容视图自定义的所有受支持的属性和行为。您可以使用配置来创建内容视图。
* protocol UIContentView 设置内容视图的 configuration 属性会将新配置应用于视图，从而使视图呈现对其外观的任何更新。

```swift
struct MyModel {
    var currentPriority:Int
    var title:String
}

// UIContentConfiguration
struct MyContentConfiguration: UIContentConfiguration {
    var reminder: MyModel // This is a copy of the model.
    
    func makeContentView() -> UIView & UIContentView {
        return PriorityContentView(self)
    }
    func updated(for state: UIConfigurationState) -> ReminderContentConfiguration {
        return self
    }
    mutating func updatePriority(to newPriority: Int) {
        reminder.currentPriority = newPriority
    }
}

// UIContentView
class MyContentView : UIView, UIContentView {
    
    // Define the UI elements.
    let priorityLabel = UILabel()
    let prioritySlider = UISlider()
    var priorityStack = UIStackView()
    
    init() {
        // Apply style to the user interface.
        priorityStack = UIStackView(arrangedSubviews: [priorityLabel, prioritySlider])
        priorityStack.axis = .vertical
        self.addSubview(priorityStack)
        
        priorityLabel.textAlignment = .center
        priorityLabel.textColor = .white
        
        prioritySlider.maximumValue = 10.0
        prioritySlider.minimumValue = 0.0
        prioritySlider.addTarget(self, action: #selector(self.sliderValueDidChange(_:)), for: .valueChanged)
    }

    init(_ configuration: UIContentConfiguration) {
        self.configuration = configuration    
        self.configure(configuration: configuration) // Add this function below.
    }

    var configuration: UIContentConfiguration {
        didSet {
            self.configure(configuration: configuration)
        }
    }

    func configure(configuration: UIContentConfiguration) {
        guard let configuration = configuration as? MyContentConfiguration else { return }
        self.priorityLabel.text = configuration.reminder.title + " (priority: \(configuration.reminder.currentPriority))"
        self.prioritySlider.value = Float(configuration.reminder.currentPriority)
    }

    // 滑块值更改时应用配置
    @objc func sliderValueDidChange(_ sender: UISlider!) {
        // Snap the slider value to integer steps.
        sender.value = round(sender.value)
        guard var configuration = configuration as? MyContentConfiguration else { return }
        configuration.updatePriority(to: Int(sender.value))
        self.configure(configuration: configuration)
    }
}

let myContentView = MyContentView()
let config = MyContentConfiguration()
config.reminder = MyModel()
myContentView.configure(config)
superView.addSubView(myContentView)
```
