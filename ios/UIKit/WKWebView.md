<!-- TOC -->

- [WKWebView](#wkwebview)
- [WKWebView的多进程结构](#wkwebview的多进程结构)
- [WkWebView的注意点](#wkwebview的注意点)
- [使用方法](#使用方法)
- [WKWebViewConfiguration](#wkwebviewconfiguration)
- [WKUserContentController](#wkusercontentcontroller)
- [WKUIDelegate](#wkuidelegate)
- [WKNavigationDelegate](#wknavigationdelegate)
- [WKWebsiteDataStore](#wkwebsitedatastore)
- [native干预webView](#native干预webview)
- [webView调用OC代码](#webview调用oc代码)
- [WebViewJavascriptBridge](#webviewjavascriptbridge)
- [DSBridge-IOS](#dsbridge-ios)

<!-- /TOC -->

# WKWebView

* 支持HTML5的特性
* 高达60fps的滚动刷新率以及内置手势
* Safari相同的JavaScript引擎
* 占用更少的内存

# WKWebView的多进程结构

WKWebView开辟的是独立于App之外的进程，webView占用的内存是转移到了自己的进程中，而不是在App的进程中。所以我们在查看内存占用情况的时候会看到，加载同一个网页的时候（复杂绘制的大型网页更明显），使用WKWebView的App会比使用UIWebView的App占用内存小。

# WkWebView的注意点

* Cookie： 在WKWebView中，并不能像UIWebView那样很方便的设置Cookie，虽然可以通过其它方式实现，但是总体给人的感觉是Cookie并不在最开始苹果设计WKWebView的规划之内。
* NSURLProtocol： 黑魔法在WKWebView是不被苹果所允许
* 有的webView页面出现偏移
* 需要自己处理AlertView弹框
* 需要自己处理a标签和target=_blank
* 页面的重定向
* 跳转到支付宝、打电话、打开Appstore等需要自己处理openURL:
* OC调用JS的方法是异步的
* 修改User-Agent
* 跨域请求
* 白屏问题

# 使用方法

```c++
// 导航代理
@property (nullable, nonatomic, weak) id <WKNavigationDelegate> navigationDelegate;
// UI代理
@property (nullable, nonatomic, weak) id <WKUIDelegate> UIDelegate;

// 页面标题, 一般使用KVO动态获取
@property (nullable, nonatomic, readonly, copy) NSString *title;
// 页面加载进度, 一般使用KVO动态获取
@property (nonatomic, readonly) double estimatedProgress;

// 可返回的页面列表, 已打开过的网页, 有点类似于navigationController的viewControllers属性
@property (nonatomic, readonly, strong) WKBackForwardList *backForwardList;

// 页面url
@property (nullable, nonatomic, readonly, copy) NSURL *URL;
// 页面是否在加载中
@property (nonatomic, readonly, getter=isLoading) BOOL loading;
// 是否可返回
@property (nonatomic, readonly) BOOL canGoBack;
// 是否可向前
@property (nonatomic, readonly) BOOL canGoForward;
// WKWebView继承自UIView, 所以如果想设置scrollView的一些属性, 需要对此属性进行配置
@property (nonatomic, readonly, strong) UIScrollView *scrollView;
// 是否允许手势左滑返回上一级, 类似导航控制的左滑返回
@property (nonatomic) BOOL allowsBackForwardNavigationGestures;

//自定义UserAgent, 会覆盖默认的值 ,iOS 9之后有效
@property (nullable, nonatomic, copy) NSString *customUserAgent
```

```c++
// 带配置信息的初始化方法
// configuration 配置信息
- (instancetype)initWithFrame:(CGRect)frame configuration:(WKWebViewConfiguration *)configuration
// 加载请求
- (nullable WKNavigation *)loadRequest:(NSURLRequest *)request;
// 加载HTML
- (nullable WKNavigation *)loadHTMLString:(NSString *)string baseURL:(nullable NSURL *)baseURL;
// 返回上一级
- (nullable WKNavigation *)goBack;
// 前进下一级, 需要曾经打开过, 才能前进
- (nullable WKNavigation *)goForward;
// 刷新页面
- (nullable WKNavigation *)reload;
// 根据缓存有效期来刷新页面
- (nullable WKNavigation *)reloadFromOrigin;
// 停止加载页面
- (void)stopLoading;
// 执行JavaScript代码
- (void)evaluateJavaScript:(NSString *)javaScriptString completionHandler:(void (^ _Nullable)(_Nullable id, NSError * _Nullable error))completionHandler;
```

# WKWebViewConfiguration

```c++
// 通过此属性来执行JavaScript代码来修改页面的行为
@property (nonatomic, strong) WKUserContentController *userContentController;

//***********下面属性一般不需要设置
// 首选项设置,  
//可设置最小字号, 是否允许执行js
//是否通过js自动打开新的窗口
@property (nonatomic, strong) WKPreferences *preferences;
// 是否允许播放媒体文件
@property (nonatomic) BOOL allowsAirPlayForMediaPlayback
// 需要用户来操作才能播放的多媒体类型
@property (nonatomic) WKAudiovisualMediaTypes mediaTypesRequiringUserActionForPlayback
// 是使用h5的视频播放器在线播放, 还是使用原生播放器全屏播放
@property (nonatomic) BOOL allowsInlineMediaPlayback;
```

# WKUserContentController

WKUserContentController 是JavaScript与原生进行交互的桥梁

```c++
// 注入JavaScript与原生交互协议
// JS 端可通过 window.webkit.messageHandlers.<name>.postMessage(<messageBody>) 发送消息
- (void)addScriptMessageHandler:(id <WKScriptMessageHandler>)scriptMessageHandler name:(NSString *)name;
// 移除注入的协议, 在deinit方法中调用
- (void)removeScriptMessageHandlerForName:(NSString *)name;

// 通过WKUserScript注入需要执行的JavaScript代码
- (void)addUserScript:(WKUserScript *)userScript;
// 移除所有注入的JavaScript代码
- (void)removeAllUserScripts;
```

# WKUIDelegate

WKUIDelegate主要处理JS脚本，确认框，警告框等。

# WKNavigationDelegate

WKNavigationDelegate主要处理一些跳转、加载处理操作

# WKWebsiteDataStore

 提供了网站所能使用的数据类型，包括 cookies，硬盘缓存，内存缓存活在一些WebSQL的数据持久化和本地持久化。

 # WKFrameInfo

* mainFrame：是否是主窗口(框架)
* request：窗口(框架)的请求
* securityOrigin：框架的安全源
* webView：WkWebView

# native干预webView

* 通过webView代理方法，拦截webView加载过程中的信息
* native向HTML注入脚本
* native直接调用HTML中的JS

# webView调用OC代码

主要是WKUIDelegate的相关代理方法

# WebViewJavascriptBridge

https://github.com/marcuswestin/WebViewJavascriptBridge

```c++
#import "WebViewJavascriptBridge.h"
```

```c++
@property WebViewJavascriptBridge* bridge;
@property WKWebView* webView;
```

```c++
- (void)viewDidLoad {
    [super viewDidLoad];
    
    WKWebViewConfiguration *conf=[[WKWebViewConfiguration alloc] init];
    _webView=[[WKWebView alloc] initWithFrame:CGRectMake(0, 94, UIScreen.mainScreen.bounds.size.width, UIScreen.mainScreen.bounds.size.height) configuration:conf];

    self.bridge = [WebViewJavascriptBridge bridgeForWebView:_webView];
    // Do any additional setup after loading the view.
    // 注册oc方法
    [_bridge registerHandler:@"ocBridgeCall" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"ObjC Echo called with: %@", data);
        responseCallback(data);
    }];
    
        [self.view addSubview:_webView];
        _webView.UIDelegate = self;
//        _webView.navigationDelegate = self;
    //    NSURL *url=[NSURL URLWithString:@"https://www.baidu.com"];
        NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"setupWebViewJavascriptBridge" ofType:@"html"];
         NSURL *url=[NSURL fileURLWithPath:plistPath];
        NSURLRequest *req=[NSURLRequest requestWithURL:url];
        [_webView loadRequest:req];
    
    UIButton *btn=[[UIButton alloc] initWithFrame:CGRectMake(20, 44, 100, 50)];
    UILabel *label=[UILabel new];
    [label setFrame:CGRectMake(0, 0, 100, 500)];
    [btn setTitle:@"调用js方法" forState:UIControlStateNormal];
    btn.titleLabel.text=@"调用js方法";
    btn.titleLabel.textColor=UIColor.whiteColor;
    [btn addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchDown];
     [self.view addSubview:btn];

}

/**
* 调用js方法
**/
-(void)btnClick:(UIButton*) sender{
  [self.bridge callHandler:@"jsBridgeCall" data:@{
    @"abc":@"abc",
    @"name":@"lower"
    } responseCallback:^(id responseData) {
      NSLog(@"ObjC received response: %@", responseData);
    }];
}
```

js

```js
  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
```

```js
  // 注册js方法
  setupWebViewJavascriptBridge(function(bridge) {
    /* Initialize your app here */
    bridge.registerHandler('jsBridgeCall', function(data, responseCallback) {
      console.log('JS Echo called with:', data)
      responseCallback(data)
    })
  })

  
  function goLogin() {
    // 调用oc方法
    setupWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(
        'ocBridgeCall',
        {key: 'ocBridgeCall'},
        function responseCallback(responseData) {
          console.log('JS received response:', responseData)
        }
      )
    })
  }
```

# DSBridge-IOS

https://github.com/wendux/DSBridge-IOS/blob/master/readme-chs.md