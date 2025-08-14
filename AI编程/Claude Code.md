
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [斜杠命令](#斜杠命令)
- [自定义斜杠命令](#自定义斜杠命令)
- [处理图像](#处理图像)
- [参考文件和目录](#参考文件和目录)
- [运用延伸思维](#运用延伸思维)
- [继续之前的对话](#继续之前的对话)
- [工作流](#工作流)
  - [探索、规划、编码、提交](#探索-规划-编码-提交)
  - [编写测试，提交；编码，迭代，提交](#编写测试提交编码迭代提交)
  - [编写代码，截图结果，迭代](#编写代码截图结果迭代)
  - [构建高效工作流](#构建高效工作流)
- [高级技巧](#高级技巧)
- [claude.md](#claudemd)
- [Claude Token成本控制实践](#claude-token成本控制实践)

<!-- /code_chunk_output -->

<https://docs.anthropic.com/en/docs/claude-code/overview>

```cmd
npm install -g @anthropic-ai/claude-code
claude --version
```

> 调整环境变量

- 可将环境变量写入 bash_profile 和 bashrc

```cmd
cd your-project-folder
export ANTHROPIC_AUTH_TOKEN=sk-... 
export ANTHROPIC_BASE_URL=https://anyrouter.top

// 启动CLI
claude

// 启动CLI 自动打开Bypassing Permissions模式 跳过所有权限检查
claude --dangerously-skip-permissions 
```

## 斜杠命令

/add-dir 添加额外的工作目录
/agents 管理用于专门任务的自定义 AI 子代理
/bug 报告错误（将对话发送给 Anthropic）
/clear 清除对话历史
/compact [instructions] 压缩对话，可选择性地提供重点指令
/config 查看/修改配置
/cost 显示令牌使用统计
/doctor 检查您的 Claude Code 安装的健康状况
/help 获取使用帮助
/init 使用 CLAUDE.md 指南初始化项目
/login 切换 Anthropic 账户
/logout 从您的 Anthropic 账户登出
/mcp 管理 MCP 服务器连接和 OAuth 身份验证
/memory 编辑 CLAUDE.md 内存文件
/model 选择或更改 AI 模型
/permissions 查看或更新权限
/pr_comments 查看拉取请求评论
/review 请求代码审查
/status 查看账户和系统状态
/terminal-setup 安装 Shift+Enter 键绑定用于换行（仅限 iTerm2 和 VSCode）
/vim 进入 vim 模式，在插入模式和命令模式之间切换

## 自定义斜杠命令

自定义斜杠命令允许您将常用提示定义为 Markdown 文件，Claude Code 可以执行这些文件。命令按作用域（项目特定或个人）组织，并通过目录结构支持命名空间。

/<command-name> [arguments]

位置：.claude/commands/

如：.claude/commands/optimize.md

```
// 使用 $ARGUMENTS 占位符将动态值传递给命令。
'按照我们的编码标准修复问题 #$ARGUMENTS'
```

使用 /optimize 123

## 处理图像

- 将图像拖放到 Claude Code 窗口中
- 复制图像并使用 ctrl+v 将其粘贴到 CLI 中（不要使用 cmd+v）
- 向 Claude 提供图片路径。例如，“分析此图片：/path/to/your/image.png”

```
这张图片显示了什么？
What does this image show?

Describe the UI elements in this screenshot
描述此屏幕截图中的UI元素

Are there any problematic elements in this diagram?
这个图表中有什么有问题的元素吗？

Here's a screenshot of the error. What's causing it?
这是错误的屏幕截图。是什么原因造成的？

This is our current database schema. How should we modify it for the new feature?
这是我们当前的数据库架构。我们应该如何为新功能修改它？

Generate CSS to match this design mockup
生成CSS以匹配此设计模型

What HTML structure would recreate this component?
什么HTML结构可以重新创建这个组件？
```

## 参考文件和目录

- 引用单个文件 Explain the logic in @src/utils/auth.js
- 引用目录 What's the structure of @src/components?

## 运用延伸思维

- “think” 引发基本的延伸思考
- 官方文档告诉我们，一共有这些词："think" < "think hard" < "think harder" < "ultrathink" 可以加速Claude Code 思考。

```
I need to implement a new authentication system using OAuth2 for our API. Think deeply about the best approach for implementing this in our codebase. 
我需要使用OAuth2为我们的API实施一个新的身份验证系统。深入思考在我们的代码库中实现这一点的最佳方法。

think about potential security vulnerabilities in this approach 
思考这种方法中潜在的安全漏洞

think harder about edge cases we should handle 
更努力地思考我们应该处理的边缘案例
```

## 继续之前的对话

- --continue 自动继续最近的对话
- --resume 显示对话选择器

## 工作流

### 探索、规划、编码、提交

- 要求 Claude 阅读相关文件、图像或 URL，提供一般指针（"阅读处理日志的文件"）或特定文件名（"阅读 logging.py"），明确不要编写任何代码。
- 要求 Claude 制定如何处理特定问题的计划。我们建议使用"think"这个词来触发扩展思考模式，这给了 Claude 额外的计算时间来更彻底地评估替代方案。这些特定短语直接映射到系统中不断增加的思考预算级别："think 思考" < "think hard 认真思考" < "think harder 更加努力思考" < "ultrathink 超级思考" 。每个级别都为 Claude 分配逐步增加的思考预算。
- 要求 Claude 在代码中实现其解决方案。这也是一个要求它在实现解决方案的各个部分时明确验证其解决方案合理性的好地方。
- 要求 Claude 提交结果并创建 pull request。如果相关，这也是让 Claude 更新任何 README.md 或更改日志的好时机，解释它刚刚做了什么。

```
- 分析需求文档，优化并完善，暂时不编写任何代码
- 制定详细开发计划 ultrathink
- 严格遵循项目开发规范，进行开发，开发完成后请编写 DEVELOPMENT_COMPLETED.md
```

### 编写测试，提交；编码，迭代，提交

Anthropic 最喜欢的工作流，用于可以通过单元、集成或端到端测试轻松验证的更改。测试驱动开发（TDD）在智能化编程中变得更加强大：

- 要求 Claude 基于预期的输入/输出对编写测试。明确说明你正在进行测试驱动开发，以便它避免创建模拟实现，即使对于代码库中尚不存在的功能也是如此。
- 告诉 Claude 运行测试并确认它们失败。在这个阶段明确告诉它不要编写任何实现代码通常很有帮助。
- 当你对测试满意时，要求 Claude 提交测试。
- 要求 Claude 编写通过测试的代码，指示它不要修改测试。告诉 Claude 继续直到所有测试通过。Claude 通常需要几次迭代来编写代码、运行测试、调整代码并再次运行测试。
- 一旦你对更改满意，要求 Claude 提交代码。

### 编写代码，截图结果，迭代

- 给 Claude 一种截取浏览器屏幕截图的方法（例如，使用 Puppeteer MCP 服务器、iOS 模拟器 MCP 服务器，或手动复制/粘贴屏幕截图到 Claude）。
- 通过复制/粘贴或拖放图像，或给 Claude 图像文件路径，给 Claude 一个视觉模型。
- 要求 Claude 在代码中实现设计，截取结果的屏幕截图，并迭代直到其结果与模型匹配。
- 当你满意时要求 Claude 提交。

### 构建高效工作流

- 先计划，后执行：不要直接命令“修复这个bug”，而是说“我遇到了这个bug，请先调查原因，然后给我一个修复计划”。这样你可以在它动手前验证其思路是否正确。
- 利用待办事项 (To-Do List)：在处理复杂任务时，Claude 会生成一个待办事项列表。你可以观察这个列表，如果发现方向不对，可以随时按 Escape 键打断它，并调整计划。
- 拥抱测试驱动开发 (TDD)：让 Claude 进行小范围修改、运行测试、检查代码规范、然后提交。这种小步快跑的方式能确保项目不会偏离轨道。
- 利用多模态能力：你可以随时粘贴截图，或者让 Claude 读取图片文件（如 mock.png），并根据视觉设计来构建界面。

## 高级技巧

- 同时运行多个 Claude 实例：当你熟练后，可以尝试在 Tmux 或多个终端标签页中同时运行多个 Claude 智能体，让它们并行处理不同任务。这是一个有趣的挑战。
- Escape 键是你的超能力
  - 单击 Escape：随时用它来打断 Claude 的当前操作，并给出新的指示。知道何时打断，是最大化效率的关键。
  - 双击 Escape：一个隐藏功能。双击可以让你撤销到上一次对话，相当于一次“重置”。

## claude.md

- Claude 启动时只读取当前工作目录下的 claude.md。
- 可以在主 claude.md 中用 @ 符号引用其他文件，或者在启动 Claude 时，鼓励它去搜索并阅读相关子目录中的 claude.md。
- CLAUDE.md 文件可以使用 @path/to/import 语法导入其他文件。以下示例导入了 3 个文件：
- 内容
  - 包含常用命令（build、test、lint）以避免重复搜索
  - 文档代码样式偏好和命名约定
  - 添加特定于您的项目的重要架构模式
  - CLAUDE.md 记忆既可用于与您的团队共享的指令，也可用于您的个人偏好。

## Claude Token成本控制实践

- 基础
  - 使用 /compact 命令压缩上下文
  - 为每个独立任务多开几个终端窗口 。任务一旦完成，立刻关闭窗口 (/clear 也行)。保持任务的原子性，防止不相关的上下文污染后续对话。
  - 日常开发坚决使用 Sonnet。必要时Opus
  - 定期查账 /cost 命令检查 Token 消费情况
- 工作流优化
  - 善用 .gitignore：Claude Code 会尊重你项目中的 .gitignore 文件。把 node_modules、日志、构建产物等无关文件夹都加进去，能从源头上阻止它进行无效扫描。
  - 先做计划，让 Claude Code 生成一个任务清单（TODO List）
  - 混合工具流，搭配其他AI工具,完成任务
  - 随时存档，git commit
- 高阶
  - 强制约束 在项目配置或初始提示中，用规则强制约束 Claude 的行为
  - 精简输入 不要给 Claude 整个文件，只给它预期会更改的代码，外加周边 20-40 行的相关上下文
