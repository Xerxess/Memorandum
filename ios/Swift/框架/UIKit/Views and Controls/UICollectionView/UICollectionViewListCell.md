<!-- TOC -->

- [UICollectionViewListCell](#uicollectionviewlistcell)

<!-- /TOC -->

# UICollectionViewListCell

提供列表功能和默认样式的集合视图单元格。

列表单元格表示可能出现在列表中的单个项目。列表单元格为缩进提供内置支持，并能够添加单元格配件（UICellAccessory）进行视觉装饰或支持用户与单元格的交互。

您可以在任何类型的布局中使用列表单元格。在列表中使用列表单元格可以为单元格启用额外的列表特定行为。例如，在列表部分或布局中，您可以定义列表单元格之间的分隔符对齐，并为每个单元格的前缘和后缘配置滑动操作。您可以使用列表（使用：layoutEnvironment:）创建单个列表部分，或使用列表（使用：）创建完整的列表布局。

您可以使用列表单元格的defaultContentConfiguration()获取具有预配置默认样式的列表内容配置。获得默认配置后，您将内容分配给它，自定义任何其他属性，并将其作为当前内容配置分配给单元格。有关自定义选项，请参阅UIListContentConfiguration。

```swift
@MainActor class UICollectionViewListCell : UICollectionViewCell
```