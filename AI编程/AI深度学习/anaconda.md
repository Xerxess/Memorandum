# anaconda

<https://www.anaconda.com/>

## Conda

Conda: 这是 Anaconda 的灵魂。Conda 是一个强大的包管理器和环境管理器。
包管理器：负责安装、更新和管理各种软件库（比如 NumPy, Pandas, TensorFlow）。与 Python 自带的 pip 不同，Conda 不仅能管理 Python 包，还能管理其他语言（如 C, C++）的软件包。
环境管理器：这是 Conda 最强大的功能之一。它允许你为不同的项目创建相互隔离的独立环境。这完美解决了“依赖地狱”的问题——比如，你的 A 项目需要某个库的 1.0 版本，而 B 项目需要它的 2.0 版本，用 Conda 就可以为它们分别创建环境，互不干扰。
Anaconda Navigator: 这是一个图形用户界面（GUI）。对于不喜欢使用命令行的初学者来说非常友好。你可以通过它来管理软件包、环境，并一键启动 Jupyter Notebook、Spyder 等应用。
预装的软件包: Anaconda 自带了数百个数据科学领域最流行的库，开箱即用，包括：
NumPy: 用于科学计算和数值操作。
Pandas: 用于数据清洗、处理和分析。
Matplotlib & Seaborn: 用于数据可视化，绘制各种图表。
Scikit-learn: 用于机器学习建模。
Jupyter Notebook: 一个交互式的网页编程环境，非常适合做数据分析和教学演示。

## 为什么它如此流行？

简单易用：一站式解决方案，安装一个 Anaconda 就等于拥有了数据科学的全套工具。
解决依赖问题：Conda 的环境管理功能让项目配置变得异常简单和稳定。
跨平台：完美支持 Windows、macOS 和 Linux 系统。
社区强大：拥有庞大的用户社区，遇到问题很容易找到解决方案。

## Conda 的使用

```
创建环境
conda create --name pyTorch_env python=3.10

激活环境
conda activate pyTorch_env

查看所有环境
conda env list
# 或者
conda info --envs

退出环境
conda deactivate

删除环境
# 语法: conda env remove --name <环境名>
conda env remove --name my_project_env
```

```
包管理
# 搜索包
conda search numpy

# 模糊搜索
conda search scikit
# 安装单个包
conda install numpy

# 安装指定版本的包
conda install pandas=1.3.0

# 同时安装多个包
conda install numpy pandas matplotlib

# 从指定频道 安装包 (强烈推荐)
# conda-forge 是一个社区维护的频道，包更全、更新更快
conda install -c conda-forge tensorflow

查看已安装的包
conda list

# 更新单个包
conda update numpy

# 更新环境中所有包到最新兼容版本
conda update --all

删除包
conda remove numpy
```

### 总结 一个标准工作流程

开始新项目：conda create -n my_new_project python=3.9
进入项目环境：conda activate my_new_project
安装所需包：conda install numpy pandas scikit-learn jupyterlab
开始工作：运行你的代码，启动 JupyterLab 等。
项目完成/分享：conda env export > environment.yml
切换到其他项目：conda deactivate 然后 conda activate another_project
清理旧项目：conda env remove -n my_old_project
掌握了以上这些命令和流程，你就能熟练地使用 Conda 来管理你的数据科学项目了。
