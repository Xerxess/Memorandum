<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Publishers](#publishers)
  - [Convenience Publishers 便利Publishers](#convenience-publishers-便利publishers)
    - [Publishers.Sequence 用于将一个序列（sequence）转换为一个发布者，并按顺序将序列中的元素发送给订阅者](#publisherssequence-用于将一个序列sequence转换为一个发布者并按顺序将序列中的元素发送给订阅者)
    - [Publishers.Catch 一个操作符（operator）,通过将上游发布者替换为另一个发布者来处理来自上游发布者的错误](#publisherscatch-一个操作符operator通过将上游发布者替换为另一个发布者来处理来自上游发布者的错误)
  - [Working with Subscribers 使用订阅者](#working-with-subscribers-使用订阅者)
    - [Publishers.ReceiveOn 一个操作符（operator），指定从发布者接收元素的调度程序](#publishersreceiveon-一个操作符operator指定从发布者接收元素的调度程序)
    - [Publishers.SubscribeOn 一个操作符（operator），指定执行订阅、取消和请求操作的调度程序](#publisherssubscribeon-一个操作符operator指定执行订阅-取消和请求操作的调度程序)
  - [Mapping Elements 映射元素](#mapping-elements-映射元素)
    - [Publishers.Map 一个操作符（operator），使用提供的闭包转换上游发布者中的所有元素的发布者](#publishersmap-一个操作符operator使用提供的闭包转换上游发布者中的所有元素的发布者)
    - [Publishers.TryMap 一个发布者，它使用提供的错误引发闭包转换上游发布者中的所有元素](#publisherstrymap-一个发布者它使用提供的错误引发闭包转换上游发布者中的所有元素)
    - [Publishers.MapError 将上游发布服务器的任何故障转换为新错误的发布服务器](#publishersmaperror-将上游发布服务器的任何故障转换为新错误的发布服务器)
    - [Publishers.Scan 一个发布者，它通过向闭包提供当前元素以及闭包返回的最后一个值来转换上游发布者中的元素](#publishersscan-一个发布者它通过向闭包提供当前元素以及闭包返回的最后一个值来转换上游发布者中的元素)
    - [Publishers.TryScan](#publisherstryscan)
    - [Publishers.TSetFailureTyperyScan](#publisherstsetfailuretyperyscan)
  - [Filtering Elements 过滤](#filtering-elements-过滤)
    - [Publishers.Filter 一个操作符（operator），用于根据指定的条件筛选发布者（publisher）发出的元素](#publishersfilter-一个操作符operator用于根据指定的条件筛选发布者publisher发出的元素)
    - [Publishers.TryFilter](#publisherstryfilter)
    - [Publishers.CompactMap 一个操作符（operator），用于对发布者（publisher）的输出值进行转换，并过滤掉转换结果为 nil 的元素](#publisherscompactmap-一个操作符operator用于对发布者publisher的输出值进行转换并过滤掉转换结果为-nil-的元素)
    - [Publishers.TryCompactMap](#publisherstrycompactmap)
    - [Publishers.RemoveDuplicates 一个操作符（operator），用于去除发布者（publisher）发出的重复元素](#publishersremoveduplicates-一个操作符operator用于去除发布者publisher发出的重复元素)
    - [Publishers.TryRemoveDuplicates](#publisherstryremoveduplicates)
    - [Publishers.ReplaceEmpty 一个操作符（operator），用于在发布者（publisher）为空时替换为指定的元素或另一个发布者](#publishersreplaceempty-一个操作符operator用于在发布者publisher为空时替换为指定的元素或另一个发布者)
    - [Publishers.ReplaceError](#publishersreplaceerror)
  - [Reducing Elements 减少元素](#reducing-elements-减少元素)
    - [Publishers.Collect 一个操作符（operator），用于将发布者（publisher）的元素收集到一个数组中，并在完成时将该数组作为单个输出发出](#publisherscollect-一个操作符operator用于将发布者publisher的元素收集到一个数组中并在完成时将该数组作为单个输出发出)
    - [Publishers.CollectByCount 一个操作符（operator），用于将指定数量的发布者（publisher）的元素收集到一个数组中，并在完成时将该数组作为单个输出发出](#publisherscollectbycount-一个操作符operator用于将指定数量的发布者publisher的元素收集到一个数组中并在完成时将该数组作为单个输出发出)
    - [Publishers.CollectByTime 一个操作符（operator），用于根据时间窗口将发布者（publisher）的元素收集到一个数组中，并在时间窗口结束时将该数组作为单个输出发出](#publisherscollectbytime-一个操作符operator用于根据时间窗口将发布者publisher的元素收集到一个数组中并在时间窗口结束时将该数组作为单个输出发出)
    - [Publishers.TimeGroupingStrategy](#publisherstimegroupingstrategy)
    - [Publishers.IgnoreOutput 一个操作符（operator），它会忽略发布者（publisher）发出的所有元素，只接收完成事件或错误事件](#publishersignoreoutput-一个操作符operator它会忽略发布者publisher发出的所有元素只接收完成事件或错误事件)
    - [Publishers.Reduce 一个操作符（operator），用于将发布者（publisher）的元素进行累积操作，并发出最终的累积结果](#publishersreduce-一个操作符operator用于将发布者publisher的元素进行累积操作并发出最终的累积结果)
    - [Publishers.TryReduce](#publisherstryreduce)
  - [Applying Mathematical Operations on Elements 对元素应用数学运算](#applying-mathematical-operations-on-elements-对元素应用数学运算)
    - [Publishers.Count 一个操作符（operator），用于统计发布者（publisher）发出的元素数量，并将该数量作为一个单独的元素发出](#publisherscount-一个操作符operator用于统计发布者publisher发出的元素数量并将该数量作为一个单独的元素发出)
    - [Publishers.Comparison](#publisherscomparison)
    - [Publishers.TryComparison](#publisherstrycomparison)
  - [Applying Matching Criteria to Elements 将匹配条件应用于元素](#applying-matching-criteria-to-elements-将匹配条件应用于元素)
    - [Publishers.Contains 一个操作符（operator），用于判断发布者（publisher）是否包含特定的元素，并将结果作为布尔值发出](#publisherscontains-一个操作符operator用于判断发布者publisher是否包含特定的元素并将结果作为布尔值发出)
    - [Publishers.ContainsWhere 一个操作符（operator），用于闭包判断发布者（publisher）是否包含特定的元素，并将结果作为布尔值发出](#publisherscontainswhere-一个操作符operator用于闭包判断发布者publisher是否包含特定的元素并将结果作为布尔值发出)
    - [Publishers.TryContainsWhere](#publisherstrycontainswhere)
    - [Publishers.AllSatisfy 一个操作符（operator），用于判断发布者（publisher）的所有元素是否都满足特定的条件，并将结果作为布尔值发出](#publishersallsatisfy-一个操作符operator用于判断发布者publisher的所有元素是否都满足特定的条件并将结果作为布尔值发出)
    - [Publishers.TryAllSatisfy](#publisherstryallsatisfy)
  - [Applying Sequence Operations to Elements 将序列操作应用于元素](#applying-sequence-operations-to-elements-将序列操作应用于元素)
    - [Publishers.DropUntilOutput 一个操作符（operator），用于在接收到特定元素之前丢弃发布者（publisher）发出的所有元素，并在接收到该特定元素后开始转发后续的元素](#publishersdropuntiloutput-一个操作符operator用于在接收到特定元素之前丢弃发布者publisher发出的所有元素并在接收到该特定元素后开始转发后续的元素)
    - [Publishers.Drop 一个操作符（operator），用于丢弃发布者（publisher）发出的前几个元素，并开始转发后续的元素](#publishersdrop-一个操作符operator用于丢弃发布者publisher发出的前几个元素并开始转发后续的元素)
    - [Publishers.DropWhile 一个操作符（operator），在重新发布所有剩余元素之前，从上游发布器中删除元素，直到给定闭包返回 false](#publishersdropwhile-一个操作符operator在重新发布所有剩余元素之前从上游发布器中删除元素直到给定闭包返回-false)
    - [Publishers.TryDropWhile](#publisherstrydropwhile)
    - [Publishers.Concatenate 一个操作符（operator），用于连接多个发布者（publishers），按照顺序将它们的元素进行串联](#publishersconcatenate-一个操作符operator用于连接多个发布者publishers按照顺序将它们的元素进行串联)
    - [Publishers.PrefixWhile 一个操作符（operator），用于从发布者（publisher）的开头开始，根据指定的条件收集元素，直到条件不再满足为止](#publishersprefixwhile-一个操作符operator用于从发布者publisher的开头开始根据指定的条件收集元素直到条件不再满足为止)
    - [Publishers.TryPrefixWhile](#publisherstryprefixwhile)
    - [Publishers.PrefixUntilOutput 一个操作符（operator）,重新发布元素，直到另一个发布者发布元素](#publishersprefixuntiloutput-一个操作符operator重新发布元素直到另一个发布者发布元素)
  - [Selecting Specific Elements](#selecting-specific-elements)
    - [Publishers.First 一个操作符（operator），用于从发布者（publisher）中获取第一个元素或满足特定条件的第一个元素](#publishersfirst-一个操作符operator用于从发布者publisher中获取第一个元素或满足特定条件的第一个元素)
    - [Publishers.FirstWhere](#publishersfirstwhere)
    - [Publishers.TryFirstWhere](#publisherstryfirstwhere)
    - [Publishers.Last 一个操作符（operator），用于从发布者（publisher）中获取最后一个元素或满足特定条件的第一个元素](#publisherslast-一个操作符operator用于从发布者publisher中获取最后一个元素或满足特定条件的第一个元素)
    - [Publishers.LastWhere](#publisherslastwhere)
    - [Publishers.TryLastWhere](#publisherstrylastwhere)
    - [Publishers.Output 一个操作符（operator），重新发布元素，最多不超过指定的最大数量](#publishersoutput-一个操作符operator重新发布元素最多不超过指定的最大数量)
  - [Combining Elements from Multiple Publishers 合并来自多个发布者的元素](#combining-elements-from-multiple-publishers-合并来自多个发布者的元素)
    - [Publishers.CombineLatest 一个操作符（operator），用于将多个发布者（publishers）的最新值进行组合](#publisherscombinelatest-一个操作符operator用于将多个发布者publishers的最新值进行组合)
    - [Publishers.CombineLatest3](#publisherscombinelatest3)
    - [Publishers.CombineLatest4](#publisherscombinelatest4)
    - [Publishers.Merge 一个操作符（operator），用于将多个发布者（publishers）的值合并成一个发布者](#publishersmerge-一个操作符operator用于将多个发布者publishers的值合并成一个发布者)
    - [Publishers.Merge3](#publishersmerge3)
    - [Publishers.Merge4](#publishersmerge4)
    - [Publishers.Merge5](#publishersmerge5)
    - [Publishers.Merge6](#publishersmerge6)
    - [Publishers.Merge7](#publishersmerge7)
    - [Publishers.Merge8](#publishersmerge8)
    - [Publishers.MergeMany](#publishersmergemany)
    - [Publishers.Zip 一个操作符（operator），用于将多个发布者（publishers）的值进行配对](#publisherszip-一个操作符operator用于将多个发布者publishers的值进行配对)
    - [Publishers.Zip4](#publisherszip4)
  - [Republishing Elements by Subscribing to New Publishers 通过订阅新发布者重新发布元素](#republishing-elements-by-subscribing-to-new-publishers-通过订阅新发布者重新发布元素)
    - [Publishers.FlatMap 一个操作符（operator），用于将发布者（publisher）的每个值映射到另一个发布者，并将结果合并为一个单一的发布者](#publishersflatmap-一个操作符operator用于将发布者publisher的每个值映射到另一个发布者并将结果合并为一个单一的发布者)
    - [Publishers.SwitchToLatest 一个操作符（operator），用于将一个发布者（publisher）中的最新发布者的值进行合并和订阅](#publishersswitchtolatest-一个操作符operator用于将一个发布者publisher中的最新发布者的值进行合并和订阅)
  - [Handling Errors 处理错误](#handling-errors-处理错误)
    - [Publishers.AssertNoFailure](#publishersassertnofailure)
    - [Publishers.Catch](#publisherscatch)
    - [Publishers.TryCatch](#publisherstrycatch)
    - [Publishers.Retry](#publishersretry)
  - [Controlling Timing 控制时序](#controlling-timing-控制时序)
    - [Publishers.MeasureInterval 一个操作符（operator），用于测量两次值发出之间的时间间隔](#publishersmeasureinterval-一个操作符operator用于测量两次值发出之间的时间间隔)
    - [Publishers.Debounce 一个操作符（operator），用于限制发布者（publisher）发出值的频率，并在指定的时间间隔内，只发出最新的值](#publishersdebounce-一个操作符operator用于限制发布者publisher发出值的频率并在指定的时间间隔内只发出最新的值)
    - [Publishers.Delay 一个操作符（operator），用于延迟发布者（publisher）发出值的时间](#publishersdelay-一个操作符operator用于延迟发布者publisher发出值的时间)
    - [Publishers.Throttle 一个操作符（operator），用于限制发布者（publisher）发出值的频率，并在指定的时间间隔内，只发出第一个值](#publishersthrottle-一个操作符operator用于限制发布者publisher发出值的频率并在指定的时间间隔内只发出第一个值)
    - [Publishers.Timeout 一个操作符（operator），用于设置发布者（publisher）的超时时间](#publisherstimeout-一个操作符operator用于设置发布者publisher的超时时间)
  - [Encoding and Decoding 编码和解码](#encoding-and-decoding-编码和解码)
    - [Publishers.Decode](#publishersdecode)
    - [Publishers.Encode](#publishersencode)
  - [Identifying Properties with Key Paths 使用键路径标识属性](#identifying-properties-with-key-paths-使用键路径标识属性)
    - [Publishers.MapKeyPath](#publishersmapkeypath)
    - [Publishers.MapKeyPath2](#publishersmapkeypath2)
    - [Publishers.MapKeyPath3](#publishersmapkeypath3)
  - [Working with Multiple Subscribers 使用多个订阅者](#working-with-multiple-subscribers-使用多个订阅者)
    - [Publishers.Multicast 一个操作符（operator），用于将一个发布者（publisher）转换为多个订阅者共享的可连接发布者（connectable publisher）](#publishersmulticast-一个操作符operator用于将一个发布者publisher转换为多个订阅者共享的可连接发布者connectable-publisher)
    - [Publishers.Share 一个操作符（operator），用于在多个订阅者之间共享一个发布者（publisher）的订阅关系和接收到的值](#publishersshare-一个操作符operator用于在多个订阅者之间共享一个发布者publisher的订阅关系和接收到的值)
  - [Buffering Elements 缓冲元素](#buffering-elements-缓冲元素)
    - [Publishers.Buffer](#publishersbuffer)
    - [Publishers.BufferingStrategy](#publishersbufferingstrategy)
    - [Publishers.PrefetchStrategy](#publishersprefetchstrategy)
  - [Using Explicit Publisher Connections 使用显式发布者连接](#using-explicit-publisher-connections-使用显式发布者连接)
    - [Publishers.Autoconnect 一个操作符（operator），用于自动连接一个可连接发布者（connectable publisher）到其第一个订阅者](#publishersautoconnect-一个操作符operator用于自动连接一个可连接发布者connectable-publisher到其第一个订阅者)
    - [Publishers.MakeConnectable 一个操作符（operator），用于将一个可连接发布者（connectable publisher）转换为可连接的发布者类型](#publishersmakeconnectable-一个操作符operator用于将一个可连接发布者connectable-publisher转换为可连接的发布者类型)
  - [Debugging 调试](#debugging-调试)
    - [Publishers.Breakpoint 一个调试操作符（operator），用于在管道中设置断点，以便在特定条件下打印调试信息和错误](#publishersbreakpoint-一个调试操作符operator用于在管道中设置断点以便在特定条件下打印调试信息和错误)
    - [Publishers.HandleEvents 一个操作符（operator），用于在管道中插入处理事件的操作](#publishershandleevents-一个操作符operator用于在管道中插入处理事件的操作)
    - [Publishers.Print](#publishersprint)

<!-- /code_chunk_output -->

# Publishers

Operator 就像一个管道。它本质上是一个发布者，将其他发布者作为其上游，并将订阅者作为其下游。在管道之间，我们可以做一些过滤工作、转换或我们想做的任何事情。

## Convenience Publishers 便利Publishers

### Publishers.Sequence 用于将一个序列（sequence）转换为一个发布者，并按顺序将序列中的元素发送给订阅者

```swift
// demo1
let array = [1, 2, 3, 4, 5]
let publisher = Publishers.Sequence<[Int], Never>(sequence: array)
let cancellable = publisher.sink { value in
    print("Received value: \(value)")
}

// demo2
[1, 2, 3, 4, 5].publisher.sink(receiveValue: {x in print(x)})
```

### Publishers.Catch 一个操作符（operator）,通过将上游发布者替换为另一个发布者来处理来自上游发布者的错误

```swift
func `catch`<P>(_ handler: @escaping (Self.Failure) -> P) -> Publishers.Catch<Self, P> where P : Publisher, Self.Output == P.Output
```

```swift
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

## Working with Subscribers 使用订阅者

### Publishers.ReceiveOn 一个操作符（operator），指定从发布者接收元素的调度程序

```swift
func receive<S>(on scheduler: S, options: S.SchedulerOptions? = nil) -> Publishers.ReceiveOn<Self, S> where S : Scheduler
```

### Publishers.SubscribeOn 一个操作符（operator），指定执行订阅、取消和请求操作的调度程序

```swift
func subscribe<S>(
    on scheduler: S,
    options: S.SchedulerOptions? = nil
) -> Publishers.SubscribeOn<Self, S> where S : Scheduler
```

## Mapping Elements 映射元素

### Publishers.Map 一个操作符（operator），使用提供的闭包转换上游发布者中的所有元素的发布者

```swift
func map<T>(_ transform: @escaping (Self.Output) -> T) -> Publishers.Map<Self, T>
func replaceNil<T>(with output: T) -> Publishers.Map<Self, T> where Self.Output == T?
```

### Publishers.TryMap 一个发布者，它使用提供的错误引发闭包转换上游发布者中的所有元素

```swift
func tryMap<T>(_ transform: @escaping (Self.Output) throws -> T) -> Publishers.TryMap<Self, T>
```

### Publishers.MapError 将上游发布服务器的任何故障转换为新错误的发布服务器

```swift
func mapError<E>(_ transform: @escaping (Self.Failure) -> E) -> Publishers.MapError<Self, E> where E : Error
```

### Publishers.Scan 一个发布者，它通过向闭包提供当前元素以及闭包返回的最后一个值来转换上游发布者中的元素

```swift
func scan<T>(
    _ initialResult: T,
    _ nextPartialResult: @escaping (T, Self.Output) -> T
) -> Publishers.Scan<Self, T>
```

```swift
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

### Publishers.TryScan

### Publishers.TSetFailureTyperyScan

## Filtering Elements 过滤

### Publishers.Filter 一个操作符（operator），用于根据指定的条件筛选发布者（publisher）发出的元素

```swift
func filter(_ isIncluded: @escaping (Self.Output) -> Bool) -> Publishers.Filter<Self>
```

```swift
let publisher = [1, 2, 3, 4, 5].publisher
let filteredPublisher = publisher.filter { value in
    return value % 2 == 0
}
let cancellable = filteredPublisher.sink { value in
    print(value)
}
// 2
// 4 
```

### Publishers.TryFilter

### Publishers.CompactMap 一个操作符（operator），用于对发布者（publisher）的输出值进行转换，并过滤掉转换结果为 nil 的元素

```swift
func compactMap<T>(_ transform: @escaping (Self.Output) -> T?) -> Publishers.CompactMap<Self, T>
```

```swift
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
```

### Publishers.TryCompactMap

### Publishers.RemoveDuplicates 一个操作符（operator），用于去除发布者（publisher）发出的重复元素

```swift
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

### Publishers.TryRemoveDuplicates

### Publishers.ReplaceEmpty 一个操作符（operator），用于在发布者（publisher）为空时替换为指定的元素或另一个发布者

```swift
let emptyPublisher = Empty<Int, Never>()
let replaceEmptyPublisher = emptyPublisher.replaceEmpty(with: 42)
let cancellable = replaceEmptyPublisher.sink { value in
    print(value)
}

// Output:
// 42
```

### Publishers.ReplaceError

## Reducing Elements 减少元素

### Publishers.Collect 一个操作符（operator），用于将发布者（publisher）的元素收集到一个数组中，并在完成时将该数组作为单个输出发出

```swift
let publisher = [1, 2, 3, 4, 5].publisher
let collectPublisher = publisher.collect()
let cancellable = collectPublisher.sink { values in
    print(values)
}

// Output:
// [1, 2, 3, 4, 5]
```

### Publishers.CollectByCount 一个操作符（operator），用于将指定数量的发布者（publisher）的元素收集到一个数组中，并在完成时将该数组作为单个输出发出

```swift
let publisher = [1, 2, 3, 4, 5].publisher
let collectByCountPublisher = publisher.collect(3)
let cancellable = collectByCountPublisher.sink { values in
    print(values)
}

// Output:
// [1, 2, 3]
// [4, 5]
```

### Publishers.CollectByTime 一个操作符（operator），用于根据时间窗口将发布者（publisher）的元素收集到一个数组中，并在时间窗口结束时将该数组作为单个输出发出

```swift
let publisher = Timer.publish(every: 1, on: .main, in: .default)
    .autoconnect()
    .scan(0..<(2 * 10)) { range, _ in
        range.dropFirst()
    }
    .map { Array($0) }
    .eraseToAnyPublisher()
let collectByTimePublisher = publisher.collect(.byTime(RunLoop.main, .seconds(5)))
let cancellable = collectByTimePublisher.sink { values in
    print(values)
}
DispatchQueue.main.asyncAfter(deadline: .now() + 15) {
    cancellable.cancel()  // 取消订阅
}

// 第5秒： [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]]

// 第10秒： [[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]]

// 第15秒：[[10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [11, 12, 13, 14, 15, 16, 17, 18, 19], [12, 13, 14, 15, 16, 17, 18, 19], [13, 14, 15, 16, 17, 18, 19], [14, 15, 16, 17, 18, 19]]
```

### Publishers.TimeGroupingStrategy

### Publishers.IgnoreOutput 一个操作符（operator），它会忽略发布者（publisher）发出的所有元素，只接收完成事件或错误事件

```swift
let publisher = [1, 2, 3].publisher
let ignoreOutputPublisher = publisher.ignoreOutput()
let cancellable = ignoreOutputPublisher.sink(
    receiveCompletion: { completion in
        switch completion {
        case .finished:
            print("Publisher finished successfully.")
        case .failure(let error):
            print("Publisher finished with error: \(error)")
        }
    },
    receiveValue: { _ in }
)
// Publisher finished successfully.
```

### Publishers.Reduce 一个操作符（operator），用于将发布者（publisher）的元素进行累积操作，并发出最终的累积结果

```swift
let publisher = [1, 2, 3, 4, 5].publisher
let reducePublisher = publisher.reduce(0) { (result, value) -> Int in
    return result + value
}
let cancellable = reducePublisher.sink { value in
    print("\(value)")
}

// 15
```

### Publishers.TryReduce

## Applying Mathematical Operations on Elements 对元素应用数学运算

### Publishers.Count 一个操作符（operator），用于统计发布者（publisher）发出的元素数量，并将该数量作为一个单独的元素发出

```swift
let publisher = [1, 2, 3, 4, 5].publisher
let countPublisher = publisher.count()
let cancellable = countPublisher.sink { count in
    print("Element count: \(count)")
}
// Output:
// Element count: 5
```

### Publishers.Comparison

```swift
let numbers = [0, 10, 5]
let cancellable = numbers.publisher
    .max()
    .sink { print("\($0)") }
// 10
```

```swift
enum Rank: Int {
    case ace = 1, two, three, four, five, six, seven, eight, nine, ten, jack, queen, king
}
let cards: [Rank] = [.five, .queen, .ace, .eight, .jack]
let cancellable = cards.publisher
    .max {
        return  $0.rawValue < $1.rawValue
    }
    .sink { print("\($0)") }
// Prints: "queen"
```

```swift
let numbers = [0, 10, 5]
let cancellable = numbers.publisher
    .min()
    .sink { print("\($0)") }
// 0
```

### Publishers.TryComparison

## Applying Matching Criteria to Elements 将匹配条件应用于元素

### Publishers.Contains 一个操作符（operator），用于判断发布者（publisher）是否包含特定的元素，并将结果作为布尔值发出

```swift
let publisher = [1, 2, 3, 4, 5].publisher
let containsPublisher = publisher.contains(3)
let cancellable = containsPublisher.sink { contains in
    print("Contains 3: \(contains)")
}

// Output:
// Contains 3: true

```

### Publishers.ContainsWhere 一个操作符（operator），用于闭包判断发布者（publisher）是否包含特定的元素，并将结果作为布尔值发出

### Publishers.TryContainsWhere

### Publishers.AllSatisfy 一个操作符（operator），用于判断发布者（publisher）的所有元素是否都满足特定的条件，并将结果作为布尔值发出

```swift
let targetRange = (-1...100)
let numbers = [-1, 0, 10, 5]
numbers.publisher
    .allSatisfy { targetRange.contains($0) }
    .sink { print("\($0)") }
// Prints: "true"
```

### Publishers.TryAllSatisfy

## Applying Sequence Operations to Elements 将序列操作应用于元素

### Publishers.DropUntilOutput 一个操作符（operator），用于在接收到特定元素之前丢弃发布者（publisher）发出的所有元素，并在接收到该特定元素后开始转发后续的元素

```swift
let upstream = PassthroughSubject<Int,Never>()
let second = PassthroughSubject<String,Never>()
let cancellable = upstream
    .drop(untilOutputFrom: second)
    .sink { print("\($0)") }

upstream.send(1)
upstream.send(2)
second.send("A")
upstream.send(3)
upstream.send(4)
// 3
// 4
```

### Publishers.Drop 一个操作符（operator），用于丢弃发布者（publisher）发出的前几个元素，并开始转发后续的元素

```swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let cancellable = numbers.publisher
    .dropFirst(5)
    .sink { print("\($0)") }
// 6
// 7
// 8
// 9
// 10
```

### Publishers.DropWhile 一个操作符（operator），在重新发布所有剩余元素之前，从上游发布器中删除元素，直到给定闭包返回 false

```swift
let numbers = [-62, -1, 0, 10, 0, 22, 41, -1, 5]
let cancellable = numbers.publisher
    .drop { $0 <= 0 }
    .sink { print("\($0)") }
// 10
// 0
// 22
// 41
// -1
// 5
```

### Publishers.TryDropWhile

### Publishers.Concatenate 一个操作符（operator），用于连接多个发布者（publishers），按照顺序将它们的元素进行串联

```swift
let numbers = (0...1)
let otherNumbers = (32...35)
let cancellable = numbers.publisher
    .append(otherNumbers.publisher)
    .sink { print("\($0)") }
// 0
// 1
// 32
// 33
// 34
// 35
```

### Publishers.PrefixWhile 一个操作符（operator），用于从发布者（publisher）的开头开始，根据指定的条件收集元素，直到条件不再满足为止

```swift
let numbers = (0...10)
numbers.publisher
    .prefix { $0 < 5 }
    .sink { print("\($0)", terminator: " ") }
// 0 1 2 3 4 
```

### Publishers.TryPrefixWhile

### Publishers.PrefixUntilOutput 一个操作符（operator）,重新发布元素，直到另一个发布者发布元素

## Selecting Specific Elements

### Publishers.First 一个操作符（operator），用于从发布者（publisher）中获取第一个元素或满足特定条件的第一个元素

```swift
let numbers = (-10...10)
cancellable = numbers.publisher
    .first()
    .sink { print("\($0)") }
// Print: "-10"
```

### Publishers.FirstWhere

### Publishers.TryFirstWhere

### Publishers.Last 一个操作符（operator），用于从发布者（publisher）中获取最后一个元素或满足特定条件的第一个元素

```swift
let numbers = (-10...10)
cancellable = numbers.publisher
    .last()
    .sink { print("\($0)") }
// Prints: "10"
```

### Publishers.LastWhere

### Publishers.TryLastWhere

### Publishers.Output 一个操作符（operator），重新发布元素，最多不超过指定的最大数量

```swift
let numbers = (0...10)
cancellable = numbers.publisher
    .prefix(2)
    .sink { print("\($0)", terminator: " ") }
// Prints: "0 1"
```

## Combining Elements from Multiple Publishers 合并来自多个发布者的元素

### Publishers.CombineLatest 一个操作符（operator），用于将多个发布者（publishers）的最新值进行组合

```swift
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
```

```swift
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

### Publishers.CombineLatest3

### Publishers.CombineLatest4

### Publishers.Merge 一个操作符（operator），用于将多个发布者（publishers）的值合并成一个发布者

```swift
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

### Publishers.Merge3

### Publishers.Merge4

### Publishers.Merge5

### Publishers.Merge6

### Publishers.Merge7

### Publishers.Merge8

### Publishers.MergeMany

### Publishers.Zip 一个操作符（operator），用于将多个发布者（publishers）的值进行配对

```swift
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

### Publishers.Zip4

## Republishing Elements by Subscribing to New Publishers 通过订阅新发布者重新发布元素

### Publishers.FlatMap 一个操作符（operator），用于将发布者（publisher）的每个值映射到另一个发布者，并将结果合并为一个单一的发布者

```swift
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

### Publishers.SwitchToLatest 一个操作符（operator），用于将一个发布者（publisher）中的最新发布者的值进行合并和订阅

## Handling Errors 处理错误

### Publishers.AssertNoFailure

### Publishers.Catch

### Publishers.TryCatch

### Publishers.Retry

## Controlling Timing 控制时序

### Publishers.MeasureInterval 一个操作符（operator），用于测量两次值发出之间的时间间隔

```swift
Timer.publish(every: 1, on: .main, in: .default)
    .autoconnect()
    .measureInterval(using: RunLoop.main)
    .sink { print("\($0)", terminator: "\n") }
// Prints:
//      Stride(magnitude: 1.0013610124588013)
//      Stride(magnitude: 0.9992760419845581)
```

### Publishers.Debounce 一个操作符（operator），用于限制发布者（publisher）发出值的频率，并在指定的时间间隔内，只发出最新的值

```swift
let bounces:[(Int,TimeInterval)] = [
    (0, 0),
    (1, 0.25),  // 0.25s interval since last index
    (2, 0.25),     // 0.75s interval since last index
    (3, 0.25),  // 0.25s interval since last index
    (4, 0.25),   // 0.25s interval since last index
    (5, 2)      // 0.5s interval since last index
]


let subject = PassthroughSubject<Int, Never>()
let cancellable = subject
    .debounce(for: .seconds(0.5), scheduler: RunLoop.main)
    .sink { index in
        print ("Received index \(index)")
    }


for bounce in bounces {
    DispatchQueue.main.asyncAfter(deadline: .now() + bounce.1) {        
        subject.send(bounce.0)
    }
}
// Received index 4
// Received index 5
```

### Publishers.Delay 一个操作符（operator），用于延迟发布者（publisher）发出值的时间

```swift
let publisher = PassthroughSubject<Int, Never>()
let delayedPublisher = publisher.delay(for: .seconds(5), scheduler: DispatchQueue.main)
let cancellable = delayedPublisher.sink { value in
    print(value)
}
publisher.send(1)
```

### Publishers.Throttle 一个操作符（operator），用于限制发布者（publisher）发出值的频率，并在指定的时间间隔内，只发出第一个值

```swift
let cancellable = Timer.publish(every: 3.0, on: .main, in: .default)
    .autoconnect()
    .print("\(Date().description)")
    .throttle(for: 10.0, scheduler: RunLoop.main, latest: true)
    .sink(
        receiveCompletion: { print ("Completion: \($0).") },
        receiveValue: { print("Received Timestamp \($0).") }
     )
```

### Publishers.Timeout 一个操作符（operator），用于设置发布者（publisher）的超时时间

```swift
let publisher = PassthroughSubject<Int, Error>()

let timeoutPublisher = publisher.timeout(.seconds(2), scheduler: DispatchQueue.main, customError: { () -> Error in
    return NSError(domain: "CustomErrorDomain", code: 0, userInfo: nil)
})

let cancellable = timeoutPublisher.sink(receiveCompletion: { completion in
    switch completion {
    case .finished:
        print("Publisher finished successfully.")
    case .failure(let error):
        print("Publisher failed with error: \(error)")
    }
}, receiveValue: { value in
    print("Received value: \(value)")
})

DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    publisher.send(1)
}

// Received value: 1
// Publisher failed with error: Error Domain=CustomErrorDomain Code=0 "(null)"
```

## Encoding and Decoding 编码和解码

### Publishers.Decode

### Publishers.Encode

## Identifying Properties with Key Paths 使用键路径标识属性

### Publishers.MapKeyPath

```swift
struct DiceRoll {
    let die: Int
}
cancellable = Just(DiceRoll(die:Int.random(in:1...6)))
    .map(\.die)
    .sink {
        print ("Rolled: \($0)")
    }
```

### Publishers.MapKeyPath2

### Publishers.MapKeyPath3

## Working with Multiple Subscribers 使用多个订阅者

### Publishers.Multicast 一个操作符（operator），用于将一个发布者（publisher）转换为多个订阅者共享的可连接发布者（connectable publisher）

```swift
let pub = ["First", "Second", "Third"].publisher
    .map( { return ($0, Int.random(in: 0...100)) } )
    .print("Random")
    .multicast { PassthroughSubject<(String, Int), Never>() }


let cancellable1 = pub
   .sink { print ("Stream 1 received: \($0)")}
let  cancellable2 = pub
   .sink { print ("Stream 2 received: \($0)")}
pub.connect()
```

### Publishers.Share 一个操作符（operator），用于在多个订阅者之间共享一个发布者（publisher）的订阅关系和接收到的值

```swift
let pub = (1...3).publisher
    .delay(for: 1, scheduler: DispatchQueue.main)
    .map( { _ in return Int.random(in: 0...100) } )
    .print("Random")
    .share()
let cancellable1 = pub
    .sink { print ("Stream 1 received: \($0)")}
let cancellable2 = pub
    .sink { print ("Stream 2 received: \($0)")}
```

## Buffering Elements 缓冲元素

### Publishers.Buffer

### Publishers.BufferingStrategy

### Publishers.PrefetchStrategy

## Using Explicit Publisher Connections 使用显式发布者连接

### Publishers.Autoconnect 一个操作符（operator），用于自动连接一个可连接发布者（connectable publisher）到其第一个订阅者

当订阅者首次连接时，该发布者会调用上游 ConnectablePublisher 的 connect() 功能。

### Publishers.MakeConnectable 一个操作符（operator），用于将一个可连接发布者（connectable publisher）转换为可连接的发布者类型

## Debugging 调试

### Publishers.Breakpoint 一个调试操作符（operator），用于在管道中设置断点，以便在特定条件下打印调试信息和错误

### Publishers.HandleEvents 一个操作符（operator），用于在管道中插入处理事件的操作

### Publishers.Print
