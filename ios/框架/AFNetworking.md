<!-- TOC -->

- [AFNetworking](#afnetworking)
- [AFURLSessionManager](#afurlsessionmanager)
  - [初始化](#初始化)
  - [上传](#上传)
  - [下载](#下载)
  - [demo](#demo)
    - [上传](#上传-1)
    - [下载](#下载-1)
    - [数据任务](#数据任务)
- [AFHTTPRequestSerializer 请求序列化](#afhttprequestserializer-请求序列化)
  - [get](#get)
  - [post](#post)
  - [json](#json)
- [AFURLResponseSerialization 响应序列化](#afurlresponseserialization-响应序列化)
- [AFHTTPSessionManager](#afhttpsessionmanager)
  - [初始化](#初始化-1)
  - [任务](#任务)
- [其他设置](#其他设置)
  - [timeoutInterval](#timeoutinterval)
  - [ContentTypes](#contenttypes)
  - [responseSerializer](#responseserializer)
  - [设置状态栏活动指示器](#设置状态栏活动指示器)

<!-- /TOC -->

https://github.com/AFNetworking/AFNetworking

http://afnetworking.com/

# AFNetworking

AFNetworking是一个适用于iOS，macOS，watchOS和tvOS的令人愉悦的网络库。它建立在Foundation URL Loading System的基础上，扩展了Cocoa中内置的强大的高级网络抽象。它具有模块化的体系结构，以及精心设计的，功能丰富的API，使用起来很愉快。


# AFURLSessionManager

AFURLSessionManager创建和管理的NSURLSession基于指定的对象上NSURLSessionConfiguration的对象，它符合\<NSURLSessionTaskDelegate>，\<NSURLSessionDataDelegate>，\<NSURLSessionDownloadDelegate>，和\<NSURLSessionDelegate>。


## 初始化
```c++
@interface AFURLSessionManager : NSObject <NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate, NSURLSessionDownloadDelegate, NSSecureCoding, NSCopying>
```

```c++
// 使用NSURLSessionConfiguration 初始方法
- (instancetype)initWithSessionConfiguration:(nullable NSURLSessionConfiguration *)configuration NS_DESIGNATED_INITIALIZER;

// 创建任务
- (NSURLSessionDataTask *)dataTaskWithRequest:(NSURLRequest *)request
                               uploadProgress:(nullable void (^)(NSProgress *uploadProgress))uploadProgressBlock
                             downloadProgress:(nullable void (^)(NSProgress *downloadProgress))downloadProgressBlock
                            completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject,  NSError * _Nullable error))completionHandler;
```

## 上传

```c++


// 创建上传任务 本地fromFile文件上传
- (NSURLSessionUploadTask *)uploadTaskWithRequest:(NSURLRequest *)request
                                         fromFile:(NSURL *)fileURL
                                         progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgressBlock
                                completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject, NSError  * _Nullable error))completionHandler;

// 创建上传任务 表单fromData块上传
- (NSURLSessionUploadTask *)uploadTaskWithRequest:(NSURLRequest *)request
                                         fromData:(nullable NSData *)bodyData
                                         progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgressBlock
                                completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject, NSError * _Nullable error))completionHandler;

// 创建任务 流上传
- (NSURLSessionUploadTask *)uploadTaskWithStreamedRequest:(NSURLRequest *)request
                                                 progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgressBlock
                                        completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject, NSError * _Nullable error))completionHandler;
```

## 下载

```c++
// 下载
- (NSURLSessionDownloadTask *)downloadTaskWithRequest:(NSURLRequest *)request
                                             progress:(nullable void (^)(NSProgress *downloadProgress))downloadProgressBlock
                                          destination:(nullable NSURL * (^)(NSURL *targetPath, NSURLResponse *response))destination
                                    completionHandler:(nullable void (^)(NSURLResponse *response, NSURL * _Nullable filePath, NSError * _Nullable error))completionHandler;

// 继续下载
- (NSURLSessionDownloadTask *)downloadTaskWithResumeData:(NSData *)resumeData
                                                progress:(nullable void (^)(NSProgress *downloadProgress))downloadProgressBlock
                                             destination:(nullable NSURL * (^)(NSURL *targetPath, NSURLResponse *response))destination
                                       completionHandler:(nullable void (^)(NSURLResponse *response, NSURL * _Nullable filePath, NSError * _Nullable error))completionHandler;
```

## demo

### 上传

```c++
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];

NSURL *URL = [NSURL URLWithString:@"http://example.com/upload"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURL *filePath = [NSURL fileURLWithPath:@"file://path/to/image.png"];
NSURLSessionUploadTask *uploadTask = [manager uploadTaskWithRequest:request fromFile:filePath progress:nil completionHandler:^(NSURLResponse *response, id responseObject, NSError *error) {
    if (error) {
        NSLog(@"Error: %@", error);
    } else {
        NSLog(@"Success: %@ %@", response, responseObject);
    }
}];
[uploadTask resume];
```

### 下载
```c++
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];

NSURL *URL = [NSURL URLWithString:@"http://example.com/download.zip"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request progress:nil destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
    NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
    return [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
} completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
    NSLog(@"File downloaded to: %@", filePath);
}];
[downloadTask resume];
```

### 数据任务

```c++
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];

NSURL *URL = [NSURL URLWithString:@"http://httpbin.org/get"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURLSessionDataTask *dataTask = [manager dataTaskWithRequest:request completionHandler:^(NSURLResponse *response, id responseObject, NSError *error) {
    if (error) {
        NSLog(@"Error: %@", error);
    } else {
        NSLog(@"%@ %@", response, responseObject);
    }
}];
[dataTask resume];
```

# AFHTTPRequestSerializer 请求序列化

## get

```c++
NSString *URLString = @"http://example.com";
NSDictionary *parameters = @{@"foo": @"bar", @"baz": @[@1, @2, @3]};
[[AFHTTPRequestSerializer serializer] requestWithMethod:@"GET" URLString:URLString parameters:parameters error:nil];

// GET http://example.com?foo=bar&baz[]=1&baz[]=2&baz[]=3
```

## post 

```c++
[[AFHTTPRequestSerializer serializer] requestWithMethod:@"POST" URLString:URLString parameters:parameters error:nil];

// POST http://example.com/
// Content-Type: application/x-www-form-urlencoded

// foo=bar&baz[]=1&baz[]=2&baz[]=3
```

## json

```c++
[[AFJSONRequestSerializer serializer] requestWithMethod:@"POST" URLString:URLString parameters:parameters error:nil];

// POST http://example.com/
// Content-Type: application/json

// {"foo": "bar", "baz": [1,2,3]}
```

# AFURLResponseSerialization 响应序列化

* AFHTTPResponseSerializer 

ContentTypes = nil;

* AFJSONResponseSerializer

```
self.acceptableContentTypes  = [NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript", nil];
```

* AFXMLParserResponseSerializer

```
self.acceptableContentTypes = [[NSSet alloc] initWithObjects:@"application/xml", @"text/xml", nil];
```
* AFXMLDocumentResponseSerializer (Mac OS X)
```
self.acceptableContentTypes = [[NSSet alloc] initWithObjects:@"application/xml", @"text/xml", nil];
```

* AFPropertyListResponseSerializer
```
 self.acceptableContentTypes = [[NSSet alloc] initWithObjects:@"application/x-plist", nil];
```
* AFImageResponseSerializer
```
self.acceptableContentTypes = [[NSSet alloc] initWithObjects:@"image/tiff", @"image/jpeg", @"image/gif", @"image/png", @"image/ico", @"image/x-icon", @"image/bmp", @"image/x-bmp", @"image/x-xbitmap", @"image/x-win-bitmap", nil];
```
* AFCompoundResponseSerializer

# AFHTTPSessionManager

简单请求并根据content-type 对相应数据序列化  
content-type 不支持图片下载和文件下载

AFHTTPSessionManager 提供了发起 GET、HEAD、POST、PUT、PATCH、DELETE 请求的便捷语法。

这个类并没有实现像 NSURLSessionUploadTask、NSURLSessionDownloadTask、NSURLSessionStreamTask 类型的任务。也就是说，你不能通过这个类创建上传任务、下载任务或者 Stream 流式任务！

Web 服务的开发人员使用 AFHTTPSessionManager 子类，并提供一种类方法，该方法返回共享的单例对象，在该对象上可以在应用程序之间共享身份验证和其他配置。

```c++
@interface AFHTTPSessionManager : AFURLSessionManager <NSSecureCoding, NSCopying>
```

## 初始化

```c++
// 
+ (instancetype)manager;

//
- (instancetype)initWithBaseURL:(nullable NSURL *)url;

//
- (instancetype)initWithBaseURL:(nullable NSURL *)url
           sessionConfiguration:(nullable NSURLSessionConfiguration *)configuration NS_DESIGNATED_INITIALIZER;
```

## 任务

```c++
// GET
- (nullable NSURLSessionDataTask *)GET:(NSString *)URLString
                            parameters:(nullable id)parameters
                               headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                              progress:(nullable void (^)(NSProgress *downloadProgress))downloadProgress
                               success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                               failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

// HEAD
- (nullable NSURLSessionDataTask *)HEAD:(NSString *)URLString
                             parameters:(nullable id)parameters
                                headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                                success:(nullable void (^)(NSURLSessionDataTask *task))success
                                failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

// POST
- (nullable NSURLSessionDataTask *)POST:(NSString *)URLString
                             parameters:(nullable id)parameters
                                headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                               progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgress
                                success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

- (nullable NSURLSessionDataTask *)POST:(NSString *)URLString
                             parameters:(nullable id)parameters
                                headers:(nullable NSDictionary <NSString *, NSString *> *)headers
              constructingBodyWithBlock:(nullable void (^)(id <AFMultipartFormData> formData))block
                               progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgress
                                success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

// PUT
- (nullable NSURLSessionDataTask *)PUT:(NSString *)URLString
                            parameters:(nullable id)parameters
                               headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                               success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                               failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

// PATCH
- (nullable NSURLSessionDataTask *)PATCH:(NSString *)URLString
                              parameters:(nullable id)parameters
                                 headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                                 success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                 failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

// DELETE
- (nullable NSURLSessionDataTask *)DELETE:(NSString *)URLString
                               parameters:(nullable id)parameters
                                  headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                                  success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                  failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;

// 创建自定义请求方法
- (nullable NSURLSessionDataTask *)dataTaskWithHTTPMethod:(NSString *)method
                                                URLString:(NSString *)URLString
                                               parameters:(nullable id)parameters
                                                  headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                                           uploadProgress:(nullable void (^)(NSProgress *uploadProgress))uploadProgress
                                         downloadProgress:(nullable void (^)(NSProgress *downloadProgress))downloadProgress
                                                  success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                                  failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;
```


# 其他设置


## timeoutInterval

```c++
// 设置请求超时时间为 10s
[manager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
manager.requestSerializer.timeoutInterval = 10.f;
[manager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
```

## ContentTypes 

```c++
// AFN 默认接收的 ContentTypes 有以下三种：
self.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript", nil];

// 如果服务器返回的 ContentTypes 类型为 text/html，需要设置如下：
manager.responseSerializer.acceptableContentTypes = [NSSet setWithObject:@"text/html"];
```

## responseSerializer 

默认把服务器返回的数据当做是 JSON 类型并自动转化为 Objective-C

```c++
// 设置为 XML 类型，此时返回的是 NSXMLParser 类型，需要我们自己解析。
manager.responseSerializer = [AFXMLParserResponseSerializer serializer];

// 设置为其他类型
manager.responseSerializer = [AFHTTPResponseSerializer serializer];
```

## 设置状态栏活动指示器

启用后，系统会自动在应用程序发起网络请求时，在状态栏显示旋转的 loading 动画。

```c++
[[AFNetworkActivityIndicatorManager sharedManager] setEnabled:YES];
```