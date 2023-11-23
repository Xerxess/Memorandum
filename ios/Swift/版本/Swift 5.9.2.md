# # Swift 5.9.2

* 在参数修饰符部分添加了有关 borrowing 和 consuming 修饰符的信息。

<https://docs.swift.org/swift-book/documentation/the-swift-programming-language/declarations/#Borrowing-and-Consuming-Parameters>

`borrowing` 修饰符表示该函数不保留参数的值。在这种情况下，调用者维护对象的所有权以及对象生命周期的责任。当函数仅暂时使用对象时，使用 borrowing 可以最大限度地减少开销。

```swift
// `isLessThan` does not keep either argument
func isLessThan(lhs: borrowing A, rhs: borrowing A) -> Bool {
    ...
}
```

`consuming` 参数修饰符指示函数取得该值的所有权，并接受在函数返回之前存储或销毁该值的责任。

```swift
// `store` keeps its argument, so mark it `consuming`
func store(a: consuming A) {
    someGlobalVariable = a
}
```

与 inout 不同，调用函数时 borrowing 和 consuming 参数都不需要任何特殊符号

```swift
func someFunction(a: borrowing A, b: consuming B) { ... }
someFunction(a: someA, b: someB)
```

* 在声明常量和变量中添加了有关在声明后设置常量值的信息。

<https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Declaring-Constants-and-Variables>

* 添加了 backDeployed 部分，其中包含有关向后部署的信息。

<https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes/#backDeployed>

```swift
// iOS SDK 从 iOS 17 开始提供 someFunction() 。此外，SDK 通过反向部署使 someFunction() 在 iOS 16 上可用。
@available(iOS 16, *)
@backDeployed(before: iOS 17)
func someFunction() { /* ... */ }
```
