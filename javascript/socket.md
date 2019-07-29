# socket

https://github.com/socketio/socket.io （socket.io）  
https://github.com/sockjs/sockjs-client （sockjs）  
https://github.com/jmesnil/stomp-websocket （stomp）  
https://github.com/stomp-js/stompjs  
https://github.com/gimite/web-socket-js (falsh方案)  
https://github.com/websockets/ws  

http://jmesnil.net/stomp-websocket/doc/

# http与websocket

* http与websocket都是基于TCP(传输控制协议)的，websocket可以看做是对http协议的一个补充
#  websocket 

* html5新增加特性之一，目的是浏览器与服务端建立全双工的通信方式，解决 http 请求-响应带来过多的资源消耗，同时对特殊场景应用提供了全新的实现方式，比如聊天、股票交易、游戏等对对实时性要求较高的行业领域。

```js
var Socket = new WebSocket(url, [protocol] );
```

WebSocket 事件
以下是 WebSocket 对象的相关事件。假定我们使用了以上代码创建了 Socket 对象：

事件|	事件处理程序|描述
---|---|---
open|	Socket.onopen	|连接建立时触发
message	|Socket.onmessage	|客户端接收服务端数据时触发
error	|Socket.onerror	|通信发生错误时触发
close	|Socket.onclose	|连接关闭时触发

WebSocket 方法
以下是 WebSocket 对象的相关方法。假定我们使用了以上代码创建了 Socket 对象：

方法|	描述
---|---
Socket.send()|使用连接发送数据
Socket.close()	| 关闭连接

# SockJs

SockJS是一个JavaScript库，为了应对许多浏览器不支持WebSocket协议的问题，设计了备选SockJs。SockJS 是 WebSocket 技术的一种模拟。SockJS会尽可能对应 WebSocket API，但如果WebSocket 技术不可用的话，会自动降为轮询的方式。

# Stompjs

STOMP—— Simple Text Oriented Message Protocol——面向消息的简单文本协议。
STOMP协议，来为浏览器 和 server 间的 通信增加适当的消息语义。

stomp-websocket(stompjs) https://github.com/jmesnil/stomp-websocket


# STOMP协议

http://jmesnil.net/stomp-websocket/doc/  
http://stomp.github.io/implementations.html

STOMP即Simple (or Streaming) Text Orientated Messaging Protocol，简单(流)文本定向消息协议，它提供了一个可互操作的连接格式，允许STOMP客户端与任意STOMP消息代理（Broker）进行交互。STOMP协议由于设计简单，易于开发客户端，因此在多种语言和多种平台上得到广泛地应用。

STOMP协议的前身是TTMP协议（一个简单的基于文本的协议），专为消息中间件设计。

STOMP是一个非常简单和容易实现的协议，其设计灵感源自于HTTP的简单性。尽管STOMP协议在服务器端的实现可能有一定的难度，但客户端的实现却很容易。例如，可以使用Telnet登录到任何的STOMP代理，并与STOMP代理进行交互。



# WebSocket、SockJs、STOMP三者关系

WebSocket 是底层协议，SockJS 是WebSocket 的备选方案，也是底层协议，而 STOMP 是基于 WebSocket（SockJS）的上层协议。

1、HTTP协议解决了 web 浏览器发起请求以及 web 服务器响应请求的细节，假设 HTTP 协议 并不存在，只能使用 TCP 套接字来 编写 web 应用。

2、直接使用 WebSocket（SockJS） 就很类似于 使用 TCP 套接字来编写 web 应用，因为没有高层协议，就需要我们定义应用间所发送消息的语义，还需要确保连接的两端都能遵循这些语义；

3、同HTTP在TCP 套接字上添加请求-响应模型层一样，STOMP在WebSocket 之上提供了一个基于帧的线路格式层，用来定义消息语义；