<!-- TOC -->

- [UIDocument](#uidocument)
- [典型文档的生命周期](#典型文档的生命周期)
- [NSFilePresenter Protocol](#nsfilepresenter-protocol)
- [Subclassing Notes](#subclassing-notes)
- [API](#api)
    - [Writing Document Data](#writing-document-data)
    - [Reading Document Data](#reading-document-data)
    - [Reverting a Document](#reverting-a-document)
    - [将文档恢复到存储在磁盘上的最新文档数据。](#将文档恢复到存储在磁盘上的最新文档数据)
    - [Tracking Changes and Autosaving  跟踪更改和自动保存](#tracking-changes-and-autosaving--跟踪更改和自动保存)
    - [Supporting User Activities](#supporting-user-activities)
    - [Resolving Conflicts and Handling Errors 解决冲突和处理错误](#resolving-conflicts-and-handling-errors-解决冲突和处理错误)
    - [Notifications](#notifications)

<!-- /TOC -->

# UIDocument

一个`抽象的基类`，用于管理应用程序数据的独立部分。

使用UIDocument及其底层架构的应用程序因其文档获得许多好处：

- 在后台队列上异步读取和写入数据。因此，在进行读写操作时，应用程序对用户的响应不受影响。
- 协调阅读和写入自动与云服务集成的文档文件。
- 支持发现不同版本文档之间的冲突（如果发生这种情况）。
- 通过首先将数据写入临时文件，然后用它替换当前文档文件来安全地保存文档数据。
- 在合适的时候自动保存文档数据；此机制包括支持处理暂停行为。

在Model-View-Controller设计模式中，UIDocument对象是模型对象或模型控制器对象——它管理一起构成文档数据的文档或聚合模型对象的数据。
您`通常将其与视图控制器配对`，该控制器管理显示文档内容的视图。UIDocument不支持管理文档视图。

基于文档的应用程序`必须为其文档创建一个UIDocument子类`。

UIDocument架构中文档的主要属性是其文件URL。当您通过调用init（fileURL:）初始化文档子类的实例时，您必须传递一个文件URL，在应用程序沙盒中找到文档文件。UIDocument从文件URL中确定文件类型（与文件扩展名关联的统一类型标识符）和文档名称（文件名组件）。
您可以覆盖fileType和localizedName属性的访问器方法，以提供不同的值。

```swift
@MainActor class UIDocument : NSObject
```

# 典型文档的生命周期

以下概述了典型文档的生命周期（有关实施详细信息，请参阅“子分类说明”）：

- 创建一个新文档或打开现有文档。
  - 要创建新文档，请分配和初始化子类的实例，然后在实例上调用save（to:for:completionHandler:）。
  - 要打开现有文档（由用户选择），请分配和初始化子类的实例，然后在实例上调用open（completionHandler:）。
- 用户编辑文档。
  - 当用户编辑时，跟踪文档的变化。UIDocument定期记录未保存的更改，并将文档数据写入其文件。
- 用户请求将文档与云服务集成（可选）。
  - 您必须为云存储启用文档。您还必须解决同一文档的不同版本之间的任何冲突。
- 用户关闭文档。
  - 在文档实例上调用 close(completionHandler:)。如果有任何未保存的更改，UIDocument会保存文档。

# NSFilePresenter Protocol

UIDocument类采用NSFilePresenter协议。当另一个客户端尝试读取基于UIDocument的应用程序的文档时，该读取将被暂停，直到UIDocument对象有机会保存对文档所做的任何更改。
`UIDocument实现了所有NSFilePresenter方法`

# Subclassing Notes

- 每个基于文档的应用程序`必须创建一个UIDocument子类`，其实例代表其文档。大多数应用程序的子分类要求很简单：
- 对于写入操作，实现contents（forType:）方法来提供文档数据的快照。数据必须以NSData对象（用于平面文件）或FileWrapper对象（用于文件包）的形式。写入操作通常通过自动保存功能启动
- 对于读取操作，实现load（fromContents:ofType:）方法来接收NSData或FileWrapper对象，并用它初始化应用程序的数据结构。
- 实现更改跟踪以启用自动保存功能。有关详细信息，请参阅更改跟踪。
- 为文档启用云服务时，解决文档不同版本之间的冲突。有关详细信息，请参阅冲突解决和错误处理。

# API

```swift
// 返回以其文件系统位置初始化的文档对象。
init(fileURL: URL)

// 文档初始化的文件URL。
var fileURL: URL

// 文档的本地化名称。
var localizedName: String

// 文档的文件类型。
var fileType: String?

// 上次修改文档文件的日期和时间。
var fileModificationDate: Date?

// 返回文档的当前状态。
// struct State
// static var normal: UIDocument.State 文档已打开，编辑已启用，并且没有与之相关的冲突或错误。
// static var closed: UIDocument.State 阅读文档时出错：文档要么未成功打开，要么此后已关闭。文档属性可能无效。
// static var inConflict: UIDocument.State 位于fileURL的文档文件存在冲突。您可以通过调用NSFileVersion类的其他VersionsOfItemAtURL：类方法来访问这些相互冲突的文档版本。此方法返回NSFileVersion对象数组。然后，您可以解决相互冲突的版本——例如，以编程方式尝试合并版本或向用户展示文档版本，并要求他或她选择一个版本。
// static var savingError: UIDocument.State 保存或复原文档时出错。
// static var editingDisabled: UIDocument.State 该文档繁忙，目前用户编辑不安全。此状态是在UIdocument调用disableEditing()方法之前设置的。当再次编辑变得安全时，它会调用enableEditing()。当错误阻止文档恢复时，UIDocument也会设置此状态。
// static var progressAvailable: UIDocument.State 该文件正在下载或上传，并且可以获得进度信息。设置此状态后，您可以使用文档的进度属性来监控当前操作。
var documentState: UIDocument.State

// 文档的上传或下载进度。
// 在设置 progressAvailable 可用时，此属性的值有效。
var progress: Progress?
```

## Writing Document Data

```swift
// 保存任何更改后异步关闭文档。
func close(completionHandler: ((Bool) -> Void)?)

// 覆盖此方法以返回要保存的文档数据。
func contents(forType: String) -> Any

// 将文档数据保存到应用程序沙盒中的指定位置。
func save(to: URL, for: UIDocument.SaveOperation, completionHandler: ((Bool) -> Void)?)

// 确保文档数据安全地写入应用程序沙盒中的指定位置。
func writeContents(Any, andAttributes: [AnyHashable : Any]?, safelyTo: URL, for: UIDocument.SaveOperation)

// 将文档数据写入文件URL指示的沙盒位置的磁盘。
func writeContents(Any, to: URL, for: UIDocument.SaveOperation, originalContentsURL: URL?)

// 返回用于保存文档的文件类型。
var savingFileType: String?

// 返回文件属性字典，以便在编写或更新文档文件时与文档文件相关联。
func fileAttributesToWrite(to: URL, for: UIDocument.SaveOperation) -> [AnyHashable : Any]

// 返回一个文件扩展名，以附加到正在编写的文档文件的文件URL。
func fileNameExtension(forType: String?, saveOperation: UIDocument.SaveOperation) -> String

```

## Reading Document Data

```swift
// 异步打开文档。
func open(completionHandler: ((Bool) -> Void)?)

// 覆盖此方法，将文档数据加载到应用程序的数据模型中。
func load(fromContents: Any, ofType: String?)

// 在应用程序沙盒的指定位置读取文件中的文档数据。
func read(from: URL)

```

## Reverting a Document

```swift
// 将文档恢复到存储在磁盘上的最新文档数据。
func revert(toContentsOf: URL, completionHandler: ((Bool) -> Void)?)

```

## 将文档恢复到存储在磁盘上的最新文档数据。

```swift
// 重写以在对文档进行更改不安全时禁用编辑。
func disableEditing()

// 重写以在再次安全地更改文档时启用编辑。
func enableEditing()

```

## Tracking Changes and Autosaving  跟踪更改和自动保存

```swift
// 返回文档是否有任何未保存的更改。
var hasUnsavedChanges: Bool

// 通过指示更改类型来更新更改计数器。
func updateChangeCount(UIDocument.ChangeKind)

// 文档的撤销管理器。
var undoManager: UndoManager!

// 重写以返回特定保存操作的更改令牌。
func changeCountToken(for: UIDocument.SaveOperation) -> Any

// 重写以根据UIKit传递的更改计数令牌更新更改计数。
func updateChangeCount(withToken: Any, for: UIDocument.SaveOperation)

// 由UIKit调用，以启动具有未保存更改的文档的自动保存。
func autosave(completionHandler: ((Bool) -> Void)?)

```

## Supporting User Activities

```swift
// 封装本文档支持的用户活动的对象。
var userActivity: NSUserActivity?

// 恢复继续给定用户活动所需的状态。
func restoreUserActivityState(NSUserActivity)

// 更新给定用户活动的状态。
func updateUserActivityState(NSUserActivity)

```

## Resolving Conflicts and Handling Errors 解决冲突和处理错误

```swift
// 调用或重写以处理尝试读取、保存或恢复文档时发生的错误。
func handleError(Error, userInteractionPermitted: Bool)

// 告诉UIKit您已经完成了错误的处理。
func finishedHandlingError(Error, recovered: Bool)

// 当不再安全地继续而不立即处理错误时发送。
func userInteractionNoLongerPermitted(forError: Error)

```

## Notifications

```swift
// 当文档状态发生变化时，由文档对象发布。
class let stateChangedNotification: NSNotification.Name

```