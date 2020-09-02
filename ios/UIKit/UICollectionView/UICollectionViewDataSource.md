<!-- TOC -->

- [UICollectionViewDataSource](#uicollectionviewdatasource)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uicollectionviewdatasource?language=objc

# UICollectionViewDataSource

管理数据并为集合视图提供单元的对象所采用的方法

```c++
// 询问集合视图中的sections数量
- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView;

// 询问指定section中的cell项目数
- (NSInteger)collectionView:(UICollectionView *)collectionView 
     numberOfItemsInSection:(NSInteger)section;

// 指定项目对应的单元格
- (__kindof UICollectionViewCell *)collectionView:(UICollectionView *)collectionView 
                           cellForItemAtIndexPath:(NSIndexPath *)indexPath;
```