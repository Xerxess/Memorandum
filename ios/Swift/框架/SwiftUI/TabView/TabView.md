<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [TabView](#tabview)

<!-- /code_chunk_output -->


# TabView

TabView 是 SwiftUI 中用于创建标签式界面的容器视图，允许用户通过底部或顶部的标签页在不同内容之间切换。它是构建具有多个主要功能区域应用程序的基础组件。

```swift
struct ContentView: View {
    @State private var pages: [Page] = []
    var body: some View {
        return  TabView {
            Text("首页")
                .tabItem {
                    Image(systemName: "house")
                    Text("首页")
                }
                .badge(10)
            
            Text("搜索")
                .tabItem {
                    Image(systemName: "magnifyingglass")
                    Text("搜索")
                }
                .padding()
            
            Text("设置")
                .tabItem {
                    Image(systemName: "gear")
                    Text("设置")
                }
        }
    }
}
```