# 使用选择器安排对 Objective-C 方法的调用

<https://developer.apple.com/documentation/swift/using-objective-c-runtime-features-in-swift>

<https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Selector-Expression>

<https://developer.apple.com/documentation/objectivec/selector>

在 Objective-C 中，选择器是一种引用 Objective-C 方法名称的类型。  
在 Swift 中，Objective-C 选择器由 Selector 结构表示，您可以使用 #selector 表达式创建它们。

```
#selector(<#method name#>)
#selector(getter: <#property name#>)
#selector(setter: <#property name#>)
```

```
Objective-C 方法创建选择器： #selector(MyViewController.tappedButton(_:))
Objective-C getter 或 setter 方法构造选择器，请使用 getter: 或 setter: 标签为属性名称添加前缀，例如 #selector(getter: MyViewController.myButton)
```

```swift
class SomeClass: NSObject {
    @objc let property: String
    @objc(doSomethingWithInt:)
    func doSomething(_ x: Int) { }
    init(property: String) {
        self.property = property
    }
}
let selectorForMethod = #selector(SomeClass.doSomething(_:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```

```swift
//  as 
// 方法名称可以包含用于分组的括号，也可以包含 as 操作符，以区分名称相同但类型签名不同的方法。例如
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
```
