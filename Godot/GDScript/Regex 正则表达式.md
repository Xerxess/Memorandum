

# Regex 正则表达式

https://docs.godotengine.org/zh-cn/4.4/classes/class_regex.html

- RegEx

```gdscript
var regex = RegEx.new()
regex.compile("\\w-(\\d+)")
var result = regex.search("abc n-0123")
if result:
    print(result.get_string()) # 会输出 n-0123
```