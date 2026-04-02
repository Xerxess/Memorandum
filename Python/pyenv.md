# pyenv

pyenv 是最受欢迎的 Python 版本管理工具，它允许你在同一台机器上安装并轻松切换多个 Python 版本（如 3.10, 3.12, 3.14 等），且不会干扰系统自带的 Python 环境。


```cmd
# macOS: 推荐使用 Homebrew
brew install pyenv

# Linux: 推荐使用自动安装脚本
curl https://pyenv.run | bash
```

```cmd
pyenv install --list
pyenv install 3.14.0
pyenv versions
pyenv global 3.12.5
pyenv local 3.10.13
pyenv shell 3.14.0
pyenv uninstall 3.8.10
```