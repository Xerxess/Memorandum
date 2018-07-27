# process
* [process.argv](#process.argv)
* [process.cwd()](#process.cwd())
* [process.env](#process.env)
* [process.execArgv](#process.execArgv)

process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。

## process.argv 

属性返回一个数组,获得启动Node.js时的命令行参数如下

```
$ node process-args.js one two=three four

0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

## process.cwd()

方法返回 Node.js 进程当前工作的目录

> **node.js 文件路径的相对路径会相对于process.cwd()**

## process.env

获取当前系统的环境变量信息

## process.execArgv

属性返回当Node.js进程被启动时，Node.js特定的命令行选项
```
$ node --harmony script.js --version

process.execArgv的结果
['--harmony']

process.argv的结果
['/usr/local/bin/node', 'script.js', '--version']
````