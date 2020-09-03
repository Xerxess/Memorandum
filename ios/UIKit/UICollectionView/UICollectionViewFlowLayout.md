<!-- TOC -->

- [UICollectionViewLayout](#uicollectionviewlayout)
    - [布置三种类型的视觉元素](#布置三种类型的视觉元素)
    - [UICollectionViewLayoutAttributes](#uicollectionviewlayoutattributes)
- [UICollectionViewFlowLayout](#uicollectionviewflowlayout)
- [UICollectionViewDelegateFlowLayout](#uicollectionviewdelegateflowlayout)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uicollectionviewflowlayout?language=objc

# UICollectionViewLayout

布局的抽象基类

## 布置三种类型的视觉元素

* 单元 Cells 具有交互性 
* 补充视图 Supplementary views 用户无法选择 （类似Header或者Footer）
* 装饰视图 Decoration views 装饰视图是另一种补充视图 （用作背景展示）

## UICollectionViewLayoutAttributes

```c++
@property (nonatomic) CGRect frame
@property (nonatomic) CGPoint center
@property (nonatomic) CGSize size
@property (nonatomic) CATransform3D transform3D
@property (nonatomic) CGFloat alpha
@property (nonatomic) NSInteger zIndex
@property (nonatomic, getter=isHidden) BOOL hidden
```

# UICollectionViewFlowLayout

系统自带的 UICollectionViewLayout
一个布局对象，将项目组织到一个网格中，每个部分具有可选的页眉和页脚视图。

```c++
@interface UICollectionViewFlowLayout : UICollectionViewLayout
```

* scrollDirection
    * UICollectionViewScrollDirectionVertical (默认)
    * UICollectionViewScrollDirectionHorizontal

* minimumLineSpacing (默认10)
* minimumInteritemSpacing (默认10)
* itemSize 单元格的默认大小 （50.0, 50.0)
* estimatedItemSize （CGSizeZero）
 

# UICollectionViewDelegateFlowLayout

与流布局对象协调以实现基于网格的布局的方法

```c++
@protocol UICollectionViewDelegateFlowLayout
```

```c++
// 指定项目的单元格的大小
// 指定项目CGSize,值都必须大于0。
// 不实现此方法:则默认itemSize
- (CGSize)collectionView:(UICollectionView *)collectionView 
                  layout:(UICollectionViewLayout *)collectionViewLayout 
  sizeForItemAtIndexPath:(NSIndexPath *)indexPath;

// 设置边距
- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView 
                        layout:(UICollectionViewLayout *)collectionViewLayout 
        insetForSectionAtIndex:(NSInteger)section;

// 设置行或列之间的间距
- (CGFloat)collectionView:(UICollectionView *)collectionView 
                   layout:(UICollectionViewLayout *)collectionViewLayout 
minimumLineSpacingForSectionAtIndex:(NSInteger)section;

// 行或列中连续项目之间的间距
- (CGFloat)collectionView:(UICollectionView *)collectionView 
                   layout:(UICollectionViewLayout *)collectionViewLayout 
minimumInteritemSpacingForSectionAtIndex:(NSInteger)section;

// 标题视图的大小
// size (0, 0) 则不添加
- (CGSize)collectionView:(UICollectionView *)collectionView 
                  layout:(UICollectionViewLayout *)collectionViewLayout 
referenceSizeForHeaderInSection:(NSInteger)section;

// 页脚视图的大小
//  size (0, 0) 则不添加
- (CGSize)collectionView:(UICollectionView *)collectionView 
                  layout:(UICollectionViewLayout *)collectionViewLayout 
referenceSizeForFooterInSection:(NSInteger)section;
```
