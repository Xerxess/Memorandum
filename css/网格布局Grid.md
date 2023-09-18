<!-- TOC -->

- [网格布局Grid](#%E7%BD%91%E6%A0%BC%E5%B8%83%E5%B1%80grid)
    - [grid](#grid)
    - [grid-area](#grid-area)
    - [grid-auto-columns](#grid-auto-columns)
    - [grid-auto-flow](#grid-auto-flow)
    - [grid-auto-rows](#grid-auto-rows)
    - [grid-column](#grid-column)
    - [grid-row](#grid-row)
    - [grid-template](#grid-template)
    - [grid-template-areas](#grid-template-areas)
    - [grid-template-rows](#grid-template-rows)
    - [grid-template-columns](#grid-template-columns)
    - [grid-gap](#grid-gap)

<!-- /TOC -->

# 网格布局Grid

CSS Grid 是一种用于创建网格布局的 CSS 模块。它提供了一种强大的方式来定义网格容器（grid container）和网格项（grid items），以实现灵活的网页布局。

使用 CSS Grid，可以将网页内容划分为行和列，然后将网格项放置到这些行和列的交叉点上。这使得可以以更直观和精确的方式控制元素的位置和布局。

```css
.grid-container {
  display: grid;
  grid-template-rows: 100px 200px; /* 定义两行，高度分别为 100px 和 200px */
  grid-template-columns: 1fr 2fr; /* 定义两列，宽度比例为 1:2 */
}

.grid-item {
  grid-row: 1 / 2; /* 网格项占据从第 1 行到第 2 行的空间 */
  grid-column: 2 / 3; /* 网格项占据从第 2 列到第 3 列的空间 */
}
```

## grid

该属性是以下 CSS 属性的简写

- grid-auto-columns
- grid-auto-flow
- grid-auto-rows
- grid-template-areas
- grid-template-columns
- grid-template-rows

初始值

- grid-template-rows: none
- grid-template-columns: none
- grid-template-areas: none
- grid-auto-rows: auto
- grid-auto-columns: auto
- grid-auto-flow: row
- grid-column-gap: 0
- grid-row-gap: 0
- column-gap: normal
- row-gap: normal

```css
grid = 
  <'grid-template'> |
  <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>?  |
  [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>  
```

## grid-area

grid-area 是 CSS Grid 中用于指定网格项位置和大小的属性。  
它允许你为网格项指定一个名称，然后通过该名称来放置网格项到网格容器的指定区域。

该属性是以下 CSS 属性的简写

- grid-row-start
- grid-column-start
- grid-row-end
- grid-column-end

初始值

- grid-row-start:auto
- grid-column-start:auto
- grid-row-end:auto
- grid-column-end:auto

```css
grid-area = 
  <grid-line> [ / <grid-line> ]{0,3}  
```

```css
/* 定义网格区域名称：通过为网格项指定一个名称，可以在网格容器中定义一个网格区域。 */
.grid-item {
  grid-area: my-area;
}


/* 通过在网格容器上使用 grid-template-areas 属性，并在其中指定网格区域的位置，将网格项放置到相应的区域。 */
.grid-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "sidebar footer";
}
.my-area {
  grid-area: main;
}


/* 可以使用 grid-row 和 grid-column 属性结合起始和结束的行列位置，或者使用 grid-area 属性的更简洁方式来控制网格项的大小。 */
.my-area {
  grid-area: 2 / 1 / 4 / 3; /* 网格项占据从第 2 行到第 4 行、第 1 列到第 3 列的空间 */
}
```

## grid-auto-columns

grid-auto-columns 是 CSS Grid 中用于设置网格容器中自动生成的列的大小的属性。  
grid-auto-columns 属性可以接受各种长度值，如像素（px）、百分比（%）、弹性单位（fr）等。  
你还可以使用关键字 auto 来指定自动调整大小的列。

初始值

grid-auto-columns:auto

```css
.grid-container {
  display: grid;
  grid-auto-columns: 100px; /* 自动生成的列的宽度为 100px */
}


/* 支持多个值的使用，以便为不同的自动生成列设置不同的大小。 */
.grid-container {
  display: grid;
  grid-auto-columns: 100px 1fr; /* 第一个自动生成的列宽度为 100px，第二个自动生成的列宽度为剩余空间的一份 */
}
```

## grid-auto-flow

用于定义自动生成的网格项如何排列的属性。它控制了当网格容器中的网格项无法放置在明确定义的网格轨道中时，如何自动分配它们到剩余的空间。

```css
/* row：默认值。自动分配的网格项将按照行的顺序从左到右、从上到下进行排列。  */
.grid-container {
  display: grid;
  grid-auto-flow: row;
}

/* column：自动分配的网格项将按照列的顺序从上到下、从左到右进行排列。 */
.grid-container {
  display: grid;
  grid-auto-flow: column;
}

/* row dense：类似于 row，但会尝试填充网格容器中的空隙，以确保紧凑的布局。 */
.grid-container {
  display: grid;
  grid-auto-flow: row dense;
}

/* column dense：类似于 column，但会尝试填充网格容器中的空隙，以确保紧凑的布局。 */
.grid-container {
  display: grid;
  grid-auto-flow: column dense;
}
```

## grid-auto-rows

用于设置自动生成的行的大小的属性。它控制了当网格容器中的网格项无法放置在明确定义的行中时，如何自动分配它们到剩余的空间。  
属性接受各种长度值，如像素（px）、百分比（%）、弹性单位（fr）等。你还可以使用关键字 auto 来指定自动调整高度的行。

```css
/* Keyword values */
/* min-content 是一个 CSS 关键字，用于指定元素的尺寸应该适合其内容的最小大小。 */
/* max-content 是一个 CSS 关键字，用于指定元素的尺寸应该适合其内容的最大大小。 */
grid-auto-rows: min-content;
grid-auto-rows: max-content;
grid-auto-rows: auto;

/* <length> values */
grid-auto-rows: 100px;
grid-auto-rows: 20cm;
grid-auto-rows: 50vmax;

/* <percentage> values */
grid-auto-rows: 10%;
grid-auto-rows: 33.3%;

/* <flex> values */
grid-auto-rows: 0.5fr;
grid-auto-rows: 3fr;

/* minmax() values */
/* minmax 函数接受两个参数，表示最小值和最大值。它可用于设置宽度（width）和高度（height）属性，以确定元素应该具有的尺寸范围。 */
grid-auto-rows: minmax(100px, auto);
grid-auto-rows: minmax(max-content, 2fr);
grid-auto-rows: minmax(20%, 80vmax);

/* fit-content() values */
/* 用于指定元素的尺寸应该适合其内容的大小，同时也考虑到其他约束条件。 */
/* width: fit-content(200px); 元素的宽度将适应内容的大小，但不超过 200px */
/* width: fit-content(min(200px, 50%)); 元素的宽度将适应内容的大小，但不小于 200px 或父元素宽度的 50% */
/* height: fit-content(max(300px, 75%)); 元素的高度将适应内容的大小，但不超过 300px 或父元素高度的 75% */
grid-auto-rows: fit-content(400px);
grid-auto-rows: fit-content(5cm);
grid-auto-rows: fit-content(20%);
```

```css
/*  */
.grid-container {
  display: grid;
  grid-auto-rows: 100px; /* 自动生成的行的高度为 100px */
}

.grid-container {
  display: grid;
  grid-auto-rows: auto; /* 自动生成的行的高度自动调整 */
}

/* 支持多个值的使用，以便为不同的自动生成行设置不同的高度。  */
.grid-container {
  display: grid;
  grid-auto-rows: 100px 1fr; /* 第一个自动生成的行的高度为 100px，第二个自动生成的行的高度为剩余空间的一份 */
}
```

## grid-column

以下 CSS 属性的简写  

- grid-column-end
- grid-column-start

初始值

- grid-column-start: auto
- grid-column-end: auto

```css
/* grid-column: <start> / <end>：指定元素从 <start> 列到 <end> 列的范围。其中 <start> 和 <end> 可以是数字、关键字或特殊值。 */
/* 不包含end */
.element {
  grid-column: 2 / 4; /* 元素占据第 2 列至第 4 列 */
}

/* grid-column: <start> / span <n>：指定元素从 <start> 列开始，跨越 <n> 列。 */
.element {
  grid-column: 1 / span 3; /* 元素从第 1 列开始，跨越 3 列 */
}

/* grid-column: <start> / -1：指定元素从 <start> 列开始，一直延伸到网格容器的最后一列。 */
.element {
  grid-column: 3 / -1; /* 元素从第 3 列开始，延伸到网格容器的最后一列 */
}
```

## grid-row

以下 CSS 属性的简写  

- grid-row-end
- grid-row-start

初始值

- grid-row-start: auto
- grid-row-end: auto

```css
/* grid-row: <start> / <end>：指定元素从 <start> 行到 <end> 行的范围。其中 <start> 和 <end> 可以是数字、关键字或特殊值。 */
.element {
  grid-row: 2 / 4; /* 元素占据第 2 行至第 4 行 */
}

/* grid-row: <start> / span <n>：指定元素从 <start> 行开始，跨越 <n> 行。 */
.element {
  grid-row: 1 / span 3; /* 元素从第 1 行开始，跨越 3 行 */
}

/* grid-row: <start> / -1：指定元素从 <start> 行开始，一直延伸到网格容器的最后一行。 */
.element {
  grid-row: 3 / -1; /* 元素从第 3 行开始，延伸到网格容器的最后一行 */
}
```

## grid-template

用于定义网格布局中的行和列的大小、数量和布局方式。

以下 CSS 属性的简写

- grid-template-areas
- grid-template-columns
- grid-template-rows

初始值

- grid-template-columns: none
- grid-template-rows: none
- grid-template-areas: none

```css
.container {
  display: grid;
  grid-template: 
    "header header header" 50px
    "sidebar main main" 1fr
    "footer footer footer" 50px / 100px 200px;
}
```

## grid-template-areas

用于通过命名的网格区域定义网格布局。  
通过字符串表示，每个字符串代表一行网格布局，字符串中使用空格或制表符分隔命名的网格区域。  
每个网格区域的名称可以自定义，它们可以在 CSS 中引用以指定元素的位置。例如，可以将一个元素放置在名为 "header" 的网格区域中，将另一个元素放置在名为 "sidebar" 的网格区域中，以此类推。  
grid-template-areas 定义的网格布局还需要配合 grid-template-rows 和 grid-template-columns 属性来指定行和列的大小。

初始值  

grid-template-areas:none

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
```

## grid-template-rows

用于定义网格布局中的行的大小和数量。  
grid-template-rows 属性允许你指定网格布局中每行的大小。你可以使用具体的长度值、百分比、fr 单位（用于分配剩余空间）或自动来定义行的大小。  
使用重复函数 repeat() 来重复一个模式。

初始值  

grid-template-rows:none

```css
.container {
  display: grid;
  grid-template-rows: 100px 1fr 50px; /* 3 行，分别为 100px、剩余空间的 1 份和 50px */
}

.container {
  display: grid;
  grid-template-rows: repeat(3, 1fr); /* 3 行，每行都是剩余空间的 1 份 */
}

.container {
  display: grid;
  grid-template-rows: auto auto; /* 2 行，行的大小根据内容自动调整 */
}
```

## grid-template-columns

用于定义网格布局中的列的大小和数量。  
允许你指定网格布局中每列的大小。你可以使用具体的长度值、百分比、fr 单位（用于分配剩余空间）或自动来定义列的大小。  
可以使用重复函数 repeat() 来重复一个模式

初始值  

grid-template-columns:none

```css
.container {
  display: grid;
  grid-template-columns: 100px 1fr 50px; /* 3 列，分别为 100px、剩余空间的 1 份和 50px */
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 列，每列都是剩余空间的 1 份 */
}

.container {
  display: grid;
  grid-template-columns: auto auto; /* 2 列，列的大小根据内容自动调整 */
}
```

## grid-gap

用于定义网格布局中行和列之间的间距。

```css
.container {
  display: grid;
  grid-gap: 10px; /* 垂直和水平方向上的间距都为 10px */
}

.container {
  display: grid;
  grid-gap: 10px 20px; /* 垂直方向上的间距为 10px，水平方向上的间距为 20px */
}
```
