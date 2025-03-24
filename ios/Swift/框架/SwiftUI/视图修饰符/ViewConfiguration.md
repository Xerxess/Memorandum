<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [View Configuration](#view-configuration)
  - [隐藏视图](#隐藏视图)
  - [隐藏系统元素](#隐藏系统元素)
  - [管理视图交互](#管理视图交互)
  - [Adding a glass background 添加玻璃背景](#adding-a-glass-background-添加玻璃背景)
  - [亮色或暗色外观](#亮色或暗色外观)
  - [获取配色方案对比](#获取配色方案对比)

<!-- /code_chunk_output -->

# View Configuration

调整层次结构中视图的特征

## 隐藏视图

```swift
// 设置此视图的透明度
func opacity(_ opacity: Double) -> some View

// 隐藏视图
// 保留在视图层次结构中并影响布局
// 需要彻底移除请使用 if
func hidden() -> some View
```

## 隐藏系统元素

```swift
// 隐藏此视图中包含的任何控件的标签。
func labelsHidden() -> some View
// Toggle(isOn: $toggle1) {Text("Toggle 1")}.labelsHidden()

// 控制此视图中包含的任何控件的标签的可见性
// iOS 18.0+
// 在 iOS 上， Menu中的Picker默认隐藏其标签。您可以使用此修饰符在该上下文中明确显示标签
func labelsVisibility(_ visibility: Visibility) -> some View

// 由 labelsVisibility(_:) 设置
var labelsVisibility: Visibility { get set }

// 设置此视图中的控件的菜单指示器可见性
func menuIndicator(_ visibility: Visibility) -> some View
// Menu { }.menuIndicator(.hidden)

// 设置状态栏的可见性
func statusBarHidden(_ hidden: Bool = true) -> some View
// Menu { }.statusBarHidden()

// 设置覆盖应用程序的非瞬态系统视图的首选可见性
// 常用于 主页指示器 自动消失
func persistentSystemOverlays(_ visibility: Visibility) -> some View
// Menu { }.persistentSystemOverlays(.hidden)
```

## 管理视图交互

```swift
// 添加一个条件来控制用户是否可以与此视图交互
func disabled(_ disabled: Bool) -> some View

// 一个布尔值，指示与此环境关联的视图是否允许用户交互
var isEnabled: Bool { get set }

// iOS 16.0+
// 设置用于跟踪交互性的标签
func interactionActivityTrackingTag(_ tag: String) -> some View

// iOS 17.0+
// 标记接收者，因为其内容可能无效
// 基于条件的刷新控制
func invalidatableContent(_ invalidatable: Bool = true) -> some View
```

## Adding a glass background 添加玻璃背景

```swift
// visionOS 1.0+
func glassBackgroundEffect(displayMode: GlassBackgroundDisplayMode = .always) -> some View

// visionOS 1.0+
func glassBackgroundEffect<S>(
    in shape: S,
    displayMode: GlassBackgroundDisplayMode = .always
) -> some View where S : InsettableShape
```

## 亮色或暗色外观

```swift
// 设置首选配色方案
func preferredColorScheme(_ colorScheme: ColorScheme?) -> some View

// 这个环境的配色方案
var colorScheme: ColorScheme { get set }
```

## 获取配色方案对比

```swift
// 与此环境的配色方案相关的对比度
var colorSchemeContrast: ColorSchemeContrast { get }
```
