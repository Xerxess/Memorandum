<!-- TOC -->

- [Dispatch](#dispatch)
    - [Operation 和 GCD的比较](#operation-%E5%92%8C-gcd%E7%9A%84%E6%AF%94%E8%BE%83)
    - [一些概念](#%E4%B8%80%E4%BA%9B%E6%A6%82%E5%BF%B5)
    - [DispatchQueue](#dispatchqueue)
    - [DispatchWorkItem](#dispatchworkitem)
    - [DispatchGroup](#dispatchgroup)
    - [死锁](#%E6%AD%BB%E9%94%81)

<!-- /TOC -->

# Dispatch

Dispatch，也称为 Grand Central Dispatch (GCD)，包含语言功能、运行时库和系统增强功能，为 macOS、iOS、watchOS 和 tvOS 中的多核硬件上的并发代码执行支持提供系统、全面的改进。

https://developer.apple.com/documentation/dispatch/dispatchqueue

## Operation 和 GCD的比较

* Operation和OperationQueue 是构建在GCD之上
* Operation和OperationQueue 可以在各种操作之间添加依赖关系并重新使用，取消或暂停它们

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

## DispatchQueue

```swift
class DispatchQueue : DispatchObject
DispatchQueue.main // 与当前进程的主线程关联的调度队列
DispatchQueue.global(qos: DispatchQoS.QoSClass = .default) // 返回具有指定服务质量类的全局系统队列
let queue = DispatchQueue(label: "serial.com") // 返回串行队列（默认）
let queue = DispatchQueue(label: "serial.com", attributes: .concurrent) // 返回并发队列

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
enum DispatchQoS.QoSClass
case userInteractive // 用户交互任务在系统上具有最高优先级。
case userInitiated // 用户发起的动作需要立即得到结果，例如：”正在打开一个保存的文档或执行一个用户点击用户界面的动作。为了用户后续的工作，需要进行这个工作“。重点在于响应性和性能，几乎是在瞬间执行，例如几秒钟或者更少。
case `default` // 默认的服务质量等级。
case utility // 可能需要一些时间才能完成的操作，不是立即需要结果的，例如：”下载或者导入数据。utility 任务一般有一个进度条让用户能看到“。重点是在响应性和性能以及能源效率之间提供一个平衡，可能需要几秒或者几分钟。
case background // 后台操作并且不需要用户看见的工作，例如：”索引，同步操作和备份等“。重点在能源效率，工作要很长的时间，例如多少分钟或多少小时。
case unspecified // 表示当前没有 QoS 信息，系统应该根据环境自动推断 QoS 信息
```

## DispatchWorkItem 

```
init(qos: DispatchQoS, flags: DispatchWorkItemFlags, block: () -> Void)

let workItem = DispatchWorkItem {
    print("DispatchWorkItem")
}

// 执行方式一
workItem.perform() 

// 执行方式二
let queue = DispatchQueue.global(qos: .utility)
queue.async(execute: workItem)

// 执行完成通知
workItem.notify(queue: DispatchQueue.main) {
    print("执行完成")
}
```

## DispatchGroup

```
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
