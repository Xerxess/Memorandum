<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Dark mode](#dark-mode)
- [手动切换黑暗模式](#手动切换黑暗模式)
  - [使用数据属性](#使用数据属性)
  - [与系统同步](#与系统同步)

<!-- /code_chunk_output -->

# Dark mode

- 默认情况下，这使用prefers-color-scheme CSS媒体功能
- 通过覆盖深色变体来构建支持手动切换黑暗模式的站点

```tsx
// 默认情况下，这使用prefers-color-scheme CSS媒体功能
// dark:
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white" ...>
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

# 手动切换黑暗模式

```css
@import "tailwindcss";
 /* 覆盖dark变体以使用您的自定义选择器 */
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<!-- // 每当html树中存在dark类时，它们都会被应用 -->
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

## 使用数据属性

```css
@import "tailwindcss";
/* 要使用数据属性而不是类来激活黑暗模式，只需使用属性选择器覆盖dark变体： */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<!-- 每当data-theme属性设置为树的dark地方时，都会应用黑模式实用程序： -->
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

## 与系统同步

- window.matchMedia() API检测系统主题并在需要时更新html元素。

```tsx
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
// Whenever the user explicitly chooses light mode
localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```
