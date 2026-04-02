
# OverlayPortal vs OverlayEntry

https://api.flutter.dev/flutter/widgets/OverlayEntry-class.html
https://api.flutter.dev/flutter/widgets/OverlayPortal-class.html

- 在 widget 树之外显示内容
- 在新项目中优先使用 OverlayPortal，它更安全、更简洁，能避免大多数因为手动管理生命周期导致的内存泄漏问题。
- 场景
  - 场景 1：下拉菜单 / 弹出层
  - 场景 2：Tooltip / 气提示


## 第三方

flutter_portal https://pub.dev/documentation/flutter_portal/latest/