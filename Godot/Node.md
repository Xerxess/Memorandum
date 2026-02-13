
# Node

- 所有场景对象的基类。

## 生命周期函数

- _enter_tree(): 节点刚进入场景树时调用。
- _ready(): 节点及其所有子节点都准备就绪时调用（最常用的初始化位置）。
- _process(delta):渲染帧 每帧调用一次（用于渲染相关的逻辑）。
- _physics_process(delta):物理帧 固定频率调用（用于物理计算，如移动角色）。

## 访问与查找节点

- get_node("path") / $: 按照路径获取子节点。
- get_parent(): 获取当前节点的直接父节点。
- get_child(index): 获取指定索引的子节点。
- get_children(): 返回一个包含所有子节点的数组。
- find_child("name"): 递归查找名称匹配的子节点。

## 树操作

- add_child(node): 将一个新节点添加为当前节点的子节点。
- remove_child(node): 将节点从树中移除（但不会从内存删除）。
- queue_free(): 最重要的方法之一。安全地删除节点。它会等到当前帧结束、确保没有逻辑在引用该节点时再将其销毁，防止崩溃。

## 流程控制与状态

- set_process(bool): 开启或关闭 _process 回调（节省性能）。
- set_physics_process(bool): 开启或关闭物理循环回调。
- is_inside_tree(): 检查节点当前是否在活动场景树中。
- get_tree(): 获取全局的 SceneTree 对象，用于切换场景或暂停游戏。

## delta_time

- float get_process_delta_time() 返回自上次处理回调以来经过的时间（单位为秒）。
- float get_physics_process_delta_time() 返回自上次物理回调以来经过的时间（单位为秒）。

## Tween

- Tween create_tween() 新建 Tween 并将其绑定到这个节点。等价 get_tree().create_tween().bind_node(self)

