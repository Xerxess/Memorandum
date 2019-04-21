# Docker

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
$ docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]];
//创建镜像
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
$ docker port id 5000 //查看端口信息
$ --link 连接容器
$ docker ps //查看容器信息
$ docker ps -a -q //查看终止容器信息
$ docker stop id //终止容器
$ docekr start id
$ docker restart id

$ docker attach id //进入运行的容器
$ docker rm id //删除容器-f 强行 -l 删除窗口连接，保留窗口 -v 删除容器挂载的数据卷
```

