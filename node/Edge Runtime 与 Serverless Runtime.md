<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Edge Runtime 与 Serverless Runtime](#edge-runtime-与-serverless-runtime)
  - [Edge Runtime（边缘运行时）](#edge-runtime边缘运行时)
  - [Serverless Runtime（无服务器运行时）](#serverless-runtime无服务器运行时)

<!-- /code_chunk_output -->


# Edge Runtime 与 Serverless Runtime

## Edge Runtime（边缘运行时）

- 指代码运行在**CDN 边缘节点（Edge Node）**的沙箱环境中，靠近用户，延迟更低，使用 Web 标准 API 执行。
- 地理位置分布：部署在全球多个边缘节点
- 超低延迟：用户请求由最近的节点处理
- 冷启动快：轻量级运行时，启动速度极快（毫秒级）
- 资源限制：CPU、内存、执行时间有限制
- 按请求计费：只对实际处理的请求付费

优势：

- 全球响应速度快
- 成本效益高
- 自动扩缩容
- 无需管理服务器

限制：

- 执行时间通常限制在 5-30 秒
- 内存限制（通常 128MB-1GB）
- 不能运行长时间任务
- 不支持文件系统访问
- 本地模拟困难、需平台支持（如 Vercel CLI）

平台支持:

- Cloudflare Workers
- Vercel Edge Functions
- Netlify Edge Functions
- AWS CloudFront Functions
- Cloudflare Workers

## Serverless Runtime（无服务器运行时）

- 指在云服务（如 AWS Lambda）上运行的无状态函数，按请求触发，运行在**中心化服务器（Region）**中。
- 中心化部署：通常部署在特定区域的数据中心
- 功能强大：可以处理复杂计算和长时间运行的任务
- 冷启动较慢：容器启动需要更多时间（秒级）
- 资源丰富：更高的内存和 CPU 限制
- 按使用计费：按执行时间和资源使用量计费
- 本地模拟支持 可用 next dev 本地模拟

优势：

- 处理能力强大
- 执行时间限制宽松（通常 15分钟-1小时）
- 内存充足（可达 10GB+）
- 可以运行复杂应用
- 文件系统访问
- 支持直连 MySQL/MongoDB 等
- Node.js API 全支持，如 fs、http、crypto 


限制：

- 冷启动延迟
- 区域性延迟
- 成本相对较高

平台支持:

- 自建 Node.js 服务
- 阿里云函数计算
- AWS Lambda
- Google Cloud Functions
- Azure Functions
- Vercel Serverless Functions
