<!-- TOC -->

- [UIDatePicker](#uidatepicker)
- [Configure a date picker](#configure-a-date-picker)
- [回应用户互动](#回应用户互动)
- [调试日期选择器](#调试日期选择器)
- [改变外观](#改变外观)
- [指定区域设置](#指定区域设置)
- [API](#api)
    - [](#)
    - [Configuring the date picker mode 配置日期选择器模式](#configuring-the-date-picker-mode-配置日期选择器模式)
    - [Configuring the date picker style 配置日期选择器样式](#configuring-the-date-picker-style-配置日期选择器样式)
    - [Configuring temporal attributes 配置时间属性，](#configuring-temporal-attributes-配置时间属性)

<!-- /TOC -->

# UIDatePicker

用于输入日期和时间值的控件。

您可以使用日期选择器允许用户输入时间点（日历日期、时间值或两者兼而有之）或时间间隔（例如计时器）。  
日期选择器向其关联的目标对象报告交互。

要将日期选择器添加到您的界面：

* 在创建时设置日期选择器模式。
* 如果需要，提供额外的配置选项，例如最小和最大日期。
* 将操作方法连接到日期选择器。
* 设置自动布局规则来管理日期选择器在界面中的位置。

您仅使用日期选择器来处理时间和日期的选择。  
如果您想处理从列表中选择任意项目，请使用`UIPickerView`对象。

```swift
@MainActor class UIDatePicker : UIControl
```

# Configure a date picker

`datePickerMode`属性决定日期选择器的配置。  
您可以以编程方式或在Interface Builder中设置datePickerMode值。  
对于包含日期或时间值的模式，您还可以配置区域设置、日历和时区信息。  
日期选择器在为当前用户的日期和时间值格式化时使用该信息，并`默认为设备的区域设置、日历和时区`。  
日期属性以NSDate对象的形式表示当前选择的日期，该对象与日历和时区无关。

要限制用户可以选择的日期范围，请将值分配给 minimumDate and maximumDate 属性。  
您还可以使用 minuteInterval 属性仅允许特定的时间增量。

将datePickerMode属性设置为`UIDatePicker.Mode.countDownTimer`允许用户选择以小时和分钟为单位的持续时间。  
在此模式下，countDownDuration属性表示显示的持续时间，以秒为单位测量为时间间隔。  
请注意，即使您在几秒钟内设置了此属性，日期选择器也只能在几分钟内显示值。
下图显示了将datePickerMode属性设置为UIDatePicker.Mode.countDownTimer的日期选择器，分钟间隔属性设置为5。countDownDuration的值目前为4500。

# 回应用户互动

当用户更改所选日期时，日期选择者使用  target-action 设计模式来通知您的应用程序。  
要在日期选择器的值发生变化时收到通知，请在`valueChanged`事件中注册您的操作方法。  
在运行时，日期选择器调用您的方法，以响应用户选择日期或时间。

# 调试日期选择器

# 改变外观

您可以通过设置首选`DatePickerStyle`来更改UIDatePicker的外观。有关外观样式列表，请参阅UIDatePickerStyle。
您`应该使用自动布局将日期选择器集成到布局`中。虽然日期选择器可以调整大小，但它们应该以其内在内容大小使用。

# 指定区域设置

# API

## 

```swift
// 用于日期选择器的日历。
// 此属性的默认值对应于用户在设置中配置的当前日历。
// 这相当于调用NSCalendar类方法电流返回的值。
// 属性设置为nil相当于将其设置为默认值。
// 日历指定用于计算时间的文化系统的细节；它们标识一年的开始、长度和划分。
var calendar: Calendar! { get set }

// 日期选择器显示的日期。
// 使用此属性获取并设置当前选择的日期。
// 属性的默认值是创建UIDatePicker对象的日期。
// 设置此属性通过将车轮旋转到新的日期和时间来为日期选择器添加动画；如果您不希望在设置日期时出现任何动画，请使用setDate(_:animated:)方法，为动画参数传递false。当模式设置为UIDatePicker.Mode.countDownTimer时，此属性的此行为未定义；而是引用countDownDuration属性。
var date: Date { get set }

// 日期选择器使用的区域设置。
var locale: Locale? { get set }

// 设置要在日期选择器中显示的日期，并带有动画设置的选项。
func setDate(
    _ date: Date,
    animated: Bool
)

// 日期选择器显示的日期中反映的时区。
var timeZone: TimeZone? { get set }
```

## Configuring the date picker mode 配置日期选择器模式

```swift
// 日期选择器的模式。
// 使用此属性更改日期选择器显示的信息类型。它确定日期选择器是否允许选择日期、时间、日期和时间或倒计时时间。
// 默认模式是UIDatePicker.Mode.dateAndTime。
// enum Mode : Int, @unchecked Sendable
// case time 以小时、分钟和（可选）AM/PM指定显示日期的模式。显示的确切项目及其顺序取决于区域设置。这种模式的一个例子是下午3点。
// case date 以月份、月份和年份显示日期的模式。这些项目的确切顺序取决于区域设置。这种模式的一个例子是2007年11月15日。
// case dateAndTime 一种模式，将日期显示为一周、月份和月份的统一日期，加上小时、分钟和（可选的）AM/PM指定。这些项目的确切顺序和格式取决于区域设置。这种模式的一个例子是[11月15日星期三 | 6 | 53 | PM]。
// case countDownTimer 显示小时和分钟值的模式，例如[ 1 | 53]。应用程序必须设置一个计时器以适当的间隔开火，并将日期选择器设置为秒勾号。
var datePickerMode: UIDatePicker.Mode { get set }
```

## Configuring the date picker style 配置日期选择器样式

```swift
// 日期选择器的当前样式。
// 此属性始终返回具体样式，永远不会返回UIDatePickerStyle.automatic。
ar datePickerStyle: UIDatePickerStyle { get }

// 日期选择器的首选样式。
// 使用此属性指定您喜欢的显示样式。如果样式发生变化，日期选择器可能会生成布局通行证来更新显示。
// 默认样式是UIDatePickerStyle.automatic。有关样式列表，请参阅UIDatePickerStyle。
var preferredDatePickerStyle: UIDatePickerStyle { get set }

// 决定日期选择器外观的样式。
// case automatic 一种样式，表明系统根据当前平台和日期选择器模式选择具体样式。
// case compact 一种样式，指示日期选择器显示为标签，点击时显示日历样式编辑器。
// case inline 一种样式，指示日期选择器显示为内联、可编辑的字段。
// case wheels 一种样式，指示日期选择器显示为车轮选择器。
enum UIDatePickerStyle : Int, @unchecked Sendable
```

## Configuring temporal attributes 配置时间属性，

```swift
// 日期选择器可以显示的最大日期。
// 使用此属性配置日期选择器界面中选择的最大日期。
// 该属性包含一个NSDate对象或nil（默认值），这意味着没有最大日期。
// 此属性以及最小日期属性允许您指定有效的日期范围。如果最小日期值大于最大日期值，则忽略这两个属性。
// 在倒计时器模式（UIDatePicker.Mode.countDownTimer）中，最小和最大日期也会被忽略。
var maximumDate: Date? { get set }

// 日期选择器可以显示的最小日期。
var minimumDate: Date? { get set }

// 日期选择器应显示分钟的间隔。
// 使用此属性设置分钟轮显示的间隔（例如，15分钟）。
// 间隔值必须均匀地划分为60；如果不是，则使用默认值。
// 默认值和最小值为1；最大值为30。
var minuteInterval: Int { get set }

// 当模式属性设置为显示倒计时，日期选择器显示的值。
// 当日期选择器的模式属性设置为UIDatePicker.Mode.countDownTimer时，使用此属性获取并设置当前选择的值。
// 此属性为TimeInterval类型，因此以秒为单位测量，尽管日期选择器仅显示小时和分钟。如果日期选择器的模式不是UIDatePicker.Mode.countDownTimer，则此值未定义；请引用日期属性。
// 默认值为0.0，最大值为23:59（86,340秒）。
var countDownDuration: TimeInterval { get set }

var roundsToMinuteInterval: Bool
```