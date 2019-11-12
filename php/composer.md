# 镜像用法


1.全局
```
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

2. composer.json添加配置文件
```
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.phpcomposer.com"
    }
}
```

# 解除镜象

解除镜像并恢复到 packagist 官方源
```
composer config -g --unset repos.packagist
```

# 命令

* compose config --list  查看配置
* compose install 安装
* composer global update
* composer show