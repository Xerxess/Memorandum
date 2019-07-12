
以下方法待测试

来自 https://blog.csdn.net/qq_36875339/article/details/81086205

<!-- TOC -->

- [Canvas绘图](#canvas绘图)
- [文件处理 getFileSystemManager](#文件处理-getfilesystemmanager)

<!-- /TOC -->

# Canvas绘图

https://github.com/AleynP/cxc-base64

```js
wx.chooseImage({
      count: 1,
      success: res => {
        //获取图片的宽高
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: res => {
            this.setData({
              imgWidth: res.width,
              imgHeight: res.height
            })
          }
        })

        canvas = wx.createCanvasContext('canvas')
        
        canvas.drawImage(res.tempFilePaths[0], 0, 0, this.data.imgWidth, this.data.imgHeight) // 1. 绘制图片至canvas
        // 绘制完成后执行回调
        canvas.draw(false, () => {
          // 2. 获取图像数据
          wx.canvasGetImageData({
            canvasId: 'canvas',
            x: 0,
            y: 0,
            width: this.data.imgWidth,
            height: this.data.imgHeight,
            success(res) {
              // 3. png编码
              let pngData = upng.encode([res.data.buffer], res.width, res.height)
              // 4. base64编码
              let base64 = wx.arrayBufferToBase64(pngData)
              console.log(base64)
              // ...
            }
          })
        })
      }
    })
```

# 文件处理 getFileSystemManager

* 注意兼容性 1.9.9+

```js
wx.chooseImage({
      success: res => {
      wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
          }
        })

		//以下两行注释的是同步方法，不过我不太喜欢用。
       	 //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      }
    })
```