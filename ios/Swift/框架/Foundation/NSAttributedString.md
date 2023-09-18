# NSAttributedString

其部分文本具有相关属性（如视觉样式、超链接或可访问性数据）的字符串。  
NSAttributedString 是 iOS 和 macOS 开发中用于处理富文本（富有样式和格式）的类。它是 NSString 的子类，允许你为字符串的不同部分应用不同的样式，例如字体、颜色、文本大小、段落样式等。

```swift
class NSAttributedString : NSObject
```

* NSAttributedString 只读字符串
* NSMutableAttributedString 可修改字符。
* 您将属性字符串与任何接受它们的API一起使用，例如Core Text。AppKit和UIKit框架还提供了NSMutableAttributedString的子类，称为NSTextStorage，为扩展文本处理系统提供存储。在iOS 6及更高版本中，您可以使用属性字符串在文本视图、文本字段和其他一些控件中显示格式化文本。AppKit和UIKit还定义了基本归因字符串界面的扩展，允许您在当前图形上下文中绘制其内容。
* NSAttributedString对象的默认字体是Helvetica 12点,使用NSParagraphStyle类及其子类NSMutableParagraphStyle来封装NSAttributedString类使用的段落或标尺属性。

# Topics

## Creating an Attributed String 创建属性字符串

```swift
// 使用指定字符串的字符创建属性字符串，并且没有属性信息。
init(string str: String)

// 使用指定的字符串和属性创建一个属性字符串。
init(
    string str: String,
    attributes attrs: [NSAttributedString.Key : Any]? = nil
)

// 使用指定属性字符串的字符和属性创建属性字符串。
init(attributedString attrStr: NSAttributedString)

更多...
https://developer.apple.com/documentation/foundation/nsattributedstring/#1651516
```

## Retrieving Character Information 检索角色信息

```swift
//  属性字符串作为字符串的字符内容。
// 通过使用 string 属性，你可以从富文本字符串中提取纯文本内容，方便进行文本处理、搜索、过滤等操作
var string: String { get }

// 字符串的长度。
var length: Int { get }
```

## Retrieving Attribute Information 检索属性信息

```swift
// 返回指定索引处字符的属性。
// 获取指定位置的文本属性，并了解该属性的生效范围。这对于获取富文本字符串中特定位置的属性信息非常有用。
func attributes(
    at location: Int,
    effectiveRange range: NSRangePointer?
) -> [NSAttributedString.Key : Any]

// 返回指定索引处字符的属性，并通过引用返回属性适用的范围。
func attributes(
    at location: Int,
    longestEffectiveRange range: NSRangePointer?,
    in rangeLimit: NSRange
) -> [NSAttributedString.Key : Any]
let range = NSRange(location: 0, length: attributedString.length)
var longestEffectiveRange = NSRange()
let attributes = attributedString.attributes(at: 0, longestEffectiveRange: &longestEffectiveRange, in: range)
print(attributes)
print(longestEffectiveRange)

// 返回在指定索引中具有指定字符名称的属性的值，以及通过引用，属性应用的范围。
func attribute(
    _ attrName: NSAttributedString.Key,
    at location: Int,
    effectiveRange range: NSRangePointer?
) -> Any?

// 返回在指定索引处具有指定字符名称的属性值，以及通过引用属性应用的范围。
func attribute(
    _ attrName: NSAttributedString.Key,
    at location: Int,
    longestEffectiveRange range: NSRangePointer?,
    in rangeLimit: NSRange
) -> Any?
```

# NSAttributedString.Key

您可以应用于属性字符串中文本的属性。

## attachment

```swift
// attachment 在富文本字符串中是一个特殊的属性，它可以用于将非文本内容（例如图像、视图等）插入到文本中。
// 此属性的值是NSTextAttachment对象。
// 此属性的默认值为nil，表示没有附件。
static let attachment: NSAttributedString.Key

// 创建一个图像附件
let image = UIImage(named: "exampleImage")
let attachment = NSTextAttachment()
attachment.image = image

// 创建一个包含附件的富文本字符串
let attributedString = NSAttributedString(attachment: attachment)

// 在 UILabel 中显示富文本字符串
let label = UILabel()
label.attributedText = attributedString
```

