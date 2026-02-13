<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Node2D](#node2d)
  - [派生类](#派生类)
    - [渲染与视觉 (Visuals)](#渲染与视觉-visuals)
    - [物理与碰撞 (Physics)](#物理与碰撞-physics)
    - [粒子系统 (Particles)](#粒子系统-particles)
    - [相机与背景 (Camera & Background)](#相机与背景-camera--background)
    - [导航 (Navigation)](#导航-navigation)
    - [骨骼与变形 (Skeleton & Deformation)](#骨骼与变形-skeleton--deformation)
    - [地图与瓦片 (TileMaps)](#地图与瓦片-tilemaps)
    - [路径 (Paths)](#路径-paths)
    - [灯光与阴影 (Lighting)](#灯光与阴影-lighting)
    - [辅助与音频 (Misc)](#辅助与音频-misc)

<!-- /code_chunk_output -->

# Node2D

- 2D 游戏对象，具有变换（位置、旋转、缩放）。
- 继承：CanvasItem < Node < Object

## 派生类

### 渲染与视觉 (Visuals)

Sprite2D: 最基础的 2D 节点，用于显示静态贴图。
AnimatedSprite2D: 用于播放帧动画，支持多组动画序列。
Line2D: 绘制由多个点组成的线段，常用于路径显示或激光效果。
Polygon2D: 绘制自定义形状的多边形。
MeshInstance2D / MultiMeshInstance2D: 使用网格渲染 2D 资源。MultiMesh 用于高效渲染大量重复实例（如草地）。
CanvasGroup: 将子节点分组合合并渲染，常用于对一组节点统一应用着色器效果。
CanvasModulate: 用于改变整个画布的颜色（常用于模拟夜晚、色调调整）。

### 物理与碰撞 (Physics)

CollisionObject2D: 物理节点的基类（不直接使用），包括 Area2D、StaticBody2D 等。
CollisionShape2D: 为物理体定义规则的碰撞形状（圆、方、胶囊）。
CollisionPolygon2D: 为物理体定义自定义的多边形碰撞形状。
RayCast2D: 射线检测，探测直线方向上的碰撞。
ShapeCast2D: 形状投射检测，类似射线但具有体积（如投射一个圆）。
Joint2D: 物理关节，用于连接两个物理体（如链条、合页）。

### 粒子系统 (Particles)

CPUParticles2D: 由 CPU 计算的粒子，兼容性好，适合粒子数量较少的情况。
GPUParticles2D: 由 GPU 计算的粒子，性能极高，支持数十万计的粒子和复杂特效。

### 相机与背景 (Camera & Background)

Camera2D: 控制游戏视野。
Parallax2D: Godot 4.3+ 引入的新节点，用于实现视差滚动背景，比旧版更易用。
ParallaxLayer: 旧版视差层，通常作为 ParallaxBackground 的子节点使用。
BackBufferCopy: 拷贝屏幕背缓冲区，常用于实现复杂的后期着色器（如磨砂玻璃效果）。
VisibleOnScreenNotifier2D: 检测节点是否进入/离开屏幕，用于优化性能（如关闭屏幕外物体的处理）。

### 导航 (Navigation)

NavigationRegion2D: 定义 AI 可以行走的导航区域。
NavigationLink2D: 连接两个不相邻的导航区域（如传送门、跳跃点）。
NavigationObstacle2D: 动态障碍物，用于 AI 避障。

### 骨骼与变形 (Skeleton & Deformation)

Skeleton2D: 骨架容器，用于管理 2D 骨骼系统。
Bone2D: 单个骨骼节点，配合 Polygon2D 的权重实现 2D 角色蒙皮动画。
RemoteTransform2D: 将自己的变换同步给另一个节点，常用于骨骼绑定。

### 地图与瓦片 (TileMaps)

TileMap: 经典的瓦片地图系统（支持多层）。
TileMapLayer: Godot 4.3+ 将 TileMap 拆分为独立的层节点，操作更灵活，是目前推荐的做法。

### 路径 (Paths)

Path2D: 使用贝塞尔曲线定义的一条路径。
PathFollow2D: 放在 Path2D 下，使其子节点沿着路径移动。

### 灯光与阴影 (Lighting)

Light2D: 2D 光源基类（有点光源和方向光）。
LightOccluder2D: 遮光器，定义物体轮廓以产生 2D 阴影。

### 辅助与音频 (Misc)

Marker2D: 仅用于标记一个位置（在编辑器可见，运行时无形状），常用于子弹发射点。
AudioStreamPlayer2D: 位置音频，声音大小随距离摄像机的远近而变化。
AudioListener2D: 音频监听器，决定“耳朵”的位置（通常附在相机或玩家身上）。
TouchScreenButton: 专门为触摸屏设计的按钮。
