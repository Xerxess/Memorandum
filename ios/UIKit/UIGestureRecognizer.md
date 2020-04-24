# UIGestureRecognizer

识别手势、简化定制视图事件处理的对象。

https://developer.apple.com/documentation/uikit/uigesturerecognizer?language=objc

UIKit手势

https://developer.apple.com/documentation/uikit/touches_presses_and_gestures/handling_uikit_gestures?language=objc

# 常见的手势

* UITapGestureRecognizer:用来识别点击手势,包括单击，双击，甚至三击等。
* UIPinchGestureRecognizer:用来识别手指捏合手势。
* UIPanGestureRecognizer:用来识别拖动手势。
* UISwipeGestureRecognizer:用来识别Swipe手势。
* UIRotationGestureRecognizer:用来识别旋转手势。
* UILongPressGestureRecognizer:用来识别长按手势。
* UIScreenEdgePanGestureRecognizer:从屏幕边缘附近开始的平移（拖动）手势

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
@property(nonatomic,readonly) UIGestureRecognizerState state;  
//手势代理
@property(nullable,nonatomic,weak) id <UIGestureRecognizerDelegate> delegate;
//手势是否有效  默认YES
@property(nonatomic, getter=isEnabled) BOOL enabled; 
//获取手势所在的view
@property(nullable, nonatomic,readonly) UIView *view; 
//取消view上面的touch事件响应  default  YES **下面会详解该属性**
@property(nonatomic) BOOL cancelsTouchesInView;       
//延迟touch事件开始 default  NO   **下面会详解该属性**
@property(nonatomic) BOOL delaysTouchesBegan;
//延迟touch事件结束 default  YES  **下面会详解该属性**
@property(nonatomic) BOOL delaysTouchesEnded;
//允许touch的类型数组，**下面会详解该属性**
@property(nonatomic, copy) NSArray<NSNumber *> *allowedTouchTypes 
//允许按压press的类型数组
@property(nonatomic, copy) NSArray<NSNumber *> *allowedPressTypes 
//是否只允许一种touchType 类型，**下面会详解该属性**
@property (nonatomic) BOOL requiresExclusiveTouchType 
//手势依赖（手势互斥）方法，**下面会详解该方法**
- (void)requireGestureRecognizerToFail:(UIGestureRecognizer *)otherGestureRecognizer;
//获取在传入view的点击位置的信息方法
- (CGPoint)locationInView:(nullable UIView*)view;                         
//获取触摸点数
@property(nonatomic, readonly) NSUInteger numberOfTouches;    
 //（touchIndex 是第几个触摸点）用来获取多触摸点在view上位置信息的方法                                     
- (CGPoint)locationOfTouch:(NSUInteger)touchIndex inView:(nullable UIView*)view; 
// 给手势加一个名字，以方便调式（iOS11 or later可以用）
@property (nullable, nonatomic, copy) NSString *name API_AVAILABLE(ios(11.0)
```