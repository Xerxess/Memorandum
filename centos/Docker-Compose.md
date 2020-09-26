<!-- TOC -->

- [Compose](#compose)
- [安装](#安装)
- [配制](#配制)
- [命令](#命令)

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

```
# 
docker-compose up -d

# 关闭容器并删除
docker-compose down
```