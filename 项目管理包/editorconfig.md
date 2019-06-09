# EditorConfig Properties

## indent_style Indentation Style
Values:
* tab
* space

## indent_size 缩进大小（单行间距）
Values:
* 一个正整数
* tab

## tab_width 单个tab字符的宽度 
Value:一个正整数（当indent_size是一个数字时默认为indent_size）

## end_of_line 行结束文件格式（Unix，DOS，Mac）
Values:
* lf - Linefeed，对应ASCII中转义字符\n，表示换行
* crlf - Carriage Return & Linefeed，\r\n，表示回车并换行
* cr - Carriage Return，对应ASCII中转义字符\r，表示回车

## charset 文件字符编码
Values:  
* latin1  
* utf-8  
* utf-16be  
* utf-16le  
* utf-8-bom  

## trim_trailing_whitespace 表示在行尾是否允许空格
VALUE:true/false

## insert_final_newline 表示文件是否应以换行符结尾 值不区分大小写。
VALUE:true/false

## root
应在任何部分之外的文件顶部指定的特殊属性。  
设置为true以停止.editorconfig在当前文件上搜索文件。

例：.editorconfig

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

.editorconfig

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```