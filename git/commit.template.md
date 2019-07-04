 git config commit.template

 .gitconfig 配置如下

 ```cmd
[commit]
   template=./.gittemplate
 ```

 .gittemplate 文件模板

 ```
<新功能|bug修复|文档改动|格式化|重构|测试代码>: (影响范围) <主题> 
# 解释为什么要做这些改动
Issue #?
Task ID #?
BUG ID #?
 ```

```

``` 