<!-- TOC -->

- [URLSearchParams](#urlsearchparams)
- [Using application/x-www-form-urlencoded](#using-applicationx-www-form-urlencoded)

<!-- /TOC -->
axios

# URLSearchParams

https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams  
https://github.com/WebReflection/url-search-params  
https://github.com/ljharb/qs

# Using application/x-www-form-urlencoded

* 默认情况下，axios将JavaScript对象序列化为JSON

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

```js
// es6
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```
