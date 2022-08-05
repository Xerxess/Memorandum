<!-- TOC -->

- [UIViewController](#uiviewcontroller)
- [子分类注释](#子分类注释)
- [管理视图](#管理视图)
- [Handle view-related notifications 处理与视图相关的通知](#handle-view-related-notifications-处理与视图相关的通知)
- [Handle view rotations 处理视图旋转](#handle-view-rotations-处理视图旋转)
- [Implement a container view controller 实现容器视图控制器](#implement-a-container-view-controller-实现容器视图控制器)
- [Manage memory 管理内存](#manage-memory-管理内存)
- [Support state preservation and restoration 支持国家保护和恢复](#support-state-preservation-and-restoration-支持国家保护和恢复)
- [API](#api)
    - [Creating a view controller](#creating-a-view-controller)
    - [Getting the storyboard and nib information 获取故事板和笔尖信息](#getting-the-storyboard-and-nib-information-获取故事板和笔尖信息)
    - [Managing the view 管理视图](#managing-the-view-管理视图)
    - [Responding to view-related events  回应视图相关事件](#responding-to-view-related-events--回应视图相关事件)
    - [Extending the view's safe area 扩展视图的安全区域](#extending-the-views-safe-area-扩展视图的安全区域)
    - [Managing the view's margins 管理视图的边距](#managing-the-views-margins-管理视图的边距)
    - [Configuring the view’s layout behavior 配置视图的布局行为](#configuring-the-views-layout-behavior-配置视图的布局行为)
    - [Configuring the view rotation settings 配置视图旋转设置](#configuring-the-view-rotation-settings-配置视图旋转设置)
    - [Performing segues](#performing-segues)
    - [Presenting a view controller 展示视图控制器(模态呈现视图)](#presenting-a-view-controller-展示视图控制器模态呈现视图)

<!-- /TOC -->

# UIViewController

管理UIKit应用程序视图层次结构的对象。

UIViewController类定义了所有视图控制器共有的共享行为。您很`少直接创建UIViewController类的实例`。相反，您对UIViewController进行子类，并添加管理视图控制器视图层次结构所需的方法和属性。

视图控制器的主要职责包括：

* 更新视图的内容，通常是为了响应基础数据的变化
* 用视图响应用户交互
* 调整视图大小和管理整体界面的布局
* 与应用程序中的其他对象（包括其他视图控制器）协调

视图控制器与其管理的视图紧密绑定，并参与处理其视图层次结构中的事件。  
具体来说，视图控制器是`UIResponder`对象，并插入视图控制器的根视图和该视图的超级视图之间的响应器链中，该视图通常属于不同的视图控制器。  
如果视图控制器的视图都不处理事件，则视图控制器可以选择处理事件或将其传递给超级视图。

视图控制器`很少单独使用`。   
通常使用多个视图控制器，每个控制器都拥有应用程序用户界面的一部分。

```swift
@MainActor class UIViewController : UIResponder
```

# 子分类注释

每个应用程序`至少包含一个UIViewController的自定义子类`。  
更常见的是，应用程序包含许多自定义视图控制器。

# 管理视图

`每个视图控制器管理一个视图层次结构`，其根视图存储在此类的视图属性中。  
根视图主要充当视图层次结构其余部分的容器。  
根视图的`大小和位置由拥有它的对象决定，该对象要么是父视图控制器，要么是应用程序的窗口`。  
`窗口拥有的视图控制器是应用程序的根视图控制器，其视图大小以填充窗口。`


有几种方法可以指定视图控制器的视图：

* 在应用程序的`故事板中指定视图控制器及其视图`。故事板是指定视图的首选方式。使用故事板，您可以指定视图及其与视图控制器的连接。您还指定视图控制器之间的关系和语序，这样可以更轻松地查看和修改应用程序的行为。
* 要从故事板加载视图控制器，请调用相应UIStoryboard对象的instaniateViewController（withIdentifier:）方法。故事板对象创建视图控制器并将其返回到您的代码中。
* 使用nib文件指定视图控制器的视图。笔尖文件允许您指定单个视图控制器的视图，但不允许您定义视图控制器之间的语序或关系。笔尖文件还只存储有关视图控制器本身的最小信息。
* 要使用nib文件初始化视图控制器对象，请以编程方式创建视图控制器类，并使用init(nibName:bundle:)方法初始化它。当请求其视图时，视图控制器会从笔尖文件中加载它们。
* `使用loadView()方法指定视图控制器的视图`。在该方法中，以编程方式创建视图层次结构，并将该层次结构的根视图分配给视图控制器的视图属性。

`视图控制器的根视图的大小总是适合其分配的空间`。  
对于视图层次结构中的其他视图，请使用Interface Builder指定自动布局约束，这些约束决定了每个视图在其超级视图范围内的位置和大小。您还可以以编程方式创建约束，并在适当的时候将其添加到您的视图中。有关如何创建约束的更多信息，请参阅自动布局指南。

https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/index.html#//apple_ref/doc/uid/TP40010853

# Handle view-related notifications 处理与视图相关的通知

当视图的可见性发生变化时，视图控制器会自动调用自己的方法，以便子类可以响应更改。  
使用`viewWillAppear（_:）`等方法准备视图显示在屏幕上，并使用viewWillDisappear（_:）保存更改或其他状态信息。使用其他方法进行适当的更改。

# Handle view rotations 处理视图旋转

`从iOS 8中，所有与轮换相关的方法都不建议使用`。  
相反，旋转被视为视图控制器视图大小的变化，因此使用`viewWillTransition（to:with:）`方法报告。  
当界面方向发生变化时，UIKit在窗口的根视图控制器上调用此方法。然后，该视图控制器通知其子视图控制器，在整个视图控制器层次结构中传播消息。

# Implement a container view controller 实现容器视图控制器

`自定义UIViewController子类也可以充当容器视图控制器`。  
容器视图控制器管理其拥有的其他视图控制器内容的呈现，也称为其子视图控制器。  
子视图可以按原样显示，也可以与容器视图控制器拥有的视图一起显示。

`您的容器视图控制器子类应该声明一个公共接口来关联其子接口`。  
这些方法的性质取决于您，并取决于您正在创建的容器的语义。  
您需要决定视图控制器可以同时显示多少个子控件，何时显示这些子控件，以及它们在视图控制器的视图层次结构中显示在哪里。  
您的视图控制器类定义了哪些关系（如果有的话）由子共享。  
通过为您的容器建立一个干净的公共接口，您可以确保 children 在逻辑上使用其功能，而无需访问太多关于容器如何实现该行为的私有详细信息。

在将子视图控制器添加到视图层次结构之前，您的容器视图控制器必须将子视图控制器与自身相关联。  
这允许iOS正确地将事件路由到子视图控制器和这些控制器管理的视图。  
同样，在从视图层次结构中删除子视图后，它应该断开该子视图控制器与自身的连接。  
要建立或破坏这些关联，您的容器调用基类定义的特定方法。这些方法不打算由容器类的客户端调用；它们仅供容器的实现使用，以提供预期的遏制行为。

以下是您可能需要调用的基本方法：
addChild(_:)  
removeFromParent()  
willMove(toParent:)    
didMove(toParent:)  

# Manage memory 管理内存

内存是iOS中的关键资源，视图控制器提供内置支持，以减少关键时刻的内存占用。  
UIViewController类通过其didReceiveMemoryWarning()方法对低内存条件进行一些自动处理，`该方法释放不需要的内存`。

# Support state preservation and restoration 支持国家保护和恢复

如果您为视图控制器的 restorationIdentifier 属性分配值，系统可能会要求视图控制器在应用程序过渡到后台时自行编码。  
保留后，视图控制器保留其视图层次结构中具有恢复标识符的任何视图的状态。  
查看控制器不会自动保存任何其他状态。如果您正在实现自定义容器视图控制器，则必须自己对任何子视图控制器进行编码。  
`您编码的每个孩子都必须有一个唯一的恢复标识符。`

https://developer.apple.com/documentation/uikit/uiscenedelegate/restoring_your_app_s_state

# API

## Creating a view controller

```swift
init(nibName: String?, bundle: Bundle?)
init?(coder: NSCoder)
```

## Getting the storyboard and nib information 获取故事板和笔尖信息

```swift
var storyboard: UIStoryboard?
var nibName: String?
var nibBundle: Bundle?
```

## Managing the view 管理视图

```swift
// 控制器管理的视图。
var view: UIView!

// 视图控制器的视图，如果视图尚未加载，则为零。
var viewIfLoaded: UIView?

// 一个布尔值，指示视图当前是否加载到内存中。
var isViewLoaded: Bool

// 创建控制器管理的视图。
// 您永远不应该直接调用此方法。
// 当请求其视图属性但当前为零时，视图控制器会调用此方法。
// 此方法加载或创建视图并将其分配给视图属性。

// 如果视图控制器具有关联的nib文件，此方法将从nib文件中加载视图。如果nibName属性返回非零值，则视图控制器具有关联的nib文件，如果视图控制器从故事板实例化，如果您使用init（nibName:bundle:）方法显式为其分配了nib文件，或者iOS在应用程序包中找到基于视图控制器的类名名称的nib文件，则会发生这种情况。如果视图控制器没有关联的nib文件，则此方法将创建一个普通的UIView对象。

// 如果您使用Interface Builder创建视图并初始化视图控制器，则不得覆盖此方法。

// 您可以重写此方法，以便手动创建视图。如果您选择这样做，请将视图层次结构的根视图分配给视图属性。
// 您创建的视图应该是唯一的实例，不应与任何其他视图控制器对象共享。您对这种方法的自定义实现`不应调用super`。
// 如果您想对视图执行任何额外的初始化，请在viewDidLoad()方法中执行。
func loadView()


// 在控制器的视图加载到内存中后调用。
// 此方法在视图控制器将其视图层次结构加载到内存后调用。
// 无论视图层次结构是从nib文件中加载还是在loadView()方法中以编程方式创建，都会调用此方法。
// 您通常覆盖此方法，对从nib文件加载的视图执行额外的初始化。
func viewDidLoad()

// 如果视图控制器尚未加载，则加载视图。
// 调用此方法将从其故事板文件中加载视图控制器的视图，或根据既定规则根据需要创建视图。
func loadViewIfNeeded()

// 表示此控制器管理视图的本地化字符串。
var title: String?

// 视图控制器视图的首选大小。
// 此属性中的值主要用于在弹出窗口中显示视图控制器的内容，但也可用于其他情况。  
// 在弹出窗口中显示视图控制器时更改此属性的值会为大小变化添加动画效果；但是，如果您指定宽度或高度为0.0，则更改不会动画。
var preferredContentSize: CGSize

```

## Responding to view-related events  回应视图相关事件

```swift
// 通知视图控制器，其视图即将添加到视图层次结构中。
// 在视图控制器的视图即将添加到视图层次结构之前，以及在配置任何动画以显示视图之前，会调用此方法。  
// 您可以覆盖此方法来执行与显示视图相关的自定义任务。
// 例如，您可以使用此方法更改状态栏的方向或样式，以与呈现视图的方向或样式相协调。
// 如果您重写此方法，则必须在实现的某个时候调用super。
func viewWillAppear(Bool)

// 通知视图控制器其视图已添加到视图层次结构中。
// 您可以覆盖此方法来执行与显示视图相关的其他任务。
// 如果您重写此方法，则必须在实现的某个时候调用super。
func viewDidAppear(Bool)

// 通知视图控制器其视图即将从视图层次结构中删除。
// 调用此方法是为了响应从视图层次结构中删除的视图。
// 在实际删除视图之前和配置任何动画之前，会调用此方法。
// 子类可以覆盖此方法，并使用它来提交编辑更改，撤销视图的第一响应器状态，或执行其他相关任务。
// 例如，您可以使用此方法恢复首次显示视图时在viewDidAppear(_:)方法中对状态栏的方向或样式所做的更改。
// 如果您重写此方法，则必须在实现的某个时候调用super。
func viewWillDisappear(Bool)

// 通知视图控制器其视图已从视图层次结构中删除。
// 您可以重写此方法来执行与关闭或隐藏视图相关的其他任务。
// 如果您重写此方法，则必须在实现的某个时候调用super。
func viewDidDisappear(Bool)

// 一个布尔值，指示视图控制器是否被关闭。
var isBeingDismissed: Bool { get }

// 一个布尔值，指示视图控制器是否显示。
var isBeingPresented: Bool { get }

// 一个布尔值，指示视图控制器是否从父视图控制器移动。
var isMovingFromParent: Bool { get }

// 一个布尔值，指示视图控制器是否移动到父视图控制器。
var isMovingToParent: Bool { get }
```

## Extending the view's safe area 扩展视图的安全区域

```swift
// 您指定的自定义嵌入，以修改视图控制器的安全区域。
// 使用此属性按指定数量调整此视图控制器视图的安全区域设置。
// 安全区域定义了视图控制器可见区域中保证不受系统状态栏或祖先提供的视图（如导航栏）遮挡的部分。
// 您可以使用此属性来扩展安全区域，以在界面中包含自定义内容。例如，绘图应用程序可能会使用此属性，以避免在工具调色板下显示内容。
var additionalSafeAreaInsets: UIEdgeInsets { get set }

// 调用以通知视图控制器其根视图的安全区域设置已更改。
// 使用此方法更新您的界面，以适应新的安全区域。
// UIKit会根据系统栏的大小变化或当您修改视图控制器的其他安全区域设置时更新安全区域。UIKit 还会在您的视图出现在屏幕上之前立即调用此方法。
func viewSafeAreaInsetsDidChange()

```

## Managing the view's margins 管理视图的边距

```swift
// 一个布尔值，指示视图控制器的视图是否使用系统定义的最小布局边距。
// 当此属性的值为true时，保证根视图的布局边距不小于systemMinimumLayoutMargins属性中的值。
// 默认值为true。
// 将此属性更改为false会导致视图仅从其定向布局保证金属性中获得其边距。
// 将该属性中的边距设置为0，您可以完全消除视图的边距。
var viewRespectsSystemMinimumLayoutMargins: Bool { get set }

// 视图控制器根视图的最小布局边距。
// 此属性包含系统期望的视图控制器根视图的最小布局边距。
// 不要覆盖此属性。
// 要停止考虑系统对根视图的最小布局边距，请将viewRespectsSystemMinimumLayoutMargins属性设置为false。此属性不影响与根视图子视图关联的边距。
// 如果您为视图控制器根视图的定向布局边缘属性分配自定义值，则根视图的实际边距将设置为您的自定义值或此属性定义的最小值，以值较大者为准。例如，如果一个系统最小边距的值为20点，并且您在视图上为同一边距指定值为10，则视图使用值20作为边距。
var systemMinimumLayoutMargins: NSDirectionalEdgeInsets { get }

// 调用以通知视图控制器其根视图的布局边距发生了变化。
func viewLayoutMarginsDidChange()

```

## Configuring the view’s layout behavior 配置视图的布局行为

```swift
// 您为视图控制器扩展的边缘
// struct UIRectEdge 可以同时指定多个边。
// static var top: UIRectEdge 矩形的顶部边缘。
// static var left: UIRectEdge 矩形的左边缘。
// static var bottom: UIRectEdge 矩形的底部边缘。
// static var right: UIRectEdge 矩形的右边缘。
// static var all: UIRectEdge 长方形的所有边缘。
var edgesForExtendedLayout: UIRectEdge

// 布尔值，指示扩展布局是否包含不透明条
// 默认值为false。
var extendedLayoutIncludesOpaqueBars: Bool { get set }

// 调用以通知视图控制器其视图即将布局其子视图。
// 当视图的边界发生变化时，视图会调整其子视图的位置。
// 您的视图控制器可以覆盖此方法，以便在视图布局其子视图之前进行更改。
// 此方法的默认实现无。
func viewWillLayoutSubviews()

// 调用以通知视图控制器其视图刚刚布局其子视图。
// 当视图控制器视图的边界发生变化时，视图会调整其子视图的位置，然后系统调用此方法。
// 然而，调用此方法并不表示视图子视图的单个布局已调整。每个子视图负责调整自己的布局。
// 您的视图控制器可以覆盖此方法，以便在视图布局其子视图后进行更改。
// 此方法的默认实现无。
func viewDidLayoutSubviews()

// 当视图控制器的视图需要更新其约束时调用。
// 覆盖此方法以优化对约束的更改。
// 要安排更改，请在视图上调用setNeedsUpdateConstraints()。
// 然后，系统在布局发生之前调用您对updateViewConstraints()的实现。
// 这允许您验证在您的属性没有更改时，内容的所有必要约束是否到位。
// 您的实施必须尽可能高效。不要停用所有约束，然后重新激活您需要的约束。
// 相反，您的应用程序必须有某种方法来跟踪您的约束，并在每次更新通行证期间对其进行验证。
// 仅更改需要更改的项目。在每次更新通过期间，您必须确保对应用程序的当前状态有适当的约束。
// 不要在实现中调用setNeedsUpdateConstraints()。
// 调用setNeedsUpdateConstraints（）安排另一个更新通过，创建一个反馈循环。
func updateViewConstraints()

```

## Configuring the view rotation settings 配置视图旋转设置

```swift
// 视图控制器支持的接口方向。
// struct UIInterfaceOrientationMask
// static var portrait: UIInterfaceOrientationMask 
// static var landscapeLeft: UIInterfaceOrientationMask 视图控制器支持横向左界面方向。
// static var landscapeRight: UIInterfaceOrientationMask 视图控制器支持横向右界面方向。
// static var portraitUpsideDown: UIInterfaceOrientationMask 视图控制器支持倒置纵向界面方向。
// static var landscape: UIInterfaceOrientationMask 视图控制器支持横向左和横向右界面方向。
// static var all: UIInterfaceOrientationMask 视图控制器支持所有接口方向。
// static var allButUpsideDown: UIInterfaceOrientationMask 视图控制器支持除倒置纵向界面方向以外的所有内容。
var supportedInterfaceOrientations: UIInterfaceOrientationMask { get }

// 展示视图控制器时使用的界面方向。
// 系统在全屏显示视图控制器时调用此方法。
// 当您的视图控制器支持两个或多个方向，但内容在其中一个方向中显示得最好时，请覆盖此方法并返回首选方向。
// 如果您的视图控制器实现了此方法，则视图控制器的视图将显示在首选方向上（尽管以后可以旋转到另一个受支持的旋转）。
// 如果您不实现此方法，系统将使用状态栏的当前方向显示视图控制器。
// enum UIInterfaceOrientation : Int, @unchecked Sendable
// case unknown 设备的方向不详。
// case portrait 设备处于纵向模式，设备直立，主屏幕按钮位于底部。
// case portraitUpsideDown 设备处于纵向模式，但颠倒置，设备直立，主屏幕按钮位于顶部。
// case landscapeLeft 设备处于横向模式，设备直立，主屏幕按钮位于左侧。
// case landscapeRight 设备处于横向模式，设备直立，主屏幕按钮位于右侧。
var preferredInterfaceOrientationForPresentation: UIInterfaceOrientation

// 将支持的界面方向或演示文稿首选界面方向的变化通知视图控制器。
// ios16
func setNeedsUpdateOfSupportedInterfaceOrientations()

```

## Performing segues 

```swift
// 确定是否应执行具有指定标识符的segue。
// 子类可以重写此方法，并使用它根据当前条件执行segues。如果您不实现此方法，则执行所有语义。
func shouldPerformSegue(withIdentifier: String, sender: Any?) -> Bool

// 通知视图控制器即将执行segue。
func prepare(for: UIStoryboardSegue, sender: Any?)

// 从当前视图控制器的故事板文件中使用指定的标识符启动segue。
func performSegue(withIdentifier: String, sender: Any?)

// 返回一个子视图控制器数组，以搜索解开segue目的地。
func allowedChildrenForUnwinding(from: UIStoryboardUnwindSegueSource) -> [UIViewController]

// 返回包含展开segue源的子视图控制器。
func childContaining(UIStoryboardUnwindSegueSource) -> UIViewController?

// 调用视图控制器以确定它是否响应解压操作。
func canPerformUnwindSegueAction(Selector, from: UIViewController, sender: Any?) -> Bool

//  当解开的segue过渡到新的视图控制器时调用。
func unwind(for: UIStoryboardSegue, towards: UIViewController)

```

## Presenting a view controller 展示视图控制器(模态呈现视图)

```swift
// 在主上下文中呈现视图控制器。
// 您使用此方法将显示视图控制器的需求与在屏幕上实际显示该视图控制器的过程脱钩。
// 使用此方法，视图控制器不需要知道它是嵌入在导航控制器还是拆分视图控制器中。它为两者调用相同的方法。UISplitViewController和UINavigationController类覆盖此方法，并根据其设计处理演示文稿。
// 例如，导航控制器覆盖此方法，并使用它将vc推送到其导航堆栈上。
// 此方法的默认实现调用targetViewController（forAction:sender:）方法来定位覆盖此方法的视图控制器层次结构中的对象。然后，它调用该目标对象上的方法，该方法以适当的方式显示视图控制器。如果targetViewController（forAction:sender:）方法返回nil，则此方法使用窗口的根视图控制器以模态呈现vc。
// 您可以在自定义视图控制器中覆盖此方法，以自己显示vc。使用此方法在主要上下文中显示vc。例如，容器视图控制器可能会使用此方法来替换其主子控制器。您的实现应该使其行为适应常规和紧凑的环境。
func show(UIViewController, sender: Any?)

// 在次要（或细节）上下文中呈现视图控制器。
// 您使用此方法将显示视图控制器的需求与在屏幕上实际显示该视图控制器的过程脱钩。
// 使用此方法，视图控制器不需要知道它是嵌入在导航控制器还是拆分视图控制器中。它为两者调用相同的方法。在常规环境中，UISplitViewController类覆盖此方法并安装vc作为其详细视图控制器；在紧凑的环境中，拆分视图控制器对该方法的实现将调用show(_:sender:)。
// 此方法的默认实现调用targetViewController（forAction:sender:）方法来定位覆盖此方法的视图控制器层次结构中的对象。然后，它调用该目标对象上的方法，该方法以适当的方式显示视图控制器。如果targetViewController（forAction:sender:）方法返回nil，则此方法使用窗口的根视图控制器以模态呈现vc。
// 您可以在自定义视图控制器中覆盖此方法，以自己显示vc。使用此方法在次要上下文中显示vc。例如，容器视图控制器可能会使用此方法来替换其辅助子控制器。您的实现应该使其行为适应常规和紧凑的环境。
func showDetailViewController(UIViewController, sender: Any?)

// 以模态呈现视图控制器。
// 在水平规则环境中，视图控制器以modalPresentationStyle属性指定的样式呈现。
// 在水平紧凑的环境中，默认情况下，视图控制器显示为全屏。如果您将自适应委托与viewControllerToPresent中与对象关联的演示文稿控制器相关联，则可以动态修改演示文稿样式。
// 您调用此方法的对象可能并不总是处理演示文稿的对象。每种演示风格都有不同的规则来指导其行为。例如，全屏演示文稿必须由本身覆盖整个屏幕的视图控制器进行。如果当前视图控制器无法满足请求，它会将请求从视图控制器层次结构上转发到最近的父级，然后父级可以处理或转发请求。
// 在显示视图控制器之前，此方法根据演示样式调整显示视图控制器视图的大小。对于大多数演示样式，然后使用呈现视图控制器的modalTransitionStyle属性中的过渡样式在屏幕上动画生成的视图。对于自定义演示文稿，视图使用呈现的视图控制器的过渡委托在屏幕上进行动画。对于当前上下文演示文稿，视图可以使用当前视图控制器的过渡样式在屏幕上进行动画。
// 在呈现的视图控制器上调用viewDidAppear(_:)方法后，调用完成处理程序。
func present(UIViewController, animated: Bool, completion: (() -> Void)?)


// 关闭视图控制器模态呈现的视图控制器。
func dismiss(animated: Bool, completion: (() -> Void)?)

// 模态视图控制器的演示风格
// 演示风格定义了系统如何呈现模态视图控制器。
// 该系统仅在正则宽度大小的类中使用此值。在紧凑宽度的类中，一些样式具有其他样式的行为。
// 您可以通过实现自适应PresentationStyle（for:traitCollection:）方法来影响此行为。
// 演示风格也会影响模态视图控制器的内容大小。例如，UIModalPresentationStyle.pageSheet使用系统提供的显式大小。相比之下，UIModalPresentationStyle.formSheet使用视图控制器的首选ContentSize属性，您可以对其进行设置。
// 默认值为UIModalPresentationStyle.automatic。
// enum UIModalPresentationStyle : Int, @unchecked Sendable
// case automatic 系统选择的默认演示样式。
// case none 一种表明不应进行调整的演示风格。
// case fullScreen 呈现视图覆盖屏幕的演示文稿样式。
// case pageSheet 部分涵盖基础内容的演示风格。
// case formSheet 显示屏幕居中内容的演示文稿样式。
// case currentContext 一种演示文稿样式，内容显示在另一个视图控制器的内容上。
// case custom 由自定义演示控制器和一个或多个自定义动画师对象管理的自定义视图演示样式。
// case overFullScreen 呈现视图覆盖屏幕的视图呈现样式。
// case overCurrentContext 一种演示文稿样式，内容显示在另一个视图控制器的内容上。
// case popover 一种演示文稿样式，内容显示在弹出窗口视图中。
// case blurOverFullScreen 在全屏演示文稿中显示新内容之前模糊底层内容的演示风格。
var modalPresentationStyle: UIModalPresentationStyle { get set }

```
