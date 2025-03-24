<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [AppStorage](#appstorage)
  - [自定义 UserDefaults](#自定义-userdefaults)

<!-- /code_chunk_output -->


# AppStorage

* @AppStorage 提供了一种便捷的方式来读写 UserDefaults 中的值，当值发生变化时会自动更新视图

```swift
@frozen @propertyWrapper
struct AppStorage<Value>
```

```swift
struct SettingsView: View {
    @AppStorage("isDarkMode") private var isDarkMode = false
    @AppStorage("username") private var username = ""
    @AppStorage("refreshInterval") private var refreshInterval = 60
    
    var body: some View {
        Form {
            Toggle("深色模式", isOn: $isDarkMode)
            
            TextField("用户名", text: $username)
            
            Stepper("刷新间隔: \(refreshInterval)秒", value: $refreshInterval, in: 30...300, step: 30)
        }
    }
}
```

## 自定义 UserDefaults

```swift
@AppStorage("theme", store: UserDefaults(suiteName: "group.com.app.settings"))
private var theme = "default"

var body: some View {
    Picker("主题", selection: $theme) {
        Text("默认").tag("default")
        Text("浅色").tag("light")
        Text("深色").tag("dark")
    }
    .pickerStyle(.inline)
}
```