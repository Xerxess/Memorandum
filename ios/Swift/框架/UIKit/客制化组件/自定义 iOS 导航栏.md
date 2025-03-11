<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [自定义 iOS 导航栏](#自定义-ios-导航栏)
  - [基础定制（简单）](#基础定制简单)
  - [中等难度定制](#中等难度定制)
  - [高级定制（复杂）](#高级定制复杂)

<!-- /code_chunk_output -->

# 自定义 iOS 导航栏

## 基础定制（简单）

- 修改标题文字属性（字体、颜色）
- 改变背景色
- 添加、定制返回按钮
- 设置半透明或不透明

```tsx
// 全局设置
let appearance = UINavigationBar.appearance()
appearance.tintColor = .blue
appearance.barTintColor = .white
appearance.titleTextAttributes = [
    .foregroundColor: UIColor.black,
    .font: UIFont.boldSystemFont(ofSize: 18)
]

// 设置标题
navigationItem.title = "Page2" 

// 设置导航为不透明
navigationController?.navigationBar.isTranslucent = false 

// 设置导航背景色，由于背景是滚动时显示
navigationController?.navigationBar.barTintColor = .red 

// 设置导航交互元素的颜色，不包括中间的title 
navigationController?.navigationBar.tintColor = .blue 

// 设置title的颜色 
navigationBar.titleTextAttributes = [ 
            NSAttributedString.Key.font: UIFont.systemFont(ofSize: 20),
            NSAttributedString.Key.foregroundColor: UIColor.main
        ]

// 设置背景色
navigationBar.setBackgroundImage(UIImage(named: "MyPic")?.resizableImage(withCapInsets: .init(top: 100, left: 100, bottom: 100, right: 100)), for: .default)

// 设置提示文本
navigationItem.prompt = NSLocalizedString("Navigation prompts appear at the top.", comment: "")
```

## 中等难度定制

- 自定义左右按钮布局
- 添加自定义视图作为标题视图
- 导航栏高度调整
- 影藏底部分割线
- 添加渐变背景色

```swift

// Attach a menu to a bar button item
// 将菜单附加到按钮项目
let optionsBarItem = UIBarButtonItem(systemItem: .refresh, primaryAction: nil, menu: nil)
let barButtonMenu = UIMenu(title: "", children: [
    UIAction(title: NSLocalizedString("Copy", comment: ""),image: UIImage(systemName: "doc.on.doc"),handler:{ _ in }),
    UIAction(title: NSLocalizedString("Rename", comment:""), image: UIImage(systemName: "pencil"),handler:{ _ in  }),
    UIAction(title: NSLocalizedString("Duplicate", comment: ""),image: UIImage(systemName: "plus.square.on.square"), handler: { _ in }),
    UIAction(title: NSLocalizedString("Move", comment:""), image: UIImage(systemName: "folder"),handler:{ _ in })
])
optionsBarItem.menu = barButtonMenu
navigationItem.rightBarButtonItems = [
    optionsBarItem
]
```

```swift
// 设置导航栏背景透明
navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
// 移除导航栏底部阴影线
navigationController?.navigationBar.shadowImage = UIImage()
// 设置为透明
navigationController?.navigationBar.isTranslucent = true
```

```swift
// 全局设置
 UINavigationBar.appearance().tintColor = .main
let navBarAppearance = UINavigationBarAppearance()
let copyNavBarAppearance = navBarAppearance.copy()

navBarAppearance.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.main]

UINavigationBar.appearance().scrollEdgeAppearance = navBarAppearance // 滚动边缘的配置（即没滚动时）
UINavigationBar.appearance().standardAppearance = copyNavBarAppearance // 滚动后的配置
UINavigationBar.appearance().compactAppearance = navBarAppearance
```

## 高级定制（复杂）

- 完全自定义导航栏
- 滚动时动态变化外观
- 转场动画时的特殊效果
- 适配不同设备和方向

