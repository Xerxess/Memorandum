<!-- TOC -->

- [DSL 是什么](#dsl-%E6%98%AF%E4%BB%80%E4%B9%88)
    - [常见的 DSL 包括 Regex 以及 HTML & CSS](#%E5%B8%B8%E8%A7%81%E7%9A%84-dsl-%E5%8C%85%E6%8B%AC-regex-%E4%BB%A5%E5%8F%8A-html--css)
    - [构建 DSL](#%E6%9E%84%E5%BB%BA-dsl)
    - [DSL 缺乏](#dsl-%E7%BC%BA%E4%B9%8F)
    - [Embedded DSL（嵌入式 DSL）](#embedded-dsl%E5%B5%8C%E5%85%A5%E5%BC%8F-dsl)

<!-- /TOC -->

https://martinfowler.com/bliki/DomainSpecificLanguage.html

https://draveness.me/dsl/

# DSL 是什么

DSL 其实是 Domain Specific Language 的缩写，中文翻译为领域特定语言（下简称 DSL）；而与 DSL 相对的就是 GPL，这里的 GPL 并不是我们知道的开源许可证，而是 General Purpose Language 的简称，即通用编程语言，也就是我们非常熟悉的 Objective-C、Java、Python 以及 C 语言等等。

## 常见的 DSL 包括 Regex 以及 HTML & CSS

* Regex:正则表达式仅仅指定了字符串的 pattern，其引擎就会根据 pattern 判断当前字符串跟正则表达式是否匹配。
* SQL:SQL 语句在使用时也并没有真正的执行，我们输入的 SQL 语句最终还要交给数据库来进行处理，数据库会从 SQL 语句中读取有用的信息，然后从数据库中返回使用者期望的结果。
* HTML & CSS:HTML 和 CSS 只是对 Web 界面的结构语义和样式进行描述，虽然它们在构建网站时非常重要，但是它们并非是一种编程语言，正相反，我们可以认为 HTML 和 CSS 是在 Web 中的领域特定语言

## 构建 DSL

DSL 的构建与编程语言其实比较类似，想想我们在重新实现编程语言时，需要做那些事情；实现编程语言的过程可以简化为定义语法与语义，然后实现编译器或者解释器的过程，而 DSL 的实现与它也非常类似，我们也需要对 DSL 进行语法与语义上的设计

* 设计语法和语义，定义 DSL 中的元素是什么样的，元素代表什么意思
* 实现 parser，对 DSL 解析，最终通过解释器来执行

HTML 中所有的元素都是包含在尖括号 <> 中的，尖括号中不同的元素代表了不同的标签，而这些标签会被浏览器解析成 DOM 树，再经过一系列的过程调用 Native 的图形 API 进行绘制。

## DSL 缺乏

DSL 中缺乏抽象的概念，比如：模块化、变量以及方法等

模项目时往往不会直接手写 CSS 文件，而是会使用 Sass 或者 Less 为 CSS 带来更强大的抽象能力，比如嵌套规则，变量，混合以及继承等特性。

## Embedded DSL（嵌入式 DSL）

内部 DSL 的实现往往是嵌入一些编程语言的，比如 iOS 的依赖管理组件 CocoaPods 和 Android 的主流编译工具 Gradle，前者的实现是基于 Ruby 语言的一些特性，而后者基于 Groovy。