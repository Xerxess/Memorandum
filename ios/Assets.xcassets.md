Assets.xcassets

* 自动管理图片,如@1x,@2x图片,使用的时候使用Asset 名字即可
* 管理应用的Icon和Default图片,这个挺方便的,可以完全抛开以前规范命名如Icon.png,Icon@2x.png,Xcode会自动识别尺寸然后匹配进去
* 方便模块图片管理,可以针对模块建立Component1.xcassets,在这个Category中去建立新的Image set
* 可以可视化管理图片拉伸,从而抛弃到处使用resizeImage...来获取拉伸图片。