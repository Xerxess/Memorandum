<!-- TOC -->

- [Bundle](#bundle)
- [Topics](#topics)
    - [Getting Standard Bundle Objects 获取标准捆绑对象](#getting-standard-bundle-objects-%E8%8E%B7%E5%8F%96%E6%A0%87%E5%87%86%E6%8D%86%E7%BB%91%E5%AF%B9%E8%B1%A1)
    - [Creating and Initializing a Bundlein page link 创建并初始化 Bundlein 页面链接](#creating-and-initializing-a-bundlein-page-link-%E5%88%9B%E5%BB%BA%E5%B9%B6%E5%88%9D%E5%A7%8B%E5%8C%96-bundlein-%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5)
    - [Loading Nib Filesin page link 在页面链接中加载 Nib 文件](#loading-nib-filesin-page-link-%E5%9C%A8%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E4%B8%AD%E5%8A%A0%E8%BD%BD-nib-%E6%96%87%E4%BB%B6)
    - [Finding Resource Filesin page link 在页面链接中查找资源文件](#finding-resource-filesin-page-link-%E5%9C%A8%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E4%B8%AD%E6%9F%A5%E6%89%BE%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6)
    - [Finding Image Resources 查找图像资源](#finding-image-resources-%E6%9F%A5%E6%89%BE%E5%9B%BE%E5%83%8F%E8%B5%84%E6%BA%90)
    - [Finding Sound Resourcesin page link  在页面链接中查找声音资源](#finding-sound-resourcesin-page-link--%E5%9C%A8%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E4%B8%AD%E6%9F%A5%E6%89%BE%E5%A3%B0%E9%9F%B3%E8%B5%84%E6%BA%90)
    - [Fetching Localized Stringsin page link 在页面链接中获取本地化字符串](#fetching-localized-stringsin-page-link-%E5%9C%A8%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E4%B8%AD%E8%8E%B7%E5%8F%96%E6%9C%AC%E5%9C%B0%E5%8C%96%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [Fetching Context Help Resources 获取上下文帮助资源](#fetching-context-help-resources-%E8%8E%B7%E5%8F%96%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B8%AE%E5%8A%A9%E8%B5%84%E6%BA%90)
    - [Getting the Standard Bundle Directoriesin page link 在页面链接中获取标准捆绑包目录](#getting-the-standard-bundle-directoriesin-page-link-%E5%9C%A8%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E4%B8%AD%E8%8E%B7%E5%8F%96%E6%A0%87%E5%87%86%E6%8D%86%E7%BB%91%E5%8C%85%E7%9B%AE%E5%BD%95)
    - [Getting Bundle Information 获取捆绑包信息](#getting-bundle-information-%E8%8E%B7%E5%8F%96%E6%8D%86%E7%BB%91%E5%8C%85%E4%BF%A1%E6%81%AF)
    - [Getting Localization Information 获取本地化信息](#getting-localization-information-%E8%8E%B7%E5%8F%96%E6%9C%AC%E5%9C%B0%E5%8C%96%E4%BF%A1%E6%81%AF)
    - [Managing Preservation Priority for On Demand Resourcesin page link 管理按需资源的保留优先级（页面链接）](#managing-preservation-priority-for-on-demand-resourcesin-page-link-%E7%AE%A1%E7%90%86%E6%8C%89%E9%9C%80%E8%B5%84%E6%BA%90%E7%9A%84%E4%BF%9D%E7%95%99%E4%BC%98%E5%85%88%E7%BA%A7%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5)
    - [Getting Classes from a Bundlein page link 从 Bundlein 页面链接获取类](#getting-classes-from-a-bundlein-page-link-%E4%BB%8E-bundlein-%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E8%8E%B7%E5%8F%96%E7%B1%BB)
    - [Loading Code from a Bundlein page link 从 Bundlein 页面链接加载代码](#loading-code-from-a-bundlein-page-link-%E4%BB%8E-bundlein-%E9%A1%B5%E9%9D%A2%E9%93%BE%E6%8E%A5%E5%8A%A0%E8%BD%BD%E4%BB%A3%E7%A0%81)

<!-- /TOC -->

# Bundle

存储在磁盘上的捆绑目录中的代码和资源的表示。

用于访问应用程序资源和文件的集合。  
通过 Bundle 类，您可以获取应用程序的主包（Main Bundle）中的资源、文件的路径、执行资源加载等操作。

# Topics

## Getting Standard Bundle Objects 获取标准捆绑对象

```swift
// 返回包含当前可执行文件的捆绑对象。
class var main: Bundle { get }

// 返回表示框架的所有应用程序捆绑包的数组。
// allFrameworks 方法返回的是只包含框架的 Bundle 对象的数组，不包括应用程序的主包。如果您需要获取包括主包在内的所有已加载的 Bundle 对象，您可以使用 Bundle.allBundles 属性。
class var allFrameworks: [Bundle] { get }

// 返回所有应用程序非框架包的数组。
// allBundles 不仅返回应用程序的主包，还包括了其他框架、库或插件所包含的 Bundle 对象。这些框架、库或插件可以是您自己的项目中的框架，也可以是第三方框架或库。
class var allBundles: [Bundle] { get }
```

## Creating and Initializing a Bundlein page link 创建并初始化 Bundlein 页面链接

```swift
// 返回与指定类关联的NSBundle对象。
init(for aClass: AnyClass)

// 返回具有指定捆绑标识符的NSBundle实例。
init?(identifier: String)

// 返回初始化为对应于指定文件URL的NSBundle对象。
convenience init?(url: URL)

// 返回初始化为对应于指定目录的NSBundle对象。
init?(path: String)
```

## Loading Nib Filesin page link 在页面链接中加载 Nib 文件

```swift
func loadNibNamed(
    _ name: String,
    owner: Any?,
    options: [UINib.OptionsKey : Any]? = nil
) -> [Any]?

func loadNibNamed(
    _ nibName: NSNib.Name,
    owner: Any?,
    topLevelObjects: AutoreleasingUnsafeMutablePointer<NSArray?>?
) -> Bool
```

## Finding Resource Filesin page link 在页面链接中查找资源文件

```swift
// 返回由指定名称和扩展名标识并驻留在给定捆绑包目录中的资源文件的文件URL。
// 根据提供的资源文件名、文件扩展名和可选的子目录路径，该方法返回一个指向该资源文件的 URL。
// name：要查找的资源文件的名称（不包括扩展名），可以是文件名或文件名的一部分。如果为 nil，则该方法将返回第一个匹配给定扩展名和子目录路径的资源文件的 URL。
// ext：资源文件的扩展名，例如 "png" 或 "txt"。如果为 nil，则该方法将返回第一个匹配给定文件名和子目录路径的资源文件的 URL。
// subpath：资源文件的可选子目录路径。如果提供了子目录路径，则方法将在指定的子目录中搜索资源文件。子目录路径应该是相对于 bundle 的根目录的路径。如果为 nil，则该方法将在 bundle 的根目录中搜索资源文件。
func url(
    forResource name: String?,
    withExtension ext: String?,
    subdirectory subpath: String?
) -> URL?

// 返回由指定名称和文件扩展名标识的资源的文件URL。
func url(
    forResource name: String?,
    withExtension ext: String?
) -> URL?

// 返回由指定文件扩展名标识并位于指定捆绑子目录中的所有资源的文件URL数组。
func urls(
    forResourcesWithExtension ext: String?,
    subdirectory subpath: String?
) -> [URL]?

// 返回由指定名称和文件扩展名标识的资源的文件URL，位于指定的捆绑包子目录中，并仅限于全局资源和与指定本地化相关的资源。
func url(
    forResource name: String?,
    withExtension ext: String?,
    subdirectory subpath: String?,
    localization localizationName: String?
) -> URL?

// 返回一个数组，其中包含具有指定文件扩展名的所有捆绑资源的文件URL，位于指定资源子目录中，并仅限于全局资源和与指定本地化相关的资源。
func urls(
    forResourcesWithExtension ext: String?,
    subdirectory subpath: String?,
    localization localizationName: String?
) -> [URL]?

// 返回一个数组，其中包含具有指定文件扩展名的所有包资源的文件URL，位于指定包中的指定资源子目录中。
class func urls(
    forResourcesWithExtension ext: String?,
    subdirectory subpath: String?,
    in bundleURL: URL
) -> [URL]?

// 返回由指定名称和文件扩展名标识的资源的完整路径名。
// name：要查找的资源文件的名称（不包括扩展名），可以是文件名或文件名的一部分。如果为 nil，则该方法将返回第一个匹配给定文件类型的资源文件的路径。
// ext：资源文件的类型（扩展名），例如 "png" 或 "txt"。如果为 nil，则该方法将返回第一个匹配给定文件名的资源文件的路径。
func path(
    forResource name: String?,
    ofType ext: String?
) -> String?

// 返回由指定名称和文件扩展名标识并位于指定捆绑包子目录中的资源的完整路径名。
func path(
    forResource name: String?,
    ofType ext: String?,
    inDirectory subpath: String?
) -> String?

// 返回由指定名称和文件扩展名标识的资源的完整路径名，位于指定的捆绑子目录中，并仅限于全局资源和与指定本地化相关的资源。
func path(
    forResource name: String?,
    ofType ext: String?,
    inDirectory subpath: String?,
    forLocalization localizationName: String?
) -> String?

// 返回一个数组，其中包含具有指定文件扩展名并位于资源子目录中的所有捆绑资源的路径名。
func paths(
    forResourcesOfType ext: String?,
    inDirectory subpath: String?
) -> [String]

// 返回一个数组，其中包含具有指定文件扩展名的所有捆绑资源的文件，位于指定资源子目录中，并仅限于全局资源和与指定本地化相关的资源。
func paths(
    forResourcesOfType ext: String?,
    inDirectory subpath: String?,
    forLocalization localizationName: String?
) -> [String]

// 返回由指定名称和扩展名标识并驻留在给定捆绑目录中的资源文件的完整路径名。
class func path(
    forResource name: String?,
    ofType ext: String?,
    inDirectory bundlePath: String
) -> String?

// 返回一个数组，其中包含具有指定扩展并位于指定路径的捆绑目录中的所有捆绑资源的路径名。
class func paths(
    forResourcesOfType ext: String?,
    inDirectory bundlePath: String
) -> [String]
```

## Finding Image Resources 查找图像资源

```swift
// 将指定图像资源的位置作为NSURL返回
// macOS 10.6+
func urlForImageResource(_ name: NSImage.Name) -> URL?

// 返回指定图像资源文件的位置。
// macOS 10.6+
func pathForImageResource(_ name: NSImage.Name) -> String?

// 返回与指定名称关联的NSImage实例，该实例可以由代表图像不同分辨率版本的多个文件支持。
// macOS 10.6+
func image(forResource name: NSImage.Name) -> NSImage?
```

## Finding Sound Resourcesin page link  在页面链接中查找声音资源

```swift
// 返回指定声音资源文件的位置。
// macOS 10.0+
func path(forSoundResource name: NSSound.Name) -> String?
```

## Fetching Localized Stringsin page link 在页面链接中获取本地化字符串

```swift
// 返回由指定键指定并驻留在指定表中的字符串的本地化版本。
func localizedString(
    forKey key: String,
    value: String?,
    table tableName: String?
) -> String
```

## Fetching Context Help Resources 获取上下文帮助资源

```swift
// 从捆绑包的帮助文件中打开指定密钥的上下文相关帮助。
func contextHelp(forKey key: NSHelpManager.ContextHelpKey) -> NSAttributedString?
```

## Getting the Standard Bundle Directoriesin page link 在页面链接中获取标准捆绑包目录

```swift
// 包含资源文件的捆绑包子目录的文件URL。
// 通过访问 Bundle.main.resourceURL，您可以获取当前应用程序资源目录的 URL。这样可以方便地访问和处理应用程序的资源文件，例如图片、音频、视频等。
var resourceURL: URL? { get }

// 接收方可执行文件的文件URL。
// 通过访问 Bundle.main.executableURL，您可以获取当前应用程序的可执行文件的 URL。这样可以方便地获取应用程序的主要入口点，以便进行一些特定的操作，如动态加载或处理可执行文件。
var executableURL: URL? { get }

// 包含私有框架的捆绑包子目录的文件URL。
// 通过访问 Bundle.main.privateFrameworksURL，您可以获取当前应用程序私有框架目录的 URL。私有框架目录通常用于存储应用程序专用的框架或第三方框架，这些框架不会被其他应用程序使用。
var privateFrameworksURL: URL? { get }

// 包含共享框架的接收方子目录的文件URL。
var sharedFrameworksURL: URL? { get }

// 包含插件的接收器子目录的文件URL。
var builtInPlugInsURL: URL? { get }

// 返回接收器捆绑包中具有指定名称的可执行文件的文件URL。
func url(forAuxiliaryExecutable executableName: String) -> URL?

// 包含共享支持文件的捆绑包子目录的文件URL。
var sharedSupportURL: URL? { get }

// 捆绑包的App Store收据的文件URL。
var appStoreReceiptURL: URL? { get }

// 包含资源的捆绑包子目录的完整路径名。
var resourcePath: String? { get }

// 接收器可执行文件的完整路径名。
var executablePath: String? { get }

// 包含私有框架的捆绑包子目录的完整路径名。
var privateFrameworksPath: String? { get }

// 包含共享框架的捆绑包子目录的完整路径名。
var sharedFrameworksPath: String? { get }

// 包含插件的接收器子目录的完整路径名。
var builtInPlugInsPath: String? { get }

// 返回接收器捆绑包中具有指定名称的可执行文件的完整路径名。
func path(forAuxiliaryExecutable executableName: String) -> String?

// 包含共享支持文件的捆绑包子目录的完整路径名。
var sharedSupportPath: String? { get }
```

## Getting Bundle Information 获取捆绑包信息

```swift
// 接收方捆绑目录的完整URL。
var bundleURL: URL { get }

// 接收器捆绑目录的完整路径名。
var bundlePath: String { get }

// 接收器的捆绑标识符。
var bundleIdentifier: String? { get }

// 由捆绑包的Info.plist文件构建的字典，其中包含有关接收者的信息。
// 通过访问 Bundle.main.infoDictionary，您可以获取当前应用程序的信息字典内容。  
// 返回的是一个字典类型 [String: Any]，其中键是字符串，值可以是任意类型。
var infoDictionary: [String : Any]? { get }

// 返回与接收方信息属性列表中指定密钥关联的值。
// 用于从应用程序的信息字典（Info.plist）中获取特定键的值。该方法接受一个字符串参数，表示要检索的键，并返回与该键关联的值。
func object(forInfoDictionaryKey key: String) -> Any?
```

## Getting Localization Information 获取本地化信息

```swift
// 捆绑包中包含的所有本地化的列表。
var localizations: [String] { get }

// 捆绑包中包含的首选本地化的有序列表。
var preferredLocalizations: [String]

// 开发语言的本地化。
var developmentLocalization: String?

// 包含来自包的本地化属性列表的键的字典。
var localizedInfoDictionary: [String : Any]?

// 从指定列表中返回一个或多个本地化，捆绑对象将使用这些本地化来为当前用户查找资源。
class func preferredLocalizations(from: [String]) -> [String]

// 给定用户语言首选项的指定候选列表，返回包将为其提供本地化内容的区域设置标识符。
class func preferredLocalizations(from: [String], forPreferences: [String]?) -> [String]
```

## Managing Preservation Priority for On Demand Resourcesin page link 管理按需资源的保留优先级（页面链接）

```swift
// 清除捆绑包中标记资源集的相对顺序系统的提示。
func setPreservationPriority(
    _ priority: Double,
    forTags tags: Set<String>
)

// 返回指定标签的当前保存优先级。
func preservationPriority(forTag tag: String) -> Double
```

## Getting Classes from a Bundlein 获取类

```swift
// 返回指定名称的类对象。
// className的Class对象。如果className不是与接收器关联的类之一，或者加载包含类实现的可执行代码时出错，则返回nil。
func classNamed(_ className: String) -> AnyClass?

// 捆绑包的主类。
var principalClass: AnyClass? { get }

// 一个通知，让观察者知道类何时被动态加载。
class let didLoadNotification: NSNotification.Name

// 用作didLoadNotification通知的userInfo字典键的常量，对应于加载的每个类的名称数组。
let NSLoadedClasses: String
```

## Loading Code from a Bundlein page 加载代码

```swift
// 一个数字数组，指示捆绑包可执行文件支持的架构类型。
var executableArchitectures: [NSNumber]? { get }

// 返回一个布尔值，指示是否可以成功加载捆绑包的可执行代码。
func preflight() throws

// 如果代码尚未加载，则将捆绑包的可执行代码动态加载到正在运行的程序中。
func load() -> Bool

// 加载捆绑包的可执行代码并返回任何错误。
func loadAndReturnError() throws

// 卸载与接收器关联的代码。
func unload() -> Bool

// 捆绑包的负载状态。
var isLoaded: Bool { get }
```

## 代码样例

```swift
import Foundation

// 获取主要资源束
let mainBundle = Bundle.main

// 获取资源束中的文件路径
if let filePath = mainBundle.path(forResource: "image", ofType: "png") {
    print("File path: \(filePath)")
}

// 获取资源束中的文件 URL
if let fileURL = mainBundle.url(forResource: "image", withExtension: "png") {
    print("File URL: \(fileURL)")
}

// 获取本地化字符串
let localizedString = mainBundle.localizedString(forKey: "Greeting", value: nil, table: "Localizable")
print("Localized string: \(localizedString)")

// 获取资源束的信息字典
if let infoDictionary = mainBundle.infoDictionary {
    let appName = infoDictionary["CFBundleName"] as? String
    let appVersion = infoDictionary["CFBundleShortVersionString"] as? String
    print("App name: \(appName ?? "")")
    print("App version: \(appVersion ?? "")")
}

// 返回与接收者信息属性列表中指定键关联的值。
if let objKey = mainBundle.object(forInfoDictionaryKey: "CFBundleName") {
    print(objKey)
}

// 获取资源束的标识符
let bundleIdentifier = mainBundle.bundleIdentifier
print("Bundle identifier: \(bundleIdentifier ?? "")")
```
