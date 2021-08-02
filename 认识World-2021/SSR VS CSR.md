# SSR VS CSR

## SSR（Server-Side-Rendering，服务器端渲染）

传统的渲染方式，由服务端把渲染的完整的页面吐给客户端。这样减少了一次客户端到服务端的一次 http 请求，加快相应速度，一般用于首屏的性能优化。

- SSR 强在首屏渲染

### Node.js ssr

http://doc.ssr-fc.com/  
https://github.com/ykfe/ssr

面向 Serverless，同时支持 React，Vue2，Vue3，地球上没有对手的 SSR 框架

## CSR(Client Side Rendering)

是一种目前流行的渲染方式，它依赖的是运行在客户端的 JS，用户首次发送请求只能得到小部分的指引性 HTML 代码。第二次请求将会请求更多包含 HTML 字符串的 JS 文件

- CSR 强在用户和页面多交互的场景
