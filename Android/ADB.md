# ADB

```cmd
# 卸载app
adb.exe uninstall 包名

# 查看相日志
adb.exe logcat | findstr /I "PackageManager PackageInstaller Install"

# 设置active-admin 
adb.exe shell dpm set-active-admin 包名/对应的Receiver

# 设置device-owner
adb.exe shell dpm set-device-owner 包名/对应的Receiver

# 查看device_policy
adb shell dumpsys device_policy

# 通过命令可以快速在设备中输入相关文本
adb shell input text "相关文字"

```

## 移除device_owner

```
# 1. 切换到最高 root 权限（必须，否则后面两步会提示无权限）
adb root

# 2. 物理删除底层的设备所有者配置文件（直接砸锁）
adb shell rm /data/system/device_owner_2.xml
adb shell rm /data/system/device_policies.xml

# 3. 强制让系统底层刷新内存中的配置（不重启设备的话，内存缓存依然会锁死）
adb reboot
```

### Android 5.x 或 6.x

No such file or directory，说明你的工控机系统版本较旧（通常是 Android 5.x 或 6.x）

```
# 1. 提权到最高 root 权限
adb root

# 2. 地毯式删除所有可能包含锁死信息的文件（强行砸锁）
adb shell "rm -f /data/system/device_owner.xml"
adb shell "rm -f /data/system/device_owner_2.xml"
adb shell "rm -f /data/system/device_policies.xml"

# 3. 彻底清除系统的特权缓存（非常关键，不重启内存记录不刷新）
adb reboot
```