
# Array、Dictionary 和 Set再封装

- 封装是非常有必要的，而且体现了高水平的架构设计思想。
- 语义隔离：区分“存储”与“标识” “我存入一个东西，你给我一个钥匙（Index），以后凭钥匙取回或销毁”。
- 性能优化与实现细节的隐藏 封装的价值：如果你不封装，当有一天你发现 Array 性能不够了想换成 Dictionary，你需要修改所有调用它的业务代码。而封装后，你只需要修改 Bag 类的内部实现，外部调用者完全无感知。
  - Bag<T> (基于 Array)
  - SparseBag<T> (基于 Dictionary)：
- 统一的接口规范
- 这不仅仅是封装，这是“领域驱动设计”在数据结构层面的体现。用少量的内存开销（副本）换取了极高的稳定性（不崩溃）和代码的整洁度

下面代码来源于 <https://github.com/TelegramMessenger/Telegram-iOS/blob/master/submodules/SSignalKit/SwiftSignalKit/Source/Bag.swift>

```swift
public final class Bag<T> {
    public typealias Index = Int
    private var nextIndex: Index = 0
    private var items: [T] = []
    private var itemKeys: [Index] = []
    
    public init() {
    }
    
    public func add(_ item: T) -> Index {
        let key = self.nextIndex
        self.nextIndex += 1
        self.items.append(item)
        self.itemKeys.append(key)
        
        return key
    }
    
    public func get(_ index: Index) -> T? {
        var i = 0
        for key in self.itemKeys {
            if key == index {
                return self.items[i]
            }
            i += 1
        }
        return nil
    }
    
    public func remove(_ index: Index) {
        var i = 0
        for key in self.itemKeys {
            if key == index {
                self.items.remove(at: i)
                self.itemKeys.remove(at: i)
                break
            }
            i += 1
        }
    }
    
    public func removeAll() {
        self.items.removeAll()
        self.itemKeys.removeAll()
    }
    
    public func copyItems() -> [T] {
        return self.items
    }
    
    public func copyItemsWithIndices() -> [(Index, T)] {
        var result: [(Index, T)] = []
        var i = 0
        for key in self.itemKeys {
            result.append((key, self.items[i]))
            i += 1
        }
        return result
    }
    
    public var isEmpty: Bool {
        return self.items.isEmpty
    }
    
    public var first: (Index, T)? {
        if !self.items.isEmpty {
            return (self.itemKeys[0], self.items[0])
        } else {
            return nil
        }
    }
}

public final class SparseBag<T>: Sequence {
    public typealias Index = Int
    private var nextIndex: Index = 0
    private var items: [Index: T] = [:]

    public init() {
    }

    public func add(_ item: T) -> Index {
        let key = self.nextIndex
        self.nextIndex += 1
        self.items[key] = item

        return key
    }

    public func get(_ index: Index) -> T? {
        return self.items[index]
    }

    public func remove(_ index: Index) {
        self.items.removeValue(forKey: index)
    }

    public func removeAll() {
        self.items.removeAll()
    }

    public var isEmpty: Bool {
        return self.items.isEmpty
    }

    public func makeIterator() -> AnyIterator<T> {
        var iterator = self.items.makeIterator()
        return AnyIterator { () -> T? in
            return iterator.next()?.value
        }
    }
}

public final class CounterBag {
    private var nextIndex: Int = 1
    private var items = Set<Int>()
    
    public init() {
    }
    
    public func add() -> Int {
        let index = self.nextIndex
        self.nextIndex += 1
        self.items.insert(index)
        return index
    }
    
    public func remove(_ index: Int) {
        self.items.remove(index)
    }
    
    public var isEmpty: Bool {
        return self.items.isEmpty
    }
}
```
