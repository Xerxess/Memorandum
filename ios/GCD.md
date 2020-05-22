<!-- TOC -->

- [GCD](#gcd)
- [线程的开辟与阻塞机制](#线程的开辟与阻塞机制)
- [Dispatch Queue](#dispatch-queue)
  - [Serial Dispatch Queue（串行队列）](#serial-dispatch-queue串行队列)
  - [Concurrent Dispatch Queue（并发队列）](#concurrent-dispatch-queue并发队列)
- [dispatch_queue_create](#dispatch_queue_create)
- [dispatch_get_main_queue/dispatch_get_global_queue](#dispatch_get_main_queuedispatch_get_global_queue)
  - [dispatch_get_main_queue](#dispatch_get_main_queue)
  - [dispatch_queue_create](#dispatch_queue_create-1)
  - [demo](#demo)
- [dispatch_sync 同步](#dispatch_sync-同步)
  - [同步函数+串行队列](#同步函数串行队列)
  - [同步函数+主队列](#同步函数主队列)
  - [demo](#demo-1)
- [dispatch_async 非同步](#dispatch_async-非同步)
  - [异步函数+并发队列](#异步函数并发队列)
  - [异步函数+串行队列](#异步函数串行队列)
  - [异步函数+主队列](#异步函数主队列)
- [死锁](#死锁)
  - [GCD线程死锁产生的具体原因](#gcd线程死锁产生的具体原因)
  - [总结](#总结)
- [dispatch_after（延迟执行）](#dispatch_after延迟执行)
- [dispatch_apply（重复执行）](#dispatch_apply重复执行)
- [dispatch_once](#dispatch_once)
- [dispatch_source_t GCD定时器](#dispatch_source_t-gcd定时器)
- [NSOperation](#nsoperation)

<!-- /TOC -->

https://developer.apple.com/documentation/dispatch?language=objc

# GCD

# 线程的开辟与阻塞机制

> 并行：多个任务并发（同时）执行  
串行：一个任务执行完毕后，再执行下一个任务

> 同步：在当前线程中执行任务，不具备开启新线程的能力  
异步：在新的线程中执行任务，具备开启新线程的能力

> 并行队列+异步任务 = 多条新线程  
自定义串行多列+异步任务 = 一条新线程



# Dispatch Queue

## Serial Dispatch Queue（串行队列）

等待现在执行中处理结束

## Concurrent Dispatch Queue（并发队列）

不等待现在执行中处理结束

# dispatch_queue_create

| 参数                      | 描述             |
| ------------------------- | ---------------- |
| DISPATCH_QUEUE_SERIAL     | 用来创建串行队列 |
| DISPATCH_QUEUE_CONCURRENT | 用来创建并发队列 |

```c++
dispatch_queue_t mySerialDispatchQueue = dispatch_queue_create("com.example.MySerialDispatchQueue", DISPATCH_QUEUE_SERIAL);
```

# dispatch_get_main_queue/dispatch_get_global_queue

第二种方法是获取系统标准提供的Dispatch Queue。

## dispatch_get_main_queue

正如其名称中含有的“Main”一样，是在主线程中执行的Dispatch Queue。因为主线程只有1个，所以Main Dispatch Queue 自然就是串行队列

追加到Main Dispatch Qucue的处理在主线程的RunLoop中执行。由于在主线程中执行，因此要将用户界面的界面更新等一些必须在主线程中执行的处理追加到Main Dispatch Queue使用。这正好与NSObject类的performSelectorOnMainThread实例方法这一执行方法相同。

## dispatch_queue_create

Global Dispatch Queue 是所有应用程序都能够使用的（并发队列）。


## demo

```c++
/*
 * Main Dispatch Queue 的获取方法
 */
dispatch_queue_t mainDispatchQueue = dispatch_get_main_queue();

/*
 * Global Dispatch Queue （高优先级）的获取方法
 */
dispatch_queue_t globalDispatchQueueHigh = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0);

/*
 * Global Dispatch Queue （默认优先级）的获取方法
 */
dispatch_queue_t globalDispatchQueueDefault = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

/*
 * Global Dispatch Queue （低优先级）的获取方法
 */
dispatch_queue_t globalDispatchQueueLow = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0);

/*
 * Global Dispatch Queue （后台优先级）的获取方法
 */
dispatch_queue_t globalDispatchQueueBackground = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0);


```

# dispatch_sync 同步

会阻塞线程

## 同步函数+串行队列

* 没有开启新线程
* 串行执行任务

## 同步函数+主队列

* 死锁

## demo

```c++
 dispatch_queue_t queue = dispatch_queue_create("com.example.sync_concurrent", DISPATCH_QUEUE_CONCURRENT);
dispatch_sync(queue, ^{
        NSLog(@"任务1 当前线程：%@",[NSThread currentThread]);
    });
```

# dispatch_async 非同步

## 异步函数+并发队列

* 有开启新线程
* 并发执行任务

## 异步函数+串行队列

* 有开启新线程
* 串行执行任务

## 异步函数+主队列

* 没有开启新线程
* 串行执行任务

```c++
dispatch_async(queue, blk0);
```

# 死锁

* 互斥条件：进程对所分配到的资源不允许其他进程进行访问，若其他进程访问该资源，只能等待，直至占有该资源的进程使用完成后释放该资源
* 请求和保持条件：进程获得一定的资源之后，又对其他资源发出请求，但是该资源可能被其他进程占有，此时请求阻塞，但又对自己获得的资源保持不放
* 不可剥夺条件：是指进程已获得的资源，在未完成使用之前，不可被剥夺，只能在使用完后自己释放
* 环路等待条件：是指进程发生死锁后，必然存在一个进程--资源之间的环形链

## GCD线程死锁产生的具体原因

在一个串行队列的任务中，再向这个队列同步添加任务。

```c++
- (void)viewDidLoad {
    [super viewDidLoad];
    [self sync_mainQueue];
}

- (void)sync_mainQueue {
    dispatch_sync(dispatch_get_main_queue(), ^{
        NSLog(@"任务1 当前线程：%@",[NSThread currentThread]);
    });
}
```


```c++
- (void)interview01
{
    // 以下代码是在主线程执行的
    NSLog(@"执行任务1");
    
    dispatch_queue_t queue = dispatch_get_main_queue();
    dispatch_sync(queue, ^{
        NSLog(@"执行任务2");
    });
    
    NSLog(@"执行任务3");
    
}

// 执行任务3 -> 执行任务2 -> 执行任务3 -> 执行任务2
```


## 总结

dispatch_sync()函数会阻塞线程。当前队列是串行队列，任务必须顺序执行。在串行队列的任务A中给这个队列添加同步任务B，相当于说这个串行队列又多了一个任务B，任务B如果想要执行必须等待任务A执行完，但是任务B是同步任务，必须等任务B执行完才能执行其它任务，所以任务AB互相等待，造成死锁。

# dispatch_after（延迟执行）

dispatch_after函数并不是在指定时间后执行处理，而只是在指定时间后追加处理到Dispatch Queue。

```c++
dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    NSLog(@"wait at least three seconds.");
});
/*
* 或者使用下面这种方式
*/

dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 3ull * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
    NSLog(@"wait at least three seconds.");
});
```

# dispatch_apply（重复执行）

* dispatch_apply函数的执行会阻塞线程，所以在循环10次结束后才会打印done

* dispatch_apply函数执行任务时开启了新线程，有主线程参与也有其它线程参与，属于多线程执行

* 因为指定的队列是Global Dispatch Queue并发队列，所以dispatch_apply并发执行了任务。若把Global Dispatch Queue换成Main Queue随即成为死锁并报错。由此可见，dispatch_apply函数添加任务到队列与dispatch_sync函数原理相仿，即同步添加任务，这就解释了前两点阻塞线程和多线程执行。

```c++
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

dispatch_apply(10, queue, ^(size_t index) {
    NSLog(@"%zu\t当前线程：%@",index,[NSThread currentThread]);
});

NSLog(@"done");
```

# dispatch_once

dispatch_once函数是保证在应用程序执行中只执行一次指定处理的API。

# dispatch_source_t GCD定时器 

不同于基于Runloop的NSTimer。dispatch_source_t不会因为子线程没有正在运行的Runloop而失效、循环引用、计时不准(每次runloop循环才会检查定时器是否需要被执行)等问题。
```c++
@interface ViewController ()

@property (nonatomic, strong) dispatch_source_t timer;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // 创建定时器,(dispatch_source_t本质是OC对象)
    self.timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());

    // 设置定时器的实践参数，时间参数一般是纳秒（1秒 == 10的9次方纳秒）为单位
    // 何时开始
    dispatch_time_t start = dispatch_time(DISPATCH_TIME_NOW, (ino64_t)(1.0 * NSEC_PER_SEC));
    // 时间间隔
    uint64_t interval = (uint64_t)(2.0 * NSEC_PER_SEC);
    // 设置参数
    dispatch_source_set_timer(self.timer, start, interval, 0);

    // 设置回调，即设置需要定时器定时执行的操作
    dispatch_source_set_event_handler(self.timer, ^{

        NSLog(@"------");

    });

    // 启动定时器
    dispatch_resume(self.timer);

}

//暂停
-(void) pauseTimer{  
    if(_timer){  
        dispatch_suspend(_timer);  
    }  
}  
//恢复
-(void) resumeTimer{  
    if(_timer){  
        dispatch_resume(_timer);  
    }  
}  
//销毁
-(void) stopTimer{  
    if(_timer){  
        dispatch_source_cancel(_timer);  
        _timer = nil;  
    }  
}  

@end
```

# NSOperation

NSOpertaionQueue用GCD构建封装的，是GCD的高级抽象!
