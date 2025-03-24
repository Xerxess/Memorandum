
# ConnectablePublisher

* 订阅时不立即发送数据，需要调用connect()方法触发
* 支持多播，所有订阅者接收相同的数据
* 在处理昂贵的操作或热数据源时特别有用
* 提供autoconnect()方法可转换为普通Publisher

符合ConnectablePublisher协议的发布者:

* Publishers.MakeConnectable 将任何发布者转换为可连接的
* Publishers.Multicast 共享值
* Timer.TimerPublisher 需要定时触发操作
* Publishers.Share 内部使用了 multicast + autoconnect

https://developer.apple.com/documentation/combine/publishers/makeconnectable

> Publishers.MakeConnectable

```swift
// 创建一个可连接的发布者
let publisher = PassthroughSubject<Int, Never>()
let connectablePublisher = publisher.makeConnectable()

// 添加第一个订阅者
let subscription1 = connectablePublisher.sink { value in
    print("订阅者1收到: \(value)")
}

// 添加第二个订阅者
let subscription2 = connectablePublisher.sink { value in
    print("订阅者2收到: \(value)")
}

// 此时两个订阅者都已准备好，但尚未收到任何数据
let connection = connectablePublisher.connect()  // 开始发送数据

// 发送数据
publisher.send(1)
publisher.send(2)

// 输出:
// 订阅者1收到: 1
// 订阅者2收到: 1
// 订阅者1收到: 2
// 订阅者2收到: 2
```

> Publishers.Multicast

```swift
// 1. 创建 multicast 发布者
let multicastPublisher = [1, 2, 3].publisher
    .map { $0 * 2 }
    .multicast(subject: PassthroughSubject<Int, Never>())

// 2. 添加订阅者
let subscription1 = multicastPublisher
    .sink { value in
        print("Subscriber 1: \(value)")
    }

let subscription2 = multicastPublisher
    .sink { value in
        print("Subscriber 2: \(value)")
    }

// 3. 连接到上游发布者
let connection = multicastPublisher.connect()

// 输出:
// Subscriber 1: 2
// Subscriber 2: 2
// Subscriber 1: 4
// Subscriber 2: 4
// Subscriber 1: 6
// Subscriber 2: 6

// 4. 断开连接
connection.cancel()
```

> Timer.TimerPublisher

```swift
Timer.publish(every: 1, on: .main, in: .default).autoconnect().sink { date in
                handler(date)
            }
```

> Publishers.Share

```swift
// share() 内部使用了 multicast + autoconnect
let publisher = [1, 2, 3].publisher
    .map { $0 * 2 }
    .share()

// 等效于:
// let publisher = [1, 2, 3].publisher
//     .map { $0 * 2 }
//     .multicast(subject: PassthroughSubject<Int, Never>())
//     .autoconnect()
```