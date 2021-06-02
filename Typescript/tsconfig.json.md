<!-- TOC -->

- [tsconfig.json](#tsconfigjson)
- [files](#files)
- [extends](#extends)
- [include/exclude](#includeexclude)
- [Compiler Options 编译器配置](#compiler-options-编译器配置)
    - [Project Options 项目选项](#project-options-项目选项)
        - [allowJs](#allowjs)
        - [checkJs](#checkjs)
        - [composite](#composite)
        - [declaration](#declaration)
        - [declarationMap](#declarationmap)
        - [downlevelIteration](#downleveliteration)
        - [importHelpers 防止辅助函数代码重复引用](#importhelpers-防止辅助函数代码重复引用)
        - [incremental](#incremental)
        - [isolatedModules](#isolatedmodules)
        - [jsx](#jsx)
        - [lib](#lib)
        - [module](#module)
        - [noEmit](#noemit)
        - [outDir](#outdir)
        - [outFile](#outfile)
        - [plugins](#plugins)
        - [removeComments](#removecomments)
        - [rootDir](#rootdir)
        - [sourceMap](#sourcemap)
        - [target](#target)
        - [tsBuildInfoFile](#tsbuildinfofile)
    - [Strict Checks 严格检查](#strict-checks-严格检查)
        - [alwaysStrict](#alwaysstrict)
        - [noImplicitAny](#noimplicitany)
        - [noImplicitThis](#noimplicitthis)
        - [strict](#strict)
        - [strictBindCallApply](#strictbindcallapply)
        - [strictFunctionTypes](#strictfunctiontypes)
        - [strictNullChecks](#strictnullchecks)
        - [strictPropertyInitialization](#strictpropertyinitialization)
    - [Module Resolution 模块解析](#module-resolution-模块解析)
        - [allowSyntheticDefaultImports](#allowsyntheticdefaultimports)
        - [allowUmdGlobalAccess](#allowumdglobalaccess)
        - [baseUrl](#baseurl)
        - [esModuleInterop](#esmoduleinterop)
        - [moduleResolution](#moduleresolution)
        - [paths](#paths)
        - [preserveSymlinks](#preservesymlinks)
        - [rootDirs](#rootdirs)
        - [typeRoots](#typeroots)
        - [types](#types)
    - [Source Maps 源地图](#source-maps-源地图)
        - [inlineSourceMap](#inlinesourcemap)
        - [inlineSources](#inlinesources)
        - [mapRoot](#maproot)
        - [sourceRoot](#sourceroot)
    - [Linter Checks 额外检查](#linter-checks-额外检查)
        - [noFallthroughCasesInSwitch](#nofallthroughcasesinswitch)
        - [noImplicitOverride](#noimplicitoverride)
        - [noImplicitReturns](#noimplicitreturns)
        - [noPropertyAccessFromIndexSignature](#nopropertyaccessfromindexsignature)
        - [noUncheckedIndexedAccess](#nouncheckedindexedaccess)
        - [noUnusedLocals](#nounusedlocals)
        - [noUnusedParameters](#nounusedparameters)
    - [Experimental 实验性](#experimental-实验性)
        - [emitDecoratorMetadata](#emitdecoratormetadata)
        - [experimentalDecorators](#experimentaldecorators)
    - [Advanced 激进](#advanced-激进)
        - [allowUnreachableCode](#allowunreachablecode)
        - [allowUnusedLabels](#allowunusedlabels)
        - [assumeChangesOnlyAffectDirectDependencies](#assumechangesonlyaffectdirectdependencies)
        - [charset](#charset)
        - [declarationDir](#declarationdir)
        - [diagnostics](#diagnostics)
        - [disableReferencedProjectLoad](#disablereferencedprojectload)
        - [disableSizeLimit 内存限制](#disablesizelimit-内存限制)
        - [disableSolutionSearching](#disablesolutionsearching)
        - [emitBOM](#emitbom)
        - [emitDeclarationOnly](#emitdeclarationonly)
        - [explainFiles](#explainfiles)
        - [extendedDiagnostics 编译时花费的时间](#extendeddiagnostics-编译时花费的时间)
        - [forceConsistentCasingInFileNames](#forceconsistentcasinginfilenames)
        - [generateCpuProfile](#generatecpuprofile)
        - [importsNotUsedAsValues](#importsnotusedasvalues)
        - [jsxFactory](#jsxfactory)
        - [jsxFragmentFactory](#jsxfragmentfactory)
        - [jsxImportSource](#jsximportsource)
        - [keyofStringsOnly](#keyofstringsonly)
        - [listEmittedFiles](#listemittedfiles)
        - [listFiles](#listfiles)
        - [maxNodeModuleJsDepth](#maxnodemodulejsdepth)
        - [newLine](#newline)
        - [noEmitHelpers](#noemithelpers)
        - [noEmitOnError](#noemitonerror)
        - [noErrorTruncation](#noerrortruncation)
        - [noImplicitUseStrict](#noimplicitusestrict)
        - [noLib](#nolib)
        - [noResolve](#noresolve)
        - [noStrictGenericChecks](#nostrictgenericchecks)
        - [out](#out)
        - [preserveConstEnums 枚举生成代码](#preserveconstenums-枚举生成代码)
        - [reactNamespace](#reactnamespace)
        - [resolveJsonModule](#resolvejsonmodule)
        - [skipDefaultLibCheck](#skipdefaultlibcheck)
        - [skipLibCheck](#skiplibcheck)
        - [stripInternal](#stripinternal)
        - [suppressExcessPropertyErrors](#suppressexcesspropertyerrors)
        - [suppressImplicitAnyIndexErrors](#suppressimplicitanyindexerrors)
        - [traceResolution 打印有关其解析过程](#traceresolution-打印有关其解析过程)
        - [useDefineForClassFields](#usedefineforclassfields)
    - [Command Line 命令行](#command-line-命令行)
        - [-preserveWatchOutput](#-preservewatchoutput)
        - [pretty](#pretty)
    - [watchOptions](#watchoptions)
        - [watchFile](#watchfile)
        - [watchDirectory](#watchdirectory)
        - [fallbackPolling](#fallbackpolling)
        - [synchronousWatchDirectory](#synchronouswatchdirectory)
        - [excludeDirectories](#excludedirectories)
        - [excludeFiles](#excludefiles)
    - [typeAcquisition 类型获取](#typeacquisition-类型获取)
        - [enable](#enable)
        - [include](#include)
        - [exclude](#exclude)
    - [](#)

<!-- /TOC -->

# tsconfig.json

tsconfig.json 文件中指定了用来编译这个项目的根文件和编译选项。

- 不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，逐级向上搜索父目录。
- 不带任何输入文件的情况下调用 tsc，且使用命令行参数--project（或-p）指定一个包含 tsconfig.json 文件的目录

```json
{
  // 继承配置
  "extends": "./configs/base",
  // 编译器配置
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

# files

Default:false

指定要包含在程序中的文件的允许列表。如果找不到任何文件，则会发生错误。

```json
{
  "files": ["core.ts", "sys.ts", "types.ts", "scanner.ts", "parser.ts", "utilities.ts", "binder.ts", "checker.ts", "tsc.ts"]
}
```

# extends

Default:false

继承的另一个配置文件,路径可以使用 Node.js 样式解析。

- 当前配置文件覆盖继承配置文件配置

```json
{
  "extends": "./configs/base"
}
```

# include/exclude

Default::["**/*"]

指定要包含在程序中的文件名或模式的数组。这些文件名是相对于包含 tsconfig.json 文件的目录来解析的。

- '\*' 匹配零个或多个字符（不包括目录分隔符）
- '?' 匹配任意一个字符（目录分隔符除外）
- '\*\*/' 匹配嵌套到任何级别的任何目录

```json
{
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["ts.ts"]
}
```

# Compiler Options 编译器配置

## Project Options 项目选项

### allowJs

Default:false

允许 JavaScript 文件在你的工程中被引入，而不是仅仅允许 .ts 和 .tsx 文件。。

### checkJs

Default:false

与 allowJs 配合使用，当 checkJs 被启用时，JavaScript 文件中会报告错误。也就是相当于在项目中所有 JavaScript 文件顶部包含 // @ts-check。

### composite

Default:false

强制执行某些约束,确保 TypeScript 能够找到编译当前工程所需要的引用工程的输出位置。

启用时:

- 如果没有明确指定 rootDir，则默认为包含 tsconfig.json 文件的目录。
- 所有实现的文件必须由 include 来匹配，或在 files 数组中指定。如果违反了这一约束，tsc 将告诉你哪些文件没有被指定。
- declaration 默认为 true。

### declaration

Default:false, 除非 composite:true

为你工程中的每个 TypeScript 或 JavaScript 文件生成 .d.ts 文件。 这些 .d.ts 文件是描述模块外部 API 的类型定义文件。 像 TypeScript 这样的哦你根据可以通过 .d.ts 文件为非类型化的代码提供 intellisense 和精确的类型。

### declarationMap

Default:false

### downlevelIteration

Default:false

降级是 TypeScript 的术语，用于转译为旧版本的 JavaScript。该标志用于支持更精确地实现现代 JavaScript 如何在较旧的 JavaScript 运行时中通过新概念进行迭代的方式。

!! 简单理解为更优雅的降级 es5 采用 polyfill 或辅助函数

### importHelpers 防止辅助函数代码重复引用

Default:false

某些降级操作，TypeScript 使用一些帮助程序代码来进行诸如扩展类，扩展数组或对象以及异步操作之类的操作。默认情况下，这些帮助程序会插入使用它们的文件中。如果在许多不同的模块中使用相同的帮助程序，则可能导致代码重复。

importHelpers 开启后，将从 tslib 导入辅助工具函数（比如**extends，**krest 等）

```js
export function fn(arr: number[]) {
  const arr2 = [1, ...arr];
}
```

编译后

```js
import { __read, __spreadArray } from 'tslib';
export function fn(arr) {
  var arr2 = __spreadArray([1], __read(arr));
}
```

### incremental

Default:如果 composite:true 则为 true，否则为 false

TypeScript 将有关上一次编译的项目图的信息保存到磁盘上存储的文件中。这将在与编译输出相同的文件夹中创建一系列.tsbuildinfo 文件。

### isolatedModules

Default:false

虽然您可以使用 TypeScript 从 TypeScript 代码生成 JavaScript 代码，但通常也可以使用其他转译器（例如 Babel）来执行此操作。但是，其他编译器一次只能处理一个文件，这意味着它们不能应用依赖于理解完整类型系统的代码转换。此限制也适用于某些构建工具使用的 TypeScript 的 ts.transpileModule API。

- 启用 isolatedModules 时，某些代码示例无效。
- 如果设置了 isolatedModules，则所有实现文件都必须是模块

执行额外检查以确保单独编译（如 transpileModule 或@babel/plugin-transform-typescript）是安全的。

### jsx

Default:undefined  
Allowed:
react,
react-jsx,
react-jsxdev,
react-native,
preserve

控制如何在 JavaScript 文件中发出 JSX 构造。这仅影响以.tsx 文件开头的 JS 文件的输出。

- react：使用 JSX 发出.js 文件已更改为等效的 React.createElement 调用
- react: Emit .js files with JSX changed to the equivalent React.createElement calls
- react-jsx: Emit .js files with the JSX changed to \_jsx calls
- react-jsxdev: Emit .js files with the JSX to \_jsx calls
- preserve: Emit .jsx files with the JSX unchanged
- react-native: Emit .js files with the JSX unchanged

### lib

https://github.com/microsoft/TypeScript/tree/master/lib

编译过程中需要引入的库文件的列表

更改它们的几个原因

- 您的程序无法在浏览器中运行，因此您不希望使用“ dom”类型定义
- 您的运行时平台提供了某些 JavaScript API 对象（也许通过 polyfills），但还不支持给定 ECMAScript 版本的完整语法
- 对于某些（但不是全部）更高级别的 ECMAScript 版本，您具有 polyfill 或本机实现

| Name       | Contents                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ES5        | Core definitions for all ES3 and ES5 functionality                                                                                      |
| ES2015     | Additional APIs available in ES2015 (also known as ES6) - array.find, Promise, Proxy, Symbol, Map, Set, Reflect, etc.                   |
| ES6        | Alias for “ES2015”                                                                                                                      |
| ES2016     | Additional APIs available in ES2016 - array.include, etc.                                                                               |
| ES7        | Alias for “ES2016”                                                                                                                      |
| ES2017     | Additional APIs available in ES2017 - Object.entries, Object.values, Atomics, SharedArrayBuffer, date.formatToParts, typed arrays, etc. |
| ES2018     | Additional APIs available in ES2018 - async iterables, promise.finally, Intl.PluralRules, rexexp.groups, etc.                           |
| ES2019     | Additional APIs available in ES2019 - array.flat, array.flatMap, Object.fromEntries, string.trimStart, string.trimEnd, etc.             |
| ES2020     | Additional APIs available in ES2020 - string.matchAll, etc.                                                                             |
| ESNext     | Additional APIs available in ESNext - This changes as the JavaScript specification evolves                                              |
| DOM        | DOM definitions - window, document, etc.                                                                                                |
| WebWorker  | APIs available in WebWorker contexts                                                                                                    |
| ScriptHost | APIs for the Windows Script Hosting System                                                                                              |

### module

Allowed:
CommonJS (default if target is ES3 or ES5),
,
ES2015,
ES2020,
,
None,
UMD,
AMD,
System,
ESNext

指定生成哪个模块系统代码："None"，"CommonJS"，"AMD"，"System"，"UMD"，"ES6"或"ES2015"。 ► 只有"AMD"和"System"能和--outFile 一起使用。 ►"ES6"和"ES2015"可使用在目标输出为"ES5"或更低的情况下。

### noEmit

Default:
false

不生成输出文件。

### outDir

重定向输出目录。

- 如果未指定，则.js 文件将与生成它们的.ts 文件位于同一目录中：

### outFile

如果指定，则所有全局（非模块）文件将串联到指定的单个输出文件中。 如果模块是 system 或 amd，则所有模块文件也将在所有全局内容之后串联到该文件中。

将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和///<reference``>和 import 的文件顺序决定的。查看输出文件顺序文档了解详情。

### plugins

插件列表

- ts-sql-plugin — 使用模板字符串“ SQL 构建器”添加 SQL linting.
- typescript-styled-plugin — Provides CSS linting inside template strings .
- typescript-eslint-language-service — Provides eslint error messaging and fix-its inside the compiler’s output.
- ts-graphql-plugin — Provides validation and auto-completion inside GraphQL query template strings.

### removeComments

Default:
false

删除所有注释，除了以/!\*开头的版权信息

### rootDir

默认值：所有非声明输入文件的最长公共路径。如果设置了 Composite，则默认为包含 tsconfig.json 文件的目录

当 TypeScript 编译文件时，它在输出目录中保留与输入目录中相同的目录结构。 例如，假设您有一些输入文件：

```
MyProj
├── tsconfig.json
├── core
│   ├── a.ts
│   ├── b.ts
│   ├── sub
│   │   ├── c.ts
├── types.d.ts



MyProj
├── dist
│   ├── a.js
│   ├── b.js
│   ├── sub
│   │   ├── c.js
```

### sourceMap

Default:
false

启用源地图文件的生成。这些文件允许调试器和其他工具在实际处理发出的 JavaScript 文件时显示原始 TypeScript 源代码。源映射文件以.js.map（或.jsx.map）文件的形式发出，位于相应的.js 输出文件旁边。

### target

Default:ES3  
Allowed:
ES3 (default),
ES5,
ES6/ES2015 (synonymous),
ES7/ES2016,
ES2017,
ES2018,
ES2019,
ES2020,
ESNext

指定 ECMAScript 目标版本"ES3"

现代浏览器支持所有 ES6 功能，因此 ES6 是一个不错的选择。如果将代码部署到较旧的环境中，则可以选择设置较低的目标，如果可以保证代码可以在较新的环境中运行，则可以选择较高的目标。

### tsBuildInfoFile

Default:
.tsbuildinfo

## Strict Checks 严格检查

### alwaysStrict

推荐:
True

Default:
false, unless strict is set

以严格模式解析并为每个源文件生成"use strict"语句

### noImplicitAny

推荐:
True

Default:
false, unless strict is set

在表达式和声明上省略 any 类型时报错。
启用后：

```ts
function fn(s) {
  // ERROR: Parameter 's' implicitly has an 'any' type.
  console.log(s.subtr(3));
}
```

### noImplicitThis

推荐:True  
Default:
false, unless strict is set

当 this 表达式的值为 any 类型的时候，生成一个错误。

### strict

推荐:True  
Default:
false

启用所有严格检查选项

### strictBindCallApply

推荐:true  
Default:
false, unless strict is set

设置后，TypeScript 将检查是否为基础函数使用正确的参数调用了函数的内置方法 call，bind 和 apply：

```ts
// With strictBindCallApply on
function fn(x: string) {
  return parseInt(x);
}

const n1 = fn.call(undefined, '10');

const n2 = fn.call(undefined, false);
// ERROR: Argument of type 'boolean' is not assignable to parameter of type 'string'.
```

### strictFunctionTypes

推荐:
True
Default:
false, unless strict is set

启用后，此标志将导致更正确地检查功能参数

```ts
function fn(x: string) {
  console.log('Hello, ' + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment is prevented
let func: StringOrNumberFunc = fn;
// ERROR:Type '(x: string) => void' is not assignable to type 'StringOrNumberFunc'.
// ERROR:Types of parameters 'x' and 'ns' are incompatible.
// ERROR:Type 'string | number' is not assignable to type 'string'.
// ERROR:Type 'number' is not assignable to type 'string'.
```

在开发此功能期间，我们发现了许多固有的不安全类层次结构，包括 DOM 中的某些层次结构。因此，该设置仅适用于以函数语法编写的函数，而不适用于以方法语法编写的函数：

```ts
type Methodish = {
  func(x: string | number): void;
};

function fn(x: string) {
  console.log('Hello, ' + x.toLowerCase());
}

// Ultimately an unsafe assignment, but not detected
const m: Methodish = {
  func: fn,
};
m.func(10);
```

### strictNullChecks

推荐:
True  
Default:
false, unless strict is set

当 strictNullChecks 为 false 时，该语言将有效地忽略 null 和 undefined。这可能会在运行时导致意外错误。

### strictPropertyInitialization

推荐:
True  
Default:
false, unless strict is set

设置为 true 时，当声明了类属性但未在构造函数中设置 ClassType 时，TypeScript 将引发错误。

## Module Resolution 模块解析

### allowSyntheticDefaultImports

Default:
module === "system" or esModuleInterop

当设置为 true， 并且模块没有显式指定默认导出时，allowSyntheticDefaultImports 可以让你这样写导入

### allowUmdGlobalAccess

Default:
false

当 allowUmdGlobalAccess 设置为 true 时，将允许你在模块文件中以全局变量的形式访问 UMD 的导出。 模块文件是具有或同时导入、导出的文件。当未设置这个选项时，使用 UMD 模块的导出需要首先导入声明。

### baseUrl

可以让您设置解析非绝对路径模块名时的基准目录,定义一个根目录，以进行绝对路径文件解析

### esModuleInterop

推荐:
True  
Default:
false

默认情况下（未设置 `esModuleInterop` 或值为 false），TypeScript 像 ES6 模块一样对待 CommonJS/AMD/UMD。

当启用 esModuleInterop 时，将同时启用 allowSyntheticDefaultImports

### moduleResolution

Default:
module === AMD or UMD or System or ES6, then Classic

指定模块解析策略：'node' （Node.js） 或 'classic' （在 TypeScript 1.6 版本之前使用）。 你可能不需要在新代码中使用 classic。

### paths

一些将模块导入重新映射到相对于 baseUrl 路径的配置。

```json
{
  "compilerOptions": {
    "baseUrl": ".", // this must be specified if "paths" is specified.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // this mapping is relative to "baseUrl"
    }
  }
}
```

### preserveSymlinks

Default:
false

这是为了匹配 Node.js 中相同的选项，它不解析符号链接的真实路径。

这个选项也表现出与 Webpack 中 resolve.symlinks 选项相反的行为（即设置 TypeScript 的 preserveSymlinks 为 true, 与之对应的 Webpack 的 resolve.symlinks 为 false。反之亦然）

启用后，对于模块和包的引用（例如 import 和 /// <reference type="..." /> 指令都相对于符号链接所在的位置进行解析，而不是相对于符号链接解析后的路径。

### rootDirs

通过 rootDirs，你可以告诉编译器有许多“虚拟”的目录作为一个根目录。这将会允许编译器在这些“虚拟”目录中解析相对应的模块导入，就像它们被合并到同一目录中一样。

```
 src
 └── views
     └── view1.ts (can import "./template1", "./view2`)
     └── view2.ts (can import "./template1", "./view1`)

 generated
 └── templates
         └── views
             └── template1.ts (can import "./view1", "./view2")
```

```
{
  "compilerOptions": {
    "rootDirs": ["src/views", "generated/templates/views"]
  }
}
```

### typeRoots

默认情况下，所有 可见 的 ”@types” 包都将包含在你的编译过程中。 在 node_modules/@types 中的任何包都被认为是 可见 的。

### types

```json
// 如果指定了types ，则仅列出的包将包含在全局范围内。
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

## Source Maps 源地图

### inlineSourceMap

Default:
false

设置后，TypeScript 不会写出.js.map 文件来提供源地图，而是将源地图内容嵌入到.js 文件中。尽管这会导致较大的 JS 文件，但在某些情况下可能会很方便。例如，您可能想在不允许提供.map 文件的网络服务器上调试 JS 文件。

### inlineSources

Default:
false

设置后，TypeScript 将.ts 文件的原始内容作为嵌入字符串包含在源映射中。在与 inlineSourceMap 相同的情况下，这通常很有用。

与 inlineSourceMap 中的示例不同，源映射现在也包含原始源代码。

### mapRoot

指定调试器应在其中定位地图文件的位置，而不是生成的位置。

### sourceRoot

指定调试器应在其中定位 TypeScript 文件的位置，而不是相对源位置。

## Linter Checks 额外检查

### noFallthroughCasesInSwitch

Default:
false

在 switch 语句中报告失败情况的错误。确保 switch 语句内的任何非空情况都包括 break 或 return。

### noImplicitOverride

在处理使用继承的类时，子类可能会与在基类中重命名的重载函数“不同步”。

### noImplicitReturns

Default:
false

启用后，TypeScript 将检查函数中的所有代码路径，以确保它们返回值。

### noPropertyAccessFromIndexSignature

Default:
false

此设置确保通过“点”（obj.key）语法和“已索引”（obj [“ key”]）访问字段之间以及在类型中声明属性的方式之间的一致性。

noPropertyAccessFromIndexSignature:false 将允许您使用点语法来访问未定义的字段

### noUncheckedIndexedAccess

TypeScript 具有一种通过索引签名来描述具有未知键但对象上具有已知值的对象的方法

### noUnusedLocals

Default:
false

报告未使用的局部变量的错误。

```ts
const createKeyboard = (modelID: number) => {
  const defaultModelID = 23;
  //  ERROR: 'defaultModelID' is declared but its value is never read.
  return { type: 'keyboard', modelID };
};
```

### noUnusedParameters

Default:
false

有关函数中未使用参数的错误

```ts
const createDefaultKeyboard = (modelID: number) => {
  // ERROR: 'modelID' is declared but its value is never read.
  const defaultModelID = 23;
  return { type: 'keyboard', modelID: defaultModelID };
};
```

## Experimental 实验性

TypeScript 力求只包含那些确认会被添加到 JavaScript 语言的特性。

### emitDecoratorMetadata

### experimentalDecorators

启用对装饰器的实验性支持

## Advanced 激进

### allowUnreachableCode

Default:
undefined

允许无法访问的代码

- undefined （默认）向编辑人员提供建议作为警告
- true 无法访问的代码将被忽略
- false 引发有关无法访问代码的编译器错误

```ts
// With "allowUnreachableCode": false:
function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  return true;
  //ERROR: Unreachable code detected.
}
```

### allowUnusedLabels

Default:
undefined

允许未使用的标签

- undefined （默认）向编辑人员提供建议作为警告
- true 未使用的标签将被忽略
- false 引发有关未使用标签的编译器错误

### assumeChangesOnlyAffectDirectDependencies

启用此选项后，TypeScript 将避免重新检查/重建所有可能真正受影响的文件，而仅重新检查/重建已更改的文件以及直接导入它们的文件。

### charset

UTF-8

### declarationDir

提供了一种配置发出声明文件的根目录

### diagnostics

用于输出诊断信息以进行调试。

### disableReferencedProjectLoad

在多项目 TypeScript 程序中，TypeScript 会将所有可用项目加载到内存中，以便为需要完整知识图（例如“查找所有引用”）的编辑者响应提供准确的结果。

### disableSizeLimit 内存限制

Default:
false

为了避免在处理非常大的 JavaScript 项目时可能出现的内存膨胀问题，TypeScript 将分配的内存量有上限。启用此标志将删除限制。

### disableSolutionSearching

当使用复合 TypeScript 项目时，此选项提供一种声明使用诸如查找所有引用或在编辑器中跳转到定义之类的功能时不希望包含该项目的方法。

### emitBOM

Default:
false

控制 TypeScript 在写入输出文件时是否将发出字节顺序标记（BOM）。某些运行时环境需要 BOM 才能正确解释 JavaScript 文件。其他人则要求它不存在。

### emitDeclarationOnly

Default:
false

只发出.d.ts 文件；不发出.js 文件

两种情况下很有用:

- 您正在使用 TypeScript 以外的编译器来生成 JavaScript。
- 您正在使用 TypeScript 为您的使用者只生成 d.ts 文件。

### explainFiles

打印 TypeScript 视为项目一部分的文件的名称以及它们成为编译一部分的原因。

### extendedDiagnostics 编译时花费的时间

Default:
false

使用此标志来发现 TypeScript 在编译时花费的时间。这是用于了解代码库总体性能特征的工具。

### forceConsistentCasingInFileNames

### generateCpuProfile

此选项使您有机会让 TypeScript 在编译器运行期间发出 v8 CPU 配置文件。 CPU 配置文件可以帮助您了解为什么构建速度很慢。

```
npm run tsc --generateCpuProfile tsc-output.cpuprofile
```

### importsNotUsedAsValues

Allowed:
remove,
preserve,
error

此标志控制导入的工作方式，共有 3 种不同的选项

- remove 删除仅引用类型的导入语句的默认行为
- preserve 保留所有从不使用值或类型的导入语句。这可能会导致导入/副作用得以保留。
- error

### jsxFactory

使用经典的 JSX 运行时编译 JSX Elements 时，更改.js 文件中调用的函数。如果使用 preact，最常见的更改是使用“ h”或“ preact.h”而不是默认的“ React.createElement”。

### jsxFragmentFactory

指定在指定针对性的 JSX 片段时使用的 JSX 片段工厂函数，该 JSX 通过 jsxFactory 编译器选项指定，例如分段。

### jsxImportSource

声明将 TypeType 4.1 中引入的 jsx 用作“ react-jsx”或“ react-jsxdev”时，用于导入 jsx 和 jsxs 工厂功能的模块说明符。

### keyofStringsOnly

此标志将 keyof 类型运算符更改为返回字符串，而不是字符串|应用于具有字符串索引签名的类型时的数字。

### listEmittedFiles

将编译的一部分生成文件的名称打印到终端

### listFiles

Default:
false

在编译中打印文件名。当您不确定 TypeScript 是否包含所需的文件时，此功能很有用。

### maxNodeModuleJsDepth

Default:
0

在 node_modules 下搜索并加载 JavaScript 文件的最大依赖深度。

### newLine

Default:
Platform specific

指定发射文件时要使用的行尾序列：“ CRLF”（dos）或“ LF”（unix）。

### noEmitHelpers

无需使用 importHelpers 导入帮助程序，而是可以为您使用的帮助程序提供全局范围内的实现，并完全关闭辅助功能的发出。

### noEmitOnError

Default:
false

如果报告了任何错误，请不要发出诸如 JavaScript 源代码，源映射或声明之类的编译器输出文件。

### noErrorTruncation

Default:
false

不要截断错误消息

### noImplicitUseStrict

### noLib

禁用自动包含任何库文件。如果设置了此选项，则忽略 lib。

### noResolve

Default:
false

默认情况下，TypeScript 将检查初始的文件集，以获取 import 和\<reference 指令，并将这些已解析的文件添加到您的程序中。

### noStrictGenericChecks

Default:
false

比较两个通用函数时，TypeScript 将统一类型参数。

### out

请改用 outFile。

out 选 ​​ 项以无法预测或一致的方式计算最终文件位置。保留此选项仅是为了向后兼容，不建议使用。

### preserveConstEnums 枚举生成代码

Default:
false

不要在生成的代码中擦除 const 枚举声明。 const 枚举提供一种方法，通过发出枚举值（而不是引用）来减少应用程序在运行时的总体内存占用。

```ts
const enum Album {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album.JimmyEatWorldFutures;
if (selectedAlbum === Album.JimmyEatWorldFutures) {
  console.log('That is a great choice.');
}
```

// preserveConstEnums:false

```js
'use strict';
const selectedAlbum = 1; /* JimmyEatWorldFutures */
if (selectedAlbum === 1 /* JimmyEatWorldFutures */) {
  console.log('That is a great choice.');
}
```

// preserveConstEnums:true

```js
'use strict';
var Album;
(function (Album) {
  Album[(Album['JimmyEatWorldFutures'] = 1)] = 'JimmyEatWorldFutures';
  Album[(Album['TubRingZooHypothesis'] = 2)] = 'TubRingZooHypothesis';
  Album[(Album['DogFashionDiscoAdultery'] = 3)] = 'DogFashionDiscoAdultery';
})(Album || (Album = {}));
const selectedAlbum = 1; /* JimmyEatWorldFutures */
if (selectedAlbum === 1 /* JimmyEatWorldFutures */) {
  console.log('That is a great choice.');
}
```

### reactNamespace

Default:
"React"

请改用--jsxFactory。

指定针对 TSX 文件的反应时，为 createElement 调用的对象。

### resolveJsonModule

Default:
false

允许导入扩展名为“ .json”的模块，这是节点项目中的常见做法。这包括基于静态 JSON 形状为导入生成类型。

### skipDefaultLibCheck

请改用--skipLibCheck。

跳过默认库声明文件的类型检查。

### skipLibCheck

推荐:
True  
Default:
false

跳过声明文件的类型检查。

这样可以节省编译期间的时间，但会牺牲类型系统的准确性。例如，两个库可能以不一致的方式定义相同类型的两个副本。TypeScript 不会对所有 d.ts 文件进行全面检查，而是会键入检查您在应用程序源代码中具体引用的代码。

### stripInternal

不要为在 JSDoc 注释中带有@internal 注释的代码发出声明。这是一个内部编译器选项；使用自担风险，因为编译器不会检查结果是否有效。

### suppressExcessPropertyErrors

禁用报告多余的属性错误

### suppressImplicitAnyIndexErrors

Default:
false

启用 preventImplicitAnyIndexErrors 可以抑制报告索引到对象时隐式 any 的错误

### traceResolution 打印有关其解析过程

Default:
false

当您尝试调试为什么不包含模块时。您可以将 traceResolutions 设置为 true，以使 TypeScript 为每个处理的文件打印有关其解析过程的信息。

### useDefineForClassFields

## Command Line 命令行

### -preserveWatchOutput

Default:
false

是否将过时的控制台输出保持在监视模式下，而不是每次发生更改时都清除屏幕。

### pretty

Default:
true

使用颜色和上下文对错误和消息进行样式化，默认情况下处于启用状态—使您有机会从编译器中获得较少的简洁，单一颜色的消息。

## watchOptions

### watchFile

Allowed:
fixedPollingInterval,
priorityPollingInterval,
dynamicPriorityPolling,
useFsEvents,
useFsEventsOnParentDirectory

监视文件:

- fixedPollingInterval 以固定的时间间隔每秒检查每个文件几次更改。
- priorityPollingInterval 每秒检查每个文件几次更改，但是使用试探法检查某些类型的文件的频率要比其他文件低。
- dynamicPriorityPolling 使用动态队列，在该队列中，较少检查不经常修改的文件。
- useFsEvents （默认）：尝试使用操作系统/文件系统的本机事件进行文件更改。
- useFsEventsOnParentDirectory 尝试使用操作系统/文件系统的本机事件来侦听文件父目录中的更改

### watchDirectory

Allowed:
fixedPollingInterval,
dynamicPriorityPolling,
useFsEvents

在缺乏递归文件监视功能的系统下如何监视整个目录树的策略。

- fixedPollingInterval 以固定的时间间隔每秒检查每个目录几次更改。
- dynamicPriorityPolling 使用动态队列，在该队列中，较少检查不经常修改的目录。
- useFsEvents （默认设置）：尝试使用操作系统/文件系统的本机事件进行目录更改。

### fallbackPolling

Allowed:
fixedPollingInterval,
priorityPollingInterval,
dynamicPriorityPolling

使用文件系统事件时，此选项指定当系统用完本机文件监视程序和/或不支持本机文件监视程序时使用的轮询策略

- fixedPollingInterval 以固定的时间间隔每秒检查每个目录几次更改。
- priorityPollingInterval 使用动态队列，在该队列中，较少检查不经常修改的目录。
- dynamicPriorityPolling 使用动态队列，在该队列中，较少检查不经常修改的文件。
- synchronousWatchDirectory 在目录上禁用延迟监视

### synchronousWatchDirectory

在本机不支持递归监视的平台上，同步调用回调并更新目录监视程序的状态。而不是给它一个小的超时时间，以允许对文件进行可能的多次编辑。

### excludeDirectories

您可以使用 excludeFiles 大大减少--watch 期间观看的文件数量。这是减少 TypeScript 在 Linux 上跟踪的打开文件数量的有用方法。

```ts
{
  "watchOptions": {
    "excludeDirectories": ["**/node_modules", "_build", "temp/*"]
  }
}
```

### excludeFiles

您可以使用 excludeFiles 从观察的文件中删除一组特定文件。

## typeAcquisition 类型获取

类型获取仅对 JavaScript 项目很重要,在 TypeScript 项目中，您需要在项目中明确包含类型。但是，对于 JavaScript 项目，TypeScript 工具将在后台和 node_modules 文件夹外部下载模块的类型。

### enable

提供用于禁用 JavaScript 项目中的类型获取的配置

### include

如果您有一个 JavaScript 项目，其中 TypeScript 需要其他指导以了解全局依赖性，或者已通过 disableFilenameBasedTypeAcquisition 禁用了内置推断。

```json
{
  "typeAcquisition": {
    "include": ["jquery"]
  }
}
```

### exclude

提供一个配置，以禁用 JavaScript 项目中某个模块的类型获取。

```json
{
  "typeAcquisition": {
    "exclude": ["jest", "mocha"]
  }
}
```

###

disableFilenameBasedTypeAcquisition

TypeScript 的类型获取可以根据项目中的文件名推断应添加哪些类型。这意味着在您的项目中拥有 jquery.js 之类的文件会自动从 DefinitelyTyped 下载 JQuery 的类型。

```json
{
  "typeAcquisition": {
    "disableFilenameBasedTypeAcquisition": true
  }
}
```
