
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Visual Shader 编辑器](#visual-shader-编辑器)
  - [输出节点](#输出节点)
    - [定点 Vertex](#定点-vertex)
    - [片段 Fragment](#片段-fragment)
    - [灯光 Light](#灯光-light)
  - [节点](#节点)
    - [Color（颜色）](#color颜色)
    - [Common](#common)
    - [Conditional（条件）](#conditional条件)
    - [Input（输入）](#input输入)
    - [Scalar（标量）](#scalar标量)
    - [SDF](#sdf)
    - [Textures（纹理）](#textures纹理)
    - [Transform（变换）](#transform变换)
    - [Utility（工具）](#utility工具)
    - [Vector（向量）](#vector向量)
    - [Special（特殊）](#special特殊)

<!-- /code_chunk_output -->


# Visual Shader 编辑器

可视化着色器编辑器

## 输出节点

### 定点 Vertex

- Vertex 顶点位置
- UV 纹理坐标
- Color 顶点颜色
- Alpha 顶点透明度
- Point Size 点大小

### 片段 Fragment

- Color 物体的基础颜色
- Alpha 控制透明度
- Normal 法线
- Normal Map 法线贴图
- Normal Map Depth 控制法线贴图的“强度”
- Light Vertex 灯光顶点坐标
- Shadow Vertex 阴影控制

### 灯光 Light

- Light 灯光颜色
- Light Alpha 灯光透明度
- Shadow Modulate 阴影颜色/调制

## 节点

### Color（颜色）

- Common
  - ColorFunc:颜色函数 颜色空间转换工具。常用功能包括将颜色从 Linear 转换到 sRGB，或进行灰度化处理。
  - ColorOp: 颜色运算符 提供类似 Photoshop 的混合模式，如 叠加 (Overlay)、变暗 (Darken)、烧灼 (Burn) 等。
- Functions
  - Grayscale
  - HSV2RGB
  - LinearToSRGB
  - RGB2HSV
  - Sepia
  - SRGBToLinear
- Operators
  - Burn
  - Darken
  - Difference
  - Dodge
  - HardLight 强光
  - Lighten
  - Overlay 叠加
  - Screen
  - SoftLight
- Variables
  - ColorConstant 固定颜色值，直接在节点中选取
  - ColorParameter 暴露给材质面板的颜色属性，允许在编辑器或脚本中动态修改。

### Common

- DerivativeFunc （仅限片段/灯光模式）导数函数。

### Conditional（条件）

- Functions
  - Equal(==)
  - If
  - SwitchBool（==）
  - SwitchFloat（==）
  - Switchlnt（==）
  - 等等...
- Common
  - Compare（==）
  - Is
- Variables
  - BooleanConstant
  - BooleanParameter

- If: 最核心的条件节点。
- Switch: 根据布尔值 (Boolean) 或整数索引切换不同的输入路径。

### Input（输入）

获取来自引擎管线的内置数据。

- All
  - Color
  - TexturePixelSize
  - Time
  - UV
- Common
  - Input
- Fragment
  - AtLightPass
  - FragCoord
  - NormalTexture
  - PointCoord
  - RegionRect
  - Screen PixelSize
  - Screen UV
  - SpecularShininess
  - SpecularShininessTexture
  - Texture
  - Vertex

- 常用内置属性: 包括 UV（纹理坐标）、VERTEX（顶点位置）、NORMAL（法线方向）、TIME（自运行以来的秒数）以及 COLOR（顶点颜色）。
- 场景数据: 可以获取相机信息、屏幕坐标（Screen UV）或深度缓冲（Depth）等。

### Scalar（标量）

处理单维度数值（浮点数 float），是着色器中最基础的运算单元。

- Common
  - FloatFunc
  - FloatOp
  - IntFunc
  - IntOp
  - UIntFunc
  - UIntOp
- Constants
  - E
  - Epsilon
  - Phi
  - Pi/4
  - Pi/2
  - Pi
  - Tau
  - Sqrt2
- Functions
  - Abs
  - Ceil
  - Clamp
  - Mix
  - Min
  - Max
  - 等等...
- Operators
  - Add(+)
  - Subtract(-)
  - Multiply(*)
  - Divide(/)
  - 等等...
- Variables
  - FloatConstant
  - lntConstant
  - UlntConstant
  - FloatParameter
  - IntParameter
  - UIntParameter

### SDF

- ScreenUVToSDF
- SDFRaymarch
- SDFToScreenUV
- TextureSDF
- TextureSDFNormal

### Textures（纹理）

用于采样和处理图像数据。

- Common
  - UVFunc
  - UVPolarCoord
- Functions
  - CubeMap
  - Curvelexture 使用一条可编辑的曲线来映射输入值，常用于复杂的渐变控制。
  - CurveXYZTexture
  - Texture2D 核心采样节点。输入 UV 坐标，输出该坐标点的 Color (RGB) 和 Alpha 通道。
  - Texture2DArray
  - Texture3D
  - UVPanning
  - UVScaling
- Variables
  - CubeMapParameter
  - Texture2DParameter 在材质面板中提供纹理槽位，方便更换贴图。
  - Texture2DArrayParameter
  - Texture3DParameter

### Transform（变换）

处理 4x4 矩阵运算，通常用于空间坐标系之间的转换。

- common 最基础的变换逻辑
  - TransformFunc 提供矩阵的转置 (Transpose) 或求逆 (Inverse) 等功能。
  - TransformOp
- Composition 处理矩阵的构成
  - OuterProduct
  - TransformCompose
  - TransformDecompose
- Functions 矩阵整体的数学运算
  - Determinant
  - Inverse
  - Transpose
- Operators 矩阵之间的基础算术
  - Add（+）
  - Divide （/）
  - Multiply（*）
  - MultiplyComp（*）
  - Subtract （-）
  - TransformVectorMult（*） 将向量与矩阵相乘。例如，将模型空间的顶点位置转换到世界空间或视图空间。
- Variables 定义和获取矩阵数据
  - TransformConstant
  - TransformParameter

### Utility（工具）

提供辅助功能和高级逻辑。

- RandomRange 节点用于根据输入种子生成一个“伪随机”数值
- RotationByAxis 这是 Transform 或 Vector 分类下极其强大的节点，用于让向量绕指定轴线旋转

### Vector（向量）

向量节点是着色器中处理空间、方向和多维数据的核心。它将标量（Scalar）组合成 2D、3D 或 4D 的集合。

- common 一组节点提供了处理向量最基础的物理/几何操作
  - VectorFunc
  - VectorOp
  - VectorCompose
  - VectorDecompose
- composition 处理向量维度（\(X,Y,Z,W\)）的拆分与重组
  - Vector2Compose
  - Vector2Decompose
  - Vector3Compose
  - Vector3Decompose
  - Vector4Compose
  - Vector4Decompose
- Functions 针对向量整体运行的复杂数学运算
  - Abs
  - Dot
  - Max
  - Min
  - Mix
  - Normalize
  - 等等...
- Operators 向量之间的基础算术运算。
  - Add(+)
  - Subtract(-)
  - Multiply(*)
  - Divide(/)
  - 等等...
- Variables 用于定义和暴露向量数据
  - Vector2Constant
  - Vector2Parameter
  - Vector3Constant
  - Vector3Parameter
  - Vector4Constant
  - Vector4Parameter

### Special（特殊）

- Frame 用途：组织工具。它本质上是一个“注释框”。它是应对大型复杂 Shader 的排版利器。
- Expression 直接编写 Godot 着色器代码 在节点内定义输入/输出端口，编写逻辑。
- Global Expression 直接编写 Godot 着色器代码 定义的函数或常量可以在整个 Shader 的所有 Expression 节点中调用
- ParameterRef 它是已创建的 Parameter（如 FloatParameter, ColorParameter）的“快捷方式”。
- Varying Getter 通常放在 Fragment 阶段。取出之前存入的数据进行颜色渲染。
- VaryingSetter 通常放在 Vertex 阶段。将你在顶点阶段计算好的数据（如：自定义的顶点高度）存入变量。
- Reroute 线路管理。
