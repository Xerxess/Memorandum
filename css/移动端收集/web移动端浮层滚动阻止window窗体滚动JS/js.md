## 方法1

https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/

```js
// 这样处理会导致 .aside的所有元素都不能滚动！

$('.aside').on('touchmove', function(event) {
    event.preventDefault();
});

```

```js
//通过边界时再preventDefault，优化版
$.smartScroll = function(container, selectorScrollable) {
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
    if (!selectorScrollable || container.data('isBindScroll')) {
        return;
    }

    // 是否是搓浏览器
    // 自己在这里添加判断和筛选
    var isSBBrowser;

    var data = {
        posY: 0,
        maxscroll: 0
    };

    // 事件处理
    container.on({
        touchstart: function (event) {
            var events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);

            if (!elTarget.length) {
                return;
            }

            var elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
                elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                elScroll = null;
            }

            if (!elScroll) {
                return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
        },
        touchmove: function (event) {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
                // 禁止滚动
                event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            if (isSBBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger('scroll');
                return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
        },
        touchend: function () {
            data.maxscroll = 0;
        }
    });

    // 防止多次重复绑定
    container.data('isBindScroll', true);
};
````

## 方法2 bscroll.js iscroll.js等模拟滚动条.

https://github.com/ustbhuangyi/better-scroll

https://github.com/cubiq/iscroll

小技巧:
模拟滚动条时touchmove一般会阻止默认行为。
e.preventDefault();
设置后css :active 失效，可以将插件中preventDefault:false.将包裹的容器手动监听touchmove e.preventDefault();

```js

//bscroll源码中直接阻止
if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
            e.preventDefault();
    }
    if (this.options.stopPropagation) {
        e.stopPropagation();
    }
```

```html
<div class="wrap">
<div class="scroll-wrap">
    <ul>
        <li></li>
        <li></li>
    </ul>
</div>
</div>
```
