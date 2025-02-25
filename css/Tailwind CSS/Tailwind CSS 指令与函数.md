<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Tailwind CSS 指令与函数](#tailwind-css-指令与函数)
  - [@tailwind 指令](#tailwind-指令)
  - [@apply 指令](#apply-指令)
  - [@layer 指令](#layer-指令)
  - [@import 指令](#import-指令)
  - [Tailwind CSS 的函数](#tailwind-css-的函数)

<!-- /code_chunk_output -->

# Tailwind CSS 指令与函数

## @tailwind 指令

- @tailwind base：引入 Tailwind 的基础样式（如浏览器的重置样式）。
- @tailwind components：引入组件样式，用于定义如按钮、卡片、表单等的基础样式。
- @tailwind utilities：引入工具类，Tailwind 样式库的核心部分，提供了用于布局、颜色、间距、边框等的低级实用类。

```tsx
/* 自定义样式中引入 Tailwind 样式 */
@tailwind base;          /* 引入基础样式 */
@tailwind components;    /* 引入组件样式 */
@tailwind utilities;     /* 引入工具类 */
```

## @apply 指令

@apply 是 Tailwind CSS 的一个指令，用于在自定义 CSS 类中复用 Tailwind 的实用工具类。它的主要作用是：

- 减少重复代码 ：如果你在多个地方使用了相同的样式组合，可以将其提取到一个类中。
- 增强可读性 ：为复杂的样式组合提供语义化的类名。
- 灵活性 ：结合 Tailwind 的实用工具类和传统 CSS 的优点。

```css
/* 定义一个自定义类 */
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

/* 等价于以下传统 CSS */
.btn {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 0.25rem;
}

.btn:hover {
  background-color: #2563eb;
}
```

## @layer 指令

在 Tailwind CSS 中，样式被分为三个主要的层：

- base ：基础样式（如重置样式、默认 HTML 元素样式）。最先加载，通常是全局样式
- components ：自定义组件样式。 其次加载，用于定义组件样式
- utilities ：实用工具类（如 text-center, bg-blue-500 等）。 最后加载，具有最高优先级

通过 @layer 指令，你可以将自定义样式插入到这些层中，确保它们以正确的顺序加载，并避免优先级冲突。

```css
@layer base {
  /* 自定义基础样式 */
  body{
    margin:0;
  }
}

@layer components {
  /* 自定义组件样式 */
  .card{

  }
}

@layer utilities {
  /* 自定义实用工具类 */
  .rotate-45{

  }
}
```

## @import 指令

```tsx
@import '<path-to-file>';
```

## Tailwind CSS 的函数


