<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Environment](#environment)
  - [获取 observable 对象](#获取-observable-对象)
  - [使用键路径获取 observable 对象](#使用键路径获取-observable-对象)
  - [自定义环境值](#自定义环境值)

<!-- /code_chunk_output -->

# Environment

- 一个属性包装器，用于从视图的环境中读取值
- 使用 Environment 属性包装器读取存储在视图环境中的值。
- 在属性声明中使用 EnvironmentValues 键路径指示要读取的值。
- Environment 是 SwiftUI 提供的一种依赖注入机制，用于在视图层次结构中传递系统级或自定义的环境值
- Environment 值是只读的，除非通过 .environment() 修改器设置
- Environment 值会自动向下传递给所有子视图
- 适用于系统级设置和全局配置
- 自定义 Environment 值需要定义 EnvironmentKey
- 比 EnvironmentObject 更轻量级，适合传递简单值
- 用于访问系统提供的环境值
- 创建自定义环境值时，选择合适的默认值
- 避免在环境值中存储复杂的状态
- 考虑使用 Environment 代替多层属性传递
- 注意环境值的作用域和生命周期

```swift
@frozen @propertyWrapper
struct Environment<Value>
```

```swift
@Environment(\.colorScheme) var colorScheme: ColorScheme
```

## 获取 observable 对象

- 使用 Environment 从视图的 Environment 中获取可观察对象。
- Observable 对象必须符合 Observable 协议，并且您的应用必须使用对象本身或键路径在环境中设置对象。

```swift
@Observable
class Library {
    var books: [Book] = [Book(), Book(), Book()]
    var availableBooksCount: Int {
        books.filter(\.isAvailable).count
    }
}

@main
struct BookReaderApp: App {
    @State private var library = Library()
    var body: some Scene {
        WindowGroup {
            LibraryView()
                .environment(library)
        }
    }
}

struct LibraryView: View {
    @Environment(Library.self) private var library
    var body: some View {
        // ...
    }
}
```

## 使用键路径获取 observable 对象

```swift
@Observable
class Library {
    var books: [Book] = [Book(), Book(), Book()]
    var availableBooksCount: Int {
        books.filter(\.isAvailable).count
    }
}


@main
struct BookReaderApp: App {
    @State private var library = Library()
    var body: some Scene {
        WindowGroup {
            LibraryView()
                .environment(\.library, library)
        }
    }
}

struct LibraryView: View {
    @Environment(\.library) private var library
    var body: some View {
        // ...
    }
}
```

## 自定义环境值

```swift
private struct FontSizeKey: EnvironmentKey {
    static let defaultValue: CGFloat = 16
}

extension EnvironmentValues {
    var customFontSize: CGFloat {
        get { self[FontSizeKey.self] }
        set { self[FontSizeKey.self] = newValue }
    }
}

struct CustomFontView: View {
    @Environment(\.customFontSize) var fontSize
    var body: some View {
        Text("Sample Text")
            .font(.system(size: fontSize))
    }
}

struct ParentView: View {
    var body: some View {
        CustomFontView()
            .environment(\.customFontSize, 20)
    }
}
```
