# JSON数据传输标准

参考：
https://github.com/ecomfe/spec/blob/master/e-json.md

* 接口文档方式
* http响应头
    * Context-Type
    * 跨域
    * get|post|update|option...
* 数据字段
    * string 字符串
    * date 2019-6-6 2019/6/6 日期
    * datetime 2019-6-6 12:00:00 时间
    * datetime2 时间戳
    * int 12132232323 整数
    * {} 对象
    * [] 数组
    * 0.00 货币
    * null 数据空
* 字段格式 {"typeName":""} {"type_name":""} 这个容易让前端混淆。
* 数据响应状态码
* 分页
* 树型结构
* 用户敏感信息 手机号 身份证 电子邮箱
* post 提交的安全性,以及重复提交。csrf-token
* 用户操作频率，即安全性。
* post 数据处理（可能会有攻击）


前端提交：

* 中文编码方式
* 获取数据 get 参数方式（参数分开，还是json）
* 提交方式 post|update
* 提交内容检测 html 标签 防止外链和攻击
* 跨域|以及降级处理(ie9)
* 文件上传处理，是否异步
* 前端枚举数据定义
* 状态码 枚举限定
* 网络连接失败的补救方案
* 数据格式转换方案(针对接口格式的异常处理)
* 登录api 用户信息获取方式 session jwt
* 用户信息的准确性
* 前端头信息 
