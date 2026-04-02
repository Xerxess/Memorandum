<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Flexbox 布局](#flexbox-布局)

<!-- /code_chunk_output -->

# Flexbox 布局

Flexbox 在 React Native 中的工作方式与 Web 上的 CSS 基本相同，但也有一些例外。

- 默认值有所不同：
  - flexDirection 默认为 column 而不是 row
  - alignContent 默认为 flex-start 而不是 stretch  
  - flexShrink 默认为 0 而不是 1 ，并且 flex 参数仅支持单个数字。
- flexDirection 控制节点子元素的布局方向，也称为主轴
  - column （ 默认值 ）子元素从上到下对齐。
  - row 子元素从左到右对齐。
  - column-reverse 使子元素从下到上对齐。
  - row-reverse 使子元素从右向左对齐。
- direction 指定层级结构中子元素和文本的排列方向
- LTR （ 默认值 ）：文本及其子元素从左到右布局。
- RTL 从右到左）文本及其子元素从右向左布局。
- justifyContent 描述了如何使子元素在其容器的主轴方向上对齐。
  - flex-start （ 默认值 ）将容器的子元素与容器主轴的起点对齐。
  - flex-end 将容器的子元素对齐到容器主轴的末端。
  - center 将容器的子元素沿容器主轴中心对齐。
  - space-between 将子元素均匀地分布在容器的主轴上，并将剩余的空间分配给子元素。
  - space-around 会沿容器主轴均匀地为子元素留出空间，并将剩余空间分布在子元素周围。与 space-between 相比，使用 space-around 会导致空间分布在第一个子元素的开头和最后一个子元素的结尾。
  - space-evenly 沿主轴均匀分布对齐容器内的子元素。每对相邻元素之间的间距，即主轴起始边与第一个元素之间、主轴结束边与最后一个元素之间的间距，都完全相同。
- alignItems 方法用于描述如何沿容器的交叉轴对齐子元素。
- alignSelf 选项和效果与 alignItems 相同，但它不会影响容器内的所有子元素，而是可以将此属性应用于单个子元素，以更改其在父元素中的对齐方式。
- flexWrap 属性设置在容器上，用于控制子元素沿主轴方向超出容器尺寸时的处理方式。默认情况下，子元素会被强制排列成一行（这可能会导致元素缩小）。
- alignContent 定义了线条沿交叉轴的分布。它仅在使用 flexWrap 将项目换行到多行时生效。

```tsx
<View
      style={[
        {
          flex: 1,
          padding: 20,
        },
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1, backgroundColor: 'red'}} />
      <View style={{flex: 2, backgroundColor: 'darkorange'}} />
      <View style={{flex: 3, backgroundColor: 'green'}} />
    </View>
```
