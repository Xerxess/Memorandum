const fsm = wx.getFileSystemManager()
const FILE_BASE_NAME = 'tmp_base64src'
let index = 0

/**
 * 生成图片
 */
export const base64src = function (base64data) {
  index += 1
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
    if (!format)
    {
      reject(new Error('ERROR_BASE64SRC_PARSE'))
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}_${index}.${format}`
    const buffer = wx.base64ToArrayBuffer(bodyData)
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success () {
        resolve(filePath)
      },
      fail () {
        reject(new Error('ERROR_BASE64SRC_WRITE'))
      }
    })
  })
}

/**
 * 删除上次生成图片
 */
export const removeImg(){
  try
  {
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}_${index}.${format}`
    fsm.unlinkSync(filePath)
  } catch (e)
  {
    console.log(e)
  }
}

export default base64src
