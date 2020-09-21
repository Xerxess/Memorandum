<!-- TOC -->

- [mysql](#mysql)
- [数据类型](#数据类型)
    - [JSON类型](#json类型)
- [知识点](#知识点)
    - [datetime 和 timestamp](#datetime-和-timestamp)
- [MySQL临时表](#mysql临时表)
- [外键约束](#外键约束)

<!-- /TOC -->

https://dev.mysql.com/doc/refman/5.7/en/

https://www.yiibai.com/mysql/basic-mysql.html

# mysql

# 数据类型

https://www.runoob.com/mysql/mysql-functions.html

| 值        | 大小                | 格式                | 类型                            |
| --------- | ------------------- | ------------------- | ------------------------------- |
| TINYINT   |                     |                     | 小整数值                        |
| SMALLINT  |                     |                     | 大整数值                        |
| BIGINT    | 8 bytes             |                     | 极大整数值                      |
| FLOAT     |                     |                     | 单精度 浮点数值                 |
| DOUBLE    | 8 bytes             |                     | 双精度 浮点数值                 |
| DECIMAL   |                     |                     | 小数值                          |
| -------   | -------             | -------             | -------                         |
| DATE      |                     | YYYY-MM-DD          | 日期值                          |
| TIME      |                     | HH:MM:SS            |                                 |
| YEAR      |                     | YYYY                |                                 |
| DATETIME  | 8 bytes             | YYYY-MM-DD HH:MM:SS |                                 |
| TIMESTAMP |                     | YYYY-MM-DD HH:MM:SS |                                 |
| -------   | -------             | -------             | -------                         |
| CHAR      | 0-255 bytes         |                     | 定长字符串                      |
| VARCHAR   | 0-65535 bytes       |                     | 变长字符串                      |
| TINYBLOB  | 0-255 bytes         |                     | 不超过 255 个字符的二进制字符串 |
| TINYTEXT  | 0-255 bytes         |                     | 短文本字符串                    |
| BLOB      | 0-65535 bytes(60kb) |                     | 二进制形式的长文本数据          |
| TEXT | 0-65535 bytes(60kb) | | 长文本数据 |
| MEDIUMBLOB | 0-16 777 215 bytes(16Mb) | | 二进制形式的长文本数据 |
| MEDIUMTEXT | 0-16 777 215 bytes(16Mb) | | 中等长度文本数据 |
| LONGBLOB | 0-4 294 967 295 bytes(4G) | | 二进制形式的极大文本数据 |
| LONGTEXT | 0-4 294 967 295 bytes(4G) | | 极大文本数据 |

## JSON类型

# 知识点

## datetime 和 timestamp

- datetime 8 字节 yyyy-mm-dd hh:mm:ss
- timestamp 4 字节 yyyy-mm-dd hh:mm:ss
- datetime ‘1000-01-01 00:00:00.000000’
- timestamp ‘1970-01-01 00:00:01.000000’

# MySQL临时表

临时表是一种特殊类型的表，它允许您存储一个临时结果集，可以在单个会话中多次重用。

```sql
# 外部临时表
CREATE TEMPORARY TABLE table_name;
DROP TEMPORARY TABLE table_name;
```

```sql
# 内部临时表
```

# 外键约束

https://dev.mysql.com/doc/refman/5.7/en/create-table-foreign-keys.html

https://www.yiibai.com/mysql/foreign-key.html

外键表示一个表中的一个字段被另一个表中的一个字段引用。外键对相关表中的数据造成了限制，使MySQL能够保持参照完整性。

* 外键约束对子表的含义：当在子表中insert或update一条数据时，如果在主表中找不到候选键，那么就不允许该操作。
* 外键约束对主表的含义：当在主表中insert或update数据时，如果主表的候选键对应的有子表的外键值，那么就不允许该操作。

* CASCADE：从父表中删除或更新该行，并自动删除或更新子表中的匹配行。
* SET NULL：从父表中删除或更新该行，并将子表中的一个或多个外键列设置为NULL。
* RESTRICT：拒绝父表的删除或更新操作。  
* NO ACTION：标准SQL中的关键字。在MySQL中，等效于RESTRICT。

```sql
CREATE TABLE parent (
    id INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE child (
    id INT,
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        ON DELETE CASCADE
) ENGINE=INNODB;
```
