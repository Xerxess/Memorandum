<!-- TOC -->

- [UIEvent](#uievent)
- [UITouch](#uitouch)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uievent?language=objc

# UIEvent

触摸事件对象

```c++
// 返回与事件关联的所有触摸
@property(nonatomic, readonly) NSSet<UITouch *> *allTouches;

// 返回属于指定给定视图的触摸对象
- (NSSet<UITouch *> *)touchesForView:(UIView *)view;

// 返回属于指定窗口的触摸对象
- (NSSet<UITouch *> *)touchesForWindow:(UIWindow *)window;

// 返回要传递到指定手势识别器的触摸对象
- (NSSet<UITouch *> *)touchesForGestureRecognizer:(UIGestureRecognizer *)gesture;
```

# UITouch

详见UITouch.md