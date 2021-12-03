# Firewalld 和 Iptables 的异同

1，firewalld可以动态修改单条规则，动态管理规则集，允许更新规则而不破坏现有会话和连接。而iptables，在修改了规则后必须得全部刷新才可以生效；  
2，firewalld使用区域和服务而不是链式规则；  
3，firewalld默认是拒绝的，需要设置以后才能放行。而iptables默认是允许的，需要拒绝的才去限制；  
4，firewalld自身并不具备防火墙的功能，而是和iptables一样需要通过内核的netfilter来实现。也就是说，firewalld和iptables一样，它们的作用都用于维护规则，而真正使用规则干活的是内核的netfilter。只不过firewalld和iptables的结果以及使用方法不一样！  

## Firewalld

firewalld使用XML进行配置。除非非常特殊的配置，你不必处理他们，而应该使用firewalld-cmd。

### 初始化区域

```
阻塞区域（block）：任何传入的网络数据包都将被阻止；

工作区域（work）：相信网络上的其他计算机，不会损害你的计算机；

家庭区域（home）：相信网络上的其他计算机，不会损害你的计算机；

公共区域（public）：不相信网络上的任何计算机，只有选择接受传入的网络连接；

隔离区域（DMZ）：也称为非军事区域，内外网络之间增加的一层网络，起到缓冲作用。对于隔离区域，只有选择接受传入的网络连接；

信任区域（trueted）：所有网络连接都可以接受；

丢弃区域（drop）：任何传入的网络连接都被拒绝；

内部区域（internal）：信任网络上的其他计算机，不会损害你的计算机。只选择接受传入的网络连接；

外部区域（external）：不相信网络上的其他计算机，不会损害你的计算机。只选择接受传入的网络连接；

firewalld的默认区域是public。
```

### 配置文件

```
/usr/lib/firewalld    # 保存默认配置，避免修改他们；

/etc/firewalld    # 保存系统配置文件，将覆盖默认配置；
```

### firewalld配置方法

```
yum  install  firewalld  firewall-config

systemctl  start|stop|status|restart  firewalld

systemctl  enable|disable  firewalld 


firewalld-cmd  --state    #检查防火墙状态；

systemctl status firewalls    #查看firewalld守护进程状态；

firewall-cmd --help

firewall-cmd --version

firewall-cmd --state

firewall-cmd --get-active-zones     #查看网络接口使用的区域

firewall-cmd --zone=public --list-all    #查看指定区域的所有配置

firewall-cmd --list-all-zones    #查看所有区域配置

firewall-cmd --get-default-zone    #查看默认区域

firewall-cmd --set-default-zone=internal    #设置默认区域

firewall-cmd --get-zone-of-interface=eth0    #查看指定接口所属区域

firewall-cmd --zone=public --add-interface=eth0    #将接口添加到区域，默认接口都在public，永久生效加上 --permanent，然后reload

#需要永久生效需加上 --permannent

firewall-cmd --panic-on|off    #拒绝|开启 所有包

firewall-cmd --query-panic    #查看是否拒绝

firewall-cmd --reload    #无需断开连接更新防火墙规则

firewall-cmd --complete-reload    #类似于重启更新规则

firewall-cmd --zone=dmz --list-ports    #查看所有打开的端口

firewall-cmd --zone=dmz --add-port=8080/tcp    #加入一个端口的区域
```