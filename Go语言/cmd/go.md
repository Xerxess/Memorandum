

# go

Go 是一个用于管理 Go 源代码的工具

```cmd
go <command> [arguments]
```

```
bug         开始一个错误报告
build       编译软件包和依赖项
clean       删除对象文件和缓存文件
doc         显示包裹或符号的文档
env         打印Go环境信息
fix         更新软件包以使用新的API
fmt         Gofmt（重新格式化）软件包源
generate    通过处理源生成Go文件
get         将依赖项添加到当前模块并安装它们
install     编译和安装软件包和依赖项
list        列表包或模块
mod         模块维护
work        工作空间维护
run         编译并运行Go程序
telemetry   管理遥测数据和设置
test        测试包
tool        运行指定的go工具
version     print Go version
vet         报告包裹中可能存在的错误
```

## 常用

```go
go fmt ./... 代码自动格式化。Go 强制性的审美标准，提交代码前必跑。
go vet ./... 静态代码分析。它不检查语法错误，而是检查逻辑疏忽（例如：Printf 的参数个数不匹配、无法触及的代码等）。
go run . 一键编译并运行。它会将二进制文件放在临时目录，适合写小工具或快速实验。
go install github.com 编译并将结果移动到 $GOPATH/bin，使其成为全局可用的命令行工具。
go clean  当你觉得编译缓存导致了奇怪的问题，或者想清理磁盘空间时使用。

go mod tidy: 最常用，自动增删 go.mod 中未使用的依赖。
go mod vendor: 将依赖复制到项目本地。
go get github.com 下载并添加依赖
```

## go build

编译软件包和依赖项

```cmd
go build [-o output] [build flags] [packages]
```

```cmd
# -o (Output)：指定输出的文件名或路径。
go build -o myapp  # 生成名为 myapp 的文件

# -s (strip): 去掉符号表（程序崩溃时栈追踪信息会受限）。
# -w (dwarf): 去掉 DWARF 调试信息（无法使用 gdb/dlv 进行调试）。
# 效果：通常能减少 20% - 30% 的文件体积。
go build -ldflags "-s -w" -o myapp

# 交叉编译 (Cross Compilation) Windows PowerShell
$env:GOOS="linux"; $env:GOARCH="amd64"; go build -o myapp_linux

# 交叉编译 (Cross Compilation) macOS/Linux Terminal
GOOS=windows GOARCH=amd64 go build -o myapp.exe
```

### 其他

```cmd
-C dir：最先指定的标志。让你在执行编译前先切换到指定目录。
-n：只打印编译命令，不实际执行（用于检查编译逻辑）。
-x：打印并执行（用于排查复杂的编译错误）。
-asan / -msan：内存分析工具。
-gcflags：传给 go tool compile 的参数。
```