<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [节点（Node）](#节点node)

<!-- /code_chunk_output -->

# 节点（Node）

Kubernetes 通过将容器放入在节点（Node）上运行的 Pod 中来执行你的工作负载。

- 节点可以是一个虚拟机或者物理机器，取决于所在的集群配置。
- 每个节点包含运行 Pod 所需的服务； 
- 这些节点由控制面负责管理。
- 节点上的组件包括 kubelet、 容器运行时以及 kube-proxy
