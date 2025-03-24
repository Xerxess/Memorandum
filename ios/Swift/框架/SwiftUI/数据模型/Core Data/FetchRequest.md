<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [FetchRequest](#fetchrequest)

<!-- /code_chunk_output -->


# FetchRequest

* 一种属性包装器类型，用于从 Core Data 持久化存储中检索实体

```swift
@MainActor @propertyWrapper @preconcurrency
struct FetchRequest<Result> where Result : NSFetchRequestResult
```