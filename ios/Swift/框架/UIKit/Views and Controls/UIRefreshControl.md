# UIRefreshControl

一个标准控件，可以启动滚动视图内容的刷新。

```swift
@MainActor
class UIRefreshControl : UIControl
```

UIRefreshControl对象是您附加到任何UIScrollView对象的标准控件，包括表视图和集合视图。  
将此控件添加到可滚动视图中，为您的用户提供刷新内容的标准方式。  
当用户向下拖动可滚动内容区域的顶部时，滚动视图会显示刷新控件，开始动画其进度指示器，并通知您的应用程序。您使用该通知更新内容并关闭刷新控件。

UIRefreshControl 是 iOS 中的一个用户界面控件，用于实现下拉刷新功能。它通常与 UIScrollView（例如 UITableView 或 UICollectionView）一起使用，以便在用户下拉滚动视图时触发刷新操作。

UIRefreshControl 提供了一个标准的下拉刷新指示器，并在用户下拉滚动视图到一定程度时显示刷新状态。当刷新操作被触发时，你可以执行相应的操作（例如重新加载数据）并更新滚动视图的内容。

```swift
func configureRefreshControl () {
   // Add the refresh control to your UIScrollView object.
   myScrollingView.refreshControl = UIRefreshControl()
   myScrollingView.refreshControl?.addTarget(self, action:
                                      #selector(handleRefreshControl),
                                      for: .valueChanged)
}
    
@objc func handleRefreshControl() {
   // Update your content…


   // Dismiss the refresh control.
   DispatchQueue.main.async {
      self.myScrollingView.refreshControl?.endRefreshing()
   }
}

```

# Topics

## Initializing a refresh control 初始化刷新控件

```swift
//
init()
```

## Accessing the control attributes 访问控件属性

```swift
// 刷新控制的色调颜色。
var tintColor: UIColor! { get set }

// 刷新控件中要显示的样式标题文本。
// 此属性的默认值为nil。
var attributedTitle: NSAttributedString? { get set }
```

## Managing the refresh statusin page link 管理页面链接中的刷新状态

```swift
// 告诉控件刷新操作已以编程方式启动。
// 用于手动开始刷新操作并显示刷新状态。
// 当你希望在初始化或者其他事件中手动触发刷新操作时，可以调用 beginRefreshing() 方法来启动刷新，并显示刷新指示器的状态。
// 这可以用于在用户未触发下拉动作的情况下，主动执行刷新操作。
// 当刷新操作结束时，请务必调用endRefreshing()方法将控件返回到其默认状态。
func beginRefreshing()

// 告诉控件刷新操作已经结束。
func endRefreshing()

// 一个布尔值，指示刷新操作是否已触发并正在进行中。
var isRefreshing: Bool { get }
```
