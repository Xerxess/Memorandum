<!-- TOC -->

- [UISegmentedControl](#uisegmentedcontrol)
- [自定义外观](#自定义外观)
- [API](#api)
    - [Initializing a Segmented Control](#initializing-a-segmented-control)
    - [Managing Segment Content 管理细分内容](#managing-segment-content-管理细分内容)
    - [Managing Segment Actions 管理分段操作](#managing-segment-actions-管理分段操作)
    - [Managing Segments 管理细分市场](#managing-segments-管理细分市场)
    - [Managing Segment Behavior and Appearance 管理细分行为和外观](#managing-segment-behavior-and-appearance-管理细分行为和外观)
    - [Customizing Appearance 自定义外观](#customizing-appearance-自定义外观)

<!-- /TOC -->


# UISegmentedControl

常用的 tab 水平标签
由多个部分组成的水平控制，每个部分都起到离散按钮的作用。

分段控件可以显示标题（NSString对象）或图像（UIImage对象）。  
UISegmentedControl对象会自动调整片段的大小，以成比例地适应其超级视图，除非它们有特定的宽度集。  
当您添加和删除片段时，您可以请求使用滑动和褪色效果对操作进行动画。

您可以使用valueChanged常量为分段控件注册目标操作方法，如下所示。

如何配置分段控件可能会影响其显示行为：

* 如果您将分段控件设置为具有瞬时样式，则当用户触摸时，段不会显示为选定（蓝色背景）。披露按钮总是短暂的，不会影响实际选择。
* 在3.0之前的iOS版本中，如果分段控件只有两个段，那么它的行为就像一个开关——点击当前选择的段会导致选择另一个段。在iOS 3.0及更高版本上，点击当前选择的时段不会导致选择其他时段。

```swift
@MainActor class UISegmentedControl : UIControl
```

# 自定义外观

在iOS 5及更高版本中，您可以使用自定义外观中列出的方法自定义分段控件的外观。  
您可以使用外观代理（例如[UISegmentedControl外观]）或单个控件自定义所有分段控件的外观。

一般来说，在自定义外观时，您应该为属性的正常状态指定一个值，供没有自定义值集的其他状态使用。  
同样，当属性依赖于条形指标时（在iPhone上，横向条的高度与标准不同），您应该确保为UIBarMetrics.default指定一个值。

要提供完整的自定义，您需要使用 setDividerImage（_:forLeftSegmentState:rightSegmentState:barMetrics:)  为不同的状态组合提供分隔图像

# API

## Initializing a Segmented Control

```swift
init(items: [Any]?)

// 当操作包含两者时，片段更喜欢图像而不是标题。
// 选择一个段会调用操作的UIActionHandler，以及valueChanged和primaryActionTriggered控制事件的处理程序。
init(frame: CGRect, actions: [UIAction])
init(frame: CGRect)
init?(coder: NSCoder)
```

## Managing Segment Content 管理细分内容

```swift
// 将段的内容设置为给定的图像。
func setImage(UIImage?, forSegmentAt: Int)

// 返回特定段的图像。
func imageForSegment(at: Int) -> UIImage?

// 设置片段的标题。
func setTitle(String?, forSegmentAt: Int)

// 返回指定段的标题。
func titleForSegment(at: Int) -> String?
```

## Managing Segment Actions 管理分段操作

```swift
// 在您指定的索引处 获取段的操作（如果存在的话）。
func actionForSegment(at: Int) -> UIAction?

// 在您指定的索引处设置段的操作。
func setAction(UIAction, forSegmentAt: Int)

```

## Managing Segments 管理细分市场

```swift
// 返回接收器的段数。
var numberOfSegments: Int { get }

// 具有与您指定的标识符匹配的操作的段的索引。
func segmentIndex(identifiedBy: UIAction.Identifier) -> Int

// 插入一个带有您在给定索引中指定的操作的段。
func insertSegment(action: UIAction, at: Int, animated: Bool)

// 在您指定的位置插入一个段，并给它一个图像作为内容。
func insertSegment(with: UIImage?, at: Int, animated: Bool)

// 在您指定的位置插入一个段，并给它一个标题作为内容。
func insertSegment(withTitle: String?, at: Int, animated: Bool)

// 移除分段控件的所有部分。
func removeAllSegments()

// 从分段控件中删除您指定的段，可选地为过渡动画。
func removeSegment(at: Int, animated: Bool)

// 标识用户上次触摸的选定段的索引号。
// 在用户触摸段之前，默认值为noSegment（未选择段）。
// 将此属性设置为-1以关闭当前选择。当isMomentary为true时，UISegmentedControl会忽略此属性。
// 当用户触摸一个段以更改选择时，系统会生成控制事件valueChanged。
// 如果您设置分段控件来响应此控件事件，它会向其目标发送操作消息。
var selectedSegmentIndex: Int { get set }
```

## Managing Segment Behavior and Appearance 管理细分行为和外观

```swift
// 一个布尔值，用于确定接收器中的段是否显示所选状态。
// 此属性的默认值为false。
// 如果设置为true，控件中的段不会显示所选状态，也不会在跟踪结束后更新slectedSegmentIndex的值。
var isMomentary: Bool { get set }

// 启用您指定的段。
func setEnabled(Bool, forSegmentAt: Int)

// 返回是否启用了指示的段。
func isEnabledForSegment(at: Int) -> Bool

// 调整绘制指定段内容（图像或文本）的偏移量。
// 从绘制段内容的段的起源的偏移量（作为CGSize类型）。默认偏移量为（0,0）。
func setContentOffset(CGSize, forSegmentAt: Int)

// 返回用于绘制您指定的段的内容（图像或文本）的偏移量。
func contentOffsetForSegment(at: Int) -> CGSize

// 在您指定的索引处设置段的宽度。
// 指定段宽度的浮点值。默认值为{0.0}，这告诉UISegmentedControl自动调整段大小。
func setWidth(CGFloat, forSegmentAt: Int)

// 返回您指定的索引处段的宽度。
func widthForSegment(at: Int) -> CGFloat

// 指示控件是否尝试根据其内容宽度调整段宽度。
// 如果此属性的值为true，对于宽度值为0的段，控件会尝试根据其内容宽度调整段宽度。
// 默认值为false。
var apportionsSegmentWidthsByContent: Bool { get set }
```

## Customizing Appearance 自定义外观

```swift
// 用于突出显示当前所选片段的颜色。
var selectedSegmentTintColor: UIColor? { get set }

// 返回给定状态和条形指标的背景图像。
// enum UIBarMetrics : Int, @unchecked Sendable 用于指定外观指标的常量。
// case `default` 指定设备的默认度量。 默认，竖屏？
// case compact 指定使用电话惯用语时的指标。 拥挤？横屏？ 紧凑的;紧密的;小型的;
// case defaultPrompt 为具有prompt(提示符)属性的条形图指定设备的默认度量，例如UINavigationBar和UISearchBar。
// case compactPrompt 在使用电话惯用语时，使用 prompt(提示符) 属性指定条形的度量，例如 UINavigationBar 和 UISearchBar。
// static var landscapePhone: UIBarMetrics 使用电话习惯用法指定横向方向的指标。
// static var landscapePhonePrompt: UIBarMetrics 使用带有prompt(提示符)属性的条形图的电话习惯用法指定横向方向的指标，如UINavigationBar和UISearchBar。
func backgroundImage(for: UIControl.State, barMetrics: UIBarMetrics) -> UIImage?

// 为给定的状态和条形指标设置背景图像
func setBackgroundImage(UIImage?, for: UIControl.State, barMetrics: UIBarMetrics)

// 返回给定段和条形指标的定位偏移量。
func contentPositionAdjustment(forSegmentType: UISegmentedControl.Segment, barMetrics: UIBarMetrics) -> UIOffset

// 设置给定段的内容定位偏移量和条形指标。
func setContentPositionAdjustment(UIOffset, forSegmentType: UISegmentedControl.Segment, barMetrics: UIBarMetrics)

// 用于指定控件中段的常量
// case any 指定任何段。
// case left 有上限的最左边部分。
// case center 最左边和最右边段之间的任何段。
// case right 有上限的最右边部分。
// case alone 独立的部分，两端都有上限。
enum UISegmentedControl.Segment

// 返回用于左右段状态和条形指标的给定组合的分隔图像。
func dividerImage(forLeftSegmentState: UIControl.State, rightSegmentState: UIControl.State, barMetrics: UIBarMetrics) -> UIImage?

// 设置分隔图像，用于左右段状态和条形指标的给定组合。
func setDividerImage(UIImage?, forLeftSegmentState: UIControl.State, rightSegmentState: UIControl.State, barMetrics: UIBarMetrics)

// 返回给定控制状态的标题的文本属性。
func titleTextAttributes(for: UIControl.State) -> [NSAttributedString.Key : Any]?

// 为给定的控制状态设置标题的文本属性。
func setTitleTextAttributes([NSAttributedString.Key : Any]?, for: UIControl.State)
```