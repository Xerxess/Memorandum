<!-- TOC -->

- [UICollectionReusableView](#uicollectionreusableview)
- [API](#api)
    - [重复使用单元格](#重复使用单元格)
    - [Managing Layout Changes 管理布局更改](#managing-layout-changes-管理布局更改)

<!-- /TOC -->

# UICollectionReusableView

定义集合视图显示的所有单元格和补充视图的行为的视图。

可重用视图之所以如此命名，是因为集合视图将它们放在重用队列中，而不是在它们滚动出可见边界时删除它们。  
然后可以检索这样的视图，并将其重新用于不同的内容集。

```swift
@MainActor class UICollectionReusableView : UIView
```

# API

## 重复使用单元格

```swift
// 标识视图目的的字符串。
// 集合视图使用重用标识符识别和排队可重用视图。
// 集合视图在首次创建视图时设置此值，以后无法更改该值。当您的数据源被提示提供给定视图时，它可以使用重用标识符对适当类型的视图进行排行。
var reuseIdentifier: String? { get }

// 执行任何必要的清理，以准备视图以再次使用。
// 此方法的默认实现无。
// UICollectionViewCell等子类覆盖此方法，并使用它执行相关操作。因此，如果您的子类是UICollectionViewCell或其他中级类的后代，请调用super以确保您的类获得父类的行为。
//当集合视图将您的视图排队以供使用时，它会在相应的排行方法将视图返回到您的代码之前调用此方法。
// 在子类中重写此方法，将属性重置为默认值，并使视图可以再次使用。
// 不要使用此方法为视图分配任何新数据；这是您的数据源对象的责任。
// 当您在UICollectionView上使用reconfigureItems(at:)或在NSDiffableDataSourceSnapshot上使用reconfigureItems(_:)来更新现有单元格的内容时，集合视图不会调用此方法。
func prepareForReuse()
```

## Managing Layout Changes 管理布局更改

```swift
// 让单元格有机会修改布局对象提供的属性。
func preferredLayoutAttributesFitting(UICollectionViewLayoutAttributes) -> UICollectionViewLayoutAttributes

// 将指定的布局属性应用于视图。
func apply(UICollectionViewLayoutAttributes)

// 告诉您的视图，集合视图的布局对象即将更改。
func willTransition(from: UICollectionViewLayout, to: UICollectionViewLayout)

// 告诉您的视图集合视图的布局对象发生了变化。
func didTransition(from: UICollectionViewLayout, to: UICollectionViewLayout)
```