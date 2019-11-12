# 学习Laradock  
https://laradock.io/introduction/

Laradock是基于Docker的完整PHP开发环境。

支持各种通用服务，所有这些都预先配置为提供完整的PHP开发环境。

## 要求

* Docker >= 17.12
  
## 所有容器软件  

* docker-compose up -d workspace 安装开发常用工具
* docker-compose up -d nginx mysql phpmyadmin redis workspace 
*  .env文件中选择在工作区容器和其他容器中安装哪些工具。
  
> Web Servers(Web服务器):  
  
NGINX    
Apache2    
Caddy    
> Load Balancers(负载均衡器):  
  
HAProxy    
Traefik    
> PHP Compilers(PHP编译器):  
  
PHP FPM    
HHVM    
> Database Management Systems(数据库管理系统):    
  
MySQL    
PostgreSQL    
PostGIS    
MariaDB    
Percona    
MSSQL    
MongoDB  
MongoDB Web UI  
Neo4j  
CouchDB  
RethinkDB  
Cassandra  
> Database Management Apps(数据库管理应用程序):  

PhpMyAdmin  
Adminer  
PgAdmin  
> Cache Engines(缓存引擎):  
  
Redis  
Redis Web UI  
Redis Cluster  
Memcached  
Aerospike  
Varnish  
> Message Brokers(消息代理):  
  
RabbitMQ  
RabbitMQ Admin Console  
Beanstalkd  
Beanstalkd Admin Console  
Eclipse Mosquitto  
PHP Worker  
Laravel Horizon  
Gearman  
> Mail Servers(邮件服务器):  
  
Mailu  
Mailhog  
MailDev  
Log Management(日志管理):  
  
GrayLog  
Testing(测试):  
  
Selenium  
> Monitoring(监控):  
  
Grafana  
NetData  
> Search Engines(搜索引擎):  
  
ElasticSearch  
Apache Solr  
Manticore Search  
> IDE’s (IDE)  
  
ICE Coder  
Theia  
Web IDE  
> Miscellaneous(其他):  
  
Workspace (Laradock container that includes a rich set of pre-configured useful tools)  
PHP CLI  
Composer  
Git  
Vim  
xDebug  
Linuxbrew  
Node  
V8JS  
Gulp  
SQLite  
Laravel Envoy  
Deployer  
Yarn  
SOAP  
Drush  
Wordpress CLI  

> 了解  

Apache ZooKeeper (用于分布式系统的集中式服务到分层键值存储)  
Kibana (可视化您的Elasticsearch数据并浏览Elastic Stack)  
LogStash (服务器端数据处理管道，可同时从多个源中提取数据)  
Jenkins (自动化服务器，提供支持构建，部署和自动化任何项目的插件)  
Certbot (在您的网站上自动启用HTTPS)  
Swoole (PHP的生产级异步编程框架)  
SonarQube (连续检查代码质量以执行自动检查，并对代码进行静态分析以检测错误等)  
Gitlab (用于整个软件开发生命周期的单个应用程序)  
PostGIS (PostgreSQL的数据库扩展器。它增加了对地理对象的支持，从而允许在SQL中运行位置查询)  
Blackfire (使所有PHP开发人员和IT / Ops能够持续验证和提高其应用程序的性能）  
Laravel Echo (将WebSocket的功能带到您的Laravel应用程序中)  
Phalcon (基于模型-视图-控制器模式的PHP Web框架)  
Minio (根据Apache许可v2发布的云存储服务器，与Amazon S3兼容)  
AWS EB CLI (可帮助您部署和管理AWS Elastic Beanstalk应用程序和环境的CLI）  
Thumbor (照片缩略图服务）  
IPython (为交互式计算提供丰富的体系结构)  
Jupyter Hub (适用于多个用户的Jupyter笔记本)  
Portainer (轻松构建和管理Docker环境)  
Docker Registry (用于存储和分发Docker映像的Docker Registry实现)  
Docker Web UI (基于浏览器的解决方案，用于浏览和修改私有Docker注册表)  

## 文件说明

* docker-compose.yml 软件配制
* env-example 同上

## 安装

* git clone https://github.com/laradock/laradock.git

```
// 目录结构
+ laradock
+ project-z
```

```
cd laradock
cp env-example .env
```

## 说明

* docker ps 列出当前正在运行的容器
* docker-compose ps 查看此项目容器
* docker-compose stop 关闭所有正在运行
* docker-compose stop {container-name} 停止单个容器
* docker-compose down 删除所有现有容器
* docker-compose exec {container-name} bash 在运行中的容器中运行命令
* docker-compose build mysql 重新构建容器
* docker-compose build  构建/重新构建
* docker-compose build --no-cache {container-name} 
* docker-compose logs {container-name} 查看日志文件

## 启动/停止xDebug

> 安装xDebug
1-首先安装xDebug在Workspace和PHP-FPM容器中：  
a）打开.env文件  
b）WORKSPACE_INSTALL_XDEBUG在Workspace容器下搜索参数  
c）将其设置为true  
d）PHP_FPM_INSTALL_XDEBUG在PHP-FPM容器下搜索参数  
e）设置它至true  
 
* 默认情况下，停止运行xDebug .php-fpm/xdebug stop。
* 默认情况下启动xDebug ：.php-fpm/xdebug start。
* 查看状态：.php-fpm/xdebug status。

# Laradock进行生产

建议生产时创建一个自定义docker-compose.yml文件，例如production-docker-compose.yml

在新的生产docker-compose.yml文件中，您应仅包含计划在生产中运行的容器（使用示例：）

```
docker-compose -f production-docker-compose.yml up -d nginx mysql redis ...
```