<!-- TOC -->

- [LNMP环境搭建](#lnmp环境搭建)
- [准备工作](#准备工作)
- [nginx](#nginx)
- [php](#php)
    - [在原由的php上安装扩展(动态为php添加模块)](#在原由的php上安装扩展动态为php添加模块)
- [Mysql](#mysql)

<!-- /TOC -->

# LNMP环境搭建

https://www.nginx.com/resources/wiki/start/topics/tutorials/install/

# 准备工作


https://www.centos.org/download/
https://developer.aliyun.com/mirror/centos
https://www.php.net/distributions/php-7.3.22.tar.gz
https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.30-linux-glibc2.12-x86_64.tar.gz
http://nginx.org/download/nginx-1.18.0.tar.gz

* CentOS-7.8
* php7.3
* Mysql5.7
* Nginx

```
yum install wget gcc make openssl openssl-devel autoconf automake libtool libxml2 libxml2-devel
```

# nginx

```
wget http://nginx.org/download/nginx-1.18.0.tar.gz  
tar -zxvf nginx-1.18.0.tar.gz
./configure --prefix=/usr/local/nginx --with-http_ssl_module
make
make instll
make clear
```

```
# 启用nginx
/usr/local/nginx/sbin/nginx

# kill
killall nginx

# 操作
./nginx 
./nginx -s stop
./nginx -s quit
./nginx -s reload

# 开机自启动
chmod 755 rc.local
vi /etc/rc.local
/usr/local/nginx/sbin/nginx
```

* nginx的configure参数
```
--prefix= 指向安装目录。
--sbin-path= 指定执行程序文件存放位置。
--modules-path= 指定第三方模块的存放路径。
--conf-path= 指定配置文件存放位置。
--error-log-path= 指定错误日志存放位置。
--pid-path= 指定pid文件存放位置。
--lock-path= 指定lock文件存放位置。
--user= 指定程序运行时的非特权用户。
--group= 指定程序运行时的非特权用户组。
--builddir= 指向编译目录。
--with-rtsig_module 启用rtsig模块支持。
--with-select_module 启用select模块支持，一种轮询处理方式，不推荐在高并发环境中使用，禁用：--without-select_module。
--with-poll_module 启用poll模块支持,功能与select相同，不推荐在高并发环境中使用。
--with-threads启用thread pool支持。
--with-file-aio 启用file aio支持。
--with-http_ssl_module 启用https支持。
--with-http_v2_module 启用ngx_http_v2_module支持。
--with-ipv6 启用ipv6支持。
--with-http_realip_module 允许从请求报文头中更改客户端的ip地址，默认为关。
--with-http_addition_module 启用ngix_http_additon_mdoule支持（作为一个输出过滤器，分部分响应请求)。
--with -http_xslt_module 启用ngx_http_xslt_module支持，过滤转换XML请求 。
--with-http_image_filter_mdoule 启用ngx_http_image_filter_module支持，传输JPEG\GIF\PNG图片的一个过滤器，默认不启用，需要安装gd库。
--with-http_geoip_module 启用ngx_http_geoip_module支持，用于创建基于MaxMind GeoIP二进制文件相配的客户端IP地址的ngx_http_geoip_module变量。
--with-http_sub_module 启用ngx_http_sub_module支持，允许用一些其他文本替换nginx响应中的一些文本。
--with-http_dav_module 启用ngx_http_dav_module支持，增加PUT、DELETE、MKCOL创建集合，COPY和MOVE方法，默认为关闭，需要编译开启。
--with-http_flv_module 启用ngx_http_flv_module支持，提供寻求内存使用基于时间的偏移量文件。
--with-http_mp4_module 启用ngx_http_mp4_module支持，启用对mp4类视频文件的支持。
--with-http_gzip_static_module 启用ngx_http_gzip_static_module支持，支持在线实时压缩输出数据流。
--with-http_random_index_module 启用ngx_http_random_index_module支持，从目录中随机挑选一个目录索引。
--with-http_secure_link_module 启用ngx_http_secure_link_module支持，计算和检查要求所需的安全链接网址。
--with-http_degradation_module 启用ngx_http_degradation_module 支持允许在内存不足的情况下返回204或444代码。
--with-http_stub_status_module 启用ngx_http_stub_status_module 支持查看nginx的状态页。
--without-http_charset_module 禁用ngx_http_charset_module这一模块，可以进行字符集间的转换，从其它字符转换成UTF-8或者从UTF8转换成其它字符。它只能从服务器到客户端方向，只有一个字节的字符可以转换。
--without-http_gzip_module 禁用ngx_http_gzip_module支持，同--with-http_gzip_static_module功能一样。
--without-http_ssi_module 禁用ngx_http_ssi_module支持，提供了一个在输入端处理服务器包含文件（SSI）的过滤器。
--without-http_userid_module 禁用ngx_http_userid_module支持，该模块用来确定客户端后续请求的cookies。
--without-http_access_module 禁用ngx_http_access_module支持，提供了基于主机ip地址的访问控制功能。
--without-http_auth_basic_module 禁用ngx_http_auth_basic_module支持，可以使用用户名和密码认证的方式来对站点或部分内容进行认证。
--without-http_autoindex_module 禁用ngx_http_authindex_module，该模块用于在ngx_http_index_module模块没有找到索引文件时发出请求，用于自动生成目录列表。
--without-http_geo_module 禁用ngx_http_geo_module支持，这个模块用于创建依赖于客户端ip的变量。
--without-http_map_module 禁用ngx_http_map_module支持，使用任意的键、值 对设置配置变量。
--without-http_split_clients_module 禁用ngx_http_split_clients_module支持，该模块用于基于用户ip地址、报头、cookies划分用户。
--without-http_referer_module 禁用ngx_http_referer_modlue支持，该模块用来过滤请求，报头中Referer值不正确的请求。
--without-http_rewrite_module 禁用ngx_http_rewrite_module支持。该模块允许使用正则表达式改变URI，并且根据变量来转向以及选择配置。如果在server级别设置该选项，那么将在location之前生效，但如果location中还有更进一步的重写规则，location部分的规则依然会被执行。如果这个URI重写是因为location部分的规则造成的，那么location部分会再次被执行作为新的URI，这个循环会被执行10次，最后返回一个500错误。
--without-http_proxy_module 禁用ngx_http_proxy_module支持，http代理功能。
--without-http_fastcgi_module 禁用ngx_http_fastcgi_module支持，该模块允许nginx与fastcgi进程交互，并通过传递参数来控制fastcgi进程工作。
--without-http_uwsgi_module 禁用ngx_http_uwsgi_module支持，该模块用来使用uwsgi协议，uwsgi服务器相关。
--without-http_scgi_module 禁用ngx_http_scgi_module支持，类似于fastcgi，也是应用程序与http服务的接口标准。
--without-http_memcached_module 禁用ngx_http_memcached支持，用来提供简单的缓存，提高系统效率。
--without-http_limit_conn_module 禁用ngx_http_limit_conn_module支持，该模块可以根据条件进行会话的并发连接数进行限制。
--without-http_limit_req_module 禁用ngx_limit_req_module支持，该模块可以实现对于一个地址进行请求数量的限制。
--without-http_empty_gif_module 禁用ngx_http_empty_gif_module支持，该模块在内存中常驻了一个1*1的透明gif图像，可以被非常快速的调用。
--without-http_browser_module 禁用ngx_http_browser_mdoule支持，创建依赖于请求报头的值 。如果浏览器为modern，则$modern_browser等于modern_browser_value的值；如果浏览器为old，则$ancient_browser等于$ancient_browser_value指令分配的值；如果浏览器为MSIE，则$msie等于1。
--without-http_upstream_ip_hash_module 禁用ngx_http_upstream_ip_hash_module支持，该模块用于简单的负载均衡。
--with-http_perl_module 启用ngx_http_perl_module支持，它使nginx可以直接使用perl或通过ssi调用perl。
--with-perl_modules_path= 设定perl模块路径
--with-perl= 设定perl库文件路径
--http-log-path= 设定access log路径
--http-client-body-temp-path= 设定http客户端请求临时文件路径
--http-proxy-temp-path= 设定http代理临时文件路径
--http-fastcgi-temp-path= 设定http fastcgi临时文件路径
--http-uwsgi-temp-path= 设定http scgi临时文件路径
--http-scgi-temp-path= 设定http scgi临时文件路径
--without-http 禁用http server功能
--without-http-cache 禁用http cache功能
--with-mail 启用POP3、IMAP4、SMTP代理模块
--with-mail_ssl_module 启用ngx_mail_ssl_module支持
--without-mail_pop3_module 禁用pop3协议。
--without-mail_iamp_module 禁用iamp协议。
--without-mail_smtp_module 禁用smtp协议。
--with-google_perftools_module 启用ngx_google_perftools_mdoule支持，调试用，可以用来分析程序性能瓶颈。
--with-cpp_test_module 启用ngx_cpp_test_module支持。
--add-module= 指定外部模块路径，启用对外部模块的支持。
--with-cc= 指向C编译器路径。
--with-cpp= 指向C预处理路径。
--with-cc-opt= 设置C编译器参数，指定--with-cc-opt="-I /usr/lcal/include",如果使用select()函数，还需要同时指定文件描述符数量--with-cc-opt="-D FD_SETSIZE=2048"。 (PCRE库）
--with-ld-opt= 设置连接文件参数，需要指定--with-ld-opt="-L /usr/local/lib"。（PCRE库）
--with-cpu-opt= 指定编译的CPU类型，如pentium,pentiumpro,...amd64,ppc64...
--without-pcre 禁用pcre库。
--with-pcre 启用pcre库。
--with-pcre= 指向pcre库文件目录。
--with-pcre-opt= 在编译时为pcre库设置附加参数 。
--with-md5= 指向md5库文件目录。
--with-md5-opt= 编译时为md5库设置附加参数。
--with-md5-asm 使用md5汇编源。
--with-sha1= 指向sha1库文件目录。
--with-sha1-opt= 编译时为sha1库设置附加参数。
--with-sha1-asm 使用sha1汇编源。
--with-zlib= 指向zlib库文件目录。
--with-zlib-opt= 在编译时为zlib设置附加参数。
--with-zlib-asm= 为指定的CPU使用汇编源进行优化。
--with-libatomic 为原子内存的更新操作的实现提供一个架构。
--with-libatomic= 指向libatomic_ops的安装目录。
--with-openssl= 指向openssl安装目录。
--with-openssl-opt= 在编译时为openssl设置附加参数。
--with-debug 启用debug日志。
```

# php

```
# wget https://www.php.net/distributions/php-7.3.22.tar.gz
# tar -zxvf php-7.3.22.tar.gz
# ./configure --enable-mbstring --enable-bcmath --with-openssl --enable-tokenizer --enable-fpm --with-mysql
# make
# make instll
# make clear
```

```
cp php.ini-development /usr/local/php/php.ini
cp /usr/local/etc/php-fpm.d/www.conf.default /usr/local/etc/php-fpm.d/www.conf
cp sapi/fpm/php-fpm /usr/local/bin

# 查看进程
# ps aux|grep php-fmp

# 查看端口
# netstat -tupln 

# kill
# killall php-fpm
```

## 在原由的php上安装扩展(动态为php添加模块)

```
# 找到php原码安装文件 mysqli模块为例
# cd /home/php/ext/myslqi

# 启用phpize
# /usr/local/php/bin/phpize

# /configure –with-php-config=/usr/local/php/bin/php-config
# make && make install

# 安装完成之后会在系统 /usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/mysqli.so的库文件

# 编辑php.ini文件,指定php到哪人目录读取模块
# vi /usr/local/php/etc/php.iniextension_dir=”/usr/local/php/lib/php/extensions/no-debug-non-zts-20060613″
# extension=mysqli.so

# 重启php服务 
# /usr/local/php/sbin/php-fpm restart
```

# Mysql

* 使用通用二进制文件在Unix / Linux上安装MySQL
https://dev.mysql.com/doc/refman/5.7/en/binary-installation.html
```
# yum install libaio

# 报错libnuma.so.1
# yum install libnuma.so.1
# yum install numactl

# wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.31-linux-glibc2.12-x86_64.tar.gz
# tar -zxvf mysql-5.7.31-linux-glibc2.12-x86_64.tar.gz
# mv mysql-5.7.31-linux-glibc2.12-x86_64 /usr/local/mysql
# cd mysql
# mkdir mysql-files
# chown mysql:mysql mysql-files
# chmod 750 mysql-files
# bin/mysqld --initialize --user=mysql
# bin/mysql_ssl_rsa_setup
# bin/mysqld_safe --user=mysql &

# cp support-files/mysql.server /etc/init.d/mysql.server
# bin/mysql -uroot -p
#  mysqladmin shutdown
```
50f0ec81-fce9-11ea-bf6f-0242ac110002
2KXAzXSPKs/