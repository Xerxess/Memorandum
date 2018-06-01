## Git是一个开源的分布式版本控制系统


下载地址: [https://git-scm.com/](https://git-scm.com/)  

> Git 与 SVN 区别

```
1、GIT是分布式的，SVN不是：这是GIT和其它非分布式的版本控制系统，例如SVN，CVS等，最核心的区别。

2、GIT把内容按元数据方式存储，而SVN是按文件：所有的资源控制系统都是把文件的元信息隐藏在一个类似.svn,.cvs等的文件夹里。

3、GIT分支和SVN的分支不同：分支在SVN中一点不特别，就是版本库中的另外的一个目录。

4、GIT没有一个全局的版本号，而SVN有：目前为止这是跟SVN相比GIT缺少的最大的一个特征。

5、GIT的内容完整性要优于SVN：GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。
```

> Git 三种状态

* 已提交（committed）已提交表示数据已经安全的保存在本地数据库中。
* 已修改（modified）已修改表示修改了文件，但还没保存到数据库中。
* 已暂存（staged）已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。



> Git 项目的三个工作区域
 * Git 仓库 repository  
 * 工作目录 working directory
 * 暂存区域 staging area
 ![images/git/areas.png](images/git/areas.png)

 ```
 * 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。 这是 Git 中最重要的部分，从其它计算机克隆仓库时，拷贝的就是这里的数据。

 * 工作目录是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。

 * 暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。 有时候也被称作`‘索引’'，不过一般说法还是叫暂存区域。

基本的 Git 工作流程如下：

       1.在工作目录中修改文件。

       2.暂存文件，将文件的快照放入暂存区域。

       3.提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。
 ```

 > 初次运行 Git 前的配置
 ```
 Git 自带一个 git config 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：

      1./etc/gitconfig 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果使用带有 --system 选项的 git config 时，它会从此文件读写配置变量。

      2.~/.gitconfig 或 ~/.config/git/config 文件：只针对当前用户。 可以传递 --global 选项让 Git 读写此文件。

      3.当前使用仓库的 Git 目录中的 config 文件（就是 .git/config）：针对该仓库。

      每一个级别覆盖上一级别的配置，所以 .git/config 的配置变量会覆盖 /etc/gitconfig 中的配置变量。
 ```

> 用户信息

```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com

你在该系统上做任何事情， Git 都会使用那些信息。
```


> Git 基础 - 获取 Git 仓库

```
$ git init 
在现有目录中初始化仓库

$ git add *.c
$ git add LICENSE
$ git commit -m 'initial project version'
```

> 克隆现有的仓库
```
$ git clone https://github.com/libgit2/libgit2
$ git clone https://github.com/libgit2/libgit2 mylibgit
```

> 忽略文件
```
.gitignore 的文件

.gitignore 的格式规范如下：

     * 所有空行或者以 ＃ 开头的行都会被 Git 忽略。

     * 可以使用标准的 glob 模式匹配。

     * 匹配模式可以以（/）开头防止递归。

     * 匹配模式可以以（/）结尾指定目录。

     * 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。
```
  .gitignore 文件的例子：

```
# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

> 远程仓库的使用
```
$ git remote 查看远程仓库
$ git remote -v

$ git remote add pb https://github.com/paulboone/ticgit 添加远程仓库
$ git remote show origin 查看远程仓库

$ git fetch [remote-name] 从远程仓库中抓取与拉取
$ git push origin master 推送到远程仓库

$ git remote rename pb paul 远程仓库重命名
$ git remote rm paul 远程仓库移除
```

> 打标签
```
$ git tag 列出标签  

创建标签
Git 使用两种主要类型的标签：轻量标签与附注标签。

1.轻量标签（lightweight）:轻量标签本质上是将提交校验和存储到一个文件中 - 没有保存任何其他信息.

2.附注标签（annotated）:附注标签是存储在 Git 数据库中的一个完整对象.

$ git tag -a [tag] -m 'my version 1.4' 附注标签 建议创建附注标签，可以拥有以上所有信息
$ git tag [tag] 轻量标签 不需要使用 -a、-s 或 -m 选项

$ git push origin [tagname] 共享标签
$ git push origin --tags 共享标签  一次性推送很多标签

$ git checkout -b [branchname] [tagname]  检出标签
```

> 分支简介

```
$ git branch 分支的一个列表
$ git branch -v 查看每一个分支的最后一次提交
$ git branch [branchname] 分支创建
$ git checkout [branchname] 分支切换

// master 主分支 （即所有分支需要合并到主分支）
// HEAD 指向当前工作分支的指针

$ git checkout -b [branchname] 创建分支并切换到该分支
  等同
  $ git branch [branchname]
  $ git checkout [branchname]

$ git merge [branchname] *回到master合并指定分支
 git branch -d [branchname] 删除这个分支
```
```
分支合并可参考：https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6
```
> 远程分支
```
$ git push (remote) (branch) 推送
$ git push origin --delete [branchname] 删除一个远程分支
```

```
Note:

如何避免每次输入密码
如果你正在使用 HTTPS URL 来推送，Git 服务器会询问用户名与密码。 默认情况下它会在终端中提示服务器是否允许你进行推送。

如果不想在每一次推送时都输入用户名与密码，你可以设置一个 “credential cache”。 最简单的方式就是将其保存在内存中几分钟，可以简单地运行 git config --global credential.helper cache 来设置它。
```

> 配置工具

```
$ git config --global user.name "[name]" 
设置要提交到提交事务的名称

$ git config --global user.email "[email address]"
设置要提交到提交事务的电子邮件

$ git config --global color.ui auto
启用命令行输出的帮助着色

```

> 创建存储库 (启动新的存储库或从现有URL获得一个存储库)

```
$ git init [project-name]
创建具有指定名称的新本地存储库

$ git clone [url]
下载项目及其整个版本历史
```

> MAKE CHANGES(操作 审查编辑和CRAF提交事务)

```
$ git status
列出要提交的所有新的或修改的文件。

$ git add [file]
为版本控制准备快照文件

$ git reset [file]
卸载文件，但保留其内容

$ git diff
显示尚未上演的文件差异

$ git diff --staged
显示分级和最后一个文件版本之间的文件差异

$ git commit -m "[descriptive message]"
在版本历史记录中永久记录文件快照
```

> 分支

```
$ git branch
列出当前存储库中的所有本地分支

$ git branch [branch-name]
创建一个新的分支

$ git checkout [branch-name]
切换到指定的分支并更新工作目录

$ git merge [branch]
将指定的分支历史合并到当前分支中

$ git branch -d [branch-name]
删除指定的分支
```

> 文件管理 (重新定位和删除版本文件)

```
$ git rm [file]
删除工作目录中的文件并对删除阶段进行分级

$ git rm --cached [file]
从版本控制中移除文件，但在本地保存文件。

$ git mv [file-original] [file-renamed]
更改文件名并准备提交
```

> 保存碎片

```
$ git stash
临时存储所有修改后的跟踪文件

$ git stash list
列出所有隐藏的变更集

$ git stash pop
恢复最近隐藏的文件

$ git stash drop
丢弃最近隐藏的变更集
```

> 历史

```
$ git log
列出当前分支的版本历史记录

$ git log --follow [file]
列出文件的版本历史，包括重命名

$ git diff [first-branch]...[second-branch]
显示两个分支之间的内容差异

$ git show [commit]
输出指定提交的元数据和内容更改
```

> 还原

```
$ git reset [commit]
撤消所有提交（提交），保存本地更改

$ git reset --hard [commit]
将所有历史和更改丢弃回指定的提交
```

> 同步

```
$ git fetch [bookmark]
从存储库书签下载所有历史记录

$ git merge [bookmark]/[branch]
将书签的分支合并到当前本地分支中

$ git push [alias] [branch]
上传所有本地分支提交给GITHUB

$ git pull
下载书签历史并合并更改
```