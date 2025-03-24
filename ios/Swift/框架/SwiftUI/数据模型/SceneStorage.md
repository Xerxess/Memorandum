<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [SceneStorage](#scenestorage)

<!-- /code_chunk_output -->


# SceneStorage

@SceneStorage 用于为应用程序的每个窗口或场景保存 UI 状态，特别适用于支持多窗口的 iPad 和 Mac 应用。
当您需要自动恢复值的状态时，您可以使用 SceneStorage。SceneStorage 的工作原理与 State 非常相似，不同之处在于，如果之前保存了初始值，则系统会恢复其初始值，并且该值与同一场景中的其他 SceneStorage 变量共享。

```swift
struct TextEditorView: View {
    @SceneStorage("editorText") private var text = ""
    @SceneStorage("selectedTab") private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            TextEditor(text: $text)
                .tabItem {
                    Label("编辑器", systemImage: "note.text")
                }
                .tag(0)
            
            Text("预览:\n\(text)")
                .padding()
                .tabItem {
                    Label("预览", systemImage: "eye")
                }
                .tag(1)
        }
    }
}
```