<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [便利Publisher](#便利publisher)
  - [Future 完成或失败的发布者](#future-完成或失败的发布者)
  - [Just 发出一次输出，然后完成](#just-发出一次输出然后完成)
  - [Deferred 延迟底层发布者的创建](#deferred-延迟底层发布者的创建)
  - [Empty 不发出任何值](#empty-不发出任何值)
  - [Fail 立即发出错误信号并完成](#fail-立即发出错误信号并完成)
  - [Record](#record)

<!-- /code_chunk_output -->

# 便利Publisher

## Future 完成或失败的发布者

- 产生单一值然后完成或失败的发布者
- 类型web前端的 promise用法
- 对于想要在异步任务完成后执行某些操作的情况，Swift 中的async - await语法也可以完全取代 Future 的使用。

```swift
func generateAsyncRandomNumberFromFuture() -> Future <Int, Never> {
    return Future() { promise in
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let number = Int.random(in: 1...10)
            promise(Result.success(number))
        }
    }
}

cancellable = generateAsyncRandomNumberFromFuture()
    .sink { number in print("Got random number \(number).") }

Task {
    let number = await generateAsyncRandomNumberFromFuture().value
    print("Got random number \(number).")
}
```

> Swift 中的async - await语法也可以完全取代 Future 的使用

```swift
func generateAsyncRandomNumberFromContinuation() async -> Int {
    return await withCheckedContinuation { continuation in
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let number = Int.random(in: 1...10)
            continuation.resume(returning: number)
        }
    }
}

Task {
    let asyncRandom = await generateAsyncRandomNumberFromContinuation()
}
```

## Just 发出一次输出，然后完成

- 发布者只向每个订阅者发出一次输出，然后完成。
- 永不失败（不会发送failure completion）
- 适合用于测试或提供默认/初始值

```swift
let just = Just("Hello, Combine!")

// 使用sink订阅
let cancellable = just.sink(
    receiveCompletion: { completion in
        print("Completed: \(completion)")
    },
    receiveValue: { value in
        print("Received value: \(value)")
    }
)
// 输出:
// Received value: Hello, Combine!
// Completed: finished
```

## Deferred 延迟底层发布者的创建

- 在运行提供的闭包为新订阅者创建发布者之前，等待订阅的发布者
- 延迟底层发布者的创建，直到有订阅者订阅时
- 每个新的订阅者都会触发底层发布者的重新创建
- 适合需要为每个订阅者提供独立数据流的场景

使用场景:

- 网络请求：确保每个订阅者都触发新的网络请求
- 随机数生成：每次订阅时生成新的随机值
- 计时器：为每个订阅者创建独立的计时器
- 惰性加载：延迟资源密集型操作，直到实际需要时才执行

> 基本用法

```swift
let deferred = Deferred {
    print("创建底层发布者")
    return Just(Date())
}

print("第一次订阅")
let subscription1 = deferred.sink { date in
    print("订阅者1收到: \(date)")
}

print("第二次订阅")
let subscription2 = deferred.sink { date in
    print("订阅者2收到: \(date)")
}

// 输出:
// 第一次订阅
// 创建底层发布者
// 订阅者1收到: 2025-03-19 10:47:48 +0000
// 第二次订阅
// 创建底层发布者
// 订阅者2收到: 2025-03-19 10:47:49 +0000
```

> 网络请求场景

```swift
func fetchUserData(for userId: String) -> AnyPublisher<UserData, Error> {
    return Deferred {
        // 每次订阅时都创建新的网络请求
        return URLSession.shared.dataTaskPublisher(for: URL(string: "https://api.example.com/users/\(userId)")!)
            .map { $0.data }
            .decode(type: UserData.self, decoder: JSONDecoder())
            .eraseToAnyPublisher()
    }
    .eraseToAnyPublisher()
}

// 使用示例
let publisher = fetchUserData(for: "123")

// 每次订阅时都会发起新的网络请求
let subscription1 = publisher.sink(receiveCompletion: { _ in }, receiveValue: { _ in })
let subscription2 = publisher.sink(receiveCompletion: { _ in }, receiveValue: { _ in })
```

## Empty 不发出任何值

- 从不发布任何值的发布者，并且可以选择立即完成。
- 不发出任何值
- 可以立即完成，也可以永不完成（取决于构造时的参数）
- 永不失败（除非显式指定失败类型和错误）

使用场景:

- 表示空数据：当某个条件下不需要发出任何值时
- 过滤掉错误：在错误处理中替换为空数据源
- 测试场景：创建不发出任何值的测试数据源
- 条件性数据流：在某些条件下跳过数据发送

> 语法与用法

```swift
// 创建一个会立即完成的Empty发布者
let immediatelyFinishingEmpty = Empty<Int, Never>(completeImmediately: true)

// 创建一个永不完成的Empty发布者
let neverFinishingEmpty = Empty<String, Error>(completeImmediately: false)
```

> 条件性返回空数据

```swift
func getPublisher(includeData: Bool) -> AnyPublisher<String, Never> {
    if includeData {
        return Just("有数据").eraseToAnyPublisher()
    } else {
        return Empty<String, Never>(completeImmediately: true).eraseToAnyPublisher()
    }
}

// 使用示例
let publisher1 = getPublisher(includeData: true)
let publisher2 = getPublisher(includeData: false)
```

## Fail 立即发出错误信号并完成

- 不发出任何值
- 立即发出错误信号并完成
- 需要明确指定错误类型
- 可以用来替代其他发布者，表示特定条件下的错误情况

使用场景:

- 表示错误条件：当某个条件不满足时返回错误
- 网络请求错误处理：在网络请求中处理特定的错误情况
- 测试场景：创建始终失败的测试数据源
- 条件性数据流：在某些条件下将数据流转换为错误流

> 条件性返回错误

```swift
func getPublisher(shouldSucceed: Bool) -> AnyPublisher<String, MyError> {
    if shouldSucceed {
        return Just("成功数据")
            .setFailureType(to: MyError.self)
            .eraseToAnyPublisher()
    } else {
        return Fail<String, MyError>(error: .dataNotFound)
            .eraseToAnyPublisher()
    }
}

// 使用示例
let publisher1 = getPublisher(shouldSucceed: true)
let publisher2 = getPublisher(shouldSucceed: false)
```

## Record

- 发布者允许记录一系列输入和完成，以便稍后向每个订阅者播放

使用场景:

- 单元测试：创建可预测的数据流用于测试
- 模拟数据源：在开发过程中替代实际的数据源
- 演示与原型：快速创建数据流用于演示
- 错误处理测试：测试应用对错误的处理能力
