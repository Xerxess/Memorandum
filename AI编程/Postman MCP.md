# Postman MCP

https://www.postman.com/product/mcp-server/

Postman MCP 可以理解为：让 Cursor、Claude Code、VS Code、Codex 等 AI 编程工具，直接读取和操作你的 Postman 工作区、Collection、Environment、API Spec、Mock、Monitor，并执行接口测试。

整体调用链路如下：

```
你输入自然语言
    ↓
Cursor / Claude Code / VS Code / Codex
    ↓
Postman MCP Server
    ↓
Postman API
    ↓
Workspace / Collection / Environment / Spec / Mock / Monitor
```

## 三种使用场景

### 场景一：让 AI 操作 Postman

```
读取 Postman 中的用户管理接口。

根据接口定义生成 TypeScript 请求代码。

创建 Development 环境。

把 base_url 设置为 http://localhost:3000。

运行用户模块 Collection，并分析失败原因。
```

### 场景二：用 Postman 调试其他 MCP Server

```

```

### 场景三：把自己的 API 生成 MCP Server

```

```

## Remote 和 Local 怎么选择

### Remote Server

由 Postman 托管，使用 Streamable HTTP

```
https://mcp.postman.com/minimal
https://mcp.postman.com/code
https://mcp.postman.com/mcp
```

- 优点：
  - 不需要安装 MCP Server。
  - 美国区域支持 OAuth。
  - 配置简单。
  - 适合管理 Postman 云端资源。
  - 适合公共 API 和在线测试环境。
- 缺点：
  - 远程服务器无法访问你电脑上的 localhost。
  - 无法直接测试本地启动的后端服务。

### Local Server

在你的电脑上通过 Node.js、npx 启动，使用 STDIO 与 AI 工具通信。

- 优点：
  - 可以访问 localhost。
  - 可以访问公司内网 API。
  - 更适合本地前后端联调。
  - 网络和密钥控制更灵活。
- 缺点：
  - 需要 Node.js。
  - 必须使用 Postman API Key。
  - 配置稍微复杂。

## Minimal、Code、Full 模式有什么区别

### Minimal

默认模式，只加载常用工具。

- 适合：
  - 读取 Workspace。
  - 管理 Collection。
  - 管理 Environment。
  - 创建或修改基础 Postman 资源。
  - 普通 API 测试。

```
# 地址
https://mcp.postman.com/minimal

# 本地启动
npx -y @postman/postman-mcp-server@latest   
```

### Code

偏向编程和代码生成。

- 适合：
  - 搜索 API 定义。
  - 读取内部或公共 API。
  - 根据 API 生成客户端代码。
  - 给 AI 提供接口上下文。
  - 生成 TypeScript、Swift 等调用代码。

```
# 地址
https://mcp.postman.com/code

# 本地启动
npx -y @postman/postman-mcp-server@latest --code  
```

### Full

完整工具集，包含 100 多个工具。

- 适合：
  - 高级工作区管理。
  - 企业功能。
  - Spec、Mock、Monitor。
  - 批量管理 Postman 资源。
  - 复杂自动化工作流。

```
# 地址
https://mcp.postman.com/mcp

# 本地启动
npx -y @postman/postman-mcp-server@latest --full  
```

## 连接成功后验证

```
与 Postman 资源交互时，必须使用 Postman MCP Server。

请执行以下操作：

1. 列出我的 Postman 工作区。
2. 返回每个工作区的名称和 ID。
3. 不要创建、修改或删除任何资源。
``` 