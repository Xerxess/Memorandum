# Tool

在 LangChain 中，Tool（工具） 是大模型与现实世界交互的“手和脚”。LLM 本身只能做纯文本生成与逻辑推理，无法实时联网、计算复杂运算或读写数据库。通过 Tool，LLM 可以将自然语言意图转换为可执行的外部函数调用（Function Calling）。