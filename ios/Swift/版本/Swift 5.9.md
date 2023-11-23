# Swift 5.9

## 2023-06-05

* 在控制流章节和条件表达式部分添加了有关 if 和 switch 表达式的信息。
* 添加了`宏`章节，其中包含有关在编译时生成代码的信息。
* 扩展了《基础知识》中关于可选项的讨论。
* 为 Swift 之旅添加了并发示例。
* 在不透明和盒装类型章节中添加了有关盒装协议类型的信息。
* 使用有关 buildPartialBlock(first:) 和 buildPartialBlock(accumulated:next:) 方法的信息更新了结果构建方法部分。
* 在可用和条件编译块的平台列表中添加了 visionOS。
* 格式化正式语法，使用空行进行分组。


## if 表达式

```swift
// 旧原始代码
let temperatureInCelsius = 25
let weatherAdvice: String

if temperatureInCelsius <= 0 {
    weatherAdvice = "It's very cold. Consider wearing a scarf."
} else if temperatureInCelsius >= 30 {
    weatherAdvice = "It's really warm. Don't forget to wear sunscreen."
} else {
    weatherAdvice = "It's not that cold. Wear a T-shirt."
}

print(weatherAdvice)
// Prints "It's not that cold. Wear a T-shirt."
```

```swift
// if 表达式 与 上面代码比较
let weatherAdvice = if temperatureInCelsius <= 0 {
    "It's very cold. Consider wearing a scarf."
} else if temperatureInCelsius >= 30 {
    "It's really warm. Don't forget to wear sunscreen."
} else {
    "It's not that cold. Wear a T-shirt."
}


print(weatherAdvice)
// Prints "It's not that cold. Wear a T-shirt."
```

```swift
// if 表达式的所有分支都需要包含相同类型的值。
// 因为 Swift 会单独检查每个分支的类型，所以像 nil 这样可以与多种类型一起使用的值会阻止 Swift 自动确定 if 表达式的类型。相反，您需要显式指定类型 - 例如：
let freezeWarning: String? = if temperatureInCelsius <= 0 {
    "It's below freezing. Watch for ice!"
} else {
    nil
}

// 另一个写法
let freezeWarning = if temperatureInCelsius <= 0 {
    "It's below freezing. Watch for ice!"
} else {
    nil as String?
}
```

```swift
// if 表达式可以通过抛出错误或调用诸如 fatalError(_:file:line:) 这样永不返回的函数来响应意外失败。例如：
let weatherAdvice = if temperatureInCelsius > 100 {
    throw TemperatureError.boiling
} else {
    "It's a reasonable temperature."
}
```

## switch表达式

```swift
// 原代码
let someCharacter: Character = "z"
switch someCharacter {
case "a":
    print("The first letter of the Latin alphabet")
case "z":
    print("The last letter of the Latin alphabet")
default:
    print("Some other character")
}
// Prints "The last letter of the Latin alphabet"
```

```swift
// switch表达式  与 上面代码比较
let anotherCharacter: Character = "a"
let message = switch anotherCharacter {
case "a":
    "The first letter of the Latin alphabet"
case "z":
    "The last letter of the Latin alphabet"
default:
    "Some other character"
}
```

## 引用 宏 编码

https://docs.swift.org/swift-book/documentation/the-swift-programming-language/macros/