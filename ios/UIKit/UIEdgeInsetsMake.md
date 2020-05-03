<!-- TOC -->

- [UIEdgeInsets](#uiedgeinsets)

<!-- /TOC -->

UIEdgeInsetsMake

为按钮或视图创建边缘插图。

# UIEdgeInsets

```c++
typedef struct UIEdgeInsets {
    CGFloat top, left, bottom, right;  // specify amount to inset (positive) for each of the edges. values can be negative to 'outset'
} UIEdgeInsets;
```