<!-- TOC -->

- [Laravel](#laravel)
    - [检索环境配置](#检索环境配置)
    - [请求周期](#请求周期)
    - [服务提供者](#服务提供者)
    - [请求调度](#请求调度)
- [服务容器](#服务容器)
    - [简单绑定](#简单绑定)
    - [when](#when)
    - [extend](#extend)
    - [make](#make)
    - [自动注入](#自动注入)
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
- [路由](#路由)
- [中间件(Middleware)](#中间件middleware)
- [CSRF](#csrf)
- [控制器(Controller)](#控制器controller)
    - [基础](#基础)
- [HTTP 请求 (HTTP Requests)](#http-请求-http-requests)
- [响应 ( HTTP Responses )](#响应--http-responses-)
- [Views](#views)
- [URL Generation (URL生成)](#url-generation-url生成)
- [验证方式](#验证方式)
- [HTTP异常](#http异常)
- [Blade Templates(模板)](#blade-templates模板)
- [辅助函数](#辅助函数)
- [Collections（集合）](#collections集合)
    - [方法列表](#方法列表)
- [错误 异常处理](#错误-异常处理)
    - [配置](#配置)
    - [异常处理](#异常处理)
    - [HTTP 异常](#http-异常)
    - [自定义 HTTP 错误页面](#自定义-http-错误页面)
- [数据库](#数据库)
    - [原生 SQL 查询](#原生-sql-查询)
    - [查询构造器](#查询构造器)
    - [分页](#分页)
        - [手动创建分页](#手动创建分页)
- [数据库迁移](#数据库迁移)
    - [迁移表结构](#迁移表结构)
    - [Schema](#schema)
- [写测试数据](#写测试数据)
- [Redis](#redis)
- [Eloquent](#eloquent)
    - [模型定义](#模型定义)
    - [Eloquent 模型约定](#eloquent-模型约定)
    - [属性配制](#属性配制)
        - [事件](#事件)
    - [检索](#检索)
    - [关联查询](#关联查询)
    - [Eloquent: 修改器](#eloquent-修改器)
        - [访问器 & 修改器](#访问器--修改器)
        - [日期转换器](#日期转换器)
        - [属性类型转换](#属性类型转换)
    - [Eloquent: API Resources](#eloquent-api-resources)
        - [toArray()](#toarray)
    - [序列化](#序列化)
    - [保护属性](#保护属性)
    - [软删除](#软删除)
- [Eloquent: API 资源](#eloquent-api-资源)
    - [生成资源](#生成资源)
    - [例](#例)
    - [关联](#关联)
    - [资源集合](#资源集合)
    - [数据包裹](#数据包裹)
    - [数据包裹和分页](#数据包裹和分页)
    - [分页](#分页-1)
    - [条件属性](#条件属性)
    - [有条件的合并数据](#有条件的合并数据)
    - [条件关联](#条件关联)
    - [条件中间表信息](#条件中间表信息)
    - [添加元数据](#添加元数据)
    - [顶层元数据](#顶层元数据)
    - [响应资源](#响应资源)

<!-- /TOC -->

# Laravel

## 检索环境配置

- env('APP_DEBUG', false) .env 文件中列出的所有变量将被加载到 PHP 的超级全局变量 \$\_ENV 中。
- \$environment = App::environment(); 当前所处环境是通过 .env 文件中的 APP_ENV 变量
- config('app.timezone'); 在应用程序的任何位置使用全局 config 函数来访问配置值。

## 请求周期

- 请求入口都是 public/index.php
- bootstrap/app.php 脚本中检索 Laravel 应用程序的实例
- 进入应用程序的请求类型来将传入的请求发送到 HTTP 内核或控制台内核。而这两个内核是用来作为所有请求都要通过的中心位置。 现在，我们先看看位于 app/Http/Kernel.php 中的 HTTP 内核。
- HTTP 中间件 ，这些中间件处理 HTTP 会话 读写、判断应用是否处于维护模式、 验证 CSRF 令牌 等等。
- HTTP 内核的 handle 方法签名相当简单：获取一个 Request ，返回一个 Response。

## 服务提供者

所有应用下的服务提供者均配置到了 config/app.php 配置文件中的 providers 数组中。 第一步，所有服务提供者的 register 方法会被调用，然后一旦所有服务提供者均注册后， boot 方法才被调用。

- 服务提供者给予框架开启多种多样的组件，像数据库，队列，验证器，以及路由组件。

## 请求调度

- Request 会被递送给路由。路由将会调度请求，交给绑定的路由或控制器，也当然包括路由绑定的中间件。

# 服务容器

Laravel 服务容器是一个用于管理类的依赖和执行依赖注入的强大工具。依赖注入这个花哨名词实质上是指：类的依赖通过构造函数，或者某些情况下通过 「setter」 方法 「注入」到类中。

- 可简单理解是一个提供服务的仓库，把服务提供者注册到仓库中，在使用时就可以动态取服务，即按需加载。
- \$app 属性来访问服务容器

## 简单绑定

- 通过 \$this->app 属性访问容器
- \$this->app->bind 方法注册绑定
- bind(a,b)第一个参数 a:为要绑定的类/接口名，第二个 b:参数是一个返回类实例的闭包函数

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

## when

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

## extend

可以添加额外的代码来修饰或者配置

```php
$this->app->extend(Service::class, function ($service, $app) {
   return new DecoratedService($service);
});
```

## make

使用 make 方法从容器中解析出类实例

```php
$api = $this->app->make('HelpSpot\API');
```

## 自动注入

构造函数中注入那些需要容器解析的依赖项

# 服务提供者

服务提供者是所有 Laravel 应用程序的引导中心。你的应用程序，以及 通过服务器引导的 Laravel 核心服务都是通过服务提供器引导。

- 注册方法 register
- 引导方法 boot 该方法在所有服务提供者被注册以后才会被调用， 这就是说我们可以在其中访问框架已注册的所有其它服务：
- 注册服务提供者 所有服务提供者都是通过配置文件 config/app.php 进行注册。
- 延迟提供者 provides

### 编写服务提供者

- 服务提供者都会继承 Illuminate\Support\ServiceProvider
- 包含一个 register 方法 将服务绑定到 服务容器
- 包含一个 boot 方法

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

## bindings 和 singletons

- bindings 应该注册的所有容器绑定
- singletons 所有应该注册的容器单例

## boot

该方法在所有服务提供者被注册以后才会被调用， 这就是说我们可以在其中访问框架已注册的所有其它服务

## 启动方法的依赖注入

## 注册服务提供者

- 通过配置文件 config/app.php 进行注册
- providers 数组

## 延迟提供者

- 需要实现 \Illuminate\Contracts\Support\DeferrableProvider
- 添加 provides 方法

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

# Facades

Facades 为应用的 服务容器 提供了一个「静态」 接口。Laravel 自带了很多 Facades，可以访问绝大部分功能。Laravel Facades 实际是服务容器中底层类的 「静态代理」 ，相对于传统静态方法，在使用时能够提供更加灵活、更加易于测试、更加优雅的语法。

简单的理解就是相当于类提供的类方法（静态方法）

- Facades 相较于依赖注入
- Facades 相较于辅助函数 - Facade 和辅助函数之间没有实际的区别,许多辅助函数都有与之对应的 Facades

## Facade 类参考

| Facade               | Class                                           | 服务容器绑定         |
| -------------------- | ----------------------------------------------- | -------------------- |
| App                  | Illuminate\Foundation\Application               | app                  |
| Artisan              | Illuminate\Contracts\Console\Kernel             | artisan              |
| Auth                 | Illuminate\Auth\AuthManager                     | auth                 |
| Auth (Instance)      | Illuminate\Contracts\Auth\Guard                 | auth.driver          |
| Blade                | Illuminate\View\Compilers\BladeCompiler         | blade.compiler       |
| Broadcast            | Illuminate\Contracts\Broadcasting\Factory       |
| Broadcast (Instance) | Illuminate\Contracts\Broadcasting\Broadcaster   |
| Bus                  | Illuminate\Contracts\Bus\Dispatcher             |
| Cache I              | lluminate\Cache\CacheManager                    | cache                |
| Cache (Instance)     | Illuminate\Cache\Repository                     | cache.store          |
| Config               | Illuminate\Config\Repository                    | config               |
| Cookie               | Illuminate\Cookie\CookieJar                     | cookie               |
| Crypt                | Illuminate\Encryption\Encrypter                 | encrypter            |
| DB                   | Illuminate\Database\DatabaseManager             | db                   |
| DB (Instance)        | Illuminate\Database\Connection                  | db.connection        |
| Event                | Illuminate\Events\Dispatcher                    | events               |
| File                 | Illuminate\Filesystem\Filesystem                | files                |
| Gate                 | Illuminate\Contracts\Auth\Access\Gate           |
| Hash                 | Illuminate\Contracts\Hashing\Hasher             | hash                 |
| Lang                 | Illuminate\Translation\Translator               | translator           |
| Log                  | Illuminate\Log\LogManager                       | log                  |
| Mail                 | Illuminate\Mail\Mailer                          | mailer               |
| Notification         | Illuminate\Notifications\ChannelManager         |
| Password             | Illuminate\Auth\Passwords\PasswordBrokerManager | auth.password        |
| Password (Instance)  | Illuminate\Auth\Passwords\PasswordBroker        | auth.password.broker |
| Queue                | Illuminate\Queue\QueueManager                   | queue                |
| Queue (Instance)     | Illuminate\Contracts\Queue\Queue                | queue.connection     |
| Queue (Base Class)   | Illuminate\Queue\Queue                          |
| Redirect             | Illuminate\Routing\Redirector                   | redirect             |
| Redis                | Illuminate\Redis\RedisManager                   | redis                |
| Redis (Instance)     | Illuminate\Redis\Connections\Connection         | redis.connection     |
| Request              | Illuminate\Http\Request                         | request              |
| Response             | Illuminate\Contracts\Routing\ResponseFactory    |
| Response (Instance)  | Illuminate\Http\Response                        |
| Route                | Illuminate\Routing\Router                       | router               |
| Schema               | Illuminate\Database\Schema\Builder              |
| Session              | Illuminate\Session\SessionManager               | session              |
| Session (Instance)   | Illuminate\Session\Store                        | session.store        |
| Storage              | Illuminate\Filesystem\FilesystemManager         | filesystem           |
| Storage (Instance)   | Illuminate\Contracts\Filesystem\Filesystem      | filesystem.disk      |
| URL                  | Illuminate\Routing\UrlGenerator                 | url                  |
| Validator            | Illuminate\Validation\Factory                   | validator            |
| Validator (Instance) | Illuminate\Validation\Validator                 |
| View                 | Illuminate\View\Factory                         | view                 |
| View (Instance)      | Illuminate\View\View                            |

# 契约

Laravel 的契约是一组接口，它们由框架提供并定义了核心服务。

简单理解就是接口，方便编写不同实现的方式达到解耦的目的,比缓存可以采用本地文件或数据库，但可以通过契约达到相同的使用方式.

## 实现契约

- 通过 服务容器 来注册实现

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

# 路由

```php
// 基本使用
Route::get('/', function () {
    return 'Hello, World!';
});



// 所有请求
Route::any('/', function () {});



// get/post
Route::match(['get', 'post'], '/', function () {});



// 指向控制器
Route::get('/', 'WelcomeController@index');



// 带路由参数
Route::get('user/{id}', function ($id) {
    return "用户ID: " . $id;
});



// 路由命名 ->name
Route::get('user/{id?}', function ($id = 1) {
    return "用户ID: " . $id;
})->name('user.profile');



// 重定向
Route::redirect('/here', '/there');
Route::redirect('/here', '/there', 301);
Route::permanentRedirect('/here', '/there');



// 正则表达式约束
Route::get('user/{name}', function ($name) {})->where('name', '[A-Za-z]+');



// 命名路由
Route::get('user/profile', function () {
    //
})->name('profile');
Route::get('user/{id}/profile', function ($id) {
    //
})->name('profile');
$url = route('profile', ['id' => 1]);



// group
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // Uses first & second middleware...
    });
});

// 命名空间(8.*后文档已经去除)
Route::namespace('Admin')->group(function() {
     // App\Http\Controllers\Admin\AdminController
     Route::get('/admin', 'AdminController@index');
});



// 子域路由

// 路由前缀
Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});



// 跨域资源共享（CORS）
// cors配置文件中配置
Route::middleware(['HandleCors'])->group(function () {
    Route::get('/', function () {
        // Uses first & second middleware...
    });
});
```

# 中间件(Middleware)

```php
# 生成
php artisan make:middleware CheckAge
```

```php
// 中间件之前
public function handle($request, Closure $next)
{
    // Perform action
    return $next($request);
}


// 中间件之后
public function handle($request, Closure $next)
{
    $response = $next($request);
    // Perform action
    return $response;
}

// 全局中间件配置
app/Http/Kernel.php -> $middleware属性

// 将中间件分配给路由
app/Http/Kernel.php -> $routeMiddleware属性

// 中间件组
app/Http/Kernel.php -> $middlewareGroups

// 中间件参数
Route::put('post/{id}', function ($id) {})->middleware('role:editor');
public function handle($request, Closure $next, $role)
{
    if (! $request->user()->hasRole($role)) {
        // Redirect...
    }
    return $next($request);
}
```

# CSRF

```php
// CSRF保护中排除URI
class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'stripe/*',
        'http://example.com/foo/bar',
        'http://example.com/foo/*',
    ];
}
```

# 控制器(Controller)

## 基础

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```

```php
// 单动控制器 __invoke
Route::get('user/{id}', ShowProfile::class);
public function __invoke($id)
{
    return view('user.profile', ['user' => User::findOrFail($id)]);
}




// 控制器中间件
class UserController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('log')->only('index');
        $this->middleware('subscribed')->except('store');
    }
}



// 依赖注入和控制器
// 构造函数注入
use App\Repositories\UserRepository;
public function __construct(UserRepository $users)
{
    this->name = $users;
}

// 方法注入
//
use Illuminate\Http\Request;
public function store(Request $request)
{
    $name = $request->name;
}


// 缓存
```

# HTTP 请求 (HTTP Requests)

https://laravel.com/api/8.x/Illuminate/Http/Request.html

```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');
    }
}
```

```php
// 请求路径
$uri = $request->path();

// 请求URL
$url = $request->url();
$url = $request->fullUrl();

// 请求方法
$request->isMethod('post')

// 所有输入数据
$input = $request->all();

// 输入值
$name = $request->input('name');

// 查询字符串中检索输入
$name = $request->query('name');
$name = $request->query('name', 'Helen');

// JSON输入值
$name = $request->input('user.name');

// 是否存在输入值
$request->has('name')

// 是否存在一个值并且该值不为空
$request->filled('name')

// 获取Cookie
$value = $request->cookie('name');
// 附加Cookie
return response('Hello World')->cookie(
    'name', 'value', $minutes
);

// 上传的文件
$file = $request->file('photo');
// 是否存在文件
$request->hasFile('photo')

// 文件路径和扩展名
$path = $request->photo->path();
$extension = $request->photo->extension();
```

# 响应 ( HTTP Responses )

```php
// 响应对象
Route::get('home', function () {
    return response('Hello World', 200)->header('Content-Type', 'text/plain');
});

// 头
return response($content)
            ->header('Content-Type', $type)
            ->header('X-Header-One', 'Header Value')
            ->header('X-Header-Two', 'Header Value');
// 或
return response($content)
            ->withHeaders([
                'Content-Type' => $type,
                'X-Header-One' => 'Header Value',
                'X-Header-Two' => 'Header Value',
            ]);


// 重定向响应
Route::get('dashboard', function () {
    return redirect('home/dashboard');
});

// 重定向到命名路由
return redirect()->route('login');
return redirect()->route('profile', [$user]);


// 重定向到控制器
return redirect()->action([HomeController::class, 'index']);

// 重定向到外部域
return redirect()->away('https://www.google.com');

// JSON回应
return response()->json([
    'name' => 'Abigail',
    'state' => 'CA',
]);

// JSONP响应
return response()
            ->json(['name' => 'Abigail', 'state' => 'CA'])
            ->withCallback($request->input('callback'));


// 下载
return response()->download($pathToFile);
return response()->download($pathToFile, $name, $headers);
return response()->download($pathToFile)->deleteFileAfterSend();
// 流
return response()->streamDownload(function () {
    echo GitHub::api('repo')
                ->contents()
                ->readme('laravel', 'laravel')['contents'];
}, 'laravel-readme.md');


// 浏览器中显示文件 如：PDF，Img
return response()->file($pathToFile);
return response()->file($pathToFile, $headers);

```

# Views

```php
Route::get('/', function () {
    return view('greeting', ['name' => 'James']);
});
```

# URL Generation (URL生成)

https://laravel.com/docs/8.x/urls

# 验证方式

https://laravel.com/docs/8.x/validation

# HTTP异常

# Blade Templates(模板)

```php
// 指定需要子视图继承实现的内容区块
@yield('content') 
@yield('title', '首页')

@include('sign-up-button', []) 

@extends('layouts.app')

@section('title', 'Page Title')

@section('sidebar')
    @parent
    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
    <p>This is my body content.</p>
@endsection

// 注释
{{-- This comment will not be present in the rendered HTML --}}

// 数据绑定
{{ }}


// 渲染原生 HTML 代码
{!! !!}


// 表达式应保持不变,防止js模板被识别为
@{{ name }}

// 显示JavaScript变量,表达式应保持不变
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim

// 渲染JSON
@json($array);
@json($array, JSON_PRETTY_PRINT);


// if
@if (count($students) === 1) 
    操场上只有一个同学
@elseif (count($students) === 0)
    操场上一个同学也没有
@else
    操场上有 {{ count($students) }} 个同学
@endif

// switch
@switch($i)
    @case(1)
        @break
    @case(2)
        @break
    @default
@endswitch

// for
@for(;;)
@endfor

@foreach($item as $items)
// $loop 
// $loop->index(当前循环迭代的索引)
{{$loop->index}}
@endforeach

@while
@endwhile


// 判空 
@isset()
@endisset
@empty()
@endempty


//
@auth
@endauth
@guest
@endguest

// 环境变量
@production
    // The application is running in "staging"...
@endproduction

@env('staging')
    // The application is running in "staging"...
@endenv

// php
@php

@endphp
```

# 辅助函数

https://laravel.com/docs/6.x/helpers

- Arrays & Objects
- Paths
- Strings
- URLs
- app() 服务容器对象
- auth() 认证对象
- bcrypt() 函数 哈希 使用 Bcrypt 对给定的值进行散列。你可以使用它替代 Hash facade：
- encrypt() 加密
- env() 环境变量
- config() 函数获取 configuration 变量的值
- cookie()
- cache() 从 缓存 中获取值．如果缓存中给定的键不存在，将返回一个可选的默认值：
- view() 获取一个 view 实例
- validator() 根据指定的参数创建一个新的 验证器 实例。方便起见可以用它来代替 Validator
- today() today 函数根据当前日期创建新的 Illuminate\Support\Carbon 实例
- now() 函数为当前时间创建一个新的 Illuminate\Support\Carbon 实例：
- logger()
- info()
- old() 获取 刷入 session 的 旧的输入值
- session() 函数用于获取或设置 session 值
- response()
- request()

# Collections（集合）

https://laravel.com/docs/6.x/collections

Illuminate\Support\Collection 类提供了一个更具可读性和更便于处理数组数据的封装。

- Tip：通常，Eloquent 查询的结果返回的内容都是 Collection 实例。

## 方法列表

- all() 返回该集合表示的底层数组
- average() || avg() 方法返回给定键的 平均值
- chunk() 集合拆成多个给定大小的小集合
- collapse() 将多个数组的集合合并成一个数组的集合
- combine() 将一个集合的值作为键，再将另一个数组或集合的值作为值合并成一个集合
- concat()
- contains() 判断集合是否包含指定的集合项
- count() 返回这个集合内集合项的总数量
- countBy() 计算集合中每个值的出现次数
- dd() 用于打印集合元素并中断脚本执行
- diff() 将集合与其它集合或者 PHP 数组 进行值的比较。然后返回原集合中存在而指定集合中不存在的值
- diffAssoc() 与另外一个集合或基于它的键和值的 PHP 数组 进行比较。这个方法将会返回原集合不存在于指定集合的键 / 值对
- diffKeys() 和另外一个集合或 PHP 数组 的键进行比较，然后返回原集合中存在而指定集合中不存在键所对应的键 / 值对
- each()
- eachSpread() 用于循环集合项，将每个嵌套集合项的值传递给回调函数
- every()
- filter()
- first()
- firstWhere()
- map() 遍历集合并将每一个值传入给定的回调函数。该回调函数可以任意修改集合项并返回，从而生成被修改过集合项的新集合
- flatMap() 遍历集合并将其中的每个值传递到给定的回调函数。可以通过回调函数修改集合项并返回它们，从而形成一个被修改过的新集合。
- except() 返回集合中除了指定键之外的所有集合项
- flatten() 将多维集合转为一维集合
- flip() 将集合的键和对应的值进行互换
- forget() 将通过指定的键来移除集合中对应的内容
- forPage() 返回一个含有指定页码数集合项的新集合。这个方法接受页码数作为其第一个参数，每页显示的项数作为其第二个参数：
- get() 返回指定键的集合项，如果该键在集合中不存在，则返回 null
- groupBy() 根据指定键对集合项进行分组
- has() 判断集合中是否存在指定键
- implode() 用于合并集合项
- intersect() 从原集合中移除在指定数组 或集合中不存在的任何值。
- intersectByKeys() 从原集合中移除在指定 数组 或集合中不存在的任何键
- isEmpty()
- isNotEmpty()
- join()
- keyBy() 以指定的键作为集合的键
- keys()
- last() 返回集合中通过指定条件测试的最后一个元素
- mapSpread()
- mapToGroups()
- mapWithKeys()
- max()
- median() 返回指定键的 中间值
- merge() 将合并指定的数组或集合到原集合
- mergeRecursive()
- min()
- mode() 返回指定键的 众数
- nth() 由每隔 n 个元素组成的一个新集合
- only() 返回集合中所有指定键的集合项
- pad() 将使用给定的值填充数组，直到数组达到指定的大小
- pipe() 传入一个回调函数并返回结果
- pluck() 获取集合中指定键对应的所有值
- pop() 返回并移除最后一个集合项
- prepend() 将指定的值添加的集合的开头
- pull() 把指定键对应的值从集合中移除并返回
- push() 把指定的值追加到集合项的末尾
- put() 在集合内设置给定的键值对
- random() 从集合中返回一个随机项
- reduce() 将每次迭代的结果传递给下一次迭代直到集合减少为单个值
- reject() 使用指定的回调函数过滤集合
- replace() 行为类似 merge，但是，不仅可以覆盖匹配到的相同字符串键的集合项，而且也可以覆盖数字键的集合项
- reverse() 倒转集合项的顺序，并保留原始的键
- search() 在集合中搜索给定的值并返回它的键
- shift() 移除并返回集合的第一个集合项
- shuffle() 随机打乱集合项
- skip() 返回除了给定的集合项数目的新集合
- slice() 返回集合中给定索引开始后面的部分
- some() contains 方法的别名
- sort()
- sortBy()
- sortKeys()
- sortKeysDesc()
- split()
- sum()
- take() 返回给定数量项的新集合
- tap() 将给定的回调函数传入该集合，允许你在一个特定点「tap」集合，并在不影响集合本身的情况下对集合项执行某些操作
- times() 通过调用给定次数的回调函数来创建新集合
- toArray()
- toJson()
- transform() transform 会修改集合本身。
- union() 将给定的数组添加到集合。如果给定的数组含有与原集合一样的键，则原集合的值不会被改变
- unique() 返回集合中所有唯一项。
- values() 返回键被重置为连续编号的新集合
- when() 当传入的第一个参数为 true 时，将执行给定的回调函数：
- where() 通过给定的键 / 值对过滤集合
- whereIn() 会根据包含给定数组的键 / 值对来过滤集合
- zip() 将指定数组的值和相应索引的原集合的值合并在一起

# 错误 异常处理

- app\exceptions\handler 类用于记录应用程序触发的所有异常，然后将其呈现回用户。

## 配置

- config/app.php 配置文件中的 debug 选项决定了对于一个错误实际上将显示多少信息给用户。
- .env 文件中的 APP_DEBUG 生产环境中，该值应始终为 false

## 异常处理

- 所有异常都是由 App\Exceptions\Handler 处理。 这个类包含了两个方法：report 和 render
- report 方法将异常传递给记录异常的基类
- report 辅助函数 允许你使用异常处理器的 report 方法在不显示错误页面的情况下快速报告异常

## HTTP 异常

- 可以使用 abort 辅助函数从应用程序的任何地方生成这样的响应

```php
abort(404);
abort(403, 'Unauthorized action.');
```

## 自定义 HTTP 错误页面


# 数据库

## 原生 SQL 查询

```php
// 执行简单语句
DB::statement('drop table users');

// select
$users = DB::select('select * from users where active = ?', [1]);
$results = DB::select('select * from users where id = :id', ['id' => 1]);

// insert
DB::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);

// update
$affected = DB::update('update users set votes = 100 where name = ?', ['John']);

// delete
$deleted = DB::delete('delete from users');

// 数据库事务
DB::transaction(function () {
    DB::table('users')->update(['votes' => 1]);
    DB::table('posts')->delete();
});

// 手动事务
DB::beginTransaction();
DB::rollBack();
DB::commit();
```

##  查询构造器

```php
// 获取所有行
$users = DB::table('users')->get();

// 获取第一条数据
$user = DB::table('users')->where('name', 'John')->first();

// 获取单个值
$email = DB::table('users')->where('name', 'John')->value('email');

// id
$user = DB::table('users')->find(3);

// 分片
DB::table('users')->orderBy('id')->chunk(100, function ($users) {
    foreach ($users as $user) {
        //
    }
    // return false; // 返回 false 来终止继续获取分块
});

// count， max， min， avg，还有 sum
$users = DB::table('users')->count();
$price = DB::table('orders')->max('price');
$price = DB::table('orders')->where('finalized', 1)->avg('price');

// Select 语句
$users = DB::table('users')->select('name', 'email as user_email')->get();

// 不重复
$users = DB::table('users')->distinct()->get();

// 原生表达式 DB::raw
$users = DB::table('users')
                     ->select(DB::raw('count(*) as user_count, status'))
                     ->where('status', '<>', 1)
                     ->groupBy('status')
                     ->get();
// 或 selectRaw
$orders = DB::table('orders')
                ->selectRaw('price * ? as price_with_tax', [1.0825])
                ->get();

// 排序
$orders = DB::table('orders')
                ->orderByRaw('updated_at - created_at DESC')
                ->get();

// join
$users = DB::table('users')
            ->join('contacts', 'users.id', '=', 'contacts.user_id')
            ->join('orders', 'users.id', '=', 'orders.user_id')
            ->select('users.*', 'contacts.phone', 'orders.price')
            ->get();
$users = DB::table('users')
            ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
            ->get();

// where
$users = DB::table('users')->where('votes', '=', 100)->get();

// orWhere
$users = DB::table('users')
                    ->where('votes', '>', 100)
                    ->orWhere('name', 'John')
                    ->get();

// whereIn / whereNotIn / orWhereIn / orWhereNotIn
$users = DB::table('users')
                    ->whereIn('id', [1, 2, 3])
                    ->get();

// whereDate / whereMonth / whereDay / whereYear / whereTime
$users = DB::table('users')
                ->whereDate('created_at', '2016-12-31')
                ->get();

// between
$users = DB::table('users')
           ->whereBetween('votes', [1, 100])
           ->get();

// orderBy
$users = DB::table('users')
                ->orderBy('name', 'desc')
                ->get();

// groupBy
$users = DB::table('users')
                ->groupBy('account_id')
                ->having('account_id', '>', 100)
                ->get();

// skip:跳过 take:取
$users = DB::table('users')->skip(10)->take(5)->get();
// 或 offset/limit
$users = DB::table('users')->offset(10)->limit(5)->get();

//when

// insert
DB::table('users')->insert(
    ['email' => 'john@example.com', 'votes' => 0]
);
// 
DB::table('users')->insertOrIgnore([
    ['id' => 1, 'email' => 'taylor@example.com'],
    ['id' => 2, 'email' => 'dayle@example.com'],
]);
//  不回后获取-自动递增的ID
$id = DB::table('users')->insertGetId(
    ['email' => 'john@example.com', 'votes' => 0]
);

//  update
$affected = DB::table('users')
              ->where('id', 1)
              ->update(['votes' => 1]);

// delete
DB::table('users')->delete();
DB::table('users')->where('votes', '>', 100)->delete();
// ID重置为零
DB::table('users')->truncate();
```

## 分页

```php
// 分页
$users = DB::table('users')->paginate(15);


// 「下一页」和「上一页」
$users = DB::table('users')->simplePaginate(15);


// Eloquent 分页
$users = App\Models\User::paginate(15);

//将结果转换为 JSON
App\Models\User::paginate()->toJson();
```

### 手动创建分页

# 数据库迁移

```php
// 命令
php artisan make:migration create_users_table
// 是否迁移将创建一个新的表名
php artisan make:migration create_users_table --create=users
// 表预填充生成的迁移存根文件
php artisan make:migration add_votes_to_users_table --table=users

// 生成sql文件
php artisan schema:dump

// 执行迁移
php artisan migrate
php artisan migrate --force

// 回滚
php artisan migrate:rollback
```

## 迁移表结构

* up 方法用于向数据库中添加新表
* down 方法应逆转该up方法执行的操作

```php

```

## Schema

```php
// 创建表
Schema::create('users', function (Blueprint $table) {
    $table->id();
});

// 创建列
Schema::table('users', function (Blueprint $table) {
    $table->id(); // id
    $table->bigIncrements('id'); // 自增id
    $table->bigInteger('votes'); // BIGINT
    $table->softDeletes('deleted_at', 0); // 添加一个可为空的deleted_at
    $table->timestamps(0); // 以精度（总位数）添加可为空created_at和updated_atTIMESTAMP等效的列。
    $table->binary('data'); // BLOB
    $table->boolean('confirmed'); // BOOL
    $table->char('name', 100);
    $table->year('birth_year');
    $table->date('created_at'); // DATE
    $table->dateTime('created_at', 0);
    $table->dateTimeTz('created_at', 0);
    $table->decimal('amount', 8, 2);
    $table->double('amount', 8, 2);
    $table->decimal('amount', 8, 2);
    $table->longText('description');
    $table->text('description');
    $table->timestamp('added_on', 0);
    $table->string('name', 100); // VARCHAR
});

// 列的列修饰符
$table->string('email')->nullable();
->nullable($value = true) // 允许（默认情况下）将NULL值插入到列中
->autoIncrement() // 
->default($value) // 默认值

// 索引
$table->string('email')->unique();

// 外键
$table->unsignedBigInteger('user_id');
$table->foreign('user_id')->references('id')->on('users');

// 重命名
Schema::rename($from, $to);

// 删表
Schema::drop('users');
Schema::dropIfExists('users');



// 检测
if (Schema::hasTable('users')) {
}
if (Schema::hasColumn('users', 'email')) {
}

// 其他数据库操作
Schema::connection('foo')->create('users', function (Blueprint $table) {
    $table->id();
});

$table->engine = 'InnoDB';
$table->charset = 'utf8mb4';
$table->collation = 'utf8mb4_unicode_ci';
$table->temporary();
```

# 写测试数据

https://laravel.com/docs/8.x/seeding

# Redis

https://laravel.com/docs/8.x/redis

```cmd
# 按装
composer require predis/predis

# config/database.php
```

```php
$user = Redis::get('user:profile:'.$id);
Redis::set('name', 'Taylor');
```

# Eloquent

- Eloquent ORM 提供了一个漂亮、简洁的 ActiveRecord 实现来和数据库交互 每个数据库表都有一个对应的「模型」用来与该表交互。你可以通过模型查询数据表中的数据，以及在数据表中插入新记录。

## 模型定义

```php
php artisan make:model Flight 创建模型
php artisan make:model Flight -m 生成模型的时候生成 数据库迁移
```

## Eloquent 模型约定

- 使用类的复数形式「蛇形命名」来作为表名 (Flight 模型 -> flights 数据表)
- 模型上定义 table 属性来指定自定义数据表 (protected \$table = 'my_flights';)
- Eloquent 也会假设每个数据表都有一个名为 id 的主键列
- 默认情况下，created_at 和 updated_at 预期你的数据表中存在 。如果你不想让 Eloquent 自动管理这两个列， 请将模型中的 \$timestamps 属性设置为 false
- 指定一个不同的连接，设置 \$connection 属性
- 要为模型的某些属性定义默认值，可以在模型上定义 \$attributes 属性

## 属性配制

```php
// 指定表名
protected $table = 'my_flights';

// id
protected $primaryKey = 'flight_id';

// 是否自动管理created_at和updated_at
public $timestamps = true;

//  确定日期属性在数据库中的存储方式，以及将模型序列化为数组或JSON时的格式
protected $dateFormat = 'U';

const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at';

// 连接的数据库
protected $connection = 'connection-name';

// 模型的某些属性定义默认值
protected $attributes = [
        'delayed' => false,
    ];
```

### 事件

retrieved，creating，created，updating，updated，saving，saved，deleting，deleted，restoring，restored



## 检索

```php
$flights = App\Models\Flight::all();
$flights = App\Models\Flight::where('active', 1)
               ->orderBy('name', 'desc')
               ->take(10)
               ->get();
// 刷新模型
$freshFlight = $flight->fresh();

// find one
$flight = App\Models\Flight::find(1);
$flight = App\Models\Flight::where('active', 1)->first();
$flight = App\Models\Flight::firstWhere('active', 1);

// find
$flights = App\Models\Flight::find([1, 2, 3]);

// findOrFail 反向查询
$model = App\Models\Flight::findOrFail(1);

// create
$user = User::create([
    'first_name' => 'Taylor',
    'last_name' => 'Otwell',
    'title' => 'Developer',
]);

// save
$flight = new Flight;
$flight->save();

// 更新
$flight = App\Models\Flight::find(1);
$flight->save();

// 批量更新
App\Models\Flight::where('active', 1)
          ->where('destination', 'San Diego')
          ->update(['delayed' => 1]);

// 删除
$flight = App\Models\Flight::find(1);
$flight->delete();

App\Models\Flight::destroy(1);
App\Models\Flight::destroy(1, 2, 3);
$deletedRows = App\Models\Flight::where('active', 0)->delete();

// 启用假删除
// Illuminate\Database\Eloquent\SoftDeletes
// class Flight extends Model
// {
//     use SoftDeletes;
// }

// 强制查询软删除的模型
$flights = App\Models\Flight::withTrashed()
                ->where('account_id', 1)
                ->get();
// 仅检索软删除的模型
$flights = App\Models\Flight::onlyTrashed()
                ->where('airline_id', 1)
                ->get();
// 恢复
$flight->restore();

// 永久移除
$flight->forceDelete();
$flight->history()->forceDelete();

// 复制
$billing = $shipping->replicate()->fill([
    'type' => 'billing'
]);
$billing->save();

// 比较模型
if ($post->is($anotherPost)) {
    //
}
```

## 关联查询

* 在模型中创建关联的方法进行关联

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the phone record associated with the user.
     */
    public function phone()
    {
        return $this->hasOne('App\Models\Phone');
    }
}
```

```php
// 一对一 
// User关联Phone
// User模型上放置phone(){}
public function phone()
{

    // 自动以user_id为外键
    return $this->hasOne('App\Models\Phone');

    // 指定外键foreign_key
    // return $this->hasOne('App\Models\Phone', 'foreign_key');

    // 指定父级id local_key
    return $this->hasOne('App\Models\Phone', 'foreign_key', 'local_key');
}


// 一对多
// Post关联Comment
public function comments()
{
    // post_id外键
    return $this->hasMany('App\Models\Comment');
}
$comments = App\Models\Post::find(1)->comments;
$comment = App\Models\Post::find(1)->comments()->where('title', 'foo')->first();

// 多对多
// 需要三个数据库表(中间表)
// users，roles，和role_user
class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany('App\Models\Role');
    }
}
```

## Eloquent: 修改器

### 访问器 & 修改器

```php
// getFooAttribute 方法格式： Foo 字段需使用「驼峰式」命名
public function getFirstNameAttribute($value)
{
    return ucfirst($value);
}
// // setFooAttribute 方法格式： Foo 字段需使用「驼峰式」命名
public function setFirstNameAttribute($value)
{
    $this->attributes['first_name'] = strtolower($value);
}
$user = App\Models\User::find(1);
$firstName = $user->first_name;
$user->first_name = 'Sally';
```

### 日期转换器

```php
protected $dates = [
        'seen_at',
    ];

// 日期格式 'Y-m-d H:i:s'
protected $dateFormat = 'U';
```

### 属性类型转换

```php
protected $casts = [
        'is_admin' => 'boolean',
    ];
```

## Eloquent: API Resources

```cmd
# 生成一个数据Item的Resources
php artisan make:resource User

# 生成一个集合的Resources
php artisan make:resource Users --collection
```

### toArray()

```php
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
```

```php
use App\Http\Resources\User as UserResource;
use App\Models\User;

// 单个模型
Route::get('/user', function () {
    return new UserResource(User::find(1));
});

// 模型集合
Route::get('/user', function () {
    return UserResource::collection(User::all());
});


// 分页
Route::get('/users', function () {
    return new UserCollection(User::paginate());
});
```

```php
// 自定义键代替
public static $wrap = 'user';

// 禁用最外面的资源的包装

// 条件属性 when
return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'secret' => $this->when(Auth::user()->isAdmin(), 'secret-value'),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];

// 合并条件属性 mergeWhen
```
## 序列化

```php
// 转换为数组
$user = App\Models\User::with('roles')->first();
return $user->toArray();

// JSON
$user = App\Models\User::find(1);
return $user->toJson();
return $user->toJson(JSON_PRETTY_PRINT);

// JSON隐藏属性
// 模型中配制
 protected $hidden = ['password'];
 // 属性白名单将模型转换为数组或JSON时，所有其他属性将被隐藏
 protected $visible = ['first_name', 'last_name'];
 // 临时修改属性可见性
 return $user->makeVisible('attribute')->toArray();
 return $user->makeHidden('attribute')->toArray();

 // 附加到JSON
 // 使用访问器get
 protected $appends = ['is_admin'];
 public function getIsAdminAttribute()
    {
        return $this->attributes['admin'] === 'yes';
    }

// 运行时追加
return $user->append('is_admin')->toArray();
return $user->setAppends(['is_admin'])->toArray();


// 日期序列化
// 覆盖serializeDate
protected function serializeDate(DateTimeInterface $date)
{
    return $date->format('Y-m-d');
}

// 自定义每个属性的日期格式
protected $casts = [
    'birthday' => 'date:Y-m-d',
    'joined_at' => 'datetime:Y-m-d H:00',
];
```

## 保护属性

## 软删除

- deleted_at 数据库需要

# Eloquent: API 资源

一个转换层来联结你的 Eloquent 模型和实际返回给用户的 JSON 响应。Laravel 的资源类能够让你以更直观简便的方式将模型和模型集合转化成 JSON。

## 生成资源

- 生成的资源都会被放置在应用程序的 app/Http/Resources

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

## 关联

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

- 资源是将单个模型转换成数组，而资源集合是将多个模型的集合转换成数组。所有的资源都提供了一个 collection 方法来生成一个 「临时」 资源集合，所以你没有必要为每一个模型类型都编写一个资源集合类

- 不过，如果你需要自定义返回集合的元数据，则仍需要定义一个资源集合

```php
use App\User;
use App\Http\Resources\User as UserResource;

Route::get('/user', function () {
    return UserResource::collection(User::all());
});
```

## 数据包裹

- 默认情况下，当资源响应被转换成 JSON 时，顶层资源将会被包裹在 data 键中
- withoutWrapping 方法来禁用顶层资源的包裹

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

- 键中。中总会有 data 、 meta 和 links 键包含着分页状态信息

## 分页

## 条件属性

- when 方法可以被用来有条件地向资源响应添加属性

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

- mergeWhen 方法在给定的条件为 true 时将多个属性添加到响应中

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

- whenLoaded 方法来有条件的加载关联

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

- whenPivotLoaded 方法有条件地从多对多关联的中间表中添加数据

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

- 资源中定义一个 withResponse 方法

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
