<!-- TOC -->

- [UIControl](#uicontrol)
- [回应用户互动](#%E5%9B%9E%E5%BA%94%E7%94%A8%E6%88%B7%E4%BA%92%E5%8A%A8)
- [支持本地化](#%E6%94%AF%E6%8C%81%E6%9C%AC%E5%9C%B0%E5%8C%96)
- [使控件可访问](#%E4%BD%BF%E6%8E%A7%E4%BB%B6%E5%8F%AF%E8%AE%BF%E9%97%AE)
- [Subclassing notes 子分类注释](#subclassing-notes-%E5%AD%90%E5%88%86%E7%B1%BB%E6%B3%A8%E9%87%8A)
- [APi](#api)
    - [Configuring the control’s attributes](#configuring-the-controls-attributes)
    - [Accessing the control’s targets and actions 访问控件的目标和操作](#accessing-the-controls-targets-and-actions-%E8%AE%BF%E9%97%AE%E6%8E%A7%E4%BB%B6%E7%9A%84%E7%9B%AE%E6%A0%87%E5%92%8C%E6%93%8D%E4%BD%9C)
    - [Triggering actions 触发操作](#triggering-actions-%E8%A7%A6%E5%8F%91%E6%93%8D%E4%BD%9C)
    - [Tracking touches and redrawing controls 跟踪触摸和重新绘制控件](#tracking-touches-and-redrawing-controls-%E8%B7%9F%E8%B8%AA%E8%A7%A6%E6%91%B8%E5%92%8C%E9%87%8D%E6%96%B0%E7%BB%98%E5%88%B6%E6%8E%A7%E4%BB%B6)
    - [Managing context menus 管理上下文菜单](#managing-context-menus-%E7%AE%A1%E7%90%86%E4%B8%8A%E4%B8%8B%E6%96%87%E8%8F%9C%E5%8D%95)
    - [Showing tooltips 显示工具提示](#showing-tooltips-%E6%98%BE%E7%A4%BA%E5%B7%A5%E5%85%B7%E6%8F%90%E7%A4%BA)
    - [UIControl.Event](#uicontrolevent)
- [System Events](#system-events)

<!-- /TOC -->

# UIControl

控件的基类，这些控件是视觉元素，可以传达响应用户交互的特定操作或意图。

控件实现按钮和滑块等元素，您的应用程序可以使用这些元素来`方便导航、收集用户输入或操作内容`。  
控件使用 `target-action` `目标操作机制向您的应用程序报告用户交互`。

您`不会直接创建此类的实例`。  
UIControl类是您扩展以实现自定义控件的子类点。  
您还可以对现有控制类进行子类，以扩展或修改其行为。例如，您可以覆盖该类的方法，以自行跟踪触摸事件或确定控件状态何时更改。  

控件的状态决定其外观和支持用户交互的能力。  
控件可以处于UIControl.State类型定义的几种状态之一。  
您可以根据应用程序的需求以编程方式更改控件的状态。例如，您可能会禁用控件，以防止用户与它交互。用户交互还可以更改控件的状态。

```swift
@MainActor class UIControl : UIView
```

# 回应用户互动

`target-action` 目标操作机制简化了您在应用程序中使用控件编写的代码。  
您`不是编写代码来跟踪触摸事件`，而是编写操作方法来响应特定于控件的事件。  
例如，您可以编写一个响应滑块值变化的操作方法。该控件处理跟踪传入的触摸事件和确定何时调用方法的所有工作。

将操作方法添加到控件时，您可以将操作方法和将该方法定义为addTarget(_:action:for:)方法的对象。（您还可以在Interface Builder中配置控件的目标和操作。）目标对象可以是任何对象，但包含控件的通常是视图控制器的根视图。如果您为目标对象指定为零，控件会在响应链中搜索定义指定操作方法的对象。
操作方法的签名采取三种形式之一。发送方参数对应于调用操作方法的控件，事件参数对应于触发控件相关事件的UIEvent对象。

```swift
@IBAction func doSomething()
@IBAction func doSomething(sender: UIButton)
@IBAction func doSomething(sender: UIButton, forEvent event: UIEvent)
```

当用户以特定方式与控件交互时，系统调用操作方法。  
UIControl.Event类型定义了控件可以报告的用户交互类型，这些交互大多与控件中的特定触摸事件相关。  
配置控件时，您必须指定哪些事件触发了方法的调用。对于按钮控件，您可以使用`touchDown`或`touchUpInside`事件来触发对操作方法的调用。  
对于滑块，您可能只关心滑块值的更改，因此您可以选择将操作方法附加到`valueChanged`事件中。

# 支持本地化

因为UIControl是一个抽象类，所以你不会专门将其国际化。然而，您确实将UIButton等子类的内容国际化。

# 使控件可访问

`默认情况下，控件可以访问`。  
为了有用，可访问的用户界面元素必须提供有关其屏幕位置、名称、行为、值和类型的准确和有用的信息。  
这是旁白与用户交谈的信息。  
失明或视力低下的用户可以依靠旁白来帮助他们使用自己的设备。

# Subclassing notes 子分类注释

子类UIControl允许您访问内置的目标操作机制和简化的事件处理支持。  
您可以对现有控件进行子分类，并通过以下两种方式之一修改其行为：

- 覆盖现有子类的sendAction(_:to:for:)方法，以观察或修改操作方法向控件相关目标的调度。您可以使用此方法修改指定对象、选择器或事件的调度行为。
- 覆盖 beginTracking(_:with:), continueTracking(_:with:), endTracking(_:with:), 和 cancelTracking(with:) 方法来跟踪控件中发生的触摸事件。您可以使用跟踪信息来执行其他操作。始终使用这些方法来跟踪触摸事件，而不是UIresponder类定义的方法。

# APi

## Configuring the control’s attributes

```swift
// 控件的状态，指定为位掩码值。
// 此属性的值是UIControl.State类型中常量的位掩码。
// 一个控件一次可以处于多个状态。例如，它可以同时聚焦和突出显示。您还可以使用此类的属性获取单个状态的值。
// struct State
// static var normal: UIControl.State 控件的正常或默认状态，即已启用，但既未选择也未突出显示。
// static var highlighted: UIControl.State 强调了控件的状态。
// static var disabled: UIControl.State 控件的禁用状态。
// static var selected: UIControl.State 控件的选定状态。
// static var focused: UIControl.State 控制的集中状态。
// static var application: UIControl.State 其他控制状态标志可供应用程序使用。
// static var reserved: UIControl.State 控制状态标志保留供内部框架使用。
var state: UIControl.State { get }

// 一个布尔值，指示控件是否处于启用状态。
// 将此属性的值设置为true以启用控件或false禁用它。
// 启用的控件能够响应用户交互，而禁用控件会忽略触摸事件，并可能以不同的方式绘制自己。
// 将此属性设置为false将禁用标志添加到控件的状态位掩码中；启用控件将再次删除该标志。
// 对于新创建的控件，此属性的默认值为true。您可以在故事板文件中设置控件的初始启用状态。
var isEnabled: Bool { get set }

// 一个布尔值，指示控件是否处于所选状态。
var isSelected: Bool { get set }

// 一个布尔值，指示控件是否绘制高亮显示。
var isHighlighted: Bool { get set }

// 控件范围内内容的垂直对齐。
// 对于包含可配置文本或图像内容的控件，请使用此属性在控件的边界内适当地对齐该内容。
// 并非所有控制子类都有可以对齐的内容，子类有责任确定如何应用此值。
// 默认值为UIControl.ContentVerticalAlignment.top。

// enum ContentVerticalAlignment : Int, @unchecked Sendable
// case center 在控件的中心垂直对齐内容。
// case top 在控件的顶部垂直对齐内容（默认值）。
// case bottom 在控件底部垂直对齐内容
// case fill 垂直对齐内容以填充内容矩形；图像可以拉伸。
var contentVerticalAlignment: UIControl.ContentVerticalAlignment { get set }

// 控件范围内内容的水平对齐。
// enum ContentHorizontalAlignment : Int, @unchecked Sendable
// case center 在控件中央水平对齐内容。
// case left 从控件左侧水平对齐内容（默认值）。
// case right 从控件右侧水平对齐内容
// case fill 水平对齐内容以填充内容矩形；文本可以包装，图像可以拉伸。
// case leading 从控件的前边缘水平对齐内容。
// case trailing 从控件的后缘水平对齐内容。
var contentHorizontalAlignment: UIControl.ContentHorizontalAlignment { get set }

// 控制目前有效的水平对齐。
var effectiveContentHorizontalAlignment: UIControl.ContentHorizontalAlignment { get }
```

## Accessing the control’s targets and actions 访问控件的目标和操作

```swift
// 将目标对象和操作方法与控件相关联。
// target 目标对象，即调用其操作方法的对象。如果您指定为，UIKit将在响应链中搜索响应指定操作消息并将消息传递给该对象的对象。
// action 标识要调用的操作方法的选择器。您可以指定一个选择器，其签名与清单1中的任何签名匹配。此参数不得为nil。
// controlEvents 指定调用操作方法的特定于控件的事件的位掩码。始终指定至少一个常量。有关可能的常量列表，请参阅UIControl.Event。
// static var touchDown: UIControl.Event 控件中的touch-down事件。
// static var touchDownRepeat: UIControl.Event 控件中的重复着陆事件；对于此事件，UITouch tapCount方法的值大于1。
// static var touchDragInside: UIControl.Event 将手指拖到控件边界内的事件。
// static var touchDragOutside: UIControl.Event 将手指拖到控件边界之外的事件。
// static var touchDragEnter: UIControl.Event 手指被拖入控件边界的事件。
// static var touchDragExit: UIControl.Event 手指从控件内拖到其边界之外的事件。
// static var touchUpInside: UIControl.Event 控件中的touch-up事件，其中手指位于控件的边界内。
// static var touchUpOutside: UIControl.Event 控件中的touch-up事件，其中手指在控件的边界之外。
// static var touchCancel: UIControl.Event 为控件取消当前触摸的系统事件。
// static var valueChanged: UIControl.Event 触摸拖动或以其他方式操作控件，导致其发出一系列不同的值。
// static var menuActionTriggered: UIControl.Event 在显示菜单之前，已触发菜单操作。
// static var primaryActionTriggered: UIControl.Event 由按钮触发的语义动作。
// static var editingDidBegin: UIControl.Event 通过输入UITextField对象的边界在UITextField对象中启动编辑会话的触摸。
// static var editingChanged: UIControl.Event 在UItextField对象中进行编辑更改的触摸。
// static var editingDidEnd: UIControl.Event 通过离开UITextField对象的边界来结束编辑会话的触摸。
// static var editingDidEndOnExit: UIControl.Event 在UItextField对象中结束编辑会话的触摸。
// static var allTouchEvents: UIControl.Event 所有触摸事件。
// static var allEditingEvents: UIControl.Event UITextField对象的所有编辑触摸。
// static var applicationReserved: UIControl.Event 一系列可用于应用程序使用的控制事件值。
// static var systemReserved: UIControl.Event 为内部框架使用保留了一系列控制事件值。
// static var allEvents: UIControl.Event 所有事件，包括系统事件。
func addTarget(Any?, action: Selector, for: UIControl.Event)

// 停止将事件传递到指定的目标对象。
func removeTarget(Any?, action: Selector?, for: UIControl.Event)

// 返回指定事件发生时对目标对象执行的操作。
// 包含相应操作方法的选择器名称的数组NSString对象，如果没有与指定目标对象和控制事件关联的操作方法，则为nil。
// 使用此方法确定针对特定控制事件对指定对象调用哪些操作方法。
// 您可以根据需要使用NSSelectorFromString(_:)函数将返回的字符串转换为有效的选择器。
func actions(forTarget: Any?, forControlEvent: UIControl.Event) -> [String]?

// 返回控件具有相关操作的事件。
// 您可以使用此方法来确定哪个控制事件触发操作。对于给定的事件，可以调用多个操作方法。
var allControlEvents: UIControl.Event { get }

// 返回与控件关联的所有目标对象。
var allTargets: Set<AnyHashable> { get }

// 在 iOS 14 及更高版本中引入的，如果你的项目目标 iOS 版本较低，可能需要使用 addTarget(_:action:for:) 方法。
func addAction(
    _ action: UIAction,
    for controlEvents: UIControl.Event
)
```

## Triggering actions 触发操作

```swift

//
func sendAction(_ action: UIAction)

// 调用指定的操作方法。
func sendAction(Selector, to: Any?, for: UIEvent?)

// 调用与指定事件关联的操作方法。
// 当您希望控件执行与指定事件关联的操作时，您可以调用此方法。
// 此方法迭代控件的注册目标和操作方法，并为与controlEvents参数中的事件关联的每个方法调用sendAction(_:to:for:)方法。
func sendActions(for: UIControl.Event)

```

## Tracking touches and redrawing controls 跟踪触摸和重新绘制控件

```swift
// 当触摸事件进入控件的边界时调用。
// 此方法的默认实现总是返回true。
// 子类可以覆盖此方法，并使用它来响应事件。
// 使用提供的事件信息来检测控件的哪个部分被击中，并设置任何初始状态信息。
// 如果您想继续跟踪触摸事件，请返回true。
// 如果您想停止跟踪触摸事件，请返回false。
func beginTracking(UITouch, with: UIEvent?) -> Bool

// 当控件的触摸事件更新时调用。
// 当触摸事件在控件的边界内跟踪时，会反复调用此方法。
// 默认实现总是返回true。
// 子类可以覆盖此方法，并根据触摸事件的更改使用它来更新其状态。
// 如果您想继续跟踪触摸事件，请返回true。如果您想停止跟踪触摸事件，请返回false。
func continueTracking(UITouch, with: UIEvent?) -> Bool

// 当与控件关联的触摸事件结束时调用。
// 此方法在控件边界内一系列触摸事件的末尾调用。
// 子类可以覆盖此方法，并使用它来执行与完成触摸序列相关的任何操作。
// 您还应该使用它来执行与跟踪事件相关的任何清理。
// 重写此方法，则必须在实现的某个时候调用super。
// 默认实现更新控件的 isTracking 属性。
func endTracking(UITouch?, with: UIEvent?)

// 告诉控件取消与指定事件相关的跟踪。
func cancelTracking(with: UIEvent?)

// 一个布尔值，指示控件当前是否正在跟踪触摸事件。
var isTracking: Bool { get }

// 一个布尔值，指示跟踪的触摸事件当前是否在控件的边界内。
var isTouchInside: Bool { get }

```

## Managing context menus 管理上下文菜单

<https://developer.apple.com/documentation/uikit/uicontrol/adding_context_menus_in_your_app>

## Showing tooltips 显示工具提示

```swift
// 要显示在控件工具提示中的默认文本。
var toolTip: String?

// 与控件关联的工具提示交互。
var toolTipInteraction: UIToolTipInteraction?

```

## UIControl.Event

```swift
// 用于响应用户按下（Touch Down）按钮或控件的操作。
// 当用户按下一个按钮或控件时，可以使用 touchDown 事件来捕捉该操作，并执行相应的代码
static var touchDown: UIControl.Event { get }

// 表示用户按住按钮并重复触发的事件类型
// 控件中的重复着陆事件；对于此事件，UITouch tapCount方法的值大于1。
static var touchDownRepeat: UIControl.Event { get }

// 将手指拖入控件边界内的事件。
// 用户在按钮内部拖动的事件类型
static var touchDragInside: UIControl.Event { get }

// 将手指拖出控件范围的事件。
static var touchDragOutside: UIControl.Event { get }

// 手指被拖入控件边界的事件。
// 仅当触摸起源于控件的边界内，退出边界，然后再次进入边界时，才会传递此事件。
static var touchDragEnter: UIControl.Event { get }

// 手指从控件内拖到其界限外的事件。
static var touchDragExit: UIControl.Event { get }

// 用户按住按钮并在按钮内部释放触摸时触发的事件类型。
static var touchUpInside: UIControl.Event { get }

// 表示用户按住按钮并在按钮外部释放触摸时触发的事件类型。
static var touchUpOutside: UIControl.Event { get }

// 取消当前控制触摸的系统事件。
static var touchCancel: UIControl.Event { get }

// 触摸拖动或以其他方式操作控件，使其发出一系列不同的值。
// 表示用户修改控件的值时触发的事件类型。
static var valueChanged: UIControl.Event { get }

// 在显示菜单之前已触发菜单操作。
// iOS 14.0+
// 表示当用户选择菜单项时触发的事件类型。
static var menuActionTriggered: UIControl.Event { get }

// 由按钮触发的语义动作。
// 表示用户触发控件的主要操作时的事件类型
static var primaryActionTriggered: UIControl.Event { get }

// 通过输入其边界在文本字段中启动编辑会话的触摸。
// 表示用户开始编辑控件时触发的事件类型。
// 当用户开始编辑文本框时，textFieldEditingDidBegin(_:) 方法将被调用
static var editingDidBegin: UIControl.Event { get }

// 在文本字段中进行编辑更改的触摸。
static var editingChanged: UIControl.Event { get }

// 通过留下边界来结束文本字段中的编辑会话的触摸。
// 表示当用户结束编辑控件时触发的事件类型。
static var editingDidEnd: UIControl.Event { get }

// 在文本字段中结束编辑会话的触摸。
// 表示当用户在编辑控件中按下返回键并释放时触发的事件类型。
static var editingDidEndOnExit: UIControl.Event { get }

// 所有触摸事件。
// 表示控件接收到所有触摸事件时触发的事件类型。
static var allTouchEvents: UIControl.Event { get }

// 文本字段的所有编辑触摸。
static var allEditingEvents: UIControl.Event { get }

// 可供应用程序使用的一系列控制事件值。
static var applicationReserved: UIControl.Event { get }

// 为内部框架使用保留的一系列控制事件值。
static var systemReserved: UIControl.Event { get }

// 所有事件，包括系统事件。
static var allEvents: UIControl.Event { get }
```

# System Events

- 启动和终止事件：操作系统通知应用程序启动或终止的事件，典型的例子是应用程序启动时会触发启动事件，而应用程序被关闭时会触发终止事件。
- 设备状态变化事件：当设备状态发生变化时触发的事件，例如电池电量变化、网络连接状态变化、设备旋转等。
- 系统警告和错误事件：操作系统通知应用程序有警告或错误发生的事件，例如内存不足、权限被拒绝等。
- 定时触发事件：操作系统提供的定时器或定时任务，可以触发特定时间间隔或特定时间点的事件。
- 系统通知和推送事件：当操作系统接收到新的通知或推送消息时触发的事件，应用程序可以监听并处理这些消息。
