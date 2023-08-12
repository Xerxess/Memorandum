<!-- TOC -->

- [Hook](#hook)
- [Hook 使用规则](#hook-%E4%BD%BF%E7%94%A8%E8%A7%84%E5%88%99)
- [自定义 Hook](#%E8%87%AA%E5%AE%9A%E4%B9%89-hook)
- [useState](#usestate)
    - [惰性初始 state](#%E6%83%B0%E6%80%A7%E5%88%9D%E5%A7%8B-state)
    - [setState 两种用法](#setstate-%E4%B8%A4%E7%A7%8D%E7%94%A8%E6%B3%95)
- [useEffect](#useeffect)
    - [为什么每次更新的时候都要运行 Effect](#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E7%9A%84%E6%97%B6%E5%80%99%E9%83%BD%E8%A6%81%E8%BF%90%E8%A1%8C-effect)
    - [effect 的条件执行 useEffect 第二个参数使用](#effect-%E7%9A%84%E6%9D%A1%E4%BB%B6%E6%89%A7%E8%A1%8C-useeffect-%E7%AC%AC%E4%BA%8C%E4%B8%AA%E5%8F%82%E6%95%B0%E4%BD%BF%E7%94%A8)
- [useContext](#usecontext)
- [useReducer](#usereducer)
- [useCallback](#usecallback)
- [useMemo](#usememo)
- [useRef](#useref)
- [useImperativeHandle](#useimperativehandle)
- [useLayoutEffect](#uselayouteffect)
- [useDebugValue](#usedebugvalue)
- [useDeferredValue](#usedeferredvalue)
- [useTransition](#usetransition)
- [useId](#useid)
- [运用](#%E8%BF%90%E7%94%A8)
    - [如何避免向下传递回调？](#%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E5%90%91%E4%B8%8B%E4%BC%A0%E9%80%92%E5%9B%9E%E8%B0%83)
    - [如何从 useCallback 读取一个经常变化的值](#%E5%A6%82%E4%BD%95%E4%BB%8E-usecallback-%E8%AF%BB%E5%8F%96%E4%B8%80%E4%B8%AA%E7%BB%8F%E5%B8%B8%E5%8F%98%E5%8C%96%E7%9A%84%E5%80%BC)

<!-- /TOC -->

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

# useState

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

# useEffect

- 跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。
- return ()=>{} 即为 componentWillUnmount

```js
// 相当于 componentDidMount 和 componentDidUpdate:
useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
    // componentWillUnmount
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
});
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

# useContext

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

```js
const value = useContext(MyContext);
```

```js
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

const ThemeContext = React.createContext(themes.light);

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
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
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

- 返回一个 memoized 回调函数
- memoized 函数实现原理：使用一组参数初次调用函数时，缓存参数和计算结果，当再次使用相同的参数调用该函数时，直接返回相应的缓存结果。
- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

# useMemo

- 返回一个 memoized 回调函数
- memoized 函数实现原理：使用一组参数初次调用函数时，缓存参数和计算结果，当再次使用相同的参数调用该函数时，直接返回相应的缓存结果。
- 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

# useRef

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

# useImperativeHandle

- useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。
- useImperativeHandle 应当与 forwardRef 一起

```js
useImperativeHandle(ref, createHandle, [deps])
```

# useLayoutEffect

- 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。
- 可以使用它来读取 DOM 布局并同步触发重渲染。
- 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。
- 尽可能使用标准的 useEffect 以避免阻塞视觉更新。

# useDebugValue

- useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

# useDeferredValue

useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。如果当前渲染是一个紧急更新的结果，比如用户输入，React 将返回之前的值，然后在紧急渲染完成后渲染新的值。

```js
const deferredValue = useDeferredValue(value);
```

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

- useId 是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook

```js
const id = useId();
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
