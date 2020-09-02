<!-- TOC -->

- [UICollectionViewDelegate](#uicollectionviewdelegate)
    - [管理所选单元格](#管理所选单元格)
    - [单元格突出显示](#单元格突出显示)
    - [跟踪视图的添加和删除](#跟踪视图的添加和删除)
    - [处理布局更改](#处理布局更改)
    - [管理上下文菜单](#管理上下文菜单)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uicollectionviewdelegate?language=objc

# UICollectionViewDelegate

集合视图委托管理用户与集合视图内容的交互，包括项目选择，突出显示以及对这些项目执行操作。该协议的方法都是可选的。

## 管理所选单元格

## 单元格突出显示

```c++
// 是否在跟踪过程中突出显示该项目
// 默认返回值为YES
- (BOOL)collectionView:(UICollectionView *)collectionView 
shouldHighlightItemAtIndexPath:(NSIndexPath *)indexPath;

// 告诉cell突出显示了指定索引路径处
- (void)collectionView:(UICollectionView *)collectionView 
didHighlightItemAtIndexPath:(NSIndexPath *)indexPath;
```

## 跟踪视图的添加和删除

## 处理布局更改

## 管理上下文菜单

```c++
// 返回该项目在某个点的上下文菜单配置
- (UIContextMenuConfiguration *)collectionView:(UICollectionView *)collectionView 
    contextMenuConfigurationForItemAtIndexPath:(NSIndexPath *)indexPath 
                                         point:(CGPoint)point;
// 关闭上下文菜单时返回目标视图
- (UITargetedPreview *)collectionView:(UICollectionView *)collectionView 
previewForDismissingContextMenuWithConfiguration:(UIContextMenuConfiguration *)configuration;

// 返回一个视图，以覆盖创建的集合视图的默认预览
- (UITargetedPreview *)collectionView:(UICollectionView *)collectionView 
previewForHighlightingContextMenuWithConfiguration:(UIContextMenuConfiguration *)configuration;

// 上下文菜单出现时通知委托
- (void)collectionView:(UICollectionView *)collectionView 
willDisplayContextMenuWithConfiguration:(UIContextMenuConfiguration *)configuration 
              animator:(id<UIContextMenuInteractionAnimating>)animator;

// 用户通过点击预览触发提交时通知委托
- (void)collectionView:(UICollectionView *)collectionView 
willPerformPreviewActionForMenuWithConfiguration:(UIContextMenuConfiguration *)configuration 
              animator:(id<UIContextMenuInteractionCommitAnimating>)animator;
```