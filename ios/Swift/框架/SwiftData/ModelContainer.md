<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ModelContainer](#modelcontainer)

<!-- /code_chunk_output -->

# ModelContainer

- 管理应用程序的 Schema 和 Model 存储配置的对象

```swift
import SwiftData

// 1. 基础模型定义
@Model
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

// 2. Schema 配置
class DataManager {
    let container: ModelContainer
    
    init() throws {
        // 创建 Schema
        let schema = Schema([
            Person.self,  // 可以添加多个模型类
        ])
        
        // Schema 配置选项
        let modelConfiguration = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false,  // 是否只存储在内存中
            cloudKitDatabase: .automatic,  // CloudKit 配置
            migrations: []  // 数据迁移配置
        )
        
        // 创建容器
        container = try ModelContainer(
            for: schema,
            configurations: [modelConfiguration]
        )
    }
}
```
