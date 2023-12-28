<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [对象使用之间关系](#对象使用之间关系)
- [URLSession](#urlsession)
- [URLSessionConfiguration](#urlsessionconfiguration)
- [HTTPCookieStorage & HTTPCookie](#httpcookiestorage--httpcookie)
- [URLCache](#urlcache)
- [URLRequest](#urlrequest)
- [URLResponse && HTTPURLResponse](#urlresponse--httpurlresponse)
- [URLSessionTask](#urlsessiontask)
- [URLSessionDelegate & URLSessionTaskDelegate & URLSessionDownloadDelegate & URLSessionDataDelegate & URLSessionDataDelegate & URLSessionWebSocketDelegate](#urlsessiondelegate--urlsessiontaskdelegate--urlsessiondownloaddelegate--urlsessiondatadelegate--urlsessiondatadelegate--urlsessionwebsocketdelegate)

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

## URLRequest

- URLRequest 封装了加载请求的两个基本属性：要加载的URL和用于加载它的策略。
- 对于 HTTP 和 HTTPS 请求， URLRequest 包括 HTTP 方法（ GET 、 POST 等）和 HTTP 标头。
- post请求

```swift
var request = URLRequest(url: URL(string: "https://www.jd.com/")!)
// request.cachePolicy = .useProtocolCachePolicy // 请求的缓存策略
request.addValue("Bearer c3468fdb-59c1-403d-9f7f-f0db9464dd63", forHTTPHeaderField: "Authorization")
// 同时修改 是累加非修改 "Content-Type": "multipart/form-data,application/json"
request.addValue("multipart/form-data", forHTTPHeaderField: "Content-Type")
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpMethod = "post"
request.httpBody = "post".data(using: .utf8)
print(request.cachePolicy == .useProtocolCachePolicy) // 请求的缓存策略
print(request.allHTTPHeaderFields) // Optional(["Content-Type": "multipart/form-data,application/json", "Authorization": "Bearer c3468fdb-59c1-403d-9f7f-f0db9464dd63"])
request.setValue("修改", forHTTPHeaderField: "Content-Type")
print(request.value(forHTTPHeaderField: "Content-Type")) // Optional("修改")
print(request.url) // Optional(https://www.jd.com/)
print(request.allowsCellularAccess) // true 属性设置为 true 会使请求有资格通过蜂窝网络运行
print(request.timeoutInterval) // 60.0
print(request.httpShouldHandleCookies) // true 是否将与此请求一起发送并设置 cookie
print(request.allowsExpensiveNetworkAccess) // true 指定低数据模式时请求是否可以使用网络
print(request.networkServiceType) // NSURLRequest.NetworkServiceType.default 如何使用网络资源
let task = URLSession.shared.dataTask(with: request)
```

## URLResponse && HTTPURLResponse

- HTTPURLResponse 继承 URLResponse

```swift
//  指定状态代码的本地化字符串
print(HTTPURLResponse.localizedString(forStatusCode: 200)) // no error

 if let res =  dataTask.response as? HTTPURLResponse
    {          
        // 响应的 MIME 类型 -- URLResponse
        print(res.mimeType) // Optional("text/html")

        // 响应的 URL -- URLResponse
        print(res.url) // URL

        // 响应的原始源提供的文本编码的名称 -- URLResponse
        print(res.textEncodingName) // Optional("utf-8")

        // 响应数据的建议文件名 -- URLResponse
        print(res.suggestedFilename) //  Optional("www.jd.com.html")

        // 响应内容的预期长度 -- URLResponse
        print(res.expectedContentLength) // -1

        // HTTP 状态代码  -- HTTPURLResponse
        print(res.statusCode) // 200

        // 响应的所有 HTTP 标头字段 -- HTTPURLResponse
        print(res.allHeaderFields) // [AnyHashable("Expires"): Thu, 28 Dec 2023 08:42:00 GMT, AnyHashable("Content-Length"): 58082, AnyHashable("Content-Type"): text/html; charset=utf-8,...]
        
        // 获取指定标头字段对应的值 -- HTTPURLResponse
        print(res.value(forHTTPHeaderField: "Content-Type")) // Optional("text/html; charset=utf-8")
    }
```

## URLSessionTask

## URLSessionDelegate & URLSessionTaskDelegate & URLSessionDownloadDelegate & URLSessionDataDelegate & URLSessionDataDelegate & URLSessionWebSocketDelegate

```swift
import  Foundation
import PlaygroundSupport
PlaygroundPage.current.needsIndefiniteExecution = true

class sessionDataDelegate:NSObject,URLSessionDataDelegate {
    var receivedData = Data() // 使用委托收集最终数据 使用委托只能这样获取
    
    // URLSessionDelegate
    // 该会话已失效
    // 调用 invalidateAndCancel() 方法，会话会立即调用此委托方法
    func urlSession(
        _ session: URLSession,
        didBecomeInvalidWithError error: Error?
    ){
        print("该会话已失效")
    }
    
    // URLSessionTaskDelegate
    // 请求完成
    // 成功失败都会执行
    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didCompleteWithError error: Error?
    ){
        guard error==nil else {
            print("请求失败:\(error)")
            return
        }
        let str = String(data: receivedData, encoding: .utf8)
        print("请求成功:内容长度-\(str?.count)")
    }
    
    // URLSessionTaskDelegate
    // earliestBeginDate 设置时
    // 仅当请求在等待网络负载时可能变得过时并且需要由新请求替换时，才应实现此委托方法。
    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        willBeginDelayedRequest request: URLRequest,
        completionHandler: @escaping @Sendable (URLSession.DelayedRequestDisposition, URLRequest?) -> Void
    ){
        print("willBeginDelayedRequest")
    }
    
    // URLSessionTaskDelegate
    // 会话已完成收集任务指标,可查看网络的性能
    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didFinishCollecting metrics: URLSessionTaskMetrics
    ){
        // print(metrics.transactionMetrics.count) // URLSessionTaskTransactionMetrics 封装 URL 加载系统在会话任务执行期间收集的性能指标的对象
        // print(metrics.taskInterval) // DateInterval 任务实例化和任务完成之间的时间间隔
        // print(metrics.redirectCount) // 重定向次数
        print("会话已完成收集任务指标")
    }
    
    // URLSessionTaskDelegate
    // 任务创建完成
    func urlSession(
        _ session: URLSession,
        didCreateTask task: URLSessionTask
    ){
        print("任务创建完成")
    }
    
    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didReceiveInformationalResponse response: HTTPURLResponse
    ){
        print("didReceiveInformationalResponse")
    }
    
    // URLSessionDataDelegate
    // 从服务器收到了初始回复（标头）
    // 可监测一些头信息
    // 必须调整completionHandler 函数
    // completionHandler(.cancel) 取消
    // completionHandler(.allow) 继续
    // completionHandler(.becomeDownload) 转换为下载
    func urlSession(
        _ session: URLSession,
        dataTask: URLSessionDataTask,
        didReceive response: URLResponse,
        completionHandler: @escaping @Sendable (URLSession.ResponseDisposition) -> Void
    ){
        if let res =  dataTask.response as? HTTPURLResponse
        {          
            let headers = res.allHeaderFields
            //            print(res.mimeType)
            //            print(res.textEncodingName)
            //            print(res.suggestedFilename)
            //            print(res.expectedContentLength)
            //            print(res.statusCode)
            //            print(res.allHeaderFields)
            //            print(res.value(forHTTPHeaderField: "Content-Type"))           
            //            print(HTTPURLResponse.localizedString(forStatusCode: 200))
        }
        //  completionHandler(.becomeDownload)
        completionHandler(.allow)
    }
    
    // URLSessionDataDelegate
    // urlSession(_:dataTask:didReceive:completionHandler:) 
    // completionHandler(.becomeDownload) 调用则执行以下委托
    func urlSession(
        _ session: URLSession,
        dataTask: URLSessionDataTask,
        didBecome downloadTask: URLSessionDownloadTask
    ){
        print("已转换为下载")
    }
    
    // URLSessionDataDelegate
    // 数据任务已收到一些预期数据
    // 数据未完全接收，会多次触发
    func urlSession(
        _ session: URLSession,
        dataTask: URLSessionDataTask,
        didReceive data: Data
    ){
        print(data)
        receivedData.append(data)
        // 29762 bytes 第一次
        // 28369 bytes 第二次
        // 39283 bytes 第三次
        // 88033 bytes 第四次
    }
    
    // URLSessionDataDelegate
    // 主动缓存数据，如果需要
    // 必须调整completionHandler 函数
    func urlSession(
        _ session: URLSession,
        dataTask: URLSessionDataTask,
        willCacheResponse proposedResponse: CachedURLResponse,
        completionHandler: @escaping @Sendable (CachedURLResponse?) -> Void
    ){
        print("是否需要缓存数据")
        completionHandler(proposedResponse)
    }
}


let urlSession = URLSession(configuration: URLSessionConfiguration.default,delegate: sessionDataDelegate(), delegateQueue: nil)

let task = urlSession.dataTask(with: URL(string: "https://www.jd.com/")!)
//{ data, response, error in
//    //    print(task.currentRequest?.allHTTPHeaderFields)
//    if let error {
//        print(error)       
//    }
//    if let response = response as? HTTPURLResponse,(200...299).contains(response.statusCode),let data {
//        let string = String(data: data, encoding: .utf8)!
//               print(string.count)
//        let starIndex = string.startIndex
//        let endIndex = string.index(starIndex, offsetBy: 1)
//        //        print(string[starIndex...endIndex])
//        let allHeader = response.allHeaderFields
//        //        print(allHeader)
//    }
//}
task.resume()
```
