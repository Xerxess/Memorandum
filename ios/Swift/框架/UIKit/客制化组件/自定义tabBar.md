

# 自定义tabBar

## UITabBarController

* tabBar.addSubview(animationView) 引入自定义视图覆盖相应UITabBarItem

```swift
import UIKit
import Lottie

class CustomTabBarController: UITabBarController {
    
    // 存储Lottie动画视图的数组
    private var animationViews: [LottieAnimationView] = []
    // 当前选中的索引
    private var currentIndex: Int = 0
    // 动画文件名
    private let animationNames = ["Loading", "Loading", "Loading", "Loading"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTabBar()
        setupAnimations()
    }
    
    private func setupTabBar() {
        // 设置TabBar外观
        tabBar.backgroundColor = .white
        tabBar.tintColor = .systemBlue
        
        // 创建视图控制器
        let homeVC = ViewController()
        homeVC.view.backgroundColor = .white
        homeVC.tabBarItem = UITabBarItem(title: "首页", image: UIImage(), tag: 0)
        
        let searchVC = UICollectionLayoutListConfigurationController()
        searchVC.view.backgroundColor = .white
        searchVC.tabBarItem = UITabBarItem(title: "搜索", image: UIImage(), tag: 1)
        
        let profileVC = ViewController()
        profileVC.view.backgroundColor = .white
        profileVC.tabBarItem = UITabBarItem(title: "个人", image: UIImage(), tag: 2)
        
        let settingsVC = UICollectionLayoutListConfigurationController()
        settingsVC.view.backgroundColor = .white
        settingsVC.tabBarItem = UITabBarItem(title: "设置", image: UIImage(), tag: 3)
        
        viewControllers = [homeVC, searchVC, profileVC, settingsVC]
        
        // 设置默认选中的标签
        selectedIndex = 0
        
        // 设置代理以监听选中事件
        delegate = self
    }
    
    private func setupAnimations() {
        // 清除可能存在的旧动画视图
        animationViews.forEach { $0.removeFromSuperview() }
        animationViews.removeAll()
        
        // 获取TabBar中的项目数量
        guard let items = tabBar.items, items.count > 0 else { return }
        
        // 为每个TabBar项创建一个Lottie动画视图
        for i in 0..<items.count {
            guard i < animationNames.count else { break }
            
            // 创建Lottie动画视图
            let animationView = LottieAnimationView(name: animationNames[i])
            animationView.loopMode = .playOnce
            animationView.contentMode = .scaleAspectFit
            animationView.isUserInteractionEnabled = false
            
            // 将动画视图添加到TabBar
            tabBar.addSubview(animationView)
            animationViews.append(animationView)
            
            // 设置动画视图初始状态
            if i == selectedIndex {
                animationView.currentProgress = 1.0 // 选中状态
            } else {
                animationView.currentProgress = 0.0 // 未选中状态
            }
        }
        
        // 在布局完成后调整动画视图的位置
        view.layoutIfNeeded()
        positionAnimationViews()
    }
    
    private func positionAnimationViews() {
        guard let tabItems = tabBar.items, tabItems.count > 0 else { return }
        
        // 计算每个TabBar项的宽度
        let tabWidth = tabBar.frame.width / CGFloat(tabItems.count)
        
        // 设置每个动画视图的位置和大小
        for i in 0..<animationViews.count {
            let animationView = animationViews[i]
            
            // 计算动画视图的位置（居中于每个TabBar项）
            let xPosition = tabWidth * CGFloat(i) + (tabWidth - 30) / 2
            let yPosition: CGFloat = 5 // 距离顶部的偏移量
            
            // 设置动画视图的大小和位置
            animationView.frame = CGRect(x: xPosition, y: yPosition, width: 30, height: 30)
        }
    }
    
    // 播放选中项的动画
    private func playAnimation(for index: Int) {
        guard index < animationViews.count else { return }
        
        // 停止之前选中项的动画
        if currentIndex < animationViews.count {
            let previousAnimationView = animationViews[currentIndex]
            previousAnimationView.play(fromProgress: 1.0, toProgress: 0.0, completion: nil)
        }
        
        // 播放新选中项的动画
        let selectedAnimationView = animationViews[index]
        selectedAnimationView.play(fromProgress: 0.0, toProgress: 1.0, completion: nil)
        
        // 更新当前选中索引
        currentIndex = index
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        positionAnimationViews()
    }
}

// 扩展UITabBarController代理以处理选中事件
extension CustomTabBarController: UITabBarControllerDelegate {
    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
        playAnimation(for: viewController.tabBarItem.tag)
    }
}

```

## UITabBar

* 同 UITabBarController 相同只是写法不同
* tabBar.addSubview(animationView) 引入自定义视图覆盖相应UITabBarItem

