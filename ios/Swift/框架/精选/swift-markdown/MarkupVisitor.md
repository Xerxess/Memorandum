<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [MarkupVisitor](#markupvisitor)
  - [实例方法](#实例方法)

<!-- /code_chunk_output -->

# MarkupVisitor

访问标记元素并返回结果。

```swift
protocol MarkupVisitor
```

## 实例方法

- func defaultVisit(Markup) -> Self.Result 当访问者方法未为特定元素实现时使用的默认实现。
- func visit(Markup) -> Self.Result 访问任何类型的标记元素并返回结果。
- func visitBlockDirective(BlockDirective) -> Self.Result
- func visitBlockQuote(BlockQuote) -> Self.Result 当解析器遇到以 > 开头的引用内容时，它会生成一个 BlockQuote 元素。如果你实现了一个自定义的 MarkupVisitor（访问者），你可以通过重写 visitBlockQuote 来定义程序如何处理这些引用块。
- func visitCodeBlock(CodeBlock) -> Self.Result 处理 围栏代码块（Fenced Code Blocks） 的核心方法。与行内代码（InlineCode）不同，CodeBlock 指的是由三个反引号（```）包围的独立多行代码区域。
- func visitCustomBlock(CustomBlock) -> Self.Result 用于处理 自定义块级元素（Custom Block） 的方法。

- func visitCustomInline(CustomInline) -> Self.Result visitCustomInline 与之前提到的 visitCustomBlock 逻辑非常相似，但它专门用于处理 行内（Inline-level） 的自定义元素。

- func visitDocument(Document) -> Self.Result
- func visitDoxygenParameter(DoxygenParameter) -> Self.Result 专门用于处理 Doxygen 风格注释 中参数说明的方法。

- func visitDoxygenReturns(DoxygenReturns) -> Self.Result
- func visitEmphasis(Emphasis) -> Self.Result 用于处理 斜体（Italic/Emphasis） 文本。当 Markdown 源码中使用单个星号 *text* 或下划线 _text_ 时，解析器会生成一个 Emphasis 节点。
- func visitHTMLBlock(HTMLBlock) -> Self.Result 用于处理 Markdown 文档中**块级（Block-level）**的原始 HTML 代码。 
- func visitHeading(Heading) -> Self.Result 处理 Markdown 标题（Headings） 的核心方法。无论是使用 #（ATX 风格）还是下划线（Setext 风格）定义的标题，解析后都会进入这个回调。
- func visitImage(Image) -> Self.Result
- func visitInlineAttributes(InlineAttributes) -> Self.Result
- func visitInlineCode(InlineCode) -> Self.Result
- func visitInlineHTML(InlineHTML) -> Self.Result
- func visitLineBreak(LineBreak) -> Self.Result
- func visitLink(Link) -> Self.Result
- func visitParagraph(Paragraph) -> Self.Result 是最常被调用的方法之一，因为 段落（Paragraph） 是 Markdown 文档中绝大多数文本内容的容器。
- func visitSoftBreak(SoftBreak) -> Self.Result 用于处理 软换行（Soft Break）。
- func visitStrikethrough(Strikethrough) -> Self.Result
- func visitStrong(Strong) -> Self.Result 处理 加粗（Strong/Bold） 文本。当 Markdown 源码中使用两个星号 **text** 或两个下划线 __text__ 时，解析器会生成此节点。
- func visitSymbolLink(SymbolLink) -> Self.Result
- func visitTable(Table) -> Self.Result visitTable 是处理 表格（Tables） 节点的顶级方法。它负责访问整个表格结构。
- func visitTableBody(Table.Body) -> Self.Result 专门用于处理表格中**主体内容区域（Table Body）**的方法。它位于 Table 节点之下，包含了除表头（Head）以外的所有数据行。
- func visitTableCell(Table.Cell) -> Self.Result 处理表格中**最小数据单元（单元格）**的方法。它位于 Table.Row 之下，是实际内容的承载者。
- func visitTableHead(Table.Head) -> Self.Result 专门用于处理表格**表头区域（Table Head）**的方法。它位于 Table 节点之下，通常包含表格的第一行（即定义列标题的那一行）。
- func visitTableRow(Table.Row) -> Self.Result 用于处理表格中的**行（Row）**节点。它是连接“区域（头/体）”与“具体数据（单元格）”的桥梁。
- func visitText(Text) -> Self.Result 整个访问者模式中最基础、最频繁被调用的方法。它代表了 Markdown 文档中最纯粹的文本内容。
- func visitThematicBreak(ThematicBreak) -> Self.Result
- func visitOrderedList(OrderedList) -> Self.Result 专门用于处理 有序列表（Ordered List） 节点。当你使用 1. 、2. 等数字开头的行时，解析器会生成此节点。
- func visitUnorderedList(UnorderedList) -> Self.Result 处理 无序列表（Unordered List） 的方法。当你在 Markdown 中使用 *、- 或 + 开头的列表项时，解析器会生成这个节点。
- func visitListItem(ListItem) -> Self.Result 处理 列表项（List Item） 的核心方法。它既可以属于无序列表（UnorderedList），也可以属于有序列表（OrderedList）。
