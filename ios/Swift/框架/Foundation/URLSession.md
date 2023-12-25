<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [对象使用之间关系](#对象使用之间关系)
- [URLSession](#urlsession)
- [URLSessionConfiguration](#urlsessionconfiguration)
- [HTTPCookieStorage & HTTPCookie](#httpcookiestorage--httpcookie)
- [URLCache](#urlcache)

<!-- /code_chunk_output -->

## 对象使用之间关系

- `URLSession` 应用创建一个或多个 URLSession 实例，创建不同的 URLSessionTask
- `URLSessionConfiguration` 配置超时、缓存策略、连接要求以及您打算与 URLSession 对象一起使用的其他类型的信息
- `URLSessionTask` 执行的任务，例如下载特定资源
- `URLSessionDelegate` 响应与 `URLSession` 相关的事件，例如请求完成、请求失败、接收到响应等
- `URLSessionTaskDelegate` 继承 `URLSessionDelegate` 定义 URLSessionTask 任务级事件的方法
- `URLRequest` 独立于协议或 URL 方案的 URL 加载请求
- `URLResponse` 请求的响应关联的元数据
- `HTTPURLResponse` 继承 `HTTPURLResponse`， HTTP 协议 URL 加载请求的响应关联的元数据
- `URLError` 错误码
- `HTTPCookieStorage` cookie 存储的容器, 容器 cookie 都由 HTTPCookie 类的一个实例表示
- `HTTPCookie` cookie的实例
- `URLCache` 将 URL 请求映射到缓存的响应对象的对象

## URLSession

- 使用标准 Internet 协议与 URL 交互并与服务器通信。
- completion handler(完成处理程序)在与创建任务的队列不同的Grand Central Dispatch队列上调用。因此，任何使用数据或错误来更新UI的工作（如更新webView）都应明确放置在主队列中，如图所示。

简单示例

```swift
let urlSession = URLSession.shared
let task = urlSession.dataTask(with: URL(string: "https://www.jd.com/")!) { data, response, error in
    print(task.currentRequest?.allHTTPHeaderFields)
    if let error {
        print(error)       
    }
    if let response = response as? HTTPURLResponse,(200...299).contains(response.statusCode),let data {
         let string = String(data: data, encoding: .utf8)
        // print(string)
        let allHeader = response.allHeaderFields
        print(allHeader)
    }
}
task.resume()
```

## URLSessionConfiguration

```swift
// 默认会话配置对象。
// 默认会话配置使用基于磁盘的持久缓存（除非将结果下载到文件中）并将凭据存储在用户的钥匙串中。
// 将 cookie（默认情况下）存储在与 NSURLConnection 和 NSURLDownload 类相同的共享 cookie 存储中。
// 修改返回的任何配置对象，不能更改会话的默认行为。
class var `default`: URLSessionConfiguration { get }

// 不使用持久存储来存储缓存、cookie 或凭据的会话配置 常用于临时会话
// 会话对象不将缓存、凭证存储或任何与会话相关的数据存储到磁盘。会话相关的数据存储在 RAM 中。
// 临时会话将数据写入磁盘的唯一时间是当您告诉它将 URL 的内容写入文件时。
// 临时会话非常适合 Web 浏览器和其他类似情况下的私密浏览模式
class var ephemeral: URLSessionConfiguration { get }

// 创建一个会话配置对象，允许在后台执行 HTTP 和 HTTPS 上传或下载。
class func background(withIdentifier: String) -> URLSessionConfiguration
```

```swift
let urlSessionConfiguration = URLSessionConfiguration.default

// 设置头信息
urlSessionConfiguration.httpAdditionalHeaders = ["Authorization":"Bearer c3468fdb-59c1-403d-9f7f-f0db9464dd63"]

// networkServiceType 系统可以根据请求的特定需求对网络连接进行适当的优化和处理
// .default：默认的网络服务类型，适用于一般的网络请求。
// .voIP：用于实现基于 Voice over IP（VoIP）的网络通信，例如实时音频或视频通话。
// .video：用于视频流传输，例如视频播放或实时视频传输。
// .background：用于在应用程序处于后台时进行网络请求，例如后台下载或上传任务。
// .voice：用于实现基于语音的网络通信，例如语音通话或语音识别。
// .responsiveData：用于获取实时数据更新的网络请求，例如股票行情或实时新闻。
// .avStreaming：用于实时的音频/视频流传输，例如音频/视频直播。
urlSessionConfiguration.networkServiceType = .default

// 是否应通过蜂窝网络建立连接
// 默认值为 true
urlSessionConfiguration.allowsCellularAccess = true

// 超时间隔 - 设置单个请求的超时时间间隔
// 默认值为 60
urlSessionConfiguration.timeoutIntervalForRequest = 60 * 60

// 超时间隔 - 设置资源请求的超时时间间隔。它适用于下载文件、上传文件和执行其他需要从远程服务器获取资源的操作。
// 默认值为 7 天
urlSessionConfiguration.timeoutIntervalForResource = 60 * 60 * 24 * 7

// .always：始终接受服务器发送的 Cookie。
// .never：永不接受服务器发送的 Cookie。
// .onlyFromMainDocumentDomain：仅接受来自主文档域的 Cookie。这是默认的策略。
urlSessionConfiguration.httpCookieAcceptPolicy = .onlyFromMainDocumentDomain

// 会话中的任务在发出请求时是否应自动提供来自HTTPCookieStorage 的 cookie。
// 默认值为 true
urlSessionConfiguration.httpShouldSetCookies = true

// URL 缓存，用于为会话中的请求提供缓存响应,提供了一种在应用程序中缓存和管理网络请求的数据的机制，以便在后续的请求中可以直接使用缓存的数据，减少网络请求的频率和提高性能
urlSessionConfiguration.urlCache = URLCache(
                                            memoryCapacity: 10 * 1024 * 1024, // 设置内存缓存容量为 10MB
                                            diskCapacity: 50 * 1024 * 1024 // 设置磁盘缓存容量为 50MB
                                            )

// 确定何时从缓存返回响应
// 默认值为 NSURLRequest.CachePolicy.useProtocolCachePolicy
// .useProtocolCachePolicy：使用协议指定的缓存策略。这是默认的缓存策略，它会根据服务器响应的缓存相关头信息（例如 Cache-Control 和 Expires）来决定是否使用缓存数据。
// .reloadIgnoringLocalCacheData：忽略本地缓存，每次请求都从原始源获取数据，不使用任何缓存数据。
// .reloadIgnoringLocalAndRemoteCacheData：忽略本地和远程缓存，每次请求都从原始源获取数据，不使用任何缓存数据。
// .returnCacheDataElseLoad：优先使用缓存数据，如果缓存数据不存在或已过期，则从原始源获取数据。
// .returnCacheDataDontLoad：只使用缓存数据，如果缓存数据不存在或已过期，则请求失败。
// .reloadRevalidatingCacheData：验证缓存数据的有效性，如果缓存数据有效，则使用缓存数据；如果缓存数据无效，则从原始源获取数据。
urlSessionConfiguration.requestCachePolicy = .useProtocolCachePolicy

// 完成时是否应在后台恢复或启动应用程序
// 默认值为 true
urlSessionConfiguration.sessionSendsLaunchEvents = true

// 确定系统是否可以自行安排后台任务以获得最佳性能
// 传输大量数据时，建议您将此属性的值设置为 true
// 默认值为 false
urlSessionConfiguration.isDiscretionary = true
```

## HTTPCookieStorage & HTTPCookie

```swift
let cookieStorage = HTTPCookieStorage.shared

// cookie 存储的 cookie 接受策略 默认 .always
cookieStorage.cookieAcceptPolicy = .always

// 创建一个 HTTPCookie 对象
let cookie = HTTPCookie(properties: [
    .name: "session",
    .value: "123456",
    .domain: "example.com",
    .expires: Date(timeIntervalSinceNow: 3600) // 设置过期时间为1小时后
    // 其他属性...
])

// 添加 Cookie 到 Cookie 存储
cookieStorage.setCookie(cookie!)

// 删除指定的 Cookie
cookieStorage.deleteCookie(cookie!)

// 删除所有的 Cookie
cookieStorage.removeCookies(since: Date.distantPast)
```

## URLCache

```swift
// 自定义的 URLCache 对象
// let cache = URLCache(memoryCapacity: 10 * 1024 * 1024,diskCapacity: 100 * 1024 * 1024)

// 可以创建自定义 URLCache 对象并将其设置为共享缓存实例
// URLCache.shared = cache

// 发起网络请求
let url = URL(string: "https://www.example.com")
let request = URLRequest(url: url!)

// 从缓存中获取响应
if let cachedResponse = URLCache.shared.cachedResponse(for: request) {
    // 使用缓存的响应数据
    let data = cachedResponse.data
    let response = cachedResponse.response
    // ...
} else {
    // 发送网络请求
    URLSession.shared.dataTask(with: request) { (data, response, error) in
        // 处理响应数据
        // ...
        
        // 缓存响应数据
        if let data = data, let response = response {
            let cachedResponse = CachedURLResponse(response: response, data: data)
            URLCache.shared.storeCachedResponse(cachedResponse, for: request)
        }
    }.resume()
}
```
