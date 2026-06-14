<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UI常用的适配方案](#ui常用的适配方案)
  - [等比例缩放 (Scale)](#等比例缩放-scale)
    - [参考代码](#参考代码)
  - [弹性控件 (Flexible)](#弹性控件-flexible)
  - [自适应内容（Adaptive Content）策略](#自适应内容adaptive-content策略)
  - [响应式分栏](#响应式分栏)

<!-- /code_chunk_output -->


# UI常用的适配方案

- 重点概念
  - 在iphone 14 和 iphone 14 pro max 渲染相同的44pt 的内容，是一至。

## 等比例缩放 (Scale)

- 以某一机型（如 iPhone 14, 393pt 宽度,或 ihpone 6,375pt（参考小程序 rpx 适配方案））为基准，其他机型按比例计算宽高度。
- 视觉要求高度还原设计稿，尤其是电商、营销页面。

### 参考代码

```swift
//
//  UIScale.swift
//  实现类似小程序 rpx 的等比例适配方案非常优雅，我们可以利用 extension（扩展） 为 Double 或 CGFloat 添加计算属性，让代码写起来更直观。
//  Created by yang.chuan on 2026/4/12.
//

// # 小程序上UI适配
// 
// 微信小程序的 rpx（responsive pixel）方案，本质上就是一套由系统底层实现的“等比例缩放”方案。
// 
// - 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。 1px = 1rpx = 0.5pt
// - rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。
// - 规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375pt，共有750个物理像素，则750rpx = 375pt = 750物理像素，1rpx = 0.5pt = 1物理像素。

import UIKit

struct UIScale {
    // 设计稿基准宽度 (如果是小程序设计稿就写 750，普通 iOS 设计稿写 375)
    static let baseWidth: CGFloat = 750.0
    
    // 当前屏幕宽度
    static let screenWidth = UIScreen.main.bounds.width
    
    // 计算缩放系数
    static let scale = screenWidth / baseWidth
    
    /// 适配函数
    static func fix(_ value: CGFloat) -> CGFloat {
        return value * scale
    }
}

extension Double {
    var rpx: CGFloat {
        return CGFloat(self) * UIScale.scale
    }
}

extension Int {
    var rpx: CGFloat {
        return CGFloat(self) * UIScale.scale
    }
}

extension CGFloat {
    var rpx: CGFloat {
        return self * UIScale.scale
    }
}

extension CGSize {
    /// 将 Size 中的 width 和 height 等比缩放
    var rpx: CGSize {
        return CGSize(width: width.rpx, height: height.rpx)
    }
}

extension CGRect {
    /// 将 Rect 中的 x, y, width, height 全部等比缩放
    var rpx: CGRect {
        return CGRect(x: origin.x.rpx, y: origin.y.rpx, width: size.width.rpx, height: size.height.rpx)
    }
}

extension UIEdgeInsets {
    /// 将 top, left, bottom, right 全部等比缩放
    var rpx: UIEdgeInsets {
        return UIEdgeInsets(
            top: top.rpx,
            left: left.rpx,
            bottom: bottom.rpx,
            right: right.rpx
        )
    }
}

extension UIFont {
    /// 传入设计稿字号，返回适配后的系统字体
    static func rpxFont(ofSize size: CGFloat, weight: UIFont.Weight = .regular) -> UIFont {
        return UIFont.systemFont(ofSize: size.rpx, weight: weight)
    }
}

```

## 弹性控件 (Flexible)

- 固定两侧间距或控件宽度，让中间元素自动拉伸或收缩。
- 列表页、表单页。

## 自适应内容（Adaptive Content）策略

- 在 iOS 大屏设备（如 Plus/Max 机型或 iPad）上显示更多内容，而不是简单的“等比例放大”
- 固定高度/宽度，增加数量：在瀑布流或网格布局（UICollectionView）中，在大屏上增加列数。例如：小屏显示 2 列，Max 机型显示 3 列。
- 固定两侧间距：文字内容在大屏上会自然地换行更少，从而在纵向上腾出空间显示下方的后续内容。

## 响应式分栏

- 在大屏设备（iPad/Max机型横屏）显示多列内容，小屏显示单列。
- 阅读类、邮件类、工具类 App。
