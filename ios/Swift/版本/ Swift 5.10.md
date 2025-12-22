# Swift 5.10

## 在“Delegation”部分添加了有关嵌套协议的信息

- 协议可以嵌套在结构和类等类型声明中

```swift
class DiceGame {
    let sides: Int
    let generator = LinearCongruentialGenerator()
    weak var delegate: Delegate?

    // 嵌套协议
    protocol Delegate: AnyObject {
        func gameDidStart(_ game: DiceGame)
        func game(_ game: DiceGame, didEndRound round: Int, winner: Int?)
        func gameDidEnd(_ game: DiceGame)
    }
}
```

## 在UIApplicationMain和NSApplicationMain部分添加了弃用信息。

- UIApplicationMain:该属性已被弃用；请改用 main 属性。在 Swift 6 中，使用此属性将会出错。
- NSApplicationMain:此属性已弃用；改用 main 属性。在Swift 6中，使用此属性将出现错误。
