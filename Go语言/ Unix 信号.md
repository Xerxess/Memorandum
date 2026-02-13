

#  Unix 信号

- os/signal 监听和处理 Unix 信号
- 常见的 Unix 信号
    - SIGINT (Ctrl+C)：终端中断信号。
    - SIGTERM：终止信号。这是 Kubernetes 或 Docker 停止容器时发送的标准信号。程序收到后应开始释放资源并退出。
    - SIGHUP：终端连接断开。常用于通知程序重新加载配置文件。
    - SIGKILL：强制杀死进程。该信号无法被捕获或忽略，程序会立即退出。

```go
package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    sigs := make(chan os.Signal, 1)
    signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
    done := make(chan bool, 1)

    go func() {
        sig := <-sigs
        fmt.Println()
        fmt.Println(sig)
        done <- true
    }()

    fmt.Println("awaiting signal")
    <-done
    fmt.Println("exiting")
}
```