
#  组件规范(bem)

参考：
https://en.bem.info/

# Block

功能独立的页面组件，可以`重复`使用。在HTML中，块由class属性表示。
* 该块名称描述它的目的（“这是什么？” - menu或button），而不是它的状态（“是什么样子的？” - red或big）。
* Block不应该影响其环境，不应设置块的外部几何（边距）或定位。
* ID使用BEM时，也不应使用CSS标记或选择器。

## Block 嵌套
* 块可以相互嵌套。
* 您可以拥有任意数量的嵌套级别。

```css
<!-- `header` block -->
<header class="header">
    <!-- Nested `logo` block -->
    <div class="logo"></div>

    <!-- Nested `search-form` block -->
    <form class="search-form"></form>
</header>
```

# Element

* Element名称描述它的目的（“这是什么？” - item，text等），而不是它的状态（“什么类型的，或者是什么样子呢？” - red，big等）。
* Element全名的结构是block-name__element-name。元素名称使用双下划线（__）与块名称分隔。

## Element 使用

* 元素可以彼此嵌套。
* 您可以拥有任意数量的嵌套级别。
* 元素始终是块的一部分，而不是另一个元素。这意味着元素名称不能定义层次结构，例如block__elem1__elem2。
* Element始终是块的一部分，您`不应该单独`使用它。
* Element是可选的块组件。并非所有Block都有Element。

# 修饰
* 该修改名称描述其外观（“多大？”或者“哪个主题？”等等- size_s或theme_islands）其状态（“它是如何从其他人有什么不同？” - disabled，focused等），其行为（“如何它的行为是什么？“或”它如何响应用户？“ - 例如directions_left-top）。
* 修饰符名称通过单个下划线（_）与块或元素名称分隔。
* 修饰符应更改实体的外观，行为或状态，而不是替换它。

## 修饰符的类型

### 布尔

* 仅在修改符的存在或不存在很重要时使用，并且其值无关紧要。例如，disabled。如果存在布尔修饰符，则假定其值为true。

* 修饰符全名的结构遵循以下模式：
    * block-name_modifier-name
    * block-name__element-name_modifier-name

### 具有Key-Value

* 在修饰符值很重要时使用。例如，“具有islands设计主题的菜单”：menu_theme_islands。

* 修饰符全名的结构遵循以下模式：
    * block-name_modifier-name_modifier-value
    * block-name__element-name_modifier-name_modifier-value

# 混合

* 结合多个实体的行为和样式，无需复制代码。
* 基于现有UI组件创建语义上的新UI组件。

```
<!-- `header` block -->
<div class="header">
    <!--
        The `search-form` block is mixed with the `search-form` element
        from the `header` block
    -->
    <div class="search-form header__search-form"></div>
</div>
```

# 文件结构

* 单个块对应于单个目录。

* 块和目录具有相同的名称。例如，header块位于header/目录中，menu块位于menu/目录中。

* 块的实现分为单独的技术文件。例如，header.css和header.js。

* 块目录是其元素和修饰符的子目录的根目录。

* 元素目录的名称以双下划线（__）开头。例如，header/__logo/和menu/__item/。

* 修饰符目录的名称以单个下划线（_）开头。例如，header/_fixed/和menu/_theme_islands/。

* 元素和修饰符的实现分为单独的技术文件。例如，header__input.js和header_theme_islands.css。


# 命名规则

## block-name__elem-name--mod-name--mod-val

* 名称以小写拉丁字母书写。
* BEM实体名称中的单词用连字符（-）分隔。
* 元素名称通过双下划线（__）与块名称分隔。
* 布尔修饰符通过双连字符（--）与块或元素的名称分隔开。
* 修饰符的值通过双连字符（--）与其名称分隔。

自己的规范
* 全小写单词之间用'-'连接
* 适度使用标签选择器 .block span{},增强语义和降低对特定HTML结构的依赖
* 深度不得超过3级
* 状态状态修改以is开头 如.is-active .is-hover
* 慎用!important
* 组件的block 不得定义width、height、margin、padding、border等外观样式，应尽量使用混合类,调整外观
* 老项目中使用bem是可将bem作为命名空间，防止样式冲突如：.bem-block{}、bem-block__elem...
* 新项目中使用bem,可加入自己的组件命名空间;
* 不得使用'J-'或'J_'以开头的类，这个用于js专用类。
* 不得使用ID选择器;
* 不得使用标签选择器，标签样式对标签依赖性强;
* 组合选择器不得使用在除状态以外的地方,如.btn.isactive;
* 组件单一责任,单一责任选择器为代码提供了更大的灵活性。;
* 开放/闭合原则,通过修饰符打开以进行扩展，但是对于更改是不允许的;
* 减少代码中的重复;


## 通用原则
 * 在任何代码库中，无论有多少人参与及贡献，所有代码都应该如同一个人编写的一样。
 * 严格执行一致认可的风格。
## 空格
## 注释
## 格式  

1. Box （display, float, position, left, top, height）
2. Border （border，border-radius）
3. Background (background)
4. Text (font-family，font-size，text-transform，letter-spacing)
5. Other （transform,animation）

```css
.block{
    display:none;
    float:left;
    
    position:absolute;
    left:auto;
    right:auto;

    width:400px;
    height:400px;

    border:1px solid #ddd;
    border-radius:4px;

    background:#ccc;

    font-family：'宋体';
    font-size:14px;
    color:#ccc;

    transform: all .3s;
    animation: myanimation .3s;
}
```
## 命名

* 尽量带有语义的单词

## 实例
## 代码组织
## 构建及部署