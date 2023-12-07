
# KVO

<https://developer.apple.com/documentation/objectivec/nsobject/nskeyvalueobserving>

<https://developer.apple.com/documentation/swift/using-key-value-observing-in-swift/>

一种非正式协议，对象采用该协议来通知其他对象的指定属性的更改

观察任何对象属性，包括简单属性、一对一关系和对多关系。多对多关系的观察者会获悉所做更改的类型以及更改涉及哪些对象。

NSObject 提供了NSKeyValueObserving协议的实现，为所有对象提供自动观察能力。您可以通过禁用自动观察者通知并使用本协议中的方法实现手动通知来进一步细化通知。

* 在使用 KVO 时，被观察的属性需要标记为 @objc dynamic，观察者对象需要继承自 NSObject，并且您需要实现 observeValue(forKeyPath:of:change:context:) 方法来处理属性变化。

# KVO替代品

* delegate
* NotificationCenter
* KVO
* Closure
* Target-Action
* Responder Chain
* Promise
* Event
* Stream of values

```swift
// 被观察对象的指定关键路径处的值发生变化时通知观察对象
// keyPath - 与附加观察者时提供的字符串值相同,同时观察多个属性，因此该参数可用于区分一个属性的通知与另一个属性。
// object -  被观察的对象。由于我们可以观察到多个对象的变化，这个参数允许我们识别谁的属性发生了变化。
// change -  包含更改值信息的字典
// context - 订阅时提供的参考。再次，用于适当的观察识别，在大多数情况下可以忽略。
func observeValue(
    forKeyPath keyPath: String?,
    of object: Any?,
    change: [NSKeyValueChangeKey : Any]?,
    context: UnsafeMutableRawPointer?
)

// 注册观察者对象以接收与接收此消息的对象相关的关键路径的 KVO 通知。
// 调用此方法的对象最终还必须调用 removeObserver(_:forKeyPath:) 或 removeObserver(_:forKeyPath:context:) 方法来在参与 KVO 时取消注册观察者
// observer - 接收更改通知的对象
// keyPath - 字符串参数，在最简单的情况下，它只是您要观察的属性的名称
// options - 允许自定义随通知传递的enum信息以及何时发送。
// context - 任意类的对象的引用，这有助于在某些复杂的用例中识别订阅，例如在使用 CoreData 时。在大多数其他情况下，您只需nil在此处提供。
func addObserver(
    _ observer: NSObject,
    forKeyPath keyPath: String,
    options: NSKeyValueObservingOptions = [],
    context: UnsafeMutableRawPointer?
)

// 阻止观察者对象接收由相对于接收此消息的对象的键路径指定的属性的更改通知。
func removeObserver(NSObject, forKeyPath: String)

// 在给定上下文的情况下，阻止观察者对象接收由相对于接收此消息的对象的键路径指定的属性的更改通知。
func removeObserver(NSObject, forKeyPath: String, context: UnsafeMutableRawPointer?)

// 通知观察对象给定属性的值即将更改。
func willChangeValue(forKey: String)

// 通知观察对象给定属性的值已更改。
func didChangeValue(forKey: String)

// 通知观察对象指定的更改即将在指定的有序对多关系的给定索引处执行。
func willChange(NSKeyValueChange, valuesAt: IndexSet, forKey: String)
func didChange(NSKeyValueChange, valuesAt: IndexSet, forKey: String)

// 通知观察对象即将对指定的无序对多关系进行指定的更改。
func willChangeValue(forKey: String, withSetMutation: NSKeyValueSetMutationKind, using: Set<AnyHashable>)
func didChangeValue(forKey: String, withSetMutation: NSKeyValueSetMutationKind, using: Set<AnyHashable>)
```

## swift 使用kvo

```swift
class MyObjectToObserve: NSObject {
    // 使用 @objc 属性和 dynamic 修饰符标记要通过键值观察来观察的属性。
    @objc dynamic var myDate = NSDate(timeIntervalSince1970: 0) // 1970
    func updateDate() {
        myDate = myDate.addingTimeInterval(Double(2 << 30)) // Adds about 68 years.
    }
}

class MyObserver: NSObject {
    @objc var objectToObserve: MyObjectToObserve
    var observation: NSKeyValueObservation?
    init(object: MyObjectToObserve) {
        objectToObserve = object
        super.init()
        // 调用 observe(_:options:changeHandler:) 方法来开始观察
        observation = observe(
            \.objectToObserve.myDate,
            options: [.old, .new]
        ) { object, change in
            print("myDate changed from: \(change.oldValue!), updated to: \(change.newValue!)")
        }
    }
}

// 将要观察的属性与其观察者关联起来
let observed = MyObjectToObserve()
let observer = MyObserver(object: observed)
```

另一个demo

```swift
import Foundation
class Person: NSObject {
    @objc dynamic var age: Int = 0
    @objc dynamic var name: String = ""
}
class PersonObserver {
    var kvoToken: NSKeyValueObservation?
    func observe(person: Person) {
        // 回调监听
        kvoToken = person.observe(\.age, options: [.old, .new]) { (person, change) in
            guard let age = change.oldValue else { return }
                      print("New age is: \(age)")
            guard let age = change.newValue else { return }
                                  print("New age is: \(age)")
        }
    }
    deinit {
        // 该标记来停止观察
        kvoToken?.invalidate()
    }
}
let p = Person()
let abc = PersonObserver()
abc.observe(person: p)
p.age = 11
p.age = 12


// 传统写法
class PersonObserver: NSObject {
    func observe(person: Person) {
        person.addObserver(self, forKeyPath: "age",
                           options: [.old,.new], context: nil)
    }
    override func observeValue(forKeyPath keyPath: String?,
                               of object: Any?,
                               change: [NSKeyValueChangeKey : Any]?,
                               context: UnsafeMutableRawPointer?) {
        if keyPath == "age",let age = change?[.oldKey] {
                print("New age is: \(age)")
        }
        if keyPath == "age",let age = change?[.newKey] {
                print("New age is: \(age)")
        }
    }
}
let p = Person()
let abc = PersonObserver()
abc.observe(person: p)
p.age = 11
p.age = 12
```
