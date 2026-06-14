<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NFC](#nfc)
  - [开发条件](#开发条件)
  - [构建模式](#构建模式)
  - [NFC 相关概念](#nfc-相关概念)
    - [NDEF](#ndef)
    - [NFC 的基本原理](#nfc-的基本原理)
    - [NFC 的三种工作模式](#nfc-的三种工作模式)
    - [NFC 的技术标准与兼容性](#nfc-的技术标准与兼容性)
    - [典型应用场景](#典型应用场景)
  - [NFC 卡片/标签类型](#nfc-卡片标签类型)
  - [网上的标签](#网上的标签)

<!-- /code_chunk_output -->

# NFC

近场通信（Near Field Communication，简称 NFC）是一种短距离、高频的无线通信技术，主要用于在两个电子设备之间进行快速、安全、低功耗的数据交换。它广泛应用于移动支付、智能交通、门禁系统、设备配对、信息读取等场景。

## 开发条件

- 需要付费开发者账号，不然真机测试无法开启开发权限
- 在Info.plist 需要配制相应权限
- 项目 TARGETS -> Signing & Capabilities -> Capability (需要付费开发者账号的原因)

## 构建模式

- 主动 NFC 标签读取 即需要用户主动开启NFC对NFC标签进行读写
- 后台标签读取 （iPhone XS 及更新机型支持后台标签读取。）

## NFC 相关概念

### NDEF

NDEF（NFC Data Exchange Format）是 NFC Forum 定义的通用数据封装格式，用于跨平台交换文本、URL、蓝牙配对信息等。

- 不写 NDEF 的后果 手机读到的是原始字节数据（如 01 02 A3 FF...）
- 核心作用：实现“跨平台自动交互”
  - 标准化结构
  - URI（网址）
  - Text（纯文本）
  - vCard（电子名片） 名字、电话、邮箱
  - Smart Poster（智能海报）
  - Bluetooth OOB 蓝牙 MAC 地址 + 配对码
  - Wi-Fi 配置 SSID + 密码（需加密）

### NFC 的基本原理

- 工作频率：13.56 MHz（属于全球通用的 ISM 非授权频段）
- 通信距离：通常 ≤ 10 厘米，典型有效距离为 1–4 厘米
- 传输速率：支持 106 kbit/s、212 kbit/s 和 424 kbit/s 三种速率（依据 ISO/IEC 18092 标准）

### NFC 的三种工作模式

- 卡模拟模式（Card Emulation）手机刷公交、NFC 支付（Apple Pay、Huawei Pay）
- 读写器模式（Reader/Writer）扫描智能海报、商品标签、活动推广
- 点对点模式（Peer-to-Peer）“碰一碰”传名片、照片、Wi-Fi 配置

### NFC 的技术标准与兼容性

- NFC-A ISO/IEC 14443 Type A（如 Mifare） 广泛用于门禁、交通卡
- NFC-B ISO/IEC 14443 Type B 多用于身份证、金融卡
- NFC-F JIS X 6319-4（FeliCa，日本标准） 日本主流，如 Suica 卡
- NFC-V ISO/IEC 15693 读取距离稍远，用于资产追踪
- IsoDep ISO/IEC 14443-4 支持高层协议（如金融交易）

### 典型应用场景

- 移动支付 手机“碰一下”完成支付（如银联云闪付、支付宝“碰一碰”）
- 公共交通 手机/手表模拟交通卡（如北京一卡通、重庆畅通卡）
- 智能门禁 NFC 手机替代门禁卡
- 营销互动 触碰 NFC 海报获取优惠券、跳转小程序
- 设备互联 碰一碰连接蓝牙耳机、配对 Wi-Fi、启动投屏
- 物联网（IoT） 读取设备状态（如 2026 年新规充电宝健康参数显示）
- 身份认证 电子身份证、员工工牌验证

## NFC 卡片/标签类型

NDEF 兼容性：Type 2/3/4/5 均支持 NDEF；Type 1 有条件支持。

- Type 1：  ISO 14443-B 96B–2KB 是 成本低，速度慢 Topaz (Innovision)
- Type 2：  ISO 14443-A 48B–2KB 是 最常见，如 Mifare Ultralight Mifare Ultralight (NXP)
- Type 3：  FeliCa 256B–1MB 是 高速，日系主流 FeliCa (Sony)
- Type 4：  ISO 14443-A/B + Part 4 ≤32KB 是 支持 APDU，高安全 DESFire, Java Card
- Type 5：  ISO 15693 ≤64KB（可扩展至 1MB） 是 远距离读取，新标准（2025+） ICODE, ST25DV

## 网上的标签

- NTAG 213 215 216 都属于 NFC Forum Type 2 Tag 标准，区别在于存储容量