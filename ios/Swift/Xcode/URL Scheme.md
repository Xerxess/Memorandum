
# URL Scheme

是一种传统的 App 唤醒机制。你可以把它理解为 App 的“专属暗号”或“自定义协议”。

## URL Scheme 与 Universal Links 的核心区别

- URL Scheme  
  - 自定义前缀，如 myapp://page?id=123
  - 如果未安装 App，点击后无反应或报错，体验较差
  - 唤起场景:在 Safari 地址栏输入、部分 App 内部
- Universal Links
  - 标准的 HTTPS 链接，如 <https://example.com/page>
  - 如果未安装 App，直接在浏览器打开对应网页，体验无缝
  - 极高，必须通过服务器 AASA 文件进行严格的域名所有权验证
  - 系统级支持，Safari、备忘录、微信等绝大多数场景均可直接唤起

## 项目中配置 URL Scheme

- 在 Xcode 中打开项目，点击左侧的项目文件。
- 进入 Info 选项卡，找到 URL Types 栏目。
- 点击 + 号新增一项，在 URL Schemes 处填写你的专属前缀（例如 myapp 或 taobao）。
- 配置完成后，在网页或代码中通过 myapp://xxx 这样的链接即可尝试唤起你的 App。
