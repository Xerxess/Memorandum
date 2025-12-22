# UUID 函数

```sql
gen_random_uuid() → uuid -- This function returns a version 4 (random) UUID
uuid_extract_timestamp (uuid) → timestamp with time zone -- 此函数从 UUID 版本 1 中提取 timestamp with time zone 对于其他版本
uuid_extract_version (uuid) → smallint
```

## uuid-ossp

特性 |gen_random_uuid() |uuid_generate_v4()
-|-|-
内置状态| 原生内置 (PostgreSQL 13+) |需要安装扩展 (uuid-ossp)
模块依赖| 无需任何操作，开箱即用 |必须执行 CREATE EXTENSION "uuid-ossp"
性能 |更高（直接调用内部函数，开销极小） |略低（需要通过扩展接口调用）
依赖库 |使用 PostgreSQL 自带的随机源 |通常依赖操作系统的 libc 或 libuuid 库
推荐程度| 2025 年首选 |仅在需要兼容旧版本或 v1/v3/v5 时使用

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- 必须执行

uuid_generate_v1 () → uuid
uuid_generate_v1mc () → uuid
uuid_generate_v3 ( namespace uuid, name text ) → uuid
uuid_generate_v4 () → uuid
uuid_generate_v5 ( namespace uuid , name text ) → uuid
```
