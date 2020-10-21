<!-- TOC -->

- [Babel](#babel)
- [.browserslistrc](#browserslistrc)
- [@babel/preset-env](#babelpreset-env)
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


# regenerator-runtime

模块来自facebook的regenerator模块
生成器函数、async、await函数经babel编译

```js
// CommonJS
require("regenerator-runtime/runtime");
 
// ECMAScript 2015
import "regenerator-runtime/runtime.js";
```
