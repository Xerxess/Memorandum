<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Scene](#scene)

<!-- /code_chunk_output -->

# Scene

Scene 是 SwiftUI 应用的顶层容器，它包含应用的用户界面和行为。iOS 14 和 macOS 11 开始，SwiftUI 引入了 App 和 Scene 协议，使开发者能够完全用 SwiftUI 构建应用，而不需要依赖 UIKit/AppKit。

- WindowGroup：最常用的 Scene 类型，管理应用中的一组窗口。在 iOS 上通常表示整个应用界面，在 macOS 上可以创建多个窗口。
- DocumentGroup：支持创建、打开和管理文档的场景。适用于文档型应用。
- Settings（macOS）：为 macOS 应用提供设置窗口。
- WKNotificationScene（watchOS）：用于 watchOS 应用中的通知界面。
- MenuBarExtra（macOS）：用于创建菜单栏额外项（状态栏图标）。
