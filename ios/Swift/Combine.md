# Combine

https://developer.apple.com/documentation/combine

通过组合事件处理运算符来自定义异步事件的处理。

Combine 框架提供了一个声明性的 Swift API，用于随着时间的推移处理值。 这些值可以表示多种异步事件。 Combine 声明发布者公开可以随时间变化的值，订阅者从发布者那里接收这些值。

Combine 框架为您的应用程序如何处理事件提供了一种声明性方法。 您可以为给定的事件源创建单个处理链，而不是潜在地实现多个委托回调或完成处理程序闭包。 链的每个部分都是一个组合运算符，它对从上一步接收到的元素执行不同的操作。

## Publisher

Publisher:当其被订阅之后，根据请求会提供数据， 没有任何订阅请求的发布者不会提供任何数据。 当你描述一个 Combine 的发布者时，应该用两种相关的类型来描述它：一种用于输出，一种用于失败。

- Just
- Future
- Deferred
- Empty
- Sequence
- Fail
- Record
- Share
- Multicast
- @ObservableObject
- @Published

Foundation

- URLSession.dataTaskPublisher
- .publisher on KVO instance
- NotificationCenter
- Timer
- Result

### Subjects

Subjects 是一种遵循 Subject 协议的特殊的发布者。 这个协议要求 subjects 有一个 .send(\_:) 方法，来允许开发者发送特定的值给订阅者或管道。
Combine 中有两种内建的 subject : CurrentValueSubject 和 PassthroughSubject。

它们的行为类似，但不同的是 CurrentValueSubject 需要一个初始值并记住它当前的值，PassthroughSubject 则不会。 当调用 .send() 时，两者都将向它们的订阅者提供更新的值。

在给遵循 ObservableObject 协议的对象创建发布者时，CurrentValueSubject 和 PassthroughSubject 也很有用。 SwiftUI 中的多个声明式组件都遵循这个协议。

## Subscriber

Subscriber:订阅者负责请求数据并接受发布者提供的数据（和可能的失败）。 订阅者同样被描述为两种关联类型，一种用于输入，一种用于失败。 订阅者发起数据请求，并控制它接收的数据量。 它可以被认为是在 Combine 中起“驱动作用”的，因为如果没有订阅者，其他组件将保持闲置状态，没有数据会流动起来。

Combine 中有两个内建的订阅者： Assign 和 Sink。

SwiftUI 中有一个订阅者： onReceive。 onReceive 函数接受一个类似于 sink 接受的闭包，可以操纵 SwiftUI 中的 @State 或 @Bindings。

## 操作符

操作符是同时实现了 订阅者协议 和 发布者协议 的类。 它们支持订阅发布者，并将结果发送给任何订阅者。

操作符是 Apple 参考文档中发布者下包含的一些预构建函数的便捷名称。

- Mapping elements
  - scan
  - tryScan
  - setFailureType
  - map
  - tryMap
  - flatMap
- Filtering elements
  - compactMap
  - tryCompactMap
  - replaceEmpty
  - filter
  - tryFilter
  - replaceError
  - removeDuplicates
  - tryRemoveDuplicates
- Reducing elements
  - collect
  - reduce
  - tryReduce
  - ignoreOutput

* Mathematic operations on elements
  - max
  - tryMax
  - count
  - min
  - tryMin
* Applying matching criteria to elements
  - allSatisfy
  - tryAllSatisfy
  - contains
  - containsWhere
  - tryContainsWhere
  - Applying sequence operations to elements
  - firstWhere
  - tryFirstWhere
  - first
  - lastWhere
  - tryLastWhere
  - last
  - dropWhile
  - tryDropWhile
  - dropUntilOutput
  - prepend
  - drop
  - prefixUntilOutput
  - prefixWhile
  - tryPrefixWhile
  - output

- Combining elements from multiple publishers
  - combineLatest
  - merge
  - zip
- Handling errors
  - catch
  - tryCatch
  - assertNoFailure
  - retry
  - mapError
- Adapting publisher types
  - switchToLatest
  - eraseToAnyPublisher
- Controlling timing
  - debounce
  - delay
  - measureInterval
  - throttle
  - timeout
- Encoding and decoding
  - encode
  - decode
- Working with multiple subscribers
  - multicast
- Debugging
  *breakpoint
  *handleEvents
  \*print
