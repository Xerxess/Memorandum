<!-- TOC -->

- [LLDB](#lldb)
    - [help命令](#help%E5%91%BD%E4%BB%A4)
    - [打印指令 p 与 po](#%E6%89%93%E5%8D%B0%E6%8C%87%E4%BB%A4-p-%E4%B8%8E-po)

<!-- /TOC -->

https://lldb.llvm.org/

https://developer.apple.com/library/archive/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/Introduction.html#//apple_ref/doc/uid/TP40012917-CH1-SW1

# LLDB

LDB 是个开源的内置于 XCode 的具有 REPL(read-eval-print-loop)特征的 Debugger，其可以安装 C++或者 Python 插件。

## help命令

help 列出所有命令

## 打印指令 p 与 po

- p  通常用于打印基本数据类型的值。这个指令会默认生出一个临时变量，如**$1**，学习过 Shell 的小伙伴看到这个应该很激动。
- po 打印变量的内容，如果是对象，其打印的内容由 -debugDescription 决定。
