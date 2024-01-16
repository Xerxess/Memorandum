# OptionSet

使用 OptionSet 协议来表示位集类型，其中各个位代表集合的成员。

* 通过使用 OptionSet，您可以轻松地定义和操作多个可选项，并在需要时对它们进行组合、查询和修改。这种方式非常适合处理具有多个开关、配置或标志的场景。

```swift
struct ShippingOptions: OptionSet {
    let rawValue: Int // 创建选项集时，请在类型声明中包含 rawValue 属性
    
    static let nextDay    = ShippingOptions(rawValue: 1 << 0)
    static let secondDay  = ShippingOptions(rawValue: 1 << 1)
    static let priority   = ShippingOptions(rawValue: 1 << 2)
    static let standard   = ShippingOptions(rawValue: 1 << 3)

    static let express: ShippingOptions = [.nextDay, .secondDay]
    static let all: ShippingOptions = [.express, .priority, .standard]
}

let singleOption: ShippingOptions = .priority
let multipleOptions: ShippingOptions = [.nextDay, .secondDay, .priority]
let noOptions: ShippingOptions = []

// 使用
let purchasePrice = 87.55
var freeOptions: ShippingOptions = []
if purchasePrice > 50 {
    freeOptions.insert(.priority)
}
if freeOptions.contains(.priority) {
    print("You've earned free priority shipping!")
} else {
    print("Add more to your cart for free priority shipping!")
}
// Prints "You've earned free priority shipping!"
```

## OptionSet 事项

> OptionSet 可组合

```swift
struct ShippingOptions: OptionSet {
    let rawValue: Int // 创建选项集时，请在类型声明中包含 rawValue 属性
    
    static let nextDay    = ShippingOptions(rawValue: 1 << 0)
    static let secondDay  = ShippingOptions(rawValue: 1 << 1)
    static let priority   = ShippingOptions(rawValue: 1 << 2)
    static let standard   = ShippingOptions(rawValue: 1 << 3)
}

let singleOption: ShippingOptions = .priority
let multipleOptions: ShippingOptions = [.nextDay, .secondDay, .priority]
let singleOptionRawValue = singleOption.rawValue
let multipleOptionsRawValue = multipleOptions.rawValue
```
