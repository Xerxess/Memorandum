<!-- TOC -->

- [karma](#karma)
    - [安装](#安装)
    - [生成配置文件](#生成配置文件)
    - [开始Karma](#开始karma)

<!-- /TOC -->

http://karma-runner.github.io/latest/index.html

# karma

* 一个测试运行器
* 通过它调用浏览器来运行这些测试用例，然后再汇集测试结果，生成测试报告

## 安装

```node 
# Install Karma
$ npm install karma --save-dev

# 安装插件
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev

# 命令行界面
$ npm install -g karma-cli
```

## 生成配置文件

```node 
$ karma init my.conf.js
```

## 开始Karma

```node 
$ karma start my.conf.js
```
