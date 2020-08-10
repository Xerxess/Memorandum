<!-- TOC -->

- [CLI 开发](#cli-开发)
    - [参数风格](#参数风格)
    - [自定义Node命令](#自定义node命令)

<!-- /TOC -->

# CLI 开发

* inquirer.js 常用交互式命令行用户界面的集合。
* commander.js node.js命令行界面交互
* chalk  终端字符串样式做得很好

## 参数风格

* Unix参数风格：前面加-，不过后面跟的是单个字符，例如-abc解析为[‘a’, ‘b’, ‘c’]。  
* GNU参数风格：前面加–，例如npm中的命令，npm --save-dev webpack。  
* BSD参数风格：前面不加修饰符。  

## 自定义Node命令

```js
// hello.js 首行需要指定脚本的解释程序
#!/usr/bin/env node
console.log('hello')
```

```js
 {
    "bin": {
      "hello": "./hello.js"
    },
  }
```

```cmd
npm link

# 输入自定义命令
hello

# 输出 hello
```