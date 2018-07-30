# path (路径)

* [path.basename(path[, ext])](#path-basename)
* [path.delimiter](#path-delimiter)
* [path.dirname(path)](#path-dirname)
* [path.extname(path)](#path-extname)
* [path.format(pathObject)](#path-format)
* [path.isAbsolute(path)](#path-isabsolute)
* [path.join([...paths])](#path-join)
* [path.normalize(path)](#path-normalize)
* [path.parse(path)](#path-parse)
* [path.posix](#path-posix)
* [path.relative(from, to)](#path-relative)
* [path.resolve([...paths])](#path-resolve)
* [path.sep](#path-sep)
* [path.toNamespacedPath(path)](#path-toname)
* [path.win32](#path-win32)

path 模块提供了一些工具函数，用于处理文件与目录的路径。

```js
const path = require('path');
```

<h2 id="path-basename">path.basename(path[, ext])</h2>
返回一个 path 的最后一部分，类似于 Unix 中的 basename 命令

```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```

<h2 id="path-delimiter">path.delimiter</h2>
提供平台特定的路径分隔符：

* Windows 上是 ;
* POSIX 上是 :

<h2 id="path-dirname">path.dirname(path)</h2>
返回一个 path 的目录名，类似于 Unix 中的 dirname 命令

<h2 id="path-extname">path.extname(path)</h2>
返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束

<h2 id="path-format">path.format(pathObject)</h2>
从一个对象返回一个路径字符串。 与 path.parse() 相反。

```js
// 如果提供了 `dir`、`root` 和 `base`，则返回 `${dir}${path.sep}${base}`。
// `root` 会被忽略。
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'
```

<h2 id="path-isabsolute">path.isAbsolute(path)</h2>
判定 path 是否为一个绝对路径。

<h2 id="path-join">path.join([...paths])</h2>
使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```

<h2 id="path-normalize">path.normalize(path)</h2>
规范化给定的 path，并解析 '..' 和 '.' 片段。

<h2 id="path-parse">path.parse(path)</h2>
返回一个对象，对象的属性表示 path 的元素。 

```js
path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

<h2 id="path-posix">path.posix</h2>
path.posix 属性提供了 path 方法针对 POSIX 的实现。

<h2 id="path-relative">path.relative(from, to)</h2>
返回从 from 到 to 的相对路径（基于当前工作目录）


<h2 id="path-resolve">path.resolve([...paths])</h2>
把一个路径或路径片段的序列解析为一个绝对路径。

```js
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

<h2 id="path-sep">path.sep</h2>
提供了平台特定的路径片段分隔符：

* Windows 上是 `\`
* POSIX  上是   `/`

<h2 id="path-toname">path.toNamespacedPath(path)</h2>
<h2 id="path-win32">path.win32</h2>
path.win32 属性提供了 path 方法针对 Windows 的实现。

