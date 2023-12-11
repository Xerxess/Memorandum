<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Result](#result)
  - [demo1 异步返回的 API 进行建模](#demo1-异步返回的-api-进行建模)
  - [demo2 序列化或记忆结果](#demo2-序列化或记忆结果)

<!-- /code_chunk_output -->

# Result

https://developer.apple.com/documentation/swift/result

表示成功或失败的值，包括每种情况下的关联值

- `编写可能失败的函数、方法或其他 API 时，您可以在声明中使用 throws 关键字来指示 API 调用可能会引发错误。但是，您不能使用 throws 关键字对异步返回的 API 进行建模。相反，使用 Result 枚举来捕获有关异步调用是否成功或失败的信息，并使用 Result.success(_:) 和 Result.failure(_:) 情况的关联值来携带信息关于通话的结果。`
- `解决 do-catch 无法传递异常结果. 有时需要存储操作的整个结果，以便稍后在分析一批调用等任务期间进行处理。`

```swift
@frozen
enum Result<Success, Failure> where Failure : Error
```

## demo1 异步返回的 API 进行建模

```swift
let queue = DispatchQueue(label: "com.example.queue")
enum EntropyError: Error {
    case entropyDepleted
}
struct AsyncRandomGenerator {
    static let entropyLimit = 5
    var count = 0
    mutating func fetchRemoteRandomNumber(
        completion: @escaping (Result<Int, EntropyError>) -> Void
    ) {
        let result: Result<Int, EntropyError>
        if count < AsyncRandomGenerator.entropyLimit {
            // 操作成功
            result = .success(Int.random(in: 1...100))
        } else {
            // 操作失败，未使用throws
            result = .failure(.entropyDepleted)
        }
        count += 1
        queue.asyncAfter(deadline: .now() + 2) {
            completion(result)
        }
    }
}


var generator = AsyncRandomGenerator()
(0..<AsyncRandomGenerator.entropyLimit + 1).forEach { _ in
    generator.fetchRemoteRandomNumber { result in
        switch result {
            case .success(let number):
                print(number)
            case .failure(let error):
                print("Source of randomness failed: \(error)")
            }
    }
}
print("Waiting on some numbers.")

dispatchMain()
/* Prints:
success(29)
success(46)
success(85)
success(39)
success(84)
Source of randomness failed: entropyDepleted
*/
```

## demo2 序列化或记忆结果

```swift
enum EntropyError: Error {
    case entropyDepleted
}
struct UnreliableRandomGenerator {
    func random() throws -> Int {
        if Bool.random() {
            return Int.random(in: 1...100)
        } else {
            // 立即处理抛出异常，无结果
            throw EntropyError.entropyDepleted
        }
    }
}

struct RandomnessMonitor {
    let randomnessSource: UnreliableRandomGenerator
    var results: [Result<Int, Error>] = []
    init(generator: UnreliableRandomGenerator) {
        randomnessSource = generator
    }
    mutating func sample() {
        // 使用 Result 枚举的 init(catching:) 初始值设定项保留抛出表达式的返回值或抛出的错误。在传递给初始化器的闭包内调用抛出表达式：
        let sample = Result { try randomnessSource.random() }
        results.append(sample)
    }
    func summary() -> (Double, Double) {
        let totals = results.reduce((sum: 0, count: 0)) { total, sample in
            switch sample {
            case .success(let number):
                return (total.sum + number, total.count)
            case .failure:
                return (total.sum, total.count + 1)
            }
        }
        return (
            average: Double(totals.sum) / Double(results.count - totals.count),
            failureRate: Double(totals.count) / Double(results.count)
        )
    }
}
```
