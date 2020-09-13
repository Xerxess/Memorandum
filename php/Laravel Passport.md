<!-- TOC -->

- [Laravel Passport](#laravel-passport)
    - [OAuth](#oauth)
        - [客户端的授权模式](#客户端的授权模式)
    - [部署 Passport](#部署-passport)
    - [配置](#配置)
    - [JSON API](#json-api)
    - [请求令牌 ( 第三方 )](#请求令牌--第三方-)
    - [密码授权令牌(自己的客户端)](#密码授权令牌自己的客户端)
    - [隐式授权令牌](#隐式授权令牌)
    - [个人访问令牌](#个人访问令牌)
    - [客户端凭证授予令牌](#客户端凭证授予令牌)
    - [使用 JavaScript 接入 API](#使用-javascript-接入-api)
- [中间件](#中间件)

<!-- /TOC -->

# Laravel Passport

使用 Passport 可以轻而易举地实现 API 授权认证

```
composer require laravel/passport

php artisan migrate // Passport 服务提供器使用框架注册自己的数据库迁移目录

php artisan passport:install // 创建生成安全访问令牌时所需的加密密钥
```


将 Laravel\Passport\HasApiTokens Trait 添加到 App\User 模型中，这个 Trait 会给你的模型提供一些辅助函数，用于检查已认证用户的令牌和使用范围：

```php
<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
}
```

在 AuthServiceProvider 的 boot 方法中调用 Passport::routes 函数。这个函数会注册发出访问令牌并撤销访问令牌、客户端和个人访问令牌所必需的路由

```php
<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * 应用程序的策略映射。
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * 注册认证 / 授权服务
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
```


config/auth.php

```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```

## OAuth

* 客户端要求用户给予授权
* 用户同意给予授权 (重定向到认证服务器)
* 根据上一步获得的授权，向认证服务器请求令牌（token）
* 认证服务器对授权进行认证，确认无误后发放令牌
* 客户端使用令牌向资源服务器请求资源
* 资源服务器使用令牌向认证服务器确认令牌的正确性，确认无误后提供资源

> 整个流程
* （A）用户打开客户端以后，客户端要求用户给予授权。
* （A Back）用户同意给予客户端授权。
* （B）客户端使用上一步获得的授权，向认证服务器申请令牌。
* （B Back）认证服务器对客户端进行认证以后，确认无误，同意发放令牌。
* （C）客户端使用令牌，向资源服务器申请获取资源。
* （C Back）资源服务器确认令牌无误，同意向客户端开放资源。

### 客户端的授权模式

* 授权码模式（authorization code）
* 简化模式（implicit）
* 密码模式（resource owner password credentials）
* 客户端模式（client credentials）

## 部署 Passport

```
php artisan passport:keys
```

## 配置

```php
/**
 * 注册认证 / 授权服务
 *
 * @return void
 */
public function boot()
{
    $this->registerPolicies();

    Passport::routes();

    Passport::tokensExpireIn(now()->addDays(15));

    Passport::refreshTokensExpireIn(now()->addDays(30));

    Passport::personalAccessTokensExpireIn(now()->addMonths(6));
}
```

## JSON API

* GET /oauth/clients 返回认证用户的所有客户端
* POST /oauth/clients 此路由用于创建新客户端
* PUT /oauth/clients/{client-id} 更新客户端信息
* DELETE /oauth/clients/{client-id} 删除客户端 (client)

## 请求令牌 ( 第三方 )

* 客户端创建之后，开发者会使用此客户端的 ID 和密钥来请求授权代码，并从应用程序访问令牌。

1. 接入应用的用户向你应用程序的 /oauth/authorize 路由发出重定向请求
2. 接收到授权请求时，Passport 会自动向用户显示一个模版页面，允许用户批准或拒绝授权请求。
3. 用户批准请求，他们会被重定向回接入的应用程序指定的 redirect_uri
4. 用户批准授权请求，重定向回应用程序。 应首先根据重定向之前存储的值验证 state 参数。 如果 state 参数匹配，则应向您的应用程序发出 POST 请求以请求访问令牌。 该请求应包括用户批准授权请求时由应用程序颁发的授权代码。
5. /oauth/token 返回的 JSON 响应中会包含 access_token 、refresh_token 和 expires_in 属性。expires_in 属性包含访问令牌的有效期（单位：秒）
6. 路由 /oauth/token 会返回一个 JSON 响应，其中包含 access_token 、refresh_token 和 expires_in 属性。expires_in 属性包含访问令牌的有效时间（单位：秒）。

## 密码授权令牌(自己的客户端)

* OAuth2 密码授权机制可以让你自己的客户端（如移动应用程序）使用邮箱地址或者用户名和密码获取访问令牌。

1. 在应用程序通过密码授权机制来发布令牌之前，在 passport:client 命令后加上 --password 参数来创建密码授权的客户端。如果你已经运行了 passport:install 命令，则不需要再运行此命令：
2. 使用用户的电子邮件地址和密码向 /oauth/token 路由发出 POST 请求来获取访问令牌。
3. 密码授权机制时，可以通过请求 scope 参数 * 来授权应用程序支持的所有范围的令牌。如果你的请求中包含 scope 为 * 的参数，令牌实例上的 can 方法会始终返回 true。
4. 自定义用户名字段 Passport 在模型里用 email 属性作为「username」。不过，你仍然可以通过在你的模型里面定义一个 findForPassport 方法来自定义验证行为。
5. 自定义密码验证 Passport 会在你的模型里使用 password 字段来验证给定的密码。

## 隐式授权令牌 

## 个人访问令牌

* 用户要在不经过传统的授权码重定向流程的情况下向自己颁发访问令牌。

## 客户端凭证授予令牌

* 客户端凭证授予令牌适用于计算机到计算机的身份验证。例如，你可以在通过 API 执行维护任务的计划作业中使用此授权。

## 使用 JavaScript 接入 API

* 手动向应用程序发送访问令牌，并将其传递给应用程序。
* Passport::CreateFreshApiToken 中间件将在你所有的对外请求中添加一个 laravel_token cookie 。该 cookie 将包含一个加密后的 JWT ， Passport 将用来验证来自 JavaScript 应用程序的 API 请求。至此，您可以在不明确传递访问令牌的情况下向应用程序的 API 

# 中间件

通过中间件即可获取用户信息

```php
Route::get('/user', function () {
    //
})->middleware('auth:api');
```