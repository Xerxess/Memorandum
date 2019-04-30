# FileReader

https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

```js
//构造函数
FileReader()
```

```js
//属性

FileReader.error 只读 //读取文件时发生的错误
FileReader.readyState 只读 //表示FileReader状态的数字。
    * EMPTY	0	还没有加载任何数据.
    * LOADING	1	数据正在被加载.
    * DONE	2	已完成全部的读取请求.
FileReader.result 只读 //文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
```

```js
//事件处理节
FileReader.onabort
//处理abort事件。该事件在读取操作被中断时触发。

FileReader.onerror
//处理error事件。该事件在读取操作发生错误时触发。

FileReader.onload
//处理load事件。该事件在读取操作完成时触发。

FileReader.onloadstart
//处理loadstart事件。该事件在读取操作开始时触发。

FileReader.onloadend
//处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。

FileReader.onprogress
//处理progress事件。该事件在读取Blob时触发。
```

```js
//方法
FileReader.abort()
//中止读取操作。在返回时，readyState属性为DONE。

FileReader.readAsArrayBuffer()
//开始读取指定的 Blob中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.

FileReader.readAsBinaryString() 
//开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。

FileReader.readAsDataURL()
// 可以实现图片预览
//开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。

FileReader.readAsText()
//开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
```