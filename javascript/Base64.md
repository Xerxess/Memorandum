# Base64

https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

* Base64是一种基于64个可打印字符来表示二进制数据的表示方法。

# 格式

```
data:[<mediatype>][;base64],<data>
```

# Base的索引表
* Base64的索引表，字符选用了"A-Z、a-z、0-9、+、/" 64个可打印字符

# Base64的原理

# Data URI 支持很多中类型：
  * data:,文本数据
  * data:text/plain,文本数据
  * data:text/html,HTML代码
  * data:text/html;base64,base64编码的HTML代码
  * data:text/css,CSS代码
  * data:text/css;base64,base64编码的CSS代码
  * data:text/javascript,Javascript代码
  * data:text/javascript;base64,base64编码的Javascript代码
  * data:image/gif;base64,base64编码的gif图片数据
  * data:image/png;base64,base64编码的png图片数据
  * data:image/jpeg;base64,base64编码的jpeg图片数据
  * data:image/x-icon;base64,base64编码的icon图片数据

  # JS 原生 获取Base64

* FileReader



https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL

可以实现图片预览 ie9 不支持
```js
 var fileRead = new FileReader(blob|File);
 fileRead.readAsDataURL(myFile);
```

* canvas
```js
canvas.toDataURL()
```

# Base64编码和解码

https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

* atob() 编码
* btoa() 解码