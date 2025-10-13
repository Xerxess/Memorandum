<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Deno、Node.js 和 Bun](#deno-nodejs-和-bun)
  - [Node.js](#nodejs)
  - [Deno](#deno)
    - [框架](#框架)
      - [Fresh](#fresh)
  - [Bun](#bun)

<!-- /code_chunk_output -->


# Deno、Node.js 和 Bun

## Node.js

优点:

- Node.js （2009）
- Node.js 轻量级，非常适合在分布式平台上运行的数据密集型、可扩展和实时 Web 应用程序、事件驱动架构和异步 I/O 功能。
- Node 基于 V8 JavaScript 引擎构建
- NPM 包管理器
- 跨平台兼容性，您可以在 macOS、Linux 和 Windows 上的任何位置运行 Node.js
- Node.js 拥有庞大的生态系统，包含各种各样的库、框架和工具，可以更轻松地开发 Web 应用程序和 API
- 依赖文件 package.json
- 支持模块 支持 CommonJS 和 ES 模块 （需要 .mjs 扩展名，在 package.json 中设置模块类型，以及命令行标志）

缺点：

- Node 并不适合视频编码或机器学习等计算量大的任务

## Deno

优点:

- Deno （2018）
- Deno 基于 V8 JavaScript 引擎构建
- JavaScript、 TypeScript 和 WebAssembly 的运行时
- Deno 默认是安全的。Deno 程序无法访问文件系统、网络等——你需要通过权限标志明确启用这些权限。Deno 的权限标志也扩展到了其依赖项
- Deno 本身就能理解 TypeScript 代码，无需设置第三方编译器
- Deno 的最新模块系统将利用 ES 模块 不支持 CommonJS （Deno 2 现在支持 CommonJS）
- 去中心化模块托管,没有专用的包管理器；使用直接 URL、导入映射和 JSR
- 依赖文件 deno.json 也可使用package.json

缺点:

- 社区支持较少，生态系统也相对小得多
- 多核功能的利用有限

### 框架

#### Fresh

- Fresh 是一个基于 Web 标准构建的小型、快速且可扩展的全栈 Web 框架。它旨在构建高质量、高性能且个性化的 Web 应用程序。
- Fresh 非常适合主要由服务器呈现的网站和应用程序，例如主页、电子商务商店或 GitHub 或 Bluesky 之类的网站和应用程序。
- Fresh 不合适构建单页应用程序
- Fresh 通常部署在 Deno Deploy 上，只需单击一下即可部署，并且具有与指标等的开箱即用的集成。
- Fresh 通过 Deno 手动部署到任何平台

## Bun

优点:

- Bun （2022）
- 使用 JavaScriptCore 而不是像 Node 和 Deno 那样的 V8
- 启动时间和执行时间都很快
- 占用更少的内存，这意味着你可以在手机、智能手表等设备上更经济高效地运行应用程序
- 内置对 TypeScript 和 JSX 的支持
- 更快的软件包安装,使用与 Node.js 兼容的包管理器
- 依赖文件 package.json
- 支持 CommonJS 和 ES 模块

缺点:

- TypeScript 从技术上来说并非原生的。你仍然需要将其编译为 JavaScript，然后使用 Webkit 等其他工具来运行它
