<!-- TOC -->

- [UIView](#uiview)
- [可动画的属性](#可动画的属性)
- [线程注意事项](#线程注意事项)
- [属性&方法](#属性方法)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uiview?language=objc

# UIView

```c++
@interface UIView : UIResponder
```

视图对象，用于管理屏幕上矩形区域的内容

# 可动画的属性

* frame
* bounds
* center
* transform
* alpha
* backgroundColor

# 线程注意事项

用户界面的操作必须在主线程上进行

# 属性&方法

```c++
// 初始化
- (instancetype)initWithFrame:(CGRect)frame;

//
- (instancetype)initWithCoder:(NSCoder *)coder;

// （w）视图的背景色
@property(nonatomic, copy) UIColor *backgroundColor;

// （w）一个布尔值，用于确定视图是否隐藏 
@property(nonatomic, getter=isHidden) BOOL hidden;

// (w) 设置透明度
@property(nonatomic) CGFloat alpha;

// (w)视图是否不透明
@property(nonatomic, getter=isOpaque) BOOL opaque;

// (w)视图层次结构中的第一个非默认色调颜色值，从视图本身开始并从视图本身开始递增。（相当于css继承关系）
@property(nonatomic, strong) UIColor *tintColor;

// 超父级是否裁剪 默认值为NO （相当于css overflow）
@property(nonatomic) BOOL clipsToBounds;

// 遮罩视图 该视图只显示重叠部分（可以来做多渐变字体）
@property(nonatomic, strong) UIView *maskView;

// 视图的渲染图层
@property(nonatomic, readonly, strong) CALayer *layer;

// 接收者的超级视图，或者nil没有。
@property(nonatomic, readonly) UIView *superview;

// 子视图
@property(nonatomic, readonly, copy) NSArray<__kindof UIView *> *subviews;

// 接收者的窗口对象
@property(nonatomic, readonly) UIWindow *window;
```

实例方法

```c++
// push 视图
- (void)addSubview:(UIView *)view;

// move top 视图 将指定的视图移动到subviews属性中视图数组的末尾 (相当于z-index 最大)
- (void)bringSubviewToFront:(UIView *)view;

// move last 视图 将指定的视图移动到subviews属性中视图数组的开头(相当于z-index 最小)
- (void)sendSubviewToBack:(UIView *)view;

// 取消视图与其父视图及其窗口的链接，并将其从响应者链中删除。 （移除自己）
- (void)removeFromSuperview;

// 指定的索引处插入一个子视图 (z-index)
- (void)insertSubview:(UIView *)view  atIndex:(NSInteger)index;

// 另一个视图上方插入一个视图 (z-index > aboveSubview) 会覆盖aboveSubview
- (void)insertSubview:(UIView *)view aboveSubview:(UIView *)siblingSubview;

// 一个视图下方插入一个视图 (z-index < aboveSubview) 
- (void)insertSubview:(UIView *)view belowSubview:(UIView *)siblingSubview;

// 指定索引处交换子视图
- (void)exchangeSubviewAtIndex:(NSInteger)index1  withSubviewAtIndex:(NSInteger)index2;

// 当前视图是不是view(或他的子视图)
- (BOOL)isDescendantOfView:(UIView *)view;
```