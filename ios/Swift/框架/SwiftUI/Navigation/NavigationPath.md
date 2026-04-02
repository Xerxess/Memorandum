
# NavigationPath

NavigationPath 是 SwiftUI 在 iOS 16 引入的一个核心组件，它提供了一种基于数据（Value-driven）的导航控制方式。不同于旧版的 NavigationView 只能进行简单的 push/pop，它允许你完全控制导航栈的状态，非常适合处理深层链接（Deep Link）和复杂的多级导航。

- NavigationPath是一个类型擦除的集合，您可以在其中存储异构数据列表。
- 对于同质数据，请改用 Array

- NavigationPath 通常需要配合以下三个部分:
  - NavigationStack: 视图容器，负责渲染导航栏和内容。
  - NavigationPath: 绑定变量，用来保存当前的导航状态（栈中有哪些值）。
  - navigationDestination(for:destination:): 路由映射表，告诉 SwiftUI “当栈顶是某个值时，该显示哪个 View”。

- 通过调用 append(_:) 或用户点击值目标链接（例如 init(value: label:) 来向路径中添加值。

```swift
// 在此示例中，当有人激活链接时，SwiftUI 会将相应的值（例如 Color .mint ）添加到 path 。SwiftUI 使用名为 path 的 State 属性来管理导航堆栈的状态。
struct ContentView: View {
    @State private var path = NavigationPath()
    var body: some View {
        NavigationStack(path: $path) {
            List {
                NavigationLink("Mint", value: Color.mint)
                NavigationLink("Red", value: Color.red)
            }
            .navigationDestination(for: Color.self) { color in
                ColorDetail(color: color)
            }
        }
    }
}
```
