
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Attributes](#attributes)
  - [Declaration Attributes 声明属性](#declaration-attributes-声明属性)
    - [attached](#attached)
    - [available](#available)
    - [backDeployed 返回部署](#backdeployed-返回部署)
    - [discardableResult 可丢弃结果](#discardableresult-可丢弃结果)
    - [dynamicCallable 动态可调用](#dynamiccallable-动态可调用)
    - [dynamicMemberLookup 动态成员查找](#dynamicmemberlookup-动态成员查找)
    - [freestanding 独立式](#freestanding-独立式)
    - [frozen 冷冻](#frozen-冷冻)
    - [inlinable 可内联](#inlinable-可内联)
    - [main 主要的](#main-主要的)
    - [nonobjc 非对象](#nonobjc-非对象)
    - [objc](#objc)
    - [NSCopying](#nscopying)
    - [objcMembers](#objcmembers)
    - [preconcurrency 预并发](#preconcurrency-预并发)
    - [propertyWrapper](#propertywrapper)
    - [resultBuilder 结果生成器](#resultbuilder-结果生成器)
    - [testable 可测试](#testable-可测试)
    - [unchecked 未选中](#unchecked-未选中)
    - [warn_unqualified_access 警告不合格访问](#warn_unqualified_access-警告不合格访问)
  - [Type Attributes 类型属性](#type-attributes-类型属性)
    - [autoclosure 自动关闭](#autoclosure-自动关闭)
    - [escaping 逃跑](#escaping-逃跑)
    - [Sendable 可发送](#sendable-可发送)
  - [Switch Case Attributes Switch Case 属性](#switch-case-attributes-switch-case-属性)
    - [unknown 未知](#unknown-未知)

<!-- /code_chunk_output -->

# Attributes

Swift 中有两种类型的属性：

- 一种适用于声明，
- 一种适用于类型

```swift
@<#attribute name#>
@<#attribute name#>(<#attribute arguments#>)
```

## Declaration Attributes 声明属性

### attached

将 attached 属性应用于宏声明。

### available

应用此属性来指示相对于某些 Swift 语言版本或某些平台和操作系统版本的声明的生命周期

available 属性始终与两个或多个逗号分隔的属性参数列表一起出现。这些参数以以下平台或语言名称之一开头：

- iOS
- iOSApplicationExtension
- macOS
- macOSApplicationExtension
- macCatalyst
- macCatalystApplicationExtension
- watchOS
- watchOSApplicationExtension
- tvOS
- tvOSApplicationExtension
- visionOS
- visionOSApplicationExtension
- swift
- - （有平台名称上均可用）

```swift
extension pthread_mutex_t {
  // noasync 参数表示声明的符号不能直接在异步上下文中使用。
  @available(*, noasync)
  mutating func lock() {
      pthread_mutex_lock(&self)
  }
  @available(*, noasync)
  mutating func unlock() {
      pthread_mutex_unlock(&self)
  }
}

@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // class definition
}

@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // struct definition
}
```

### backDeployed 返回部署

```swift
// iOS SDK 从 iOS 17 开始提供了 some Function() 此外，SDK 使用反向部署在 iOS 16 上提供了 some Function() 。
@available(iOS 16, *)
@backDeployed(before: iOS 17)
func someFunction() { /* ... */ }
```

### discardableResult 可丢弃结果

将此属性应用于函数或方法声明，以在调用返回值的函数或方法而不使用其结果时抑制编译器警告。

```swift
@discardableResult
public func superviewSafeArea() -> ConstraintMakerEditable? {
    guard let view = self.item as? ConstraintView,let superview = view.superview else {return nil}
    return edges.equalTo(superview.safeAreaLayoutGuide)
}
```

### dynamicCallable 动态可调用

将此属性应用于类、结构、枚举或协议，以将该类型的实例视为可调用函数。该类型必须实现 dynamicallyCall(withArguments:) 方法、 dynamicallyCall(withKeywordArguments:) 方法或两者

```swift
@dynamicCallable
struct TelephoneExchange {
    func dynamicallyCall(withArguments phoneNumber: [Int]) {
        if phoneNumber == [4, 1, 1] {
            print("Get Swift help on forums.swift.org")
        } else {
            print("Unrecognized number")
        }
    }
}

let dial = TelephoneExchange()
// Use a dynamic method call.
dial(4, 1, 1)
// Prints "Get Swift help on forums.swift.org"
dial(8, 6, 7, 5, 3, 0, 9)
// Prints "Unrecognized number"
// Call the underlying method directly.
dial.dynamicallyCall(withArguments: [4, 1, 1])
```

### dynamicMemberLookup 动态成员查找

将此特性应用于类、结构体、枚举或协议，以便在运行时通过名称查找成员。该类型必须实现 subscript(dynamic Member:) 下标。

```swift
@dynamicMemberLookup
struct DynamicStruct {
    let dictionary = ["someDynamicMember": 325,
                      "someOtherMember": 787]
    subscript(dynamicMember member: String) -> Int {
        return dictionary[member] ?? 1054
    }
}

let s = DynamicStruct()
// 使用动态成员查找
let dynamic = s.someDynamicMember
print(dynamic)
// Prints "325"

// 直接调用底层下标
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// Prints "true"
```

### freestanding 独立式

将 freestanding 属性应用于独立宏的声明。

### frozen 冷冻

将此属性应用于结构体或枚举声明，以限制您可以对类型进行的更改类型。此属性仅在库演进模式下编译时才允许使用。库的未来版本将无法通过添加、移除或重新排序枚举的用例或结构体的存储实例属性来更改声明。这些更改在非冻结类型上是允许的，但它们会破坏冻结类型的 ABI 兼容性。

### inlinable 可内联

将此特性应用于函数、方法、计算属性、下标、便捷初始化器或反初始化器声明，以将该声明的实现公开为模块公共接口的一部分。编译器可以在调用处将对可内联符号的调用替换为该符号实现的副本。

### main 主要的

将此特性应用于结构体、类或枚举声明，以指示它包含程序流的顶级入口点。该类型必须提供一个不接受任何参数并返回 Void main 类型函数。例如：

```swift
@main
struct MyTopLevel {
    static func main() {
        // Top-level code goes here
    }
}
```

### nonobjc 非对象

将此特性应用于方法、属性、下标或构造器声明，以抑制隐 nonobjc objc 特性。nonobjc 特性会告知编译器，即使该声明可以在 Objective-C 代码中表示，它也不会在 Objective-C 代码中可用。

### objc

将此特性应用于任何可以在 Objective-C 中表示的声明 - 例如，非嵌套类、协议、非泛型枚举（限制为整数原始值类型）、类的属性和方法（包括 getter 和 setter）、协议及其可选成员、初始化器和下标。 objc 特性告知编译器该声明可在 Objective-C 代码中使用。

### NSCopying

将此特性应用于类的存储变量属性。此特性使属性的 setter 与属性值的副本 （由 copy With Zone(_:) 方法返回）合成，而不是与属性本身的值合成。属性的类型必须遵循 NSCopying 协议。

### objcMembers

将此特性应用于类声明，以将 objc 特性隐式应用于该类、其扩展、其子类以及其子类的所有扩展的所有 Objective-C 兼容成员。

### preconcurrency 预并发

### propertyWrapper

将此特性应用于类、结构体或枚举声明，即可将该类型用作属性包装器。

### resultBuilder 结果生成器

将此特性应用于类、结构体或枚举，即可将该类型用作结果构建器。 结果构建器是一种逐步构建嵌套数据结构的类型。您可以使用结果构建器实现一种领域特定语言 (DSL)，以自然、声明式的方式创建嵌套数据结构。有关如何使用 result Builder 特性的示例，请参阅结果构建器 。

### testable 可测试

### unchecked 未选中

将此属性应用于协议类型，作为类型声明的采用协议列表的一部分，以关闭该协议要求的执行。

### warn_unqualified_access 警告不合格访问

将此特性应用于顶级函数、实例方法、类或静态方法，当该函数或方法未使用前置限定符（例如模块名称、类型名称、实例变量或常量）时，会触发警告。使用此特性有助于避免在同一作用域内访问的同名函数之间产生歧义。


## Type Attributes 类型属性

只能将类型属性应用于类型

### autoclosure 自动关闭

使用此特性可以通过自动将表达式包装到不带参数的闭包中来延迟表达式的计算。您可以将其应用于函数或方法声明中的参数类型，例如，如果参数的类型是函数类型，并且不接受参数，并且返回表达式类型的值。有关如何使用 autoclosure 特性的示例，请参阅自动闭包和函数类型 。

### escaping 逃跑

将此特性应用于函数或方法声明中的参数类型，以指示该参数的值可以存储以供后续执行。这意味着该值的有效期可以超出调用的生命周期。具有 escaping 类型特性的函数类型参数需要对属性或方法显式使用 self. 。有关如何使用 escaping 特性的示例，请参阅转义闭包 。

### Sendable 可发送

将此属性应用于函数类型，以指示该函数或闭包可发送。将此属性应用于函数类型与使非函数类型遵循 Sendable 协议具有相同的含义。

## Switch Case Attributes Switch Case 属性

### unknown 未知

将此特性应用于 switch case，以指示该 case 预计不会与代码编译时已知的任何枚举 case 匹配。有关如何使用 unknown 特性的示例，请参阅切换未来枚举 case 。