<!-- TOC -->

- [Docker Swarm](#docker-swarm)

<!-- /TOC -->

https://docs.docker.com/engine/swarm/

https://www.cnblogs.com/ityouknow/p/8903975.html

# Docker Swarm

Docker Swarm 是 Docker 的集群管理工具。它将 Docker 主机池转变为单个虚拟 Docker 主机。 Docker Swarm 提供了标准的 Docker API，所有任何已经与 Docker 守护程序通信的工具都可以使用 Swarm 轻松地扩展到多个主机。

* swarm mananger：负责整个集群的管理工作包括集群配置、服务管理等所有跟集群有关的工作。
* work node：即图中的 available node，主要负责运行相应的服务来执行任务（task）。