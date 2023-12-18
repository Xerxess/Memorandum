<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Timer 定时器](#timer-定时器)

<!-- /code_chunk_output -->

# Timer 定时器

<https://developer.apple.com/documentation/foundation/timer>

- 主线程中使用定时器时，定时器的触发事件会在主线程上执行，从而可能导致 UI 渲染的堵塞。

```swift
// 创建一个计时器并以默认模式将其调度到当前运行循环上
let timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true, block: {timer in print("执行")})
```

```swift
// ti 秒过去后，计时器触发，将消息 aSelector 发送到 target
class timeClass {
    var name = "小明"
    @objc func timerFun(_ timer: Timer){
        let userInfo = timer.userInfo as! Dictionary<String, String>
        print(self.name)
        print(userInfo["userName"])       
    }
}

let targetTime = timeClass()
let timer2 = Timer.scheduledTimer(timeInterval: 5, target: targetTime, selector: #selector(timeClass.timerFun(_:)), userInfo: ["userName":"小明2"], repeats: true)
```

```swift
//  GCD（Grand Central Dispatch）后台线程上执行定时器的代码
DispatchQueue.global().async {
    let timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
        print("定时器触发时执行的代码")
        // 定时器触发时执行的代码
    }

    RunLoop.current.add(timer, forMode: .default)
    RunLoop.current.run()
}
```
