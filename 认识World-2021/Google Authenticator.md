# Google Authenticator

Google 身份验证器实战


https://authenticatorapi.com/    
https://blog.seetee.me/post/2011/google-two-step-verification/  
https://tools.ietf.org/id/draft-mraihi-totp-timebased-06.html    
https://datatracker.ietf.org/doc/html/rfc4226  
https://github.com/google/google-authenticator  

Google Authenticator 身份验证器是一款基于时间与哈希的一次性密码算法的两步验证软件令牌，用户需要下载手机 APP（Authenticator），该手机 APP 与网站进行绑定，当网站验证完用户名和密码之后会验证此 APP 上对应生成的 6 位验证码数字，验证通过则成功登录，否则登录失败。

# Google Authenticator 工作流程

实际上 Google Authenticator 采用的是 TOTP 算法（Time-Based One-Time Password，即基于时间的一次性密码），其核心内容包括以下三点。

1、安全密钥

是客户端和服务端约定的安全密钥，也是手机端 APP 身份验证器绑定（手机端通过扫描或者手输安全密钥进行绑定）和验证码的验证都需要的一个唯一的安全密钥，该密钥由加密算法生成，并最后由 Base32 编码而成。

2、验证时间

Google 选择了 30 秒作为时间片，T的数值为 从Unix epoch（1970年1月1日 00:00:00）来经历的 30 秒的个数，所以在 Google Authenticator 中我们可以看见验证码每个 30 秒就会刷新一次。

更详细原理参考：

https://blog.seetee.me/post/2011/google-two-step-verification/

3、签署算法

Google 使用的是 HMAC-SHA1 算法，全称是：Hash-based message authentication code(哈希运算消息认证码)，它是以一个密钥和一个消息为输入，生成一个消息摘要作为输出，这里以 SHA1 算法作为消息输入。

使用 HMAC 算法是因为只有用户本身知道正确的输入密钥，因此会得到唯一的输出，其算法可以简单表示为：

hmac = SHA1(secret + SHA1(secret + input))

事实上，TOTP 是 HMAC-OTP（基于HMAC的一次密码生成）的超集，区别是 TOTP 是以当前时间作为输入，而HMAC-OTP 则是以自增计算器作为输入，该计数器使用时需要进行同步。