# Http

相关链接：  
Headers：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers  
MIME_types：https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

* [Data URLs](#http-6)
* [URI、URL和URN](#http-1)
* [缓存](#http-cache)
* [HTTP消息](#http-2)
* [HTTP/1.x中的连接管理](#http-3)
* [请求方法](#http-4)
* [HTTP访问控制（CORS）](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
* [URL重定向](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections)
* [响应状态-连接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
* [HTTP 消息头](#http-5)
    * [类型](#headers-1)
    * [缓存相关](#headers-2)
        * [Age]()
        * [Cache-Control `(General header)` ]()
        * [Clear-Site-Data `(General header)`]()
        * [Expires `(Response header)`]()
    * [内容相关](#headers-3)
        * [Accept `(Request header)`]()
        * [Accept-Charset `(Request header)`]()
        * [Accept-Encoding `(Request header)`]()
        * [Accept-Language `(Request header)`]()
    * [CORS 跨域](#headers-4)
        * [Access-Control-Allow-Origin  `(Response header)`]()
        * [Access-Control-Allow-Credentials `(Response header)` ]()
        * [Access-Control-Allow-Headers `(Response header)` ]()
        * [Access-Control-Allow-Methods `(Response header)` ]()
        * [Access-Control-Expose-Headers `(Response header)`]()
        * [Access-Control-Max-Age `(Response header)` ]()
        * [Access-Control-Request-Headers `(	Request header)` ]()
        * [Access-Control-Request-Method `(Request header)` ]()
        * [Origin `(Request header)` ]()
        * [Timing-Allow-Origin `(Response header)` ]()
    * [消息正文相关](#headers-5)
        * [Content-Length `(Entity header)`]()
        * [Content-Type `(Entity header)`]()
        * [Content-Encoding `(Entity header)`]()
        * [Content-Language `(Entity header)`]()
        * [Content-Location `(Entity header)`]()
    * [请求上下文](#headers-6)
        * [From `(Request header)` ]()
        * [Host `(Request header)`]()
        * [Referer `(Request header)`]()
        * [Referrer-Policy `(Request header)`]()
        * [User-Agent `(Request header)`]()
    * [响应上下文](#headers-7)
        * [Allow `(Entity header)`]()
        * [Server `(Entity header)`]()
    * [下载](#headers-8)
        * [Content-Disposition]()

<h2 id="http-6">Data URLs</h2>

Data URLs 由四个部分组成：前缀(data:)、指示数据类型的MIME类型、如果非文本则为可选的base64标记、数据本身：
```
data:[<mediatype>][;base64],<data>
```

<h2 id="http-1">URI、URL和URN</h2>

* URI ：Uniform Resource Identifier 统一资源标识符；
* URL：Uniform Resource Locator 统一资源定位符；
* URN：Uniform Resource Name 统一资源名称。

URL,URN是URI的子集

URI一般由三部分组成：

* 主机名
* 标志符
* 相对URI

URL由三部分组成：

* 协议（或称为服务方式）；
* 存有该资源的主机IP地址（有时也包括端口号）；
* 主机资源的具体地址，如目录和文件名等。

<h2 id="http-cache">缓存</h2>

缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载

> 私有与共享缓存



* (私有)浏览器缓存
* (共享)代理缓存

> 缓存操作的目标

`HTTP 缓存只能存储 GET 响应`

> 缓存控制

Cache-control

```js
//禁止进行缓存
Cache-Control: no-store
Cache-Control: no-cache, no-store, must-revalidate

//强制确认缓存
//每次有请求发出时，缓存会将此请求发到服务器（译者注：该请求应该会带有与本地缓存相关的验证字段），服务器端会验证请求中所描述的缓存是否过期，若未过期（注：实际就是返回304），则缓存才使用本地缓存副本。
Cache-Control: no-cache

//私有缓存和公共缓存
Cache-Control: private
Cache-Control: public
```

> 缓存过期机制

```js
Cache-Control: max-age=31536000
```

<h2 id="http-2">HTTP</h2>

HTTP消息是服务器和客户端之间数据交换的方式  
两种类型:
* requests
* responses

> HTTP Request

* 开始
    * 一个HTTP方法
    * 请求对象，通常是一个URL
* HTTP标头
* Body
    * 单个资源主体，由一个文件组成，由两个标头定义：Content-Type和Content-Length。
    * 多资源主体，由多部分主体组成，每个主体包含不同的信息。这通常与HTML表单相关联。

> HTTP Response
* 状态
* HTTP标头
* Body 
    * 单个资源主体，由一个已知​​长度的文件组成，由两个标头定义：Content-Type和Content-Length。
    * 单个资源主体，由一个长度未知的文件组成，由Transfer-Encoding设置为的块编码chunked。
    * 多资源主体，由多部分主体组成，每个主体包含不同的信息部分。这些是相对罕见的。

<h2 id="http-3">HTTP/1.x中的连接管理</h2>

* 短连接
* 长连接HTTP
* 流水线

<h2 id="http-4">请求方法</h2>

* GET 请求指定的页面信息，并返回实体主体。
* HEAD 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头
* POST 	向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
* PUT 从客户端向服务器传送的数据取代指定的文档的内容。
* DELETE 	请求服务器删除指定的页面。
* CONNECT HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
* OPTIONS 允许客户端查看服务器的性能。`常用于CORS中的预检请求`
* TRACE 回显服务器收到的请求，主要用于测试或诊断。
* PATCH
PATCH方法用于对资源应用部分修改。

<h2 id="http-5">HTTP 消息头</h2>

HTTP 消息头允许客户端和服务器通过 request和 response传递附加信息.一个请求头由名称（不区分大小写）后跟一个冒号“：”,冒号后跟具体的值（不带换行符）组成.

<h2 id="headers-1">分组：</h2>

* 常规标题(General header)：适用于请求和响应的标题，但与最终在正文中传输的数据无关。
* 请求标头(Request header)：包含有关要提取的资源或客户端本身的更多信息的标头。
* 响应标头(Response header)：包含有关响应的其他信息的标头，例如其位置或服务器本身（名称和版本等）。
* 实体标头(Entity header)：包含有关实体主体的更多信息的标头，如内容长度或MIME类型。

<h2 id="headers-2">缓存相关</h2>

> Age 对象在代理缓存中的时间（以秒为单位）。

> Cache-Control `(General header)` 指定请求和响应中的缓存机制的指令。

标准Cache-Control指令，可由客户端在HTTP请求中使用

```js
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-Control: no-cache 
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: only-if-cached
```

标准Cache-Control指令，可由服务器在HTTP响应中使用

```js
Cache-Control: must-revalidate
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: public
Cache-Control: private
Cache-Control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-Control: s-maxage=<seconds>
```

> Clear-Site-Data 清除与请求网站关联的浏览数据（例如，cookie，存储，缓存）。

> Expires `(Response header)` 响应被视为过时的日期/时间。

```js
Expires: <http-date>
//<http-date>:HTTP日期时间戳
```

> Pragma 特定于实现的标头，可能在请求 - 响应链的任何位置具有各种影响。用于向后兼容Cache-Control尚未出现标头的HTTP / 1.0高速缓存。

> Warning 包含可能问题信息的常规警告字段。

<h2 id="headers-3">内容相关</h2>
> Accept `(	Request header)` 通知服务器有关可以发回的数据类型。它是MIME类型。 

```js
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*

//例
Accept: text/html
Accept: image/*
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

> Accept-Charset `(Request header)` 通知服务器客户端能够理解哪个字符集。 

```js
Accept-Charset：<charset>

//例
Accept-Charset: iso-8859-1
Accept-Charset: utf-8, iso-8859-1;q=0.5
Accept-Language: utf-8, iso-8859-1;q=0.5, *;q=0.1
```

> Accept-Encoding `(Request header)` 通知服务器有关编码算法的信息，通常是压缩算法，可以在发回的资源上使用。 

```js
Accept-Encoding: gzip
Accept-Encoding: compress
Accept-Encoding: deflate
Accept-Encoding: br
Accept-Encoding: identity
Accept-Encoding: *

// Multiple algorithms, weighted with the quality value syntax:
Accept-Encoding: deflate, gzip;q=1.0, *;q=0.5
```

> Accept-Language `(Request header)` 通知服务器有关服务器应发回的语言。这是一个提示，并不一定完全由用户控制：服务器应始终注意不要覆盖显式用户选择（如在下拉列表中选择语言）。

```js
Accept-Language: <language>
Accept-Language: <locale>
Accept-Language: *

//例
Accept-Language: de
Accept-Language: de-CH
Accept-Language: en-US,en;q=0.5
```

<h2 id="headers-4">CORS</h2>

> Access-Control-Allow-Origin  `(Response header)`指示是否可以共享响应。 

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: <origin>[, <origin>]*

例子：
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://developer.mozilla.org
Access-Control-Allow-Origin: https://mozilla.org, https://google.com, https://microsoft.com, https://apple.com
```

> Access-Control-Allow-Credentials `(Response header)` 指示凭证标志为true时是否可以公开对请求的响应。 

```
Access-Control-Allow-Credentials: true
```

> Access-Control-Allow-Headers `(Response header)` 用于响应预检请求，以指示在发出实际请求时可以使用哪些HTTP标头。 

```
Access-Control-Allow-Headers: <header-name>, <header-name>, ...
```

> Access-Control-Allow-Methods `(Response header)` 指定访问资源以响应预检请求时允许的方法。 

```
Access-Control-Allow-Methods: <method>, <method>, ...

例：
Access-Control-Allow-Methods: POST, GET, OPTIONS
```

> Access-Control-Expose-Headers `(Response header)`通过列出其名称，指示哪些标头可以作为响应的一部分公开。 

默认情况下，仅公开6个简单响应标头：

* Cache-Control
* Content-Language
* Content-Type
* Expires
* Last-Modified
* Pragma

```
Access-Control-Expose-Headers：<header-name>，<header-name>，...

例：
Access-Control-Expose-Headers: Content-Length, X-Kuma-Revision
```

> Access-Control-Max-Age `(Response header)` 指示可以缓存预检请求的结果的时间。 

```
Access-Control-Max-Age：<delta-seconds>
<delta-seconds>：单位秒

例：
Access-Control-Max-Age: 600
```


> Access-Control-Request-Headers `(	Request header)` 在发出预检请求时使用，以便让服务器知道在发出实际请求时将使用哪些HTTP头。 

```
Access-Control-Request-Headers: <header-name>, <header-name>, ...

例：
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```


> Access-Control-Request-Method `(Request header)` 在发出预检请求时使用，以便让服务器知道在进行实际请求时将使用哪种HTTP方法。 

```
Access-Control-Request-Method: <method>

例：
Access-Control-Request-Method: POST
```

> Origin `(Request header)` 指示提取源自的位置。

> Timing-Allow-Origin `(Response header)` 指定允许查看通过Resource Timing API的功能检索的属性值的原点，否则由于跨源限制将报告为零。

<h2 id="headers-5">消息正文相关</h2>

> Content-Length `(	Entity header)`表示发送给收件人的实体主体的大小，以十进制八位字节数表示。 

> Content-Type `(Entity header)`表示资源的媒体类型。 

```
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

> Content-Encoding `(Entity header)`用于指定压缩算法。 

```js
Content-Encoding: gzip
Content-Encoding: compress
Content-Encoding: deflate
Content-Encoding: identity
Content-Encoding: br

// Multiple, in the order in which they were applied
Content-Encoding: gzip, identity
Content-Encoding: deflate, gzip
```

> Content-Language `(Entity header)`描述了针对受众的语言，以便用户可以根据用户自己的首选语言进行区分。 

> Content-Location `(Entity header)`指示返回数据的备用位置。

<h2 id="headers-6">请求上下文</h2>

> From `(Request header)` 包含控制请求用户代理的人类用户的Internet电子邮件地址。 

> Host `(Request header)`指定服务器的域名（用于虚拟主机），以及（可选）服务器正在侦听的TCP端口号。 

```
Host: developer.cdn.mozilla.net
```

> Referer `(Request header)`上一个网页的地址，其中包含指向当前请求页面的链接。 

```
Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript
```

> Referrer-Policy `(Request header)`在Referer标题中发送的引用者信息的管理者应包含在请求中。 

> User-Agent `(Request header)` 包含一个特征字符串，允许网络协议对等体识别请求软件用户代理的应用程序类型，操作系统，软件供应商或软件版本。另请参见Firefox用户代理字符串参考。

Firefox UA string:  
`Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion`
* Mozilla/5.0 是一般标记，表示浏览器与Mozilla兼容，并且几乎每个浏览器都是常见的。
* platform 描述了浏览器运行的本机平台（例如Windows，Mac，Linux或Android），以及它是否是移动电话。 Firefox OS手机简单地说“移动”;网络就是平台。请注意，平台可以包含多个“;” - 分隔的标记。有关详细信息和示例，请参见下文。
* rv:geckoversion 表示Gecko的发布版本（例如“17.0”）。在最近的浏览器中，geckoversion与firefoxversion相同。
* Gecko/geckotrail 表示浏览器基于Gecko。
* 桌面浏览geckotrail 是固定字符串“20100101”
* Firefox/firefoxversion 表示浏览器是Firefox，并提供版本（例如“17.0”）。

```js
//Examples:
Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0
Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0

//Chrome UA string
//Chrome（或基于Chromium / blink的引擎）用户代理字符串类似于Firefox格式。为了兼容性，它添加了像“KHTML，像Gecko”和“Safari”这样的字符串。
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36

//Opera UA string
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41

//Safari UA string
Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1

//Internet Explorer UA string
Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)
```

<h2 id="headers-7">响应上下文</h2>

> Allow `(Entity header)`列出资源支持的HTTP请求方法集。 

如果服务器响应状态代码以指示可以使用哪些请求方法，则必须发送此标头。空标头指示资源不允许任何请求方法，例如，对于给定资源可能临时发生。

```
Allow: GET, POST, HEAD
```

> Server `(Entity header)`包含有关原始服务器用于处理请求的软件的信息。

```
Server: Apache/2.4.1 (Unix)
```

<h2 id="headers-8">下载</h2>

> Content-Disposition `(Response header)/(General header)`
如果传输的资源应该以内联方式显示（当标头不存在时的默认行为），或者应该像下载一样处理，浏览器应该显示“另存为”窗口，是响应标头。

作为(Response header)

```
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"
```

作为(General header)

```
Content-Disposition: form-data
Content-Disposition: form-data; name="fieldName"
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"
```

# request payload 和 formData

FormData和Payload是浏览器传输给接口的两种格式，这两种方式浏览器是通过Content-Type来进行区分的(了解Content-Type)，如果是 application/x-www-form-urlencoded的话，则为formdata方式，如果是application/json或multipart/form-data的话，则为 request payload
的方式。
