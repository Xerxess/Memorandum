<!-- TOC -->

- [Foundation](#foundation)
    - [Operation](#operation)
    - [Timer](#timer)
    - [Bundle](#bundle)
    - [URLSession](#urlsession)
    - [UserDefaults](#userdefaults)
    - [JSONEncoder && JSONDecoder](#jsonencoder--jsondecoder)
- [NSAttributedString](#nsattributedstring)
    - [API](#api)
    - [](#)
    - [NSAttributedString.Key](#nsattributedstringkey)

<!-- /TOC -->

# Foundation

访问基本数据类型、集合和操作系统服务，为您的应用定义基本功能层。

https://developer.apple.com/documentation/foundation

## Operation

```swift
let blockOperation = BlockOperation {
    print("Executing!")
}

let queue = OperationQueue()
queue.addOperation(blockOperation)
```

## Timer

- 经过一定时间间隔后触发的计时器，将指定的消息发送到目标对象。
- 计时器与运行循环一起工作。
- 不要子类化 Timer。

```swift
// 创建一个计时器并将其安排在默认模式下的当前运行循环中。
class func scheduledTimer(withTimeInterval: TimeInterval, repeats: Bool, block: (Timer) -> Void) -> Timer

// 创建一个计时器并将其安排在默认模式下的当前运行循环中。
class func scheduledTimer(timeInterval: TimeInterval, target: Any, selector: Selector, userInfo: Any?, repeats: Bool) -> Timer

// 使用指定的调用对象初始化计时器对象。
init(timeInterval: TimeInterval, invocation: NSInvocation, repeats: Bool)

// 触发计时器 使计时器的消息发送到其目标。
func fire()

// 停止计时器 停止计时器再次触发并请求将其从运行循环中删除。
func invalidate()

```

## Bundle

表示应用程序、框架、插件和许多其他特定类型的内容

```swift

// 获取应用程序的主包
let mainBundle = Bundle.main

// 获取包含指定私有类的包
let myBundle = Bundle(for: NSClassFromString("MyPrivateClass")!)

// 返回由指定名称和文件扩展名标识的资源的完整路径名。
func path(forResource: String?, ofType: String?) -> String?

// 返回NSImage与指定名称关联的实例，该名称可由表示图像不同分辨率版本的多个文件支持。
func image(forResource: NSImage.Name) -> NSImage?

```

## URLSession

创建 configurations -> 创建 session -> 创建 task -> resume() 开始请求 -> 监听回调

```swift
class var shared: URLSession // 共享单例会话对象。
init(configuration: URLSessionConfiguration)

func dataTask(with: URL) -> URLSessionDataTask

```

```swift
URLSessionConfiguration
// 默认会话配置对象。
class var `default`: URLSessionConfiguration

// 一种会话配置，不使用缓存、cookie 或凭据的持久存储。
class var ephemeral: URLSessionConfiguration

// 创建一个会话配置对象，允许在后台执行 HTTP 和 HTTPS 上传或下载。
class func background(withIdentifier: String) -> URLSessionConfiguration

```

```swift
URLSessionDataTask
// 取消任务。
func cancel()

// 恢复任务，如果它被挂起。
func resume()

// 暂时挂起任务。
func suspend()

// 任务的当前状态——活动、挂起、正在取消或完成。
var state: URLSessionTask.State

```

## UserDefaults 

## JSONEncoder && JSONDecoder

JSONEncoder:将数据类型的实例编码为 JSON 对象的对象
JSONDecoder:从 JSON 对象解码数据类型实例的对象

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let pear = GroceryProduct(name: "Pear", points: 250, description: "A ripe pear.")

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

let data = try encoder.encode(pear)
print(String(data: data, encoding: .utf8)!)

/* Prints:
 {
   "name" : "Pear",
   "points" : 250,
   "description" : "A ripe pear."
 }
*/
```

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let json = """
{
    "name": "Durian",
    "points": 600,
    "description": "A fruit with a distinctive scent."
}
""".data(using: .utf8)!

let decoder = JSONDecoder()
let product = try decoder.decode(GroceryProduct.self, from: json)

print(product.name) // Prints "Durian"
```

# NSAttributedString

具有部分文本关联属性（如视觉样式、超链接或可访问性数据）的字符串。

NSAttributedString对象管理适用于字符串中`单个字符`或`字符范围的字符字符串和相关属性集`（例如字体和字距）。  
字符及其属性的关联称为`归因字符串`。  
该集群的两个公共类，NSAttributedString和NSMutableAttributedString分别声明只读归因字符串和可修改归因字符串的编程接口。

`归因字符串`按名称标识属性，使用NSDictionary对象在指定名称下存储值。您可以将您想要的任何属性名称/值对分配给一系列字符——由您的应用程序来解释自定义属性（请参阅归因字符串编程指南）。如果您将归因字符串与Core Text框架一起使用，您也可以使用该框架定义的属性键。

您可以将归因字符串与任何接受它们的API一起使用，例如Core Text。  
AppKit和UIKit框架还提供了一个NSMutableAttributedString的子类，称为`NSTextStorage`，为扩展文本处理系统提供存储空间。  
在iOS 6及更高版本中，您可以使用归因字符串在文本视图、文本字段和其他一些控件中显示格式化的文本。  
AppKit和UIKit还定义了基本归因字符串界面的扩展，允许您在当前图形上下文中绘制其内容。

NSAttributedString对象的默认字体是`Helvetica 12点`，这可能与平台的默认系统字体不同。  
因此，您可能希望使用适合您应用程序的非默认属性创建新字符串。  
您还可以使用NSParagraphStyle类及其子类NSMutableParagraphStyle来封装NSAttributedString类使用的段落或标尺属性。

请注意，使用isEqual(_:)方法对NSAttributedString对象进行比较会寻找精确的相等性。  
比较包括逐个字符字符串等式检查和所有属性的等式检查。如果字符串具有许多属性，例如附件、列表和表，则此类比较不太可能产生匹配。

NSAttributedString类与其核心基金会对应产品CFAttributedString“免费桥接”。

```swift
class NSAttributedString : NSObject
```

## API

###

```swift

```

## NSAttributedString.Key

```swift

```
