import gradio as gr

def reverse_text(text):
    return text[::-1]

demo = gr.Interface(
    fn = reverse_text,
    inputs="text",
    outputs="text"
)

demo.launch()