
# 自定义FUNCTION

```sql
CREATE [OR REPLACE] FUNCTION 函数名(参数名 参数类型, ...)
RETURNS 返回类型 AS $$
DECLARE
    -- 变量声明
BEGIN
    -- 逻辑代码
    RETURN 结果;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- 删除函数（注意：必须带上参数类型以区分重载函数）。
DROP FUNCTION 函数名(参数类型);
```

## 返回基本类型（求和函数）

```sql
CREATE OR REPLACE FUNCTION add_numbers(a INTEGER, b INTEGER)
RETURNS INTEGER AS $$
BEGIN
    RETURN a + b;
END;
$$ LANGUAGE plpgsql;

-- 调用：SELECT add_numbers(10, 20);
```

## IF/ELSE

```sql
CREATE OR REPLACE FUNCTION get_discount_price(price NUMERIC)
RETURNS NUMERIC AS $$
DECLARE
    final_price NUMERIC;
BEGIN
    IF price > 100 THEN
        final_price := price * 0.8; -- 8折
    ELSE
        final_price := price * 0.9; -- 9折
    END IF;
    RETURN final_price;
END;
$$ LANGUAGE plpgsql;
```

## 返回单行记录（SETOF 或 TABLE）

```sql
CREATE OR REPLACE FUNCTION get_user_by_id(u_id INT)
RETURNS TABLE(user_id INT, user_name TEXT) AS $$
BEGIN
    RETURN QUERY 
    SELECT id, name FROM users WHERE id = u_id;
END;
$$ LANGUAGE plpgsql;

-- 调用：SELECT * FROM get_user_by_id(1);
```
