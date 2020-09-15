<!-- TOC -->

- [PHP](#php)
- [基础](#基础)
- [Callback / Callable 类型](#callback--callable-类型)
- [预定义变量](#预定义变量)
- [php.ini](#phpini)
- [魔术常量](#魔术常量)
- [函数](#函数)
    - [返回值](#返回值)
- [类与对象](#类与对象)
    - [匿名类](#匿名类)
    - [魔术方法](#魔术方法)
    - [对象序列化](#对象序列化)
- [命名空间](#命名空间)
- [常用的帮助函数](#常用的帮助函数)
    - [mbstring](#mbstring)
    - [字符串](#字符串)
    - [日历 函数](#日历-函数)
    - [日期/时间](#日期时间)
        - [面向对象](#面向对象)
    - [json](#json)
    - [URL](#url)
    - [数组](#数组)
    - [类](#类)
    - [函数处理](#函数处理)

<!-- /TOC -->

https://www.php.net/manual/zh/langref.php

# PHP

# 基础

```php

// 定义常量
define("CONSTANT", "Hello world.");
const CONSTANT = 'Hello World';


// 每执行1条低级语句就去执行一次 register_tick_function() 注册的函数
// 可以测试执行代码的处理时间
declare(ticks=1);
register_tick_function('tick_handler');

// require 在出错时产生 E_COMPILE_ERROR 级别的错误
require('somefile.php');
require 'somefile.php';

// require_once 语句和 require 语句完全相同，唯一区别是 PHP 会检查该文件是否已经被包含过，如果是则不会再次包含。
require_once(__ROOT__.'/config.php');



// require 在出错时产生 会发出一条警告,脚本会继续运行
// 当一个文件被包含时，其中所包含的代码继承了 include 所在行的变量范围
include 'vars.php';

// 和 include 语句类似，唯一区别是如果该文件中已经被包含过，则不会再次包含。
include_once "a.php"; // 这将包含 a.php
```
# Callback / Callable 类型

https://www.php.net/manual/zh/language.types.callable.php  
指定回调类型 callback
```php

```

# 预定义变量

```php
// 引用全局作用域中可用的全部变量
$GLOBALS["foo"]

// 通过 URL 参数（又叫 query string）传递给当前脚本的变量的数组
$_GET["name"]

// post 参数[]
$_POST

// 上传的数组
$_FILES

// 包含了 $_GET，$_POST 和 $_COOKIE 的数组
$_REQUEST

// 当前脚本可用 SESSION 变量的数组
$_SESSION

// 通过环境方式传递给当前脚本的变量的数组
$_ENV["USER"]

$_COOKIE
$http_response_header
```

# php.ini 

https://www.php.net/manual/zh/ini.core.php#ini.include-path

# 魔术常量
https://www.php.net/manual/zh/language.constants.predefined.php
```php
// 当前行号
__LINE__ 

// 文件的完整路径和文件名
__FILE__

// 文件所在的目录
__DIR__

//
__FUNCTION__

// 类的名称
__CLASS__

//  类的方法名
__METHOD__

// 当前命名空间的名称（区分大小写）
__NAMESPACE__
```

# 函数

```php
function foo($arg_1, $arg_2 = "默认参数", /* ..., */ $arg_n)
{
    echo "Example function.\n";
    return $retval;
}

// 通过引用传递参数
// 参数的前面加上符号 &
function add_some_extra(&$string)
{
    $string .= 'and something extra.';
}

// 支持...
function sum(...$numbers) {
    $acc = 0;
    foreach ($numbers as $n) {
        $acc += $n;
    }
    return $acc;
}
```

## 返回值
 
* 默认return null;

```php
// 
function sum($a, $b): float {
    return $a + $b;
}
```

# 类与对象

```php
class SimpleClass
{
    // 父类中的方法被声明为 final，则子类无法覆盖该方法。如果一个类被声明为 final，则不能被继承。
    final public function moreTesting() {
       echo "BaseClass::moreTesting() called\n";
   }

    // 常量
    const constant = 'constant value';

    // 声明属性
    public $var = 'a default value';
    public $var1 = 'hello ' . 'world';
    var $var2="";

    // static
    public static $my_static = 'foo';
    public static function aStaticMethod() {
        // ...
    }

    // 声明方法
    public function displayVar() {
        echo $this->var;
    }
}

//对象接口
// 接口中定义的所有方法都必须是公有
// 接口中可以定义常量
interface iTemplate
{
    public function setVariable($name, $var);
    public function getHtml($template);
}


// Trait
// 一种代码复用机制,减少单继承语言的限制
// * 两个 trait 都插入了一个同名的方法，如果没有明确解决冲突将会产生一个致命错误
// 可以被静态成员静态方法定义
// 可以定义属性
trait ezcReflectionReturnInfo {
    function getReturnType() { /*1*/ }
    function getReturnDescription() { /*2*/ }
}

class ezcReflectionMethod extends ReflectionMethod {
    use ezcReflectionReturnInfo;
    /* ... */
}
// 多个 trait
class MyHelloWorld {
    use Hello, World;
    public function sayExclamationMark() {
        echo '!';
    }
}

```

```php
// 对象运算符 访问非静态属性
$this->property

// self，parent 和 static 这三个特殊的关键字是用于在类定义的内部对其属性或方法进行访问
// 静态属性
self::$property
```

## 匿名类

可以创建一次性的简单对象
```php
$util->setLogger(new class {
    public function log($msg)
    {
        echo $msg;
    }
});
```

## 魔术方法

```php
// 用于一个类被当成字符串时执行
// new cls() . "test"
public __toString ( void ) : string

// 当尝试以调用函数的方式调用一个对象
// $obj = new CallableClass; $obj(5);
__invoke ([ $... ] ) : mixed
```

## 对象序列化

```php
$s = serialize($a);
$a = unserialize($s);
```

# 命名空间

```php
// 定义
// 只有以下类型的代码受命名空间的影响，它们是：类（包括抽象类和traits）、接口、函数和常量。
namespace my\name;
// 定义子命名空间
namespace MyProject\Sub\Level;

// 使用
$c = new \my\name\MyClass; // 参考 "全局空间" 小节

// namespace关键字和__NAMESPACE__常量
// 常量__NAMESPACE__的值是包含当前命名空间名称的字符串。

// 别名/导入 use
use My\Full\Classname as Another;

// 全局空间
// 如果没有定义任何命名空间，所有的类与函数的定义都是在全局空间，与 PHP 引入命名空间概念前一样。在名称前加上前缀 \ 表示该名称是全局空间中的名称
$f = \fopen(...); // 调用全局的fopen函数
```

# 常用的帮助函数
https://www.php.net/manual/zh/funcref.php

## mbstring

https://www.php.net/manual/zh/book.mbstring.php

mb_check_encoding — 检查字符串在指定的编码里是否有效
mb_chr — Get a specific character
mb_convert_case — 对字符串进行大小写转换
mb_convert_encoding — 转换字符的编码
mb_convert_variables — 转换一个或多个变量的字符编码
mb_decode_mimeheader — 解码 MIME 头字段中的字符串
mb_decode_numericentity — 根据 HTML 数字字符串解码成字符
mb_detect_encoding — 检测字符的编码
mb_detect_order — 设置/获取 字符编码的检测顺序
mb_encode_mimeheader — 为 MIME 头编码字符串
mb_encode_numericentity — Encode character to HTML numeric string reference
mb_encoding_aliases — Get aliases of a known encoding type
mb_ereg_match — Regular expression match for multibyte string
mb_ereg_replace_callback — Perform a regular expression search and replace with multibyte support using a callback
mb_ereg_replace — Replace regular expression with multibyte support
mb_ereg_search_getpos — Returns start point for next regular expression match
mb_ereg_search_getregs — Retrieve the result from the last multibyte regular expression match
mb_ereg_search_init — Setup string and regular expression for a multibyte regular expression match
mb_ereg_search_pos — Returns position and length of a matched part of the multibyte regular expression for a predefined multibyte string
mb_ereg_search_regs — Returns the matched part of a multibyte regular expression
mb_ereg_search_setpos — Set start point of next regular expression match
mb_ereg_search — Multibyte regular expression match for predefined multibyte string
mb_ereg — Regular expression match with multibyte support
mb_eregi_replace — Replace regular expression with multibyte support ignoring case
mb_eregi — Regular expression match ignoring case with multibyte support
mb_get_info — 获取 mbstring 的内部设置
mb_http_input — 检测 HTTP 输入字符编码
mb_http_output — 设置/获取 HTTP 输出字符编码
mb_internal_encoding — 设置/获取内部字符编码
mb_language — 设置/获取当前的语言
mb_list_encodings — 返回所有支持编码的数组
mb_ord — Get code point of character
mb_output_handler — 在输出缓冲中转换字符编码的回调函数
mb_parse_str — 解析 GET/POST/COOKIE 数据并设置全局变量
mb_preferred_mime_name — 获取 MIME 字符串
mb_regex_encoding — Set/Get character encoding for multibyte regex
mb_regex_set_options — Set/Get the default options for mbregex functions
mb_scrub — Description
mb_send_mail — 发送编码过的邮件
mb_split — 使用正则表达式分割多字节字符串
mb_str_split — Given a multibyte string, return an array of its characters
mb_strcut — 获取字符的一部分
mb_strimwidth — 获取按指定宽度截断的字符串
mb_stripos — 大小写不敏感地查找字符串在另一个字符串中首次出现的位置
mb_stristr — 大小写不敏感地查找字符串在另一个字符串里的首次出现
mb_strlen — 获取字符串的长度
mb_strpos — 查找字符串在另一个字符串中首次出现的位置
mb_strrchr — 查找指定字符在另一个字符串中最后一次的出现
mb_strrichr — 大小写不敏感地查找指定字符在另一个字符串中最后一次的出现
mb_strripos — 大小写不敏感地在字符串中查找一个字符串最后出现的位置
mb_strrpos — 查找字符串在一个字符串中最后出现的位置
mb_strstr — 查找字符串在另一个字符串里的首次出现
mb_strtolower — 使字符串小写
mb_strtoupper — 使字符串大写
mb_strwidth — 返回字符串的宽度
mb_substitute_character — 设置/获取替代字符
mb_substr_count — 统计字符串出现的次数
mb_substr — 获取部分字符串

## 字符串

* strlen — 获取字符串长度
* md5 — 计算字符串的 MD5 散列值
* sha1_file — 计算文件的 sha1 散列值
* sha1 — 计算字符串的 sha1 散列值
* trim — 去除字符串首尾处的空白字符（或者其他字符）
* strtolower — 将字符串转化为小写
* strtolower — 将字符串转化为小写
* print — 输出字符串
* printf — 输出格式化字符串
* htmlentities — 将字符转换为 HTML 转义字符
* chunk_split — 将字符串分割成小块

## 日历 函数

日历相关说明  
http://www.fourmilab.ch/documents/calendar/

* cal_days_in_month — 返回某个历法中某年中某月的天数
* JDDayOfWeek — 返回星期的日期
* JDMonthName — 返回月份的名称

## 日期/时间

所支持的时区列表  
https://www.php.net/manual/zh/timezones.asia.php

* date — 格式化一个本地时间／日期
```php
https://www.php.net/manual/zh/function.date.php/

// 2001-03-10 17:16:18 （MySQL DATETIME 格式）
$today = date("Y-m-d H:i:s");
// 17:16:17
$today = date("H:i:s");                         
```
* time — 返回当前的 Unix 时间戳 当前时间的秒数
* microtime() - 返回当前 Unix 时间戳和微秒数

### 面向对象

```php
$date = new DateTime('2000-01-01');
$date = DateTime::createFromFormat('Y-m-d', '2009-02-15');

// 格式化
$date->format('Y-m-d H:i:s');

// 返回表示日期的Unix时间戳。
$date->getTimestamp();
```

## json
https://www.php.net/manual/zh/book.json.php
```php
// 解码
/**
* $assoc 当该参数为 TRUE 时，将返回 array 而非 object 
* $depth 深度
* $options JSON_UNESCAPED_UNICODE(返回中文而非\uXXXX)
* https://www.php.net/manual/zh/json.constants.php
*/
json_decode ( string $json [, bool $assoc = FALSE [, int $depth = 512 [, int $options = 0 ]]] ) : mixed

json_decode($json)

// 编码
json_encode ( mixed $value [, int $options = 0 [, int $depth = 512 ]] ) : string
```

## URL
https://www.php.net/manual/zh/book.url.php
```php
// base64 编码
base64_encode ( string $data ) : string
// base64 解码
base64_decode ( string $data [, bool $strict = false ] ) : string

// 所有标头
get_headers ( string $url [, int $format = 0 ] ) : array

get_meta_tags ( string $filename [, bool $use_include_path = false ] ) : array

// 生成 URL-encode 之后的请求字符串
http_build_query ( mixed $query_data [, string $numeric_prefix [, string $arg_separator [, int $enc_type = PHP_QUERY_RFC1738 ]]] ) : string

$data = array('foo'=>'bar',
              'baz'=>'boom',
              'cow'=>'milk',
              'php'=>'hypertext processor');
// foo=bar&baz=boom&cow=milk&php=hypertext+processor
echo http_build_query($data)

// 解析 URL，返回其组成部分
parse_url

// 已编码的 URL 字符串进行解码
// 返回字符串，此字符串中百分号（%）后跟两位十六进制数的序列都将被替换成原义字符。
// rawurldecode() 不会把加号（'+'）解码为空格
rawurldecode ( string $str ) : string
// 编码
rawurlencode ( string $str ) : string

// 解码已编码的 URL 字符串
// 加号（'+'）被解码成一个空格字符
urldecode ( string $str ) : string
urlencode ( string $str ) : string
```

## 数组
https://www.php.net/manual/zh/book.array.php

```php
array ([ mixed $... ] ) : array
$arr=array("a" => "orange", "b" => "banana", "c" => "apple")

// 将数组中的所有键名修改为全大写或小写
// $case CASE_UPPER 或 CASE_LOWER(默认小写)
array_change_key_case ( array $array [, int $case = CASE_LOWER ] ) : array

// 将一个数组分割成多个
array_chunk ( array $array , int $size [, bool $preserve_keys = false ] ) : array

// 用给定的值填充数组
array_fill ( int $start_index , int $num , mixed $value ) : array

// 返回数组中部分的或所有的键名
array_keys ( array $array [, mixed $search_value = null [, bool $strict = false ]] ) : array

// 为数组的每个元素应用回调函数
array_map ( callable $callback , array $array1 [, array $... ] ) : array

// 检查数组中是否存在某个值
in_array ( mixed $needle , array $haystack [, bool $strict = FALSE ] ) : bool
```

## 类
https://www.php.net/manual/zh/book.classobj.php

* call_user_method_array — 以参数列表的数组，调用用户方法
* call_user_method — 对特定对象调用用户方法
* class_alias — 为一个类创建别名
* class_exists — 检查类是否已定义
* get_class_methods — 返回由类的方法名组成的数组
* get_class_vars — 返回由类的默认属性组成的数组
* get_class — 返回对象的类名
* method_exists — 检查类的方法是否存在
* property_exists — 检查对象或类是否具有该属性
* trait_exists — 检查指定的 trait 是否存在

## 函数处理

* call_user_func_array — 调用回调函数，并把一个数组参数作为回调函数的参数
* call_user_func — 把第一个参数作为回调函数调用
* func_get_arg — 返回参数列表的某一项
* func_get_args — 返回一个包含函数参数列表的数组
* function_exists — 如果给定的函数已经被定义就返回 TRUE
* get_defined_functions — 返回所有已定义函数的数组
