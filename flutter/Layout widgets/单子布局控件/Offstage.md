
# Offstage

Offstage 是一个“隐身斗篷”，它的核心作用是：控制子组件是否在 UI 中显示，同时保持其状态。
- Offstage 让组件“人间蒸发”但不“销户”，是处理后台预载和状态保留的首选。
- 如果你需要获取一个组件的 Size，但又不想让用户看到它，可以把它放在 Offstage 里

```dart
(new) Offstage({
  Key? key,
  bool offstage = true,
  Widget? child,
})
```