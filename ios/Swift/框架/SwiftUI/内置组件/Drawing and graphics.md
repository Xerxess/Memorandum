<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Drawing and graphics](#drawing-and-graphics)
- [ShapeStyle](#shapestyle)
  - [分层样式](#分层样式)
  - [语义样式](#语义样式)
  - [阴影效果](#阴影效果)
  - [渐变](#渐变)
  - [模糊和半透明效果](#模糊和半透明效果)
  - [图像绘画样式](#图像绘画样式)
- [常用的修饰符](#常用的修饰符)
  - [设置颜色](#设置颜色)
  - [设置内容样式](#设置内容样式)
  - [变换颜色](#变换颜色)
  - [缩放、旋转、变换视图、Mask、剪裁](#缩放-旋转-变换视图-mask-剪裁)
  - [应用模糊和阴影](#应用模糊和阴影)

<!-- /code_chunk_output -->

# Drawing and graphics

利用图形效果和定制图纸增强您的视图

# ShapeStyle

符合ShapeStyle协议的几个重要类型:
- AngularGradient 角度渐变
- AnyGradient 任何渐变
- AnyShapeStyle 任何形状样式
- BackgroundStyle 背景样式
- Color 颜色
- Color.Resolved 颜色。解决
- EllipticalGradient 椭圆渐变
- FillShapeStyle 填充形状样式
- ForegroundStyle 前景样式
- Gradient 梯度
- HierarchicalShapeStyle 层次形状样式
- HierarchicalShapeStyleModifier ImagePaint 图像绘制
- LinearGradient 线性渐变
- LinkShapeStyle 链接形状样式
- Material 材料
- MeshGradient 网格渐变
- PlaceholderTextShapeStyle 占位符文本形状样式
- RadialGradient 径向渐变
- SelectionShapeStyle 选择形状样式
- SeparatorShapeStyle 分隔符形状样式
- Shader 着色
- TintShapeStyle 着色形状样式
- WindowBackgroundShapeStyle 窗口背景形状样式

- 用于定义如何填充或描边形状。它是 SwiftUI 视觉设计系统的核心部分，允许开发者为各种形状和视图添加颜色、渐变和其他视觉效果。

```swift
// 预定义颜色
Color.red
Color.blue
Color.primary

// 自定义 RGB 颜色
Color(red: 0.5, green: 0.3, blue: 0.9)

// 使用系统颜色
Color(.systemBackground)

// 使用十六进制值
Color(hex: "#FF5733")
```

## 分层样式

```swift
// 第1级的形状样式
static var primary: HierarchicalShapeStyle

// 第2级的形状样式
static var secondary: HierarchicalShapeStyle

// 第3级的形状样式
static var tertiary: HierarchicalShapeStyle

// 第4级的形状样式
static var quaternary: HierarchicalShapeStyle

// 第5级的形状样式
static var quinary: HierarchicalShapeStyle
```

## 语义样式

```swift
static var foreground: ForegroundStyle
static var background: BackgroundStyle
static var selection: SelectionShapeStyle

// 前景分隔线或边框线的样式
static var separator: SeparatorShapeStyle

// 反映当前色调颜色的样式
static var tint: TintShapeStyle

// 适合占位符文本的样式。
static var placeholder: PlaceholderTextShapeStyle

// 适合链接的样式
static var link: LinkShapeStyle

// 用于填充形状的叠加填充样式
static var fill: FillShapeStyle
```

## 阴影效果

```swift
Circle().fill(.shadow(.inner(radius: 1, y: 1)))
Rectangle().fill(.red.shadow(.drop(radius: 2, y: 3)))
```

## 渐变

```swift
// 线性渐变
LinearGradient(
    gradient: Gradient(colors: [.red, .blue]),
    startPoint: .leading,
    endPoint: .trailing
)

// 径向渐变
RadialGradient(
    gradient: Gradient(colors: [.yellow, .orange]),
    center: .center,
    startRadius: 0,
    endRadius: 100
)

// 角度渐变
AngularGradient(
    gradient: Gradient(colors: [.red, .yellow, .green, .blue, .purple, .red]),
    center: .center
)
```

## 模糊和半透明效果

```swift
Rectangle()
    .fill(.ultraThinMaterial)

// 其他材质选项
// .ultraThinMaterial 一种大部分半透明的材质
// .thinMaterial 一种更半透明而不是不透明的材质
// .regularMaterial 一种有点半透明的材质
// .thickMaterial 一种比半透明更不透明的材质
// .ultraThickMaterial 一种几乎不透明的材料
// .bar 与系统工具栏的样式匹配的材质
```

## 图像绘画样式

```swift
static func image(Image, sourceRect: CGRect, scale: CGFloat) -> ImagePaint
```

# 常用的修饰符

## 设置颜色

```swift
// 设置此视图中的色调颜色
// 可覆盖此视图的默认主题色
func tint(_ tint: Color?) -> some View

```

## 设置内容样式

```swift
// 添加具有指定样式和宽度的边框
func border<S>(
    _ content: S,
    width: CGFloat = 1
) -> some View where S : ShapeStyle

// 将视图的前景元素设置为使用给定的样式
func foregroundStyle<S>(_ style: S) -> some View where S : ShapeStyle

// 设置指定的样式以在视图中渲染背景
func backgroundStyle<S>(_ style: S) -> some View where S : ShapeStyle
```

## 变换颜色

```swift
// 增亮
func brightness(Double) -> some View

// 设置此视图中相似颜色之间的对比度和分离度
func contrast(Double) -> some View

// 反转此视图中的颜色
func colorInvert() -> some View

// 向此视图添加颜色乘法效果
func colorMultiply(Color) -> some View

// 饱和度
func saturation(Double) -> some View

// 添加灰度效果
func grayscale(Double) -> some View

// 将色相旋转效果应用于此视图
func hueRotation(Angle) -> some View

// 将明亮度添加到 Alpha 效果添加到此视图
func luminanceToAlpha() -> some View
```

## 缩放、旋转、变换视图、Mask、剪裁

```swift
// 缩放此视图以填充其父视图
func scaledToFill() -> some View

// 缩放此视图以适合其父视图
func scaledToFit() -> some View

// 在水平和垂直方向上按给定量缩放此视图的渲染输出
func scaleEffect(
    _ s: CGFloat,
    anchor: UnitPoint = .center
) -> ModifiedContent<Self, _UniformScaleEffect>

// 相对于锚点，按给定的水平和垂直量缩放此视图的渲染输出
func scaleEffect(x: CGFloat, y: CGFloat, anchor: UnitPoint) -> some View

// 将此视图的尺寸限制为指定的纵横比
func aspectRatio(_:contentMode:)

// 将仿射变换应用于此视图的渲染输出
func transformEffect(CGAffineTransform) -> some View

// 使用给定视图的 Alpha 通道遮罩此视图
func mask<Mask>(alignment: Alignment, () -> Mask) -> some View

// 将此视图剪切到其边界矩形框架。
func clipped(antialiased: Bool) -> some View

// 设置此视图的剪切形状
func clipShape<S>(S, style: FillStyle) -> some View
```

## 应用模糊和阴影

```swift
// 高斯模糊
func blur(radius: CGFloat, opaque: Bool) -> some View

// 添加阴影
func shadow(color: Color, radius: CGFloat, x: CGFloat, y: CGFloat) -> some View

// iOS 17.0+
// 将效果应用于此视图，同时通过几何代理提供对布局信息的访问。
func visualEffect(_ effect: @escaping (EmptyVisualEffect, GeometryProxy) -> some VisualEffect) -> some View
```
