<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Colors](#colors)
  - [透明度](#透明度)
  - [在 CSS 中引用](#在-css-中引用)
  - [自定义颜色](#自定义颜色)

<!-- /code_chunk_output -->

# Colors

- 每种颜色都包含 11 个级别，从 50（最浅）到 950（最深）。
  - 50-100: 通常用于背景色、悬停状态。
  - 200-300: 用于边框、分隔线。
  - 400-600: 常用于主要文本、UI 元素（如按钮）的默认状态。500 通常是该颜色的“代表色”。
  - 700-900: 用于深色背景、强调文本。
  - 950: 极深的颜色，常用于深色模式下的背景。

- 默认调色板中的每种颜色都包含11种程度，其中50最浅，而950个是最暗，500正常

- red 红色
- orange 橙色
- amber 琥珀色
- yellow 黄色
- lime 黄绿色
- green 绿色
- emerald 浅绿色
- teal 蓝绿色
- cyan 青色
- sky 天蓝
- blue 蓝色
- indigo 靛青
- violet 紫色
- purple 紫色的
- fuchsia 紫红色
- pink 粉色
- rose 玫瑰
- slate 石板
- gray 灰色的
- zinc 锌
- neutral 中性的
- stone 石头

```tsx
<div class="bg-gray-500 dark:bg-gray-800">
</div>
```

## 透明度

```tsx
// 使用bg-black/75 ( 75 ）将颜色的alpha通道（75）设置为75％的语法，调整颜色的不透明度
<div>
  <div class="bg-sky-500/10"></div>
  <div class="bg-sky-500/20"></div>
  <div class="bg-sky-500/30"></div>
  <div class="bg-sky-500/40"></div>
  <div class="bg-sky-500/50"></div>
  <div class="bg-sky-500/60"></div>
  <div class="bg-sky-500/70"></div>
  <div class="bg-sky-500/80"></div>
  <div class="bg-sky-500/90"></div>
  <div class="bg-sky-500/100"></div>
</div>

// 支持任意值和CSS变量速记
<div class="bg-pink-500/[71.37%]"><!-- ... --></div>
<div class="bg-cyan-400/(--my-alpha-value)"><!-- ... --></div>
```

## 在 CSS 中引用

所有颜色都被暴露为 CSS 变量，格式为 --color-{color}-{shade}。

用途：在你自己的 CSS 文件中引用，确保与设计系统保持一致。

```css
.my-component {
  color: var(--color-gray-950);
}

.overlay {
  background-color: --alpha(var(--color-gray-950) / 50%);
}
```

## 自定义颜色

```css
/* 添加新颜色 */
@theme {
  --color-brand: #3f3cbb;
  --color-accent: #3ab7bf;
}


/* 覆盖默认颜色 */
@theme {
  --color-gray-500: oklch(0.45 0.10 250); /* 覆盖默认的 gray-500 */
}

/* 禁用或替换默认颜色 */
@theme {
  /* 1. 禁用所有默认颜色 */
  --color-*: initial;
  /* 2. 定义你自己的颜色 */
  --color-primary: #4f46e5;
  --color-secondary: #6b7280;
}

/* 引用其他变量 */
:root {
  --dynamic-bg: #fff;
}
[data-theme="dark"] {
  --dynamic-bg: #000;
}

@theme inline {
  --color-canvas: var(--dynamic-bg);
}
```
