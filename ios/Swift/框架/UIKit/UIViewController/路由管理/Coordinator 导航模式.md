

# Coordinator 导航模式

Coordinator 模式的核心思想是将 “页面跳转逻辑” 从 ViewController 中抽离出来，交给一个专门的路由角色。
在传统的 UIKit 开发中，VC_A 必须知道 VC_B 的存在才能进行 push，这导致了高耦合。使用 Coordinator 后，VC 只负责 UI，跳转由 Coordinator 统一调度。

## 核心协议 (Coordinator Protocol)

```swift
protocol Coordinator: AnyObject {
    var childCoordinators: [Coordinator] { get set }
    var navigationController: UINavigationController { get set }
    
    func start() // 启动逻辑（如实例化 VC 并 push）
}

class AppCoordinator: Coordinator {
    var childCoordinators = [Coordinator]()
    var navigationController: UINavigationController

    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        // 决定展示哪个页面（如：已登录去首页，未登录去登录页）
        showLogin()
    }

    func showLogin() {
        let vc = LoginViewController()
        // 重点：将跳转逻辑通过闭包或 Delegate 传回给 Coordinator
        vc.onLoginSuccess = { [weak self] in
            self?.showHome()
        }
        navigationController.pushViewController(vc, animated: true)
    }

    func showHome() {
        // 也可以开启一个子 Coordinator 处理复杂模块
        let homeCoordinator = HomeCoordinator(navigationController: navigationController)
        childCoordinators.append(homeCoordinator)
        homeCoordinator.start()
    }
}


```

```swift
// 在 SceneDelegate 中挂载
var appCoordinator: AppCoordinator?

func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = (scene as? UIWindowScene) else { return }
    
    let navController = UINavigationController()
    appCoordinator = AppCoordinator(navigationController: navController)
    appCoordinator?.start()
    
    let window = UIWindow(windowScene: windowScene)
    window.rootViewController = navController
    self.window = window
    window.makeKeyAndVisible()
}
```