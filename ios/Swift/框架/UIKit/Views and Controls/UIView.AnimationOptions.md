# UIView.AnimationOptions

static var layoutSubviews: UIView.AnimationOptions
在提交时布置子视图，以便它们与父视图一起动画。

static var allowUserInteraction: UIView.AnimationOptions
允许用户在动画过程中与视图进行交互。

static var beginFromCurrentState: UIView.AnimationOptions
从与已在飞行中的动画相关的当前设置开始动画。

static var `repeat`: UIView.AnimationOptions
无限重复动画。

static var autoreverse: UIView.AnimationOptions
向前和向后运行动画（必须与重复选项结合使用）。

static var overrideInheritedDuration: UIView.AnimationOptions
强制动画使用提交动画时指定的原始持续时间值。

static var overrideInheritedCurve: UIView.AnimationOptions
强制动画使用提交动画时指定的原始曲线值。

static var allowAnimatedContent: UIView.AnimationOptions
通过动态更改属性值并重新绘制视图来为视图制作动画。

static var showHideTransitionViews: UIView.AnimationOptions
在视图转换期间隐藏或显示视图。

static var overrideInheritedOptions: UIView.AnimationOptions
不继承动画类型或任何选项的选项。

static var curveEaseInOut: UIView.AnimationOptions
指定缓入缓出曲线，使动画缓慢开始，在中间阶段加速，然后在完成前再次减速。

static var curveEaseIn: UIView.AnimationOptions
缓入曲线使动画开始时速度较慢，然后随着动画的进行而加速。

static var curveEaseOut: UIView.AnimationOptions
缓出曲线使动画快速开始，然后在完成时变慢。

static var curveLinear: UIView.AnimationOptions
线性动画曲线使动画在其持续时间内均匀发生。

static var transitionFlipFromLeft: UIView.AnimationOptions
围绕垂直轴从左到右翻转视图的过渡（视图的左侧向前移动，右侧向后移动）。

static var transitionFlipFromRight: UIView.AnimationOptions
围绕垂直轴从右向左翻转视图的过渡（视图的右侧向前移动，左侧向后移动）。

static var transitionCurlUp: UIView.AnimationOptions
从底部向上卷曲视图的过渡。

static var transitionCurlDown: UIView.AnimationOptions
从顶部向下弯曲视图的过渡。

static var transitionCrossDissolve: UIView.AnimationOptions
从一个视图消失到下一个视图的过渡。

static var transitionFlipFromTop: UIView.AnimationOptions
围绕水平轴从上到下翻转视图的过渡（视图的顶部向前移动，底部向后移动）。

static var transitionFlipFromBottom: UIView.AnimationOptions
围绕水平轴从下到上翻转视图的过渡（视图的底部向前移动，顶部向后移动）。

static var preferredFramesPerSecond30: UIView.AnimationOptions
帧率为每秒30帧。

static var preferredFramesPerSecond60: UIView.AnimationOptions
帧率为每秒 60 帧。