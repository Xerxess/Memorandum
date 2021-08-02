# Serverless

Serverless 的全称是 Serverless computing 无服务器运算，又被称为函数即服务（Function-as-a-Service，缩写为 FaaS），是云计算的一种模型。以平台即服务（PaaS）为基础，无服务器运算提供一个微型的架构，终端客户不需要部署、配置或管理服务器服务，代码运行所需要的服务器服务皆由云端平台来提供。 国内外比较出名的产品有 Tencent Serverless、AWS Lambda、Microsoft Azure Functions 等。

- Serverless 代表的是一种服务理念或模式。
- Serverless 是一种软件系统架构方法，并不代表某种技术。
- Serverless 是一种云服务产品形态。

当前业界最常见的 Serverless 实现方案为 FaaS（函数即服务） + BaaS（后端即服务），我们经常听到的「云服务」就是基于 FaaS + BaaS 架构。

## 有点

降低运营成本、降低运维需求、降低人力成本和减少资源开销等

## 缺点

- 延迟 Serverless 应用程序是高度分布式、低耦合的，这就意味着延迟将始终是一个问题
- 本地测试
