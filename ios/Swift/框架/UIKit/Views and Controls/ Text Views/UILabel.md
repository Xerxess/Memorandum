<!-- TOC -->

- [UILabel](#uilabel)
- [Customize the Label's Appearance 自定义标签的外观](#customize-the-labels-appearance-自定义标签的外观)
- [为广大受众设计label](#为广大受众设计label)
- [API](#api)
    - [Accessing the Text Attributes 访问文本属性](#accessing-the-text-attributes-访问文本属性)
    - [Sizing the Label’s Text 调整标签文本的大小](#sizing-the-labels-text-调整标签文本的大小)
    - [Managing Highlight Values 管理高亮价值观](#managing-highlight-values-管理高亮价值观)
    - [Drawing a Shadow 画一个阴影](#drawing-a-shadow-画一个阴影)
    - [Drawing and Positioning Overrides 绘图和定位覆盖](#drawing-and-positioning-overrides-绘图和定位覆盖)
    - [Getting the Layout Constraints 获得布局约束](#getting-the-layout-constraints-获得布局约束)
    - [访问其他属性](#访问其他属性)

<!-- /TOC -->

# UILabel

显示一行或多行信息文本的视图。

您可以配置标签文本的整体外观，并使用归因字符串自定义文本中子字符串的外观。  
以编程方式在界面中添加和自定义标签，或使用Interface Builder中的属性检查器添加和自定义标签。

按照以下步骤为您的界面添加标签：

* 提供表示内容的字符串或归因字符串。
* 如果您使用的是非属性字符串，请配置标签的外观。
* 设置自动布局规则来管理标签在界面中的大小和位置。
* 提供辅助功能信息和本地化字符串。

```swift
@MainActor class UILabel : UIView
```

# Customize the Label's Appearance 自定义标签的外观

您可以通过为 `text` 属性分配 `NSString` 对象或将 `NSAttributedString` 对象分配给 `attributedText` 属性来提供标签的内容。  
标签显示最近设置的属性。

attributedText属性允许您使用 NSAttributedString API控制单个字符和字符组的外观。  
图1显示了一个标签，显示NSAttributedString，其中包括`自定义字符串字体`、`颜色`和`对齐`的属性。  

如果您想以统一的方式格式化标签的文本，请将 text 属性设置为包含内容的NSString对象，并配置font、textColor、textAlignment和 lineBreakMode 属性。

指定标签在使用`numberOfLines`属性布局文本时使用的`最大行数`。  
将值设置为0允许标签使用尽可能多的行来布局标签宽度内的文本。  
使用 `lineBreakMode` 属性来控制标签如何将文本分成多行，以及与最后一行相关的截断行为。

使用`自动布局`来定位标签并可选调整标签大小。标签的内在内容大小默认为在一行上显示整个内容的大小。  
如果您提供的`自动布局约束定义了标签的宽度`，`而不是高度`，`则标签的内在内容大小将调整高度以完全显示文本`。

当 `label` 的大小在外部完全定义时，您可以指定它如何处理其内容不属于边界的情况。  
要自动减少字体大小，请将 `adjustsFontSizeToFitWidth` 属性设置为 true，并将 minimumScaleFactor 属性设置为 0 至 1 之间的值。  
后一个属性表示标签缩放文本的字体大小比请求的字体大小小多少。  
将允许`DefaultTighteningForTruncation`属性设置为true会指示标签在截断字符串之前减少字符之间的间距。

# 为广大受众设计label

label为您的用户提供了有价值的信息。为了确保信息覆盖广泛的受众，请将文本国际化，并支持标签中的可访问性。  
有关如何实施国际化和本地化的信息，请参阅国际化。  
默认情况下，旁白可以访问标签。标签的默认辅助功能特征是静态文本和启用用户交互。有关更多信息，请参阅在应用程序中支持旁白。要了解如何使用文本样式来支持动态类型，请参阅自动缩放字体。

# API

## Accessing the Text Attributes 访问文本属性

```swift
// 标签显示的文本。
// 默认情况下，此属性为nil。在此属性分配新值也会用相同的文本替换归因文本属性的值，尽管没有任何固有的样式属性。
// 相反，标签使用shadowColor、textAlignment和类的其他样式相关属性为新字符串设置样式。
var text: String? { get set }

// 标签显示的样式文本。
// 默认情况下，此属性为nil。
// 为此属性分配新值也会将文本属性的值替换为相同的字符串数据，尽管没有任何格式信息。此外，分配新值会更新字体、textColor和其他样式相关属性中的值，以便它们反映从归因字符串中位置0开始的样式信息。
// 通过将字符串的kern设置为null来打开标签的自动kerning。
@NSCopying var attributedText: NSAttributedString? { get set }

// 文本的字体。
// 如果您使用的是样式文本，则为此属性分配新值将字体应用于归因文本属性中的整个字符串。如果您只想将字体应用于文本的一部分，请创建一个具有所需样式信息的新归因字符串，并将其与标签相关联。如果您没有使用样式文本，此属性适用于文本属性中的整个文本字符串。
// 属性的默认值是大小为17点的系统字体（使用UIFont的systemFont（ofSize:）类方法）。
// 将此属性设置为nil会导致它被重置为默认值。
var font: UIFont! { get set }

// 文本的颜色。
// 属性的默认值是系统的标签颜色，它动态适应深色模式的变化。
// 此属性设置为nil会导致它被重置为默认值。
var textColor: UIColor! { get set }

// 对齐文本的技术。
// 在iOS 9及更高版本中，此属性的默认值为NSTextAlignment.natural；
// 在iOS 9之前，默认值为NSTextAlignment.left。
// enum NSTextAlignment : Int, @unchecked Sendable
// case left
// case right 
// case center 文本是中心对齐的。
// case justified 文本两端对齐。
// case natural 文本使用默认对齐来进行应用程序的当前本地化。
var textAlignment: NSTextAlignment { get set }

// 包装和截断标签文本的技术。
// 如果您没有使用样式文本，此属性适用于文本属性中的整个文本字符串。
// 如果您使用的是样式文本，则为此属性分配新值将换行模式应用于归因文本属性中的整个字符串。要仅将换行模式应用于文本的一部分，请创建一个具有所需样式信息的新归因字符串，并将其与标签相关联。然而，NSParagraphStyle属性，如NSLineBreakMode定义的属性，适用于整个段落（如parageRange（for:）的定义），而不是段落中的单词。
// 属性在正常绘图期间和标签必须缩小字体大小以适合其边界框中的文本时都有效。
// 属性的默认值为NSLineBreakMode.byTruncatingTail。
// enum NSLineBreakMode : Int, @unchecked Sendable
// case byWordWrapping 表示包装的值出现在单词边界，除非单词不适合一行。
// case byCharWrapping 指示包装的值发生在第一个不合适的字符之前。
// case byClipping 指示行的值不会超过文本容器的边缘。
// case byTruncatingHead 指示一行显示以便末端适合容器的值，省略字形表示行开头缺失的文本。
// case byTruncatingTail 指示行的值显示，使开头适合容器，省略号字形表示行末尾丢失的文本。
// case byTruncatingMiddle 指示一行显示以便开头和结束适合容器的值，省略号字形表示中间缺少的文本。
var lineBreakMode: NSLineBreakMode { get set }

// 系统在布局多行文本时用于断线的策略。
// 默认值为 standard.
// struct LineBreakStrategy
// static var hangulWordPriority: NSParagraphStyle.LineBreakStrategy 文本系统禁止在韩语字符之间切换。
// static var pushOut: NSParagraphStyle.LineBreakStrategy 文本系统推出单个行，以避免段落最后一行的孤儿单词。
// static var standard: NSParagraphStyle.LineBreakStrategy 文本系统使用与标准UI标签相同的换行策略配置。
var lineBreakStrategy: NSParagraphStyle.LineBreakStrategy { get set }

// 一个布尔值，用于确定标签是否以启用状态绘制其文本。
// 此属性仅决定标签如何绘制其文本。
// 当未启用时，标签会使文本有所变暗，以表明它不活跃。
// 默认值为true。
var isEnabled: Bool { get set }

// 一个布尔值，用于确定标签是否滚动其文本，而其中一个包含的视图具有焦点。
// 如果此值为true，则标签将忽略 lineBreakMode，调整FontSizeToFitWidth，并允许DefaultTighteningForTruncation。
// 当其视图层次结构中的任何祖先有焦点时，标签会滚动其文本。
// 默认值为false。
var enablesMarqueeWhenAncestorFocused: Bool { get set }

// 一个布尔值，用于确定指针悬臂悬在截断文本上时标签的全文是否显示。
// 根据标签的行BreakMode属性的值，标签可能会截断文本太长，无法放入其容器中。
// 要在应用程序中提供指针悬而空时显示全文的选项，请将showsExpansionTextWhenTruncated设置为true。
// 默认值为false。
var showsExpansionTextWhenTruncated: Bool { get set }
```

## Sizing the Label’s Text 调整标签文本的大小

```swift
// 一个布尔值，用于确定标签是否缩小文本的字体大小，以将标题字符串放入标签的边界矩形中。
// 通常，标签使用您在字体属性中指定的字体绘制文本。
// 如果此属性为true，并且文本属性中的文本超过标签的边界矩形，则标签会减少字体大小，直到文本合适或已将字体缩小到最小字体大小。
// 默认值为false。
// 如果您将其更改为true，请确保您还通过修改malScaleFactor属性来设置适当的最小字体比例。这种自动收缩行为仅用于单行标签。
var adjustsFontSizeToFitWidth: Bool { get set }

// 一个布尔值，用于确定标签是否在截断前收紧文本。
// 当此属性的值为true时，标签会收紧其文本的字符间距，然后允许发生任何截断。
// 标签根据字体、当前行宽、换行模式和其他相关信息自动确定收紧的最大量。
// 这种自动收缩行为仅用于单行标签。
// 默认值为false。
var allowsDefaultTighteningForTruncation: Bool { get set }

// 当文本需要缩小以适合标签时，控制文本基线是否保持固定的选项。
// 如果 adjustsFontSizeToFitWidth 为true，则在文本需要调整字体大小以适应的情况下，此属性控制文本基线的行为。
// 此属性的默认值为UIBaselineAdjustment.alignBaselines。
// 此属性仅在数字OfLines为1时有效。
var baselineAdjustment: UIBaselineAdjustment { get set }

// 标签文本的最小缩放系数。
var minimumScaleFactor: CGFloat { get set }

// 渲染文本的最大行数。
var numberOfLines: Int { get set }

```

## Managing Highlight Values 管理高亮价值观

```swift
// 标签文本的高亮显示颜色。
var highlightedTextColor: UIColor? { get set }

// 一个布尔值，用于确定标签是否以高亮显示绘制其文本。
var isHighlighted: Bool { get set }

```

## Drawing a Shadow 画一个阴影

```swift
// 文本的阴影颜色。
// 此属性的默认值为nil，这表明文本没有阴影。
// 除了此属性外，您可能还想通过修改shadowOffset属性来更改默认阴影偏移量。
// 标签使用指定的偏移量和颜色绘制其文本阴影，并且没有模糊。
var shadowColor: UIColor? { get set }

// 文本的阴影偏移，以点为内。
// 阴影颜色不得为nil，此属性才能产生任何效果。
// 默认偏移量大小为（0，-1），表示文本上方有一个阴影。标签使用指定的偏移量和颜色绘制其文本阴影，并且没有模糊。
var shadowOffset: CGSize { get set }
```

## Drawing and Positioning Overrides 绘图和定位覆盖

```swift
// 返回标签文本的绘图矩形。
func textRect(forBounds: CGRect, limitedToNumberOfLines: Int) -> CGRect

// 在指定的矩形中绘制标签的文本或其阴影。
func drawText(in: CGRect)

```

## Getting the Layout Constraints 获得布局约束

```swift
// 多行标签的首选最大宽度（以点为单位）。
var preferredMaxLayoutWidth: CGFloat { get set }

```

## 访问其他属性 

```swift
// 一个布尔值，用于确定系统是否忽略并从事件队列中删除此标签的用户事件。
// UILabel从UIView父类继承此属性。
// 该类将此属性的默认值更改为false。
var isUserInteractionEnabled: Bool { get set }
```