<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [FileManager](#filemanager)
  - [URL 补充](#url-补充)
  - [目录浅层搜索](#目录浅层搜索)
  - [目录深度搜索](#目录深度搜索)
  - [获取目录中所有项目的路径](#获取目录中所有项目的路径)
  - [目录操作](#目录操作)
  - [创建文件](#创建文件)
  - [复制/移动/删除文件](#复制移动删除文件)
  - [访问文件的各种属性和元数据](#访问文件的各种属性和元数据)
  - [FileHandle](#filehandle)
    - [文件底部追加内容](#文件底部追加内容)
    - [文件顶部追加内容](#文件顶部追加内容)

<!-- /code_chunk_output -->

# FileManager

文件系统内容的便捷接口以及与之交互的主要方式

- 使用它来查找、创建、复制和移动文件和目录。
- 用它来获取有关文件或目录的信息或更改其某些属性。

## URL 补充

```swift
// FileManager
// URL 假如为: /Users/Documents/demo/index.vue
// 文件为14Kb
let fileManager = FileManager.default
let docUrl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: 

let vueNewFileUrl = docUrl.appending(path: "index.vue")
print(vueNewFileUrl.pathExtension) // vue
print(vueNewFileUrl.pathComponents) // ["/","Users","Documents","demo","index.vue"]
print(vueNewFileUrl.lastPathComponent) // index.vue
print(vueNewFileUrl.deletingLastPathComponent()) // /Users/Documents/demo
print(vueNewFileUrl.deletingPathExtension()) // /Users/Documents/demo/index
print(vueNewFileUrl.isFileURL) // true
print(vueNewFileUrl.hasDirectoryPath) // false

let resourceValues = try! vueNewFileUrl.resourceValues(forKeys: [.fileSizeKey,.nameKey])
print(resourceValues.name) // index.vue
print(resourceValues.fileSize!/1024) // 14
```

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

## 目录浅层搜索

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

## 目录深度搜索

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

## 获取目录中所有项目的路径

```swift
// 目录结构如
// - demo
//   - demo-sub
// - demo2
// - test.png
// .DS_Store
let fileManager = FileManager.default
let url = try? fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
// 返回一个字符串数组，标识指定目录中所有项目的路径
let directoryEnumerator = fileManager.subpaths(atPath: url!.path())
print(directoryEnumerator)
// ["demo",demo/demo-sub","demo2","test.png",".DS_Store"]
```

## 目录操作

```swift
// FileManager
let fileManager = FileManager.default
let url = try? fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
let demoUrl = url?.appending(path: "demo")
print(demoUrl) 
// Optional(file:///Users/{userName}/Library/Containers/com.apple.PlaygroundsMac.ExecutionExtension/Data/Documents/demo)

// 创建目录
try? fileManager.createDirectory(at: demoUrl!, withIntermediateDirectories: true)
// 创建目录
// try? fileManager.createDirectory(atPath: demoUrl!.path(), withIntermediateDirectories: true)
```

## 创建文件

```swift
let fileManager = FileManager.default
let docUrl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil, create: false)
print(docUrl)

let vueFileUrl = docUrl.appending(path: "index.vue")
let content = try! String(contentsOf: vueFileUrl) // 获取文件内容
//print(content)

let vueNewFileUrl = docUrl.appending(path: "index-new.vue")
fileManager.createFile(atPath: vueNewFileUrl.path(),contents: content.data(using: .utf8))
```

## 复制/移动/删除文件

```swift
let fileManager = FileManager.default
let docUrl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil, create: false)
print(docUrl)

let copyUrl = docUrl.appending(path: "demo2/index.vue")
// 检测文件是否存在
if fileManager.fileExists(atPath: copyUrl.path())
{
   try fileManager.removeItem(at: copyUrl) // 删除文件
}
try fileManager.copyItem(at: vueNewFileUrl, to: copyUrl) // 复制文件

let moveUrl = docUrl.appending(path: "demo2/demo-1/index.vue")
try fileManager.moveItem(at: copyUrl, to: moveUrl) // 移动文件
```

## 访问文件的各种属性和元数据

```swift
let fileManager = FileManager.default
let docUrl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil, create: false)

let fileUrl = docUrl.appending(path: "index.vue")
print(fileUrl)
let path = fileUrl.path()
print(fileManager.componentsToDisplay(forPath: path)) // Optional(["Mac", "用户", "{userName}", "资源库", "Containers", "ExecutionExtension", "Data", "Documents", "index.vue"])

print(fileManager.displayName(atPath: path)) // index.vue

let attrs = try! fileManager.attributesOfItem(atPath: path)
print(attrs[.size]) // 文件大小
print(attrs[.creationDate]) // 创建日期，对应的值是一个 Date 对象
print(attrs[.modificationDate]) // 最后修改日期，对应的值是一个 Date 对象
print(attrs[.extensionHidden]) // 扩展名是否被隐藏，对应的值是一个 Bool 类型
print(attrs[.type])
```

## FileHandle

- 如果你需要执行文件的基本操作，如创建、复制、移动、删除文件，以及获取文件属性，那么 FileManager 是更合适的选择。
- 如果你需要对文件进行更底层的操作，例如读取和写入文件的二进制数据，或者需要在文件中定位和处理字节，那么 FileHandle 是更适合的类。

### 文件底部追加内容

```swift
// fileHandleForWriting.seekToEnd() 将指针移动到文件的结束位置
let fileManager = FileManager.default
let docUrl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil, create: false)

let fileUrl = docUrl.appending(path: "index.vue")
do {
    // 打开文件句柄以供读取
    let fileHandle = try FileHandle(forReadingFrom: fileUrl)
    
    // 读取文件内容
    if let data = try fileHandle.readToEnd() {
        let fileContents = String(data: data, encoding: .utf8)
        print("File Contents: \(fileContents ?? "")")
    }
    
    // 关闭文件句柄
    try fileHandle.close()
    
    // 打开文件句柄以供写入
    let fileHandleForWriting = try FileHandle(forWritingTo: fileUrl)
    try fileHandleForWriting.seekToEnd()
    // 将数据写入文件
    let newData = "New data to write".data(using: .utf8)
    fileHandleForWriting.write(newData!)
    
    // 关闭文件句柄
    try fileHandleForWriting.close()    
} catch {
    print("Error: \(error)")
}
```

### 文件顶部追加内容

```swift
// 打开两个句柄，一个读，一个写
// fileHandleForWriting.truncate(atOffset: 0) 将文件清空
func fileAppendBefore(){
    // FileManager
    let fileManager = FileManager.default
    let docUrl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil, create: false)

    let fileUrl = docUrl.appending(path: "index.vue")
    do {
        // 打开文件句柄以供读取
        let fileHandle = try FileHandle(forReadingFrom: fileUrl)
        
        // 读取文件内容
        guard let data = try fileHandle.readToEnd() else {
            try fileHandle.close()
            return
        }        
        
        // 关闭文件句柄
        try fileHandle.close()
        
        // 打开文件句柄以供写入
        let fileHandleForWriting = try FileHandle(forWritingTo: fileUrl)
        try fileHandleForWriting.truncate(atOffset: 0)
        // 将数据写入文件
        let newData = "New data to write \n".data(using: .utf8)
        fileHandleForWriting.write(newData!)
        fileHandleForWriting.write(data)
        
        // 关闭文件句柄
        try fileHandleForWriting.close()    
    } catch {
        print("Error: \(error)")
    }

}

fileAppendBefore()
```
