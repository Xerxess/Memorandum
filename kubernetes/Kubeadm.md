<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Kubeadm](#kubeadm)
  - [第一步：环境准备（所有节点）](#第一步环境准备所有节点)
  - [第二步：安装容器运行时 (Containerd)（所有节点）](#第二步安装容器运行时-containerd所有节点)
  - [第三步：安装 Kubeadm、Kubelet 和 Kubectl（所有节点）](#第三步安装-kubeadm-kubelet-和-kubectl所有节点)
  - [第四步 init](#第四步-init)
  - [第五步安装网络插件 (只在主节点上)](#第五步安装网络插件-只在主节点上)
  - [第六步 加入node（子节点）](#第六步-加入node子节点)
- [命令](#命令)
- [创建您自己的图表](#创建您自己的图表)

<!-- /code_chunk_output -->

# Kubeadm

## 第一步：环境准备（所有节点）

```cmd
sudo swapoff -a
# 永久禁用：注释掉 /etc/fstab 文件中包含 swap 的行
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 配置 sysctl 参数
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# 应用 sysctl 参数
sudo sysctl --system

# 在 Master 节点上执行:
sudo hostnamectl set-hostname k8s-master

# 在 Worker 节点上执行 (例如 worker1):
sudo hostnamectl set-hostname k8s-worker1

# 编辑所有节点的 /etc/hosts 文件 (可选)
192.168.1.10 k8s-master
192.168.1.11 k8s-worker1

```

## 第二步：安装容器运行时 (Containerd)（所有节点）

```cmd


sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg lsb-release

# 添加 Docker 的官方 GPG 密钥
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 添加 Docker APT 仓库到源列表
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y containerd.io

# 继续配置 Containerd
# 生成默认配置并修改 cgroup 驱动
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml

# 重启 containerd 服务
sudo systemctl restart containerd
sudo systemctl enable containerd

# 检查服务状态
sudo systemctl status containerd

```

## 第三步：安装 Kubeadm、Kubelet 和 Kubectl（所有节点）

```cmd


sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

# If the directory `/etc/apt/keyrings` does not exist, it should be created before the curl command, read the note below.
# sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.34/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# This overwrites any existing configuration in /etc/apt/sources.list.d/kubernetes.list
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.34/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

sudo systemctl enable --now kubelet
```

## 第四步 init

```cmd

sudo kubeadm init --pod-network-cidr=10.244.0.0/16

```

## 第五步安装网络插件 (只在主节点上)

```cmd


# 加载内核模块: 确保 Linux 内核已加载必要的模块，允许 iptables 检查桥接流量
sudo modprobe overlay
sudo modprobe br_netfilter

echo "net.bridge.bridge-nf-call-iptables=1" | sudo tee -a /etc/sysctl.conf
echo "net.bridge.bridge-nf-call-ip6tables=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml

kubectl get pods -n kube-flannel -o wide
# 或
# kubectl get pods -n kube-system -l app=flannel

kubectl get nodes
```

## 第六步 加入node（子节点）

- 主节点init 后会输出以下内容

```
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.1.133:6443 --token s1a8ph.zpk665l8c7qa1dpw \
        --discovery-token-ca-cert-hash sha256:10c29b310402b453a5bcc05f8a77518941a7ad8af1bfeff460fa1f549edfb9cb 
```

```cmd


# 加载 br_netfilter 模块
sudo modprobe br_netfilter
sudo sysctl net.bridge.bridge-nf-call-iptables=1
sudo sysctl net.bridge.bridge-nf-call-ip6tables=1
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# 应用配置
sudo sysctl --system

kubeadm join 192.168.1.133:6443 --token s1a8ph.zpk665l8c7qa1dpw \
        --discovery-token-ca-cert-hash sha256:10c29b310402b453a5bcc05f8a77518941a7ad8af1bfeff460fa1f549edfb9cb 

# 如果flannel Pod 没有运行起来 回到主节点
# kubectl delete pod kube-flannel-ds-dz92s -n kube-flannel
# kubectl get pods -n kube-flannel
```

# 命令

```cmd
# Helm 3 不再自带默认的图表仓库
# 查看已配置的仓库s
helm repo list
# 添加添加第三方库
helm repo add brigade https://brigadecore.github.io/charts

# helm search hub 搜索 Artifact Hub ，其中列出了来自数十个不同存储库的 helm charts。
helm search hub wordpress

# helm search repo 会搜索你已添加到本地 Helm 客户端（使用 helm repo add ）的仓库。此搜索基于本地数据，无需公共网络连接。
helm search repo wordpress

# 查看所有当前已部署的版本
helm list

# 安装软件
helm install happy-panda bitnami/wordpress

# 安装前自定义图表
## 查看图表上可配置的选项
helm show values bitnami/wordpress

## 两种方式可以传递配置数据
### --values （或 -f ）：指定一个包含覆盖设置的 YAML 文件
helm show -f file.yaml
### --set ：在命令行上指定覆盖设置。
helm show values bitnami/wordpress --set name=value,name2=value2

# 跟踪版本状态或重新读取配置信息
helm status happy-panda

# 卸载
helm uninstall happy-panda
```

# 创建您自己的图表

```cmd
# 创建您自己的图表 - 创建自己的模板
helm create deis-workflow

# 将图表打包分发
helm package deis-workflow

# 安装该图表
helm install deis-workflow ./deis-workflow-0.1.0.tgz
```
