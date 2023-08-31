# Ranges

```swift
static func ..< (minimum: Self, maximum: Self) -> Range<Self>

// 返回一个包含其两个边界的闭合范围。
// 使用闭范围运算符（...）创建符合可比协议的任何类型的闭范围。
static func ... (minimum: Self, maximum: Self) -> ClosedRange<Self>
```

```swift
let lessThanFive = 0.0..<5.0
print(lessThanFive.contains(3.14))  // Prints "true"
print(lessThanFive.contains(5.0))   // Prints "false"

// 此示例从“a”到包括“z”创建一个ClosedRange<Character>。
let lowercase = "a"..."z"
print(lowercase.contains("z"))
// Prints "true"
```

## Range

从下界到但不包括上界的半开放区间。

```swift
@frozen
struct Range<Bound> where Bound : Comparable
```

```swift
let underFive = 0.0..<5.0
underFive.contains(3.14)
// true
underFive.contains(6.28)
// false
underFive.contains(5.0)
// false
```

```swift
for n in 3..<5 {
    print(n)
}
```

### Inspecting a Range 检查范围

```swift
// 一个布尔值，指示范围是否不包含元素。
var isEmpty: Bool { get }

// 范围的下限。
let lowerBound: Bound

// 范围的上限。
let upperBound: Bound
```

### Checking for Containment 检查遏制情况

```swift
// 返回一个布尔值，指示给定元素是否包含在范围内。
func contains(_ element: Bound) -> Bool

// 返回一个布尔值，指示值是否包含在范围中。
static func ~= (pattern: Self, value: Self.Bound) -> Bool
let chosenNumber = 3
if 0..<10 ~= chosenNumber {
    print("\(chosenNumber) is a single digit.")
}
// Prints "3 is a single digit."
```

## ClosedRange

从下界到并包括上界的区间。

```swift
@frozen
struct ClosedRange<Bound> where Bound : Comparable
```

```swift
let throughFive = 0...5
throughFive.contains(3)
// true
throughFive.contains(10)
// false
throughFive.contains(5)
// true
```
