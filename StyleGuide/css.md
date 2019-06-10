## 代码风格

* [强制] UTF-8 编码
* 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
* [强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。
* [强制] 属性选择器中的值必须用双引号包围。

```css
/* good */
article[character="juliet"] {
    voice-family: "Vivien Leigh", victoria, female;
}

/* bad */
article[character='juliet'] {
    voice-family: "Vivien Leigh", victoria, female;
}
```
* [强制] 属性定义必须另起一行。
* [强制] 属性定义后必须以分号结尾。
* [强制] 不得使用 id 选择器
* [建议] 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确。
* [建议] 在可以使用缩写的情况下，尽量使用属性缩写。
* [建议] 使用 border / margin / padding 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。
* [建议] 同一 rule set 下的属性在书写时，应按功能进行分组，并以 Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果） 的顺序书写，以提高代码的可读性。
    * Formatting Model 相关属性包括：position / top / right / bottom / left / float / display / overflow 等
    * Box Model 相关属性包括：border / margin / padding / width / height 等
    * Typographic 相关属性包括：font / line-height / text-align / word-wrap 等
    * Visual 相关属性包括：background / color / transition / list-style 等
* [建议] 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 clear 或触发 BFC 的方式进行 clearfix。尽量不使用增加空标签的方式。
* [建议] 尽量不使用 !important 声明。
* [强制] 当数值为 0 - 1 之间的小数时，省略整数部分的 0。
```css
/* good */
panel {
    opacity: .8;
}

/* bad */
panel {
    opacity: 0.8;
}
```

* [强制] url() 函数中的路径不加引号。
* [建议] url() 函数中的绝对路径可省去协议名。
* [强制] 长度为 0 时须省略单位。 (也只有长度单位可省)
* [强制] RGB颜色值必须使用十六进制记号形式 #rrggbb。不允许使用 rgb()。
* [强制] 颜色值可以缩写时，必须使用缩写形式。
* [强制] 颜色值不允许使用命名色值。
* [强制] 需要在 Windows 平台显示的中文内容，其字号应不小于 12px。
* [强制] font-weight 属性必须使用数值方式描述。
* [建议] line-height 在定义文本段落时，应使用数值。
* [建议] 尽可能在浏览器能高效实现的属性上添加过渡和动画。
* [强制] 禁止使用 Expression。

# 字体

[强制] font-family 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( serif / sans-serif )。

字体 |	操作系统	|Family Name
---------|----------|--------- 
宋体 (中易宋体)	|Windows	|SimSun
黑体 (中易黑体)	|Windows	|SimHei
微软雅黑	| Windows	| Microsoft YaHei
微软正黑	| Windows	| Microsoft JhengHei
华文黑体	| Mac/iOS	| STHeiti
冬青黑体	| Mac/iOS	| Hiragino Sans GB
文泉驿正黑	| Linux	| WenQuanYi Zen Hei
文泉驿微米黑	| Linux	| WenQuanYi Micro Hei