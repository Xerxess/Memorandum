<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NavigationStack](#navigationstack)
- [NavigationLink](#navigationlink)
- [NavigationPath](#navigationpath)

<!-- /code_chunk_output -->

# NavigationStack

使用导航堆栈在根视图上呈现视图堆栈。用户可以通过点击或点击Navigation Link将视图添加到堆栈顶部，并使用内置的、适合平台的控件（如“返回”按钮或滑动手势）移除视图。堆栈始终显示最近添加且未被移除的视图，并且不允许移除根视图。

要创建导航链接，请在堆栈的视图层次结构中添加 navigationDestination(for:destination:) 修饰符，将视图与数据类型关联。然后初始化显示相同类型数据实例的Navigation Link 。

```swift
NavigationStack {
    List(parks) { park in
        NavigationLink(park.name, value: park)
    }
    .navigationDestination(for: Park.self) { park in
        ParkDetails(park: park)
    }
}
```

# NavigationLink

> 示例代码

```swift
import SwiftUI

struct Page: Identifiable {
    let name: String
    let id = UUID()
}

struct ContentView: View {
    @State private var pages: [Page] = []
    var body: some View {
        return  NavigationStack {
            List {
                NavigationLink {
                    HStack{
                        Text("测试")
                    }
                    .navigationTitle("navigationTitle")
                    .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Text("方式1")
                }
                NavigationLink("方式2") {
                    Text("测试")
                }
            }
            
            // 方式三
            Text("方式三")
            List(pages) { page in
                NavigationLink(page.name, value: page.name)
            }
            .navigationDestination(for: String.self) { name in
                Text(name)
            }
            .navigationTitle("首页")
        }
        .onAppear(){
            showParks()
        }
    }
    
    func showParks() {
        pages.append(Page(name: "page1"))
        pages.append(Page(name: "page2"))
    }
}

#Preview {
    ContentView()
}
```

# NavigationPath

NavigationPath 是 SwiftUI 在 iOS 16/macOS 13 及更高版本中引入的一个现代化导航状态管理工具，用于在使用 NavigationStack 时控制导航栈的内容。它解决了 SwiftUI 早期版本中导航状态管理的许多限制和复杂性。
s
- 类型安全：NavigationPath 可以存储不同类型的值，但在使用时保持类型安全。
- 可编程操作：提供了添加、删除和清空路径的方法。

```swift
@State private var path = NavigationPath()

var body: some View {
    NavigationStack(path: $path) {
        // 内容视图
    }
}
```

> 示例

```swift
import SwiftUI

struct NavigationPathPage: View {
    
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
            List {
                NavigationLink("用户详情", value: "user")
                NavigationLink("产品详情", value: 1)
                Button("编程导航") {
                    path.append("settings")
                }
            }
            .navigationDestination(for: String.self) { value in
                Text("字符串目的地: \(value)")
            }
            .navigationDestination(for: Int.self) { value in
                Text("整数目的地: \(value)")
            }
            .navigationTitle("主页")
        }
    }
    
}

#Preview {
    NavigationPathPage()
}
```
