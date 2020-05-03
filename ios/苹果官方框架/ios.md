<!-- TOC -->

- [框架](#框架)
  - [Bundle Resources](#bundle-resources)
  - [Foundation](#foundation)
  - [UIKit](#uikit)
  - [Metal 高级3D图形](#metal-高级3d图形)
    - [MetalKit](#metalkit)
    - [Metal Performance Shaders](#metal-performance-shaders)
  - [ARKit](#arkit)
  - [Model I/O](#model-io)
  - [Core Animation 动画](#core-animation-动画)
  - [OpenGL ES](#opengl-es)
  - [Core Graphics](#core-graphics)
  - [PDFKit PDF文档(iOS 11.0+)](#pdfkit-pdf文档ios-110)
  - [Core Image 处理静止图像和视频图像](#core-image-处理静止图像和视频图像)
  - [PencilKit 绘图(iOS 13.0+)](#pencilkit-绘图ios-130)
  - [Game Controller](#game-controller)
  - [GameKit](#gamekit)
  - [GameplayKit](#gameplaykit)
  - [RealityKit 模拟和渲染现实3D(iOS 13.0+)](#realitykit-模拟和渲染现实3dios-130)
  - [ReplayKit](#replaykit)
  - [GLKit](#glkit)
  - [SceneKit](#scenekit)
  - [Image I/O](#image-io)
  - [SpriteKit](#spritekit)
  - [Vision (iOS 11.0+)](#vision-ios-110)
- [App Services](#app-services)
  - [Accounts 管理其外部帐户](#accounts-管理其外部帐户)
  - [AddressBook 通讯簿](#addressbook-通讯簿)
  - [AddressBookUI 通讯簿UI](#addressbookui-通讯簿ui)
  - [FileProvider (iOS 11.0+) 文档和目录共享](#fileprovider-ios-110-文档和目录共享)
  - [FileProviderUI](#fileproviderui)
  - [AdSupport 广告](#adsupport-广告)
  - [AutomaticAssessmentConfiguration 防止用户访问特定的系统功能 (iOS 13.4+)](#automaticassessmentconfiguration-防止用户访问特定的系统功能-ios-134)
  - [BackgroundTasks 后台任务 (iOS 13.0+)](#backgroundtasks-后台任务-ios-130)
  - [Business Chat 聊天（iOS 11.3+）](#business-chat-聊天ios-113)
  - [Business Chat REST API](#business-chat-rest-api)
  - [~~(国里无法使用)~~ CallKit 网络电话 通话VoIP功能（iOS 10.0+）](#国里无法使用-callkit-网络电话-通话voip功能ios-100)
  - [CareKit 健康](#carekit-健康)
  - [CarPlay Apple CarPlay 车载（iOS 12.0+）](#carplay-apple-carplay-车载ios-120)
  - [ClassKit 教育（iOS 11.4+）](#classkit-教育ios-114)
  - [ClockKit （watchOS 2.0+）](#clockkit-watchos-20)
  - [CloudKit iCloud 共享](#cloudkit-icloud-共享)
  - [Combine 多种异步事件(iOS 13.0+)](#combine-多种异步事件ios-130)
  - [Contacts 联络人](#contacts-联络人)
  - [ContactsUI](#contactsui)
  - [Core Data 数据](#core-data-数据)
  - [Core Foundation](#core-foundation)
  - [Core Location 地理位置和方向](#core-location-地理位置和方向)
  - [Core ML 机器学习 (iOS 11.0+)](#core-ml-机器学习-ios-110)
  - [Create ML (macOS 10.14+)](#create-ml-macos-1014)
  - [Core Motion 加速度计，陀螺仪，计步器和与环境](#core-motion-加速度计陀螺仪计步器和与环境)
  - [Core Spotlight - Spotlight和Safari搜索](#core-spotlight---spotlight和safari搜索)
  - [Core Text 文本](#core-text-文本)
  - [DeviceCheck  记住用户-永久标识信息的方式(iOS 11.0+)](#devicecheck--记住用户-永久标识信息的方式ios-110)
  - [EventKit 提醒事件](#eventkit-提醒事件)
  - [EventKitUI](#eventkitui)
  - [HealthKit 访问和共享健康和健身数据](#healthkit-访问和共享健康和健身数据)
  - [HomeKit 家庭自动化配件](#homekit-家庭自动化配件)
  - [iAd 广告平台](#iad-广告平台)
  - [(重要) JavaScriptCore](#重要-javascriptcore)
  - [MapKit 地图](#mapkit-地图)
  - [Messages  内置message消息应用程序扩展（iOS 10.0+）](#messages--内置message消息应用程序扩展ios-100)
  - [MessageUI](#messageui)
  - [MultipeerConnectivity  蓝牙、WiFi 建立连接](#multipeerconnectivity--蓝牙wifi-建立连接)
  - [Natural Language  分析文本,提取元数据(iOS 12.0+)](#natural-language--分析文本提取元数据ios-120)
  - [NewsstandKit](#newsstandkit)
  - [NotificationCenter 创建和管理实现Today小部件的应用程序扩展](#notificationcenter-创建和管理实现today小部件的应用程序扩展)
  - [PassKit (Apple Pay and Wallet) - Apple Pay](#passkit-apple-pay-and-wallet---apple-pay)
  - [PreferencePanes (macOS 10.1+)](#preferencepanes-macos-101)
  - [(重要) PushKit 推送](#重要-pushkit-推送)
  - [QuickLook 文件的预览](#quicklook-文件的预览)
  - [QuickLookThumbnailing 文件缩略图 (iOS 13.0+)](#quicklookthumbnailing-文件缩略图-ios-130)
  - [SafariServices 提供与Safari应用程序提供的用户界面几乎相同的用户界面。](#safariservices-提供与safari应用程序提供的用户界面几乎相同的用户界面)
  - [SiriKit (iOS 10.0+) 应用程序扩展](#sirikit-ios-100-应用程序扩展)
  - [SMS and Call Reporting 短信和通话报告 (iOS 11.0+)](#sms-and-call-reporting-短信和通话报告-ios-110)
  - [Social 自带的分享服务](#social-自带的分享服务)
  - [AVFoundation 自定义相机、底层拍照和录制视频、播放视频](#avfoundation-自定义相机底层拍照和录制视频播放视频)
  - [AVKit  播放视频](#avkit--播放视频)
  - [Core Audio 提供对音频文件操作的底层接口](#core-audio-提供对音频文件操作的底层接口)
  - [Core Audio Kit 提供了一个简单的音频界面，并且是跨应用的](#core-audio-kit-提供了一个简单的音频界面并且是跨应用的)
  - [Core Audio Types (iOS 13.0+)](#core-audio-types-ios-130)
  - [Core Haptics  震动反馈(iOS 13.0+)](#core-haptics--震动反馈ios-130)
  - [Core Media 提供对媒体文件操作的底层接口](#core-media-提供对媒体文件操作的底层接口)
  - [Core Video 提供对视频文件操作的底层接口](#core-video-提供对视频文件操作的底层接口)
  - [Core MIDI](#core-midi)
  - [HTTP Live Streaming HLS](#http-live-streaming-hls)
  - [ImageCaptureCore 控制媒体设备 (iOS 13.0+)](#imagecapturecore-控制媒体设备-ios-130)
  - [Media Player 媒体播放器](#media-player-媒体播放器)
  - [MediaAccessibility](#mediaaccessibility)
  - [MediaLibrary 访问用户的多媒体内容的只读集合 (macOS 10.9+)](#medialibrary-访问用户的多媒体内容的只读集合-macos-109)
  - [PhotoKit 管理的图像和视频资产](#photokit-管理的图像和视频资产)
  - [QTKit 媒体进行基本操作](#qtkit-媒体进行基本操作)
  - [ScreenSaver 屏幕保护程序进行动画处理（macOS 10.0+）](#screensaver-屏幕保护程序进行动画处理macos-100)
  - [SoundAnalysis （iOS 13.0+）](#soundanalysis-ios-130)
  - [VideoToolbox 视频编码和解码](#videotoolbox-视频编码和解码)
  - [VisionKit 相机扫描文档（iOS 13.0+）](#visionkit-相机扫描文档ios-130)
- [Web](#web)
  - [App Store Connect API](#app-store-connect-api)
  - [Apple Music API](#apple-music-api)
  - [WebKit JS](#webkit-js)
- [Developer Tools](#developer-tools)
  - [Automator](#automator)
  - [Code Diagnostics 代码诊断](#code-diagnostics-代码诊断)
  - [InstallerJS](#installerjs)
  - [ScriptingBridge - 桥接](#scriptingbridge---桥接)
- [System](#system)
  - [Accelerate 向量处理功能](#accelerate-向量处理功能)
  - [Apple CryptoKit 加密（iOS 13.0+）](#apple-cryptokit-加密ios-130)
  - [AuthenticationServices 认证Apple ID登录（iOS 12.0+）](#authenticationservices-认证apple-id登录ios-120)
  - [CFNetwork 网络](#cfnetwork-网络)
  - [Collaboration (macOS 10.5+)](#collaboration-macos-105)
  - [Compression 压缩](#compression-压缩)
  - [Core Bluetooth 核心蓝牙框架](#core-bluetooth-核心蓝牙框架)
  - [Core NFC - NFC(iOS 11.0+)](#core-nfc---nfcios-110)
  - [Core Services (iOS 12.0+)](#core-services-ios-120)
  - [Core Telephony 运营商信息](#core-telephony-运营商信息)
  - [Core WLAN (macOS 10.6+)](#core-wlan-macos-106)
  - [CryptoTokenKit 访问密码令牌 ( iOS 13.0+)](#cryptotokenkit-访问密码令牌--ios-130)
  - [DarwinNotify 发送和接收达尔文通知](#darwinnotify-发送和接收达尔文通知)
  - [Device Management](#device-management)
  - [DiskArbitration (macOS 10.4+)](#diskarbitration-macos-104)
  - [Dispatch 多线程](#dispatch-多线程)
  - [dnssd - dns](#dnssd---dns)
  - [ExternalAccessory 外部连接](#externalaccessory-外部连接)
  - [GSS 网络交易](#gss-网络交易)
  - [IOKit](#iokit)
  - [IOSurface (iOS 11.0+)](#iosurface-ios-110)
  - [LocalAuthentication 指纹验证&生物认证](#localauthentication-指纹验证生物认证)
  - [MetricKit 设备的报告(iOS 13.0+)](#metrickit-设备的报告ios-130)
  - [MobileCoreServices](#mobilecoreservices)
  - [Network TLS，TCP和UDP (iOS 12.0+)](#network-tlstcp和udp-ios-120)
  - [NetworkExtension 网络扩展](#networkextension-网络扩展)
  - [Objective-C Runtime](#objective-c-runtime)
  - [Security 安全](#security-安全)
  - [ServiceManagement 服务管理(iOS 12.1+)](#servicemanagement-服务管理ios-121)
  - [SystemConfiguration 系统配置(检查网名等)](#systemconfiguration-系统配置检查网名等)

<!-- /TOC -->

# 框架

## Bundle Resources

位于应用程序，框架或插件包中的资源。

* iOS 13.0+

## Foundation

访问基本数据类型，集合和操作系统服务，以定义应用程序功能的基础层。
* iOS 2.0+

## UIKit

为您的iOS或tvOS应用程序构建和管理事件驱动的图形用户界面。

## Metal 高级3D图形

渲染高级3D图形，并使用图形处理器执行数据并行计算。

https://baike.baidu.com/item/Metal/10917053?fr=aladdin

https://developer.apple.com/metal/

Metal提供对图形处理单元（GPU）的近乎直接的访问，使您能够最大程度地利用图形，并在iOS，macOS和tvOS上计算应用程序的潜力。Metal在具有预编译的GPU着色器，细粒度的资源控制和多线程支持的可访问的，低开销的体系结构的基础上，Metal进一步发展了对GPU驱动的命令创建的支持，简化了支持Metal的GPU阵列的工作，并允许您点击进入Mac Pro和Pro Display XDR的Pro功能。

### MetalKit


使用更少的代码，更快，更轻松地构建Metal应用。在标准的Metal视图中渲染图形，从许多来源加载纹理，并有效地使用模型I/O提供的模型。
* iOS 9.0+

### Metal Performance Shaders

通过针对每个Metal GPU系列的独特特性进行微调的内核，可以优化图形和计算性能。
* iOS 9.0+

## ARKit

集成iOS设备的摄像头和运动功能，以在您的应用或游戏中产生增强的现实体验。

* iOS 11.0+

## Model I/O

使用集成了MetalKit，GLKit和SceneKit的通用基础结构来导入，导出和操作3D模型。

## Core Animation 动画

渲染，合成和动画化视觉元素。

## OpenGL ES

高效的OpenGL子集创建3D和2D图形效果。

## Core Graphics

利用Quartz技术的力量执行具有高保真输出的轻量级2D渲染。处理基于路径的绘图，抗锯齿渲染，渐变，图像，颜色管理，PDF文档等。

## PDFKit PDF文档(iOS 11.0+)

在您的应用程序中显示和处理PDF文档。

## Core Image 处理静止图像和视频图像

使用内置或自定义过滤器来处理静止图像和视频图像。

## PencilKit 绘图(iOS 13.0+)

将触摸输入捕获为不透明的图形，然后从您的应用中显示该内容。

提供了一个绘图环境，该环境可以从Apple Pencil或用户的手指中获取输入，并将其转换为您在iOS或macOS中显示的高质量图像。

## Game Controller

在游戏中支持硬件游戏控制器。

## GameKit

GameKit提供了可用于创建出色社交游戏的功能。

## GameplayKit

GameplayKit是一个面向对象的框架，提供了用于构建游戏的基础工具和技术。

## RealityKit 模拟和渲染现实3D(iOS 13.0+)

模拟和渲染3D内容，以用于增强现实应用程序。

## ReplayKit

从屏幕录制或流视频，从应用和麦克风录制或流音频。

## GLKit

加快OpenGL ES或OpenGL应用程序的开发。使用数学库，背景纹理加载，预先创建的着色器效果以及标准的视图和视图控制器来实现渲染循环。

## SceneKit

使用高级场景描述创建3D游戏并将3D内容添加到应用程序。轻松添加动画，物理模拟，粒子效果和基于物理的逼真的渲染。

## Image I/O

读取和写入大多数图像文件格式。管理颜色并访问图像元数据。

## SpriteKit

将具有流畅动画的高性能2D内容添加到您的应用程序中，或使用一组基于2D游戏的高级工具来创建游戏。

## Vision (iOS 11.0+)

应用计算机视觉算法对输入的图像和视频执行各种任务。
Vision框架执行面部和面部地标检测，文本检测，条形码识别，图像配准以及一般功能跟踪。

# App Services

## Accounts 管理其外部帐户

帮助用户从您的应用程序内访问和管理其外部帐户，而无需他们输入登录凭据。

## AddressBook 通讯簿

通讯簿是一个包含联系人及其个人信息的集中式数据库。

## AddressBookUI 通讯簿UI

访问用户的联系人并将其显示在图形界面中。

## FileProvider (iOS 11.0+) 文档和目录共享

实施File Provider扩展，以便其他应用程序可以访问您的包含应用程序存储和管理的文档和目录。

## FileProviderUI

将操作添加到文档浏览器的上下文菜单。

## AdSupport 广告

向应用提供访问广告标识符和标志的权限，该标志指示设备是否正在使用有限的广告跟踪。

## AutomaticAssessmentConfiguration 防止用户访问特定的系统功能 (iOS 13.4+)

防止用户在高风险访问特定的系统功能。

## BackgroundTasks 后台任务 (iOS 13.0+)

## Business Chat 聊天（iOS 11.3+）

使用“消息”应用与您的客户聊天。

请求系统在后台启动您的应用以运行任务。

## Business Chat REST API

## ~~(国里无法使用)~~ CallKit 网络电话 通话VoIP功能（iOS 10.0+）

* 国里无法使用可使用PushKit代替

## CareKit 健康

创建可帮助人们更好地了解和管理其健康的应用。

## CarPlay Apple CarPlay 车载（iOS 12.0+）

将CarPlay支持添加到导航应用程序。

## ClassKit 教育（iOS 11.4+）

使教师能够从您的应用程序内容分配活动并查看学生进度。

## ClockKit （watchOS 2.0+）

在时钟面上显示复杂情况下的应用专用数据。

## CloudKit iCloud 共享

在iCloud容器中存储结构化的应用程序和用户数据，这些数据可以由应用程序的所有用户共享。

## Combine 多种异步事件(iOS 13.0+)

Combine是Apple在2019年WWDC上推出的一个新框架。该框架提供了一个声明性的Swift API，用于随时间处理值。这些值可以表示多种异步事件。

## Contacts 联络人

访问用户的联系人，并格式化和本地化联系人信息。

## ContactsUI

## Core Data 数据

在单个设备上保留或缓存数据并支持撤消。

使用核心数据可以保存应用程序的永久数据以供脱机使用，缓存临时数据以及在单个设备上向应用程序添加撤消功能。

## Core Foundation

访问与Foundation框架无缝桥接的低级功能，原始数据类型和各种集合类型。

## Core Location 地理位置和方向

获取设备的地理位置和方向。

## Core ML 机器学习 (iOS 11.0+)

将机器学习模型集成到您的应用程序中。

## Create ML (macOS 10.14+)

## Core Motion 加速度计，陀螺仪，计步器和与环境

过程加速度计，陀螺仪，计步器和与环境有关的事件。

## Core Spotlight - Spotlight和Safari搜索

为您的应用编制索引，以便用户可以从Spotlight和Safari搜索内容。

## Core Text 文本

创建文本布局，优化字体处理，并访问字体规格和字形数据。

## DeviceCheck  记住用户-永久标识信息的方式(iOS 11.0+)

简单来说，你必须先在开发者账号里面注册AppID,形成开发账号与应用的绑定，然后使用苹果提供的API，通过ES256加密、base64编码的令牌，你可以存取2bit的信息，当用户删除应用后重新下载，这个值不变。

## EventKit 提醒事件

创建，查看和编辑日历和提醒事件。

## EventKitUI

## HealthKit 访问和共享健康和健身数据

访问和共享健康和健身数据，同时保持用户的隐私和控制权。

## HomeKit 家庭自动化配件

与家庭自动化配件进行通信，配置和控制。

## iAd 广告平台

IAD是苹果推出的广告平台，它可以帮助开发者从应用程序中获取收入。

## (重要) JavaScriptCore 

从应用程序内评估JavaScript程序，并支持应用程序的JavaScript脚本。

JavaScriptCore是Safari的JavaScript引擎，在iOS7之后苹果开放了JavaScriptCore框架，开发者可以通过其提供的OC接口来使用JavaScriptCore。说白了就是它提供了执行JavaScript代码的能力，相当于一个JavaScript的虚拟机。

## MapKit 地图

从您的应用程序界面显示地图或卫星图像，调出兴趣点，并确定地图坐标的地标信息。

## Messages  内置message消息应用程序扩展（iOS 10.0+）

开发者现在可以为苹果内置的 Messages 应用开发扩展啦。通过开发一个应用扩展，你可以让用户跟应用在 Messages 应用中交互。

## MessageUI

## MultipeerConnectivity  蓝牙、WiFi 建立连接

支持对等连接和附近设备的发现。

近距离设备间建立互动，交换数据和其他资源

## Natural Language  分析文本,提取元数据(iOS 12.0+)

分析自然语言文本并推断其特定于语言的元数据。
可以从文本中提取实体、分析情感、解析文本构成。

## NewsstandKit

## NotificationCenter 创建和管理实现Today小部件的应用程序扩展

为“今日”视图创建和管理窗口小部件。

## PassKit (Apple Pay and Wallet) - Apple Pay

在您的应用程序中请求并处理Apple Pay付款。为电子钱包应用创建，分发和更新通行证。

## PreferencePanes (macOS 10.1+)

## (重要) PushKit 推送

响应与应用程序复杂性，文件提供商和VoIP服务相关的推送通知。

将您应用的自定义首选项集成到“系统偏好”应用中。

一种新的消息通知方式，旨在帮助voip应用（iOS 8）和watch OSComplication（iOS 9）减少电池的使用，提供更好的用户体验，app可以通过PushKit进行唤醒，进行一些操作，而不被用户感知。

* APNS 远程推送 ，在每次启动时只能获取到一条推送内容，并且相应的处理必须在用户进行一定的操作后才能执行。而PushKit可以在无操作的情况就能进行消息的处理。
* APNS需要获取用户的权限，如果用户不同意接收推送，那么app就获取不到deviceToken，相应我们也就没办法推送给客户端消息，而PushKit则可以，当然如果用户拒绝接收通知栏等推送，你想在PushKit的代理方法中，进行本地推送，也是不可以的。
* PushKit类似于APNS的静默推送，但是在送达率上比静默推送可靠的多，用户是可以没有任何感知的。

## QuickLook 文件的预览

创建文件预览以在您的应用中使用，或对预览执行简单的编辑。

QuickLook几乎可以搞定几乎所有的文件，除了图片、音乐，视频、PDF、Word等都是可以。但是其可定制部分比较少，样式比较单一。

## QuickLookThumbnailing 文件缩略图 (iOS 13.0+)

生成常见文件类型的缩略图，并将缩略图扩展添加到您的应用中，以使其他人可以创建自定义文件的缩略图。

## SafariServices 提供与Safari应用程序提供的用户界面几乎相同的用户界面。

SafariServices框架在您的应用中启用网页视图和服务。接下来几篇我们就一起看一下这个框架。

SFSafariViewController是一个特殊的UIViewController，可在当前App使用Safari的UI框架展现Web内容，同时还能享受到Safari的一些便利特性

## SiriKit (iOS 10.0+) 应用程序扩展

处理源自Siri或地图的用户对您的应用服务的请求。

SiriKit包含Intents和Intents UI框架，您可以使用它们来实现将您的服务与Siri和Maps集成的应用程序扩展

## SMS and Call Reporting 短信和通话报告 (iOS 11.0+)

## Social 自带的分享服务

 使用标准系统界面将内容发布到受支持的社交网络服务。

 ## Speech 实现语音识别（iOS 10.0+）

 对现场或预先录制的音频执行语音识别，接收转录，替代解释以及结果的置信度。

 ## StoreKit 应用程序内购买

 支持应用程序内购买以及与App Store的交互。
 StoreKit是苹果提供的一个用于提供付费内容和服务的交易框架

 ## (重要)UserNotifications 前本地通知和远程推送(iOS 10.0+)

 将面向用户的通知从服务器推送到用户的设备，或从您的应用本地生成。

 ## UserNotificationsUI

 ## WatchConnectivity - watchOS应用之间实现双向通信

 在iOS应用与其配对的watchOS应用之间实现双向通信。

 ## WebKit 

 显示Web内容。实现浏览器功能，例如跟随用户激活的链接，管理后退列表以及管理最近访问的页面的历史记录。

 # Media

 ## Apple News

 设计，创建和发布Apple News的签名内容。

 ## Apple Search Ads

 通过使用Apple Search Ads Campaign Management API创建和管理广告系列来推动应用发现。

 ## ~~AssetsLibrary~~ (PhotoKit 代替) 问用户媒体库中的资产

 访问用户媒体库中的资产

 ## AudioToolbox 音效设置

 记录或播放音频，转换格式，解析音频流以及配置音频会话。

 在iOS设备中，声音分为两种，一种是音效输出，一种是音频输出。音效，就是利用系统的声音，用来播放比较短的音频，主要用途是用来做系统的提示音，使用的框架是AudioToolBox。

 ## AudioUnit 音频框架 实时IO录制、回放、离线

向您的应用程序添加复杂的音频处理和处理功能。创建在主机应用程序中生成或修改音频的音频单元扩展。

AudioUnit是iOS底层音频框架，可以用来进行混音、均衡、格式转换、实时IO录制、回放、离线渲染、语音对讲(VoIP)等音频处理。

## AVFoundation 自定义相机、底层拍照和录制视频、播放视频

使用视听资产，控制设备摄像机，处理音频并配置系统音频交互。

自定义相机  
使用AVFoundation拍照和录制视频  
使用AVFoundation生成视频缩略图

## AVKit  播放视频

创建用于媒体播放的视图级服务，包括用户控件，章节导航以及对字幕和隐藏式字幕的支持。

AVKit基于AVFoundation封装的框架，它提供了视频的播放界面，如果我们的设计是符合原生系统的话，毫不犹豫就应该使用它了

## Core Audio 提供对音频文件操作的底层接口

使用Core Audio框架与设备的音频硬件进行交互。

Core Audio 是iOS和 MAC 的关于数字音频处理的基础，它提供应用程序用来处理音频的一组软件框架，所有关于IOS音频开发的接口都是由Core Audio来提供或者经过它提供的接口来进行封装的，按照官方的说法是集播放、音频处理、录制为一体的专业技术，通过它我们的程序可以同时录制，播放一个或者多个音频流，自动适应耳机，蓝牙耳机等硬件，响应各种电话中断，静音，震动等，甚至提供3D效果的音乐播放。

## Core Audio Kit 提供了一个简单的音频界面，并且是跨应用的

将用户界面添加到音频单元。

Core Audio Kit框架提供了一个Objective-C界面，可用于将用户界面添加到Cocoa音频单元。

## Core Audio Types (iOS 13.0+)

CoreAudioTypes框架声明其他Core Audio接口使用的通用数据类型和常量。该框架还包括一些便利功能。

## Core Haptics  震动反馈(iOS 13.0+)

编写并播放触觉模式，以自定义iOS应用的触觉反馈。

CoreHaptics 是 iOS13 中的新API，同时只有 iPhone 8 及之后的机型支持。CoreHaptics 提供了更加细腻，可控的震动表达方式，可以令APP产生一种全新的体验。

## Core Media 提供对媒体文件操作的底层接口

## Core Video 提供对视频文件操作的底层接口

##  Core MIDI

Core MIDI框架用于与MIDI设备（如硬件键盘和合成器）进行通信。

## HTTP Live Streaming HLS

将音频和视频发送到iOS，tvOS和macOS设备。

HTTP Live Streaming（HLS）通过HTTP从普通Web服务器发送音频和视频，以便在基于iOS的设备（包括iPhone，iPad，iPod touch和Apple TV）和台式计算机（macOS）上播放。使用为Web供电的相同协议，HLS使用普通的Web服务器和内容交付网络部署内容。HLS专为可靠性而设计，并通过优化回放以达到有线和无线连接的可用速度来动态适应网络条件。

## ImageCaptureCore 控制媒体设备 (iOS 13.0+)

ImageCaptureCore使您的应用可以浏览媒体设备并以编程方式对其进行控制。

## Media Player 媒体播放器

应用程序中查找和播放歌曲，音频播客，有声读物等

## MediaAccessibility

协调应用程序媒体文件的隐藏字幕数据的显示。

## MediaLibrary 访问用户的多媒体内容的只读集合 (macOS 10.9+)

## PhotoKit 管理的图像和视频资产

应用程序管理的图像和视频资产，包括来自iCloud Photos和Live Photos的图像和视频资产

## QTKit 媒体进行基本操作

对媒体进行基本操作，例如电影播放和编辑。导入和导出标准媒体格式。

## ScreenSaver 屏幕保护程序进行动画处理（macOS 10.0+）

对屏幕保护程序进行动画处理，并与屏幕保护程序基础结构进行交互。使用可帮助您产生随机值和居中矩形的函数。

## SoundAnalysis （iOS 13.0+）

分析流式和基于文件的音频，以将其分类为特定类型。

## VideoToolbox 视频编码和解码

直接使用硬件加速的视频编码和解码功能。

## VisionKit 相机扫描文档（iOS 13.0+）

使用iOS相机扫描文档，就像您在Notes应用程序中捕获的文档一样。

# Web

## App Store Connect API

在Apple Developer网站和App Store Connect上自动执行任务

## Apple Music API

将流音乐与Apple Music内容集成

## WebKit JS

访问和修改网页中的DOM元素，包括触摸事件和视觉效果。

# Developer Tools

## Automator

开发可以由Automator应用程序加载和运行的操作。在您的应用程序中查看，编辑和运行Automator工作流程。

## Code Diagnostics 代码诊断

启用运行时检查以检测并避免代码中的错误。

## InstallerJS

管理和定制安装和分发体验。

## ScriptingBridge - 桥接

通过发送和接收Apple事件来自动化可编写脚本的应用程序。

Scripting Bridge技术的目的是在javasc，Ruby, Python,以及 Objective-C等语言中向脚本支持的应用发送apple  event

# System

## Accelerate 向量处理功能

进行大规模数学计算和图像计算，针对高性能和低能耗进行了优化。

## Apple CryptoKit 加密（iOS 13.0+）

安全有效地执行加密操作

## AuthenticationServices 认证Apple ID登录（iOS 12.0+）

使用户可以轻松登录应用程序和服务。

## CFNetwork 网络

访问网络服务并处理网络配置中的更改。建立在网络协议抽象之上，以简化任务，例如使用BSD套接字，管理HTTP和FTP服务器以及管理Bonjour服务。

## Collaboration (macOS 10.5+)

查找和访问身份，即用户和组。显示身份选择器，使用户可以创建和选择身份。

## Compression 压缩

利用通用压缩算法进行无损数据压缩。

## Core Bluetooth 核心蓝牙框架

核心蓝牙框架

## Core NFC - NFC(iOS 11.0+)

## Core Services (iOS 12.0+)

访问和管理关键的操作系统服务，例如启动和身份服务。

## Core Telephony 运营商信息

访问有关用户的蜂窝服务提供商的信息，例如其唯一标识符以及运营商是否允许VoIP。

## Core WLAN (macOS 10.6+)

查询AirPort接口并选择无线网络

## CryptoTokenKit 访问密码令牌 ( iOS 13.0+)

访问安全性令牌及其存储的加密资产

## DarwinNotify 发送和接收达尔文通知

## Device Management

远程管理组织的设备

## DiskArbitration (macOS 10.4+)

磁盘仲裁框架提供了用于注册安装/卸载通知和阻止安装/卸载事件的机制。

## Dispatch 多线程

通过提交工作以分派系统管理的队列，在多核硬件上同时执行代码。

## dnssd - dns

发现，发布和解析局域网或广域网上的网络服务。

## ExternalAccessory 外部连接

与通过Apple Lightning连接器连接到设备或通过蓝牙无线连接的附件进行通信。

## GSS 网络交易

进行安全的，经过身份验证的网络交易

## IOKit

在用户空间中访问硬件设备和驱动程序。

## IOSurface (iOS 11.0+)

跨多个进程共享硬件加速的缓冲区数据（帧缓冲区和纹理）。更有效地管理图像内存。

## LocalAuthentication 指纹验证&生物认证

用生物特征识别或使用他们已经知道的密码对用户进行身份验证

面部识别ID或触摸ID之类的生物特征认证来安全，轻松地访问其设备。作为后备选项，对于没有生物特征识别的设备，密码或密码也可以达到类似的目的。

## MetricKit 设备的报告(iOS 13.0+)

汇总和分析有关功率和性能指标的每个设备的报告。

## MobileCoreServices

使用统一类型标识符（UTI）信息来创建和处理可在您的应用程序与其他应用程序和服务之间交换的数据。

## Network TLS，TCP和UDP (iOS 12.0+)

创建网络连接以使用传输和安全协议发送和接收数据。
当您需要直接访问自定义应用程序协议的协议（例如TLS，TCP和UDP）时，请使用此框架

## NetworkExtension 网络扩展

自定义和扩展核心网络功能

## Objective-C Runtime

获得对Objective-C运行时和Objective-C根类型的低级访问

## Security 安全

保护应用程序管理的数据，并控制对应用程序的访问

## ServiceManagement 服务管理(iOS 12.1+)

## SystemConfiguration 系统配置(检查网名等)
 
允许应用程序访问设备的网络配置设置。确定设备的可达性，例如Wi-Fi或小区连接是否处于活动状态。

加载和卸载已启动的服务。