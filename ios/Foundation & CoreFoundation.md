<!-- TOC -->

- [Foundation 与 CoreFoundation](#foundation-与-corefoundation)
- [Foundation](#foundation)
- [CoreFoundation](#corefoundation)
- [桥接](#桥接)
- [转换](#转换)

<!-- /TOC -->

# Foundation 与 CoreFoundation

* Foundation：OC类库，NS开头
* CoreFoundation：C类库，CF开头

# Foundation

Foundation：OC对象，MRC环境下由程序员手动管理，ARC环境下由系统自动管理

# CoreFoundation

非对象，MRC和ARC环境下都由程序员手动管理，只要是使用名称包含create/new/copy/retain的函数创建出来的，最后都需要手动调用release进行释放

* 群体数据类型 (数组、集合等)
* 程序包
* 字符串管理
* 日期和时间管理
* 原始数据块管理
* 偏好管理
* URL及数据流操作
* 线程和RunLoop
* 端口和soket通讯

# 桥接

桥接就是在Foundation框架中的对象和Core Foundation框架中的变量之间进行类型转换

```c++
// __bridge type
// __bridge只进行类型转换，不转让对象的所有权
stringC = (__bridge CFStringRef)stringOC;
stringOC = (__bridge NSString *)stringC;

// __bridge_retain CF type
// 转让对象的所有权，把对象的所有权从stringOC转移给stringC，原来是由stringOC管理的内存，现在让stringC来管理，需要手动释放
strC = (__bridge_retain CFStringRef)strOC;

// __bridge_transfer Objective-C type
// 转让变量的所有权，把变量的所有权从stingrC转移给stringOC，原来是由stringC管理的内存，现在让stringOC来管理，在ARC环境下，stringOC可以自动释放
stringOC = (__bridge_transfer NSString*)stringC;
```

# 转换

```c++
// OC -> C
NSString *ocStr1 = [NSString stringWithFormat:@"123"];
CFStringRef cStr1 = (CFStringRef)ocStr1;
[ocStr1 release];
CFRelease(cStr1);

// C -> OC
CFStringRef cStr2 = CFStringCreateWithCString(CFAllocatorGetDefault(), "123", kCFStringEncodingASCII);
NSString *ocStr2 = (NSString *)cStr2;
CFRelease(cStr2);
[ocStr2 release];
```