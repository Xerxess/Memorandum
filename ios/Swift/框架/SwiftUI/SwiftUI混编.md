<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [SwiftUI混编](#swiftui混编)
  - [AppKit 使用 SwiftUI视图 兼容性](#appkit-使用-swiftui视图-兼容性)

<!-- /code_chunk_output -->

# SwiftUI混编

视图系统不兼容

- 混编：SwiftUI和AppKit
- 混编：SwiftUI和UIKit

## AppKit 使用 SwiftUI视图 兼容性

- NSWindow不支持SwiftUI的工具栏系统,NSHostingView无法传递工具栏信息给NSWindow

> 以不能使用

- .navigationTitle() 及相关导航修饰符 -> 使用NSToolbar
- .toolbar() 及工具栏相关
- @Environment(\.openWindow) 等窗口环境
- .commands{} 菜单命令
- .windowStyle() 等窗口样式修饰符

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            Text("内容")
        }
        // ❌ 这些在NSWindow中无效
        .navigationTitle("标题")           // 无效
        .navigationBarTitleDisplayMode(.large)  // 无效
        .navigationBarHidden(true)        // 无效
        .toolbar {                        // 无效
            ToolbarItem(placement: .automatic) {
                Button("按钮") { }
            }
        }
        .toolbarBackground(.visible, for: .navigationBar)  // 无效
        .toolbarColorScheme(.dark, for: .navigationBar)    // 无效
    }
}
```

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            Text("内容")
        }
        // ❌ 这些窗口控制在NSWindow中无效
        .onOpenURL { url in }             // 无效
        .handlesExternalEvents(preferring: [], allowing: [])  // 无效
        .defaultSize(width: 800, height: 600)  // 无效（这是App场景的修饰符）
        .windowResizability(.contentSize)      // 无效
        .windowStyle(.hiddenTitleBar)          // 无效
        .windowLevel(.floating)                // 无效
    }
}
```

```swift
struct ContentView: View {
    // ❌ 这些环境值在NSWindow中不可用或无效
    @Environment(\.openWindow) private var openWindow  // 无效
    @Environment(\.dismissWindow) private var dismissWindow  // 无效
    @Environment(\.supportsMultipleWindows) private var supportsMultiple  // 无效
    
    var body: some View {
        VStack {
            Button("打开新窗口") {
                openWindow(id: "newWindow")  // 无效
            }
        }
        // ❌ 场景相关修饰符无效
        .onContinueUserActivity("activity") { _ in }  // 无效
        .userActivity("activity") { _ in }            // 无效
    }
}
```

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            Text("内容")
        }
        // ❌ SwiftUI的菜单命令在NSWindow中无效
        .commands {
            CommandGroup(after: .newItem) {
                Button("自定义命令") { }
            }
        }
        // ❌ 键盘快捷键可能不工作
        .keyboardShortcut("n", modifiers: .command)  // 可能无效
    }
}
```
