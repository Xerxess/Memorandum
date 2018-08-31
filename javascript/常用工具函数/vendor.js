//获取前缀
var vendor = (function () {
    var transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };
    for (var key in transformNames) {
        if (document.body.style[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();

//设置带前缀的属性
function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}