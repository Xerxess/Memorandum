<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [使用 ResultBuilder 定义 DSL](#使用-resultbuilder-定义-dsl)

<!-- /code_chunk_output -->


# 使用 ResultBuilder 定义 DSL

* ResultBuilder 是 Swift 的一种特性，用于构建自定义领域专用语言（DSL）。
  * 清晰结构化代码：通过 ResultBuilder 构建嵌套结构。
  * 常见应用场景：SwiftUI 和 JSON 构建。

```swift
@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\n")
    }
}

func html(@HTMLBuilder content: () -> String) -> String {
    """
    <html>
    \(content())
    </html>
    """
}

let page = html {
    "<head><title>My Page</title></head>"
    "<body><h1>Hello, world!</h1></body>"
}

print(page)
```

```swift
import UIKit

@resultBuilder
struct ConfigurationBuilder {
    static func buildBlock(_ components: PropertyModifier...) -> [PropertyModifier] {
        components
    }
}

typealias PropertyModifier = (inout UIListContentConfiguration.ImageProperties) -> Void

var configuration = UIListContentConfiguration.cell()
func applyConfiguration(@ConfigurationBuilder _ builder: () -> [PropertyModifier]) {
    var properties = configuration.imageProperties
    builder().forEach { modifier in
        modifier(&properties)
    }
    configuration.imageProperties = properties
}

func set(){
    // 使用方式
    let a = { (properties:inout UIListContentConfiguration.ImageProperties) in
        properties.tintColor = UIColor.red
    }
    let b = { (properties:inout UIListContentConfiguration.ImageProperties) in
        properties.cornerRadius = 10.0
    }
    applyConfiguration {
        a
        b
    }
    
    print(configuration.imageProperties)
}

set()
```