# css3 技巧

> 单行文本的情况下，用省略号“...”隐藏超出范围的文本
```css
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
```
    white-space：normal | pre | nowrap | pre-wrap | pre-line
* normal 默认处理方式。
* pre 用等宽字体显示预先格式化的文本，不合并文字间的空白距离，当文字超出边界时不换行。可查阅pre对象
* nowrap `强制在同一行内显示所有文本`，合并文本间的多余空白，直到文本结束或者遭遇br对象。
* pre-wrap 用等宽字体显示预先格式化的文本，不合并文字间的空白距离，当文字碰到边界时发生换行。
* pre-line 保持文本的换行，不保留文字间的空白距离，当文字碰到边界时发生换行。

> 多行文本的情况下，用省略号“...”隐藏超出范围的文本

```css
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
```

> 伪对象:before和:after定义过渡和动画

   * IE 不支持
   * 一些低版本浏览器不支持

   > 修改输入框placeholder文字默认颜色

   ```css
  &::-moz-placeholder {
    ...
  }
  &:-ms-input-placeholder {
    ...
  }
  // Internet Explorer 10+
  &::-webkit-input-placeholder {
    ...
  }
   ```