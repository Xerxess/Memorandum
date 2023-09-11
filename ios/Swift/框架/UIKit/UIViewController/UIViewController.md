<!-- TOC -->

- [UIViewController](#uiviewcontroller)
- [子分类注释](#%E5%AD%90%E5%88%86%E7%B1%BB%E6%B3%A8%E9%87%8A)
- [管理视图](#%E7%AE%A1%E7%90%86%E8%A7%86%E5%9B%BE)
- [Handle view-related notifications 处理与视图相关的通知](#handle-view-related-notifications-%E5%A4%84%E7%90%86%E4%B8%8E%E8%A7%86%E5%9B%BE%E7%9B%B8%E5%85%B3%E7%9A%84%E9%80%9A%E7%9F%A5)
- [Handle view rotations 处理视图旋转](#handle-view-rotations-%E5%A4%84%E7%90%86%E8%A7%86%E5%9B%BE%E6%97%8B%E8%BD%AC)
- [Implement a container view controller 实现容器视图控制器](#implement-a-container-view-controller-%E5%AE%9E%E7%8E%B0%E5%AE%B9%E5%99%A8%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8)
- [Manage memory 管理内存](#manage-memory-%E7%AE%A1%E7%90%86%E5%86%85%E5%AD%98)
- [Support state preservation and restoration 支持国家保护和恢复](#support-state-preservation-and-restoration-%E6%94%AF%E6%8C%81%E5%9B%BD%E5%AE%B6%E4%BF%9D%E6%8A%A4%E5%92%8C%E6%81%A2%E5%A4%8D)
- [API](#api)
    - [Creating a view controller](#creating-a-view-controller)
    - [Getting the storyboard and nib information 获取故事板和笔尖信息](#getting-the-storyboard-and-nib-information-%E8%8E%B7%E5%8F%96%E6%95%85%E4%BA%8B%E6%9D%BF%E5%92%8C%E7%AC%94%E5%B0%96%E4%BF%A1%E6%81%AF)
    - [Managing the view 管理视图](#managing-the-view-%E7%AE%A1%E7%90%86%E8%A7%86%E5%9B%BE)
    - [Responding to view-related events  回应视图相关事件](#responding-to-view-related-events--%E5%9B%9E%E5%BA%94%E8%A7%86%E5%9B%BE%E7%9B%B8%E5%85%B3%E4%BA%8B%E4%BB%B6)
    - [Extending the view's safe area 扩展视图的安全区域](#extending-the-views-safe-area-%E6%89%A9%E5%B1%95%E8%A7%86%E5%9B%BE%E7%9A%84%E5%AE%89%E5%85%A8%E5%8C%BA%E5%9F%9F)
    - [Managing the view's margins 管理视图的边距](#managing-the-views-margins-%E7%AE%A1%E7%90%86%E8%A7%86%E5%9B%BE%E7%9A%84%E8%BE%B9%E8%B7%9D)
    - [Configuring the view’s layout behavior 配置视图的布局行为](#configuring-the-views-layout-behavior-%E9%85%8D%E7%BD%AE%E8%A7%86%E5%9B%BE%E7%9A%84%E5%B8%83%E5%B1%80%E8%A1%8C%E4%B8%BA)
    - [Configuring the view rotation settings 配置视图旋转设置](#configuring-the-view-rotation-settings-%E9%85%8D%E7%BD%AE%E8%A7%86%E5%9B%BE%E6%97%8B%E8%BD%AC%E8%AE%BE%E7%BD%AE)
    - [Performing segues](#performing-segues)
    - [Presenting a view controller 展示视图控制器模态呈现视图](#presenting-a-view-controller-%E5%B1%95%E7%A4%BA%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8%E6%A8%A1%E6%80%81%E5%91%88%E7%8E%B0%E8%A7%86%E5%9B%BE)
    - [Adding a custom transition or presentation 添加自定义过渡或演示文稿](#adding-a-custom-transition-or-presentation-%E6%B7%BB%E5%8A%A0%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E6%88%96%E6%BC%94%E7%A4%BA%E6%96%87%E7%A8%BF)
    - [Adapting to environment changes  适应环境变化](#adapting-to-environment-changes--%E9%80%82%E5%BA%94%E7%8E%AF%E5%A2%83%E5%8F%98%E5%8C%96)
    - [Adjusting the interface style 调整界面样式](#adjusting-the-interface-style-%E8%B0%83%E6%95%B4%E7%95%8C%E9%9D%A2%E6%A0%B7%E5%BC%8F)
    - [Managing child view controllers in a custom container 在自定义容器中管理子视图控制器](#managing-child-view-controllers-in-a-custom-container-%E5%9C%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8%E4%B8%AD%E7%AE%A1%E7%90%86%E5%AD%90%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8)
    - [Responding to containment events 应对遏制事件](#responding-to-containment-events-%E5%BA%94%E5%AF%B9%E9%81%8F%E5%88%B6%E4%BA%8B%E4%BB%B6)
    - [Getting other related view controllers 获取其他相关视图控制器](#getting-other-related-view-controllers-%E8%8E%B7%E5%8F%96%E5%85%B6%E4%BB%96%E7%9B%B8%E5%85%B3%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8)
    - [Configuring a navigation interface 配置导航界面](#configuring-a-navigation-interface-%E9%85%8D%E7%BD%AE%E5%AF%BC%E8%88%AA%E7%95%8C%E9%9D%A2)
    - [Configuring tab bar content 配置标签栏内容](#configuring-tab-bar-content-%E9%85%8D%E7%BD%AE%E6%A0%87%E7%AD%BE%E6%A0%8F%E5%86%85%E5%AE%B9)
    - [Working with scrolling content 处理滚动内容](#working-with-scrolling-content-%E5%A4%84%E7%90%86%E6%BB%9A%E5%8A%A8%E5%86%85%E5%AE%B9)
    - [Supporting app extensions 支持应用程序扩展](#supporting-app-extensions-%E6%94%AF%E6%8C%81%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%89%A9%E5%B1%95)
    - [Coordinating with system gestures 与系统手势协调](#coordinating-with-system-gestures-%E4%B8%8E%E7%B3%BB%E7%BB%9F%E6%89%8B%E5%8A%BF%E5%8D%8F%E8%B0%83)
    - [Working with focus 专注地工作](#working-with-focus-%E4%B8%93%E6%B3%A8%E5%9C%B0%E5%B7%A5%E4%BD%9C)
    - [Managing pointer lock state 管理指针锁定状态](#managing-pointer-lock-state-%E7%AE%A1%E7%90%86%E6%8C%87%E9%92%88%E9%94%81%E5%AE%9A%E7%8A%B6%E6%80%81)
    - [Managing the status bar 管理状态栏](#managing-the-status-bar-%E7%AE%A1%E7%90%86%E7%8A%B6%E6%80%81%E6%A0%8F)
    - [Managing the Touch Bar 管理触控栏](#managing-the-touch-bar-%E7%AE%A1%E7%90%86%E8%A7%A6%E6%8E%A7%E6%A0%8F)
    - [Accessing the available key commands 访问可用的键盘命令](#accessing-the-available-key-commands-%E8%AE%BF%E9%97%AE%E5%8F%AF%E7%94%A8%E7%9A%84%E9%94%AE%E7%9B%98%E5%91%BD%E4%BB%A4)
    - [Adding editing behaviors to your view controller 将编辑行为添加到视图控制器中](#adding-editing-behaviors-to-your-view-controller-%E5%B0%86%E7%BC%96%E8%BE%91%E8%A1%8C%E4%B8%BA%E6%B7%BB%E5%8A%A0%E5%88%B0%E8%A7%86%E5%9B%BE%E6%8E%A7%E5%88%B6%E5%99%A8%E4%B8%AD)
    - [Handling memory warnings 处理内存警告](#handling-memory-warnings-%E5%A4%84%E7%90%86%E5%86%85%E5%AD%98%E8%AD%A6%E5%91%8A)
    - [Managing state restoration 管理恢复](#managing-state-restoration-%E7%AE%A1%E7%90%86%E6%81%A2%E5%A4%8D)
    - [Supporting Swift Playgrounds](#supporting-swift-playgrounds)
    - [Logging user interaction intervals 记录用户交互间隔](#logging-user-interaction-intervals-%E8%AE%B0%E5%BD%95%E7%94%A8%E6%88%B7%E4%BA%A4%E4%BA%92%E9%97%B4%E9%9A%94)

<!-- /TOC -->

# UIViewController

管理UIKit应用程序视图层次结构的对象。

UIViewController类定义了所有视图控制器共有的共享行为。您很`少直接创建UIViewController类的实例`。相反，您对UIViewController进行子类，并添加管理视图控制器视图层次结构所需的方法和属性。

视图控制器的主要职责包括：

- 更新视图的内容，通常是为了响应基础数据的变化
- 用视图响应用户交互
- 调整视图大小和管理整体界面的布局
- 与应用程序中的其他对象（包括其他视图控制器）协调

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

- 在应用程序的`故事板中指定视图控制器及其视图`。故事板是指定视图的首选方式。使用故事板，您可以指定视图及其与视图控制器的连接。您还指定视图控制器之间的关系和语序，这样可以更轻松地查看和修改应用程序的行为。
- 要从故事板加载视图控制器，请调用相应UIStoryboard对象的instaniateViewController（withIdentifier:）方法。故事板对象创建视图控制器并将其返回到您的代码中。
- 使用nib文件指定视图控制器的视图。笔尖文件允许您指定单个视图控制器的视图，但不允许您定义视图控制器之间的语序或关系。笔尖文件还只存储有关视图控制器本身的最小信息。
- 要使用nib文件初始化视图控制器对象，请以编程方式创建视图控制器类，并使用init(nibName:bundle:)方法初始化它。当请求其视图时，视图控制器会从笔尖文件中加载它们。
- `使用loadView()方法指定视图控制器的视图`。在该方法中，以编程方式创建视图层次结构，并将该层次结构的根视图分配给视图控制器的视图属性。

`视图控制器的根视图的大小总是适合其分配的空间`。  
对于视图层次结构中的其他视图，请使用Interface Builder指定自动布局约束，这些约束决定了每个视图在其超级视图范围内的位置和大小。您还可以以编程方式创建约束，并在适当的时候将其添加到您的视图中。有关如何创建约束的更多信息，请参阅自动布局指南。

<https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/index.html#//apple_ref/doc/uid/TP40010853>

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

<https://developer.apple.com/documentation/uikit/uiscenedelegate/restoring_your_app_s_state>

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
```## Getting the storyboard and nib information 获取故事板和笔尖信息

```swift
var storyboard: UIStoryboard?
var nibName: String?
var nibBundle: Bundle?
```## Getting the storyboard and nib information 获取故事板和笔尖信息

```swift
var storyboard: UIStoryboard?
var nibName: String?
var nibBundle: Bundle?
```## Getting the storyboard and nib information 获取故事板和笔尖信息

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
// 通常在分割视图控制器的主内容视图控制器中调用。它用于在详细内容区域显示相应的视图控制器。如果你不是在分割视图控制器中使用，而是在其他场景中使用，可能会产生不符合预期的结果。
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

// 展示视图控制器时要使用的过渡样式。
// 当使用 present(_:animated:completion:) 方法显示视图控制器时，此属性决定了视图控制器在屏幕上的动画方式。要更改转换类型，您必须在显示视图控制器之前设置此属性。
// 默认值为UIModalTransitionStyle.coverVertical。
// enum UIModalTransitionStyle : Int, @unchecked Sendable
// case coverVertical 当显示视图控制器时，其视图从屏幕底部向上滑动。关闭时，视图会向下滑动。这是默认的过渡样式。
// case flipHorizontal 当显示视图控制器时，当前视图启动从右到左的水平3D翻转，导致新视图的显示，就像它在上一个视图的背面一样。被解雇时，翻转从左到右，返回原始视图。
// case crossDissolve 当显示视图控制器时，当前视图会逐渐消失，而新视图会同时消失。解雇时，使用类似类型的交叉渐变来返回原始视图。
// case partialCurl 当显示视图控制器时，当前视图的一个角落向上卷曲，以显示下面的显示视图。被解雇后，卷曲的页面会展开到呈现视图的顶部。使用此过渡显示的视图控制器本身无法显示任何其他视图控制器。仅当父视图控制器显示全屏视图并且您使用UIModalPresentationStyle.fullScreen模态演示样式时，才支持此过渡样式。尝试为父视图使用不同的外形因素或不同的演示样式会触发异常。
var modalTransitionStyle: UIModalTransitionStyle { get set }

// 一个布尔值，指示视图控制器是否强制执行模态行为。
// 默认值为false。
// 当您将其设置为true时，UIKit会忽略视图控制器边界之外的事件，并防止在屏幕上交互关闭视图控制器。
var isModalInPresentation: Bool { get set }

// 一个布尔值，指示当视图控制器或其后代呈现视图控制器时，该视图控制器的视图是否被覆盖。
// 当使用UIModalPresentationStyle.currentContext或UIModalPresentationStyle.overCurrentContext样式显示视图控制器时，此属性控制视图控制器层次结构中的哪些现有视图控制器实际上被新内容覆盖。当出现基于上下文的演示文稿时，UIKit从呈现视图控制器开始，然后沿着视图控制器层次结构向上走。如果它找到一个视图控制器，其此属性的值为true，它会要求该视图控制器显示新的视图控制器。如果没有视图控制器定义演示文稿上下文，UIKit会要求窗口的根视图控制器处理演示文稿。
// 默认值为false。
// 一些系统提供的视图控制器，如UINavigationController，将默认值更改为true。
var definesPresentationContext: Bool { get set }

// 一个布尔值，指示视图控制器是否指定其呈现的视图控制器的转换样式。
// 当视图控制器的definesPresentationContext属性为true时，它可以用自己的视图控制器替换呈现视图控制器的过渡样式。当此属性的值为true时，将使用当前视图控制器的过渡样式，而不是与呈现视图控制器关联的样式。
// 当此属性的值为false时，UIKit使用呈现视图控制器的过渡样式。
// 属性的默认值为false。
var providesPresentationContextTransitionStyle: Bool { get set }

// 返回一个布尔值，指示当前输入视图在更改控件时是否自动关闭。
// 在子类中覆盖此方法，以便在从想要输入视图的控件更改为不想要输入视图的控件时，允许或不允许关闭当前输入视图（通常是系统键盘）。在正常情况下，当用户点击需要输入视图的控件时，系统会自动显示该视图。点击不想要输入视图的控件随后会导致当前输入视图被忽略，但并非在所有情况下。在这些悬而未决的情况下，您可以重写此方法，以允许关闭输入视图，或使用此方法来防止在其他情况下关闭视图。
// 当视图控制器的模态呈现样式设置为UIModalPresentationStyle.formSheet并返回其他呈现样式的false时，此方法的默认实现返回true。因此，系统通常不允许因模态形式而忽略键盘。
var disablesAutomaticKeyboardDismissal: Bool { get }

// 当拆分视图控制器展开或折叠时发布。
// 当视图控制器使用show（_:sender:）或showDetailViewController（_:sender:）时，它可能需要知道视图层次结构中较高的拆分视图控制器何时更改。当拆分视图控制器展开或折叠时，会发送此通知。此通知的目标是导致更改的视图控制器。
class let showDetailTargetDidChangeNotification: NSNotification.Name
```

## Adding a custom transition or presentation 添加自定义过渡或演示文稿

```swift
// 提供过渡动画师、交互式控制器和自定义演示文稿控制器对象的委托对象。
// 当视图控制器的modalPresentationStyle属性为UIModalPresentationStyle.custom时，UIKit使用此属性中的对象来促进视图控制器的转换和演示。过渡委托对象是您提供的自定义对象，符合UIViewControllerTransitioningDelegate协议。它的工作是将用于在屏幕上为此视图控制器的视图制作动画的动画师对象，以及一个可选的演示控制器，以提供任何其他的铬和动画。
weak var transitioningDelegate: UIViewControllerTransitioningDelegate? { get set }

// 返回活动过渡协调员对象。
// 当演示或解散正在进行时，此方法将返回与该过渡关联的过渡协调员对象。如果没有与当前视图控制器关联的进行中过渡，UIKit会检查视图控制器的祖先是否有过渡协调员对象，如果存在该对象，则返回该对象。您可以使用此对象创建其他动画，并将其与过渡动画同步。
// 容器视图控制器可以覆盖此方法，但在大多数情况下不需要。如果您确实覆盖了此方法，请首先调用super，看看是否有合适的过渡协调员返回，如果有，则返回它。
var transitionCoordinator: UIViewControllerTransitionCoordinator? { get }

// 返回响应操作的视图控制器。
// 如果当前视图控制器覆盖了操作参数指示的方法，则此方法返回当前视图控制器。
// 如果当前视图控制器没有覆盖该方法，UIKit将沿着视图层次结构向上走，并返回第一个覆盖该方法的视图控制器。
// 如果没有视图控制器处理该操作，此方法返回nil。
// 视图控制器可以通过从其canPerformAction(_:withSender:)方法返回适当的值来选择性地响应操作。
func targetViewController(forAction action: Selector,sender: Any?) -> UIViewController?

// 管理当前视图控制器的演示文稿控制器。
// 如果视图控制器由演示文稿控制器管理，则此属性包含该对象。
var presentationController: UIPresentationController? { get }

// 管理当前视图控制器的最近的弹出窗口演示控制器。
// 如果视图控制器或其祖先之一由弹出式表示控制器管理，则此属性包含该对象。
// 如果视图控制器不由弹出式表示控制器管理，则此属性为nil。
// 如果您创建了视图控制器，但尚未显示它，当modalPresentationStyle属性中的值为UIModalPresentationStyle.popover时，访问此属性会创建一个弹出窗口表示控制器。如果模态表示样式是不同的值，则此属性为nil。
var popoverPresentationController: UIPopoverPresentationController? { get }

// 视图控制器的工作表演示控制器。
// ios15
// 如果modalPresentationStyle是UIModalPresentationStyle.pageSheet或UIModalPresentationStyle.formSheet，则此属性包含一个工作表表示控制器实例。访问此实例，在工作表出现之前或之后对其进行自定义或调整。
// 如果modalPresentationStyle的值不是UIModalPresentationStyle.pageSheet或UIModalPresentationStyle.formSheet，则此属性的值为nil。
var sheetPresentationController: UISheetPresentationController? { get }

//  一个布尔值，指示以前聚焦的项目在项目视图控制器变得可见和可聚焦时是否应再次聚焦。
// 当此属性的值为true时，当其视图控制器变得可见和可聚焦时，上次聚焦的项目会自动对焦。例如，如果视图控制器中的某个项目聚焦并显示第二个视图控制器，则当第二个视图控制器被关闭时，原始项目将再次聚焦。
// 属性的默认值为true。
var restoresFocusAfterTransition: Bool { get set }
```

## Adapting to environment changes  适应环境变化

```swift
// 当拆分视图控制器过渡到紧凑宽度大小类时调用。
// 当您不覆盖splitViewController(_:collapseSecondary:onto:)方法时，此方法提供默认行为。显示与拆分视图控制器关联的主视图控制器。
func collapseSecondaryViewController(UIViewController, for: UISplitViewController)

// 当拆分视图控制器过渡到常规宽度大小的类时调用。
// 当您不覆盖splitViewController(_:separateSecondaryFrom:)方法时，此方法提供默认行为。返回以前的辅助视图控制器。
func separateSecondaryViewController(for: UISplitViewController) -> UIViewController?
```

## Adjusting the interface style 调整界面样式

```swift
// 视图控制器及其所有子控制器采用的用户界面样式。
// 使用此属性强制视图控制器始终采用浅色或深色界面样式。
// 属性的默认值为UIUserInterfaceStyle.unspecified，这导致视图控制器从系统或父视图控制器继承接口样式。
// 如果您分配不同的值，新样式将应用于视图控制器、其整个视图层次结构以及任何嵌入式子视图控制器。

// enum UIUserInterfaceStyle : Int, @unchecked Sendable
// case unspecified 未指定的界面样式。
// case light 轻型界面风格。
// case dark 黑暗的界面风格。
var overrideUserInterfaceStyle: UIUserInterfaceStyle { get set }

// 此视图控制器的首选界面样式。
// 默认UIUserInterfaceStyle.unspecified
var preferredUserInterfaceStyle: UIUserInterfaceStyle { get }

// 支持首选用户界面样式的子视图控制器。
// 此属性的默认值为nil。容器视图控制器可以覆盖此属性，并返回支持当前首选用户界面样式的子视图控制器，该控制器由首选UserInterfaceStyle属性确定。
var childViewControllerForUserInterfaceStyle: UIViewController? { get }

// 通知视图控制器发生了可能影响首选界面样式的更改。
// 影响首选用户界面样式的方式更改视图控制器时，可以调用它，让UIKit知道。
func setNeedsUserInterfaceAppearanceUpdate()
```

## Managing child view controllers in a custom container 在自定义容器中管理子视图控制器

```swift
// 当前视图控制器的子视图控制器数组。
var children: [UIViewController] { get }

// 添加指定的视图控制器作为当前视图控制器的子控制器。
// 此方法在当前视图控制器和childController参数中的对象之间创建父子关系。将子视图控制器的视图嵌入到当前视图控制器的内容中时，这种关系是必要的。如果新的子视图控制器已经是容器视图控制器的子控制器，则在添加之前将其从该容器中删除。
// 重写此方法，则必须在实现中调用super。
func addChild(_ childController: UIViewController)

// 从其父控制器中删除视图控制器。
// 此方法仅供自定义容器视图控制器的实现调用。如
// 重写此方法，则必须在实现中调用super。
func removeFromParent()

// 两个视图控制器的子视图控制器之间的过渡。
// 此方法将第二个视图控制器的视图添加到视图层次结构中，然后执行动画块中定义的动画。
// 动画完成后，它会从视图层次结构中删除第一个视图控制器的视图。
// 此方法仅供自定义容器视图控制器的实现调用。
// 重写此方法，则必须在实现中调用super。
func transition(from: UIViewController, to: UIViewController, duration: TimeInterval, options: UIView.AnimationOptions, animations: (() -> Void)?, completion: ((Bool) -> Void)?)

// 返回一个布尔值，指示外观方法是否转发到子视图控制器。
// 调用此方法是为了确定是否自动将外观相关包含回调转发给子视图控制器。
// 默认实现返回true。
// 实现包含逻辑的UIViewController类的子类可以覆盖此方法，以控制这些方法的转发方式。
// 如果您重写此方法并返回false，您有责任告诉孩子其视图何时出现或消失。您可以通过调用子视图控制器的 beginAppearanceTransition(_:animated:) 和 endAppearanceTransition() 方法来做到这一点。
var shouldAutomaticallyForwardAppearanceMethods: Bool { get }

// 告诉子控制器它的外观即将改变。
// 如果您正在实现自定义容器控制器，请使用此方法告诉孩子其视图即将出现或消失。
// 不要直接调用viewWillAppear(_:)、viewWillDisappear(_:)、viewDidAppear(_:)或viewDidDisappear(_:)。
func beginAppearanceTransition(Bool, animated: Bool)

// 告诉子控制器其外观发生了变化。
// 如果您正在实现自定义容器控制器，请使用此方法告诉子容器视图转换已完成。
func endAppearanceTransition()

// 更改分配给指定子视图控制器的特征。
// 通常，特征会从父视图控制器不加修改地传递给其子视图控制器。
// 在实现自定义容器视图控制器时，您可以使用此方法将任何嵌入式子视图控制器的特征更改为更适合您布局的内容。
// 进行这样的更改会改变与该子设备相关的其他视图控制器行为。例如，模态演示文稿在水平紧凑和水平规则环境中的行为不同。您还可以进行此类更改，以强制子视图控制器上相同的特征集，无论实际特征环境如何。
func setOverrideTraitCollection(UITraitCollection?, forChild: UIViewController)

// 检索子视图控制器的特征集合。
// 使用此方法检索子视图控制器的特征集合。然后，您可以修改指定子视图控制器的特征集合，并使用setOverrideTraitCollection(_:forChild:)方法进行设置。
func overrideTraitCollection(forChild: UIViewController) -> UITraitCollection?

// 如果视图控制器层次结构与视图层次结构不一致，则引发。
class let hierarchyInconsistencyException: NSExceptionName

```

## Responding to containment events 应对遏制事件

```swift
// 在从容器视图控制器中添加或删除视图控制器之前调用。
// 当需要知道此方法已添加到容器时，您的视图控制器可以覆盖此方法。
// 如果您正在实现自己的容器视图控制器，它必须在调用removeFromParent()方法之前调用子视图控制器的willMove(toParent:）方法，并传递父值为nil。
// 当您的自定义容器调用addChild（_:）方法时，它会自动调用视图控制器的willMove(toParent:）方法，在添加之前将其添加为子控制器。
func willMove(toParent parent: UIViewController?)

// 在从容器视图控制器中添加或删除视图控制器后调用。
// 当您的视图控制器想要对添加到容器做出反应时，可以覆盖此方法。
func didMove(toParent: UIViewController?)

```

## Getting other related view controllers 获取其他相关视图控制器

```swift
// 展示此视图控制器的视图控制器。
// 当您使用 present(_:animated:completion:) 方法模态（显式或隐式）呈现视图控制器时，呈现的视图控制器将此属性设置为呈现它的视图控制器。
// 如果视图控制器不是以模态呈现的，但其祖先之一是，则此属性包含呈现祖先的视图控制器。
// 如果当前视图控制器或其任何祖先都不是模态显示的，则此属性中的值为零。
var presentingViewController: UIViewController? { get }

// 该视图控制器或其祖先之一在视图控制器层次结构中呈现的视图控制器。
// 当您使用 present(_:animated:completion:) 方法模态（显式或隐式）呈现视图控制器时，调用该方法的视图控制器将此属性设置为它呈现的视图控制器。如果当前视图控制器没有以模态呈现另一个视图控制器，则此属性中的值为零。
var presentedViewController: UIViewController? { get }

// 收件人的父视图控制器。
var parent: UIViewController?

// 视图控制器层次结构中最近的祖先是拆分视图控制器。
// 如果视图控制器或其祖先之一是拆分视图控制器的子控制器，则此属性包含拥有的拆分视图控制器。如果视图控制器没有嵌入到拆分视图控制器中，则此属性为nil。
var splitViewController: UISplitViewController?

// 视图控制器层次结构中最近的祖先，即导航控制器。
var navigationController: UINavigationController?

// 视图控制器层次结构中最近的祖先是制表符控制器。
var tabBarController: UITabBarController?

```

## Configuring a navigation interface 配置导航界面

```swift
// 用于在父导航栏中表示视图控制器的导航项。
// 这是UINavigationItem的唯一实例，用于在被推送到导航控制器时表示视图控制器。
// 首次访问该属性时，将创建UINavigationItem对象。因此，如果您没有使用导航控制器来显示视图控制器，则不应访问此属性。
// 为确保导航项已配置，您可以覆盖此属性并添加代码，以便在首次访问时创建条形按钮项，或在视图控制器的初始化代码中创建项目。
// 避免将导航项中条形按钮项的创建与视图控制器视图的创建绑定。
// 视图控制器的导航项可以独立于视图控制器的视图进行检索。例如，当将两个视图控制器推送到导航堆栈上时，最上面的视图控制器会变得可见，但可以检索另一个视图控制器的导航项以显示其后退按钮。
// 默认行为是创建一个显示视图控制器标题的导航项。
var navigationItem: UINavigationItem { get }

// 一个布尔值，指示当视图控制器推送到导航控制器时，屏幕底部的工具栏是否隐藏。
// 作为导航控制器子控件添加的视图控制器可以在屏幕底部显示可选工具栏。
// 此属性在最顶视图控制器上的值决定了工具栏是否可见。
// 如果此属性的值为true，则工具栏将被隐藏。
// 如果此属性的值为false，则该条是可见的。
var hidesBottomBarWhenPushed: Bool { get set }

// 设置要与视图控制器一起显示的工具栏项。
// 由导航控制器管理的视图控制器可以使用此方法为导航控制器的内置工具栏指定工具栏项。
// 您可以在显示视图控制器之前或已经可见之后为视图控制器设置工具栏项。
func setToolbarItems([UIBarButtonItem]?, animated: Bool)

// 与视图控制器关联的工具栏项。
var toolbarItems: [UIBarButtonItem]?

```

## Configuring tab bar content 配置标签栏内容

```swift
// 添加到选项卡栏控制器时表示视图控制器的选项卡栏项。
// 这是UITabBarItem的唯一实例，用于表示选项卡栏控制器的子控制器。
// 首次访问该属性时，将创建UItabBarItem。
// 因此，如果您没有使用选项卡栏控制器来显示视图控制器，则不应访问此属性。
// 为了确保选项卡栏项已配置，您可以覆盖此属性并添加代码，以便在首次访问时创建条形按钮项，或在视图控制器的初始化代码中创建项目。
// 默认值是一个显示视图控制器标题的选项卡栏项。
var tabBarItem: UITabBarItem! { get set }

// 全屏滚动视图，可与滚动选项卡栏同步。
// 已弃用
// Use setContentScrollView(_:for:) instead.
var tabBarObservedScrollView: UIScrollView?

```

## Working with scrolling content 处理滚动内容

```swift
// struct NSDirectionalRectEdge
// static var all: NSDirectionalRectEdge 所有边缘。
// static var bottom: NSDirectionalRectEdge 底部边缘。
// static var leading: NSDirectionalRectEdge 领先优势。
// static var top: NSDirectionalRectEdge 顶部边缘。
// static var trailing: NSDirectionalRectEdge 尾随边缘。
func contentScrollView(for: NSDirectionalRectEdge) -> UIScrollView?
func setContentScrollView(UIScrollView?)
func setContentScrollView(UIScrollView?, for: NSDirectionalRectEdge)

```

## Supporting app extensions 支持应用程序扩展

```swift
// 返回视图控制器的扩展上下文。
var extensionContext: NSExtensionContext?

```

## Coordinating with system gestures 与系统手势协调

```swift
// 您希望手势优先于系统手势的屏幕边缘
// 通常，系统定义的屏幕边缘手势优先于您定义的任何手势识别器。系统使用手势实现系统级行为，例如显示控制中心。
// 只要有可能，您应该允许系统手势优先。然而，身临其境的应用程序可以使用此属性允许应用程序定义的手势优先于系统手势。
// 您通过覆盖此属性并返回手势应优先的屏幕边缘来做到这一点。
// 如果您更改视图控制器首选的边缘，请更新此属性的值，并调用setNeedsUpdateOfScreenEdgesDeferringSystemGestures()方法来通知系统边缘已更改。
var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { get }

// 返回应该查询的子视图控制器，看看其手势是否应该优先。
// 在实现容器视图控制器时，如果您的子视图控制器之一定义了应优先于系统手势的屏幕边缘手势，请覆盖此方法。
// 然后，UIKit使用返回的子视图控制器的首选ScreenEdgesDeferringSystemGestures属性来确定哪些屏幕边缘具有相互竞争的手势识别器。
var childForScreenEdgesDeferringSystemGestures: UIViewController? { get }

// 将推迟系统手势的屏幕边缘更改通知系统。
// 每当您修改延迟系统手势的屏幕边缘（例如调用控制中心的屏幕边缘）时，调用此方法，以便系统可以相应更新。
// 如果childForScreenEdgesDeferringSystemGestures属性为nil，系统将从当前视图控制器的首选ScreenEdgesDeferringSystemGestures属性中读取边缘；
// 否则，它在引用的子视图控制器上使用相同的属性。
func setNeedsUpdateOfScreenEdgesDeferringSystemGestures()

// 返回一个布尔值，指示是否允许系统隐藏返回主屏幕的视觉指示器。
// 如果您的视图控制器允许系统决定何时隐藏指示器，则为true，如果您希望始终显示指示器，则为false。
// 此方法的默认实现返回false。
// 覆盖此方法以表明您喜欢显示视觉指示器。系统会考虑您的偏好，但返回true并不能保证指示器将被隐藏。
var prefersHomeIndicatorAutoHidden: Bool { get }

// 返回子视图控制器，该控制器被咨询为返回主屏幕而显示视觉指示器的偏好。
// 此方法的默认实现返回nil。
// 在实现容器视图控制器时，如果您想要一个子视图控制器来确定是否显示可视化指示器，请覆盖此方法。
// 如果您这样做，系统将调用返回视图控制器的首选HomeIndicatorAutoHidden方法。如果方法返回nil，系统将调用当前视图控制器的prefersHomeIndicatorAutoHidden方法。
var childForHomeIndicatorAutoHidden: UIViewController? { get }

// 通知UIKit，您的视图控制器更新了有关返回主屏幕的视觉指示器的偏好。
// 当您更改视图控制器的首选HomeIndicatorAutoHidden或childForHomeIndicatorAutoHidden方法返回的值时，调用此方法，让UIKit知道它应该再次调用这些方法。
func setNeedsUpdateOfHomeIndicatorAutoHidden()
```

## Working with focus 专注地工作

```swift
// 视图控制器所属的焦点组的标识符。
var focusGroupIdentifier: String?

```

## Managing pointer lock state 管理指针锁定状态

```swift
// 一个布尔值，指示视图控制器是否更喜欢锁定指向特定场景的指针。
var prefersPointerLocked: Bool { get }

// 指示视图控制器更改了指针锁定首选项。
func setNeedsUpdateOfPrefersPointerLocked()

// 用于查询指针锁定首选项的子视图控制器。
var childViewControllerForPointerLock: UIViewController?
```

## Managing the status bar 管理状态栏

```swift
// 用于确定状态栏隐藏状态的视图控制器。
// 如果您的容器视图控制器从其子视图控制器之一导出状态栏的隐藏状态，请实现此属性以指定要控制隐藏/未隐藏状态的子视图控制器。
// 如果您返回nil或不覆盖此属性，则使用自我隐藏/未隐藏状态的状态栏。
// 如果用于确定状态栏隐藏状态的子视图控制器发生变化，请调用setNeedsStatusBarAppearanceUpdate()。
var childForStatusBarHidden: UIViewController? { get }

// 当系统需要视图控制器用于确定状态栏样式时调用。
// 应使用状态栏样式的视图控制器。
// 如果您的容器视图控制器从其子视图控制器之一导出其状态栏样式，请实现此方法并返回该子视图控制器。
// 如果您返回nil或不覆盖此方法，则使用self的状态栏样式。
// 如果此方法的返回值发生变化，请调用setNeedsStatusBarAppearanceUpdate()方法。
var childForStatusBarStyle: UIViewController? { get }

// 视图控制器的首选状态栏样式。
// 您可以通过实现childForStatusBarStyle方法来覆盖视图控制器的首选状态栏样式。
// 如果此方法的返回值发生变化，请调用setNeedsStatusBarAppearanceUpdate()方法。
var preferredStatusBarStyle: UIStatusBarStyle { get }

// 指定视图控制器更喜欢隐藏或显示状态栏。
// 如果状态栏应该隐藏，则为true；如果应该显示，则为false。
// 如果您更改此方法的返回值，请调用setNeedsStatusBarAppearanceUpdate()方法。
// 要指定子视图控制器应控制首选状态栏隐藏/未隐藏状态，请实现childForStatusBarHidden方法。
// 默认情况下，此方法返回false，
// 只有一个例外。对于与iOS 8或更高版本链接的应用程序，如果视图控制器位于垂直紧凑的环境中，则此方法返回true。
var prefersStatusBarHidden: Bool { get }

// 指定显示的非全屏视图控制器是否从呈现视图控制器接管状态栏外观的控制权。
// 此属性的默认值为false。
// 当您通过调用 present(_:animated:completion:) 方法呈现视图控制器时，只有当呈现控制器的 modalPresentationStyle 值为 UIModalPresentationStyle.fullScreen 时，状态栏外观控制才会从呈现到呈现的视图控制器。
// 通过将此属性设置为true，您可以指定呈现的视图控制器控制状态栏的外观，即使呈现非全屏。
// 对于全屏显示的视图控制器，系统忽略了此属性的值。
var modalPresentationCapturesStatusBarAppearance: Bool { get set }

// 指定用于隐藏和显示视图控制器状态栏的动画样式。
// 要使用的状态栏动画样式；UIStatusBarAnimation枚举的常量之一。
// 默认值为UIStatusBarAnimation.fade。
// enum UIStatusBarAnimation : Int, @unchecked Sendable
// case none 没有对显示或隐藏的状态栏应用动画。
// case fade 状态栏在显示或隐藏时分别淡入和淡出。
// case slide 状态栏在显示或隐藏时分别滑入或滑出。
var preferredStatusBarUpdateAnimation: UIStatusBarAnimation { get }

// 向系统指示视图控制器状态栏属性已更改。
func setNeedsStatusBarAppearanceUpdate()
```

## Managing the Touch Bar 管理触控栏

```swift
// 系统用于在触控栏中显示内容的子视图控制器。
var childViewControllerForTouchBar: UIViewController?

// 告诉系统更新触控栏。
func setNeedsTouchBarUpdate()

```

## Accessing the available key commands 访问可用的键盘命令

```swift
// 一个布尔值，指示视图控制器是否执行与菜单相关的操作。
// 此属性的默认值为true，这导致视图控制器处理模式呈现的视图控制器沿响应器链传递的操作。
// 如果应用程序在其Info.plist文件中包含UIViewControllerPerformsActionsWhilePresentingModally键，则默认值与该键的值相匹配。
// 呈现视图控制器可能不想在其模态呈现的子视图控制器中处理操作。
// 重写此属性并返回false会导致UIKit在搜索目标以处理操作时忽略此视图控制器。
var performsActionsWhilePresentingModally: Bool { get }

// 将指定的键盘快捷键与视图控制器关联。
// 此方法允许您轻松向视图控制器添加键盘命令，而无需覆盖keyCommands属性。
// 您添加到视图控制器的键盘命令将应用于活动响应器链。当用户执行键盘命令时，UIKit会在响应器链（从第一个响应器开始）中搜索能够处理指定操作的对象。
// @MainActor class UIKeyCommand : UICommand 指定按键的对象在硬件键盘和由此产生的操作上执行。
func addKeyCommand(UIKeyCommand)

// 从视图控制器中删除键盘命令。
func removeKeyCommand(UIKeyCommand)
```

## Adding editing behaviors to your view controller 将编辑行为添加到视图控制器中

```swift
// 一个布尔值，指示视图控制器当前是否允许用户编辑视图内容。
// 如果为真，视图控制器当前允许编辑；否则为false。
// 如果视图是可编辑的，并且关联的导航控制器包含一个编辑完成的按钮，则会显示一个完成按钮；否则，将显示一个编辑按钮。点按任一按钮可切换此属性的状态。
// 通过将导航项的自定义左视图或右视图设置为editButtonItem方法返回的值来添加编辑完成按钮。
// 将 isEditing 属性设置为视图的初始状态。如果视图已经显示，请使用setEditing(_:animated:)方法作为操作方法，为此状态的过渡添加动画效果。
var isEditing: Bool { get set }

// 设置视图控制器是否显示可编辑视图。
// 使用编辑完成按钮的子类必须覆盖此方法，如果是truediting，则将其视图更改为可编辑状态，如果为false，则更改为不可编辑状态。
// 此方法在更新其视图之前应调用super的实现。
func setEditing(Bool, animated: Bool)

// 返回一个条形按钮项，该项在编辑和完成之间切换其标题和相关状态。
// 如果导航项目属性的自定义视图之一设置为返回的对象，如果 isEditing 为 false，关联的导航栏将显示“编辑”按钮，如果 isEditing 为 true，则会显示 Done 按钮。
// 默认按钮操作调用setEditing(_:animated:)方法。
var editButtonItem: UIBarButtonItem { get }

```

## Handling memory warnings 处理内存警告

```swift
// 当应用程序收到内存警告时，发送到视图控制器。
// 您的应用程序永远不会直接调用此方法。相反，当系统确定可用内存量较低时，会调用此方法。
// 您可以覆盖此方法以释放视图控制器使用的任何其他内存。
// 此方法的实现必须在某个时候调用超级实现。
func didReceiveMemoryWarning()
```

## Managing state restoration 管理恢复

```swift
// 确定视图控制器是否支持状态恢复的标识符。
// 此属性指示是否应保留视图控制器及其内容，并在恢复过程中用于识别视图控制器。
// 默认情况下，此属性的值为nil，这表明不应保存视图控制器。
// 为属性分配字符串对象可以让系统知道应该保存视图控制器。此外，字符串的内容是您识别视图控制器目的的方法。
var restorationIdentifier: String? { get set }

// 负责在恢复应用程序状态时重新创建此视图控制器的类。
// 如果视图控制器具有关联的恢复类，则在状态恢复期间调用该类的viewController（withRestorationIdentifierPath:coder:）方法。
// 该方法负责返回与指示视图控制器匹配的视图控制器对象。
// 如果您没有为视图控制器指定恢复类，状态恢复引擎会要求您的应用程序委托提供视图控制器对象。
// 恢复类必须符合UIViewControllerRestoration协议。
var restorationClass: UIViewControllerRestoration.Type? { get set }

// 为视图控制器编码状态相关信息。
// 不要直接调用此方法。
// 系统在状态保存过程中调用此方法，让您的视图控制器或视图控制器子类有机会保存与状态相关的信息。
func encodeRestorableState(with: NSCoder)

// 解码和恢复视图控制器的状态相关信息。
// 不要直接调用此方法。
// 系统在状态恢复过程中调用此方法，以便您可以将视图控制器恢复到之前的状态。
// 如果您的应用程序支持状态恢复，请为任何视图控制器覆盖此方法，您也覆盖了encodeRestorableState（with:）方法。
// 此方法的实现应使用任何保存的状态信息将视图控制器恢复到之前的配置。如果您的encodeRestorableState（with:）方法调用super，则此方法应该在实现的某个时候调用super。
func decodeRestorableState(with: NSCoder)

// 在其他对象解码完成后调用恢复的视图控制器。
// 其他对象解码完成后，系统调用此方法。
// 这允许视图控制器在其他状态恢复后完成设置，依靠系统确保恢复存档中所有对象的状态都已解码。
func applicationFinishedRestoringState()

```

##  Supporting Swift Playgrounds

```swift
var playgroundLiveViewRepresentation: PlaygroundLiveViewRepresentation
```

##  Logging user interaction intervals 记录用户交互间隔

```swift
// 视图控制器用于记录标注用户交互的路标的基本名称。
// ios16
var interactionActivityTrackingBaseName: String? { get set }
```