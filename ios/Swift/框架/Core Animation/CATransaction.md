<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [CATransaction](#catransaction)
  - [UIView.layer 无动画问题](#uiviewlayer-无动画问题)

<!-- /code_chunk_output -->


# CATransaction

CATransaction是 Core Animation 中的事务类，在iOS中的图层中，图层的每个改变都是事务的一部分，CATransaction可以对多个layer的属性同时进行修改，同时负责批量的把多个图层树的修改作为一个原子更新到渲染树。

```swift
class ViewController: UIViewController {

    lazy var layer: CALayer = {
        let layer = CALayer()
        layer.frame = CGRect(x: 100, y: 100, width: 100, height: 100)
        layer.backgroundColor = UIColor.red.cgColor
        return layer
    }()

    lazy var button: UIButton = {
        let button = UIButton(type: .custom)
        button.setTitle("button", for: .normal)
        button.setTitleColor(UIColor.black, for: .normal)
        button.frame = CGRect(x: 100, y: 250 , width: 100, height: 50)
        button.addTarget(self, action: #selector(buttonClick) , for: .touchUpInside)
        return button
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.layer.addSublayer(layer)
        view.addSubview(button)
    }

    @objc func buttonClick() {
        layer.backgroundColor = UIColor.yellow.cgColor
    }

    @objc func buttonClick() {
        CATransaction.begin()
        CATransaction.setAnimationDuration(2)
        CATransaction.setCompletionBlock {
            CATransaction.setAnimationDuration(1)
            self.layer.frame = CGRect(x: 50, y: 100, width: 100, height: 100)
        }
        layer.backgroundColor = UIColor.yellow.cgColor

        CATransaction.begin()
        layer.cornerRadius = 20
        CATransaction.commit()

        CATransaction.commit()
    }
}
```

## UIView.layer 无动画问题

* UIView为CALyer的代理，则根据名称来获取action，会遵循以下顺序
  * 如果有代理，则调用代理方法
    * optional public func action(for layer: CALayer, forKey event: String) -> CAAction?
  * 如果没有委托，或者委托没有实现action(for layer: CALayer, forKey event: String) 方法，图层接着检查包含属性名称对应行为映射的actions字典
  * 检查layer的style层级中每个actions字典
  * 调用layer的类方法

```swift
let squareView = CustomView()
// 代理方法 UIView.layer 动画生效
class CustomView: UIView {
    override func action(for layer: CALayer, forKey event: String) -> CAAction? {
        return layer.actions?[event]
    }
}
lazy var layer: CALayer = {
    let layer = CALayer()
    layer.frame = CGRect(x: 100, y: 100, width: 100, height: 100)
    layer.backgroundColor = UIColor.red.cgColor
    return layer
}()
override func viewDidLoad() {
    super.viewDidLoad()
    // 设置视图
    squareView.frame = CGRect(x: 50, y: 50, width: 100, height: 100)
    squareView.backgroundColor = .systemBlue
    view.addSubview(squareView)
    view.layer.addSublayer(layer)
    
    // 添加按钮触发动画
    let button = UIButton(type: .system)
    button.setTitle("Animate", for: .normal)
    button.frame = CGRect(x: 50, y: 200, width: 100, height: 40)
    button.addTarget(self, action: #selector(animateSquare), for: .touchUpInside)
    view.addSubview(button)
    // Do any additional setup after loading the view.
}

@objc func animateSquare() {
    CATransaction.begin()
    CATransaction.setAnimationDuration(2)
    CATransaction.setCompletionBlock {
        CATransaction.setAnimationDuration(1)
        self.layer.frame = CGRect(x: 50, y: 100, width: 100, height: 100)
    }
    layer.backgroundColor = UIColor.yellow.cgColor
    
    CATransaction.begin()
    layer.cornerRadius = 20
    squareView.layer.opacity = 0.5
    CATransaction.commit()
    
    CATransaction.commit()
}
```
