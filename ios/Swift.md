
<!-- TOC -->

- [Swift](#swift)
- [变量声明](#变量声明)
- [常量声明](#常量声明)
- [字符串](#字符串)
- [创建数组](#创建数组)
- [哈希集合](#哈希集合)
- [字典](#字典)

<!-- /TOC -->
# Swift

Swift 4是Apple公司为iOS和OS X开发开发的一种新编程语言。Swift 4采用了C语言和Objective-C中最好的，没有C语言兼容性的限制问题。

# 变量声明

* 必须使用var关键字声明它们
* 类型注解声明

```swift
var variableName = <initial value>
var variableName:<data type> = <optional initial value>
```

# 常量声明

* 必须使用let关键字声明

```
let constantName = <initial value>
```

# 字符串

* 可以使用字符串文字或创建String类的实例来创建字符串

```
var stringA = "Hello, Swift 4!"
```

# 创建数组

```
var someArray = [SomeType]()
var someArray = [SomeType](count:NumbeOfElements, repeatedValue:InitialValue)

var someInts = [Int](count: 3, repeatedValue: 0)
```

# 哈希集合

* 集合是用于存储相同类型的不同值，但它们没有像数组那样的有明确排序顺序。

```
var someSet = Set<Character>()
```

#　字典

字典是用于存储相同类型的无序值列表

```
var someDict = [KeyType: ValueType]()
```
