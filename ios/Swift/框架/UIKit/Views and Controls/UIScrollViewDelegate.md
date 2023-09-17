<!-- TOC -->

- [UIScrollViewDelegate](#uiscrollviewdelegate)
- [Conforming Types](#conforming-types)
- [API](#api)
    - [Responding to Scrolling and Dragging 响应滚动和拖动](#responding-to-scrolling-and-dragging-%E5%93%8D%E5%BA%94%E6%BB%9A%E5%8A%A8%E5%92%8C%E6%8B%96%E5%8A%A8)
    - [Managing Zooming 管理缩放](#managing-zooming-%E7%AE%A1%E7%90%86%E7%BC%A9%E6%94%BE)
    - [Responding to Scrolling Animations 响应滚动动画的响应](#responding-to-scrolling-animations-%E5%93%8D%E5%BA%94%E6%BB%9A%E5%8A%A8%E5%8A%A8%E7%94%BB%E7%9A%84%E5%93%8D%E5%BA%94)
    - [Responding to Inset Changes 响应插入式更改](#responding-to-inset-changes-%E5%93%8D%E5%BA%94%E6%8F%92%E5%85%A5%E5%BC%8F%E6%9B%B4%E6%94%B9)

<!-- /TOC -->

# UIScrollViewDelegate

UIScrollViewDelegate协议声明的方法允许采用委托响应来自UIScrollView类的消息，从而响应并在某些方面影响滚动、缩放、缩放内容减速和滚动动画等操作。

```swift
@MainActor protocol UIScrollViewDelegate
```

# Conforming Types

UIWebView

# API

## Responding to Scrolling and Dragging 响应滚动和拖动

```swift
// 告诉委托用户何时在接收器中滚动内容视图。
// 委托通常实现此方法，以从scrollView获取内容偏移量的更改，并绘制内容视图中受影响的部分。
// 当滚动视图发生滚动时，scrollViewDidScroll(_:) 方法会被调用。
// 你可以在该方法中执行一些自定义的操作，例如根据滚动位置更新界面、加载更多数据等。
optional func scrollViewDidScroll(_ scrollView: UIScrollView)

// 告诉委托人滚动视图何时开始滚动内容。
// 在进行小距离拖动之前，委托人可能不会收到此消息。
// 当用户开始拖动滚动视图时，scrollViewWillBeginDragging(_:) 方法会被调用。
// 你可以在该方法中执行一些操作，例如重置状态、记录起始拖动位置等。
optional func scrollViewWillBeginDragging(_ scrollView: UIScrollView)

// 告诉委托用户何时完成滚动内容。
// 可以通过修改 targetContentOffset 值达到想滚动的位置
// 您的应用程序可以更改targetContentOffset参数的值，以调整滚动视图完成滚动动画的位置。
// velocity 触摸释放时滚动视图的速度（以点为单位）。
// targetContentOffset 滚动操作减速为停止时的预期偏移量。
// 当用户结束拖动滚动视图时，scrollViewWillEndDragging(_:withVelocity:targetContentOffset:) 方法会被调用。
// 你可以在该方法中执行一些操作，例如调整滚动的目标位置、实现分页效果等。
optional func scrollViewWillEndDragging(
    _ scrollView: UIScrollView,
    withVelocity velocity: CGPoint,
    targetContentOffset: UnsafeMutablePointer<CGPoint>
)

// 在滚动视图中拖动结束时告诉委托人。
// 当用户结束拖动滚动视图时，scrollViewDidEndDragging(_:willDecelerate:) 方法会被调用。
// 你可以在该方法中执行一些操作，例如根据滚动的速度决定是否继续滚动、执行特定的动画效果等。
optional func scrollViewDidEndDragging(
    _ scrollView: UIScrollView,
    willDecelerate decelerate: Bool
)

// 询问委托人滚动视图是否应该滚动到内容的顶部。
// 如果委托没有实现此方法，则假设true。
// 要使滚动到顶部手势（点击状态栏）有效，UIScrollView的 scrollsToTop 必须设置为true。
// 当用户点击设备状态栏时，默认情况下滚动视图会自动滚动到顶部。
// 通过实现 scrollViewShouldScrollToTop(_:) 方法，你可以对滚动到顶部的行为进行自定义控制。
func scrollViewShouldScrollToTop(UIScrollView) -> Bool

// 告诉委托人滚动视图滚动到内容的顶部。
// 滚动视图在完成滚动到内容顶部后发送此消息。如果内容的顶部已经显示，它可能会立即调用它。
optional func scrollViewDidScrollToTop(_ scrollView: UIScrollView)

// 告诉委托人滚动视图开始减速滚动运动。
// 滚动视图调用此方法，因为用户的手指在滚动操作期间移动时进行修饰；之后滚动视图将继续移动一小段距离。
// UIScrollView的 isDecelerating 属性控制减速。
// 当用户滑动滚动视图并释放手指时，滚动视图会开始减速，而这个方法会在减速开始之前被调用。
optional func scrollViewWillBeginDecelerating(_ scrollView: UIScrollView)

// 告诉委托人，滚动视图已结束，已减速滚动运动。
// 当滚动运动停止时，滚动视图调用此方法。
func scrollViewDidEndDecelerating(UIScrollView)

```

## Managing Zooming 管理缩放

```swift
// 当滚动视图中即将发生缩放时，要求委托人缩放视图。
func viewForZooming(in: UIScrollView) -> UIView?

//  告诉委托人，滚动视图中内容的缩放即将开始。
func scrollViewWillBeginZooming(UIScrollView, with: UIView?)

//  在完成滚动视图中缩放内容时告诉委托人。
func scrollViewDidEndZooming(UIScrollView, with: UIView?, atScale: CGFloat)

//  告诉委托人滚动视图的缩放因子发生了变化。
func scrollViewDidZoom(UIScrollView)

```

## Responding to Scrolling Animations 响应滚动动画的响应

```swift
// 当滚动视图中的滚动动画结束时告诉委托人。
// 滚动视图在setContentOffset(_:animated:)和scrollRectToVisible(_:animated:)方法的实现结束时调用此方法，但前提是请求动画。
func scrollViewDidEndScrollingAnimation(UIScrollView)

```

## Responding to Inset Changes 响应插入式更改

```swift
// 当滚动视图的插入值发生变化时调用。
func scrollViewDidChangeAdjustedContentInset(UIScrollView)

```
