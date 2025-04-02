
# UIPinchGestureRecognizer

* 连续手势
* 用户必须用两根手指按住视图并捏合。当用户将两根手指向内移动时，常规含义是缩小；当用户将两根手指向外移动时，常规含义是放大。
* 检测两个手指的捏合和张开动作
* 提供缩放比例（var scale: CGFloat）和速度信息（var velocity: CGFloat）
* 记得在每次处理手势后重置 scale 属性，否则缩放效果会累积
* 考虑设置最小和最大缩放限制，以防止过度缩放。
* 应用场景：图片缩放 、自定义控件大小调整、地图缩放、各种需要调整大小或缩放的交互场景

```swift
    func pinchGestureRecognizer(_ view:UIView){
        let pinch = UIPinchGestureRecognizer(target: self, action: #selector(pinch))
        view.addGestureRecognizer(pinch)
    }
    
    @objc func pinch(_ gesture: UIPinchGestureRecognizer) {
        let scale = gesture.scale
        let velocity = gesture.velocity
        switch gesture.state {
        case .possible: break
        case .began:
            print(scale,velocity)
        case .changed:
            gesture.view!.transform = CGAffineTransform(scaleX: scale, y: scale)
            print(scale,velocity)
        case .ended: break
        case .cancelled: break
        case .failed: break
        @unknown default:break
        }        
    }
```
