<!-- TOC -->

- [Core Graphics](#core-graphics)
- [CGBlendMode](#cgblendmode)
- [CGContext](#cgcontext)
  - [获取CGContext](#获取cgcontext)
- [UIGraphicsBeginImageContextWithOptions() 创建基于位图的图形上下文](#uigraphicsbeginimagecontextwithoptions-创建基于位图的图形上下文)
- [UIGraphicsGetCurrentContext() 返回当前的图形上下文](#uigraphicsgetcurrentcontext-返回当前的图形上下文)
- [UIGraphicsBeginImageContext()  创建基于位图的图形上下文](#uigraphicsbeginimagecontext--创建基于位图的图形上下文)
- [UIGraphicsGetImageFromCurrentImageContext()  根据当前基于位图的图形上下文的内容返回图像](#uigraphicsgetimagefromcurrentimagecontext--根据当前基于位图的图形上下文的内容返回图像)
- [UIGraphicsEndImageContext 从堆栈顶部删除当前基于位图的图形上下文](#uigraphicsendimagecontext-从堆栈顶部删除当前基于位图的图形上下文)
- [CGPath](#cgpath)
- [UIBezierPath](#uibezierpath)
  - [使用方式](#使用方式)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/drawing?language=occ

https://developer.apple.com/documentation/uikit/images_and_pdf?language=occ

https://developer.apple.com/documentation/coregraphics/cgcontext?language=occ


# Core Graphics

Core Graphics是Quartz 2D的一个高级绘图引擎，常用与iOS，tvOS，macOS的图形绘制应用开发。Core Graphics是对底层C语言的一个简单封装，其中提供大量的低层次，轻量级的2D渲染API。



# CGBlendMode

```c++
//正常；也是默认的模式。前景图会覆盖背景图
kCGBlendModeNormal

// 正片叠底；混合了前景和背景的颜色，最终颜色比原先的都暗
kCGBlendModeMultiply

//滤色；把前景和背景图的颜色先反过来，然后混合
kCGBlendModeScreen

// 覆盖；能保留灰度信息，结合
kCGBlendModeOverlay

//覆盖；能保留灰度信息，结合kCGBlendModeSaturation能保留透明度信息，
//在imageWithBlendMode方法中两次执行drawInRect方法实现我们基本需求";  
kCGBlendModeOverlay: 

kCGBlendModeDarken// 变暗
kCGBlendModeLighten// 变亮
kCGBlendModeColorDodge// 颜色变淡
kCGBlendModeColorBurn//颜色加深
kCGBlendModeSoftLight// 柔光
kCGBlendModeHardLight// 强光
kCGBlendModeDifference//插值
kCGBlendModeExclusion//排除
kCGBlendModeHue// 色调
kCGBlendModeSaturation//饱和度
kCGBlendModeColor// 颜色
kCGBlendModeLuminosity// 亮度

 //Apple额外定义的枚举  
            //R: premultiplied result, 表示混合结果  
            //S: Source, 表示源颜色(Sa对应透明度值: 0.0-1.0)  
            //D: destination colors with alpha, 表示带透明度的目标颜色(Da对应透明度值: 0.0-1.0)  
R表示结果，S表示包含alpha的原色，D表示包含alpha的目标色，Ra，Sa和Da分别是三个的alpha。明白了这些以后，就可以开始寻找我们所需要的blend模式了。相信你可以和我一样，很快找到这个模式

kCGBlendModeClear: R = 0
kCGBlendModeCopy: R = S
kCGBlendModeSourceIn: R = S*Da //就是说目标色 = 原色*目标色的透明度
kCGBlendModeSourceOut: R = S*(1 - Da)
kCGBlendModeSourceAtop: R = S*Da + D*(1 - Sa)
kCGBlendModeDestinationOver: R = S*(1 - Da) + D
kCGBlendModeXOR: R = S*(1 - Da) + D*(1 - Sa)
kCGBlendModePlusDarker: R = MAX(0, (1 - D) + (1 - S)
kCGBlendModePlusLighter: R = MIN(1, S + D)（最后一种混合模式）
```

# CGContext

CGContext是一个不透明的结构体数据类型，其中封装了对图形进行绘制操作和用于输出到打印设备或者是展示设备的一系列API函数。

所有的绘制都是在context上下文中进行

## 获取CGContext

> 1.位图上下文（A bitmap graphics context）：一般用于绘制图片或者自定义控件。

当系统控件不能满足我们UI的需求时，重载UIView的drawrect：方法，在我们执行任何绘制代码前，该方法自动配置好绘图上下文，我们只需要通过UIGraphicsGetCurrentContext方法就可以获取到当前绘图上下文用于绘制操作。

> 2. 方法中执行绘制操作

UIGraphicsBeginImageContextWithOptions方法创建绘图上下文,通过UIGraphicsGetCurrentContext获取用于绘制

> 3.UIGraphicsBeginImageContext

# UIGraphicsBeginImageContextWithOptions() 创建基于位图的图形上下文

https://developer.apple.com/documentation/uikit/1623912-uigraphicsbeginimagecontextwitho?language=occ

# UIGraphicsGetCurrentContext() 返回当前的图形上下文

# UIGraphicsBeginImageContext()  创建基于位图的图形上下文

与 UIGraphicsBeginImageContextWithOptions

# UIGraphicsGetImageFromCurrentImageContext()  根据当前基于位图的图形上下文的内容返回图像

https://developer.apple.com/documentation/uikit/1623924-uigraphicsgetimagefromcurrentima?language=occ

# UIGraphicsEndImageContext 从堆栈顶部删除当前基于位图的图形上下文

# CGPath

https://developer.apple.com/documentation/coregraphics/cgpath?language=occ

# UIBezierPath

https://developer.apple.com/documentation/uikit/uibezierpath?language=occ

包含直线和曲线段的路径，您可以在自定义视图中进行渲染。

UIBezierPath用于定义一个由直线/曲线组合而成的路径, 并且可以在自定义视图中渲染该路径. 在使用的过程中, 我们只需要先指定好路径的结构, 比如一条直线、一条贝塞尔曲线、一个矩形、一个椭圆、一个圆弧等, 然后使用系统为我们提供的方法将构建好的路径渲染出来即可

UIBezierPath位于UIKit库中, 是针对Core Graphics库中的CGPathRef的封装

## 使用方式

> 1. 自定义View drawRect: 直接绘制

```c++
- (void)drawRect:(CGRect)rect {
  UIBezierPath *path = [UIBezierPath bezierPathWithRect:self.bounds];
  path.lineWidth = 2;
  [[UIColor orangeColor] set];
  [path stroke];
}
```

> 2.CAShapeLayer 在其坐标空间中绘制三次贝塞尔曲线样条的图层

https://developer.apple.com/documentation/quartzcore/cashapelayer/1521904-path?language=objc

> 3.CGContextAddPath 将先前创建的路径对象添加到图形上下文中的当前路径

https://developer.apple.com/documentation/coregraphics/1456628-cgcontextaddpath?language=occ

```c++

// 通过Core Graphics重新绘制带圆角的视图
UIGraphicsBeginImageContextWithOptions(self.imageView.bounds.size, NO, [UIScreen mainScreen].scale);
CGContextRef content = UIGraphicsGetCurrentContext();
UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:self.imageView.bounds cornerRadius:self.imageView.bounds.size.width/2];
CGContextAddPath(content, path.CGPath);
CGContextClip(content);
[self.imageView drawRect:self.imageView.bounds];
self.imageView.image = UIGraphicsGetImageFromCurrentImageContext();
UIGraphicsEndImageContext();
```