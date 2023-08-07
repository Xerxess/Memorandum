# Swift 5.8

## 2023-03-30

* 添加了延迟操作部分，显示错误处理之外的延迟。
* 采用Swift-DocC进行发布。
* 全文进行了少量更正和补充。

```swift
// https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Deferred-Actions
// 块内的代码defer在退出语句主体之前执行if
// defer无论程序如何退出该作用域，内部的代码始终运行。
var score = 1
if score < 10 {
    defer {
        print(score) // 输出：6  defer在退出语句主体之前执行if
    }
    score += 5
}
```

```swift
// defer如果您在同一范围内编写多个块，则您指定的第一个块将是最后一个运行的块。
// 类似堆栈 先进后出
if score < 10 {
    defer {
        print(score) // 最后执行
    }
    defer {
        print("The score is:") 
    }
    score += 5
}
// Prints "The score is:"
// Prints "6"
```
