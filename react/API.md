<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [API](#api)
  - [act](#act)
  - [cache](#cache)
  - [createContext *](#createcontext-)
  - [lazy *](#lazy-)
  - [memo *](#memo-)
  - [startTransition *](#starttransition-)
  - [use *](#use-)

<!-- /code_chunk_output -->

# API

## act

act 是一个测试助手，用于在做出断言之前应用待处理的 React 更新

```tsx
await act(async actFn)
```

## cache

- cache 仅供与 React 服务器组件 一起使用
- cache 仅在 React 的 Canary 和 experimental 渠道中可用。在将 cache 用于生产环境之前，请确保了解其限制。查看此处了解有关 React 发布渠道的更多信息

```tsx
import {cache} from 'react';
import calculateUserMetrics from 'lib/user';

const getUserMetrics = cache(calculateUserMetrics);

function Profile({user}) {
  const metrics = getUserMetrics(user);
  // ...
}

function TeamReport({users}) {
  for (let user in users) {
    const metrics = getUserMetrics(user);
    // ...
  }
  // ...
}
```

## createContext *

- 使用 createContext 创建组件能够提供与读取的 上下文（context）。
- 配合useContext()使用

```tsx
const SomeContext = createContext(defaultValue)
```

```tsx
const SomeContext = createContext(defaultValue)
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```

## lazy *

- lazy 能够让你在组件第一次被渲染之前`延迟加载组件的代码`
- lazy总是在模块的顶层声明它们

```tsx
// load: 一个返回 Promise 或另一个 thenable（具有 then 方法的类 Promise 对象）的函数。React 不会在你尝试首次渲染返回的组件之前调用 load 函数。在 React 首次调用 load 后，它将等待其解析，然后将解析值的 .default 渲染为 React 组件。返回的 Promise 和 Promise 的解析值都将被缓存，因此 React 不会多次调用 load 函数。如果 Promise 被拒绝，则 React 将抛出拒绝原因给最近的错误边界处理。
// 返回一个 React 组件，你可以在 fiber 树中渲染。当懒加载组件的代码仍在加载时，尝试渲染它将会处于 暂停 状态。使用 <Suspense> 可以在其加载时显示一个正在加载的提示
const SomeComponent = lazy(load)
```

```tsx
import { lazy } from 'react';
// lazy总是在模块的顶层声明它们
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

function App(){
  return (
    <MarkdownPreview/>
  )
}

//// 错误展示
function Editor() {
  // ~！这将导致在重新渲染时重置所有状态
  const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
  // ...
}
```

## memo *

- memo 允许你的组件在 props 没有改变的情况下跳过重新渲染。
- 当 props 没有改变时跳过重新渲染
- 记忆化只与从父组件传递给组件的 props 有关
- 通常需要在 memo 中同时使用 useMemo 和 useCallback
- 最小化 props 的变化 使用 useMemo 避免父组件每次都重新对象
- 使用的 context 发生变化时，它仍将重新渲染,外层组件中从 context 中读取所需内容，并将其作为 props 传递给记忆化的子组件

```tsx
// Component：要进行记忆化的组件。
// 可选参数 arePropsEqual：一个函数，接受两个参数：组件的前一个 props 和新的 props。如果旧的和新的 props 相等，即组件使用新的 props 渲染的输出和表现与旧的 props 完全相同，则它应该返回 true。否则返回 false。通常情况下，你不需要指定此函数。默认情况下，React 将使用 Object.is 比较每个 prop。
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

```tsx
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

```tsx
// 指定自定义比较函数 
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return bool;
}
```

## startTransition *

- startTransition 可以让你在后台渲染 UI 的一部分
- startTransition 没有提供一种跟踪 Transition 是否处于待定状态的方法
- 只有当你能访问某个 state 的 set 函数时，你才能将它的更新包裹到 Transition 中。如果你想根据 props 或自定义 Hook 的返回值来启动一个 transition，请尝试使用 useDeferredValue
- Transition 更新不能用于控制文本输入
- 多个正在进行的 transition，目前 React 会将它们集中在一起处理
- startTransition 与 useTransition 非常相似，但它不提供 isPending 标志来跟踪一个 Transition 是否正在进行。你可以在 useTransition 不可用时调用 startTransition。例如，在组件外部（如从数据库中）使用 startTransition。

```tsx
startTransition(action)
```

```tsx
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

## use *

- use 是一个 React API，它可以让你读取类似于 Promise 或 context 的资源的值
- 可以在循环和条件语句（如 if）中调用 use。需要注意，调用 use 的函数仍然必须是一个组件或 Hook
- 使用 Promise 调用 use API 时，它会与 Suspense 和 错误边界 集成
- 在 `服务器组件` 中获取数据时，应优先使用 async 和 await 而不是 use。async 和 await 会从调用 `await 的点开始`渲染，而 use 会在`数据获取到后`重新渲染组件。

```tsx
// resource：想要从中读取值的数据源。资源可以是 Promise 或 context
// 返回从资源中读取的值，类似于 fullfilled Promise 或 context
const value = use(resource);
```

```tsx
// 使用 use 读取 context
// 当 context 被传递给 use 时，它的工作方式类似于useContext。而 useContext 必须在组件的顶层调用，use 可以在条件语句如 if 和循环如 for 内调用。相比之下，use 比 useContext更加灵活。
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}s
```
