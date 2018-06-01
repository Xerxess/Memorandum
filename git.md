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