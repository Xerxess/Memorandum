<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [String](#string)
  - [CharacterSet 字符集](#characterset-字符集)
  - [base64编码](#base64编码)

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

## CharacterSet 字符集

- 字母（Letter）L :
  - 小写（lowercase） Ll
  - 修饰（modifier） Lm,
  - 首字母大写（titlecase） Lt,
  - 大写（uppercase） Lu,
  - 其它（other） Lo。
- 数字（Number）N :
  - 十进制数字（decimal digit） Nd,
  - 字母数字（letter number） Nl,
  - 其它（other） No。
- 标点符号（Punctuation）P :
  - 链接符（connector） Pc,
  - 横杠（dash） Pd,
  - 起始引用号（initial quote） Pi,
  - 结束引用号（final quote） Pf,
  - 开（open） Ps,
  - 闭（close） Pe,
  - 其它（other） Po。
- 标记（Mark）M (accents etc):
  - 间隔合并（spacing combining） Mc,
  - 封闭（enclosing） Me,
  - 非间隔（non-spacing） Mn。
- 符号（Symbol）S :
  - 货币（currency） Sc,
  - 修饰（modifier） Sk,
  - 数学（math） Sm,
  - 其它（other） So。
- 分隔符（Separator）Z :
  - 行（line） Zl,
  - 段落（paragraph） Zp,
  - 空格（space） Zs。
- 其它（Other）C :
  - 控制符（control） Cc,
  - 格式（format） Cf,
  - 未分配（not assigned） Cn,
  - 私有（private use） Co,
  - 代理伪字符（surrogate） Cs。

CharacterSet 表示一组符合 Unicode 的字符

CharacterSet.alphanumerics：包含所有的字母字符和数字。 L*, M*, and N*
CharacterSet.letters：包含所有的字母字符。 L* & M*
CharacterSet.lowercaseLetters：包含所有的小写字母字符。 Ll
CharacterSet.uppercaseLetters：包含所有的大写字母字符。 Lu and Lt
CharacterSet.decimalDigits：包含所有的数字字符。
CharacterSet.whitespaces：包含所有的空格字符。
CharacterSet.newlines：包含所有的换行符字符。
CharacterSet.punctuationCharacters：包含所有的标点符号字符。
CharacterSet.symbols：包含所有的符号字符。
CharacterSet.urlHostAllowed：包含 URL 中允许使用的字符。

```swift
// URL 编码
let urlString = "https://www.example.com/path with spaces"
if let encodedString = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
    // 使用编码后的字符串
    print(encodedString)
    // https://www.example.com/?id=%E4%B8%AD%E6%96%87
}
```

```swift
// URL 解码
let urlString = "https://www.example.com/?id=%E4%B8%AD%E6%96%87"
if let decodedString = urlString.removingPercentEncoding {
    // 使用解码后的字符串
    print(decodedString)
    // https://www.example.com/?id=中文
}
```

与 js 原生编码区别

javscript 不编码  A–Z a–z 0–9 - _ . ! ~ * ' ( )

```js

window.encodeURIComponent("https://www.example.com/-_.!~*'()/path with spaces?中文")
// https%3A%2F%2Fwww.example.com%2F-_.!~*'()%2Fpath%20with%20spaces%3F%E4%B8%AD%E6%96%87
```

```swift
let urlString = "https://www.example.com/-_.!~*'()/path with spaces?中文"

print(urlString.addingPercentEncoding(withAllowedCharacters: .decimalDigits)!)
//%68%74%74%70%73%3A%2F%2F%77%77%77%2E%65%78%61%6D%70%6C%65%2E%63%6F%6D%2F%2D%5F%2E%21%7E%2A%27%28%29%2F%70%61%74%68%20%77%69%74%68%20%73%70%61%63%65%73%3F%E4%B8%AD%E6%96%87

print(urlString.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!)
// https%3A%2F%2Fwww.example.com%2F-_.!~*'()%2Fpath%20with%20spaces%3F%E4%B8%AD%E6%96%87 结果与js相同

print(urlString.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)
// https%3A//www.example.com/-_.!~*'()/path%20with%20spaces%3F%E4%B8%AD%E6%96%87 未对路径/编码

print(urlString.addingPercentEncoding(withAllowedCharacters: .urlUserAllowed)!)
// https%3A%2F%2Fwww.example.com%2F-_.!~*'()%2Fpath%20with%20spaces%3F%E4%B8%AD%E6%96%87 结果与js相同

print(urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!)
// https://www.example.com/-_.!~*'()/path%20with%20spaces?%E4%B8%AD%E6%96%87

print(urlString.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed)!)
// https://www.example.com/-_.!~*'()/path%20with%20spaces?%E4%B8%AD%E6%96%87
```

## base64编码

```swift
// Base64 编码
let originalString = "Hello, World!"
if let originalData = originalString.data(using: .utf8) {
    let base64String = originalData.base64EncodedString()
    print("Base64 encoded string: \(base64String)")
}

// Base64 解码
let base64String = "SGVsbG8sIFdvcmxkIQ=="
if let decodedData = Data(base64Encoded: base64String) {
    if let decodedString = String(data: decodedData, encoding: .utf8) {
        print("Decoded string: \(decodedString)")
    }
}
```
