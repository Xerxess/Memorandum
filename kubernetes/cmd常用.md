<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [systemctl](#systemctl)
- [进程](#进程)
- [管理端口的命令](#管理端口的命令)

<!-- /code_chunk_output -->

# systemctl

```cmd
systemctl status <服务名称>
systemctl start <服务名称>
systemctl stop <服务名称>
systemctl restart <服务名称>
systemctl reload <服务名称>

# 使服务能够在系统启动时自动启动。
systemctl enable <服务名称>

# 阻止服务在系统启动时自动启动。
systemctl disable <服务名称>
```

# 进程

```cmd
# a：显示所有用户的进程（不仅仅是你自己的）。
# u：以用户为中心显示详细信息（user-oriented format），包括用户名、CPU和内存占用率等。
# x：同时显示没有控制终端的进程（守护进程，如系统服务）。
ps aux

# 结合 grep 进行搜索
ps aux | grep nginx

kill <PID>

# 强制终止
kill -9 <PID>
```

# 管理端口的命令

```cmd
# 查看所有正在监听的 TCP 端口
sudo ss -tuln
netstat -tuln

# 查看哪个程序在使用端口
ss -tulpn | grep 80
netstat -tulpn | grep 80

sudo ufw allow 80/tcp     # 允许 TCP 端口 80 的流量进入
sudo ufw status verbose   # 检查防火墙状态

sudo firewall-cmd --permanent --add-port=80/tcp # 允许 TCP 端口 80 的流量进入
sudo firewall-cmd --reload
```
