<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NotificationCenter](#notificationcenter)

<!-- /code_chunk_output -->

# NotificationCenter

- 优势
  - 多个收件人
  - 松耦合
  - 全球接入点,不需要（或只是不关心）代码中的依赖注入时，单例样式的方法 defaultCenter 允许您轻松地将两个随机对象连接在一起
- 缺点
  - 无法使用调试器介入
  - 不明显的控制流
  - 第三方库可能依赖与您的代码相同的通知并相互干扰
  - 无法控制谁有资格发送特定通知。

一种通知调度机制，可以向注册观察者广播信息

- .addObserver(forName: notificationName, object: nil, queue: nil) obj不为nil 可以过虑指定对象的通知

```swift
let notificationCenter = NotificationCenter.default
let notificationName = Notification.Name("test")

notificationCenter.addObserver(forName: notificationName, object: nil, queue: nil){
    notification in    
    let userName_object = notification.object as! String
    let userName_userInfo = notification.userInfo?["userName"]
    print("notification:\(userName_object);\(userName_userInfo)")
}
let notification = Notification(name: notificationName, object: "小明1", userInfo: ["userName":"小明2"])
notificationCenter.post(notification)
// notification:小明1;Optional("小明2")
notificationCenter.post(name: notificationName, object: "小明1", userInfo: ["userName":"小明2"])
// notification:小明1;Optional("小明2")
```

```swift
notificationCenter.addObserver(forName: notificationName, object: "小明", queue: nil){
    notification in    
    let userName_object = notification.object as! String
    let userName_userInfo = notification.userInfo?["userName"]
    print("notification:\(userName_object);\(userName_userInfo)")
}
notificationCenter.post(name: notificationName, object: "小明1", userInfo: ["userName":"小明2"])
// 无打印，object 指定对象不符合
```

```swift
let notificationCenter = NotificationCenter.default
let notificationName = Notification.Name("test")
class NotificationClass {
    var name = "小明"
    @objc func notificationFunc(_ notification:Notification){
        let userName = notification.userInfo?["userName"]
        let obj = notification.object as! NotificationClass
        print("notification: \(userName)-\(obj.name)")
    }
}
let classTaget = NotificationClass()
notificationCenter.addObserver(classTaget, selector: #selector(NotificationClass.notificationFunc(_:)), name: notificationName, object: classTaget)

let notification = Notification(name: notificationName, object: classTaget, userInfo:nil)
notificationCenter.post(notification)
// notification: nil-小明
notificationCenter.post(name: notificationName, object: classTaget)
// notification: nil-小明
notificationCenter.post(name: notificationName, object: nil)
// 无输出 object 有具体类型，不符合通知接收要求
```
