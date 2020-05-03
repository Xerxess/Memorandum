
https://developer.apple.com/documentation/uikit/uiimage?language=objc

* UIImageView相当于div 可以设置背景  
* UIImage 相当于img,可以放入UIImageView

# UIImageView

* Assets.xcassets中的图片资源只能通过imageNamed:方法加载，通过NSBundle的pathForResource:ofType:无法获得图片路径。

## contentMode

```c++
按比例缩放填充 有可能会失真
UIViewContentModeScaleToFill, 

按比例缩放,根据宽高适应,不会失真      
UIViewContentModeScaleAspectFit,

按比例缩放填充,宽和高只要一个因素fill适应,其他的就在考虑
可能只显示一部分        
UIViewContentModeScaleAspectFill,   

重新绘制 图片
UIViewContentModeRedraw, 

下面的属性 不会被拉伸         
UIViewContentModeCenter, 居中显示        
UIViewContentModeTop, 靠上显示
UIViewContentModeBottom,
UIViewContentModeLeft,
UIViewContentModeRight,
UIViewContentModeTopLeft,
UIViewContentModeTopRight,
UIViewContentModeBottomLeft,
UIViewContentModeBottomRight
```


# UIImage

* UIImage 的尺寸大小由UIImageView 决定

```c++
//直接加载图片
UIImage *image = [UIImage imageNamed:@""];
//加载二进制数据
UIImage *imageDa = [UIImage imageWithData:@"二进制"];
//加载二进制数据 并有缩放
UIImage *imageData = [UIImage imageWithData:@"二进制" scale:@"缩放小数"];
//通过路径加载
 UIImage *image = [UIImage imageWithContentsOfFile:@"文件路径"];
```

## 压缩

```c++
 UIImage *image = [UIImage imageWithContentsOfFile:@"xx.pne"];
 //png压缩
 NSData *pngData = UIImagePNGRepresentation(image);
 //jpg压缩,有压缩系数 常用
 NSData *jpgData = UIImageJPEGRepresentation(image, 1);
```
