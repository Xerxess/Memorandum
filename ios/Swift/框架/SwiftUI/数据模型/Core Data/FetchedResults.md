<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [FetchedResults](#fetchedresults)

<!-- /code_chunk_output -->


# FetchedResults

从 Core Data 存储中检索的结果集合
FetchedResults 是 Core Data 提供的一个集合类型，用于表示获取请求的结果。它通常与 SwiftUI 中的 @FetchRequest 一起使用。

```swift
@MainActor @preconcurrency
struct FetchedResults<Result> where Result : NSFetchRequestResult
```