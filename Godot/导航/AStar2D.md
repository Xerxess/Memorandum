
# AStar2D

- A* 算法的一种实现，用于在 2D 空间中的连通图上找到两个顶点之间的最短路径。
- 不依赖于 TileMap 或物理层，而是一个纯粹的基于图（Graph）的寻路逻辑

## 工作流程

- 添加点 (add_point)：定义地图上哪些位置可以站立。
- 连接点 (connect_points)：定义哪些点之间可以互相走动。
- 查询路径 (get_point_path)：输入起点和终点，返回坐标数组。

```goscript
var astar = AStar2D.new()

func _ready():
    # 1. 注册点
    astar.add_point(1, Vector2(100, 100))
    astar.add_point(2, Vector2(200, 100))
    astar.add_point(3, Vector2(200, 200))
    
    # 2. 建立连接
    astar.connect_points(1, 2)
    astar.connect_points(2, 3)
    
    # 3. 寻路
    var path = astar.get_point_path(1, 3)
    print(path) # 输出: [Vector2(100, 100), Vector2(200, 100), Vector2(200, 200)]

```
