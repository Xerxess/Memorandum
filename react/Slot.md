<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Slot](#slot)
  - [基础插槽：props.children (等同于 Vue 的默认插槽)](#基础插槽propschildren-等同于-vue-的默认插槽)
  - [具名插槽：使用 Props (等同于 Vue 的 \<slot name="header">)](#具名插槽使用-props-等同于-vue-的-slot-nameheader)
  - [作用域插槽：使用函数作为 Props 或 Children (等同于 Vue 的作用域插槽)](#作用域插槽使用函数作为-props-或-children-等同于-vue-的作用域插槽)

<!-- /code_chunk_output -->

# Slot

- React 并没有提供“插槽”这个专门的语法
- 通过 props 和 props.children 完美地实现了插槽的所有功能，甚至更加灵活。

## 基础插槽：props.children (等同于 Vue 的默认插槽)

```tsx
// Card.jsx
import React from 'react';

function Card(props) {
  return (
    <div className="card-border">
      <h2>Card Title</h2>
      {/* 这里的 props.children 就是父组件传入的内容 */}
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
```

## 具名插槽：使用 Props (等同于 Vue 的 \<slot name="header">)

```tsx
// Layout.jsx
import React from 'react';

function Layout(props) {
  return (
    <div className="layout">
      <header className="layout-header">
        {/* 渲染名为 header 的插槽 */}
        {props.header}
      </header>
      <main className="layout-content">
        {/* 渲染默认插槽 */}
        {props.children}
      </main>
      <footer className="layout-footer">
        {/* 渲染名为 footer 的插槽 */}
        {props.footer}
      </footer>
    </div>
  );
}
export default Layout;
```

```tsx
// App.jsx
import Layout from './Layout';

function App() {
  return (
    <Layout
      header={<h1>网站标题</h1>}
      footer={<p>&copy; 2023 My Website</p>}
    >
      {/* 这部分内容会传递给 props.children */}
      <div>
        <h2>主要内容区域</h2>
        <p>这里是页面的主要内容...</p>
      </div>
    </Layout>
  );
}
```

## 作用域插槽：使用函数作为 Props 或 Children (等同于 Vue 的作用域插槽)

- 常被称为 "Render Props" 模式。
- 最强大的一种插槽模式。
- 允许子组件向父组件传递数据，让父组件根据这些数据来决定如何渲染插槽内容。

核心思想：将一个函数作为 prop 传递给子组件，子组件在调用这个函数时，把自己的内部数据作为参数传进去。

```tsx
// UserDataFetcher.jsx
import React, { useState, useEffect } from 'react';

function UserDataFetcher(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟 API 调用
    setTimeout(() => {
      setUser({ name: 'Alice', age: 30, avatar: 'url/to/avatar' });
      setLoading(false);
    }, 1000);
  }, []);

  // 调用作为 children 的函数，并将 user 和 loading 传递给它
  // 如果 props.children 是一个函数，就调用它
  if (typeof props.children === 'function') {
    return props.children({ user, loading });
  }
  
  // 如果不是函数，可以提供一个默认渲染或者返回 null
  return props.children;
}

export default UserDataFetcher;
```

```tsx
// 将函数作为 children (更现代、更优雅)
// App.jsx
import UserDataFetcher from './UserDataFetcher';

function App() {
  return (
    <UserDataFetcher>
      {/* 这里的 children 是一个函数，它接收子组件传来的数据 */}
      {({ user, loading }) => {
        if (loading) {
          return <div>Loading user data...</div>;
        }
        if (!user) {
          return <div>Failed to load user.</div>;
        }
        // 父组件根据子组件提供的 user 数据，自由决定渲染什么
        return (
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Age: {user.age}</p>
            <img src={user.avatar} alt="avatar" />
          </div>
        );
      }}
    </UserDataFetcher>
  );
}
```

```tsx
// 写法二：将函数作为普通的 prop (传统 Render Props 写法)
// UserDataFetcher 组件内部需要调用 props.render(data) 而不是 props.children(data)
// App.jsx
import UserDataFetcher from './UserDataFetcher';

function App() {
  return (
    <UserDataFetcher
      render={({ user, loading }) => {
        // 渲染逻辑同上
        if (loading) return <div>Loading...</div>;
        return <h1>{user.name}</h1>;
      }}
    />
  );
}
```
