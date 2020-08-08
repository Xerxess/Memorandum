<!-- TOC -->

- [通知 NSNotification](#通知-nsnotification)
  - [解决的问题](#解决的问题)
- [NSKey 值观察 (KVO)](#nskey-值观察-kvo)
  - [应用场景](#应用场景)
  - [基本](#基本)
  - [NSKeyValueChangeKey](#nskeyvaluechangekey)
  - [NSKeyValueObservingOptions](#nskeyvalueobservingoptions)
- [NSNotificationCenter](#nsnotificationcenter)
- [NSNotification](#nsnotification)
  - [手动移除观察者](#手动移除观察者)
- [NSNotificationQueue](#nsnotificationqueue)
  - [NSPostingStyle](#nspostingstyle)
  - [NSNotificationCoalescing 合并通知](#nsnotificationcoalescing-合并通知)
- [跨进程通知](#跨进程通知)
- [NSNotification在多线程](#nsnotification在多线程)
- [demo](#demo)
  - [once](#once)

<!-- /TOC -->

# 通知 NSNotification

https://developer.apple.com/documentation/foundation/nsnotificationcenter?language=occ

https://developer.apple.com/documentation/foundation/nsnotificationname?language=occ

##  解决的问题

* 可以实现跨层的传递，例如A页面跳转到B页面，B页面再跳转到C页面，这时候如果我们通过委托回调的模式让A知道C的一些修改，那么实现起来就会很麻烦。
* 可以实现一对多，NSNotification 的实际是一种观察者模式。

# NSKey 值观察 (KVO)

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i

对象采用的一种非正式协议，用于将其他对象的指定属性的更改通知给对象。  


## 应用场景

* 当数据模型的数据发生改变时，视图组件能动态的更新，及时显示数据模型更新后的数据。
* 监听scrollView的contentOffset属性，来完成用户滚动时动态改变某些控件的属性实现效果，包括渐变导航栏、下拉刷新控件等效果。

## 基本

```c++
// 相对于被观察对象的指定键路径上的值已更改时，通知观察对象
// 需要类重写这个方法，处理数据的改变
// 每当监听的keyPath发生变化了，就会在这个函数中回调
- (void)observeValueForKeyPath:(NSString *)keyPath 
                      ofObject:(id)object 
                        change:(NSDictionary<NSKeyValueChangeKey, id> *)change 
                       context:(void *)context;

// 注册键值监听
- (void)addObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context;
// 移除键值监听
- (void)removeObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath;
```

## NSKeyValueChangeKey

```c++
NSKeyValueChangeIndexesKey
// 如果条目的值为，或，则此键的值是一个对象，其中包含插入，删除或替换的对象的索引。

NSKeyValueChangeKindKey
// NSNumber包含对应于枚举之一的值的对象，指示发生了哪种更改。
NSKeyValueChange

NSKeyValueChangeNewKey
// 如果该条目的值为，并且是在注册观察者时指定的，则此键的值为该属性的新值。

NSKeyValueChangeNotificationIsPriorKey
// 如果在注册观察者时指定了该选项，则会在更改之前发送此通知。

NSKeyValueChangeOldKey
// 如果条目的值是，并且是在注册观察者时指定的，则此键的值是更改属性之前的值。
```

## NSKeyValueObservingOptions

```c++
// 指示更改字典应提供新的属性值（如果适用）。
// change字典包括改变后的值
NSKeyValueObservingOptionNew

// 指示更改字典应包含旧的属性值（如果适用）。
// change字典包括改变前的值
NSKeyValueObservingOptionOld

// 如果指定，则应在观察者注册方法甚至返回之前立即将通知发送给观察者。
// 注册后立刻触发KVO通知
NSKeyValueObservingOptionInitial

// 是否应在每次更改之前和之后将单独的通知发送给观察者，而不是在更改之后将单个通知发送给观察者。
// 值改变前是否也要通知（这个key决定了是否在改变前改变后通知两次）
NSKeyValueObservingOptionPrior
```


# NSNotificationCenter

一个广播站

iOS 程序内部之间的一种消息广播机制，主要为了解决应用程序内部不同对象之间解耦而设计。

```c++
[NSNotificationCenter defaultCenter]

// 注册
- (id<NSObject>)addObserverForName:(NSNotificationName)name 
                            object:(id)obj 
                             queue:(NSOperationQueue *)queue 
                        usingBlock:(void (^)(NSNotification *note))block;
- (void)addObserver:(id)observer 
           selector:(SEL)aSelector 
               name:(NSNotificationName)aName 
             object:(id)anObject;
                        
// 移除
NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
[center removeObserver:self.localeChangeObserver];

// 从通知中心的分发表中删除所有指定给定观察者的条目。
- (void)removeObserver:(id)observer;
- (void)removeObserver:(id)observer 
                  name:(NSNotificationName)aName 
                object:(id)anObject;

// 发布通知名称：对象：用户信息：
- (void)postNotificationName:(NSNotificationName)aName 
      object:(id)anObject 
    userInfo:(NSDictionary *)aUserInfo;
- (void)postNotificationName:(NSNotificationName)aName 
                      object:(id)anObject;
```

# NSNotification

NSNotification 是 NSNotificationCenter 接收到消息之后根据内部的消息转发表，将消息发送给订阅者封装的对象

```c++
@interface NSNotification : NSObject <NSCopying, NSCoding>

//这个成员变量是这个消息对象的唯一标识，用于辨别消息对象
@property (readonly, copy) NSString *name;
// 这个成员变量定义一个对象，可以理解为针对某一个对象的消息，代表通知的发送者
@property (nullable, readonly, retain) id object;
//这个成员变量是一个字典，可以用其来进行传值
@property (nullable, readonly, copy) NSDictionary *userInfo;
// 初始化方法
- (instancetype)initWithName:(NSString *)name object:(nullable id)object userInfo:(nullable NSDictionary *)userInfo NS_AVAILABLE(10_6, 4_0) NS_DESIGNATED_INITIALIZER;
- (nullable instancetype)initWithCoder:(NSCoder *)aDecoder NS_DESIGNATED_INITIALIZER;

@end
```

## 手动移除观察者

```c++
// 观察者需要手动的释放，因为通知中心对它们持有的是强引用
-[NSNotificationCenter addObserverForName:object:queue:usingBlock]
```

# NSNotificationQueue

通知队列，用来管理多个通知的调用。

```c++
// 创建通知队列
- (instancetype)initWithNotificationCenter:(NSNotificationCenter *)notificationCenter NS_DESIGNATED_INITIALIZER;

// 往队列加入通知方法
- (void)enqueueNotification:(NSNotification *)notification postingStyle:(NSPostingStyle)postingStyle;
- (void)enqueueNotification:(NSNotification *)notification postingStyle:(NSPostingStyle)postingStyle coalesceMask:(NSNotificationCoalescing)coalesceMask forModes:(nullable NSArray<NSRunLoopMode> *)modes;

// 移除
- (void)dequeueNotificationsMatching:(NSNotification *)notification coalesceMask:(NSUInteger)coalesceMask;

```

## NSPostingStyle

```c++
typedef NS_ENUM(NSUInteger, NSPostingStyle) {
  // 空闲发送通知，当运行循环处于等待或空闲状态时，发送通知，对于不重要的通知可以使用。
    NSPostWhenIdle = 1,

    // 尽快发送通知，当前运行循环迭代完成时，通知将会被发送，有点类似没有延迟的定时器。
    NSPostASAP = 2,

    // 同步发送通知，如果不使用合并通知和 postNotification: 一样是同步通知。
    NSPostNow = 3  
};
```

## NSNotificationCoalescing 合并通知

```c++
typedef NS_OPTIONS(NSUInteger, NSNotificationCoalescing) {
  // 不合并通知。
    NSNotificationNoCoalescing = 0,
    // 合并相同名称的通知。
    NSNotificationCoalescingOnName = 1,
    // 合并相同通知和同一对象的通知
    NSNotificationCoalescingOnSender = 2
};
```

# 跨进程通知

# NSNotification在多线程

# demo

## once

```c++
NSNotificationCenter * __weak center = [NSNotificationCenter defaultCenter];
id __block token = [center addObserverForName:@"OneTimeNotification"
                                       object:nil
                                        queue:[NSOperationQueue mainQueue]
                                   usingBlock:^(NSNotification *note) {
                                       NSLog(@"Received the notification!");
                                       // 移除
                                       [center removeObserver:token];
                                   }];
```
