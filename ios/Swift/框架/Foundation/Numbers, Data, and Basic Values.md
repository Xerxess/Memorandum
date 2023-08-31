<!-- TOC -->

- [Numbers, Data, and Basic Values](#numbers-data-and-basic-values)
    - [Int](#int)
        - [Topics](#topics)
            - [Creating a Random Integer 创建随机整数](#creating-a-random-integer-%E5%88%9B%E5%BB%BA%E9%9A%8F%E6%9C%BA%E6%95%B4%E6%95%B0)
            - [Performing Calculations 执行计算](#performing-calculations-%E6%89%A7%E8%A1%8C%E8%AE%A1%E7%AE%97)
            - [Finding the Sign and Magnitude 找到符号和大小](#finding-the-sign-and-magnitude-%E6%89%BE%E5%88%B0%E7%AC%A6%E5%8F%B7%E5%92%8C%E5%A4%A7%E5%B0%8F)
    - [Double](#double)
        - [Creating a Random Value 创建随机值](#creating-a-random-value-%E5%88%9B%E5%BB%BA%E9%9A%8F%E6%9C%BA%E5%80%BC)
    - [Decimal](#decimal)
    - [NumberFormatter](#numberformatter)
        - [Configuring Formatter Behavior and Style](#configuring-formatter-behavior-and-style)
        - [Converting Between Numbers and Strings 在数字和字符串之间转换](#converting-between-numbers-and-strings-%E5%9C%A8%E6%95%B0%E5%AD%97%E5%92%8C%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B9%8B%E9%97%B4%E8%BD%AC%E6%8D%A2)
        - [Configuring Rounding Behavior 配置四舍五入行为](#configuring-rounding-behavior-%E9%85%8D%E7%BD%AE%E5%9B%9B%E8%88%8D%E4%BA%94%E5%85%A5%E8%A1%8C%E4%B8%BA)
        - [Configuring Integer and Fraction Digits 配置整数和分数数字](#configuring-integer-and-fraction-digits-%E9%85%8D%E7%BD%AE%E6%95%B4%E6%95%B0%E5%92%8C%E5%88%86%E6%95%B0%E6%95%B0%E5%AD%97)

<!-- /TOC -->

# Numbers, Data, and Basic Values

<https://developer.apple.com/documentation/swift/int>

使用整个Cocoa中使用的原始值和其他基本类型。

## Int

### Topics

以下摘录部分

```swift
在32位平台上，Int的大小与Int32相同，在64位平台上，Int的大小与Int64相同。
```

#### Creating a Random Integer 创建随机整数

```swift
// 返回指定范围内的随机值。
static func random(in range: Range<Self>) -> Self
Int.random(in: 1..<100)

// 返回指定范围内的随机值。
static func random(in range: ClosedRange<Self>) -> Self
for _ in 1...3 {
    print(Int.random(in: 1...100))
}
// Prints "53"
// Prints "64"
// Prints "5"
```

#### Performing Calculations 执行计算

```swift
// 将此值替换为其加法逆值。
mutating func negate()
var x = 21
x.negate()
// x == -21

// 返回该值的商和余数除以给定值。
func quotientAndRemainder(dividingBy rhs: Self) -> (quotient: Self, remainder: Self)
let x = 1_000_000
let (q, r) = x.quotientAndRemainder(dividingBy: 933)
// q == 1071
// r == 757

// 如果此值是给定值的倍数，则返回true，否则返回false。
// 对于两个整数a和b，如果存在第三个整数q，则a是b的倍数，使得a = q*b。例如，6是3的倍数，因为6 = 2*3。零是所有事物的倍数，因为对于任何整数x，0 = 0*x。
// 两个边缘案例值得特别关注：
// x.isMultiple(of: 0)为true，如果x为零，否则为false。
func isMultiple(of other: Self) -> Bool
```

#### Finding the Sign and Magnitude 找到符号和大小

```swift
// 返回给定数字的绝对值。
// X的绝对值必须以同一类型表示。特别是，无法表示有符号、固定宽度整数类型的最小值的绝对值。
func abs<T>(_ x: T) -> T where T : Comparable, T : SignedNumeric

// 如果此值为负值，则返回-1，如果为正值，则返回1；否则为0。
func signum() -> Int
```

## Double

一种双精度浮点值类型。

```swift
@frozen
struct Double
```

### Creating a Random Value 创建随机值

同Int

## Decimal

表示十进制数字的结构。

在 Swift 中，Decimal 是一种用于高精度数值计算的类型。它提供了更精确的小数计算，适用于需要避免浮点数舍入误差的场景，例如金融和货币计算。  
Decimal 类型使用基于十进制的算术运算，以保持精度和准确性。它可以表示任意位数的小数，并且不会出现浮点数舍入错误。

```swift
struct Decimal
```

## NumberFormatter

在数值及其文本表示之间转换的格式化程序。  
用于格式化数字的显示方式。它提供了一种方便的方式来将数字转换为特定格式的字符串，并支持本地化和自定义的格式选项。

```swift
class NumberFormatter : Formatter
```

```swift
// 格式化数字
let number = 1234.5678
let formatter = NumberFormatter()
formatter.numberStyle = .decimal
formatter.maximumFractionDigits = 2
let formattedString = formatter.string(from: NSNumber(value: number))
print(formattedString ?? "") // 输出: 1,234.57
```

```swift
// 解析字符串为数字
let string = "1,234.56"
let formatter = NumberFormatter()
formatter.numberStyle = .decimal
if let number = formatter.number(from: string) {
    let doubleValue = number.doubleValue
    print(doubleValue) // 输出: 1234.56
}
```

```swift
// 本地化支持
let number = 1234.56

let formatter = NumberFormatter()
formatter.numberStyle = .currency

let formattedString = formatter.string(from: NSNumber(value: number))
print(formattedString ?? "") // 根据当前区域设置输出适当的货币格式
```

### Configuring Formatter Behavior and Style

```swift
// 接收器使用的数字样式。
// enum Style : UInt, @unchecked Sendable
// .none 1235
// .decimal 1,234.568
// .percent 12%
// .scientific 1.2345678E3
// .currency ￥1,234.57
var numberStyle: NumberFormatter.Style { get set }
```

### Converting Between Numbers and Strings 在数字和字符串之间转换

```swift
// 返回通过解析给定字符串创建的NSNumber对象。
func number(from string: String) -> NSNumber?

// 返回一个包含所提供数字对象的格式化值的字符串。
func string(from number: NSNumber) -> String?

// 返回具有指定样式的本地化数字字符串。
class func localizedString(
    from num: NSNumber,
    number nstyle: NumberFormatter.Style
) -> String
```

### Configuring Rounding Behavior 配置四舍五入行为

```swift
// 接收器使用的四舍五入行为。
// class NSDecimalNumberHandler : NSObject
@NSCopying
var roundingBehavior: NSDecimalNumberHandler { get set }

// 接收器使用的舍入增量。
@NSCopying
var roundingIncrement: NSNumber! { get set }

// 接收器使用的舍入模式。
// enum RoundingMode : UInt, @unchecked Sendable
// case ceiling 向正无穷方向舍入，即取最接近且不小于该数的整数。
// case floor 向负无穷方向舍入，即取最接近且不大于该数的整数。
// case down 向零方向舍入，即取最接近且不大于该数的整数。
// case up 远离零方向舍入，即取最接近且不小于该数的整数。
// case halfEven 银行家舍入法，即四舍六入五成双。如果舍弃部分的左边一位是偶数，则舍入结果不变；如果舍弃部分的左边一位是奇数，则舍入结果加 1。
// case halfDown 四舍五入，如果舍弃部分大于或等于 0.5，则舍入结果加 1；否则舍入结果不变。
// case halfUp 五舍六入，如果舍弃部分大于 0.5，则舍入结果加 1；否则舍入结果不变。
var roundingMode: NumberFormatter.RoundingMode { get set }
```

### Configuring Integer and Fraction Digits 配置整数和分数数字

```swift
// 十进制分隔符之前的最小位数。
var minimumIntegerDigits: Int { get set }
var numberFormatter = NumberFormatter()
numberFormatter.minimumIntegerDigits = 0 // default
numberFormatter.string(from: 123) // 123
numberFormatter.minimumIntegerDigits = 5
numberFormatter.string(from: 123) // 00123

// 十进制分隔符之前的最大位数。
var maximumIntegerDigits: Int { get set }

// 十进制分隔符后面的最小位数。
var minimumFractionDigits: Int { get set }

// 分位数点后的最大位数。
var maximumFractionDigits: Int { get set }
```
