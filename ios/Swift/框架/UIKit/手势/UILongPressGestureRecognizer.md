
# UILongPressGestureRecognizer

* 连续手势
* 可以设置触发长按所需的最小时间
* 可以设置在长按过程中允许的最大移动距离
* 提供完整的手势状态（began, changed, ended 等）
* 长按手势已经进入了 .began 或 .changed 状态。一旦手势开始，它不会自动失败，而是会继续跟踪触摸事件。
* 应用场景： 上下文菜单（Context Menu）、拖拽重排功能、实现类似 3D Touch 预览功能、自定义编辑模式、拖拽编辑控件

```swift
 func longPressGestureRecognizer(_ view:UIView){
        let long = UILongPressGestureRecognizer(target: self, action: #selector(handleLongPress))
        // 是指在 100 的范围内滑动也会识别长按手势 进入到 .began 状态
        long.allowableMovement = 100
        view.addGestureRecognizer(long)
    }
    
    @objc func long(sender:UILongPressGestureRecognizer){
        print(sender.state.rawValue)
        switch sender.state {
        case .began:
            print("began")
        case .changed:
            print("changed")
        case .cancelled:
            print("cancelled")
        case .failed:
            print("failed")
        case .ended:
            print("ended")
        default:break
        }
    }

    @objc func handleLongPress(_ gesture: UILongPressGestureRecognizer) {
        switch sender.state {
        case .began:
        let location = gesture.location(in:gesture.view!)
        let editMenuInteraction = UIEditMenuInteraction(delegate: self)
        gesture.view!.addInteraction(editMenuInteraction)
        
        let configuration = UIEditMenuConfiguration(identifier: nil, sourcePoint: location)
        editMenuInteraction.presentEditMenu(with: configuration)
        default:break
      }
    }

        // UIEditMenuInteractionDelegate 方法
    func editMenuInteraction(_ interaction: UIEditMenuInteraction, menuFor configuration: UIEditMenuConfiguration, suggestedActions: [UIMenuElement]) -> UIMenu? {
        // 创建自定义菜单项
        let customAction = UIAction(title: "自定义操作", image: UIImage(systemName: "star")) { _ in
            print("执行自定义操作")
        }
        
        // 组合系统建议的操作和自定义操作
        let allActions = suggestedActions + [customAction]
        
        // 创建并返回菜单
        return UIMenu(children: allActions)
    }
```