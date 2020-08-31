
<!-- TOC -->

- [navigator.getUserMedia](#navigatorgetusermedia)
- [MediaDevices](#mediadevices)
- [navigator.mediaDevices.getUserMedia](#navigatormediadevicesgetusermedia)
- [MediaDevices.enumerateDevices()](#mediadevicesenumeratedevices)
- [MediaStream](#mediastream)
    - [MediaStreamConstraints](#mediastreamconstraints)
    - [MediaTrackConstraints](#mediatrackconstraints)
        - [ConstrainDOMString](#constraindomstring)
        - [MediaTrackConstraints.facingMode](#mediatrackconstraintsfacingmode)

<!-- /TOC -->

https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API

https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/getUserMedia

https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia


通过网络摄像头和WebRTC / getUserMedia进行头部跟踪的Javascript库
https://github.com/auduno/headtrackr

检测到WebRTC支持，它将使用浏览器的本机getUserMedia()实现，否则将加载Flash后备。
https://github.com/addyosmani/getUserMedia.js

一个小型项目，用于标准化浏览器差异以枚举媒体设备
https://github.com/xdumaine/enumerateDevices

# navigator.getUserMedia

兼容性：https://caniuse.com/#search=getUserMedia

* navigator.mediaDevices.getUserMedia 已代替
* 这个已废弃的API版本仅为了向后兼容而存在。

注：ios 中navigator.getUserMedia仅在safari中可查找列表,webview无效，包括第三浏览器（uc 测试无效）

Navigator.getUserMedia()方法提醒用户需要使用音频（0或者1）和（0或者1）视频输入设备，比如相机，屏幕共享，或者麦克风。如果用户给予许可，successCallback回调就会被调用，MediaStream对象作为回调函数的参数。如果用户拒绝许可或者没有媒体可用，errorCallback就会被调用，类似的，PermissionDeniedError 或者NotFoundError对象作为它的参数。注意，有可能以上两个回调函数都不被调用，因为不要求用户一定作出选择（允许或者拒绝）。

```js
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
      function(stream) {
         var video = document.querySelector('video');
         video.src = window.URL.createObjectURL(stream);
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
         console.log("The following error occurred: " + err.name);
      }
   );
} else {
   console.log("getUserMedia not supported");
}
```

# MediaDevices

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

该MediaDevices界面提供对连接的媒体输入设备（如相机和麦克风）的访问以及屏幕共享。从本质上讲，它使您可以访问媒体数据的任何硬件源。

MediaDevices单例对象navigator.mediaDevices

# navigator.mediaDevices.getUserMedia

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

兼容性：
https://caniuse.com/#search=mediaDevices

会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D转换器等等），也可能是其它轨道类型。

```js
// 语法
var promise = navigator.mediaDevices.getUserMedia(constraints);
```

```js
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* 使用这个stream stream */
})
.catch(function(err) {
  /* 处理error */
});
```


# MediaDevices.enumerateDevices()

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices

MediaDevices = navigator.mediaDevices （获取）

请求可用媒体输入和输出设备的列表，例如麦克风，相机，头戴式耳机等。返回的Promise值通过MediaDeviceInfo描述设备的数组进行解析。

```js
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
  return;
}

// List cameras and microphones.

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

//videoinput: id = csO9c0YpAf274OuCPUA53CNE0YHlIr2yXCi+SqfBZZ8=
//audioinput: id = RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=
//audioinput: id = r2/xw1xUPIyZunfV1lGrKOma5wTOvCkWfZ368XCndm0=
```

# MediaStream

https://developer.mozilla.org/en-US/docs/Web/API/MediaStream

该MediaStream界面表示媒体内容流。流由几个轨道组成，例如视频或音频轨道。每个轨道都指定为的实例MediaStreamTrack。您可以使用构造函数或调用来获取MediaStream对象MediaDevices.getUserMedia()

## MediaStreamConstraints

指定什么样的轨道应包含在返回MediaStream和可选，以建立这些曲目设置的限制

## MediaTrackConstraints

用于描述一组功能以及每个功能可以采用的值
```js
{
    // 可接受和/或必需的设备ID或设备ID的数组
    deviceId,

    // 视频轨道的属性
    aspectRatio, // 视频宽高比或纵横比
    facingMode,
    frameRate, // 帧速率
    height,
    width

}
```

### ConstrainDOMString

https://developer.mozilla.org/en-US/docs/Web/API/ConstrainDOMString

用于指定其值是一个字符串的属性的约束

* exact DOMString对象数组，其中之一必须是属性值

### MediaTrackConstraints.facingMode

https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode

```js
// 语法
var constraintsObject = { facingMode: constraint };

// "user" 包括智能手机上的前置摄像头
// "environment" 智能手机上的后置摄像头
var constraints = {
  facingMode: { exact: ["user","environment"] }
};
```
