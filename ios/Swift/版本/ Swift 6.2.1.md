# Swift 6.2.1

## 2025-11-03

## 添加了“Integer Generic Parameters 整数通用参数”部分，其中包含有关具有数值的通用参数的信息

整数通用参数充当整数值的占位符，而不是类型。它有以下形式：

```swift
let <#type parameter#>: <#type>
```

```swift
struct SomeStruct<let x: Int> { }
let a: SomeStruct<2>  // OK: integer literal


struct AnotherStruct<let x: Int, T, each U> {
    let b: SomeStruct<x>  // OK: another integer generic parameter


    static let c = 42
    let d: SomeStruct<c>  // Error: Can't use a constant. 错误：不能使用常量。


    let e: SomeStruct<T>  // Error: Can't use a generic type parameter. 错误：无法使用通用类型参数。
    let f: SomeStruct<U>  // Error: Can't use a parameter pack. 错误：无法使用参数包。
}

// 类型上的整型泛型参数的值可以作为该类型的静态常量成员访问，其可见性与类型本身相同。函数上的整型泛型参数的值可以在函数内部作为常量访问。在表达式中使用时，这些常量的类型为 Int 。
print(a.x)  // Prints "4"
```

## 在整数和浮点数部分添加了有关在整数和浮点数之间进行选择的信息
