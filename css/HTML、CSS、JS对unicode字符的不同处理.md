# HTML、CSS、JS对unicode字符的不同处理

## css表示法

* '\ + 16进制的unicode编码'

```css
.glyphicon-home:before {
	content: "\e021";
}
```

## js表示方法

* '\u + 16进制的unicode编码'

```ts
console.log('\u5b89');
```

## html表示方法

* '&# + 10进制的unicode编码 + 英文分号;'

```html
<div>
	这是unicode表示的字符“安”：&#23433;（这里故意留一空格防止转换）
</div>
```

# 获取汉字的unicode编码

```ts
'安'.charCodeAt()； // 输出的 23433 就是汉字 安 的unicode编码，不过注意是10进制的
String.fromCharCode(23433); // 输出 '安'


var unicode = '\\u'+'茗'.charCodeAt().toString(16); // 输出字符串："\u8317"
JSON.parse('"'+unicode+'"'); // 输出汉字："茗"
eval('"'+unicode+'"'); // 或者使用eval解析也可以
```