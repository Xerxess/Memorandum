<!-- TOC -->

- [UICollectionViewDelegateFlowLayout](#uicollectionviewdelegateflowlayout)
- [API](#api)
    - [Getting the Size of Items 获取物品的大小](#getting-the-size-of-items-获取物品的大小)
    - [Getting the Section Spacing 获取部分间距](#getting-the-section-spacing-获取部分间距)
    - [Getting the Header and Footer Sizes 获取页眉和页脚尺寸](#getting-the-header-and-footer-sizes-获取页眉和页脚尺寸)

<!-- /TOC -->

# UICollectionViewDelegateFlowLayout

该协议的方法定义了项目大小和网格中项目之间的间距。本协议中的所有方法都是可选的。如果您没有实现特定方法，流布局委托将自己的属性中的值用于适当的间距信息。

UICollectionViewFlowLayout对象希望集合视图的委托对象采用此协议。因此，在分配给集合视图委托属性的对象上实现此协议。

```swift
@MainActor protocol UICollectionViewDelegateFlowLayout
```

# API

## Getting the Size of Items 获取物品的大小

```swift
// 要求委托人提供指定项目单元格的大小。
func collectionView(UICollectionView, layout: UICollectionViewLayout, sizeForItemAt: IndexPath) -> CGSize
```

## Getting the Section Spacing 获取部分间距

```swift
// 要求委托人将保证金应用于指定部分中的内容。
func collectionView(UICollectionView, layout: UICollectionViewLayout, insetForSectionAt: Int) -> UIEdgeInsets

// 要求委托人提供部分连续行或列之间的间距。
func collectionView(UICollectionView, layout: UICollectionViewLayout, minimumLineSpacingForSectionAt: Int) -> CGFloat

// 要求委托人提供部分行或列中连续项目之间的间距。
func collectionView(UICollectionView, layout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt: Int) -> CGFloat
```

## Getting the Header and Footer Sizes 获取页眉和页脚尺寸

```swift
// 要求委托人在指定部分中提供标题视图的大小。
func collectionView(UICollectionView, layout: UICollectionViewLayout, referenceSizeForHeaderInSection: Int) -> CGSize

// 要求委托人在指定部分中提供页脚视图的大小。
func collectionView(UICollectionView, layout: UICollectionViewLayout, referenceSizeForFooterInSection: Int) -> CGSize
```