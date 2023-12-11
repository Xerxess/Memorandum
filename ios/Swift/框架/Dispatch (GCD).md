<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Dispatch](#dispatch)
  - [Operation 和 GCD的比较](#operation-和-gcd的比较)
  - [一些概念](#一些概念)
  - [主线程](#主线程)
  - [DispatchQueue.global()](#dispatchqueueglobal)
  - [同步(Synchronous)](#同步synchronous)
  - [异步(Asynchronous)](#异步asynchronous)
  - [DispatchQueue](#dispatchqueue)
  - [DispatchWorkItem](#dispatchworkitem)
  - [DispatchGroup](#dispatchgroup)
  - [死锁](#死锁)
  - [代码事例](#代码事例)
    - [串行队列+同步任务](#串行队列同步任务)
    - [串行队列+异步任务](#串行队列异步任务)
    - [并行队列+同步任务](#并行队列同步任务)
    - [并行队列+异步任务](#并行队列异步任务)
    - [死锁](#死锁-1)
    - [并行队列 sync { sync](#并行队列-sync--sync)

<!-- /code_chunk_output -->

# Dispatch

Dispatch，也称为 Grand Central Dispatch (GCD)，包含语言功能、运行时库和系统增强功能，为 macOS、iOS、watchOS 和 tvOS 中的多核硬件上的并发代码执行支持提供系统、全面的改进。

<https://developer.apple.com/documentation/dispatch/dispatchqueue>

## Operation 和 GCD的比较

- Operation和OperationQueue 是构建在GCD之上
- Operation和OperationQueue 可以在各种操作之间添加依赖关系并重新使用，取消或暂停它们

## 一些概念

- 并行：多个任务并发（同时）执行
- 串行：一个任务执行完毕后，再执行下一个任务

- 同步：在当前线程中执行任务，不具备开启新线程的能力 (阻塞线程)
- 异步：在新的线程中执行任务，具备开启新线程的能力

- 并行队列+异步任务 = 多条新线程
- 自定义串行多列+异步任务 = 一条新线程

- DispatchQueue.main：是一个串行队列
- DispatchQueue.global(\_:) 全局并发队列

- 串行队列+同步任务 死锁
- 并发队列不会出现死锁

## 主线程

Main queue 一个`串行队列`,所有的UI刷新都发生在`主线程`

```swift
DispatchQueue.main.async {
    // UI刷新代码在这里   
    customView.backgroundColor = UIColor.blue
}
```

## DispatchQueue.global()

Global queue是一种系统内共享的`并行队列`

```swift
DispatchQueue.global().async {
    print("global async start \(Thread.current)")
}
```

## 同步(Synchronous)

同步运行的任务, 不开启新的线程, 会阻塞当前线程, 等任务完成才返回

## 异步(Asynchronous)

异步运行的任务, 会开启新的线程, 不会阻塞当前线程, 分发任务后立即返回,不用等任务完成.

## DispatchQueue

```swift
class DispatchQueue : DispatchObject
DispatchQueue.main // 与当前进程的主线程关联的调度队列
DispatchQueue.global(qos: DispatchQoS.QoSClass = .default) // 返回具有指定服务质量类的全局系统队列
let queue = DispatchQueue(label: "demo") // 返回串行队列（默认）
let queue = DispatchQueue(label: "demo", attributes: .concurrent) // 返回并发队列

// 异步执行任务
func async(execute: DispatchWorkItem)
func async(group: DispatchGroup?, qos: DispatchQoS, flags: DispatchWorkItemFlags, execute: () -> Void)
func asyncAfter(deadline: DispatchTime, qos: DispatchQoS, flags: DispatchWorkItemFlags, execute: () -> Void)

// 同步执行任务
func sync(execute: DispatchWorkItem)
func sync(execute: () -> Void)

```

```swift
// 系统使用这些意图来确定在给定可用资源的情况下执行任务的最佳方式。例如，系统会为包含用户交互任务的线程赋予更高的优先级，以确保这些任务能够快速执行。相反，它为后台任务赋予较低的优先级，并可能试图通过在更节能的 CPU 内核上执行它们来节省电力。系统根据系统条件和您安排的任务来动态确定如何执行您的任务。
// 优先级：userInteractive > userInitiated > default > utility > background > unspecified
// case userInteractive 用户交互任务在系统上具有最高优先级。
// case userInitiated 用户发起的动作需要立即得到结果，例如：”正在打开一个保存的文档或执行一个用户点击用户界面的动作。为了用户后续的工作，需要进行这个工作“。重点在于响应性和性能，几乎是在瞬间执行，例如几秒钟或者更少。
// case `default` 默认的服务质量等级。
// case utility 可能需要一些时间才能完成的操作，不是立即需要结果的，例如：”下载或者导入数据。utility 任务一般有一个进度条让用户能看到“。重点是在响应性和性能以及能源效率之间提供一个平衡，可能需要几秒或者几分钟。
// case background 后台操作并且不需要用户看见的工作，例如：”索引，同步操作和备份等“。重点在能源效率，工作要很长的时间，例如多少分钟或多少小时。
// case unspecified 表示当前没有 QoS 信息，系统应该根据环境自动推断 QoS 信息
enum DispatchQoS.QoSClass
```

## DispatchWorkItem

```swift
init(qos: DispatchQoS, flags: DispatchWorkItemFlags, block: () -> Void)

let workItem = DispatchWorkItem {
    print("DispatchWorkItem")
}

// 执行方式一: 同步执行
workItem.perform() 

// 执行方式二: 队列中执行
let queue = DispatchQueue.global(qos: .utility)
queue.async(execute: workItem)

// 执行方式三 执行完成通知
workItem.notify(queue: DispatchQueue.main) {
    print("执行完成")
}
```

## DispatchGroup

```swift
let queue = DispatchQueue(label: "com.flion.dispatchgroup", attributes: .concurrent)
let group = DispatchGroup()

queue.async(group: group) {
    print("doing")
}

queue.async(group: group) {
    print("doing more")
}

group.notify(queue: Dispatch.main) {
    print("done")
}
```

## 死锁

串行队列+同步任务

```
串行队列 {
    同步任务A{
        同步任务B{

        }
    }
}
A等待B,B又等待A 死锁
```

并发队列+同步任务 (不会死锁)

```
并发队列 {
    同步任务A{
        同步任务B{

        }
    }
}
并发队列可以同时执行多个任务 A执行完毕->B执行完毕
```

## 代码事例

### 串行队列+同步任务

- 未启新线程
- 串行执行任务

```swift
import PlaygroundSupport
import Dispatch
import Foundation
PlaygroundPage.current.needsIndefiniteExecution = true
let queue = DispatchQueue(label: "demo")
print("1: \(Thread.current)")
queue.sync { print("2: \(Thread.current)") }
print("3: \(Thread.current)")
queue.sync { print("4: \(Thread.current)") }
print("5: \(Thread.current)")

// 打印结果 未启新线程，串行执行任务
// 1: <_NSMainThread: 0x7f946d907b50>{number = 1, name = main}
// 2: <_NSMainThread: 0x7f946d907b50>{number = 1, name = main}
// 3: <_NSMainThread: 0x7f946d907b50>{number = 1, name = main}
// 4: <_NSMainThread: 0x7f946d907b50>{number = 1, name = main}
// 5: <_NSMainThread: 0x7f946d907b50>{number = 1, name = main}
```

### 串行队列+异步任务

- 开启新线程，只开启一个新线程
- 串行执行任务

```swift
import PlaygroundSupport
import Dispatch
import Foundation
PlaygroundPage.current.needsIndefiniteExecution = true

let queue = DispatchQueue(label: "demo")
print("1: \(Thread.current)")
queue.async {
    Thread.sleep(forTimeInterval: 1)
    print("2: \(Thread.current)") 
}
print("3: \(Thread.current)")
queue.async { print("4: \(Thread.current)") }
print("5: \(Thread.current)")

// 打印结果 开启新线程，串行执行任务 开启一个新线程：0x7fe4aca45fb0
// 135 的执行顺序不变，24的执行顺序不变
// 1: <_NSMainThread: 0x7fe4ac806e70>{number = 1, name = main}
// 3: <_NSMainThread: 0x7fe4ac806e70>{number = 1, name = main}
// 5: <_NSMainThread: 0x7fe4ac806e70>{number = 1, name = main}
// 2: <NSThread: 0x7fe4aca45fb0>{number = 6, name = (null)}
// 4: <NSThread: 0x7fe4aca45fb0>{number = 6, name = (null)}
```

### 并行队列+同步任务

- 并发队列执行同步任务和在主线程执行操作并没有区别，因为 sync 会牢牢的将当前线程固定住，让线程等待它执行完成后才能继续执行其他操作。
- 不具备开启新线程

```swift
import PlaygroundSupport
import Dispatch
import Foundation
PlaygroundPage.current.needsIndefiniteExecution = true

let queue = DispatchQueue(label: "demo",attributes: .concurrent)
print("1: \(Thread.current)")
queue.sync { print("2: \(Thread.current)") }
print("3: \(Thread.current)")
queue.sync { print("4: \(Thread.current)") }
print("5: \(Thread.current)")

// 打印结果
// 1: <_NSMainThread: 0x7ff113206210>{number = 1, name = main}
// 2: <_NSMainThread: 0x7ff113206210>{number = 1, name = main}
// 3: <_NSMainThread: 0x7ff113206210>{number = 1, name = main}
// 4: <_NSMainThread: 0x7ff113206210>{number = 1, name = main}
// 5: <_NSMainThread: 0x7ff113206210>{number = 1, name = main}
```

### 并行队列+异步任务

- 具备开启新线程
- 并行执行任务

```swift
let queue = DispatchQueue(label: "demo",attributes: .concurrent)
print("1: \(Thread.current)")
queue.async {
    Thread.sleep(forTimeInterval: 1)
    print("2: \(Thread.current)") 
}
print("3: \(Thread.current)")
queue.async { print("4: \(Thread.current)") }
print("5: \(Thread.current)")

// 开启新线程:0x7f798cf05500 和 0x7f798c906fd0
// 1: <_NSMainThread: 0x7f798c906fd0>{number = 1, name = main}
// 3: <_NSMainThread: 0x7f798c906fd0>{number = 1, name = main}
// 4: <NSThread: 0x7f798c86e740>{number = 7, name = (null)}
// 5: <_NSMainThread: 0x7f798c906fd0>{number = 1, name = main}
// 2: <NSThread: 0x7f798cf05500>{number = 2, name = (null)}
```

### 死锁

- 串行列表 sync { sync {} } 即死锁
- 串行列表 async { sync {} } 即死锁
- 主线程调用 DispatchQueue.main.sync {} 即死锁

```swift
// 串行列表
let queue = DispatchQueue(label: "demo")
queue.sync {
    print("1")
    queue.sync { print("2") } // 死锁
    print("3")
}
// Prints "1"

queue.async {
    print("1")
    queue.sync { print("2") } // 死锁
    print("3")
}
```

### 并行队列 sync { sync {} }

- 并发队列可以同时执行多个任务。内部的 sync 已经不用等待外部 sync 执行完成
- 并行队列不会产生死锁

```swift
import PlaygroundSupport
import Dispatch
import Foundation
PlaygroundPage.current.needsIndefiniteExecution = true

let queue = DispatchQueue(label: "demo", attributes: .concurrent)
//queue.sync {
//    print("1: \(Thread.current)")
//    queue.sync { print("2: \(Thread.current)") } 
//    print("3: \(Thread.current)")
//}

// 由于是同步任务，等待内部 sync 执行完成后，外部的 sync 继续执行。
queue.sync {
    print("sync-start")
    // 不会产生死锁：不用等待外部的 sync 
    queue.sync {
        (0..<5).forEach {
            print("task \($0): \(Thread.current)")
            Thread.sleep(forTimeInterval: 0.5)
        }
    }
    print("sync-end")
}
```
