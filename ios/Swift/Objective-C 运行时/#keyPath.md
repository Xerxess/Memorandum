# 使用关键路径动态访问 Objective-C 属性

<https://developer.apple.com/documentation/swift/using-objective-c-runtime-features-in-swift#Use-Key-Paths-to-Dynamically-Access-Objective-C-Properties>

https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Key-Path-String-Expression

key-path 表达式允许您访问用于引用 Objective-C 中的属性的字符串，以用于键值编码和键值观察 API

```
#keyPath(<#property name#>)
```

```swift
class Person: NSObject {
    @objc var name: String
    @objc var friends: [Person] = []
    @objc var bestFriend: Person? = nil
    init(name: String) {
        self.name = name
    }
}

let gabrielle = Person(name: "Gabrielle")
let jim = Person(name: "Jim")
let yuanyuan = Person(name: "Yuanyuan")
gabrielle.friends = [jim, yuanyuan]
gabrielle.bestFriend = yuanyuan

#keyPath(Person.name)
// "name"
gabrielle.value(forKey: #keyPath(Person.name))
// "Gabrielle"
#keyPath(Person.bestFriend.name)
// "bestFriend.name"
gabrielle.value(forKeyPath: #keyPath(Person.bestFriend.name))
// "Yuanyuan"
#keyPath(Person.friends.name)
// "friends.name"
gabrielle.value(forKeyPath: #keyPath(Person.friends.name))
// ["Yuanyuan", "Jim"]
```
