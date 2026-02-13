

# Regex 正则表达式

https://pkg.go.dev/regexp

Go 语言中，正则表达式通过标准库 regexp 实现

## regexp 包

- Go 的正则采用 RE2 语法（不回溯，性能稳定，不会因恶意正则导致 CPU 爆表）。
- MatchString(pat, str)	判断是否存在匹配，返回 bool。
- FindString(str)	返回第一个匹配的字符串。
- FindStringSubmatch(str)	返回匹配项及其子组（括号内的内容）。
- ReplaceAllString(str, repl)	替换匹配到的所有内容。
- FindAllStringSeq(str, n)	(2026 推荐) 返回迭代器，按需获取匹配项。

## 编写正则

- 在 Go 中使用反引号 `pattern` 来写正则，这样就不用像 JS 那样到处转义斜杠了。

```go
regString := `\d{2,4}.`
byteData := []byte{}
byteData = append(byteData, []byte("abc")[0])
matched, err := regexp.Match(regString, []byte(`1`))
if err == nil {
    fmt.Println(matched, []string{"小明abc"}[0])
}

regexp, err := regexp.Compile(regString)
if err != nil {
    return
}
findReult := regexp.Find([]byte(`11小明trsf`))
fmt.Println(string(findReult))

newstr := regexp.ReplaceAll([]byte(`123小明`), []byte(`abc`))
fmt.Println(string(newstr))
```