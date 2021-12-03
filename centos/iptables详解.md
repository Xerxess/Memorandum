<!-- TOC -->

- [iptables 详解](#iptables-详解)
    - [防火墙相关概念](#防火墙相关概念)
    - [表的概念](#表的概念)
    - [表链关系](#表链关系)
    - [表（功能）<–> 链（钩子）：](#表功能-链钩子)
    - [优先级](#优先级)
    - [规则的概念](#规则的概念)
        - [匹配条件](#匹配条件)
        - [处理动作](#处理动作)
    - [匹配条件](#匹配条件-1)
        - [源地址](#源地址)
        - [目标IP地址](#目标ip地址)
        - [协议类型](#协议类型)
        - [匹配报文流入的网卡](#匹配报文流入的网卡)
        - [匹配报文流出的网卡](#匹配报文流出的网卡)
    - [扩展模块](#扩展模块)
    - [iptables自定义链](#iptables自定义链)
    - [iptables之网络防火墙](#iptables之网络防火墙)
    - [NAT是Network Address Translation](#nat是network-address-translation)
        - [动作：SNAT](#动作snat)
        - [动作：MASQUERADE](#动作masquerade)
        - [动作：DNAT](#动作dnat)
        - [动作: REDIRECT](#动作-redirect)
    - [相关命令](#相关命令)
        - [表查询](#表查询)
        - [增加规则](#增加规则)
        - [删除规则](#删除规则)
    - [](#)

<!-- /TOC -->

# iptables 详解

https://www.zsythink.net/archives/1199  
https://www.cnblogs.com/minseo/p/13595092.html

## 防火墙相关概念

- iptables 其实不是真正的防火墙，我们可以把它理解成一个客户端代理，用户通过 iptables 这个代理，将用户的安全设定执行到对应的”安全框架”中，这个”安全框架”才是真正的防火墙，这个框架的名字叫 netfilter
- netfilter 才是防火墙真正的安全框架（framework），netfilter 位于内核空间。
- iptables 其实是一个命令行工具，位于用户空间，我们用这个工具操作真正的框架。

## 表的概念

filter 表：负责过滤功能，防火墙；内核模块：iptables_filter  
nat 表：network address translation，网络地址转换功能；内核模块：iptable_nat  
mangle 表：拆解报文，做出修改，并重新封装 的功能；iptable_mangle  
raw 表：关闭 nat 表上启用的连接追踪机制；iptable_raw

## 表链关系

PREROUTING 的规则可以存在于：raw 表，mangle 表，nat 表。  
INPUT 的规则可以存在于：mangle 表，filter 表，（centos7 中还有 nat 表，centos6 中没有）。  
FORWARD 的规则可以存在于：mangle 表，filter 表。  
OUTPUT 的规则可以存在于：raw 表 mangle 表，nat 表，filter 表。  
POSTROUTING 的规则可以存在于：mangle 表，nat 表。

## 表（功能）<–> 链（钩子）：

raw 表中的规则可以被哪些链使用：PREROUTING，OUTPUT  
mangle 表中的规则可以被哪些链使用：PREROUTING，INPUT，FORWARD，OUTPUT，POSTROUTING  
nat 表中的规则可以被哪些链使用：PREROUTING，OUTPUT，POSTROUTING（centos7 中还有 INPUT，centos6 中没有）  
filter 表中的规则可以被哪些链使用：INPUT，FORWARD，OUTPUT

## 优先级

raw –> mangle –> nat –> filter

## 规则的概念

### 匹配条件

### 处理动作

ACCEPT：允许数据包通过。

DROP：直接丢弃数据包，不给任何回应信息，这时候客户端会感觉自己的请求泥牛入海了，过了超时时间才会有反应。  
REJECT：拒绝数据包通过，必要时会给数据发送端一个响应的信息，客户端刚请求就会收到拒绝的信息。  
SNAT：源地址转换，解决内网用户用同一个公网地址上网的问题。  
MASQUERADE：是 SNAT 的一种特殊形式，适用于动态的、临时会变的 ip 上。  
DNAT：目标地址转换。  
REDIRECT：在本机做端口映射。  
LOG：在/var/log/messages 文件中记录日志信息，然后将数据包传递给下一条规则，也就是说除了记录以外不对数据包做任何其他操作，仍然让下一条规则去匹配。

## 匹配条件

### 源地址

````
#示例如下 -s用于匹配报文的
iptables -t filter -I INPUT -s 192.168.1.111,192.168.1.118 -j DROP
iptables -t filter -I INPUT -s 192.168.1.0/24 -j ACCEPT
iptables -t filter -I INPUT ! -s 192.168.1.0/24 -j ACCEPT
```

### 目标IP地址

```
#示例如下 -d用于匹配报文的目标地址
iptables -t filter -I OUTPUT -d 192.168.1.111,192.168.1.118 -j DROP
iptables -t filter -I INPUT -d 192.168.1.0/24 -j ACCEPT
iptables -t filter -I INPUT ! -d 192.168.1.0/24 -j ACCEPT
```
### 协议类型

centos6中，-p选项支持协议类型:tcp, udp, udplite, icmp, esp, ah, sctp

centos7中，-p选项支持协议类型:tcp, udp, udplite, icmp, icmpv6,esp, ah, sctp, mh

```
#示例如下 -p用于匹配报文的协议类型
iptables -t filter -I INPUT -p tcp -s 192.168.1.146 -j ACCEPT
iptables -t filter -I INPUT ! -p udp -s 192.168.1.146 -j ACCEPT

```

### 匹配报文流入的网卡

```
#示例如下 -i用于匹配报文是从哪个网卡接口流入本机的
iptables -t filter -I INPUT -p icmp -i eth4 -j DROP
iptables -t filter -I INPUT -p icmp ! -i eth4 -j DROP
```

### 匹配报文流出的网卡

```
#示例如下 -o用于匹配报文将要从哪个网卡接口流出本机
iptables -t filter -I OUTPUT -p icmp -o eth4 -j DROP
iptables -t filter -I OUTPUT -p icmp ! -o eth4 -j DROP
```

## 扩展模块

未了解

## iptables自定义链


```
#示例：在filter表中创建IN_WEB自定义链
iptables -t filter -N IN_WEB

#示例：在INPUT链中引用刚才创建的自定义链
iptables -t filter -I INPUT -p tcp --dport 80 -j IN_WEB

#示例：将IN_WEB自定义链重命名为WEB
iptables -E IN_WEB WEB

#示例：删除引用计数为0并且不包含任何规则的WEB链
iptables -X WEB
```

## iptables之网络防火墙

```
#如果想要iptables作为网络防火墙，iptables所在主机开启核心转发功能，以便能够转发报文。
#使用如下命令查看当前主机是否已经开启了核心转发，0表示为开启，1表示已开启
cat /proc/sys/net/ipv4/ip_forward
#使用如下两种方法均可临时开启核心转发，立即生效，但是重启网络配置后会失效。
方法一：echo 1 > /proc/sys/net/ipv4/ip_forward
方法二：sysctl -w net.ipv4.ip_forward=1
#使用如下方法开启核心转发功能，重启网络服务后永久生效。
配置/etc/sysctl.conf文件（centos7中配置/usr/lib/sysctl.d/00-system.conf文件），在配置文件中将 net.ipv4.ip_forward设置为1

#由于iptables此时的角色为"网络防火墙"，所以需要在filter表中的FORWARD链中设置规则。
#可以使用"白名单机制"，先添加一条默认拒绝的规则，然后再为需要放行的报文设置规则。
#配置规则时需要考虑"方向问题"，针对请求报文与回应报文，考虑报文的源地址与目标地址，源端口与目标端口等。
#示例为允许网络内主机访问网络外主机的web服务与sshd服务。
iptables -A FORWARD -j REJECT
iptables -I FORWARD -s 10.1.0.0/16 -p tcp --dport 80 -j ACCEPT
iptables -I FORWARD -d 10.1.0.0/16 -p tcp --sport 80 -j ACCEPT
iptables -I FORWARD -s 10.1.0.0/16 -p tcp --dport 22 -j ACCEPT
iptables -I FORWARD -d 10.1.0.0/16 -p tcp --sport 22 -j ACCEPT

#可以使用state扩展模块，对上述规则进行优化，使用如下配置可以省略许多"回应报文放行规则"。
iptables -A FORWARD -j REJECT
iptables -I FORWARD -s 10.1.0.0/16 -p tcp --dport 80 -j ACCEPT
iptables -I FORWARD -s 10.1.0.0/16 -p tcp --dport 22 -j ACCEPT
iptables -I FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT
```

## NAT是Network Address Translation

NAT是Network Address Translation的缩写，译为”网络地址转换”，NAT说白了就是修改报文的IP地址，NAT功能通常会被集成到路由器、防火墙、或独立的NAT设备中。

### 动作：SNAT

隐藏网内主机的IP地址

内部网络的报文发送出去时，报文的源IP会被修改，也就是源地址转换：Source Network Address Translation，缩写为SNAT。

```
iptables -t nat -A POSTROUTING -s 10.1.0.0/16 -j SNAT --to-source 公网IP
```

### 动作：MASQUERADE

公网IP是动态获取的，不是固定的，则可以使用MASQUERADE进行动态的SNAT操作

MASQUERADE会动态的将源地址转换为可用的IP地址，其实与SNAT实现的功能完全一致，都是修改源地址，只不过SNAT需要指明将报文的源地址改为哪个IP，而MASQUERADE则不用指定明确的IP，会动态的将报文的源地址修改为指定网卡上可用的IP地址

```
iptables -t nat -A POSTROUTING -s 10.1.0.0/16 -o eth0 -j MASQUERADE
```

### 动作：DNAT

通过公网IP访问局域网内的服务

外部网络的报文响应时，响应报文的目标IP会再次被修改，也就是目标地址转换：Destinationnetwork address translation，缩写为DNAT。

```
iptables -t nat -I PREROUTING -d 公网IP -p tcp --dport 公网端口 -j DNAT --to-destination 私网IP:端口号
iptables -t nat -I PREROUTING -d 公网IP -p tcp --dport 8080 -j DNAT --to-destination 10.1.0.1:80
iptables -t nat -A POSTROUTING -s 10.1.0.0/16 -j SNAT --to-source 公网IP
```

### 动作: REDIRECT

本机进行目标端口映射

```
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
```

## 相关命令

### 表查询

```
$ iptables -t 表名 -L  // 查看iptables表
$ iptables -t 表名 -L 链名 // 查看对应表的所有规则，-t选项指定要操作的表，省略”-t 表名”时，默认表示操作filter表，-L表示列出规则，即查看规则
$ iptables -t 表名 -v -L // 查看指定表的指定链中的规则

policy:表示当前链的默认策略
packets:表示当前链（上例为INPUT链）默认策略匹配到的包的数量，0 packets表示默认策略匹配到0个包。
bytes:表示当前链默认策略匹配到的所有包的大小总和。

pkts:对应规则匹配到的报文的个数。
bytes:对应匹配到的报文包的大小总和。
target:规则对应的target，往往表示规则对应的”动作”，即规则匹配成功后需要采取的措施。
prot:表示规则对应的协议，是否只针对某些协议应用此规则。
opt:表示规则对应的选项。
in:表示数据包由哪个接口(网卡)流入，我们可以设置通过哪块网卡流入的报文需要匹配当前规则。
out:表示数据包由哪个接口(网卡)流出，我们可以设置通过哪块网卡流出的报文需要匹配当前规则。
source:表示规则对应的源头地址，可以是一个IP，也可以是一个网段。
destination:表示规则对应的目标地址。可以是一个IP，也可以是一个网段。
```

### 增加规则

```
尾部添加一条规则 命令语法：iptables -t 表名 -A 链名 匹配条件 -j 动作
$ iptables -t filter -A INPUT -s 192.168.1.146 -j DROP

首部添加一条规则 命令语法：iptables -t 表名 -I 链名 匹配条件 -j 动作
$ iptables -t filter -I INPUT -s 192.168.1.146 -j ACCEPT

指定链的指定位置添加一条规则 命令语法：iptables -t 表名 -I 链名 规则序号 匹配条件 -j 动作
$ iptables -t filter -I INPUT 5 -s 192.168.1.146 -j REJECT

指定链的默认策略（默认动作） 命令语法：iptables -t 表名 -P 链名 动作
$ iptables -t filter -P FORWARD ACCEPT
```

### 删除规则

```
命令语法：iptables -t 表名 -D 链名 规则序号
$ iptables -t filter -D INPUT 3

命令语法：iptables -t 表名 -D 链名 匹配条件 -j 动作
$ iptables -t filter -D INPUT -s 192.168.1.146 -j DROP
```

###

注意点：centos7中使用默认使用firewalld，如果想要使用上述命令保存规则，需要安装iptables-services，具体配置过程请回顾上文。

```
service iptables save
```
````
