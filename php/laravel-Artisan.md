# Artisan

Artisan 是 Laravel 自带的命令行接口，他提供了许多使用的命令来帮助你构建 Laravel 应用 。

## 用法

* php artisan list 命令的列表
* php artisan help migrate
* php artisan [tinker] 命令发布 (包括 Eloquent ORM、任务、事件等等) 
* php artisan make:command SendEmails 生成命令

## 例子


## 命令
> 常规  
clear-compiled       - 删除编译的类文件 
down                 - 将应用程序置于维护模式  
env                  - 显示当前框架环境  
help                 - Displays help for a command  
inspire              - 展示鼓舞人心的名言   
list                 - Lists commands  
migrate              - 运行数据库迁移    
optimize             - 缓存框架引导文件    
preset               - 交换应用程序的前端脚手架    
serve                - 在PHP开发服务器上为应用程序提供服务    
tinker               - 与应用程序交互    
up                   - 使应用程序退出维护模式    

> auth  
auth:clear-resets    - 刷新过期的密码重置令牌  

> cache  
cache:clear          - 刷新应用程序缓存  
cache:forget         - 从缓存中移除项    
cache:table          - 为缓存数据库表创建迁移  

> config  
config:cache         - 创建缓存文件以加快配置加载   
config:clear         - 删除配置缓存文件    

> db  
db:seed              - 在数据库中添加记录    
db:wipe              - 删除所有表、视图和类型    

> event  
event:cache          - 发现并缓存应用程序的事件和侦听器   
event:clear          - 清除所有缓存的事件和侦听器    
event:generate       - 基于注册生成缺少的事件和侦听器  
event:list           - 列出应用程序的事件和侦听器  

> key  
key:generate         -设置应用程序密钥  

> make(创建文件)  
make:channel         - 创建新频道类  
make:command         - 创建新的Artisan命令  
make:controller      - 创建新的控制器类  
make:event           - 创建新的事件类  
make:exception       - 创建新的自定义异常类  
make:factory         - 创建新模型工厂  
make:job             - 创建新的作业类  
make:listener        - 创建新的事件侦听器类  
make:mail            - 创建新的电子邮件类  
make:middleware      - 创建新的中间件类  
make:migration       - 创建新的迁移文件  
make:model           - 创建新的雄辩模型类  
make:notification    - 创建新的通知类  
make:observer        - 创建新的观察者类  
make:policy          - 创建新策略类  
make:provider        - 创建新的服务提供程序类  
make:request         - 创建新的表单请求类  
make:resource        - 创建新资源  
make:rule            - 创建新的验证规则  
make:seeder          - 创建新的播种器类  
make:test            - 创建新的测试类  

> migrate（数据迁移）    
migrate:fresh        - 删除所有表并重新运行所有迁移  
migrate:install      - 创建迁移存储库  
migrate:refresh      - 重置并重新运行所有迁移  
migrate:reset        - 回滚所有数据库迁移  
migrate:rollback     - 回滚上次数据库迁移  
migrate:status       - 显示每次迁移的状态   

> notifications  
notifications:table  - 为通知表创建迁移  

> optimize  
optimize:clear       - 删除缓存的引导文件  

> package  
package:discover     - 重新生成缓存包清单   

> queue （队列）  
queue:failed         - 列出所有失败的队列作业  
queue:failed-table   - 为失败的队列作业数据库表创建迁移  
queue:flush          - 刷新所有失败的队列作业  
queue:forget         - 删除失败的队列作业  
queue:listen         - 收听给定队列  
queue:restart        - 在当前作业之后重新启动队列工作进程守护进程  
queue:retry          - 重试失败的队列作业  
queue:table          - 为队列作业数据库表创建迁移  
queue:work           - 作为守护进程开始处理队列上的作业  

> route  
route:cache          - 为更快的路由注册创建路由缓存文件  
route:clear          - 删除路由缓存文件  
route:list           - 列出所有已注册的路线  

> schedule  
schedule:run         - 运行调度命令  

> session  
session:table        - 为会话数据库表创建迁移  

> storage  
storage:link         - 创建从“public/storage”到“storage/app/public”的符号链接

> vendor  
vendor:publish       - 从供应商包发布任何可发布的资产 

> view  
view:cache           - 编译应用程序的所有刀片模板   
view:clear           - 清除所有已编译的视图文件  
