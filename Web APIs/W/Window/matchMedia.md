# matchMedia

https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia  
返回一个新 MediaQueryList 对象，该对象可用于确定是否 document 匹配媒体查询字符串，以及监视文档以检测何时匹配（或停止匹配）该媒体查询。

# 兼容

Chrome:9
Edge:12
Firefox:6
Internet Explorer:10

# 语法

```js
mqList = window.matchMedia(mediaQueryString);
```

# Note

-

# polyfill

```js

```

# 示例

```js
// 判断当前是否处于暗黑模式
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
```

# 笔记

# 以编程方式测试媒体查询

https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries

```js
const mediaQueryList = window.matchMedia('(orientation: portrait)');

if (mediaQueryList.matches) {
  /* The viewport is currently in portrait orientation */
} else {
  /* The viewport is not currently in portrait orientation, therefore landscape */
}

// Add the callback function as a listener to the query list.
mediaQueryList.addEventListener('change', () => {});
```
