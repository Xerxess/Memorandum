
<!-- TOC -->

- [Docker-Hub](#docker-hub)
- [储存库](#储存库)
- [docker commit](#docker-commit)
- [本地容器 docker build](#本地容器-docker-build)

<!-- /TOC -->
https://docs.docker.com/docker-hub/

# Docker-Hub

Docker Hub是Docker提供的一项服务，用于与您的团队查找和共享容器映像。

```
# 构建您的Docker映像
docker build -t <your_username>/my-first-repo .

# 
docker run <your_username>/my-first-repo

# 
docker push <your_username>/my-first-repo
```

# 储存库

单个Docker Hub存储库可以容纳许多Docker映像（存储为 tag）。

```
docker push <hub-user>/<repo-name>:<tag>
```

# docker commit

```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

# 本地容器 docker build

https://docs.docker.com/engine/reference/commandline/build/

```
docker build [OPTIONS] PATH | URL | -

docker build https://github.com/docker/rootfs.git#container:docker

docker build - < Dockerfile

# 标记图像
docker build -t vieux/apache:2.0 .
```