

# iOS

* uiwebview
* wkwebview iOS8

5+ 默认是 uiwebview  
uni-app 默认是 wkwebview


wkwebview缺点：不支持websql（iOS8、9上不支持，iOS10恢复支持）、不支持plus.navigator.setCookie、不支持webview的overrideresource方法、不支持js原生加密、wk第一次渲染速度略慢于uiwebview；  

wkwebview优点：节省内存、滚动时懒加载的图片也可以实时渲染而uiwebview在滚动停止后懒加载的图片才能显示（滚动前就加载图片不受影响）、wkwebview的video播放支持AirPlay（uni-app的video组件是原生的，暂不支持ariplay）。

# Android

* Android webkit Android4.4以前
* Android4.4起 chromium内核

QQ、UC、360等浏览器也基本是基于chromium

# 小程序平台

微信小程序或微信内置浏览器，在iOS上使用的是wkwebview内核，根据iOS版本的不同而不同；Android上使用的是微信基于chromium改造的浏览器内核。  

支付宝、百度在iOS上也是wkwebview内核，Android上各自使用自己基于chromium改造的浏览器内核。