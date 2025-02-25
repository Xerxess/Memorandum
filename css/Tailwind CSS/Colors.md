<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Colors](#colors)
  - [透明度](#透明度)

<!-- /code_chunk_output -->

# Colors

* 默认调色板中的每种颜色都包含11种程度，其中50最浅，而950个是最暗，500正常

- red 红色
- orange 橙色
- amber 琥珀色
- yellow 黄色
- lime 黄绿色
- green 绿色
- emerald 浅绿色
- teal 蓝绿色
- cyan 青色
- sky 天蓝
- blue 蓝色
- indigo 靛青
- violet 紫色
- purple 紫色的
- fuchsia 紫红色
- pink 粉色
- rose 玫瑰
- slate 石板
- gray 灰色的
- zinc 锌
- neutral 中性的
- stone 石头

```tsx
<div class="bg-gray-500 dark:bg-gray-800">
</div>
```

## 透明度

```tsx
// 使用bg-black/75 ( 75 ）将颜色的alpha通道（75）设置为75％的语法，调整颜色的不透明度
<div>
  <div class="bg-sky-500/10"></div>
  <div class="bg-sky-500/20"></div>
  <div class="bg-sky-500/30"></div>
  <div class="bg-sky-500/40"></div>
  <div class="bg-sky-500/50"></div>
  <div class="bg-sky-500/60"></div>
  <div class="bg-sky-500/70"></div>
  <div class="bg-sky-500/80"></div>
  <div class="bg-sky-500/90"></div>
  <div class="bg-sky-500/100"></div>
</div>

// 支持任意值和CSS变量速记
<div class="bg-pink-500/[71.37%]"><!-- ... --></div>
<div class="bg-cyan-400/(--my-alpha-value)"><!-- ... --></div>
```
