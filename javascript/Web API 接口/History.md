# History

该History界面允许操纵浏览器会话历史记录，即在当前页面加载的选项卡或框架中访问的页面。

* [属性](#property)
     * [History.length](#property-1)
* [方法](#method)
    * [History.back()](#method-1)
    * [History.forward()](#method-2)
    * [History.go()](#method-3)
    * [History.pushState()](#method-4)
    * [History.replaceState()](#method-5)
* [window.onpopstate](#onpopstate)
* [pushState && hash](#pushstat-hash)

<h2 id="property">属性</h2>
<h3  id="property-1">History.length</h3>
只读属性返回一个Integer代表在会话历史元素，包括当前加载页面的数量。


<h2 id="method">方法</h2>
<h3  id="method-1">History.back()</h3>
转到会话历史记录中的上一页，与用户单击浏览器的“后退”按钮时的操作相同。相当于history.go(-1)。

<h3  id="method-2">History.forward()</h3>
转到会话历史记录中的下一页，与用户单击浏览器的“前进”按钮时的操作相同; 这相当于history.go(1)。

<h3  id="method-3">History.go()</h3>
从会话历史记录加载页面，该页面由其与当前页面的相对位置标识，例如前一页为-1或下一页为1。如果指定了越界值（例如，在会话历史记录中没有先前访问过的页面时指定-1），则此方法将无效地生效。go()不带参数或值为0的调用会重新加载当前页面。

<h3  id="method-4">History.pushState()</h3>
将给定数据推送到具有指定标题的会话历史堆栈，如果提供，则推送到URL。DOM将数据视为不透明; 您可以指定任何可以序列化的JavaScript对象。

```js
pushState(state,title,URL)
```
* `state`对象 - state对象是一个JavaScript对象，它与创建的新历史记录条目相关联pushState()。每当用户导航到新状态时，popstate都会触发事件，并且state事件的属性包含历史记录条目的状态对象的副本。

* `title` - Firefox目前忽略了这个参数，虽然它可能在将来使用它。在此处传递空字符串应该可以安全地防止将来对方法进行更改。或者，您可以为您要移动的州通过一个简短的标题。

* `URL` - 此历史记录条目的URL由此参数指定。请注意，浏览器在调用后不会尝试加载此URL pushState()，但稍后可能会尝试加载URL，例如在用户重新启动浏览器之后。新URL不一定是绝对的; 如果是相对的，则相对于当前URL进行解析。新URL必须与当前URL的原点相同; 否则，pushState()将抛出异常。此参数是可选的; 如果未指定，则将其设置为文档的当前URL。

<h3  id="method-5">History.replaceState()</h3>
更新历史堆栈上的最新条目以获取指定的数据，标题以及URL（如果提供）。DOM将数据视为不透明; 您可以指定任何可以序列化的JavaScript对象。


<h2 id="onpopstate">window.onpopstate</h2>
popstate每当活动历史记录条目在同一文档的两个历史记录条目之间发生更改时，就会将事件分派到窗口。如果激活的历史记录条目是通过调用history.pushState()或受到调用影响而创建的history.replaceState()，则popstate事件的state属性包含历史记录条目的状态对象的副本。

`调用history.pushState()或history.replaceState()不会触发popstate事件`。该popstate事件仅由执行浏览器操作，如单击后退按钮（或调用触发history.back()JavaScript中），对于相同的文档两条历史条目之间航行时。


<h2 id="pushstat-hash">pushStat && hash</h2>

* 新URL可以是与当前URL同源的任何URL。相反，只有window.location在document仅修改哈希时，设置才会使您保持相同。
* 如果您不想更改URL，则无需更改URL。相反，window.location = "#foo";只有当前哈希不同时，设置才会创建新的历史记录条目#foo。
* 您可以将任意数据与新的历史记录条目相关联。使用hash需要将所有相关数据编码为短字符串(如`#/value/value2/value3`)。
* 如果title 随后被浏览器使用，则可以使用该数据（独立于例如散列）。

`触发方式`  

类型 | 方式 | 兼容
---------|----------|---------
pushStat| window.onpopstate | *IE10以上
hash | window.hashchange | *IE7以下无效 需要setInterval监听变化
|`建议`|ie 9以下采用 hash<br/>ie 10以上采用 pushStat

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>history</title>
</head>

<body>
    <a href="javascript:;" id="btn_link">pushState</a>
    <a href="javascript:;" id="btn_link2">replaceState</a>
    <script>

        document.querySelector('#btn_link').addEventListener('click', function () {
            var stateObj = { foo: "bar" };
            history.pushState(stateObj, "page 2", "pushState.html");
        });
        document.querySelector('#btn_link2').addEventListener('click', function () {
            var stateObj = { foo: "bar2" };
            history.replaceState(stateObj, "page 2", "replaceState.html");
        });

        window.addEventListener('popstate', function (e) {
            console.log(e.state);
        });
        
    </script>
</body>

</html>
```