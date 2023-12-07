
# KVC

<https://developer.apple.com/documentation/objectivec/nsobject/nskeyvaluecoding>

通过名称或键间接访问对象属性的机制

* KVC 是建立在 Objective-C 运行时之上的，因此要使用 KVC，对象需要继承自 NSObject 类或其子类。
* 在 Swift 中，如果您想使用 KVC，可以将对象声明为 @objc，并且属性或方法也需要符合 Objective-C 的要求。

```swift
// 返回由给定键标识的属性的值
func value(forKey key: String) -> Any?

// 返回由给定键路径标识的派生属性的值
// “department.name” or “department.manager.lastName”
func value(forKeyPath keyPath: String) -> Any?

// 返回一个字典，其中包含由给定数组中的每个键标识的属性值
func dictionaryWithValues(forKeys keys: [String]) -> [String : Any]

// 使用 KVC 访问未定义的属性或键时提供自定义的处理逻辑。这使得您可以控制在访问未定义属性时返回什么值或执行什么操作，以适应您的需求。
// 子类可以重写此方法以返回未定义键的替代值。默认实现会引发 NSUndefinedKeyException 。
func value(forUndefinedKey key: String) -> Any?

// 返回一个可变数组代理，该代理提供对给定键指定的有序对多关系的读写访问
func mutableArrayValue(forKey key: String) -> NSMutableArray

// 返回一个可变数组，该数组提供对给定键路径指定的有序对多关系的读写访问。
func mutableArrayValue(forKeyPath: String) -> NSMutableArray

// 返回一个可变集代理，该代理提供对给定键指定的无序对多关系的读写访问。
func mutableSetValue(forKey: String) -> NSMutableSet

// 返回一个可变集，该集提供对给定键路径指定的无序对多关系的读写访问。
func mutableSetValue(forKeyPath: String) -> NSMutableSet

// 将给定键指定的接收器的属性设置为给定值。
func setValue(Any?, forKey: String)

// 将给定键路径标识的属性的值设置为给定值。
func setValue(Any?, forKeyPath: String)

// 使用给定字典中的值设置接收器的属性，并使用其键来标识属性。
func setValuesForKeys([String : Any])
```
