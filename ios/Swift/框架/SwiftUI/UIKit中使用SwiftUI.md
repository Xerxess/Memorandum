<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UIKit中使用SwiftUI](#uikit中使用swiftui)
  - [使用 UIHostingController](#使用-uihostingcontroller)
  - [在 UIKit 中展示 SwiftUI 视图的简便方法](#在-uikit-中展示-swiftui-视图的简便方法)
  - [在 UITableViewCell 或 UICollectionViewCell 中使用 SwiftUI](#在-uitableviewcell-或-uicollectionviewcell-中使用-swiftui)
  - [数据传递与通信](#数据传递与通信)
    - [从 UIKit 到 SwiftUI](#从-uikit-到-swiftui)
    - [从 SwiftUI 到 UIKit](#从-swiftui-到-uikit)
  - [使用 UIViewRepresentable 将 UIKit 视图集成到 SwiftUI](#使用-uiviewrepresentable-将-uikit-视图集成到-swiftui)

<!-- /code_chunk_output -->

# UIKit中使用SwiftUI

## 使用 UIHostingController

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

## 数据传递与通信

### 从 UIKit 到 SwiftUI

```swift
class ViewController: UIViewController {
    var userData: UserData = UserData()
    
    func updateProfile() {
        // 使用 @ObservedObject 或 @StateObject 的 SwiftUI 视图
        let profileView = ProfileView(userData: userData)
        let hostingController = UIHostingController(rootView: profileView)
        
        // 呈现视图控制器
        present(hostingController, animated: true)
        
        // 稍后更新数据
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            self.userData.name = "新名字"  // SwiftUI 视图将自动更新
        }
    }
}

// SwiftUI 视图
struct ProfileView: View {
    @ObservedObject var userData: UserData
    
    var body: some View {
        VStack {
            Text("名字: \(userData.name)")
            Button("返回") {
                // 关闭当前视图
            }
        }
    }
}

class UserData: ObservableObject {
    @Published var name: String = "初始名字"
}
```

### 从 SwiftUI 到 UIKit

```swift
struct ActionButtonView: View {
    var onButtonTap: () -> Void
    var body: some View {
        Button("执行操作") {
            onButtonTap()
        }
    }
}

// 在 UIKit 中使用
let actionView = ActionButtonView(onButtonTap: {
    // 在这里执行 UIKit 代码
    self.showAlert(message: "按钮被点击")
})
let hostingController = UIHostingController(rootView: actionView)
```

## 使用 UIViewRepresentable 将 UIKit 视图集成到 SwiftUI

```swift
struct UIKitMapView: UIViewRepresentable {
    func makeUIView(context: Context) -> MKMapView {
        MKMapView()
    }
    func updateUIView(_ uiView: MKMapView, context: Context) {
        // 更新地图视图
    }
}

// 在 SwiftUI 中使用
struct ContentView: View {
    var body: some View {
        UIKitMapView()
            .frame(height: 300)
    }
}
```
