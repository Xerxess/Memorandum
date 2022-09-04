
# pve

## openwrt

按装时必须采用直接挂载硬盘

```cmd
qm importdisk 10* /var/lib/vz/template/iso/**.img local-lvm
```

## ikuai

```

```

# MTU VLAN

MTU VLAN（Multi-Tenant Unit VLAN）是将每个用户所占用的端口与上联端口划分为一个单独的VLAN。  
普通端口只能和预先设置的上联端口进行通信，相互之间无法通信使不同端口的用户之间不能直接通信，以保障网络的安全。  
这种情况很适合使用在智能小区中，用户之间不可以直接访问，从而保证住户的网络安全。

# 802.1Q VLAN

## PVID

缺省VLAN又称PVID( Port Default VLAN ID)，交换机每个接口都有一个缺省VLAN。默认缺省情况下，所有接口的缺省VLAN均为VLAN1。但用户可以根据实际需要进行修改配置默认VLAN、PVID。交换机处理的数据帧都带Tag，当交换机收到 Untagged帧时，就需要给该帧添加Tag，添加什么Tag,就由接口上的缺省VLAN决定。

## 端口接收数据时

*（1）如果端口是tagged方式，当数据包本身不包含VLAN的话，输入的数据包就加上该缺省vlan。
*（2）如果数据包本身已经包含了VLAN，那么就不再添加。
*（3）如果是untagged方式，输入的数据包全部都要加上该缺省vlan。不管输入的数据包是否已经有VLAN标记。

## 端口发送数据时

*（1）如果端口是tagged方式，如果端口缺省VLAN等于发送的数据包所含的VLAN，那么就会将VLAN标记从发送的数据包中去掉；如果不相等，则数据包将带着VLAN发送出去，实现VLAN的透传。
*（2）如果是untagged方式，则不管端口缺省VLAN为多少，是否等于要输出的数据包的VLAN，都会将VLAN ID从数据包中去掉。
