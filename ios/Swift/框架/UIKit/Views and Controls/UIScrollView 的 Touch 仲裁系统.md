
# UIScrollView 的 Touch 仲裁系统

- hitTest 的欺骗性：我们通过 super.hitTest 找到了真正的受害者 realTargetView，但对外（对系统）谎称点击的是 self。这样，系统的 Touch 序列就只会流向 MiniScrollView。
- 手动维护状态机：由于子视图被“屏蔽”了，我们必须手动在 touchesBegan、Moved、Ended 里面逻辑性地调用子视图的对应方法。这模拟了响应链的分发机制。
- 延迟分发 (delaysContentTouches)：计时器 delayTimer 就是那个“等待期”。在 0.15s 内，如果手指动了超过 10 像素，计时器销毁，子视图永远不会知道自己被点过。
- 取消机制 (touchesShouldCancel)：如果计时器先到，子视图收到了 touchesBegan。但随后手指开始大幅度移动，我们会给子视图补发一个 touchesCancelled，完成控制权的强行收回。

`注意`：这种手动分发在处理复杂的嵌套视图（例如按钮里套着手势）时会非常棘手。

```swift
func touchesShouldBegin(
    _ touches: Set<UITouch>,
    with event: UIEvent?,
    in view: UIView
) -> Bool  是否允许子View开始接收touch

func touchesShouldCancel(in view: UIView) -> Bool 是否允许取消子View touch

var canCancelContentTouches: Bool 可以取消内容触摸

var delaysContentTouches: Bool 是否延迟把 touch 交给子View
```

## MiniScrollView 自己实现一套 UIKit 仲裁系统

```swift
final class MiniScrollView: UIView {
    
    // MARK: - 配置项
    
    /// 是否延迟发送 touch
    var delaysContentTouches = true
    
    /// 是否允许取消子View touch
    var canCancelContentTouches = true
    
    // MARK: - 私有状态
    
    /// 当前命中的子View
    private weak var targetView: UIView?
    
    /// 初始触摸点
    private var beginPoint: CGPoint = .zero
    
    /// 是否已经把 touch 给了子View
    private var touchDelivered = false
    
    /// 延迟timer
    private var delayTimer: Timer?
    
    /// 是否正在滚动
    private var isScrolling = false
    
    /// 拖动阈值
    private let threshold: CGFloat = 10
    
    // MARK: - 拦截核心：hitTest
    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        // 1. 先探测真正点中的是谁
        let hitView = super.hitTest(point, with: event)
        
        // 2. 如果点中的是自己或者子View
        if hitView != nil {
            // 记录下真正的目标，但返回 self
            // 这样系统就会把后续所有的 touchesBegan/Moved 全部发给 MiniScrollView
            targetView = (hitView === self) ? nil : hitView
            return self
        }
        return nil
    }
    
    override func touchesBegan(
        _ touches: Set<UITouch>,
        with event: UIEvent?) {
            guard let touch = touches.first else { return }
            isScrolling = false
            touchDelivered = false
            delayTimer?.invalidate()
            
            if let targetView {
                // MARK: - delaysContentTouches
                if delaysContentTouches {
                    // 延迟发送
                    delayTimer = Timer.scheduledTimer(
                        withTimeInterval: 3,
                        repeats: false
                    ) { [weak self] _ in
                        print("delayTimer")
                        self?.deliverTouchesToSubview(touches, event)
                    }
                    
                } else {
                    // 立即发送
                    deliverTouchesToSubview(touches, event)
                }
            }
        }
    
    
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touch = touches.first else { return }
        let point = touch.location(in: self)
        
        let dx = point.x - beginPoint.x
        let dy = point.y - beginPoint.y
        let distance = sqrt(dx * dx + dy * dy)
        
        // MARK: - 判断开始拖动
        if distance > threshold {
            beginScrollIfNeeded(touches, event)
        } else if touchDelivered {
            // 如果已经分发了，且还没达到滚动阈值，同步转发 Move 事件
            targetView?.touchesMoved(touches, with: event)
        }
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        delayTimer?.invalidate()
        if touchDelivered {
            targetView?.touchesEnded(touches, with: event)
        } else if !isScrolling {
            // 如果计时器还没到就抬手了，补发一个 Began 和 Ended 给子 View
            deliverTouchesToSubview(touches, event)
            targetView?.touchesEnded(touches, with: event)
        }
        resetStatus()
    }
    
    override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        delayTimer?.invalidate()
        if touchDelivered {
            targetView?.touchesCancelled(touches, with: event)
        }
        resetStatus()
    }
    
    private func resetStatus() {
        targetView = nil
        touchDelivered = false
        isScrolling = false
    }
    
    private func beginScrollIfNeeded(
        _ touches: Set<UITouch>,
        _ event: UIEvent?
    ) {
        
        guard !isScrolling else { return }
        isScrolling = true
        delayTimer?.invalidate()
        
        // MARK: - 若touch已给子View
        if touchDelivered {
            guard let targetView else { return }
            
            // MARK: - canCancelContentTouches
            guard canCancelContentTouches else {
                return
            }
            
            // MARK: - touchesShouldCancel
            let shouldCancel = touchesShouldCancel(in: targetView)
            
            if shouldCancel {
                // UIKit核心：
                // ownership transfer
                targetView.touchesCancelled(
                    touches,
                    with: event
                )
                
                touchDelivered = false
                print("ScrollView 接管 touch")
            }
        }
        
        // 开始滚动
        print("已滚动")
    }
    
    private func deliverTouchesToSubview(_ touches: Set<UITouch>,_ event: UIEvent?) {
        
        guard let targetView else { return }
        
        // MARK: - touchesShouldBegin
        let shouldBegin = touchesShouldBegin(
            touches,
            with: event,
            in: targetView
        )
        
        guard shouldBegin else { return }
        touchDelivered = true
        targetView.touchesBegan(touches, with: event)
    }
    
    func touchesShouldBegin(_ touches: Set<UITouch>,with event: UIEvent?,in view: UIView) -> Bool {
        // 如果是某些特殊控件，可以返回 false 彻底禁止点击
        return true
    }
    
    func touchesShouldCancel(in view: UIView) -> Bool {
        // 如果是 UISlider，通常返回 false，表示不希望滑动时被 ScrollView 截断
        if view is UISlider { return false }
        return true
    }
}
```
