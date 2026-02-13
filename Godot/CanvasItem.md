
# CanvasItem

继承：Node < Object

2D 空间中所有对象的抽象基类。

## 相关方法

- void _draw() 当 CanvasItem 被请求重绘时调用（手动调用或者引擎调用 queue_redraw() 之后）。
- RID get_canvas_item() 返回 RenderingServer 对该项目使用的画布项目 RID。
- Transform2D get_canvas_transform() 返回节点的变换，从所在画布的坐标系转换至所在视口的坐标系。
- Vector2 get_global_mouse_position() 返回鼠标光标的全局位置，相对于包含该节点的 CanvasLayer
- Vector2 get_local_mouse_position() 返回该 CanvasItem 中鼠标的位置，使用该 CanvasItem 的局部坐标系。
- Transform2D get_global_transform() 返回该项目的全局变换矩阵，即到最顶层的 CanvasItem 节点的综合变换。最顶层的项目是一个 CanvasItem，它要么没有父级，要么有非 CanvasItem 父级，或者要么它启用了 top_level。
- Rect2 get_viewport_rect() 以 Rect2 的形式返回该节点的视口边界。
- World2D get_world_2d() 返回该节点注册到的 World2D。
- void hide()
- void show()
- void queue_redraw() 将该 CanvasItem 加入重绘队列
