# KeyValuePairs

KeyValuePairs 是 Swift 标准库中的一种集合类型，它用于表示键值对的无序集合。它类似于字典（Dictionary），但与字典不同，KeyValuePairs 保留了元素的插入顺序。

KeyValuePairs 是一个泛型类型，它的元素由键和值组成，类型为 KeyValuePair<Key, Value>，其中 Key 和 Value 是泛型参数。每个 KeyValuePair 对象表示一个键值对。

```swift
let keyValuePairs: KeyValuePairs<String, Int> = KeyValuePairs([
    "apple": 5,
    "orange": 3,
    "banana": 2
])

for (key, value) in keyValuePairs {
    print("\(key): \(value)")
}
```
