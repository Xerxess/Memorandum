<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Subjects](#subjects)
  - [CurrentValueSubject](#currentvaluesubject)
  - [PassthroughSubject](#passthroughsubject)

<!-- /code_chunk_output -->

# Subjects

- 向外部调用者公开发布元素的方法的发布者
- 通过调用其send(_:)方法将值“注入”到流中。这对于将现有的命令式代码适配到 Combine 模型非常有用

## CurrentValueSubject

在Combine框架中，CurrentValueSubject 是一种特殊类型的Subject，它不仅可以发送值给订阅者，还会保存最近发出的一个值，并在新订阅者订阅时立即向其发送该当前值。这使它成为维护状态并广播状态变化的理想选择。

- 保存并提供对当前值的访问
- 新订阅者立即接收当前值
- 可以通过.value属性直接读取和修改当前值
- 需要在初始化时提供一个初始值
- 可以发送完成事件或错误

使用场景:

- 状态管理：存储和广播UI或应用状态
- 缓存最新数据：保持对最新数据的访问
- 表单处理：管理和验证表单输入
- 初始值重要的场景：需要为新订阅者提供初始状态的情况
- 可观察属性：作为属性的响应式包装器

```swift
// 创建一个CurrentValueSubject，指定值类型和错误类型
let subject = CurrentValueSubject<Int, Never>(0)  // 初始值为0

// 通过send方法发送新值
subject.send(1)

// 直接访问或修改当前值
let currentValue = subject.value  // 获取当前值
subject.value = 2  // 修改当前值（等同于调用send(2)）

// 发送完成事件
subject.send(completion: .finished)
```

> 示例代码

```swift
// 表单验证
class FormViewModel {
    let username = CurrentValueSubject<String, Never>("")
    let password = CurrentValueSubject<String, Never>("")
    let isFormValid = CurrentValueSubject<Bool, Never>(false)
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        // 组合多个输入进行表单验证
        Publishers.CombineLatest(username, password)
            .map { username, password in
                return username.count >= 4 && password.count >= 8
            }
            .subscribe(isFormValid)
            .store(in: &cancellables)
    }
}

// 使用示例
let viewModel = FormViewModel()
viewModel.isFormValid.sink { isValid in
    print("表单是否有效: \(isValid)")
}

viewModel.username.send("user")
viewModel.password.send("pass")  // 输出: 表单是否有效: false
viewModel.password.send("password123")  // 输出: 表单是否有效: true
```

```swift
// 网络请求状态管理
enum LoadingState<T> {
    case idle
    case loading
    case success(T)
    case failure(Error)
}

class NetworkViewModel {
    let state = CurrentValueSubject<LoadingState<[User]>, Never>(.idle)
    private var cancellables = Set<AnyCancellable>()
    
    func fetchUsers() {
        state.send(.loading)
        
        URLSession.shared.dataTaskPublisher(for: URL(string: "https://api.example.com/users")!)
            .map { $0.data }
            .decode(type: [User].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(
                receiveCompletion: { [weak self] completion in
                    if case .failure(let error) = completion {
                        self?.state.send(.failure(error))
                    }
                },
                receiveValue: { [weak self] users in
                    self?.state.send(.success(users))
                }
            )
            .store(in: &cancellables)
    }
}
```

## PassthroughSubject

在Combine框架中，PassthroughSubject 是一种基本的 Subject 类型，它允许你手动向多个订阅者发送值。与 CurrentValueSubject 不同，PassthroughSubject 不存储当前值，它只是简单地将接收到的值传递给所有订阅者。

- 不存储任何值
- 新订阅者只会收到订阅后发出的值
- 可以手动发送值和完成事件
- 可以指定自定义错误类型
- 支持多个订阅者

使用场景:

- 事件传递: 在组件之间传递事件
- 用户输入处理: 处理按钮点击、文本输入等事件
- 异步操作通知: 通知异步操作的结果
- 自定义数据流: 需要手动控制数据发送的场景
- 事件总线: 实现应用范围的事件通知系统

```swift
// 创建一个PassthroughSubject，指定值类型和错误类型
let subject = PassthroughSubject<String, Never>()

// 发送值
subject.send("Hello")

// 发送完成事件
subject.send(completion: .finished)

// 发送错误
let errorSubject = PassthroughSubject<Int, Error>()
errorSubject.send(completion: .failure(MyError.someError))
```

> 示例代码

```swift
//  事件总线
enum AppEvent {
    case userLoggedIn(userId: String)
    case networkStatusChanged(isOnline: Bool)
    case newDataAvailable
}

class EventBus {
    static let shared = EventBus()
    let events = PassthroughSubject<AppEvent, Never>()
    
    private init() {}
}

// 使用示例
class LoginManager {
    private var cancellables = Set<AnyCancellable>()
    
    func login(username: String, password: String) {
        // 登录逻辑...
        let userId = "user123"
        // 通知系统用户已登录
        EventBus.shared.events.send(.userLoggedIn(userId: userId))
    }
}

class ProfileViewController {
    private var cancellables = Set<AnyCancellable>()
    
    func setupEventHandling() {
        EventBus.shared.events
            .filter { event in
                if case .userLoggedIn = event { return true }
                return false
            }
            .sink { [weak self] event in
                if case let .userLoggedIn(userId) = event {
                    self?.loadUserProfile(userId: userId)
                }
            }
            .store(in: &cancellables)
    }
    
    func loadUserProfile(userId: String) {
        print("加载用户资料: \(userId)")
    }
}
```

```swift
// 处理用户输入
class SearchViewController: UIViewController {
    @IBOutlet weak var searchField: UITextField!
    
    private let searchSubject = PassthroughSubject<String, Never>()
    private var cancellables = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 设置搜索文本字段
        searchField.addTarget(self, action: #selector(searchTextChanged), for: .editingChanged)
        
        // 处理搜索输入
        searchSubject
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .removeDuplicates()
            .filter { !$0.isEmpty }
            .sink { [weak self] searchText in
                self?.performSearch(query: searchText)
            }
            .store(in: &cancellables)
    }
    
    @objc private func searchTextChanged() {
        if let text = searchField.text {
            searchSubject.send(text)
        }
    }
    
    private func performSearch(query: String) {
        print("执行搜索: \(query)")
    }
}
```
