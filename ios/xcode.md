# xcode 

<!-- TOC -->

- [xcode](#xcode)
- [工具介绍](#工具介绍)
    - [Instrument工具介绍与使用](#instrument工具介绍与使用)
    - [Accessibility Inspector](#accessibility-inspector)
    - [FileMerge](#filemerge)
    - [Application Loader(应用程序加载器)](#application-loader应用程序加载器)
- [Debug、Release、Archive、Profile、Analyze概念解释](#debugreleasearchiveprofileanalyze概念解释)
- [Interface Builder](#interface-builder)
- [Xcode11: 删除默认Main.storyBoard、自定义根控制器](#xcode11-删除默认mainstoryboard自定义根控制器)
- [构建的环境变量](#构建的环境变量)

<!-- /TOC -->

# 工具介绍

instruments 工具
simulator 模拟器
accessibility inspector 可访问性检查器
filemerge 文件合并
application loader 程序加载器

## Instrument工具介绍与使用

https://www.dazhuanlan.com/2019/11/10/5dc70506b82c5/

Instrument是性能分析、动态跟踪和分析OS X和iOS代码的测试工具。它是一个灵活的和强大的工具，可以让您追踪程序运行的过程，收集数据，并检查所收集的数据。

* Leaks（泄漏）：一般的措施内存使用情况，检查泄漏的内存，并提供了所有活动的分配和泄漏模块的类对象分配统计信息以及内存地址历史记录；

* Allocations（内存分配）：跟踪过程的匿名虚拟内存和堆的对象提供类名和可选保留/释放历史；

* Time Profiler（时间探查）：执行对系统的CPU上运行的进程低负载时间为基础采样。

* Activity Monitor（活动监视器）：显示器处理的CPU、内存和网络使用情况统计；

* Automation（自动化）：这个模板执行它模拟用户界面交互为IOS机应用从instrument启动的脚本；

## Accessibility Inspector

xcode中自带的一个检测工具, 可以非常方便快速地获取iOS APP中各个控件元素的层级结构. 利用该层级结构, 我们可以在UIAutomation中实现相应的自动化了.

## FileMerge

管理代码合并的工具，在XCode中如果提交svn 或者 git的时候，在展示diff的时候，其实就用到了这个工具的部分功能。

## Application Loader(应用程序加载器)

上传IPA(用于发布的IPA)需要您的计算机运行安装了Application Loader(应用程序加载器)的OSX。Application Loader应该作为iOS开发SDK的一部分来安装；但是，也可以通过其他方法来安装及访问。

# Debug、Release、Archive、Profile、Analyze概念解释

* Debug
* Release
* Archive
* Profile
* Analyze

# Interface Builder

Xcode中的Interface Builder编辑器使无需编写任何代码即可轻松设计完整的用户界面。只需将窗口，按钮，文本字段和其他对象拖放到设计画布上，即可创建可运行的用户界面。

Interface Builder（IB）是Mac OS X平台下用于设计和测试用户界面（GUI）的应用程序（非开源）。为了生成GUI，IB并不是必需的，实际上Mac OS X下所有的用户界面元素都可以使用代码直接生成；但IB能够使开发者简单快捷的开发出符合Mac OS X human-interface guidelines的GUI。通常你只需要通过简单的拖拽（drag-n-drop）操作来构建GUI就可以了。IB使用Nib文件储存GUI资源，同时适用于Cocoa和Carbon程序。在需要的时候，Nib文件可以被快速地载入内存。

* xib：是一个可视化文件，可通过拖拽文件进行界面创作和布局。xib实际是个xml文件，xib = XML nib。
* nib：xib编译之后就得到nib文件，nib= NeXT Interface Builder
* storyboard：大家可以理解为是升级版的xib，可以同时管理多个xib文件并处理场景与场景之间的跳转。

# Xcode11: 删除默认Main.storyBoard、自定义根控制器

* 直接移除Storyboard
* info.plist移除 Main storyboard file base name
* info.plist移除Application Scene Manifest选项
* 在APPdelegate.h里面添加window属性

```c++
@property (strong, nonatomic) UIWindow * window;
```

* 在APPdelegate.m

```c++
#import "AppDelegate.h"
#import "ViewController.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor = [UIColor whiteColor];
    // ViewController 是你的 rootViewController
    self.window.rootViewController = [[ViewController alloc]init];
    [self.window makeKeyAndVisible];
    return YES;
}

@end
```

# 构建的环境变量

https://help.apple.com/xcode/mac/11.4/#/itcaec37c2a6

```c++
// 产品的基本名称
$(PRODUCT_NAME)

// 唯一标识捆绑商品的字符串
$(PRODUCT_BUNDLE_IDENTIFIER)

// 目标源文件的目录
$(SRCROOT)

// 当前target的名称
$(TARGET_NAME)
```