<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Regex 正则表达式](#regex-正则表达式)

<!-- /code_chunk_output -->

# Regex 正则表达式

<https://developer.apple.com/documentation/swift/regex>

- iOS 16.0+

通过一个 regex 文字创建

```swift
// 
let keyAndValue = /(.+?): (.+)/
let s="{key: value}"
let match = s.firstMatch(of: keyAndValue)

if let match {
    print(match.0)
    // {key: value}
    
    print(match.1)
    // {key
    
    print(match.2)
    // value}
}
```

Regex 初始化

```swift
let ss1 = try! Regex("(.+?): (.+)",as: (Substring,Substring,Substring).self)
let ss = try? ss1.wholeMatch(in: "{key: value}")
print(type(of: ss))
if let ss {
    print(ss.0)
    // {key: value}
    
    print(ss.1)
    // {key
    
    print(ss.2)
    // value}
}
```
