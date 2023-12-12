<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [String](#string)

<!-- /code_chunk_output -->


# String

```swift
var str = "字符串"

// 插入字符串
str.insert(contentsOf: "_insert_", at: str.startIndex)

// 附加字符串
str.append("_append_")

// 替换字符串
str.replaceSubrange(str.startIndex...str.index(str.startIndex, offsetBy: 5), with: "replaceSubrange")

print(str) // replaceSubranget_字符串_append_

// 返回指定值出现在集合中的第一个索引
str.firstIndex(of:"replace")

// 子字符串
print(str[str.startIndex...str.index(str.startIndex,offsetBy: 1)]) // re

// 第一个字符
print(str.first) // Optional("r")

// 字符数量
print(str.count) // 28

// 转小写
print(str.lowercased()) // replacesubranget_字符串_append_

// 转大写
print(str.uppercased()) // REPLACESUBRANGET_字符串_APPEND_

// 移除最后一个字符
print(str.popLast()) // Optional("_")

// 返回一个布尔值，指示序列的初始元素是否与另一个序列中的元素相同
print(str.starts(with: "r"))

// 返回一个布尔值 前缀后缀是否相同
print(str.hasPrefix("replaceSubranget"))
print(str.hasSuffix("a"))

// 返回一个布尔值，指示序列是否包含给定元素
print(str.contains("app"))

// 返回一个不超过指定最大长度的子序列，其中包含集合的初始元素
print(str.prefix(10)) // replaceSub
print(str.prefix(through: str.index(str.startIndex,offsetBy: 1))) // re
print(str.prefix(upTo: str.index(str.startIndex,offsetBy: 1))) // r

// 返回一个不超过指定最大长度的子序列，其中包含集合的最终元素
print(str.suffix(10)) // 字符串_append
print(str.suffix(form:str.index(str.startIndex,offsetBy: 1)))

// 分割字符串
let arr = str.split(separator: "_")
for r in arr {
    print(r)
}
// replaceSubranget
// 字符串
// append

// 返回集合的随机元素
print(str.randomElement())
```