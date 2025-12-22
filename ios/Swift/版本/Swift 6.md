# Swift 6

- 2024-09-23 （随 Xcode 16）
- 需要支持 iOS 17 或更早版本，必须继续使用 Swift 5.x（如 Swift 5.10）进行编译
- 最低 iOS 版本：iOS 18.0 首个 Swift 6 正式版

平台 Swift 6 最低系统版本 对应的 Xcode 版本
iOS iOS 18.0 Xcode 16.0+
iPadOS iPadOS 18.0 Xcode 16.0+
macOS macOS 15.0 (Sequoia) Xcode 16.0+
watchOS watchOS 11.0 Xcode 16.0+
tvOS tvOS 18.0 Xcode 16.0+
VisionOS visionOS 2.0 Xcode 16.0+

## 添加了preconcurrency部分，其中包含有关迁移到严格的并发检查的信息

<https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes/#preconcurrency>

preconcurrency 是 Swift 6 为了在 Strict Concurrency Checking（严格并发检查）下提供渐进式迁移手段而引入的编译时属性。它可以让编译器暂时放宽对某个声明（类型、函数、闭包甚至整个模块）的并发安全要求，等你逐步把代码改造为真正的 Sendable / Actor‑isolated 代码时再移除。

preconcurrency 不改变运行时行为，它只是一种编译期指令

将此属性应用于声明，以抑制严格的并发检查。您可以将此属性应用于以下类型的声明：

- Imports
- Structures, classes, and actors
- Enumerations and enumeration cases
- Protocols
- Variables and constants
- Subscripts
- Initializers
- Functions

```swift
@preconcurrency import <Module>

@preconcurrency class Foo {}

@preconcurrency func bar() {}

let f: @preconcurrency (Int) -> Void = { ... }

@preconcurrency var x: Int

struct S: @preconcurrency Codable {}
```

### 启用 Strict Concurrency 与 preconcurrency 的配合

- 打开项目 → Build Settings → Swift Compiler → Upcoming Features
- 将 Strict Concurrency Checking 设置为 Yes（或 Enable）。

## 添加了“Specifying the Error Type  指定错误类型”部分，其中包含有关抛出特定类型错误的信息

从 Swift 6 开始，你可以写成 throws(ErrorType)，让编译器明确知道某个函数只能抛出哪一种错误类型。
这样得到的编译时安全保障与 Result<T, E> 完全相同，并且让错误处理更明确、文档化程度更高、重构时更安全。

- Swift 5.x（未指定错误类型）
  - func foo() throws -> Int 只能知道会有错误抛出，但不知道是哪种错误。
  - 需要自己写 catch let error as Error（或 catch { … }），并进行类型转换。
  - 若想得到 Result 那样的类型安全，需要手动包装 throws 调用。
- Swift 6（指定错误类型）
  - func foo() throws(MyError) -> Int 编译器能精准知道只会抛出 MyError 类型的错误。
  - 可以直接 catch .mySpecificCase { … }，编译器会进行穷举检查。
  - “指定错误类型”天生提供同样的安全，无需额外包装。

```swift
// Error 必须是 具体类型（如 enum、struct），且遵循 Error 协议。
// 错误类型是函数类型的一部分，所以不能仅靠 throws 条款来重载函数。
// throws 同样可以被 throws(Error) 表示该函数转发与传入闭包相同的错误类型。

// 1️⃣ 定义错误类型
enum NetworkError: Error {
    case timeout                     // 超时
    case notFound(URL)               // 找不到资源
    case serverError(status: Int, message: String) // 服务器错误
}

// 2️⃣ 只抛出 NetworkError 的函数
func fetchData(from url: URL) throws(NetworkError) -> Data {
    // 模拟网络请求
    let success = Bool.random()
    guard success else {
        // 抛出具体错误
        throw .timeout
    }
    return Data("mock response".utf8)
}

do {
    let data = try fetchData(from: URL(string: "https://example.com")!)
    print("获得数据: \(data)")
} catch .timeout {
    print("⏳ 请求超时")
} catch let .serverError(status, message) {
    print("⚠️ 服务器返回 \(status): \(message)")
} catch let .notFound(url) {
    print("🔎 未找到资源: \(url)")
} catch {
    // 此分支只有在以后把 fetchData 改为抛出 **其他** 错误类型时才可抵达
    print("未知错误: \(error)")
}
```

## 更新了“Macro-Expansion Expression 宏扩展表达式”部分，现在任何宏都可以用作参数的默认值

<https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Macro-Expansion-Expression>

Swift 从 5.9 开始引入 宏系统，在 Swift 6 中又对宏表达式做了进一步完善——任何宏都可以作为形参的默认值。

宏展开表达式（Macro‑Expansion Expression）是宏系统里**产生“表达式”**的宏（相较于产生声明、类型或模式）。它以 # 开头，紧随宏名和参数，形成一个完整的表达式，返回值必须满足 Swift 语言的类型系统要求。

```swift
// 语法
#<macroName>(<arg1>, <arg2>, ...)
// 也可以带标签
#colorLiteral(red: 0.5, green: 0.2, blue: 0.8, alpha: 1.0)
#stringify(x + y)               // 内置宏，返回 (x + y, "x + y")
```

### 常见内置宏（表达式宏）

# warning("text") 产生 编译警告，但不中断编译。 标记即将废弃的 API、日志提示。
# error("text") 产生 编译错误，阻止构建。 强制用户在特定平台使用不同的实现。
# available(iOS 16, macOS 12, *) 返回 Bool，用于在表达式中判断平台/版本。 动态选择实现（如在 guard 里写 guard #available(iOS 16,*) else { … }）。
# stringify(expr) 把 expr 包装成 (expr, "expr") 元组，便于 调试/日志。 打印值和对应源代码字符串。
# colorLiteral(red:g:b:a:) 直接返回 UIColor / NSColor 实例。 UIKit/AppKit 中在代码里写颜色Literal。
# font(resource:size:) 生成 UIFont/NSFont 实例。
# assert(condition) 编译期 断言，条件不满足时会产生 错误（仅在 Debug 构建中有效）。
# sourceLocation(file:line:) 临时修改 错误定位信息。

## 在“访问控制”章节中添加了有关软件包级访问的信息
