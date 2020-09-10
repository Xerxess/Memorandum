<!-- TOC -->

- [UITouch](#uitouch)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uitouch?language=objc

# UITouch

表示屏幕上发生的触摸的位置，大小，移动和力度的对象

```c++
// 返回给定视图的坐标系统中接收器的当前位置
// 传递nil以获取窗口坐标
- (CGPoint)locationInView:(UIView *)view;

// 返回给定视图的坐标系中接收器的先前位置
// 传递nil以获取窗口坐标
- (CGPoint)previousLocationInView:(UIView *)view;

// 将触摸传递到的视图（如果有）
@property(nonatomic, readonly, strong) UIView *view;

// 触摸的半径
@property(nonatomic, readonly) CGFloat majorRadius;

// 触摸的精确位置
- (CGPoint)preciseLocationInView:(UIView *)view;

// 触摸点按手指的次数
// 此属性可以评估用户是单击还是双击，甚至是三次单击特定的视图或窗口
@property(nonatomic, readonly) NSUInteger tapCount;

// 触摸的类型
// UITouchTypeDirect 直接接触屏幕而产生的触摸
// UITouchTypeIndirect  触摸不是由触摸屏幕引起
// UITouchTypePencil 来自Apple Pencil的触摸
@property(nonatomic, readonly) UITouchType type;

// 触摸的阶段
// UITouchPhaseBegan 已在屏幕上按下
// UITouchPhaseMoved 已在屏幕上移动
// UITouchPhaseStationary
// UITouchPhaseEnded 已从屏幕上移开
// UITouchPhaseCancelled 当用户将设备靠着他们的脸移动时，系统取消了对触摸的跟踪
// UITouchPhaseRegionEntered 已进入屏幕上的窗口
// UITouchPhaseRegionMoved
// UITouchPhaseRegionExited
@property(nonatomic, readonly) UITouchPhase phase;
```