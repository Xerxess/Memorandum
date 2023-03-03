# Refs and the DOM

* Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

# 何时使用 Refs

* 管理焦点，文本选择或媒体播放。
* 触发强制动画。
* 集成第三方 DOM 库。

# 使用

* 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
* 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
* 你不能在函数组件上使用 ref 属性，因为他们没有实例。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

## Refs 与函数组件

* 默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例
* 可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件

```js
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

# 将 DOM Refs 暴露给父组件
