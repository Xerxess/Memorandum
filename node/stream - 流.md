# stream - 流

* [流的类型](#stream-types)
* [stream.Writable 类](#stream-writable)
    * [事件](#stream-event-error)
        * ['close' 事件]()
        * ['drain' 事件]()
        * ['error' 事件]()
        * ['finish' 事件]()
        * ['pipe' 事件]()
        * ['unpipe' 事件]()
    * [writable](#writable)
        * [writable.cork()](#writable-cork)
        * [writable.destroy([error])](#writable-destroy)
        * [writable.end([chunk][, encoding][, callback])](#writable-end)
        * [writable.setDefaultEncoding(encoding)](#writable-setdefaultencoding)
        * [writable.uncork()](#writable-uncork)
        * [writable.writableHighWaterMark](#writable-writablehighwaterMark)
        * [writable.writableLength](#writable-writablelength)
        * [writable.write(chunk[, encoding][, callback])](#writable-write)
* [stream.Readable 类](#stream-readable)
     * [事件](#stream-readable-event)
        * 'close' 事件
        * 'data' 事件
        * 'end' 事件
        * 'error' 事件
        * 'readable' 事件
     * [readable](#readable)
        * [readable.destroy([error])](#readable-destroy)
        * [readable.isPaused()](#readable-ispaused)
        * [readable.pause()](#readable-pause)
        * [readable.pipe(destination[, options])](#readable-pipe)
        * [readable.read([size])](#readable-read)
        * [readable.readableHighWaterMark](#readable-readablehighwatermark)
        * [readable.readableLength](#readable-readablelength)
        * [readable.resume()](#readable-resume)
        * [readable.setEncoding(encoding)](#readable-setencoding)
        * [readable.unpipe([destination])](#readable-unpipe)
        * [readable.unshift(chunk)](#readable-unshift)
        * [readable.wrap(stream)](#readable-wrap)

流（stream）是一种在 Node.js 中处理流式数据的抽象接口。 

流可以是`可读`的、`可写`的、或是`可读写的`。 所有的流都是 `EventEmitter` 的实例。

```js
const stream = require('stream');
```

<h2 id="stream-types">流的类型</h2>

* Writable - 可写入数据的流（例如 fs.createWriteStream()）。
* Readable - 可读取数据的流（例如 fs.createReadStream()）。
* Duplex - 可读又可写的流（例如 net.Socket）。
* Transform - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）。

所有 Node.js API 创建的流都是专门`运作在字符串和 Buffer（或 Uint8Array）`对象上。

<h2 id="stream-writable">stream.Writable 类</h2>


<h3 id="stream-event-error">'error' 事件</h3>
当写入数据出错或使用管道出错时，触发 'error' 事件

<h3 id="stream-event-">'finish' 事件</h3>
调用 stream.end() 方法且缓冲数据都已经传给底层系统之后，触发 'finish' 事件

<h3 id="stream-event-">'pipe' 事件</h3>
当在可读流上调用 stream.pipe() 方法添加可写流到目标流向时，触发 'pipe' 事件。

<h3 id="stream-event-">'unpipe' 事件</h3>
当在可读流上调用 stream.unpipe() 方法从目标流向中移除当前可写流时，触发 'unpipe' 事件

<h2 id="writable">方法</h2>

<h3 id="writable-cork">writable.cork()</h3>

强制所有写入数据都存放到内存中的缓冲区里。 `直到调用 stream.uncork() 或 stream.end() 方法`时，缓冲区里的数据才会被输出。

<h3 id="writable-destroy">writable.destroy([error])</h3>
摧毁这个流，并发出传过来的错误。

<h3 id="writable-end">writable.end([chunk][, encoding][, callback])</h3>
表明接下来没有数据要被写入可写流。

<h3 id="writable-setdefaultencoding">writable.setDefaultEncoding(encoding)</h3>
为可写流设置 encoding

<h3 id="writable-uncork">writable.uncork()</h3>

将输出在 stream.cork() 方法被调用之后缓冲在内存中的所有数据

<h3 id="writable-writablehighwatermark">writable.writableHighWaterMark</h3>

返回构造该可写流时传入的 highWaterMark 参数值

<h3 id="writable-writablelength">writable.writableLength</h3>

属性包含了写入就绪队列的字节(或者对象)数，这个值提供了关于highWaterMark状态的内省数据。

<h3 id="writable-write">writable.write(chunk[, encoding][, callback])</h3>

向流中写入数据，并在数据处理完成后调用 callback


<h2 id="stream-readable">stream.Readable 类</h2>

<h3 id="stream-readable-event">事件</h3>

### 'close' 事件
在流或其底层资源（比如一个文件）关闭后触发

### 'data' 事件
在流将数据传递给消费者时触发

### 'end' 事件
在流中再没有数据可供消费时触发

### 'error' 事件
事件可以在任何时候在可读流实现（Readable implementation）上触发。 通常，这会在底层系统内部出错从而不能产生数据，或当流的实现试图传递错误数据时发生

### 'readable' 事件
将在流中有数据可供读取时触发


<h2 id="readable">方法</h2>

<h3 id="readable-destroy">readable.destroy([error])</h3>

销毁流，并且触发error事件。然后，可读流将释放所有的内部资源。

<h3 id="readable-ispaused">readable.isPaused()</h3>

返回可读流的当前操作状态

<h3 id="readable-pause">readable.pause()</h3>

将会使 flowing 模式的流停止触发 'data' 事件， 进而切出 flowing 模式

<h3 id="readable-pipe">readable.pipe(destination[, options])</h3>

绑定一个 [Writable][] 到 readable 上， 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 [Writable][]。数据流将被自动管理。这样，即使是可读流较快，目标可写流也不会超负荷（overwhelmed）

<h3 id="readable-read">readable.read([size])</h3>

从内部缓冲区中抽出并返回一些数据

<h3 id="readable-readablehighwatermark">readable.readableHighWaterMark</h3>

返回构造该可读流时传入的 'highWaterMark' 属性

<h3 id="readable-readablelength">readable.readableLength</h3>
<h3 id="readable-resume">readable.resume()</h3>

重新触发 'data' 事件, 将暂停模式切换到流动模式

<h3 id="readable-setencoding">readable.setEncoding(encoding)</h3>

为从可读流读入的数据设置字符编码

<h3 id="readable-unpipe">readable.unpipe([destination])</h3>

将之前通过stream.pipe()方法绑定的流分离

<h3 id="readable-unshift">readable.unshift(chunk)</h3>

把一块数据压回到Buffer内部

<h3 id="readable-wrap">readable.wrap(stream)</h3>