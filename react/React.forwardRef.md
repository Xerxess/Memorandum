# React.forwardRef

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。  
对于大多数应用中的组件来说，这通常不是必需的。  
但其对某些组件，尤其是可重用的组件库是很有用的。最常见的案例如下所述。

* 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
* Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

```js
React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
```

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
