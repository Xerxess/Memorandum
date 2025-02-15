<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [react-dom@19](#react-dom19)
  - [API](#api)
    - [createPortal *](#createportal-)
    - [flushSync](#flushsync)
    - [preconnect](#preconnect)
    - [prefetchDNS](#prefetchdns)
    - [preinit](#preinit)
    - [preinitModule](#preinitmodule)
    - [preload](#preload)
    - [preloadModule](#preloadmodule)
  - [客户端 API](#客户端-api)
    - [createRoot *](#createroot-)
    - [hydrateRoot](#hydrateroot)
  - [服务端 API](#服务端-api)
    - [renderToPipeableStream *](#rendertopipeablestream-)
    - [renderToReadableStream *](#rendertoreadablestream-)
    - [renderToStaticMarkup](#rendertostaticmarkup)
    - [renderToString](#rendertostring)
      - [浏览器中将某个组件渲染为 HTML](#浏览器中将某个组件渲染为-html)
      - [renderToString 与 prerender 与 prerenderToNodeStream](#rendertostring-与-prerender-与-prerendertonodestream)
  - [Static APIs](#static-apis)
    - [prerender](#prerender)
      - [prerender 与 renderToReadableStream](#prerender-与-rendertoreadablestream)
    - [prerenderToNodeStream](#prerendertonodestream)
      - [prerenderToNodeStream 与 renderToPipeableStream](#prerendertonodestream-与-rendertopipeablestream)

<!-- /code_chunk_output -->

# react-dom@19

## API

### createPortal *

- createPortal 允许你将 JSX 作为 children 渲染至 DOM 的不同部分
- portal 中的事件传播遵循 React 树而不是 DOM 树
- 使用 portal 渲染模态对话框

```tsx
// children：React 可以渲染的任何内容，如 JSX 片段（<div /> 或 <SomeComponent /> 等等）、Fragment（<>...</>）、字符串或数字，以及这些内容构成的数组
// domNode：某个已经存在的 DOM 节点，例如由 document.getElementById() 返回的节点。在更新过程中传递不同的 DOM 节点将导致 portal 内容被重建
// 可选参数 key：用作 portal key 的独特字符串或数字
<div>
  <SomeComponent />
  {createPortal(children, domNode, key?)}
</div>
```

```tsx
import { createPortal } from 'react-dom';

export default function MyComponent() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>这个子节点被放置在父节点 div 中。</p>
      {createPortal(
        <p>这个子节点被放置在 document body 中。</p>,
        document.body
      )}
    </div>
  );
}

```

### flushSync

- flushSync 允许你强制 React 在提供的回调函数内同步刷新任何更新，这将确保 DOM 立即更新
- 使用 flushSync 是不常见的行为，并且可能损伤应用程序的性能

```tsx
flushSync(callback)
```

### preconnect

- preconnect 可以帮助提前连接到一个期望从中加载资源的服务器

```tsx
preconnect("https://example.com");
```

### prefetchDNS

- prefetchDNS 允许提前查找期望从中加载资源的服务器的 IP

```tsx
prefetchDNS("https://example.com");
```

### preinit

- 基于 React 的框架 通常会内置资源处理方案，因此你可能不必手动调用此 API。请查阅框架文档以获取详细信息。
- preinit 可以预获取和评估样式表或外部脚本

```tsx
preinit("https://example.com/script.js", {as: "script"});
```

### preinitModule

- 基于 React 的框架 通常会内置资源处理方案，因此你可能不必手动调用此 API。请查阅框架文档以获取详细信息。
- preinitModule 可以预获取和评估 ESM 模块

```tsx
preinitModule("https://example.com/module.js", {as: "script"});
```

### preload

- 基于 React 的框架 通常会内置资源处理方案，因此你可能不必手动调用此 API。请查阅框架文档以获取详细信息。
- preload 可以预获取期望使用的资源，比如样式表、字体或外部脚本。

```tsx
preload("https://example.com/font.woff2", {as: "font"});
```

### preloadModule

- 基于 React 的框架 通常会内置资源处理方案，因此你可能不必手动调用此 API。请查阅框架文档以获取详细信息。
- preloadModule 可以急切地预获取期望使用的 ESM 模块

```tsx
preloadModule("https://example.com/module.js", {as: "script"});
```

## 客户端 API

### createRoot *

- createRoot 允许在浏览器的 DOM 节点中创建根节点以显示 React 组件

```tsx
const root = createRoot(domNode, options?)
```

### hydrateRoot

- hydrateRoot 函数允许你在先前由 react-dom/server 生成的浏览器 HTML DOM 节点中展示 React 组件。
- React 将会连接到内部有 domNode 的 HTML 上，然后接管其中的 domNode。一个完全由 React 构建的应用只会在其根组件中调用一次 hydrateRoot 方法

```tsx
// domNode：一个在服务器端渲染时呈现为根元素的 DOM 元素
// reactNode：用于渲染已存在 HTML 的“React 节点”。这个节点通常是一些类似于 <App /> 的 JSX，它会在 ReactDOM Server 端使用类似于 renderToPipeableStream(<App />) 的方法进行渲染。
const root = hydrateRoot(domNode, reactNode, options?)
```

## 服务端 API

### renderToPipeableStream *

- renderToPipeableStream 将一个 React 组件树渲染为管道化（pipeable）的 Node.js 流
- 这个 API 是专供 Node.js 使用的。像 Deno 这类可以支持 Web 流 的新式非主流运行时环境，应该使用另一个 API renderToReadableStream。

```tsx
// reactNode：想要将其渲染为 HTML 的 React 节点，比如像 <App /> 这样的 JSX 元素。这样做意味着整个页面文档都将被渲染，所以这里提到的 App 组件将渲染 <html> 标签.
// 返回一个包含了两个方法的对象
// pipe 将一段 HTML 输出到 Node.js 可写流中。如果你想启用流式传输，那么可以在 onShellReady 中调用 pipe；如果要做爬虫和静态内容生成的话，那么可以在 onAllReady 中调用它。
// abort 使你 终止服务端渲染 然后在客户端渲染未处理的部分
const { pipe, abort } = renderToPipeableStream(reactNode, options?)
```

```tsx
import { renderToPipeableStream } from 'react-dom/server';
// 路由的具体语法由你所使用的后端技术决定
app.use('/', (request, response) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/main.js'],
    onShellReady() {
      response.setHeader('content-type', 'text/html');
      pipe(response);
    }
  });
});
```

### renderToReadableStream *

- renderToReadableStream 将 React 树渲染后发送至 Web 可读流
- API 依赖 Web 流，因此在 Node.js 中使用 renderToPipeableStream 代替

```tsx
// reactNode：要渲染为 HTML 的 React 节点。例如，类似 <App /> 的 JSX 元素。它应该表示整个文档，因此 App 组件应该渲染 <html> 标签。
// renderToReadableStream 返回一个 Promise
// 如果渲染 shell 成功，那么 Promise 将 resolve Web 可读流。
// 如果渲染 shell 失败，Promise 将 reject。使用这个输出后备 shell 。
const stream = await renderToReadableStream(reactNode, options?)
```

```tsx
import { renderToReadableStream } from 'react-dom/server';

async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

### renderToStaticMarkup

renderToStaticMarkup 会将非交互的 React 组件树渲染成 HTML 字符串

```tsx
// reactNode：您想要呈现为 HTML 的 React 节点。例如，像 <Page /> 这样的 JSX 节点。 
// 可选选项：用于服务器渲染的对象。
const html = renderToStaticMarkup(reactNode, options?)
```

```tsx
import { renderToStaticMarkup } from 'react-dom/server';

const html = renderToStaticMarkup(<Page />);
```

### renderToString

- renderToString 将 React 树渲染为一个 HTML 字符串
- renderToString 不支持流式传输或等待数据
- renderToString 可以在浏览器中工作，但 不推荐 在客户端代码中使用它
- 在服务器，调用 renderToString 将你的应用渲染为 HTML 调用 hydrateRoot 来使服务器生成的 HTML 具有交互性
- renderToString 不完全支持 Suspense

```tsx
// reactNode：你要渲染为 HTML 的 React 节点。例如，一个 JSX 节点，就像 <App />。
const html = renderToString(reactNode, options?)
```

```tsx
// 将 React 树渲染为 HTML 字符串
// React 组件的初始非交互式 HTML 输出。在客户端上，你需要调用 hydrateRoot 来将服务器生成的 HTML 进行激活处理，使其具有交互功能。
import { renderToString } from 'react-dom/server';

// 路由处理程序的语法取决于你使用的后端框架
app.use('/', (request, response) => {
  const html = renderToString(<App />);
  response.send(html);
});
```

#### 浏览器中将某个组件渲染为 HTML

```tsx
// flushSync 必须调用同步渲染获取html
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

const div = document.createElement('div');
const root = createRoot(div);
flushSync(() => {
  root.render(<MyIcon />);
});
console.log(div.innerHTML); // 例如，"<svg>...</svg>"
```

#### renderToString 与 prerender 与 prerenderToNodeStream

- renderToString 组件挂起（例如，因为它使用 lazy 定义或获取数据），renderToString 将不会等待其内容解析
- prerender 、 prerenderToNodeStream  与 RendertoString 不同，Prerender在解决之前等待所有数据加载。这使其适合为整页生成静态HTML，包括需要使用悬念获取的数据

## Static APIs

### prerender

- prerender 使用 Web Stream 将 React 树渲染为静态 HTML 字符串。
- hydrateRoot 来合并服务器生成的 HTML 并使其具有交互性
- 静态Prerender API用于静态服务器端生成（SSG）。与RendertoString不同，Prerender在解决之前等待所有数据加载。这使其适合为整页生成静态HTML，包括需要使用悬念获取的数据

```tsx
const {prelude} = await prerender(reactNode, options?)
```

#### prerender 与 renderToReadableStream

- prerender 不支持流式传输内容，它是为预先生成静态站点（SSG）而设计的
- renderToReadableStream 支持流式传输内容

### prerenderToNodeStream

- prerenderToNodeStream 使用 Node.js Stream 将 React 树渲染为静态 HTML 字符串
- prerenderToNodeStream 响应等待整个应用程序完成渲染，包括等待所有悬念边界解决，然后再解决。它专为提前生成静态站点（SSG）而设计，不支持在加载时流式传输更多内容。
- hydrateRoot 来合并服务器生成的 HTML 并使其具有交互性

```tsx
const {prelude} = await prerenderToNodeStream(reactNode, options?)
```

```tsx
import { prerenderToNodeStream } from 'react-dom/static';

// The route handler syntax depends on your backend framework
app.use('/', async (request, response) => {
  const { prelude } = await prerenderToNodeStream(<App />, {
    bootstrapScripts: ['/main.js'],
  });

  response.setHeader('Content-Type', 'text/plain');
  prelude.pipe(response);
});
```

#### prerenderToNodeStream 与 renderToPipeableStream

- prerenderToNodeStream 更适合简单的服务器渲染场景，而 renderToPipeableStream 则适合复杂的应用，特别是那些使用 React 的 Suspense 和并发特性。
- renderToPipeableStream 提供了更多的控制选项，可以在渲染完成后执行特定操作（如设置响应头），而 prerenderToNodeStream 更加直接。
- prerenderToNodeStream 不支持流式传输内容，它是为预先生成静态站点（SSG）而设计的
- renderToPipeableStream 支持流式传输内容
