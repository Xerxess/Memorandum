<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Publisher](#publisher)
  - [Publisher 的核心结构](#publisher-的核心结构)
  - [内置 Publisher](#内置-publisher)
  - [自定义 Publisher](#自定义-publisher)
    - [通过现有的 Publisher 进行封装或逻辑组合（推荐，简单且安全）](#通过现有的-publisher-进行封装或逻辑组合推荐简单且安全)
    - [底层遵循 Publisher 协议并手动实现 Subscription（底层，复杂但控制力最强）](#底层遵循-publisher-协议并手动实现-subscription底层复杂但控制力最强)

<!-- /code_chunk_output -->

# Publisher

<https://developer.apple.com/documentation/combine/publisher>

```swift
protocol Publisher<Output, Failure>
```

- 在 Swift 的 Combine 框架中，Publisher（发布者） 是数据的源头。
- 核心任务是：随着时间的推移，向一个或多个订阅者（Subscriber）发送一系列的值。
- Publisher向一个或多个 Subscriber 实例提供元素。
- Subscriber的 Input 和 Failure 关联类型必须与Publisher声明的 Output 和 Failure 类型相匹配。
- Publisher实现 receive(subscriber:) 方法来接收 Subscriber

## Publisher 的核心结构

- 关联类型
  - Output：发布者发出的数据类型（例如 Int, String 等）。
  - Failure：发布者可能产生的错误类型。如果该发布者保证永远不会出错，则使用 Never。
- 信号
  - 值 (Value)：传递实际的数据（可以发送 0 次、1 次或多次）。
  - 完成 (Completion)：成功的终结信号，表示不再有数据发送。
  - 错误 (Failure)：因出错而产生的终结信号。

## 内置 Publisher

- Just：最简单的发布者。它只发送一个值，然后立即结束（例如：Just("Hello")）。
- Future：用于处理异步操作，最终会产生一个值或一个错误（常用于网络请求）。
- Sequence：将一个集合（如 [1, 2, 3]）转换为一个个发出的事件流。
- PassthroughSubject：一种特殊的发布者，你可以手动调用它的 send() 方法来广播数据。
- @Published：一个属性包装器，当属性值改变时，它会自动发布新值（在 SwiftUI 中极其常用）。

## 自定义 Publisher

### 通过现有的 Publisher 进行封装或逻辑组合（推荐，简单且安全）

### 底层遵循 Publisher 协议并手动实现 Subscription（底层，复杂但控制力最强）

- 两个部分
  - Publisher：定义“水龙头”，说明谁能接水。
  - Subscription：定义“水管”，负责处理具体的逻辑（如添加监听器、管理背压/需求量）。
