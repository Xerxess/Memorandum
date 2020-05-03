<!-- TOC -->

- [ES模块](#es模块)
- [CommonJS](#commonjs)
- [.mjs & .cjs](#mjs--cjs)
- [入口点](#入口点)
- [有条件的出口](#有条件的出口)

<!-- /TOC -->

ECMAScript模块

* --experimental-modules 标志可用于启用对ECMAScript模块

# ES模块

* 以结尾的文件.mjs
* .js在最近的父package.json文件包含"type"值为的顶级字段时结束的文件"module"

# CommonJS

* 以结尾的文件.cjs
* .js在最近的父package.json文件包含"type"值为的顶级字段时结束的文件"commonjs"

# .mjs & .cjs

.mjs无论包范围如何，以结尾的文件总是作为ES模块加载。

.cjs无论包范围如何，以结尾结尾的文件总是作为CommonJS加载。

# 入口点

在包package.json文件中，两个字段可以定义包的入口点："main"和"exports"。

* "main"所有版本的Node.js都支持该字段，但是其功能有限：它仅定义包的主要入口点。
* “exports”字段提供入口之外的任何其他入口点。如果包同时存在“main”和“exports”，则后者在支持“exports”的Node.js版本中优先。条件导出也可以在“导出”中用于定义每个环境的不同包入口点，包括包是通过require引用的还是通过import引用的。

# 有条件的出口

* import 通过import或 加载包时匹配import()
* require 通过加载包时匹配require()，仅支持CommonJS
* node 适用于任何Node.js环境。import/require 之后配置
* default 将始终匹配的通用后备广告。可以是CommonJS或ES模块文件。 排在最后
* 其他条件"browser"，"electron"，"deno"，"react-native" ~~~Node.js忽略~~~

```js
// package.json
{
  "main": "./main-require.cjs",
  "exports": {
    "import": "./main-module.js",
    "require": "./main-require.cjs",
    "node": {
      "import": "./feature-node.mjs",
      "require": "./feature-node.cjs"
    }
  },
  "type": "module"
}
```