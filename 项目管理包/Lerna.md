
https://github.com/lerna/lerna#readme

Lerna是一个优化使用git和npm管理多包存储库的工作流程的工具。


文件结构：
```
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

命令:
* lerna bootstrap 将把repo中的依赖关系链接在一起
* lerna publish 发布任何更新的包

## Lerna包管理两种模式

* 固定/锁定模式（默认）
* 独立模式