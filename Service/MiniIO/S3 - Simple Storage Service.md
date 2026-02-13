<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [S3 (Simple Storage Service)](#s3-simple-storage-service)
  - [核心概念](#核心概念)
  - [什么是“兼容 S3”](#什么是兼容-s3)
  - [S3 协议](#s3-协议)
    - [协议基础：RESTful API over HTTP](#协议基础restful-api-over-http)

<!-- /code_chunk_output -->

# S3 (Simple Storage Service)

本质上是一个“无限大的网盘”： 你可以把图片、视频、日志文件、备份包等任何数据丢进去。它不像你电脑里的硬盘那样有文件夹层级（虽然它模拟了文件夹），它是一个扁平的结构，里面存放着无数的“对象”。

## 核心概念

- Bucket（存储桶）： 全局命名空间的容器 相当于你的“顶级文件夹”，比如一个叫 my-photo-album 的桶。
  - 所有的数据都必须存放在某个 Bucket 里。
- Object（对象）： 具体的文件（数据）加上描述信息的标签。由数据和元数据组成
  - 数据： 文件本身的二进制流（如一张 jpg 图片）。
  - 元数据： 描述数据的信息（如 Content-Type、Last-Modified、ETag、自定义头部 x-amz-meta-*）。
- Key（键）： 文件的名字（路径）。 例如：photos/2023/jan.jpg
  - 注意： S3 协议里其实没有真正的“文件夹”概念。photos/2023/ 只是 Key 名字的一部分，很多 S3 客户端软件为了用户体验，根据 / 符号模拟出了文件夹的视觉效果。

## 什么是“兼容 S3”

为了不被绑架。“兼容 S3”，你就可以很轻松地把数据迁移过去，或者切换程序，没有任何学习成本。

## S3 协议

一套基于 HTTP/HTTPS 的 RESTful API 接口规范

### 协议基础：RESTful API over HTTP

- S3 协议的核心思想是利用互联网最通用的 HTTP 协议来管理文件。它完全遵循 REST（Representational State Transfer） 架构风格。
- 传输载体： HTTP 或 HTTPS（目前绝大多数使用 HTTPS 以保证安全）。
- 操作指令： 使用标准的 HTTP 动词（方法）来对资源进行操作：
  - GET： 下载文件或列出存储桶内容。
  - PUT： 上传文件、创建存储桶或修改设置。
  - POST： 上传文件（通常用于表单上传）或恢复删除的文件。
  - DELETE： 删除文件或存储桶。
  - HEAD： 获取文件的元数据（文件大小、修改时间等），不返回文件实体。
