<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [os](#os)
  - [文件与目录操作](#文件与目录操作)
  - [目录管理](#目录管理)
  - [环境变量管理](#环境变量管理)
  - [进程与系统信息](#进程与系统信息)
  - [标准流（Standard Streams）](#标准流standard-streams)
  - [Exit](#exit)

<!-- /code_chunk_output -->

# os

os 包是 Go 程序与操作系统交互的核心枢纽。它提供了跨平台的接口，让你能以统一的方式处理文件、环境变量、进程管理和系统资源。

## 文件与目录操作

- os 包最频繁的使用场景。

os.Create(name)：创建一个新文件（如果存在则清空）。
os.Open(name)：以只读方式打开文件。
os.OpenFile(name, flag, perm)：更灵活的打开方式（如追加写入 os.O_APPEND）。
读写文件（2026 常用）：
os.ReadFile(name)：一次性读取整个文件到内存。
os.WriteFile(name, data, perm)：一次性写入整个文件。

## 目录管理

os.Mkdir(name, perm)：创建单个目录。
os.MkdirAll(path, perm)：递归创建多级目录（类似 mkdir -p）。
os.RemoveAll(path)：递归删除目录或文件。

## 环境变量管理

用于读取和设置配置信息，是容器化部署的基础。
os.Getenv("KEY")：获取环境变量，不存在返回空字符串。
os.LookupEnv("KEY")：返回 (string, bool)，能区分“变量为空”和“变量不存在”。
os.Setenv("KEY", "VALUE")：在当前进程中设置环境变量。
os.Environ()：获取当前进程的所有环境变量（[]string 格式）。

## 进程与系统信息

os.Args：获取命令行参数（第一个元素是程序路径）。
os.Exit(code)：立即终止程序并返回状态码（0 表示成功）。
os.Getpid()：获取当前进程 ID。
os.Hostname()：获取当前主机名。
os.UserCacheDir()：获取系统推荐的缓存目录路径（跨平台友好）。

## 标准流（Standard Streams）

os 包预定义了三个指向系统标准流的文件对象：
os.Stdin：标准输入（文件描述符 0）。
os.Stdout：标准输出（文件描述符 1）。
os.Stderr：标准错误输出（文件描述符 2）。

## Exit

```go
package main

import (
    "fmt"
    "os"
)

func main() {

    defer fmt.Println("!")
    os.Exit(3)
}
```
