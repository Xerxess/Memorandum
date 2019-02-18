# YAML

## YAML是"YAML Ain't a Markup Language"（YAML不是一种置标语言）的递归缩写。

## 快速入门

格式：
```YAML
#即表示url属性值；
url: http://www.wolfcode.cn 
#即表示server.host属性的值；
server:
    host: http://www.wolfcode.cn 
#数组，即表示server为[a,b,c]
server:
    - 120.168.117.21
    - 120.168.117.22
    - 120.168.117.23
#常量
pi: 3.14   #定义一个数值3.14
hasChild: true  #定义一个boolean值
name: '你好YAML'   #定义一个字符串
```

> 注释:使用#作为注释，YAML中只有行注释。

> 基本格式要求

1.YAML大小写敏感；  
2.使用缩进代表层级关系；  
3.缩进只能使用空格，不能使用TAB，不要求空格个数，只需要相同层级左对齐（一般2个或4个空格）  

> 对象 格式为key: value。

```YAML
key: value
```

> 使用缩进表示层级关系

```YAML
key: 
    child-key: value
    child-key2: value2
```

> 数组

```yaml
hobby:
    - Java
    - LOL
```

> 常量

```yaml
boolean: 
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float:
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int:
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null:
    nodeName: 'node'
    parent: ~  #使用~表示null
string:
    - 哈哈
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

> 一些特殊符号

* `---`
* `...`
* `!!`
* `>`
* 引用
* 合并内容