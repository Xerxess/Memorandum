<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Tailwind CSS 指令与函数](#tailwind-css-指令与函数)
  - [@tailwind 指令](#tailwind-指令)
  - [@apply 指令](#apply-指令)
  - [@layer 指令](#layer-指令)
  - [@import 指令 （v4）](#import-指令-v4)
  - [@theme （v4）](#theme-v4)
  - [@source （v4）](#source-v4)
  - [@utility （v4）](#utility-v4)
  - [@variant （v4）](#variant-v4)
  - [@custom-variant 添加自定义变体 （v4）](#custom-variant-添加自定义变体-v4)
  - [@reference （v4）](#reference-v4)
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

## @import 指令 （v4）

- 使用 @import 指令内联导入 CSS 文件，包括 Tailwind 本身

```css
@import "tailwindcss";
```

## @theme （v4）

- 一句话概括：定义项目的全局设计系统，如颜色、字体、间距、断点等。
- 详细解释：你可以在 @theme 块内使用 CSS 自定义属性（--variable-name）来定义或覆盖 Tailwind 的默认主题。这些变量会自动生成对应的工具类。

## @source （v4）

- 使用 @source 指令明确指定 Tailwind 自动内容检测未选取的源文件

## @utility （v4）

- 使用 @utility 指令将自定义实用程序添加到您的项目，这些实用程序可与 hover 、 focus 和 lg 等变体一起使用


```css
@utility content-auto {
  content-visibility: auto;
}
```

```html
<div class="content-auto">
  <!-- ... -->
</div>
```

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}
@utility tab-* {
/* - 匹配主题值：tab-size: --value(--tab-size-*); 可以匹配 tab-2, tab-4 等在 @theme 中定义的值。
   - 匹配原始值：tab-size: --value(integer); 可以匹配 tab-1, tab-76 等。
   - 匹配任意值：tab-size: --value([integer]); 可以匹配 tab-[1], tab-[76] 等。
   - 处理修饰符：line-height: --modifier(--leading-*); 可以处理 text-lg/leading-loose 这样的修饰符。 */
  tab-size: --value(--tab-size-*);
  tab-size: --value(integer);
  tab-size: --value("inherit", "initial", "unset");
  tab-size: --value([integer]);
}
```

## @variant （v4）

- 使用 @variant 指令在自定义 CSS 中应用 Tailwind 变体

```css
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
}

/* 编译后的 CSS */
.my-element {
  background: white;
  @media (prefers-color-scheme: dark) {
    background: black;
  }
}
```

## @custom-variant 添加自定义变体 （v4）

- 使用 @custom-variant 指令添加自己的自定义变体
- 使用 @custom-variant 指令，@slot 作为占位符。

```css
@custom-variant theme-midnight {
  &:where([data-theme="midnight"] *) {
    @slot;
  }
}
```

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

## @reference （v4）

## Tailwind CSS 的函数

- --alpha()
- --spacing()
