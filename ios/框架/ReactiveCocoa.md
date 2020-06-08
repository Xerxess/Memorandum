<!-- TOC -->

- [ReactiveCocoa](#reactivecocoa)
- [RACSignal 信号](#racsignal-信号)
- [RACSubject （自定义订阅信号）](#racsubject-自定义订阅信号)
- [RACReplaySubject （缓冲订阅信号）](#racreplaysubject-缓冲订阅信号)
- [RACCommand(命令)](#raccommand命令)
  - [rac_command](#rac_command)
- [RACMulticastConnection](#racmulticastconnection)
- [RACSequence 队列](#racsequence-队列)
  - [rac_sequence](#rac_sequence)
- [RACDisposable](#racdisposable)
- [RACScheduler 调度程序](#racscheduler-调度程序)
- [RAC()和RACObserve()](#rac和racobserve)

<!-- /TOC -->

https://github.com/ReactiveCocoa/ReactiveCocoa
http://reactivecocoa.io/

# ReactiveCocoa

# RACSignal 信号

先订阅，后发送

* 创建信号： + (RACSignal *)createSignal:(RACDisposable * (^)(id\<RACSubscriber> subscriber))didSubscribe;
* 订阅信号：- (RACDisposable *)subscribeNext:(void (^)(id x))nextBlock;
* 发送信号：- (void)sendNext:(id)value;

```c++
//1、创建订阅者
RACSignal * signal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        
    //3、发送信号，发送信号之前一定要先订阅信号
    // [subscriber sendNext:@"1"];

    // 进行异步处理
    // ......
        
    return nil;
}];
    
//2、订阅信号
[signal subscribeNext:^(id  _Nullable x) {
    NSLog(@"--%@", x);
}];
```

# RACSubject （自定义订阅信号）

先订阅，后发送

* 创建信号： + (instancetype)subject;
* 订阅信号：- (RACDisposable *)subscribeNext:(void (^)(id x))nextBlock;
* 发送信号：- (void)sendNext:(id)value;

```c++
//1.创建信号
RACSubject *subject = [RACSubject subject];

//2.订阅信号
[subject subscribeNext:^(id x) {
　　// block调用时刻：当信号发出新值，就会调用.
　　NSLog(@"第一个订阅者%@",x);
}];

[subject subscribeNext:^(id x) {
　　// block调用时刻：当信号发出新值，就会调用.
　　NSLog(@"第二个订阅者%@",x);
}];

//3.发送信号
[subject sendNext:@"1"];
```

# RACReplaySubject （缓冲订阅信号）

可以先订阅信号，也可以先发送信号

* 创建信号： + (instancetype)subject;
* 订阅信号：- (RACDisposable *)subscribeNext:(void (^)(id x))nextBlock;
* 发送信号：- (void)sendNext:(id)value;

```c++
// 1.创建信号
RACReplaySubject *replaySubject = [RACReplaySubject subject];

// 2.发送信号
[replaySubject sendNext:@1];
[replaySubject sendNext:@2];

// 3.订阅信号
[replaySubject subscribeNext:^(id x) {
    
    NSLog(@"第一个订阅者接收到的数据%@",x);
}];

// 订阅信号
[replaySubject subscribeNext:^(id x) {
    
    NSLog(@"第二个订阅者接收到的数据%@",x);
}];
```

# RACCommand(命令)

创建和预订信号以响应一些行动,通常，触发命令的操作是UI驱动的，例如单击按钮时

## rac_command

# RACMulticastConnection

共享

# RACSequence 队列

序列是一种集合，其目的与相似NSArray。

## rac_sequence

# RACDisposable

用于消除和资源清理

# RACScheduler 调度程序

# RAC()和RACObserve()

* RAC(<#TARGET, ...#>)宏用来将一个对象的属性和信号量绑定
* RACObserve(<#TARGET#>, <#KEYPATH#>)宏则用来生成一个对象的绑定属性的信号量