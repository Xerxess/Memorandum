<!-- TOC -->

- [shell](#shell)
- [/bin/sh 与 /bin/bash](#binsh-与-binbash)
- [shell多命令执行;和&&命令](#shell多命令执行和命令)
- [set -x;](#set--x)
- [if](#if)

<!-- /TOC -->

http://manual.51yip.com/shell/

# shell

# /bin/sh 与 /bin/bash

echo $SHELL 确认是什么 Shell

* /bin/sh 是Bourne shell 标记为 “#!/bin/sh” 
* /bin/bash 是Bourne Again shell，它是 Bourne shell 的扩展，简称 Bash  标记为“#!/bin/bash” 

# shell多命令执行;和&&命令

* ; 先执行第一个命令，不管第一个命令是否出错都执行下一个命令
* && 当第一个命令正确执行完毕后，才执行下一个命令

# set -x;

可有详细的日志输出

```
set -x;
```

# if

```
# 多行
if condition
then
    command1 
    command2
    ...
    commandN 
fi

# 单行
if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```