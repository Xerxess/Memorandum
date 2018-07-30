# util (实用工具)

主要用于支持 Node.js 内部 API 的需求

```js
const util = require('util');
```

<h2 id="util-">util.callbackify(original)</h2>
<h2 id="util-">util.format(format[, ...args])</h2>
返回一个格式化后的字符串，使用第一个参数作为一个类似 printf 的格式。

支持的占位符有：

* %s - 字符串。
* %d - 数值（整数或浮点数）
* %i - 整数.
* %f - 浮点值
* %j - JSON。如果参数包含循环引用，则用字符串 '[Circular]' 替换。
* %o 
* %O 
* %% - 单个百分号（'%'）。不消耗参数。
<h2 id="util-">util.inspect(object[, options])</h2>
<h2 id="util-">util.promisify(original)</h2>

