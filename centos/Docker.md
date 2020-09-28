<!-- TOC -->

- [Docker](#docker)
- [管理工具](#管理工具)
    - [常用](#常用)
    - [Docker CLI](#docker-cli)
        - [绑定挂载卷 --volume , -v](#绑定挂载卷---volume---v)
        - [为容器分配一个名称 --name](#为容器分配一个名称---name)
        - [将文件系统挂载附加到容器 --mount](#将文件系统挂载附加到容器---mount)
        - [环境变量](#环境变量)
        - [将容器连接到网络（--network）](#将容器连接到网络--network)
        - [添加到容器主机文件（--add-host）](#添加到容器主机文件--add-host)
- [命令详解](#命令详解)
    - [docker run](#docker-run)
    - [docker start / docker stats / docker stop](#docker-start--docker-stats--docker-stop)
    - [docker pause](#docker-pause)
    - [docker top](#docker-top)
    - [docker kill](#docker-kill)
    - [docker exec](#docker-exec)
    - [docker build](#docker-build)
    - [docker commit](#docker-commit)
    - [docker port](#docker-port)
    - [docker ps](#docker-ps)
    - [docker cp](#docker-cp)
    - [docker create](#docker-create)
    - [docker rm / docker rmi](#docker-rm--docker-rmi)
    - [docker events](#docker-events)
    - [docker import / docker export](#docker-import--docker-export)
    - [docker info](#docker-info)
    - [docker inspect](#docker-inspect)
    - [docker save / docker load](#docker-save--docker-load)
    - [docker login / docker logout / docker pull / docker push](#docker-login--docker-logout--docker-pull--docker-push)
- [注意](#注意)
    - [Docker 参数 -i -t 的作用](#docker-参数--i--t-的作用)

<!-- /TOC -->

https://docs.docker.com/reference/

# Docker

# 管理工具

https://dockstation.io/

## 常用

```
# docker images
# docker ps
# docker run -itd --name=test -v /mysql:/myData -p 8101:80 -p 8102:3306 -p 8103:22 my-docker
# docker attach ubuntu_bash (进入当前状态)
# docker exec -it ubuntu_bash bash (可以执行其他命令，同 run 很像)
```

## Docker CLI
```
$ docker pull [NAME][:Tag]
//下载镜像 默认从registry.hub.docker.com下载最新版本
$ docker pusll ubuntu:14.04
$ docker pusll www.dd.com/ubuntu
```

```
$ docker images
//查看本地已有镜像列表
```

```
$ docker tag ubuntu ubuntutag
// 给本地添加自定义tag
```

```
$ docker rmi [IMAGE TAG|ID]
//删除镜像
$ docker rmi -f [IMAGE TAG|ID]
//强制删除 不推荐
```

```
// 创建镜像
$ docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]];
# docker commit CONTAINER_ID  imageName
```

```
$ docker push NAME[:TAG]
//上传镜像
```

```
$ docker search 
//搜索镜像
```

```
$ docker create  IMGAGE//创建停止状态的容器
$ docker start ID //启用容器
```


```
$ docker run IMAGE //创建一个执行完毕后，自动终止
$ docker run -i -t IMAGE //让容器保持打开
$ exit //退出容器
$ docker run -d IMAGE //守护状态的容器，即后台运行
$ docker run -p 80(本机):80(容器) //设置端口
$ docker run -p 127.0.0.1:80(本机):80(容器) //设置端口
$ docker run -p 127.0.0.1::(本机):80(容器) //设置端口
$ docker run -t -i --privileged ubuntu // 获取完整的容器功能（特权） 比如systemctl \ mount
$ docker port id 5000 //查看端口信息
$ --link 连接容器
$ docker ps //查看容器信息
$ docker ps -a -q //查看终止容器信息
$ docker stop id //终止容器
$ docekr start id
$ docker restart id

$ docker attach id //进入运行的容器
$ docker rm id //删除容器-f 强行 -l 删除窗口连接，保留窗口 -v 删除容器挂载的数据卷

$ docker inspect // 返回有关Docker对象的低级信息
```

### 绑定挂载卷 --volume , -v

```
docker run -v /doesnt/exist:/foo -w /foo -i -t ubuntu bash
```

### 为容器分配一个名称 --name



### 将文件系统挂载附加到容器 --mount



### 环境变量

```
# 设置环境变量（-e，--env，--env文件）
docker run -e MYVAR1 --env MYVAR2=foo --env-file ./env.list ubuntu bash
```

### 将容器连接到网络（--network）

```cmd
docker run -itd --network=my-net busybox
docker run -itd --network=my-net --ip=10.10.9.75 busybox
```

### 添加到容器主机文件（--add-host）

```
docker run --add-host=docker:10.180.0.1 --rm -it debian
```

# 命令详解

## docker run

https://docs.docker.com/engine/reference/run/

https://docs.docker.com/engine/reference/commandline/run/

```
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

```
# 后台运行
docker run -d

# 前台保持运行
docker run -it
```

* 网络设置

```
--dns=[]           : 为容器设置自定义DNS服务器
--network="bridge" : 将容器连接到网络
                      'bridge': create a network stack on the default Docker bridge
                      'none': no networking
                      'container:<name|id>': reuse another container's network stack
                      'host': use the Docker host network stack
                      '<network-name>|<network-id>': connect to a user-defined network
--network-alias=[] : 为容器添加网络范围的别名
--add-host=""      : Add a line to /etc/hosts (host:IP)
--mac-address=""   : 设置容器的以太网设备的MAC地址
--ip=""            : 设置容器的以太网设备的IPv4地址
--ip6=""           : 设置容器的以太网设备的IPv6地址
--link-local-ip=[] : 设置一个或多个容器的以太网设备的链接本地IPv4 / IPv6地址
```

```
docker run -it --add-host db-static:86.75.30.9 ubuntu
```

## docker start / docker stats / docker stop

## docker pause

暂停一个或多个容器中的所有进程

```
docker pause CONTAINER [CONTAINER...]
```

## docker top

显示容器的运行过程

```
docker top CONTAINER [ps OPTIONS]
```

## docker kill

杀死一个或多个正在运行的容器

```
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

## docker exec

在正在运行的容器中运行命令

```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

```
docker exec -it ubuntu_bash bash
```

## docker build

从Dockerfile构建映像

```
docker build [OPTIONS] PATH | URL | -
```

## docker commit

根据容器的更改创建新图像

```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

## docker port

```
docker port CONTAINER [PRIVATE_PORT[/PROTO]]
```

## docker ps

```
docker ps [OPTIONS]
```

## docker cp

在容器和本地文件系统之间复制文件/文件夹

```
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```

```
docker cp CONTAINER:/test.txt /dist/
docker cp /dist/test.txt CONTAINER:/down
```

## docker create

创建一个新的容器与 docker run -d 类似只是没有运行，可以手动 docker start 

```
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

## docker rm / docker rmi

## docker events

从服务器获取实时事件

```
docker events [OPTIONS]
```

## docker import / docker export

```
# 将容器的文件系统导出为tar存档
docker export [OPTIONS] CONTAINER

# 从tar导入内容以创建文件系统映像
docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

## docker info

显示系统范围的信息

```
docker info [OPTIONS]
```


## docker inspect

返回有关Docker对象的低级信息

```
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

## docker save / docker load

```
# 将一个或多个图像保存到tar存档（默认情况下流式传输到STDOUT）
docker save [OPTIONS] IMAGE [IMAGE...]

# 从tar存档或STDIN加载图像
docker load [OPTIONS]
```

## docker login / docker logout / docker pull / docker push

# 注意

> macos

https://docs.docker.com/docker-for-mac/networking/

* host.docker.internal 解析为主机使用的内部IP地址
* gateway.docker.internal 网关

## Docker 参数 -i -t 的作用

-t让docker分配一个伪终端并绑定到容器的标准输入上, -i则让容器的标准输入保持打开.
Docker中系统镜像的缺省命令是 bash，如果不加 -ti bash 命令执行了自动会退出。
