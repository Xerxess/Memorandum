
# NavigationRegion2D

注意 godot 4.5 说明：未来版本中可能会修改或移除该类。

基于 NavigationPolygon，NavigationAgent2D 能够将其用于寻路。

- 特性
  - 任意多边形，支持斜坡、凹陷

## 核心组成

- NavigationRegion2D (节点)：定义哪些区域可以走。可视化配置
  - NavigationPolygon (资源)：存储具体的多边形形状。
- NavigationAgent2D (组件)：挂在敌人/玩家身上，负责“带路”和避障。

## 操作流程

- 添加 NavigationRegion2D
  - 属性栏新建一个 NavigationPolygon
  - 画出可行走的范围（或者点击“烘焙/Bake”按钮自动根据场景生成）。
- 搭配 NavigationAgent2D 使用 (最推荐做法)，不需要手动调用 A* 算法，只需给移动节点添加一个 NavigationAgent2D

## NavigationAgent2D

- target_position: 设置目的地（世界坐标）。
- get_next_path_position(): 最核心方法。返回路径上的下一个拐点坐标，用于计算移动速度。
- is_navigation_finished(): 判断是否已到达终点。
- avoidance_enabled: 开启后，Agent 之间会互相绕着走（避障功能）。

```goscript
extends CharacterBody2D

@onready var nav_agent: NavigationAgent2D = $NavigationAgent2D
var speed = 200.0

func _physics_process(_delta):
    if nav_agent.is_navigation_finished():
        return

    # 获取下一个导航点
    var next_pos = nav_agent.get_next_path_position()
    # 计算移动方向
    var direction = global_position.direction_to(next_pos)
    
    velocity = direction * speed
    move_and_slide()

# 外部调用此函数来移动
func move_to_target(target_pos: Vector2):
    nav_agent.target_position = target_pos
```
