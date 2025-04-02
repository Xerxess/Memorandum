
# Lottie

Lottie 是 Airbnb 开发的一个跨平台库，允许 iOS、Android 和 Web 应用实时渲染 After Effects 动画。它可以播放以 JSON 格式导出的矢量动画，大大简化了复杂动画的实现。

## 动画加载方式

```swift
// 从应用包中加载JSON文件
let animationView = LottieAnimationView(name: "animation_name")

// 从网络URL加载
let animationView = LottieAnimationView()
Animation.loadedFrom(url: URL(string: "https://example.com/animation.json")!) { animation in
    animationView.animation = animation
    animationView.play()
}

// 从文件路径加载
if let filePath = Bundle.main.path(forResource: "animation_name", ofType: "json") {
    let animation = Animation.filepath(filePath)
    let animationView = LottieAnimationView(animation: animation)
    animationView.play()
}
```

## 创建和显示动画

```swift
// 创建 LottieAnimationView
let animationView = LottieAnimationView(name: "animation_name")  // JSON文件名称
animationView.frame = CGRect(x: 0, y: 0, width: 200, height: 200)
animationView.contentMode = .scaleAspectFit
view.addSubview(animationView)

// 播放动画
animationView.play() // 播放一次
// 或者
animationView.play(fromProgress: 0, toProgress: 1, loopMode: .loop) // 循环播放
```

## 动画播放控制

```swift
// 播放
animationView.play()

// 暂停
animationView.pause()

// 停止
animationView.stop()

// 设置播放速度
animationView.animationSpeed = 1.5 // 1.5倍速播放

// 设置循环模式
animationView.loopMode = .loop // 循环播放
animationView.loopMode = .playOnce // 播放一次
animationView.loopMode = .autoReverse // 播放后反向播放
```

## 使用完成回调

```swift
animationView.play { (finished) in
    // 动画完成后的操作
    if finished {
        print("动画播放完成")
    } else {
        print("动画播放中断")
    }
}
```

## 帧控制

```swift
// 指定开始帧和结束帧
animationView.play(fromFrame: 10, toFrame: 50, loopMode: .playOnce)

// 指定开始和结束进度（0-1之间的值）
animationView.play(fromProgress: 0.2, toProgress: 0.8, loopMode: .playOnce)

// 设置当前帧
animationView.currentFrame = 24

// 设置当前进度
animationView.currentProgress = 0.5
```
