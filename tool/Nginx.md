<!-- TOC -->

- [命令](#命令)
- [全局变量](#全局变量)
- [location](#location)
- [proxy_pass](#proxy_pass)
- [alias](#alias)
- [try_files](#try_files)
- [rewrite](#rewrite)
- [url 加与不加/的区别](#url-加与不加的区别)
- [允许跨域请求头](#允许跨域请求头)
- [坑](#坑)

<!-- /TOC -->

Nginx

http://shouce.jb51.net/nginx/left.html  
https://www.nginx.cn/doc/

# 命令

```
start nginx
nginx.exe -s stop
nginx.exe -s quit
nginx.exe -s reload
```

# 全局变量

- $args ： #这个变量等于请求行中的参数，同$query_string
- \$content_length ： 请求头中的 Content-length 字段。
- \$content_type ： 请求头中的 Content-Type 字段。
- \$document_root ： 当前请求在 root 指令中指定的值。
- \$host ： 请求主机头字段，否则为服务器名称。
- \$http_user_agent ： 客户端 agent 信息
- \$http_cookie ： 客户端 cookie 信息
- \$limit_rate ： 这个变量可以限制连接速率。
- \$request_method ： 客户端请求的动作，通常为 GET 或 POST。
- \$remote_addr ： 客户端的 IP 地址。
- \$remote_port ： 客户端的端口。
- \$remote_user ： 已经经过 Auth Basic Module 验证的用户名。
- \$request_filename ： 当前请求的文件路径，由 root 或 alias 指令与 URI 请求生成。
- \$scheme ： HTTP 方法（如 http，https）。
- \$server_protocol ： 请求使用的协议，通常是 HTTP/1.0 或 HTTP/1.1。
- \$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
- \$server_name ： 服务器名称。
- \$server_port ： 请求到达服务器的端口号。
- \$request_uri ： 包含请求参数的原始 URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
- $uri ： 不带请求参数的当前URI，$uri 不包含主机名，如”/foo/bar.html”。
- $document_uri ： 与$uri 相同。

# location

location [=|~|~*|^~] /uri/ { ... }

* = 开头表示精确匹配
* ^~ 开头表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格）。以xx开头
* ~ 开头表示区分大小写的正则匹配                     以xx结尾
* ~* 开头表示不区分大小写的正则匹配                以xx结尾
* !~和!~*分别为区分大小写不匹配及不区分大小写不匹配 的正则
* / 通用匹配，任何请求都会匹配到。


```nginx
location  = / {

  # 只匹配查询
  [ configuration A ] 
}
location  / {
  # matches any query, since all queries begin with /, but regular
  # expressions and any longer conventional blocks will be

  # matched first.
  [ configuration B ] 
}
location ^~ /images/ {
  # matches any query beginning with /images/ and halts searching,
  # so regular expressions will not be checked.

  [ configuration C ] 
}
location ~* \.(gif|jpg|jpeg)$ {
  # matches any request ending in gif, jpg, or jpeg. However, all
  # requests to the /images/ directory will be handled by

  # Configuration C.   
  [ configuration D ] 
}
```

# proxy_pass

http://www.360doc.com/content/13/1114/12/7694408_329125489.shtml

# alias

```nginx
location  /i/ {
 alias   /spool/w3/images/;
}

# The request "/i/top.gif" will return the file "/spool/w3/images/top.gif".
```

# try_files

try_files 是 nginx 中 http_core 核心模块所带的指令，主要是能替代一些 rewrite 的指令，提高解析效率。

```
格式1：try_files file ... uri;  格式2：try_files file ... =code;
```

- 关键点 1：按指定的 file 顺序查找存在的文件，并使用第一个找到的文件进行请求处理
- 关键点 2：查找路径是按照给定的 root 或 alias 为根路径来查找的
- 关键点 3：如果给出的 file 都没有匹配到，则重新请求最后一个参数给定的 uri，就是新的 location 匹配
- 关键点 4：如果是格式 2，如果最后一个参数是 = 404 ，若给出的 file 都没有匹配到，则最后返回 404 的响应码

```nginx
location /images/ {
    root /opt/html/;
    try_files $uri $uri/ /images/default.gif;
}
# 请求 127.0.0.1/images/test.gif 依次查找
# 1.文件/opt/html/images/test.gif
# 2.文件夹 /opt/html/images/test.gif/下的index文件
# 3.请求127.0.0.1/images/default.gif
```

```nginx
loaction / {
    try_files $uri @apache
}
loaction @apache{
    proxy_pass http://127.0.0.1:88
    include aproxy.conf
}

// try_files方法让Ngxin尝试访问后面得$uri链接，并进根据@apache配置进行内部重定向
```

# rewrite

```nginx
rewrite regex replacement[flag];

# 匹配成功后跳转到百度，执行永久301跳转
rewrite ^/(.*) http://www.baidu.com/ permanent;     
```

> flag

| 标记符号  | 说明                                                 |
| --------- | ---------------------------------------------------- |
| last      | 本条规则匹配完成后继续向下匹配新的 location URI 规则 |
| break     | 本条规则匹配完成后终止，不在匹配任何规则             |
| redirect  | 返回 302 临时重定向                                  |
| permanent | 返回 301 永久重定向                                  |

# url 加与不加/的区别

- 没有“/”时，location /abc/def 可以匹配/abc/defghi 请求，也可以匹配/abc/def/ghi 等
- 而有“/”时，location /abc/def/不能匹配/abc/defghi 请求，只能匹配/abc/def/anything 这样的请求

# 允许跨域请求头

```
server
{
    listen       8080;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

    location / {
    // 非简单请求
    if ($request_method = 'OPTIONS') {
        return 200;
    }

    proxy_pass http://********;
    # root   html;
    # index  index.html index.htm;
    }

    location /resource {
        rewrite  ^/resource/?(.*)$ /$1 break;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://192.168.137.189:8082/; # 转发地址
    }
}
```

# 坑

- Nginx 的继承的一个特性，当子层级设置了 add_header，会直接不使用父级的 add_header。
  http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header
