# Observation

https://developer.apple.com/documentation/observation/

* ios17
* Observation 为 Swift 中的观察者设计模式提供了健壮、类型安全且高性能的实现。此模式允许可观察对象维护观察者列表并通知他们特定或一般状态更改。这样做的优点是不直接将对象耦合在一起，并允许在潜在的多个观察者之间隐式分配更新。

```swift
// @Observable 宏为自定义类型添加了观察支持，并使该类型符合 Observable 协议
@Observable
class Car {
    var name: String = ""
    var needsRepairs: Bool = false
    
    init(name: String, needsRepairs: Bool = false) {
        self.name = name
        self.needsRepairs = needsRepairs
    }
}

func render() {
    // 此方法跟踪对 apply 闭包内任何属性的访问，并通过 onChange 闭包通知调用者对参与属性所做的值更改。
    withObservationTracking {
        for car in cars {
            print(car.name)
        }
    } onChange: {
        print("Schedule renderer.")
    }
}
```
