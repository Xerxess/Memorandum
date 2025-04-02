
# UITapGestureRecognizer

* 离散手势
* 点击&双击

```swift
func tapGestureRecognizer(_ view:UIView){
    let tap = UITapGestureRecognizer(target: self, action: #selector(methodTap))
    tap.numberOfTapsRequired = 2
    view.addGestureRecognizer(tap)
    
    let tap1 = UITapGestureRecognizer(target: self, action: #selector(methodTap))
    tap1.numberOfTapsRequired = 1
    view.addGestureRecognizer(tap1)
    
    // tap1 需要 tap 失败后生效
    tap1.require(toFail: tap)
}

@objc func methodTap(sender:UITapGestureRecognizer){
    print(sender.state)
    print(sender.location(in: sender.view))
    print(sender.location(in: view))
    print("methodTap",sender.numberOfTapsRequired)
}
```
