
<!-- TOC -->

- [UIPresentationController](#uipresentationcontroller)
- [UIPopoverPresentationController](#uipopoverpresentationcontroller)
- [popoverPresentationController](#popoverpresentationcontroller)
- [UIModalPresentationStyle 样式解析](#uimodalpresentationstyle-样式解析)
- [UIModalTransitionStyle 动画效果](#uimodaltransitionstyle-动画效果)
- [注意](#注意)

<!-- /TOC -->

# UIPresentationController

```c++
@interface UIPresentationController : NSObject
```

https://developer.apple.com/documentation/uikit/uipresentationcontroller?language=objc

一个对象，用于管理过渡动画和屏幕上视图控制器的呈现。

展示控制器，是iOS8的一个新特性,用来展示模态窗口的。它是所有模态控制器的管理者。

* 管理所有Modal出来的控制器

# UIPopoverPresentationController

```c++
@interface UIPopoverPresentationController : UIPresentationController
```

一个对象，用于管理弹出窗口中的内容显示。

方便开发者创建带箭头的弹出控制器，类似qq消息页面点击右上角加号弹出的视图。继承UIPresentationController类，可用于iPhone和iPad ,比之前的UIPopoverController使用方便。

UIPopoverPresentationControllerl类实例不需要直接创建，因为在UIViewController中有一个popoverPresentationController属性，可以从它获取。

* 不直接创建其实例

# popoverPresentationController

https://developer.apple.com/documentation/uikit/uiviewcontroller/1621428-popoverpresentationcontroller?language=objc

获取 UIPopoverPresentationController 实例

```c++
self.popoverPresentationController
```

# UIModalPresentationStyle 样式解析

```c++
typedefNS_ENUM(NSInteger, UIModalPresentationStyle) {
      UIModalPresentationFullScreen =0,//由下到上,全屏覆盖
      UIModalPresentationPageSheet,//在portrait时是FullScreen，在landscape时和FormSheet模式一样。
      UIModalPresentationFormSheet,// 会将窗口缩小，使之居于屏幕中间。在portrait和landscape下都一样，但要注意landscape下如果软键盘出现，窗口位置会调整。
      UIModalPresentationCurrentContext,//这种模式下，presented VC的弹出方式和presenting VC的父VC的方式相同。
      UIModalPresentationCustom,//自定义视图展示风格,由一个自定义演示控制器和一个或多个自定义动画对象组成。符合UIViewControllerTransitioningDelegate协议。使用视图控制器的transitioningDelegate设定您的自定义转换。
      UIModalPresentationOverFullScreen,//如果视图没有被填满,底层视图可以透过
      UIModalPresentationOverCurrentContext,//视图全部被透过
      UIModalPresentationPopover,
      UIModalPresentationNone ,
};
```

# UIModalTransitionStyle 动画效果

```c++
typedef NS_ENUM(NSInteger, UIModalTransitionStyle) {
        UIModalTransitionStyleCoverVertical = 0,
        UIModalTransitionStyleFlipHorizontal __TVOS_PROHIBITED,
        UIModalTransitionStyleCrossDissolve,
        UIModalTransitionStylePartialCurl NS_ENUM_AVAILABLE_IOS(3_2) __TVOS_PROHIBITED,
};
```

# 注意

```c++
TestViewController *testVC = [[TestViewController alloc] init];
testVC.preferredContentSize = CGSizeMake(150, 150);
testVC.modalPresentationStyle = UIModalPresentationPopover;
testVC.popoverPresentationController.delegate = self;
testVC.popoverPresentationController.sourceView = _button;
testVC.popoverPresentationController.sourceRect = CGRectMake(0, 0, _button.bounds.size.width / 2.0, _button.bounds.size.height / 2.0);
testVC.popoverPresentationController.permittedArrowDirections = UIPopoverArrowDirectionLeft;
testVC.popoverPresentationController.backgroundColor = [UIColor redColor];
testVC.popoverPresentationController.canOverlapSourceViewRect = NO;
[self presentViewController:testVC animated:YES completion:^{
    
}];
// 必须添加
#pragma mark - <UIPopoverPresentationControllerDelegate>
- (UIModalPresentationStyle)adaptivePresentationStyleForPresentationController:(UIPresentationController *)controller {
    return UIModalPresentationNone;
}
```