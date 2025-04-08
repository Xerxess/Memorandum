<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [类型擦除（Type Erasure）](#类型擦除type-erasure)
  - [Protocols as Types 协议作为类型](#protocols-as-types-协议作为类型)
    - [Boxed Protocol Types 盒装协议类型](#boxed-protocol-types-盒装协议类型)
    - [协议类型的集合](#协议类型的集合)
  - [基本类型擦除](#基本类型擦除)
  - [带关联类型的类型擦除](#带关联类型的类型擦除)
  - [集合类型擦除](#集合类型擦除)
  - [带泛型约束的类型擦除](#带泛型约束的类型擦除)
- [any Container(盒装协议类型) 与类型擦除的区别](#any-container盒装协议类型-与类型擦除的区别)
  - [主要区别](#主要区别)
- [场景示例](#场景示例)
  - [处理带关联类型的协议](#处理带关联类型的协议)
  - [使用类和 Box 模式的类型擦除](#使用类和-box-模式的类型擦除)
  - [使用类型擦除解决集合协议问题](#使用类型擦除解决集合协议问题)
  - [简化API设计](#简化api设计)
  - [集合中存储不同类型的对象](#集合中存储不同类型的对象)
  - [依赖注入](#依赖注入)

<!-- /code_chunk_output -->

# 类型擦除（Type Erasure）

- 类型擦除是一种技术，用于隐藏具体类型的信息，使得不同的具体类型可以统一处理，通常用于协议类型。
- 类型擦除是一种设计模式，用于隐藏具体类型的实现细节，使代码更加灵活和可复用。
- 需要处理复杂的泛型类型
- 需要存储不同类型但遵循相同协议的对象
- 需要简化 API 接口

## Protocols as Types 协议作为类型

- 协议本身实际上并不实现任何功能，可以在代码中使用协议作为类型。
- 协议用作类型的最常见方法是使用协议作为泛型约束
- Collections of Protocol Types 协议类型的集合
  - 协议可以用作存储在集合（如数组或字典）中的类型

### Boxed Protocol Types 盒装协议类型

- 盒装协议类型是允许不同类型的形状混合在一起的唯一方法
- 具有关联类型的协议不能用作返回类型

> 允许不同类型的形状混合在一起

```swift
// 允许不同类型的形状混合在一起
protocol Shape {
    func draw() -> String
}

struct Triangle: Shape {
    var size: Int
    func draw() -> String {
       var result: [String] = []
       for length in 1...size {
           result.append(String(repeating: "*", count: length))
       }
       return result.joined(separator: "\n")
    }
}

struct Square: Shape {
    var size: Int
    func draw() -> String {
       var result: [String] = []
       for length in 1...size {
           result.append(String(repeating: "*", count: length))
       }
       return result.joined(separator: "\n")
    }
}

struct VerticalShapes: Shape {
    var shapes: [any Shape]
    func draw() -> String {
        return shapes.map { $0.draw() }.joined(separator: "\n\n")
    }
}

let largeTriangle = Triangle(size: 5)
let largeSquare = Square(size: 5)
let vertical = VerticalShapes(shapes: [largeTriangle, largeSquare])
print(vertical.draw())
```

> 具有关联类型的协议不能用作返回类型

```swift
// 具有关联类型的协议不能用作返回类型
protocol Container {
    associatedtype Item
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
extension Array: Container { }

// 错误：具有关联类型的协议不能用作返回类型。
func makeProtocolContainer<T>(item: T) -> Container {
    return [item]
}

// 错误：具有关联类型的协议不能用作返回类型。
func makeProtocolContainer<T, C: Container>(item: T) -> C {
    return [item]
}
```

### 协议类型的集合

```swift
let things: [TextRepresentable] = [game, d12, simonTheHamster]
for thing in things {
    print(thing.textualDescription)
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

## 基本类型擦除

```swift
// 原始协议
protocol Drawable {
    func draw()
}

// 具体类型
struct Circle: Drawable {
    func draw() { print("画圆") }
}

// 类型擦除包装器
class AnyDrawable {
    private let _draw: () -> Void
    
    init<D: Drawable>(_ drawable: D) {
        self._draw = drawable.draw
    }
    
    func draw() {
        _draw()
    }
}
```

## 带关联类型的类型擦除

```swift
// 带关联类型的协议
protocol DataProvider {
    associatedtype DataType
    func getData() -> DataType
}

// 类型擦除包装器
class AnyDataProvider<T> {
    private let _getData: () -> T

    init<P: DataProvider>(_ provider: P) where P.DataType == T {
        _getData = provider.getData
    }

    func getData() -> T {
        return _getData()
    }
}
```

## 集合类型擦除

```swift
// 容器协议
protocol Container {
    associatedtype Element
    var count: Int { get }
    func append(_ element: Element)
    func element(at index: Int) -> Element?
}

// 类型擦除容器
class AnyContainer<T> {
    private let _count: () -> Int
    private let _append: (T) -> Void
    private let _element: (Int) -> T?
    
    init<C: Container>(_ container: C) where C.Element == T {
        _count = { container.count }
        _append = container.append
        _element = container.element(at:)
    }
}
```

## 带泛型约束的类型擦除

```swift
// 带约束的协议
protocol NumberProcessor {
    associatedtype Number: Numeric
    func process(_ number: Number) -> Number
}

// 类型擦除包装器
class AnyNumberProcessor<T: Numeric> {
    private let _process: (T) -> T
    
    init<P: NumberProcessor>(_ processor: P) where P.Number == T {
        self._process = processor.process
    }
    
    func process(_ number: T) -> T {
        return _process(number)
    }
}
```

# any Container(盒装协议类型) 与类型擦除的区别

- any Container 是 Swift 5.7 引入的新语法
- 传统的类型擦除是一种设计模式

## 主要区别

1. 语法简洁性 ：
   - any Container 语法更简洁
   - 传统类型擦除需要创建包装类
2. 类型信息 ：
   - any Container 在编译时丢失关联类型信息，但运行时保留，需要类型转换才能使用返回值
   - 传统类型擦除在编译时保留泛型参数类型信息
3. 使用场景 ：
   - any Container 适合简单场景，特别是只需要调用不依赖关联类型的方法
   - 传统类型擦除适合需要保留类型信息的复杂场景
4. 性能 ：
   - 传统类型擦除通常性能更好，因为避免了运行时类型检查

```swift
import Foundation

// 定义带关联类型的协议
protocol Container {
    associatedtype Item
    var count: Int { get }
    func get(at index: Int) -> Item?
}

// 具体实现
struct IntContainer: Container {
    typealias Item = Int
    private var items: [Int] = [1, 2, 3]
    
    var count: Int { return items.count }
    
    func get(at index: Int) -> Int? {
        guard index < items.count else { return nil }
        return items[index]
    }
}

struct StringContainer: Container {
    typealias Item = String
    private var items: [String] = ["Hello", "World"]
    
    var count: Int { return items.count }
    
    func get(at index: Int) -> String? {
        guard index < items.count else { return nil }
        return items[index]
    }
}

// 方式一：使用 any Container (Swift 5.7+)
func useAnyContainer() {
    let intContainer = IntContainer()
    let stringContainer = StringContainer()
    
    // 可以直接存储不同类型的容器
    let containers: [any Container] = [intContainer, stringContainer]
    
    for container in containers {
        print("容器元素数量: \(container.count)")
        if let item = container.get(at: 0) {
            // 注意：编译器不知道 item 的具体类型，需要运行时判断
            print("类型: \(type(of: item)), 值: \(item)")
        }
    }
}

// 方式二：传统类型擦除
class AnyContainer<T> {
    private let _count: () -> Int
    private let _get: (Int) -> T?

    init<C: Container>(_ container: C) where C.Item == T {
        _count = { container.count }
        _get = { container.get(at: $0) }
    }
    
    var count: Int { return _count() }
    
    func get(at index: Int) -> T? {
        return _get(index)
    }
}

func useTypeErasure() {
    let intContainer = AnyContainer(IntContainer())
    let stringContainer = AnyContainer(StringContainer())
    
    // 需要分开存储不同类型的容器
    let intContainers: [AnyContainer<Int>] = [intContainer]
    let stringContainers: [AnyContainer<String>] = [stringContainer]
    
    for container in intContainers {
        if let item = container.get(at: 0) {
            // 编译器知道 item 是 Int 类型
            print("整数: \(item)")
        }
    }
    
    for container in stringContainers {
        if let item = container.get(at: 0) {
            // 编译器知道 item 是 String 类型
            print("字符串: \(item)")
        }
    }
}

// 测试
print("使用 any Container:")
useAnyContainer()

print("\n使用类型擦除:")
useTypeErasure()
```

# 场景示例

> 基本类型擦除示例

```swift
protocol Animal {
    func makeSound()
}

struct Dog: Animal {
    func makeSound() {
        print("Bark!")
    }
}

struct Cat: Animal {
    func makeSound() {
        print("Meow!")
    }
}

let animals: [Animal] = [Dog(),Cat()]
for animal in animals {
    animal.makeSound()  
    // 输出 "Bark!" 和 "Meow!"
}
```

> 基本类型擦除示例

```swift
// 定义一个协议
protocol Drawable {
    func draw()
}

// 具体类型
struct Circle: Drawable {
    func draw() {
        print("Drawing a circle")
    }
}

struct Square: Drawable {
    func draw() {
        print("Drawing a square")
    }
}

// 类型擦除包装器
struct AnyDrawable {
    private let _draw: () -> Void
    
    init<T: Drawable>(_ drawable: T) {
        _draw = drawable.draw
    }
    
    func draw() {
        _draw()
    }
}

// 使用
let shapes: [AnyDrawable] = [
    AnyDrawable(Circle()),
    AnyDrawable(Square())
]

for shape in shapes {
    shape.draw()
}
```

> 带关联类型的协议

```swift
// 带关联类型的协议
protocol Producer {
    associatedtype Output
    func produce() -> Output
}

// 具体类型
struct IntProducer: Producer {
    typealias Output = Int
    func produce() -> Int {
        return 42
    }
}

struct StringProducer: Producer {
    typealias Output = String
    func produce() -> String {
        return "Hello"
    }
}

// 类型擦除包装器
struct AnyProducer<T> {
    private let _produce: () -> T
    
    init<P: Producer>(_ producer: P) where P.Output == T {
        _produce = producer.produce
    }
    
    func produce() -> T {
        return _produce()
    }
}

// 使用
let intProducer = AnyProducer(IntProducer())
let stringProducer = AnyProducer(StringProducer())

print(intProducer.produce()) // 输出: 42
print(stringProducer.produce()) // 输出: Hello
```

## 处理带关联类型的协议

- 与分开普通编写的区别是能够以统一的方式处理不同实际类型的DataProvider实现。在示例中：
  - NetworkDataProvider返回[String: Any]类型
  - LocalDataProvider返回[String]类型
- 隐藏实现细节 AnyDataProvider隐藏了具体的实现类型，调用者只需要知道它会返回什么类型的数据(T)，而不需要知道底层的提供者类型。
- 解决协议关联类型的限制

```swift
import Foundation

// 带关联类型的协议
protocol DataProvider {
    associatedtype DataType
    func fetchData() -> DataType
}

// 具体实现
struct NetworkDataProvider: DataProvider {
    typealias DataType = [String: Any]
    
    func fetchData() -> [String: Any] {
        return ["source": "network", "data": ["user": "张三"]]
    }
}

struct LocalDataProvider: DataProvider {
    typealias DataType = [String]
    
    func fetchData() -> [String] {
        return ["本地数据1", "本地数据2"]
    }
}

// 类型擦除包装器
class AnyDataProvider<T> {
    private let _fetchData: () -> T
    
    init<P: DataProvider>(_ provider: P) where P.DataType == T {
        _fetchData = provider.fetchData
    }
    
    func fetchData() -> T {
        return _fetchData()
    }
}

// 使用示例
func testDataProvider() {
    let networkProvider = AnyDataProvider(NetworkDataProvider())
    let localProvider = AnyDataProvider(LocalDataProvider())
    
    let networkData = networkProvider.fetchData()
    let localData = localProvider.fetchData()
    
    print("网络数据: \(networkData)")
    print("本地数据: \(localData)")
}

testDataProvider()
```

## 使用类和 Box 模式的类型擦除

```swift
protocol DataProvider {
    associatedtype Data
    func fetchData() -> Data
}

// 类型擦除的核心实现
class AnyDataProviderBox<T> {
    func fetchData() -> T {
        fatalError("This method must be overridden")
    }
}

class DataProviderBox<Provider: DataProvider>: AnyDataProviderBox<Provider.Data> {
    private let provider: Provider
    
    init(_ provider: Provider) {
        self.provider = provider
    }
    
    override func fetchData() -> Provider.Data {
        return provider.fetchData()
    }
}

// 类型擦除包装器
class AnyDataProvider<T> {
    private let box: AnyDataProviderBox<T>
    
    init<P: DataProvider>(_ provider: P) where P.Data == T {
        self.box = DataProviderBox(provider)
    }
    
    func fetchData() -> T {
        return box.fetchData()
    }
}

// 具体实现
struct NetworkDataProvider: DataProvider {
    typealias Data = [String: Any]
    
    func fetchData() -> [String: Any] {
        // 模拟网络请求
        return ["status": "success", "data": ["name": "John"]]
    }
}

struct LocalDataProvider: DataProvider {
    typealias Data = [String: Any]
    
    func fetchData() -> [String: Any] {
        // 从本地获取数据
        return ["cached": true, "data": ["name": "Alice"]]
    }
}

// 使用
let providers: [AnyDataProvider<[String: Any]>] = [
    AnyDataProvider(NetworkDataProvider()),
    AnyDataProvider(LocalDataProvider())
]

for provider in providers {
    print(provider.fetchData())
}

```

## 使用类型擦除解决集合协议问题

```swift
// 集合协议扩展
protocol Animation {
    func animate()
}

struct FadeAnimation: Animation {
    func animate() {
        print("Fading animation")
    }
}

struct SlideAnimation: Animation {
    func animate() {
        print("Sliding animation")
    }
}

// 自定义序列类型，无法直接存储不同类型的 Animation 对象
struct AnimationSequence<T: Animation> {
    private var animations: [T]
    
    init(_ animations: [T]) {
        self.animations = animations
    }
    
    func playAll() {
        for animation in animations {
            animation.animate()
        }
    }
}

// 类型擦除解决方案
struct AnyAnimation {
    private let _animate: () -> Void
    
    init<T: Animation>(_ animation: T) {
        _animate = animation.animate
    }
    
    func animate() {
        _animate()
    }
}

// 现在可以混合不同类型
let mixedAnimations = [
    AnyAnimation(FadeAnimation()),
    AnyAnimation(SlideAnimation()),
    AnyAnimation(FadeAnimation())
]

// 使用any
let mixedAnimations2:[any Animation] = [FadeAnimation(),SlideAnimation(),FadeAnimation()]

for animation in mixedAnimations {
    animation.animate()
}

for animation in mixedAnimations2 {
    animation.animate()
}

// Error: Cannot convert value of type 'SlideAnimation' to expected element type 'FadeAnimation'
AnimationSequence([FadeAnimation(),SlideAnimation(),FadeAnimation()])
```

## 简化API设计

```swift
import Foundation

// 复杂的协议
protocol ImageProcessing {
    associatedtype InputType
    associatedtype OutputType
    
    func process(_ input: InputType) -> OutputType
}

// 具体实现
struct GrayscaleFilter: ImageProcessing {
    typealias InputType = UIImage
    typealias OutputType = UIImage
    
    func process(_ input: UIImage) -> UIImage {
        // 实际处理逻辑
        return input
    }
}

struct BlurFilter: ImageProcessing {
    typealias InputType = UIImage
    typealias OutputType = UIImage
    
    func process(_ input: UIImage) -> UIImage {
        // 实际处理逻辑
        return input
    }
}

// 类型擦除包装器
class AnyImageProcessor<I, O> {
    private let _process: (I) -> O
    
    init<P: ImageProcessing>(_ processor: P) where P.InputType == I, P.OutputType == O {
        _process = processor.process
    }
    
    func process(_ input: I) -> O {
        return _process(input)
    }
}

// 简化的API
class ImageProcessor {
    // 不需要泛型参数的简洁API
    func applyFilter(to image: UIImage, using processor: AnyImageProcessor<UIImage, UIImage>) -> UIImage {
        return processor.process(image)
    }
}

// 使用示例
func processImage() {
    let image = UIImage()
    let processor = ImageProcessor()
    
    let grayscale = AnyImageProcessor(GrayscaleFilter())
    let blur = AnyImageProcessor(BlurFilter())
    
    let result1 = processor.applyFilter(to: image, using: grayscale)
    let result2 = processor.applyFilter(to: image, using: blur)
}
```

## 集合中存储不同类型的对象

```swift
import Foundation

// 带Self要求的协议
protocol Equatable {
    func isEqual(to: Self) -> Bool
}

// 具体实现
struct User: Equatable {
    let id: Int
    let name: String
    
    func isEqual(to other: User) -> Bool {
        return id == other.id
    }
}

struct Product: Equatable {
    let code: String
    let price: Double
    
    func isEqual(to other: Product) -> Bool {
        return code == other.code
    }
}

// 类型擦除包装器
class AnyEquatable {
    private let _isEqual: (AnyEquatable) -> Bool
    private let _value: Any
    
    init<E: Equatable>(_ value: E) {
        self._value = value
        self._isEqual = { other in
            guard let otherValue = other._value as? E else { return false }
            return value.isEqual(to: otherValue)
        }
    }
    
    func isEqual(to other: AnyEquatable) -> Bool {
        return _isEqual(other)
    }
    
    var value: Any {
        return _value
    }
}

// 使用示例
func testCollection() {
    let user1 = User(id: 1, name: "张三")
    let user2 = User(id: 2, name: "李四")
    let product = Product(code: "P001", price: 99.9)
    
    // 可以在同一个数组中存储不同类型的对象
    let items: [AnyEquatable] = [
        AnyEquatable(user1),
        AnyEquatable(user2),
        AnyEquatable(product)
    ]
    
    // 使用类型擦除的对象
    for item in items {
        if let user = item.value as? User {
            print("用户: \(user.name)")
        } else if let product = item.value as? Product {
            print("产品: \(product.code), 价格: \(product.price)")
        }
    }
    
    // 可以在同一个数组中存储不同类型的对象
    let items2: [any Equatable] = [
        user1,
        user2,
        product
    ]

    // 使用类型擦除的对象
    for item in items2 {
        switch item {
        case let user as User:
            print("用户: \(user.name)") 
            break
        case let product as Product:
            print("产品: \(product.code), 价格:\(product.price)") 
            break
        default:
            <#code#> 
        }
    }
}

testCollection()

```

## 依赖注入

```swift
import Foundation
import Dispatch
import PlaygroundSupport
PlaygroundPage.current.needsIndefiniteExecution = true

// 带关联类型的服务协议
protocol NetworkService {
    associatedtype Response
    func fetch(from url: URL) async throws -> Response
}

// 具体实现
class JSONNetworkService: NetworkService {
    typealias Response = [String: Any]
    
    func fetch(from url: URL) async throws -> [String: Any] {
        // 实际网络请求逻辑
        return ["status": "success", "data": ["name": "张三"]]
    }
}

class XMLNetworkService: NetworkService {
    typealias Response = String
    
    func fetch(from url: URL) async throws -> String {
        // 实际网络请求逻辑
        return "<response><status>success</status></response>"
    }
}

// 类型擦除包装器
class AnyNetworkService<R> {
    private let _fetch: (URL) async throws -> R
    
    init<S: NetworkService>(_ service: S) where S.Response == R {
        _fetch = service.fetch
    }
    
    func fetch(from url: URL) async throws -> R {
        return try await _fetch(url)
    }
}

// 使用依赖注入的视图模型
class UserViewModel<T> {
    private let networkService: AnyNetworkService<T>
    
    // 依赖注入
    init(networkService: AnyNetworkService<T>) {
        self.networkService = networkService
    }
    
    func fetchUserData() async throws -> T
     {
        let url = URL(string: "https://api.example.com/users")!
        return try await networkService.fetch(from: url)
    }
}

// 使用示例
func testDependencyInjection() async {
    // 创建服务
    let jsonService = JSONNetworkService()
    let jsonService2 = XMLNetworkService()
    
    // 使用类型擦除包装
    let anyService = AnyNetworkService(jsonService)
    let anyService2 = AnyNetworkService(jsonService2)
    
    // 依赖注入
    let viewModel = UserViewModel(networkService: anyService)
    let viewModel2 = UserViewModel(networkService: anyService2)
    do {
        let userData = try await [viewModel.fetchUserData(),viewModel2.fetchUserData()] as [Any]
        print("用户数据: \(userData[0])")
        print("用户数据: \(userData[1])")
    } catch {
        print("获取数据失败: \(error)")
    }
}

Task {
    await testDependencyInjection()
}

```
