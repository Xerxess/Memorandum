<!-- TOC -->

- [Updated for Swift 5.7](#updated-for-swift-57)
    - [【并发】 Sendable Types 可发送类型](#%E5%B9%B6%E5%8F%91-sendable-types-%E5%8F%AF%E5%8F%91%E9%80%81%E7%B1%BB%E5%9E%8B)
    - [定义正则表达式](#%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
    - [if-let 缩写形式](#if-let-%E7%BC%A9%E5%86%99%E5%BD%A2%E5%BC%8F)
    - [\#unavailable](#%5Cunavailable)

<!-- /TOC -->

# Updated for Swift 5.7

- 添加了 Sendable Types 部分，其中包含有关在参与者和任务之间发送数据的信息，并将有关 @Sendable 和 @unchecked 属性的信息添加到 Sendable 和 unchecked 部分。
- 添加了正则表达式文字部分，其中包含有关创建正则表达式的信息。
- 在可选绑定部分添加了有关 if-let 缩写形式的信息。
- 在检查 API 可用性部分添加了有关 #unavailable 的信息。

## 【并发】 Sendable Types (可发送类型)

https://docs.swift.org/swift-book/LanguageGuide/Concurrency.html#ID649

任务和参与者让您可以将程序分成可以安全地同时运行的部分。在任务或参与者实例内部，包含可变状态（如变量和属性）的程序部分称为并发域。

可以从一个并发域共享到另一个并发域的类型称为可发送类型。

例如，它可以在调用参与者方法时作为参数传递，也可以作为任务的结果返回。

三种方式发送类型:

- 该类型是值类型，其可变状态由其他可发送数据组成——例如，具有可发送的存储属性的结构或具有可发送的关联值的枚举。
- 该类型没有任何可变状态，其不可变状态由其他可发送数据组成——例如，只有只读属性的结构或类。
- 该类型具有确保其可变状态安全的代码，例如标记@MainActor 的类或序列化对其在特定线程或队列上的属性的访问的类。
- 某些类型始终是可发送的，例如仅具有`可发送属性的结构`和`仅具有可发送关联值的枚举`。

```swift
struct TemperatureReading: Sendable {
    var measurement: Int
}

extension TemperatureLogger {
    func addReading(from reading: TemperatureReading) {
        measurements.append(reading.measurement)
    }
}

let logger = TemperatureLogger(label: "Tea kettle", measurement: 85)
let reading = TemperatureReading(measurement: 45)
await logger.addReading(from: reading)
```

## 定义正则表达式

https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID650

- 正则表达式文字不得以未转义的制表符或空格开头，并且不能包含未转义的斜杠 ( /)、回车或换行。

```swift
let reg = /regular expression/

// 由扩展分隔符分隔的正则表达式文字具有以下形式：
// 使用扩展分隔符的正则表达式文字可以以未转义的空格或制表符开头，包含未转义的斜杠 ( /)，并跨越多行。
// 对于多行正则表达式文字，开始分隔符必须在行尾，而结束分隔符必须在自己的行上。
// 在多行正则表达式文字中，默认启用扩展的正则表达式语法 - 具体来说，忽略空格并允许注释。
// 制作一个空的正则表达式文字，则必须使用扩展分隔符语法
let reg = #/regular expression/#

let reg= #/
            regular expression
         /#
```

## if-let 缩写形式

```swift
let myNumber = Int(possibleNumber)
// Here, myNumber is an optional integer
if let myNumber = myNumber {
    // Here, myNumber is a non-optional integer
    print("My number is \(myNumber)")
}
// Prints "My number is 123"

// 简写为以下
if let myNumber {
    print("My number is \(myNumber)")
}
// Prints "My number is 123"
```

## \#unavailable

除了#available 之外，Swift 还支持使用不可用条件的相反检查。例如，以下两个检查做同样的事情：

```swift
if #available(iOS 10, *) {

} else {
    // Fallback code
}

if #unavailable(iOS 10) {
    // Fallback code
}
```
