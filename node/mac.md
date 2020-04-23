# 通过ps、grep和kill批量杀死进程


ps -ef | grep node | awk '{print $2}' | xargs kill -9

> ps [options] [--help]

```
-A 列出所有的进程
-w 显示加宽可以显示较多的资讯
-au 显示较详细的资讯
-aux 显示所有包含其他使用者的行程
# 管道符“|”，这个符号可以将一个命令的标准输出管道为另外一个命令的标准输入
# grep命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来
```

```
ps aux|grep node 通过cpu和内存使用来过滤进程
ps -ef|grep node
```
