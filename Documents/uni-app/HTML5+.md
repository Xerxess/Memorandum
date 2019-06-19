https://uniapp.dcloud.io/use-html5plus
 
 
 App 端内置 HTML5+ 引擎，让 js 可以直接调用丰富的原生能力。

 # 使用

* 使用条件编译

 ```
// #ifdef APP-PLUS
var appid = plus.runtime.appid;
console.log('应用的 appid 为：' + appid);
// #endif
 ```

 * uni-app不需要 plus ready
 * uni-app 中的事件监听 plus.globalEvent.addEventListener

# Native.js

Native.js技术，简称NJS，是一种将手机操作系统的原生对象转义，映射为JS对象，在JS里编写原生代码的技术。

Native API具有平台依赖性

```
function judgePlatform(){  
    switch ( plus.os.name ) {  
        case "Android":  
        // Android平台: plus.android.*  
        break;  
        case "iOS":  
        // iOS平台: plus.ios.*  
        break;  
        default:  
        // 其它平台  
        break;  
    }  
}  

```

使用

```
function njsAlertForAndroid(){  
    // 导入AlertDialog类  
    var AlertDialog = plus.android.importClass("android.app.AlertDialog");  
    // 创建提示框构造对象，构造函数需要提供程序全局环境对象，通过plus.android.runtimeMainActivity()方法获取  
    var dlg = new AlertDialog.Builder(plus.android.runtimeMainActivity());  
    // 设置提示框标题  
    dlg.setTitle("自定义标题");  
    // 设置提示框内容  
    dlg.setMessage("使用NJS的原生弹出框，可自定义弹出框的标题、按钮");  
    // 设置提示框按钮  
    dlg.setPositiveButton("确定(或者其他字符)",null);  
    // 显示提示框  
    dlg.show();  
}  
```