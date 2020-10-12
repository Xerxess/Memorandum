<!-- TOC -->

- [Compose](#compose)
- [安装](#安装)
- [配制](#配制)
- [命令](#命令)
    - [docker-compose up](#docker-compose-up)
    - [docker-compose build](#docker-compose-build)
    - [docker-compose down](#docker-compose-down)
    - [docker-compose run](#docker-compose-run)
    - [docker-compose start](#docker-compose-start)
    - [docker-compose stop](#docker-compose-stop)
    - [docker-compose restart](#docker-compose-restart)
    - [docker-compose rm](#docker-compose-rm)
    - [docker-compose exec](#docker-compose-exec)
    - [docker-compose kill](#docker-compose-kill)
    - [docker-compose pause](#docker-compose-pause)
    - [docker-compose port](#docker-compose-port)
    - [docker-compose ps](#docker-compose-ps)
    - [docker-compose pull](#docker-compose-pull)
    - [docker-compose push](#docker-compose-push)
    - [小笔记](#小笔记)
    - [无前台进程闪退解决办法](#无前台进程闪退解决办法)

<!-- /TOC -->

https://docs.docker.com/compose/compose-file/#build

https://docs.docker.com/compose/networking/

# Compose


Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

```
# yaml 配置实例
version: '3'
services:
  web:
    build: .
    ports:
   - "5000:5000"
    volumes:
   - .:/code
    - logvolume01:/var/log
    links:
   - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

# 安装

```
# curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# chmod +x /usr/local/bin/docker-compose
# ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# docker-compose --version
```

# 配制

```yml
version: "3.8" # 版本
services: # 构建的服务标识
  webapp: # 构建的服务名称
    build: # 指定为包含构建上下文路径
        context:  ./dir
        dockerfile: 
        args: 
        cache_from: #引擎用于缓存解析的图像列表。
            - alpine:latest
            - corp/web_app:3.14 
        labels: 
        network: # 设置网络容器连接到在构建期间运行指令
        shm_size: 
        target: 
    depends_on: # 服务之间的依赖性(顺序启动)  
            - db
            - redis
    devices: # 设备映射列表
            - "/dev/ttyUSB0:/dev/ttyUSB0"
    dns: 8.8.8.8
    entrypoint: ["php", "-d", "memory_limit=-1", "vendor/bin/phpunit"] # 覆盖默认入口点
    env_file: .env
    environment: # 添加环境变量
            RACK_ENV: development
            SHOW: 'true'
            SESSION_SECRET:
    expose: 
        - "3000"
        - "8000"
    external_links:  # 链接到此以外的容器
        - redis_1
        - project_db_1:mysql
        - project_db_1:postgresql
    extra_hosts: # 添加主机名映射
        - "somehost:162.242.195.82"
        - "otherhost:50.31.209.229"
    image: redis # 指定用于启动容器的图像
    links: # 链接到另一个服务中的容器。
        - "db"
        - "db:database"
        - "redis"
    network_mode: "bridge" # 网络模式。
    networks: # 要加入的网络
        - some-network
        - other-network
        some-network:
            aliases :  # 网络上此服务的别名（备用主机名）
                - alias1
            ipv4_address: 172.16.238.10  # 指定一个静态IP
            ipv6_address: 2001:3984:3989::10 # 指定一个静态IP
    ports: # 映射端口
        - "3000"
        - "3000-3005"
        - "8000:8000"
        - "9090-9091:8080-8081"
        - "49100:22"
        - "127.0.0.1:8001:8001"
    volumes： # 挂载主机路径或命名卷
        - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"

# https://docs.docker.com/compose/compose-file/#volume-configuration-reference
volumes: # 卷配置参考

# https://docs.docker.com/compose/compose-file/#network-configuration-reference
networks: #网络配置参考 
    mynet1: # 自定义的网络名称
        driver: bridge # 指定该网络应使用哪个驱动程序 
        attachable: true
        enable_ipv6: true # 启用IPv6网络
        ipam:
            driver: default
            config:
                - subnet: 172.28.0.0/16
        external: true # 如果设置为true，则指定此网络是在Compose之外创建的。
        name: my-app-net # 为此网络设置一个自定义名称

# https://docs.docker.com/compose/compose-file/#configs-configuration-reference
configs: # 配置配置参考
    my_first_config: # 

# https://docs.docker.com/compose/compose-file/#secrets-configuration-reference
secrets: # 安全配置参考
       
```

# 命令

## docker-compose up

构建，（重新）创建，启动并附加到服务的容器。

```
Usage: up [options] [--scale SERVICE=NUM...] [SERVICE...]

Options:
    -d, --detach               分离模式：在后台运行容器， 打印新的容器名称.
    --no-color                 产生单色输出.
    --quiet-pull               拉取时不打印进度信息
    --no-deps                  不要启动链接服务
    --force-recreate           即使容器已配置也要重新创建 和图像没有改变。
    --always-recreate-deps     重新创建从属容器。
    --no-recreate              If containers already exist, don't recreate
                               them. Incompatible with --force-recreate and -V.
    --no-build                 即使没有图像，也不要构建图像。
    --no-start                 创建服务后不要启动它们。
    --build                    启动容器之前先生成映像。
    --abort-on-container-exit  Stops all containers if any container was
                               stopped. Incompatible with -d.
    --attach-dependencies      Attach to dependent containers.
    -t, --timeout TIMEOUT      对容器使用此超时（以秒为单位） 连接或容器关闭时(default: 10)
    -V, --renew-anon-volumes   重新创建匿名卷，而不是检索 来自先前容器的数据。
    --remove-orphans           删除未定义服务的容器 在撰写文件中。
    --exit-code-from SERVICE   Return the exit code of the selected service
                               container. Implies --abort-on-container-exit.
    --scale SERVICE=NUM        Scale SERVICE to NUM instances. Overrides the
                               `scale` setting in the Compose file if present.
```

## docker-compose build

```
Usage: build [options] [--build-arg key=val...] [SERVICE...]

Options:
    --build-arg key=val     设置服务的构建时变量.
    --compress              使用gzip压缩构建上下文.
    --force-rm              始终取出中间容器.
    -m, --memory MEM        设置构建容器的内存限制.
    --no-cache              构建映像时不要使用缓存.
    --no-rm                 成功构建后请勿移除中间容器.
    --parallel              并行构建图像.
    --progress string       Set type of progress output (`auto`, `plain`, `tty`).
                            `EXPERIMENTAL` flag for native builder.
                            To enable, run with `COMPOSE_DOCKER_CLI_BUILD=1`)
    --pull                  始终尝试提取图像的较新版本.
    -q, --quiet             不要将任何内容打印到 `STDOUT`.
```

## docker-compose down

停止容器并删除up创建的容器，网络，卷和映像。

```
Usage: down [options]

Options:
    --rmi type              删除图像:
                              'all': 删除任何服务使用的所有图像.
                              'local': 仅删除没有图像的图像 由“ image”字段设置的自定义标签。
    -v, --volumes           Remove named volumes declared in the `volumes`
                            section of the Compose file and anonymous volumes
                            attached to containers.
    --remove-orphans        Remove containers for services not defined in the
                            Compose file
    -t, --timeout TIMEOUT   Specify a shutdown timeout in seconds.
                            (default: 10)
```

## docker-compose run

针对服务运行一次性命令。

```
Usage:
    run [options] [-v VOLUME...] [-p PORT...] [-e KEY=VAL...] [-l KEY=VALUE...]
        SERVICE [COMMAND] [ARGS...]

Options:
    -d, --detach          分离模式：在后台运行容器，打印 新的容器名称。
    --name NAME           为容器分配一个名称
    --entrypoint CMD      覆盖图像的入口点。
    -e KEY=VAL            设置环境变量 (can be used multiple times)
    -l, --label KEY=VAL   添加或覆盖标签 (can be used multiple times)
    -u, --user=""         以指定的用户名或uid运行
    --no-deps             Don't start linked services.
    --rm                  运行后取出容器。在分离模式下被忽略。
    -p, --publish=[]      将容器的端口发布到主机
    --service-ports       在启用和映射服务端口的情况下运行命令 给主机。
    --use-aliases         在网络中使用服务的网络别名 容器连接到。
    -v, --volume=[]       绑定挂载卷 (default [])
    -T                    禁用伪tty分配。默认情况下，“ docker-compose run” 分配TTY。
    -w, --workdir=""      容器内的工作目录
```

## docker-compose start

## docker-compose stop

## docker-compose restart

```
Usage: restart [options] [SERVICE...]

Options:
  -t, --timeout TIMEOUT      指定关闭超时（以秒为单位）。 (default: 10)
```

## docker-compose rm

删除停止的服务容器。

```
Usage: rm [options] [SERVICE...]

Options:
    -f, --force   不要要求确认删除
    -s, --stop    如果需要，请停止容器，然后再卸下
    -v            删除附加到容器的任何匿名卷
```

## docker-compose exec

等效于docker exec。

```
Usage: exec [options] [-e KEY=VAL...] SERVICE COMMAND [ARGS...]

Options:
    -d, --detach      分离模式：在后台运行命令。
    --privileged      赋予扩展的特权
    -u, --user USER   用户身份运行命令
    -T                tty.
    --index=index     index of the container if there are multiple
                      instances of a service [default: 1]
    -e, --env KEY=VAL Set environment variables (can be used multiple times,
                      not supported in API < 1.25)
    -w, --workdir DIR Path to workdir directory for this command.
```

## docker-compose kill

## docker-compose pause

## docker-compose port

## docker-compose ps

## docker-compose pull

拉取与docker-compose.yml或docker-stack.yml文件中定义的服务关联的映像，但不会基于这些映像启动容器。

```
Usage: pull [options] [SERVICE...]

Options:
    --ignore-pull-failures  尽可能拉出图像，并忽略具有拉出故障的图像。
    --parallel              Deprecated, pull multiple images in parallel (enabled by default).
    --no-parallel           Disable parallel pulling.
    -q, --quiet             Pull without printing progress information
    --include-deps          Also pull services declared as dependencies
```

## docker-compose push

```
Usage: push [options] [SERVICE...]

Options:
    --ignore-push-failures  推送所有内容，并忽略带有推送失败的图像
```

## 小笔记

## 无前台进程闪退解决办法

```yml
version: '3'
services:
   php-compose:
     build:
       context: ./php-compose
   tty: true  # 添加tty 相当于 docker run -t 操作
```