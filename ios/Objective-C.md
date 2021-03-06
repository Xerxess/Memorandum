# Objective-C
<!-- TOC -->

- [Objective-C](#objective-c)
- [相关文档](#相关文档)
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
  - [@property](#property)
    - [assign与weak](#assign与weak)
    - [retain和strong](#retain和strong)
  - [. 运算符访问属性](#-运算符访问属性)
  - [不带参数名方法](#不带参数名方法)
  - [局部变量](#局部变量)
  - [继承](#继承)
- [Foundation 框架简介](#foundation-框架简介)
- [Application Kit框架包](#application-kit框架包)
- [内存管理和自动引用计数](#内存管理和自动引用计数)
- [IMP和SEL（方法和类的反射）](#imp和sel方法和类的反射)
- [@selector && NSSelectorFromString && performSelector](#selector--nsselectorfromstring--performselector)
- [OC == &&  isEqual && isEqualToString](#oc----isequal--isequaltostring)
- [Block  __block修饰符](#block--__block修饰符)
- [__kindof](#__kindof)
  - [泛型数组](#泛型数组)
- [__weak和__strong](#__weak和__strong)
  - [__weak、__strong的实现原理](#__weak__strong的实现原理)

<!-- /TOC -->

# 相关文档

* Cocoa Core Competencies（Cocoa Core 核心能力）   https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Introduction.html#//apple_ref/doc/uid/TP40008195-CH68-DontLinkElementID_2

* Programming with Objective-C（用Objective-C编程）  https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210

* Object-Oriented Programming with Objective-C（使用Objective-C进行面向对象的编程）  https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/OOP_ObjC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005149

* Adopting Modern Objective-C（采用现代Objective-C） https://developer.apple.com/library/archive/releasenotes/ObjectiveC/ModernizationObjC/AdoptingModernObjective-C/AdoptingModernObjective-C.html#//apple_ref/doc/uid/TP40014150

* Objective-C Runtime Programming Guide（Objective-C运行时编程指南） https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008048

* Object Oriented Programming and the Objective-C Programming Language 1.0（Objective-C编程语言1.0简介） https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/OOPandObjC1/Introduction/introObjectiveC.html#//apple_ref/doc/uid/TP40005191

Objective-C-CheatSheet (基础知识)
* https://github.com/iwasrobbed/Objective-C-CheatSheet

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

## @property

* assign 简单赋值，不更改索引计数 适用简单数据类型(例如NSInteger，CGFloat）和C数据类型（int, float, double, char)
* weak 与assign 相对应 用于IBOutlets,如，UIViewController的子类，即一般的控件。
* strong: //ARC中默认属性，等于非ARC中的retain
* retain strong相对应，使用了引用计数，retain+1,release -1;当引用 计数为0时，dealloc会被调用，内存被释放
* copy 非共享内存时，每个指针有自己的内存空间
* atomic //默认属性 该变量为线程安全型，但是会影响访问速度
* nonatomic 非线程安全型，访问速度快
* readonly 只有get方法，没有set方法
* readwrite //默认属性

### assign与weak
两者都是弱引用，assign通常用于普通类型属性（如int,NSInteger），还有代理属性的修饰，基本上来说两者是可以通用的。  
只是后者比前者多了一个功能，后者会在引用的对象被释放的时候将该属性置为nil，而前者依然会指向原来的位置，这样就会变成野指针。在oc中你给你一个nil对象发送消息不会crash，但是给一个对象发送他不能解析的消息是会crash的，所以总的来说weak要比assign安全一些。
像delegate属性建议用weak修饰而不是assign。

### retain和strong
他俩都是强引用，除了某些情况下不一样，其他的时候也是可以通用的。
在修饰block属性的时候，相信大家都知道要用copy吧，因为如果不copy的话，block是存放在栈连里面的，他的生命周期会随着函数的结束而出栈的，copy之后会放在堆里面。  
strong在修饰block的时候就相当于copy，而retain修饰block的时候就相当于assign，这样block会出现提前被释放掉的危险。



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

# IMP和SEL（方法和类的反射）

* SEL：类方法的指针，相当于一种编号，区别与IMP！
* IMP：函数指针，保存了方法的地址！

```c++
// 获取SEL和IMP方法和调用：

SEL methodSel = @selector(str:);
[self performSelector:methodSel withObject:nil];//方法的调用
NSLog(@"===%p",methodSel);

IMP methodImp = [self methodForSelector:methodSel];
methodImp();//方法的调用
NSLog(@"===%p",methodImp);
```

```c++
// 通过反射获取方法名（包括class）

NSString *methodName = NSStringFromSelector(methodSel);
NSLog(@"映射===%@",methodName);

NSString *className = NSStringFromClass([Father class]);
NSLog(@"映射===%@",className);

Class FatherClass = NSClassFromString(className);
NSLog(@"映射===%@",FatherClass);
```

> 为什么不直接获得函数指针，而要从SEL这个编号走一圈再回到函数指针呢？

可以对一个编号和什么方法映射做些操作，也就是说我们可以一个SEL指向不同的函数指针，这样就可以完成一个方法名在不同时候执行不同的函数体。另外可以将SEL作为参数传递给不同的类执行。也就是说我们某些业务我们只知道方法名但需要根据不同的情况让不同类执行的时候，SEL可以帮助我们。

# @selector && NSSelectorFromString && performSelector

https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Selector.html#//apple_ref/doc/uid/TP40008195-CH48

https://developer.apple.com/documentation/objectivec/1418956-nsobject/1418867-performselector?language=occ

选择器是用于选择要为对象执行的方法的名称，或者是唯一的标识符，用于在编译源代码时替换该名称。

* 编译时 @selector()就是取类方法的编号,他的行为基本可以等同C语言的中函数指针,只不过C语言中，可以把函数名直接赋给一个函数指针，而Object-C的类不能直接应用函数指针，这样只能做一个@selector语法来取. 它的结果是一个SEL类型。这个类型本质是类方法的编号(函数地址)
* 运行时 NSSelectorFromString 可以以NSString 来查找函数

```c++
SEL customSelector = NSSelectorFromString([NSStringstringWithFormat:@"abcWith%@:", array]);
```

* 不能像js 一样直接赋值

```c++
SEL sel = @selector(lowercaseString);
// 函数有参数，是需要加冒号的：
SEL sel = @selector(lowercaseString:);
SEL sel=@selector(lowercseString:withSomething:)
```

# OC == &&  isEqual && isEqualToString

* == 比较两个对象，是比较两个对象的地址
* isEqual 比较两个对象的值是否相等

# Block  __block修饰符

__block可以解决block内部无法修改外部auto变量的问题。

```c++
__block int age = 10;
void (^myblock)(void) =  ^{
  NSLog(@"%d",age);
};
age  = 20;
myblock();
// 修改age为20的时候，打印也是20。
```

# __kindof

一般用在方法返回值的前面修饰，表示返回值可以是当前类或者它子类

```c++
@interface Person : NSObject

/*
  id表示返回值可以是任意类型,它的坏处: 
  1. 不能在编译的时候检查真实类型
  2. 返回值,没有提示
*/
//+ (id)person;

// instancetype:会自动识别当前对象的类，但是和__kindof相比它没有提示
//+ (instancetype)person;

// __kindof Person *:表示可以是Person类或者它的子类,和instancetype相比,在调用的时候,很清楚的知道返回类型
+ (__kindof Person *)person;

// 仅仅表示只能是Person类
+ (Person *)person1;

@end
```

## 泛型数组

```c++
@property (nonatomic,strong) NSArray<__kindof UIView *>       *viewArray;
```

# __weak和__strong

## __weak、__strong的实现原理

* __strong修饰符(默认)
* __weak修饰符
* __unsafe_unretained修饰符
* __autoreleasing修饰符

```c++
__weak typeof(self) weakSelf = self;
__strong typeof(self) strongSelf = self;
```