## backgroundColor

```swift
// 文本后面的背景颜色。
//value:UIColor
static let backgroundColor: NSAttributedString.Key
```

## baselineOffset

```swift
// 文本位置的垂直偏移量。
// value:NSNumber
// 用于设置文本基线偏移的属性之一。它可以用于调整文本在垂直方向上相对于基线的位置。
static let baselineOffset: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello, World!", attributes: [.baselineOffset: 5])
let label = UILabel()
label.attributedText = attributedString
```

## cursor

```swift
// 光标对象。
// macOS 10.3+
// value:NSCursor
static let cursor: NSAttributedString.Key
```

## font

```swift
// 文本的字体。
// value:UIFont
// 不指定此属性，则字符串默认使用 12pt Helvetica（Neue）字体。
static let font: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello, World!", attributes: [.font: UIFont.boldSystemFont(ofSize: 16)])
let label = UILabel()
label.attributedText = attributedString
```

## foregroundColor

```swift
// 文本的颜色。
// macOS,  value:NSColor
// iOS,    value: UIColor
static let foregroundColor: NSAttributedString.Key
```

## glyphInfo

```swift
// 字形信息对象的名称。
// NSLayoutManager对象将此NSGlyphInfo对象指定的字形分配给整个属性范围，前提是其内容与指定的基本字符串匹配，并且指定的字形在NSFontAttributeName指定的字体中可用。
// 设置字形信息的属性之一。
// 它用于指定富文本字符串中的字形特性，例如字形替换、字形变换等。
static let glyphInfo: NSAttributedString.Key
```

## kern

```swift
// 文本的字距。
// value:NSNumber 
static let kern: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.kern: 2.0])
let label = UILabel()
label.attributedText = attributedString
```

## ligature

```swift
// 文本的连字。
// value:NSNumber
// 连字是一种字体特性，它使字符之间的形状相互连接，从而形成连续的笔画。
// 默认情况下，大多数字体启用连字连接。
// 0：禁用连字连接。
// 1：启用默认的连字连接。
// 2：根据字体定义的连字规则进行连接。
static let ligature: NSAttributedString.Key
```

## link

```swift
// 文本的链接。
// value:NSURL or NSString
static let link: NSAttributedString.Key
```

## markdownSourcePosition

```swift
// 与一些归因文本对应的Markdown源字符串中的位置。
static let markdownSourcePosition: NSAttributedString.Key
```

##

```swift
// 标记子句段的索引。
// macOS 10.5+
static let markedClauseSegment: NSAttributedString.Key
```

## paragraphStyle

```swift
// 文本的段落样式。
// value:NSParagraphStyle、NSMutableParagraphStyle
// 控制文本的对齐方式（左对齐、右对齐、居中对齐等）、行间距、段落间距、首行缩进、段落缩进等。
// var alignment: NSTextAlignment 该段落的文本对齐。
// var firstLineHeadIndent: CGFloat 段落第一行的缩进。
// var headIndent: CGFloat 除第一行外，段落的缩进。
// var tailIndent: CGFloat 段落的尾缩进。
// var lineHeightMultiple: CGFloat 线高倍数。
// var maximumLineHeight: CGFloat 段落的最大行高。
// var minimumLineHeight: CGFloat 该段落的最小行高。
// var lineSpacing: CGFloat 一条线片段的底部和下一条线的顶部之间的距离。 行高
// var paragraphSpacing: CGFloat 本段底部与下段顶部之间的距离。
// var paragraphSpacingBefore: CGFloat 段落顶部与其文本内容开头之间的距离。
static let paragraphStyle: NSAttributedString.Key

let paragraphStyle = NSMutableParagraphStyle()
paragraphStyle.alignment = .center
paragraphStyle.lineSpacing = 10
let attributedString = NSAttributedString(string: "Hello, World!", attributes: [.paragraphStyle: paragraphStyle])
let label = UILabel()
label.attributedText = attributedString
```

