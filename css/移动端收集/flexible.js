/**
 * 设计稿为750px
 * 默认整体缩放1/2即375 方便css单位需要除2
 * 如：
 * #d{
 *      width:100px;
 * }
 * 转换为
 * #d{
 *      widht:.5rem;
 * }
 */
(function flexible(window, document) {
    var baseWidth = 375;
    var basefontsize = 100;
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            //document.body.style.fontSize = (12 * dpr) + 'px'
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }

    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        // var rem = docEl.clientWidth / 10
        // docEl.style.fontSize = rem + 'px'
        // alert(document.documentElement.clientWidth);
        // alert(window.devicePixelRatio);
        var rem = 100 / (baseWidth / document.documentElement.clientWidth);
        // alert(rem);
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))