<!-- TOC -->

- [命令](#命令)
- [proxy_pass](#proxy_pass)
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

# proxy_pass

http://www.360doc.com/content/13/1114/12/7694408_329125489.shtml

> url 加与不加/的区别

* 没有“/”时，location /abc/def可以匹配/abc/defghi请求，也可以匹配/abc/def/ghi等  
* 而有“/”时，location /abc/def/不能匹配/abc/defghi请求，只能匹配/abc/def/anything这样的请求

# 允许跨域请求头

```
server
{
    listen       8080;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

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

* Nginx 的继承的一个特性，当子层级设置了 add_header，会直接不使用父级的 add_header。
http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header