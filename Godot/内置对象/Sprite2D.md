
# Sprite2D

- 通用精灵节点
- 继承：Node2D < CanvasItem < Node < Object

## texture 属性

Sprite2D 的 texture 属性支持多种派生自 Texture2D 的资源类型。

### 基础与图像纹理

- CompressedTexture2D 默认导入形式。直接拖入 .png 或 .jpg 时，Godot 会将其转换为此内部格式，支持 VRAM 压缩以节省显存。
  - 用于角色、背景等几乎所有静态素材。
- ImageTexture: 动态纹理。主要用于通过脚本在运行时利用 Image 对象创建或修改纹理，适合生成式艺术或实时绘图。
  - 主要用于在游戏运行时通过代码动态创建或修改图像。
  - 用于 画板应用、程序化生成的地图 或 实时截屏。
- PortableCompressedTexture2D : 旨在提高不同平台间兼容性的压缩格式，常用于减少外部资源包的依赖。

### 布局与装饰纹理

- AtlasTexture: 图集切片。从一个大图（Atlas）中引用特定区域（Region）。它是优化渲染性能（合批）的核心工具。
  - 常用于 UI 图标库 或 角色动画序列帧。它从一张大图（图集）中切出一部分使用，能合并渲染批次（Batching）以减少 GPU 开销。
- CanvasTexture: 2D 材质扩展。允许在单张贴图基础上绑定 法线贴图 (Normal Map) 和 高光贴图 (Specular Map)，让 2D 精灵能受 3D 灯光效果影响。
  - 当你需要 2D 精灵表现出凹凸感或高光时使用。通过它绑定 法线贴图 (Normal Map)，让精灵能实时响应 PointLight2D 的照射方向。

### 程序化生成纹理

- GradientTexture1D / 2D: 基于 Gradient 资源生成的渐变色纹理，常用于着色器参数或背景。
  - 常作为 Shader 的输入，用于 血条颜色渐变、日夜循环的光照颜色 或给灰度噪声贴图上色。
- CurveTexture / CurveXYZTexture: 将 Curve 曲线数据转化为 1D 纹理，通常供 Shader 读取以控制数值随时间/距离的变化。
  - 在自定义 Shader 中，用贴图的形式存储曲线数据，常用于控制 粒子随时间的透明度 或 光效的闪烁频率。
- NoiseTexture2D: 自动生成柏林噪声（Perlin Noise）等图案，常配合 FastNoiseLite 用于生成云朵、地形高度图或扰动效果。
  - 常用于制作 消散效果、流体扰动、云雾纹理 或为地形生成高度图。

### 特殊渲染纹理

- ViewportTexture: 动态看板。实时显示另一个 Viewport 画面的纹理。常用于实现小地图、游戏内电视屏幕或分屏效果。
  - 常用于 小地图、监视器屏幕 或 2D/3D 混合界面（如在 2D UI 中显示一个旋转的 3D 模型看板）。
- AnimatedTexture: (注意：Godot 4 中已标记过时) 用于定义简单的帧动画。在 Godot 4 中建议使用 SpriteFrames 代替。
- Texture2DRD: 较低层的纹理类，用于直接与底层 RenderingDevice (RD) 交互，通常在高性能自定义渲染算法中使用。
  - 仅在编写复杂的 计算着色器 (Compute Shader) 或需要直接操作图形 API 缓存的高端特效时使用。

### 功能性与占位纹理

- PlaceholderTexture2D: 占位符。在编辑器中预留空间但不包含实际图像数据，能有效减少大型项目开发时的显存压力。
  - 在美术资源未完成时，预留位置并保持关卡布局，避免因缺少资源导致报错或布局混乱。
- CameraTexture: 专门用于读取移动设备摄像头画面的纹理（多用于 AR 项目）。
  - 常用于 AR 游戏（显示摄像头画面）或 视频播放器 的输出显示。
- ExternalTexture: 主要用于 Android 等平台上访问外部生成的纹理（如视频解码后的输出）。
- MeshTexture: 允许将纹理映射到特定的网格数据上进行绘制。
  - 将贴图映射到 2D 网格上，用于实现类似 披风飘动 或 非矩形图片显示 的效果。
- DPITexture: 自动根据屏幕密度（DPI）缩放的纹理（较少直接在 Sprite2D 中使用）。
