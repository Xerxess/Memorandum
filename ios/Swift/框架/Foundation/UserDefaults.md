<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [UserDefaults](#userdefaults)

<!-- /code_chunk_output -->


# UserDefaults

用户默认数据库的接口，您可以在应用程序启动时持续存储键值对。

UserDefaults 类提供了访问常见类型（例如浮点数、双精度数、整数、布尔值和 URL）
默认对象必须是属性列表，即 NSData 、 NSString 、 NSNumber 的实例（或者对于集合，实例的组合）， NSDate 、 NSArray 或 NSDictionary 。如果要存储任何其他类型的对象，通常应该将其存档以创建 NSData 的实例。
从 UserDefaults 返回的值是`不可变`的，即使您将可变对象设置为值也是如此

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