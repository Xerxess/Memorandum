
# Panic

- 系统 panic 通常意味着出现了意料之外的错误。我们主要用它来快速应对那些在正常运行期间不应该出现，或者我们无法妥善处理的错误。
- panic 的一个常见用途是，如果函数执行失败则中止程序。 返回一个我们不知道如何处理的错误值 （或想要）处理。
- 不要用 Panic 代替 Error

```go
func main() {

    panic("a problem")

    // 示例： 创建新文件时如果出现意外错误，请立即 panic 。
    path := filepath.Join(os.TempDir(), "file")
    _, err := os.Create(path)
    if err != nil {
        panic(err)
    }
}
```

## 代码执行逻辑

- 执行到 panic("a problem")
- 立即停止当前函数的正常执行。
- 执行 Defer 语句：按照后进先出（LIFO）的顺序执行当前协程中所有已注册的 defer 函数。这是清理资源（关闭文件、解锁）的最后机会。
- 逐层回溯：将 Panic 向上传递给调用者，并在每一层执行 defer。
- 程序崩溃：如果 Panic 一直传递到顶层（协程入口）仍未被捕获（Recover），程序将向终端打印错误消息和堆栈追踪（Stack Trace），然后以非零状态码退出。

## 捕获 Panic

- Go 语言允许使用内置函数 `recover 从 panic 中恢复 。`recover` recover 可以防止 panic 导致程序中止，并使其继续执行。
- 通过在 defer 函数中使用 recover 来拦截 Panic，防止程序崩溃。

```go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("捕获到了异常:", r)
        }
    }()

    panic("a problem") // 执行到这里会跳转到 defer
    fmt.Println("这行代码永远不会执行")
}
```

## 常见的隐式 Panic

- 数组越界：arr[10]（如果长度只有 5）。
- 空指针解引用：var s *int;*s = 1。
- 关闭已关闭的通道。
- 并发读写同一个 Map（注意：这在某些情况下会直接触发 fatal error 而不是 panic，无法被 recover）。
