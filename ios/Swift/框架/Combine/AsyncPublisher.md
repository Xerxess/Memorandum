
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [AsyncPublisher](#asyncpublisher)
- [AsyncThrowingPublisher](#asyncthrowingpublisher)

<!-- /code_chunk_output -->

# AsyncPublisher

AsyncPublisher 是 Swift Combine 框架中的一个类型，它在现代 Swift 并发系统（async/await）和 Combine 的基于发布者的响应式编程模型之间架起了桥梁。这个发布者允许你将使用 Swift 结构化并发的异步代码与 Combine 的响应式流集成在一起。

主要优势和使用场景:

- 桥接 Async/Await 与 Combine：
  - 允许将异步函数无缝集成到发布者链中
  - 帮助在不同编程范式之间逐步迁移
- 错误处理：
  - 正确地将异步代码中抛出的错误传播到发布者链中
  - 与 Combine 的错误处理机制协同工作
- 常见模式：
  - 将异步 API 响应转换为发布者
  - 将基于 Task 的操作包装在响应式流中
  - 通过 Combine 的调度器系统与 UI 更新集成

```swift
// 从异步函数创建 AsyncPublisher
let asyncPublisher = AsyncPublisher {
    try await fetchData(from: url)
}

// 像订阅其他发布者一样订阅它
asyncPublisher
    .receive(on: DispatchQueue.main)
    .sink(
        receiveCompletion: { completion in
            if case .failure(let error) = completion {
                handleError(error)
            }
        },
        receiveValue: { data in
            updateUI(with: data)
        }
    )
    .store(in: &cancellables)
```

# AsyncThrowingPublisher

AsyncThrowingPublisher 是 Swift Combine 框架中的另一个重要类型，专门用于处理可能抛出错误的异步操作。它与 AsyncPublisher 类似，但更专注于处理可能失败的异步任务，并将这些错误正确地传播到 Combine 的发布者链中。

```swift
// 创建一个可能抛出错误的异步发布者
let publisher = AsyncThrowingPublisher {
    try await networkService.fetchData(from: url)
}

// 在 Combine 链中订阅和处理
publisher
    .receive(on: DispatchQueue.main)
    .sink(
        receiveCompletion: { completion in
            if case .failure(let error) = completion {
                print("请求失败：\(error.localizedDescription)")
            }
        },
        receiveValue: { data in
            print("接收到数据：\(data)")
        }
    )
    .store(in: &cancellables)
```
