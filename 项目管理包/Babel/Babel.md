<!-- TOC -->

- [Babel](#babel)
- [.browserslistrc](#browserslistrc)
- [@babel/preset-env](#babelpreset-env)
- [@babel/polyfill](#babelpolyfill)
- [插件](#插件)
    - [es3](#es3)
    - [es5](#es5)
    - [ES2015](#es2015)
    - [ES2016](#es2016)
    - [ES2017](#es2017)
    - [ES2018](#es2018)
    - [支持更特殊的语法](#支持更特殊的语法)
    - [精简代码](#精简代码)
    - [其他](#其他)
- [regenerator-runtime](#regenerator-runtime)

<!-- /TOC -->

https://babeljs.io

# Babel

- \*Babel 是一个 JavaScript 编译器
- Babel 是一种工具链，主要用于在旧版浏览器或环境中将 ECMAScript 2015+代码转换为向后兼容的 JavaScript 版本。

# .browserslistrc

https://github.com/browserslist/browserslist

```js
// .browserslist
> 0.25%
not dead

// package.json
"browserslist": "> 0.25%, not dead"
```

# @babel/preset-env

https://babeljs.io/docs/en/babel-preset-env
https://github.com/babel/babel/tree/main/packages/babel-preset-env

```js
// npm install --save-dev @babel/preset-env

//
const dd={
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"，
        // 目标 Example environments: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.
        "targets": {
                "chrome": "58",
                "ie": "11"
                },
        // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false
        "modules":"auto",
        // 处理polyfill
        //'usage' 每个文件中使用polyfill时，添加特定的导入
        //'entry' 根据编译环境一次性全部加载兼容的polyfill
        "useBuiltIns":"false"
      }
    ]
  ]
}
```

# @babel/polyfill


从Babel 7.4.0开始，不推荐使用此软件包

https://github.com/babel/babel/tree/main/packages/babel-polyfill

注意:core-js、regenerator-runtime版本

```
"core-js": "^2.6.5",
"regenerator-runtime": "^0.13.4"
```


```
import "core-js/stable";
import "regenerator-runtime/runtime";
```

webpack下配置

* 如果useBuiltIns: 'usage'在中指定，.babelrc则既不包括@babel/polyfill在webpack.config.js入口数组中，也不包括在源中。
* 如果useBuiltIns: 'entry'在中指定，.babelrc则@babel/polyfill通过require或import如上所述，将其包含在应用程序入口点的顶部。
* 如果useBuiltIns未指定key或useBuiltIns: false在.babelrc中明确设置了key，则@babel/polyfill直接将其添加到的入口数组中webpack.config.js。

# 插件

https://github.com/babel/babel/tree/main/packages

## es3
* @babel/plugin-transform-member-expression-literals 对象成员存在关键字处理
* @babel/plugin-transform-property-literals
* @babel/plugin-transform-reserved-words ES3中保留单词,重命名处理

## es5

* @babel/plugin-transform-property-mutators 处理 get/set 属性代码

## ES2015

* @babel/plugin-transform-arrow-functions 剪头函数
* @babel/plugin-transform-block-scoped-functions 作用域{let function()}函数处理
* @babel/plugin-transform-block-scoping 作用域{let a=''}变量处理
* @babel/plugin-transform-classes class处理
* @babel/plugin-transform-computed-properties 对象计算属性处理
* @babel/plugin-transform-destructuring 解构 let {x, y} = obj
* @babel/plugin-transform-spread 展开 [...d]
* @babel/plugin-transform-duplicate-keys 对象重复key处理
* @babel/plugin-transform-for-of
* @babel/plugin-transform-instanceof
* @babel/plugin-transform-literals 文字转换(二进制、unicode)
* @babel/plugin-transform-object-super
* @babel/plugin-transform-parameters 函数参数处理（默认参数、结构）
* @babel/plugin-transform-shorthand-properties 速写属性如:{a,b,c,d}
* @babel/plugin-transform-sticky-regex 定义正则处理
* @babel/plugin-transform-template-literals 字符串模板
* @babel/plugin-transform-typeof-symbol typeof Symbol() === "symbol";
* @babel/plugin-transform-unicode-escapes

## ES2016

* @babel/plugin-transform-exponentiation-operator 求幂处理 let x = 10 ** 2; =>  Math.pow(10, 2);

## ES2017

* @babel/plugin-transform-async-to-generator async/await

## ES2018

* @babel/plugin-proposal-async-generator-functions
* @babel/plugin-syntax-object-rest-spread 允许解析对象的剩余/扩展
* @babel/plugin-proposal-object-rest-spread 编译对象剩余部分并传播到ES5 let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

## 支持更特殊的语法

* @babel/plugin-proposal-class-static-block
* @babel/plugin-proposal-decorators 注解
* @babel/plugin-proposal-export-default-from 支持 export v from 'mod';
* @babel/plugin-proposal-export-namespace-from 支持  export * as ns from 'mod';
* @babel/plugin-proposal-nullish-coalescing-operator 支持 var foo = object.foo ?? "default";
* @babel/plugin-proposal-optional-chaining 支持 访问深度嵌套的属性 const baz = obj?.foo?.bar?.baz; // 42
* @babel/plugin-proposal-private-methods 支持 私有方法
* @babel/plugin-proposal-private-property-in-object 支持 私有属性
* @babel/plugin-transform-regenerator 支持 function* a() { yield 1;}
* @babel/plugin-syntax-dynamic-import 支持import()
* @babel/plugin-syntax-import-meta 允许解析import.meta

## 精简代码

* babel-plugin-transform-node-env-inline 转换process.env.NODE_ENV === "development" => true
* babel-plugin-transform-remove-console 移除console

## 其他

* @babel/plugin-transform-flow-strip-types 转换flow为正常代码
* @babel/plugin-transform-jscript
* @babel/polyfill
* @babel/runtime-corejs3 其中包含Babel模块化运行时助手以及regenerator-runtime和core-js版本
* @babel/runtime 与polyfill相似，不同之处在于它不会修改全局范围，并且将与@ babel / plugin-transform-runtime（通常在库/插件代码中）一起使用。
* @babel/plugin-transform-runtime Babel注入的帮助程序代码以节省代码大小，避免在编译后的输出中出现重复，创建一个沙盒环境不污染全局范围（确保包括@babel/runtime作为依赖项）
* @babel/plugin-transform-strict-mode 设置strictMode：false禁用
* @babel/plugin-transform-typescript
* @babel/preset-typescript Babel预设为TypeScript
* @babel/plugin-transform-modules-commonjs 该插件将ES2015模块转换为CommonJS
* @babel/helper-module-transforms Babel辅助函数，用于实现ES6模块转换


# regenerator-runtime

模块来自facebook的regenerator模块
生成器函数、async、await函数经babel编译

```js
// CommonJS
require("regenerator-runtime/runtime");
 
// ECMAScript 2015
import "regenerator-runtime/runtime.js";
```
