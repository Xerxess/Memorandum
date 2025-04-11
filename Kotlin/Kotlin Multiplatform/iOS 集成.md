<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [iOS 集成](#ios-集成)
  - [本地集成](#本地集成)
    - [CocoaPods集成](#cocoapods集成)

<!-- /code_chunk_output -->

# iOS 集成

Kotlin Multiplatform 共用模块集成到你的 iOS App. 要做到这一点, 要从共用模块生成一个 iOS 框架, 然后将它添加为 iOS 项目的依赖项

- 作为本地依赖项或远程依赖项使用.
- 远程集成(Remote Integration). 这种情况下, 共用的代码会和一个通常的第三方依赖项一样, 集成进入最终应用程序.

## 本地集成

- 直接集成:通过一段特别的脚本, 让 Kotlin 构建成为 iOS 构建的一部分,使用 Kotlin Multiplatform Web 向导生成的模板, 默认会使用直接集成.
- 使用本地 podspec 的 CocoaPods 集成

### CocoaPods集成

```swift

```
