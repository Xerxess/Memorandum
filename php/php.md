<!-- TOC -->

- [PHP](#php)
- [函数](#函数)
    - [返回值](#返回值)

<!-- /TOC -->

https://www.php.net/manual/zh/langref.php

# PHP

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
