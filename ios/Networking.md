<!-- TOC -->

- [NSURLSession](#nsurlsession)
  - [线程安全](#线程安全)
  - [sharedSession](#sharedsession)
    - [局限性](#局限性)
- [NSURLSessionConfiguration](#nsurlsessionconfiguration)
  - [系统自带](#系统自带)
  - [属性](#属性)
- [NSURL](#nsurl)
- [NSURLSession 基类](#nsurlsession-基类)
  - [NSURLSessionTaskState 任务当前状态的常量](#nsurlsessiontaskstate-任务当前状态的常量)
- [NSProgress](#nsprogress)
  - [KVO](#kvo)
- [NSCachedURLResponse](#nscachedurlresponse)
- [NSHTTPURLResponse](#nshttpurlresponse)
- [NSURLSessionDataTask](#nsurlsessiondatatask)
- [NSURLRequest](#nsurlrequest)
- [NSMutableURLRequest](#nsmutableurlrequest)
- [NSURLProtocol](#nsurlprotocol)
  - [使用场景](#使用场景)
  - [步骤](#步骤)
  - [使用](#使用)
- [ios 9 以后 HTTP请求](#ios-9-以后-http请求)

<!-- /TOC -->

https://developer.apple.com/documentation/foundation/url_loading_system?language=objc

# NSURLSession

一组相关的网络数据传输任务的对象

NSURLSession原生支持data，file，ftp，http，和https,URL方案，与代理服务器和SOCKS网关，配置在用户的系统偏好透明的支持。

## 线程安全

URL会话API是线程安全的。

## sharedSession

共享的单例会话对象，该对象为创建任务提供了合理的默认行为。

### 局限性

* 当数据从服务器到达时，您无法增量获取。
* 您不能显着自定义默认的连接行为。
* 您执行身份验证的能力受到限制。
* 当您的应用未运行时，您将无法执行后台下载或上传。

# NSURLSessionConfiguration

## 系统自带
```c++
// 默认配置使用的是持久化的硬盘缓存，存储证书到用户钥匙链。存储cookie到shareCookie。
@property(class, readonly, strong) NSURLSessionConfiguration *defaultSessionConfiguration

// 返回一个不适用永久持存cookie、证书、缓存的配置，最佳优化数据传输。
@property(class, readonly, strong) NSURLSessionConfiguration *ephemeralSessionConfiguration;

// 生成一个可以上传下载HTTP和HTTPS的后台任务(程序在后台运行)。
@property(class, readonly, strong) NSURLSessionConfiguration *backgroundSessionConfigurationWithIdentifier

```

## 属性
```c++
// 是configuration的唯一标示，不能为空或nil.
@property(readonly, copy) NSString *identifier  

// 默认为空，NSURLRequest附件的请求头。这个属性会给所有使用该configuration的session生成的tasks中的NSURLRequest添加额外的请求头。
// 
@property(copy) NSDictionary *HTTPAdditionalHeaders

// 指定网络传输类型
// NSURLNetworkServiceTypeDefault 标准网络流量
// NSURLNetworkServiceTypeVideo 视频流量
// NSURLNetworkServiceTypeBackground 后台流量
// NSURLNetworkServiceTypeVoice 语音流量
// NSURLNetworkServiceTypeCallSignaling 呼叫信令
// NSURLNetworkServiceTypeResponsiveData 用户正在积极等待的数据的服务类型
// NSURLNetworkServiceTypeAVStreaming 流音频/视频数据
// NSURLNetworkServiceTypeResponsiveAV  响应性（时间敏感）音频/视频数据的服务类型
@property NSURLRequestNetworkServiceType networkServiceType

// 是否使用蜂窝网络，默认是yes.
@property BOOL allowsCellularAccess

// 给request指定每次接收数据超时间隔，如果下一次接受新数据用时超过该值，则发送一个请求超时给该request。默认为60s
@property NSTimeInterval timeoutIntervalForRequest

// 给指定resource设定一个超时时间，resource需要在时间到达之前完成。默认是7天。
@property NSTimeInterval timeoutIntervalForResource
```

# NSURL

代表资源位置的对象，例如远程服务器上的项目或本地文件的路径。

```c++
NSURL *baseURL = [NSURL fileURLWithPath:@"file:///path/to/user/"];
NSURL *URL = [NSURL URLWithString:@"folder/file.html" relativeToURL:baseURL];
NSLog(@"absoluteURL = %@", [URL absoluteURL]);
```

```c++
URL 包含以下URL组件：

https://johnny:p4ssw0rd@www.example.com:443/script.ext;param=value?query=value#ref
```

标题|值
-|-
scheme|https
user|johnny
password|p4ssw0rd
host|www.example.com
port|443
path|/script.ext
pathExtension|ext
pathComponents|["/", "script.ext"]
parameterString|param=value
query|query=value
fragment|ref

```c++
// 创建并返回使用提供的URL字符串初始化的NSURL对象
+ (instancetype)URLWithString:(NSString *)URLString;
- (instancetype)initWithString:(NSString *)URLString;
```

# NSURLSession 基类

```c++
// 取消
- (void)cancel;

// 如果任务被挂起，则继续执行。
- (void)resume;

// 暂时中止任务
- (void)suspend;

// 状态
@property(readonly) NSURLSessionTaskState state;

// 总体任务进度
@property(readonly, strong) NSProgress *progress;
```

## NSURLSessionTaskState 任务当前状态的常量

* NSURLSessionTaskStateRunning 正在
* NSURLSessionTaskStateSuspended 已暂停
* NSURLSessionTaskStateCanceling cancel
* NSURLSessionTaskStateCompleted 已完成

# NSProgress

https://developer.apple.com/documentation/foundation/nsprogress?language=objc

* 报告当前某个任务的进度, 或者多个任务的进度和这些任务的总进度
* NSProgress可以是一个树状结构, 一个节点进度可以有多个子节点, 每一个子节点只有一个父节点, 每一个子节点都有自己独立的进度体系, 并且子节点完成任务后, 会将完成的数量反馈给父节点

```c++
// 总单元, 用来记载某个任务的总单元数
totalUnitCount

// 已完成单元数量, 记载某个任务执行过程中已经完成的单元数量
completedUnitCount

// 某个任务已完成单元量占总单元量的比例
fractionCompleted
```

## KVO

创建简单的单进度报告操作

# NSCachedURLResponse

URL请求的缓存响应

https://developer.apple.com/documentation/foundation/nscachedurlresponse?language=objc

# NSHTTPURLResponse

https://developer.apple.com/documentation/foundation/nshttpurlresponse?language=objc

# NSURLSessionDataTask

NSURLSessionDataTask 是 NSURLSessionTask 的一个具体子类。NSURLSessionDataTask 类中的方法记录在 NSURLSessionTask 中。

数据任务直接将数据作为一个或多个NSData对象返回给应用程序(在内存中)。


# NSURLRequest

NSURLRequest封装了请求的两个基本属性：要加载的URL和用于加载该请求的策略。

NSURLRequest 是一个独立的独立加载请求的协议和解决方案，它封装了 load URL 和 the policy，当你发送了网络请求时候可以使用缓存，你可以通过它 propertyForKey:inRequest: 和 setProperty:forKey:inRequest:.这两个方法添加你的协议

NSURLRequest请求类除了在初始化时可以设定一些属性，创建出来后则大部分属性都为只读的，无法设置与修改。

# NSMutableURLRequest

# NSURLProtocol

## 使用场景

* 重定向网络请求（可以解决电信的DNS域名劫持问题）
* 忽略网络请求，使用本地缓存
* 自定义网络请求的返回结果Response
* 拦截图片加载请求，转为从本地文件加载
* 一些全局的网络请求设置
* 快速进行测试环境的切换
* 过滤掉一些非法请求
* 网络的缓存处理（H5离线包 和 网络图片缓存）

## 步骤

* 注册—>拦截—>转发—>回调—>结束
* 注册NSURLProtocol子类 -> 使用NSURLProtocol子类拦截请求 -> 使用NSURLSession重新发起请求 -> 将NSURLSession请求的响应内容返回 -> 结束

## 使用

* 必须使用该类的子类，并且需要被注册。

重写方法:
```c++

// 确定协议子类是否可以处理指定的请求
+ (BOOL)canInitWithRequest:(NSURLRequest *)request;

// 确定协议子类是否可以处理指定的任务
+ (BOOL)canInitWithTask:(NSURLSessionTask *)task;

// 没有特殊需求，直接返回request就可以了, 可以在开始加载中startLoading方法中 修改request，比如添加header，修改host,请求重定向等
+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request;

// 开始特定于协议的请求的加载
- (void)startLoading;

// 停止特定于协议的请求加载。
- (void)stopLoading;
```

# ios 9 以后 HTTP请求

```c++
//在info.plist
<key>NSAllowsArbitraryLoads</key>
<true/>
<key>NSAppTransportSecurity</key>
<true/>
```