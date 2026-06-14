
# Markup

- 所有支持的标记元素都已在框架中实现。仅将此协议用作通用约束。
  - BlockDirective
  - BlockQuote
  - CodeBlock
  - CustomBlock
  - CustomInline
  - Document
  - DoxygenParameter
  - DoxygenReturns
  - Emphasis
  - HTMLBlock
  - Heading
  - Image
  - InlineAttributes
  - InlineCode
  - InlineHTML
  - LineBreak
  - Link
  - ListItem
  - OrderedList
  - Paragraph
  - SoftBreak
  - Strikethrough
  - Strong
  - SymbolLink
  - Table
  - Table.Body
  - Table.Cell
  - Table.Head
  - Table.Row
  - Text
  - ThematicBreak
  - UnorderedList

```
protocol Markup
```

## 属性

- var childCount: Int 该元素的子元素数量。
- var children: MarkupChildren 该元素的子元素。
- var detachedFromParent: Markup 返回与父元素分离的元素。
- var indexInParent: Int 父母子女中的索引。
- var isEmpty: Bool 如果此元素没有子元素， true 。
- var parent: Markup? 此元素的父元素，如果是根元素则为 nil 。
- var range: SourceRange? 解析此元素的文本范围，如果是在解析之外构造的，则为 nil 。
- var root: Markup 该元素所在树的根节点，或者如果它是根节点，则为该元素本身。

## 方法

- func accept<V>(inout V) -> V.Result 接受 Markup Visitor 并调用该元素的特定访问方法。
- func child(at: Int) -> Markup? 返回给定位置的子节点（如果该位置在 children .indices 的范围内）。
- func child(through: ChildIndexPath.Element...) -> Markup? 通过向下遍历每个路径元素索引处的子元素来遍历此标记树，如果该索引处没有子元素，则返回 nil 。
- func child<S>(through: S) -> Markup? 通过向下遍历每个路径元素索引处的子元素来遍历此标记树，如果该索引处没有子元素，则返回 nil 。
- func child(through: TypedChildIndexPath) -> Markup? 通过向下遍历每个路径元素索引处的子元素来遍历此标记树，如果该索引处没有子元素，或者该路径元素的预期类型不匹配，则返回 nil 。
- func debugDescription(options: MarkupDumpOptions) -> String 打印出树的调试表示。
- func format(options: MarkupFormatter.Options) -> String 使用给定的格式规则打印此元素。
- func hasSameStructure(as: Markup) -> Bool 如果此元素与另一个元素具有相同的底层树结构，则返回 true。
- func isIdentical(to: Markup) -> Bool 如果此元素与另一个元素完全相同，则通过比较内部唯一标识符返回 true 。
- func withUncheckedChildren<Children>(Children) -> Markup 返回一个包含给定子元素的此元素的副本。
