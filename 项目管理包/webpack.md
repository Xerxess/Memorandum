# webpack
<!-- TOC -->

- [webpack](#webpack)
    - [resolve](#resolve)
        - [alias](#alias)
    - [import](#import)
    - [require.context](#requirecontext)
- [插件 optimization.splitChunks 代码切割](#插件-optimizationsplitchunks-代码切割)

<!-- /TOC -->
https://webpack.js.org/
 
https://github.com/webpack/webpack/tree/master/examples  

https://github.com/webpack/webpack

## resolve

### alias

```js
// webpack.config.js
resolve: {
alias: {
        Utilities: path.resolve(__dirname, 'src/utilities/'),
        Templates: path.resolve(__dirname, 'src/templates/')
        }
    }


import Utility from '../../utilities/utility';
import Utility from 'Utilities/utility'; // 使用alias
```

## import

```js
// Single target
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);

// Multiple possible targets
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  `./locale/${language}`
);
```

## require.context


导出的功能有3个属性：resolve，keys，id。  

* resolve 是一个函数并返回已解析请求的模块ID。
* keys 是一个函数，它返回上下文模块可以处理的所有可能请求的数组.
* id是上下文模块的模块ID

```js
// 加载./components 下的所有组件
const context = require.context("./components", true, /\.vue/);
let components = {};
context.keys().forEach(item => {
  context(item).default;
});
var componentA = context.resolve('componentA');
context('localeA').then(locale => {
  // do something with locale
});
```

# 插件 optimization.splitChunks 代码切割

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```