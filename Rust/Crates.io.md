<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Crates.io](#cratesio)
  - [Rust Web 开发领域](#rust-web-开发领域)

<!-- /code_chunk_output -->

# Crates.io

<https://crates.io/>

第三方库

- 序列化：使用 serde。
- 异步运行时：使用 tokio（标准库仅定义了 Future 接口，没有内置调度器）。
- 正则表达式：使用 regex。
- 日期时间：使用 chrono（标准库的 SystemTime 比较基础）。
- uuid 

## Rust Web 开发领域

推荐技术栈:Axum + Tokio + SQLx + Serde

- Web 框架 (Web Frameworks)
  - Axum：目前最推荐的框架。由 Tokio 团队维护，与异步生态契合度最高，基于 tower 服务模型。
  - Actix-web：老牌劲旅。以极致的性能著称，虽然不直接使用 Tokio 运行时，但其生态非常成熟且稳定。
  - Rocket：注重开发者体验，语法极度优雅（类似 Flask），但长期以来对异步的支持稍晚于前两者。
- 异步运行时 (Async Runtime)
  - Tokio：Rust 异步生态的事实标准。提供事件循环、异步 IO、定时器等，几乎所有主流 Web 库都运行在它之上。
- 数据序列化 (Serialization)
  - Serde：必装库。Rust 序列化的“真神”，用于处理 JSON、YAML、Form 等数据转换。通常配合 serde_json 使用。
- 数据库与 ORM
  - SQLx：纯 Rust 实现的异步 SQL 库。它的最大特色是编译期检查 SQL 语法，支持 PostgreSQL, MySQL, SQLite。
  - Diesel：功能最全的同步 ORM，类型安全极强，适合对数据模型严谨性要求高的项目。
  - Sea-ORM：基于 SQLx 的异步 ORM，更符合现代开发习惯，支持动态构建查询。
- 错误处理与日志 (Observability)
  - Anyhow：用于应用层错误处理，方便快速地处理各种错误流。
  - Tracing：Tokio 出品的日志库，支持结构化日志和分布式链路追踪，是现代微服务的首选。
- 其它核心工具
  - Reqwest：用于发送 HTTP 请求的客户端库。
  - Config：处理配置文件（如 .env, .toml）。
  - Jsonwebtoken：处理 JWT 鉴权。
