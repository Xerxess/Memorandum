<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [KeyPath 增强代码的灵活性](#keypath-增强代码的灵活性)

<!-- /code_chunk_output -->

# KeyPath 增强代码的灵活性

- KeyPath 是 Swift 的一种强大的工具，可以用来访问对象的属性或动态操作数据。
  - 动态访问属性：通过  KeyPath 访问属性，减少硬编码。
  - 高阶函数中的 KeyPath 支持：许多高阶函数（如 map）支持直接传递 KeyPath。

```swift
struct User {
    let name: String
    let age: Int
}

let users = [
    User(name: "Alice", age: 30),
    User(name: "Bob", age: 25),
    User(name: "Charlie", age: 35)
]

// 使用 KeyPath 提取属性
let names = users.map(\.name)
print(names) // 输出: ["Alice", "Bob", "Charlie"]
```