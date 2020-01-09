# Objective-C
<!-- TOC -->

- [Objective-C](#objective-c)
- [Objective-C程序基本组成](#objective-c程序基本组成)
- [数据类型](#数据类型)
- [常量](#常量)
    - [定义常量](#定义常量)
- [定义方法](#定义方法)
- [预处理器](#预处理器)
- [预定义的宏](#预定义的宏)
- [类型定义（typedef）](#类型定义typedef)
- [Objective-C类和对象](#objective-c类和对象)
    - [Objective-C特征](#objective-c特征)
    - [关键字](#关键字)
    - [. 运算符访问属性](#-运算符访问属性)
    - [不带参数名方法](#不带参数名方法)
    - [局部变量](#局部变量)
    - [继承](#继承)
- [Foundation 框架简介](#foundation-框架简介)
- [Application Kit框架包](#application-kit框架包)
- [内存管理和自动引用计数](#内存管理和自动引用计数)

<!-- /TOC -->

# Objective-C程序基本组成

* 预处理程序命令
* 接口
* 实现
* 方法
* 变量
* 声明和表达
* 注释

```c
#import <Foundation/Foundation.h>

@interface SampleClass:NSObject
- (void)sampleMethod;
@end

@implementation SampleClass

- (void)sampleMethod {
   NSLog(@"Hello, World! \n");
}

@end

int main() {
   SampleClass *sampleClass = [[SampleClass alloc]init];
   [sampleClass sampleMethod];
   return 0;
}
```

# 数据类型

# 常量

## 定义常量

* #define预处理器
* const关键字 - const关键字作为前缀来声明具有特定类型的常量

```c
#define LENGTH 10   
#define WIDTH  25
#define NEWLINE '\n'

const int  LENGTH = 10;
const int  WIDTH  = 15;
const char NEWLINE = '\n';
```

# 定义方法

# 预处理器

* #define 替换预处理器宏
* #include 从另一个文件插入特定标头
* #undef 未定义的预处理器宏
* #ifdef 如果定义了此宏，则返回true
* #ifndef 如果未定义此宏，则返回true
* #if 测试编译时条件是否为true
* #else #if的替代方案
* #elif 在#else和 #if 中的一个语句
* #endif 结束预处理器条件
* #error 在stderr上打印错误消息
* #pragma 使用标准化方法向编译器发出特殊命令

# 预定义的宏

* __DATE__ 当前日期为“MMM DD YYYY”格式的字符文字
* __TIME__ 当前时间作为“HH:MM:SS”格式的字符文字
* __FILE__ 它包含当前文件名作为字符串文字。
* __LINE__ 它包含当前行号作为十进制常量。
* __STDC__ 当编译器符合ANSI标准时，定义为1。

```c
NSLog(@"File :%s\n", __FILE__ );
NSLog(@"Date :%s\n", __DATE__ );
NSLog(@"Time :%s\n", __TIME__ );
NSLog(@"Line :%d\n", __LINE__ );
NSLog(@"ANSI :%d\n", __STDC__ );

// File :main.m
// Date :Nov 15 2018
// Time :08:44:52
// Line :7
// ANSI :1
```

# 类型定义（typedef）

```c
typedef unsigned char BYTE;

// 标识符BYTE可以用作unsigned char类型的缩写(或别名)，例如：

typedef unsigned char BYTE;
BYTE  b1, b2;
```


# Objective-C类和对象

## Objective-C特征

* 类定义在两个不同的部分，即@interface和@implementation。
* 几乎所有东西都是对象的形式。
* 对象接收消息，对象通常称为接收者。
* 对象包含实例变量。
* 对象和实例变量具有范围。
* 类隐藏对象的实现。
* 属性用于提供用于其他类对此类实例变量的访问。


## 关键字

* @interface和@implementation - 基本框架
* @property/@synthesize - 标识属性(自动生成get/set)
* static - 静态变量
* slef - 当前实例

## . 运算符访问属性

```c
instance.property
instance.property=value === [instance setProperty:value]
```

## 不带参数名方法

```c
-(int) set:(int) i name:(int) j // 带name参数名
-(int) set:(int) i:(int) j // 不带参数名
```

## 局部变量

## 继承


```c
@interface Fraction:NSObject // 继承NSObject
{
   
}
```


# Foundation 框架简介

* 为所有的程序开发奠定基础的框架称为Foundation框架。该框架允许使用一些基本对象，如数字和字符串，以及一些对象集合，如数组、字典和集合。其他功能包括处理日期和时间、自动化的内存管理、处理基础文件系统、存储（或归档）对象、处理几何数据结构（如点和长方形）。

# Application Kit框架包

* 框架包含广泛的类和方法，它们用来开发交互式图形应用程序，使得开发文本、菜单、工具栏、表、文档、剪贴板和窗口之类的过程变得十分简便。在OSX系统中，术语Cocoa总的来说指的是Foundation框架、Application Kit框架和名为Core Data的第三方框架。术语 Cocoa Touch是指Foundation、Core Data和UIKit框架。

# 内存管理和自动引用计数

基本内存管理模型有

* 自动垃圾收集。 ios 不支持
* 手工引用计数和自动释放池。
* 自动引用计数（ARC）。