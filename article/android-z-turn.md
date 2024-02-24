## 重启进 bootloader
  > adb -d reboot bootloader
## 列出已连接的设备
  > fastboot devices
## fastboot 刷入 recovery.img
  > fastboot flash recovery recovery.img
## fastboot 重启进 recovery
  > fastboot boot recovery.img
## 侧载刷机包
  > adb -d sideload filename.zip
## 停用 bloatware
  > adb shell pm disable-user com.android.quicksearchbox
## 去除信号感叹号
  > adb shell "settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204"
## 安装应用
  > adb install app.apk

