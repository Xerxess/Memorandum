# Laravel 6  
<!-- TOC -->

- [Laravel 6](#laravel-6)
    - [检索环境配置](#检索环境配置)
    - [请求周期](#请求周期)
        - [服务提供者](#服务提供者)
        - [请求调度](#请求调度)
    - [服务容器](#服务容器)
        - [简单绑定](#简单绑定)
        - [when](#when)
        - [extend](#extend)
    - [服务提供者](#服务提供者-1)
        - [编写服务提供者](#编写服务提供者)
        - [bindings 和 singletons](#bindings-和-singletons)
        - [boot](#boot)
        - [启动方法的依赖注入](#启动方法的依赖注入)
        - [注册服务提供者](#注册服务提供者)
        - [延迟提供者](#延迟提供者)
    - [Facades](#facades)
        - [Facade 类参考](#facade-类参考)
    - [契约](#契约)
        - [实现契约](#实现契约)
    - [辅助函数](#辅助函数)
    - [Collections（集合）](#collections集合)
        - [方法列表](#方法列表)
- [错误 异常处理](#错误-异常处理)
    - [配置](#配置)
    - [异常处理](#异常处理)
    - [HTTP 异常](#http-异常)
    - [自定义 HTTP 错误页面](#自定义-http-错误页面)
- [Eloquent](#eloquent)
    - [模型定义](#模型定义)
    - [Eloquent 模型约定](#eloquent-模型约定)
    - [保护属性](#保护属性)
    - [软删除](#软删除)
- [Eloquent: API 资源](#eloquent-api-资源)
    - [生成资源](#生成资源)
    - [例](#例)
    - [关联](#关联)
    - [资源集合](#资源集合)
    - [数据包裹](#数据包裹)
    - [数据包裹和分页](#数据包裹和分页)
    - [分页](#分页)
    - [条件属性](#条件属性)
    - [有条件的合并数据](#有条件的合并数据)
    - [条件关联](#条件关联)
    - [条件中间表信息](#条件中间表信息)
    - [添加元数据](#添加元数据)
    - [顶层元数据](#顶层元数据)
    - [响应资源](#响应资源)

<!-- /TOC -->
## 检索环境配置

* env('APP_DEBUG', false) .env 文件中列出的所有变量将被加载到 PHP 的超级全局变量 $_ENV 中。
* $environment = App::environment(); 当前所处环境是通过 .env 文件中的 APP_ENV 变量
* config('app.timezone'); 在应用程序的任何位置使用全局 config 函数来访问配置值。

## 请求周期

* 请求入口都是 public/index.php
* bootstrap/app.php 脚本中检索 Laravel 应用程序的实例
* 进入应用程序的请求类型来将传入的请求发送到 HTTP 内核或控制台内核。而这两个内核是用来作为所有请求都要通过的中心位置。 现在，我们先看看位于 app/Http/Kernel.php 中的 HTTP 内核。
* HTTP 中间件 ，这些中间件处理 HTTP 会话 读写、判断应用是否处于维护模式、 验证 CSRF 令牌 等等。
* HTTP 内核的 handle 方法签名相当简单：获取一个 Request ，返回一个 Response。

### 服务提供者


所有应用下的服务提供者均配置到了 config/app.php 配置文件中的 providers 数组中。 第一步，所有服务提供者的 register 方法会被调用，然后一旦所有服务提供者均注册后， boot 方法才被调用。  

* 服务提供者给予框架开启多种多样的组件，像数据库，队列，验证器，以及路由组件。

### 请求调度

* Request 会被递送给路由。路由将会调度请求，交给绑定的路由或控制器，也当然包括路由绑定的中间件。


## 服务容器

Laravel 服务容器是一个用于管理类的依赖和执行依赖注入的强大工具。依赖注入这个花哨名词实质上是指：类的依赖通过构造函数，或者某些情况下通过 「setter」 方法 「注入」到类中。

* 可简单理解是一个提供服务的仓库，把服务提供者注册到仓库中，在使用时就可以动态取服务，即按需加载。
* $app 属性来访问服务容器

### 简单绑定

* 通过 $this->app 属性访问容器
* $this->app->bind 方法注册绑定
* bind(a,b)第一个参数a:为要绑定的类/接口名，第二个b:参数是一个返回类实例的闭包函数

```php 
// 服务提供者
$this->app->bind('HelpSpot\API', function ($app) {
    return new \HelpSpot\API($app->make('HttpClient'));
});

// 绑定一个单例
$this->app->singleton('HelpSpot\API', function ($app) {
    return new \HelpSpot\API($app->make('HttpClient'));
});

// 绑定实例
$api = new \HelpSpot\API(new HttpClient);
$this->app->instance('HelpSpot\API', $api);

// 绑定接口到实现
// 当一个类需要实现 EventPusher 时，应该注入 RedisEventPusher
$this->app->bind(
    'App\Contracts\EventPusher',
    'App\Services\RedisEventPusher'
);
```

### when

```php
// 注入不同的实现
$this->app->when(PhotoController::class)
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('local');
          });

$this->app->when([VideoController::class, UploadController::class])
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('s3');
          });

// 绑定基本值
$this->app->when('App\Http\Controllers\UserController')
          ->needs('$variableName')
          ->give($value);
```

### extend

 可以添加额外的代码来修饰或者配置

 ```php
$this->app->extend(Service::class, function ($service, $app) {
    return new DecoratedService($service);
});
 ```

 ### make

 使用 make 方法从容器中解析出类实例

 ```php
$api = $this->app->make('HelpSpot\API');
 ```

 ### 自动注入

 构造函数中注入那些需要容器解析的依赖项

## 服务提供者

服务提供者是所有 Laravel 应用程序的引导中心。你的应用程序，以及 通过服务器引导的 Laravel 核心服务都是通过服务提供器引导。

* 注册方法 register
* 引导方法 boot 该方法在所有服务提供者被注册以后才会被调用， 这就是说我们可以在其中访问框架已注册的所有其它服务：
* 注册服务提供者 所有服务提供者都是通过配置文件 config/app.php 进行注册。
* 延迟提供者 provides

### 编写服务提供者

* 服务提供者都会继承 Illuminate\Support\ServiceProvider
* 包含一个 register 方法 将服务绑定到 服务容器
* 包含一个 boot 方法

```php
// Artisan 命令行 创建
php artisan make:provider RiakServiceProvider
```

```php
<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Riak\Connection;

class RiakServiceProvider extends ServiceProvider
{
    /**
     * 注册应用程序服务
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Connection::class, function ($app) {
            return new Connection(config('riak'));
        });
    }
}
```

### bindings 和 singletons

* bindings 应该注册的所有容器绑定
* singletons 所有应该注册的容器单例

### boot

该方法在所有服务提供者被注册以后才会被调用， 这就是说我们可以在其中访问框架已注册的所有其它服务

### 启动方法的依赖注入

### 注册服务提供者

* 通过配置文件 config/app.php 进行注册
* providers 数组

### 延迟提供者

* 需要实现 \Illuminate\Contracts\Support\DeferrableProvider
* 添加 provides 方法

```php
<?php

namespace App\Providers;

use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;
use Riak\Connection;

class RiakServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * 注册服务提供者。
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Connection::class, function ($app) {
            return new Connection($app['config']['riak']);
        });
    }

    /**
     * 获取由提供者提供的服务。
     *
     * @return array
     */
    public function provides()
    {
        return [Connection::class];
    }
}
```

## Facades

Facades 为应用的 服务容器 提供了一个「静态」 接口。Laravel 自带了很多 Facades，可以访问绝大部分功能。Laravel Facades 实际是服务容器中底层类的 「静态代理」 ，相对于传统静态方法，在使用时能够提供更加灵活、更加易于测试、更加优雅的语法。

简单的理解就是相当于类提供的类方法（静态方法）

* Facades 相较于依赖注入
* Facades 相较于辅助函数 - Facade 和辅助函数之间没有实际的区别,许多辅助函数都有与之对应的 Facades

### Facade 类参考

Facade|	Class|	服务容器绑定
----|---|---
App|	Illuminate\Foundation\Application	|app
Artisan|	Illuminate\Contracts\Console\Kernel	|artisan
Auth|	Illuminate\Auth\AuthManager	|auth
Auth (Instance)	|Illuminate\Contracts\Auth\Guard	|auth.driver
Blade	|Illuminate\View\Compilers\BladeCompiler	|blade.compiler
Broadcast	|Illuminate\Contracts\Broadcasting\Factory	 
Broadcast (Instance)|	Illuminate\Contracts\Broadcasting\Broadcaster	 
Bus	|Illuminate\Contracts\Bus\Dispatcher	 
Cache	I|lluminate\Cache\CacheManager	|cache
Cache (Instance)|	Illuminate\Cache\Repository	|cache.store
Config	|Illuminate\Config\Repository	|config
Cookie|	Illuminate\Cookie\CookieJar	|cookie
Crypt	|Illuminate\Encryption\Encrypter	|encrypter
DB|	Illuminate\Database\DatabaseManager	|db
DB (Instance)	|Illuminate\Database\Connection	|db.connection
Event	|Illuminate\Events\Dispatcher	|events
File	|Illuminate\Filesystem\Filesystem	|files
Gate	|Illuminate\Contracts\Auth\Access\Gate	 
Hash	|Illuminate\Contracts\Hashing\Hasher	|hash
Lang	|Illuminate\Translation\Translator	|translator
Log	|Illuminate\Log\LogManager	|log
Mail	|Illuminate\Mail\Mailer|	mailer
Notification|	Illuminate\Notifications\ChannelManager	 
Password|	Illuminate\Auth\Passwords\PasswordBrokerManager	|auth.password
Password (Instance)	|Illuminate\Auth\Passwords\PasswordBroker	|auth.password.broker
Queue	|Illuminate\Queue\QueueManager	|queue
Queue (Instance)	|Illuminate\Contracts\Queue\Queue	|queue.connection
Queue (Base Class)	|Illuminate\Queue\Queue	 
Redirect|	Illuminate\Routing\Redirector	|redirect
Redis	|Illuminate\Redis\RedisManager	|redis
Redis (Instance)|	Illuminate\Redis\Connections\Connection	|redis.connection
Request	|Illuminate\Http\Request	|request
Response	|Illuminate\Contracts\Routing\ResponseFactory	 
Response (Instance)	|Illuminate\Http\Response	 
Route	|Illuminate\Routing\Router|	router
Schema	|Illuminate\Database\Schema\Builder	 
Session	|Illuminate\Session\SessionManager	|session
Session (Instance)|	Illuminate\Session\Store	|session.store
Storage	|Illuminate\Filesystem\FilesystemManager	|filesystem
Storage (Instance)|	Illuminate\Contracts\Filesystem\Filesystem	|filesystem.disk
URL	|Illuminate\Routing\UrlGenerator	|url
Validator	|Illuminate\Validation\Factory	|validator
Validator (Instance)|	Illuminate\Validation\Validator	 
View	|Illuminate\View\Factory	|view
View (Instance)	|Illuminate\View\View	 

## 契约

Laravel 的契约是一组接口，它们由框架提供并定义了核心服务。

简单理解就是接口，方便编写不同实现的方式达到解耦的目的,比缓存可以采用本地文件或数据库，但可以通过契约达到相同的使用方式.

### 实现契约

* 通过 服务容器 来注册实现

```php
<?php

namespace App\Listeners;

use App\Events\OrderWasPlaced;
use App\Models\User;
use Illuminate\Contracts\Redis\Factory;

class CacheOrderInformation
{
    /**
     * Redis 工厂实现
     */
    protected $redis;

    /**
     * 创建一个事件处理实例
     *
     * @param  Factory  $redis
     * @return void
     */
    public function __construct(Factory $redis)
    {
        $this->redis = $redis;
    }

    /**
     * 处理事件
     *
     * @param  OrderWasPlaced  $event
     * @return void
     */
    public function handle(OrderWasPlaced $event)
    {
        //
    }
}
```

## 辅助函数

https://laravel.com/docs/6.x/helpers

* Arrays & Objects
* Paths
* Strings
* URLs
* app() 服务容器对象
* auth() 认证对象
* bcrypt()  函数 哈希 使用 Bcrypt 对给定的值进行散列。你可以使用它替代 Hash facade：
* encrypt() 加密
* env() 环境变量
* config() 函数获取 configuration 变量的值
* cookie()
* cache() 从 缓存 中获取值．如果缓存中给定的键不存在，将返回一个可选的默认值：
* view() 获取一个 view 实例
* validator() 根据指定的参数创建一个新的 验证器 实例。方便起见可以用它来代替 Validator
* today() today 函数根据当前日期创建新的 Illuminate\Support\Carbon 实例
* now() 函数为当前时间创建一个新的 Illuminate\Support\Carbon 实例：
* logger()
* info()
* old()   获取 刷入 session 的 旧的输入值
* session() 函数用于获取或设置 session 值
* response()
* request()

## Collections（集合）

https://laravel.com/docs/6.x/collections

Illuminate\Support\Collection 类提供了一个更具可读性和更便于处理数组数据的封装。

* Tip：通常，Eloquent 查询的结果返回的内容都是 Collection 实例。

### 方法列表

* all() 返回该集合表示的底层数组
* average() || avg() 方法返回给定键的 平均值
* chunk() 集合拆成多个给定大小的小集合
* collapse() 将多个数组的集合合并成一个数组的集合
* combine() 将一个集合的值作为键，再将另一个数组或集合的值作为值合并成一个集合
* concat()
* contains() 判断集合是否包含指定的集合项
* count() 返回这个集合内集合项的总数量
* countBy() 计算集合中每个值的出现次数
* dd() 用于打印集合元素并中断脚本执行
* diff() 将集合与其它集合或者 PHP 数组 进行值的比较。然后返回原集合中存在而指定集合中不存在的值
* diffAssoc() 与另外一个集合或基于它的键和值的 PHP 数组 进行比较。这个方法将会返回原集合不存在于指定集合的键 / 值对
* diffKeys() 和另外一个集合或 PHP 数组 的键进行比较，然后返回原集合中存在而指定集合中不存在键所对应的键 / 值对
* each()
* eachSpread() 用于循环集合项，将每个嵌套集合项的值传递给回调函数
* every()
* filter()
* first()
* firstWhere()
* map() 遍历集合并将每一个值传入给定的回调函数。该回调函数可以任意修改集合项并返回，从而生成被修改过集合项的新集合
* flatMap() 遍历集合并将其中的每个值传递到给定的回调函数。可以通过回调函数修改集合项并返回它们，从而形成一个被修改过的新集合。
* except() 返回集合中除了指定键之外的所有集合项
* flatten() 将多维集合转为一维集合
* flip() 将集合的键和对应的值进行互换
* forget() 将通过指定的键来移除集合中对应的内容
* forPage() 返回一个含有指定页码数集合项的新集合。这个方法接受页码数作为其第一个参数，每页显示的项数作为其第二个参数：
* get() 返回指定键的集合项，如果该键在集合中不存在，则返回 null
* groupBy() 根据指定键对集合项进行分组
* has() 判断集合中是否存在指定键
* implode() 用于合并集合项
* intersect()  从原集合中移除在指定数组 或集合中不存在的任何值。
* intersectByKeys() 从原集合中移除在指定 数组 或集合中不存在的任何键
* isEmpty()
* isNotEmpty()
* join()
* keyBy() 以指定的键作为集合的键
* keys()
* last() 返回集合中通过指定条件测试的最后一个元素
* mapSpread()
* mapToGroups()
* mapWithKeys()
* max()
* median() 返回指定键的 中间值
* merge() 将合并指定的数组或集合到原集合
* mergeRecursive()
* min()
* mode() 返回指定键的 众数
* nth() 由每隔 n 个元素组成的一个新集合
* only() 返回集合中所有指定键的集合项
* pad() 将使用给定的值填充数组，直到数组达到指定的大小
* pipe() 传入一个回调函数并返回结果
* pluck() 获取集合中指定键对应的所有值
* pop() 返回并移除最后一个集合项
* prepend() 将指定的值添加的集合的开头
* pull() 把指定键对应的值从集合中移除并返回
* push() 把指定的值追加到集合项的末尾
* put() 在集合内设置给定的键值对
* random() 从集合中返回一个随机项
* reduce() 将每次迭代的结果传递给下一次迭代直到集合减少为单个值
* reject() 使用指定的回调函数过滤集合
* replace() 行为类似 merge，但是，不仅可以覆盖匹配到的相同字符串键的集合项，而且也可以覆盖数字键的集合项
* reverse() 倒转集合项的顺序，并保留原始的键
* search() 在集合中搜索给定的值并返回它的键
* shift() 移除并返回集合的第一个集合项
* shuffle() 随机打乱集合项
* skip() 返回除了给定的集合项数目的新集合
* slice() 返回集合中给定索引开始后面的部分
* some() contains 方法的别名
* sort()
* sortBy()
* sortKeys()
* sortKeysDesc()
* split()
* sum()
* take() 返回给定数量项的新集合
* tap() 将给定的回调函数传入该集合，允许你在一个特定点「tap」集合，并在不影响集合本身的情况下对集合项执行某些操作
* times() 通过调用给定次数的回调函数来创建新集合
* toArray()
* toJson()
* transform() transform 会修改集合本身。
* union() 将给定的数组添加到集合。如果给定的数组含有与原集合一样的键，则原集合的值不会被改变
* unique() 返回集合中所有唯一项。
* values() 返回键被重置为连续编号的新集合
* when() 当传入的第一个参数为 true 时，将执行给定的回调函数：
* where() 通过给定的键 / 值对过滤集合
* whereIn() 会根据包含给定数组的键 / 值对来过滤集合
* zip() 将指定数组的值和相应索引的原集合的值合并在一起

# 错误 异常处理

* app\exceptions\handler 类用于记录应用程序触发的所有异常，然后将其呈现回用户。

## 配置

* config/app.php 配置文件中的 debug 选项决定了对于一个错误实际上将显示多少信息给用户。
* .env 文件中的 APP_DEBUG 生产环境中，该值应始终为 false

## 异常处理

* 所有异常都是由 App\Exceptions\Handler 处理。 这个类包含了两个方法：report 和 render
* report 方法将异常传递给记录异常的基类
* report 辅助函数 允许你使用异常处理器的 report 方法在不显示错误页面的情况下快速报告异常

## HTTP 异常

* 可以使用 abort 辅助函数从应用程序的任何地方生成这样的响应
```php
abort(404);
abort(403, 'Unauthorized action.');
```

## 自定义 HTTP 错误页面



# Eloquent

*  Eloquent ORM 提供了一个漂亮、简洁的 ActiveRecord 实现来和数据库交互 每个数据库表都有一个对应的「模型」用来与该表交互。你可以通过模型查询数据表中的数据，以及在数据表中插入新记录。


## 模型定义

```php
php artisan make:model Flight 创建模型
php artisan make:model Flight -m 生成模型的时候生成 数据库迁移
```

## Eloquent 模型约定

* 使用类的复数形式「蛇形命名」来作为表名 (Flight 模型 -> flights 数据表)
* 模型上定义 table 属性来指定自定义数据表 (protected $table = 'my_flights';)
* Eloquent 也会假设每个数据表都有一个名为 id 的主键列
* 默认情况下，created_at 和 updated_at 预期你的数据表中存在  。如果你不想让 Eloquent 自动管理这两个列， 请将模型中的 $timestamps 属性设置为 false
* 指定一个不同的连接，设置 $connection 属性
* 要为模型的某些属性定义默认值，可以在模型上定义 $attributes 属性

## 保护属性

## 软删除

* deleted_at 数据库需要

# Eloquent: API 资源

一个转换层来联结你的 Eloquent 模型和实际返回给用户的 JSON 响应。Laravel 的资源类能够让你以更直观简便的方式将模型和模型集合转化成 JSON。

## 生成资源

* 生成的资源都会被放置在应用程序的 app/Http/Resources

```php
php artisan make:resource User 一个资源类
php artisan make:resource Users --collection  生成一个资源集合
php artisan make:resource UserCollection 生成一个资源集合(同上)
```

## 例

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * 将资源转换成数组。
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```

类使用
```php
use App\User;
use App\Http\Resources\User as UserResource;

Route::get('/user', function () {
    return new UserResource(User::find(1));
});
```

集合使用
```php
use App\User;
use App\Http\Resources\User as UserResource;

Route::get('/user', function () {
    return UserResource::collection(User::all());
});
```

##  关联

```php
/**
 * 将资源转换成数组。
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'posts' => PostResource::collection($this->posts),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```

## 资源集合

* 资源是将单个模型转换成数组，而资源集合是将多个模型的集合转换成数组。所有的资源都提供了一个 collection 方法来生成一个 「临时」 资源集合，所以你没有必要为每一个模型类型都编写一个资源集合类

* 不过，如果你需要自定义返回集合的元数据，则仍需要定义一个资源集合

```php
use App\User;
use App\Http\Resources\User as UserResource;

Route::get('/user', function () {
    return UserResource::collection(User::all());
});
```

## 数据包裹

* 默认情况下，当资源响应被转换成 JSON 时，顶层资源将会被包裹在 data 键中
* withoutWrapping 方法来禁用顶层资源的包裹

```php
//AppServiceProvider

/**
     * 在注册后进行服务的启动
     *
     * @return void
     */
    public function boot()
    {
        Resource::withoutWrapping();
    }
```

## 数据包裹和分页

* 键中。中总会有 data 、 meta 和 links 键包含着分页状态信息

## 分页

## 条件属性

* when 方法可以被用来有条件地向资源响应添加属性

```php
/**
 * 将资源转换成数组
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'secret' => $this->when(Auth::user()->isAdmin(), 'secret-value'),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}

// 在上面这个例子中，只有当 isAdmin 方法返回 true 时， secret 键才会最终在资源响应中被返回。如果该方法返回 false ，则 secret 键将会在资源响应被发送给客户端之前被删除。 when 方法可以使你避免使用条件语句拼接数组，转而用更优雅的方式来编写你的资源。
```

## 有条件的合并数据

* mergeWhen 方法在给定的条件为 true 时将多个属性添加到响应中

```php
/**
 * 将资源转换成数组
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        $this->mergeWhen(Auth::user()->isAdmin(), [
            'first-secret' => 'value',
            'second-secret' => 'value',
        ]),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```

## 条件关联

* whenLoaded 方法来有条件的加载关联

```php
/**
 * 将资源转换成数组
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'posts' => PostResource::collection($this->whenLoaded('posts')),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```

## 条件中间表信息

* whenPivotLoaded 方法有条件地从多对多关联的中间表中添加数据

```php
   return [
        'id' => $this->id,
        'name' => $this->name,
        'expires_at' => $this->whenPivotLoaded('role_user', function () {
            return $this->pivot->expires_at;
        }),
    ];
```

## 添加元数据

```php
/**
 * 将资源转换成数组
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function toArray($request)
{
    return [
        'data' => $this->collection,
        'links' => [
            'self' => 'link-value',
        ],
    ];
}
```

## 顶层元数据

## 响应资源

```php
use App\User;
use App\Http\Resources\User as UserResource;

Route::get('/user', function () {
    return (new UserResource(User::find(1)))
                ->response()
                ->header('X-Value', 'True');
});
```

* 资源中定义一个 withResponse 方法

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * 资源转换成数组
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
        ];
    }

    /**
     * 自定义响应
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Response  $response
     * @return void
     */
    public function withResponse($request, $response)
    {
        $response->header('X-Value', 'True');
    }
}
```