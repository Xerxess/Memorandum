# UINavigationController

# 



# 小笔记

* 透明view 右滑后退无效；  

* 阻止右划

```c++
// 下一个push 的页面将无法右划返回
  if ([self.navigationController respondsToSelector:@selector(interactivePopGestureRecognizer)]) {
    self.navigationController.interactivePopGestureRecognizer.enabled = NO;
  }
```

* leftBarButtonItem 图片渲染成蓝色

```c++

id selectedImage = [image imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
```