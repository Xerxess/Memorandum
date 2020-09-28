<!-- TOC -->

- [Docker Machine](#docker-machine)
- [安装](#安装)
- [命令](#命令)

<!-- /TOC -->

# Docker Machine

https://docs.docker.com/machine/overview/

Docker Machine 是一种可以让您在虚拟主机上安装 Docker 的工具，并可以使用 docker-machine 命令来管理主机。

Docker Machine 也可以集中管理所有的 docker 主机，比如快速的给 100 台服务器安装上 docker。

# 安装

Linux：
```
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo mv /tmp/docker-machine /usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```

# 命令

```
docker-machine ls

# 创建一台机器
docker-machine create --driver virtualbox default

# 设置环境变量以指示docker应针对特定计算机运行命令。
docker-machine env default

# 运行
docker run busybox echo hello world

# 获取主机IP地址
docker-machine ip default

# 
docker run -d -p 8000:80 nginx

# start/stop
docker-machine start default
docker-machine stop default
```