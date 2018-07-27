# NPM
* [什么是npm？](#什么是npm？)
* [更新npm](#更新npm)
* [终端登录到npm](#终端登录到npm)
* [package.json](#package.json)

## 什么是npm？

简单理解就是一个代码仓库

## npm三个组件
* npm帐户
* 命令行界面（CLI）
* 数据仓库

## 更新npm

```
npm install npm@latest -g

```

## 终端登录到npm

```
npm login //登录
npm whoami //检测是否登录成功
```

## package.json 

package.json基本要求  
`"name"` 全是小写的一个字、没有空格、允许使用连字符和下划线  
`"version"` 以...的形式 x.x.x、遵循semver规范

```
npm init //package.json创建命令
```

配置  
* name 包名称
* version 包版本
* description 描述说明
* keywords 关键字，一个字符串数组
* homepage 项目主页的网址
* main 程序的主要入口
* dependencies 在生产环境中需要用到的依赖
* devDependencies 在开发、测试环境中用到的依赖
* scripts 可以使用`npm run-script <stage>` 执行任意脚本
* bin 有一个或多个可执行文件希望被安装到系统路径(像webpack,fis3,等命令)

Node.js 命令行程序  
http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html

## 发布包

```
npm publish //发布

npm version <update_type> //更新版本
```