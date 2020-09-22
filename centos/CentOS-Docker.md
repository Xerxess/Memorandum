<!-- TOC -->

- [获取Docker Engine-CentOS](#获取docker-engine-centos)
    - [先决条件](#先决条件)
    - [卸载旧版本](#卸载旧版本)
    - [存储库安装](#存储库安装)
    - [安装DOCKER ENGINE-社区](#安装docker-engine-社区)
    - [卸载](#卸载)
    - [配置镜像加速器](#配置镜像加速器)
    - [docker -help](#docker--help)

<!-- /TOC -->

# 获取Docker Engine-CentOS

https://docs.docker.com/install/linux/docker-ce/centos/
 
Docker Engine-Community软件包 - docker-ce

## 先决条件

安装Docker Engine-Community，您需要一个CentOS 7的维护版本。不支持或未测试存档版本。

该centos-extras库必须启用。默认情况下，此存储库是启用的，但是如果已禁用它，则需要 重新启用它。

## 卸载旧版本
 
```
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

## 存储库安装

1.安装所需的软件包。yum-utils提供了yum-config-manager 效用，并device-mapper-persistent-data和lvm2由需要 devicemapper存储驱动程序。
```
yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
```

2.使用以下命令来设置稳定的存储库。

```
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

或

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

## 安装DOCKER ENGINE-社区

1.安装最新版本的Docker Engine-Community和containerd，或者转到下一步安装特定版本：

```
yum install docker-ce docker-ce-cli containerd.io
```

* 如果提示您接受GPG密钥，请验证指纹是否匹配 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35，如果是，则接受它。

* 要安装特定版本的Docker Engine-Community，请在存储库中列出可用版本，然后选择并安装：

```
yum list docker-ce --showduplicates | sort -r
```

2.启动Docker

```
systemctl start docker
```

3.通过运行hello-world 映像来验证是否正确安装了Docker Engine-Community 。

```
docker run hello-world
```

4.加入开机启动

```
systemctl enable docker
```

5.docker version

## 卸载

```
systemctl stop docker
yum -y remove docker-ce
rm -rf /var/lib/docker
```

## 配置镜像加速器

https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

```
vim  /etc/docker/daemon.json
{
  "registry-mirrors": ["https://d5kpwom7.mirror.aliyuncs.com"]
}
systemctl daemon-reload
systemctl restart docker
```


## docker -help

Management Commands:  
  builder        - 管理生成  
  config         - 管理Docker配置  
  container      - 管理容器  
  context        - 管理上下文  
  engine         - 管理Docker引擎  
  image          - 管理镜像 
  network        - 管理网络   
  node           - 管理群节点   
  plugin         - Manage plugins  
  secret         - 管理Docker机密  
  service        - 管理服务  
  stack          - 管理Docker堆栈  
  swarm          - Manage Swarm  
  system         - Manage Docker  
  trust          - 管理对Docker映像的信任  
  volume         - Manage volumes  
  
Commands:  
  attach      - 将本地标准输入、输出和错误流附加到正在运行的容器   
  build       - 从Dockerfile生成图像  
  commit      - 根据容器的更改创建新图像  
  cp          - 在容器和本地文件系统之间复制文件/文件夹  
  create      - 创建新容器    
  diff        - 检查对容器文件系统上的文件或目录的更改    
  events      - 从服务器获取实时事件    
  exec        - 在正在运行的容器中运行命令    
  export      - 将容器的文件系统导出为tar存档   
  history     - 显示图像的历史   
  images      - List images  
  import      - 从tarball导入内容以创建文件系统映像  
  info        - Display system-wide information  
  inspect     - 返回Docker对象的低级信息    
  kill        - Kill one or more running containers  
  load        - Load an image from a tar archive or STDIN  
  login       - Log in to a Docker registry  
  logout      - Log out from a Docker registry  
  logs        - Fetch the logs of a container  
  pause       - 暂停一个或多个容器中的所有进程   
  port        - 列出端口映射或容器的特定映射  
  ps          - 列出容器    
  pull        - 从注册表中提取图像或存储库   
  push        - 将映像或存储库推送到注册表    
  rename      - 重命名容器  
  restart     - Restart one or more containers  
  rm          - Remove one or more containers  
  rmi         - Remove one or more images  
  run         - 在新容器中运行命令    
  save        - Save one or more images to a tar archive (streamed to STDOUT by default)  
  search      - Search the Docker Hub for images  
  start       - Start one or more stopped containers  
  stats       - Display a live stream of container(s) resource usage statistics  
  stop        - Stop one or more running containers  
  tag         - 创建引用源映像的标记目标映像  
  top         - Display the running processes of a container  
  unpause     - Unpause all processes within one or more containers  
  update      - Update configuration of one or more containers  
  version     - Show the Docker version information  
  wait        - 阻止直到一个或多个容器停止，然后打印它们的退出代码   