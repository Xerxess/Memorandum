# XMLHttpRequest

* 属性
    * [XMLHttpRequest.onreadystatechange](#xhr-onreadystatechange)
    * [XMLHttpRequest.readyState](#xhr-readystate)
    * [XMLHttpRequest.response](#xhr-response)
    * [XMLHttpRequest.responseText](#xhr-responsetext)
    * [XMLHttpRequest.responseType](#xhr-responsetype)
    * [XMLHttpRequest.responseURL](#xhr-responseurl)
    * [XMLHttpRequest.status](#xhr-status)
    * [XMLHttpRequest.statusText](#xhr-statustext)
    * [XMLHttpRequest.timeout](#xhr-timeout)
    * [XMLHttpRequest.upload](#xhr-upload)
* [方法](#methods)
    * [XMLHttpRequest.abort()](#xhr-abort)
    * [XMLHttpRequest.getAllResponseHeaders()](#xhr-getall)
    * [XMLHttpRequest.getResponseHeader()](#xhr-getresponse)
    * [XMLHttpRequest.open()](#xhr-open)
    * [XMLHttpRequest.overrideMimeType()](#xhr-override)
    * [XMLHttpRequest.send()](#xhr-send)
    * [XMLHttpRequest.setRequestHeader()](#xhr-setrequest)
    * [XMLHttpRequest.openRequest()](#xhr-openrequest)
    * [XMLHttpRequest.sendAsBinary()](#xhr-sendasbinary)
* [XMLHttpRequestEventTarget](#event)
    * [XMLHttpRequestEventTarget.onabort](#event-onabort)
    * [XMLHttpRequestEventTarget.onerror](#event-onerror)
    * [XMLHttpRequestEventTarget.onload](#event-onload)
        * [ProgressEvent](#progressevent)
    * [XMLHttpRequestEventTarget.onloadstart](#event-onloadstart)
    * [XMLHttpRequestEventTarget.onprogress](#event-onprogress)
    * [XMLHttpRequestEventTarget.ontimeout](#event-ontimeout)
    * [XMLHttpRequestEventTarget.onloadend](#event-onloadend)
* [progress上传/下载监听](#progress)
* [网上摘录](#ex)
```js
var request = new XMLHttpRequest（）;
```

<h2 id="properties">属性</h2>

<h3 id="xhr-onreadystatechange">XMLHttpRequest.onreadystatechange</h3>
readyState 属性发生变化，就会调用相应的处理函数

```js
XMLHttpRequest.onreadystatechange = callback;
```

<h3 id="xhr-readystate">XMLHttpRequest.readyState</h3>

`Read only`
返回状态

Value | State | Description
---------|----------|---------
0|	UNSENT|	已创建XMLHttpRequest客户端，但尚未调用open（）方法。
1|	OPENED|	已调用open（）方法。在此状态期间，可以使用setRequestHeader（）方法设置请求标头，并且可以调用send（）方法来启动提取。
2|	HEADERS_RECEIVED|	已调用send（）并已收到响应标头
3|	LOADING|	响应的正文正在收到。
4|	DONE|	获取操作已完成。这可能意味着数据传输已成功完成或失败。<sss>

<h3 id="xhr-response">XMLHttpRequest.response</h3>
返回响应的正文

<h3 id="xhr-responsetext">XMLHttpRequest.responseText</h3>
返回在发送请求后从服务器接收的文本

<h3 id="xhr-responsetype">XMLHttpRequest.responseType</h3>
获取的字符串，用于指定响应包含的数据类型

```js
var type = XMLHttpRequest.responseType;

XMLHttpRequest.responseType = type;
```


Value | Description
---------|----------
"" | 空responseType字符串的处理方式与"text"默认类型相同
arraybuffer | 这response是一个ArrayBuffer包含二进制数据的JavaScript 
blob | 的response是一个Blob包含二进制数据对象。
document | 根据接收数据的MIME类型，它response是HTML Document或XML XMLDocument
json | 它response是通过将接收数据的内容解析为JSON而创建的JavaScript对象
text | 该response是一个文本DOMString对象。

<h3 id="xhr-responseurl">XMLHttpRequest.responseURL</h3>
返回响应的序列化URL

<h3 id="xhr-status">XMLHttpRequest.status</h3>

返回响应的数字状态代码

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

<h3 id="xhr-statustext">XMLHttpRequest.statusText</h3>

<h3 id="xhr-timeout">XMLHttpRequest.timeout</h3>
异步请求 超时时间

<h3 id="xhr-upload">XMLHttpRequest.upload</h3>
返回一个可以观察的对象

<h2 id="methods">方法</h2>
<h3 id="xhr-abort">XMLHttpRequest.abort()</h3>
如果已经发送请求，该方法将中止该请求。请求中止时，将其readyState更改为XMLHttpRequest.UNSENT（0）并将请求的status代码设置为0。

<h3 id="xhr-getall">XMLHttpRequest.getAllResponseHeaders()</h3>
将所有响应头（由CRLF分隔）作为字符串返回，或者null如果未收到响应则返回。如果发生网络错误，则返回空字符串。

```js
var headers = XMLHttpRequest.getAllResponseHeaders();
```

```
date: Fri, 08 Dec 2017 21:04:30 GMT\r\n
content-encoding: gzip\r\n
x-content-type-options: nosniff\r\n
server: meinheld/0.6.1\r\n
x-frame-options: DENY\r\n
content-type: text/html; charset=utf-8\r\n
connection: keep-alive\r\n
strict-transport-security: max-age=63072000\r\n
vary: Cookie, Accept-Encoding\r\n
content-length: 6502\r\n
x-xss-protection: 1; mode=block\r\n
```


<h3 id="xhr-getresponse">XMLHttpRequest.getResponseHeader()</h3>
返回包含特定标头值的文本的字符串。如果有多个具有相同名称的响应头，则它们的值将作为单个连接字符串返回，其中每个值通过一对逗号和空格与前一个值分隔。

```js
var myHeader = XMLHttpRequest.getResponseHeader（headerName）;
```

<h3 id="xhr-open">XMLHttpRequest.open()</h3>
初始化新创建的请求，或重新初始化现有请求。

```js
XMLHttpRequest.open(method, url)
XMLHttpRequest.open(method, url, async)
XMLHttpRequest.open(method, url, async, user)
XMLHttpRequest.open(method, url, async, user, password)
```

<h3 id="xhr-override">XMLHttpRequest.overrideMimeType()</h3>
指定的MIME类型不同于服务器提供的MIME类型，而不是在解释请求中传输的数据时使用的MIME类型。例如，这可以用于强制流被处理和解析"text/xml"，即使服务器没有这样报告它。必须在调用之前调用此方法send()。

```js
//XMLHttpRequest .overrideMimeType（mimeType）

// Interpret the received data as plain text

req = new XMLHttpRequest();
req.overrideMimeType("text/plain");
req.addEventListener("load", callback, false);
req.open("get", url);
req.send();
```

<h3 id="xhr-send">XMLHttpRequest.send()</h3>
将请求发送到服务器。如果请求是异步的（这是默认值），则此方法会在发送请求后立即返回，并使用事件传递结果。如果请求是同步的，则在响应到达之前，此方法不会返回。

```js
XMLHttpRequest.send(body)
```

```js
//示例：GET
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.onload = function () {
  // Request finished. Do processing here.
};

xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob());
// xhr.send(new Int8Array());
// xhr.send(document);
```

```js
//示例：POST
var xhr = new XMLHttpRequest();
xhr.open("POST", '/server', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        // Request finished. Do processing here.
    }
}
xhr.send("foo=bar&lorem=ipsum"); 
// xhr.send(new Blob()); 
// xhr.send(new Int8Array()); 
// xhr.send(document);
```

<h3 id="xhr-setrequest">XMLHttpRequest.setRequestHeader()</h3>

设置HTTP请求标头的值

`注意：对于自定义字段，当您向跨域发送请求时，可能会遇到“not allowed by Access-Control-Allow-Headers in preflight response”异常。在这种情况下，您需要Access-Control-Allow-Headers在服务器端的响应标头中进行设置。`

```js
XMLHttpRequest.setRequestHeader（header，value）
```

<h3 id="xhr-openrequest">XMLHttpRequest.openRequest()</h3>
<h3 id="xhr-sendasbinary">XMLHttpRequest.sendAsBinary()</h3>

<h1 id="event">XMLHttpRequestEventTarget</h1>

XMLHttpRequest接口继承了 XMLHttpRequestEventTarget 和 EventTarget 的属性

<h2 id="event-onabort">XMLHttpRequestEventTarget.onabort</h2>
当请求失败时调用该方法

```js
XMLHttpRequest.onabort = callback;
```

<h2 id="event-onerror">XMLHttpRequestEventTarget.onerror</h2>
当请求发生错误时调用该方法

```js
XMLHttpRequest.onerror = callback;
```

<h2 id="event-onload">XMLHttpRequestEventTarget.onload</h2>
当一个HTTP请求正确加载出内容后返回时调用

```js
XMLHttpRequest.onload = function(ProgressEvent){};
```
<h4 id="progressevent">ProgressEvent:</h4>

* `ProgressEvent.lengthComputable` `只读`
是一个Boolean标志，指示基础过程是否可以计算要完成的总工作量和已完成的工作量。换句话说，它告诉进度是否可测量。
* `ProgressEvent.loaded` `只读`
是unsigned long long表示基础流程已经执行的工作量。完成的工作比例可以用属性和ProgressEvent.total。使用HTTP下载资源时，这仅代表内容本身的一部分，而不是标题和其他开销。
* `ProgressEvent.total` `只读`
是unsigned long long表示基础流程在执行过程中的总工作量。使用HTTP下载资源时，这仅表示内容本身，而不是标题和其他开销。


<h2 id="event-onloadstart">XMLHttpRequestEventTarget.onloadstart</h2>
当一个HTTP请求开始加载数据时调用

```js
XMLHttpRequest .onloadstart = callback ;
```

<h2 id="event-onprogress">XMLHttpRequestEventTarget.onprogress</h2>
间歇调用该方法用来获取请求过程中的信息

```js
XMLHttpRequest.onprogress = function(event){};
event={
    loaded:'',//当前转移的数据量
    total:''//要传输的数据总量
}
```

<h2 id="event-ontimeout">XMLHttpRequestEventTarget.ontimeout</h2>
当时间超时时调用；只有通过设置XMLHttpRequest对象的timeout属性来发生超时时，这种情况才会发生。

<h2 id="event-onloadend">XMLHttpRequestEventTarget.onloadend</h2>
当内容加载完成，不管失败与否，都会调用该方法

<h1 id="progress">progress上传/下载监听</h1>
XMLHttpRequest对象，传送数据的时候，有一个progress事件，用来返回进度信息。

它分成上传和下载两种情况

１）下载的progress事件属于XMLHttpRequest对象

２）上传的progress事件属于XMLHttpRequest.upload对象。

<h2 id="ex">网上摘录</h2>
 
```js
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <title>XMLHttpRequest上传文件进度实现</title>
    <script type="text/javascript">
        var xhr;
        var ot;//
        var oloaded;
        //上传文件方法
        function UpladFile() {
            var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            var url = "uploadFile"; // 接收上传文件的后台地址 
            
            var form = new FormData(); // FormData 对象
            form.append("mf", fileObj); // 文件对象
            
            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onload = uploadComplete; //请求完成
            xhr.onerror =  uploadFailed; //请求失败
            xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
            xhr.upload.onloadstart = function(){//上传开始执行方法
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(form); //开始上传，发送form数据
        }
        //上传进度实现方法，上传过程中会频繁调用该方法
        function progressFunction(evt) {
            
             var progressBar = document.getElementById("progressBar");
             var percentageDiv = document.getElementById("percentage");
             // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
             if (evt.lengthComputable) {//
                 progressBar.max = evt.total;
                 progressBar.value = evt.loaded;
                 percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
             }
            
            var time = document.getElementById("time");
            var nt = new Date().getTime();//获取当前时间
            var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            
            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b       
            oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        
            //上传速度计算
            var speed = perload/pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if(speed/1024>1){
                speed = speed/1024;
                units = 'k/s';
            }
            if(speed/1024>1){
                speed = speed/1024;
                units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
               if(bspeed==0)
                time.innerHTML = '上传已取消';
        }
        //上传成功响应
        function uploadComplete(evt) {
         //服务断接收完文件返回的结果
         //    alert(evt.target.responseText);
             alert("上传成功！");
        }
        //上传失败
        function uploadFailed(evt) {
            alert("上传失败！");
        }
          //取消上传
        function cancleUploadFile(){
            xhr.abort();
        }
    </script>
</head>
<body>
    <progress id="progressBar" value="0" max="100" style="width: 300px;"></progress>
    <span id="percentage"></span><span id="time"></span>
    <br /><br />
    <input type="file" id="file" name="myfile" />
    <input type="button" onclick="UpladFile()" value="上传" />
    <input type="button" onclick="cancleUploadFile()" value="取消" />
</body>
</html>
```