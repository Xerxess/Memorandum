<!-- TOC -->

- [Linux](#linux)
- [一些手册](#一些手册)
- [Linux 系统目录结构](#linux-系统目录结构)
    - [几个目录是比较重要](#几个目录是比较重要)
- [常用命令](#常用命令)
    - [ifconfig： 显示网络设备信息](#ifconfig-显示网络设备信息)
    - [netstat](#netstat)
    - [ps 命令](#ps-命令)
    - [mount](#mount)
- [./configure、make、make install 命令](#configuremakemake-install-命令)
- [Linux 用户和用户组管理](#linux-用户和用户组管理)
- [chmod](#chmod)
- [df -h](#df--h)
- [du -sh](#du--sh)
- [in  (快捷方式)](#in--快捷方式)
- [系统设置](#系统设置)
    - [reset](#reset)
    - [alias](#alias)
    - [crontab](#crontab)
    - [chkconfig](#chkconfig)
- [其他linux版本](#其他linux版本)
    - [Alibaba Cloud Linux 2](#alibaba-cloud-linux-2)
    - [Inclavare Containers](#inclavare-containers)

<!-- /TOC -->



# Linux

# 一些手册

https://manned.org/

https://helpmanual.io/

# Linux 系统目录结构

![Alt text](img/linux-1.jpg)

* /bin bin 是 Binaries (二进制文件) 的缩写, 这个目录存放着最经常使用的命令。
* /dev dev 是 Device(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。
* /etc etc 是 Etcetera(等等) 的缩写,这个目录用来存放所有的系统管理所需要的配置文件和子目录
* /home 用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名
* /media linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。
* /mnt 系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。
* /usr  usr 是 unix shared resources(共享资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录
* /root 该目录为系统管理员，也称作超级权限者的用户主目录
* /usr/bin 系统用户使用的应用程序
* /usr/sbin 超级用户使用的比较高级的管理程序和系统守护程序
* var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

## 几个目录是比较重要

* /etc
* /bin, /sbin, /usr/bin, /usr/sbin: 这是系统预设的执行文件的放置目录
* /var

# 常用命令

```
pwd:print work directory (打印当前目录 显示出当前工作目录的绝对路径)
ps: process status (进程状态，类似于windows的任务管理器)
df: disk free 其功能是显示磁盘可用空间数目信息及空间结点信息。换句话说，就是报告在任何安装的设备或目录中，还剩多少自由的空间。
rmdir：Remove Directory（删除目录）
rm：Remove（删除目录或文件）
mkdir：Make Directory(创建目录)
su：Swith user(切换用户) 
mv: Move file (移动文件)
cp: Copy file (复制文件)
chown: Change owner(拥有者改为指定的用户或组)
chmod:改变 linux 系统文件或目录的访问权限
cat：查看文本文件内容
find：查找文件
tail -10： 查看文件的尾部的10行
kill:杀死进程，可以先用ps 或 top命令查看进程的id，然后再用kill命令杀死进程。
```

## ifconfig： 显示网络设备信息

```
# 启动关闭指定网卡
# ifconfig eth0 down
# ifconfig eth0 up

# 配置IP地址
# ifconfig eth0 192.168.1.56 
```

## netstat

```
# 查看当前所有tcp端口
# netstat -ntlp

# 查看所有80端口使用情况
# netstat -ntulp | grep 80
```

## ps 命令

```
# 显示当前所有进程环境变量及进程间关系
# ps -ef

# 与grep联用查找某进程
# ps -aux | grep apache
```

## mount

用于挂载Linux系统外的文件

```
#mount /dev/hda1 /mnt

// 挂载iso
#mount -t iso9660 /dev/cdrom /mnt/cdrom
```

# ./configure、make、make install 命令



./configure  是用来检测你的安装平台的目标特征的。
make 是用来编译的，它从Makefile中读取指令，然后编译
make install是用来安装的，它也从Makefile中读取指令，安装到指定的位置。

```
安装编译环境
yum install gcc make autoconf automake libtool libxml2-devel

# 生成 Makefile，为下一步的编译做准备，你可以通过在 configure 后加上参数来对安装进行控制
# ./configure --prefix=/usr

# 开始进行源代码编译
# make

# 进行安装 需要 root 权限
# make install
```

# Linux 用户和用户组管理

```
# 查看用户列表
# compgen -u
```

```
# 增加一个新的用户组
groupadd 选项 用户组
groupdel 用户组

# 添加新的用户账号
-d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
-g 用户组 指定用户所属的用户组。
useradd 选项 用户名

# 删除一个已有的用户账号
userdel 选项 用户名

# 修改用户账号
usermod 选项 用户名
```

```
# groupadd usergroup

# -r:　　 用来建立系统账户
# -s：　　指定用户的登录Shell
# -g：　　指定所属的基本组（组名或GID）
# useradd -r -g usergroup -s /bin/false user

# mkdir mysql-files

# 设置文件所有者和文件关联组的命令
# chown user:usergroup mysql-files
# chmod 750 mysql-files
```


# chmod

7	读 + 写 + 执行	rwx	111   
6	读 + 写	rw-	110  
5	读 + 执行	r-x	101  
4	只读	r--	100  
3	写 + 执行	-wx	011  
2	只写	-w-	010  
1	只执行	--x	001  
0	无	---	000  

# df -h

查看各分区使用情况

# du -sh

查看指定目录的大小

# in  (快捷方式)

* 软链接：
    * 1.软链接，以路径的形式存在。类似于Windows操作系统中的快捷方式
    * 2.软链接可以 跨文件系统 ，硬链接不可以
    * 3.软链接可以对一个不存在的文件名进行链接
    * 4.软链接可以对目录进行链接
* 硬链接：
    * 1.硬链接，以文件副本的形式存在。但不占用实际空间。
    * 2.不允许给目录创建硬链接
    * 3.硬链接只有在同一个文件系统中才能创建

为某一个文件在另外一个位置建立一个同步的链接

```
ln [参数][源文件或目录][目标文件或目录]
```

```
# 给文件创建软链接
ln -s log2013.log link2013
```

#　系统设置

## reset

*  reset === tset

```
reset [-IQqrs] [-] [-e ch] [-i ch] [-k ch] [-m mapping] [terminal]
tset  [-IQqrs] [-] [-e ch] [-i ch] [-k ch] [-m mapping] [terminal]
```

## alias

用户可利用alias，自定指令的别名。  
若仅输入alias，则可列出目前所有的别名设置。  
alias的效力仅及于该次登入的操作。  
若要每次登入是即自动设好别名，可在.profile或.cshrc中设定指令的别名。  

```
alias
alias [别名]=[指令名称]
```

##  crontab

用来定期执行程序的命令

```
crontab [ -u user ] file
crontab [ -u user ] { -l | -r | -e }
```

```
# 时程表 格式
# f1 是表示分钟 (0 - 59)
# f2 表示小时 (0 - 23)
# f3 表示一个月份中的第几日  (1 - 31)
# f4 表示月份  (1 - 12) 
# f5 表示一个星期中的第几天 (0 - 7) (星期天 为0)
# program 表示要执行的程序
# f1 f2 f3 f4 f5 program
```

## chkconfig

用于检查，设置系统的各种服务

```
chkconfig [--add][--del][--list][系统服务] 
chkconfig [--level <等级代号>][系统服务][on/off/reset]
```

# 其他linux版本

##　Alibaba Cloud Linux 2

https://openanolis.org/blog/alibaba-cloud-linux-lts2/

https://www.alibabacloud.com/help/zh/doc-detail/111881.htm

* 用户态软件包保持与最新版CentOS 7兼容，该版本用户态软件包可直接在Alibaba Cloud Linux 2使用。
* 默认搭载阿里云CLI。
* 网络服务从network.service切换为systemd-networkd。
* 软件包安全漏洞（CVE）修复在Alibaba Cloud Linux 2版本支持期限内会持续更新，详情请参见Alibaba Cloud Linux 2 CVE更新记录。Alibaba Cloud Linux 2提供自动化修复方案，详情请参见基于YUM的安全更新操作。

```
docker pull registry.cn-hangzhou.aliyuncs.com/alinux/aliyunlinux:2.1903
```

## Inclavare Containers

开源Enclave容器运行时技术栈和安全架构

https://inclavare-containers.io/