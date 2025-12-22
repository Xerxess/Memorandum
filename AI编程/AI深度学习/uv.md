# uv

<https://docs.astral.sh/uv/>

一个用 Rust 编写的、速度极快的 Python 包和项目管理器。

## Python 版本

uv python install ：安装 Python 版本。
uv python list ：查看可用的 Python 版本。
uv python find ：查找已安装的 Python 版本。
uv python pin ：将当前项目固定为使用特定的 Python 版本。
uv python uninstall ：卸载 Python 版本。

## 脚本

uv run ：运行脚本。
uv add --script ：向脚本添加依赖项。
uv remove --script ：从脚本中移除依赖项。

## 项目

uv init ：创建一个新的 Python 项目。
uv add ：向项目中添加依赖项。
uv remove ：从项目中移除依赖项。
uv sync ：将项目的依赖项与环境同步。
uv lock ：为项目的依赖项创建锁定文件。
uv run ：在项目环境中运行命令。
uv tree ：查看项目的依赖关系树。
uv build ：将项目构建成分发归档文件。
uv publish ：将项目发布到包索引。

## 工具

uvx / uv tool run ：在临时环境中运行工具。
uv tool install ：将工具安装到用户全局。
uv tool uninstall ：卸载一个工具。
uv tool list ：列出已安装的工具。
uv tool update-shell ：更新 shell 以包含工具可执行文件。

## pip 接口

uv venv ：创建一个新的虚拟环境。

### 在环境中管理软件包（替换 pip 和 pipdeptree ）

uv pip install ：将软件包安装到当前环境中。
uv pip show ：显示已安装软件包的详细信息。
uv pip freeze ：列出已安装的软件包及其版本。
uv pip check ：检查当前环境中的软件包是否兼容。
uv pip list ：列出已安装的软件包。
uv pip uninstall ：卸载软件包。
uv pip tree ：查看环境的依赖关系树。
