<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Schedulers](#schedulers)
  - [Schedulers协议提供的方法](#schedulers协议提供的方法)
  - [SchedulerTimeIntervalConvertible 协议](#schedulertimeintervalconvertible-协议)
  - [常用调度器](#常用调度器)
  - [关键调度器操作符](#关键调度器操作符)
  - [示例](#示例)
    - [控制执行上下文(在指定线程)](#控制执行上下文在指定线程)
    - [周期性任务](#周期性任务)
    - [时间相关操作(延迟执行、防抖动、节流)](#时间相关操作延迟执行-防抖动-节流)

<!-- /code_chunk_output -->

# Schedulers

- 简单理解为让代码在指定的线程或调度器中执行

## Schedulers协议提供的方法

```swift
// 在下一个可能的机会执行操作，没有选项。
func schedule(() -> Void)

// 使用调度程序的最小容差，在指定日期之后的某个时间执行操作。
func schedule(after: Self.SchedulerTimeType, () -> Void)

// 在指定日期之后的某个时间、按照指定的频率执行操作，并使用此调度程序可能的最小公差。
func schedule(after: Self.SchedulerTimeType, interval: Self.SchedulerTimeType.Stride, () -> Void) -> any Cancellable

// 在指定日期之后的某个时间以指定的频率执行操作，并尽可能考虑容差。
func schedule(after: Self.SchedulerTimeType, interval: Self.SchedulerTimeType.Stride, tolerance: Self.SchedulerTimeType.Stride, () -> Void) -> any Cancellable

// 在指定日期之后的某个时间以指定的频率执行操作，如果可能的话还可以考虑容差。
func schedule(after: Self.SchedulerTimeType, interval: Self.SchedulerTimeType.Stride, tolerance: Self.SchedulerTimeType.Stride, options: Self.SchedulerOptions?, () -> Void) -> any Cancellable

// 在指定日期之后的某个时间执行操作。
func schedule(after: Self.SchedulerTimeType, tolerance: Self.SchedulerTimeType.Stride, () -> Void)

// 在指定日期之后的某个时间执行操作。
func schedule(after: Self.SchedulerTimeType, tolerance: Self.SchedulerTimeType.Stride, options: Self.SchedulerOptions?, () -> Void)

// 在下一个可能的机会执行操作。
func schedule(options: Self.SchedulerOptions?, () -> Void)
```

## SchedulerTimeIntervalConvertible 协议

- 为调度程序提供相对时间表达式的协议

```swift
// 将指定微秒数转换为此调度程序时间类型的实例。
static func microseconds(Int) -> Self

// 将指定的毫秒数转换为此调度程序时间类型的实例。
static func milliseconds(Int) -> Self

// 将指定的纳秒数转换为此调度程序时间类型的实例。
static func nanoseconds(Int) -> Self

// 将指定的秒数（作为浮点值）转换为此调度程序时间类型的实例。
static func seconds(Double) -> Self

// 将指定的秒数转换为此调度程序时间类型的实例。
static func seconds(Int) -> Self
```

## 常用调度器

在iOS开发中，Combine框架提供了几种常用的调度器(Scheduler)，每种都有其特定的用途和特点。以下是最常用的iOS调度器：

- DispatchQueue
  - 最常用的调度器，基于GCD(Grand Central Dispatch)
  - 包括主队列(DispatchQueue.main)和全局队列(DispatchQueue.global())
  - 适用于大多数异步操作，特别是网络请求和数据处理
- RunLoop
  - 基于Foundation的RunLoop
  - 主要用于UI相关的操作和用户交互
  - 例如:RunLoop.main适合UI更新
- OperationQueue
  - 基于NSOperation系统
  - 提供更高级的任务管理功能，如依赖关系和取消操作
  - 适合复杂任务流程
- ImmediateScheduler
  - 立即同步执行工作
  - 主要用于测试和调试
  - 不涉及线程切换，直接在当前线程执行
- UIScheduler (iOS特有)
  - 异步执行UI更新
  - 总是在主线程上执行，但以异步方式
  - 适合UI更新场景
- Timer.TimerPublisher
  - 虽然不是传统意义上的调度器，但提供了定时执行功能
  - 通过Timer.publish(every:on:in:)创建

## 关键调度器操作符

- subscribe(on:): 指定订阅和取消订阅发生的调度器
- receive(on:): 指定接收值和完成事件的调度器
- delay(for:scheduler:): 延迟传递元素
- debounce(for:scheduler:): 在指定的静默期后发出最新值
- throttle(for:scheduler:latest:): 限制值的发送频率
- timeout(_:scheduler:): 在指定时间后发出错误

## 示例

### 控制执行上下文(在指定线程)

```swift
// 在后台队列处理数据，在主队列更新UI
let backgroundQueue = DispatchQueue(label: "com.example.background")

URLSession.shared.dataTaskPublisher(for: url)
    .map { $0.data }
    .decode(type: [Item].self, decoder: JSONDecoder())
    .subscribe(on: backgroundQueue) // 在后台订阅
    .receive(on: DispatchQueue.main) // 在主线程接收结果
    .sink(
        receiveCompletion: { _ in },
        receiveValue: { [weak self] items in
            self?.updateUI(with: items) // 在主线程更新UI
        }
    )
    .store(in: &cancellables)
```

### 周期性任务

```swift
// 创建一个每秒触发的计时器
let timer = Timer.publish(every: 1, on: .main, in: .common)
    .autoconnect()
    .sink { date in
        print("当前时间: \(date)")
    }

// 使用调度器创建重复任务
let cancellable = DispatchQueue.main.schedule(
    after: .init(.now()),
    interval: .seconds(5),
    tolerance: .seconds(0.5)
) {
    print("每5秒执行一次")
}
```

### 时间相关操作(延迟执行、防抖动、节流)

```swift
// 延迟执行
let publisher = Just("Hello")
    .delay(for: .seconds(2), scheduler: DispatchQueue.main)
    .sink { value in
        print("2秒后收到: \(value)")
    }

// 防抖动 - 处理用户输入
searchField.$text
    .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
    .removeDuplicates()
    .sink { [weak self] searchText in
        self?.performSearch(query: searchText)
    }
    .store(in: &cancellables)

// 节流 - 限制更新频率
motionManager.$accelerometerData
    .throttle(for: .milliseconds(100), scheduler: DispatchQueue.main, latest: true)
    .sink { [weak self] data in
        self?.updateOrientation(with: data)
    }
    .store(in: &cancellables)
```
