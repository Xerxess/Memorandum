<!-- TOC -->

- [一些概念](#一些概念)
    - [(websocket)协议中Ping Pong，长连接](#websocket协议中ping-pong长连接)
- [安装](#安装)
- [Class: WebSocket.Server](#class-websocketserver)
    - [new WebSocket.Server(options[, callback])](#new-websocketserveroptions-callback)
    - [Event](#event)
- [Class: WebSocket websocket](#class-websocket-websocket)
    - [new WebSocket(address[, protocols][, options])](#new-websocketaddress-protocols-options)
    - [Event: 'close'](#event-close)
    - [Event: 'error'](#event-error)
    - [Event: 'message'](#event-message)
    - [Event: 'open'](#event-open)
    - [Event: 'ping'](#event-ping)
    - [Event: 'pong'](#event-pong)
    - [Event: 'unexpected-response'](#event-unexpected-response)
    - [Event: 'upgrade'](#event-upgrade)
    - [websocket.addEventListener(type, listener) && websocket.removeEventListener(type, listener)](#websocketaddeventlistenertype-listener--websocketremoveeventlistenertype-listener)
    - [websocket.send(data[, options][, callback])](#websocketsenddata-options-callback)
    - [websocket.ping([data[, mask]][, callback])](#websocketpingdata-mask-callback)
    - [websocket.pong([data[, mask]][, callback])](#websocketpongdata-mask-callback)
    - [websocket.close([code[, reason]])](#websocketclosecode-reason)
    - [websocket.terminate()](#websocketterminate)
    - [websocket.readyState](#websocketreadystate)
    - [websocket.binaryType](#websocketbinarytype)
    - [websocket.bufferedAmount{Number}](#websocketbufferedamountnumber)
    - [websocket.protocol {String}](#websocketprotocol-string)
- [WebSocket压缩](#websocket压缩)
- [用法](#用法)
    - [发送和接收文本数据](#发送和接收文本数据)
    - [发送二进制数据](#发送二进制数据)
    - [简单的服务器](#简单的服务器)
    - [外部HTTP/S服务器](#外部https服务器)
    - [多个服务器共享一个HTTP / S服务器](#多个服务器共享一个http--s服务器)
    - [客户端认证](#客户端认证)
    - [服务器广播](#服务器广播)
- [问题](#问题)
    - [获取客户端的IP地址](#获取客户端的ip地址)
    - [检测和关闭断开的连接](#检测和关闭断开的连接)
    - [客户端心跳检测](#客户端心跳检测)

<!-- /TOC -->

Node.js WebSocket library


https://github.com/websockets/ws

# 一些概念

## (websocket)协议中Ping Pong，长连接

* 发送方->接收方：ping；
* 接收方->发送方：pong；
  
Ping和Pong是websocket里的心跳，用来保证客户端是在线的，一般来说只有服务端给客户端发送Ping，然后客户端发送Pong来回应，表明自己仍然在线。

websocket ping pong:目前浏览器中没有相关api发送ping给服务器，只能由服务器发ping给浏览器，浏览器返回pong消息；

Socket默认是长链接，为了知道Client和Server链接是否正常，项目中使用的ClientSocket和ServerSocket都有一个心跳的线程，这个线程主要是为了检测Client和Server是否正常链接，Client和Server是否正常链接主要是用ping pong流程来保证的.

# 安装

```node 
npm install ws
```

# Class: WebSocket.Server

## new WebSocket.Server(options[, callback])

* options {Object}
    * host {String} 服务器的主机名.
    * port {Number} 服务器的端口.
    * backlog {Number} 挂起的连接队列的最大长度.
    * server {http.Server|https.Server} 预先创建的Node.js HTTP / S服务器.
    * verifyClient {Function} 可用于验证传入连接的功能
    * handleProtocols {Function}可用于处理WebSocket子协议的函数
    * path {String} 仅接受与该路径匹配的连接
    * noServer {Boolean} 不启用服务器模式.
    * clientTracking {Boolean}指定是否跟踪客户端
    * perMessageDeflate {Boolean|Object} 启用/禁用permessage-deflate。
    * maxPayload {Number} 允许的最大消息大小（以字节为单位）。
* callback {Function}

## Event

* close 服务器关闭时发出。
* connection 握手完成时发出。请求是客户端发送的http GET请求。用于分析授权头、cookie头和其他信息。
    * socket {WebSocket}
    * request {http.IncomingMessage}
* error 在基础服务器上发生错误时发出
* headers 在响应头作为握手的一部分写入套接字之前发出。这允许您在发送邮件头之前检查/修改它们。
    * headers {Array}
    * request {http.IncomingMessage}
* listening 在绑定基础服务器时发出。

# Class: WebSocket websocket

可用于客户端连接实例、服务端接收到连接的实例

## new WebSocket(address[, protocols][, options]) 

* address {String|url.Url|url.URL} 请求地址（例：ws://127.0.0.1:8080/）
    * protocols {String|Array} 子协议列表http.request.header['Sec-WebSocket-Protocol']
    * options {Object}
    * handshakeTimeout {Number} 超时时间（ms）
    * perMessageDeflate {Boolean|Object} 是否开启压缩（默认：true）
    * protocolVersion {Number} http.request.header['Sec-WebSocket-Version']
    * origin {String} http.request.header['Origin'] 或者 http.request.header['Sec-WebSocket-Origin']
    * maxPayload {Number} 最大消息载荷（bytes）
    * 其它任何 http/s.request属性

## Event: 'close' 

* code {Number}
* reason {String}

## Event: 'error' 

* error {Error}

## Event: 'message' 

* data {String|Buffer|ArrayBuffer|Buffer[]}

## Event: 'open' 

## Event: 'ping' 

* data {Buffer}

从服务器接收ping时发出

## Event: 'pong' 

* data {Buffer}

从服务器接收到pong时发出。

## Event: 'unexpected-response' 

* request {http.ClientRequest}
* response {http.IncomingMessage}

当服务器响应不是预期响应时发出，例如401响应。此事件提供读取响应以提取有用信息的能力。如果服务器发送无效响应，并且没有此事件的侦听器，则会发出错误。

## Event: 'upgrade' 

* response {http.IncomingMessage}

在握手过程中从服务器接收到响应头时发出。这允许您从服务器读取头，例如“设置cookie”头。

## websocket.addEventListener(type, listener) && websocket.removeEventListener(type, listener) 

## websocket.send(data[, options][, callback])

* data {*}要发送的数据。
* options {}
    * compress{Boolean}指定是否data应该压缩。默认true为启用permessage-deflate时。
    * binary{Boolean}指定是否data应以二进制形式发送。默认为自动检测。
    * mask{Boolean}指定是否data应屏蔽。默认为truewhen websocket不是服务器客户端。
    * fin{Boolean}指定是否data是消息的最后一个片段。默认为true。
* callback{Function}可选的回调，在data写出时调用。

## websocket.ping([data[, mask]][, callback])

## websocket.pong([data[, mask]][, callback])

## websocket.close([code[, reason]])

启动关闭握手。

## websocket.terminate() 

强制关闭连接。

## websocket.readyState

* 0 => CONNECTING 正在连接。
* 1 => OPEN 连接成功，可以通信了。
* 2 => CLOSING 连接正在关闭。
* 3 => CLOSED 连接已经关闭，或者打开连接失败。


## websocket.binaryType

指定收到的二进制数据类型 默认：'nodebuffer'

["nodebuffer","arraybuffer","fragments"]

## websocket.bufferedAmount{Number} 

表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束

## websocket.protocol {String} 

返回服务端选择的子协议



# WebSocket压缩

该扩展名默认情况下在服务器上禁用，默认情况下在客户端上启用。它在性能和内存消耗方面增加了可观的开销，因此我们建议仅在确实需要时才启用它。

Node.js在高性能压缩方面存在许多问题，其中并发性的增加（尤其是在Linux上）可能会导致灾难性的内存碎片和性能降低。如果打算在生产中使用permessage-deflate，则值得为您的工作负载设置测试代表，并确保Node.js / zlib将以可接受的性能和内存使用率来处理它。

# 用法

## 发送和接收文本数据

```js
const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
```

## 发送二进制数据

```js
const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
  const array = new Float32Array(5);

  for (var i = 0; i < array.length; ++i) {
    array[i] = i / 2;
  }

  ws.send(array);
});
```

## 简单的服务器

```js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
```

## 外部HTTP/S服务器

```js
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('/path/to/cert.pem'),
  key: fs.readFileSync('/path/to/key.pem')
});
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

server.listen(8080);
```

## 多个服务器共享一个HTTP / S服务器

```js
const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const server = http.createServer();
const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

wss1.on('connection', function connection(ws) {
  // ...
});

wss2.on('connection', function connection(ws) {
  // ...
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);
```

## 客户端认证


## 服务器广播

```js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) { 
        client.send(data);
      }
    });
  });
});
```


# 问题

## 获取客户端的IP地址

```js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// 
wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
});

// 当服务器运行在类似NGINX的代理之后时，事实上的标准是使用X-Forwarded-For报头。
wss.on('connection', function connection(ws, req) {
  const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
});
```

## 检测和关闭断开的连接

```js
const WebSocket = require('ws');

function noop() {}

// 设置心跳
function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.isAlive = true; // 连接时保持活动
  ws.on('pong', heartbeat); // 监听pong
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) { // 便利客户端
    if (ws.isAlive === false) return ws.terminate(); // 不活动强制关闭
    ws.isAlive = false; // 设置不活动
    ws.ping(noop); // 发送ping 
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});
```

## 客户端心跳检测

根据规范要求，自动发送Pong消息以响应ping消息。

就像上面的服务器示例一样，您的客户端可能会在不知情的情况下失去连接​​。您可能想在客户端上添加ping侦听器以防止这种情况。一个简单的实现是：

```js
const WebSocket = require('ws');

function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}

const client = new WebSocket('wss://echo.websocket.org/');

client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', function clear() {
  clearTimeout(this.pingTimeout);
})
```