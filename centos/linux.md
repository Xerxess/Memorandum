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
