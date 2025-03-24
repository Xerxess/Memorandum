
# ObservableObject

* 具有发布者的对象类型，该发布者在对象发生变化之前发出消息。
* 默认情况下， ObservableObject会合成一个objectWillChange发布者，该发布者在其任何@Published属性发生变化之前发出改变的值。

```swift
class Contact: ObservableObject {
    @Published var name: String
    @Published var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func haveBirthday() -> Int {
        age += 1
        return age
    }
}


let john = Contact(name: "John Appleseed", age: 24)
cancellable = john.objectWillChange
    .sink { _ in
        print("\(john.age) will change")
}
print(john.haveBirthday())
// Prints "24 will change"
// Prints "25"
```
