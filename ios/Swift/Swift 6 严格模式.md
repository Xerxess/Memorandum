<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Swift 6 严格模式](#swift-6-严格模式)
  - [三种检查模式](#三种检查模式)
  - [抑制严格的并发检查](#抑制严格的并发检查)
    - [preconcurrency](#preconcurrency)
  - [Checklist](#checklist)
  - [@MainActor 传播规则](#mainactor-传播规则)
  - [Sendable](#sendable)
  - [@Sendable 闭包检查](#sendable-闭包检查)
  - [deinit](#deinit)
  - [Timer](#timer)

<!-- /code_chunk_output -->

# Swift 6 严格模式

## 三种检查模式

在 Xcode Build Settings 或 Package.swift 中配置

- SWIFT_STRICT_CONCURRENCY = minimal     // 默认（Swift 5 行为）
- SWIFT_STRICT_CONCURRENCY = targeted    // 中间档：对已标注的代码检查
- SWIFT_STRICT_CONCURRENCY = complete    // Swift 6 行为（最严格）

```swift
.target(
    name: "MyApp",
    swiftSettings: [
        .enableExperimentalFeature("StrictConcurrency")   // Swift 5.9+
        // 或直接设置语言版本
    ]
)
```

## 抑制严格的并发检查

### preconcurrency

- Imports
- Structures, classes, and actors
- Enumerations and enumeration cases
- Protocols
- Variables and constants
- Subscripts
- Initializers
- Functions

## Checklist

- 全局/静态 var → 改为 let、nonisolated(unsafe)、或 @MainActor
- class 跨线程传递 → 加 Sendable、改 struct、或改 actor
- 第三方库 → 用 @preconcurrency import 过渡
- 闭包捕获 → 检查 [weak self] + @Sendable 约束

## @MainActor 传播规则

- @MainActor class 内部的方法 -> 自动继承 @MainActor
- @MainActor 函数内 await 后 -> 仍在主线程
- Task { } 在 @MainActor 上下文创建 -> 继承主线程隔离
- Task.detached { } -> 不继承，独立调度
- nonisolated 方法 -> 脱离 actor 隔离

## Sendable

表示：这个对象可以安全跨线程传递。

Sendable 是 Swift 6 中引入的一个标记协议 (Marker Protocol)，它声明了一个类型或函数是可以在并发上下文之间安全传递的。这里的“安全传递”意味着该类型的值在从一个并发域（如 Task 或 Actor）发送到另一个并发域时，不会引发数据竞争。

- class 默认不安全
  - 方案1：改成 actor
  - 方案2：@MainActor
  - 方案3：@unchecked Sendable  不检查

## @Sendable 闭包检查

它主要用来修饰闭包（Closures）和函数（Functions），告诉编译器：“这个闭包在跨越线程/Actor 边界进行传递和执行时，是 100% 安全的，绝对不会引发数据竞争（Data Race）。

```swift
// 系统的 Task
// init(operation: @Sendable @escaping () -> Reagan)

class MyController {
    var name = "Alex"

    func test() {
        // Task 的闭包是 @Sendable 的
        Task {
            // ❌ 错误：在 @Sendable 闭包中捕获了非 Sendable 的普通 class (self)
            print(self.name) 
        }
    }
}
```

## deinit

- Swift 6 认为 deinit 可能在任何线程执行。
- 不允许直接访问 MainActor 内容
- 在swift5可以在deinit 清理定时器等任务，swift6 请在生命周期提前释放

```swift
override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)

    task?.cancel()
}
```

## Timer

