<!-- TOC -->

- [Swift 与 OC 混编](#swift-%E4%B8%8E-oc-%E6%B7%B7%E7%BC%96)

<!-- /TOC -->

# Swift 与 OC 混编

https://developer.apple.com/documentation/swift/imported-c-and-objective-c-apis
https://developer.apple.com/documentation/swift/importing-objective-c-into-swift
需要桥接实现

两种情况:

- 在 Swift 工程中使用 Objective-C 文件
- 在 Objective-C 工程中使用 Swift 的文件

##  在 Swift 工程中使用 Objective-C 文件

* 在您的 Objective-C 桥接头文件中，导入您想要向 Swift 公开的每个 Objective-C 标头
* 在 Swift Compiler - General 中，确保 Objective-C 桥接头文件构建设置中包含桥接头文件的路径。
* 桥接头文件中列出的所有公共 Objective-C 头文件对 Swift 可见。Objective-C 声明可从该目标中的任何 Swift 文件自动获取，无需 import 语句。自定义 Objective-C 代码中的类和其他声明，使用与系统类相同的 Swift 语法即可。

```Objective-C
// Swift-Bridging-Header.h
#import <AMapLocationKit/AMapLocationKit.h>
#import <MAMapKit/MAMapKit.h>
#import <AMapFoundationKit/AMapFoundationKit.h>
```
