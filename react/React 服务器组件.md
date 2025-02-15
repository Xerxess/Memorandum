<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [React 服务器组件](#react-服务器组件)
  - [服务器组件返回的可序列化类型](#服务器组件返回的可序列化类型)
- [服务器函数](#服务器函数)
- [指令](#指令)
  - [“use client”](#use-client)
    - [使用第三方库](#使用第三方库)
  - ['use server'](#use-server)

<!-- /code_chunk_output -->

# React 服务器组件

服务器组件是一种新型的组件，它在打包之前，在独立于客户端应用程序或 SSR 服务器的环境中提前渲染。

- 服务器组件的优势：
  - 服务器组件可以减少客户端发送和运行的代码量。只有客户端模块会被客户端捆绑和评估。
  - 服务器组件受益于在服务器上运行。它们可以访问本地文件系统，并且可能在数据获取和网络请求方面具有低延迟。
- 服务器组件的局限性
  - 服务器组件不支持交互，因为事件处理程序必须由客户端注册和触发
  - 服务器组件不能使用大多数 Hook

## 服务器组件返回的可序列化类型

- 服务器组件传递到客户端组件的 prop 值必须是可序列化
- 支持：
  - 字符串 (string)
  - 数字 (number)
  - 大整数 (bigint)
  - 布尔值 (boolean)
  - 未定义 (undefined)
  - 空值 (null)
  - 日期 (Date)
  - 普通 对象
  - 服务器函数
  - 客户端或服务器组件元素 (JSX)
  - Promise
- 不支持：
  - 函数
  - 类 (Classes)
  - 任何类的实例对象

# 服务器函数

服务器函数允许客户端组件调用在服务器上执行的异步函数

```tsx
// 当 React 渲染EmptyNote服务器函数时，它将创建对createNoteAction函数的引用，并将该引用传递给Button客户端组件。单击按钮时，React 将向服务器发送请求以使用提供的引用执行createNoteAction函数

// Client Component
"use client";
export default function Button({onClick}) { 
  console.log(onClick); 
  return <button onClick={() => onClick()}>Create Empty Note</button>
}


// Server Component
import Button from './Button';

function EmptyNote () {
  async function createNoteAction() {
    // Server Function
    'use server';
    await db.notes.create();
  }
  return <Button onClick={createNoteAction}/>;
}
```

```tsx
// 从客户端组件导入服务器函数
// 客户端组件可以从使用"use server"指令的文件中导入服务器函数
"use server";
export async function createNote() {
  await db.notes.create();
}

// 当打包器构建EmptyNote客户端组件时，它将创建一个指向包中createNoteAction函数的引用。当单击button时，React将向服务器发送请求，以使用提供的引用执行createNoteAction函数
"use client";
import {createNote} from './actions';
function EmptyNote() {
  console.log(createNote);
  <button onClick={() => createNote()} />
}
```

# 指令

## “use client”

- 'use client'  允许你标记在客户端运行的代码
- 'use client' 必须位于文件的开头
- 在文件顶部添加 'use client'  来标记模块及其传递依赖项为客户端代码
- 服务器组件导入用 'use client' 标记的文件时，`打包器` 将该模块导入视为服务器运行代码和客户端运行代码之间的边界
- 构建具有交互性和状态的组件 需要标记 'use client'

```tsx
'use client';
export default function Demo() {
}
```

### 使用第三方库

库可能依赖于组件 Hook 或客户端 API。使用以下任何 React API 的第三方组件必须在客户端运行 即标记 'use client'

- createContext
- react 和 react-dom Hooks，不包括 use 和 useId
- forwardRef
- memo
- startTransition
- 如果它们使用客户端 API，例如 DOM 插入或原生平台视图

## 'use server'

- 'use server' 用于标记服务器端函数，这些函数可以从客户端代码调用。
- 当在客户端调用服务器函数时，它将向服务器发出网络请求，其中包含传递的任何参数的序列化副本。如果服务器函数返回一个值，则该值将被序列化并返回给客户端。
- 无需使用'use server'单独标记函数，您可以将指令添加到文件的顶部，以将该文件中所有导出的内容标记为可以在任何地方使用的服务器函数，包括在客户端代码中导入。
- 读取服务器函数的返回值，您需要 await 返回的 Promise

```tsx
async function fn(data) {
  'use server';
  // ...
}
```

```tsx
'use server';

async function fn(data) {
  // ...
}

async function fn2(data) {
  // ...
}
```
