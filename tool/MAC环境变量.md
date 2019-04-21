
## 查看环境变量
env (所列表)
echo $PATH (查看某个变量)

## export命令

export命令将作为他参数的变量导入到子shell中，并使之在子shell中有效。export命令把自己的参数创建为一个环境变量，而这个环境变量可以被其他脚本和当前程序调用的程序看见。

## 环境变量设置
echo $SHELL 确认是什么 Shell

Bourne Shell：

.profile或者.bash_profile

1./etc/profile   （建议不修改这个文件 ）  
全局（公有）配置，不管是哪个用户，登录时都会读取该文件。

2./etc/bashrc    （一般在这个文件中添加系统级环境变量）  
全局（公有）配置，bash shell执行时，不管是何种方式，都会读取此文件。

3.~/.bash_profile  （一般在这个文件中添加用户级环境变量）  
每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!

java 环境变量配置

https://www.jianshu.com/p/27e494e45f78

```
vim /etc/profile

JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home"
export JAVA_HOME
CLASS_PATH="$JAVA_HOME/lib"
PATH="$PATH:$JAVA_HOME/bin"

或

export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH
export CLASS_PATH=$JAVA_HOME/lib

//Mac OSX 10.5之后苹果就建议设置$JAVA_HOME变量到/usr/libexec/java_home

source /etc/profile //立即生效
```

## shell 临时环境变量

shell终端执行下列命令

```
export JAVA_HOME=/usr/share/jdk1.5.0_05

export PATH=JAVAHOME/bin:PATH

export CLASSPATH=.:JAVAHOME/lib/dt.jar:JAVA_HOME/lib/tools.jar
```

## MAC 修改host文件

vi /etc/hosts