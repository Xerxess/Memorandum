<!-- TOC -->

- [Texture](#texture)
- [入门](#入门)
- [节点/Node](#节点node)
- [节点容器/Node Containers](#节点容器node-containers)
- [布局引擎/Layout Engine](#布局引擎layout-engine)
- [智能预载](#智能预载)
  - [预载重合周期](#预载重合周期)
- [Node Containers](#node-containers)
- [节点子类/Node Subclasses](#节点子类node-subclasses)
- [节点实例/Subclassing](#节点实例subclassing)
  - [ASDisplayNode](#asdisplaynode)
  - [ASViewController](#asviewcontroller)
- [布局](#布局)
- [基本概念](#基本概念)
  - [布局规则/Layout Specs](#布局规则layout-specs)
  - [布局元素/Layout Elements](#布局元素layout-elements)
- [layoutSpec](#layoutspec)
  - [ASWrapperLayoutSpec](#aswrapperlayoutspec)
  - [ASStackLayoutSpec](#asstacklayoutspec)
  - [属性](#属性)
  - [ASInsetLayoutSpec](#asinsetlayoutspec)
  - [ASOverlayLayoutSpec](#asoverlaylayoutspec)
  - [ASBackgroundLayoutSpec](#asbackgroundlayoutspec)
  - [ASCenterLayoutSpec](#ascenterlayoutspec)
  - [ASRatioLayoutSpec](#asratiolayoutspec)
  - [ASRelativeLayoutSpec](#asrelativelayoutspec)
  - [ASAbsoluteLayoutSpec](#asabsolutelayoutspec)
  - [ASCornerLayoutSpec](#ascornerlayoutspec)
- [布局元素属性](#布局元素属性)
  - [ASStackLayoutElement](#asstacklayoutelement)
  - [ASAbsoluteLayoutElement](#asabsolutelayoutelement)
  - [ASLayoutElement](#aslayoutelement)
- [Layout API Sizing 单位之间的相互关系](#layout-api-sizing-单位之间的相互关系)
  - [ASDimension](#asdimension)
  - [CGSize、ASLayoutSize](#cgsizeaslayoutsize)
  - [ASSizeRange](#assizerange)
- [Layout Transition API](#layout-transition-api)
  - [transitionLayoutWithAnimation](#transitionlayoutwithanimation)
- [坑](#坑)
  - [自动子节点管理（ASM）](#自动子节点管理asm)

<!-- /TOC -->

https://texturegroup.org/docs/getting-started.html

AsyncDisplayKit/Texture 官方文档 (翻译)
https://juejin.im/post/5a16acf56fb9a04509092ce5

# Texture

Texture(AsyncDisplayKit)是一款基于 UIKit 构建的 iOS 框架，其目的在于使复杂的界面依然能够保持流畅和响应。

# 入门

Texture 的基本单位是 node。 ASDisplayNode 是对的抽象 UIView，反过来又是对的抽象 CALayer。与只能在主线程上使用的视图不同，节点是线程安全的：您可以在后台线程上并行实例化和配置它们的整个层次结构。

# 节点/Node

Node 可以异步绘制，且线程安全，你可以在在异步线程中进行实例化和配置它们的层级结构。

- 通过 node.view 或 node.layer 直接调用原生属性和方法，但要确保它会在主线程上执行！
- exture 已经提供了多种多样的 Node 来替换你习惯使用的大部分 UIKit 组件，现在你已经可以完全通过 Texture 开发大规模的 App 。

# 节点容器/Node Containers

- 节点添加到 Node 容器中，由 Node 容器负责管理这些节点

# 布局引擎/Layout Engine

Texture 的布局非常强大，相对于传统的 Frame，AutoLayout 等方式而言比较独特，但对前端工作者并不陌生，Texture 的布局基于 CSS FlexBox。

- 通过 ASLayoutSpec 为每个节点提供一个来执行异步测量和布局
- 和 UIStackView 很像，但支持低版本 iOS。

# 智能预载

- Preload 节点还不可见，这时节点收集外部源，外部源可能是 API 或者本地磁盘。
- Display 节点开始渲染，包括文本的光栅化已经图像解码等。
- Visible 节点可见，在屏幕上至少拥有一个像素。

## 预载重合周期

```c++
// 进入可见范围
-didEnterVisibleState
// 离开可见范围
-didExitVisibleState

// 进入渲染范围
-didEnterDisplayState
// 离开渲染范围
-didExitDisplayState

// 进入数据加载范围
-didEnterPreloadState
// 离开数据加载范围
-didExitPreloadState
```

# Node Containers

节点容器自动管理其子节点实现智能预加载，这意味着节点的所有布局计算，数据读取，解码和渲染都将会异步完成，这就是为什么我们建议将节点放进节点容器中使用

| Texture Node Container | UIKit Equivalent                                  |
| ---------------------- | ------------------------------------------------- |
| ASViewController       | UIViewController                                  |
| ASNavigationController | UINavigationController （实现 ASVisibility 协议） |
| ASTabBarController     | UITabBarController （实现 ASVisibility 协议）     |
| ASCollectionNode       | UICollectionView                                  |
| ASPagerNode            | UIPageViewController                              |
| ASTableNode            | UITableView                                       |

# 节点子类/Node Subclasses

| 节点                                                 | UIKit                                 |
| ---------------------------------------------------- | ------------------------------------- |
| ASDisplayNode （所有的 Node 都继承自 ASDisplayNode） | UIView                                |
| ASCellNode                                           | UITableViewCell＆UICollectionViewCell |
| ASScrollNode                                         | UIScrollView                          |
| ASEditableTextNode                                   | UITextView                            |
| ASTextNode                                           | UILabel                               |
| ASImageNode                                          | UIImage                               |
| ASNetworkImageNode                                   | UIImage                               |
| ASMultiplexImageNode                                 | UIImage                               |
| ASVideoNode                                          | AVPlayerLayer                         |
| ASVideoPlayerNode                                    | UIMoviePlayer                         |
| ASControlNode                                        | UIControl                             |
| ASButtonNode                                         | UIButton                              |
| ASMapNode                                            | MKMapView                             |


# 节点实例/Subclassing

创建子类时最重要的区别是你使用的是 ASViewController 还是 ASDisplayNode

## ASDisplayNode

```c++
// 不要创建UIKit对象|添加手势|事件
-init

// 类似于UIViewController的-viewDidLoad
// 后台视图初始化完成时，它会被调用一次
// 执行任何 UIKit 代码 (添加手势识别器，触摸视图/图层，初始化UIKit对象)
-didLoad

// 定义了节点的布局，并在后台线程上进行了大量的计算
// 放置大部分布局代码的地方
// 不能在这个方法中调用 node.view 或 node.layer 以及它们的属性
-layoutSpecThatFits:

// 类似于 UIViewController 的 -viewwilllayoutsubview
// 更改 hidden 属性、修改 view 属性、设置背景颜色的地方
-layout
```

## ASViewController

ASViewController 是一个常规的 UIViewController 子类，它具有管理节点的特殊功能。因为它是一个 UIViewController 子类，所以所有的方法都在主线程上被调用，并且你应该在主线程上创建至少一个 ASViewController

```c++
// 生命周期开始时被调用一次
// 最好不要在这个方法中访问 self.view 或 self.node.view
-init

// 建议不使用这个方法
-loadView

// 方法在 -loadView 之后被执行
// 访问 node.view 最早的方法，你可以在这份方法中任意修改 view 和 layer 或添加手势，这个方法在其所属的生命周期中，只会执行一次
-viewDidLoad

// 方法会与节点的 -layout 同时调用
// 被多次调用
-viewWillLayoutSubviews

// node出现在屏幕上之前被调用,是节点从屏幕出现的最早时间
-viewWillAppear:

// node移除之后被调用，这是节点从屏幕消失的最早时机
-viewDidDisappear:
```

# 布局

# 基本概念

* 布局规则
* 布局元素

## 布局规则/Layout Specs

Texture 提供了 ASLayoutSpec 的几个子类，涵盖了从插入单个布局元素的简单规则，到可以变化堆放排列配置，包含多个布局元素的复杂规则

## 布局元素/Layout Elements

布局规范包含并排列布局元素

# layoutSpec

ASLayoutSpec 是所有布局规则的父类，它的主要工作是处理和管理所有的子类，它也可以用来创建自定义的布局规则。

* ASWrapperLayoutSpec 填充布局
* ASStackLayoutSpec 盒子布局(垂直|水平) 弹性盒子
* ASInsetLayoutSpec 插入布局 （）
* ASOverlayLayoutSpec 覆盖布局
* ASBackgroundLayoutSpec 背景布局
* ASCenterLayoutSpec 中心布局
* ASRatioLayoutSpec 比例布局
* ASRelativeLayoutSpec 顶点布局
* ASAbsoluteLayoutSpec 绝对布局 
* ASCornerLayoutSpec  快速转角元素布局的新的便捷布局规范


## ASWrapperLayoutSpec

ASWrapperLayoutSpec是一个简单的ASLayoutSpec子类

```c++
- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize
{
  return [ASWrapperLayoutSpec wrapperWithLayoutElement:_subnode];
}
```

## ASStackLayoutSpec

最有用的，最强大

## 属性

```c++
// 指定子元素的排序方向
// horizontalAlignment
// verticalAlignment
direction

// 子元素之间的距离
spacing

// 指定子元素如何在水平方向上对齐
horizontalAlignment

// 子元素如何在垂直方向上对齐
verticalAlignment

// 主轴的对齐方式
justifyContent

// 交叉轴的方向
alignItems

// 单行还是多行。默认为单行
flexWrap

// 多行时有效，沿交叉轴的线方向
alignContent
```

##  ASInsetLayoutSpec

 根据其子节点的 size 来确定的，因此子节点必须具有固有大小或明确设置其 size

```c++
-（ASLayoutSpec *）layoutSpecThatFits：（ASSizeRange）constrainedSize 
{ 
  ... 
  UIEdgeInsets * insets = UIEdgeInsetsMake（10，10，10，10）; 
  ASInsetLayoutSpec * headerWithInset = [ASInsetLayoutSpec insetLayoutSpecWithInsets：insets child：textNode]; 
  ... 
}
```

## ASOverlayLayoutSpec

将子节点延伸，覆盖一个子节点

子节点必须具有固有大小或明确设置 size

## ASBackgroundLayoutSpec

一个子节点为内容，将背后的另一个子节点拉伸为背景

子节点必须有一个固有大小或明确设置 size

## ASCenterLayoutSpec

将子节点的中心设置为最大的 constrainedSize 的中心

## ASRatioLayoutSpec

固定的宽高比来缩放子节点

## ASRelativeLayoutSpec

根据水平位置和垂直位置的设定，将一个子节点放置在九宫格布局规则中的任意位置。

## ASAbsoluteLayoutSpec

通过设置它们的 layoutPosition 属性来指定其子节点的横纵坐标。 绝对布局比其他类型的布局相比，不太灵活且难以维护。

## ASCornerLayoutSpec

用于快速转角元素布局的新的便捷布局规范。将元素放置在角落的简单方法是使用声明性代码表达式而不是手动坐标计算，并且ASCornerLayoutSpec可以实现此目标。

# 布局元素属性

## ASStackLayoutElement

* .style.spacingBefore 对象之前放置的额外空间(margin-left|margin-top)
* .style.spacingAfter 对象之后放置额外的空间(maring-right|margin-bottom)
* .style.flexGrow 放大因子
* .style.flexShrink 缩小因子
* .style.flexBasis 对象在盒子中垂直或水平方向的初始
* .style.alignSelf 对象在副轴的方向 覆盖alignItems
    * ASStackLayoutAlignSelfAuto
    * ASStackLayoutAlignSelfStart
    * ASStackLayoutAlignSelfEnd
    * ASStackLayoutAlignSelfCenter
    * ASStackLayoutAlignSelfStretch
* .style.ascender 基线对齐 对象从顶部到其基线的距离
* .style.descender 基线对齐 对象从基线到其底部的距离

## ASAbsoluteLayoutElement

* .style.layoutPosition 对象在 ASAbsoluteLayoutSpec 父规则中的位置

## ASLayoutElement

* .style.width
* .style.height
* .style.minWidth
* .style.maxWidth
* .style.minHeight
* .style.maxHeight
* .style.preferredSize 建议布局元素的 size 应该是多少
* .style.minSize 可选属性，为布局元素提供最小大小限制
* .style.maxSize 可选属性，为布局元素提供最大大小限制
* .style.preferredLayoutSize 布局元素的建议相对大小
* .style.minLayoutSize 可选属性，为布局元素提供最小的相对尺寸
* .style.maxLayoutSize

# Layout API Sizing 单位之间的相互关系

## ASDimension

本质上是正常的CGFloat，支持表示点值，相对百分比值或自动值。

```c++
//返回的尺寸是相对的（％）
ASDimensionMake（@"50％"）;  
ASDimensionMakeWithFraction（0.5）;

//以pt为单位返回的尺寸
ASDimensionMake（@"70pt"）;
ASDimensionMake（70）;      
ASDimensionMakeWithPoints（70）;
```

## CGSize、ASLayoutSize

ASLayoutSize 类似于 CGSize，但是它的宽度和高度可以同时使用 pt 值或百分比值。

ASLayoutSize用于设置的布局元件的.preferredLayoutSize，.minLayoutSize和.maxLayoutSize属性。

```c++
ASLayoutSizeMake(ASDimension width，ASDimension height)
```

## ASSizeRange

支持最小和最大的 CGSize

# Layout Transition API

## transitionLayoutWithAnimation


# 坑

## 自动子节点管理（ASM）

继承 ASDisplayNode 时 如果不设置automaticallyManagesSubnodes

则需要手动调用 [self addSubnode:_userAvatarImageNode];

```c++
// 启用 ASM
self.automaticallyManagesSubnodes = YES;


```

```c++
// 启用 ASM
self.automaticallyManagesSubnodes = NO;

// 需要手动管理node,不然不渲染
[self addSubnode:_userAvatarImageNode];
```