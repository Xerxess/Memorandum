<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NavigationServer2D](#navigationserver2d)
  - [RID 管理](#rid-管理)
  - [场景树节点](#场景树节点)
  - [NavigationMap](#navigationmap)
    - [默认导航地图](#默认导航地图)
  - [NavigationRegion](#navigationregion)
    - [创建新的导航区域](#创建新的导航区域)
    - [使用 NavigationServer API 创建新区域](#使用-navigationserver-api-创建新区域)
    - [导航网格](#导航网格)
    - [使用 NavigationRegion 烘焙导航网格](#使用-navigationregion-烘焙导航网格)
  - [NavigationPaths](#navigationpaths)
  - [NavigationPathQueryObjects](#navigationpathqueryobjects)
  - [NavigationAgents](#navigationagents)
  - [NavigationObstacles](#navigationobstacles)
  - [NavigationLinks](#navigationlinks)
  - [NavigationLayers](#navigationlayers)

<!-- /code_chunk_output -->

# NavigationServer2D

- 是 Godot 寻路的最底层 API
- NavigationServer2D 提供强大的服务器 API，用于查找由导航网格(navigation mesh)定义的区域内两个位置之间的最短路径。
- NavigationServer 最适合需要角色到达导航网格定义区域内任意位置的 2D 实时游戏。
- 导航的基本归纳:
  - 提供地图 NavigationMap
  - 提供区域 NavigationRegion
    - 配置网格（NavigationPolygon）
    - 配置 NavigationLayers）（可选）
  - 多个区域连接（可选） NavigationLinks 简单理解为：一楼通过楼梯进入二楼
  - 配置障碍物 NavigationObstacles
  - 配置代理（可选）NavigationAgents 便捷调用 NavigationServer API
  - 执行导航 NavigationPaths 或者 NavigationPathQueryObjects

## RID 管理

- Map (地图)：最顶层容器。默认情况下，每个 World2D 都有一个默认地图 RID。
- Region (区域)：实际的导航多边形。你需要将其附加到 Map 上，它才会生效。
- Link (链接)：连接两个不相连的多边形（如跳台、传送门）。
- Agent (代理)：动态物体。它们在 Map 上注册，用于处理 RVO (动态避障)。
- Obstacle(障碍):指的是用于影响和限制智能体避障速度的特定避障障碍物。

## 场景树节点

- 可作为辅助工具
  - NavigationRegion2D 一个节点，其中包含一个 NavigationPolygon 资源，该资源定义了 NavigationServer2D 的导航网格。
    - NavigationPolygon 用于存储二维导航网格数据的资源。它提供多边形绘制工具，允许在编辑器内部以及运行时定义导航区域。
  - NavigationLink2D 用于在导航网格上连接任意距离的两个位置以进行路径查找的节点。
  - NavigationAgent2D 一个辅助节点，用于简化常见的 NavigationServer2D API 调用，以实现路径查找和避障。
  - NavigationObstacle2D 此节点可用于影响和限制启用避障功能的智能体的避障速度。此节点不会影响智能体的寻路，您需要修改导航网格来实现寻路。

## NavigationMap

- NavigationMap 是 NavigationServer 上的一个抽象导航世界，由 NavigationServer RID 标识。
- 地图可以容纳和连接近乎无限数量的导航区域，并通过导航网格构建游戏世界中的可通行区域，以进行寻路。
- 地图可以包含避障代理。碰撞避免将根据地图中存在的代理进行计算。

### 默认导航地图

- 默认情况下，Godot 会为根视口的每个 World2D 和 World3D 创建一个导航地图。

```gdscript
extends Node2D

func _ready() -> void:
    # 默认导航地图
    var default_navigation_map_rid: RID = get_world_2d().get_navigation_map()
```

## NavigationRegion

- NavigationRegion 是 NavigationServer 上导航地图区域的可视化节点表示。每个 NavigationRegion 节点都包含导航网格数据的资源。
- NavigationRegions 会自动将 global_transform 更改推送至 NavigationServer 上的相应区域，使其适用于移动平台。
- 要使用场景树创建导航区域，请向场景中添加 NavigationRegion2D 或 NavigationRegion3D 节点。

### 创建新的导航区域

```gdscript
extends NavigationRegion2D

var navigationserver_region_rid: RID = get_rid()
```

### 使用 NavigationServer API 创建新区域

```gdscript
extends Node2D

func _ready() -> void:
    var new_region_rid: RID = NavigationServer2D.region_create()
    var default_map_rid: RID = get_world_2d().get_navigation_map()
    NavigationServer2D.region_set_map(new_region_rid, default_map_rid)
```

### 导航网格

- NavigationPolygon  导航网格的 2D
- NavigationMesh 导航网格的 3D

### 使用 NavigationRegion 烘焙导航网格

- 将导航限制因素纳入导航网格的过程通常称为导航网格烘焙。

## NavigationPaths

- NavigationPaths可以直接从导航服务器查询，只要导航地图有导航网格可用，就不需要任何额外的节点或对象。

```goscript
# map:导航地图的 RID get_world_2d().get_navigation_map()
# from 起始位置 Vector2
# to 目标位置 Vector2
# optimized optimized 参数为 true 路径位置将沿着多边形拐角处缩短，并额外进行一次漏斗算法迭代。
# navigation_layers 
# NavigationServer 返回的 path 对于 2D 来说是 PackedVector2Array
NavigationServer2D.map_get_path(map, from, to, optimize, navigation_layers)
```

```gdscript
# 使用默认导航地图的导航路径的基本查询。
extends Node2D

func get_navigation_path(p_start_position: Vector2, p_target_position: Vector2) -> PackedVector2Array:
    if not is_inside_tree():
        return PackedVector2Array()
    # 默认导航map RID
    var default_map_rid: RID = get_world_2d().get_navigation_map()
    var path: PackedVector2Array = NavigationServer2D.map_get_path(
        default_map_rid,
        p_start_position,
        p_target_position,
        true
    )
    return path
```

## NavigationPathQueryObjects

- NavigationPathQueryObjects 可以与 NavigationServer.query_path() 一起使用。 获取高度定制化的导航路径，包括有关该路径的可选元数据 。

## NavigationAgents

- NavigationsAgents 是辅助节点，它为继承自 Node2D/3D 的父节点集成了路径查找、路径跟随和代理避障等功能。
- 能够以更便捷的方式代表父 Actor 节点调用 NavigationServer API，方便初学者使用。
- 新的 NavigationAgent 节点将自动加入 World2D / World3D 上的默认导航地图。
- NavigationsAgent 节点是可选的，并非使用导航系统的必要条件。
- NavigationsAgent 的全部功能都可以用脚本和对 NavigationServer API 的直接调用来替代。

```gdscript
extends Node2D

@export var movement_speed: float = 4.0
@onready var navigation_agent: NavigationAgent2D = get_node("NavigationAgent2D")
var movement_delta: float

func _ready() -> void:
    navigation_agent.velocity_computed.connect(Callable(_on_velocity_computed))

func set_movement_target(movement_target: Vector2):
    navigation_agent.set_target_position(movement_target)

func _physics_process(delta):
    # 当地图从未同步且为空时，请勿查询。
    if NavigationServer2D.map_get_iteration_id(navigation_agent.get_navigation_map()) == 0:
        return
    # 当导航结束时
    if navigation_agent.is_navigation_finished():
        return

    movement_delta = movement_speed * delta
    # next_path_position 可以移动至的下一个位置，使用全局坐标，确保中途没有静态对象的阻挡。如果该代理没有导航路径，则会返回该代理父节点的位置。这个函数每个物理帧都必须调用一次，更新 NavigationAgent 内部的路径逻辑。
    var next_path_position: Vector2 = navigation_agent.get_next_path_position()
    # 计算速度
    var new_velocity: Vector2 = global_position.direction_to(next_path_position) * movement_delta
    # NavigationAgents 使用避让功能
    if navigation_agent.avoidance_enabled:
        # 为代理设置新的需求速度。避障仿真会尽可能尝试满足这个速度，但为了躲避与其他代理和障碍物的碰撞也会对它进行修改。
        navigation_agent.set_velocity(new_velocity)
    else:
        _on_velocity_computed(new_velocity)

# 移动
func _on_velocity_computed(safe_velocity: Vector2) -> void:
    global_position = global_position.move_toward(global_position + safe_velocity, movement_delta)
```

## NavigationObstacles

- NavigationObstacle2D
- NavigationObstacle3D
- 导航障碍物具有双重作用，既可以影响导航网格烘焙，也可以影响智能体避障。
  - 启用 affect_navigation_mesh 后，障碍物在烘焙时会影响导航网格。
  - 启用 avoidance_enabled 后，障碍物将影响避障代理。

## NavigationLinks

- NavigationLinks 用于连接来自 NavigationRegion2D 的导航网格多边形。即：不同的导航区域（NavigationRegion）使用NavigationLinks连接起来，如一楼通过楼梯进入二楼
- NavigationLink2D
- NavigationLink3D

## NavigationLayers

- NavigationLayers是一项可选功能，用于进一步控制路径查询中考虑哪些导航网格。
- 工作方式类似于物理层控制碰撞对象之间的碰撞，或视觉层控制渲染到视口的内容。
