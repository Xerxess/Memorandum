<!-- TOC -->

- [Codable](#codable)
    - [Codable Encodable Decodable](#codable-encodable-decodable)
    - [CodingKeys](#codingkeys)
    - [自定义 Encode、Decode编码器、解码器](#%E8%87%AA%E5%AE%9A%E4%B9%89-encodedecode%E7%BC%96%E7%A0%81%E5%99%A8%E8%A7%A3%E7%A0%81%E5%99%A8)
    - [嵌套类型](#%E5%B5%8C%E5%A5%97%E7%B1%BB%E5%9E%8B)
    - [日期解析](#%E6%97%A5%E6%9C%9F%E8%A7%A3%E6%9E%90)
- [JSONEncoder](#jsonencoder)
- [JSONDecoder](#jsondecoder)
- [JSONSerialization](#jsonserialization)

<!-- /TOC -->

https://developer.apple.com/documentation/swift/swift_standard_library/encoding_decoding_and_serialization

# Codable

Codable 的引入简化了 JSON 和 Swift 类型之间相互转换的难度，能够把 JSON 这种弱类型数据转换成代码中使用的强类型数据。

## Codable Encodable Decodable

Swift标准库中的类型，比如String，Int，Double和 Foundation 框架中Data，Date，URL都是默认支持Codable协议的，所以只需声明支持协议即可

```swift
struct Student{
    var id:String
    var name:String
    var grade:Int
}

// 遵从Codable协议
struct Student:Codable{
    var id:String
    var name:String
    var grade:Int
}
```

```swift
public typealias Codable = Decodable & Encodable

public protocol Encodable {
    func encode(to encoder: Encoder) throws
}

public protocol Decodable {
    init(from decoder: Decoder) throws
}
```

```swift
struct Person: Codable {
    let name: String
    let age: Int
}

//解码 JSON 数据
let json = #" {"name":"Tom", "age": 2} "#
let person = try JSONDecoder().decode(Person.self, from: json.data(using: .utf8)!)
print(person) //Person(name: "Tom", age: 2)

//编码导出为 JSON 数据
let data0 = try? JSONEncoder().encode(person)
let dataObject = try? JSONSerialization.jsonObject(with: data0!, options: [])
print(dataObject ?? "nil") //{ age = 2; name = Tom; }

let data1 = try? JSONSerialization.data(withJSONObject: ["name": person.name, "age": person.age], options: [])
print(String(data: data1!, encoding: .utf8)!) //{"name":"Tom","age":2}
```

## CodingKeys

自定义 key 的对应规则,也可限制哪些需要编码解码 keys

```swift
struct Person: Codable {
    let name: String
    let age: Int
    var additionInfo: String?

    enum CodingKeys: String, CodingKey {
        case name
        case age="age-key"
    }
}

```

## 自定义 Encode、Decode(编码器、解码器)

- protocol SingleValueEncodingContainer > 无键值仅 value "abc" 只能添加单个值
- protocol KeyedEncodingContainerProtocol > key-value {key:value}
- protocol UnkeyedEncodingContainer > 无 key ["a","b","c"]

- protocol SingleValueDecodingContainer
- protocol KeyedDecodingContainerProtocol
- protocol UnkeyedDecodingContainer

```swift
struct Person: Codable {
    let name: String
    let age: Int
    var additionInfo: String?

    enum CodingKeys: String, CodingKey {
        case name, age
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        name = try values.decode(String.self, forKey: .name)
        age = try values.decode(Int.self, forKey: .age)
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encode(age, forKey: .age)
    }
}
```

## 嵌套类型

嵌套的对象类型、数组或者字典类型，只要其中的每个元素都遵循 Codable 协议，那么整体数据类型就遵循 Codable 协议。

## 日期解析

```swift
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601

// 自定义
extension DateFormatter {
    static let myDateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ"
        formatter.timeZone = TimeZone(secondsFromGMT: 8)
        formatter.locale = Locale(identifier: "zh_Hans_CN")
        return formatter
    }()
}

let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .formatted(DateFormatter.myDateFormatter)
```

# JSONEncoder

将数据类型的实例编码为 JSON 对象的对象。

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let pear = GroceryProduct(name: "Pear", points: 250, description: "A ripe pear.")

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
// var outputFormatting: JSONEncoder.OutputFormatting 确定编码 JSON 对象的可读性、大小和元素顺序的输出格式选项。
// var dateEncodingStrategy: JSONEncoder.DateEncodingStrategy 将日期编码为 JSON 对象的一部分时使用的策略。
// var dataEncodingStrategy: JSONEncoder.DataEncodingStrategy




let data = try encoder.encode(pear)
print(String(data: data, encoding: .utf8)!)

/* Prints:
 {
   "name" : "Pear",
   "points" : 250,
   "description" : "A ripe pear."
 }
*/
```

# JSONDecoder

从 JSON 对象解码数据类型实例的对象

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let json = """
{
    "name": "Durian",
    "points": 600,
    "description": "A fruit with a distinctive scent."
}
""".data(using: .utf8)!

let decoder = JSONDecoder() 
// var keyDecodingStrategy: JSONDecoder.KeyDecodingStrategy 一个值，用于确定如何从 JSON 键中解码类型的编码键。

let product = try decoder.decode(GroceryProduct.self, from: json)

print(product.name) // Prints "Durian"
```

# JSONSerialization

在 JSON 和等效 Foundation 对象之间转换的对象。