## shadow

```swift
// 文本的阴影。
// value:NSShadow
static let shadow: NSAttributedString.Key

let shadow = NSShadow()
shadow.shadowColor = UIColor.black
shadow.shadowOffset = CGSize(width: 2, height: 2)
shadow.shadowBlurRadius = 4
let attributedString = NSAttributedString(string: "Hello, World!", attributes: [.shadow: shadow])
let label = UILabel()
label.attributedText = attributedString
```

## spellingState

```swift
// 文本的拼写状态。
// macOS 10.5+
static let spellingState: NSAttributedString.Key
```

## strikethroughColor

```swift
// 可以用于设置富文本字符串中删除线的颜色
// value:UIColor
static let strikethroughColor: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.strikethroughStyle: NSUnderlineStyle.single.rawValue,.strikethroughColor: UIColor.red])
let label = UILabel()
label.attributedText = attributedString
```

## strikethroughStyle

```swift
// 文本的删除线样式。
// value:NSUnderlineStyle
// default:styleNone.
static let strikethroughStyle: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.strikethroughStyle: NSUnderlineStyle.single.rawValue])
let label = UILabel()
label.attributedText = attributedString
```

## strokeColor

```swift
// 描边的颜色。
// value:UIColor
// 用于设置富文本字符串中文本的描边颜色
static let strokeColor: NSAttributedString.Key
```

## strokeWidth

```swift
// 描边的宽度。
// value:NSNumber
// 负值表示描边内缩，正值表示描边外扩
static let strokeWidth: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.strokeWidth: -2.0])
let label = UILabel()
label.attributedText = attributedString
```

## superscript

```swift
// 文本的上标。
// macOS 10.0+
// value:NSNumber
//  The default value is 0.
static let superscript: NSAttributedString.Key
```

## textAlternatives

```swift
// 文本的替代方案。
// macOS 10.8+
static let textAlternatives: NSAttributedString.Key
```

##

```swift
// 文本效果。
// value:NSString
// 此属性的值是一个NSString对象。
// 使用此属性指定文本效果，例如LetterpressStyle。
// 此属性的默认值为nil，表示没有文本效果。
static let textEffect: NSAttributedString.Key
```

## toolTip

```swift
// 工具提示文本。
// macOS 10.3+
// value:NSString
// default value is nil, 
static let toolTip: NSAttributedString.Key
```

## underlineColor

```swift
// 底线的颜色。
// value:UIColor
// default:nil
static let underlineColor: NSAttributedString.Key
```

##

```swift
// 文本的下划线样式。
// value:NSNumber
// 此属性的值是一个包含整数的NSNumber对象。
// 对应于NSUnderlineStyle中描述的常量之一。
// 默认值是styleNone。
// static var single: NSUnderlineStyle 画一条线。
// static var thick: NSUnderlineStyle 画一条粗线。
// static var double: NSUnderlineStyle 画一条双线。
// static var patternDot: NSUnderlineStyle 画一条点线。
// static var patternDash: NSUnderlineStyle 画一条虚线。
// static var patternDashDot: NSUnderlineStyle 画一条由虚线和点交替组成的线。
// static var patternDashDotDot: NSUnderlineStyle 画一条由交替的虚线和两个点组成的线。
// static var byWord: NSUnderlineStyle 仅在单词下方或通过单词绘制线条，而不是空白。
static let underlineStyle: NSAttributedString.Key


let attributedString = NSAttributedString(string: "Hello", attributes: [.underlineStyle: NSUnderlineStyle.single.rawValue])
let label = UILabel()
label.attributedText = attributedString
```

##

```swift

```
