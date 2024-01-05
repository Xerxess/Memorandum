<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [String](#string)
  - [String.Index](#stringindex)
  - [StringProtocol 字符串协议](#stringprotocol-字符串协议)
  - [字符串URL 编解码](#字符串url-编解码)
    - [CharacterSet 字符集](#characterset-字符集)
  - [base64编码](#base64编码)
  - [常用方法集](#常用方法集)
    - [首字母排序](#首字母排序)
    - [中文首字母](#中文首字母)

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

let lowercase = "a"..."z"
print(lowercase.contains("b")) // true
for st in "a"..."z" { // * 注意 错误语法 字符串无此语法
    print(st) 
}

```

## String.Index

字符串使用String.Index 管理索引

```swift
let str = "中文2，中文2，中文1，中文3"
let findIndex = str.firstIndex(of: "1")!
print(str[...findIndex]) // 中文2，中文2，中文1

let findLastIndex = str.lastIndex(of: "2")!
print(str[...findLastIndex]) // 中文2，中文2
```

```swift
let str = "中文2，中文2，中文1"
print(str.startIndex) // 
print(str.endIndex) // 
print(str[str.startIndex..<str.endIndex]) // 中文2，中文2，中文1
print(str[str.startIndex...]) // 中文2，中文2，中文1
print(str[str.endIndex...]) // ''

print(str.distance(from: str.startIndex, to: str.endIndex)) // 11 两个索引之间的距离

var strIndex = str.index(before: str.endIndex) // 前一个索引
print(str[strIndex]) // 1

strIndex = str.index(after: str.startIndex) // 后一个索引
print(str[strIndex]) // 文

strIndex = str.index(str.startIndex, offsetBy: 2) // 指定偏移索引
print(str[...strIndex]) // 中文2

// 指定偏移索引,防止溢出错误
if let strIndex = str.index(str.startIndex, offsetBy: 100, limitedBy: str.endIndex) {
    print(str[...strIndex]) // 无输出
}


var index = str.startIndex

str.formIndex(&index, offsetBy: 5) // inout版本 指定偏移索引
print(str[...index]) // 中文2，中文

// inout版本 指定偏移索引,防止溢出错误
if str.formIndex(&index, offsetBy: 100, limitedBy: str.endIndex) {
    let str3 = str.substring(to:index)
    print(str3) // 无输出
}
```

## StringProtocol 字符串协议

```swift
// 每个单词都更改为其相应的大写拼写
print("小明".capitalized) // 小明
print("xiao ming".capitalized) // Xiao Ming

print("xiao ming".localizedCapitalized) // Xiao Ming
print("xiao ming".localizedUppercase) // XIAO MING
print("XIAO MING".localizedLowercase) // xiao ming
print("%E4%B8%AD%E6%96%87".removingPercentEncoding) // Optional("中文")

// 汉字转拼音
var pinyin = "世界，你好".applyingTransform(.toLatin, reverse: false) ?? ""
print(pinyin) // shì jiè， nǐ hǎo
pinyin = pinyin.applyingTransform(.stripDiacritics, reverse: false)!
print(pinyin) // shi jie， ni hao

pinyin = "世界，你好".applyingTransform(.toXMLHex, reverse: false) ?? ""
print(pinyin) // &#x4E16;&#x754C;&#xFF0C;&#x4F60;&#x597D;

pinyin = "hàn zì".applyingTransform(.mandarinToLatin, reverse: false) ?? ""
print(pinyin) // hàn zì

print(pinyin.applyingTransform(.stripCombiningMarks, reverse: false) ?? "") // han zi

let str = "中文2，中文2，中文1"
print(str.appending("-appending")) // 中文2，中文2，中文1appending

print(str.data(using: .utf8)) // 返回一个 Data 包含使用给定编码编码的 String 的表示形式

let strMultipleLines = #"""
    中文1
    中文2
    中文3
"""#

strMultipleLines.enumerateLines { line, stop in
    print(line)
}


// 在末尾补充指定长度字符
print(str.padding(toLength: 5, withPad: " ",startingAt: 0))  // 中文2，中
print(str.padding(toLength: 20, withPad: ",***",startingAt: 0)) // 中文2，中文2，中文1,***,***,
print(str.padding(toLength: 20, withPad: ",***",startingAt: 3)) // 中文2，中文2，中文1*,***,***

({
    let str = "中文2，中文2，中文1"
    let paddingCharacter: Character = "*"
    let paddedString = String(repeating: paddingCharacter, count: 5) + str
    print(paddedString) // *****中文2，中文2，中文1
}())


print(str.contains("中文2")) // true


var foldedStr = "Café au lait".folding(options: .diacriticInsensitive, locale: nil)
print(foldedStr) // Output: "Cafe au lait"

foldedStr = "Café au lait".folding(options: [.diacriticInsensitive,.caseInsensitive], locale: nil)
print(foldedStr) // Output: "cafe au lait"

let rangeString = "AbcdEfGHIJKlmn"
let strRange = rangeString.range(of: "gHiJk",options: .caseInsensitive) // 获得一个String.Index Range

if let strRange {
    print(rangeString[strRange]) // GHIJK
    print(rangeString[strRange.lowerBound...strRange.upperBound]) // GHIJKl
    print(rangeString[...strRange.lowerBound]) // AbcdEfG
    print(rangeString[...strRange.upperBound]) // AbcdEfGHIJKl
    print(rangeString[strRange.upperBound...]) // lmn
}

// 替换字符串
print("中文2，中文2，中文1".replacingOccurrences(of: "中文2", with: "中文1")) // 中文1，中文1，中文1

// 通过Range替换字符串
print(str.replacingCharacters(in: str.startIndex..<str.index(str.endIndex, offsetBy: -3), with: "a")) // a中文1

// 通过正则替换字符串
print(str.replacing(/中文/, with: "小明")) // 小明2，小明2，小明1

// split 字符串
({
    let str = "apple,,banana,orange,,grape"
    let separator = ",,"
    let substrings = str.split(separator: separator)
    
    for substring in substrings {
        print(substring)
    } 
    //    apple
    //    banana,orange
    //    grape
})()

// // omittingEmptySubsequences = true
({
    let str = "apple,banana,orange,,grape"
    let separator = ","
    let maxSplits = Int.max
    let omittingEmptySubsequences = true
    
    let substrings = str.split(separator: separator, 
                               maxSplits: maxSplits, 
                               omittingEmptySubsequences: omittingEmptySubsequences)
    
    for substring in substrings {
        print(substring)
    } 
    //    apple
    //    banana
    //    orange
    //    grape
})()

// omittingEmptySubsequences = false
({
    let str = "apple,banana,orange,,grape"
    let separator = ","
    let maxSplits = Int.max
    let omittingEmptySubsequences = false
    
    let substrings = str.split(separator: separator, 
                               maxSplits: maxSplits, 
                               omittingEmptySubsequences: omittingEmptySubsequences)
    
    for substring in substrings {
        print(substring)
    } 
    //    apple
    //    banana
    //    orange
    //            空值也会输出
    //    grape
})()


// trim 去除空字符
({
    let str = "   Hello, World!   "
    let characterSet = CharacterSet.whitespaces
    let trimmedString = str.trimmingCharacters(in: characterSet)
    print(trimmedString) // Output: "Hello, World!"
}())

// substring
({
    let str = "Hello, World!"
    var substringString = str.substring(from:str.startIndex)
    print(substringString) // Output: "Hello, World!"
    substringString = str.substring(to:str.endIndex)
    print(substringString) // Output: "Hello, World!"
    substringString = str.substring(with: str.range(of: "World")!)
    print(substringString) // Output: "World"
}())

```

## 字符串URL 编解码

### CharacterSet 字符集

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

## 常用方法集

### 首字母排序

```swift
let strings = ["Apple", "Banana", "Cat", "Dog", "Elephant"]

let sortedStrings = strings.sorted { (str1, str2) -> Bool in
    guard let firstChar1 = str1.first?.lowercased(), let firstChar2 = str2.first?.lowercased() else {
        return false
    }
    return firstChar1 < firstChar2
}

print(sortedStrings)
```

### 中文首字母

```swift
extension String {
    func chineseInitial() -> String {
        let mutableString = NSMutableString(string: self) as CFMutableString
        CFStringTransform(mutableString, nil, kCFStringTransformToLatin, false)
        CFStringTransform(mutableString, nil, kCFStringTransformStripDiacritics, false)
        let pinyin = mutableString as String
        let initial = pinyin.uppercased().prefix(1)
        return String(initial)
    }
}

let chineseString = "你好，世界！"
let initial = chineseString.chineseInitial()

print(initial) // N
```
