<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Kotlin常用的惯用语](#kotlin常用的惯用语)
  - [创建 DTO](#创建-dto)
  - [函数参数的默认值](#函数参数的默认值)
  - [字符串插值](#字符串插值)
  - [实例检查](#实例检查)
  - [只读List](#只读list)
  - [只读Map](#只读map)
  - [遍历映射或对列表](#遍历映射或对列表)
  - [迭代范围](#迭代范围)
  - [Lazy 属性](#lazy-属性)
  - [扩展函数](#扩展函数)
  - [创建单一实例](#创建单一实例)
  - [实例化抽象类](#实例化抽象类)
  - [If-not-null 简写](#if-not-null-简写)
  - [如果为 null，则执行语句](#如果为-null则执行语句)
  - [获取可能为空集合的第一项](#获取可能为空集合的第一项)
  - [如果不为 null，则执行](#如果不为-null则执行)
  - [映射可为空的值（如果不是 null）](#映射可为空的值如果不是-null)
  - [返回 when 语句](#返回-when-语句)
  - [try-catch 表达式](#try-catch-表达式)
  - [if 表达式](#if-表达式)
  - [单表达式函数](#单表达式函数)
  - [在对象实例上调用多个方法 （with）](#在对象实例上调用多个方法-with)
  - [配置对象的属性 （apply）](#配置对象的属性-apply)
  - [交换两个变量](#交换两个变量)
  - [将代码标记为未完成 （TODO）](#将代码标记为未完成-todo)

<!-- /code_chunk_output -->


# Kotlin常用的惯用语


## 创建 DTO 

```swift
data class Customer(val name: String, val email: String)
```

## 函数参数的默认值

```swift
fun foo(a: Int = 0, b: String = "") { ... }
```

## 字符串插值

```swift
println("Name $name")
```

## 实例检查

```swift
when (x) {
    is Foo -> ...
    is Bar -> ...
    else   -> ...
}
```

## 只读List

```swift
val list = listOf("a", "b", "c")
```

## 只读Map

```swift
val map = mapOf("a" to 1, "b" to 2, "c" to 3)
```

## 遍历映射或对列表﻿

```swift
for ((k, v) in map) {
    println("$k -> $v")
}
```

## 迭代范围

```swift
for (i in 1..100) { ... }  // closed-ended range: includes 100
for (i in 1..<100) { ... } // open-ended range: does not include 100
for (x in 2..10 step 2) { ... }
for (x in 10 downTo 1) { ... }
(1..10).forEach { ... }
```

## Lazy 属性

```swift
val p: String by lazy { // the value is computed only on first access
    // compute the string
}
```

## 扩展函数

```swift
fun String.spaceToCamelCase() { ... }

"Convert this to camelcase".spaceToCamelCase()
```

## 创建单一实例

```swift
object Resource {
    val name = "Name"
}
```

## 实例化抽象类﻿

```swift

```

## If-not-null 简写

```swift
val files = File("Test").listFiles()

println(files?.size) // size is printed if files is not null
```

## 如果为 null，则执行语句

```swift
val values = ...
val email = values["email"] ?: throw IllegalStateException("Email is missing!")
```

## 获取可能为空集合的第一项

```swift
val emails = ... // might be empty
val mainEmail = emails.firstOrNull() ?: ""
```

## 如果不为 null，则执行﻿

```swift
val value = ...

value?.let {
    ... // execute this block if not null
}
```

## 映射可为空的值（如果不是 null）

```swift
val value = ...

val mapped = value?.let { transformValue(it) } ?: defaultValue
```

## 返回 when 语句

```swift
fun transform(color: String): Int {
    return when (color) {
        "Red" -> 0
        "Green" -> 1
        "Blue" -> 2
        else -> throw IllegalArgumentException("Invalid color param value")
    }
}
```

## try-catch 表达式﻿

```swift
fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        throw IllegalStateException(e)
    }

    // Working with result
}
```

## if 表达式

```swift
val y = if (x == 1) {
    "one"
} else if (x == 2) {
    "two"
} else {
    "other"
}
```

## 单表达式函数

```swift
fun theAnswer() = 42

// 相当于
fun theAnswer(): Int {
    return 42
}
```

## 在对象实例上调用多个方法 （with）

```swift
class Turtle {
    fun penDown()
    fun penUp()
    fun turn(degrees: Double)
    fun forward(pixels: Double)
}

val myTurtle = Turtle()
with(myTurtle) { //draw a 100 pix square
    penDown()
    for (i in 1..4) {
        forward(100.0)
        turn(90.0)
    }
    penUp()
}
```

## 配置对象的属性 （apply）

```swift
val myRectangle = Rectangle().apply {
    length = 4
    breadth = 5
    color = 0xFAFAFA
}
```

## 交换两个变量

```swift
var a = 1
var b = 2
a = b.also { b = a }
```

## 将代码标记为未完成 （TODO）

```swift
fun calcTaxes(): BigDecimal = TODO("Waiting for feedback from accounting")
```