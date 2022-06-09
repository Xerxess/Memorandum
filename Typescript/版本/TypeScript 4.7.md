<!-- TOC -->

- [TypeScript 4.7](#typescript-47)
    - [Node.js 中的 ECMAScript 模块支持](#nodejs-%E4%B8%AD%E7%9A%84-ecmascript-%E6%A8%A1%E5%9D%97%E6%94%AF%E6%8C%81)
        - [新的文件扩展](#%E6%96%B0%E7%9A%84%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95)
        - [CommonJS 互操作性](#commonjs-%E4%BA%92%E6%93%8D%E4%BD%9C%E6%80%A7)
    - [模块检测控制](#%E6%A8%A1%E5%9D%97%E6%A3%80%E6%B5%8B%E6%8E%A7%E5%88%B6)
    - [使用 moduleSuffixes 进行自定义解析](#%E4%BD%BF%E7%94%A8-modulesuffixes-%E8%BF%9B%E8%A1%8C%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A7%A3%E6%9E%90)
    - [跳转到源码定义仍存在一些问题](#%E8%B7%B3%E8%BD%AC%E5%88%B0%E6%BA%90%E7%A0%81%E5%AE%9A%E4%B9%89%E4%BB%8D%E5%AD%98%E5%9C%A8%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98)
    - [Import 自动分组](#import-%E8%87%AA%E5%8A%A8%E5%88%86%E7%BB%84)
    - [对象方法代码补全](#%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8)
    - [破坏性改动](#%E7%A0%B4%E5%9D%8F%E6%80%A7%E6%94%B9%E5%8A%A8)
        - [lib.d.ts 更新](#libdts-%E6%9B%B4%E6%96%B0)
        - [JSX 中更严格的展开检查](#jsx-%E4%B8%AD%E6%9B%B4%E4%B8%A5%E6%A0%BC%E7%9A%84%E5%B1%95%E5%BC%80%E6%A3%80%E6%9F%A5)
        - [使用模板字符串表达式进行更严格的检查](#%E4%BD%BF%E7%94%A8%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%BF%9B%E8%A1%8C%E6%9B%B4%E4%B8%A5%E6%A0%BC%E7%9A%84%E6%A3%80%E6%9F%A5)

<!-- /TOC -->

# TypeScript 4.7

## Node.js 中的 ECMAScript 模块支持

Node.js 中对 ESM 的支持主要是在 Node.js 12 及更高版本中实现的。
在 TypeScript 4.5 前后，我们在 Node.js 中推出了对 ESM 的仅夜间支持，以从用户那里获得一些反馈，并让库作者为更广泛的支持做好准备。

tsconfig.json

```
{
    "compilerOptions": {
        "module": "node16",
    }
}
```

package.json

Node.js 支持名为 package.json
"type"可以设置为"module"或"commonjs"。

- 默认为 CommonJS
- ES 模块
  - importexport 可以使用/语句。
  - 支持 top-level await
  - 相对导入路径需要完全扩展（我们必须写而不是）。import "./foo.js"import "./foo"
  - 导入的解析可能与 node_modules.
  - 某些类似全局的值喜欢 require 和 module 不能直接使用。
  - CommonJS 模块在某些特殊规则下被导入。

```
{
    "name": "my-package",
    "type": "module",

    "//": "...",
    "dependencies": {
    }
}
```

### 新的文件扩展

Node.js 支持两种扩展名支持这种情况：.mjs 和 .cjs。无论 type 字段如何设置，.mjs 文件始终被视为 ESM，而 .cjs 文件始终被视为 CommonJS。

TypeScript 支持两种新的源文件扩展名：.mts 和 .cts。TypeScript 会将 .mts 文件转换为 .mjs，.cts 转换为 .cjs。

TypeScript 也支持两种新的声明文件扩展名：.d.mts 和 .d.cts。TypeScript 会为 .mts 文件生成 .d.mts 文件，为 .cts 文件生成 .d.cts。

### CommonJS 互操作性

```ts
// Node.js 允许 ES 模块导入 CommonJS 模块，就好像它们是具有默认导出的 ES 模块一样。

// ./foo.cts
export function helper() {
  console.log('hello world!');
}

// ./bar.mts
import foo from './foo.cjs';

// prints "hello world!"
foo.helper();

// ./bar.mts
import { helper } from './foo.cjs';

// prints "hello world!"
helper();
```

```ts
// 从 CJS 模块导入 ESM 文件的唯一方法是使用动态调用

// ./foo.cts
export function helper() {
  console.log('hello world!');
}

// ./bar.mts
import foo = require('./foo.cjs');

foo.helper();
```

## 模块检测控制

## 使用 moduleSuffixes 进行自定义解析

- 必须要配置""，TYpeScript 使用这个配置去寻找 ./foo.ts。
- 默认的 moduleSuffixes 就是 ""

```
{
    "compilerOptions": {
        "moduleSuffixes": [".ios", ".native", ""]
    }
}
```

```ts
// 寻找./foo.ios.ts，./foo.native.ts，最后寻找 ./foo.ts
import * as foo from './foo';
```

## 跳转到源码定义(仍存在一些问题)

TypeScript 4.7 中添了一项预览编辑功能 Go To Source Definition 。  
与 Go To Definition 类似，但是它不会返回声明文件中的结果。  
它会查找所有的实现文件（如 .js 或 .ts 文件）。

## Import 自动分组

## 对象方法代码补全

TypeScript 现在为对象方法提供了代码片段补全功能。当补全对象中的成员时，TypeScript 会为一个方法名提供一个典型的补全条目，同时为整个方法定义提供一个单独的补全条目!

## 破坏性改动

### lib.d.ts 更新

### JSX 中更严格的展开检查

当在 JSX 中使用 … 展开算子时，TypeScript 现在加强了对给定类型是否是对象的检查。  
因此，具有 unknown 和 never 类型(更罕见的是，null 和 undefined 类型)的值不能再展开到 JSX 元素中。

```ts
import * as React from 'react';

interface Props {
  stuff?: string;
}

function MyComponent(props: unknown) {
  return <div {...props} />;
}

// ERROR:Spread types may only be created from object types.
```

### 使用模板字符串表达式进行更严格的检查
