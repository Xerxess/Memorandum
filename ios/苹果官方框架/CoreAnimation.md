<!-- TOC -->

- [CoreAnimation](#coreanimation)
- [相关属性](#相关属性)
- [CALayer](#calayer)
- [隐式和显式动画](#隐式和显式动画)
- [关键帧动画](#关键帧动画)
- [CAAnimationGroup](#caanimationgroup)
- [CALayerDelegate](#calayerdelegate)
- [CAShapeLayer](#cashapelayer)
- [CAGradientLayer](#cagradientlayer)
- [CAAnimation](#caanimation)
- [CAPropertyAnimation](#capropertyanimation)
- [CABasicAnimation](#cabasicanimation)
- [CAKeyframeAnimation](#cakeyframeanimation)
- [CASpringAnimation](#caspringanimation)
- [CATransition](#catransition)
- [CAScrollLayer](#cascrolllayer)
- [一般提示和技巧](#一般提示和技巧)
- [可动画属性](#可动画属性)
  - [CALayer动画属性](#calayer动画属性)
  - [默认的默认基本动画](#默认的默认基本动画)
  - [默认隐式过渡](#默认隐式过渡)
- [C类型的包装器类](#c类型的包装器类)
  - [CGPoint](#cgpoint)
  - [CGSize](#cgsize)
  - [CGRect](#cgrect)
  - [CATransform3D](#catransform3d)

<!-- /TOC -->

https://developer.apple.com/documentation/quartzcore?language=objc

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40004514

ios核心动画高级技巧:https://www.kancloud.cn/manual/ios

# CoreAnimation

Core Animation 可提供高帧频和流畅的动画，而不会给 CPU 造成负担，也不会降低您的应用程序运行速度。绘制动画的每一帧所需的大部分工作已为您完成。您可以配置动画参数（例如起点和终点），然后由 Core Animation 完成其余工作，将大部分工作移交给专用图形硬件，以加快渲染速度。

基础结构的核心是图层对象，您可以使用这些对象来管理和操作内容。图层将您的内容捕获到位图中，图形硬件可以轻松地对其进行操作。

* Core Animation，中文翻译为核心动画，它是一组非常强大的动画处理API，使用它能做出非常炫丽的动画效果，而且往往是事半功倍。也就是说，使用少量的代码就可以实现非常强大的功能。
* Core Animation可以用在Mac OS X和iOS平台。
* Core Animation的动画执行过程都是在后台操作的，不会阻塞主线程。
* 要注意的是，Core Animation是直接作用在CALayer上的，并非UIView
* 通过调用CALayer的addAnimation:forKey:方法增加CAAnimation对象到CALayer中，这样就能开始执行动画了
* 通过调用CALayer的removeAnimationForKey:方法可以停止CALayer中的动画

# 相关属性

* CAAnimation是所有动画类的父类，但是它不能直接使用，应该使用它的子类
* CAPropertyAnimation也是不能直接使用的，也要使用它的子类
* CABasicAnimation、CAKeyframeAnimation、CATransition、CAAnimationGroup
* duration    动画的时长
* repeatCount    重复的次数。不停重复设置为 HUGE_VALF
* repeatDuration    设置动画的时间。在该时间内动画一直执行，不计次数。
* beginTime    指定动画开始的时间。从开始延迟几秒的话，设置为【CACurrentMediaTime() + 秒数】 的方式
* timingFunction    设置动画的速度变化
* autoreverses    动画结束时是否执行逆动画
* fromValue    所改变属性的起始值(Swift中为Any类型,OC中要包装成NSValue对象)
* toValue    所改变属性的结束时的值(类型与fromValue相同)
* byValue    所改变属性相同起始值的改变量(类型与fromValue相同)


# CALayer

图层样式属性动画: https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/LayerStyleProperties/LayerStyleProperties.html

管理基于图像的内容并允许您对该内容执行动画的对象。

| 类                        | 用法                                                                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAEmitterLayer            | 用于实现基于 Core Animation 的粒子发射器系统。发射器层对象控制粒子的生成及其来源。                                                                                                                                           |
| CAGradientLayer           | 用于绘制填充图层形状的颜色渐变（在任何圆角的范围内）。                                                                                                                                                                       |
| CAMetalLayer              | 用于设置和出售可绘制纹理以使用 Metal 渲染图层内容。                                                                                                                                                                          |
| CAEAGLLayer/CAOpenGLLayer | 用于设置后备存储和上下文，以使用 OpenGL ES（iOS）或 OpenGL（OS X）渲染图层内容。                                                                                                                                             |
| CAReplicatorLayer         | 当您要自动制作一个或多个子层的副本时使用。复制器为您制作副本，并使用您指定的属性更改副本的外观或属性。                                                                                                                       |
| CAScrollLayer             | 用于管理由多个子层组成的较大的可滚动区域。                                                                                                                                                                                   |
| CAShapeLayer              | 用于绘制三次贝塞尔曲线样条曲线。形状层对于绘制基于路径的形状是有利的，因为它们始终会产生清晰的路径，这与您绘制到图层的后备存储中的路径相反，后者在缩放时看起来并不好。但是，清晰的结果确实涉及在主线程上渲染形状并缓存结果。 |
| CATextLayer               | 用于呈现纯文本字符串或属性字符串。                                                                                                                                                                                           |
| CATiledLayer              | 用于管理可分为较小图块的大图像，并支持放大和缩小内容，从而分别渲染。                                                                                                                                                         |
| CATransformLayer          | 用于渲染真实的 3D 图层层次结构，而不是由其他图层类实现的平展的图层层次结构。                                                                                                                                                 |
| QCCompositionLayer        | 用于渲染 Quartz Composer 合成。（仅适用于 OS X）                                                                                                                                                                             |


# 隐式和显式动画

* 隐式动画更新图层对象的数据值
* 显式动画不会修改图层树中的数据。显式动画仅生成动画。在动画结束时，Core Animation会从图层中删除动画对象，并使用其当前数据值重画该图层。如果您希望永久更改来自显式动画的更改，则还必须更新图层的属性

```c++
  CABasicAnimation * fadeAnim = [CABasicAnimation animationWithKeyPath:@"opacity"];
  fadeAnim.fromValue = [NSNumber numberWithFloat:1.0];
  fadeAnim.toValue = [NSNumber numberWithFloat:0.0];
  fadeAnim.duration = 1.0;
  [self.layer addAnimation:fadeAnim forKey:@"opacity"];
    
  //将图层中的实际数据值更改为最终值。
  self.layer.opacity = 0.0;
```


# 关键帧动画

关键帧动画由一组目标数据值和应达到每个值的时间组成

```c++
//创建一个实现两个圆弧（反弹）的CGPath
CGMutablePathRef thePath = CGPathCreateMutable（）;
CGPathMoveToPoint（thePath，NULL，74.0,74.0）;
CGPathAddCurveToPoint（thePath，NULL，74.0,500.0，
                                   320.0,500.0，
                                   320.0,74.0）；
CGPathAddCurveToPoint（thePath，NULL，320.0,500.0，
                                   566.0,500.0，
                                   566.0,74.0）；
 
CAKeyframeAnimation * theAnimation;
 
//创建动画对象，将position属性指定为关键路径。
theAnimation = [CAKeyframeAnimation animationWithKeyPath：@“ position”];
theAnimation.path = thePath;
theAnimation.duration = 5.0;
 
//将动画添加到图层。
[theLayer addAnimation：theAnimation forKey：@“ position”]；

```
# CAAnimationGroup

组对象可简化对多个动画对象的管理

# CALayerDelegate

您的应用可以实现的方法，以响应与图层相关的事件。

# CAShapeLayer

在其坐标空间中绘制三次贝塞尔曲线样条的图层。

# CAGradientLayer

在其背景颜色上绘制颜色渐变的图层，填充了图层的形状（包括圆角）

# CAAnimation

核心动画中动画的抽象超类。

# CAPropertyAnimation

抽象子类 CAAnimation 用于创建可操纵图层属性值的动画。

# CABasicAnimation

为图层属性提供基本的单关键帧动画功能的对象。

CABasicAnimation是CAPropertyAnimation的子类，使用它可以实现一些基本的动画效果，它可以让CALayer的某个属性从某个值渐变到另一个值。

# CAKeyframeAnimation

为图层对象提供关键帧动画功能的对象。

# CASpringAnimation

将弹簧般的力施加到图层属性的动画。

# CATransition

在图层状态之间提供动画过渡的对象。  
CATransition是CAAnimation的子类，用于做转场动画，能够为layer层提供移出屏幕和移入屏幕的动画效果。

* type：动画过渡类型
* ubtype：动画过渡方向
* startProgress：动画起点(在整体动画的百分比)
* endProgress：动画终点(在整体动画的百分比)

```c++
CATransition * transition = [CATransition animation];
transition.startProgress = 0;
transition.endProgress = 1.0;
transition.type = kCATransitionPush;
transition.subtype = kCATransitionFromRight;
transition.duration = 1.0;
 
//将过渡动画添加到两个图层
[myView1.layer addAnimation：transition forKey：@“ transition”]；
[myView2.layer addAnimation：transition forKey：@“ transition”]；
 
//最后，更改图层的可见性。
myView1.hidden = YES;
myView2.hidden = NO;
```

# CAScrollLayer

显示大于其自身边界的可滚动内容的图层。

# 一般提示和技巧

* 尽可能使用不透明层
* 始终将图层大小设置为整数值
* 根据需要使用异步层渲染
* 在图层上添加阴影时指定阴影路径
* 为CAShapeLayer对象使用更简单的路径

# 可动画属性

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/AnimatableProperties/AnimatableProperties.html

## CALayer动画属性

属性|默认动画
-|-
anchorPoint|使用表B-2中CABasicAnimation描述的默认隐式对象。
backgroundColor|使用表B-2中CABasicAnimation描述的默认隐式对象。
backgroundFilters|使用表B-3中CATransition所述的默认隐式对象。过滤器的子属性使用表B-2中所述的默认隐式对象 进行动画处理。CABasicAnimation
borderColor|使用表B-2中CABasicAnimation描述的默认隐式对象。
borderWidth|使用表B-2中CABasicAnimation描述的默认隐式对象。
bounds|使用表B-2中CABasicAnimation描述的默认隐式对象。
compositingFilter|使用表B-3中CATransition所述的默认隐式对象。过滤器的子属性使用表B-2中所述的默认隐式对象进行动画处理。CABasicAnimation
contents|使用表B-2中CABasicAnimation描述的默认隐式对象。
contentsRect|使用表B-2中CABasicAnimation描述的默认隐式对象。
cornerRadius|使用表B-2中CABasicAnimation描述的默认隐式对象。
doubleSided|没有默认的默认动画。
filters|使用表B-2中CABasicAnimation描述的默认隐式对象。过滤器的子属性使用表B-2中所述的默认隐式对象 进行动画处理。CABasicAnimation
frame|此属性不可设置动画。通过对bounds和position属性设置动画，可以获得相同的结果。
hidden|使用表B-2中CABasicAnimation描述的默认隐式对象。
mask|使用表B-2中CABasicAnimation描述的默认隐式对象。
masksToBounds|使用表B-2中CABasicAnimation描述的默认隐式对象。
opacity|使用表B-2中CABasicAnimation描述的默认隐式对象。
position|使用表B-2中CABasicAnimation描述的默认隐式对象。
shadowColor|使用表B-2中CABasicAnimation描述的默认隐式对象。
shadowOffset|使用表B-2中CABasicAnimation描述的默认隐式对象。
shadowOpacity|使用表B-2中CABasicAnimation描述的默认隐式对象。
shadowPath|使用表B-2中CABasicAnimation描述的默认隐式对象。
shadowRadius|使用表B-2中CABasicAnimation描述的默认隐式对象。
sublayers|使用表B-2中CABasicAnimation描述的默认隐式对象。
sublayerTransform|使用表B-2中CABasicAnimation描述的默认隐式对象。
transform|使用表B-2中CABasicAnimation描述的默认隐式对象。
zPosition|使用表B-2中CABasicAnimation描述的默认隐式对象。

## 默认的默认基本动画

## 默认隐式过渡

# C类型的包装器类

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Key-ValueCodingExtensions/Key-ValueCodingExtensions.html

## CGPoint
## CGSize
## CGRect
## CATransform3D
