<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Optionals 可选值](#optionals-可选值)
- [Optional Chaining 可选链](#optional-chaining-可选链)

<!-- /code_chunk_output -->

# Optionals 可选值

可选值代表两种可能性：要么存在指定类型的值，并且您可以解开可选值以访问该值，要么根本不存在值。

```swift
// 定义
var serverResponseCode: Int? = 404
serverResponseCode = nil

// 定义可选变量而不提供默认值，则该变量将自动设置为 nil
var surveyAnswer: String?
```

```swift
// 可选绑定
if let <#constantName#> = <#someOptional#> {
   <#statements#>
}

if let actualNumber = Int(possibleNumber) {
} else {
}

let myNumber = Int(possibleNumber)
if let myNumber = myNumber {
    print("My number is \(myNumber)")
}

// 相对上面更短的拼写来解包可选值，仅写入要解包的常量或变量的名称
if let myNumber {
    print("My number is \(myNumber)")
}

// if 语句中包含任意数量的可选绑定和布尔条件，并用逗号分隔。
if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
    print("\(firstNumber) < \(secondNumber) < 100")
}
```

```swift
// 使用 nil-coalescing 运算符 ( ?? ) 提供默认值
// a != nil ? a! : b 简写 a ?? b
let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil
var colorNameToUse = userDefinedColorName ?? defaultColorName
```

```swift
// 强制解开可选值
// 强制解包 nil 值会触发运行时错误
// ! 实际上是 fatalError(_:file:line:) 的较短拼写
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)
let number = convertedNumber!

// 等效 let number = convertedNumber!
guard let number = convertedNumber else {
    fatalError("The number was invalid")
}
```

```swift
// 隐式展开的可选类型
// Swift 中隐式解包选项的主要用途是在类初始化期间，如无主引用和隐式解包可选属性
let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString // Unwrapped automatically
```

# Optional Chaining 可选链

```swift
// 放置?来隐式展开其值
let roomCount = john.residence?.numberOfRooms

// 放置!来强制展开其值，如果为nil则会触发运行时错误
let roomCount = john.residence!.numberOfRooms
```

```swift
// if 中的用法
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
```

- `通过可选链调用时返回值始终是可选类型`

```swift
if john.residence?.printNumberOfRooms() != nil {
    print("It was possible to print the number of rooms.")
} else {
    print("It was not possible to print the number of rooms.")
}
```

- `任何通过可选链设置属性的尝试都会返回 Void? 类型的值`

```swift
if (john.residence?.address = someAddress) != nil {
    print("It was possible to set the address.")
} else {
    print("It was not possible to set the address.")
}
```

```swift
// 可选值的下标检索和设置值，并检查该下标调用是否成功
if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
} else {
    print("Unable to retrieve the first room name.")
}
```

- `检索的类型不是可选的，则由于可选链接，它将变成可选的`。
- `检索的类型已经是可选的，则它不会因为链接而变得更加可选`

```swift
// 多个级别的可选链接链接
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// Prints "Unable to retrieve the address."
```

- `可选链后该方法调用的最终返回类型也是可选的`

```swift
// 可选链后该方法调用的最终返回类型也是 String?
if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
    print("John's building identifier is \(buildingIdentifier).")
}
// Prints "John's building identifier is The Larches."
```
