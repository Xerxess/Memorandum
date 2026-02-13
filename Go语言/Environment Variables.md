
# Environment Variables

```go
package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {

    os.Setenv("FOO", "1")
    fmt.Println("FOO:", os.Getenv("FOO"))
    fmt.Println("BAR:", os.Getenv("BAR"))

    fmt.Println()
    for _, e := range os.Environ() {
        pair := strings.SplitN(e, "=", 2)
        fmt.Println(pair[0])
    }
}

// BAR=2 go run environment-variables.go
// FOO: 1
// BAR: 2
```

## 核心基础环境

- $GOROOT：Go 安装目录的路径（通常由安装包自动设置，手动修改需谨慎）。
- $GOPATH：工作区路径。在 Go Modules 时代，它主要用于存储下载的依赖包（$GOPATH/pkg/mod）和编译后的工具（$GOPATH/bin）。
- $GOBIN：执行 go install 后二进制文件的存放路径。默认是 $GOPATH/bin。建议将其添加到系统的 PATH 中。
- $GOPROXY：依赖下载代理。2026 年国内主流仍为 <https://goproxy.cn,direct。>
- $GOPRIVATE：私有仓库配置。设置该变量后，Go 会跳过代理和校验和数据库（Checksum DB）去拉取内部代码。
- 编译控制
  - $GOOS：目标操作系统。常用值：linux, windows, darwin (macOS), freebsd。
  - $GOARCH：目标处理器架构。常用值：amd64, arm64, 386。
  - $CGO_ENABLED：是否启用 CGO。
  - $GOFLAGS：为所有的 go 命令设置默认参数。
