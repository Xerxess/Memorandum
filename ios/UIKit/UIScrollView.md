<!-- TOC -->

- [UIScrollView](#uiscrollview)
- [属于](#属于)
    - [contentInset](#contentinset)
    - [contentOffset](#contentoffset)

<!-- /TOC -->


https://tech.glowing.com/cn/practice-in-uiscrollview/
https://github.com/allenhsu/UIScrollView-Examples

# UIScrollView

# 属于

## contentInset

contentInset属性指定会 导致一个额外的缓冲区，该缓冲区的内容顶部为64像素（状态栏为20像素，导航控制器为44像素），底部为44像素（工具栏的高度）。设置contentInset为这些值可以在屏幕上显示导航控件和工具栏，但仍然可以滚动显示滚动视图的全部内容。


## contentOffset

滚动到特定的左上角位置

* 两种方式 setContentOffset:animated:方法将内容滚动到指定的内容偏移量。