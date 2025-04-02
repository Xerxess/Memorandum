
# UIPanGestureRecognizer

* 连续手势
* 平移手势
* 实时追踪手指移动，提供连续的位置更新
* 可以识别任意方向的拖拽动作
* 提供手势的速度数据，对于需要惯性滚动的场景非常有用
* 提供完整的手势状态（began, changed, ended 等）
* 应用场景： 交互式转场动画、 拖拽元素、 自定义滑块控件、 侧边菜单

```swift
func panGestureRecognizer(_ view:UIView){
    let pan = UIPanGestureRecognizer(target: self, action: #selector(pan))
    view.addGestureRecognizer(pan)
}

var translation:CGPoint = .zero
var translationX = 0.0
var translationY = 0.0
@objc func pan(sender:UIPanGestureRecognizer){
    let translation = sender.translation(in: view)
    
    switch sender.state {
    case .began:
        translationX = self.translation.x
        translationY = self.translation.y
    case .changed:
        self.translation.x = translationX + translation.x
        self.translation.y = translationY + translation.y
        sender.view?.transform = CGAffineTransform(translationX: self.translation.x, y: self.translation.y)
    case .ended:break
    default: break
    }
}
```
