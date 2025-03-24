
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Binding](#binding)

<!-- /code_chunk_output -->

# Binding

- @Binding 是 SwiftUI 中用于创建对外部状态的引用的属性包装器。它允许子视图修改父视图中的状态，实现双向数据流。

```swift
@frozen @propertyWrapper @dynamicMemberLookup
struct Binding<Value>
```

```swift
struct PlayerView: View {
    var episode: Episode
    @State private var isPlaying: Bool = false


    var body: some View {
        VStack {
            Text(episode.title)
                .foregroundStyle(isPlaying ? .primary : .secondary)
            PlayButton(isPlaying: $isPlaying) // Pass a binding.
        }
    }
}

struct PlayButton: View {
    @Binding var isPlaying: Bool
    var body: some View {
        Button(isPlaying ? "Pause" : "Play") {
            isPlaying.toggle()
        }
    }
}
```
