<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Swift 命名空间（Namespace） 模式](#swift-命名空间namespace-模式)
  - [核心实现三部曲](#核心实现三部曲)
    - [第一步：定义基础泛型结构（你已经写好的）](#第一步定义基础泛型结构你已经写好的)
    - [第二步：定义协议并自动注入](#第二步定义协议并自动注入)
    - [第三步：按需扩展具体类型](#第三步按需扩展具体类型)
    - [使用示例](#使用示例)

<!-- /code_chunk_output -->


# Swift 命名空间（Namespace） 模式

这种模式在 Swift 社区非常流行（比如 Kingfisher 的 kf，SnapKit 的 snp），本质上是利用 泛型结构体 + 协议扩展 来实现的。

- 避免命名冲突：即使系统或其他库也有同名方法，你的代码永远躲在 yc 后面。
- 自动补齐更友好：输入 .yc. 后，联想出来的全是你的私有组件，开发体验极佳。

## 核心实现三部曲

### 第一步：定义基础泛型结构（你已经写好的）

```swift
public struct YC<Base> {
    public let base: Base
    public init(_ base: Base) {
        self.base = base
    }
}
```

### 第二步：定义协议并自动注入

```swift
public protocol YCCompatible {}

extension YCCompatible {
    // 实例对象调用：view.yc.xxx
    public var yc: YC<Self> {
        get { return YC(self) }
        set { }
    }
    
    // 类方法调用：UIView.yc.xxx
    public static var yc: YC<Self>.Type {
        get { return YC<Self>.self }
        set { }
    }
}
```

### 第三步：按需扩展具体类型


```swift
// 1. 扩展 UIView 的实例方法
extension UIView: YCCompatible {}
extension YC where Base: UIView {
    func setCornerRadius(_ radius: CGFloat) {
        base.layer.cornerRadius = radius
        base.layer.masksToBounds = true
    }
}

// 2. 扩展 UIColor 的静态属性
extension UIColor: YCCompatible {}
extension YC where Base: UIColor {
    static var themeRed: UIColor {
        return UIColor(red: 1.0, green: 0.2, blue: 0.2, alpha: 1.0)
    }
}
```

### 使用示例

```swift
let myView = UIView()
// 实例调用
myView.yc.setCornerRadius(10)

// 静态/类型调用
myView.backgroundColor = .yc.themeRed
```