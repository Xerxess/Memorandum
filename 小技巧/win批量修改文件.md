<!-- TOC -->

- [批量修改文件-去括号.bat](#批量修改文件-去括号bat)
- [批量修改文件-去空格.bat](#批量修改文件-去空格bat)

<!-- /TOC -->


# 批量修改文件-去括号.bat

```cmd
@Echo Off&SetLocal ENABLEDELAYEDEXPANSION
FOR %%a in (*) do (
echo 正在处理 %%a
set "name=%%a"
set "name=!name:(=!"
set "name=!name:)=!"
ren "%%a" "!name!"
)
exit
```

# 批量修改文件-去空格.bat

```cmd
@echo off
Setlocal Enabledelayedexpansion
set "str= "
for /f "delims=" %%i in ('dir /b *.*') do (
set "var=%%i" & ren "%%i" "!var:%str%=!")
```