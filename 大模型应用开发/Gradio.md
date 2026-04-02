
# Gradio

https://www.gradio.app/

Gradio 是一个开源的 Python 库，专门用于为机器学习模型、API 或任何 Python 函数快速构建交互式 Web 界面。它由 Hugging Face 维护，旨在让开发者无需掌握复杂的前端技术，即可在几分钟内创建出可演示的 UI。

- 极简开发：仅需几行代码即可将 Python 函数包装成网页应用，支持滑块、文本框、图像上传等多种输入输出组件。
- 实时交互：提供 Interface（高阶界面）和 Blocks（低阶布局）两种模式，后者支持更复杂的自定义布局和事件流。
- 一键分享：通过设置 share=True，Gradio 会生成一个有效期为 72 小时的公网访问链接，方便远程演示。
- 深度集成：与 Hugging Face Spaces 深度集成，是目前展示大语言模型 (LLM) 和扩散模型的主流框架。


```py
import gradio as gr

def greet(name, intensity):
    return "Hello, " + name + "!" * int(intensity)

demo = gr.Interface(
    fn=greet,
    inputs=["text", "slider"],
    outputs=["text"],
    api_name="predict"
)

demo.launch()
```