<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Subscription](#subscription)

<!-- /code_chunk_output -->


# Subscription

表示订阅者与发布者之间连接的协议。

https://developer.apple.com/documentation/combine/subscription


```swift
protocol Subscription : Cancellable, CustomCombineIdentifierConvertible
```

它是整个 Combine 响应式设计的“脊梁”，负责处理最核心的两件事：需求管理（背压控制）和生命周期（取消订阅）。

```swift
public protocol Subscription: Cancellable, CustomCombineIdentifierConvertible {
    // 1. 订阅者通过它告诉发布者：我还要多少数据
    func request(_ demand: Subscribers.Demand)
    
    // 2. 取消订阅（从 Cancellable 继承而来）
    func cancel()
}
```