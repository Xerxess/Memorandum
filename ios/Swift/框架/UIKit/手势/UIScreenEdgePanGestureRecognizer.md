
# UIScreenEdgePanGestureRecognizer

* 连续手势
* 系统会使用屏幕边缘手势来启动视图控制器转换。可以使用此类为复制相同的手势行为。
* 只识别从屏幕边缘开始的滑动手势
* 可以指定要识别的屏幕边缘（左、右、顶部、底部）
* 继承自 UIPanGestureRecognizer，因此具有相同的属性和方法
* 应用场景：侧边菜单、自定义返回手势

```swift
func screenEdgePanGestureRecognizer(_ view:UIView){
    let screenEdgePan = UIScreenEdgePanGestureRecognizer(target: self, action: #selector(screenEdgePan))
    screenEdgePan.edges = .left
    view.addGestureRecognizer(screenEdgePan)
}

@objc func screenEdgePan(_ gesture: UIScreenEdgePanGestureRecognizer) {
    let translation = gesture.translation(in: view)
    
    switch gesture.state {
    case .changed:
        leftSnp?.update(offset: max(-300, min(0, translation.x - 300)))
    case .ended:
        let velocity = gesture.velocity(in: view)
        if velocity.x > 500  {
            // 打开菜单
            UIView.animate(withDuration: 0.3) {
                self.leftSnp?.update(offset: 0)
                self.view.layoutIfNeeded()
            }
        } else {
            // 关闭菜单
            UIView.animate(withDuration: 0.3) {
                self.leftSnp?.update(offset: -300)
                self.view.layoutIfNeeded()
            }
        }
    default:
        break
    }
}
```
