
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Method Swizzling in Swift](#method-swizzling-in-swift)

<!-- /code_chunk_output -->

# Method Swizzling in Swift

https://nshipster.com/method-swizzling/

Method swizzling 就是在运行时改变方法的实现

方法调配 (Method swizzling) 是指在运行时更改现有选择器实现的过程。简单来说，我们可以在运行时更改方法的功能。这可以通过 Objective-C 运行时的强大功能实现。

要在Swift自定义类中使用method swizzling有两个必要条件:

- 包含swizzle方法的类，需继承自NSObject
- 需要swizzle的方法必须有动态属性dynamic

```swift
class Father: NSObject {
    @objc dynamic func makeMoney() {
        print("make money")
    }
}

extension Father {

    static func swizzle() {
        let originSelector = #selector(Father.makeMoney)
        let swizzleSelector = #selector(Father.swizzle_makeMoney)
        let originMethod = class_getInstanceMethod(Father.self, originSelector)
        let swizzleMethod = class_getInstanceMethod(Father.self, swizzleSelector)
        method_exchangeImplementations(originMethod!, swizzleMethod!)
    }

    @objc func swizzle_makeMoney() {
        print("have a rest and make money")
    }
}

Father.swizzle()
var tmp = Father()
tmp.makeMoney() //  have a rest and make money
tmp.swizzle_makeMoney() // make money

```

```swift
class Father {
   dynamic func makeMoney() {
       print("make money")
   }
}
extension Father {
   @_dynamicReplacement(for: makeMoney())
   func swizzle_makeMoney() {
       print("have a rest and make money")
   }
}
Father().makeMoney() // have a rest and make money
```