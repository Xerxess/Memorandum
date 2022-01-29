# FontFace

https://developer.mozilla.org/en-US/docs/Web/API/FontFace

该 FontFace 界面代表一个单一的可用字体。它允许控制字体的来源，作为外部资源的 URL 或缓冲区；它还允许控制何时加载字体及其当前状态。

# 兼容

Chrome:35
Edge:79
Firefox:41
Internet Explorer:NO

# 语法

```js
new FontFace(family, source);
new FontFace(family, source, descriptors);
```

# Note

-

# polyfill

```js

```

# 示例

```js
async function loadFonts() {
    const font = new FontFace('myfont', 'url(myfont.woff)');
    // wait for font to be loaded
    await font.load();
    // add font to document
    document.fonts.add(font);
    // enable font with CSS class
    document.body.classList.add('fonts-loaded');
}
```

# 笔记
