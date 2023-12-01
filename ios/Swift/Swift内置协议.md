<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Swift内置协议](#swift内置协议)
  - [Sendable 可发送](#sendable-可发送)
  - [Error](#error)

<!-- /code_chunk_output -->

# Swift内置协议

## Sendable 可发送

一种类型，其值可以通过复制安全地跨并发域传递。

## Error

```swift
protocol Error : Sendable
```

```swift
// 定义枚举
enum IntParsingError: Error {
    case overflow
    case invalidInput(Character)
}
```

```swift
// 使用结构来表示错误
struct XMLParsingError: Error {
    enum ErrorKind {
        case invalidCharacter
        case mismatchedTag
        case internalError
    }
    let line: Int
    let column: Int
    let kind: ErrorKind
}

func parse(_ source: String) throws -> XMLDoc {
    // ...
    throw XMLParsingError(line: 19, column: 5, kind: .mismatchedTag)
    // ...
}

do {
    let xmlDoc = try parse(myXMLData)
} catch let e as XMLParsingError {
    print("Parsing error: \(e.kind) [\(e.line):\(e.column)]")
} catch {
    print("Other error: \(error)")
}
```
