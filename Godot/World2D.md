
# World2D

World2D 是一个资源（Resource），它承载了 2D 世界所需的所有物理和渲染空间信息

## 属性

- RID canvas 这个世界的画布资源的 RID。由 RenderingServer 用于 2D 绘制。
- PhysicsDirectSpaceState2D direct_space_state 直接访问该世界的物理 2D 空间状态。可用于查询当前和可能的碰撞。处理碰撞、射线检测等物理模拟。
- RID navigation_map 这个世界的导航地图的 RID。由 NavigationServer2D 使用。
- space: 获取该世界的物理空间 RID，常用于底层 PhysicsServer2D 的调用。
