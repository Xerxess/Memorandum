# Transition & Animation

* [Transition](#transition)
    * [语法](#transition1)
    * [触发方式](#transition2)
    * [event:transitionend](#transition3)
    * [应用](#transition4)
* [Animation](#animation)
    * [语法](#animation1)
    * [@keyframes](#animation7)
    * [触发方式](#animation2)
    * [event:animationstart](#animation3)
    * [event:animationend](#animation4)
    * [event:animationiteration](#animation5)
    * [应用](#animation6)
    * [window.requestAnimationFrame()](#animation8)
* [Transition & Animation](#other)


<h2 id="transition">Transition</h2>

Transition 兼容ie10以上

<h2 id="transition1">语法</h2>

```js
transition: <property> <duration> <timing-function> <delay>;

<property>:指定应应用转换的CSS属性的名称
<duration>:指定应发生转换的持续时间
<timing-function>:指定用于定义如何计算属性的中间值的函数
<delay>:定义在更改属性和实际开始转换之间等待的时间

```

<h2 id="transition2">触发方式</h2>

* 伪类触发 :hover :active :focus 
* 媒体查询触发 @media
* javascript触发 常使用添加className
* javascript触发 直接修改style=""

<h2 id="transition3">transitionend</h2>

TransitionEvent(`继承Event`):

* TransitionEvent.propertyName `只读`
是DOMString包含与转换关联的名称CSS属性。
* TransitionEvent.elapsedTime `只读`
是一个float给出转换运行的时间量，以秒为单位，此事件被触发。该值不受该transition-delay属性的影响。
* TransitionEvent.pseudoElement `只读`
是一个DOMString开头'::'，包含动画运行的伪元素的名称。如果转换不在伪元素上运行，而是在元素上运行，则为空字符串：''.

另外相对`transitionrun`、`transitionstart`、`transitioncancel` 这个事件外了Firefox 53 其他浏览器均不支持

```js
domtransition.addEventListener("transitionrun", signalStart, true);

domtransition.addEventListener("transitionstart", signalStart, true);

domtransition.addEventListener("transitioncancel", signalStart, true);
        
```

<h2 id="transition4">应用</h2>


<h2 id="animation">Animation</h2>

Animation 兼容ie10以上

<h2 id="animation1">语法</h2>

```
<single-animation> = <time> || <single-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]
```
属性默认值：
* animation-name: `none` 指定动画名称
* animation-duration: `0s` 指定动画持续时间
* animation-timing-function: `ease` 指定动画缓冲函数
* animation-delay: `0s` 指定动画延迟时间
* animation-iteration-count: `1`|infinite 指定动画周期数
* animation-direction: `normal` | reverse | alternate | alternate-reverse 设置对象动画在循环中是否反向运动
* animation-fill-mode: `none` | forwards | backwards | both 设置对象动画时间之外的状态
* animation-play-state: `running` | paused 定义一个动画是否运行或者暂停

<h2 id="animation7">@keyframes</h2>
控制由限定用于沿着动画序列的关键帧（或路点）样式在CSS动画序列中的中间步骤
语法:

```css
@keyframes <keyframes-name> {
  <keyframe-block-list>
}
<keyframes-name>:标识关键帧列表的名称。这必须与CSS语法中的标识符生成相匹配。
<keyframe-block-list>:[from | to | <percentage>{
    ...
}]
```
`!important会被忽略`
```css
@keyframes important1 {
  from { margin-top: 50px; }
  50%  { margin-top: 150px !important; } /* ignored */
  to   { margin-top: 100px; }
}

@keyframes important2 {
  from { margin-top: 50px;
         margin-bottom: 100px; }
  to   { margin-top: 150px !important; /* ignored */
         margin-bottom: 50px; }
}
```


<h2 id="animation2">触发方式</h2>


* 伪类触发 :hover :active :focus 
* 媒体查询触发 @media
* javascript触发 常使用切换className

<h2 id="animation3">event:animationstart</h2>
动画启动时会触发该事件。如果有，则animation-delay一旦延迟期到期，此事件将触发。负延迟将导致事件以elapsedTime等于延迟的绝对值来触发（并且相应地，动画将在该时间点开始播放到序列中）。

<h2 id="animation4">event:animationend</h2>
动画完成时会触发该事件（但如果它在到达完成之前中止，则不会触发，例如元素变为不可见或动画从元素中移除）

`animation-iteration-count:infinite 不触发`

<h2 id="animation5">event:animationiteration</h2>
动画的迭代结束时会触发该事件

`animation-iteration-count：1 不触发`

适用上面三个事件
AnimationEvent:

* AnimationEvent.animationName `只读`
是DOMString包含animation-name与转换关联的CSS属性的值。
* AnimationEvent.elapsedTime `只读`
是float给动画已经运行，在几秒钟内，当这个事件发射，不包括动画暂停任何时候的时间量。对于一个"animationstart"事件，elapsedTime是0.0除非有一个负值animation-delay，在这种情况下，事件将被激发elapsedTime含有  (-1 * 延迟)。
* AnimationEvent.pseudoElement `只读`
是一个DOMString开头'::'，包含动画运行的伪元素的名称。如果动画不在伪元素上运行但在元素上运行，则为空字符串：''.

<h2 id="animation6">应用</h2>

<h2 id="animation8">window.requestAnimationFrame()</h2>

告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画

`兼容ie10 以上`  

```js
var requestID=window.requestAnimationFrame(callback);
window.cancelAnimationFrame(requestID);  //取消回调函数。
```

`相当于以下兼容函数`
```js
setTimeout(function () {...}, 1000/60);
```

Demo
```js
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

```

<h1 id="other">Transition & Animation</h1>
以下为自己观点：

> Animation虽然强大，但不够灵活(`即操作style可以触发Transition`) 

如下例: 
.html
```html
<div class="box"></div>
```
.css
```css
.box{
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    background: #ccc;
    animation: box-animation .5s 1;
    transition: all 500ms;
}

@keyframes box-animation {
    form {
        transform: translate(0, 0);
    }
    to {
        transform: translate(0, 100px);
    }
}

```
.js
```js
var elbox = document.querySelector('.box');
    setTimeout(function () {
        elbox.style.width="40px";
        }, 500);
```
`这种需要使用js动态改变sytle，Animation不比Transition灵活。`

> 动画效果复杂，才是Animation的天下，Transition的动画仅限于`form -> to(0% -> 100%)`

> Animation可指定循环，可以实现gif动画效果.Transition则必需，达到触发条件才能实现.