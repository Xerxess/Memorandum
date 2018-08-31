
不同浏览使用不同兼容前缀，如果不支持则使用setTimeout();
```js
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
//Bootstrap 自带的 JavaScript 插件的动画效果几乎都是使用 CSS 过渡实现的，而其中的 transition.js 就是为了判断当前使用的浏览器是否支持 CSS 过渡。
//就是判断支不支持transitionend事件而已。

+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================
//比如我使用低版本的 Chrome 浏览器的话，那么得到的对象就是 {end: 'webkitTransitionEnd'} 这样；如果使用 IE 8 则是 false，然后就可以添加该事件的回调函数了：
  function transitionEnd() {/*过度结束事件是有兼容性的，所以专门创建一个方法，来获取每个浏览器兼容的TransitionEnd（用的应当是状态模式）*/
    var el = document.createElement('bootstrap'); // 创建一个元素用于测试

    var transEndEventNames = {//按照当前的主流浏览器趋势总共需要判断四种不同前缀的属性名称：
      WebkitTransition : 'webkitTransitionEnd',//低版本的 Chrome 和 Safari 
      MozTransition    : 'transitionend',//
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)    IE8 不支持过度，(  ._.) 
  }

  // http://blog.alexmaccaw.com/css-transitions
  /*事件名称的问题基本上解决了，但是这个事件有个问题就是有时根本不会触发，这是因为属性值没有发生变化或没有绘制行为发生。要确保每次回调都会被调用，我们增加一个定时器即可：
   所以我们要模拟事件结束*/

  $.fn.emulateTransitionEnd = function (duration) {//放在jquery的 $.fn对象下
    var called = false//// transitionend 事件是否已触发标识
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true });// 表示已触发
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }//// 未触发，强制其触发
    setTimeout(callback, duration)//// 一段时间后检测是否触发
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()//挂载到$.support下面

    if (!$.support.transition) return//说明不自持过度 // 支持过渡的时候才执行后面的代码

    $.event.special.bsTransitionEnd = {//$.support.transition.end 好恶心啊！添加事件回调的时候就可以像这样：$('.circle').one('bsTransitionEnd', function() {}).emulateTransitionEnd(1000);
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);


/*该方法的作用是一段时间(就是过渡持续的时间 transition-duration )过后如果 transitionend 事件没有发生则强制在该元素上触发这个事件。

$('.circle').one($.support.transition.end, function() {});
$('.circle').emulateTransitionEnd(1000); // 这个时间是过渡持续的时间       这样就一定有回掉了*/
```