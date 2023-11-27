<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Functions](#functions)
  - [inout](#inout)
  - [函数类型](#函数类型)

<!-- /code_chunk_output -->

# Functions

```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

```swift
// 具有隐式返回值的函数 
func greeting(for person: String) -> String {
    "Hello, " + person + "!"
}

// 参数标签
func someFunction(argumentLabel parameterName: Int) {
}

// 不需要参数的参数标签，为该参数编写下划线 ( _ )，而不是显式参数标签
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
}

// 定义默认值
// 默认值的参数放在函数参数列表的开头，位于具有默认值的参数之前。没有默认值的参数通常对函数的含义更重要 - 首先编写它们可以更容易地识别正在调用相同的函数，无论是否省略任何默认参数。
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
}

// 可变参数
// 通过在参数类型名称后插入三个句点字符 ( ... ) 来编写可变参数
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
}

// 函数可以有多个可变参数。可变参数之后的第一个参数必须具有参数标签。参数标签使得哪些参数被传递给可变参数以及哪些参数被传递给可变参数之后的参数变得明确。
func arithmeticMean(_ numbers: Double... , numbers2 numbers2: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
}
arithmeticMean(1,2,3,numbers2:4,5,6)
```

## inout

- 函数参数默认为常量
- 意味着不能错误地更改参数的值
- 变量作为实参传递给 in-out 形参时，您可以在变量名称之前直接放置一个与号 ( & )，以指示该函数可以修改它

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
```

## 函数类型

```swift
(Int, Int) -> Int
() -> Void

func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
var mathFunction: (Int, Int) -> Int = addTwoInts

// 函数的参数类型
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}

// 使用一个函数类型作为另一个函数的返回类型
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```
