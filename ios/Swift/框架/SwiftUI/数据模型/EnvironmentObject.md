<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [EnvironmentObject](#environmentobject)

<!-- /code_chunk_output -->

# EnvironmentObject

- 父视图或上级视图提供的ObservableObject的属性包装器类型
- 请确保通过调用其 environmentObject（_：） 修饰符在祖先视图上设置相应的模型对象
- @EnvironmentObject 是一个用于在整个视图层次结构中共享数据的属性包装器。它允许我们避免通过每个中间视图手动传递数据。
- @EnvironmentObject 必须由父视图通过 .environmentObject() 提供
- 如果未提供所需的环境对象，应用会崩溃
- 环境对象在视图层次结构中自动传递
- 适用于需要在多个视图间共享的全局状态
- 配合 ObservableObject 协议使用
- 用于全局状态管理（如用户设置、主题等）

```swift
@MainActor @frozen @propertyWrapper @preconcurrency
struct EnvironmentObject<ObjectType> where ObjectType : ObservableObject
```

```swift
class 用户设置: ObservableObject {
    @Published var 主题颜色 = Color.blue
    @Published var 字体大小: CGFloat = 16
    @Published var 深色模式 = false
}

struct 根视图: View {
    @StateObject private var 设置 = 用户设置()
    
    var body: some View {
        NavigationView {
            内容视图()
        }
        .environmentObject(设置)
    }
}

struct 内容视图: View {
    @EnvironmentObject var 设置: 用户设置
    var body: some View {
        List {
            Text("示例文本")
                .font(.system(size: 设置.字体大小))
                .foregroundStyle(设置.主题颜色)
            
            NavigationLink("设置", destination: 设置视图())
        }
    }
}

struct 设置视图: View {
    @EnvironmentObject var 设置: 用户设置
    var body: some View {
        Form {
            ColorPicker("主题颜色", selection: $设置.主题颜色)
            
            Slider(value: $设置.字体大小, in: 12...24) {
                Text("字体大小: \(Int(设置.字体大小))")
            }
            
            Toggle("深色模式", isOn: $设置.深色模式)
        }
    }
}
```
