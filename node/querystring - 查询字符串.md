#  querystring - 查询字符串

模块提供了一些实用函数，用于解析与格式化 URL 查询字符串。

```js
const querystring = require('querystring');
```

## querystring.escape(str)
对给定的 str 进行 URL 编码。

该方法是提供给 `querystring.stringify()` 使用的，通常不直接使用。

## querystring.unescape(str)
对给定的 str 进行解码。

该方法是提供给 `querystring.parse()` 使用的，通常不直接使用

## querystring.parse(str[, sep[, eq[, options]]])

* str `<string>` 要解析的 URL 查询字符串。
* sep `<string>` 用于界定查询字符串中的键值对的子字符串。默认为 '&'。
* eq `<string>` 用于界定查询字符串中的键与值的子字符串。默认为 '='。
* options `<Object>`
* decodeURIComponent `<Function>` 解码查询字符串的字符时使用的函数。默认为 querystring.unescape()。
maxKeys `<number>` 指定要解析的键的最大数量。指定为 0 则不限制。默认为 1000。

```js
querystring.parse('foo=bar&abc=xyz&abc=123');

{
  foo: 'bar',
  abc: ['xyz', '123']
}

```

## querystring.stringify(obj[, sep[, eq[, options]]])

* obj `<Object>` 要序列化成 URL 查询字符串的对象。
* sep <string> 用于界定查询字符串中的键值对的子字符串。默认为 '&'。
* eq `<string>` 用于界定查询字符串中的键与值的子字符串。默认为 '='。
* options
* encodeURIComponent `<Function>` 把对象中的字符转换成查询字符串时使用的函数。默认为 querystring.escape()。

方法通过遍历给定的 obj 对象的自身属性，生成 URL 查询字符串。

```js
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'
```