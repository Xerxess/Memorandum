<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Numbers, Data, and Basic Values](#numbers-data-and-basic-values)
  - [Int](#int)
    - [Topics](#topics)
      - [Creating a Random Integer 创建随机整数](#creating-a-random-integer-创建随机整数)
      - [Performing Calculations 执行计算](#performing-calculations-执行计算)
      - [Finding the Sign and Magnitude 找到符号和大小](#finding-the-sign-and-magnitude-找到符号和大小)
  - [Double](#double)
    - [Creating a Random Value 创建随机值](#creating-a-random-value-创建随机值)
  - [Decimal](#decimal)
    - [Decimal.FormatStyle](#decimalformatstyle)
  - [NumberFormatter](#numberformatter)

<!-- /code_chunk_output -->


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

### Decimal.FormatStyle

```swift
var decimal:Decimal = 1000000000001
var style:Decimal.FormatStyle = .number

style = style.grouping(.never)
print(decimal.formatted(style)) // 1000000000001

style = style.grouping(.automatic)
print(decimal.formatted(style)) // 1,000,000,000,001

style = style.decimalSeparator(strategy: .always)
print(decimal.formatted(style)) // 1,000,000,000,001.

style = style.decimalSeparator(strategy: .automatic)
print(decimal.formatted(style)) // 1,000,000,000,001

style = style.notation(.scientific)
print(decimal.formatted(style)) // 科学计数 1E12

style = style.notation(.automatic).sign(strategy: .always())
print(decimal.formatted(style)) // 显示符号 +1,000,000,000,001

style = style.scale(0.001)
print(decimal.formatted(style)) // 通过比例调整 +1,000,000,000.001

decimal = 1000000000001.4454444444444444444
var style2:Decimal.FormatStyle = .number.precision(.fractionLength(2)).grouping(.never)
print(decimal.formatted(style2)) // 两位小数 1000000000001.45

decimal = 0.89
print(decimal.formatted(Decimal.FormatStyle.Percent())) // 百分比 89%
```

```swift
// 将输入表示（例如格式化字符串）解析为提供的数据类型的类型
let decimalString:String = "1,000,000,000,001"
let decimalStyle:Decimal.FormatStyle = Decimal.FormatStyle.number

// 方法一
let decimal =  try Decimal(decimalString,format: decimalStyle)
print(decimal) // 1000000000001

// 方法二
let decimal2 = try decimalStyle.parseStrategy.parse(decimalString)
print(decimal2) // 1000000000001
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
