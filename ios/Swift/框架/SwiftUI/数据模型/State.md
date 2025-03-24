<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [State](#state)
  - [State传递给子视图](#state传递给子视图)
  - [存储 Observable 对象](#存储-observable-对象)
    - [不使用 @Binding 修改对象属性（非组件绑定属性）](#不使用-binding-修改对象属性非组件绑定属性)
    - [使用 @Binding 修改对象引用或对象属性](#使用-binding-修改对象引用或对象属性)
    - [使用 @Bindable](#使用-bindable)

<!-- /code_chunk_output -->

# State

- 一种属性包装器类型，可以读取和写入由 SwiftUI 管理的值
- @State 是 SwiftUI 中用于管理视图内简单值类型的属性包装器。
- 对于创建响应式用户界面至关重要，当数据发生变化时，视图会自动更新。

- @State 设计用于简单值类型（如 Int 、 String 、 Bool 等）
- 始终将 @State 属性标记为 private
- 使用 $ 前缀将绑定传递给子视图
- @State 属性在视图更新期间由 SwiftUI 自动保持
- 当状态改变时，SwiftUI 会自动更新视图

```swift
@frozen @propertyWrapper
struct State<Value>
```

```swift
struct PlayButton: View {
    @State private var isPlaying: Bool = false // Create the state.
    var body: some View {
        Button(isPlaying ? "Pause" : "Play") { // Read the state.
            isPlaying.toggle() // Write the state.
        }
    }
}
```

```swift
// 复杂数据
struct Task: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool
}

struct ComplexStateDemo: View {
    @State private var tasks: [Task] = []
    @State private var newTaskTitle = ""
    @State private var showCompleted = false
    
    var filteredTasks: [Task] {
        showCompleted ? tasks : tasks.filter { !$0.isCompleted }
    }

    var body: some View {
        Text("")
    }
}
```

## State传递给子视图

- 将 state 属性传递给 subview，则每当容器视图中的值发生变化时，SwiftUI 都会更新该 subview，但 subview 无法修改该值。要使 subview 能够修改状态的存储值，请改为传递 Binding

```swift
struct PlayerView: View {
    @State private var isPlaying: Bool = false // Create the state here now.
    var body: some View {
        VStack {
            PlayButton(isPlaying: $isPlaying) // Pass a binding.
            // ...
        }
    }
}
```

## 存储 Observable 对象

iOS 17.0+
<https://developer.apple.com/documentation/Observation/Observable()>

- 将符合 ObservableObject 协议的对象存储在 State 属性中。`仅当对对象的引用发生更改`时，视图才会更新，例如，使用对另一个对象的引用设置属性时。如果对象的任何已发布属性发生更改，视图将不会更新。要跟踪对引用和对象的已发布属性的更改，请在存储对象时使用 StateObject 而不是 State。(跟React.js 的state类型改state里的值是不会刷新组件状态)
- 与 Subview 共享可观察状态对象
  - 每当对象的 observable 属性发生更改时，SwiftUI 都会更新子视图，但前提是子视图的主体读取该属性。
  - 需要更改存储在其他子视图中的 state 中的引用时,可以获取对该对象的 Binding
  - 当您需要更改存储在 State 中的对象的属性时，没有必要将 Binding 传递给该对象
  - 需要绑定到对象的特定属性，请将绑定传递给对象并在需要时提取绑定到特定属性的绑定

```swift
@Observable
class Library {
    var name = "My library of books"
    // ...
}

struct ContentView: View {
    @State private var library = Library()
    var body: some View {
        LibraryView(library: library)
    }
}
```

### 不使用 @Binding 修改对象属性（非组件绑定属性）

```swift
// 与 Subview 共享可观察状态对象
struct ContentView: View {
    @State private var book = Book()

    var body: some View {
        BookCheckoutView(book: book)
    }
}

// 当您需要更改存储在 State 中的对象的属性时，没有必要将 Binding 传递给该对象
struct BookCheckoutView: View {
    var book: Book
    var body: some View {
        Button(book.isAvailable ? "Check out book" : "Return book") {
            book.isAvailable.toggle()
        }
    }
}
```

### 使用 @Binding 修改对象引用或对象属性

```swift
struct ContentView: View {
    @State private var book: Book?
    var body: some View {
        DeleteBookView(book: $book)
            .task {
                book = Book()
            }
    }
}

struct DeleteBookView: View {
    // 获取对该对象的 Binding，特别是对该对象的引用。当你需要更改存储在其他子视图中的 state 中的引用时，这很有用，例如将引用设置为 nil
    @Binding var book: Book?
    var body: some View {
        Button("Delete book") {
            book = nil
        }
    }
}
```

### 使用 @Bindable

```swift
// 与 Subview 共享可观察状态对象
struct ContentView: View {
    @State private var book = Book()
    var body: some View {
        BookView(book: book)
    }
}

struct BookView: View {
    let book: Book
    var body: some View {
        BookEditorView(book: book)
    }
}

struct BookEditorView: View {
    // 需要绑定到对象的特定属性，请将绑定传递给对象并在需要时提取绑定到特定属性的绑定
    @Bindable var book: Book
    var body: some View {
        TextField("Title", text: $book.title)
    }
}
```
