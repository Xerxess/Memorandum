<!-- TOC -->

- [Foundation](#foundation)
    - [Operation](#operation)
    - [Timer](#timer)
    - [Bundle](#bundle)
    - [URLSession](#urlsession)
    - [UserDefaults](#userdefaults)
    - [JSONEncoder && JSONDecoder](#jsonencoder--jsondecoder)

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
