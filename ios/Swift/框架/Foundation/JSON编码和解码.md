
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [JSON编码和解码](#json编码和解码)
  - [JSONEncoder](#jsonencoder)
  - [JSONEncoder](#jsonencoder-1)
  - [JSONSerialization](#jsonserialization)
  - [CodingKeys](#codingkeys)
  - [Encodable 和 Decodable 的自定义实现来定义您自己的编码和解码逻辑](#encodable-和-decodable-的自定义实现来定义您自己的编码和解码逻辑)
  - [CodableWithConfiguration ,CodableWithConfiguration ,DecodingConfigurationProviding ,EncodingConfigurationProviding](#codablewithconfiguration-codablewithconfiguration-decodingconfigurationproviding-encodingconfigurationproviding)
    - [ios17,macos14 支持顶级](#ios17macos14-支持顶级)

<!-- /code_chunk_output -->

# JSON编码和解码

## JSONEncoder

```swift
// 必须 符合 Codable
struct GroceryProduct: Codable {
    var userName:String = "小明"
    var name: String
    var points: Int
    var description: String?
}

let pear = GroceryProduct(name: "Pear", points: 250, description: "A ripe pear.")

let encoder = JSONEncoder()
// 输出格式选项使用充足的空白和缩进使输出易于阅读。
encoder.outputFormatting = .prettyPrinted
// 将驼峰式转蛇形式 即userName => user_name
encoder.keyEncodingStrategy = .convertToSnakeCase

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

日期处理

```swift
struct T:Codable {
    var nameName = "name"
    var date = Date.now
}

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
encoder.keyEncodingStrategy = .convertToSnakeCase

// 自 1970 年 1 月 1 日午夜 UTC 以来的毫秒数对日期进行编码
// encoder.dateEncodingStrategy = .millisecondsSince1970

// 自 1970 年 1 月 1 日午夜 UTC 以来的秒数对日期进行编码
// encoder.dateEncodingStrategy = .secondsSince1970

//  ISO 8601 和 RFC 3339 标准格式化日期的策 "2023-12-13T14:11:49Z"
// encoder.dateEncodingStrategy = .secondsSince1970

// 自定义1
// let format = DateFormatter()
// format.dateFormat = "yyyy-MM-dd hh:mm:ss"
// encoder.dateEncodingStrategy = .formatted(format)

// 自定义2
encoder.dateEncodingStrategy = .custom { date, encoder in
    // 在这里自定义日期的编码方式
    let dateFormatter = DateFormatter()
    // dateFormatter.dateFormat = "yyyy-MM-dd"
    dateFormatter.dateFormat = "yyyy-MM-dd hh:mm:ss"
    let dateString = dateFormatter.string(from: date)
    var container = encoder.singleValueContainer()
    try container.encode(dateString)
}

let encoderStr = try? encoder.encode(T())
if let encoderStr,let a = String(data: encoderStr, encoding: .utf8) {
    print(a)
}

// {
//  "name_name" : "name",
//   "date" : "2023-12-13 22:06:11"
// }
```

## JSONEncoder

```swift
struct T:Codable {
    var nameName = "name"
    var date = Date.now
}

let format = DateFormatter()
format.dateFormat = "yyyy-MM-dd hh:mm:ss"

let s2 = """
{
  "name_name" : "name",
  "date" : "2023-12-13 22:16:57"
}
"""

let dencoder = JSONDecoder()
// 蛇形键转换为驼峰形键的键解码
dencoder.keyDecodingStrategy = .convertFromSnakeCase
dencoder.dateDecodingStrategy = .formatted(format)
let dencoderObj = try? dencoder.decode(T.self, from: s2.data(using: .utf8)!)
if let dencoderObj {
    print(dencoderObj.nameName)
}
```

## JSONSerialization

在 JSON 和等效的 Foundation 对象之间进行转换的对象

Foundation 对象转换为 JSON，该对象必须具有以下属性

- 顶级对象是 NSArray 或 NSDictionary ，除非您设置 fragmentsAllowed 选项
- 所有对象都是 NSString 、 NSNumber 、 NSArray 、 NSDictionary 或 NSNull 的实例
- 所有字典键都是 NSString 的实例
- 数字既不是 NaN 也不是无穷大

```swift
import  Foundation

let jsonString = "{\"name\":\"John\", \"age\":30}"
if let jsonData = jsonString.data(using: .utf8) {
    do {
        let jsonObject = try JSONSerialization.jsonObject(with: jsonData, options: [])
        if let dictionary = jsonObject as? [String: Any] {
            let name = dictionary["name"] as? String
            let age = dictionary["age"] as? Int
            print(name, age)
        }
    } catch {
        print("Error: \(error)")
    }
}

// Optional("John") Optional(30)
```

```swift
import  Foundation

let dictionary = ["name": "John", "age": 30] as [String : Any]
do {
    let jsonData = try JSONSerialization.data(withJSONObject: dictionary, options: [.prettyPrinted])
    if let jsonString = String(data: jsonData, encoding: .utf8) {
        print(jsonString)
    }
} catch {
    print("Error: \(error)")
}

// {
//   "name" : "John",
//   "age" : 30
// }
```

## CodingKeys

- 列化数据格式中使用的键与数据类型中的属性名称不匹配，请通过将 String 指定为 CodingKeys 枚举的原始值类型来提供备用键。
- 可以排除不编码的字段，注意排除字段需要默认初始值

```swift
import  Foundation

struct myStruct:Codable {
    var userName:String
    var sex:String = ""
    init(userName name:String,sex:String){
        self.userName = name
        self.sex = sex
    }
    
    enum CodingKeys:String,CodingKey {
        case userName = "user_name"
    }
    
}
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let jsonData = try! encoder.encode(myStruct(userName: "小明", sex: "男"))
print(String(data: jsonData, encoding: .utf8)!)


// {
//  "user_name" : "小明"
// }
```

## Encodable 和 Decodable 的自定义实现来定义您自己的编码和解码逻辑

```swift
struct myStruct:Codable {
    var userName:String
    var sex:String = ""
    var age2:Int?
 
    init(userName name:String,sex:String){
        self.userName = name
        self.sex = sex
    }
   
    enum AppendKeys: String,CodingKey {
        case userName = "user_name"
        case age
        case age2
        case books
    }
    
    func encode(to encoder: Encoder) throws {
            var container = encoder.container(keyedBy: AppendKeys.self)
        try container.encodeIfPresent(age2 , forKey: .age2)
        try container.encode(userName, forKey: .userName)
         try container.encode("test", forKey: .age)
        // 数组
       var unKeyContainer =  container.nestedUnkeyedContainer(forKey: .books)
//        try unKeyContainer.encode("")
        }
    
}
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let jsonData = try! encoder.encode(myStruct(userName: "小明", sex: "男"))
print(String(data: jsonData, encoding: .utf8)!)

// {
//   "user_name" : "小明",
//   "age" : "test",
//   "books" : [
// 
//   ]
// }
```

## CodableWithConfiguration ,CodableWithConfiguration ,DecodingConfigurationProviding ,EncodingConfigurationProviding

一种可外置配置的自己定义编码方式：在解码时对字符串进行截取处理、对数组进行截取，不必在解码后再单独处理。

```swift
// 自定义配置类型
struct UserConfiguration {
  // If nil, there is no limitation to biographies length.
  let biographyMaxLength: Int?
  
  // If nil, there is no limitations for interests
  let maxInterests: Int?
}

// 必须定义定义ConfigurationProvider,后续代码中不允许自定义实例，采用.self传递
struct  MyConfigurationProvider: DecodingConfigurationProviding,EncodingConfigurationProviding {
    static var decodingConfiguration: UserConfiguration = .init(biographyMaxLength: 10, maxInterests: 10)
    static var encodingConfiguration: UserConfiguration = .init(biographyMaxLength: 10, maxInterests: 10)
}

// 实现 CodableWithConfiguration 协议 来获取 MyConfigurationProvider对应配置
struct User:Codable, CodableWithConfiguration {
    var userName:String = ""
    
    init(userName name:String){
        self.userName = name
    }
    
    init(from decoder: Decoder, configuration: UserConfiguration) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        try userName = container.decode(String.self, forKey: .userName)
    }

    func encode(to encoder: Encoder, configuration: UserConfiguration) throws {
        print("encoder:User")
        print(configuration.biographyMaxLength) // 获取配置后可进行处理如对字符串截取，移除部分字段
        var container = try encoder.container(keyedBy: CodingKeys.self)
        try container.encode(userName, forKey: .userName)
    }
}

struct MyStruct:Codable {
    var userName:String
    var sex:String = ""
    var age:Int?
    var user = [User]()
 
    init(userName name:String,sex:String,user:[User]){
        self.userName = name
        self.sex = sex
        self.user = user
    }
   
    enum CodingKeys: String,CodingKey {
        case userName
        case sex
        case user
    }
    
    init(from decoder: Decoder) throws {
        print("decoder")
        let container = try decoder.container(keyedBy: CodingKeys.self)
        try userName = container.decode(String.self, forKey: .userName)
        try sex = container.decode(String.self, forKey: .sex)
        try user = container.decode([User].self, forKey: .user)
    }

    func encode(to encoder: Encoder) throws {
        print("encoder:MyStruct")
        var container = try encoder.container(keyedBy: CodingKeys.self)
        try container.encode(userName, forKey: .userName)
        try container.encode(sex, forKey: .sex)
        // 如果采用自己定义编码需要调用：container.encode(user, forKey: .user,configuration: MyConfigurationProvider.self)
        try container.encode(user, forKey: .user,configuration: MyConfigurationProvider.self)
    }    
}

// 采用包装器也可实现上面代码 @CodableConfiguration
struct MyStruct2:Codable {
    var userName:String
    var sex:String = ""
    var age:Int?
    @CodableConfiguration(from: MyConfigurationProvider.self) var user = [User]()
}

let jsonData = try JSONEncoder().encode(MyStruct(userName: "小明", sex: "女",user:[User(userName:"小明2")]))
print(String(data: jsonData, encoding: .utf8)!)

let jsonData2 = try JSONEncoder().encode(MyStruct2(userName: "小明", sex: "女",user:[User(userName:"小明2")]))
print(String(data: jsonData2, encoding: .utf8)!)
```

### ios17,macos14 支持顶级

- ios17以下不支持

```swift
struct UserConfiguration {
  // If nil, there is no limitation to biographies length.
  let biographyMaxLength: Int?
  
  // If nil, there is no limitations for interests
  let maxInterests: Int?
}


struct MyStruct:Codable,CodableWithConfiguration {
    var userName:String
    var sex:String = ""
    var age:Int?
   
 
    init(userName name:String,sex:String){
        self.userName = name
        self.sex = sex
       
    }
    
    init(from decoder: Decoder, configuration: UserConfiguration) throws {
        print("decoder")
        let container = try decoder.container(keyedBy: CodingKeys.self)
        try userName = container.decode(String.self, forKey: .userName)
        try sex = container.decode(String.self, forKey: .sex)
    }

    func encode(to encoder: Encoder, configuration: UserConfiguration) throws {
        print("encoder:MyStruct")
        var container = try encoder.container(keyedBy: CodingKeys.self)
        try container.encode(userName, forKey: .userName)
        try container.encode(sex, forKey: .sex)
    }    
}

// 必须定义定义ConfigurationProvider,后续代码中不允许自定义实例，采用.self传递
struct  MyConfigurationProvider: DecodingConfigurationProviding,EncodingConfigurationProviding {
    static var decodingConfiguration: UserConfiguration = .init(biographyMaxLength: 10, maxInterests: 10)
    static var encodingConfiguration: UserConfiguration = .init(biographyMaxLength: 10, maxInterests: 10)
}

if #available(macCatalystApplicationExtension 17, *) {
    let jsonData = try JSONEncoder().encode(MyStruct(userName: "小明", sex: "女"),configuration: MyConfigurationProvider.self)
    print(String(data: jsonData, encoding: .utf8)!)
} else {
    // Fallback on earlier versions
}
```
