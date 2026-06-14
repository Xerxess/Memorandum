<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UIKit 中实现无缝切换](#uikit-中实现无缝切换)
  - [首尾“欺骗”法（最经典）](#首尾欺骗法最经典)
  - [索引倍增法](#索引倍增法)
  - [动态索引法](#动态索引法)
  - [三视图/双视图复用法](#三视图双视图复用法)

<!-- /code_chunk_output -->

# UIKit 中实现无缝切换

## 首尾“欺骗”法（最经典）

- 这是最通用的逻辑，常用于基于 UIScrollView 或 UICollectionView 的封装。
- 适用场景：简单效果，不需要手势拖拽
- 劣势：手势拖拽在处理边界时，无法达到顺滑感
- 做法：在数据源的两端各多增加一个 Cell。例如，图片顺序为 [A, B, C]，实际展示的数据源构造成 [C, A, B, C, A]。
- 切换逻辑
  - 当用户滑动到最后的 A 时，代码通过 setContentOffset:animated:NO 瞬间将位置重置到第 2 个 A。
  - 当滑动到最前的 C 时，瞬间重置到倒数第 2 个 C。

## 索引倍增法

- 在 UICollectionView 中非常流行，能极大简化逻辑
- 做法：将数据源的数量虚构为一个极大的倍数（如 100 倍或 500 倍），例如 Count = RealCount * 100。
- 切换逻辑：初始化时将 CollectionView 滚动到中间位置。
- 优势：利用 UICollectionView 的 Cell 复用机制，内存占用极低，且逻辑极其简单，不需要手动处理边界判断。

## 动态索引法

- 思路与上面的相同，只是在滑动到边界时向数据源添加数据，来实现无缝
- 需要处理偏移补偿

```swift
    // 处理偏移补偿
  func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let offsetX = scrollView.contentOffset.x
        let contentWidth = scrollView.contentSize.width
        
        // 阈值：距离边缘还剩两个 Item 宽度时触发
        let threshold = (itemWidth + itemSpacing) * 2
        
        // 1. 处理向左滚动 (头部追加)
        if offsetX < threshold {
            let countToInsert = 5
            let insertedWidth = CGFloat(countToInsert) * (itemWidth + itemSpacing)
            
            // 向前添加新数据
            prependItems(count: countToInsert)
            
            UIView.performWithoutAnimation {
                collectionView.reloadData()
                // 【核心】向右补偿 contentOffset，保持视觉位置不动
                collectionView.contentOffset.x += insertedWidth
            }
        }
        
        // 2. 处理向右滚动 (尾部追加)
        if offsetX > (contentWidth - scrollView.frame.width - threshold) {

            // 向后添加新数据
            appendItems(count: 5)
            
            UIView.performWithoutAnimation {
                collectionView.reloadData()
                // 尾部追加不需要补偿 offset，因为不会改变左侧坐标系
            }
        }
    }
```

## 三视图/双视图复用法

- 一种内存极致优化的方案，适合对性能要求极高的场景
- 做法：只创建 2 或 3 个 UIImageView，通过监听滚动事件，动态修改这些视图的 frame 和显示的图片内容。
- 切换逻辑：始终保持中间的视图在屏幕内，左右滑动后，立即将旁边的视图移回中心并更新内容。


