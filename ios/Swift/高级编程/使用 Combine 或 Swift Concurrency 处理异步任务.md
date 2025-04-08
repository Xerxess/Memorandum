<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [使用 Combine 或 Swift Concurrency 处理异步任务](#使用-combine-或-swift-concurrency-处理异步任务)

<!-- /code_chunk_output -->

# 使用 Combine 或 Swift Concurrency 处理异步任务

- Swift 提供了强大的工具（如 Combine 和 async/await）来简化异步任务的处理。
  - 使用 async/await 替代回调地狱：让异步代码更加直观。
  - Combine 的流式处理：使用 Combine 处理事件流和异步任务。

```swift
func fetchUserData() async throws -> String {
    // 模拟异步网络请求
    try await Task.sleep(nanoseconds: 1_000_000_000) // 延迟 1 秒
    return "User data"
}

Task {
    do {
        let data = try await fetchUserData()
        print(data) // 输出: User data
    } catch {
        print("Error: \(error)")
    }
}
```

```swift
import Combine

let publisher1 = Just(1).delay(for: .seconds(1), scheduler: RunLoop.main)
let publisher2 = Just(2).delay(for: .seconds(2), scheduler: RunLoop.main)

let cancellable = publisher1
    .merge(with: publisher2)
    .map { $0 * 10 }
    .sink(receiveCompletion: { print("Completed: \($0)") },
          receiveValue: { print("Value: \($0)") })
```

```swift
func fetchNumbers() async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for i in 1...3 {
            group.addTask {
                try await Task.sleep(nanoseconds: UInt64(i) * 1_000_000_000)
                return i
            }
        }
        
        var results = [Int]()
        for await result in group {
            results.append(result)
        }
        return results
    }
}

Task {
    let numbers = await fetchNumbers()
    print(numbers) // 输出: [1, 2, 3]
}
```