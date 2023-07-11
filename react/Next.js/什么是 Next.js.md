# 简介

Next.js 是一个用于构建 Web 应用程序的框架。

借助 Next.js，您可以使用 React 组件构建用户界面。然后，Next.js 为您的应用程序提供额外的结构、功能和优化。

在底层，Next.js 还为您抽象并自动配置工具，例如捆绑、编译等。这使您可以专注于构建应用程序，而不是花时间设置工具。

无论您是个人开发人员还是大型团队的一员，Next.js 都可以帮助您构建交互式、动态且快速的 Web 应用程序。

## 特色

* 基于文件系统的路由器构建在服务器组件之上，支持布局、嵌套路由、加载状态、错误处理等。
* 使用客户端和服务器组件进行客户端和服务器端渲染。使用 Next.js 在服务器上进一步优化静态和动态渲染。在 Edge 和 Node.js 运行时上进行流式传输。
* 通过 React 组件中的异步/等待支持以及fetch()与 React 和 Web 平台保持一致的 API，简化了数据获取。
* 支持您喜欢的样式方法，包括 CSS 模块、Tailwind CSS 和 CSS-in-JS
* 图像、字体和脚本优化，以改善应用程序的核心网络生命和用户体验。
* 改进了对 TypeScript 的支持，提供更好的类型检查和更高效的编译，以及自定义 TypeScript 插件和类型检查器。

## 服务器组件

* React 服务器组件引入了一种新的思维模型，用于构建利用服务器和客户端的混合应用程序。
* React 现在使您可以根据组件的用途灵活地选择在何处渲染组件，而不是在客户端渲染整个应用程序（例如在单页应用程序的情况下）。

优点

* 服务器组件允许开发人员更好地利用服务器基础设施。
* 数据获取移至`更靠近数据库的服务器`，并保留以前会影响服务器上客户端 JavaScript 包大小的较大依赖项，从而提高性能。服务器组件使编写 React 应用程序的感觉类似于 PHP 或 Ruby on Rails，但具有 React 的强大功能和灵活性以及用于模板化 UI 的组件模型。
* 初始页面加载`速度更快`，并且客户端 JavaScript 包大小减小。
* 加载路由时，初始 HTML 将在服务器上呈现。优化SEO

## 客户端组件

* 客户端组件使您能够向应用程序添加客户端交互性。
* 'use client' 指令

```js
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

```

## 何时使用

你需要做什么？| 服务器组件 | 客户端组件
---------|----------|---------
获取数据。  | y |n
访问后端资源（直接） | y |n
在服务器上保留敏感信息（访问令牌、API 密钥等） | y |n
保持对服务器的大量依赖/减少客户端 JavaScript | y |n
添加交互性和事件侦听器（onClick()、onChange()等） |n|y
使用状态和生命周期效果（useState()、useReducer()、useEffect()等） |n|y
使用仅限浏览器的 API |n|y
使用依赖于状态、效果或仅限浏览器的 API 的自定义挂钩  |n|y
使用React 类组件 |n|y
  
## 组合客户端和服务器组件

### 将客户端组件嵌套在服务器组件内

### 将服务器组件嵌套在客户端组件内

* 将服务器组件导入客户端组件存在限制，因为这种方法需要额外的服务器往返。
* `不支持的模式：将服务器组件导入客户端组件`
* `推荐模式：将服务器组件作为 Props 传递给客户端组件`

### 第三方包

* 将依赖于仅客户端功能的第三方组件包装在您自己的客户端组件中

```js
'use client'
 
import { Carousel } from 'acme-carousel'
 
export default Carousel
```
