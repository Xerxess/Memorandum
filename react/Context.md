<!-- TOC -->

- [Context](#context)
- [API](#api)
    - [React.createContext](#reactcreatecontext)
    - [Context.Provider](#contextprovider)
    - [Class.contextType this.context](#classcontexttype-thiscontext)
    - [Context.Consumer](#contextconsumer)

<!-- /TOC -->
# Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

# API

- React.createContext
- Context.Provider
- Class.contextType
- Context.Consumer
- Context.displayName

## React.createContext

- 创建一个 Context 对象。
- 当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
- 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。

```js
const MyContext = React.createContext(defaultValue);
```

## Context.Provider

- 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

```js
<MyContext.Provider value={/* 某个值 */}>
```

## Class.contextType (this.context)

- 挂载在 class 上的 contextType 属性可以赋值为由 React.createContext() 创建的 Context 对象。
- 此属性可以让你使用 this.context 来获取最近 Context 上的值。
- 你可以在任何生命周期中访问到它，包括 render 函数中。

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

## Context.Consumer

* 一个 React 组件可以订阅 context 的变更，此组件可以让你在函数式组件中可以订阅 context。

```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

## Context.displayName

context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。
