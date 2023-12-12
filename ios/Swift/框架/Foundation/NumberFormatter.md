<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NumberFormatter](#numberformatter)
  - [四舍五入方式](#四舍五入方式)
  - [相关配置](#相关配置)

<!-- /code_chunk_output -->


# NumberFormatter

在数值及其文本表示形式之间进行转换的格式化程序

## 四舍五入方式

* 区别于javascript 小数部分恰好为 0.5，则按 +∞ 方向四舍五入到下一个整数。即 -2.5 = -2, -3.5 = -3
* swift 通过NumberFormatter.RoundingMode 设置 默认.halfEven 为 -2.5 = 2, -3.5 = -4

```swift
// .ceiling: 向正无穷方向舍入，即将小数部分向上舍入。例如，2.3 将舍入为 3，-2.3 将舍入为 -2。
// .floor: 向负无穷方向舍入，即将小数部分向下舍入。例如，2.7 将舍入为 2，-2.7 将舍入为 -3。
// .down: 向零方向舍入，即将小数部分向零舍入。无论正负，小数部分都会被截断。例如，2.9 将舍入为 2，-2.9 将舍入为 -2。
// .up: 远离零方向舍入，即将小数部分远离零舍入。无论正负，小数部分都会被增加。例如，2.1 将舍入为 3，-2.1 将舍入为 -3。
// .halfEven: 使用银行家舍入法进行舍入。如果小数部分恰好等于 0.5，则舍入到最接近的偶数。例如，2.5 将舍入为 2，3.5 将舍入为 4。 默认值
// .halfUp: 向最接近的整数方向舍入，如果小数部分大于或等于 0.5，则向上舍入，否则向下舍入。例如，2.5 将舍入为 3，2.4 将舍入为 2。
// .halfDown: 向最接近的整数方向舍入，如果小数部分大于 0.5，则向上舍入，否则向下舍入。例如，2.5 将舍入为 2，2.6 将舍入为 3。
//  .bankers: 与 .halfEven 相同，是 .halfEven 的别名。
NumberFormatter.RoundingMode

let numberFormatter = NumberFormatter()
numberFormatter.roundingMode = .halfEven // 小数部分恰好等于 0.5，向最近偶数进行舍入
print(numberFormatter.string(from: -2.5)!) // 2
print(numberFormatter.string(from: 3.5)!) // 4


```

## 相关配置

```swift

// 小数点分隔符后的最少位数
var minimumFractionDigits: Int { get set }

// 前缀的字符串
var positivePrefix: String!

// 后缀的字符串
var positiveSuffix: String!

// 接收者用作负值前缀的字符串。
var negativePrefix: String!

// 接收者用作负值后缀的字符串。
var negativeSuffix: String!

// 分组分隔符的字符串 如：逗号（“10,000”）
var groupingSeparator: String! { get set }
```

```swift
let format = NumberFormatter()
format.numberStyle = .none // 整数表示
print(format.string(from: num as NSNumber)!)
// 10000000

format.numberStyle = .decimal // 十进制样式格式
print(format.string(from: num as NSNumber)!)
// 10,000,000.457

format.numberStyle = .percent // 百分比
print(format.string(from: 0.5555)!)
// 56%

format.numberStyle = .scientific // 科学
print(format.string(from: num as NSNumber)!)
// 1.000000045678E7

format.numberStyle = .spellOut // 语言拼写
print(format.string(from: num as NSNumber)!)
// 一千万点四五六七八

format.numberStyle = .ordinal // 序数样式
print(format.string(from: num as NSNumber)!)
// 第10,000,000

format.numberStyle = .currency // 货币样式格式，使用由数字格式化程序区域设置定义的货币符号
print(format.string(from: num as NSNumber)!)
// ¥10,000,000.46

format.numberStyle = .currencyAccounting // 会计货币样式格式，使用由数字格式化程序区域设置定义的货币符号
print(format.string(from: num as NSNumber)!)
// ¥10,000,000.46

format.numberStyle = .currencyISOCode // 货币样式格式，使用由数字格式化程序区域设置定义的 ISO 4217 货币代码
print(format.string(from: num as NSNumber)!)
// CNY 10,000,000.46

format.numberStyle = .currencyPlural // 货币样式格式，使用由数字格式化程序区域设置定义的复数面额
print(format.string(from: num as NSNumber)!)
// 10,000,000.46 人民币
```
