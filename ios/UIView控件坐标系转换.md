<!-- TOC -->

- [坐标转换方法](#坐标转换方法)
    - [convertPoint](#convertpoint)
    - [convertRect](#convertrect)
- [坐标系的比较](#坐标系的比较)

<!-- /TOC -->

# 坐标转换方法


## convertPoint

```c++
// point所在的视图转换到目标视图view中,返回在目标视图view中的point
 - (CGPoint)convertPoint:(CGPoint)point toView:(nullable UIView *)view;

// point从view中转换到当前视图,返回在当前视图中的point
 - (CGPoint)convertPoint:(CGPoint)point fromView:(nullable UIView *)view;
```

## convertRect

```c++
// rect所在的视图转换到目标视图view中,返回在目标视图view中的rect
- (CGRect)convertRect:(CGRect)rect toView:(nullable UIView *)view;

// rect从view中转换到当前视图,返回在当前视图中的rect
- (CGRect)convertRect:(CGRect)rect fromView:(nullable UIView *)view;
```

# 坐标系的比较

```c++
// 判断 rect1是否包含 rect2,返回bool
BOOL isContain = CGRectContainsRect(rect1, rect2);

// 判断 rect1和 rect2是否有重叠,返回bool
BOOL isIntersect = CGRectIntersectsRect(rect1, rect2);

// 判断点point是否在rect中,返回bool
BOOL isContain = CGRectContainsPoint(rect, point);

```