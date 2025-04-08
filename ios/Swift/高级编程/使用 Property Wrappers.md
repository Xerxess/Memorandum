<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [使用 Property Wrappers](#使用-property-wrappers)

<!-- /code_chunk_output -->

# 使用 Property Wrappers

- Property Wrappers 是 Swift 提供的一种工具，用于封装属性的逻辑，例如懒加载、数据验证等。
  - 封装通用逻辑：将常见的属性逻辑提取到 Property Wrapper 中。
  - 结合 @State 和 @Published：在 SwiftUI 和 Combine 中，Property Wrappers 被广泛使用。

```swift
@propertyWrapper
struct Clamped<Value: Comparable> {
    private var value: Value
    private let range: ClosedRange<Value>
    
    init(wrappedValue: Value, _ range: ClosedRange<Value>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
    
    var wrappedValue: Value {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
}

struct Temperature {
    @Clamped(-50...50) var celsius: Double
}

var temp = Temperature(celsius: 100)
print(temp.celsius) // 输出: 50
```
