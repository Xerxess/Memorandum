<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Macro](#macro)
  - [Model()](#model)
  - [Attribute(_:originalName:hashModifier:)](#attribute_originalnamehashmodifier)
  - [Unique(\_\:)](#unique_)
  - [Index(\_\:)](#index_)
  - [Relationship(_:deleteRule:minimumModelCount:maximumModelCount:originalName:inverse:hashModifier:)](#relationship_deleteruleminimummodelcountmaximummodelcountoriginalnameinversehashmodifier)
  - [Transient()](#transient)

<!-- /code_chunk_output -->
# Macro

## Model()

- 将 Swift 类转换为由 SwiftData 管理的存储模型
- 使用 @Model 宏注释您的模型类，使其持久化。
- 在构建时，宏会扩展以提供与 PersistentModel 和 Observable 协议的一致性。

```swift
@Model
class RemoteImage {
    var sourceURL: URL
    var data: Data
    
    init(sourceURL: URL, data: Data = Data()) {
        self.sourceURL = sourceURL
        self.data = data
    }
}
```

## Attribute(_:originalName:hashModifier:)

- 指定 SwiftData 在管理拥有类时应用于带注释的属性的自定义行为
- 框架用于管理模型类的存储属性的默认行为适用于大多数用例。但是，如果需要更改特定属性的持久性行为，请使用 @Attribute 宏对其进行注释

```swift
// Schema.Attribute.Option
// static var allowsCloudEncryption 以加密形式存储属性的值
// static var externalStorage 将属性的值存储为与模型存储相邻的二进制数据
// static var preserveValueOnDeletion 当上下文删除拥有模型时，在持久历史记录中保留属性的值
// static var spotlight 为属性的值编制索引，以便它可以显示在 Spotlight 搜索结果中
// static var unique 确保属性的值在相同类型的所有模型中是唯一的
// static func transformable(by: ValueTransformer.Type) 在内存中表单和持久化表单之间转换属性的值
// static func transformable(by: String) 
// static var ephemeral 跟踪对此属性的更改，但不持久化
@attached(peer)
macro Attribute(
    _ options: Schema.Attribute.Option...,
    originalName: String? = nil,
    hashModifier: String? = nil
)
```

```swift
@Model
class RemoteImage {
    @Attribute(.unique) var sourceURL: URL
    var data: Data
    
    init(sourceURL: URL, data: Data = Data()) {
        self.sourceURL = sourceURL
        self.data = data
    }
}
```

## Unique(\_\:)

指定 SwiftData 用于强制模型实例唯一性的键路径

```swift
@Model
final class Person {
    // 以下示例声明Person的每个实例都有一个唯一的ID，并且Person的两个实例没有相同的givenName和familyName：
    #Unique<Person>([\.id], [\.givenName, \.familyName])

    var id: UUID
    var givenName: String
    var familyName: String


    init(id: UUID, givenName: String, familyName: String) {
        self.id = id
        self.givenName = givenName
        self.familyName = familyName
    }
}
```

## Index(\_\:)

指定 SwiftData 用于为关联模型创建一个或多个二进制索引的键路径

## Relationship(_:deleteRule:minimumModelCount:maximumModelCount:originalName:inverse:hashModifier:)

指定 SwiftData 将带注释的属性作为两个模型之间的关系进行管理所需的选项

```swift
// 远程图像可能属于一个类别，并且一个类别可以包含零个、一个或多个图像

@Model
class RemoteImage {
    @Attribute(.unique) var sourceURL: URL
    @Relationship(inverse: \Category.images) var category: Category?
    var data: Data
    init(sourceURL: URL, data: Data = Data()) {
        self.sourceURL = sourceURL
        self.data = data
    }
}


@Model
class Category {
    @Attribute(.unique) var name: String
    @Relationship var images = [RemoteImage]()
    init(name: String) {
        self.name = name
    }
}
```

## Transient()

指示 SwiftData 在管理拥有类时不保留带注释的属性
如果您的模型类具有一个或多个存储属性，您希望在写入持久存储时省略这些属性，请使用 @Transient 宏对每个属性进行注释。

```swift
@Model
class RemoteImage {
    var sourceURL: URL
    var data: Data
    
    @Transient
    var isDownloading = false
    
    init(sourceURL: URL, data: Data = Data(), isDownloading: Bool) {
        self.sourceURL = sourceURL
        self.data = data
        self.isDownloading = isDownloading
    }
}
```
