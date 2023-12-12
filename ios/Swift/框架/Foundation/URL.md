<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [URLs](#urls)
  - [URL](#url)
    - [Topics](#topics)
    - [Accessing the Parts of a URL 访问URL的各个部分](#accessing-the-parts-of-a-url-访问url的各个部分)
    - [URL字符串 编解码](#url字符串-编解码)
  - [URLComponents & URLQueryItem](#urlcomponents--urlqueryitem)

<!-- /code_chunk_output -->


# URLs

## URL

标识资源位置的值，例如远程服务器上的项目或本地文件的路径。

```swift
// URL 类的一些常规用法
// 1.创建 URL
if let url = URL(string: "https://www.example.com") {
    // URL 创建成功
}

// 2.获取 URL 的组成部分
let url = URL(string: "https://www.example.com")
let scheme = url?.scheme // 获取 scheme
let host = url?.host // 获取 host
let path = url?.path // 获取 path

// 3.发起网络请求
let url = URL(string: "https://www.example.com")
let task = URLSession.shared.dataTask(with: url!) { (data, response, error) in
    // 处理响应数据或错误
}
task.resume()

// 4.文件操作
let fileURL = URL(fileURLWithPath: "/path/to/file.txt")
let contents = try Data(contentsOf: fileURL) // 从文件读取内容
try contents.write(to: fileURL) // 将内容写入文件

```

```swift
let url = URL(string:"https://www.baidu.com/?query=test&query2=test2")

// Optional("https://www.baidu.com/?query=test&query2=test2")
print(url?.absoluteString)

// Optional(https://www.baidu.com/?query=test&query2=test2)
print(url?.absoluteURL)

// nil
print(url?.baseURL)

// nil
print(url?.fragment)

// Optional("www.baidu.com")
print(url?.host)

// Optional("/")
print(url?.lastPathComponent)

// Optional("/")
print(url?.path)

// Optional("")
print(url?.pathExtension)

// nil
print(url?.port)

// Optional("query=test&query2=test2")
print(url?.query)

// Optional("/")
print(url?.relativePath)

// Optional("https")
print(url?.scheme)
```

### Topics

```swift
// 从提供的字符串创建URL实例。
// 如果字符串不表示有效的URL，则此初始化器返回nil。例如，空字符串或包含URL中非法字符的字符串会产生零。
init?(string: String)

// 从提供的字符串创建相对于另一个URL的URL实例。
init?(
    string: String,
    relativeTo url: URL?
)

// Creating a File URL
```

### Accessing the Parts of a URL 访问URL的各个部分

```swift
// URL的绝对字符串。
var absoluteString: String { get }

// 基本URL。
var baseURL: URL? { get }

// URL的片段组件，如果URL符合RFC 1808（最常见的URL形式），否则为零。
var fragment: String? { get }

// 
var host: String? { get }
var lastPathComponent: String { get }
var path: String { get }
var port: Int? { get }
var query: String? { get }
var scheme: String? { get }
```

### URL字符串 编解码

```swift
// URL 编码
let urlString = "https://www.example.com/path with spaces"
if let encodedString = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
    // 使用编码后的字符串
    print(encodedString)
    // https://www.example.com/?id=%E4%B8%AD%E6%96%87
}
```

```swift
// URL 解码
let urlString = "https://www.example.com/?id=%E4%B8%AD%E6%96%87"
if let decodedString = urlString.removingPercentEncoding {
    // 使用解码后的字符串
    print(decodedString)
    // https://www.example.com/?id=中文
}
```

## URLComponents & URLQueryItem

与 URL 不同

- URL 对象是不可变
- URLComponents 还提供了方法来处理 URL 的编码和解码，以及获取 URL 的查询参数。

一个将URL解析为并从其组成部分构建URL的结构。

用于解析和构建 URL 组件的类。它提供了一种方便的方式来访问和修改 URL 的不同部分，如 scheme、host、path、query 等。

```swift
// 解析 URL
let urlString = "https://www.example.com/path?key1=value1&key2=value2"
if let urlComponents = URLComponents(string: urlString) {
    let scheme = urlComponents.scheme // 获取 scheme
    let host = urlComponents.host // 获取 host
    let path = urlComponents.path // 获取 path
    let queryItems = urlComponents.queryItems // 获取查询参数
}
```

```swift
// 构建 URL
var urlComponents = URLComponents()
urlComponents.scheme = "https"
urlComponents.host = "www.example.com"
urlComponents.path = "/path"
urlComponents.queryItems = [
    URLQueryItem(name: "key1", value: "value1"),
    URLQueryItem(name: "key2", value: "value2")
]
if let url = urlComponents.url {
    // 使用构建的 URL
}
```

```swift
// 修改查询参数
let urlString = "https://www.example.com/path?key1=value1&key2=value2"
if var urlComponents = URLComponents(string: urlString) {
    urlComponents.queryItems?.append(URLQueryItem(name: "key3", value: "value3"))
    if let updatedURL = urlComponents.url {
        // 使用修改后的 URL
    }
}
```
