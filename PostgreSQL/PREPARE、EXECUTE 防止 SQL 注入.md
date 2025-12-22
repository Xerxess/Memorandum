
# PREPARE、EXECUTE 防止 SQL 注入

https://www.postgresql.org/docs/17/sql-prepare.html
https://www.postgresql.org/docs/17/sql-execute.html

在 PostgreSQL 中，PREPARE 和 EXECUTE 用于实现预处理语句（Prepared Statements）。这种机制通过先解析、分析并重写查询计划，然后多次运行该计划，从而提高重复执行相同 SQL 的效率并增强安全性。

- 对于复杂的查询，数据库不需要每次都重新进行语法解析和生成查询计划。
- 如果同一个连接中要执行成千上万次类似的查询，节省的时间非常可观。
- 生命周期：预处理语句是会话级的。如果你断开连接再重连，之前的 PREPARE 将失效。
- 安全性（防止 SQL 注入）：
  - 参数值（如 $1）被视为字面量而非 SQL 指令。即使输入 1; DROP TABLE users;，它也只会被当作一个字符串或数字处理，不会被执行。
- 大多数编程语言的驱动程序（如 Python 的 psycopg2、Java 的 JDBC 或 Go 的 pgx）在底层都会自动调用这些指令。

```sql
-- 语法：PREPARE 语句名 (数据类型) AS SQL语句;
PREPARE get_user_by_id (int) AS
    SELECT id, username, email FROM users WHERE id = $1;

-- 语法：EXECUTE 语句名 (值1, 值2...);
EXECUTE get_user_by_id(10);
EXECUTE get_user_by_id(42);

DEALLOCATE get_user_by_id;
-- 或者释放所有
DEALLOCATE ALL;
```