```swift
//
//  MainTabBarController.swift
//  NewsApp
//
//  Created by yang.chuan on 2025/3/15.
//
import UIKit
import Lottie

class LottieTabBar: UITabBar {
    
    private var animationViews: [LottieAnimationView] = []
    private let animationNames = ["Loading", "Loading", "Loading", "Loading"]
    private var previousSelectedIndex: Int = 0
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupAnimations()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupAnimations()
    }
    
    private func setupAnimations() {
        // 在items设置后调用
        DispatchQueue.main.async { [weak self] in
            self?.createAnimationViews()
        }
    }
    
    private func createAnimationViews() {
        guard let items = items, items.count > 0 else { return }
        
        // 清除现有动画视图
        animationViews.forEach { $0.removeFromSuperview() }
        animationViews.removeAll()
        
        // 为每个TabBar项创建一个动画视图
        for i in 0..<min(items.count, animationNames.count) {
            let animationView = LottieAnimationView(name: animationNames[i])
            animationView.loopMode = .playOnce
            animationView.contentMode = .scaleAspectFit
            animationView.isUserInteractionEnabled = false
            
            addSubview(animationView)
            animationViews.append(animationView)
            
            // 设置初始状态
            if i == 0 {
                animationView.currentProgress = 1.0 // 默认选中第一个
                previousSelectedIndex = 0
            } else {
                animationView.currentProgress = 0.0
            }
        }
        
        setNeedsLayout()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        guard let items = items, items.count > 0 else { return }
        
        // 调整动画视图的位置
        let tabWidth = frame.width / CGFloat(items.count)
        
        for i in 0..<animationViews.count {
            let animationView = animationViews[i]
            let xPosition = tabWidth * CGFloat(i) + (tabWidth - 30) / 2
            let yPosition: CGFloat = 5
            
            animationView.frame = CGRect(x: xPosition, y: yPosition, width: 30, height: 30)
        }
    }
    
    override func didAddSubview(_ subview: UIView) {
        super.didAddSubview(subview)
        
        // 确保动画视图始终在最上层
        animationViews.forEach { bringSubviewToFront($0) }
    }
    
    // 在LottieTabBar中添加此方法
    func playAnimation(fromIndex: Int, toIndex: Int) {
        guard fromIndex < animationViews.count && toIndex < animationViews.count else { return }
        
        let previousAnimView = animationViews[fromIndex]
        previousAnimView.play(fromProgress: 1.0, toProgress: 0.0, completion: nil)
        
        let currentAnimView = animationViews[toIndex]
        currentAnimView.play(fromProgress: 0.0, toProgress: 1.0, completion: nil)
    }
    
    // 使用swizzling或者其他方式监听选择变化
    // 这里我们通过TabBarController的代理来实现，不在这个类中直接处理
}

// 在TabBarController中处理选择变化
class MainTabBarController: UITabBarController {
    
    private var customTabBar: LottieTabBar?
    private var previousSelectedIndex: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 设置自定义TabBar
        let lottieTabBar = LottieTabBar()
        self.customTabBar = lottieTabBar
        setValue(lottieTabBar, forKey: "tabBar")
        
        // 配置视图控制器和TabBar项
        let homeVC = UIViewController()
        homeVC.tabBarItem = UITabBarItem(title: "首页", image: UIImage(named: "home_icon"), tag: 0)
        
        let searchVC = UIViewController()
        searchVC.tabBarItem = UITabBarItem(title: "搜索", image: UIImage(named: "search_icon"), tag: 1)
        
        let profileVC = UIViewController()
        profileVC.tabBarItem = UITabBarItem(title: "个人", image: UIImage(named: "profile_icon"), tag: 2)
        
        let settingsVC = UIViewController()
        settingsVC.tabBarItem = UITabBarItem(title: "设置", image: UIImage(named: "settings_icon"), tag: 3)
        
        viewControllers = [homeVC, searchVC, profileVC, settingsVC]
        
        // 设置代理以监听选择变化
        delegate = self
    }
}

// 处理TabBar选择变化的代理方法
extension MainTabBarController: UITabBarControllerDelegate {
//    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
//        guard let customTabBar = self.customTabBar,
//              let animationViews = customTabBar.value(forKey: "animationViews") as? [LottieAnimationView] else {
//            return
//        }
//        
//        let currentIndex = selectedIndex
//        
//        // 确保索引在有效范围内
//        guard currentIndex < animationViews.count && previousSelectedIndex < animationViews.count else {
//            return
//        }
//        
//        // 播放之前选中项的反向动画
//        if previousSelectedIndex != currentIndex {
//            let previousAnimView = animationViews[previousSelectedIndex]
//            previousAnimView.play(fromProgress: 1.0, toProgress: 0.0, completion: nil)
//            
//            // 播放新选中项的动画
//            let currentAnimView = animationViews[currentIndex]
//            currentAnimView.play(fromProgress: 0.0, toProgress: 1.0, completion: nil)
//            
//            // 更新之前选中的索引
//            previousSelectedIndex = currentIndex
//        }
//    }
    
    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
        guard let customTabBar = self.customTabBar else { return }
        
        let currentIndex = selectedIndex
        customTabBar.playAnimation(fromIndex: previousSelectedIndex, toIndex: currentIndex)
        previousSelectedIndex = currentIndex
    }
}

```