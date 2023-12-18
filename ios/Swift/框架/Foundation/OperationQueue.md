<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [OperationQueue](#operationqueue)

<!-- /code_chunk_output -->

# OperationQueue

- OperationQueue 与 Grand Central Dispatch (GCD) 有密切的关系。
- OperationQueue 基于 GCD 构建的更高级别的 API
- 操作队列根据其优先级和准备情况调用其排队的 Operation 对象。将操作添加到队列后，它会保留在队列中，直到该操作完成其任务。
- 添加操作后，您`无法直接从队列中删除操作`。

```swift
DispatchQueue.global().async {
    // 1. 创建操作队列
    let operationQueue = OperationQueue()
    operationQueue.maxConcurrentOperationCount = 2

    // 2. 创建操作
    let operation1 = BlockOperation {
        print("Operation 1 executing")
        Thread.sleep(forTimeInterval: 1.0)
        print("Operation 1 finished")
    }

    let operation2 = BlockOperation {
        print("Operation 2 executing")
        Thread.sleep(forTimeInterval: 1.0)
        print("Operation 2 finished")
    }

    let operation3 = BlockOperation {
        print("Operation 3 executing")
        Thread.sleep(forTimeInterval: 1.0)
        print("Operation 3 finished")
    }

    // 3. 添加操作到队列
    operationQueue.addOperation(operation1)
    operationQueue.addOperation(operation2)
    operationQueue.addOperation(operation3)

    // 4. 创建操作依赖关系
    operation3.addDependency(operation1)
    operation3.addDependency(operation2)

    // 5. 操作完成回调
    operation3.completionBlock = {
        DispatchQueue.main.async {
            // 在主队列中更新UI
            print("All operations finished")
            // 更新UI元素等
        }
    }

    // 6. 取消操作
    operation1.cancel()

    // 7. 等待队列中的操作完成（不再阻塞主线程）
    operationQueue.waitUntilAllOperationsAreFinished()

    print("Demo finished")
}
```
