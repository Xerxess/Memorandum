<!-- TOC -->

- [UICollectionViewCell](#uicollectionviewcell)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uicollectionviewcell?language=objc

# UICollectionViewCell

```c++
@interface UICollectionViewCell : UICollectionReusableView
```

```c++

// 所选cell的背景视图正上方的视图
@property(nonatomic, strong) UIView *selectedBackgroundView;

// cell选择状态
// 不直接设置此属性
@property(nonatomic, getter=isSelected) BOOL selected;

// 单元格的突出显示状态
// 不直接设置此属性
@property(nonatomic, getter=isHighlighted) BOOL highlighted;

// cell的拖动状态更改时调用
- (void)dragStateDidChange:(UICollectionViewCellDragState)dragState;

// 使cell有机会修改布局对象提供的属性
// 需要先super
- (UICollectionViewLayoutAttributes *)preferredLayoutAttributesFittingAttributes:(UICollectionViewLayoutAttributes *)layoutAttributes;

// 将指定的布局属性应用于视图
// 默认实现不执行任何操作
- (void)applyLayoutAttributes:(UICollectionViewLayoutAttributes *)layoutAttributes;

//布局对象将更改/已更改
- (void)willTransitionFromLayout:(UICollectionViewLayout *)oldLayout 
                        toLayout:(UICollectionViewLayout *)newLayout;
- (void)didTransitionFromLayout:(UICollectionViewLayout *)oldLayout 
                       toLayout:(UICollectionViewLayout *)newLayout;

```