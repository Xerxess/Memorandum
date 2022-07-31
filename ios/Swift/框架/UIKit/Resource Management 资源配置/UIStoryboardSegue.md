<!-- TOC -->

- [UIStoryboardSegue](#uistoryboardsegue)

<!-- /TOC -->


# UIStoryboardSegue

准备并执行两个视图控制器之间视觉转换的对象。

UIStoryboardSegue类支持UIKit中可用的标准视觉过渡。  
您还可以子类来定义故事板文件中视图控制器之间的自定义过渡。  
Segue对象包含有关过渡中涉及的视图控制器的信息。  
当触发后列时，但在视觉转换发生之前，故事板运行时调用当前视图控制器的 prepare(for:sender:) 方法，以便它可以将任何所需的数据传递给即将显示的视图控制器。  

`不直接创建segue对象`。  
相反，当故事板运行时必须在两个视图控制器之间执行续集时，它会创建它们。如果您愿意，您仍然可以使用UIViewController的 performSegue(withIdentifier:sender:) 方法以编程方式启动segue。您可以这样做来从以编程方式添加的源启动序列，因此在Interface Builder中不可用。

```swift
@MainActor class UIStoryboardSegue : NSObject
```