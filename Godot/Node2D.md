
# Node2D

继承：CanvasItem < Node < Object

2D 游戏对象，被所有 2D 相关的节点继承。具有位置、旋转、缩放和倾斜。
2D 游戏对象，具有变换（位置、旋转、缩放）。包括物理对象和精灵在内的所有 2D 节点都继承自 Node2D。可以使用 Node2D 作为父节点来移动、缩放和旋转 2D 项目中的子节点。还可以控制该节点的渲染顺序。

注意：Node2D 和 Control 都继承自 CanvasItem，它们都具有该类的 CanvasItem.z_index、CanvasItem.visible 等属性。

- Vector2 global_position
- float global_rotation
- float global_rotation_degrees
- Vector2 global_scale
- float global_skew
- Transform2D global_transform
- Vector2 position[默认： Vector2(0, 0)]
- float rotation[默认： 0.0]
- float rotation_degrees
- Vector2 scale[默认： Vector2(1, 1)]
- float skew[默认： 0.0]
- Transform2D transform
