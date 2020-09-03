<!-- TOC -->

- [UICollectionView](#uicollectionview)
    - [基本](#基本)
    - [交互](#交互)
    - [drag and drop](#drag-and-drop)
    - [选择单元格](#选择单元格)
    - [查找项目和视图](#查找项目和视图)
    - [滚动](#滚动)
    - [重用cell](#重用cell)
    - [更改布局](#更改布局)

<!-- /TOC -->

# UICollectionView

## 基本

```c++
// 集合视图显示的Sections数
@property(nonatomic, readonly) NSInteger numberOfSections;

// 指定的section 中项目计数
- (NSInteger)numberOfItemsInSection:(NSInteger)section;

// 集合视图当前显示的可见单元格数组
@property(nonatomic, readonly) NSArray<__kindof UICollectionViewCell *> *visibleCells;

// 插入cell
- (void)insertItemsAtIndexPaths:(NSArray<NSIndexPath *> *)indexPaths;

// 将cell移除
- (void)deleteItemsAtIndexPaths:(NSArray<NSIndexPath *> *)indexPaths;

// 将cell从一个位置移动到另一个位置
- (void)moveItemAtIndexPath:(NSIndexPath *)indexPath 
                toIndexPath:(NSIndexPath *)newIndexPath;

```

## 交互

```c++
// 指定的cell 是否可移动
- (BOOL)beginInteractiveMovementForItemAtIndexPath:(NSIndexPath *)indexPath;


// 更新指定范围的cell
- (void)updateInteractiveMovementTargetPosition:(CGPoint)targetPosition;

// 结束移动,将目标cell移动到其新位置
- (void)endInteractiveMovement;

// 取消 cell返回到其原始位置
- (void)cancelInteractiveMovement;
```

## drag and drop

```c++
// UICollectionViewDragDelegate

// 提供要拖动的初始项目集
- (NSArray<UIDragItem *> *)collectionView:(UICollectionView *)collectionView 
             itemsForBeginningDragSession:(id<UIDragSession>)session 
                              atIndexPath:(NSIndexPath *)indexPath;

// 通知您集合视图的拖动会话即将开始
- (void)collectionView:(UICollectionView *)collectionView 
  dragSessionWillBegin:(id<UIDragSession>)session;

// 拖动过程中自定义项目的外观
- (UIDragPreviewParameters *)collectionView:(UICollectionView *)collectionView 
    dragPreviewParametersForItemAtIndexPath:(NSIndexPath *)indexPath;

//  是否允许移动
- (BOOL)collectionView:(UICollectionView *)collectionView 
dragSessionAllowsMoveOperation:(id<UIDragSession>)session;


// UICollectionViewDropDelegate
// 是否可以接受drag的对象
- (BOOL)collectionView:(UICollectionView *)collectionView 
  canHandleDropSession:(id<UIDropSession>)session;

// 合并到集合视图
- (void)collectionView:(UICollectionView *)collectionView 
performDropWithCoordinator:(id<UICollectionViewDropCoordinator>)coordinator;

// 拖动的数据在集合视图上的位置已更改
- (UICollectionViewDropProposal *)collectionView:(UICollectionView *)collectionView 
                            dropSessionDidUpdate:(id<UIDropSession>)session 
                        withDestinationIndexPath:(NSIndexPath *)destinationIndexPath;
```

## 选择单元格

```c++
@property(nonatomic, readonly) NSArray<NSIndexPath *> *indexPathsForSelectedItems;

// 选择指定索引路径中的项目
- (void)selectItemAtIndexPath:(NSIndexPath *)indexPath 
                     animated:(BOOL)animated 
               scrollPosition:(UICollectionViewScrollPosition)scrollPosition;

// 取消选择指定索引处的项目
- (void)deselectItemAtIndexPath:(NSIndexPath *)indexPath 
                       animated:(BOOL)animated;

// 是否可以在集合视图中选择
@property(nonatomic) BOOL allowsSelection;
```

## 查找项目和视图

```c++
// 获取项目在集合视图中指定CGPoint的索引路径
- (NSIndexPath *)indexPathForItemAtPoint:(CGPoint)point;

// 可见项的数组
@property(nonatomic, readonly) NSArray<NSIndexPath *> *indexPathsForVisibleItems;

// 获取指定cell的索引路径
- (NSIndexPath *)indexPathForCell:(UICollectionViewCell *)cell;

// 获取指定索引路径处的可见cell
- (UICollectionViewCell *)cellForItemAtIndexPath:(NSIndexPath *)indexPath;
```

## 滚动

```c++
// 滚动集合视图的内容，直到可见指定的项目
// UICollectionViewScrollPosition.UICollectionViewScrollPositionTop 顶部
// UICollectionViewScrollPosition.UICollectionViewScrollPositionCenteredVertically 居中
// UICollectionViewScrollPosition.UICollectionViewScrollPositionBottom 底部
- (void)scrollToItemAtIndexPath:(NSIndexPath *)indexPath 
               atScrollPosition:(UICollectionViewScrollPosition)scrollPosition 
                       animated:(BOOL)animated;
```

## 重用cell

```c++
// 注册一个类，以用于创建新的集合视图单元格
- (void)registerClass:(Class)cellClass 
forCellWithReuseIdentifier:(NSString *)identifier;

// 通过其标识符定位的可重用单元对象出队
- (__kindof UICollectionViewCell *)dequeueReusableCellWithReuseIdentifier:(NSString *)identifier 
                                                             forIndexPath:(NSIndexPath *)indexPath;
```

## 更改布局

```c++
// 更改集合视图的布局，并在动画完成时通知您
- (void)setCollectionViewLayout:(UICollectionViewLayout *)layout 
                       animated:(BOOL)animated 
                     completion:(void (^)(BOOL finished))completion;
```