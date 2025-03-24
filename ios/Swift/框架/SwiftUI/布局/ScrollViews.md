<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ScrollViews](#scrollviews)
  - [ScrollView](#scrollview)
  - [ScrollViewReader](#scrollviewreader)
- [修饰符](#修饰符)

<!-- /code_chunk_output -->

# ScrollViews

## ScrollView

- ScrollView 可以水平滚动和/或垂直滚动，但不提供缩放功能

```swift
struct ScrollView<Content> where Content : View
```

```swift
var body: some View {
    ScrollView {
        VStack(alignment: .leading) {
            ForEach(0..<100) {
                Text("Row \($0)")
            }
        }
    }
}
```

## ScrollViewReader

- 一种提供编程滚动的视图，通过使用代理滚动到已知的子视图

```swift
struct ScrollViewReader<Content> where Content : View
```

```swift
@Namespace var topID
@Namespace var bottomID
var body: some View {
    ScrollViewReader { proxy in
        ScrollView {
            Button("Scroll to Bottom") {
                withAnimation {
                    proxy.scrollTo(bottomID)
                }
            }
            .id(topID)


            VStack(spacing: 0) {
                ForEach(0..<100) { i in
                    color(fraction: Double(i) / 100)
                        .frame(height: 32)
                }
            }


            Button("Top") {
                withAnimation {
                    proxy.scrollTo(topID)
                }
            }
            .id(bottomID)
        }
    }
}

func color(fraction: Double) -> Color {
    Color(red: fraction, green: 1 - fraction, blue: 0.5)
}
```

# 修饰符

```swift
// iOS 18.0+
// 将指向滚动位置的绑定与此视图中的滚动视图相关联
func scrollPosition(
    _ position: Binding<ScrollPosition>,
    anchor: UnitPoint? = nil
) -> some View

// iOS 17.0+
// 关联一个绑定，以便在此视图中的滚动视图滚动时进行更新
func scrollPosition(
    id: Binding<(some Hashable)?>,
    anchor: UnitPoint? = nil
) -> some View

// 关联锚点以控制默认情况下应呈现滚动视图内容的哪一部分
func defaultScrollAnchor(_ anchor: UnitPoint?) -> some View

// iOS 18.0+
// 关联锚点以控制特定情况下滚动视图的位置
func defaultScrollAnchor(
    _ anchor: UnitPoint?,
    for role: ScrollAnchorRole
) -> some View
```