<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [time](#time)
  - [基础操作](#基础操作)
  - [时区处理](#时区处理)
  - [定时器 单次定时任务](#定时器-单次定时任务)
  - [定时器 周期性定时器](#定时器-周期性定时器)

<!-- /code_chunk_output -->

# time

<https://pkg.go.dev/time>

time 包是处理时间、延迟和周期的核心。Go 对时间处理的严谨性在于它区分了时刻（Time）、时长（Duration）和时区（Location）。

## 基础操作

- 时区问题：time.Parse 默认使用 UTC，而 time.Now 使用本地时区。
- 强烈建议统一使用 now.UTC() 进行存储和计算

```go
now := time.Now()
fmt.Println(now) // 2026-01-10 15:25:02.407614 +0800 CST m=+0.000387267
```

```go
now := time.Now()
lo, _ := time.LoadLocation("Asia/Shanghai")

fmt.Println(now)       // 2026-01-10 15:44:33.355394 +0800 CST m=+0.000412316
fmt.Println(now.UTC()) // 2026-01-10 07:44:33.355394 +0000 UTC

// 格式化为字符串
fmt.Println(now.In(lo).Format(time.DateTime))

// 解析字符串为时间
t, _ := time.Parse(time.DateTime, "2026-01-10 15:39:45")

fmt.Println(t)

fmt.Println(t.Year())       // 年
fmt.Println(t.Month())      // 月 与其他语言不同，从1开始
fmt.Println(t.Day())        // 日
fmt.Println(t.Hour())       // 时
fmt.Println(t.Minute())     // 分
fmt.Println(t.Second())     // 秒
fmt.Println(t.Nanosecond()) // 纳秒
fmt.Println(t.YearDay())    // YearDay 返回 t 指定的年份中的第几天，对于非闰年，范围为 [1,365]，// 闰年为 [1,366]。
fmt.Println(t.Weekday())    // 返回 t 指定的星期几
```

## 时区处理

- UTC (Coordinated Universal Time)：世界协调时间。在代码逻辑、数据库存储中，必须统一使用 UTC。
- Local：运行 Go 程序的操作系统的本地时区（由环境变量 TZ 或系统文件 /etc/localtime 决定）。
- 数据库/后端逻辑：一律存 UTC（使用 time.Now().UTC()）。
- 前端展示：在 API 返回前或在前端代码中转换回用户的本地时区。
- 原则：存储用 UTC，显示用 Local，转换用 In(location)，解析用 ParseInLocation。

```go

t := time.Now()          // 当前本地时间
utc := t.UTC()           // 转为 UTC
local := utc.Local()     // 转回本地时区
shanghai := t.In(loc)   // 转为指定时区


// 获取上海时区 (东八区)
loc, err := time.LoadLocation("Asia/Shanghai")
if err != nil {
    // 处理找不到时区数据库的情况
}

// 在特定时区下获取当前时间
nowInShanghai := time.Now().In(loc)
fmt.Println("上海时间:", nowInShanghai.Format("15:04:05"))
```

```go
// 解析带时区的时间字符串
// 2026-01-10T15:00:00+08:00
t, _ := time.Parse(time.RFC3339, "2026-01-10T15:00:00+08:00")
fmt.Println(t.Location()) // 输出偏移量时区
```

```go
// 解析不带时区的字符串（易错点）

// 如果字符串是 2026-01-10 15:00:00 且不带时区，严禁使用 time.Parse，因为它会将其默认为 UTC。应使用 time.ParseInLocation。
layout := "2006-01-02 15:04:05"
input := "2026-01-10 15:00:00"

// 明确告诉 Go 这是上海时间
t, _ := time.ParseInLocation(layout, input, loc) 
```

## 定时器 单次定时任务

- time.NewTimer
  - Stop(): 停止定时器。
  - Reset(d Duration): 重置定时器。
- time.After(d)：底层其实就是调用了 NewTimer，但它只返回通道。
  - 如果你只是简单用一次，time.After 更简洁
  - 如果你需要中途停止或重置定时器，必须使用 time.NewTimer，因为你需要拿到返回的对象来调用 .Stop() 或 .Reset()。

```go
timer := time.NewTimer(2 * time.Second)

fmt.Println("开始等待...")

// 停止定时器
// timer := timer.Stop()
// if timer {
//     fmt.Println("Timer 2 stopped")
// }

// 2. 阻塞等待通道 C 的信号
currentTime := <-timer.C
fmt.Printf("定时器触发时间: %v\n", currentTime)
```

## 定时器 周期性定时器

- time.NewTicker
  - Stop(): 停止断续器。调用后，它将不再向通道 C 发送任何时间信号。注意：Stop() 不会关闭通道 C。这是为了防止在 select 语句中引起 panic。
  - Reset(d Duration): 随时调用 Reset 来改变触发频率。这在需要动态调整心跳频率或采集间隔的场景下非常实用。
- time.Tick(d): 是 NewTicker 的简化版，直接返回通道。
  - 致命缺陷：time.Tick 无法被停止。
