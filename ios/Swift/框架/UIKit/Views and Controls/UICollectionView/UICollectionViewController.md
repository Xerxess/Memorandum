<!-- TOC -->

- [UICollectionViewController](#uicollectionviewcontroller)
- [API](#api)
    - [Initializing the UICollectionViewController Object](#initializing-the-uicollectionviewcontroller-object)
    - [Getting the Collection View](#getting-the-collection-view)
    - [Configuring the Collection View Behavior 配置集合视图行为](#configuring-the-collection-view-behavior-配置集合视图行为)

<!-- /TOC -->

# UICollectionViewController

专门管理集合视图的视图控制器。

视图控制器实现以下行为：
* 如果集合视图控制器具有分配的nib文件或从故事板加载，它将从相应的nib文件或故事板加载其视图。如果您以`编程方式创建集合视图控制器，它会自动创建一个新的未配置的集合视图对象，您可以使用collectageView属性访问该对象`。

* 从故事板或笔尖文件加载集合视图时，从笔尖文件中获取集合视图的数据源和委托对象。如果没有指定数据源或委托，集合视图控制器将自己分配给未指定的角色。

* 当集合视图即将首次出现时，集合视图控制器会重新加载集合视图数据。每次显示视图时，它都会清除当前选择。您可以通过将`clearsSelectionOnViewWillAppear`属性的值设置为false来更改此行为。

您可以为要管理的每个集合视图创建UICollectionViewController的自定义子类。  
当您使用`init（collectionViewLayout:）`方法初始化控制器时，您指定集合视图应该具有的布局。  
由于最初创建的集合视图没有维度或内容，因此`集合视图的数据源和委托（通常是集合视图控制器本身）必须提供此信息`。

您可以重写loadView()方法或任何其他超类方法，但如果重写，请务必在方法的实现中`调用super`。如果您不这样做，集合视图控制器可能无法执行维护集合视图完整性所需的所有任务。

```swift
@MainActor class UICollectionViewController : UIViewController
```

# API

## Initializing the UICollectionViewController Object

```swift
//
init(collectionViewLayout: UICollectionViewLayout)
init(nibName: String?, bundle: Bundle?)
init?(coder: NSCoder)
```

## Getting the Collection View

```swift
//
var collectionView: UICollectionView!

// 
var collectionViewLayout: UICollectionViewLayout

```

## Configuring the Collection View Behavior 配置集合视图行为

```swift
// 一个布尔值，指示控制器是否在集合视图出现时清除所选内容。
// 默认值为true。
// 当为true时，集合视图控制器在收到viewWillAppear(_:)消息时清除集合视图的当前选择。
// 将此属性设置为false将保留所选内容。
var clearsSelectionOnViewWillAppear: Bool

// 一个布尔值，指示集合视图控制器是否安装了标准手势识别器来驱动重新排序过程。
// 默认值为true。
// 当为真时，集合视图控制器会安装一个标准手势识别器（基于长按手势），以管理集合视图中的视图重新排序。
// 集合视图的数据源必须声明其支持通过实现适当的方法对项目的重新排序。
// 将此属性设置为false会阻止安装此手势识别器。
var installsStandardGestureForInteractiveMovement: Bool

```

## Integrating with a Navigation Controller 与导航控制器集成

```swift
// 一个布尔值，指示集合视图控制器是否与过渡的导航控制器协调。
// 此属性有助于使用导航控制器在两个或多个集合视图控制器之间进行转换。
// 配置导航控制器时，将集合视图控制器安装为导航堆栈上的根对象，并将其此属性的值设置为false。当用户选择需要在堆栈上推送新集合视图控制器的项目时，请将新视图控制器的此属性值设置为true。当您这样做时，导航控制器在两个集合视图控制器的内容之间执行动画布局更改，而不是传统的推送动画。
// 同样，从堆栈中弹出最上面的集合视图控制器会动画回到之前的布局。导航控制器驱动视图控制器之间的转换，包括交互式驱动过渡的能力。
// 在将集合视图控制器推送到导航堆栈之前，您必须设置此属性的值。在视图控制器已经在导航堆栈上后，请勿更改此属性的值。
var useLayoutToLayoutNavigationTransitions: Bool

```