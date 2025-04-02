
# UIRotationGestureRecognizer

* 连续手势
* 用户必须用两根手指按住视图并旋转它。当用户以圆周运动的方式相对移动手指时，底层视图会以相应的方向和速度旋转。
* 提供旋转角度(var rotation: CGFloat)和速度信息(var velocity: CGFloat)
* 记得在每次处理手势后重置 rotation 属性，否则旋转效果会累积。
* 考虑设置旋转的限制或者处理360度旋转后的情况。
* 应用场景：图片旋转、自定义控件旋转、组合旋转和缩放、地图旋转

```swift
func rotationGestureRecognizer(_ view:UIView){
        let rotation = UIRotationGestureRecognizer(target: self, action: #selector(rotation))
        view.addGestureRecognizer(rotation)
    }
    
    @objc func rotation(_ gesture: UIRotationGestureRecognizer) {
        let rotation = gesture.rotation
        let velocity = gesture.velocity
        switch gesture.state {
        case .possible: break
        case .began:
            print(rotation,velocity)
        case .changed:
            gesture.view!.transform = CGAffineTransform(rotationAngle: rotation)
            print(rotation,velocity)
        case .ended: break
        case .cancelled: break
        case .failed: break
        @unknown default:break
        }
    }
```
