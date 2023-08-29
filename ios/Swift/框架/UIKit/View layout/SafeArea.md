# SafeArea 安全区域

安全区域可帮助您将视图放置在整体界面的可见部分。UIKit定义的视图控制器可能会将特殊视图放置在内容的顶部。例如，导航控制器在底层视图控制器内容的顶部显示导航栏。即使这些观点是部分透明的，它们仍然会掩盖它们下面的内容。在tvOS中，安全区域还包括屏幕的过扫描插图，这些插图代表屏幕边框覆盖的区域。

使用安全区域作为布局内容的辅助工具。每个视图都有自己的布局指南（可从safeAreaLayoutGuide属性访问），您可以使用该指南为视图中的项目创建约束。如果您不使用自动布局来定位视图，则可以从视图的safeAreaInsets属性中获取原始插入值。

## 扩展安全区域以包含自定义视图

以下代码显示了容器视图控制器的viewDidAppear(_:)方法，该方法扩展了其子视图控制器的安全区域以考虑自定义视图.  
在此方法中进行修改，因为在将视图添加到视图层次结构之前，视图的安全区域嵌入是不准确的。

```swift
override func viewDidAppear(_ animated: Bool) {
   var newSafeArea = UIEdgeInsets()
   // Adjust the safe area to accommodate 
   //  the width of the side view.
   if let sideViewWidth = sideView?.bounds.size.width {
      newSafeArea.right += sideViewWidth
   }
   // Adjust the safe area to accommodate 
   //  the height of the bottom view.
   if let bottomViewHeight = bottomView?.bounds.size.height {
      newSafeArea.bottom += bottomViewHeight
   }
   // Adjust the safe area insets of the 
   //  embedded child view controller.
   let child = self.childViewControllers[0]
   child.additionalSafeAreaInsets = newSafeArea
}
```

## safeAreaInsets

您用于确定此视图的安全区域的插图。

safeAreaInsets 是 UIView 类的一个只读属性，用于获取视图的安全区域边距（即安全区域相对于视图的内边距）。  
它返回一个 UIEdgeInsets 对象，该对象包含了四个边距值：top、left、bottom 和 right，用于表示视图的安全区域与视图边界之间的距离。

UIEdgeInsets 是一个结构体，定义了一组用于描述边距的属性。其属性如下：

* top：顶部边距的值。
* left：左侧边距的值。
* bottom：底部边距的值。
* right：右侧边距的值。

请注意，safeAreaInsets 属性仅在视图被添加到视图层次结构中并进行布局之后才会返回正确的值。因此，最好在视图控制器的生命周期方法（如 viewDidLoad 或 viewDidAppear）中使用该属性来获取安全区域边距。

## safeAreaLayoutGuide

布局指南代表您的视图中不被栏和其他内容遮挡的部分。

```swift
var safeAreaLayoutGuide: UILayoutGuide { get }
```

## safeAreaInsetsDidChange()

当视图的安全区域发生变化时调用。  
用于在视图的安全区域边距发生变化时被调用。  
您可以`重写`此方法来响应安全区域边距的更改，并在需要时更新界面布局或进行其他操作。  

当设备的界面方向发生变化、设备进入多任务模式、显示或隐藏状态栏等情况时，安全区域边距可能会发生变化，从而触发 safeAreaInsetsDidChange() 方法的调用。

```swift
func safeAreaInsetsDidChange()
```

```swift
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }

    func setupUI() {
        // 设置界面布局...
    }

    override func safeAreaInsetsDidChange() {
        super.safeAreaInsetsDidChange()
        // 安全区域边距发生变化，执行相应操作
        updateLayout()
    }

    func updateLayout() {
        // 更新界面布局...
    }
}
```

## insetsLayoutMarginsFromSafeArea

一个布尔值，指示视图的布局边距是否自动更新以反映安全区域。

用于控制是否将安全区域边距应用于布局边距（layout margins）。  
当该属性设置为 true 时，默认情况下，视图的布局边距将受到安全区域边距的影响。  
当该属性设置为 false 时，布局边距将不受安全区域边距的影响。

```swift
// default true
var insetsLayoutMarginsFromSafeArea: Bool { get set }
```
