<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Implementations](#implementations)
  - [BidirectionalCollection Implementations](#bidirectionalcollection-implementations)
  - [Collection Implementations](#collection-implementations)
  - [MutableCollection Implementations](#mutablecollection-implementations)
  - [RangeReplaceableCollection Implementations](#rangereplaceablecollection-implementations)
  - [ResultsCollection Implementations](#resultscollection-implementations)

<!-- /code_chunk_output -->

# Implementations

## BidirectionalCollection Implementations

```swift
// 最后一个元素
var last: Self.Element?

// 返回从给定集合生成此集合的有序元素所需的差异。
func difference<C>(from other: C) -> CollectionDifference<Self.Element> where C : BidirectionalCollection, Self.Element == C.Element
// 使用给定的谓词作为等价测试，返回从给定集合生成此集合的有序元素所需的差异。
func difference<C>(from: C, by: (C.Element, Self.Element) -> Bool) -> CollectionDifference<Self.Element>

// 返回从集合末尾除去指定数量的所有元素的子序列。
// k:从集合末尾删除的元素的数量。k 必须大于或等于零。
func dropLast(_ k: Int) -> Self.SubSequence

// 返回从集合末包含指定数量的所有元素的子序列。与dropLast 相反
func suffix(_ maxLength: Int) -> Self.SubSequence

func joined(separator: String = "") -> String

// 返回满足给定谓词的序列的最后一个元素
func last(where predicate: (Self.Element) throws -> Bool) rethrows -> Self.Element?

// 返回集合中出现指定值的最后一个索引
func lastIndex(of element: Self.Element) -> Self.Index?
func lastIndex(where predicate: (Self.Element) throws -> Bool) rethrows -> Self.Index?

// 返回以相反顺序呈现集合元素的视图。
func reversed() -> ReversedCollection<Self>
```

## Collection Implementations

<https://developer.apple.com/documentation/swift/array/collection-implementations>

```swift
var count: Int
var first: Self.Element?
var isEmpty: Bool
var underestimatedCount: Int

// 通过跳过元素返回子序列，而predicate返回true并返回剩余元素。
func drop(while: (Self.Element) throws -> Bool) rethrows -> Self.SubSequence

// 返回包含除给定数量的初始元素之外的所有元素的子序列。
func dropFirst(Int) -> Self.SubSequence

// 返回集合中出现指定值的第一个索引。
func firstIndex(of: Self.Element) -> Self.Index?
Returns the first index where the specified value appears in the collection.

// 返回集合中元素满足给定谓词的第一个索引。
func firstIndex(where: (Self.Element) throws -> Bool) rethrows -> Self.Index?

// 将给定的索引偏移指定的距离。
func formIndex(inout Self.Index, offsetBy: Int)

// 将给定的索引偏移指定的距离，或使其等于给定的限制索引。
func formIndex(inout Self.Index, offsetBy: Int, limitedBy: Self.Index) -> Bool

// 返回集合中出现指定值的第一个索引。
func index(of: Self.Element) -> Self.Index?

// 返回所有与给定元素相等的元素的索引。
func indices(of: Self.Element) -> RangeSet<Self.Index>

// 返回与给定谓词匹配的所有元素的索引。
func indices(where: (Self.Element) throws -> Bool) rethrows -> RangeSet<Self.Index>

// 返回集合元素的迭代器。
func makeIterator() -> IndexingIterator<Self>

// 返回一个数组，该数组包含将给定闭包映射到序列元素上的结果。
func map<T, E>((Self.Element) throws(E) -> T) throws(E) -> [T]

// 返回一个子序列，最大长度不超过指定的最大长度，其中包含集合的初始元素。
func prefix(Int) -> Self.SubSequence

// 返回从集合开头到指定位置的子序列。
func prefix(through: Self.Index) -> Self.SubSequence

// 返回从集合开始到指定位置（但不包括指定位置）的子序列。
func prefix(upTo: Self.Index) -> Self.SubSequence

// 返回包含初始元素的子序列，直到predicate返回false并跳过剩余元素。
func prefix(while: (Self.Element) throws -> Bool) rethrows -> Self.SubSequence

// 返回集合中的一个随机元素。
func randomElement() -> Self.Element?

// 返回集合中的随机元素，使用给定的生成器作为随机源。
func randomElement<T>(using: inout T) -> Self.Element?

// 返回此集合中未由给定范围集表示的元素的集合。
func removingSubranges(RangeSet<Self.Index>) -> DiscontiguousSlice<Self>

// 按顺序返回集合中不包含满足给定谓词的元素的最长可能子序列。
func split(maxSplits: Int, omittingEmptySubsequences: Bool, whereSeparator: (Self.Element) throws -> Bool) rethrows -> [Self.SubSequence]

// 按顺序返回集合中等于给定元素的元素周围的最长可能子序列。
func split(separator: Self.Element, maxSplits: Int, omittingEmptySubsequences: Bool) -> [Self.SubSequence]
Returns the longest possible subsequences of the collection, in order, around elements equal to the given element.

// 返回从指定位置到集合末尾的子序列。
func suffix(from: Self.Index) -> Self.SubSequence
Returns a subsequence from the specified position to the end of the collection.

// 使用给定索引处的元素访问此集合的视图。
subscript(RangeSet<Self.Index>) -> DiscontiguousSlice<Self>
Accesses a view of this collection with the elements at the given indices.

// 访问范围表达式指定的集合元素的连续子范围。
subscript((UnboundedRange_) -> ()) -> Self.SubSequence
subscript<R>(R) -> Self.SubSequence
```

## MutableCollection Implementations

<https://developer.apple.com/documentation/swift/array/mutablecollection-implementations>

```swift
// 将给定子范围中的元素移动到指定索引处的元素之前。
func moveSubranges(RangeSet<Self.Index>, to: Self.Index) -> Range<Self.Index>

// 对集合中的元素进行重新排序，使得所有与给定谓词匹配的元素位于所有不匹配的元素之后。
func partition(by: (Self.Element) throws -> Bool) rethrows -> Self.Index

// 对集合中的元素进行重新排序，使得所有与给定谓词匹配的元素位于所有不匹配的元素之后。
func partition(by: (Self.Element) throws -> Bool) rethrows -> Self.Index

// 删除给定索引处的元素。
func removeSubranges(RangeSet<Self.Index>)

// 反转集合中的元素。
func reverse()

// 将集合随机排列到位。
func shuffle()

// 使用给定的生成器作为随机源，对集合进行就地打乱。
func shuffle<T>(using: inout T)

// 对集合进行排序。
func sort()

// 使用给定的谓词作为元素之间的比较，对集合进行排序
func sort(by: (Self.Element, Self.Element) throws -> Bool) rethrows

// 交换集合中指定索引处的值。
func swapAt(Self.Index, Self.Index)

//对集合的连续存储执行闭包。
func withContiguousMutableStorageIfAvailable<R>((inout UnsafeMutableBufferPointer<Element>) throws -> R) rethrows -> R?

// 对集合的连续存储执行闭包。
func withContiguousMutableStorageIfAvailable<R>((inout UnsafeMutableBufferPointer<Self.Element>) throws -> R) rethrows -> R?

```

## RangeReplaceableCollection Implementations

https://developer.apple.com/documentation/swift/array/rangereplaceablecollection-implementations

```swift
// 通过连接序列和集合的元素来创建一个新集合。
static func + <Other>(Other, Self) -> Self

// 通过连接两个集合的元素来创建一个新集合。
static func + <Other>(Self, Other) -> Self

// 通过连接集合和序列的元素来创建一个新集合。
static func + <Other>(Self, Other) -> Self

// 将序列的元素附加到范围可替换的集合中。
static func += <Other>(inout Self, Other)

// 在数组末尾添加一个新元素。
func append(Element)

// 将元素添加到集合的末尾。
func append(Self.Element)

// 将序列的元素添加到数组的末尾。
func append<S>(contentsOf: S)

// 将序列或集合的元素添加到此集合的末尾。
func append<S>(contentsOf: S)

// 将给定的差异应用到此集合。
func applying(CollectionDifference<Self.Element>) -> Self?

// 在集合的指定位置插入新元素。
func insert(Self.Element, at: Self.Index)

// 将序列的元素插入到集合中的指定位置。
func insert<C>(contentsOf: C, at: Self.Index)

// 删除并返回集合的最后一个元素。
func popLast() -> Self.Element?

// 移除并返回指定位置的元素。
func remove(at: Self.Index) -> Self.Element

// 从数组中删除所有元素。
func removeAll(keepingCapacity: Bool)

// 从集合中删除所有元素。
func removeAll(keepingCapacity: Bool)

// 删除所有满足给定谓词的元素。
func removeAll(where: (Self.Element) throws -> Bool) rethrows

// 删除所有满足给定谓词的元素。
func removeAll(where: (Self.Element) throws -> Bool) rethrows

// 删除并返回集合的第一个元素。
func removeFirst() -> Self.Element

// 从集合开头删除指定数量的元素。
func removeFirst(Int)
Removes the specified number of elements from the beginning of the collection.

// 删除并返回集合的最后一个元素。
func removeLast() -> Self.Element

// 从集合末尾删除指定数量的元素。
func removeLast(Int)

// 从集合中删除指定子范围内的元素。
func removeSubrange(Range<Self.Index>)

// 从集合中删除指定子范围内的元素。
func removeSubrange<R>(R)

// 删除给定索引处的元素。
func removeSubranges(RangeSet<Self.Index>)

// 使用指定集合中的元素替换一定范围内的元素。
func replaceSubrange<C>(Range<Int>, with: C)

// 用给定的集合替换指定的元素子范围。
func replaceSubrange<C>(Range<Self.Index>, with: C)

// 当这样做适合基础类型时，准备集合来存储指定数量的元素。
func reserveCapacity(Int)

```

## ResultsCollection Implementations

https://developer.apple.com/documentation/swift/array/resultscollection-implementations

```swift
// 所有结果项。
var items: [Element.ValueType]

// 在视图顶部显示的文本提示显示了选项。
var promptLabel: LocalizedStringResource?

// 如果设置为 true，则在屏幕右侧显示带有字母索引的选项列表（表格视图部分索引标题）。
var usesIndexedCollation: Bool

```
