
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [PostgreSQL 17.7 JSON 函数和运算符](#postgresql-177-json-函数和运算符)
  - [核心概念](#核心概念)
  - [🔥 最热门的 JSON 操作（日常开发必备）](#-最热门的-json-操作日常开发必备)
    - [1. JSON 值提取运算符（最常用）](#1-json-值提取运算符最常用)
      - [`->` - 获取 JSON 对象字段或数组元素](#----获取-json-对象字段或数组元素)
      - [`->>` - 获取 JSON 值并转为文本](#----获取-json-值并转为文本)
      - [`#>` 和 `#>>` - 路径提取](#-和----路径提取)
    - [2. JSON 查询和判断运算符（高频使用）](#2-json-查询和判断运算符高频使用)
      - [`@>` - 包含检查](#---包含检查)
      - [`<@` - 被包含检查](#---被包含检查)
      - [`?` - 键存在检查](#---键存在检查)
      - [`?|` 和 `?&` - 多键检查](#-和----多键检查)
    - [3. JSON 创建和转换函数（日常必备）](#3-json-创建和转换函数日常必备)
      - [`to_json` 和 `to_jsonb` - 转换为 JSON](#to_json-和-to_jsonb---转换为-json)
      - [`json_build_array` 和 `jsonb_build_array` - 构建 JSON 数组](#json_build_array-和-jsonb_build_array---构建-json-数组)
      - [`json_build_object` 和 `jsonb_build_object` - 构建 JSON 对象](#json_build_object-和-jsonb_build_object---构建-json-对象)
      - [`array_to_json` 和 `row_to_json` - 数组和行转 JSON](#array_to_json-和-row_to_json---数组和行转-json)
    - [4. JSON 处理和转换函数（常用）](#4-json-处理和转换函数常用)
      - [`json_array_elements` 和 `jsonb_array_elements` - 展开数组](#json_array_elements-和-jsonb_array_elements---展开数组)
      - [`json_each` 和 `jsonb_each` - 展开对象键值对](#json_each-和-jsonb_each---展开对象键值对)
      - [`json_extract_path` 和 `json_extract_path_text` - 路径提取](#json_extract_path-和-json_extract_path_text---路径提取)
  - [🔥 常用的 JSON 修改函数](#-常用的-json-修改函数)
    - [1. `jsonb_set` - 设置/更新 JSON 字段](#1-jsonb_set---设置更新-json-字段)
    - [2. `jsonb_insert` - 插入 JSON 字段](#2-jsonb_insert---插入-json-字段)
    - [3. `jsonb_delete` / `-` 操作符 - 删除字段](#3-jsonb_delete----操作符---删除字段)
    - [4. `||` - JSON 合并](#4----json-合并)
  - [🔧 JSON 路径函数（中级使用）](#-json-路径函数中级使用)
    - [1. `jsonb_path_query` - JSON 路径查询](#1-jsonb_path_query---json-路径查询)
    - [2. `jsonb_path_exists` - JSON 路径存在检查](#2-jsonb_path_exists---json-路径存在检查)
  - [🔧 JSON 转换和聚合函数（特定场景）](#-json-转换和聚合函数特定场景)
    - [1. `json_populate_record` - JSON 转记录](#1-json_populate_record---json-转记录)
    - [2. `json_to_record` 和 `json_to_recordset` - JSON 转结果集](#2-json_to_record-和-json_to_recordset---json-转结果集)
    - [3. `json_agg` - JSON 聚合函数](#3-json_agg---json-聚合函数)
  - [🧪 高级 JSON 功能（特定场景）](#-高级-json-功能特定场景)
    - [1. `jsonb_path_query_array` - 路径查询返回数组](#1-jsonb_path_query_array---路径查询返回数组)
    - [2. `jsonb_path_query_first` - 获取第一个匹配项](#2-jsonb_path_query_first---获取第一个匹配项)
    - [3. `json_strip_nulls` - 移除 null 值](#3-json_strip_nulls---移除-null-值)
    - [4. `jsonb_pretty` - 美化格式输出](#4-jsonb_pretty---美化格式输出)
  - [❄️ 较少使用的 JSON 函数](#️-较少使用的-json-函数)
    - [1. `json_typeof` - 获取 JSON 数据类型](#1-json_typeof---获取-json-数据类型)
    - [2. `jsonb_insert` - 插入到数组特定位置](#2-jsonb_insert---插入到数组特定位置)
    - [3. SQL/JSON 路径高级表达式](#3-sqljson-路径高级表达式)
  - [🚀 性能优化建议](#-性能优化建议)
    - [1. 使用 jsonb 而不是 json](#1-使用-jsonb-而不是-json)
    - [2. 合理使用索引](#2-合理使用索引)
    - [3. 查询优化](#3-查询优化)

<!-- /code_chunk_output -->

# PostgreSQL 17.7 JSON 函数和运算符

PostgreSQL 提供了强大的 JSON 数据类型支持，包括 `json` 和 `jsonb` 两种类型，以及丰富的 JSON 操作函数和运算符。本文档按照实际开发中的使用频率整理，从最常用的功能到较高级的功能。

## 核心概念

- **`json`**: 保存原文的文本格式，保留空格、重复键等
- **`jsonb`**: 二进制格式，去除了空格和重复键，查询性能更好，推荐使用

---

## 🔥 最热门的 JSON 操作（日常开发必备）

### 1. JSON 值提取运算符（最常用）

这些是处理 JSON 数据最基础的运算符，几乎每个使用 JSON 的应用都会用到。

#### `->` - 获取 JSON 对象字段或数组元素

```sql
-- 获取对象字段（返回 json/jsonb）
-- json -> text → json  提取具有给定键的 JSON 对象字段。
-- jsonb -> text → jsonb 
SELECT '{"name": "张三", "age": 25}'::jsonb -> 'name';  -- "张三"

-- 获取数组元素
-- json -> integer → json 提取 JSON 数组的 n n 个元素（数组元素从零开始索引，但负整数从末尾开始计数）。
-- jsonb -> integer → jsonb
SELECT '[1, 2, 3]'::jsonb -> 1;  -- 2

-- 嵌套访问
SELECT '{"user": {"name": "张三", "info": {"age": 25}}}'::jsonb -> 'user' -> 'info' -> 'age';
-- 25

-- 实际应用示例
SELECT
    product_data -> 'name' as product_name,
    product_data -> 'price' as price
FROM products
WHERE product_data -> 'category' = '"electronics"';
```

#### `->>` - 获取 JSON 值并转为文本

```sql
-- 获取字段值并转为 text 类型
SELECT '{"name": "张三", "age": 25}'::jsonb ->> 'name';  -- 张三

-- 实际应用：在 WHERE 条件中使用
SELECT * FROM users
WHERE user_data ->> 'email' = 'zhang@example.com';

-- 组合使用
SELECT name, user_data ->> 'city' as city
FROM users
WHERE (user_data ->> 'age')::integer > 18;
```

#### `#>` 和 `#>>` - 路径提取

```sql
-- 使用路径提取（返回 json/jsonb）
SELECT '{"a": {"b": {"c": 42}}}'::jsonb #> '{a,b,c}';  -- 42

-- 使用路径提取并转为文本
SELECT '{"a": {"b": {"c": 42}}}'::jsonb #>> '{a,b,c}';  -- 42

-- 实际应用：复杂嵌套结构
SELECT order_id,
    order_data #> '{customer,address,city}' as city,
    order_data #>> '{items,0,name}' as first_item_name
FROM orders;
```

### 2. JSON 查询和判断运算符（高频使用）

#### `@>` - 包含检查

检查 JSON 文档是否包含指定的 JSON 结构或值。

```sql
-- 检查是否包含指定键值对
SELECT '{"name": "张三", "age": 25, "city": "北京"}'::jsonb @> '{"age": 25}'::jsonb;  -- true

-- 检查是否包含多个条件
SELECT '{"name": "张三", "age": 25, "tags": ["java", "sql"]}'::jsonb @> '{"tags": ["java"]}'::jsonb;  -- true

-- 实际应用：复杂的查询条件
SELECT * FROM products
WHERE product_data @> '{"category": "electronics", "brand": "Apple"}'::jsonb
AND (product_data ->> 'price')::decimal < 1000.00;
```

#### `<@` - 被包含检查

与 `@>` 相反，检查 JSON 文档是否被指定的 JSON 结构包含。

```sql
SELECT '{"age": 25}'::jsonb <@ '{"name": "张三", "age": 25}'::jsonb;  -- true

-- 实际应用：查找满足部分条件的记录
SELECT * FROM logs
WHERE '{"level": "error", "service": "auth"}'::jsonb <@ log_data;
```

#### `?` - 键存在检查

```sql
-- 检查是否存在指定键
SELECT '{"name": "张三", "age": 25}'::jsonb ? 'name';        -- true
SELECT '{"name": "张三", "age": 25}'::jsonb ? 'email';       -- false

-- 实际应用：筛选包含特定字段的记录
SELECT * FROM users
WHERE user_data ? 'email' AND user_data ? 'phone';
```

#### `?|` 和 `?&` - 多键检查

```sql
-- 检查是否存在任意一个键（OR）
SELECT '{"name": "张三", "age": 25}'::jsonb ?| ARRAY['name', 'email'];  -- true

-- 检查是否同时存在所有键（AND）
SELECT '{"name": "张三", "age": 25}'::jsonb ?& ARRAY['name', 'age'];   -- true
SELECT '{"name": "张三", "age": 25}'::jsonb ?& ARRAY['name', 'email'];  -- false

-- 实际应用：复杂字段筛选
SELECT * FROM products
WHERE product_data ?| ARRAY['discount', 'sale_price', 'promotion'];
```

### 3. JSON 创建和转换函数（日常必备）

#### `to_json` 和 `to_jsonb` - 转换为 JSON

```sql
-- 将各种数据类型转换为 JSON
SELECT to_json(42);                    -- 42
SELECT to_json('hello');               -- "hello"
SELECT to_json(ARRAY[1, 2, 3]);       -- [1, 2, 3]
SELECT to_json(ROW(1, 'test'));       -- {"f1":1,"f2":"test"}

-- 转换表行
SELECT to_json(table.*) FROM table;

-- 实际应用：API 响应格式化
SELECT
    order_id,
    to_json(created_at) as order_date,
    to_json(total_amount) as amount
FROM orders
WHERE status = 'completed';
```

#### `json_build_array` 和 `jsonb_build_array` - 构建 JSON 数组

```sql
-- 构建简单的 JSON 数组
SELECT json_build_array(1, 'two', true, null, ARRAY[1, 2, 3]);
-- [1, "two", true, null, [1, 2, 3]]

-- 嵌套构建
SELECT json_build_array(
    'user_info',
    json_build_object('name', '张三', 'age', 25),
    json_build_array('java', 'python', 'sql')
);
-- ["user_info", {"name": "张三", "age": 25}, ["java", "python", "sql"]]

-- 实际应用：动态构建响应数据
SELECT
    user_id,
    json_build_array(
        to_json(last_login),
        login_count,
        last_ip_address
    ) as session_info
FROM users;
```

#### `json_build_object` 和 `jsonb_build_object` - 构建 JSON 对象

```sql
-- 构建简单的 JSON 对象
SELECT json_build_object('name', '张三', 'age', 25, 'active', true);
-- {"name": "张三", "age": 25, "active": true}

-- 嵌套对象
SELECT json_build_object(
    'user', json_build_object('id', 1, 'name', '张三'),
    'order', json_build_object('id', 1001, 'total', 299.99)
);
-- {"user": {"id": 1, "name": "张三"}, "order": {"id": 1001, "total": 299.99}}

-- 实际应用：构建复杂的 API 响应
SELECT
    json_build_object(
        'status', 'success',
        'data', json_build_object(
            'user_id', users.id,
            'profile', json_build_object(
                'name', users.name,
                'email', users.email,
                'preferences', user_data -> 'preferences'
            ),
            'stats', json_build_object(
                'login_count', (SELECT COUNT(*) FROM login_history WHERE user_id = users.id),
                'last_login', user_data ->> 'last_login'
            )
        ),
        'timestamp', to_json(NOW())
    ) as api_response
FROM users
WHERE id = 1;
```

#### `array_to_json` 和 `row_to_json` - 数组和行转 JSON

```sql
-- 数组转 JSON
SELECT array_to_json(ARRAY[1, 2, 3, 4]);           -- [1, 2, 3, 4]
SELECT array_to_json(ARRAY['apple', 'orange']);    -- ["apple", "orange"]

-- 行转 JSON
SELECT row_to_json(ROW(1, '张三', true));
-- {"f1": 1, "f2": "张三", "f3": true}

-- 指定列名
SELECT row_to_json(users) FROM users WHERE id = 1;
-- {"id": 1, "name": "张三", "email": "zhang@example.com"}

-- 实际应用：表数据导出
SELECT array_to_json(array_agg(row_to_json(users)))
FROM users
WHERE active = true;
```

### 4. JSON 处理和转换函数（常用）

#### `json_array_elements` 和 `jsonb_array_elements` - 展开数组

```sql
-- 展开数组为多行
SELECT value FROM json_array_elements('[1, 2, 3]');
-- 1, 2, 3 (三行)

-- 展开数组中的对象
SELECT value ->> 'name' as name, value ->> 'age' as age
FROM json_array_elements('[{"name": "张三", "age": 25}, {"name": "李四", "age": 30}]');

-- 实际应用：处理商品列表
SELECT
    (item_value ->> 'name') as product_name,
    (item_value ->> 'price')::decimal as price
FROM orders o,
     json_array_elements(o.order_items) item_value
WHERE o.order_id = 1001;
```

#### `json_each` 和 `jsonb_each` - 展开对象键值对

```sql
-- 展开对象为键值对行
SELECT key, value FROM json_each('{"name": "张三", "age": 25}');
-- name, "张三"
-- age, 25

-- 实际应用：动态字段查询
SELECT
    key as field_name,
    value ->> 'value' as field_value,
    value ->> 'type' as field_type
FROM products p,
     jsonb_each(p.product_attributes)
WHERE p.id = 1;
```

#### `json_extract_path` 和 `json_extract_path_text` - 路径提取

```sql
-- 提取路径并保持 JSON 类型
SELECT json_extract_path('{"a": {"b": {"c": 42}}}', 'a', 'b', 'c');  -- 42

-- 提取路径并转为文本
SELECT json_extract_path_text('{"a": {"b": {"c": 42}}}', 'a', 'b', 'c');  -- 42

-- 实际应用：可配置的字段访问
SELECT
    product_id,
    json_extract_path_text(product_data, 'specs', 'cpu', 'model') as cpu_model,
    json_extract_path_text(product_data, 'specs', 'memory', 'size') as memory_size
FROM products
WHERE category = 'electronics';
```

---

## 🔥 常用的 JSON 修改函数

### 1. `jsonb_set` - 设置/更新 JSON 字段

```sql
-- 更新或添加字段
SELECT jsonb_set('{"name": "张三"}'::jsonb, '{age}', '25');  -- {"name": "张三", "age": 25}

-- 更新嵌套字段
SELECT jsonb_set(
    '{"user": {"info": {"name": "张三"}}}'::jsonb,
    '{user,info,age}',
    '25'
);
-- {"user": {"info": {"name": "张三", "age": 25}}}

-- 实际应用：更新用户配置
UPDATE users
SET user_data = jsonb_set(
    user_data,
    '{preferences,theme}',
    '"dark"'
)
WHERE id = 1;

-- 批量更新
UPDATE products
SET product_data = jsonb_set(
    product_data,
    '{last_updated}',
    to_json(NOW())
)
WHERE category = 'electronics';
```

### 2. `jsonb_insert` - 插入 JSON 字段

```sql
-- 在指定位置插入
SELECT jsonb_insert('{"a": [0, 1, 2]}'::jsonb, '{a, 1}', '"new"');
-- {"a": [0, "new", 1, 2]}

-- 插入对象字段
SELECT jsonb_insert('{"name": "张三"}'::jsonb, '{age}', '25');
-- {"name": "张三", "age": 25}

-- 实际应用：插入历史记录
UPDATE products
SET price_history = jsonb_insert(
    COALESCE(price_history, '[]'::jsonb),
    '{0}',
    json_build_object('date', NOW(), 'price', current_price)
)
WHERE id = 1;
```

### 3. `jsonb_delete` / `-` 操作符 - 删除字段

```sql
-- 使用函数删除
SELECT jsonb_delete('{"name": "张三", "age": 25, "email": "zhang@test.com"}'::jsonb, '{age}');
-- {"name": "张三", "email": "zhang@test.com"}

-- 使用操作符删除（更简洁）
SELECT '{"name": "张三", "age": 25, "email": "zhang@test.com"}'::jsonb - 'age';
-- {"name": "张三", "email": "zhang@test.com"}

-- 删除嵌套字段
SELECT '{"user": {"info": {"name": "张三", "age": 25}}}'::jsonb #- '{user,info,age}';
-- {"user": {"info": {"name": "张三"}}}

-- 实际应用：清理敏感数据
UPDATE users
SET user_data = user_data - 'password' - 'ssn'
WHERE last_login < NOW() - INTERVAL '1 year';

-- 删除过期数据
UPDATE products
SET product_data = product_data #- '{temp_info}'
WHERE product_data ? 'temp_info';
```

### 4. `||` - JSON 合并

```sql
-- 合并两个 JSON 对象
SELECT '{"name": "张三"}'::jsonb || '{"age": 25, "city": "北京"}'::jsonb;
-- {"name": "张三", "age": 25, "city": "北京"}

-- 合并时覆盖重复字段
SELECT '{"name": "张三", "age": 20}'::jsonb || '{"age": 25}'::jsonb;
-- {"name": "张三", "age": 25}

-- 实际应用：批量更新多个字段
UPDATE users
SET user_data = user_data ||
    json_build_object('last_login', NOW(), 'login_count', login_count + 1)::jsonb
WHERE id = 1;

-- 动态属性合并
UPDATE products
SET product_data = product_data ||
    json_build_object('updated_by', current_user, 'update_reason', 'price_change')::jsonb
WHERE id IN (1, 2, 3);
```

---

## 🔧 JSON 路径函数（中级使用）

### 1. `jsonb_path_query` - JSON 路径查询

```sql
-- 基础路径查询
SELECT jsonb_path_query(
    '{"items": [{"name": "A", "price": 10}, {"name": "B", "price": 20}]}',
    '$.items[*].name'
);
-- "A", "B"

-- 条件查询
SELECT jsonb_path_query(
    '{"items": [{"name": "A", "price": 10}, {"name": "B", "price": 20}]}',
    '$.items[*] ? (@.price > 15)'
);
-- {"name": "B", "price": 20}

-- 实际应用：复杂查询
SELECT
    order_id,
    jsonb_path_query(order_data, '$.items[*] ? (@.price > 100)') as expensive_items
FROM orders
WHERE jsonb_path_exists(order_data, '$.items[*] ? (@.price > 100)');
```

### 2. `jsonb_path_exists` - JSON 路径存在检查

```sql
-- 检查路径是否存在
SELECT jsonb_path_exists('{"name": "张三", "age": 25}', '$.age');  -- true
SELECT jsonb_path_exists('{"name": "张三", "age": 25}', '$.email');  -- false

-- 复杂条件检查
SELECT jsonb_path_exists(
    '{"items": [{"name": "A", "price": 10}, {"name": "B", "price": 20}]}',
    '$.items[*] ? (@.price > 15)'
);  -- true

-- 实际应用：验证数据完整性
SELECT * FROM products
WHERE jsonb_path_exists(product_data, '$.specs.cpu')
AND jsonb_path_exists(product_data, '$.specs.memory');
```

---

## 🔧 JSON 转换和聚合函数（特定场景）

### 1. `json_populate_record` - JSON 转记录

```sql
-- 定义复合类型
CREATE TYPE user_profile AS (
    name TEXT,
    age INTEGER,
    email TEXT
);

-- JSON 转换为记录类型
SELECT * FROM json_populate_record(
    null::user_profile,
    '{"name": "张三", "age": 25, "email": "zhang@test.com"}'
);
-- (张三, 25, zhang@test.com)

-- 实际应用：数据导入
INSERT INTO users (name, age, email)
SELECT * FROM json_populate_record(
    null::user_profile,
    '{"name": "李四", "age": 30, "email": "li@test.com"}'
);
```

### 2. `json_to_record` 和 `json_to_recordset` - JSON 转结果集

```sql
-- 转换单个 JSON 对象为记录
SELECT * FROM json_to_record('{"name": "张三", "age": 25}')
AS x(name TEXT, age INTEGER);
-- (张三, 25)

-- 转换 JSON 数组为多行记录
SELECT * FROM json_to_recordset(
    '[{"name": "张三", "age": 25}, {"name": "李四", "age": 30}]'
) AS x(name TEXT, age INTEGER);
-- (张三, 25)
-- (李四, 30)

-- 实际应用：处理 API 响应数据
SELECT
    (record_data).name,
    (record_data).age,
    (record_data).department
FROM json_to_recordset(api_response_data)
AS record_data(name TEXT, age INTEGER, department TEXT);
```

### 3. `json_agg` - JSON 聚合函数

```sql
-- 将多行数据聚合为 JSON 数组
SELECT json_agg(name) FROM users WHERE active = true;
-- ["张三", "李四", "王五"]

-- 聚合复杂对象
SELECT json_agg(json_build_object('id', id, 'name', name, 'email', email))
FROM users
WHERE department = 'IT';

-- 实际应用：构建统计报告
SELECT
    department,
    json_agg(json_build_object(
        'id', id,
        'name', name,
        'salary', salary,
        'hire_date', hire_date
    )) as employees
FROM employees
GROUP BY department;
```

---

## 🧪 高级 JSON 功能（特定场景）

### 1. `jsonb_path_query_array` - 路径查询返回数组

```sql
-- 获取所有匹配的项作为数组
SELECT jsonb_path_query_array(
    '{"items": [{"name": "A", "price": 10}, {"name": "B", "price": 20}, {"name": "C", "price": 30}]}',
    '$.items[*] ? (@.price > 15)'
);
-- [{"name": "B", "price": 20}, {"name": "C", "price": 30}]
```

### 2. `jsonb_path_query_first` - 获取第一个匹配项

```sql
-- 获取第一个匹配的项
SELECT jsonb_path_query_first(
    '{"items": [{"name": "A", "price": 10}, {"name": "B", "price": 20}]}',
    '$.items[*] ? (@.price > 15)'
);
-- {"name": "B", "price": 20}
```

### 3. `json_strip_nulls` - 移除 null 值

```sql
-- 移除 JSON 中的 null 值
SELECT json_strip_nulls('{"a": 1, "b": null, "c": 3}');
-- {"a": 1, "c": 3}

-- 实际应用：清理数据
UPDATE users
SET user_data = json_strip_nulls(user_data)
WHERE user_data @> '{"email": null}';
```

### 4. `jsonb_pretty` - 美化格式输出

```sql
-- 格式化输出 JSON
SELECT jsonb_pretty('{"name":"张三","age":25,"skills":["Java","SQL"]}'::jsonb);

-- 实际应用：调试和日志
SELECT jsonb_pretty(product_data) FROM products WHERE id = 1;
```

---

## ❄️ 较少使用的 JSON 函数

### 1. `json_typeof` - 获取 JSON 数据类型

```sql
-- 获取值的类型
SELECT json_typeof('{"name": "张三"}');        -- object
SELECT json_typeof('[1, 2, 3]');             -- array
SELECT json_typeof('123');                   -- number
SELECT json_typeof('"hello"');               -- string
SELECT json_typeof('true');                  -- boolean
SELECT json_typeof('null');                  -- null

-- 实际应用：数据验证
SELECT * FROM products
WHERE json_typeof(product_data -> 'price') = 'number';
```

### 2. `jsonb_insert` - 插入到数组特定位置

```sql
-- 在数组指定位置插入元素
SELECT jsonb_insert('{"arr": [1, 3, 4]}'::jsonb, '{arr, 1}', '2');
-- {"arr": [1, 2, 3, 4]}
```

### 3. SQL/JSON 路径高级表达式

```sql
-- 使用正则表达式
SELECT jsonb_path_query_array(
    '{"items": [{"name": "apple"}, {"name": "banana"}, {"name": "orange"}]}',
    '$.items[*] ? (@.name like_regex "^a")'
);
-- [{"name": "apple"}, {"name": "banana"}]

-- 使用 starts with
SELECT jsonb_path_query_array(
    '{"items": [{"name": "apple"}, {"name": "banana"}, {"name": "orange"}]}',
    '$.items[*] ? (@.name starts with "a")'
);
-- [{"name": "apple"}]
```

---

## 🚀 性能优化建议

### 1. 使用 jsonb 而不是 json

```sql
-- 推荐：使用 jsonb
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    attributes JSONB  -- 而不是 JSON
);

-- 创建 GIN 索引提升查询性能
CREATE INDEX idx_products_attributes ON products USING GIN(attributes);
```

### 2. 合理使用索引

```sql
-- 对频繁查询的字段创建表达式索引
CREATE INDEX idx_products_category ON products USING GIN((attributes -> 'category'));

-- 对路径查询创建索引
CREATE INDEX idx_users_email ON users USING BTREE((user_data ->> 'email'));

-- 使用表达式索引优化特定查询
CREATE INDEX idx_orders_total ON orders USING BTREE(((order_data ->> 'total')::decimal));
```

### 3. 查询优化

```sql
-- 使用 @> 而不是多个条件
-- 好的做法
SELECT * FROM products WHERE attributes @> '{"category": "electronics", "brand": "Apple"}';

-- 避免
SELECT * FROM products
WHERE attributes ->> 'category' = 'electronics'
AND attributes ->> 'brand' = 'Apple';
```

---
