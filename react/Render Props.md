<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Render Props](#render-props)
  - [MouseTracker 组件](#mousetracker-组件)
  - [现代替代方案：React Hooks](#现代替代方案react-hooks)
  - [总结](#总结)

<!-- /code_chunk_output -->

# Render Props

- 非常经典且强大的 React 模式，用于在组件之间共享代码逻辑，特别是 与 UI 无关的逻辑
- 定义：一个 Render Prop 是一个值为函数的 prop。这个函数接收一个对象参数（通常是子组件的内部状态），并返回一个 React 元素（JSX）。
- 优点
  - 关注点分离：完美地将数据/逻辑获取（MouseTracker）与 UI 渲染（父组件）分离。
  - 逻辑复用：任何需要鼠标位置逻辑的组件都可以轻松复用 MouseTracker。
  - 灵活性：父组件拥有完全的渲染控制权，可以渲染任何它想要的 UI。
- 缺点
  - 嵌套地狱：如果你需要复用多个 Render Props 组件，代码会变得非常嵌套，难以阅读。

## MouseTracker 组件

```tsx
// MouseTracker.jsx
import React, { useState, useEffect } from 'react';

// 这个组件只负责追踪鼠标位置，不关心如何渲染
function MouseTracker(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // 空依赖数组意味着只在挂载时运行一次

  // 核心：调用从 props 传入的函数，并将内部状态 position 作为参数
  // 这个函数可以是 props.render，也可以是 props.children
  return props.render(position);
}

export default MouseTracker;
```

```tsx
// App.jsx
import MouseTracker from './MouseTracker';

function App() {
  return (
    <div>
      <h1>Render Props 演示</h1>
      
      {/* 场景1：只显示坐标 */}
      <MouseTracker
        render={({ x, y }) => (
          <h2>
            鼠标位置: ({x}, {y})
          </h2>
        )}
      />

      <hr />

      {/* 场景2：显示一个跟随鼠标的猫 */}
      <MouseTracker
        render={({ x, y }) => (
          <img
            src="https://placekitten.com/g/50/50"
            alt="cat"
            style={{
              position: 'absolute',
              left: x - 25, // 让图片中心对准鼠标
              top: y - 25,
              pointerEvents: 'none', // 防止图片干扰鼠标事件
            }}
          />
        )}
      />
    </div>
  );
}
```

## 现代替代方案：React Hooks

```tsx
// useMousePosition.js
import { useState, useEffect } from 'react';

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position; // Hook 返回状态
}

export default useMousePosition;
```

## 总结

| 特性 | Render Props | React Hooks |
|---|---|---|
| 核心思想 | 通过函数 prop 传递渲染控制权 | 将逻辑从组件中提取为可复用的函数 |
| 代码结构 | 易产生嵌套地狱 | 代码扁平，易于阅读 |
| 使用场景 | 在 Class 组件时代是主流；现在在一些库的 API 中仍可见 | 现代 React 函数组件的官方推荐方案 |
| 学习价值 | 非常重要。是理解 React 组合性的关键一环，很多第三方库（如 React Motion）仍在使用。 | 必需掌握。是现代 React 开发的基石。 |
