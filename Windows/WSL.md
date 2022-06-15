# WSL

https://docs.microsoft.com/zh-cn/windows/wsl/

```cmd
wsl --install
wsl --install --distribution <Distribution Name>

wsl --list --online

wsl --set-default-version <Version>

wsl --update
wsl --status

wsl -u <Username>`, `wsl --user <Username>

# 更改发行版的默认用户
<DistributionName> config --default-user <Username>

# 关闭
wsl --shutdown

# 卸载
wsl --unregister <DistributionName>
```

## 修改密码

```cmd
wsl -u root 或 wsl -d Debian -u root

# 进入系统后
passwd <username>
```
