# Key-Path Expression 键路径表达式

https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions#Key-Path-Expression

键路径访问值，请将键路径传递给 subscript(keyPath:) 下标，该下标适用于所有类型

```swift
\<#type name#>.<#path#>
```

```swift
struct SomeStructure {
    var someValue: Int
}
let s = SomeStructure(someValue: 12)
let pathToProperty = \SomeStructure.someValue
let value = s[keyPath: pathToProperty]
// value is 12
```

```swift
class SomeClass: NSObject {
    @objc dynamic var someProperty: Int
    init(someProperty: Int) {
        self.someProperty = someProperty
    }
}
let c = SomeClass(someProperty: 10)
c.observe(\.someProperty) { object, change in
    // ...
}
```

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
```

```swift
// 使用可选链接和强制展开
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// Prints "Optional(5)"

// Do the same thing using a key path.
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// Prints "Optional(5)"
```