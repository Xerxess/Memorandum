<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [GC](#gc)
  - [三色标记法 (Three-color Marking)](#三色标记法-three-color-marking)
    - [工作流程](#工作流程)

<!-- /code_chunk_output -->

# GC

- GC（Garbage Collection，垃圾回收） 是内存管理的核心
- Go 采用的是一种名为 “并发三色标记清除算法”（Concurrent Mark-and-Sweep） 的机制。

## 三色标记法 (Three-color Marking)

- 白色：潜在的垃圾，表示尚未被 GC 扫描到的对象。GC 开始时，所有对象都是白色。
- 灰色：中间状态。表示对象已被扫描，但它引用的其他对象（子对象）还没扫描完。
- 黑色：活跃对象。表示对象及其引用的所有子对象都已被扫描确认存活。

### 工作流程

- 从根对象（栈变量、全局变量）开始，将它们标记为灰色。
- 从灰色对象集合中取出一个对象，将其引用的对象标记为灰色，然后将自己标记为黑色。
- 重复步骤 2，直到灰色集合为空。
- 此时剩下的白色对象即为不可达垃圾，执行清除。
