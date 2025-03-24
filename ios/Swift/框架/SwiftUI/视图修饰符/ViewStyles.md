<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ViewStyles](#viewstyles)
  - [选择器样式](#选择器样式)
  - [菜单样式](#菜单样式)
  - [Styling toggles 样式切换](#styling-toggles-样式切换)
  - [设置 Gauge  ProgressView 样式](#设置-gauge--progressview-样式)
  - [设置显示文本的视图的样式](#设置显示文本的视图的样式)

<!-- /code_chunk_output -->

# ViewStyles

将内置和自定义的外观和行为应用于不同类型的视图

```swift
// 将此视图中的按钮样式设置为具有自定义外观和标准交互行为的按钮样式
// ButtonStyle
func buttonStyle<S>(_ style: S) -> some View where S : ButtonStyle
// PrimitiveButtonStyle
// static var automatic: DefaultButtonStyle 基于按钮上下文的默认按钮样式。
// static var accessoryBar: AccessoryBarButtonStyle 一种按钮样式，通常用于附件工具栏（有时称为“范围栏”）的上下文中，用于缩小搜索或其他操作焦点的按钮
// static var accessoryBarAction: AccessoryBarActionButtonStyle 用于附件工具栏中的额外操作的按钮样式
// static var bordered: BorderedButtonStyle 根据按钮上下文应用标准边框图案的按钮样式
// static var borderedProminent: BorderedProminentButtonStyle 根据按钮上下文应用标准边框突出图案的按钮样式
// static var borderless: BorderlessButtonStyle 不应用边框的按钮样式
// static var card: CardButtonStyle 一种不填充内容的按钮样式，当按钮具有焦点时会应用运动效果
// static var link: LinkButtonStyle 模拟链接的按钮的按钮样式
// static var plain: PlainButtonStyle 按钮样式在空闲时不会设置样式或装饰其内容，但可能会应用视觉效果来指示按钮的按下、聚焦或启用状态
func buttonStyle<S>(_ style: S) -> some View where S : PrimitiveButtonStyle

// 自定义样式
// ButtonStyle 更专注于按钮的视觉外观修改
// PrimitiveButtonStyle 提供对按钮交互行为的完全控制权
// ButtonStyle 使用更简单，适合大多数自定义需求
// ButtonStyle 保留了按钮的标准点击行为，而 PrimitiveButtonStyle 需要手动调用 trigger()
// PrimitiveButtonStyleConfiguration 没有 isPressed
protocol ButtonStyle
struct ButtonStyleConfiguration
protocol PrimitiveButtonStyle
struct PrimitiveButtonStyleConfiguration

// 自定义
struct CustomButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(configuration.isPressed ? Color.blue.opacity(0.7) : Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
            .scaleEffect(configuration.isPressed ? 0.95 : 1)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

// 带边框
struct BorderedButtonStyle: ButtonStyle {
    var color: Color = .blue
    
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.clear)
            .foregroundColor(color)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(color, lineWidth: 2)
                    .opacity(configuration.isPressed ? 0.5 : 1.0)
            )
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
    }
}

// 渐变背景
struct GradientButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [.blue, .purple]),
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .opacity(configuration.isPressed ? 0.8 : 1.0)
            .foregroundColor(.white)
            .cornerRadius(10)
            .shadow(radius: configuration.isPressed ? 2 : 5)
            
    }
}

// PrimitiveButtonStyle
struct AnimatedButtonStyle: PrimitiveButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        // 需要自己管理按下状态
        Button(action: {
            configuration.trigger()
        }) {
            configuration.label
                .padding()
                .background(Color.green)
                .foregroundColor(.white)
                .cornerRadius(10)
        }
        .scaleEffect(0.9)  // 这里需要改变实现方式
    }
}
```

## 选择器样式

```swift
// 设置此视图中的选择器的样式
// .automatic 默认选择器样式
// .inline 内联显示
// .menu 菜单
// .navigationLink 
// .palette 紧凑元素的选择器样式
// .radioGroup 显示为一组单选按钮的选择器样式 macOS 10.15+
// .segmented 分段控件中显示选项的选择器样式
// .wheel 选择器样式以可滚动的轮子显示选项，显示所选选项和一些相邻选项
func pickerStyle<S>(_ style: S) -> some View where S : PickerStyle

// 设置此视图中日期选择器的样式
// static var automatic 日期选择器的默认样式
// static var compact 日期选择器样式以紧凑的文本格式显示组件
// static var field 在可编辑字段中显示组件的日期选择器样式 macOS 10.15+
// static var graphical 显示交互式日历或时钟的日期选择器样式  内联显示
// static var stepperField 一种系统样式，在可编辑字段中显示组件，并带有可增加/减少所选组件的相邻步进器 macOS 10.15+
// static var wheel 日期选择器样式，将每个组件显示为可滚动轮中的列
func datePickerStyle<S>(_ style: S) -> some View where S : DatePickerStyle
```

## 菜单样式

```swift
// 设置此视图中的菜单样式
func menuStyle<S>(_ style: S) -> some View where S : MenuStyle
Menu("PDF") {
    Button("Open in Preview", action: {})
}.menuStyle(ButtonMenuStyle())
```

## Styling toggles 样式切换

```swift
// 设置视图层次结构中的Toggle样式
// static var button: ButtonToggleStyle
// static var checkbox: CheckboxToggleStyle macos
// static var `switch`: SwitchToggleStyle
func toggleStyle<S>(_ style: S) -> some View where S : ToggleStyle
```

## 设置 Gauge  ProgressView 样式

```swift
// 设置此视图中内置仪表盘(Gauge)的样式
// .circular
// .accessoryCircular: 显示一个开放的环，环上有一个标记，标记出现在环上的某个点上，以指示仪表的当前值
// .accessoryCircularCapacity: 显示部分填充的闭合环来指示仪表的当前值
// .linear: 显示一个带有标记的条形图，该标记出现在条形图上的某个点以指示仪表的当前值
// .linearCapacity: 显示随着仪表当前值的增加从前沿到后沿填充的条形图
// .accessoryLinear: 显示带有标记的条形图，该标记出现在条形图上的某个点以指示仪表的当前值
// .accessoryLinearCapacity: 显示随着仪表当前值的增加从前缘到后缘填充的条形图
func gaugeStyle<S>(_ style: S) -> some View where S : GaugeStyle

// 设置ProgressView的样式
// static var circular loading样式
// static var linear 使用水平条直观显示进度的进度视图
func progressViewStyle<S>(_ style: S) -> some View where S : ProgressViewStyle
```

## 设置显示文本的视图的样式

```swift
// 标签样式
// static var iconOnly 仅显示标签图标的标签样式
// static var titleAndIcon 使用系统标准布局显示标签标题和图标的标签样式
// static var titleOnly 仅显示标签标题的标签样式
func labelStyle<S>(_ style: S) -> some View where S : LabelStyle

//
// static var plain 没有任何装饰的文本字段样式
// static var roundedBorder 具有系统定义的圆角边框的文本字段样式
// static var squareBorder 具有系统定义的方形边框的文本字段样式
func textFieldStyle<S>(_ style: S) -> some View where S : TextFieldStyle
````

## 集合视图样式

```swift
// 列表样式
// static var bordered 边框的列表的行为和外观的列表样式
// static var carousel 轮播列表
// static var elliptical 椭圆列表的行为和外观的列表样式
// static var grouped 分组列表的行为和外观的列表样式
// static var inset 插入列表的行为和外观的列表样式
// static var insetGrouped 插入分组列表的行为和外观的列表样式
// static var plain 普通列表
// static var sidebar 侧边栏列表的行为和外观的列表样式
func listStyle<S>(_ style: S) -> some View where S : ListStyle

// tableStyle
// static var inset
// static var bordered
func tableStyle<S>(_ style: S) -> some View where S : TableStyle

// DisclosureGroup 样式
// DisclosureGroup 是一个可折叠的容器视图，用于显示或隐藏其内容
// 
func disclosureGroupStyle<S>(_ style: S) -> some View where S : DisclosureGroupStyle
```

## 导航视图样式

```swift
// static var balanced 导航拆分样式，可在显示前导列时缩小详细内容的大小以腾出空间
// static var prominentDetail 导航分割样式，尝试在隐藏或显示前导列时保持详细内容的大小
func navigationSplitViewStyle<S>(_ style: S) -> some View where S : NavigationSplitViewStyle

// TabView 样式
// static var page 显示分页滚动的选项
// static func page(indexDisplayMode: PageTabViewStyle.IndexDisplayMode) 实现带索引显示模式的分页滚动
// static var verticalPage 显示垂直页面
// static func verticalPage(transitionStyle: VerticalPageTabViewStyle.TransitionStyle) 实现垂直交互和外观
func tabViewStyle<S>(_ style: S) -> some View where S : TabViewStyle
```

## 样式组

```swift
// ControlGroup 样式
// ControlGroup 是一组相关控件的容器，可以根据平台和上下文自动调整布局
// static var compactMenu 一种控制组样式，当用户按下控件时，其内容以紧凑菜单的形式呈现，或当嵌套在较大的菜单中时，以子菜单的形式呈现。
// static var menu 一种控制组样式，当用户按下控件时，将其内容显示为菜单，或当嵌套在更大的菜单中时，将其内容显示为子菜单
// static var navigation 
// static var palette  以调色板形式呈现其内容的控制组样式
func controlGroupStyle<S>(_ style: S) -> some View where S : ControlGroupStyle

// iOS 16.0+
// static var columns 一种非滚动表单样式，其标签列在尾部对齐，值列在前部对齐
// static var grouped 具有分组行的表单样式
func formStyle<S>(_ style: S) -> some View where S : FormStyle

// 用于配置带有索引（如字母索引）的列表视图，帮助用户在长列表中快速导航
func indexViewStyle<S>(_ style: S) -> some View where S : IndexViewStyle
```