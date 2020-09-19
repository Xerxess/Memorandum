<!-- TOC -->

- [webpack v5.0.0](#webpack-v500)
- [命令行](#命令行)
- [webpack.config.js](#webpackconfigjs)
    - [配置](#配置)
    - [context](#context)
- [依赖图](#依赖图)
- [基础概念](#基础概念)
- [浏览器兼容性](#浏览器兼容性)
- [入口](#入口)
- [输出](#输出)
    - [占位符](#占位符)
    - [output 对象](#output-对象)
- [loader](#loader)
    - [loader 加载阶段](#loader-加载阶段)
    - [覆盖](#覆盖)
    - [使用 loader 方式](#使用-loader-方式)
    - [module 对象](#module-对象)
    - [Rule 对象](#rule-对象)
    - [Condition](#condition)
    - [UseEntry 对象](#useentry-对象)
- [resolve](#resolve)
    - [resolve.mainFields](#resolvemainfields)
- [optimization (优化)](#optimization-优化)
- [开发服务器](#开发服务器)
- [源映射](#源映射)
- [target](#target)
- [watch](#watch)
    - [watchOptions](#watchoptions)
- [externals](#externals)
- [node](#node)
    - [node API](#node-api)
        - [webpack()](#webpack)
        - [run()](#run)
        - [watch](#watch-1)
- [stats 统计](#stats-统计)
- [模块](#模块)
    - [模块方法](#模块方法)
        - [import（）中的动态表达式](#import中的动态表达式)
        - [Webpack自定义](#webpack自定义)
- [module 对象](#module-对象-1)

<!-- /TOC -->

https://webpack.js.org/

# webpack v5.0.0

- 运行 webpack 的最低 Node.js 版本为 10.13.0（LTS）

```cmd
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

# 命令行

https://webpack.js.org/api/cli/

```cmd
webpack [--config webpack.config.js]

webpack <entry> [<entry>] -o <output>

webpack --config example.config.js

# 环境选项
webpack --env.production    # sets env.production == true
webpack --env.platform=web  # sets env.platform == "web"

# 将CLI参数传递给Node.js
webpack --node-args="--max-old-space-size=4096"
```

# webpack.config.js

## 配置

## context

```js
const path = require("path");

module.exports = {
  //...
  context: path.resolve(__dirname, "app")
};
```

# 依赖图

每当一个文件依赖另一个文件时，webpack 都会将此视为依赖项。

入口点开始，webpack 递归地构建一个依赖关系图，其中包含您的应用程序需要的每个模块，然后将所有这些模块捆绑为少量的捆绑包

```cmd
// 生成依赖josn
webpack --profile --json > stats.json
```

# 基础概念

```js
// webpack.config.js
module.exports = {
  // 入口
  entry: "./path/to/my/entry/file.js",
  // 输出
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js"
  },
  // loader
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }]
  },
  // 插件
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  // 模式 development，production或者none
  mode: "production"
};
```

# 浏览器兼容性

支持所有符合 ES5 的浏览器（不支持 IE8 及以下版本）

# 入口

```js
// 单项（简写）语法
module.exports = {
  entry: {
    main: "./path/to/my/entry/file.js"
  }
};

// 输出文件名
module.exports = {
  //...
  entry: {
    app: "./app.js",
    home: { import: "./contact.js", filename: "pages/[name][ext]" },
    about: { import: "./about.js", filename: "pages/[name][ext]" }
  }
};

// 对象语法
module.exports = {
  entry: {
    app: "./src/app.js",
    adminApp: "./src/adminApp.js"
  }
};

// 多页应用
// 页面将重新加载此新文档，并重新下载资产 通过下面切片优化
// https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
module.exports = {
  entry: {
    pageOne: "./src/pageOne/index.js",
    pageTwo: "./src/pageTwo/index.js",
    pageThree: "./src/pageThree/index.js"
  }
};
```

# 输出

```js
// 基本用法
module.exports = {
  output: {
    filename: "bundle.js"
  }
};

// 多个入口
module.exports = {
  entry: {
    app: "./src/app.js",
    search: "./src/search.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  }
};
```

## 占位符

- [hash] - 模块标识符的哈希
- [contenthash] - 文件内容的哈希值，每个资产都不同
- [chunkhash] - 块内容的哈希
- [name] - 模块名称
- [id] - 模块标识符
- [query] - 模块查询，即？之后的字符串在文件名中
- [function] - 该函数可以返回文件名[字符串]

## output 对象

```js
// 最大EcmaScript版本
// 应该是> = 5，应该是<= 11
// - webpack 4中的默认值为5
output.ecmaVersion;

// 确定每个输出包的名称
// string function (pathData, assetInfo) => string
// - 单个entry点，可以是静态名称
// - 多个入口 '[name|hash|占位符].bundle.js'
output.filename;

// 输出目录为绝对路径
output.path;

// 指定在浏览器中引用时输出目录的公共URL
// - publicPath: 'https://cdn.example.com/assets/'
output.publicPath;

output.sourceMapFilename;

// - string = 'window'
output.globalObject;

output.library;
output.libraryExport;
// 配置如何公开库
// var:（默认）
// assign: 产生一个隐含的全局
// window: 入口点的返回值将window
// global:  入口点的返回值将global
// commonjs:  入口点的返回值将exports
// commonjs2 分配给module.exports
// amd
// amd-require
// umd
// system
output.libraryTarget;

// string: 'module' | 'text/javascript' boolean = false
ouput.scriptType;
```

# loader

及通过模块 import 依赖文件 可以是任何文件（只有有对应的 loader）

## loader 加载阶段

- Pitching：按顺序调用 pre, normal, inline, post
- Normal（默认）：按顺序调用 post, inline, normal, pre

## 覆盖

- 通过!在请求中添加前缀，可以忽略（覆盖）所有 normal loaders。
- 通过-!在请求中添加前缀，可以忽略（覆盖）所有 normal 和 pre loaders。
- 通过!!在请求中添加前缀，可以忽略（覆盖）所有 normal 和 post 和 pre loaders

## 使用 loader 方式

```js
// loader从右到左（或从下到上）倒序解析文件
// 下面的例子是先进入ts-loader>css-loader

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      { test: /\.ts$/, use: "ts-loader" }
    ]
  }
};
```

```js
// 内联
import Styles from "style-loader!css-loader?modules!./styles.css";
```

```cmd
webpack --module-bind pug-loader --module-bind 'css=style-loader!css-loader'
```

## module 对象

```js
// 正则表达式过滤大型库
// - noParse: /jquery|lodash/
module.noParse;

// 创建模块时与请求匹配的规则数组
// [Rule] 请见下面的Rule对象
module.rules;
```

## Rule 对象

```js
// 指定加载程序的类别
// 'pre' | 'post'
Rule.enforce;

// 排除所有符合这些条件的模块
// 提供Rule.exclude选项，则也不能提供Rule.resource
Rule.exclude;

// 包括符合任何这些条件的所有模块
// 提供Rule.include选项，则也不能提供Rule.resource
Rule.include;

Rule.loader;

// 具有解析器选项的对象
Rule.parser;

// UseEntry数组
// [UseEntry] 参见下面
Rule.use;
```

## Condition

- 字符串：要匹配输入，必须以提供的字符串开头。即 绝对目录路径或文件的绝对路径
- RegExp：已使用输入进行了测试
- 一个函数：使用输入调用它，并且必须返回真实值以进行匹配。
- 条件数组：至少一个条件必须匹配
- 对象：所有属性必须匹配。每个属性都有定义的行为

## UseEntry 对象

```js
{
    loader:'', // 字符串
    options:{ // 字符串或对象

    }
}
```

# resolve

更改解析模块的方式

```js
module.exports = {
  //...
  resolve: {
    // configuration options
  }
};
res;
```

```js
// 创建别名import或require
// 尾随$也可以添加到给定对象的键，以表示完全匹配
// alias: {Utilities: path.resolve(__dirname, 'src/utilities/'),
// alias: {xyz$: path.resolve(__dirname, 'path/to/file.js')}
resolve.alias;

resolve.aliasFields;

// 为true，则将不允许无扩展名的文件
resolve.enforceExtension;

// 尝试按顺序解决这些扩展名
// [string] = ['.wasm', '.mjs', '.js', '.json']
resolve.extensions;
```

## resolve.mainFields

https://2ality.com/2017/04/setting-up-multi-platform-packages.html#support-by-bundlers

* 如果target是"web"，"webworker"或者未指定，则默认为：mainFields: ["browser", "module", "main"]
* 如果target具有其他任何值（包括"node"），则默认值为：mainFields: ["module", "main"]
```js
module.exports = {
  //...
  resolve: {
    mainFields: ['browser', 'module', 'main']
  }
};
```


# optimization (优化)

```js
// 压缩
// production:true
optimization.minimize;

// 切片优化
// 默认情况下，webpack v4 +为动态导入的模块提供了开箱即用的新通用块策略
// SplitChunksPlugin https://webpack.js.org/plugins/split-chunks-plugin/
optimization.splitChunks;

optimization.runtimeChunk;

optimization.chunkIds;

// 设置process.env.NODE_ENV为给定的字符串值
optimization.nodeEnv;
```

# 开发服务器

https://github.com/webpack/webpack-dev-server

```js
devServer.after;
devServer.before;

// 将允许访问开发服务器的服务列入白名单
devServer.allowedHosts;

// 启用gzip压缩
devServer.compress;

// 服务器从何处提供内容
// 默认情况下，它将使用您当前的工作目录来提供内容
devServer.contentBase;

// 提供devServer.contentBase静态内容的UR
devServer.contentBasePublicPath;

// 添加到所有响应
devServer.headers;

devServer.host;

// 启用webpack的热模块更换
devServer.hot;

//
devServer.hotOnly;

devServer.https;

// 内联模式 捆绑软件中插入一个脚本以进行实时重新加载，并且构建消息将出现在浏览器控制台中
// iframe模式 通知栏下方使用带有有关构建消息的消息
devServer.inline;

// 启用时，当它被请求的DEV-服务器将只编译软件包不会监视任何文件更改
devServer.lazy;

// 默认情况下，检测到文件更改时，开发服务器将重新加载/刷新页面
devServer.liveReload;

// 启动后打开浏览器
devServer.open;

// 出现编译器错误或警告时，在浏览器中显示全屏覆盖。
devServer.overlay;

devServer.port;

// 同一域上发送API请求
// https://github.com/chimurai/http-proxy-middleware
devServer.proxy;

devServer.public;

devServer.publicPath;

devServer.socket;

devServer.sockHost;

// 配置高级选项以从中提供静态文件
devServer.staticOptions;

// 使浏览器可以使用您的本地IP
devServer.useLocalIp;

devServer.watchContentBase;
```

# 源映射

https://webpack.js.org/configuration/devtool/#devtool

# target

服务器和浏览器编写 JavaScript，因此 webpack 提供了多个部署目标，您可以在 webpack 配置中设置这些目标

- async-node
- electron-main
- electron-renderer
- electron-preload
- webworker
- web 默认
- node-webkit
- node

```js
module.exports = {
  target: "node"
};
```

# watch

webpack 可以监视文件并在文件更改时重新编译

## watchOptions

```js
// 延迟
watchOptions.aggregateTimeout;

// 排除文件夹
watchOptions.ignored;

watchOptions.poll;

info - verbosity;
```

# externals

- externals 配置选项提供不包括从所述输出束的依赖关系的方式
- 外部依赖项捆绑到各种模块上下文
- 对库开发人员最有用，但是有许多应用程序可供使用

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"
></script>
```

```js
module.exports = {
  //...
  externals: {
    jquery: "jQuery"
  }
};
```

```js
import $ from "jquery";

$(".my-element").animate(/* ... */);
```

# node

Node.js 选项可配置是填充还是模拟某些 Node.js 全局变量和模块

## node API

Node.js API 在您需要自定义构建或开发过程的场景中很有用，因为所有报告和错误处理都必须手动完成，而 webpack 仅负责编译部分。因此，stats 配置选项在 webpack()调用中不会有任何作用。

```cmd
npm install --save-dev webpack
```

### webpack()

```js
const webpack = require("webpack");

webpack({}, (err, stats) => {
  if (err || stats.hasErrors()) {
  }
  // Done processing
});
```

### run()

```js
const webpack = require('webpack');

const compiler = webpack({
  // Configuration Object
});

compiler.run((err, stats) => { // Stats Object
  // ...
});
```

### watch

```js
const webpack = require('webpack');

const compiler = webpack({
  // Configuration Object
});

const watching = compiler.watch({
  // Example watchOptions
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => { // Stats Object
  // Print watch/build result here...
  console.log(stats);
});
```

# stats 统计

精确控制显示哪些捆绑软件信息

```js
module.exports = {
  //...
  stats: "errors-only"
};
```

# 模块

## 模块方法

### import（）中的动态表达式

```js
const language = detectVisitorLanguage();
import(`./locale/${language}.json`).then(module => {
  // do something with the translations
});

// 内联注释
// webpackChunkName 新块的名称
// lazy （默认） 生成可延迟加载的块
// lazy-once 第一次调用时获取import()，而对的后续调用import()将使用相同的网络响应
// eager 不生成额外的块
// weak
// webpackInclude
// webpackExclude
// webpackPrefetch <link rel="prefetch" href="login-modal-chunk.js"> 指示浏览器在空闲时间预取
// webpackPreload
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackExports: ["default", "named"] */
  'module'
);
```

### Webpack自定义

```js
require.context(
  directory: String, // 目录
  includeSubdirs: Boolean /* 是否包含子目录 optional, default true */,
  filter: RegExp /* 匹配正则 optional, default /^\.\/.*$/, any file */,
  mode: String  /* optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync' */
)

// 可用于优化模块在输出块中的位置
require.include(dependency: String)

require.resolveWeak
```

# module 对象

https://webpack.js.org/api/module-variables/

```js
module.loaded

// 当前模块的ID
module.id

module.exports

exports
```
