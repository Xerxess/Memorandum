
# CanvasLayer

继承：Node < Object
派生：ParallaxBackground

- CanvasLayer 是一个非常特殊且核心的节点。
- 主要用于解决 “UI 界面”与“游戏世界”分离 的问题。
- 独立坐标系：CanvasLayer 下的所有子节点不再跟随主场景的摄像机移动。它们参考的是屏幕坐标（窗口左上角永远是 0,0）。