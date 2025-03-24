<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [StateObject](#stateobject)
  - [子视图共享状态对象](#子视图共享状态对象)
  - [外部数据初始化状态对象](#外部数据初始化状态对象)
- [示例代码](#示例代码)

<!-- /code_chunk_output -->

# StateObject

- 实例化 observable 对象的属性包装器类型
- 使用 state 对象作为存储在视图层次结构中的引用类型的单一事实来源。
- 通过将 @StateObject 属性应用于属性声明并提供符合 ObservableObject 协议的初始值
- 状态对象声明为private

```swift
@MainActor @frozen @propertyWrapper @preconcurrency
struct StateObject<ObjectType> where ObjectType : ObservableObject
```

```swift
class DataModel: ObservableObject {
    @Published var name = "Some Name"
    @Published var isEnabled = false
}

struct MyView: View {
    @StateObject private var model = DataModel() // Create the state object.
    var body: some View {
        Text(model.name) // Updates when the data model changes.
        MySubView()
            .environmentObject(model)
    }
}
```

## 子视图共享状态对象

```swift
struct MySubView: View {
    @EnvironmentObject var model: DataModel
    var body: some View {
        Toggle("Enabled", isOn: $model.isEnabled)
    }
}
```

## 外部数据初始化状态对象

```swift
struct MyInitializableView: View {
    @StateObject private var model: DataModel
    init(name: String) {
        _model = StateObject(wrappedValue: DataModel(name: name))
    }
    var body: some View {
        VStack {
            Text("Name: \(model.name)")
        }
    }
}
```

# 示例代码

```swift
// 计时器
class TimerManager: ObservableObject {
    @Published var count = 0
    private var timer: Timer?
    
    func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            self?.count += 1
        }
    }
    
    func stopTimer() {
        timer?.invalidate()
        timer = nil
    }
    
    deinit {
        stopTimer()
    }
}

struct TimerView: View {
    @StateObject private var timerManager = TimerManager()
    
    var body: some View {
        VStack {
            Text("计数: \(timerManager.count)")
                .font(.largeTitle)
            
            HStack {
                Button("开始") {
                    timerManager.startTimer()
                }
                
                Button("停止") {
                    timerManager.stopTimer()
                }
            }
        }
    }
}
```
