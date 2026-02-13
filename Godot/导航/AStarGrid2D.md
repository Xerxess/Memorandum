
# AStarGrid2D

- AStarGrid2D 是 AStar2D 的变种，针对疏松 2D 网格进行了优化。
- 不需要手动创建点并进行连接，所以用起来更加简单。这
- 还支持使用不同的启发方法、斜向移动模式、跳跃模式，从而加速运算。

## 工作流程

- 定义网格区域,设置网格的 region (Rect2i: 起点X, 起点Y, 宽度, 高度)
- 设置单元格大小 (像素) 可以不设置
- 更新网格（必须调用，否则寻路不生效）
- 挖掉障碍物 (使用网格坐标) 使用 set_point_solid() 将其设置为“实心”。
- 查询路径 (get_point_path)：输入起点和终点，返回坐标数组。

```goscript
var astar_grid = AStarGrid2D.new()

func _ready():
    # 1. 定义网格区域 (Rect2i: 起点X, 起点Y, 宽度, 高度)
    astar_grid.region = Rect2i(0, 0, 20, 20)
    # 2. 设置单元格大小 (像素)
    astar_grid.cell_size = Vector2(16, 16)
    # 对角线模式
    astar_grid.diagonal_mode = DIAGONAL_MODE_ALWAYS
    # 3. 更新网格（必须调用，否则寻路不生效）
    astar_grid.update()
    
    # 4. 挖掉障碍物 (使用网格坐标)
    astar_grid.set_point_solid(Vector2i(5, 5), true)
```
