<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UIGestureRecognizer](#uigesturerecognizer)
  - [重要属性](#重要属性)
  - [重要方法 **](#重要方法-)
  - [子类重写方法](#子类重写方法)
- [UIGestureRecognizerDelegate](#uigesturerecognizerdelegate)

<!-- /code_chunk_output -->

# UIGestureRecognizer

手势识别器的基类

```swift
@objc func myActionMethod()
@objc func myActionMethod(_ sender: UIGestureRecognizer)
```

手势分为：

- 离散 （离散手势（例如双击）在多点触摸序列中只发生一次，并导致发送单个操作）
  - UITapGestureRecognizer
  - UISwipeGestureRecognizer
  - UIHoverGestureRecognizer
- 连续
  - UILongPressGestureRecognizer
  - UIPinchGestureRecognizer
  - UIRotationGestureRecognizer
  - UIPanGestureRecognizer
  - UIScreenEdgePanGestureRecognizer

## 重要属性

```swift
// 手势识别器的当前状态。
// UIGestureRecognizer.State
// case possible 手势识别器尚未识别其手势，但可能正在评估触摸事件
// case began 手势识别器已接收到被识别为连续手势的触摸对象
// case changed 手势识别器已接收到被识别为连续手势改变的触摸
// case ended 手势识别器已收到被识别为连续手势结束的触摸
// case cancelled 手势识别器已收到触摸，导致连续手势取消
// case failed 手势识别器已收到无法识别为其手势的多点触摸序列
var state: UIGestureRecognizer.State

// 一个布尔值，决定在识别到手势时是否将触摸传送到视图。
// 当此属性为 true （默认值）且手势识别器识别到相应手势时，该手势中待处理的触摸将不会传递到视图，并且之前传递的触摸将通过向视图发送 touchesCancelled(_:with:)  消息取消。
// 如果手势识别器无法识别相应手势，或者此属性的值为 false ，则视图将接收多点触摸序列中的所有触摸。
var cancelsTouchesInView: Bool { get set }

// 一个布尔值，用于确定手势识别器是否延迟在开始阶段向其视图发送触摸。
// 当此属性的值为 false （默认值）时，视图会与手势识别器并行分析 UITouch.Phase.began and UITouch.Phase.moved  中的触摸事件。
// 当此属性的值为 true 时，窗口会暂停将  UITouch.Phase.began 阶段的触摸对象传递给视图。如果手势识别器随后识别出其手势，则会丢弃这些触摸对象。但是，如果手势识别器未识别出其手势，则窗口会通过 touchesBegan(_:with:) 消息将这些对象传递给视图（可能还会通过后续的 touchesMoved(_:with:) 消息告知其触摸的当前位置）。
// 将此属性设置为 true 可阻止视图处理  UITouch.Phase.began 阶段中可能被识别为此手势的一部分的任何触摸。
var delaysTouchesBegan: Bool { get set }

// 一个布尔值，用于确定手势识别器是否延迟在结束阶段向其视图发送触摸。
// 当此属性的值为true （默认值）且手势识别器正在分析触摸事件时，窗口会暂停将 UITouch.Phase.ended阶段中的触摸对象传送到附加视图。如果手势识别器随后识别出其手势，则这些触摸对象将被取消（带有 touchesCancelled(_:with:)消息）。如果手势识别器无法识别其手势，则窗口会在调用视图的 touchesEnded(_:with:)方法时传送这些对象。
// 将此属性设置为false可在手势识别器分析相同触摸时将 UITouch.Phase.ended 中的触摸对象传送到视图。
var delaysTouchesEnded: Bool { get set }
```

## 重要方法 **

```swift
// 返回手势识别器所代表的手势在给定视图中计算的位置点
func location(in: UIView?) -> CGPoint

// 返回手势触摸在给定视图的本地坐标系中的位置。
func location(ofTouch: Int, in: UIView?) -> CGPoint

// 在创建对象时，创建手势识别器和另一个手势识别器之间的依赖关系。
// 当 otherGestureRecognizer 手势失败时当前手势生效
// 如果 otherGestureRecognizer 转换为 UIGestureRecognizer.State.failed ，则当前手势识别器将转换为其正常的下一个状态。
// 如果 otherGestureRecognizer 转换为 recognized 或 UIGestureRecognizer.State.began ，则当前手势识别器转换为 UIGestureRecognizer.State.failed 。
// 举个例子，当你希望单击手势要求双击手势失败时，可能会调用此方法
func require(toFail otherGestureRecognizer: UIGestureRecognizer)


```

## 子类重写方法

```swift
// 当一个或多个手指触摸相关视图时发送到手势识别器。
func touchesBegan(Set<UITouch>, with: UIEvent)

// 当一个或多个手指在相关视图中移动时发送到手势识别器。
func touchesMoved(Set<UITouch>, with: UIEvent)

// 当一个或多个手指从相关视图抬起时发送到手势识别器。
func touchesEnded(Set<UITouch>, with: UIEvent)

// 当系统事件（如来电）取消触摸事件时发送到手势识别器。
func touchesCancelled(Set<UITouch>, with: UIEvent)

// 被覆盖以表明指定的手势识别器可以阻止接收器识别手势。
// 决定当前手势识别器是否可以被另一个手势识别器阻止
// 返回 true 表示当前手势可以被阻止，false 表示不能被阻止。
// 默认返回 true，意味着大多数手势可以被其他手势阻止。
func canBePrevented(by preventingGestureRecognizer: UIGestureRecognizer) -> Bool

// 覆盖以表明接收器可以阻止指定的手势识别器识别其手势。
// 决定当前手势识别器是否可以阻止另一个手势识别器
// 返回 true 表示当前手势可以阻止其他手势，false 表示不能阻止。
// 默认返回 true，意味着大多数手势可以阻止其他手势。
func canPrevent(_ preventedGestureRecognizer: UIGestureRecognizer) -> Bool


// 被覆盖以表明接收器需要指定的手势识别器失败。
// 用于指定当前手势识别器应该等待另一个手势识别器失败后才能被识别
// 当 otherGestureRecognizer 手势失败时 识别当前手势（先满足 otherGestureRecognizer 手势，失败后，满足当前失效）
func shouldRequireFailure(of otherGestureRecognizer: UIGestureRecognizer) -> Bool
// 示例
class CustomGestureRecognizer: UIGestureRecognizer {
    override func shouldRequireFailure(of otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        // 如果其他手势是滑动手势，则当前手势应该等待滑动手势失败
        return otherGestureRecognizer is UIPanGestureRecognizer
    }
}


// 被覆盖以指示接收器应该被要求通过指定的手势识别器失败。
// 指定当前手势识别器应该在被识别之前，导致另一个手势识别器失败
// 当 otherGestureRecognizer 手机失败时，当前手势已识别 （先满足当前手势，使用 otherGestureRecognizer 失效）
func shouldBeRequiredToFail(by otherGestureRecognizer: UIGestureRecognizer) -> Bool
// 示例
class PriorityGestureRecognizer: UIGestureRecognizer {
    override func shouldBeRequiredToFail(by otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        // 如果其他手势是点击手势，则当前手势应该优先于点击手势
        return otherGestureRecognizer is UITapGestureRecognizer
    }
}
```

# UIGestureRecognizerDelegate

- gestureRecognizerShouldBegin(_:) -> Bool 决定手势识别器是否应该开始识别手势。
- gestureRecognizer(_:shouldReceive:) -> Bool 决定手势识别器是否应该接收特定的触摸。
- gestureRecognizer(_:shouldRecognizeSimultaneouslyWith:) -> Bool 决定两个手势识别器是否可以同时识别手势
- gestureRecognizer(_:shouldRequireFailureOf:) -> Bool 决定一个手势识别器是否应该等待另一个手势识别器失败
- gestureRecognizer(_:shouldBeRequiredToFailBy:) -> Bool 决定一个手势识别器是否应该强制另一个手势识别器失败

```swift
func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
    // 返回 true 允许手势开始，false 阻止手势开始
    return true
}

func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
    // 返回 true 允许手势接收触摸，false 则不接收
    return true
}

func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
    // 返回 true 允许同时识别，false 则不允许
    return false
}

//returns true : 识别 gestureRecognizer  -> 需要 otherGestureRecognizer 失败.
//returns false : 识别 gestureRecognizer -> 不需要 otherGestureRecognizer 失败.
func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRequireFailureOf otherGestureRecognizer: UIGestureRecognizer) -> Bool {
    return false
}

//returns true : gestureRecognizer 失败后 -> 识别 otherGestureRecognizer.
//returns false : gestureRecognizer 不需要失败 -> 识别 otherGestureRecognizer.
func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldBeRequiredToFailBy otherGestureRecognizer: UIGestureRecognizer) -> Bool {
    return false
}
```

```swift
// 示例代码
// 允许所有手势开始。
// 允许点击和平移手势同时识别。
// 只有当触摸点在视图的右半部分时才识别手势。
class ViewController: UIViewController, UIGestureRecognizerDelegate {
    @IBOutlet weak var gestureView: UIView!
    override func viewDidLoad() {
        super.viewDidLoad()
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleTap))
        tapGesture.delegate = self
        gestureView.addGestureRecognizer(tapGesture)
        
        let panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePan))
        panGesture.delegate = self
        gestureView.addGestureRecognizer(panGesture)
    }
    
    @objc func handleTap(_ gesture: UITapGestureRecognizer) {
        print("Tapped")
    }
    
    @objc func handlePan(_ gesture: UIPanGestureRecognizer) {
        print("Panned")
    }
    
    // MARK: - UIGestureRecognizerDelegate
    func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        // 允许所有手势开始
        return true
    }
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        // 允许点击和平移手势同时识别
        return true
    }
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
        // 如果触摸点在视图的左半部分，则不识别手势
        let touchPoint = touch.location(in: gestureView)
        return touchPoint.x > gestureView.bounds.width / 2
    }
}
```
