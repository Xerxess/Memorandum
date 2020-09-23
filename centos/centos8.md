<!-- TOC -->

- [centos8](#centos8)
- [查看版本](#查看版本)
- [CentOS 镜像](#centos-镜像)

<!-- /TOC -->
#　centos8

# 查看版本

```md
# Redhat系的Linux
# cat /etc/redhat-release

# 所有的Linux发行版
# cat /etc/issue
```

#　CentOS 镜像


https://www.centos.org/download/

https://developer.aliyun.com/mirror/centos

* CentOS ISO：DVD是标准安装盘，包含大量的常用软件 体积为4G；
* Minimal ISO：精简版本，包含核心组件，体积小；
* Everything ISO：顾名思义，包含了所有软件组件，当然体积庞大，高达7G。对完整版安装盘的软件进行补充，集成所有软件；
* NetInstall ISO：网络安装镜像；
* LiveGNOME ISO：GNOME桌面版；
* LiveKDE ISO：KDE桌面版；
* LiveCD ISO：光盘上运行的系统，类拟于winpe


```
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# CentOS 7
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

# CentOS 8
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo

curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo

```
