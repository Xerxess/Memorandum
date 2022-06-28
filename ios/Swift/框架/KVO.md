<!-- TOC -->

- [KVO](#kvo)
- [Objective-C 中的 KVO](#objective-c-%E4%B8%AD%E7%9A%84-kvo)
- [Swift 中的 KVO](#swift-%E4%B8%AD%E7%9A%84-kvo)
- [KVO替代品](#kvo%E6%9B%BF%E4%BB%A3%E5%93%81)

<!-- /TOC -->

键值观察提供了一种机制，允许对象在其他对象的特定属性发生更改时得到通知。它对于应用程序中模型层和控制器层之间的通信特别有用。

https://developer.apple.com/documentation/objectivec/nsobject/nskeyvalueobserving

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i

# KVO

* 优势
    * 几行代码中的观察模式
* 缺点
    * 每个观察者都必须明确取消订阅deinit- 否则崩溃是不可避免的
    * 性能比较慢

# Objective-C 中的 KVO

```c++
// 添加监听
// observer - 接收更改通知的对象
// keyPath - 字符串参数，在最简单的情况下，它只是您要观察的属性的名称
// options - 允许自定义随通知传递的enum信息以及何时发送。
// context - 任意类的对象的引用，这有助于在某些复杂的用例中识别订阅，例如在使用 CoreData 时。在大多数其他情况下，您只需nil在此处提供。
- (void)addObserver:(NSObject *)observer 
         forKeyPath:(NSString *)keyPath
            options:(NSKeyValueObservingOptions)options
            context:(nullable void *)context;

// 处理通知
// keyPath - 与附加观察者时提供的字符串值相同,同时观察多个属性，因此该参数可用于区分一个属性的通知与另一个属性。
// object -  被观察的对象。由于我们可以观察到多个对象的变化，这个参数允许我们识别谁的属性发生了变化。
// change -  包含更改值信息的字典
// context - 订阅时提供的参考。再次，用于适当的观察识别，在大多数情况下可以忽略。
- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSKeyValueChangeKey,id> *)change
                       context:(void *)context
```

```c++
// Person
@interface Person: NSObject
 
@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) NSInteger age;
 
@end
```

```c++
// SomeOtherClass
@implementation SomeOtherClass

- (void)observeChanges:(Person *)person {
    [person addObserver:self
             forKeyPath:@"age"
                options:NSKeyValueObservingOptionNew
                context:nil];
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSKeyValueChangeKey,id> *)change
                       context:(void *)context {
    if ([keyPath isEqualToString:@"age"]) {
        NSNumber *ageNumber = change[NSKeyValueChangeNewKey];
        NSInteger age = [ageNumber integerValue];
        NSLog(@"New age is: %@", age);
    }
}

@end
```

# Swift 中的 KVO

* KVO 在 Swift 类中默认是禁用
* Swift 中使用的 Objective-C 类保持启用 KVO，但对于 Swift 类，我们需要将基类设置为并为变量NSObject添加属性：@objc dynamic
* dynamic 使用修饰符标记成员声明时dynamic，始终使用 Objective-C 运行时动态分派对该成员的访问。编译器永远不会内联或去虚拟化对该成员的访问。
* 两种 API 可用于 Key-Value Observing：旧的 API 来自 Objective-C，而新的 API 更灵活、安全且对 Swift 友好。

```swift
class Person: NSObject {
    @objc dynamic var age: Int
    @objc dynamic var name: String
}

class PersonObserver {
    var kvoToken: NSKeyValueObservation?
    
    func observe(person: Person) {
        // 回调监听
        kvoToken = person.observe(\.age, options: .new) { (person, change) in
            guard let age = change.new else { return }
            print("New age is: \(age)")
        }
    }
    
    deinit {
        // 该标记来停止观察
        kvoToken?.invalidate()
    }
}

// 旧api也可用
class PersonObserver2: NSObject {
    
    func observe(person: Person) {
        person.addObserver(self, forKeyPath: "age",
                           options: .new, context: nil)
    }
    
    override func observeValue(forKeyPath keyPath: String?,
                               of object: Any?,
                               change: [NSKeyValueChangeKey : Any]?,
                               context: UnsafeMutableRawPointer?) {
        if keyPath == "age",
           let age = change?[.newKey] {
             print("New age is: \(age)")
        }
    }
}
```


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