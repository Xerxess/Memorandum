
# Minikube

https://minikube.sigs.k8s.io/docs/

- minikube 是本地 Kubernetes，专注于让 Kubernetes 的学习和开发变得容易。
- 您只需要一个 Docker（或类似兼容的）容器或虚拟机环境，即可通过一条命令启动 Kubernetes： minikube start

要求：

https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Fx86-64%2Fstable%2Fbinary+download

- 2 个或更多 CPU
- 2GB 可用内存
- 20GB 可用磁盘空间
- 容器或虚拟机管理器，例如： Docker 、 QEMU 、 Hyperkit 、 Hyper-V 、 KVM 、 Parallels 、 Podman 、 VirtualBox 或 VMware Fusion/Workstation 。

```cmd
# 启动集群
minikube start

minikube status

#  Kubernetes Dashboard
minikube dashboard

minikube pause
minikube unpause
minikube stop
minikube delete --all
```

## Demo 部署应用程序

```cmd
kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0
kubectl expose deployment hello-minikube --type=NodePort --port=8080

kubectl get services hello-minikube
minikube service hello-minikube
kubectl port-forward service/hello-minikube 7080:8080
```