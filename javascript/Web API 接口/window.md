# window

* 属性
    * [window.closed](#window-closed)
    * [window.](#window-)

window对象表示包含DOM文档的窗口; 该document属性指向该窗口中加载的DOM文档

<h2 id="properties">属性</h2>

<h3 id="window-closed">window.closed <h3> 

只读属性   
表示所引用的窗口是否关闭

```js
// Check that an opener exists and is not closed
if (window.opener && !window.opener.closed) {
  window.opener.location.href = "http://www.mozilla.org";
}
```

<h3 id="window-console">window.console</h3>