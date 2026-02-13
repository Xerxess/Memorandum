
# mobile

<https://pkg.go.dev/golang.org/x/mobile/cmd>
<https://go.dev/wiki/Mobile>

- GoMobile 被官方标记为实验性项目
- 对移动平台（Android 和 iOS）的支持，并提供了构建移动应用程序的工具
- Go Mobile 引入了一个名为 gomobile 的工具

## 原生应用程序

原生应用类别包括完全用 Go 语言编写的应用。目前， golang.org/x/mobile 仅包含一小部分软件包

## SDK 应用程序和生成绑定

- 优势
  - 重用移动应用程序中的 Go 包，而无需对现有应用程序进行重大更改
  - 在 Android 和 iOS 应用程序之间共享通用代码库，您可以用 Go 编写一次通用功能，然后通过绑定调用 Go 包，将其连接到特定于平台的代码。
- 局限性
  - 仅支持部分 Go 类型
  - 语言绑定会带来性能开销
  - 由于目标语言的限制，导出的 API 的外观也有一些限制
