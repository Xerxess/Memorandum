<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Hook](#hook)
- [Hook 使用规则](#hook-使用规则)
- [自定义 Hook](#自定义-hook)
- [useState *](#usestate-)
  - [惰性初始 state](#惰性初始-state)
  - [setState 两种用法](#setstate-两种用法)
- [useEffect *](#useeffect-)
  - [为什么每次更新的时候都要运行 Effect](#为什么每次更新的时候都要运行-effect)
  - [effect 的条件执行 useEffect 第二个参数使用](#effect-的条件执行-useeffect-第二个参数使用)
- [useContext *](#usecontext-)
  - [传递对象和函数时优化重新渲染](#传递对象和函数时优化重新渲染)
- [useReducer](#usereducer)
- [useCallback](#usecallback)
  - [常见问题](#常见问题)
    - [useCallback 都返回了完全不同的函数](#usecallback-都返回了完全不同的函数)
- [useMemo *](#usememo-)
- [useRef *](#useref-)
- [useImperativeHandle *](#useimperativehandle-)
- [useLayoutEffect](#uselayouteffect)
- [useDebugValue](#usedebugvalue)
- [useDeferredValue](#usedeferredvalue)
  - [useDeferredValue与防抖(Debouncing)和节流(Throttling)之间有什么不同](#usedeferredvalue与防抖debouncing和节流throttling之间有什么不同)
- [useTransition](#usetransition)
- [useId](#useid)
- [运用](#运用)
  - [如何避免向下传递回调？](#如何避免向下传递回调)
  - [如何从 useCallback 读取一个经常变化的值](#如何从-usecallback-读取一个经常变化的值)
- [useActionState](#useactionstate)
- [useOptimistic](#useoptimistic)
- [useReducer *](#usereducer-)
- [useSyncExternalStore](#usesyncexternalstore)
- [useTransition](#usetransition-1)

<!-- /code_chunk_output -->

# Hook

- Hook 是 React 16.8 的新增特性。在不编写 class 的情况下使用 state 以及其他的 React 特性
- `Hook 无法在 class 组件中使用`
- Hook 是一种复用状态逻辑的方式，它不复用 state 本身。Hook 的每次调用都有一个完全独立的 state

# Hook 使用规则

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件（自定义 Hook）中调用 Hook，，不要在其他 JavaScript 函数中调用。

# 自定义 Hook

- 自定义 Hook 更像是一种约定而不是功能。
- 函数的名字以 “use” 开头 ‘useSomething’
- 可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器
- 在多个 Hook 之间传递信息

# useState *

- 类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

```js
// 声明一个叫 “count” 的 state 变量。
const [count, setCount] = useState(0);

// 声明多个 state 变量
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
```

## 惰性初始 state

- 初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

```

## setState 两种用法

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

```

# useEffect *

- useEffect 是一个 React Hook，它允许你 将组件与外部系统同步
- 有些组件需要与网络、某些浏览器 API 或第三方库保持连接，当它们显示在页面上时。这些系统不受 React 控制，所以称为外部系统
- 在开发环境下，如果开启严格模式，React 会在实际运行 setup 之前额外运行一次 setup 和 cleanup。  setup → cleanup → setup
- 在调用第三方地图，如高德，或作第三方dom库时都应考虑useEffect 来实现同步操作api
- 使用 Effect 来为组件请求数据 考虑useEffect

```tsx
// 一个 setup 函数 ，其 setup 代码 用来连接到该系统。
// setup 函数返回一个 清理函数（cleanup），其 cleanup 代码 用来与该系统断开连接。
// dependencies? 依赖项列表，包括这些函数使用的每个组件内的值。为[]空数组即组件挂载时执行一下
useEffect(setup, dependencies?)
```

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js'; // demo 

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
}
```

## 为什么每次更新的时候都要运行 Effect

- 官网举例人员在线状态订阅，如果人员在线状态变跟，需要配合 componentDidUpdate 处理更新状态
- Effect 不需要特定的代码来处理更新逻辑，因为 useEffect 默认就会处理。它会在调用一个`新的 effect 之前对前一个 effect 进行清理`。

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

## effect 的条件执行 useEffect 第二个参数使用

- 某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数

```js
// 仅在 count 更改时更新
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

# useContext *

上下文帮助组件 从祖先组件接收信息，而无需将其作为 props 传递。例如，应用程序的顶层组件可以借助上下文将 UI 主题传递给所有下方的组件，无论这些组件层级有多深。

接收一个 context 对象（createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

```js
const SomeContext = createContext(data:any);
const value = useContext(SomeContext)

<SomeContext.Provider value={{}}>
    ....
</SomeContext.Provider>
```

```tsx
import { useContext,createContext } from 'react';

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

// 创建context
const ThemeContext = createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 使用useContext
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 传递对象和函数时优化重新渲染

- 使用 useCallback  , useMemo 中

```tsx
import { useCallback, useMemo } from 'react';

function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Page />
    </AuthContext.Provider>
  );
}
```

# useReducer

`useState` 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

# useCallback

- 一个允许你在多次渲染中缓存函数的 React Hook
- 返回一个 memoized 回调函数
- memoized 函数实现原理：使用一组参数初次调用函数时，缓存参数和计算结果，当再次使用相同的参数调用该函数时，直接返回相应的缓存结果。
- 常与 memo 一起使用
- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
- useMemo 经常与 useCallback 一同出现
  - useMemo 缓存函数调用的结果
  - useCallback 缓存函数本身

```tsx
// fn：想要缓存的函数。此函数可以接受任何参数并且返回任何值。React 不会调用此函数，而是返回此函数。你可以自己决定何时调用以及是否调用。
// dependencies：有关是否更新 fn 的所有响应式值的一个列表。响应式值包括 props、state，和所有在你组件内部直接声明的变量和函数。
// 初次渲染时，React 将把函数返回给你（而不是调用它！）。当进行下一次渲染时，如果 dependencies 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。
const cachedFn = useCallback(fn, dependencies)
```

```tsx
import { useCallback } from 'react';

function ProductPage({ ag1, ag2 }) {
  const handleSubmit = useCallback((age) => {
    console.log('...')
    );
  }, [ag1, ag2]);
```

## 常见问题

### useCallback 都返回了完全不同的函数

- 确保你已经将依赖数组指定为第二个参数

```tsx
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
  }); // 🔴 每一次都返回一个新函数：没有依赖项数组
  // ...
```

# useMemo *

- useMemo 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。
- 这种缓存返回值的方式也叫做 记忆化（memoization），这也是该 Hook 叫做 useMemo
- 结合 memo 跳过组件的重新渲染
- 防止过于频繁地触发 Effect
- 记忆一个函数（返回另一个函数） 其实就是 useCallback

```tsx
// calculateValue：要缓存计算值的函数。
// dependencies：所有在 calculateValue 函数中使用的响应式变量组成的数组。
const cachedValue = useMemo(calculateValue, dependencies)
```

```tsx
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...所以只要这些依赖项不变...
  );

  return (
    <div className={theme}>
      <List items={visibleTodos} />
    </div>
  );
}
```

# useRef *

- useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
- 返回的 ref 对象在组件的`整个生命周期内持续存在`。
- useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式
- useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

# useImperativeHandle *

- useImperativeHandle 是 React 中的一个 Hook，它能让你自定义由 ref 暴露出来的句柄
- useRef 配合使用
- 暴露你自己的命令式方法

```js
// ref：该 ref 是你从 MyInput 组件的 prop 中提取的参数
// createHandle：该函数无需参数，它返回你想要暴露的 ref 的句柄。该句柄可以包含任何类型。通常，你会返回一个包含你想暴露的方法的对象。
// 可选的 dependencies：函数 createHandle 代码中所用到的所有反应式的值的列表。
useImperativeHandle(ref, createHandle, dependencies?)
```

```tsx
function MyInput({ ref }) {
  return <input ref={ref} />;
};

function App(){
  const ref = useRef(null)
  function onButtonClick(){
    ref.current.focus();
  }
  return (
    <MyInput ref={ref}></MyIpunt>
    <button onClick={onButtonClick}>Focus the input</button>
  )
}
```

```tsx
import { useImperativeHandle,useRef } from 'react';

function MyInput({ ref }) {
  // 定义useImperativeHandle
  useImperativeHandle(ref, () => {
    return {
      myAction(){console.log('action')}
      // ... 你的方法 ...
    };
  }, []);


function App(){
  const ref = useRef(null)
  function handlerClick=function(){
    // 调用暴露myAction方法
    ref.current.myAction()
  }
  return (
    <>
    <MyInput ref={ref}></MyInput>
    <button onClick=""></button>
    </>
  )
}
```

# useLayoutEffect

- useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发
- useLayoutEffect 可能会影响性能。尽可能使用 useEffect
- 经典场景tooltip的大小，在浏览器重新绘制屏幕前计算布局

```tsx
// setup：处理副作用的函数。
// 可选 dependencies：setup 代码中引用的所有响应式值的列表。
useLayoutEffect(setup, dependencies?)
```

```tsx
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0); // 你还不知道真正的高度

  // 在浏览器重新绘制屏幕前计算布局
  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height); // 现在重新渲染，你知道了真实的高度
  }, []);

  // 此时 tooltipHeight 的值已经知道了，因为重新绘制屏幕前计算的
  // ... 在下方的渲染逻辑中使用 tooltipHeight ...


  // useEffect(() => {
  //   const { height } = ref.current.getBoundingClientRect();
  //   setTooltipHeight(height); // 现在重新渲染，你知道了真实的高度
  // }, []);
  // useEffect 代替 useLayoutEffect 则可能无值，需要渲染后才知道
  // useEffect 内部的状态更新之前让浏览器绘制屏幕
}
```

# useDebugValue

- useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

# useDeferredValue

useDeferredValue 是一个 React Hook，可以让你延迟更新 UI 的某些部分。

useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。如果当前渲染是一个紧急更新的结果，比如用户输入，React 将返回之前的值，然后在紧急渲染完成后渲染新的值。

React 首先会在不更新延迟值的情况下进行重新渲染，然后在后台尝试使用新接收到的值进行重新渲染。

```js
// value: 你想延迟的值，可以是任何类型
// 可选的 initialValue: 组件初始渲染时使用的值。如果省略此选项，useDeferredValue 在初始渲染期间不会延迟，因为没有以前的版本可以渲染。
const deferredValue = useDeferredValue(value, initialValue?)
```

```tsx
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

## useDeferredValue与防抖(Debouncing)和节流(Throttling)之间有什么不同

- 防抖(Debouncing) 是指在用户停止输入一段时间（例如一秒钟）之后再更新列表。
- 节流(Throttling) 是指每隔一段时间（例如最多每秒一次）更新列表。
- useDeferredValue 更适合优化渲染，与 React 自身深度集成

# useTransition

- 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。

```js
const [isPending, startTransition] = useTransition();
```

```js
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    })
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

# useId

- useId 是一个 React Hook，可以生成传递给无障碍属性的唯一 ID
- 不要使用 useId 来生成列表中的 key

```js
const id = useId()
```

# 运用

## 如何避免向下传递回调？

```js
// 在大型的组件树中，我们推荐的替代方案是通过 context 用 useReducer 往下传一个 dispatch 函数
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}

function DeepChild(props) {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

## 如何从 useCallback 读取一个经常变化的值

- 采用useRef() 保持对象不变，但可以改变内部值

```js
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // 把它写入 ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 读取它
    alert(currentText);
  }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

# useActionState

- useActionState 是一个可以根据某个表单动作的结果更新 state 的 Hook。
- 在早期的 React Canary 版本中，此 API 是 React DOM 的一部分，称为 useFormState

```tsx
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

```tsx
import { useActionState } from "react";

async function action(currentState, formData) {
  return currentState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useActionState(action, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>+1</button>
    </form>
  )
}
```

# useOptimistic

useOptimistic 是一个 React Hook，它可以帮助你更乐观地更新用户界面。

它允许你在执行异步操作时，提前更新 UI，以提升用户体验。通过乐观更新，用户可以看到即时的反馈，而不必等待网络请求完成。

```tsx
// state：初始时和没有挂起操作时要返回的值。
// updateFn(currentState, optimisticValue)：一个函数，接受当前 state 和传递给 addOptimistic 的乐观值，并返回结果乐观状态。它必须是一个纯函数。updateFn 接受两个参数：currentState 和 optimisticValue。返回值将是 currentState 和 optimisticValue 的合并值。
// optimisticState：结果乐观状态。除非有操作挂起，否则它等于 state，在这种情况下，它等于 updateFn 返回的值。
// addOptimistic：触发乐观更新时调用的 dispatch 函数。它接受一个可以是任何类型的参数 optimisticValue，并以 state 和 optimisticValue 作为参数来调用 updateFn。
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

```tsx
import { useOptimistic, useState, useRef } from "react";
import { deliverMessage } from "./actions.js";

function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  async function formAction(formData) {
    // 添加新数据
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    // 写入源数据如：远程接口
    await sendMessage(formData);
  }
  // 定义 useOptimistic
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small>（发送中……）</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="你好！" />
        <button type="submit">发送</button>
      </form>
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "你好，在这儿！", sending: false, key: 1 }
  ]);
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
```

# useReducer *

- useReducer 是一个 React Hook，它允许你向组件里面添加一个 reducer
- 将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 reducer

```tsx
// reducer：用于更新 state 的纯函数。参数为 state 和 action，返回值是更新后的 state。state 与 action 可以是任意合法值。
// initialArg：用于初始化 state 的任意值。初始值的计算逻辑取决于接下来的 init 参数。
// 可选参数 init：用于计算初始值的函数。如果存在，使用 init(initialArg) 的执行结果作为初始值，否则使用 initialArg。
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

```tsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'action':
      return {...state,...action}
      break;
    default:
      break;
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, {  });
}

function handleClick() {
  dispatch({ type: 'action' });
}
```

# useSyncExternalStore

useSyncExternalStore 是一个让你订阅外部 store 的 React Hook。

```tsx
// subscribe：一个函数，接收一个单独的 callback 参数并把它订阅到 store 上。当 store 发生改变时会调用提供的 callback，这将导致 React 重新调用 getSnapshot 并在需要的时候重新渲染组件。subscribe 函数会返回清除订阅的函数。
// getSnapshot：一个函数，返回组件需要的 store 中的数据快照。在 store 不变的情况下，重复调用 getSnapshot 必须返回同一个值。如果 store 改变，并且返回值也不同了（用 Object.is 比较），React 就会重新渲染组件。
// 可选 getServerSnapshot：一个函数，返回 store 中数据的初始快照。它只会在服务端渲染时，以及在客户端进行服务端渲染内容的激活时被用到。快照在服务端与客户端之间必须相同，它通常是从服务端序列化并传到客户端的。如果你忽略此参数，在服务端渲染这个组件会抛出一个错误。
// 该 store 的当前快照，可以在你的渲染逻辑中使用
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

```tsx
// 订阅浏览器 API
import { useSyncExternalStore } from 'react';
export default function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

// 调用APi 获取相关值
function getSnapshot() {
  return navigator.onLine;
}

// callback 会调用 getSnapshot 获取数据数据即 isOnline 的新值
function subscribe(callback) {
  // 添加订阅
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  // 返回清除订阅
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 自定义use
// 不同的组件都可以调用 useOnlineStatus，而不必重复底层实现
export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}
```

# useTransition

useTransition 是一个让你可以在后台渲染部分 UI 的 React Hook。

它允许你将状态更新标记为“过渡”，从而在更新过程中保持用户界面的响应性

```tsx
// isPending，告诉你是否存在待处理的 transition
// startTransition 函数，你可以使用此方法将更新标记为 transition
const [isPending, startTransition] = useTransition()
```

```tsx
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ……
}
```
