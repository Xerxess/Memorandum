<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [kubectl](#kubectl)
  - [常用命令](#常用命令)
    - [详细查看](#详细查看)
    - [创建和删除资源](#创建和删除资源)
    - [扩缩容](#扩缩容)
    - [更改现有的应用程序资源、回滚](#更改现有的应用程序资源-回滚)
    - [端口转发](#端口转发)
    - [常用调试命令](#常用调试命令)

<!-- /code_chunk_output -->

# kubectl

Kubernetes 提供 kubectl 是使用 Kubernetes API 与 Kubernetes 集群的控制面进行通信的命令行工具。

```cmd
kubectl [command] [TYPE] [NAME] [flags]

command:指定要对一个或多个资源执行的操作，例如 create、get、describe、delete
TYPE：指定资源类型。资源类型不区分大小写， 可以指定单数、复数或缩写形式。例如，以下命令输出相同的结果：
NAME：指定资源的名称。名称区分大小写。 如果省略名称，则显示所有资源的详细信息。例如：kubectl get pods。
flags：指定可选的参数。例如，可以使用 -s 或 --server 参数指定 Kubernetes API 服务器的地址和端口。
```

## 常用命令

```cmd
# 检查版本
kubectl version

# 查看集群信息
kubectl cluster-info

# 查看节点
kubectl get nodes

# 查看所有命名空间
kubectl get namespaces

# 查看特定命名空间
kubectl get pods -n <namespace>
kubectl get pods -o wide

# 查看所有命名空间
kubectl get pods --all-namespaces

# 查看所有资源
kubectl get all

# 查看Pod
kubectl get pods
kubectl get pods -o wide

# 查看Service
kubectl get svc
```

### 详细查看

```cmd
# 查看详细信息
kubectl describe pod <pod-name>

# 查看日志
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # 跟踪日志

# 进入Pod
kubectl exec -it <pod-name> -- /bin/bash
kubectl exec hello-node-6c9b5f4b59-bdd6c -i -t -- bash
```

### 创建和删除资源

```cmd
# 快速创建nginx Deployment
kubectl create deployment nginx --image=nginx

# 快速暴露端口
kubectl expose deployment nginx --port=80 --type=LoadBalancer

# 创建资源
kubectl apply -f <file.yaml>

# 删除资源
kubectl delete -f <file.yaml>
kubectl delete pod <pod-name>
## demo
kubectl delete service hello-node
kubectl delete deployment hello-node

# 创建临时Pod进行调试
kubectl run -it --rm debug --image=busybox --restart=Never -- sh
```

### 扩缩容

```cmd
# 扩缩容Deployment
kubectl scale deployment <deployment-name> --replicas=3

# 查看扩缩容状态
kubectl rollout status deployment/<deployment-name>
```

### 更改现有的应用程序资源、回滚

```cmd
kubectl set env RESOURCE/NAME KEY_1=VAL_1 ... KEY_N=VAL_N

kubectl set image (-f FILENAME | TYPE NAME) CONTAINER_NAME_1=CONTAINER_IMAGE_1 ... CONTAINER_NAME_N=CONTAINER_IMAGE_N
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/k8s-minikube/kubernetes-bootcamp:v2


# 查看 Deployment 的上线历史记录
kubectl rollout history deployment/abc
  
# 查看 Daemonset 修订版本 3 的详细信息
kubectl rollout history daemonset/abc --revision=3

# 回滚到上一个 Deployment 的上一次部署状态
kubectl rollout undo deployment/abc

# 回滚到 Daemonset 的修订版本 3
kubectl rollout undo daemonset/abc --to-revision=3
  
# 试运行回滚到 Deployment 的上一次部署状态
kubectl rollout undo --dry-run=server deployment/abc
```

### 端口转发

```cmd
# 转发Pod端口到本地
kubectl port-forward <pod-name> 8080:80

# 转发Service端口
kubectl port-forward svc/<service-name> 8080:80
```

### 常用调试命令

```cmd
# 查看事件
kubectl get events

# 查看资源使用情况
kubectl top nodes
kubectl top pods

# 查看Pod资源限制
kubectl describe pod <pod-name> | grep -A 10 "Limits\|Requests"
```
