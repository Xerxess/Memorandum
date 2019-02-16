# PJAX

>## 什么是pjax?

利用ajax+history实现页面内部连接实现无刷新跳转页面,提供更好的浏览体验!

>## 好处

 * 用户体验提升。
 * 极大地减少带宽消耗和服务器消耗。

 >## 坏处
 * IE6等历史浏览器的支持
 * 复杂的服务器端支持

 >## 服务器处理

 ```js
xhr.setRequestHeader('X-PJAX', 'true')
xhr.setRequestHeader('X-PJAX-Container', context.selector)
 ```