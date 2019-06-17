# capture="user|environment"
https://w3c.github.io/html-media-capture/#the-capture-attribute

* 可以捕获用户摄像头

```js
<input id="file-input" type="file" accept="image/*" capture="user"/>

<input id="file-input" type="file" accept="image/*" capture="environment"/>
```

* user 后置
* environment 前置