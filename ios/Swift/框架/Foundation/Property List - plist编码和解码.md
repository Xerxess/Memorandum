
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [XML编码和解码](#xml编码和解码)
  - [PropertyListEncoder & PropertyListDecoder & PropertyListSerialization](#propertylistencoder--propertylistdecoder--propertylistserialization)

<!-- /code_chunk_output -->
# XML编码和解码

## PropertyListEncoder & PropertyListDecoder & PropertyListSerialization

- 可用于编码 解码 xml 数据

```swift
struct MyStruct: Codable {
    let name: String
    let age: Int
}

let myStruct = MyStruct(name: "John", age: 30)

let encoder = PropertyListEncoder()
encoder.outputFormat = .xml // 设置输出格式为 XML

do {
    let propertyListData = try encoder.encode(myStruct)
    if let propertyListString = String(data: propertyListData, encoding: .utf8) {
        print(propertyListString)
    }
} catch {
    print("Error: \(error)")
}
```

```swift
struct MyStruct: Codable {
    let name: String
    let age: Int
}

let propertyListString = """
<plist version="1.0">
<dict>
    <key>name</key>
    <string>John</string>
    <key>age</key>
    <integer>30</integer>
</dict>
</plist>
"""

let propertyListData = propertyListString.data(using: .utf8)!

let decoder = PropertyListDecoder()

do {
    let myStruct = try decoder.decode(MyStruct.self, from: propertyListData)
    print(myStruct)
} catch {
    print("Error: \(error)")
}
```
