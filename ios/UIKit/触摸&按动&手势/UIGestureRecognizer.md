<!-- TOC -->

- [UIGestureRecognizer](#uigesturerecognizer)
- [常见的手势](#常见的手势)
    - [UITapGestureRecognizer](#uitapgesturerecognizer)
    - [UIHoverGestureRecognizer](#uihovergesturerecognizer)
    - [UILongPressGestureRecognizer](#uilongpressgesturerecognizer)
    - [UIPanGestureRecognizer](#uipangesturerecognizer)
    - [UIPinchGestureRecognizer](#uipinchgesturerecognizer)
    - [UIRotationGestureRecognizer](#uirotationgesturerecognizer)
    - [UIScreenEdgePanGestureRecognizer](#uiscreenedgepangesturerecognizer)
    - [UISwipeGestureRecognizer](#uiswipegesturerecognizer)
- [使用](#使用)
- [属性和方法](#属性和方法)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/touches_presses_and_gestures?language=objc

# UIGestureRecognizer

识别手势、简化定制视图事件处理的对象。

https://developer.apple.com/documentation/uikit/uigesturerecognizer?language=objc

UIKit手势

https://developer.apple.com/documentation/uikit/touches_presses_and_gestures/handling_uikit_gestures?language=objc

# 常见的手势

* UIHoverGestureRecognizer (iOS 13.0)
* UITapGestureRecognizer:用来识别点击手势,包括单击，双击，甚至三击等。
* UIPinchGestureRecognizer:用来识别手指捏合手势。
* UIPanGestureRecognizer:用来识别平移手势。
* UISwipeGestureRecognizer:用来识别一个或多个方向上的滑动手势。
* UIRotationGestureRecognizer:用来识别旋转手势。
* UILongPressGestureRecognizer:用来识别长按手势。
* UIScreenEdgePanGestureRecognizer:从屏幕边缘附近开始的平移（拖动）手势



## UITapGestureRecognizer

```c++
// 用户必须按下的按钮的位掩码才能进行手势识别
@property(nonatomic) UIEventButtonMask buttonMaskRequired;

// 手势识别所需的轻击次数
// 默认 1
@property(nonatomic) NSUInteger numberOfTapsRequired;

// 用户必须点击以进行手势识别的手指数
// 默认 1
@property(nonatomic) NSUInteger numberOfTouchesRequired;
```

## UIHoverGestureRecognizer

## UILongPressGestureRecognizer

```c++
// 按下才能识别手势的最短时间
// 时间间隔以秒为单位。默认持续时间为0.5秒
@property(nonatomic) NSTimeInterval minimumPressDuration;

// 手指的默认数量为1
@property(nonatomic) NSUInteger numberOfTouchesRequired;

// 手势识别所需的视图上的轻击次数
@property(nonatomic) NSUInteger numberOfTapsRequired;

// 手势失败之前，手指在视图上的最大移动
@property(nonatomic) CGFloat allowableMovement;
```

## UIPanGestureRecognizer

```c++
// 触摸视图进行手势识别的最大手指数
@property(nonatomic) NSUInteger maximumNumberOfTouches;

// 进行手势识别的最小手指数 预设值为1
@property(nonatomic) NSUInteger minimumNumberOfTouches;

// 在指定视图的坐标系中解释平移手势
// 返回指定超级视图的坐标系中标识视图新位置的点
- (CGPoint)translationInView:(UIView *)view;

// 设置指定视图的坐标系中设置平移值
- (void)setTranslation:(CGPoint)translation 
                inView:(UIView *)view;

// 平移手势的速度
// 返回平移手势的速度，以每秒的点数表示。
- (CGPoint)velocityInView:(UIView *)view;
```

## UIPinchGestureRecognizer

```c++
// 比例
@property(nonatomic) CGFloat scale;

// 捏的速度
@property(nonatomic, readonly) CGFloat velocity;
```

## UIRotationGestureRecognizer

```c++
//  弧度
@property(nonatomic) CGFloat rotation;

// 捏的速度
@property(nonatomic, readonly) CGFloat velocity;
```

## UIScreenEdgePanGestureRecognizer

```c++
// 起始边缘
// UIRectEdgeNone
// UIRectEdgeTop
// UIRectEdgeLeft
// UIRectEdgeBottom
// UIRectEdgeRight
// UIRectEdgeAll
@property(readwrite, nonatomic, assign) UIRectEdge edges;
```

## UISwipeGestureRecognizer

```c++
// 方向
// UISwipeGestureRecognizerDirectionRight
// UISwipeGestureRecognizerDirectionLeft
// UISwipeGestureRecognizerDirectionUp
// UISwipeGestureRecognizerDirectionDown
@property(nonatomic) UISwipeGestureRecognizerDirection direction;

// 滑动识别所需的触摸次数 
// 默认 1
@property(nonatomic) NSUInteger numberOfTouchesRequired;
```

# 使用

```c++
//初始化方法 且 添加 target的方法
- (instancetype)initWithTarget:(nullable id)target action:(nullable SEL)action
//单独添加target的方法
- (void)addTarget:(id)target action:(SEL)action;
//移除target的方法
- (void)removeTarget:(nullable id)target action:(nullable SEL)action;
```

# 属性和方法

```c++
//手势的状态
// UIGestureRecognizerStatePossible 尚未识别其手势(默认状态)
// UIGestureRecognizerStateBegan 手势的开始
// UIGestureRecognizerStateChanged 手势变化的触摸
// UIGestureRecognizerStateEnded 手势结束的触摸
// UIGestureRecognizerStateCancelled  取消了连续手势
// UIGestureRecognizerStateFailed 无法识别为手势的多点触摸序列
// UIGestureRecognizerStateRecognized 已接收到多点触摸序列，并将其识别为手势
@property(nonatomic,readonly) UIGestureRecognizerState state; 

//手势代理
@property(nullable,nonatomic,weak) id <UIGestureRecognizerDelegate> delegate;

//手势是否有效  默认YES
@property(nonatomic, getter=isEnabled) BOOL enabled; 

// 获取手势所在的view
@property(nullable, nonatomic,readonly) UIView *view; 

// 是否将触摸传递给视图 (YES)
// 设置成NO表示当前控件响应后会传播到其他控件上
@property(nonatomic) BOOL cancelsTouchesInView;   

//延迟touch事件开始 default  NO
@property(nonatomic) BOOL delaysTouchesBegan;

// 是否在结束阶段延迟向其视图发送触摸 default  YES
@property(nonatomic) BOOL delaysTouchesEnded;

//允许touch的类型数组，**下面会详解该属性**
@property(nonatomic, copy) NSArray<NSNumber *> *allowedTouchTypes 

//允许按压press的类型数组
@property(nonatomic, copy) NSArray<NSNumber *> *allowedPressTypes 

//是否只允许一种touchType 类型，**下面会详解该属性**
@property (nonatomic) BOOL requiresExclusiveTouchType 

// 手势依赖（手势互斥）
// 希望单击手势要求双击手势失败时
- (void)requireGestureRecognizerToFail:(UIGestureRecognizer *)otherGestureRecognizer;

// 获取在传入view的点击位置的信息方法
- (CGPoint)locationInView:(nullable UIView*)view; 

//获取触摸点数
@property(nonatomic, readonly) NSUInteger numberOfTouches;

 //（touchIndex 是第几个触摸点）用来获取多触摸点在view上位置信息的方法                                     
- (CGPoint)locationOfTouch:(NSUInteger)touchIndex inView:(nullable UIView*)view; 

// 给手势加一个名字，以方便调式（iOS11 or later可以用）
@property (nullable, nonatomic, copy) NSString *name API_AVAILABLE(ios(11.0)
```
