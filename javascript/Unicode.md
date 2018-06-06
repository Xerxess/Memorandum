# Unicode



> HTML字符计算方式 

采用十进制方式计算，并以”&#{unicode};”方式进行表示,`十进制必须至少4位数，不足4位，则“&#”后面补0`

```h
<span>&#0124;</span>
```

> CSS字符计算方式

采用十六进行方式进行计算，并以“{unicode}”方式进行表示,`没有4个字符的要求`

```h
/* 这里并没有4个字符的要求，所以\007C并不是必须的 */
span:before {
    content : '\7C'
}
```

> JS计算方式

十六进制的方式进行计算，但以“\u{unicode}”的方式表示  
`对于innerHTML的赋值即可以采用”\u007C”方式，也可以采用”&#0124 ;”HTML方式，但对于input输入框，或者alert打印信息，只能采用”\u007C”方式。`

```js
document.querySelector('span').innerHTML = '\u007C';
```


ASCII对照表: [http://ascii.911cha.com/](http://ascii.911cha.com/)