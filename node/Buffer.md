# Buffer

处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

Buffer 类的实例类似于整数数组，但 Buffer 的`大小是固定`的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。  
Buffer 类在 Node.js 中是一个全局变量

## Node.js 目前支持的字符编码包括：

* ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。

* utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。

* utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

* ucs2 - utf16le 的别名。

* base64 - Base64 编码。

* latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。

* binary - latin1 的别名。

* hex - 将每个字节编码为两个十六进制字符。

## 创建实例 新API

* Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
* Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
* Buffer.allocUnsafeSlow(size)
* Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
* Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
* Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
* Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例


## 原型方法

> buf[index]  
索引操作符 [index] 可用于获取或设置 buf 中指定 index 位置的八位字节

> buf.buffer  
buffer 属性指向创建该 Buffer 的底层的 ArrayBuffer 对象

> buf.write(string[, offset[, length]][, encoding])
写入缓冲区  


>buf.toString([encoding[, start[, end]]])  
从缓冲区读取数据  


>buf.toJSON()  
将 Buffer 转换为 JSON 对象  


> buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])  
缓冲区比较  


> buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
拷贝缓冲区  


> buf.slice([start[, end]])  
缓冲区裁剪  

> buf.equals(otherBuffer)   
如果 buf 与 otherBuffer 具有完全相同的字节，则返回 true，否则返回 false。

> buf.fill(value[, offset[, end]][, encoding])  
使用 value 填充 Buffer

> buf.includes(value[, byteOffset][, encoding])   
是否包含value

> buf.indexOf(value[, byteOffset][, encoding])  
搜索 value 索引

> buf.lastIndexOf(value[, byteOffset][, encoding])  
类似 buf.indexOf()  从后往前搜索

> buf.length  
返回 buf 在字节数上分配的内存量

> buf.slice([start[, end]])  
返回一个指向相同原始内存的新建的 Buffer，但做了偏移且通过 start 和 end 索引进行裁剪。

> buf.toJSON()  
返回 buf 的 JSON 格式

> buf.toString([encoding[, start[, end]]])  
根据 encoding 指定的字符编码解码 buf 成一个字符串

> buf.values()  
创建并返回一个包含 buf 的值（字节）的迭代器 当 Buffer 使用 for..of 时会自动调用该函数。


## 类方法

>  Buffer.from(array)  
通过一个八位字节的 array 创建一个新的 Buffer 

> Buffer.from(arrayBuffer[, byteOffset[, length]])  
该方法将创建一个 ArrayBuffer 的视图，而不会复制底层内存。  


> Buffer.from(buffer)  
将传入的 buffer 数据拷贝到一个新建的 Buffer 实例  

> Buffer.from(string[, encoding])  
新建一个包含所给的 JavaScript 字符串 string 的 Buffer

> Buffer.from(object[, offsetOrEncoding[, length]])  

> Buffer.isBuffer(obj)  
是否是Buffer

> Buffer.isEncoding(encoding)  
是否支持指定的字符编码

> Buffer.poolSize
用于决定预分配的、内部 Buffer 实例池的大小的字节数

> Buffer.concat(list[, totalLength])  
缓冲区合并  


> Buffer.byteLength(string[, encoding])  
返回一个字符串的实际字节长度  


> Buffer.compare(buf1, buf2)  
比较 buf1 和 buf2  
