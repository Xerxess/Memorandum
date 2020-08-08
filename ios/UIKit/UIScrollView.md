<!-- TOC -->

- [UIScrollView](#uiscrollview)
  - [UIScrollView原理，以时间为轴线](#uiscrollview原理以时间为轴线)
  - [UIScrollView原理，以tracking属性为轴线：](#uiscrollview原理以tracking属性为轴线)
- [属于](#属于)
  - [tracking](#tracking)
  - [contentInset](#contentinset)
  - [contentOffset](#contentoffset)
  - [delaysContentTouches](#delayscontenttouches)
  - [canCancelContentTouches](#cancancelcontenttouches)

<!-- /TOC -->


https://tech.glowing.com/cn/practice-in-uiscrollview/
https://github.com/allenhsu/UIScrollView-Examples

# UIScrollView

## UIScrollView原理，以时间为轴线

1. 150ms内如果你的手指没有任何动作，消息就会传给subView。
2. 150ms内手指有明显的滑动（一个swipe动作），scrollView就会滚动，消息不会传给subView。
3. 150ms内手指没有滑动，scrollView将消息传给subView，但是之后手指开始滑动，scrollView传送touchesCancelled消息给subView，然后开始滚动。

## UIScrollView原理，以tracking属性为轴线：

* 拦截触摸事件
* tracking属性变为YES
* 一个内置的计时器开始生效，用来监控在极短的事件间隔内是否发生了手指移动

# 属于

## tracking

是触摸内容view YES:触摸

## contentInset

contentInset属性指定会 导致一个额外的缓冲区，该缓冲区的内容顶部为64像素（状态栏为20像素，导航控制器为44像素），底部为44像素（工具栏的高度）。设置contentInset为这些值可以在屏幕上显示导航控件和工具栏，但仍然可以滚动显示滚动视图的全部内容。


## contentOffset

滚动到特定的左上角位置

* 两种方式 setContentOffset:animated:方法将内容滚动到指定的内容偏移量。

## delaysContentTouches

默认值为YES。如果设置为NO，则无论手指移动的多么快，始终都会将触摸事件传递给内部控件；设置为NO可能会影响到UIScrollView的滚动功能。

## canCancelContentTouches

默认为YES，如果设置为NO，这消息一旦传递给subView，这scroll事件不会再发生。
如果属性值为YES并且跟踪到手指正触摸到一个内容控件，这时如果用户拖动手指的距离足够产生滚动，那么内容控件将收到一个touchesCancelled:withEvent:消息，而scroll view将这次触摸作为滚动来处理。如果值为NO，一旦content view开始跟踪(tracking==YES)，则无论手指是否移动，scrollView都不会滚动。