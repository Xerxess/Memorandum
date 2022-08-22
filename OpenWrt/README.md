

OpenWrt项目是一个针对嵌入式设备的Linux操作系统。OpenWrt没有尝试创建单一的静态固件，而是提供了一个具有软件包管理的完全可写文件系统。这使您免于供应商提供的应用程序选择和配置，并允许您通过使用软件包自定义设备以适应任何应用程序。对于开发人员来说，OpenWrt是构建应用程序的框架，而无需围绕它构建完整的固件；对于用户来说，这意味着完全自定义，以从未想象过的方式使用设备。

# DHCP

编辑 /tmp/dhcp.leases 文件，删除想清理的IP地址/MAC地址那一行
重启dnsmasq：/etc/init.d/dnsmasq restart
service network restart