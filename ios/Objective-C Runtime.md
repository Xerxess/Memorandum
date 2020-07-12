<!-- TOC -->

- [Objective-C Runtime](#objective-c-runtime)
- [Objective-C对象方法](#objective-c对象方法)

<!-- /TOC -->

https://developer.apple.com/documentation/objectivec?language=objc

获得对Objective-C运行时和Objective-C根类型的低级访问

# Objective-C Runtime

https://developer.apple.com/documentation/objectivec/nsobject?language=objc

```c++
// 包含类名称的字符串
@property(readonly, copy) NSString *className;

// 查找并返回方法的接收者实现的函数
- (IMP)methodForSelector:(SEL)aSelector;

// 延迟后，使用默认模式在当前线程上调用接收器的方法。
- (void)performSelector:(SEL)aSelector 
             withObject:(id)anArgument 
             afterDelay:(NSTimeInterval)delay;

// 动态添加类方法
+ (BOOL)resolveClassMethod:(SEL)sel;

// 动态添加实例方法
+ (BOOL)resolveInstanceMethod:(SEL)sel;

// 处理收件人无法识别的消息
- (void)doesNotRecognizeSelector:(SEL)aSelector;
```

# Objective-C对象方法

https://developer.apple.com/documentation/objectivec/1418956-nsobject?language=objc

```c++
// 返回接收者的类的类对象
- (Class)class;

// 返回接收者的超类的类对象
@property(readonly) Class superclass;

// 返回一个布尔值，该值指示接收方和给定对象是否相等
- (BOOL)isEqual:(id)object;

// 哈希表结构中的表地址的整数
@property(readonly) NSUInteger hash;

// 
- (instancetype)self;

// 判断是否是这个类或者这个类的子类的实例
- (BOOL)isKindOfClass:(Class)aClass;

// 指示接收方是否是给定类的实例
- (BOOL)isMemberOfClass:(Class)aClass;

// 判读实例是否有这样方法
- (BOOL)respondsToSelector:(SEL)aSelector;

// 指示接收方是否符合给定的协议
- (BOOL)conformsToProtocol:(Protocol *)aProtocol;

// 返回描述接收方内容的字符串
@property(readonly, copy) NSString *description;

// 向一个对象传递任何消息，而不需要在编译的时候声明这些方法。
- (id)performSelector:(SEL)aSelector;
- (id)performSelector:(SEL)aSelector withObject:(id)object;
```