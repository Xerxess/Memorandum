<!-- TOC -->

- [Dart](#dart)
- [package](#package)
    - [常用 package 介绍](#常用-package-介绍)

<!-- /TOC -->

# Dart

https://dart.cn/guides/language/language-tour

# package

https://pub.flutter-io.cn/

## 常用 package 介绍

| Package    | Description                                                            | 常用的 API |
| ---------- | ---------------------------------------------------------------------- | ---------- |
|-|<span style="color:red">__全平台库列表__</span>|-|
|dart:async|通过使用 Future 和 Stream 这样的类实现异步编程|-|
|dart:collection|集合操作工具类|-|
|dart:convert|用于提供转换不同数据的编码器和解码器，包括 JSON 和 UTF-8|-|
|dart:core|内置类型、集合以及其它的一些核心功能|-|
|dart:developer|开发者工具|-|
|dart:math|算术相关函数和常量，还有随机数生成器|-|
|dart:typed_data|-|-|
|-|<span style="color:red">__原生平台库__</span>|下面列出的核心库适用于 Dart 原生平台（AOT 和 JIT 编译运行）|
|dart:io|用于支持非 Web 应用的文件、Socket、HTTP 和其它 I/O 操作|-|
|dart:isolate|使用 Isolate 实现并发编程：类似于线程的独立的 Worker。|-|
|dart:mirrors|检查和动态调用的基本反射功能|-|
|-|<span style="color:red"> __通用包__ </span>|-|
| archive    | 对各种存档和压缩格式进行编码和解码                                     | -          |
| characters | 用户感知字符的字符串操作（Unicode 字形簇）                             | -          |
| http       | 一组易于使用 HTTP 资源的高级函数和类                                   | -          |
| intl       | 国际化和本地化功能，支持复数和性别，日期和数字格式和解析以及双向文本。 | -          |
| json_serializable| json可序列化| -          |
|logging|一种将消息日志添加到应用程序的可配置机制|-|
|path|路径的常用操作|-|
|quiver|实用程序使使用Dart核心库更方便。 Quiver提供额外支持的一些库包括异步，缓存，集合，核心，可迭代，模式和测试|-|
|shelf|Dart的Web服务器中间件|-|
|stack_trace|-|-|
|stagehand|Dart项目生成器|-|
|test|-|-|
|yaml|A parser for YAML.|-|
|-|<span style="color:red">__Dart 核心库上的扩展包__</span>|-|
|async|在dart:async上扩展|-|
|collection|Expands on dart:collection|-|
|convert|Expands on dart:convert|-|
|io|包含两个库ansi和io，以简化文件，标准流和进程的使用|-|
