<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UIKit中使用SwiftUI](#uikit中使用swiftui)
  - [使用 UIHostingController](#使用-uihostingcontroller)
  - [在 UIKit 中展示 SwiftUI 视图的简便方法](#在-uikit-中展示-swiftui-视图的简便方法)
  - [在 UITableViewCell 或 UICollectionViewCell 中使用 SwiftUI](#在-uitableviewcell-或-uicollectionviewcell-中使用-swiftui)
  - [高级集成 - 数据双向绑定 (数据传递与通信)](#高级集成---数据双向绑定-数据传递与通信)

<!-- /code_chunk_output -->

# UIKit中使用SwiftUI

- 何时在UIKit中使用SwiftUI
    1. 快速构建现代UI
    2. 利用SwiftUI的声明式语法
    3. 需要复杂的动画效果
    4. 数据绑定更简单

## 使用 UIHostingController

https://developer.apple.com/documentation/swiftui/uihostingcontroller

UIHostingController，它是一个 UIViewController 子类，可以承载 SwiftUI 视图

```swift
// 创建 SwiftUI 视图
let swiftUIView = Text("Hello from SwiftUI")
    .font(.largeTitle)
    .padding()
    .background(Color.yellow)

// 创建 UIHostingController 来承载 SwiftUI 视图
let hostingController = UIHostingController(rootView: swiftUIView)

// 添加为子视图控制器
addChild(hostingController)
view.addSubview(hostingController.view)
hostingController.didMove(toParent: self)

// 设置布局约束
hostingController.view.translatesAutoresizingMaskIntoConstraints = false
NSLayoutConstraint.activate([
    hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
    hostingController.view.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
    hostingController.view.heightAnchor.constraint(equalToConstant: 200)
])
```

## 在 UIKit 中展示 SwiftUI 视图的简便方法

```swift
extension UIViewController {
    func addSwiftUIView<Content: View>(_ swiftUIView: Content, to view: UIView) {
        let hostingController = UIHostingController(rootView: swiftUIView)
        addChild(hostingController)
        view.addSubview(hostingController.view)
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        
        hostingController.didMove(toParent: self)
    }
}
```

```swift
let profileView = ProfileView(user: currentUser)
addSwiftUIView(profileView, to: containerView)
```

## 在 UITableViewCell 或 UICollectionViewCell 中使用 SwiftUI

```swift
class SwiftUITableViewCell: UITableViewCell {
    private var hostingController: UIHostingController<AnyView>?
    
    func configure<Content: View>(with swiftUIView: Content) {
        // 如果已存在，先移除旧的 hosting controller
        if let hostingController = self.hostingController {
            hostingController.view.removeFromSuperview()
            hostingController.removeFromParent()
        }
        
        // 创建一个新的 hosting controller
        let hostingController = UIHostingController(rootView: AnyView(swiftUIView))
        
        // 添加为子视图
        let parentViewController = self.parentViewController
        parentViewController?.addChild(hostingController)
        contentView.addSubview(hostingController.view)
        hostingController.didMove(toParent: parentViewController)
        
        // 设置约束
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            hostingController.view.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            hostingController.view.topAnchor.constraint(equalTo: contentView.topAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: contentView.bottomAnchor)
        ])
        
        self.hostingController = hostingController
    }
}

// 获取父视图控制器的扩展
extension UIView {
    var parentViewController: UIViewController? {
        var responder: UIResponder? = self
        while let nextResponder = responder?.next {
            if let viewController = nextResponder as? UIViewController {
                return viewController
            }
            responder = nextResponder
        }
        return nil
    }
}
```

## 高级集成 - 数据双向绑定 (数据传递与通信)

```swift
import UIKit
import SwiftUI
import Combine

// 共享数据模型
class SharedDataModel: ObservableObject {
    @Published var counter: Int = 0
    @Published var message: String = "初始消息"
    @Published var items: [String] = ["项目1", "项目2", "项目3"]
    
    func incrementCounter() {
        counter += 1
        message = "计数器: \(counter)"
    }
    
    func addItem(_ item: String) {
        items.append(item)
    }
    
    func removeItem(at index: Int) {
        guard index < items.count else { return }
        items.remove(at: index)
    }
}

// UIKit视图控制器
class HybridViewController: UIViewController {
    private let dataModel = SharedDataModel()
    private var cancellables = Set<AnyCancellable>()
    
    // UIKit UI 组件
    private lazy var counterLabel: UILabel = {
        let label = UILabel()
        label.font = .boldSystemFont(ofSize: 18)
        label.textAlignment = .center
        label.backgroundColor = .systemBlue.withAlphaComponent(0.1)
        label.layer.cornerRadius = 8
        label.layer.masksToBounds = true
        return label
    }()
    
    private lazy var incrementButton: UIButton = {
        var config = UIButton.Configuration.filled()
        config.title = "UIKit 增加"
        config.cornerStyle = .medium
        let button = UIButton(configuration: config)
        button.addTarget(self, action: #selector(incrementTapped), for: .touchUpInside)
        return button
    }()
    
    private lazy var messageLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 16)
        label.textAlignment = .center
        label.numberOfLines = 0
        return label
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupDataBinding()
        addSwiftUIView()
    }
    
    private func setupUI() {
        view.backgroundColor = .systemBackground
        title = "UIKit + SwiftUI 数据共享"
        
        // 添加UIKit组件
        view.addSubview(counterLabel)
        view.addSubview(incrementButton)
        view.addSubview(messageLabel)
        
        // 设置约束
        counterLabel.translatesAutoresizingMaskIntoConstraints = false
        incrementButton.translatesAutoresizingMaskIntoConstraints = false
        messageLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            counterLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
            counterLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            counterLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            counterLabel.heightAnchor.constraint(equalToConstant: 50),
            
            incrementButton.topAnchor.constraint(equalTo: counterLabel.bottomAnchor, constant: 16),
            incrementButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            incrementButton.widthAnchor.constraint(equalToConstant: 120),
            incrementButton.heightAnchor.constraint(equalToConstant: 44),
            
            messageLabel.topAnchor.constraint(equalTo: incrementButton.bottomAnchor, constant: 16),
            messageLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            messageLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20)
        ])
    }
    
    private func setupDataBinding() {
        // 监听数据模型变化
        dataModel.$counter
            .receive(on: DispatchQueue.main)
            .sink { [weak self] counter in
                self?.counterLabel.text = "计数器: \(counter)"
            }
            .store(in: &cancellables)
        
        dataModel.$message
            .receive(on: DispatchQueue.main)
            .sink { [weak self] message in
                self?.messageLabel.text = message
            }
            .store(in: &cancellables)
    }
    
    private func addSwiftUIView() {
        let swiftUIView = SwiftUIDataView(dataModel: dataModel)
        let hostingController = UIHostingController(rootView: swiftUIView)
        
        addChild(hostingController)
        view.addSubview(hostingController.view)
        hostingController.didMove(toParent: self)
        
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: messageLabel.bottomAnchor, constant: 20),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            hostingController.view.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20)
        ])
        
        hostingController.view.backgroundColor = .clear
    }
    
    @objc private func incrementTapped() {
        dataModel.incrementCounter()
    }
}

// SwiftUI视图
struct SwiftUIDataView: View {
    @ObservedObject var dataModel: SharedDataModel
    @State private var newItemText = ""
    
    var body: some View {
        VStack(spacing: 20) {
            Text("SwiftUI 数据视图")
                .font(.title2)
                .foregroundColor(.green)
            
            VStack(spacing: 16) {
                // 显示计数器
                HStack {
                    Text("当前计数:")
                    Spacer()
                    Text("\(dataModel.counter)")
                        .font(.headline)
                        .foregroundColor(.blue)
                }
                .padding()
                .background(Color.blue.opacity(0.1))
                .cornerRadius(8)
                
                // SwiftUI增加按钮
                Button("SwiftUI 增加") {
                    dataModel.incrementCounter()
                }
                .buttonStyle(.borderedProminent)
                .tint(.green)
                
                // 项目列表
                VStack(alignment: .leading, spacing: 8) {
                    Text("项目列表:")
                        .font(.headline)
                    
                    ForEach(dataModel.items.indices, id: \.self) { index in
                        HStack {
                            Text(dataModel.items[index])
                            Spacer()
                            Button("删除") {
                                dataModel.removeItem(at: index)
                            }
                            .buttonStyle(.borderless)
                            .foregroundColor(.red)
                        }
                        .padding(.horizontal)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)
                
                // 添加新项目
                HStack {
                    TextField("新项目", text: $newItemText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    Button("添加") {
                        if !newItemText.isEmpty {
                            dataModel.addItem(newItemText)
                            newItemText = ""
                        }
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(newItemText.isEmpty)
                }
            }
        }
        .padding()
        .background(Color.green.opacity(0.05))
        .cornerRadius(12)
    }
}
```