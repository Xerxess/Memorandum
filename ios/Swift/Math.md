
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Math](#math)
  - [三角函数](#三角函数)
    - [基本三角函数](#基本三角函数)
    - [反三角函数](#反三角函数)
    - [双曲三角函数](#双曲三角函数)
    - [应用场景](#应用场景)
  - [指数和对数函数](#指数和对数函数)
    - [指数函数](#指数函数)
    - [对数函数](#对数函数)
  - [幂和根函数](#幂和根函数)
  - [取整和余数函数](#取整和余数函数)
    - [取整函数](#取整函数)
    - [余数函数](#余数函数)
  - [其他](#其他)

<!-- /code_chunk_output -->

# Math

<https://developer.apple.com/documentation/kernel/math>

- 几乎每种方法都对应(Float、Double、Float80)如 acosf、 acos 、acosl

## 三角函数

### 基本三角函数

```swift
// cosf, cos, cosl：余弦函数
let value = cos(1.04719755) // 返回 0.5
public func cosf(_: Float) -> Float
public func cos(_: Double) -> Double
public func cosl(_: Float80) -> Float80

// sinf, sin, sinl：正弦函数
let value = sin(0.523598776) // 返回 0.5
public func sinf(_: Float) -> Float
public func sin(_: Double) -> Double
public func sinl(_: Float80) -> Float80

// tanf, tan, tanl：正切函数
let value = tan(0.785398163) // 返回 1.0
public func tanf(_: Float) -> Float
public func tan(_: Double) -> Double
public func tanl(_: Float80) -> Float80
```

### 反三角函数

```swift
// acosf, acos, acosl：反余弦函数。
let angle = acos(0.5) // 返回 1.04719755（弧度制，即 60 度）
public func acosf(_: Float) -> Float
public func acos(_: Double) -> Double
public func acosl(_: Float80) -> Float80

// asinf, asin, asinl：反正弦函数。
let angle = asin(0.5) // 返回 0.523598776（弧度制，即 30 度）
public func asinf(_: Float) -> Float
public func asin(_: Double) -> Double
public func asinl(_: Float80) -> Float80

// atanf, atan, atanl：反正切函数。
let angle = atan(1.0) // 返回 0.785398163（弧度制，即 45 度）
public func atanf(_: Float) -> Float
public func atan(_: Double) -> Double
public func atanl(_: Float80) -> Float80

// atan2f, atan2, atan2l：两个参数的反正切函数（计算 y/x 的反正切）。
let angle = atan2(1.0, 1.0) // 返回 0.785398163（弧度制，即 45 度）
public func atan2f(_: Float, _: Float) -> Float
public func atan2(_: Double, _: Double) -> Double
public func atan2l(_: Float80, _: Float80) -> Float80
```

### 双曲三角函数

```swift
public func acoshf(_: Float) -> Float
public func acosh(_: Double) -> Double
public func acoshl(_: Float80) -> Float80

public func asinhf(_: Float) -> Float
public func asinh(_: Double) -> Double
public func asinhl(_: Float80) -> Float80

public func atanhf(_: Float) -> Float
public func atanh(_: Double) -> Double
public func atanhl(_: Float80) -> Float80

// coshf, cosh, coshl：双曲余弦函数
let value = cosh(1.0) // 返回 1.54308063
public func coshf(_: Float) -> Float
public func cosh(_: Double) -> Double
public func coshl(_: Float80) -> Float80

// sinhf, sinh, sinhl：双曲正弦函数
let value = sinh(1.0) // 返回 1.17520119
public func sinhf(_: Float) -> Float
public func sinh(_: Double) -> Double
public func sinhl(_: Float80) -> Float80

// tanhf, tanh, tanhl：双曲正切函数
let value = tanh(1.0) // 返回 0.761594156
public func tanhf(_: Float) -> Float
public func tanh(_: Double) -> Double
public func tanhl(_: Float80) -> Float80
```

### 应用场景

cos、sin 和 tan 是三角函数，广泛应用于数学、物理、工程、计算机图形学等领域。

> 几何计算

```swift
// 计算角度和边长
// 圆的周长是半径的 2π倍，所以一个周角（360度）是 2π弧度。360度 = 2π
// 半圆的长度是半径的 π倍，所以一个平角（180度）是 π弧度。180度 = π
let angle = 45.0 // 角度
let radians = angle * .pi / 180.0 // 转换为弧度
let oppositeSide = sin(radians) * hypotenuse // 对边
let adjacentSide = cos(radians) * hypotenuse // 邻边
```

```swift
// 计算两点之间的距离和方向
let dx = x2 - x1
let dy = y2 - y1
let distance = hypot(dx, dy) // 距离
let angle = atan2(dy, dx) // 方向（弧度）
```

```swift
// 游戏中，三角函数用于计算角色沿某个方向移动的坐标
let speed = 5.0 // 速度
let angle = 45.0 // 移动方向
let radians = angle * .pi / 180.0
let dx = speed * cos(radians) // x 方向速度
let dy = speed * sin(radians) // y 方向速度
```

```swift
//  力学中，三角函数用于将力分解为水平和垂直分量s
let force = 100.0 // 力的大小
let angle = 30.0 // 力的方向
let radians = angle * .pi / 180.0
let horizontalForce = force * cos(radians) // 水平分量
let verticalForce = force * sin(radians) // 垂直分量
```

## 指数和对数函数

### 指数函数

```swift
// expf, exp, expl：自然指数函数（e^x）。
let value = exp(1.0) // 返回 2.718281828
public func expf(_: Float) -> Float
public func exp(_: Double) -> Double
public func expl(_: Float80) -> Float80

// exp2f, exp2, exp2l：以 2 为底的指数函数（2^x）
let value = exp2(3.0) // 返回 8.0
public func exp2f(_: Float) -> Float
public func exp2(_: Double) -> Double
public func exp2l(_: Float80) -> Float80

// expm1f, expm1, expm1l：e^x - 1
let value = expm1(1.0) // 返回 1.718281828
public func expm1f(_: Float) -> Float
public func expm1(_: Double) -> Double
public func expm1l(_: Float80) -> Float80
```

### 对数函数

```swift
// logf, log, logl：自然对数（ln(x)）
let value = log(2.718281828) // 返回 1.0
public func logf(_: Float) -> Float
public func log(_: Double) -> Double
public func logl(_: Float80) -> Float80

// log10f, log10, log10l：以 10 为底的对数
let value = log10(100.0) // 返回 2.0
public func log10f(_: Float) -> Float
public func log10(_: Double) -> Double
public func log10l(_: Float80) -> Float80

// log2f, log2, log2l：以 2 为底的对数
let value = log2(8.0) // 返回 3.0
public func log2f(_: Float) -> Float
public func log2(_: Double) -> Double
public func log2l(_: Float80) -> Float80

public func log1pf(_: Float) -> Float
public func log1p(_: Double) -> Double
public func log1pl(_: Float80) -> Float80

public func logbf(_: Float) -> Float
public func logb(_: Double) -> Double
public func logbl(_: Float80) -> Float80
```

## 幂和根函数

```swift
// powf, pow, powl：幂函数（x^y）。
let value = pow(2.0, 3.0) // 返回 8.0
public func powf(_: Float, _: Float) -> Float
public func pow(_: Double, _: Double) -> Double
public func powl(_: Float80, _: Float80) -> Float80

// sqrtf, sqrt, sqrtl：平方根
let value = sqrt(16.0) // 返回 4.0
public func sqrtf(_: Float) -> Float
public func sqrt(_: Double) -> Double
public func sqrtl(_: Float80) -> Float80

// cbrtf, cbrt, cbrtl：立方根
let value = cbrt(27.0) // 返回 3.0
public func cbrtf(_: Float) -> Float
public func cbrt(_: Double) -> Double
public func cbrtl(_: Float80) -> Float80
```

## 取整和余数函数

### 取整函数

```swift
// ceilf, ceil, ceill：向上取整
let value = ceil(3.2) // 返回 4.0
public func ceilf(_: Float) -> Float
public func ceil(_: Double) -> Double
public func ceill(_: Float80) -> Float80

// floorf, floor, floorl：向下取整
let value = floor(3.9) // 返回 3.0
public func floorf(_: Float) -> Float
public func floor(_: Double) -> Double
public func floorl(_: Float80) -> Float80

// roundf, round, roundl：四舍五入
let value = round(3.5) // 返回 4.0
public func roundf(_: Float) -> Float
public func round(_: Double) -> Double
public func roundl(_: Float80) -> Float80

// 与 round 相似 只是返回Int
public func lroundf(_: Float) -> Int
public func lround(_: Double) -> Int
public func lroundl(_: Float80) -> Int

// 与 round 相似 只是返回Int64
public func llroundf(_: Float) -> Int64
public func llround(_: Double) -> Int64
public func llroundl(_: Float80) -> Int64

// nearbyintf, nearbyint, 和 nearbyintl 是 Swift 中的函数，用于将浮点数舍入到最接近的整数值 ，同时遵循当前的舍入模式
// 与普通的舍入函数（如 round）不同，nearbyint 系列函数的特点是：
//   * 不引发浮点异常 ：即使输入值是特殊值（如 NaN 或无穷大），也不会触发浮点异常。
//   * 遵循当前的舍入模式 ：使用系统当前的浮点舍入模式（例如向最近的偶数舍入、向零舍入等）。
let value = 3.5
let roundedValue = nearbyint(value)
print(roundedValue) // 4.0
public func nearbyintf(_: Float) -> Float
public func nearbyint(_: Double) -> Double
public func nearbyintl(_: Float80) -> Float80

// rintf, rint, 和 rintl 是 Swift 中的函数，用于将浮点数舍入到最接近的整数值 ，同时遵循当前的浮点舍入模式 。
// 与 nearbyint 系列函数非常相似，但有一个关键区别：
//   * rint 系列函数可能会引发浮点异常 ，而 nearbyint 系列函数不会。
let value = 3.5
let roundedValue = rint(value)
print(roundedValue) // 4.0
public func rintf(_: Float) -> Float
public func rint(_: Double) -> Double
public func rintl(_: Float80) -> Float80

// lrintf, lrint, 和 lrintl 是 Swift 中的函数，用于将浮点数舍入到最接近的整数值 ，并返回一个整数类型的结果。
// 与 rint 系列函数不同，lrint 系列函数的返回值是一个整数类型 （如 Int），而不是浮点类型。
let value = 3.7
let roundedValue = lrint(value)
print(roundedValue) // 4.0
public func lrintf(_: Float) -> Int
public func lrint(_: Double) -> Int
public func lrintl(_: Float80) -> Int

// 与 rint 系列函数不同，lrint 系列函数的返回值是一个整数类型 （如 Int64），而不是浮点类型。
public func llrintf(_: Float) -> Int64
public func llrint(_: Double) -> Int64
public func llrintl(_: Float80) -> Int64

// fabsf, fabs, fabsl：绝对值
let value = -3.14
let absoluteValue = fabs(value)
print("Absolute value of \(value): \(absoluteValue)") // -3.14: 3.14
public func fabsf(_: Float) -> Float
public func fabs(_: Double) -> Double
public func fabsl(_: Float80) -> Float80

// truncf, trunc, 和 truncl 是 Swift 中的函数，用于将浮点数**向零舍入（truncate）**到最接近的整数值
let value1: Float = 3.7
let value2: Float = -3.7
let truncatedValue1 = truncf(value1)
let truncatedValue2 = truncf(value2)
print(truncatedValue1,truncatedValue2) // 3.0 -3.0
// ceil 对比
let truncatedValue1 = ceil(value1)
let truncatedValue2 = ceil(value2)
print(truncatedValue1,truncatedValue2) // 4.0 -3.0
// floor 对比
let truncatedValue1 = floor(value1)
let truncatedValue2 = floor(value2)
print(truncatedValue1,truncatedValue2) // 3.0 -4.0
public func truncf(_: Float) -> Float
public func trunc(_: Double) -> Double
public func truncl(_: Float80) -> Float80
```

### 余数函数

```swift
// fmodf, fmod, fmodl：取余
// 应用场景:时间计算、金融计算、非负分布
let value = fmod(10.5, 3.0) // 返回 1.5
public func fmodf(_: Float, _: Float) -> Float
public func fmod(_: Double, _: Double) -> Double
public func fmodl(_: Float80, _: Float80) -> Float80

// remainderf, remainder, 和 remainderl 是 Swift 中的函数，用于计算两个浮点数相除后的余数（remainder）
// 应用场景:周期性现象、科学计算、对称分布
// 与普通的取模运算（如 % 或 fmod）不同
//   * remainder 系列函数使用的是舍入到最近的整数 的方式来确定商，从而得到更精确的余数
//   * fmod 使用的是 向零舍入 的方式计算商，而 remainder 使用四舍五入到最近的整数 。因此，fmod 和 remainder 的结果可能不同
let x = 5.5
let y = 2.0
let result = remainder(x, y) // 过程：n = round(5.5 / 2.0) = 3, r = 5.5 - 3 * 2.0 = -0.5
let result2 = fmod(x,y)
let result3 = 5 % 2
print(result,result2,result3) // -0.5 1.5 1
public func remainderf(_: Float, _: Float) -> Float
public func remainder(_: Double, _: Double) -> Double
public func remainderl(_: Float80, _: Float80) -> Float80

// remquof, remquo, 和 remquol 是 Swift 中的函数，用于计算两个浮点数相除后的余数 ，同时返回商的部分信息（即商的低几位）。
// 结合了 remainder 和商的部分信息，适合需要同时获取余数和商的场景。与 remainder 类似，remquo 系列函数使用的是舍入到最近的整数 的方式来确定商，但额外提供了商的部分信息
var quotient: Int32 = 0
let x = 5.5
let y = 2.0
let remainderValue = remquo(x, y, &quotient)
print(remainderValue) // 输出：-0.5 = 5.5 - 2 * 2.0
print(quotient)       // 输出：3 = round(5.5 / 2)
public func remquof(_: Float, _: Float, _: UnsafeMutablePointer<Int32>!) -> Float
public func remquo(_: Double, _: Double, _: UnsafeMutablePointer<Int32>!) -> Double
public func remquol(_: Float80, _: Float80, _: UnsafeMutablePointer<Int32>!) -> Float80
```

## 其他

```swift
/******************************************************************************
 *                                                                            *
 *                              Math Functions                                *
 *                                                                            *
 ******************************************************************************/
// modff, modf, 和 modfl 是 Swift 中的函数，用于将浮点数分解为整数部分 和小数部分 。它们是 C 标准库中的函数（<math.h>），在 Swift 中被直接映射为原生函数。
// 浮点数在计算机中是以二进制形式存储的，而某些十进制小数（如 0.1 或 0.14）无法精确表示为二进制小数。这会导致浮点数运算时出现微小的误差。当使用 modf 函数分解时，返回的小数部分可能会带有微小的误差，例如 0.14000000000000012
var integerPart: Float = 0.0
let fractionalPart = modff(3.14, &integerPart)
print(integerPart,fractionalPart) // 3.0 0.14000000000000012
public func modff(_: Float, _: UnsafeMutablePointer<Float>!) -> Float
public func modf(_: Double, _: UnsafeMutablePointer<Double>!) -> Double
public func modfl(_: Float80, _: UnsafeMutablePointer<Float80>!) -> Float80

// scalbn(x, exp) 返回值 ：返回 x * 2^exp 的结果
let result = scalbn(1.5, 3)
print(result) // 输出：12.0
public func scalbnf(_ x: Float, _ exp: Int32) -> Float
public func scalbn(_ x: Double, _ exp: Int32) -> Double
public func scalbnl(_ x: Float80, _ exp: Int32) -> Float80
public func ldexpf(_: Float, _: Int32) -> Float // 已弃用
public func ldexp(_: Double, _: Int32) -> Double // 已弃用
public func ldexpl(_: Float80, _: Int32) -> Float80 // 已弃用

// 与scalbnf, scalbn, 和 scalbnl相似
public func scalblnf(_: Float, _: Int) -> Float
public func scalbln(_: Double, _: Int) -> Double
public func scalblnl(_: Float80, _: Int) -> Float80

// frexpf, frexp, 和 frexpl 是 Swift 中的函数，用于将一个浮点数分解为尾数（mantissa）和 指数（exponent)
var exponent: Int32 = 0
let mantissa = frexp(12.0, &exponent)
// 12.0 = mantissa * 2^exponent
// 12.0 = 0.75 × 2^4
print(mantissa,exponent) // 输出： 0.75 4
public func frexpf(_: Float, _: UnsafeMutablePointer<Int32>!) -> Float
public func frexp(_: Double, _: UnsafeMutablePointer<Int32>!) -> Double
public func frexpl(_: Float80, _: UnsafeMutablePointer<Int32>!) -> Float80

// ilogbf, ilogb, 和 ilogbl 是 Swift 中的函数，用于计算浮点数的二进制指数（binary exponent）
let value = 12.0
let exponent = ilogb(value)
print("Exponent of \(value): \(exponent)") // 输出：Exponent of 12.0: 3
// 计算过程：12.0 = 0.75 * 2^4，因此指数为 3（非偏移值）。
public func ilogbf(_: Float) -> Int32
public func ilogb(_: Double) -> Int32
public func ilogbl(_: Float80) -> Int32

// hypotf, hypot, 和 hypotl 是 Swift 中的函数，用于计算两个数的平方和的平方根
// hypotf, hypot, hypotl：计算直角三角形的斜边长度
let x = 3.0
let y = 4.0
let distance = hypot(x, y)
print("Distance: \(distance)") // 输出：Distance: 5.0
// 计算过程：sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5.0
public func hypotf(_: Float, _: Float) -> Float
public func hypot(_: Double, _: Double) -> Double
public func hypotl(_: Float80, _: Float80) -> Float80

// erff, erf, 和 erfl 是 Swift 中的函数，用于计算误差函数（Error Function）
let x = 2.0
let result = erf(x)
print("erf(\(x)) = \(result)") // 输出：erf(1.0) ≈ 0.8427007929497148
public func erff(_: Float) -> Float
public func erf(_: Double) -> Double
public func erfl(_: Float80) -> Float80

// erfcf, erfc, 和 erfcl 是 Swift 中的函数，用于计算互补误差函数（Complementary Error Function）
let x = 1.0
let result = erfc(x)
print("erfc(\(x)) = \(result)") // 输出：erfc(1.0) ≈ 0.1572992070502851
public func erfcf(_: Float) -> Float
public func erfc(_: Double) -> Double
public func erfcl(_: Float80) -> Float80

// lgammaf, lgamma, 和 lgammal 是 Swift 中的函数，用于计算伽玛函数的自然对数（Logarithm of the Gamma Function）
public func lgammaf(_: Float) -> Float
public func lgamma(_: Double) -> Double
public func lgammal(_: Float80) -> Float80

// tgammaf, tgamma, 和 tgammal 是 Swift 中的函数，用于计算伽玛函数（Gamma Function）
// 伽玛函数是数学中一个重要的特殊函数，广泛应用于概率论、统计学、组合数学和物理学等领域。
let x = 5.0
let result = tgamma(x)
print("Gamma(\(x)) = \(result)") // 输出：Gamma(5.0) = 24.0
// 计算过程：Gamma(5) = 4! = 4 * 3 * 2 * 1 = 24
public func tgammaf(_: Float) -> Float
public func tgamma(_: Double) -> Double
public func tgammal(_: Float80) -> Float80

// copysignf, copysign, 和 copysignl 是 Swift 中的函数，用于将一个浮点数的符号（sign）复制到另一个浮点数上。
let x = 3.5
let y = -2.0
let result = copysign(x, y)
print(result) // -3.5 取 x 的绝对值 3.5，赋予 y 的符号（负号），结果为 -3.5
public func copysignf(_: Float, _: Float) -> Float
public func copysign(_: Double, _: Double) -> Double
public func copysignl(_: Float80, _: Float80) -> Float80

// nanf, nan, 和 nanl 是 Swift 中的函数，用于生成一个**NaN（Not a Number）**值
public func nanf(_: UnsafePointer<CChar>!) -> Float
public func nan(_: UnsafePointer<CChar>!) -> Double
public func nanl(_: UnsafePointer<CChar>!) -> Float80

// nextafterf, nextafter, 和 nextafterl 是 Swift 中的函数，用于计算从一个浮点数到另一个浮点数方向上的下一个可表示值 
public func nextafterf(_: Float, _: Float) -> Float
public func nextafter(_: Double, _: Double) -> Double
public func nextafterl(_: Float80, _: Float80) -> Float80

// nexttoward, nexttowardf, 和 nexttowardl 是 Swift 中的函数，用于计算从一个浮点数到另一个浮点数方向上的下一个可表示值 。
public func nexttoward(_: Double, _: Float80) -> Double
public func nexttowardf(_: Float, _: Float80) -> Float
public func nexttowardl(_: Float80, _: Float80) -> Float80

// fdimf, fdim, 和 fdiml 是 Swift 中的函数，用于计算两个浮点数之间的正差值（positive difference）
let x = 5.0
let y = 3.0
let result = fdim(x, y)
print("fdim(\(x), \(y)) = \(result)") // 输出：fdim(5.0, 3.0) = 2.0
public func fdimf(_: Float, _: Float) -> Float
public func fdim(_: Double, _: Double) -> Double
public func fdiml(_: Float80, _: Float80) -> Float80

// fmaxf, fmax, 和 fmaxl 是 Swift 中的函数，用于返回两个浮点数中的较大值（maximum value） 
public func fmaxf(_: Float, _: Float) -> Float
public func fmax(_: Double, _: Double) -> Double
public func fmaxl(_: Float80, _: Float80) -> Float80

// 返回两个浮点数中的较小值（minimum value）
public func fminf(_: Float, _: Float) -> Float
public func fmin(_: Double, _: Double) -> Double
public func fminl(_: Float80, _: Float80) -> Float80

// fmaf, fma, 和 fmal 是 Swift 中的函数，用于执行融合乘加（Fused Multiply-Add, FMA）操作 。
let x = 2.0
let y = 3.0
let z = 4.0
let result = fma(x, y, z)
print("fma(\(x), \(y), \(z)) = \(result)") // 输出：fma(2.0, 3.0, 4.0) = 10.0
// 计算过程：(2.0 * 3.0) + 4.0 = 6.0 + 4.0 = 10.0
public func fmaf(_: Float, _: Float, _: Float) -> Float
public func fma(_: Double, _: Double, _: Double) -> Double
public func fmal(_: Float80, _: Float80, _: Float80) -> Float80
```
