# UUID

识别类型、接口和其他项目的通用唯一值。

```swift
struct UUID
```

```swift
let uuid = UUID()
let uuidString = uuid.uuidString // 将 UUID 转换为字符串表示
```

```swift
if let uuid = UUID(uuidString: "E621E1F8-C36C-495A-93FC-0C247A3E6E5F") {
    // 从字符串创建 UUID 成功
}
```
