<!-- TOC -->

- [UICollectionViewTransitionLayout](#uicollectionviewtransitionlayout)
- [API](#api)
    - [Initializing the Transition Layout Object 初始化过渡布局对象](#initializing-the-transition-layout-object-初始化过渡布局对象)
    - [Updating the Transition Information 更新“过渡信息”](#updating-the-transition-information-更新过渡信息)
    - [Accessing the Layout Objects 访问布局对象](#accessing-the-layout-objects-访问布局对象)

<!-- /TOC -->

# UICollectionViewTransitionLayout

一种特殊类型的布局对象，允许您在集合视图中从一个布局更改为另一个布局时实现行为。

您可以按原样使用UICollectionViewTransitionLayout或子类来为您的应用程序提供专业行为。  
过渡布局的一个常见用途是创建交互式过渡，例如由手势识别器或触摸事件驱动的过渡。

在布局更改期间，集合视图临时安装此布局对象以管理转换。此布局对象通过在当前和新布局对象中的布局值之间插值来确定每个项目的布局。插值由transitionProgress属性中的值驱动，您可以定期从代码中更新该值以推动转换。例如，如果您将该类与手势识别器一起使用，则手势识别器的处理程序将更新该属性并使布局失效。

如果您想随着时间的推移提供从旧布局到新布局的线性过渡，您需要对项目进行子类并提供布局属性。子类要求您在子类UICollectionViewLayout时覆盖所有相同的方法。区别在于，您的自定义方法可以与您的手势识别器或触摸事件代码配合使用，根据用户的输入更改布局。例如，您可以将自定义布局对象与手势识别器结合使用，使项目跟踪用户手指在屏幕上的位置。您还需要实现集合视图委托的collectionView(_:transitionLayoutForOldLayout:newLayout:)方法，并在需要时返回自定义布局对象。

```swift
@MainActor class UICollectionViewTransitionLayout : UICollectionViewLayout
```

# API

## Initializing the Transition Layout Object 初始化过渡布局对象

```swift
init(currentLayout: UICollectionViewLayout, nextLayout: UICollectionViewLayout)
init?(coder: NSCoder)

```

## Updating the Transition Information 更新“过渡信息”

```swift
// 过渡的完成百分比。
var transitionProgress: CGFloat

// 设置动画键的值。
func updateValue(CGFloat, forAnimatedKey: String)

// 返回指定键最近设置的值。
func value(forAnimatedKey: String) -> CGFloat
```

## Accessing the Layout Objects 访问布局对象

```swift
// 集合视图的当前布局对象。
var currentLayout: UICollectionViewLayout

// 集合视图的新布局对象。
var nextLayout: UICollectionViewLayout

```