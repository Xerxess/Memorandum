
# Image

在 Flutter 中，Image 组件是用于展示图片的基础 UI 单元。它支持多种图片来源，并提供了丰富的样式控制属性。
缓存机制：Flutter 默认提供内存缓存。若需实现复杂的磁盘缓存和淡入效果，通常推荐使用社区插件 cached_network_image。

- Image.asset：加载项目资源文件。需要在 pubspec.yaml 中注册路径。
- Image.network：加载网络图片 URL。
- Image.file：加载本地文件系统中的图片（如手机相册路径）。
- Image.memory：加载内存中的原始字节数据（如 Uint8List）。