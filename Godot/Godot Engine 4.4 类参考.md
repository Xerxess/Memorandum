
# Godot Engine 4.4 类参考

<https://docs.godotengine.org/zh-cn/4.4/classes/index.html>

## 全局

- @GDScript：提供 GDScript 的内置函数与全局实用例程。
- @GlobalScope：全局作用域中的常量、枚举与工具方法。

## 节点（选取若干代表性节点）

Node：场景树的基础节点，提供父子管理、信号与生命周期钩子。
Node2D：支持二维变换（位置、旋转、缩放）的节点。
Node3D：支持三维变换的节点。
CanvasItem：所有 2D 可见元素与 UI 的基类。
Control：UI 控件的基类，提供布局、主题与输入响应。
Sprite2D：显示 2D 精灵。
Sprite3D：显示 3D 精灵。
Area2D/Area3D：检测重叠/进入/退出的区域，常用于触发器与传感器。
CollisionShape2D/CollisionShape3D：为物理体或区域提供碰撞形状。
Camera2D/Camera3D：2D/3D 视口的摄像机。
AnimationPlayer：播放并控制动画资源与动画树。
AudioStreamPlayer/AudioStreamPlayer2D/AudioStreamPlayer3D：播放音频。
RigidBody2D/RigidBody3D：受物理引擎控制的刚体。
CharacterBody2D/CharacterBody3D：角色移动控制体。
StaticBody2D/StaticBody3D：静态碰撞体。
TileMap：基于图块的地图系统（4.x 常与 TileMapLayer 配合）。
NavigationRegion2D/NavigationRegion3D：导航网格与寻路区域。
UI 控件：Button、Label、LineEdit、TextEdit、OptionButton、CheckBox、ProgressBar、Slider、Tree、ItemList、Container 与其子类（VBoxContainer/HBoxContainer/GridContainer 等）。
HTTPRequest：在场景树中进行 HTTP 请求。
Timer：定时器，发送 timeout 信号。

## 资源（选取若干代表性资源）

Resource：资源的基类，用于序列化与引用。
PackedScene：实例化场景的打包资源。
Animation：动画数据资源。
AnimationLibrary：动画库资源（4.x）。
Texture2D：2D 纹理基类。
Image：图像数据资源。
AudioStream：音频流基类。
Shader：着色器资源（支持可视化着色器节点）。
Material/StandardMaterial3D/ORMMaterial3D/FogMaterial/ProceduralSkyMaterial/PhysicalSkyMaterial/PanoramaSkyMaterial：材质资源。
Mesh/ArrayMesh/ImporterMesh：网格资源。
BoxMesh/CapsuleMesh/CylinderMesh/PlaneMesh/PointMesh/PrismMesh/QuadMesh/SphereMesh/TorusMesh：基础图元网格。
Curve/Curve2D/Curve3D：曲线资源。
Shape2D/Shape3D 及其子类：碰撞/物理形状资源。
NavigationMesh/NavigationPolygon：导航网格/多边形资源。
TileSet/TileMapPattern：图块集与模式资源（4.x）。
Environment：渲染环境配置（背景、雾、泛光等）。
World2D/World3D：2D/3D 世界资源。
Font/FontFile/FontVariation/SystemFont：字体资源。
StyleBox 及其子类：UI 样式框资源。
Script/GDScript/CSharpScript：脚本资源。
Theme：UI 主题资源。
EditorSettings/ProjectSettings：编辑器与项目设置资源。
Translation：本地化翻译资源。

## 其他对象（选取若干常见对象）

Object：所有类的基类，提供引用计数与通用方法。
FileAccess/DirAccess：文件/目录访问。
ConfigFile：配置文件读写。
AudioServer：音频服务器，管理总线与效果。
RenderingServer：渲染服务器，管理渲染资源与操作。
PhysicsServer2D/PhysicsServer3D：物理服务器，管理物理世界与对象。
NavigationServer2D/NavigationServer3D：导航服务器，管理寻路与导航网格。
Input/InputMap：输入与输入映射管理。
DisplayServer：显示服务器，管理窗口、屏幕与光标。
OS：操作系统相关工具（时间、执行、文件系统、网络等）。
ResourceLoader/ResourceSaver：资源的加载与保存。
Performance：性能监控与统计。
MultiplayerAPI/SceneMultiplayer：多人游戏 API。
Network 相关：PacketPeer 及其子类、HTTPClient、WebSocketPeer、WebRTCMultiplayerPeer、UPNP 等。
Navigation 与路径查询相关：NavigationPathQueryParameters2D/3D、NavigationPathQueryResult2D/3D。
Thread/WorkerThreadPool：多线程支持。
Tween/Tweener：动画与补间系统。
ResourceImporter 系列与 Editor* 插件系列：资源导入与编辑器扩展（与“编辑器专用”类存在交叉）。

## 编辑器专用（选取若干代表）

EditorPlugin：编辑器插件基类。
EditorInterface：与编辑器界面交互的接口。
EditorSelection：编辑器中的选择管理。
EditorFileSystem：编辑器文件系统。
EditorImportPlugin/EditorExportPlugin/EditorExportPlatform 及各平台子类：导入/导出与平台支持。
EditorInspectorPlugin：自定义检查器面板。
EditorSceneFormatImporter 及其子类：场景格式导入器（GLTF、FBX、Blend、UFBX）。
EditorScript：编辑器脚本工具。
EditorVCSInterface：版本控制系统接口。
EditorFeatureProfile：编辑器特性配置。
FileSystemDock/ScriptEditor/EditorSettings/EditorToaster 等：编辑器 UI 辅助。

## 变体类型（数据结构）

Variant：通用可变类型容器。
bool、int、float：基本数值与布尔类型。
String、StringName：字符串与字符串名。
Array：通用动态数组。
Dictionary：键值对映射。
Packed*Array：类型化打包数组（PackedByteArray、PackedInt32Array、PackedFloat32Array、PackedStringArray、PackedVector2Array、PackedVector3Array、PackedVector4Array、PackedColorArray）。
Vector2/Vector2i、Vector3/Vector3i、Vector4/Vector4i：2D/3D/4D 向量。
Rect2/Rect2i、AABB：矩形与轴对齐包围盒。
Transform2D/Transform3D、Basis、Quaternion：变换与旋转。
Projection：投影矩阵。
Plane：平面。
Color：颜色。
NodePath：节点路径。
RID：资源标识符。
Callable：可调用对象。
Signal：信号对象。
