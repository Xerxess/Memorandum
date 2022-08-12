<!-- TOC -->

- [UIPickerView](#uipickerview)
- [API](#api)
    - [Providing the Picker Data 提供选择器数据](#providing-the-picker-data-提供选择器数据)
    - [Customizing the Picker Behavior 自定义选择器行为](#customizing-the-picker-behavior-自定义选择器行为)
    - [Getting the Dimensions of the View Picker 获取视图选择器的尺寸](#getting-the-dimensions-of-the-view-picker-获取视图选择器的尺寸)
    - [Reloading the View Picker 重新加载视图选择器](#reloading-the-view-picker-重新加载视图选择器)
    - [Selecting Rows in the View Picker 在视图选择器中选择行](#selecting-rows-in-the-view-picker-在视图选择器中选择行)
    - [Returning the View for a Row and Component 返回行和组件的视图](#returning-the-view-for-a-row-and-component-返回行和组件的视图)
- [UIPickerViewDataSource](#uipickerviewdatasource)
- [UIPickerViewDelegate](#uipickerviewdelegate)
    - [API](#api-1)
        - [Setting the Dimensions of the Picker View 设置选择器视图的尺寸](#setting-the-dimensions-of-the-picker-view-设置选择器视图的尺寸)
        - [Setting the Content of Component Rows 设置组件行的内容](#setting-the-content-of-component-rows-设置组件行的内容)
        - [Responding to Row Selection 响应行选择](#responding-to-row-selection-响应行选择)

<!-- /TOC -->

# UIPickerView

使用旋转轮或插槽机隐喻来显示一组或多组值的视图。

选择器视图显示一个或多个轮子，用户通过这些轮子来选择项目。每个轮子（称为组件）都有一`系列索引行`，`代表可选择的项目`。  
每行都显示一个字符串或视图，以便用户可以识别该行上的项目。  
用户通过将车轮旋转到所需的值来选择项目，这些值与选择指示器对齐。

您使用选择器数据源（采用`UIPickerViewDataSource`协议的对象）提供要在选择器视图中显示的数据。  
使用您的选择器视图委托（一个采用`UIPickerViewDelegate`协议的对象）来提供显示数据和响应用户选择的视图。

```swift
@MainActor class UIPickerView : UIView
```

# API

## Providing the Picker Data 提供选择器数据

```swift
// 采摘器视图的数据源。
weak var dataSource: UIPickerViewDataSource? { get set }
```

## Customizing the Picker Behavior 自定义选择器行为

```swift
// 挑选器视图的代表。
weak var delegate: UIPickerViewDelegate? { get set }
```

## Getting the Dimensions of the View Picker 获取视图选择器的尺寸

```swift
// 用于选择器视图的组件数量。
// UIPickerView对象从数据源获取此属性的值并缓存它。
// 默认值为0。
var numberOfComponents: Int { get }

// 返回组件的行数。
// 选择器视图从数据源获取此属性的值并缓存它。
// 默认值为零。
func numberOfRows(inComponent component: Int) -> Int

// 返回组件的行大小。
// 给定组件中的行大小。这通常是显示组件中用作行的最大字符串或视图所需的大小。
func rowSize(forComponent component: Int) -> CGSize
```

## Reloading the View Picker 重新加载视图选择器

```swift
// 重新加载选择器视图的所有组件。
func reloadAllComponents()

// 重新加载选择器视图的特定组件。
func reloadComponent(Int)

```

## Selecting Rows in the View Picker 在视图选择器中选择行

```swift
// 在选择器视图的指定组件中选择一行。
func selectRow(Int, inComponent: Int, animated: Bool)

// 返回给定组件中所选行的索引。
func selectedRow(inComponent: Int) -> Int
```

## Returning the View for a Row and Component 返回行和组件的视图

```swift
// 返回给定行和组件的选择器视图使用的视图。
// 委托人在选择器View(_:viewForRow:forComponent:reusing:)方法中提供的视图。
// 如果组件的指定行不可见，或者委托没有实现 pickerView:viewForRow:forComponent:reusingView:，则返回nil。
func view(forRow: Int, forComponent: Int) -> UIView?

```

# UIPickerViewDataSource

UIPickerViewDataSource协议必须由介于UIPickerView对象和应用程序的数据模型之间进行该选择器视图的对象。数据源为选择器视图提供组件数量和每个组件中的行数，以显示选择器视图数据。本协议中的两种方法都是必需的。

```swift
@MainActor protocol UIPickerViewDataSource
```

```swift
// 当需要组件数量时，由选择器视图调用。
// 必填。
// 采摘器视图应显示的组件数量（或“列”）。
func numberOfComponents(in: UIPickerView) -> Int

// 当选择器视图需要指定组件的行数时，由选择器视图调用。
// 必填。
// 组件的行数。
func pickerView(UIPickerView, numberOfRowsInComponent: Int) -> Int
```

# UIPickerViewDelegate

UIPickerView对象的委托必须采用此协议，并至少实现其部分方法，为选择器视图提供构建自己所需的数据。

委托实现此协议所需的方法，以返回每个组件中行的`高度、宽度、行标题和视图内容`。  
它还必须提供每个组件行的内容，无论是字符串还是视图。  
`通常，委托实现其他可选方法来响应组件行的新选择或选择`。

```swift
@MainActor protocol UIPickerViewDelegate
```

## API

### Setting the Dimensions of the Picker View 设置选择器视图的尺寸

```swift
// 当需要用于绘制行内容的行高时，由选择器视图调用。
func pickerView(UIPickerView, rowHeightForComponent: Int) -> CGFloat

// 当需要行宽度用于绘制行内容时，由选择器视图调用。
func pickerView(UIPickerView, widthForComponent: Int) -> CGFloat

```

### Setting the Content of Component Rows 设置组件行的内容

此组中的方法标记为@optional。  
但是，要使用选择器视图，  
您必须实现 pickerView（_:titleForRow:forComponent:）或 pickerView（_:viewForRow:forComponent:reusing:）方法来提供组件行的内容。

```swift
// 当选择器视图需要标题用于给定组件中的给定行时，由选择器视图调用。
func pickerView(UIPickerView, titleForRow: Int, forComponent: Int) -> String?

// 当选择器视图需要样式标题用于给定组件中的给定行时调用。
func pickerView(UIPickerView, attributedTitleForRow: Int, forComponent: Int) -> NSAttributedString?

// 当选择器视图需要视图用于给定组件中的给定行时，由选择器视图调用。
// 用作行内容的视图对象。该对象可以是UIView的任何子类，如UILabel、UIImageView，甚至是自定义视图。
// 如果之前使用的视图（视图参数）足够，请返回。如果您返回其他视图，则会释放以前使用的视图。拾取器视图将返回的视图集中在矩形中。
func pickerView(UIPickerView, viewForRow: Int, forComponent: Int, reusing: UIView?) -> UIView
```

### Responding to Row Selection 响应行选择

```swift
// 当用户在组件中选择一行时，由选择器视图调用。
func pickerView(UIPickerView, didSelectRow: Int, inComponent: Int)
```
