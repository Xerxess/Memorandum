<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Subscribers](#subscribers)
- [sink](#sink)
- [assign](#assign)

<!-- /code_chunk_output -->

# Subscribers

# sink

- sink返回值应保留引用，否则流将被取消。
- 内存管理：sink 返回的 Cancellable 必须被强引用保存，否则订阅会被立即取消
- 取消订阅：调用 cancel() 方法或释放 Cancellable 对象可以取消订阅
- 闭包中的循环引用：在闭包中引用 self 时要注意可能的循环引用问题

> 语法与用法

```swift
// 用基于闭包的行为附加一个订阅者。
func sink(
    receiveCompletion: @escaping (Subscribers.Completion<Self.Failure>) -> Void,
    receiveValue: @escaping (Self.Output) -> Void
) -> AnyCancellable

// 将具有基于闭包行为的订阅者附加到永不失败的发布者
func sink(receiveValue: @escaping (Self.Output) -> Void) -> AnyCancellable
```

```swift
// 基本形式 - 处理值和完成事件
let cancellable = publisher.sink(
    receiveCompletion: { completion in
        // 处理完成事件（正常完成或错误）
    },
    receiveValue: { value in
        // 处理每个接收到的值
    }
)

// 简化形式 - 只处理值（适用于永不失败的发布者）
let cancellable = publisher.sink { value in
    // 处理每个接收到的值
}
```

```swift
let myRange = (0...3)
cancellable = myRange.publisher
    .sink(receiveCompletion: { print ("completion: \($0)") },
          receiveValue: { print ("value: \($0)") })
// Prints:
//  value: 0
//  value: 1
//  value: 2
//  value: 3
//  completion: finished
```

# assign

- 直接将发布者的值赋值给对象的键路径指定的属性
- 返回一个 Cancellable 对象，用于管理订阅的生命周期
- 不处理完成事件或错误（仅适用于不会失败的发布者）
- 可用于 UI 绑定和数据模型更新
- 只能用于不会失败的发布者：assign 不能处理错误，使用前需要确保发布者不会发出错误
- 内存管理：返回的 Cancellable 必须被保存，否则订阅会被立即取消
- 强引用问题：assign(to:on:) 会创建对目标对象的强引用，可能导致循环引用
- 新的引用语法：Swift 5.4 引入的 assign(to: &$property) 语法避免了强引用问题

```swift
// 将发布者的每个元素分配给对象的属性。
func assign<Root>(
    to keyPath: ReferenceWritableKeyPath<Root, Self.Output>,
    on object: Root
) -> AnyCancellable

// 通过将来自发布者的元素分配给标记为发布者的属性，重新发布这些元素。
func assign(to published: inout Published<Self.Output>.Publisher)
```

```swift
// 基本形式 - 赋值给对象的属性
let cancellable = publisher.assign(to: \.property, on: object)

// 使用 @Published 属性的版本
let cancellable = publisher.assign(to: &object.$property)
```

> 示例

```swift
class TemperatureViewModel {
    var temperature: Double = 0.0
}

let viewModel = TemperatureViewModel()
let temperaturePublisher = [24.5, 25.0, 25.5, 26.0].publisher
let cancellable = temperaturePublisher.assign(to: \.temperature, on: viewModel)
// 发布者发出的每个值都会自动更新 viewModel.temperature
```

```swift
// UI 绑定
class WeatherViewController: UIViewController {
    private var cancellables = Set<AnyCancellable>()
    
    @IBOutlet weak var temperatureLabel: UILabel!
    
    func bindViewModel() {
        viewModel.temperaturePublisher
            .map { "\($0)°C" }
            .assign(to: \.text, on: temperatureLabel)
            .store(in: &cancellables)
    }
}
```

```swift
// 使用 @Published 属性
class WeatherViewModel {
    @Published var temperature: Double = 0.0
    @Published var humidity: Double = 0.0
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        // 将湿度绑定为温度的函数
        $temperature
            .map { temp -> Double in
                // 假设湿度与温度有某种关系
                return max(0, min(100, temp * 2))
            }
            .assign(to: &$humidity)  // 使用引用绑定语法
            .store(in: &cancellables)
    }
}
```
