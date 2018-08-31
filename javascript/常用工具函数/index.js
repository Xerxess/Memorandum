!function (w) {
    var common = {};
    /**
     * RequestAnimationFrame
     */
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
                lastTime = currTime + timeToCall;
            }, timeToCall);
            return id;
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
        common.requestAnimationFrame = function () {
            window.requestAnimationFrame.apply(window, arguments);
        };
        common.cancelAnimationFrame = function () {
            window.cancelAnimationFrame.apply(window, arguments);
        }
    })();

    /**
     * transitionEnd/animationEnd
     */
    (function () {
        var WN = {},
            body = document.body || document.documentElement,
            style = body.style,
            transition = "transition",
            transitionEnd,
            animationEnd,
            vendorPrefix;

        transition = transition.charAt(0).toUpperCase() + transition.substr(1);

        vendorPrefix = (function () {//现在的opera也是webkit
            var i = 0, vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
            while (i < vendor.length) {
                if (typeof style[vendor[i] + transition] === "string") {
                    return vendor[i];
                }
                i++;
            }
            return false;
        })();

        transitionEnd = (function () {
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            }
            for (var name in transEndEventNames) {
                if (typeof style[name] === "string") {
                    return transEndEventNames[name]
                }
            }
        })();

        animationEnd = (function () {
            var animEndEventNames = {
                WebkitAnimation: 'webkitAnimationEnd',
                animation: 'animationend'
            }
            for (var name in animEndEventNames) {
                if (typeof style[name] === "string") {
                    return animEndEventNames[name]
                }
            }
        })();
        WN.addTranEvent = function (elem, fn, duration) {
            var called = false;
            var fncallback = function () {
                if (!called) {
                    fn();
                    called = true;
                }
            };

            function hand() {
                elem.addEventListener(transitionEnd, function () {
                    elem.removeEventListener(transitionEnd, arguments.callee, false);
                    fncallback();
                }, false);
            }

            setTimeout(hand, duration);
        };
        WN.addAnimEvent = function (elem, fn) {
            elem.addEventListener(animationEnd, fn, false)
        };
        WN.removeAnimEvent = function (elem, fn) {
            elem.removeEventListener(animationEnd, fn, false)
        };
        WN.setStyleAttribute = function (elem, val) {
            if (Object.prototype.toString.call(val) === "[object Object]") {
                for (var name in val) {
                    if (/^transition|animation|transform/.test(name)) {
                        var styleName = name.charAt(0).toUpperCase() + name.substr(1);
                        elem.style[vendorPrefix + styleName] = val[name];
                    } else {
                        elem.style[name] = val[name];
                    }
                }
            }
        };
        WN.transitionEnd = transitionEnd;
        WN.vendorPrefix = vendorPrefix;
        WN.animationEnd = animationEnd;
        common.WN = WN;
    })();

    !function () {
        /**
         * 动态创建style
         */
        common.createstyle = function (styleContent) {
            var nod = document.createElement("style"),
                str = styleContent;
            nod.type = "text/css";
            if (nod.styleSheet) {//ie下
                nod.styleSheet.cssText = str;
            } else {
                nod.innerHTML = str;
            }
            document.getElementsByTagName("head")[0].appendChild(nod);
        }
    }();

    !function () {
        //处理url参数
        common.urlparam = {
            get: function (name, url) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (url) {
                    if (url.indexOf('?') > -1) {
                        url = url.substr(url.indexOf('?')+1);
                    }
                    r = url.match(reg);
                }
                if (r != null) return r[2];
                return null;
            },
            getData: function (url) {
                if (!url || url == 'null') {
                    return null;
                }
                var resultData = {};
                var reg = new RegExp("([^&=])+=([^&=]*)", 'g');
                var r = url.match(reg);
                for (var i = 0, j = r.length; i < j; i++) {
                    var data = r[i].split('=');
                    resultData[data[0]] = data[1];
                }
                return resultData;
            },
            set: function (url, ref, value) {
                var str = "";
                var urlstr = "";
                urlstr = url.toString();
                if (urlstr.indexOf("?") != -1)
                    str = urlstr.substr(urlstr.indexOf('?') + 1);
                else
                    return url + "?" + ref + "=" + value;
                var returnurl = "";
                var setparam = "";
                var arr;
                var modify = "0";

                if (str.indexOf('&') != -1) {
                    arr = str.split('&');

                    for (i in arr) {
                        if (arr[i].split('=')[0] == ref) {
                            setparam = value;
                            modify = "1";
                        }
                        else {
                            setparam = arr[i].split('=')[1];
                        }
                        returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";
                    }

                    returnurl = returnurl.substr(0, returnurl.length - 1);

                    if (modify == "0")
                        if (returnurl == str)
                            returnurl = returnurl + "&" + ref + "=" + value;
                }
                else {
                    if (str.indexOf('=') != -1) {
                        arr = str.split('=');

                        if (arr[0] == ref) {
                            setparam = value;
                            modify = "1";
                        }
                        else {
                            setparam = arr[1];
                        }
                        returnurl = arr[0] + "=" + setparam;
                        if (modify == "0")
                            if (returnurl == str)
                                returnurl = returnurl + "&" + ref + "=" + value;
                    }
                    else
                        returnurl = ref + "=" + value;
                }
                return urlstr.substr(0, urlstr.indexOf('?')) + "?" + returnurl;
            },
            del: function (url, ref) {
                var str = "";
                if (url.indexOf('?') != -1) {
                    str = url.substr(url.indexOf('?') + 1);
                }
                else {
                    return url;
                }
                var arr = "";
                var returnurl = "";
                var setparam = "";
                if (str.indexOf('&') != -1) {
                    arr = str.split('&');
                    for (i in arr) {
                        if (arr[i].split('=')[0] != ref) {
                            returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                        }
                    }
                    return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
                }
                else {
                    arr = str.split('=');
                    if (arr[0] == ref) {
                        return url.substr(0, url.indexOf('?'));
                    }
                    else {
                        return url;
                    }
                }
            }
        }
    }();

    !function () {
        var hash = function () {
        }
        hash.prototype = {
            constructor: hash,
            add: function (k, v) {
                if (!this.hasOwnProperty(k)) {
                    this[k] = v;
                }
            },
            remove: function (k) {
                if (this.hasOwnProperty(k)) {
                    delete this[k];
                }
            },
            update: function (k, v) {
                this[k] = v;
            },
            has: function (k) {
                var type = typeof k;
                if (type === 'string' || type === 'number') {
                    return this.hasOwnProperty(k);
                } else if (type === 'function' && this.some(k)) {
                    return true;
                }
                return false;
            },
            clear: function () {
                for (var k in this) {
                    if (this.hasOwnProperty(k)) {
                        delete this[k];
                    }
                }
            },
            empty: function () {
                for (var k in this) {
                    if (this.hasOwnProperty(k)) {
                        return false;
                    }
                }
                return true;
            },
            each: function (fn) {
                for (var k in this) {
                    if (this.hasOwnProperty(k)) {
                        fn.call(this, this[k], k, this);
                    }
                }
            },
            map: function (fn) {
                var hash = new Hash;
                for (var k in this) {
                    if (this.hasOwnProperty(k)) {
                        hash.add(k, fn.call(this, this[k], k, this));
                    }
                }
                return hash;
            },
            filter: function (fn) {
                var hash = new Hash;
                for (var k in this) {

                }
            },
            join: function (split) {
                split = split !== undefined ? split : ',';
                var rst = [];
                this.each(function (v) {
                    rst.push(v);
                });
                return rst.join(split);
            },
            every: function (fn) {
                for (var k in this) {
                    if (this.hasOwnProperty(k)) {
                        if (!fn.call(this, this[k], k, this)) {
                            return false;
                        }
                    }
                }
                return true;
            },
            some: function (fn) {
                for (var k in this) {
                    if (this.hasOwnProperty(k)) {
                        if (fn.call(this, this[k], k, this)) {
                            return true;
                        }
                    }
                }
                return false;
            },
            find: function (k) {
                var type = typeof k;
                if (type === 'string' || type === 'number' && this.has(k)) {
                    return this[k];
                } else if (type === 'function') {
                    for (var _k in this) {
                        if (this.hasOwnProperty(_k) && k.call(this, this[_k], _k, this)) {
                            return this[_k];
                        }
                    }
                }
                return null;
            }
        };
        common.hash = new hash();
    }();

    if (typeof define === "function" && define.amd) {
        define(function () {
            return common;
        });
    }
    w.common = common;
}(this);
