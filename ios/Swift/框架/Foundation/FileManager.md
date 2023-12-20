<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [FileManager](#filemanager)

<!-- /code_chunk_output -->

# FileManager

文件系统内容的便捷接口以及与之交互的主要方式

- 使用它来查找、创建、复制和移动文件和目录。
- 用它来获取有关文件或目录的信息或更改其某些属性。

```swift
// FileManager
let fileManager = FileManager.default
let url = try? fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
let demoUrl = url?.appending(path: "demo")
print(demoUrl) 
// Optional(file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo)

// 创建目录 demo
try? fileManager.createDirectory(at: demoUrl!, withIntermediateDirectories: true)
let urls = fileManager.urls(for: .documentDirectory, in: .userDomainMask)
for url in urls {
    print(url)
}
```

目录浅层搜索

```swift
// 目录结构如
// - demo
//   - demo-sub
// - demo2
// - test.png
// - .DS_Store
let fileManager = FileManager.default
let urls2 = try fileManager.contentsOfDirectory(at: url!, includingPropertiesForKeys: [],options: .skipsHiddenFiles)
for url in urls2 {
    print(url)
}
// file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo
// file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo2
// file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/test.png

// 获取字符串只有名称
let urls3 = try fileManager.contentsOfDirectory(atPath: url!.path())
for url in urls3 {
    print(url)
}
// demo
// demo2
// test.png
// .DS_Store
```

目录深度搜索

FileManager.DirectoryEnumerator 是一个递归枚举来体现目录结构，即for in 或者 nextObject() 是可访问下级目录s

```swift
@nonobjc
func enumerator(
    at url: URL,
    includingPropertiesForKeys keys: [URLResourceKey]?,
    options mask: FileManager.DirectoryEnumerationOptions = [],
    errorHandler handler: ((URL, Error) -> Bool)? = nil
) -> FileManager.DirectoryEnumerator?
```

```swift
// 目录结构如
// - demo
//   - demo-sub
// - demo2
// - test.png
let fileManager = FileManager.default
let url = try? fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)

let directoryEnumerator = fileManager.enumerator(at: url!, includingPropertiesForKeys: [.isDirectoryKey,.nameKey,.fileSizeKey], options:[.skipsHiddenFiles])!

for case let fileURL as URL in directoryEnumerator {
    print(fileURL)
    // file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo
    // file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo/demo-sub
    // file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo2
    // file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/test.png
    guard let resourceValues = try? fileURL.resourceValues(forKeys: [.isDirectoryKey,.nameKey]),
        let isDirectory = resourceValues.isDirectory,
        let name = resourceValues.name
    else {
         continue
    }
    
    print(isDirectory)
    // true
    // true
    // true
    // false
    print(name)  
    // demo
    // demo-sub
    // demo2
    // test.png
}
```

```swift
// 目录结构如
// - demo
//   - demo-sub
// - demo2
// - test.png
let fileManager = FileManager.default
let url = try? fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)

let directoryEnumerator = fileManager.enumerator(atPath: url!.path())!
print(directoryEnumerator)
for case let filePath as String in directoryEnumerator {
    print(filePath)
    // demo
    // demo/demo-sub
    // demo2
    // test.png
}
```
