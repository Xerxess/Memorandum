<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Swift 实现动态化编程](#swift-实现动态化编程)
  - [第三方](#第三方)
    - [Runtime](#runtime)
  - [KVC](#kvc)
  - [Mirror 反射](#mirror-反射)
  - [设计模式 (修改 UIListContentConfiguration.ImageProperties)](#设计模式-修改-uilistcontentconfigurationimageproperties)
    - [枚举](#枚举)
    - [字典（Dictionary）](#字典dictionary)
    - [KeyPath](#keypath)
    - [属性包装器（Property Wrapper）](#属性包装器property-wrapper)
    - [协议和泛型](#协议和泛型)
    - [函数式方法](#函数式方法)
    - [Builder 模式](#builder-模式)
    - [策略模式](#策略模式)
    - [命令模式](#命令模式)
    - [响应式编程](#响应式编程)
    - [使用 Result Builder](#使用-result-builder)
  - [类似JavaScript中通过字符串key动态修改值](#类似javascript中通过字符串key动态修改值)
    - [使用字典（Dictionary）](#使用字典dictionary)
    - [使用@dynamicMemberLookup](#使用dynamicmemberlookup)
    - [结合KeyPath和反射](#结合keypath和反射)
      - [使用反射实现读写](#使用反射实现读写)
    - [使用Objective-C运行时（仅适用于NSObject子类）](#使用objective-c运行时仅适用于nsobject子类)
    - [自定义实现类似JavaScript对象的类](#自定义实现类似javascript对象的类)

<!-- /code_chunk_output -->

# Swift 实现动态化编程

- 由于 Swift 时编译型语言，不能像 javascript 运行时传递动态类型， swift 使用时需要明确数据类型，即可通过Any、as 、is 等手段
- 通过运行时 KVC
- 通过一些设计模式
- 第三方

## 第三方

### Runtime

- Runtime 是一个 Swift 库，可为您提供更多的运行时功能，包括获取类型元数据、通过反射设置属性以及原生 Swift 对象的类型构造。

<https://github.com/wickwirew/Runtime>

## KVC

- 只可用于 class
- KVC 是运行时特性，需要确保 key 名称正确
- 需要正确处理可选值
- 性能可能略低于直接访问
- 需要添加 @objc 支持

```swift

```

## Mirror 反射

- 只读操作，不可写
- 用于运行时反射，可以检查对象的属性和类型

```swift
let mirror = Mirror(reflecting: someObject)
for child in mirror.children {
    print("属性名：\(child.label ?? ""), 值：\(child.value)")
}
```

## 设计模式 (修改 UIListContentConfiguration.ImageProperties)

- 以下示例均为修改 UIListContentConfiguration.ImageProperties

### 枚举

- 这种方式更适用于类型数量固定且不需要扩展的场景。

```swift
enum ImagePropertyKeyPath<T> {
    case tintColor(WritableKeyPath<UIListContentConfiguration.ImageProperties, UIColor?>)
    case size(WritableKeyPath<UIListContentConfiguration.ImageProperties, CGSize>)
    
    func apply(to configuration: inout UIListContentConfiguration.ImageProperties, with item: UIKitPropertiesConfigurationModalViewController.Item) {
        guard let path = item.getKeyPath(self.path) else { return }
        
        switch self {
            case .tintColor:
                if let value: UIColor? = item.getKeyValue(UIColor.self) {
                    configuration[keyPath: path as! WritableKeyPath<UIListContentConfiguration.ImageProperties, UIColor?>] = value
                }
            case .size:
                if let value: CGSize = item.getKeyValue(CGSize.self) {
                    configuration[keyPath: path as! WritableKeyPath<UIListContentConfiguration.ImageProperties, CGSize>] = value
                }
        }
    }
}

func set(){
    if self.dataList.count > 0 {
        for item in self.dataList {
            SettingCustomizing.ImagePropertyKeyPath.allPaths.forEach { keyPath in
                keyPath.apply(to: &configuration.imageProperties, with: item)
            }
        }
    }   
}
```

### 字典（Dictionary）

- 用字符串作为 key 来存储和获取属性值

```swift
import UIKit

class Test:NSObject {
    // 使用字典存储属性路径和值
    let propertyConfigs: [String: Any] = [
        "tintColor": UIColor.red,
        "maximumSize": CGSize(width: 100, height: 100),
        "reservedLayoutSize": CGSize(width: 50, height: 50)
    ]
    
    func setConfiguration(){
        var configuration = UIListContentConfiguration.cell()
        
        // 应用配置
        for (key, value) in propertyConfigs {
            switch key {
                case "tintColor":
                    if let color = value as? UIColor {
                        configuration.imageProperties.tintColor = color
                    }
                case "maximumSize":
                    if let size = value as? CGSize {
                        configuration.imageProperties.maximumSize = size
                    }
                case "reservedLayoutSize":
                    if let size = value as? CGSize {
                        configuration.imageProperties.reservedLayoutSize = size
                    }
                default:
                    break
            }
        }
    }
}
```

### KeyPath

```swift
// 定义属性路径数组
let propertyPaths: [PartialKeyPath<UIListContentConfiguration.ImageProperties>] = [
    \.tintColor,
     \.maximumSize,
     \.reservedLayoutSize
]

// 使用类型擦除的包装器
struct PropertyConfig {
    let keyPath: AnyKeyPath
    let value: Any
    
    func apply(to configuration: inout UIListContentConfiguration.ImageProperties) {
        switch keyPath {
            case let path as WritableKeyPath<UIListContentConfiguration.ImageProperties, UIColor?>:
                configuration[keyPath: path] = value as? UIColor
            case let path as WritableKeyPath<UIListContentConfiguration.ImageProperties, CGSize>:
                configuration[keyPath: path] = value as! CGSize
            default:
                break
        }
    }
}

func set(){
    var configuration = UIListContentConfiguration.cell()
    
    // 使用示例
    let configs = [
        PropertyConfig(keyPath: \UIListContentConfiguration.ImageProperties.tintColor, value: UIColor.red),
        PropertyConfig(keyPath: \UIListContentConfiguration.ImageProperties.maximumSize, value: CGSize(width: 100, height: 100))
    ]
    
    configs.forEach { config in
        config.apply(to: &configuration.imageProperties)
    }
}

```

### 属性包装器（Property Wrapper）

```swift
@propertyWrapper
struct ConfigurationProperty<T> {
    var wrappedValue: T
    let keyPath: WritableKeyPath<UIListContentConfiguration.ImageProperties, T>
    
    func apply(to configuration: inout UIListContentConfiguration) {
        configuration.imageProperties[keyPath: keyPath] = wrappedValue
    }
}

class ImagePropertiesConfigurator {
    @ConfigurationProperty(keyPath: \.tintColor)
    var tintColor: UIColor? = .red
    
    @ConfigurationProperty(keyPath: \.maximumSize)
    var maximumSize: CGSize = CGSize(width: 100, height: 100)
    
    func apply(to configuration: inout UIListContentConfiguration) {
        // 使用 Mirror 反射获取所有属性
        Mirror(reflecting: self).children.forEach { child in
            if let property = child.value as? ConfigurationProperty<Any> {
                property.apply(to: &configuration)
            }
        }
    }
}

func set(){
    // 使用方式
    let configurator = ImagePropertiesConfigurator()
    var configuration = UIListContentConfiguration.cell()
    configurator.apply(to: &configuration)
}
```

### 协议和泛型

```swift
protocol PropertyConfigurable {
    associatedtype Value
    var keyPath: WritableKeyPath<UIListContentConfiguration.ImageProperties, Value> { get }
    var value: Value { get }
}

struct PropertyConfiguration<T>: PropertyConfigurable {
    let keyPath: WritableKeyPath<UIListContentConfiguration.ImageProperties, T>
    let value: T
}

// 使用方式
let configurations: [any PropertyConfigurable] = [
    PropertyConfiguration(keyPath: \.tintColor, value: UIColor.red),
    PropertyConfiguration(keyPath: \.maximumSize, value: CGSize(width: 100, height: 100))
]

func set(){
    var configuration = UIListContentConfiguration.cell()
    // 应用配置
    configurations.forEach { config in
        if let colorConfig = config as? PropertyConfiguration<UIColor?> {
            configuration.imageProperties[keyPath: colorConfig.keyPath] = colorConfig.value
        } else if let sizeConfig = config as? PropertyConfiguration<CGSize> {
            configuration.imageProperties[keyPath: sizeConfig.keyPath] = sizeConfig.value
        }
    }
}
```

### 函数式方法

```swift
typealias PropertyModifier = (inout UIListContentConfiguration.ImageProperties) -> Void

class ImagePropertiesBuilder {
    private var modifiers: [PropertyModifier] = []
    
    func with<T>(_ keyPath: WritableKeyPath<UIListContentConfiguration.ImageProperties, T>, value: T) -> Self {
        modifiers.append { properties in
            properties[keyPath: keyPath] = value
        }
        return self
    }
    
    func apply(to configuration: inout UIListContentConfiguration) {
        modifiers.forEach { modifier in
            modifier(&configuration.imageProperties)
        }
    }
}

// 使用方式
let builder = ImagePropertiesBuilder()
    .with(\.tintColor, value: UIColor.red)
    .with(\.maximumSize, value: CGSize(width: 100, height: 100))

func set(){
    var configuration = UIListContentConfiguration.cell()
    builder.apply(to: &configuration)
}
```

### Builder 模式

```swift
class ImagePropertiesBuilder {
    private var configuration: UIListContentConfiguration
    
    init(configuration: UIListContentConfiguration) {
        self.configuration = configuration
    }
    
    func setTintColor(_ color: UIColor?) -> Self {
        configuration.imageProperties.tintColor = color
        return self
    }
    
    func setMaximumSize(_ size: CGSize) -> Self {
        configuration.imageProperties.maximumSize = size
        return self
    }
    
    func setReservedLayoutSize(_ size: CGSize) -> Self {
        configuration.imageProperties.reservedLayoutSize = size
        return self
    }
    
    func build() -> UIListContentConfiguration {
        return configuration
    }
}

func set(){
    var configuration = UIListContentConfiguration.cell()
    // 使用示例
    let builder = ImagePropertiesBuilder(configuration: configuration)
        .setTintColor(.red)
        .setMaximumSize(CGSize(width: 100, height: 100))
    configuration = builder.build()
}
```

### 策略模式

```swift
protocol PropertyApplier {
    func apply(to configuration: inout UIListContentConfiguration)
}

struct ColorPropertyApplier: PropertyApplier {
    let color: UIColor?
    
    func apply(to configuration: inout UIListContentConfiguration) {
        configuration.imageProperties.tintColor = color
    }
}

struct SizePropertyApplier: PropertyApplier {
    let size: CGSize
    let keyPath: WritableKeyPath<UIListContentConfiguration.ImageProperties, CGSize>
    
    func apply(to configuration: inout UIListContentConfiguration) {
        configuration.imageProperties[keyPath: keyPath] = size
    }
}

// 使用示例
let appliers: [PropertyApplier] = [
    ColorPropertyApplier(color: .red),
    SizePropertyApplier(size: CGSize(width: 100, height: 100), keyPath: \.maximumSize)
]

func set(){
    var configuration = UIListContentConfiguration.cell()
    // 使用示例
    appliers.forEach { applier in
        applier.apply(to: &configuration)
    }
}
```

### 命令模式

```swift
protocol ConfigurationCommand {
    func execute(on configuration: inout UIListContentConfiguration)
    func undo(on configuration: inout UIListContentConfiguration)
}

class SetTintColorCommand: ConfigurationCommand {
    private let color: UIColor?
    private var previousColor: UIColor?
    
    init(color: UIColor?) {
        self.color = color
    }
    
    func execute(on configuration: inout UIListContentConfiguration) {
        previousColor = configuration.imageProperties.tintColor
        configuration.imageProperties.tintColor = color
    }
    
    func undo(on configuration: inout UIListContentConfiguration) {
        configuration.imageProperties.tintColor = previousColor
    }
}

// 使用示例
class ConfigurationCommandExecutor {
    private var commands: [ConfigurationCommand] = []
    
    func execute(_ command: ConfigurationCommand, on configuration: inout UIListContentConfiguration) {
        command.execute(on: &configuration)
        commands.append(command)
    }
    
    func undoLast(on configuration: inout UIListContentConfiguration) {
        guard let lastCommand = commands.popLast() else { return }
        lastCommand.undo(on: &configuration)
    }
}
```

### 响应式编程

```swift
class ReactiveConfiguration {
    private var configuration: UIListContentConfiguration
    private var subscribers: [(UIListContentConfiguration) -> Void] = []
    
    var tintColor: UIColor? {
        didSet {
            configuration.imageProperties.tintColor = tintColor
            notifySubscribers()
        }
    }
    
    var maximumSize: CGSize? {
        didSet {
            configuration.imageProperties.maximumSize = maximumSize!
            notifySubscribers()
        }
    }
    
    init(configuration: UIListContentConfiguration) {
        self.configuration = configuration
    }
    
    func subscribe(_ handler: @escaping (UIListContentConfiguration) -> Void) {
        subscribers.append(handler)
    }
    
    private func notifySubscribers() {
        subscribers.forEach { $0(configuration) }
    }
}

func set(){
    var configuration = UIListContentConfiguration.cell()
    // 使用示例
    let reactiveConfig = ReactiveConfiguration(configuration: configuration)
    reactiveConfig.subscribe { newConfiguration in
        configuration = newConfiguration
        // 更新UI
    }
    
    reactiveConfig.tintColor = .red
    reactiveConfig.maximumSize = CGSize(width: 100, height: 100)
}
```

### 使用 Result Builder

```swift
import UIKit

@resultBuilder
struct ConfigurationBuilder {
    static func buildBlock(_ components: PropertyModifier...) -> [PropertyModifier] {
        components
    }
}

typealias PropertyModifier = (inout UIListContentConfiguration.ImageProperties) -> Void

var configuration = UIListContentConfiguration.cell()
func applyConfiguration(@ConfigurationBuilder _ builder: () -> [PropertyModifier]) {
    var properties = configuration.imageProperties
    builder().forEach { modifier in
        modifier(&properties)
    }
    configuration.imageProperties = properties
}

func set(){
    // 使用方式
    let a = { (properties:inout UIListContentConfiguration.ImageProperties) in
        properties.tintColor = UIColor.red
    }
    let b = { (properties:inout UIListContentConfiguration.ImageProperties) in
        properties.cornerRadius = 10.0
    }
    applyConfiguration {
        a
        b
    }
    
    print(configuration.imageProperties)
}

set()

```

## 类似JavaScript中通过字符串key动态修改值

### 使用字典（Dictionary）

- 最简单直接的方法是使用字典，这与JavaScript对象的基本行为非常相似

```swift
var data: [String: Any] = ["name": "张三", "age": 30]

// 动态获取值
let name = data["name"] // 返回的是Optional类型
print(name as? String) // 输出: Optional("张三")

// 动态修改值
data["name"] = "李四"
data["address"] = "北京市"  // 添加新键值对
```

### 使用@dynamicMemberLookup

- 可以让您实现更接近JavaScript的点语法访问

```swift
@dynamicMemberLookup
struct DynamicObject {
    private var storage: [String: Any] = [:]
    
    subscript(dynamicMember key: String) -> Any? {
        get { return storage[key] }
        set { storage[key] = newValue }
    }
}

var person = DynamicObject()
person.name = "王五"    // 实际调用subscript(dynamicMember:)
person.age = 25
print(person.name)     // Optional("王五")
```

### 结合KeyPath和反射

```swift
struct User {
    var name: String
    var age: Int
}

func setValue<T>(_ object: inout T, key: String, value: Any) {
    let mirror = Mirror(reflecting: object)
    for child in mirror.children {
        if child.label == key {
            // 这里需要通过运行时反射技术修改值
            // 注意：Swift的纯反射API不直接支持修改值，这里简化了实现
            // 实际需要结合KeyPath或Objective-C运行时
        }
    }
}

// 使用KeyPath方式（仅适用于已知属性名的情况）
var user = User(name: "赵六", age: 40)
let nameKeyPath = \User.name
user[keyPath: nameKeyPath] = "钱七"
```

#### 使用反射实现读写

```swift
import Foundation

// 定义一个通用的动态属性访问器协议
protocol DynamicPropertyAccessible {
    mutating func setProperty(named: String, value: Any) -> Bool
}

// 为结构体实现协议扩展
extension DynamicPropertyAccessible {
    mutating func setProperty(named key: String, value: Any) -> Bool {
        var mirror = Mirror(reflecting: self)
        let properties = mirror.children.filter { $0.label == key }
        guard let property = properties.first else { return false }
        
        // 根据属性当前类型进行转换
        switch property.value {
            case is String:
                guard let stringValue = value as? String else { return false }
                return setTypedProperty(key: key, value: stringValue)
            case is Int:
                guard let intValue = value as? Int else { return false }
                return setTypedProperty(key: key, value: intValue)
            case is Double:
                guard let doubleValue = value as? Double else { return false }
                return setTypedProperty(key: key, value: doubleValue)
            case is Bool:
                guard let boolValue = value as? Bool else { return false }
                return setTypedProperty(key: key, value: boolValue)
            default:
                return false
        }
    }
    
    // 使用KeyPath设置特定类型的属性
    private mutating func setTypedProperty<V>(key: String, value: V) -> Bool {
        // 使用运行时动态创建KeyPath的方法（这在Swift中是有限制的）
        // 在实际应用中可能需要为每个类型注册可用的KeyPath
        
        // 这里是一个示例实现，仅作演示用途
        let result = Mirror(reflecting: self).children.contains { child in
            if child.label == key {
                // 在实际代码中，这里需要访问并修改属性
                // 由于Swift的限制，这种"真正的"动态性很难实现
                return true
            }
            return false
        }
        
        return result
    }
}

// 实现一个更通用的动态对象包装器
class DynamicAccessor<T> {
    private var object: T
    
    init(_ object: T) {
        self.object = object
    }
    
    // 通过反射获取属性值
    func getValue(_ key: String) -> Any? {
        let mirror = Mirror(reflecting: object)
        for child in mirror.children {
            if child.label == key {
                return child.value
            }
        }
        return nil
    }
    
    // 修改属性值（如果对象支持）
    @discardableResult
    func setValue(_ key: String, value: Any) -> Bool {
        // 对于遵循DynamicPropertyAccessible协议的对象
        if var dynamicObject = object as? DynamicPropertyAccessible {
            let success = dynamicObject.setProperty(named: key, value: value)
            if success {
                // 更新存储的对象
                if let updatedObject = dynamicObject as? T {
                    object = updatedObject
                    return true
                }
            }
        }
        
        // 对于NSObject子类的特殊处理
        if var nsObject = object as? NSObject {
            nsObject.setValue(value, forKey: key)
            object = nsObject as! T
            return true
        }
        
        return false
    }
    
    // 获取当前对象
    func getObject() -> T {
        return object
    }
    
    // 获取所有属性
    func getAllProperties() -> [String: Any] {
        var properties: [String: Any] = [:]
        let mirror = Mirror(reflecting: object)
        
        for child in mirror.children {
            if let key = child.label {
                properties[key] = child.value
            }
        }
        
        return properties
    }
}

// 示例使用：
// 1. 定义一个可动态访问的结构体
struct User: DynamicPropertyAccessible {
    var name: String
    var age: Int
    var email: String
    
    // 手动实现属性设置
    mutating func setProperty(named key: String, value: Any) -> Bool {
        switch (key, value) {
            case ("name", let stringValue as String):
                self.name = stringValue
            case ("age", let intValue as Int):
                self.age = intValue
            case ("email", let stringValue as String):
                self.email = stringValue
            default:
                return false
        }
        return true
    }
}

({
    // 2. 示例使用
    var user = User(name: "张三", age: 30, email: "zhang@example.com")
    let accessor = DynamicAccessor(user)
    
    // 获取属性
    print(accessor.getValue("name") as Any)  // 输出：Optional("张三")
    
    // 设置属性
    accessor.setValue("name", value: "李四")
    accessor.setValue("age", value: 35)
    
    // 获取更新后的对象
    let updatedUser = accessor.getObject()
    print(updatedUser)  // 输出更新后的User对象
}())

```

### 使用Objective-C运行时（仅适用于NSObject子类）

```swift
class DynamicPerson: NSObject {
    @objc var name: String = ""
    @objc var age: Int = 0
}

let person = DynamicPerson()

// 动态设置值
let nameKey = "name"
person.setValue("孙八", forKey: nameKey)

// 动态获取值
if let name = person.value(forKey: nameKey) as? String {
    print(name) // 输出: 孙八
}
```

### 自定义实现类似JavaScript对象的类

```swift
class JSObject {
    private var properties: [String: Any] = [:]
    
    subscript(key: String) -> Any? {
        get { return properties[key] }
        set { properties[key] = newValue }
    }
    
    func hasProperty(_ key: String) -> Bool {
        return properties.keys.contains(key)
    }
    
    func deleteProperty(_ key: String) {
        properties.removeValue(forKey: key)
    }
}

let jsLikeObject = JSObject()
jsLikeObject["firstName"] = "张"
jsLikeObject["lastName"] = "三"
```
