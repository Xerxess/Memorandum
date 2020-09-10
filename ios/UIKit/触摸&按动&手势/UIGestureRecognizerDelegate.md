<!-- TOC -->

- [UIGestureRecognizerDelegate](#uigesturerecognizerdelegate)

<!-- /TOC -->

# UIGestureRecognizerDelegate

```c++
// 手势识别器是否应该开始解释触摸
// UIGestureRecognizerStatePossible状态时，将调用此方法
// 返回NO将导致手势识别器转换为UIGestureRecognizerStateFailed状态
- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer;

// 询问代表手势识别器是否允许手势识别器检查触摸对象
// YES（默认设置）
// 在touchesBegan:withEvent:之前调用
// 用处：可以在控件指定的位置使用手势识别
// 手指触摸屏幕后回调的方法
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer 
       shouldReceiveTouch:(UITouch *)touch;

// 询问代表手势识别器是否允许手势识别器检查按压对象
// pressesBegan:withEvent: 之前调用
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer 
       shouldReceivePress:(UIPress *)press;

// gestureRecognizer:shouldReceivePress: 之前调用此方法一次
// gestureRecognizer:shouldReceiveTouch: 之前调用此方法一次
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer 
       shouldReceiveEvent:(UIEvent *)event;

// 是否应允许两个手势识别器同时识别手势
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer 
shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer;

// 一个手势识别器是否应该等待第二个手势识别器失败
// 返回YES 两个手势互斥时 第一个手势失效 第二个生效
// NO  第一个生效 第二个手势失效 不需要等待otherGestureRecognizer失效即第一个生效（默认）
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer 
shouldRequireFailureOfGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer;

// 第二手势识别器必须是否需要等待第一个手势识别器失败
// 返回YES 两个手势互斥时 第一个生效 第二个手势失效 
// NO 第一个手势失效 第二个生效  不需要等待gestureRecognizer失效即第二个生效(默认) 
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer 
shouldBeRequiredToFailByGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer;
```
