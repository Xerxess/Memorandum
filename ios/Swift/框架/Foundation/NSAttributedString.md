<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NSAttributedString](#nsattributedstring)
  - [Topics](#topics)
    - [Creating an Attributed String 创建属性字符串](#creating-an-attributed-string-创建属性字符串)
    - [Retrieving Character Information 检索角色信息](#retrieving-character-information-检索角色信息)
    - [Retrieving Attribute Information 检索属性信息](#retrieving-attribute-information-检索属性信息)
  - [NSAttributedString.DocumentAttributeKey](#nsattributedstringdocumentattributekey)
  - [NSAttributedString.Key](#nsattributedstringkey)
    - [attachment](#attachment)
    - [backgroundColor](#backgroundcolor)
    - [baselineOffset](#baselineoffset)
    - [cursor](#cursor)
    - [font](#font)
    - [foregroundColor](#foregroundcolor)
    - [glyphInfo](#glyphinfo)
    - [kern](#kern)
    - [ligature](#ligature)
    - [link](#link)
    - [markdownSourcePosition](#markdownsourceposition)
    - [markedClauseSegment](#markedclausesegment)
    - [paragraphStyle](#paragraphstyle)
    - [shadow](#shadow)
    - [spellingState](#spellingstate)
    - [strikethroughColor](#strikethroughcolor)
    - [strikethroughStyle](#strikethroughstyle)
    - [strokeColor](#strokecolor)
    - [strokeWidth](#strokewidth)
    - [superscript](#superscript)
    - [textAlternatives](#textalternatives)
    - [textEffect](#texteffect)
    - [toolTip](#tooltip)
    - [underlineColor](#underlinecolor)
    - [underlineStyle](#underlinestyle)
    - [DEMO](#demo)
- [AttributedString (ios15)](#attributedstring-ios15)

<!-- /code_chunk_output -->

# NSAttributedString

其部分文本具有相关属性（如视觉样式、超链接或可访问性数据）的字符串。  
NSAttributedString 是 iOS 和 macOS 开发中用于处理富文本（富有样式和格式）的类。它是 NSString 的子类，允许你为字符串的不同部分应用不同的样式，例如字体、颜色、文本大小、段落样式等。

```swift
class NSAttributedString : NSObject
```

- NSAttributedString 只读字符串
- NSMutableAttributedString 可修改字符。
- 您将属性字符串与任何接受它们的API一起使用，例如Core Text。AppKit和UIKit框架还提供了NSMutableAttributedString的子类，称为NSTextStorage，为扩展文本处理系统提供存储。在iOS 6及更高版本中，您可以使用属性字符串在文本视图、文本字段和其他一些控件中显示格式化文本。AppKit和UIKit还定义了基本归因字符串界面的扩展，允许您在当前图形上下文中绘制其内容。
- NSAttributedString对象的默认字体是Helvetica 12点,使用NSParagraphStyle类及其子类NSMutableParagraphStyle来封装NSAttributedString类使用的段落或标尺属性。

## Topics

### Creating an Attributed String 创建属性字符串

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

### Retrieving Character Information 检索角色信息

```swift
//  属性字符串作为字符串的字符内容。
// 通过使用 string 属性，你可以从富文本字符串中提取纯文本内容，方便进行文本处理、搜索、过滤等操作
var string: String { get }

// 字符串的长度。
var length: Int { get }
```

### Retrieving Attribute Information 检索属性信息

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

## NSAttributedString.DocumentAttributeKey

```swift

```

## NSAttributedString.Key

您可以应用于属性字符串中文本的属性。

### attachment

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

### backgroundColor

```swift
// 文本后面的背景颜色。
//value:UIColor
static let backgroundColor: NSAttributedString.Key
```

### baselineOffset

```swift
// 文本位置的垂直偏移量。
// value:NSNumber
// 用于设置文本基线偏移的属性之一。它可以用于调整文本在垂直方向上相对于基线的位置。
static let baselineOffset: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello, World!", attributes: [.baselineOffset: 5])
let label = UILabel()
label.attributedText = attributedString
```

### cursor

```swift
// 光标对象。
// macOS 10.3+
// value:NSCursor
static let cursor: NSAttributedString.Key
```

### font

```swift
// 文本的字体。
// value:UIFont
// 不指定此属性，则字符串默认使用 12pt Helvetica（Neue）字体。
static let font: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello, World!", attributes: [.font: UIFont.boldSystemFont(ofSize: 16)])
let label = UILabel()
label.attributedText = attributedString
```

### foregroundColor

```swift
// 文本的颜色。
// macOS,  value:NSColor
// iOS,    value: UIColor
static let foregroundColor: NSAttributedString.Key
```

### glyphInfo

```swift
// 字形信息对象的名称。
// NSLayoutManager对象将此NSGlyphInfo对象指定的字形分配给整个属性范围，前提是其内容与指定的基本字符串匹配，并且指定的字形在NSFontAttributeName指定的字体中可用。
// 设置字形信息的属性之一。
// 它用于指定富文本字符串中的字形特性，例如字形替换、字形变换等。
static let glyphInfo: NSAttributedString.Key
```

### kern

```swift
// 文本的字距。
// value:NSNumber 
static let kern: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.kern: 2.0])
let label = UILabel()
label.attributedText = attributedString
```

### ligature

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

### link

```swift
// 文本的链接。
// value:NSURL or NSString
static let link: NSAttributedString.Key
```

### markdownSourcePosition

```swift
// 与一些归因文本对应的Markdown源字符串中的位置。
static let markdownSourcePosition: NSAttributedString.Key
```

### markedClauseSegment

```swift
// 标记子句段的索引。
// macOS 10.5+
static let markedClauseSegment: NSAttributedString.Key
```

### paragraphStyle

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

### shadow

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

### spellingState

```swift
// 文本的拼写状态。
// macOS 10.5+
static let spellingState: NSAttributedString.Key
```

### strikethroughColor

```swift
// 可以用于设置富文本字符串中删除线的颜色
// value:UIColor
static let strikethroughColor: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.strikethroughStyle: NSUnderlineStyle.single.rawValue,.strikethroughColor: UIColor.red])
let label = UILabel()
label.attributedText = attributedString
```

### strikethroughStyle

```swift
// 文本的删除线样式。
// value:NSUnderlineStyle
// default:styleNone.
static let strikethroughStyle: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.strikethroughStyle: NSUnderlineStyle.single.rawValue])
let label = UILabel()
label.attributedText = attributedString
```

### strokeColor

```swift
// 描边的颜色。
// value:UIColor
// 用于设置富文本字符串中文本的描边颜色
static let strokeColor: NSAttributedString.Key
```

### strokeWidth

```swift
// 描边的宽度。
// value:NSNumber
// 负值表示描边内缩，正值表示描边外扩
static let strokeWidth: NSAttributedString.Key

let attributedString = NSAttributedString(string: "Hello", attributes: [.strokeWidth: -2.0])
let label = UILabel()
label.attributedText = attributedString
```

### superscript

```swift
// 文本的上标。
// macOS 10.0+
// value:NSNumber
//  The default value is 0.
static let superscript: NSAttributedString.Key
```

### textAlternatives

```swift
// 文本的替代方案。
// macOS 10.8+
static let textAlternatives: NSAttributedString.Key
```

### textEffect

```swift
// 文本效果。
// value:NSString
// 此属性的值是一个NSString对象。
// 使用此属性指定文本效果，例如LetterpressStyle。
// 此属性的默认值为nil，表示没有文本效果。
static let textEffect: NSAttributedString.Key
```

### toolTip

```swift
// 工具提示文本。
// macOS 10.3+
// value:NSString
// default value is nil, 
static let toolTip: NSAttributedString.Key
```

### underlineColor

```swift
// 底线的颜色。
// value:UIColor
// default:nil
static let underlineColor: NSAttributedString.Key
```

### underlineStyle

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

let underlineStyle = [NSUnderlineStyle.single,.patternDot]
let attributedString = NSAttributedString(string: "Hello", attributes: [.underlineStyle: underlineStyle.rawValue])
let label = UILabel()
label.attributedText = attributedString
```

### DEMO

```swift
import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var stack: UIStackView!
    // Tag标签
    lazy var tag:UIImage = {
        let label = UILabel(frame: CGRect(x: 0, y: 0, width: 90, height: 20))
        
        label.backgroundColor = UIColor.blue
        label.textColor = UIColor.white
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 14)
        label.text = "TOP 10"
        
        label.layer.cornerRadius = 3  // 设置圆角半径
        label.layer.masksToBounds = true  // 将超出圆角区域的内容裁剪
        
        // 创建图像的绘制上下文
        UIGraphicsBeginImageContextWithOptions(label.bounds.size, false, 0.0)
        guard let context = UIGraphicsGetCurrentContext() else {
            return UIImage(named: "default-avatar")!
        }
        
        // 在绘制上下文中绘制标签
        label.layer.render(in: context)
        
        // 从绘制上下文中获取图像
        let image = UIGraphicsGetImageFromCurrentImageContext()
        
        // 结束绘制上下文
        UIGraphicsEndImageContext()
        return image!
    }()
    
    // 上标
    lazy var superscriptAttributes = {
        let attributedString = NSMutableAttributedString(string: "H2O")
        
        // 添加上标
        let superscriptAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 12),
            .baselineOffset: 8
        ]
        attributedString.setAttributes(superscriptAttributes, range: NSRange(location: 1, length: 1))
        
        // 添加下标
        let subscriptAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 12),
            .baselineOffset: -6
        ]
        attributedString.setAttributes(subscriptAttributes, range: NSRange(location: 2, length: 1))
    }()
    
    // 下标
    lazy var subscriptAttributes = {
        let attributedString = NSMutableAttributedString(string: "H2O")
        
        // 添加上标
        let superscriptAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 12),
            .baselineOffset: 8
        ]
        attributedString.setAttributes(superscriptAttributes, range: NSRange(location: 1, length: 1))
        
        // 添加下标
        let subscriptAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 12),
            .baselineOffset: -6
        ]
        attributedString.setAttributes(subscriptAttributes, range: NSRange(location: 2, length: 1))
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        let label = UILabel()
        view.addSubview(label)
        label.numberOfLines = 3
        label.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor,constant: 90),
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor, constant: 0),
            label.widthAnchor.constraint(equalTo: view.safeAreaLayoutGuide.widthAnchor, multiplier: 0.8)
        ])
        
        // 附件
        let image = UIImage(named: "default-avatar")
        let attachment = NSTextAttachment()
        attachment.bounds = CGRect(x: 1, y: 0, width: 90, height: 20)
        let baselineOffset2 = (UIFont.systemFont(ofSize: 14).capHeight - attachment.bounds.size.height) / 2.0
        attachment.image = tag
        
        
        // 设置文本样式、行高
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .left
        paragraphStyle.lineSpacing = 5
        
        let attr = NSMutableAttributedString(string: "文档级别属性是应用于整个文档级别属性是应用于整个文档级别属性是应用于整个文档级别属性是应用于整个 NSAttributedString 的属性，而不是仅仅应用于特定的字符范围。",attributes: [.baselineOffset:0,.foregroundColor:UIColor.red,.font:UIFont.systemFont(ofSize: 14)])
        let ms = NSMutableAttributedString(attachment: attachment)
//        ms.addAttributes([.baselineOffset:baselineOffset2], range: NSRange(location: 0, length: ms.length))
        attr.insert(ms, at: 1)
        
//        attr.addAttributes([.paragraphStyle:paragraphStyle], range: NSRange(location: 0, length: attr.length))
        label.attributedText = attr
        print(attr.length)
        
        //
        let attributedString = NSMutableAttributedString(string: "Hello")
        
        // 创建附件
        let attachment2 = NSTextAttachment()
        attachment2.bounds = CGRect(x: 0, y: 0, width: 22, height: 22)
        attachment2.image = UIImage(named: "default-avatar")
        
        // 调整基线偏移量
        let font = UIFont.systemFont(ofSize: 20)
        let attachmentSize = attachment2.bounds.size
        let baselineOffset = (font.capHeight - attachmentSize.height) / 2.0
        print(font.capHeight)
        // 创建附件属性字符串
        let attachmentString = NSAttributedString(attachment: attachment2)
        let attributedAttachmentString = NSMutableAttributedString(attributedString: attachmentString)
        attributedAttachmentString.addAttribute(NSAttributedString.Key.baselineOffset, value: baselineOffset, range: NSRange(location: 0, length: attributedAttachmentString.length))
        print(attributedAttachmentString.length)
        
        // 将附件属性字符串添加到主属性字符串
        attributedString.append(attributedAttachmentString)
        
        // label.attributedText = attributedString
    }
}

```

# AttributedString (ios15)

```swift
class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.numberOfLines = 0 // 0 不限制
        view.addSubview(label)
        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor,constant: 90),
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor, constant: 0),
            label.widthAnchor.constraint(equalTo: view.safeAreaLayoutGuide.widthAnchor, multiplier: 0.8)
        ])
        
        var attrString = AttributedString("Hello, World!小红问小明，小明是誰,小明回小红，谁是小明,小红问小明，小明是誰,小明回小红，谁是小明")
        
        // 字体色
        attrString.uiKit.foregroundColor = .yellow
        
        // 背景色
        attrString.uiKit.backgroundColor = .white
        
        // 字体
        let font = UIFont.systemFont(ofSize: 22,weight: .bold)
        attrString.uiKit.font = font
        
        // 字距
        //        attrString.uiKit.kern = 20
        
        // 文字投影
        let shadow =  NSShadow()
        shadow.shadowOffset = .init(width: 5, height: 5)
        shadow.shadowBlurRadius = 5
        attrString.uiKit.shadow = shadow
        
        // 笔画
        attrString.uiKit.strokeWidth = -5 // 负值描边
        attrString.uiKit.strokeColor = .red
        
        // 下划线
        // .single（单线）、.double（双线）、.thick（粗线）
        attrString.uiKit.underlineStyle = [.patternDot,.single]
        attrString.uiKit.underlineColor = .red
        
        // 下划线
        // .single（单线）、.double（双线）、.thick（粗线）
        attrString.uiKit.strikethroughStyle = [.patternDot,.single]
        attrString.uiKit.strikethroughColor = .green
        
        // 文本效果
        // attrString.uiKit.textEffect = .letterpressStyle
        
        // 附件
        let attachmentString = {
            let image = UIImage(named: "default-avatar")
            let attachment = NSTextAttachment()
            attachment.bounds = CGRect(x: 1, y: 0, width: 20, height: 20)
            attachment.image = image
            return AttributedString(NSAttributedString(attachment: attachment))
        }()
        attrString.append(attachmentString)
        
        // AttributedString 添加附件
        var attachmentString2 = {
            let image = UIImage(named: "default-avatar")!
            let addTextAttachment = NSTextAttachment(image:image)
            let attachmentString = AttributedString("\(UnicodeScalar(NSTextAttachment.character)!)", attributes: AttributeContainer.attachment(addTextAttachment))
            return attachmentString
        }()
        attrString.append(attachmentString2)
        
        // 设置文本样式、行高
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .left
        paragraphStyle.firstLineHeadIndent = 44.0 // 第一行缩进
        paragraphStyle.headIndent = 22.0 // 段落首行以外各行的缩进
        paragraphStyle.lineSpacing = 16
        //            .byWordWrapping: 按单词换行，保持单词完整。
        //            .byCharWrapping: 按字符换行，不考虑单词边界。
        //            .byClipping: 切除文本，超出指定宽度的部分将被截断。
        //            .byTruncatingHead: 省略并在文本头部添加省略号。
        //            .byTruncatingTail: 省略并在文本尾部添加省略号。
        //            .byTruncatingMiddle: 省略并在文本中间添加省略号。
        paragraphStyle.lineBreakMode = .byTruncatingTail
        attrString.uiKit.paragraphStyle = paragraphStyle
        
        label.attributedText = NSAttributedString(attrString)
        
    }
}

```

> AttributeContainer 链式操作

- foregroundColor,backgroundColor 需要从内部消除歧义，默认是 “SwiftUI.ForegroundColor” “SwiftUI.BackgroundColor

```swift
class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.numberOfLines = 0 // 0 不限制
        view.addSubview(label)
        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor,constant: 90),
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor, constant: 0),
            label.widthAnchor.constraint(equalTo: view.safeAreaLayoutGuide.widthAnchor, multiplier: 0.8)
        ])
        
        var attrString = AttributedString("Hello, World!小红问小明，小明是誰,小明回小红，谁是小明,小红问小明，小明是誰,小明回小红，谁是小明")
        
        // 字体
        let font = UIFont.systemFont(ofSize: 22,weight: .bold)
        // 文字投影
        let shadow =  NSShadow()
        shadow.shadowOffset = .init(width: 5, height: 5)
        shadow.shadowBlurRadius = 5
        
        // 附件
        let attachmentString = {
            let image = UIImage(named: "default-avatar")
            let attachment = NSTextAttachment()
            attachment.bounds = CGRect(x: 1, y: 0, width: 20, height: 20)
            attachment.image = image
            return AttributedString(NSAttributedString(attachment: attachment))
        }()
        attrString.append(attachmentString)
        
        // AttributedString 添加附件
        var attachmentString2 = {
            let image = UIImage(named: "default-avatar")!
            let addTextAttachment = NSTextAttachment(image:image)
            let attachmentString = AttributedString("\(UnicodeScalar(NSTextAttachment.character)!)", attributes: AttributeContainer.attachment(addTextAttachment))
            return attachmentString
        }()
        attrString.append(attachmentString2)
        
        // 设置文本样式、行高
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .left
        paragraphStyle.firstLineHeadIndent = 44.0 // 第一行缩进
        paragraphStyle.headIndent = 22.0 // 段落首行以外各行的缩进
        paragraphStyle.lineSpacing = 16
        paragraphStyle.lineBreakMode = .byTruncatingTail
        let container = AttributeContainer()
        let myContainer = container
            .foregroundColor(UIColor.yellow)
            .backgroundColor(UIColor.white)
            .font(font)
            .shadow(shadow)
            .strokeWidth(-5)
            .strokeColor(.red)
            .underlineStyle([.patternDot,.single])
            .underlineColor(.red)
            .strikethroughStyle([.patternDot,.single])
            .strikethroughColor(.green)
            .paragraphStyle(paragraphStyle)
        
        attrString.mergeAttributes(myContainer)
        
        label.attributedText = NSAttributedString(attrString)
        
    }
}
```
