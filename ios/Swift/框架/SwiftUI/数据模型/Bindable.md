<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Bindable](#bindable)

<!-- /code_chunk_output -->

# Bindable

- 一种属性包装器类型，支持创建对可观察对象的可变属性的绑定
- 使用此属性包装器创建与符合 Observable 协议的数据模型对象的可变属性的绑定。
- 用于在使用 Observable 宏的类中创建双向绑定
- 只能用于 @Observable 标记的类
- 提供了类似 @State 的双向绑定功能
- 不需要使用 @Published 属性
- iOS 17 及以上版本可用
- 适用于视图和数据模型之间的双向绑定

```swift
@dynamicMemberLookup @propertyWrapper
struct Bindable<Value>
```

```swift
@Observable
class UserSettings {
    var username = ""
    var isNotificationsEnabled = false
    var theme = "light"
}

struct SettingsView: View {
    @Bindable var settings: UserSettings
    
    var body: some View {
        Form {
            TextField("用户名", text: $settings.username)
            
            Toggle("启用通知", isOn: $settings.isNotificationsEnabled)
            
            Picker("主题", selection: $settings.theme) {
                Text("浅色").tag("light")
                Text("深色").tag("dark")
            }
        }
    }
}
```
