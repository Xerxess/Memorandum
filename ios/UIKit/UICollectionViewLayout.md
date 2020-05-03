<!-- TOC -->

- [UICollectionViewLayout](#uicollectionviewlayout)
- [自定义](#自定义)
  - [布局对象应实现以下方法：](#布局对象应实现以下方法)
  - [三个步骤](#三个步骤)
- [prepareLayout](#preparelayout)
- [layoutAttributesForElementsInRect:](#layoutattributesforelementsinrect)
  - [UICollectionViewLayoutAttributes](#uicollectionviewlayoutattributes)
- [layoutAttributesForItemAtIndexPath:](#layoutattributesforitematindexpath)
- [argetContentOffsetForProposedContentOffset:withScrollingVelocity:](#argetcontentoffsetforproposedcontentoffsetwithscrollingvelocity)
- [NSIndexPath](#nsindexpath)
  - [表视图和集合视图 专属](#表视图和集合视图-专属)
- [坑](#坑)
  - [prepareLayout 执行两次](#preparelayout-执行两次)

<!-- /TOC -->

# UICollectionViewLayout

https://developer.apple.com/documentation/uikit/uicollectionviewlayout?language=objc

# 自定义

## 布局对象应实现以下方法：

* collectionViewContentSize 返回集合视图内容的宽度和高度。
* layoutAttributesForElementsInRect: 返回指定矩形中所有单元格和视图的布局属性。
* layoutAttributesForItemAtIndexPath: 返回指定索引路径下项目的布局属性。
* layoutAttributesForSupplementaryViewOfKind:atIndexPath: （如果您的布局支持补充视图）返回指定补充视图的布局属性。
* layoutAttributesForDecorationViewOfKind:atIndexPath: （如果您的布局支持装饰视图） 返回指定装饰视图的布局属性。
* shouldInvalidateLayoutForBoundsChange: 询问布局对象新边界是否需要更新布局。

## 三个步骤

1. 覆写prepareLayout方法，并在里面事先就计算好必要的布局信息并存储起来。
2. 基于prepareLayout方法中的布局信息，使用collectionViewContentSize方法返回UICollectionView的内容尺寸。
2. 使用layoutAttributesForElementsInRect:方法返回指定区域cell、Supplementary View和Decoration View的布局属性。

# prepareLayout

```c++
- (void)prepareLayout;
```

布局更新会在集合视图<span style="color:red">第一次</span>显示其内容时发生，并且每当布局由于视图的更改而显式或隐式无效时，都会进行布局更新。在每次布局更新期间，集合视图都会首先调用此方法，以使您的布局对象有机会为即将进行的布局操作做准备。

此方法的默认实现不执行任何操作。子类可以覆盖它，并使用它来设置数据结构或执行稍后执行布局所需的任何初始计算。

# layoutAttributesForElementsInRect:

```c++
- (NSArray<__kindof UICollectionViewLayoutAttributes *> *)layoutAttributesForElementsInRect:(CGRect)rect;
```

返回指定矩形中所有单元格和视图的布局属性。

子类<span style="color:red">必须重写</span>此方法，并使用它返回其视图与指定矩形相交的所有项目的布局信息。您的实现应返回所有视觉元素的属性，包括单元格，补充视图和装饰视图。

创建布局属性时，请始终创建一个代表正确元素类型（单元，补充或装饰）的属性对象。集合视图区分每种类型的属性，并使用该信息来决定要创建哪些视图以及如何管理它们。

## UICollectionViewLayoutAttributes

一个布局对象，用于管理集合视图中给定项目的与布局相关的属性。

# layoutAttributesForItemAtIndexPath:

```c++
- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath;
```

返回指定索引路径下项目的布局属性。

子类<span style="color:red">必须重写</span>此方法，并使用它返回集合视图中项目的布局信息。您使用此方法仅提供具有相应单元格的项目的布局信息。请勿将其用于补充视图或装饰视图。

# argetContentOffsetForProposedContentOffset:withScrollingVelocity:

```c++
- (CGPoint)targetContentOffsetForProposedContentOffset:(CGPoint)proposedContentOffset withScrollingVelocity:(CGPoint)velocity;
```

返回停止滚动的点。

# NSIndexPath

https://developer.apple.com/documentation/foundation/nsindexpath?language=objc

NSIndexPath 是一个对象，它用来表示一个树形的记录地址。

索引列表一起代表嵌套数组树中特定位置的路径。

## 表视图和集合视图 专属

* \+ indexPathForRow:inSection: 使用表视图中特定行和节的索引初始化索引路径。
* \+ indexPathForItem:inSection: 使用集合视图中特定项目和部分的索引初始化索引路径。
* section 在表视图或集合视图中标识节的索引号。表示分组号
* row 在表视图的一部分中标识行的索引号。 指定分组内部的索引
* item 在集合视图的一部分中标识项目的索引号。 指定分组内部的索引

# 坑

##  prepareLayout 执行两次 

可以使用以下代码

```c++
// 不知道为什么
self.collectionView.alwaysBounceVertical=YES;
```