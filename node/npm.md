<!-- TOC -->

- [NPM](#npm)
    - [什么是 npm？](#什么是-npm)
    - [npm 三个组件](#npm-三个组件)
    - [更新 npm](#更新-npm)
    - [终端登录到 npm](#终端登录到-npm)
    - [package.json](#packagejson)
        - [非官方属性](#非官方属性)
    - [发布包](#发布包)
    - [npm-install](#npm-install)
- [verdaccio 搭建私服](#verdaccio-搭建私服)
    - [安装](#安装)
    - [设置注册](#设置注册)
    - [配置](#配置)
    - [verdaccio 永远运行](#verdaccio-永远运行)

<!-- /TOC -->

# NPM

- [什么是 npm？](#什么是npm？)
- [更新 npm](#更新npm)
- [终端登录到 npm](#终端登录到npm)
- [package.json](#package.json)
- [npm-install](#npm-install)

## 什么是 npm？

简单理解就是一个代码仓库

## npm 三个组件

- npm 帐户
- 命令行界面（CLI）
- 数据仓库

## 更新 npm

```
npm install npm@latest -g

```

## 终端登录到 npm

```
npm login //登录
npm whoami //检测是否登录成功
```

## package.json

package.json 基本要求  
`"name"` 全是小写的一个字、没有空格、允许使用连字符和下划线  
`"version"` 以...的形式 x.x.x、遵循 semver 规范

```
npm init //package.json创建命令
```

### 非官方属性
https://segmentfault.com/a/1190000016365409
https://jaketrent.com/post/package-json-style-attribute/
- style

配置

- name 包名称
- version 包版本
- description 描述说明
- keywords 关键字，一个字符串数组
- homepage 项目主页的网址
- main 程序的主要入口
- dependencies 在生产环境中需要用到的依赖
- devDependencies 在开发、测试环境中用到的依赖
- scripts 可以使用`npm run-script <stage>` 执行任意脚本
- bin 有一个或多个可执行文件希望被安装到系统路径(像 webpack,fis3,等命令)

Node.js 命令行程序  
http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html

## 发布包

```
npm publish //发布

npm version <update_type> //更新版本
```

## npm-install

```js
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

aliases: npm i, npm add
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```

- 全局模式下 -g 或--global
- -P, --save-prod：套餐将出现在您的 dependencies。除非-D 或-O 存在，否则这是默认值。
- -D, --save-dev：套餐将出现在您的 devDependencies。

# verdaccio 搭建私服

https://verdaccio.org/docs/en/server-configuration

## 安装

```
npm install -g verdaccio

verdaccio
```

## 设置注册

```

// set-registry
npm set registry http://localhost:4873/

// install
npm install --registry http://localhost:4873

//.npmrc
registry=http://localhost:4873

// package.json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}

```

## 配置

```
listen: 0.0.0.0:4873
```

## verdaccio 永远运行

```
npm install -g forever
// window 好像无效
forever start `which verdaccio`
```
