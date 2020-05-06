# 跨域资源共享 CORS

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，`IE浏览器不能低于IE10`。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现`CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信`。

> 两种请求
* 简单请求（simple request）
```
（1) 请求方法是以下三种方法之一：

HEAD
GET
POST

（2）HTTP的头信息不超出以下几种字段：

Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

简单请求流程：

    1.浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个
    2.服务器允许
    

```
头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。

（1）Access-Control-Allow-Origin

该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

（2）Access-Control-Allow-Credentials

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

（3）Access-Control-Expose-Headers

该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。
```
* 非简单请求（not-so-simple request）

    1.预检请求 "预检"请求用的请求方法是OPTIONS

 ```   
    头信息里面，关键字段是Origin，表示请求来自哪个源。

    除了Origin字段，"预检"请求的头信息包括两个特殊字段。

    （1）`Access-Control-Request-Method`

     该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。

    （2）`Access-Control-Request-Headers`

    该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header
```

  2. 服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  ```
  （1）Access-Control-Allow-Methods

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

（2）Access-Control-Allow-Headers

如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

（3）Access-Control-Allow-Credentials

该字段与简单请求时的含义相同。

（4）Access-Control-Max-Age

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。
  ```
JSONP

CORS与JSONP的使用目的相同，但是比JSONP更强大。

`JSONP只支持GET请求`，CORS支持所有类型的HTTP请求。`JSONP的优势在于支持老式浏览器`，以及可以向不支持CORS的网站请求数据。


IE8,IE9

XDomainRequest是在Internet Explorer 8和9中工作的HTTP访问控制（CORS）的一个实现  。它在Internet Explorer 10中被移除，以支持使用  具有适当CORS的XMLHttpRequest ; 如果您的目标是Internet Explorer 10或更高版本，或者希望支持任何其他浏览器，则需要使用标准的HTTP访问控制。

### 语法
 ```js
 var xdr = new XDomainRequest（）;
 ```

 ### 属性

XDomainRequest.timeout 获取或设置请求超时之前的时间量。
XDomainRequest.responseText 以字符串形式获取响应正文。

### 方法

XDomainRequest.open() 打开请求，指定方法（GET / POST）和URL。  
XDomainRequest.send() 发送请求。POST数据在此方法中指定。  
XDomainRequest.abort() 中止请求。


###  事件处理程序

XDomainRequest.onprogress 处理请求在send方法调用和onload 事件之间取得进展的处理程序。  
XDomainRequest.ontimeout 处理请求超时的处理程序。  
XDomainRequest.onerror 处理请求发生错误时的处理程序。  
XDomainRequest.onload 从服务器收到完整响应时的处理程序。

```js
if(window.XDomainRequest){
  var xdr = new XDomainRequest();

  xdr.open("get", "http://example.com/api/method");

  xdr.onprogress = function () {
    //Progress
  };

  xdr.ontimeout = function () { 
    //Timeout
  };

  xdr.onerror = function () { 
    //Error Occurred
  };

  xdr.onload = function() {
    //success(xdr.responseText);
  }

  setTimeout(function () {
    xdr.send();
  }, 0);
}
```