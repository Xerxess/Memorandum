<!-- TOC -->

- [CGRect](#cgrect)
- [CGRectIntersectsRect](#cgrectintersectsrect)
- [CGRectContainsPoint](#cgrectcontainspoint)
- [CGRectContainsRect](#cgrectcontainsrect)
- [CGRectIsEmpty](#cgrectisempty)
- [CGRectIsInfinite](#cgrectisinfinite)
- [CGRectEqualToRect](#cgrectequaltorect)

<!-- /TOC -->

# CGRect

# CGRectIntersectsRect

返回两个矩形是否相交。

```c++
bool CGRectIntersectsRect(CGRect rect1, CGRect rect2);
```

# CGRectContainsPoint

返回矩形是否包含指定点。

```c++
bool CGRectContainsPoint(CGRect rect, CGPoint point);
```

# CGRectContainsRect

返回第一个矩形是否包含第二个矩形。

```c++
bool CGRectContainsRect(CGRect rect1, CGRect rect2);
```

# CGRectIsEmpty

返回矩形的宽度或高度为零，或者为空矩形。

```c++
bool CGRectIsEmpty(CGRect rect);
```

# CGRectIsInfinite

返回矩形是否无限。

无限矩形是没有定义边界的矩形。

# CGRectEqualToRect

比较两个rect 是否同=
官方不推荐请使用'=='