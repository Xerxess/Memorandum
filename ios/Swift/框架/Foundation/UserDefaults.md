<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UserDefaults](#userdefaults)
  - [存储自定义对象](#存储自定义对象)

<!-- /code_chunk_output -->


# UserDefaults

UserDefaults 是 Apple 平台（iOS, macOS, tvOS, watchOS）提供的一种轻量级数据持久化方案，主要用于存储用户的偏好设置和应用配置。

存储机制：本质上是一个 .plist（属性列表）文件，存储在应用沙盒的 Library/Preferences/ 目录下
数据结构：采用 键值对 (Key-Value) 的形式进行读写。
持久性：数据在应用退出或重启后依然存在，除非用户卸载应用。

用户默认数据库的接口，您可以在应用程序启动时持续存储键值对。

UserDefaults 类提供了访问常见类型（例如浮点数、双精度数、整数、布尔值和 URL）
默认对象必须是属性列表，即 NSData 、 NSString 、 NSNumber 的实例（或者对于集合，实例的组合）， NSDate 、 NSArray 或 NSDictionary 。如果要存储任何其他类型的对象，通常应该将其存档以创建 NSData 的实例。
从 UserDefaults 返回的值是`不可变`的，即使您将可变对象设置为值也是如此

由于底层是 .plist 文件，它仅支持存储以下属性列表类型

- 基础类型：String (NSString), Int / Float / Double (NSNumber), Bool。
- 集合类型：Array (NSArray), Dictionary (NSDictionary)（其内部元素也必须是支持的类型）。
- 对象类型：Data (NSData), Date (NSDate)。

`注意`：若要存储自定义对象（如 struct/class），需要先将其通过 JSONEncoder 或 PropertyListEncoder 转换为 Data 类型再存储。

```swift
// 存储数据
UserDefaults.standard.set(42, forKey: "myNumber")
UserDefaults.standard.set("Hello, UserDefaults!", forKey: "myString")
UserDefaults.standard.set(true, forKey: "myBool")

// 获取数据
let boolValue = UserDefaults.standard.object(forKey: "myKey")
let number = UserDefaults.standard.integer(forKey: "myNumber")
let string = UserDefaults.standard.string(forKey: "myString")
let boolValue = UserDefaults.standard.bool(forKey: "myBool")
```

```swift
// 删除指定键的数据
UserDefaults.standard.removeObject(forKey: "myNumber")
```

## 存储自定义对象

- 由于 UserDefaults 不直接支持自定义类型，你需要让你的模型遵循 Codable 协议。

```swift
struct UserProfile: Codable {
    var name: String
    var age: Int
    var isVip: Bool
}

let user = UserProfile(name: "阿强", age: 25, isVip: true)
// 存储对象 (编码为 Data)
if let encodedData = try? JSONEncoder().encode(user) {
    UserDefaults.standard.set(encodedData, forKey: "saved_user")
}

// 读取对象 (解码回模型)

if let savedData = UserDefaults.standard.data(forKey: "saved_user"),
   let loadedUser = try? JSONDecoder().decode(UserProfile.self, from: savedData) {
    print("读取成功：\(loadedUser.name), \(loadedUser.age)")
}
```