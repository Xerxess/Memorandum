<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Publishers](#publishers)
  - [Working with subscribers 指定的订阅者](#working-with-subscribers-指定的订阅者)
  - [map、replaceNil、scan](#map-replacenil-scan)
  - [filter、compactMap、removeDuplicates、replaceEmpty](#filter-compactmap-removeduplicates-replaceempty)
  - [collect、ignoreOutput、reduce](#collect-ignoreoutput-reduce)
  - [count、max、min](#count-max-min)
  - [contains、allSatisfy](#contains-allsatisfy)
  - [drop、append、prepend、prefix](#drop-append-prepend-prefix)
  - [first、last、output](#first-last-output)
  - [combineLatest](#combinelatest)
  - [merge](#merge)
  - [zip](#zip)
  - [flatMap、switchToLatest](#flatmap-switchtolatest)
  - [assertNoFailure、catch、tryCatch、retry](#assertnofailure-catch-trycatch-retry)
  - [measureInterval、debounce、delay、throttle、timeout](#measureinterval-debounce-delay-throttle-timeout)
  - [encode、decode](#encode-decode)
  - [map(KeyPath提取)](#mapkeypath提取)
  - [multicast、share(共享)](#multicast-share共享)
  - [buffer](#buffer)
  - [eraseToAnyPublisher 类型擦除](#erasetoanypublisher-类型擦除)
  - [schedulers 线程调度](#schedulers-线程调度)
  - [makeConnectable](#makeconnectable)
  - [assign、sink（subscribers）](#assign-sinksubscribers)
  - [Accessing elements asynchronously](#accessing-elements-asynchronously)
  - [breakpoint、handleEvents、print](#breakpoint-handleevents-print)

<!-- /code_chunk_output -->

# Publishers

Operator 就像一个管道。它本质上是一个发布者，将其他发布者作为其上游，并将订阅者作为其下游。在管道之间，我们可以做一些过滤工作、转换或我们想做的任何事情。

## Working with subscribers 指定的订阅者

```swift
// 将指定的订阅者附加到该发布者。 不直接调用，由创建自定义Publisher 覆盖
func receive<S>(subscriber: S)

// 将指定的订阅者附加到该发布者。 会调用func receive<S>(subscriber: S)
func subscribe<S>(S)
func subscribe<S>(S) -> AnyCancellable
```

## map、replaceNil、scan

```swift
// 使用提供的闭包转换来自上游出版商的所有元素。
func map<T>((Self.Output) -> T) -> Publishers.Map<Self, T>

// 使用提供的错误抛出闭包转换来自上游发布者的所有元素。
func tryMap<T>((Self.Output) throws -> T) -> Publishers.TryMap<Self, T>

// 将发布者发出的错误（Failure）转换成另一种你定义的错误类型。
func mapError<E>((Self.Failure) -> E) -> Publishers.MapError<Self, E>

// 如果数据流中出现了 nil，将其替换为一个具体的非空值。
func replaceNil<T>(with: T) -> Publishers.Map<Self, T>

// 会保存上一次的计算结果，并与当前发出的新值进行合并。
func scan<T>(T, (T, Self.Output) -> T) -> Publishers.Scan<Self, T>
func tryScan<T>(T, (T, Self.Output) throws -> T) -> Publishers.TryScan<Self, T>

// 为一个原本“永不报错”的发布者（Failure 是 Never）强行指定一个错误类型。
func setFailureType<E>(to: E.Type) -> Publishers.SetFailureType<Self, E>


// 示例 scan
let publisher = [1, 2, 3, 4, 5].publisher
let scanPublisher = publisher.scan(0) { (accumulator, value) in
    return accumulator + value
}
let cancellable = scanPublisher.sink { value in
    print(value)
}
// Output:
// 1
// 3
// 6
// 10
// 15
```

## filter、compactMap、removeDuplicates、replaceEmpty

```swift
// 只有满足条件的（返回 true）值才能通过。
func filter((Self.Output) -> Bool) -> Publishers.Filter<Self>
func tryFilter((Self.Output) throws -> Bool) -> Publishers.TryFilter<Self>

// 尝试转换数据，如果是 nil 则自动过滤掉（类似数组的 compactMap）。
func compactMap<T>((Self.Output) -> T?) -> Publishers.CompactMap<Self, T>
func tryCompactMap<T>((Self.Output) throws -> T?) -> Publishers.TryCompactMap<Self, T>

// 跳过连续重复的值。
func removeDuplicates() -> Publishers.RemoveDuplicates<Self>
func removeDuplicates(by: (Self.Output, Self.Output) -> Bool) -> Publishers.RemoveDuplicates<Self>
func tryRemoveDuplicates(by: (Self.Output, Self.Output) throws -> Bool) -> Publishers.TryRemoveDuplicates<Self>

// 如果 Publisher 一个值都没发就结束了，则发出这个预设的默认值。
func replaceEmpty(with: Self.Output) -> Publishers.ReplaceEmpty<Self>

// 一旦发生错误，就发回这个预设值，并正常结束流。
func replaceError(with: Self.Output) -> Publishers.ReplaceError<Self>


// 示例 compactMap
let publisher = ["1", "2", "3", "four", "5"].publisher
let compactMapPublisher = publisher.compactMap { value in
    return Int(value)
}
let cancellable = compactMapPublisher.sink { value in
    print(value)
}

// 1
// 2
// 3 
// 5


// 示例 removeDuplicates
let publisher = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4].publisher
let removeDuplicatesPublisher = publisher.removeDuplicates()
let cancellable = removeDuplicatesPublisher.sink { value in
    print(value)
}

// Output:
// 1
// 2
// 3
// 4
```

## collect、ignoreOutput、reduce

```swift
// collect 系列（打包分发）
// 将流中散落的单个元素收集起来，改为发送一个数组。
// 无限期收集，直到流完成时，一次性把所有值作为一个数组发出。
func collect() -> Publishers.Collect<Self> 
// 按数量收集。比如 collect(3)，每攒满 3 个值就发一个数组。
func collect(Int) -> Publishers.CollectByCount<Self>
// 按时间收集。比如“每 2 秒打包一次收到的数据”。
func collect<S>(Publishers.TimeGroupingStrategy<S>, options: S.SchedulerOptions?) -> Publishers.CollectByTime<Self, S>

// 完全忽略发出的值，只转发“完成”或“错误”信号。
func ignoreOutput() -> Publishers.IgnoreOutput<Self>

// 与 scan 非常相似，但有一个重大区别——scan 每次计算都会发值，而 reduce 只在流结束时发一次最终值。
func reduce<T>(T, (T, Self.Output) -> T) -> Publishers.Reduce<Self, T>
Applies a closure that collects each element of a stream and publishes a final result upon completion.
func tryReduce<T>(T, (T, Self.Output) throws -> T) -> Publishers.TryReduce<Self, T>

// 示例 collect
let publisher = [1, 2, 3, 4, 5].publisher
let collectPublisher = publisher.collect()
let cancellable = collectPublisher.sink { values in
    print(values)
}

// Output:
// [1, 2, 3, 4, 5]



// 示例 collect(3)
let publisher = [1, 2, 3, 4, 5].publisher
let collectByCountPublisher = publisher.collect(3)
let cancellable = collectByCountPublisher.sink { values in
    print(values)
}

// Output:
// [1, 2, 3]
// [4, 5]



// 示例 reduce
let publisher = [1, 2, 3, 4, 5].publisher
let reducePublisher = publisher.reduce(0) { (result, value) -> Int in
    return result + value
}
let cancellable = reducePublisher.sink { value in
    print("\(value)")
}

// 15
```

## count、max、min

```swift
// 统计流中一共发出了多少个元素。
func count() -> Publishers.Count<Self>

// max() & min() 系列（最值查找）
func max() -> Publishers.Comparison<Self>
func max(by: (Self.Output, Self.Output) -> Bool) -> Publishers.Comparison<Self>
func tryMax(by: (Self.Output, Self.Output) throws -> Bool) -> Publishers.TryComparison<Self>
func min() -> Publishers.Comparison<Self>
func min(by: (Self.Output, Self.Output) -> Bool) -> Publishers.Comparison<Self>
func tryMin(by: (Self.Output, Self.Output) throws -> Bool) -> Publishers.TryComparison<Self>
```

## contains、allSatisfy

```swift
// contains 系列（是否存在）
// 检查流中是否包含某个特定的值，或者是否有值满足某个条件。
func contains(Self.Output) -> Publishers.Contains<Self>
func contains(where: (Self.Output) -> Bool) -> Publishers.ContainsWhere<Self>
func tryContains(where: (Self.Output) throws -> Bool) -> Publishers.TryContainsWhere<Self>

// allSatisfy 系列（是否全部满足）
// 检查流中的所有元素是否都符合某个条件。
func allSatisfy((Self.Output) -> Bool) -> Publishers.AllSatisfy<Self>
func tryAllSatisfy((Self.Output) throws -> Bool) -> Publishers.TryAllSatisfy<Self>
```

## drop、append、prepend、prefix

```swift
// drop 系列（丢弃/跳过）
func drop<P>(untilOutputFrom: P) -> Publishers.DropUntilOutput<Self, P>
func dropFirst(Int) -> Publishers.Drop<Self>
func drop(while: (Self.Output) -> Bool) -> Publishers.DropWhile<Self>
func tryDrop(while: (Self.Output) throws -> Bool) -> Publishers.TryDropWhile<Self>

// append 系列（末尾追加）
func append(Self.Output...) -> Publishers.Concatenate<Self, Publishers.Sequence<[Self.Output], Self.Failure>>
func append<S>(S) -> Publishers.Concatenate<Self, Publishers.Sequence<S, Self.Failure>>
func append<P>(P) -> Publishers.Concatenate<Self, P>

// prepend 系列（头部插入）
func prepend(Self.Output...) -> Publishers.Concatenate<Publishers.Sequence<[Self.Output], Self.Failure>, Self>
func prepend<S>(S) -> Publishers.Concatenate<Publishers.Sequence<S, Self.Failure>, Self>
func prepend<P>(P) -> Publishers.Concatenate<P, Self>

// prefix 系列（截取/限流）
func prefix(Int) -> Publishers.Output<Self>
func prefix(while: (Self.Output) -> Bool) -> Publishers.PrefixWhile<Self>
func tryPrefix(while: (Self.Output) throws -> Bool) -> Publishers.TryPrefixWhile<Self>
func prefix<P>(untilOutputFrom: P) -> Publishers.PrefixUntilOutput<Self, P>
```

## first、last、output

```swift
// first 系列（提取首个
func first() -> Publishers.First<Self>
func first(where: (Self.Output) -> Bool) -> Publishers.FirstWhere<Self>
func tryFirst(where: (Self.Output) throws -> Bool) -> Publishers.TryFirstWhere<Self>

// last 系列（提取末尾）
func last() -> Publishers.Last<Self>
func last(where: (Self.Output) -> Bool) -> Publishers.LastWhere<Self>
func tryLast(where: (Self.Output) throws -> Bool) -> Publishers.TryLastWhere<Self>

// output 系列（按索引提取）
func output(at: Int) -> Publishers.Output<Self>
func output<R>(in: R) -> Publishers.Output<Self>
```

## combineLatest

```swift
// 用于将多个发布者（publishers）的最新值进行组合
// 常见场景
// - 表单验证：只有当“用户名”、“密码”和“验证码”三个输入框都有内容，且内容合法时，才启用“登录”按钮。
// - 多状态合成：比如 UI 依赖于“网络请求结果”和“用户本地设置”两个源。
func combineLatest<P, T>(P, (Self.Output, P.Output) -> T) -> Publishers.Map<Publishers.CombineLatest<Self, P>, T>
func combineLatest<P>(P) -> Publishers.CombineLatest<Self, P>
func combineLatest<P, Q, T>(P, Q, (Self.Output, P.Output, Q.Output) -> T) -> 
func combineLatest<P, Q>(P, Q) -> Publishers.CombineLatest3<Self, P, Q>
func combineLatest<P, Q, R, T>(P, Q, R, (Self.Output, P.Output, Q.Output, R.Output) -> T) -> Publishers.Map<Publishers.CombineLatest4<Self, P, Q, R>, T>
func combineLatest<P, Q, R>(P, Q, R) -> Publishers.CombineLatest4<Self, P, Q, R>



// 代码示例：登录表单
let username = PassthroughSubject<String, Never>()
let password = PassthroughSubject<String, Never>()

// 协作：合并两个流
let isLoginButtonEnabled = username.combineLatest(password)
    .map { user, pass in
        return !user.isEmpty && pass.count >= 6
    }
    .sink { isEnabled in
        print("登录按钮是否可用: \(isEnabled)")
    }

username.send("john")    // 此时什么都不打印（因为密码还没发过值）
password.send("123")    // 打印：false (密码不够长)
password.send("123456") // 打印：true (两者都满足了)
username.send("smith")   // 打印：true (用户名更新了，取密码最新的 123456)


// 示例 combineLatest
let pub1 = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<Int, Never>()
cancellable = pub1
    .combineLatest(pub2)
    .sink { print("Result: \($0).") }
pub1.send(1)
pub1.send(2)
pub2.send(2)
pub1.send(3)
pub1.send(45)
pub2.send(22)

// Prints:
//    Result: (2, 2).    // pub1 latest = 2, pub2 latest = 2
//    Result: (3, 2).    // pub1 latest = 3, pub2 latest = 2
//    Result: (45, 2).   // pub1 latest = 45, pub2 latest = 2
//    Result: (45, 22).  // pub1 latest = 45, pub2 latest = 22



// 示例 combineLatest
let pub1 = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<Int, Never>()
let cancellable = pub1
    .combineLatest(pub2) { (first, second) in
        print("\(first),\(second)")
        return first * second
    }
    .sink { print("Result: \($0).") }
pub1.send(1)
pub1.send(2)
pub2.send(2)
pub1.send(9)
pub1.send(3)
pub2.send(12)
pub1.send(13)
// 2,2
// Result: 4.
// 9,2
// Result: 18.
// 3,2
// Result: 6.
// 3,12
// Result: 36.
// 13,12
// Result: 156.

// 组合规则 【pub1.send(2)，pub2.send(2)] , [pub1.send(9),pub2.send(2)] ,[pub1.send(3),pub2.send(2)] ,[pub1.send(3),pub2.send(12)]  ,[pub1.send(13),pub2.send(12)] 
```

## merge

```swift
// 常见场景
// - 多源数据流合一：比如你有一个页面，数据既可以来自“下拉刷新”，也可以来自“自动轮询”，还可以来自“底部加载更多”。你可以把这三个 Publisher merge 起来，统一交给一个处理逻辑。
// - UI 事件聚合：界面上有三个不同的按钮（加、减、清空），点击它们都会改变同一个数值。

// 合并 将来自多个发布者的元素作为交错流重新发布
func merge(with: Self) -> Publishers.MergeMany<Self>
func merge<P>(with: P) -> Publishers.Merge<Self, P>
func merge<B, C>(with: B, C) -> Publishers.Merge3<Self, B, C>
func merge<B, C, D>(with: B, C, D) -> Publishers.Merge4<Self, B, C, D>
func merge<B, C, D, E>(with: B, C, D, E) -> Publishers.Merge5<Self, B, C, D, E>
func merge<B, C, D, E, F>(with: B, C, D, E, F) -> Publishers.Merge6<Self, B, C, D, E, F>
func merge<B, C, D, E, F, G>(with: B, C, D, E, F, G) -> Publishers.Merge7<Self, B, C, D, E, F, G>
func merge<B, C, D, E, F, G, H>(with: B, C, D, E, F, G, H) -> Publishers.Merge8<Self, B, C, D, E, F, G, H>


// 代码示例：多按钮触发
let tapButtonA = PassthroughSubject<String, Never>()
let tapButtonB = PassthroughSubject<String, Never>()

// 协作：把两个按钮事件合并
tapButtonA.merge(with: tapButtonB)
    .sink { value in
        print("收到了来自 \(value) 的点击")
    }

tapButtonA.send("按钮A") // 输出：收到了来自 按钮A 的点击
tapButtonB.send("按钮B") // 输出：收到了来自 按钮B 的点击



// 示例 merge(with)
let publisher = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<Int, Never>()
cancellable = publisher
    .merge(with: pub2)
    .sink { print("\($0)", terminator: " " )}
publisher.send(2)
pub2.send(2)
publisher.send(3)
pub2.send(22)
publisher.send(45)
pub2.send(22)
publisher.send(17)
// Prints: "2 2 3 22 45 22 17"
```

## zip

```swift
// 成对等待：zip 会等待所有参与的 Publisher 都发出“第 N 个”值。只有当所有源都凑齐了第 N 个值，它才会把它们打包成元组（Tuple）发出来。

// 常见场景
// - 并行且相关的异步任务：比如你需要同时调用“获取用户信息”和“获取用户头像”两个接口。只有当两个都返回成功时，才一起渲染 UI。
// - 多步确认逻辑：比如一个流程中需要“用户输入”和“系统验证码”同时匹配。
func zip<P>(P) -> Publishers.Zip<Self, P>
func zip<P, T>(P, (Self.Output, P.Output) -> T) -> Publishers.Map<Publishers.Zip<Self, P>, T>
func zip<P, Q>(P, Q) -> Publishers.Zip3<Self, P, Q>
func zip<P, Q, T>(P, Q, (Self.Output, P.Output, Q.Output) -> T) -> Publishers.Map<Publishers.Zip3<Self, P, Q>, T>
func zip<P, Q, R>(P, Q, R) -> Publishers.Zip4<Self, P, Q, R>
func zip<P, Q, R, T>(P, Q, R, (Self.Output, P.Output, Q.Output, R.Output) -> T) -> Publishers.Map<Publishers.Zip4<Self, P, Q, R>, T>


// 代码示例：双接口同步
let userProfile = PassthroughSubject<String, Never>()
let userAvatar = PassthroughSubject<String, Never>()
// 协作：严格配对
userProfile.zip(userAvatar)
    .sink { profile, avatar in
        print("✅ 组合成功：使用 \(profile) 和 \(avatar) 渲染页面")
    }
userProfile.send("张三")     // 此时什么都不打印（在等头像）
userProfile.send("李四")     // 依然不打印（头像一个都没来）
userAvatar.send("头像1")     // 打印：张三 + 头像1（配成第一对）
userAvatar.send("头像2")     // 打印：李四 + 头像2（配成第二对）


// 示例 zip
let numbersPub = PassthroughSubject<Int, Never>()
let lettersPub = PassthroughSubject<String, Never>()
let cancellable = numbersPub
    .zip(lettersPub)
    .sink { print("\($0)") }
numbersPub.send(1)    // numbersPub: 1      lettersPub:        zip output: <none>
numbersPub.send(2)    // numbersPub: 1,2    lettersPub:        zip output: <none>
lettersPub.send("A")     // numbers: 1,2       letters:"A"        zip output: <none>
numbersPub.send(3)       // numbers: 1,2,3     letters:           zip output: (1,"A")
lettersPub.send("B")     // numbers: 1,2,3     letters: "B"       zip output: (2,"B")
// Prints:
//  (1, "A")
//  (2, "B")
```

## flatMap、switchToLatest

```swift
// flatMap（并行转换）
// 作用：每当上游发来一个值，flatMap 都会为其创建一个新的（Publisher），并将所有Publisher的数据汇聚到一起。
func flatMap<T, P>(maxPublishers: Subscribers.Demand, (Self.Output) -> P) -> Publishers.FlatMap<P, Self>
func flatMap<P>(maxPublishers: Subscribers.Demand, (Self.Output) -> P) -> Publishers.FlatMap<P, Publishers.SetFailureType<Self, P.Failure>>
func flatMap<P>(maxPublishers: Subscribers.Demand, (Self.Output) -> P) -> Publishers.FlatMap<P, Self>
func flatMap<P>(maxPublishers: Subscribers.Demand, (Self.Output) -> P) -> Publishers.FlatMap<Publishers.SetFailureType<P, Self.Failure>, Self>

// 最新优先/自动取消
// 作用：如果你正在处理一个子Publisher，此时上游发来了一个新的Publisher，switchToLatest 会立即取消掉旧的，只听最新的。
// 要求：上游 Publisher 发出的值必须也是一个 Publisher 类型。
// 场景（经典应用）
//  - 搜索框（Search-as-you-type）：用户输入 a 发起请求，紧接着输入 ap。此时旧的 a 请求已经没意义了，应立即掐断，改听 ap 的结果。
//  - 点击切换：点击 Tab A 加载数据，中途点击 Tab B。Tab A 的请求应该被自动取消。
func switchToLatest() -> Publishers.SwitchToLatest<Self.Output, Self>
func switchToLatest() -> Publishers.SwitchToLatest<Self.Output, Publishers.SetFailureType<Self, Self.Output.Failure>>
func switchToLatest() -> Publishers.SwitchToLatest<Publishers.SetFailureType<Self.Output, Self.Failure>, Publishers.Map<Self, Publishers.SetFailureType<Self.Output, Self.Failure>>>
func switchToLatest() -> Publishers.SwitchToLatest<Self.Output, Self>



// 示例 flatMap
let numbers = [1, 2, 3, 4, 5]
let numberPublisher = numbers.publisher
let mappedPublisher = numberPublisher.flatMap { number in
    Just("\(number * 2)")
}
let cancellable = mappedPublisher.sink { value in
    print(value)
}

// Output:
// 2
// 4
// 6
// 8
// 10
```

## assertNoFailure、catch、tryCatch、retry

```swift
// 开发调试断言
func assertNoFailure(String, file: StaticString, line: UInt) -> Publishers.AssertNoFailure<Self>

// 错误修补/分支切换
// 捕获上游的错误，并返回一个新的 Publisher 来替代失败的流。
func `catch`<P>((Self.Failure) -> P) -> Publishers.Catch<Self, P>
// tryCatch 的闭包中可以再次抛出错误（throws）。
func tryCatch<P>((Self.Failure) throws -> P) -> Publishers.TryCatch<Self, P>

// 自动重试
// 当收到错误信号时，重新订阅上游 Publisher。
func retry(Int) -> Publishers.Retry<Self>




// 示例
enum MyError: Error {
    case error
}
let originalPublisher = Fail<Int, MyError>(error: MyError.error)
let fallbackPublisher = Just(42)

let publisher = originalPublisher.catch { error -> Just<Int> in
    print("Error caught: \(error)")
    return fallbackPublisher
}

let cancellable = publisher.sink { completion in
    print("Received completion: \(completion)")
} receiveValue: { value in
    print("Received value: \(value)")
}
```

## measureInterval、debounce、delay、throttle、timeout

```swift
// 测量：测测间隔
func measureInterval<S>(using: S, options: S.SchedulerOptions?) -> Publishers.MeasureInterval<Self, S>

// 防抖：等你不动了再发
// 场景：搜索框输入。防止用户每打一个字母就发一次 API 请求，而是等用户停顿 0.5 秒后再发。
func debounce<S>(for: S.SchedulerTimeType.Stride, scheduler: S, options: S.SchedulerOptions?) -> Publishers.Debounce<Self, S>

// 延迟：整体延后
func delay<S>(for: S.SchedulerTimeType.Stride, tolerance: S.SchedulerTimeType.Stride?, scheduler: S, options: S.SchedulerOptions?) -> Publishers.Delay<Self, S>

// 节流：固定频率发
// 场景：按钮连点、滚动监听。不管用户点多快，每 1 秒只处理一次。
func throttle<S>(for: S.SchedulerTimeType.Stride, scheduler: S, latest: Bool) -> Publishers.Throttle<Self, S>

// 超时：到点没回就报错
// 场景：网络请求兜底。如果 API 超过 10 秒没响应，直接提示“网络连接超时”。
func timeout<S>(S.SchedulerTimeType.Stride, scheduler: S, options: S.SchedulerOptions?, customError: (() -> Self.Failure)?) -> Publishers.Timeout<Self, S>


// 示例 measureInterval
Timer.publish(every: 1, on: .main, in: .default)
    .autoconnect()
    .measureInterval(using: RunLoop.main)
    .sink { print("\($0)", terminator: "\n") }
// Prints:
//      Stride(magnitude: 1.0013610124588013)
//      Stride(magnitude: 0.9992760419845581)
```

## encode、decode

```swift
// 序列化：对象 -> 数据
// 作用：将上游发出的 Encodable 对象转换成 Data。
// encoder: 执行编码的对象（通常是 JSONEncoder()）。
func encode<Coder>(encoder: Coder) -> Publishers.Encode<Self, Coder>

// 反序列化：数据 -> 对象
// 作用：将上游传来的 Data 尝试解析为指定的 Decodable 类型。
// type: 你想要转换的目标类型（例如 User.self）。
// decoder: 执行解析的对象（通常是 JSONDecoder()）。
func decode<Item, Coder>(type: Item.Type, decoder: Coder) -> Publishers.Decode<Self, Item, Coder>
```

## map(KeyPath提取)

```swift
// 单属性提取
// 作用：将上游发出的对象转换成该对象的某个属性值。
func map<T>(KeyPath<Self.Output, T>) -> Publishers.MapKeyPath<Self, T>

// 双/三属性提取
// 作用：同时提取多个属性，并将它们打包成一个**元组（Tuple）**发出来。
func map<T0, T1>(KeyPath<Self.Output, T0>, KeyPath<Self.Output, T1>) -> Publishers.MapKeyPath2<Self, T0, T1>
func map<T0, T1, T2>(KeyPath<Self.Output, T0>, KeyPath<Self.Output, T1>, KeyPath<Self.Output, T2>) -> Publishers.MapKeyPath3<Self, T0, T1, T2>
```

## multicast、share(共享)

```swift
// 深度定制共享
// 作用：它让你手动指定一个 Subject（如 CurrentValueSubject）作为中转站来广播数据。
// 手动提供 Subject
// 调用 .connect() 时启动
// 手动控制连接与断开
func multicast<S>(() -> S) -> Publishers.Multicast<Self, S>
func multicast<S>(subject: S) -> Publishers.Multicast<Self, S>

// 简单共享
// 作用：底层自动创建一个 PassthroughSubject。当第一个订阅者到来时，它开始订阅上游；后续的所有订阅者都共享这同一个上游发出的值。
// 特性：它是 multicast 的简化版。只要有人订阅，它就开始工作。
// 第一个人订阅时立即启动
func share() -> Publishers.Share<Self>
```

## buffer

```swift
func buffer(size: Int, prefetch: Publishers.PrefetchStrategy, whenFull: Publishers.BufferingStrategy<Self.Failure>) -> Publishers.Buffer<Self>
enum PrefetchStrategy
```

## eraseToAnyPublisher 类型擦除

```swift
// 类型擦除
// Combine 中最常用、也最能体现“封装意识”的操作符。它的作用是类型擦除（Type Erasure）。
// eraseToAnyPublisher 会把那一长串复杂的类型“打包”成一个简洁的 AnyPublisher<Output, Failure>。
func eraseToAnyPublisher() -> AnyPublisher<Self.Output, Self.Failure>
```

## schedulers 线程调度

```swift
// 在什么线程执行（影响上游）
// 作用：决定 Publisher 的订阅逻辑、资源加载、耗时计算在哪个线程启动。
func subscribe<S>(on: S, options: S.SchedulerOptions?) -> Publishers.SubscribeOn<Self, S>

// 在什么线程执行(影响下游)
// 作用：决定其后面的操作符以及最终的 Subscriber（订阅者） 在哪个线程接收数据。
func receive<S>(on: S, options: S.SchedulerOptions?) -> Publishers.ReceiveOn<Self, S>
```

## makeConnectable

```swift
// 将一个普通 Publisher 变成一个Connectable的发布者。
// 手动调用 .connect() 发送数据
// 有人订阅后，它只是“排队等候”。只有当你手动调用 .connect() 时，它才真正开始发送数据。
func makeConnectable() -> Publishers.MakeConnectable<Self>
```

## assign、sink（subscribers）

```swift
// Combine 的最终归宿，也就是我们之前聊到的 Subscriber（订阅者）。它们的作用是将数据流里的值“消费”掉，或者绑定到具体的业务模型上。


// 作用：将收到的值自动赋值给某个对象的属性（通过 KeyPath）。
func assign<Root>(to: ReferenceWritableKeyPath<Root, Self.Output>, on: Root) -> AnyCancellable
func assign(to: inout Published<Self.Output>.Publisher)

// 作用：提供一个闭包，让你手动处理每一个发出的值。
func sink(receiveCompletion: (Subscribers.Completion<Self.Failure>) -> Void, receiveValue: (Self.Output) -> Void) -> AnyCancellable
func sink(receiveValue: (Self.Output) -> Void) -> AnyCancellable
```

## Accessing elements asynchronously

```swift
var values: AsyncPublisher<Self>
The elements produced by the publisher, as an asynchronous sequence.
var values: AsyncThrowingPublisher<Self>
The elements produced by the publisher, as a throwing asynchronous sequence.
```

## breakpoint、handleEvents、print

```swift
// 自动断点调试
// 作用：当满足你设定的闭包条件（返回 true）时，直接触发 Xcode 调试器断点，让程序停在那一行。
func breakpoint(receiveSubscription: ((any Subscription) -> Bool)?, receiveOutput: ((Self.Output) -> Bool)?, receiveCompletion: ((Subscribers.Completion<Self.Failure>) -> Bool)?) -> Publishers.Breakpoint<Self>
func breakpointOnError() -> Publishers.Breakpoint<Self>

// 全能监控
// 作用：允许你在流的各个生命周期阶段注入一段自定义代码（Side Effects）。
// receiveSubscription 当订阅者拿到 Subscription 对象时触发。
// receiveOutput 每当一个值流过时触发。
// receiveCompletion 收到 finished 或 failure 时触发。
// receiveCancel 当订阅者主动取消（调用 cancel()）时触发。
// receiveRequest 当订阅者要求更多数据（Demand）时触发。
func handleEvents(receiveSubscription: ((any Subscription) -> Void)?, receiveOutput: ((Self.Output) -> Void)?, receiveCompletion: ((Subscribers.Completion<Self.Failure>) -> Void)?, receiveCancel: (() -> Void)?, receiveRequest: ((Subscribers.Demand) -> Void)?) -> Publishers.HandleEvents<Self>

// 最简单的日志打印
// 场景：当你不知道为什么流突然断了，或者想确认数据发出的精确时机时。
func print(String, to: (any TextOutputStream)?) -> Publishers.Print<Self>
```
