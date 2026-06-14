<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Harness Engineering](#harness-engineering)
  - [核心组件](#核心组件)
    - [上下文工程（Context Engineering）—— 上下文](#上下文工程context-engineering-上下文)
    - [架构约束（Architecture Constraints）—— 约束](#架构约束architecture-constraints-约束)
    - [反馈循环（Feedback Loop）——智能体审智能体](#反馈循环feedback-loop智能体审智能体)
    - [Entropy Management 垃圾回收](#entropy-management-垃圾回收)

<!-- /code_chunk_output -->


# Harness Engineering

Harness 的本质——它不是给智能体赋予更强的思考能力，而是用约束、可验证性和层次化的信任机制，让智能体能够在复杂、真实的环境中安全可靠地执行任务。

## 核心组件

- 上下文工程 Context Engineering
- 架构约束 Architecture Constraints
- 反馈循环 Feedback Loop
- 熵管理 Entropy Management

### 上下文工程（Context Engineering）—— 上下文

- Agent 不知道该看什么、怎么找
- AGENTS.md 活文档、按需检索

### 架构约束（Architecture Constraints）—— 约束

- Agent 复制并放大坏模式
- 分层依赖、自定义 Linter、CI 强制阻断

### 反馈循环（Feedback Loop）——智能体审智能体

- Agent 不知道自己做错了
- Agent-to-Agent Review、自动测试套件

### Entropy Management 垃圾回收

- 技术债务和文档腐烂
- Doc-gardening Agent、持续垃圾回收
