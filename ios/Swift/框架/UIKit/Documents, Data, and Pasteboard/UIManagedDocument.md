<!-- TOC -->

- [UIManagedDocument](#uimanageddocument)
- [Handling Errors 错误处理](#handling-errors-错误处理)
- [API](#api)
    - [Managing the Core Data Stack 管理Core Data堆栈](#managing-the-core-data-stack-管理core-data堆栈)
    - [Customizing Read and Write Operations  自定义读写操作](#customizing-read-and-write-operations--自定义读写操作)
    - [Naming the Persistent Store File 命名持久存储文件](#naming-the-persistent-store-file-命名持久存储文件)

<!-- /TOC -->

# UIManagedDocument

 与Core Data集成的托管文档对象。

 UIManagedDocument是UIDocument的一个具体子类。
 当您初始化托管文档时，您需要指定文档位置的URL。然后，文档对象创建一个 Core Data 核心数据堆栈，用于使用应用程序主捆绑包中的托管对象模型访问文档的持久存储。
 UIManagedDocument执行 Core Data 所需的所有基本设置，在某些情况下，您可以直接使用类的实例（`无需子类`）。
 您可以为使用 persistentStoreOptions 创建协调员以及使用 modelConfiguration 的模型提供配置选项。
 您还可以通过创建UIManagedDocument的子类来执行额外的自定义：

- 覆盖 `persistentStoreName`，以自定义文档文件包中持久存储文件的名称。
- 覆盖 `managedObjectModel`，以自定义托管对象模型的创建。
  - 例如，如果您的应用程序支持多种文档类型，每种类型都使用不同的模型，则可以这样做。您需要确保每个文档类的模型不会合并。
- 覆盖 `persistentStoreType(forFileType:)`，自定义文档使用的持久存储类型。
- 覆盖`configurePersistentStoreCoordinator（for:ofType:modelConfiguration:storeOptions:）`以自定义持久存储的加载或创建。

```swift
@MainActor class UIManagedDocument : UIDocument
```

# Handling Errors 错误处理

要使您的应用程序能够观察和处理保存和验证托管文档的错误，您`必须对UIManagedDocument类进行子类`，并覆盖UIDocument类中以下两种继承的方法之一或两种方法：

- handleError(_:userInteractionPermitted:)
- finishedHandlingError(_:recovered:)

需要`重写`，因为否则，您的应用程序在错误时收到的唯一信息是`stateChangedNotification`通知，该通知不包含userInfo字典，因此不会传达特定的错误信息。

# API

## Managing the Core Data Stack 管理Core Data堆栈

```swift
// 创建或加载文档的持久存储。
// 如果配置成功，则为true，否则为false。
// 如果您想自定义文档持久存储的创建或加载，您可以覆盖此方法。例如，您可以执行迁移后清理——如果您的应用程序需要迁移存储数据以使用新版本的托管对象模型，您可以覆盖此方法，以便在迁移后对商店进行其他修改。
func configurePersistentStoreCoordinator(for: URL, ofType: String, modelConfiguration: String?, storeOptions: [AnyHashable : Any]?)

// 文档的托管对象上下文。
var managedObjectContext: NSManagedObjectContext

// 文档的托管对象模型。
var managedObjectModel: NSManagedObjectModel

// 创建文档持久存储时使用的选项。
var persistentStoreOptions: [AnyHashable : Any]?

// 配置持久存储时要传递的模型配置名称。
var modelConfiguration: String?

// 返回给定文档文件类型的Core Data存储类型。
func persistentStoreType(forFileType: String) -> String

```

## Customizing Read and Write Operations  自定义读写操作

```swift
// 处理读取文档文件包中附加内容目录中的non-Core Data(非核心数据)内容。
func readAdditionalContent(from: URL)

// 处理将on-Core Data(非核心数据)内容写入文档文件包中的其他内容目录。
func additionalContent(for: URL) -> Any

// 处理将on-Core Data(非核心数据)内容写入文档的文件包。
func writeAdditionalContent(Any, to: URL, originalContentsURL: URL?)

```

## Naming the Persistent Store File 命名持久存储文件

```swift
// 返回文档文件包中持久存储文件的名称。
class var persistentStoreName: String

```
