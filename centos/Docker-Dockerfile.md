<!-- TOC -->

- [Dockerfile](#dockerfile)
- [快速使用](#快速使用)
- [格式](#格式)

<!-- /TOC -->

https://docs.docker.com/engine/reference/builder/

https://yeasy.gitbook.io/docker_practice/image/dockerfile/references

# Dockerfile

* Docker 通过指令文件来自动构建映像
* Dockerfile 是一个文本文档,包含用户可以在命令行上调用的所有命令
* docker build 创建一个自动执行的构建


# 快速使用

```
# docker build .
# docker build .

# 指向文件系统中任何位置的Dockerfile
# . 是上下文路径
# 上下文路径:指 docker 在构建镜像，使用到本机的文件（比如复制），docker build 命令得知这个路径后，会将路径下的所有内容打包。
# docker build -f /path/to/a/Dockerfile .

```

# 格式

```
# Comment
INSTRUCTION arguments
```

```
# 定制的镜像都是基于 FROM 的镜像
# FROM [--platform=<platform>] <image> [AS <name>]
FROM nginx

# 用于执行后面跟着的命令行命令。
# RUN <command>
# RUN ["executable", "param1", "param2"]
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
RUN ["/bin/bash", "-c", "echo hello"]

# 复制指令，从上下文目录中复制文件或者目录到容器里指定路径。
# 复制新文件或目录<src> ，并将它们添加到路径中容器的文件系统中<dest>
# COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] <源路径1>...  <目标路径>

# ADD 指令和 COPY 的使用格式一致
# 复制新文件，目录或远程文件URL <src> ，并将它们添加到该路径的映像文件系统中<dest>
# ADD [--chown=<user>:<group>] <src>... <dest>
ADD hom* /mydir/

# 类似于 RUN 指令，用于运行程序  docker run 时运行
# CMD指令中只能有一条指令Dockerfile
# CMD ["executable","param1","param2"]
# CMD ["param1","param2"]
# CMD command param1 param2
CMD ["/usr/bin/wc","--help"]

# 允许您配置将作为可执行文件运行的容器
# ENTRYPOINT ["executable", "param1", "param2"]
# ENTRYPOINT command param1 param2


# 设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。
# ENV <key> <value>
# ENV <key>=<value> ...
ENV myName John Doe


# 构建参数，与 ENV 作用一至。不过作用域不一样。ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量。
# ARG <name>[=<default value>]
ARG

# 定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。
# VOLUME ["/data"]
VOLUME <路径>

# 声明端口
# EXPOSE <port> [<port>/<protocol>...]
EXPOSE 80/udp

# 指定工作目录
WORKDIR <工作目录路径>

# 用于指定执行后续命令的用户和用户组，这边只是切换后续命令执行的用户（用户和用户组必须提前已经存在）。
USER <用户名>[:<用户组>]
```