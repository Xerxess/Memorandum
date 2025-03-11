<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Sequence Implementations 序列实现](#sequence-implementations-序列实现)
  - [lazy 惰性序列不会立即执行操作，而是在需要结果时才执行 **](#lazy-惰性序列不会立即执行操作而是在需要结果时才执行-)
  - [allSatisfy 用于检查序列中的所有元素是否都满足给定的条件 **](#allsatisfy-用于检查序列中的所有元素是否都满足给定的条件-)
  - [compactMap 对序列的每个元素调用给定变换后的非零结果 **](#compactmap-对序列的每个元素调用给定变换后的非零结果-)
  - [contains 否包含给定元素 **](#contains-否包含给定元素-)
  - [count](#count)
  - [elementsEqual **](#elementsequal-)
  - [enumerated 返回成对的序列 (n，x) ******](#enumerated-返回成对的序列-nx-)
  - [filter **](#filter-)
  - [first **](#first-)
  - [flatMap 对序列中的每个元素应用给定的转换闭包，得到扁平数组 ******](#flatmap-对序列中的每个元素应用给定的转换闭包得到扁平数组-)
  - [forEach](#foreach)
  - [joined](#joined)
  - [lexicographicallyPrecedes](#lexicographicallyprecedes)
  - [map ***](#map-)
  - [min](#min)
  - [reduce 类型累加、累减](#reduce-类型累加-累减)
  - [shuffled 打乱顺序 **](#shuffled-打乱顺序-)
  - [sorted 排序](#sorted-排序)
  - [split 拆分](#split-拆分)
  - [starts 初始元素是否与另一个序列中的元素相同](#starts-初始元素是否与另一个序列中的元素相同)
  - [withContiguousStorageIfAvailable](#withcontiguousstorageifavailable)

<!-- /code_chunk_output -->

# Sequence Implementations 序列实现

## lazy 惰性序列不会立即执行操作，而是在需要结果时才执行 **

```swift
// 包含与此序列相同元素的序列，但其中某些操作（如map和filter ）是延迟实现的
// 惰性序列不会立即执行操作，而是在需要结果时才执行。这意味着你可以链接多个操作，但实际计算只在访问结果时进行。
var lazy: LazySequence<Self>

// 示例
let numbers = Array(1...1000000)
// 普通序列操作
let result = numbers.filter { $0 % 2 == 0 }.map { $0 * $0 }.prefix(10)
// 惰性序列操作
let lazyResult = numbers.lazy.filter { $0 % 2 == 0 }.map { $0 * $0 }.prefix(10)
// 此时才真正执行计算
print(Array(lazyResult))
```

## allSatisfy 用于检查序列中的所有元素是否都满足给定的条件 **

```swift
// 返回一个布尔值，指示序列的每个元素是否满足给定的谓词
func allSatisfy((Self.Element) throws -> Bool) rethrows -> Bool

// 示例
let numbers = [2, 4, 6, 8, 10]
let allEven = numbers.allSatisfy { $0 % 2 == 0 }
print(allEven) // 输出: true
```

## compactMap 对序列的每个元素调用给定变换后的非零结果 **

```swift
// 返回一个数组，其中包含对该序列的每个元素调用给定变换后的非零结果。
func compactMap<ElementOfResult>((Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]

// 示例
let possibleNumbers = ["1", "2", "three", "///4///", "5"]
let mapped: [Int?] = possibleNumbers.map { str in Int(str) }
// [1, 2, nil, nil, 5]
let compactMapped: [Int] = possibleNumbers.compactMap { str in Int(str) }
// [1, 2, 5]
```

## contains 否包含给定元素 **

```swift
// 返回一个布尔值，表示序列是否包含给定元素。
func contains(_ element: Self.Element) -> Bool
// 返回一个布尔值，表示序列是否包含满足给定谓词的元素。
func contains(where predicate: (Self.Element) throws -> Bool) rethrows -> Bool

// 示例1
let cast = ["Vivien", "Marlon", "Kim", "Karl"]
print(cast.contains("Marlon"))
// Prints "true"
print(cast.contains("James"))
// Prints "false"

// 示例2
enum HTTPResponse {
    case ok
    case error(Int)
}
let lastThreeResponses: [HTTPResponse] = [.ok, .ok, .error(404)]
let hadError = lastThreeResponses.contains { element in
    if case .error = element {
        return true
    } else {
        return false
    }
}
// 'hadError' == true
```

## count

```swift
// 返回序列中满足给定谓词的元素数量
func count<E>(where predicate: (Self.Element) throws(E) -> Bool) throws(E) -> Int where E : Error

// 示例
let names = ["Jacqueline", "Ian", "Amy", "Juan", "Soroush", "Tiffany"]
let shortNameCount = names.count(where: { $0.count < 5 })
// shortNameCount == 3
```

## elementsEqual **

```swift
// 返回一个布尔值，指示此序列和另一个序列是否以相同的顺序包含相同的元素
func elementsEqual<OtherSequence>(_ other: OtherSequence) -> Bool where OtherSequence : Sequence, Self.Element == OtherSequence.Element
// 返回一个布尔值，指示此序列和另一个序列是否包含相同顺序的等效元素，使用给定的谓词作为等效测试
func elementsEqual<OtherSequence>(OtherSequence, by: (Self.Element, OtherSequence.Element) throws -> Bool) rethrows -> Bool

// 示例
let a = 1...3
let b = 1...10
print(a.elementsEqual(b))
// Prints "false"
print(a.elementsEqual([1, 2, 3]))
// Prints "true"
```

## enumerated 返回成对的序列 (n，x) ******

```swift
// 返回成对的序列 (n，x)，其中 n 代表从 0 开始的连续整数，x 代表序列中的一个元素。
func enumerated() -> EnumeratedSequence<Self>

// 示例
for (n, c) in "Swift".enumerated() {
    print("\(n): '\(c)'")
}
// Prints "0: 'S'"
// Prints "1: 'w'"
// Prints "2: 'i'"
// Prints "3: 'f'"
// Prints "4: 't'"

// 示例2
// $0: (offset: Int, element: Int)
let index = [-1,1,2,3].enumerated().min {$0.offset<$1.offset}?.offset ?? 0
print(index)
```

## filter **

```swift
// 返回一个数组，按顺序包含满足给定谓词的序列元素
func filter(_ isIncluded: (Self.Element) throws -> Bool) rethrows -> [Self.Element]

// 示例
let cast = ["Vivien", "Marlon", "Kim", "Karl"]
let shortNames = cast.filter { $0.count < 5 }
print(shortNames)
// Prints "["Kim", "Karl"]"
```

## first **

```swift
// 返回满足给定谓词的序列的第一个元素
func first(where predicate: (Self.Element) throws -> Bool) rethrows -> Self.Element?

// 示例
let numbers = [3, 7, 4, -2, 9, -6, 10, 1]
if let firstNegative = numbers.first(where: { $0 < 0 }) {
    print("The first negative number is \(firstNegative).")
}
// Prints "The first negative number is -2."
```

## flatMap 对序列中的每个元素应用给定的转换闭包，得到扁平数组 ******

```swift
// 返回一个数组，该数组包含对该序列的每个元素调用给定转换的连接结果
// 其实s.flatMap(transform)相当于Array(s.map(transform).joined()。
// flatMap 对序列中的每个元素应用给定的转换闭包，然后将结果展平为一个单一的序列。
// transform: 接受此序列的一个元素作为其参数并返回一个序列或集合的闭包。
func flatMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
func flatMap<SegmentOfResult>(_ transform: (Self.Element) throws -> SegmentOfResult) rethrows -> [SegmentOfResult.Element] where SegmentOfResult : Sequence

// 示例
let numbers = [1, 2, 3, 4]
let mapped = numbers.map { Array(repeating: $0, count: $0) }
// [[1], [2, 2], [3, 3, 3], [4, 4, 4, 4]]
let flatMapped = numbers.flatMap { Array(repeating: $0, count: $0) }
// [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

// 示例2
let numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let flattened = numbers.flatMap { $0 }
print(flattened) // 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## forEach

```swift
// 按照与 for-in 循环相同的顺序对序列中的每个元素调用给定的闭包。
func forEach(_ body: (Self.Element) throws -> Void) rethrows

// 示例
let numberWords = ["one", "two", "three"]
for word in numberWords {
    print(word)
}
// Prints "one"
// Prints "two"
// Prints "three"
numberWords.forEach { word in
    print(word)
}
// Same as above
```

## joined

```swift
// 返回此序列的元素（连接在一起）
func joined() -> FlattenSequence<Self>
// 通过连接序列的元素并在每个元素之间添加给定的分隔符来返回一个新字符串。
func joined(separator: String = "") -> String
// 返回此序列的连接元素，在每个元素之间插入给定的分隔符。
func joined<Separator>(separator: Separator) -> JoinedSequence<Self> where Separator : Sequence, Separator.Element == Self.Element.Element

// 示例
let ranges = [0..<3, 8..<10, 15..<17]
// A for-in loop over 'ranges' accesses each range:
for range in ranges {
  print(range)
}
// Prints "0..<3"
// Prints "8..<10"
// Prints "15..<17"

// Use 'joined()' to access each element of each range:
for index in ranges.joined() {
    print(index, terminator: " ")
}
// Prints: "0 1 2 8 9 15 16"

// 示例2
let cast = ["Vivien", "Marlon", "Kim", "Karl"]
let list = cast.joined(separator: ", ")
print(list)
// Prints "Vivien, Marlon, Kim, Karl"

// 示例3
let nestedNumbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let joined = nestedNumbers.joined(separator: [-1, -2])
print(Array(joined))
// Prints "[1, 2, 3, -1, -2, 4, 5, 6, -1, -2, 7, 8, 9]"
```

## lexicographicallyPrecedes

```swift
// 返回一个布尔值，指示该序列是否按字典顺序位于另一个序列之前，使用小于运算符 (<) 比较元素。
func lexicographicallyPrecedes<OtherSequence>(_ other: OtherSequence) -> Bool where OtherSequence : Sequence, Self.Element == OtherSequence.Element
// 返回一个布尔值，指示该序列是否按字典顺序排列在另一个序列之前，并使用给定的谓词比较元素。
func lexicographicallyPrecedes<OtherSequence>(
    _ other: OtherSequence,
    by areInIncreasingOrder: (Self.Element, Self.Element) throws -> Bool
) rethrows -> Bool where OtherSequence : Sequence, Self.Element == OtherSequence.Element

// 示例
let a = [1, 2, 2, 2]
let b = [1, 2, 3, 4]
print(a.lexicographicallyPrecedes(b))
// Prints "true"
print(b.lexicographicallyPrecedes(b))
// Prints "false"
```

## map ***

```swift
// 返回一个数组，该数组包含将给定闭包映射到序列元素上的结果。
func map<T, E>(_ transform: (Self.Element) throws(E) -> T) throws(E) -> [T] where E : Error

// 示例
let cast = ["Vivien", "Marlon", "Kim", "Karl"]
let lowercaseNames = cast.map { $0.lowercased() }
// 'lowercaseNames' == ["vivien", "marlon", "kim", "karl"]
let letterCounts = cast.map { $0.count }
// 'letterCounts' == [6, 6, 3, 4]
```

## min

```swift
// 返回序列中的最小元素
func min() -> Self.Element?
// 返回序列中的最小元素，使用给定的谓词作为元素之间的比较。
func min(by areInIncreasingOrder: (Self.Element, Self.Element) throws -> Bool) rethrows -> Self.Element?

// 示例
let heights = [67.5, 65.7, 64.3, 61.1, 58.5, 60.3, 64.9]
let lowestHeight = heights.min()
print(lowestHeight)
// Prints "Optional(58.5)"

// 示例2
let hues = ["Heliotrope": 296, "Coral": 16, "Aquamarine": 156]
let leastHue = hues.min { a, b in a.value < b.value }
print(leastHue)
// Prints "Optional((key: "Coral", value: 16))"
```

## reduce 类型累加、累减

```swift
// 返回使用给定闭包组合序列元素的结果。
func reduce<Result>(
    _ initialResult: Result,
    _ nextPartialResult: (Result, Self.Element) throws -> Result
) rethrows -> Result
func reduce<Result>(
    into initialResult: Result,
    _ updateAccumulatingResult: (inout Result, Self.Element) throws -> ()
) rethrows -> Result

// 示例
let numbers = [1, 2, 3, 4]
let numberSum = numbers.reduce(0, { x, y in
    x + y
})
// numberSum == 10

// 示例2
let letters = "abracadabra"
let letterCount = letters.reduce(into: [:]) { counts, letter in
    counts[letter, default: 0] += 1
}
// letterCount == ["a": 5, "b": 2, "r": 2, "c": 1, "d": 1]
```

## shuffled 打乱顺序 **

```swift
// 返回序列中的元素（已打乱顺序）
func shuffled() -> [Self.Element]
// 返回序列的元素，使用给定的生成器作为随机源进行打乱。
func shuffled<T>(using generator: inout T) -> [Self.Element] where T : RandomNumberGenerator

// 示例
let numbers = 0...9
let shuffledNumbers = numbers.shuffled()
// shuffledNumbers == [1, 7, 6, 2, 8, 9, 4, 3, 5, 0]
```

## sorted 排序

```swift
// 返回序列的元素，并进行排序
// 通过调用此方法，可以对符合 Comparable 协议的任何元素序列进行排序。元素按升序排序。
func sorted() -> [Self.Element]
// 返回序列的元素，使用给定的谓词作为元素之间的比较进行排序。
func sorted(by areInIncreasingOrder: (Self.Element, Self.Element) throws -> Bool) rethrows -> [Self.Element]

// 示例
let students: Set = ["Kofi", "Abena", "Peter", "Kweku", "Akosua"]
let sortedStudents = students.sorted()
print(sortedStudents)
// Prints "["Abena", "Akosua", "Kofi", "Kweku", "Peter"]"

// 示例2
enum HTTPResponse {
    case ok
    case error(Int)
}
let responses: [HTTPResponse] = [.error(500), .ok, .ok, .error(404), .error(403)]
let sortedResponses = responses.sorted {
    switch ($0, $1) {
    // Order errors by code
    case let (.error(aCode), .error(bCode)):
        return aCode < bCode
    // All successes are equivalent, so none is before any other
    case (.ok, .ok): return false
    // Order errors before successes
    case (.error, .ok): return true
    case (.ok, .error): return false
    }
}
print(sortedResponses)
// Prints "[.error(403), .error(404), .error(500), .ok, .ok]"
```

## split 拆分

```swift
// 
func split(
    separator: Self.Element,
    maxSplits: Int = Int.max,
    omittingEmptySubsequences: Bool = true
) -> [ArraySlice<Self.Element>]

// 示例
let line = "BLANCHE:   I don't want realism. I want magic!"
print(line.split(separator: " ").map(String.init))
// Prints "["BLANCHE:", "I", "don\'t", "want", "realism.", "I", "want", "magic!"]"
print(line.split(separator: " ", maxSplits: 1).map(String.init))
// Prints "["BLANCHE:", "  I don\'t want realism. I want magic!"]"
print(line.split(separator: " ", omittingEmptySubsequences: false).map(String.init))
// Prints "["BLANCHE:", "", "", "I", "don\'t", "want", "realism.", "I", "want", "magic!"]"
```

## starts 初始元素是否与另一个序列中的元素相同

```swift
// 返回一个布尔值，指示序列的初始元素是否与另一个序列中的元素相同。
func starts<PossiblePrefix>(with possiblePrefix: PossiblePrefix) -> Bool where PossiblePrefix : Sequence, Self.Element == PossiblePrefix.Element
// 返回一个布尔值，指示序列的初始元素是否等同于另一个序列中的元素，使用给定的谓词作为等价测试。
func starts<PossiblePrefix>(
    with possiblePrefix: PossiblePrefix,
    by areEquivalent: (Self.Element, PossiblePrefix.Element) throws -> Bool
) rethrows -> Bool where PossiblePrefix : Sequence

// 示例
let a = 1...3
let b = 1...10
print(b.starts(with: a))
// Prints "true"

// 示例2

```

## withContiguousStorageIfAvailable

```swift
// 在序列的连续存储上执行闭包。
func withContiguousStorageIfAvailable<R>(_ body: (UnsafeBufferPointer<Element>) throws -> R) rethrows -> R?
func withContiguousStorageIfAvailable<R>(_ body: (UnsafeBufferPointer<Self.Element>) throws -> R) rethrows -> R?

// 示例

```
