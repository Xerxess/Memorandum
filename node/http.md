# http

* [http.Agent](#http-agent)
    * [new Agent([options])](#new-agent)
    * [agent.createConnection(options[, callback])](#agent-createconnection)
    * [agent.keepSocketAlive(socket)](#agent-keepsocketalive)
    * [agent.destroy()](#agent-destroy)
* [http.ClientRequest 类](#http-clientrequest)
    * [事件]()
        * ['abort' 事件]()
        * ['connect' 事件]()
        * ['continue' 事件]()


要使用 HTTP 服务器与客户端，需要 require('http')。

<h2 id="http-agent">http.Agent 类 (socket应用)</h2>

Agent 负责为 HTTP 客户端管理连接的持续与复用。  

当 Agent 实例不再被使用时，建议 destroy() 它，因为未被使用的 socket 也会消耗操作系统资源。

<h2 id="new-agent">new Agent([options])</h2>

* options `<Object>` 代理的配置选项。有以下字段：
    * keepAlive `<boolean>` 保持 socket 可用即使没有请求，以便它们可被将来的请求使用而无需重新建立一个 TCP 连接。默认为 false。
    * keepAliveMsecs `<number>` 当使用了 keepAlive 选项时，该选项指定 TCP Keep-Alive 数据包的 初始延迟。 当 keepAlive 选项为 false 或 undefined 时，该选项无效。 默认为 1000。
    * maxSockets `<number>` 每个主机允许的最大 socket 数量。 默认为 Infinity。
    * maxFreeSockets `<number>` 在空闲状态下允许打开的最大 socket 数量。 仅当 keepAlive 为 true 时才有效。 默认为 256。   


http.request() 使用的默认 `http.globalAgent` 的选项均为各自的默认值。

```js
const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
```

<h3 id="agent-createconnection">agent.createConnection(options[, callback])</h3>

* options `<Object>` 包含连接详情的选项。查看 net.createConnection() 了解选项的格式。
* callback <Function> 接收被创建的 socket 的回调函数。
* 返回: `<net.Socket>`   

创建一个用于 HTTP 请求的 socket 或流。

<h3 id="agent-keepsocketalive">agent.keepSocketAlive(socket)</h3>
<h3 id="agent-destroy">agent.destroy()</h3>
销毁当前正被代理使用的任何 socket。  

通常不需要这么做。 但是如果使用的代理启用了 keepAlive，则当确定它不再被使用时，最好显式地关闭代理。 否则，在服务器终止它们之前，socket 可能还会长时间保持打开。

<h2 id="http-clientrequest">http.ClientRequest 类</h3>
该对象在 http.request() 内部被创建并返回。


<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>
<h3 id="agent-"></h3>