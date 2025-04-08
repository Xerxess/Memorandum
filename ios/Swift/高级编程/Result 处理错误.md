<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Result 处理错误](#result-处理错误)

<!-- /code_chunk_output -->

# Result 处理错误

- Swift 的 Result 类型是处理异步任务或可能失败的操作的强大工具。相比传统的 try-catch，Result 提供了更结构化的方式来处理错误。
  - 链式处理 Result：通过 map 和 flatMap 链式处理结果。
  - 自定义错误类型：创建自己的错误类型以增强表达能力。

```swift
enum NetworkError: Error {
    case invalidURL
    case noData
}

func fetchData(from url: String) -> Result<String, NetworkError> {
    guard url == "https://example.com" else {
        return .failure(.invalidURL)
    }
    return .success("Data from \(url)")
}

let result = fetchData(from: "https://example.com")

switch result {
case .success(let data):
    print("Success: \(data)")
case .failure(let error):
    print("Error: \(error)")
}
```
