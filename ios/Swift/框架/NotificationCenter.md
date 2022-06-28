<!-- TOC -->

- [NotificationCenter](#notificationcenter)

<!-- /TOC -->

# NotificationCenter

- 优势
  - 多个收件人
  - 松耦合
  - 全球接入点,不需要（或只是不关心）代码中的依赖注入时，单例样式的方法 defaultCenter 允许您轻松地将两个随机对象连接在一起
- 缺点
  - 无法使用调试器介入
  - 不明显的控制流
  - 第三方库可能依赖与您的代码相同的通知并相互干扰
  - 无法控制谁有资格发送特定通知。
