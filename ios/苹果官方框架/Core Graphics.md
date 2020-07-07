<!-- TOC -->

- [Core Graphics](#core-graphics)
- [CGContext](#cgcontext)
- [CGBlendMode](#cgblendmode)

<!-- /TOC -->

# Core Graphics

Core Graphics是Quartz 2D的一个高级绘图引擎，常用与iOS，tvOS，macOS的图形绘制应用开发。Core Graphics是对底层C语言的一个简单封装，其中提供大量的低层次，轻量级的2D渲染API。

# CGContext

CGContext是一个不透明的结构体数据类型，其中封装了对图形进行绘制操作和用于输出到打印设备或者是展示设备的一系列API函数。

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