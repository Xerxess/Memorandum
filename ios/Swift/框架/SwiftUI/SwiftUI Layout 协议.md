<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [SwiftUI Layout 协议](#swiftui-layout-协议)
  - [sizeThatFits 方法](#sizethatfits-方法)
  - [placeSubviews 方法](#placesubviews-方法)
  - [Demo](#demo)
    - [自动换行](#自动换行)

<!-- /code_chunk_output -->

# SwiftUI Layout 协议

SwiftUI 的 Layout 协议是在 iOS 16（WWDC 2022）中引入的，它允许开发者创建自定义布局容器，精确控制子视图的排列方式。通过 Layout 协议，你可以像使用 HStack、VStack 一样创建和使用自己的布局容器。

Layout 协议有两个必须实现的核心方法：

- 一个返回布局所需空间的方法 sizeThatFits 方法
- 一个实际放置子视图的方法 placeSubviews 方法

## sizeThatFits 方法

```swift
func sizeThatFits(
    proposal: ProposedViewSize,
    subviews: Subviews,
    cache: inout Cache // 可用于存储计算结果的缓存
) -> CGSize
```

参数说明：

proposal：父视图提供的尺寸建议
subviews：子视图的代理集合
cache：可用于存储计算结果的缓存

proposal 是 ProposedViewSize 类型，包含可选的宽度和高度值，这些值可能是：

具体数值（如 45.0）：父视图提供的确切尺寸
0：表示子视图应返回其最小尺寸
nil 或 .infinity：表示子视图可以使用无限空间

## placeSubviews 方法

```swift
func placeSubviews(
    in bounds: CGRect, 
    proposal: ProposedViewSize, 
    subviews: Subviews, 
    cache: inout Cache
)
```

这个方法负责设置子视图的位置。在布局的第二阶段，父视图根据第一阶段计算出的屏幕区域为子视图设置布局位置和尺寸。

参数说明：

bounds：布局容器的边界矩形
proposal：与 sizeThatFits 相同的尺寸建议
subviews：子视图的代理集合
cache：可用于存储计算结果的缓存

## Demo

### 自动换行

```swift
struct BasicVStack: Layout {
    var spacing: CGFloat = 10.0
    
    func sizeThatFits(
        proposal: ProposedViewSize,
        subviews: Subviews,
        cache: inout ()
    ) -> CGSize {
        // 获取容器宽度，如果是 nil 则使用一个合理的默认值
        let width = proposal.width ?? 300
        
        // 计算所有子视图在不受限制情况下的尺寸
        let sizes = subviews.map { $0.sizeThatFits(.unspecified) }
        
        // 计算布局的总高度
        var height: CGFloat = 0
        var currentX: CGFloat = 0
        var rowHeight: CGFloat = 0
        
        for size in sizes {
            if currentX + size.width > width && currentX > 0 {
                // 换行
                height += rowHeight + spacing
                currentX = 0
                rowHeight = size.height
            } else {
                // 继续当前行
                rowHeight = max(rowHeight, size.height)
                currentX += size.width + spacing
            }
        }
        
        // 添加最后一行的高度
        height += rowHeight
        
        return CGSize(width: width, height: height)
    }
    
    func placeSubviews(
        in bounds: CGRect,
        proposal: ProposedViewSize,
        subviews: Subviews,
        cache: inout ()
    ) {
        // 确保有效的宽度
        let width = bounds.width
        let itemHeight: CGFloat = 30.0
        
        var currentX: CGFloat = bounds.minX
        var currentY: CGFloat = bounds.minY
        var rowHeight: CGFloat = 0
        
        for subview in subviews {
            // 获取子视图的尺寸
            let size = subview.sizeThatFits(.unspecified)
            
            // 检查是否需要换行
            if currentX + size.width > bounds.maxX && currentX > bounds.minX {
                currentX = bounds.minX
                currentY += rowHeight + spacing
                rowHeight = 0
            }
            
            // 放置子视图并提供具体的尺寸提案
            subview.place(
                at: CGPoint(x: currentX, y: currentY),
                anchor: .topLeading,
                proposal: ProposedViewSize(size)
            )
            
            // 更新位置和行高
            currentX += size.width + spacing
            rowHeight = max(rowHeight, itemHeight)
        }
    }
}

```
