<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Hover, Focus, and Other](#hover-focus-and-other)
  - [:hover, :focus, and :active](#hover-focus-and-active)
  - [:has()](#has)
  - [group 与 group-has-*](#group-与-group-has-)
  - [group 与 group-*](#group-与-group-)
  - [group/name 与 group-hover/name](#groupname-与-group-hovername)
  - [group-*](#group-)
  - [in-*](#in-)
  - [peer 与 peer-has-*](#peer-与-peer-has-)
  - [peer/name 与 peer-checked/name](#peername-与-peer-checkedname)
  - [peer-*](#peer-)
  - [:not()](#not)
  - [::before 与 ::after](#before-与-after)
  - [::placeholder](#placeholder)

<!-- /code_chunk_output -->

# Hover, Focus, and Other

```tsx
// 类级 class:hover, class:focus, class:first-child,  class:required
// 伪元素 ::before:hover, ::after:hover, ::placeholder:hover,  ::selection:hover
// 媒体和功能查询
// 属性选择器 [dir="rtl"]:hover , [open]:hover
// 儿童选择器 ‘& > *:hover’ , '& *:hover'
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>

// 堆叠
<button class="dark:md:hover:bg-fuchsia-600 ...">Save changes</button>

```

## :hover, :focus, and :active

```tsx
// :hover
<div class="bg-black hover:bg-white ...">
  <!-- ... -->
</div>

// :focus
<input class="border-gray-300 focus:border-blue-400 ..." />

// focus-within
// 当元素或其后代之一使用focus-in变体进行焦点时，对元素进行样式：
<div class="focus-within:shadow-lg ...">
  <input type="text" />
</div>

// focus-visible
// 当元素使用焦点可见变体使用键盘对焦时，对元素进行样式处理：
<button class="focus-visible:outline-2 ...">Submit</button>

// active
// 当使用活动变体按下元素时，为元素设计样式：
<button class="bg-blue-500 active:bg-blue-600 ...">Submit</button>

// visited
// 当链接已被访问时，使用已访问的变体为链接进行样式：
<a href="https://seinfeldquotes.com" class="text-blue-600 visited:text-purple-600 ..."> Inspiration </a>

// :target
// 如果元素的ID与使用目标变体的当前URL片段匹配，则为其样式：
<div id="about" class="target:shadow-lg ...">
  <!-- ... -->
</div>

// :first-child
// 如果元素是第一个使用第一个变体的子元素，则对元素进行样式处理：
<ul>
  {#each people as person}
    <li class="py-4 first:pt-0 ...">
      <!-- ... -->
    </li>
  {/each}
</ul>

// :last-child
// 如果元素是最后一个使用最后一个变体的子元素，请为元素设计样式：
<ul>
  {#each people as person}
    <li class="py-4 last:pb-0 ...">
      <!-- ... -->
    </li>
  {/each}
</ul>

// :only-child
// 如果元素是唯一使用唯一变体的子元素，则对元素进行样式处理：
<ul>
  {#each people as person}
    <li class="py-4 only:py-0 ...">
      <!-- ... -->
    </li>
  {/each}
</ul>

// :nth-child(odd)
// 如果元素是使用奇数变体的奇数子元素，则对元素进行样式化：
<table>
  {#each people as person}
    <tr class="bg-white odd:bg-gray-100 ...">
      <!-- ... -->
    </tr>
  {/each}
</table>

// :nth-child(even)
// 如果元素是使用偶数变体的偶数子元素，则对元素进行样式化：
<table>
  {#each people as person}
    <tr class="bg-white even:bg-gray-100 ...">
      <!-- ... -->
    </tr>
  {/each}
</table>

// :first-of-type
// 如果元素是其类型的第一个子元素，则使用类型的第一个子元素进行样式处理：
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="ml-2 first-of-type:ml-6 ...">
      <!-- ... -->
    </a>
  {/each}
</nav>

// :last-of-type
// 如果一个元素是其类型的最后一个子元素，则使用最后一个类型变体为该元素设置样式：
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="mr-2 last-of-type:mr-6 ...">
      <!-- ... -->
    </a>
  {/each}
  <button>More</button>
</nav>

// :only-of-type
// 如果元素是其类型的唯一子元素，则使用only-of-type变体，则对元素进行样式：
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="mx-2 only-of-type:mx-6 ...">
      <!-- ... -->
    </a>
  {/each}
  <button>More</button>
</nav>

// :nth-child()
// 使用第 n 个变量对特定位置的元素进行样式设置：
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="mx-2 nth-3:mx-6 nth-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  {/each}
  <button>More</button>
</nav>

// :nth-last-child()
// 使用倒数第 n 个变量，在从末尾开始的特定位置为元素添加样式：
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="mx-2 nth-last-3:mx-6 nth-last-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  {/each}
  <button>More</button>
</nav>

// :nth-of-type()
// 使用 nth-of-type 变体为特定位置的同一类型的元素设置样式：
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="mx-2 nth-of-type-3:mx-6 nth-of-type-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  {/each}
  <button>More</button>
</nav>

// :nth-last-of-type()
// 使用 nth-last-of-type 变体，为从末尾起特定位置的相同类型元素添加样式
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  {#each links as link}
    <a href="#" class="mx-2 nth-last-of-type-3:mx-6 nth-last-of-type-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  {/each}
  <button>More</button>
</nav>

// :empty
<ul>
  {#each people as person}
    <li class="empty:hidden ...">{person.hobby}</li>
  {/each}
</ul>

// :disabled
<input class="disabled:opacity-75 ..." />

// :enabled
<input class="enabled:hover:border-gray-400 disabled:opacity-75 ..." />

// :checked
<input type="checkbox" class="appearance-none checked:bg-blue-500 ..." />

// :indeterminate
// 使用不定变体为处于不定状态的复选框或单选按钮设计样式：
<input type="checkbox" class="appearance-none indeterminate:bg-gray-300 ..." />

// :default
// 使用默认变量对选项、复选框或单选按钮进行样式设置，当页面最初加载时，该选项、复选框或单选按钮的默认值为：
<input type="checkbox" class="default:outline-2 ..." />

// :optional
// 当输入是可选的时，使用可选变体来设置输入的样式：
<input class="optional:border-red-500 ..." />

// :required
// 当需要输入时，使用所需变体为输入添加样式：
<input class="required:border-red-500 ..." />

// :valid
// 当输入有效时，使用有效变体设置输入的样式：
<input class="valid:border-green-500 ..." />

// :invalid
// 当输入无效时，使用无效变体设置输入的样式：
<input class="invalid:border-red-500 ..." />

// :in-range
// 当输入的值在指定范围限制内时，使用范围内变量对输入进行样式设置：
<input min="1" max="5" class="in-range:border-green-500 ..." />

// :out-of-range
<input min="1" max="5" class="out-of-range:border-red-500 ..." />

// :placeholder-shown
// 使用占位符显示变体为占位符显示时的输入设置样式：
<input class="placeholder-shown:border-gray-500 ..." placeholder="you@example.com" />

// :autofill
// 当浏览器使用自动填充变体自动填充输入时，为其设置样式：
<input class="autofill:bg-yellow-200 ..." />

// :read-only
// 当输入为只读时，使用只读变体设置其样式：
<input class="read-only:bg-gray-100 ..." />
```

## :has()

- 使用 has-* 变体根据元素后代的状态或内容来设置元素的样式
- 可以将 has-* 与一个伪类（如 has-[:focus]）一起使用，根据元素后代的状态对元素进行样式调整。
- 可以使用元素选择器（如 has-[img] 或 has-[a]），根据元素后代的内容为元素设置样式。

```tsx
// <label> 内 input状态变checked 样式生效
<label
  class="has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 dark:has-checked:bg-indigo-950 dark:has-checked:text-indigo-200 dark:has-checked:ring-indigo-900 ..."
>
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay
  <input type="radio" class="checked:border-indigo-500 ..." />
</label>
```

## group 与 group-has-*

- 根据组的后代设置样式
- 如果需要根据父元素的后代设置元素样式，可以使用 group 类标记父元素，然后使用 group-has-* 变体来设置目标元素的样式：

```tsx
// 如果 <div class="group"> 有 <a> 则 <svg> 显示
<div class="group ...">
  <img src="..." />
  <h4>Spencer Sharp</h4>
  <svg class="hidden group-has-[a]:block ..."><!-- ... --></svg>
  <p>Product Designer at <a href="...">planeteria.tech</a></p>
</div>
```

## group 与 group-*

- 当您需要根据某些父元素的状态来设置元素的样式时，请使用 group 类标记父元素，并使用 group-* 变体（如 group-hover）来设置目标元素的样式：

```tsx
// 当a:hover 时 svg h3 p 的样式生效
<a href="#" class="group ...">
  <div>
    <svg class="stroke-sky-500 group-hover:stroke-white ..." fill="none" viewBox="0 0 24 24">
      <!-- ... -->
    </svg>
    <h3 class="text-gray-900 group-hover:text-white ...">New project</h3>
  </div>
  <p class="text-gray-500 group-hover:text-white ...">Create a new project from a variety of starting templates.</p>
</a>
```

## group/name 与 group-hover/name

- 区分嵌套组
- 嵌套组时，您可以根据特定父组的状态设置样式，方法是使用 group/{name} 类为该父组赋予唯一的组名，并使用 group-hover/{name} 等类在变体中包含该名称：

```tsx
// 当group/item:hover 时 group-hover/item生效
// 当group/edit:hover 时 group-hover/edit生效
<ul role="list">
  {#each people as person}
    <li class="group/item ...">
      <!-- ... -->
      <a class="group/edit invisible group-hover/item:visible ..." href="tel:{person.phone}">
        <span class="group-hover/edit:text-gray-700 ...">Call</span>
        <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-gray-500 ..."><!-- ... --></svg>
      </a>
    </li>
  {/each}
</ul>
```

## group-*

- 您可以通过在方括号之间提供任意值作为自己的选择器，即时创建一次性的组*变体：

```tsx
<div class="group is-published">
  <div class="hidden group-[.is-published]:block">
    Published
  </div>
</div>
```

```css
.group-[.is-published]:block {
  &:is(:where(.group):is(.is-published) *) {
    display: block;
  }
}
```

- 为了获得更多控制，您可以使用 & 字符来标记 .group 相对于您传入的选择器在最终选择器中的位置：

```tsx
<div class="group">
  <div class="group-[:nth-of-type(3)_&]:block">
    <!-- ... -->
  </div>
</div>
```

## in-*

- in-* 工作方式与 group 类似，只是您不需要将 group 添加到父元素：
- in-* 响应任何父级的状态变化，因此如果您想要更细粒度的控制，则需要使用 group。

```tsx
<div tabindex="0">
  <div class="opacity-50 in-focus:opacity-100">
    <!-- ... -->
  </div>
</div>
```

## peer 与 peer-has-*

- 根据同级后代设计样式
- 如果需要根据同级元素的后代来样式化元素，可以用 peer 类标记同级元素，然后使用 peer-has-* 变体来样式化目标元素：

```tsx
// 当 input checked 时 svg 隐藏
<div>
  <label class="peer ...">
    <input type="checkbox" name="todo[1]" checked />
    Create a to do list
  </label>
  <svg class="peer-has-checked:hidden ..."><!-- ... --></svg>
</div>
```

## peer/name 与 peer-checked/name

- 当使用多个对等点时，您可以通过使用 peer/{name} 类为该对等点赋予唯一名称，并使用 peer-checked/{name} 等类在变体中包含该名称，来对特定对等点的状态进行样式化：

```tsx
// peer/draft:checked  peer-checked/draft:block 显示
// peer/published:checked peer-checked/published:block
<fieldset>
  <legend>Published status</legend>
  <input id="draft" class="peer/draft" type="radio" name="status" checked />
  <label for="draft" class="peer-checked/draft:text-sky-500">Draft</label>
  <input id="published" class="peer/published" type="radio" name="status" />
  <label for="published" class="peer-checked/published:text-sky-500">Published</label>
  <div class="hidden peer-checked/draft:block">Drafts are only visible to administrators.</div>
  <div class="hidden peer-checked/published:block">Your post will be publicly visible on your site.</div>
</fieldset>
```

## peer-*

- 您可以通过在方括号中提供自己的选择器作为任意值来动态创建一次性的 peer-* 变体：

```tsx
<form>
  <label for="email">Email:</label>
  <input id="email" name="email" type="email" class="is-dirty peer" required />
  <div class="peer-[.is-dirty]:peer-required:block hidden">This field is required.</div>
  <!-- ... -->
</form>
```

```tsx
<div>
  <input type="text" class="peer" />
  <div class="hidden peer-[:nth-of-type(3)_&]:block">
    <!-- ... -->
  </div>
</div>
```

## :not()

- 当条件为 false 时，使用 not- 变体对元素进行样式设置。
- 当与其他伪类变体结合使用时，它特别强大，例如将 not-focus: 与 hover: 结合起来，仅在元素未获得焦点时应用悬停样式：

```tsx
// button 没有焦点时 hover 的背景改变
<button class="bg-indigo-600 hover:not-focus:bg-indigo-700">
  <!-- ... -->
</button>
```

## ::before 与 ::after

- Tailwind 将默认自动添加 content: ''，因此您不必指定它

```tsx
<label>
  <span class="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">Email</span>
  <input type="email" name="email" class="..." placeholder="you@example.com" />
</label>
```

```tsx
<blockquote class="text-center text-2xl font-semibold text-gray-900 italic dark:text-white">
  When you look
  <span class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
    <span class="relative text-white dark:text-gray-950">annoyed</span>
  </span>
  all the time, people think that you're busy.
</blockquote>
```

## ::placeholder

使用占位符变体设置任何输入或文本区域的占位符文本的样式：

```tsx
<input
  class="placeholder:text-gray-500 placeholder:italic ..."
  placeholder="Search for anything..."
  type="text"
  name="search"
/>

## ::file

使用文件变体设置文件输入中的按钮样式

```tsx
<input
  type="file"
  class="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
/>
```

## ::marker

- 使用标记变体设置列表中的计数器或项目符号的样式：

```tsx
<ul role="list" class="list-disc marker:text-sky-400 ...">
  <li>5 cups chopped Porcini mushrooms</li>
  <li>1/2 cup of olive oil</li>
  <li>3lb of celery</li>
</ul>
```

## ::selection

- 使用selection 来设置文本选择的样式

```tsx
<div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
  <p>
    So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my
    way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all
    living things but I tell you Jerry at that moment, I <em>was</em> a marine biologist.
  </p>
</div>
```

## ::first-line and ::first-letter

- 使用 first-line 为内容块的第一行设置样式，使用 first-letter 为第一个字母设置样式：

```tsx
<div class="text-gray-700">
  <p
    class="first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-line:tracking-widest first-line:uppercase"
  >
    Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"?
  </p>
  <p class="mt-6">Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.</p>
</div>
```

## ::backdrop

- 使用背景变体来设置原生 <dialog> 元素的背景样式：

```tsx
<dialog class="backdrop:bg-gray-50">
  <form method="dialog">
    <!-- ... -->
  </form>
</dialog>
```

## 媒体和功能查询

```tsx
// 要在特定断点处设置元素样式，请使用响应式变体，例如 md 和 lg。
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

```tsx
// 要根据父元素的宽度而不是视口来设置元素的样式，请使用@md 和@lg 等变体
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

## 主题 dark

```tsx
<div class="bg-white dark:bg-gray-900 ...">
  <!-- ... -->
  <h3 class="text-gray-900 dark:text-white ...">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 ...">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

## 动画

```tsx
// 当用户设置减少动画时，svg将被隐藏
<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin motion-reduce:hidden ..." viewBox="0 0 24 24"><!-- ... --></svg>
  Processing...
</button>
```

## prefers-contrast

prefers-contrast 媒体查询会告诉您用户是否要求增加或减少对比度。 当用户要求增加对比度时，使用contrast-more变体有条件地添加样式：

```tsx
<label class="block">
  <span class="block text-sm font-medium text-gray-700">Social Security Number</span>
  <input
    class="border-gray-200 placeholder-gray-400 contrast-more:border-gray-400 contrast-more:placeholder-gray-500 ..."
  />
  <p class="text-gray-600 opacity-10 contrast-more:opacity-100 ...">We need this to steal your identity.</p>
</label>
```

## forced-colors

- 强制颜色媒体查询指示用户是否使用强制颜色模式。这些模式使用用户定义的文本、背景、链接和按钮调色板覆盖您网站的颜色。

## orientation （视口处于特定方向）

- 当视口处于特定方向时，使用 portrait 和 landscape有条件地添加样式：

```tsx
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>This experience is designed to be viewed in landscape. Please rotate your device to view the site.</p>
  </div>
</div>
```

## print

```tsx
<div>
  <article class="print:hidden">
    <h1>My Secret Pizza Recipe</h1>
    <p>This recipe is a secret, and must not be shared with anyone</p>
    <!-- ... -->
  </article>
  <div class="hidden print:block">Are you seriously trying to print this? It's secret!</div>
</div>
```

## @supports

- 使用 supports-[...] 变体可根据用户浏览器是否支持某种功能来设计样式

```tsx
<div class="flex supports-[display:grid]:grid ...">
  <!-- ... -->
</div>
```

```tsx
<div class="bg-black/75 supports-backdrop-filter:bg-black/25 supports-backdrop-filter:backdrop-blur ...">
  <!-- ... -->
</div>
```

```tsx
// 使用 not-supports-[...] 变体根据用户浏览器是否不支持某个功能来设置样式：
<div class="not-supports-[display:grid]:flex">
  <!-- ... -->
</div>
```

## @starting-style

- 使用@starting-style来设置元素在 DOM 中首次呈现时的外观，或从 display: none 过渡到 visible：

```tsx
<div>
  <button popovertarget="my-popover">Check for updates</button>
  <div popover id="my-popover" class="opacity-0 starting:open:opacity-0 ...">
    <!-- ... -->
  </div>
</div>
```

## ARIA 状态

- 使用 aria-* 变体根据 ARIA 属性有条件地设置样式。

## Data attributes

- 使用 data-* 变体根据数据属性有条件地应用样式。

```tsx
<!-- Will apply -->
<div data-active class="border border-gray-300 data-active:border-purple-500">
  <!-- ... -->
</div>
<!-- Will not apply -->
<div class="border border-gray-300 data-active:border-purple-500">
  <!-- ... -->
</div>
```

```tsx
// 如果您需要检查特定值，则可以使用任意值：
<!-- Will apply -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
<!-- Will not apply -->
<div data-size="medium" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

## RTL support

- 在构建多方向布局时，使用 rtl 和 ltr 变体分别有条件地以从右到左和从左到右模式添加样式：

## Open/closed

当 <details> 或 <dialog> 元素处于打开状态时，使用打开变体有条件地添加样式：

## 直接为子级设置样式

- 通常最好将实用程序类直接放在子元素上，但是在需要为您无法控制的直接子元素设置样式的情况下，可以使用 * 变体

```tsx
<div>
  <h2>Categories<h2>
  <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
    <li>Sales</li>
    <li>Marketing</li>
    <li>SEO</li>
    <!-- ... -->
  </ul>
</div>
```

## 为所有后代设置样式

- 与 * 一样，**变体也可用于为元素的子元素设置样式。 主要区别在于** 将对所有后代应用样式，而不仅仅是直接子代。 当你将它与另一个变体结合使用时，这一点尤其有用，可以缩小所选内容的范围

```tsx
// 子元素 img 大小为12px 12px 圆形
<ul class="**:data-avatar:size-12 **:data-avatar:rounded-full ...">
  {#each items as item}
    <li>
      <img src={item.src} data-avatar />
      <p>{item.name}</p>
    </li>
  {/each}
</ul>
```

## 自定义

- 就像任意值允许您在实用程序类中使用自定义值一样，任意变体允许您直接在 HTML 中编写自定义选择器变体。

```tsx
<ul role="list">
  {#each items as item}
    <li class="[&.is-dragging]:cursor-grabbing">{item}</li>
  {/each}
</ul>
```

```tsx
// 选择器中需要空格，则可以使用下划线
// 所有 p margin-top:[4]
<div class="[&_p]:mt-4">
  <p>Lorem ipsum...</p>
  <ul>
    <li>
      <p>Lorem ipsum...</p>
    </li>
    <!-- ... -->
  </ul>
</div>
```

## 注册自定义变体

* 如果您发现自己在项目中多次使用相同的任意变体，则可能需要创建自定义变体

```css
@custom-variant pointer-coarse {
  @media (pointer: coarse) {
    @slot;
  }
}

<button class="pointer-coarse:size-12 ..."></button>
```
