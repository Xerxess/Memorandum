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
