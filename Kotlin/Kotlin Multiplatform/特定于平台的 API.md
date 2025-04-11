<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [特定于平台的 API](#特定于平台的-api)
  - [expected 和 actual](#expected-和-actual)
  - [通用代码中的接口](#通用代码中的接口)
  - [Expected and actual functions](#expected-and-actual-functions)
  - [依赖注入框架](#依赖注入框架)

<!-- /code_chunk_output -->

# 特定于平台的 API

- 在开发多平台应用程序和库时使用特定于平台的 API
- 多平台库: <https://github.com/terrakok/kmm-awesome>
- Expected and actual functions and properties 预期和实际的函数和属性
- 通用代码中的接口
- Expected and actual functions
- 依赖注入框架

## expected 和 actual

```swift
// commonMain:
expect fun randomUUID(): String
```

```swift
// androidMain:
import java.util.*
actual fun randomUUID() = UUID.randomUUID().toString()
```

```swift
// iosMain:
import platform.Foundation.NSUUID
actual fun randomUUID(): String = NSUUID().UUIDString()
```

## 通用代码中的接口

特定于平台的逻辑太大太复杂，您可以通过定义一个接口来简化代码，以便在通用代码中表示它，然后在平台源代码集中提供不同的实现。

```swift
// commonMain:
interface Platform {
    val name: String
}
```

```swift
// androidMain:
import android.os.Build

class AndroidPlatform : Platform {
    override val name: String = "Android ${Build.VERSION.SDK_INT}"
}
```

```swift
// iosMain:
import platform.UIKit.UIDevice

class IOSPlatform : Platform {
    override val name: String = UIDevice.currentDevice.systemName() + " " + UIDevice.currentDevice.systemVersion
}

```

## Expected and actual functions

```swift
// commonMain
interface Platform
expect fun platform(): Platform
```

```swift
// androidMain
class AndroidPlatform : Platform
actual fun platform() = AndroidPlatform()
```

```swift
// iosMain
class IOSPlatform : Platform
actual fun platform() = IOSPlatform()
```

## 依赖注入框架

现代应用程序通常使用依赖关系注入 （DI） 框架来创建松散耦合的架构。DI 框架允许根据当前环境将依赖项注入组件。

```swift
// commonMain:
import org.koin.dsl.module
interface Platform
expect val platformModule: Module
```

```swift
// androidMain:
class AndroidPlatform : Platform
actual val platformModule: Module = module {
    single<Platform> {
        AndroidPlatform()
    }
}
```

```swift
// iosMain:
class IOSPlatform : Platform
actual val platformModule = module {
    single<Platform> { IOSPlatform() }
}
```
