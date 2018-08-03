# window.open(url)打开链接被浏览器拦截解决方案

## 将打开窗口操作放在按钮/链接的onclick事件中

```html
<a href="javascript:void(0)" onclick="window.open(url)"></a>
```

```html

<html>
<head>
    <title>write example</title>

    <script>
        function newContent() {
            setTimeout(function () {
                // var newdoc= window.open('','myName','left=10,top=20')
                //   newdoc.open();
                //   newdoc.write("<h1>Out with the old - in with the new!</h1>");
                document.getElementById('abc').click();
            }, 1000);
        }

        function aa() {
            window.open('', 'myName', 'left=10,top=20')
        }
    </script>
</head>

<body onload="newContent();">
    <p>Some original document content.</p>
    <div id="abc" href="javascript:void(0)" onclick="aa()">abc</div>
</body>

</html>
```

`延迟这个打开操作`不可行

```js
setTimeout('window.open(url);', 500);//无效
```