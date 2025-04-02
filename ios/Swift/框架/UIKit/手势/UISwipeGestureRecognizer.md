
# UISwipeGestureRecognizer

* 离散手势
* 解释一个或多个方向的滑动手势
* 非常适用于需要快速、简单滑动交互的场景

```swift
func swipeGestureRecognizer(_ view:UIView){
    let swipe = UISwipeGestureRecognizer(target: self, action: #selector(swipe))
    swipe.direction = .left
    view.addGestureRecognizer(swipe)
}

@objc func swipe(sender:UITapGestureRecognizer){
    print(sender.state.rawValue)
}
```
