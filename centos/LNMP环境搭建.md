<!-- TOC -->

- [LNMP环境搭建](#lnmp环境搭建)
- [准备工作](#准备工作)
- [nginx](#nginx)
- [php](#php)
    - [在原由的php上安装扩展(动态为php添加模块)](#在原由的php上安装扩展动态为php添加模块)
    - [PHP-FPM](#php-fpm)
    - [PHP-FPM 与 nginx 整合](#php-fpm-与-nginx-整合)
    - [composer 安装](#composer-安装)
    - [扩展列表参考](#扩展列表参考)
- [Mysql](#mysql)
    - [mysqld -MySQL服务器](#mysqld--mysql服务器)
    - [mysqld_safe -MySQL服务器启动脚本](#mysqld_safe--mysql服务器启动脚本)
    - [my.cnf](#mycnf)

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
yum install wget gcc gcc-c++ make openssl openssl-devel autoconf automake libtool libxml2 libxml2-devel
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

几个概念：
* mysqlnd 底层的数据库驱动
* mysqli 专门针对mysql设计的上层接口
* pdo 支持多种数据库的上层接口定义,需要接口实现驱动才能使用
* pdo_mysql PDO_MYSQL是实现PHP数据对象（PDO）接口 以允许从PHP访问MySQL数据库的驱动程序。
* php当编译PDO_MYSQL时，mysqlnd成为默认的MySQL库

```
# wget https://www.php.net/distributions/php-7.3.22.tar.gz
# tar -zxvf php-7.3.22.tar.gz
# ./configure --enable-mbstring --enable-bcmath --with-openssl --enable-tokenizer --enable-fpm  --enable-mysqlnd  --with-pdo-mysql 
# make
# make instll
# make clear
```

```
cp php.ini-development /usr/local/php/php.ini
cp /usr/local/etc/php-fpm.d/www.conf.default /usr/local/etc/php-fpm.d/www.conf
cp php-fpm.conf.default php-fpm.conf
# 如果打到文件可进行修改
vim php-fpm.conf
cp sapi/fpm/php-fpm /usr/local/bin

# 查看进程
# ps aux|grep php-fmp

# 查看端口
# netstat -tupln 

# kill
# killall php-fpm
```

```
ine tuning of the installation directories:
  --bindir=DIR            用户可执行文件[EPREFIX/bin]
  --sbindir=DIR           system admin executables [EPREFIX/sbin]
  --libexecdir=DIR        program executables [EPREFIX/libexec]
  --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
  --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
  --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
  --runstatedir=DIR       modifiable per-process data [LOCALSTATEDIR/run]
  --libdir=DIR            object code libraries [EPREFIX/lib]
  --includedir=DIR        C header files [PREFIX/include]
  --oldincludedir=DIR     C header files for non-gcc [/usr/include]
  --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
  --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
  --infodir=DIR           info documentation [DATAROOTDIR/info]
  --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
  --mandir=DIR            man documentation [DATAROOTDIR/man]
  --docdir=DIR            documentation root [DATAROOTDIR/doc/PACKAGE]
  --htmldir=DIR           html documentation [DOCDIR]
  --dvidir=DIR            dvi documentation [DOCDIR]
  --pdfdir=DIR            pdf documentation [DOCDIR]
  --psdir=DIR             ps documentation [DOCDIR]

System types:
  --build=BUILD     配置生成时生成[guessed]
  --host=HOST       cross-compile to build programs to run on HOST [BUILD]
  --target=TARGET   configure for building compilers for TARGET [HOST]

Optional Features and Packages:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
  --with-libdir=NAME      Look for libraries in .../NAME rather than .../lib
  --disable-rpath         Disable passing additional runtime librarysearch paths
  --enable-re2c-cgoto     Enable -g flag to re2c to use computed goto gcc extension
  --disable-gcc-global-regs  whether to enable GCC global register variables

SAPI modules:

  --with-apxs2=FILE       Build shared Apache 2.0 Handler module. FILE is the optional pathname to the Apache apxs tool apxs
  --disable-cli           Disable building CLI version of PHP (this forces --without-pear)
  --enable-embed=TYPE     EXPERIMENTAL: Enable building of embedded SAPI library TYPE is either 'shared' or 'static'. TYPE=shared
  --enable-fpm            Enable building of the fpm SAPI executable
  --with-fpm-user=USER    Set the user for php-fpm to run as. (default: nobody)
  --with-fpm-group=GRP    Set the group for php-fpm to run as. For a system user, this should usually be set to match the fpm username (default: nobody)
  --with-fpm-systemd      Activate systemd integration
  --with-fpm-acl          Use POSIX Access Control Lists
  --with-litespeed        Build PHP as litespeed module
  --enable-phpdbg         Build phpdbg
  --enable-phpdbg-webhelper Build phpdbg web SAPI support
  --enable-phpdbg-debug   Build phpdbg in debug mode
  --enable-phpdbg-readline   Enable readline support in phpdbg (depends on static ext/readline)
  --disable-cgi           Disable building CGI version of PHP
  --with-valgrind=DIR     Enable valgrind support

General settings:

  --enable-gcov           Enable GCOV code coverage (requires LTP) - FOR DEVELOPERS ONLY!!
  --enable-debug          Compile with debugging symbols
  --with-layout=TYPE      Set how installed files will be laid out.  Type can be either PHP or GNU [PHP]
  --with-config-file-path=PATH Set the path in which to look for php.ini [PREFIX/lib]
  --with-config-file-scan-dir=PATH Set the path where to scan for configuration files
  --enable-sigchild       Enable PHP's own SIGCHLD handler
  --enable-libgcc         Enable explicitly linking against libgcc
  --disable-short-tags    Disable the short-form <? start tag by default
  --enable-dmalloc        Enable dmalloc
  --disable-ipv6          Disable IPv6 support
  --enable-dtrace         Enable DTrace support
  --enable-fd-setsize     Set size of descriptor sets

Extensions:

  --disable-all           Disable all extensions which are enabled by default

  --disable-libxml        Disable LIBXML support
  --with-libxml-dir=DIR   LIBXML: libxml2 install prefix
  --with-openssl=DIR      Include OpenSSL support (requires OpenSSL >= 1.0.1)
  --with-kerberos=DIR     OPENSSL: Include Kerberos support
  --with-system-ciphers   OPENSSL: Use system default cipher list instead of hardcoded value
  --with-pcre-regex=DIR   Include Perl Compatible Regular Expressions support. DIR is the PCRE install prefix BUNDLED
  --with-pcre-jit         Enable PCRE JIT functionality (BUNDLED only)
  --with-pcre-valgrind=DIR Enable PCRE valgrind support. Developers only!
  --without-sqlite3=DIR   Do not include SQLite3 support. DIR is the prefix to SQLite3 installation directory.
  --with-zlib=DIR         Include ZLIB support (requires zlib >= 1.2.0.4)
  --with-zlib-dir=<DIR>   Define the location of zlib install directory
  --enable-bcmath         Enable bc style precision math functions
  --with-bz2=DIR          Include BZip2 support
  --enable-calendar       Enable support for calendar conversion
  --disable-ctype         Disable ctype functions
  --with-curl=DIR         Include cURL support
  --enable-dba            Build DBA with bundled modules. To build shared DBA extension use --enable-dba=shared
  --with-qdbm=DIR         DBA: QDBM support
  --with-gdbm=DIR         DBA: GDBM support
  --with-ndbm=DIR         DBA: NDBM support
  --with-db4=DIR          DBA: Oracle Berkeley DB 4.x or 5.x support
  --with-db3=DIR          DBA: Oracle Berkeley DB 3.x support
  --with-db2=DIR          DBA: Oracle Berkeley DB 2.x support
  --with-db1=DIR          DBA: Oracle Berkeley DB 1.x support/emulation
  --with-dbm=DIR          DBA: DBM support
  --with-tcadb=DIR        DBA: Tokyo Cabinet abstract DB support
  --with-lmdb=DIR         DBA: Lightning memory-mapped database support
  --without-cdb=DIR       DBA: CDB support (bundled)
  --disable-inifile       DBA: INI support (bundled)
  --disable-flatfile      DBA: FlatFile support (bundled)
  --disable-dom           Disable DOM support
  --with-libxml-dir=DIR   DOM: libxml2 install prefix
  --with-enchant=DIR      Include enchant support. GNU Aspell version 1.1.3 or higher required.
  --enable-exif           Enable EXIF (metadata from images) support
  --disable-fileinfo      Disable fileinfo support
  --disable-filter        Disable input filter support
  --with-pcre-dir         FILTER: pcre install prefix
  --enable-ftp            Enable FTP support
  --with-openssl-dir=DIR  FTP: openssl install prefix
  --with-gd=DIR           Include GD support.  DIR is the GD library base install directory BUNDLED
  --with-webp-dir=DIR     GD: Set the path to libwebp install prefix
  --with-jpeg-dir=DIR     GD: Set the path to libjpeg install prefix
  --with-png-dir=DIR      GD: Set the path to libpng install prefix
  --with-zlib-dir=DIR     GD: Set the path to libz install prefix
  --with-xpm-dir=DIR      GD: Set the path to libXpm install prefix
  --with-freetype-dir=DIR GD: Set the path to FreeType 2 install prefix
  --enable-gd-jis-conv    GD: Enable JIS-mapped Japanese font support
  --with-gettext=DIR      Include GNU gettext support
  --with-gmp=DIR          Include GNU MP support
  --with-mhash=DIR        Include mhash support
  --disable-hash          Disable hash support
  --without-iconv=DIR     Exclude iconv support
  --with-imap=DIR         Include IMAP support. DIR is the c-client install prefix
  --with-kerberos=DIR     IMAP: Include Kerberos support. DIR is the Kerberos install prefix
  --with-imap-ssl=DIR     IMAP: Include SSL support. DIR is the OpenSSL install prefix
  --with-interbase=DIR    Include Firebird support.  DIR is the Firebird base install directory /opt/firebird
  --enable-intl           Enable internationalization support
  --with-icu-dir=DIR      Specify where ICU libraries and headers can be found
  --disable-json          Disable JavaScript Object Serialization support
  --with-ldap=DIR         Include LDAP support
  --with-ldap-sasl=DIR    LDAP: Include Cyrus SASL support
  --enable-mbstring       Enable multibyte string support
  --disable-mbregex       MBSTRING: Disable multibyte regex support
  --disable-mbregex-backtrack MBSTRING: Disable multibyte regex backtrack check
  --with-onig=DIR         MBSTRING: Use external oniguruma. DIR is the oniguruma install prefix.
                          If DIR is not set, the bundled oniguruma will be used
  --with-mysqli=FILE      Include MySQLi support.  FILE is the path to mysql_config.  If no value or mysqlnd is passed as FILE, the MySQL native driver will be used
  --enable-embedded-mysqli
                          MYSQLi: Enable embedded support
                          Note: Does not work with MySQL native driver!
  --with-mysql-sock=SOCKPATH
  --with-odbcver=HEX      Force support for the passed ODBC version. A hex number is expected, default 0x0350. Use the special value of 0 to prevent an explicit ODBCVER to be defined.
  --with-adabas=DIR       Include Adabas D support /usr/local
  --with-sapdb=DIR        Include SAP DB support /usr/local
  --with-solid=DIR        Include Solid support /usr/local/solid
  --with-ibm-db2=DIR      Include IBM DB2 support /home/db2inst1/sqllib
  --with-empress=DIR      Include Empress support \$EMPRESSPATH
                          (Empress Version >= 8.60 required)
  --with-empress-bcs=DIR  Include Empress Local Access support \$EMPRESSPATH
                          (Empress Version >= 8.60 required)
  --with-custom-odbc=DIR  Include user defined ODBC support. DIR is ODBC install base
                          directory /usr/local. Make sure to define CUSTOM_ODBC_LIBS and
                          have some odbc.h in your include dirs. f.e. you should define
                          following for Sybase SQL Anywhere 5.5.00 on QNX, prior to
                          running this configure script:
                            CPPFLAGS=\"-DODBC_QNX -DSQLANY_BUG\"
                            LDFLAGS=-lunix
                            CUSTOM_ODBC_LIBS=\"-ldblib -lodbc\"
  --with-iodbc=DIR        Include iODBC support /usr/local
  --with-esoob=DIR        Include Easysoft OOB support /usr/local/easysoft/oob/client
  --with-unixODBC=DIR     Include unixODBC support /usr/local
  --with-dbmaker=DIR      Include DBMaker support
  --disable-opcache       Disable Zend OPcache support
  --disable-opcache-file  Disable file based caching
  --disable-huge-code-pages
                          Disable copying PHP CODE pages into HUGE PAGES
  --enable-pcntl          Enable pcntl support (CLI/CGI only)
  --disable-pdo           Disable PHP Data Objects support
  --with-pdo-dblib=DIR    PDO: DBLIB-DB support.  DIR is the FreeTDS home directory
  --with-pdo-firebird=DIR PDO: Firebird support.  DIR is the Firebird base
                          install directory /opt/firebird
  --with-pdo-mysql=DIR    PDO: MySQL support. DIR is the MySQL base directory
                          If no value or mysqlnd is passed as DIR, the
                          MySQL native driver will be used
  --with-zlib-dir=DIR     PDO_MySQL: Set the path to libz install prefix
  --with-pdo-oci=DIR      PDO: Oracle OCI support. DIR defaults to $ORACLE_HOME.
                          Use --with-pdo-oci=instantclient,/path/to/instant/client/lib
                          for an Oracle Instant Client installation.
 
  --with-pdo-pgsql=DIR    PDO: PostgreSQL support.  DIR is the PostgreSQL base
                          install directory or the path to pg_config
  --without-pdo-sqlite=DIR
                          PDO: sqlite 3 support.  DIR is the sqlite base
                          install directory BUNDLED
  --with-pgsql=DIR        Include PostgreSQL support.  DIR is the PostgreSQL
                          base install directory or the path to pg_config
  --disable-phar          Disable phar support
  --disable-posix         Disable POSIX-like functions
  --with-pspell=DIR       Include PSPELL support.
                          GNU Aspell version 0.50.0 or higher required
  --with-libedit=DIR      Include libedit readline replacement (CLI/CGI only)
  --with-readline=DIR     Include readline support (CLI/CGI only)
  --with-recode=DIR       Include recode support
  --disable-session       Disable session support
  --with-mm=DIR           SESSION: Include mm support for session storage
  --enable-shmop          Enable shmop support
  --disable-simplexml     Disable SimpleXML support
  --with-libxml-dir=DIR   SimpleXML: libxml2 install prefix
  --with-snmp=DIR         Include SNMP support
  --with-openssl-dir=DIR  SNMP: openssl install prefix
  --enable-soap           Enable SOAP support
  --with-libxml-dir=DIR   SOAP: libxml2 install prefix
  --enable-sockets        Enable sockets support
  --with-sodium=DIR       Include sodium support
  --with-password-argon2=DIR
                          Include Argon2 support in password_*. DIR is the Argon2 shared library path
  --enable-sysvmsg        Enable sysvmsg support
  --enable-sysvsem        Enable System V semaphore support
  --enable-sysvshm        Enable the System V shared memory support
  --with-tidy=DIR         Include TIDY support
  --disable-tokenizer     Disable tokenizer support
  --enable-wddx           Enable WDDX support
  --with-libxml-dir=DIR   WDDX: libxml2 install prefix
  --with-libexpat-dir=DIR WDDX: libexpat dir for XMLRPC-EPI (deprecated)
  --disable-xml           Disable XML support
  --with-libxml-dir=DIR   XML: libxml2 install prefix
  --with-libexpat-dir=DIR XML: libexpat install prefix (deprecated)
  --disable-xmlreader     Disable XMLReader support
  --with-libxml-dir=DIR   XMLReader: libxml2 install prefix
  --with-xmlrpc=DIR       Include XMLRPC-EPI support
  --with-libxml-dir=DIR   XMLRPC-EPI: libxml2 install prefix
  --with-libexpat-dir=DIR XMLRPC-EPI: libexpat dir for XMLRPC-EPI (deprecated)
  --with-iconv-dir=DIR    XMLRPC-EPI: iconv dir for XMLRPC-EPI
  --disable-xmlwriter     Disable XMLWriter support
  --with-libxml-dir=DIR   XMLWriter: libxml2 install prefix
  --with-xsl=DIR          Include XSL support.  DIR is the libxslt base
                          install directory (libxslt >= 1.1.0 required)
  --enable-zend-test      Enable zend-test extension
  --enable-zip            Include Zip read/write support
  --with-zlib-dir=DIR     ZIP: Set the path to libz install prefix
  --with-pcre-dir         ZIP: pcre install prefix
  --with-libzip=DIR       ZIP: use libzip
  --enable-mysqlnd        Enable mysqlnd explicitly, will be done implicitly
                          when required by other extensions
  --disable-mysqlnd-compression-support
                          Disable support for the MySQL compressed protocol in mysqlnd
  --with-zlib-dir=DIR     mysqlnd: Set the path to libz install prefix

PEAR:

  --with-pear=DIR         Install PEAR in DIR [PREFIX/lib/php]
  --without-pear          Do not install PEAR

Zend:

  --enable-maintainer-zts Enable thread safety - for code maintainers only!!
  --disable-inline-optimization
                          If building zend_execute.lo fails, try this switch
  --disable-zend-signals  whether to enable zend signal handling

TSRM:

  --with-tsrm-pth=pth-config
                          Use GNU Pth
  --with-tsrm-st          Use SGI's State Threads
  --with-tsrm-pthreads    Use POSIX threads (default)

Libtool:

  --enable-shared=PKGS    Build shared libraries default=yes
  --enable-static=PKGS    Build static libraries default=yes
  --enable-fast-install=PKGS
                          Optimize for fast installation default=yes
  --with-gnu-ld           Assume the C compiler uses GNU ld default=no
  --disable-libtool-lock  Avoid locking (might break parallel builds)
  --with-pic              Try to use only PIC/non-PIC objects default=use both
  --with-tags=TAGS        Include additional configurations automatic
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

## PHP-FPM

https://www.php.net/manual/zh/install.fpm.configuration.php

PHP-FPM(PHP FastCGI Process Manager)：PHP FastCGI 进程管理器，用于管理PHP 进程池的软件，用于接受web服务器的请求。
* PHP-FPM 的主配置文件是 /etc/php7/php-fpm.conf

```
# 启动
# systemctl restart php-fpm.service
```

## PHP-FPM 与 nginx 整合

* nginx
```
location / {
    root   html;
    index  index.php index.html index.htm;
}

location ~* \.php$ {
    fastcgi_index   index.php;
    fastcgi_pass    127.0.0.1:9000;
    include         fastcgi_params;
    fastcgi_param   SCRIPT_FILENAME    $document_root$fastcgi_script_name;
    fastcgi_param   SCRIPT_NAME        $fastcgi_script_name;
}
```

```
/usr/local/nginx/sbin/nginx -s stop
/usr/local/nginx/sbin/nginx

echo "<?php phpinfo(); ?>" >> /usr/local/nginx/html/index.php
```

##  composer 安装

```
# 载下 composer-setup.php
wget https://getcomposer.org/installer
cp installer composer-setup.php


# 第一种项目目录（本地安装）
php composer-setup.php --install-dir=项目目录 --filename=composer
# 运行
php 项目目录/composer

# 全局安装
# 下载 composer.phar
php composer-setup.php --install-dir=bin --filename=composer

mv composer /usr/local/bin/composer
composer
```

* 阿里镜像

https://developer.aliyun.com/composer?spm=a2c6h.13651102.0.0.3e221b11obQtu0

```
# 全局配置（推荐）
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
composer config -g --unset repos.packagist

# 项目配置
composer config repo.packagist composer https://mirrors.aliyun.com/composer/
composer config --unset repos.packagist
```

* 另一个镜像

```
# 全局配置（推荐）
composer config -g repo.packagist composer https://packagist.phpcomposer.com

# 项目配置
composer config repo.packagist composer https://packagist.phpcomposer.com

# composer.json
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.phpcomposer.com"
    }
}
```


## 扩展列表参考

https://www.php.net/manual/zh/extensions.php
https://www.php.net/manual/zh/langref.php
https://www.php.net/manual/zh/ini.php

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
# groupadd mysql
# useradd -r -g mysql -s /bin/false mysql
# mkdir mysql-files
# chown mysql:mysql mysql-files
# chmod 750 mysql-files

# 查看配置
# /usr/local/mysql/bin/mysqld --verbose --help

# 如果需要指定datadir
# 内容：
[mysqld]
datadir=/data
# vim /etc/my.cnf

# bin/mysqld --initialize --user=mysql
# bin/mysql_ssl_rsa_setup
# bin/mysqld_safe --user=mysql &

# 创建启动命令
# # service mysql start  服务启动
# # service mysql stop   服务停止

# cp support-files/mysql.server /etc/init.d/mysql.server
# chmod +x /etc/init.d/mysql
# chkconfig --add mysql
# chkconfig --level 345 mysql on

# 查看
# ps -ef|grep mysql

# 登录
# bin/mysql -u root -p
# mysqladmin shutdown
# ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

# 配制其他主机可访问
# > mysql> grant select,insert,update,delete on 数据库.* to '用户名'@'主机' identified by '密码';
> mysql> grant select,insert,update,delete on *.* to 'test'@'%' identified by '123456';
# 查看当前配置
> mysql> SHOW VARIABLES;
```

注意事项 
```
# centos8 mysql登录报错：mysql: error while loading shared libraries: libncurses.so.5: cannot open shared object file: No such file or directory
# 暴力解决
# yum install libncurses*
```

## mysqld -MySQL服务器

* 安装时使用
mysqld，也称为MySQL Server，是一个单线程程序，可以完成MySQL安装中的大部分工作。

```
# mysqld --verbose --help
```

## mysqld_safe -MySQL服务器启动脚本

* 启动时使用
https://dev.mysql.com/doc/refman/5.7/en/mysqld-safe.html

mysqld_safe尝试启动一个名为 mysqld的可执行文件。要覆盖默认行为并明确指定要运行的服务器的名称，请为 mysqld_safe指定一个--mysqld 或--mysqld-version选项。

```
# bin/mysqld_safe --user=mysql --datadir=/data &
```

## my.cnf

https://dev.mysql.com/doc/refman/5.7/en/option-files.html

* 如果在命令行上为mysqld或mysqld_safe指定一个选项，则该选项仅对服务器的调用有效。
* 要在服务器每次运行时使用该选件，请将其放在选件文件中。 /etc/my.cnf > /etc/mysql/my.cnf