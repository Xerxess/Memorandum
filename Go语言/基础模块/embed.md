
embed 是标准库中极其重要的特性（自 Go 1.16 引入并持续优化）。它允许你将静态资源文件（如 HTML、CSS、图片、配置文件）在编译时直接嵌入到二进制可执行文件中。

- //go:embed 编译器指令，必须放在变量声明的上方。
- 变量必须是全局的：你不能在函数内部使用 //go:embed
- 导入包名：即使你不直接使用 embed 包的方法，只用 string 接收，也必须 import _ "embed"，否则指令无效。
- ReadFile(name string) ([]byte, error)：读取指定路径的文件内容。
- ReadDir(name string) ([]DirEntry, error)：读取目录结构。
- Open(name string) (fs.File, error)：符合 io/fs 接口，可直接对接 http.FileServer。

```go
package main

import (
    "embed"
)

//go:embed folder/single_file.txt
var fileString string

//go:embed folder/single_file.txt
var fileByte []byte

//go:embed folder/single_file.txt
//go:embed folder/*.hash
var folder embed.FS

func main() {

    print(fileString)
    print(string(fileByte))

    content1, _ := folder.ReadFile("folder/file1.hash")
    print(string(content1))

    content2, _ := folder.ReadFile("folder/file2.hash")
    print(string(content2))
}
```
