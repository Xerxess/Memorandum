<!-- TOC -->

- [JavaScript 文件里的类型检查](#javascript-文件里的类型检查)
    - [用 JSDoc 类型表示类型信息](#用-jsdoc-类型表示类型信息)
    - [支持的JSDoc](#支持的jsdoc)

<!-- /TOC -->

# JavaScript 文件里的类型检查

通过添加// @ts-nocheck注释来忽略类型检查；相反，你可以通过去掉--checkJs设置并添加一个// @ts-check注释来选则检查某些.js文件。 你还可以使用// @ts-ignore来忽略本行的错误。 如果你使用了tsconfig.json，JS检查将遵照一些严格检查标记，如noImplicitAny，strictNullChecks等。 但因为JS检查是相对宽松的，在使用严格标记时可能会有些出乎意料的情况。

## 用 JSDoc 类型表示类型信息

```js
/** @type {number} */
var x;

x = 0; // OK
x = false; // Error: boolean is not assignable to number
```

## 支持的JSDoc

* @type 类型名称
* @param (or @arg or @argument)
* @returns (or @return)
* @typedef 声明复杂类型
* @callback
* @template 声明泛型
* @class (or @constructor) 推断构造函数
* @this 推断出this的类型
* @extends (or @augments) 继承了一个基类
* @enum 对象字面量
* @deprecated
