<!-- TOC -->

- [UINavigationBar](#uinavigationbar)
- [使用带有导航控制器的导航栏](#使用带有导航控制器的导航栏)
- [将内容添加到独立导航栏](#将内容添加到独立导航栏)
- [自定义导航栏的外观](#自定义导航栏的外观)
- [API](#api)
    - [响应导航栏更改](#响应导航栏更改)
    - [Pushing and popping items](#pushing-and-popping-items)
    - [自定义的外观](#自定义的外观)
- [UINavigationBarDelegate](#uinavigationbardelegate)
    - [API](#api-1)
        - [Pushing items](#pushing-items)
        - [Popping items](#popping-items)

<!-- /TOC -->

# UINavigationBar

导航控件显示在屏幕顶部的栏中，通常与导航控制器一起显示。

UINavigationBar对象是一个栏，通常显示在窗口顶部，包含用于在屏幕层次结构中导航的按钮。  
主要组件是`左（后）按钮`、`中央标题`和`可选的右按钮`。您可以将导航栏用作独立对象或与导航控制器对象一起使用。

导航栏最常用于导航控制器。UINavigationController对象创建、显示和管理其关联的导航栏，并使用您添加的视图控制器的属性来控制导航栏中显示的内容。  

要在使用导航控制器时控制导航栏，需要完成以下步骤：

- 在Interface Builder或代码中创建一个导航控制器。
- 使用UINavigationController对象上的导航栏属性配置导航栏的外观。
- 通过在您推送到导航控制器堆栈的每个UIViewController上设置标题和导航项属性来控制导航栏的内容。

您还可以使用独立的导航栏，而无需使用导航控制器。要向界面添加导航栏，需要完成以下步骤：

- 设置自动布局规则来管理导航栏在界面中的位置。
- 创建一个根导航项来提供初始标题。
- 配置委托对象以处理用户与导航栏的交互。
- 自定义导航栏的外观。
- 配置您的应用程序，以便在用户浏览分层屏幕时推送和弹出相关导航项。

```swift
@MainActor class UINavigationBar : UIView
```

# 使用带有导航控制器的导航栏

如果您使用导航控制器来管理不同内容屏幕之间的导航，导航控制器会`自动创建一个导航栏`，并在适当时推送和弹出导航项。  


导航控制器使用UIViewController上的navigationItem属性在导航视图控制器堆栈时将模型对象提供给其导航栏。  
默认导航项使用视图控制器的标题，但您可以在UIViewController子类上覆盖导航项，以完全控制导航栏的内容。  

导航控制器会自动将自己分配为其导航栏对象的委托。因此，使用导航控制器时，不要将自定义委托对象分配给相应的导航栏。

要访问与导航控制器关联的导航栏，请使用UInavigationController上的 `navigationBar` 属性。有关如何自定义导航栏外观的详细信息，请参阅自定义导航栏的外观。

# 将内容添加到独立导航栏

在绝大多数情况下，您使用导航栏作为导航控制器的一部分。然而，在某些情况下，您可能希望使用导航栏UI并实现自己的内容导航方法。在这些情况下，您可以使用独立的导航栏。

当您将导航栏用作独立对象时，您有责任提供其内容。与其他类型的视图不同，您不会直接向导航栏添加子视图。相反，您可以使用导航项（UINavigationItem类的实例）来指定要显示的按钮或自定义视图。导航项具有指定`导航栏左侧`、`右侧`和`中央视图`以及`指定自定义提示字符串`的属性。

导航栏管理一堆UINavigationItem对象。虽然堆栈主要支持导航控制器，但您可以使用它来实现自己的自定义导航界面。  
堆栈中最上面的项目表示导航项，其内容当前由导航栏显示。您可以使用pushItem(_:animated:)方法将新的导航项推送到堆栈上，并使用popItem(animated:)方法将弹出项目从堆栈中弹出。这两个更改都可以为用户的利益制作动画效果。

除了推送和弹出项目外，您还可以直接使用项目属性或setItems(_:animated:)方法设置堆栈的内容。您可以在启动时使用此方法将接口恢复到之前的状态，或一次推送或弹出多个导航项。下图显示了UINavigationBar API中负责管理导航项堆栈的部分。

如果您使用导航栏作为独立对象，请将`自定义委托对象分配给 delegate 属性`，并使用该对象拦截来自导航栏的消息。  
委托对象必须符合UInavigationBarDelegate协议。委托通知允许您跟踪导航项何时从堆栈中推送或弹出。您可以使用这些通知来更新应用程序的其余用户界面。

# 自定义导航栏的外观

导航栏有两种标准外观样式：`带有深色文本的白色`或`带有浅色文本的黑色`。使用`barStyle`属性选择样式。您对其他导航栏外观属性所做的任何更改都会覆盖从条样式中推断的更改。

导航栏`默认为半透明`；它们的背景颜色是半透明的。您可以通过将 isTranslucent 属性设置为 false 来使导航栏不透明。

您可以使用barTintColor属性为导航栏背景指定自定义色调颜色。  
设置此属性将覆盖从条形样式推断的默认颜色。与所有UIView子类一样，您可以使用tintColor属性控制导航栏中交互元素的颜色，包括按钮图像和标题。

`titleTextAttributes`属性指定用于显示栏标题文本的属性。您可以在文本属性字典中分别使用字体、前景颜色和阴影键指定标题的字体、文本颜色、文本阴影颜色和文本阴影偏移量。有关字符串格式属性的更多信息，请参阅字符属性。

使用setTitleVerticalPositionAdjustment（_:for:）方法来调整标题的垂直位置。此方法允许您根据条形高度指定调整，该高度由UIBarMetrics枚举表示。

为了允许对导航栏的外观进行完全自定义，您还可以提供自定义背景和阴影图像。  
要提供自定义背景图像，请使用`setBackgroundImage(_:for:barMetrics:)`方法，为适当的条形位置和度量值提供UIImage对象。  
使用条形位置参数的UIBarPosition值来指定是使用窗口底部还是顶部提供的图像，如果它出现在顶部，是否在状态栏下向上扩展。同样，您可以通过向条形码指标参数提供UIBarMetrics值来指定图像应用于紧凑型或默认条形指标，无论是否有提示。

要添加阴影，请为shadowImage属性提供可调整大小的UIImage。要使用自定义阴影图像，您需要指定自定义背景图像。下图显示了带有自定义背景图像的导航栏，该导航栏使用setBackgroundImage(_:for:barMetrics:)提供，条形位置值为UIBarPosition.topAttached，条形指标值为UIBarMetrics.default。还向shadowImage属性提供了自定义图像。

# API

## 响应导航栏更改

```swift
// 导航栏的委托对象。
weak var delegate: UINavigationBarDelegate? { get set }
```

## Pushing and popping items

```swift
// 将给定的导航项推送到导航栏的堆栈上并更新用户界面。
func pushItem(UINavigationItem, animated: Bool)

// 从导航栏的堆栈中弹出顶部项目并更新用户界面。
func popItem(animated: Bool) -> UINavigationItem?

// 将当前由导航栏管理的导航项替换为指定项。
func setItems([UINavigationItem]?, animated: Bool)

// 由导航栏管理的导航项数组。
// 底部项目位于索引0，后项位于索引n-2，顶部项目位于索引n-1，其中n是数组中的项数。
var items: [UINavigationItem]? { get set }

// 导航栏堆栈顶部的导航项。
var topItem: UINavigationItem? { get }

// 导航项，紧邻导航栏堆栈上最顶部的项目下方。
var backItem: UINavigationItem?

```

## 自定义的外观

```swift
// 一个布尔值，指示标题是否以大格式显示。
// 当此属性设置为true时，导航栏允许标题离线并使用更大的字体显示。
// 用于构建条形图的导航项必须指定它希望其标题以大格式显示还是小格式。使用 largeTitleDisplayMode 属性来配置标题的外观。
// 当属性设置为false时，导航栏将与其他栏按钮项内联显示标题。
var prefersLargeTitles: Bool { get set }

// 标准高度导航栏的外观设置。
// 此属性的默认值是包含系统默认外观设置的外观对象。
// 您可以使用UINavigationItem的标准外观属性自定义特定导航项的导航栏外观。
@NSCopying var standardAppearance: UINavigationBarAppearance { get set }

// 紧凑型高度导航栏的外观设置。
// 如果此属性的值为nil，UIKit将使用存储在topItem属性中的项目的标准外观。
// 您可以使用UINavigationItem的紧凑外观属性自定义特定导航项目的紧凑外观。
@NSCopying var compactAppearance: UINavigationBarAppearance? { get set }

// 当可滚动内容的边缘与导航栏的边缘对齐时，导航栏的外观设置。
// 当导航控制器包含导航栏和滚动视图时，滚动视图的部分内容会显示在导航栏下方。如果滚动内容的边缘达到该栏，UIKit将应用此属性中的外观设置。
// 如果此属性的值为nil，UIKit将使用标准外观属性中找到的设置，并修改为使用透明背景。如果没有导航控制器管理您的导航栏，UIKit会忽略此属性，并使用导航栏的标准外观。
// 在使用iOS 14或更低版本的应用程序上运行时，此属性适用于具有大标题的导航栏。在iOS 15中，此属性适用于所有导航栏。
@NSCopying var scrollEdgeAppearance: UINavigationBarAppearance? { get set }

// 当可滚动内容的边缘与导航栏的边缘对齐时，紧凑高度导航栏的外观设置。
@NSCopying var compactScrollEdgeAppearance: UINavigationBarAppearance? { get set }

// 一个布尔值，指示导航栏是否是半透明的。
// 当导航栏半透明时，配置视图控制器的edgesForExtendedLayout和ExtendedLayoutIncludesOpaqueBars属性，以在导航栏下方显示您的内容。
// 如果导航栏没有自定义背景图像，或者背景图像的任何像素的alpha值小于1.0，则此属性的默认值为true。
// 如果背景图像完全不透明，则此属性的默认值为false。
// 如果您将此属性设置为true，并且自定义背景图像完全不透明，UIKit将系统定义的不透明度小于1.0应用于图像。
// 如果您将此属性设置为false，并且背景图像不透明，UIKit将添加一个不透明的背景。
var isTranslucent: Bool { get set }
```

# UINavigationBarDelegate

导航栏在修改其导航项堆栈之前和之后调用的方法。

```swift
@MainActor protocol UINavigationBarDelegate
```

## API

### Pushing items

```swift
// 返回一个布尔值，指示导航栏是否应该推送项目。
func navigationBar(UINavigationBar, shouldPush: UINavigationItem) -> Bool

// 告诉委托一个项目被推到了导航栏上。
// 如果将项目推送到导航栏是动画的，则在动画结束后调用此方法；否则，它会在推送后立即调用。
func navigationBar(UINavigationBar, didPush: UINavigationItem)

```

### Popping items


```swift
// 返回一个布尔值，指示导航栏是否应该弹出一个项目。
func navigationBar(UINavigationBar, shouldPop: UINavigationItem) -> Bool

// 告诉委托从导航栏弹出了一个项目。
func navigationBar(UINavigationBar, didPop: UINavigationItem)

```