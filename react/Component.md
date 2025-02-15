<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Component （类定义的 React 组件的基类）](#component-类定义的-react-组件的基类)
  - [context](#context)
  - [props](#props)
  - [state](#state)
  - [生命周期函数](#生命周期函数)
  - [其他函数](#其他函数)
  - [其他](#其他)
- [createRef (仅类组件)](#createref-仅类组件)
- [forwardRef (React 19不推荐)](#forwardref-react-19不推荐)

<!-- /code_chunk_output -->

# Component （类定义的 React 组件的基类）

Component 是作为JavaScript 类定义的 React 组件的基类。React 仍然支持类组件，但我们不建议在新代码中使用它们。

```tsx
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

## context

```tsx
// 类组件的上下文可作为this.context使用。只有当您使用static contextType指定要接收的上下文时，它才可用。
// 类组件一次只能读取一个上下文
class Button extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return ();
  }
}
```

## props

```tsx
// props
// 传递给类组件的属性可作为this.props使用
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

<Greeting name="Taylor" />
```

## state

```tsx
// 类组件的状态可以通过 this.state 访问。state 字段必须是一个对象。不要直接修改状态。
// 如果要更改状态，请使用新状态调用 setState。
class Counter extends Component {
  state = {
    age: 42,
  };

  handleAgeChange = () => {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <>
      </>
    );
  }
}
```

## 生命周期函数

- componentDidCatch(error, info) 当某些子组件（包括远距离子组件）在渲染过程中抛出错误时，React 将调用它。这允许您在生产环境中将该错误记录到错误报告服务
- componentDidMount() 组件添加到（挂载到）屏幕时调用
- componentDidUpdate(prevProps, prevState, snapshot?) 组件使用更新后的 props 或 state 重新渲染后，React 会立即调用它
- componentWillUnmount() 组件从屏幕中移除（卸载）之前调用
- getSnapshotBeforeUpdate(prevProps, prevState) React 更新 DOM 之前立即调用
- UNSAFE_componentWillMount()在constructor之后立即调用
- UNSAFE_componentWillReceiveProps(nextProps, nextContext) 当组件接收到新的 props 时，React 将调用
- UNSAFE_componentWillUpdate(nextProps, nextState) React 将在使用新的 props 或 state 渲染之前调用
- static getDerivedStateFromError(error) 组件（包括远端子组件）在渲染期间抛出错误时，React将调用
- static getDerivedStateFromProps(props, state) 将在调用 render 之前调用

## 其他函数

- forceUpdate(callback?) 强制组件重新渲染
- render() render 方法是唯一必需的方法
- setState(nextState, callback?) 调用 setState 来更新 React 组件的状态
- shouldComponentUpdate(nextProps, nextState, nextContext) 定义了 shouldComponentUpdate，React 将调用它来确定是否可以跳过重新渲染

## 其他

- static contextType 必须指定它需要读取哪个上下文。作为static contextType指定的上下文必须是之前由createContext创建的值
- static defaultProps 为类设置默认props

# createRef (仅类组件)

- createRef 主要用于 类组件
- createRef 创建一个 ref 对象，该对象可以包含任意值

```tsx
class MyInput extends Component {
  inputRef = createRef();
  // ...
}
```

```tsx
import { Component, createRef } from 'react';
export default class Form extends Component {
  inputRef = createRef();

  handleClick = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <button onClick={this.handleClick}>
          Focus the input
        </button>
      </>
    );
  }
}

```

# forwardRef (React 19不推荐)

- 在React 19中，forwardRef不再需要。直接将ref作为属性传递。
- forwardRef允许您的组件通过ref将DOM节点暴露给父组件

```tsx
const SomeComponent = forwardRef(render)
```

```tsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

```tsx
// 公开命令式句柄而不是 DOM 节点
// useImperativeHandle 公开相关方法
import { forwardRef, useRef, useImperativeHandle } from 'react';
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```
