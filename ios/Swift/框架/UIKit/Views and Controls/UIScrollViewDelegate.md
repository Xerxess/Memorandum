<!-- TOC -->

- [UIScrollViewDelegate](#uiscrollviewdelegate)
- [Conforming Types](#conforming-types)
- [API](#api)
    - [Responding to Scrolling and Dragging 响应滚动和拖动](#responding-to-scrolling-and-dragging-响应滚动和拖动)
    - [Managing Zooming 管理缩放](#managing-zooming-管理缩放)
    - [Responding to Scrolling Animations 响应滚动动画的响应](#responding-to-scrolling-animations-响应滚动动画的响应)
    - [Responding to Inset Changes 响应插入式更改](#responding-to-inset-changes-响应插入式更改)

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
func scrollViewDidScroll(UIScrollView)

// 告诉委托人滚动视图何时开始滚动内容。
// 在进行小距离拖动之前，委托人可能不会收到此消息。
func scrollViewWillBeginDragging(UIScrollView)

// 告诉委托用户何时完成滚动内容。
// 可以通过修改 targetContentOffset 值达到想滚动的位置
// 您的应用程序可以更改targetContentOffset参数的值，以调整滚动视图完成滚动动画的位置。
// velocity 触摸释放时滚动视图的速度（以点为单位）。
// targetContentOffset 滚动操作减速为停止时的预期偏移量。
func scrollViewWillEndDragging(UIScrollView, withVelocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>)

// 在滚动视图中拖动结束时告诉委托人。
func scrollViewDidEndDragging(UIScrollView, willDecelerate: Bool)

// 询问委托人滚动视图是否应该滚动到内容的顶部。
// 如果委托没有实现此方法，则假设true。
// 要使滚动到顶部手势（点击状态栏）有效，UIScrollView的 scrollsToTop 必须设置为true。
func scrollViewShouldScrollToTop(UIScrollView) -> Bool

// 告诉委托人滚动视图滚动到内容的顶部。
// 滚动视图在完成滚动到内容顶部后发送此消息。如果内容的顶部已经显示，它可能会立即调用它。
func scrollViewDidScrollToTop(UIScrollView)

// 告诉委托人滚动视图开始减速滚动运动。
// 滚动视图调用此方法，因为用户的手指在滚动操作期间移动时进行修饰；之后滚动视图将继续移动一小段距离。
// UIScrollView的 isDecelerating 属性控制减速。
func scrollViewWillBeginDecelerating(UIScrollView)

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
