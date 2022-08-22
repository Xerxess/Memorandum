<!-- TOC -->

- [Linux 磁盘管理](#linux-%E7%A3%81%E7%9B%98%E7%AE%A1%E7%90%86)

<!-- /TOC -->

# Linux 磁盘管理

https://www.runoob.com/linux/linux-filesystem.html

`根路径 / 都是位于系统盘`

* df（英文全称：disk free）：列出文件系统的整体磁盘使用量
* du（英文全称：disk used）：检查磁盘空间使用量
* fdisk：用于磁盘分区

```cmd
# df 数据盘没有分区和挂载，使用df命令是看不到的
$ df [-ahikHTm] [目录或文件名]
$ df #将系统内所有的文件系统列出来
$ df -h #以易读的容量格式显示出来
$ df / -h # 找出你系统中的根目录所在磁盘，并查阅该硬盘内的相关信息
```

```cmd
# du du 命令也是查看使用空间的，但是与 df 命令不同的是 Linux du 命令是对文件和目录磁盘使用的空间的查看，还是和df命令有一些区别的，这里介绍 Linux du 命令。
$ du [-ahskm] 文件或目录名称
$ du -a
```

```cmd
# fdisk 是 Linux 的磁盘分区表操作工具。
$ fdisk [-l] 装置名称
```

```cmd
# 磁盘格式化
# -t ：可以接文件系统格式，例如 ext3, ext2, vfat 等(系统有支持才会生效)
$ mkfs [-t 文件系统格式] 装置文件名
$ mkfs[tab][tab]  # 查看 mkfs 支持的文件格式
$ mkfs -t ext3 /dev/hdc6
```

```cmd
# 磁盘挂载与卸除
$ mount [-t 文件系统] [-L Label名] [-o 额外选项] [-n]  装置文件名  挂载点
$ umount [-fn] 装置文件名或挂载点
```