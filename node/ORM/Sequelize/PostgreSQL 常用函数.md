<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [PostgreSQL 常用函数](#postgresql-常用函数)
  - [数学函数](#数学函数)
  - [字符串函数](#字符串函数)

<!-- /code_chunk_output -->

# PostgreSQL 常用函数

- COUNT 函数：用于计算数据库表中的行数。
- MAX 函数：用于查询某一特定列中最大值。
- MIN 函数：用于查询某一特定列中最小值。
- AVG 函数：用于计算某一特定列中平均值。
- SUM 函数：用于计算数字列所有值的总和。
- ARRAY 函数：用于输入值(包括null)添加到数组中。
- Numeric 函数：完整列出一个 SQL 中所需的操作数的函数。
- String 函数：完整列出一个 SQL 中所需的操作字符的函数。

## 数学函数

- ABS() 返回数值表达式的绝对值
- ACOS() 返回数值表达式的反余弦值，如果该值不在-1到1之间，则返回NULL。
- ASIN() 返回数字表达式的反正弦值，如果值不在-1到1的范围内，则返回NULL
- CEIL() 返回不小于传递的数字表达式的最小整数值 例:ceil(-42.8) -> -42
- FLOOR() 返回不大于传递的数字表达式的最大整数值。例：floor(-42.8) -> -43
- GREATEST() 返回输入表达式的最大值。
- ROUND() 返回四舍五入为整数的数字表达式 例：round(42.4) -> 42
- ROUND(v numeric, s int) 圆整为s位小数数字 例：round(42.438,2) -> 42.44
- EXP() 返回自然对数(e)的底数，该底数提高为传递的数值表达式的幂。
- LOG() 返回所传递数值表达式的自然对数。
- PI() 返回pi的值
- POW() 返回一个表达式的值加到另一表达式的幂上
- POWER() 返回一个表达式的值加到另一表达式的幂上
- SIN()
- COS()
- SQRT()
- TAN()
- COT()
- mod(y, x) 取余数 例：mod(9,4）-> 1
- radians(double) 把角度转为弧度
- random() 0.0到1.0之间的随机数值 例：random()
- trunc(double/numeric) 截断(向零靠近) 例：trunc(42.8) -> 42
- trunc(v numeric, s int) 截断为s小数位置的数字 例：trunc(42.438,2) -> 42.43
- sign(double/numeric) 参数的符号(-1,0,+1) 例：sign(-8.4) -> -1

## 字符串函数

- ascii(text) 参数第一个字符的ASCII码 例：ascii('x') -> 120
- BIT_LENGTH() 返回参数的长度(以位为单位)
- CHAR_LENGTH() 返回参数中的字符数
- CONCAT_WS() 返回用分隔符连接
- CONCAT() 返回串联的字符串
- LOWER() 以小写形式返回参数
- LCASE() LOWER()的同义词
- UPPER() 转换为大写
- UCASE() 同义词UPPER()
- LEFT() 返回指定的最左边的字符数
- LTRIM() 删除前导空格
- RTRIM() 删除尾随空格
- MID() 返回从指定位置开始的子字符串
- POSITION() LOCATE()的同义词
- QUOTE() 转义要在SQL语句中使用的参数
- REGEXP 使用正则表达式进行模式匹配
- repeat(string text, number int) 重复字符串指定次数 例：repeat('Pg', 4) -> PgPgPgPg
- replace(string text, from text, to text) 替换出现的指定字符串 例:replace('abcdefabcdef', 'cd', 'XX') -> abXXefabXXef
- REVERSE() 反转字符串中的字符
- RIGHT() 返回指定的最右边字符
- lpad(string text, length int [, fill text]) 返回字符串参数，用指定的字符串左填充 例：lpad('hi', 5, 'xy') -> xyxhi
- RPAD() 将字符串追加指定的次数
- substring(string [from int] [for int]) 抽取子字串 例：substring('Thomas' from 2 for 3) -> hom
- substring(string from pattern) 抽取匹配 POSIX 正则表达式的子字串 例：substring('Thomas' from '…$')—> mas
- substring(string from pattern for escape) 抽取匹配SQL正则表达式的子字串
- substr(string, from [, count]) 抽取子字串。例：substr('alphabet', 3, 2) -> ph
- TRIM() 删除前导和尾随空格
- length(string text) string中字符的数目 例：length('jose') -> 4
- md5(string text) 计算给出string的MD5散列，以十六进制返回结果。
