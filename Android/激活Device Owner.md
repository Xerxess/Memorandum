在工控设备、收银机或行业平板这类既没有摄像头（无法扫码）、也没有 NFC 芯片（无法碰触激活）的免维护/无外设硬件上，要激活 Android Enterprise 的 `Device Owner` 权限，主流且合规的商用实现方案主要有以下三种。

根据你的**量产规模**以及**对硬件供应链的控制力**，可以选择最适合的路径：

---

## 方案一：开发测试与小规模部署——利用“免重置 ADB 间接法”（推荐）

如果设备已经在工厂跑完开机引导，或者由于特殊原因**无法/不想恢复出厂设置**，你可以利用标准的 `adb` 命令结合特定的**账户伪装技术**来强制激活。

> ⚠️ **核心痛点：** 原生 Android 规定，设备只要存在任何账户（包括系统自带的厂商账户），执行 `set-device-owner` 就会报错：`New UserManagerException: Cannot set device owner because there are already some users on the device`。

### 详细操作步骤

1. **通过命令行找出并彻底剥离所有干扰账户：**
将设备连接电脑，打开终端执行以下命令，查看当前设备中存在的账户类型：
```bash
adb shell dumpsys account

```


如果发现有任何账户，可以通过手机设置将其删除。如果是系统固化无法删除的账户，可以使用以下命令强制剔除：
```bash
adb shell pm remove-user [User_ID]

```


*(注：通常主用户 ID 为 0)*
2. **直接通过类名（Component）强行注入：**
确保设备中没有任何账户后，通过后台直接安装你的 Kiosk 应用，然后用标准的 ADB 命令指定你的广播接收器（DeviceAdminReceiver）：
```bash
adb shell dpm set-device-owner com.yourpackage.kiosk/.MyDeviceAdminReceiver

```


**优势：** 100% 绕过了摄像头扫码和 NFC 碰触，非常适合技术人员在工控机出厂前进行流水线式的人工刷入。

---

## 方案二：批量量产与远程部署——利用 U 盘/SD 卡配置自动激活

大多数工控设备虽然没有摄像头和 NFC，但**一定会留有 USB 接口或 TF/SD 卡槽**。Android 系统的底层开机引导（Setup Wizard）其实内置了读取外部存储配置文件的隐藏机制。

### 核心机制

在设备恢复出厂设置后的**首次开机欢迎界面**（Setup Wizard），系统底层会检测外部存储。

### 详细操作步骤

1. 创建一个名为 `device_owner_info.txt`（部分系统支持 JSON 格式）的配置文件。
2. 在文件内写入你的应用包名、下载地址以及校验码。例如：
```json
{
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_NAME": "com.yourpackage.kiosk",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.yourpackage.kiosk/.MyDeviceAdminReceiver",
  "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true
}

```


3. 将此文件与你的应用 APK 一起放入 U 盘或 SD 卡的根目录。
4. 将 U 盘插入刚恢复出厂设置的工控机，开机。系统的配置向导会自动检测到该配置文件，**跳过扫码和 NFC 阶段，直接在后台静默安装该 APK 并自动将其激活为 Device Owner**。

---

## 方案三：硬件厂商级方案——直接在编译 ROM 时“写死”权限（最彻底）

如果你是工控机的设备制造商，或者能拿到主板厂商（如瑞芯微 Rockchip、全志 Allwinner 等）的系统源码（Android AOSP 源代码），最完美的商业级做法是在系统编译时**把你的 App 直接固化为 Device Owner**。

厂商可以通过修改 Framework 层的 `device_owner_2.xml`（不同版本路径可能稍有差异）来实现这一点：

1. 在系统源码的 `/data/system/device_owner_2.xml` 路径下，预先写入包含你 App 信息的配置文件：
```xml
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<device-owner package="com.yourpackage.kiosk" name="KioskAdmin" component="com.yourpackage.kiosk/.MyDeviceAdminReceiver" userRestrictions="not_configured" />

```


2. 将你的 Kiosk 应用放入系统源码的 `/system/priv-app/` 目录下，作为系统特权级应用一起打包编译。

**优势：** 这种设备**出厂即自带霸屏属性**。即使用户在后台找到办法强行将设备“恢复出厂设置”，系统重启后依然会自动读取这个固化的配置文件，你的 App 依旧是最高权限的 Device Owner，实现了物理级防死机和防破解。

---

### 💡 工控项目落地选型建议

* **设备小于 100 台：** 建议直接走 **方案一（ADB 间接法）**。制作一个自动化批处理脚本（`.bat` 或 `.sh`），工人只需插上 USB 线，双击运行脚本即可在几秒钟内完成一台工控机的全套提权和全屏配置。
* **设备大于 1000 台/异地维护：** 建议与主板供应商沟通，走 **方案三（修改 ROM）** 或让其配合开放 **方案二（U盘静默激活）** 的端口，这是工业级设备保证高可用性的标准解法。