<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ObservedObject](#observedobject)

<!-- /code_chunk_output -->


# ObservedObject

* 一种属性包装器类型，它订阅 observable 对象，并在 observable 对象发生更改时使视图失效
* 希望视图在对象的已发布属性更改时更新时，将 @ObservedObject 属性添加到 SwiftUI View 的参数。通常，您这样做是为了将 StateObject 传递到 subview 中
* 当可观察对象的任何published布属性发生更改时，SwiftUI 会更新依赖于该对象的任何视图
* @ObservedObject 用于订阅由其他视图拥有的 ObservableObject。通常用于在父视图和子视图之间传递数据。

```swift
@MainActor @propertyWrapper @preconcurrency @frozen
struct ObservedObject<ObjectType> where ObjectType : ObservableObject
```

```swift
class DataModel: ObservableObject {
    @Published var name = "Some Name"
    @Published var isEnabled = false
}

struct MyView: View {
    @StateObject private var model = DataModel()
    var body: some View {
        Text(model.name)
        MySubView(model: model)
    }
}

struct MySubView: View {
    @ObservedObject var model: DataModel
    var body: some View {
        Toggle("Enabled", isOn: $model.isEnabled)
    }
}
```
