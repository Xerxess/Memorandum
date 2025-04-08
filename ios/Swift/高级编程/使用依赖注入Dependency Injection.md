<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [使用依赖注入（Dependency Injection）](#使用依赖注入dependency-injection)

<!-- /code_chunk_output -->

# 使用依赖注入（Dependency Injection）

- 依赖注入可以提高代码的模块化和可测试性。通过将依赖传递给对象，而不是直接在对象内部创建依赖，可以使代码更灵活。
  - 构造函数注入：通过构造函数传递依赖。
  - 协议注入：使用协议约定依赖，方便替换实现。

```swift
protocol Logger {
    func log(_ message: String)
}

struct ConsoleLogger: Logger {
    func log(_ message: String) {
        print("LOG: \(message)")
    }
}

struct Service {
    let logger: Logger

    func performAction() {
        logger.log("Action performed.")
    }
}

let service = Service(logger: ConsoleLogger())
service.performAction() // 输出: LOG: Action performed.
```
