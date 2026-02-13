<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Vector2](#vector2)
  - [核心数学方法](#核心数学方法)
    - [距离与长度](#距离与长度)
    - [角度与旋转](#角度与旋转)
    - [插值与移动](#插值与移动)
  - [常用场景对应方法](#常用场景对应方法)
  - [点积（Dot Product）](#点积dot-product)

<!-- /code_chunk_output -->

# Vector2

- Vector2 是处理 2D 逻辑的灵魂。
- 不仅代表一个“点”（坐标），也代表一个“矢量”（方向和力）
- 使用浮点数坐标的 2D 向量。
- 一个 Vector2 由 x 和 y 两个浮点数组成。

## 核心数学方法

### 距离与长度

- length(): 返回向量的长度（模）。
- distance_to(other): 计算两个点之间的直线距离。
- normalized(): 标准化。将长度变为 1，但保持方向不变。用于计算“纯方向”。
- Vector2 direction_to(to: Vector2) 返回从该向量指向 to 的归一化向量。相当于使用 (b - a).normalized()。


### 角度与旋转

- angle(): 返回该向量相对于正 X 轴的角度（弧度）。
- Vector2 rotated(angle: float) 返回将这个向量旋转 angle 的结果（单位为弧度）。
- angle_to(other): 计算两个向量之间的夹角。
- float angle_to_point(to: Vector2) 返回连接两点的直线与 X 轴之间的夹角，单位为弧度

### 插值与移动

- lerp(to, weight): 线性插值。常用于平滑移动（如：从 A 点到 B 点，每帧移动 10%）。
- move_toward(to, delta): 匀速移动。比 lerp 更常用，因为它保证在到达目标时不会因浮点误差而抖动。
- limit_length(max_length): 限制最大长度（常用于限制玩家的最高移动速度）。

## 常用场景对应方法

- 让子弹飞向鼠标 (mouse_pos - pos).normalized()
- 判断两物体是否重合 pos1.distance_to(pos2) < 阈值
- 让摄像机平滑跟随 pos = pos.lerp(player_pos, 0.1)
- 实现墙面反弹 velocity = velocity.bounce(collision.get_normal())
- 匀速追逐敌人 pos = pos.move_toward(enemy_pos, speed * delta)

## 点积（Dot Product）

- 最经典的应用场景:判断敌人是否在玩家“前方”
- 结果 > 0：两个向量夹角小于 90°（在前方）。
- 结果 < 0：两个向量夹角大于 90°（在后方）。
- 结果 = 1：两个向量完全重合。

```goscript
func is_enemy_in_front(enemy_node: Node2D) -> bool:
    # 1. 获取玩家当前的朝向（确保是单位向量）
    # 如果玩家使用 rotation 旋转，可以直接用 Vector2.RIGHT.rotated(rotation)
    var facing = Vector2.RIGHT.rotated(global_rotation)

    # 2. 计算从玩家指向敌人的向量，并归一化
    var to_enemy = (enemy_node.global_position - global_position).normalized()

    # 3. 计算点积
    var dot_product = facing.dot(to_enemy)

    # 4. 判断结果
    # 如果 dot_product > 0，说明在 180 度视野内（前方）
    # 如果想更精确（比如 90 度视野），可以判断是否 > 0.707 (cos(45°))
    return dot_product > 0
```

高阶：限制“视野角度” cos(45°)

- 180° (正前方半圆) > 0
- 90° > 0.707
- 60° > 0.866
- 10° (极窄视线) > 0.996
