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
